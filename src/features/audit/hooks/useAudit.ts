import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { auditApi } from '../api/audit.api';
import { GenerateAuditInput } from '../schemas/audit.schema';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const AUDIT_KEYS = {
  all: ['audits'] as const,
  lists: () => [...AUDIT_KEYS.all, 'list'] as const,
  details: () => [...AUDIT_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...AUDIT_KEYS.details(), id] as const,
};

export const useAudits = () => {
  return useQuery({
    queryKey: AUDIT_KEYS.lists(),
    queryFn: auditApi.getAll,
  });
};

export const useAudit = (id: string) => {
  return useQuery({
    queryKey: AUDIT_KEYS.detail(id),
    queryFn: () => auditApi.getById(id),
    enabled: !!id,
  });
};

export const useGenerateAudit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, onProgress }: { data: GenerateAuditInput; onProgress?: (p: number) => void }) => 
      auditApi.generate(data, (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: AUDIT_KEYS.lists() });
      toast.success('AI Audit generated successfully');
    },
    onError: (error: any) => {
      let message = 'Failed to generate audit. Please try again.';
      if (error instanceof AxiosError) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    },
  });
};
