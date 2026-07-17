import apiClient from '@/lib/api-client';
import { ApiResponse } from '@/types/api.types';
import { AuthResponse } from '../types/auth.types';
import { LoginInput, RegisterInput } from '../schemas/auth.schema';

const AUTH_URL = '/auth';

export const authApi = {
  login: async (data: LoginInput): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post(`${AUTH_URL}/login`, data);
  },

  register: async (data: RegisterInput): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post(`${AUTH_URL}/register`, data);
  },

  googleLogin: async (idToken: string): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post(`${AUTH_URL}/google`, { idToken });
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post(`${AUTH_URL}/refresh`, { refreshToken });
  },

  logout: async (refreshToken: string): Promise<ApiResponse<void>> => {
    return apiClient.post(`${AUTH_URL}/logout`, { refreshToken });
  },

  me: async (): Promise<ApiResponse<{ user: AuthResponse['user'] }>> => {
    return apiClient.get(`${AUTH_URL}/me`);
  },
};
