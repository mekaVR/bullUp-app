export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  access?: string;
  refresh?: string;
}

export interface UserExistsResponse {
  exists: boolean;
  message: string;
}

export interface RefreshTokenResponse {
  access: string;
}

export interface ApiErrorDetail {
  detail: string;
}
