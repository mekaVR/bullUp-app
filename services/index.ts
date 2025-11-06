/**
 * Services Index
 * Central export point for all API services
 */

// Main axios instance
export { default as api, clearTokens } from "@/services/api/axios.config";

// Authentication Service
export { authenticationService } from "@/services/authentication/authentication.service";

// Comic Book Service
export { comicBookService } from "./comicBook/comicBook.service";

// Generic API Service
export { apiService } from "@/services/api/api.service";

// Re-export types (if needed)
export type { default as AxiosInstance } from "axios";
