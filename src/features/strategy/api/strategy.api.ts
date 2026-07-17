import apiClient from '@/lib/api-client';
import {
  Strategy,
  GenerateStrategyPayload,
  UpdateStrategyPayload,
} from '../types/strategy.types';

const BASE = '/strategies';

/** Shape the backend sends: { status: 'success', data: ... } */
interface BackendResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export const strategyApi = {
  /** Generate a new strategy from an audit */
  generate: async (payload: GenerateStrategyPayload): Promise<Strategy> => {
    const res = await apiClient.post<unknown, BackendResponse<Strategy>>(
      `${BASE}/generate`,
      payload,
    );
    return res.data;
  },

  /** Regenerate a strategy (creates a new version) */
  regenerate: async (id: string): Promise<Strategy> => {
    const res = await apiClient.post<unknown, BackendResponse<Strategy>>(
      `${BASE}/${id}/regenerate`,
    );
    return res.data;
  },

  /** Get all strategies (list view, no version history) */
  getAll: async (): Promise<Strategy[]> => {
    const res = await apiClient.get<unknown, BackendResponse<Strategy[]>>(BASE);
    return res.data;
  },

  /** Get a single strategy with full version history */
  getById: async (id: string): Promise<Strategy> => {
    const res = await apiClient.get<unknown, BackendResponse<Strategy>>(
      `${BASE}/${id}`,
    );
    return res.data;
  },

  /** Update strategy title and/or content */
  update: async (id: string, payload: UpdateStrategyPayload): Promise<Strategy> => {
    const res = await apiClient.patch<unknown, BackendResponse<Strategy>>(
      `${BASE}/${id}`,
      payload,
    );
    return res.data;
  },

  /** Delete a strategy */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${BASE}/${id}`);
  },
};
