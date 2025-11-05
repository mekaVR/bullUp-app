/**
 * Services Index
 * Central export point for all API services
 */

// Main axios instance
export { default as api, clearTokens } from "@/app/api/axios.config";

// Authentication Service
export { authenticationService } from "@/app/authentication/services/authentication.service";

// Comic Book Service
export { comicBookService } from "./comicBook/comicBook.service";

// Generic API Service
export { apiService } from "@/app/api/api.service";

// Re-export types (if needed)
export type { default as AxiosInstance } from "axios";
