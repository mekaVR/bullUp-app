/**
 * Services Index
 * Central export point for all API services
 */

// Main axios instance
export { default as api, clearTokens } from "./axios.config";

// Authentication Service
export { authenticationService } from "./authentication.service";

// Comic Book Service
export { comicBookService } from "./comicBook.service";

// Generic API Service
export { apiService } from "./api.service";

// Re-export types (if needed)
export type { default as AxiosInstance } from "axios";
