import apiClient from '@/lib/api-client';
import { ApiResponse } from '@/types/api.types';
import { DashboardStats } from '../types/dashboard.types';

const DASHBOARD_URL = '/dashboard';

export const dashboardApi = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    return apiClient.get(`${DASHBOARD_URL}/stats`);
  },
};
