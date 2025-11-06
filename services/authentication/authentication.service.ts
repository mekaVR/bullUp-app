import api from "@/services/api/axios.config";
import { API_ENDPOINTS } from "@/constants/api";
import {
  LoginResponse,
  RefreshTokenResponse,
  RegisterResponse,
  UserExistsResponse,
} from "@/services/authentication/authentication.interfaces";

/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */

export const authenticationService = {
  /**
   * Login user with username and password
   * @param username - User's username
   * @param password - User's password
   * @returns Access and refresh tokens
   */
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(API_ENDPOINTS.TOKEN, {
      username,
      password,
    });
    return response.data;
  },

  /**
   * Register a new user
   * @param username - Desired username
   * @param email - User's email address
   * @param password - User's password
   * @returns User data with tokens
   */
  register: async (
    username: string,
    email: string,
    password: string,
  ): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>(API_ENDPOINTS.REGISTER, {
      username,
      email,
      password,
    });
    return response.data;
  },

  /**
   * Check if a username already exists
   * @param username - Username to check
   * @returns Object indicating if username exists
   */
  checkUsernameExists: async (
    username: string,
  ): Promise<UserExistsResponse> => {
    const response = await api.get<UserExistsResponse>(
      `${API_ENDPOINTS.USER_EXISTS}?username=${username}`,
    );
    return response.data;
  },

  /**
   * Refresh the access token using refresh token
   * @param refreshToken - Current refresh token
   * @returns New access token
   */
  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const response = await api.post<RefreshTokenResponse>(
      API_ENDPOINTS.TOKEN_REFRESH,
      {
        refresh: refreshToken,
      },
    );
    return response.data;
  },

  /**
   * Request password reset
   * @param email - User's email address
   * @returns Success message
   */
  requestPasswordReset: async (email: string): Promise<{ message: string }> => {
    const response = await api.post("/password-reset/", { email });
    return response.data;
  },
};

export default authenticationService;
