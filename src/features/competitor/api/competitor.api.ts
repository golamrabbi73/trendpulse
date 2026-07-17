import apiClient from '@/lib/api-client';
import {
  Competitor,
  CompetitorListResponse,
  CreateCompetitorPayload,
  GetCompetitorsParams,
  UpdateCompetitorPayload,
} from '../types/competitor.types';

const BASE = '/competitors';

/** Shape the backend sends: { status: 'success', data: ... } */
interface BackendResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export const competitorApi = {
  getAll: async (params?: GetCompetitorsParams): Promise<CompetitorListResponse> => {
    const res = await apiClient.get<unknown, BackendResponse<CompetitorListResponse>>(BASE, {
      params,
    });
    return res.data;
  },

  getById: async (id: string): Promise<Competitor> => {
    const res = await apiClient.get<unknown, BackendResponse<Competitor>>(`${BASE}/${id}`);
    return res.data;
  },

  create: async (payload: CreateCompetitorPayload): Promise<Competitor> => {
    const res = await apiClient.post<unknown, BackendResponse<Competitor>>(BASE, payload);
    return res.data;
  },

  update: async (id: string, payload: UpdateCompetitorPayload): Promise<Competitor> => {
    const res = await apiClient.put<unknown, BackendResponse<Competitor>>(
      `${BASE}/${id}`,
      payload,
    );
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${BASE}/${id}`);
  },
};
