/**
 * API Configuration Constants
 */

export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_BASE_URL,
  TIMEOUT: 10000, // 10 seconds
} as const;

export const API_ENDPOINTS = {
  // Authentication
  TOKEN: "/api/token/",
  TOKEN_REFRESH: "/api/token/refresh/",
  REGISTER: "/register/",
  USER_EXISTS: "/register/get-user-exist/",

  // Comics
  COMIC_BOOKS: "/api/comic-book/",
} as const;
