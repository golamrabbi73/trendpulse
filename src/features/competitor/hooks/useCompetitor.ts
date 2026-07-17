import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { competitorApi } from '../api/competitor.api';
import {
  CreateCompetitorPayload,
  GetCompetitorsParams,
  UpdateCompetitorPayload,
} from '../types/competitor.types';

export const COMPETITOR_KEYS = {
  all: ['competitors'] as const,
  lists: () => [...COMPETITOR_KEYS.all, 'list'] as const,
  list: (params: GetCompetitorsParams) => [...COMPETITOR_KEYS.lists(), params] as const,
  details: () => [...COMPETITOR_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...COMPETITOR_KEYS.details(), id] as const,
};

/** Fetch paginated / filtered competitors list */
export function useCompetitors(params: GetCompetitorsParams = {}) {
  return useQuery({
    queryKey: COMPETITOR_KEYS.list(params),
    queryFn: () => competitorApi.getAll(params),
    placeholderData: keepPreviousData,
  });
}

/** Fetch a single competitor by id */
export function useCompetitor(id: string) {
  return useQuery({
    queryKey: COMPETITOR_KEYS.detail(id),
    queryFn: () => competitorApi.getById(id),
    enabled: !!id,
  });
}

/** Create a new competitor */
export function useCreateCompetitor() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: CreateCompetitorPayload) => competitorApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPETITOR_KEYS.lists() });
      toast.success('Competitor added successfully');
      router.push('/dashboard/competitors');
    },
    onError: (error: unknown) => {
      const message =
        (error as { message?: string })?.message || 'Failed to add competitor';
      toast.error(message);
    },
  });
}

/** Update an existing competitor */
export function useUpdateCompetitor(id: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: UpdateCompetitorPayload) => competitorApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPETITOR_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: COMPETITOR_KEYS.detail(id) });
      toast.success('Competitor updated successfully');
      router.push('/dashboard/competitors');
    },
    onError: (error: unknown) => {
      const message =
        (error as { message?: string })?.message || 'Failed to update competitor';
      toast.error(message);
    },
  });
}

/** Delete a competitor */
export function useDeleteCompetitor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => competitorApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPETITOR_KEYS.lists() });
      toast.success('Competitor deleted successfully');
    },
    onError: (error: unknown) => {
      const message =
        (error as { message?: string })?.message || 'Failed to delete competitor';
      toast.error(message);
    },
  });
}
