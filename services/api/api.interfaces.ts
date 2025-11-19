export interface ApiError {
  message: string;
  errors: Record<string, string> | null;
  code: string;
}
