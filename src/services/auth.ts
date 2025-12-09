import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "api/v1/users";

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token?: string;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token?: string;
}

// Login
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/login`, data);
  return response.data;
};

// Register
export const register = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/register`, data);
  return response.data;
};

// Get current user
export const getCurrentUser = async (): Promise<User> => {
  const response = await axios.get<User>(`${API_URL}/me`);
  return response.data;
};

// Refresh token
export const refreshToken = async (): Promise<RefreshResponse> => {
  const refresh = localStorage.getItem("refresh_token");
  const response = await axios.post<RefreshResponse>(`${API_URL}/refresh`, {
    refresh_token: refresh,
  });
  return response.data;
};

// Logout
export const logout = async (): Promise<void> => {
  await axios.post(`${API_URL}/logout`);
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

// Token management helpers
export const setTokens = (accessToken: string, refreshToken?: string) => {
  localStorage.setItem("access_token", accessToken);
  if (refreshToken) {
    localStorage.setItem("refresh_token", refreshToken);
  }
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refresh_token");
};

export const setUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getStoredUser = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};
