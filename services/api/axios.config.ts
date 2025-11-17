import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_CONFIG } from "@/constants/api";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

/**
 * Axios instance with base configuration
 */
export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Get tokens from secure storage
 */
const getTokens = async (): Promise<{
  access: string;
  refresh: string;
} | null> => {
  try {
    let sessionData: string | null = null;

    if (Platform.OS === "web") {
      sessionData = localStorage.getItem("session");
    } else {
      sessionData = await SecureStore.getItemAsync("session");
    }

    if (!sessionData) return null;

    const tokens = JSON.parse(sessionData);
    return tokens;
  } catch (error) {
    console.error("Error getting tokens:", error);
    return null;
  }
};

/**
 * Save tokens to secure storage
 */
const saveTokens = async (tokens: { access: string; refresh: string }) => {
  try {
    const sessionData = JSON.stringify(tokens);

    if (Platform.OS === "web") {
      localStorage.setItem("session", sessionData);
    } else {
      await SecureStore.setItemAsync("session", sessionData);
    }
  } catch (error) {
    console.error("Error saving tokens:", error);
  }
};

/**
 * Clear tokens from secure storage
 */
export const clearTokens = async () => {
  try {
    if (Platform.OS === "web") {
      localStorage.removeItem("session");
    } else {
      await SecureStore.deleteItemAsync("session");
    }
  } catch (error) {
    console.error("Error clearing tokens:", error);
  }
};

/**
 * Request interceptor to add access token to headers
 */
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const tokens = await getTokens();

    if (tokens?.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/**
 * Flag to prevent multiple refresh token requests
 */
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

/**
 * Process queued requests after token refresh
 */
const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Response interceptor to handle token refresh
 */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const tokens = await getTokens();

        if (!tokens?.refresh) {
          // No refresh token available, clear tokens and reject
          await clearTokens();
          processQueue(error, null);
          return Promise.reject(error);
        }

        // Request new access token using refresh token
        const response = await axios.post(
          `${API_CONFIG.BASE_URL}/api/token/refresh/`,
          {
            refresh: tokens.refresh,
          },
        );

        const { access, refresh } = response.data;

        // Save new tokens
        await saveTokens({
          access,
          refresh,
        });

        // Update authorization header
        originalRequest.headers.Authorization = `Bearer ${access}`;

        // Process queued requests
        processQueue(null, access);

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, clear tokens
        await clearTokens();
        processQueue(refreshError as AxiosError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
