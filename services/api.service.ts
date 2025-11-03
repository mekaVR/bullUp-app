// eslint-disable-next-line import/no-named-as-default
import api from "./axios.config";

/**
 * Generic API Service
 * Provides generic HTTP methods for custom API requests
 * Use this when you need to make API calls that don't fit into existing services
 */

export const apiService = {
  /**
   * Generic GET request
   */
  get: async <T = any>(
    url: string,
    params?: Record<string, any>,
  ): Promise<T> => {
    const response = await api.get(url, { params });
    return response.data;
  },

  /**
   * Generic POST request
   */
  post: async <T = any>(
    url: string,
    data?: Record<string, any>,
  ): Promise<T> => {
    const response = await api.post(url, data);
    return response.data;
  },

  /**
   * Generic PUT request
   */
  put: async <T = any>(url: string, data?: Record<string, any>): Promise<T> => {
    const response = await api.put(url, data);
    return response.data;
  },

  /**
   * Generic PATCH request
   */
  patch: async <T = any>(
    url: string,
    data?: Record<string, any>,
  ): Promise<T> => {
    const response = await api.patch(url, data);
    return response.data;
  },

  /**
   * Generic DELETE request
   */
  delete: async <T = any>(url: string): Promise<T> => {
    const response = await api.delete(url);
    return response.data;
  },
};

export default api;
