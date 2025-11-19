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

  // User
  USER_PROFILE: "/api/users/me/",
  USER_CHANGE_PASSWORD: "/api/users/change-password/",
  USER_DELETE_ACCOUNT: "/api/users/delete-account/",
} as const;

export const API_DEFAULT_ERROR_MESSAGE = "Une erreur est survenue";
