import apiClient from '@/lib/api-client';
import { AxiosProgressEvent } from 'axios';
import { Audit } from '../types/audit.types';
import { GenerateAuditInput } from '../schemas/audit.schema';

// The response interceptor in api-client returns response.data directly.
// The second generic of axios methods is the parsed return type.
interface BackendResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export const auditApi = {
  getAll: async (): Promise<Audit[]> => {
    const res = await apiClient.get<unknown, BackendResponse<Audit[]>>('/audits');
    return res.data;
  },

  getById: async (id: string): Promise<Audit> => {
    const res = await apiClient.get<unknown, BackendResponse<Audit>>(`/audits/${id}`);
    return res.data;
  },

  generate: async (data: GenerateAuditInput, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void): Promise<Audit> => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('file', data.file);

    const res = await apiClient.post<unknown, BackendResponse<Audit>>(
      '/audits/generate',
      formData,
      {
        onUploadProgress,
        timeout: 120000,
      }
    );
    return res.data;
  },
};
