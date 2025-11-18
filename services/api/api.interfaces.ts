export interface ApiError {
  error: string;
  details?: string[] | Record<string, string[]>;
}

export interface ApiMailError {
  email: ApiError;
}
