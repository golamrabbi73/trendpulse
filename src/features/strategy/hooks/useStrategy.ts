import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { strategyApi } from '../api/strategy.api';
import {
  GenerateStrategyPayload,
  UpdateStrategyPayload,
} from '../types/strategy.types';

export const STRATEGY_KEYS = {
  all: ['strategies'] as const,
  lists: () => [...STRATEGY_KEYS.all, 'list'] as const,
  details: () => [...STRATEGY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...STRATEGY_KEYS.details(), id] as const,
};

/** Fetch all strategies (list view) */
export function useStrategies() {
  return useQuery({
    queryKey: STRATEGY_KEYS.lists(),
    queryFn: strategyApi.getAll,
  });
}

/** Fetch a single strategy with full version history */
export function useStrategy(id: string) {
  return useQuery({
    queryKey: STRATEGY_KEYS.detail(id),
    queryFn: () => strategyApi.getById(id),
    enabled: !!id,
  });
}

/** Generate a new strategy from an audit */
export function useGenerateStrategy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: GenerateStrategyPayload) => strategyApi.generate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STRATEGY_KEYS.lists() });
      toast.success('Strategy generated successfully!');
    },
    onError: (error: unknown) => {
      const message =
        (error as { message?: string })?.message ||
        'Failed to generate strategy. Please try again.';
      toast.error(message);
    },
  });
}

/** Regenerate a strategy (new version) */
export function useRegenerateStrategy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => strategyApi.regenerate(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: STRATEGY_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: STRATEGY_KEYS.lists() });
      toast.success('Strategy regenerated! Previous version saved.');
    },
    onError: (error: unknown) => {
      const message =
        (error as { message?: string })?.message ||
        'Failed to regenerate strategy.';
      toast.error(message);
    },
  });
}

/** Update strategy title and/or content */
export function useUpdateStrategy(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateStrategyPayload) => strategyApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STRATEGY_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: STRATEGY_KEYS.lists() });
      toast.success('Strategy saved successfully!');
    },
    onError: (error: unknown) => {
      const message =
        (error as { message?: string })?.message ||
        'Failed to save strategy.';
      toast.error(message);
    },
  });
}

/** Delete a strategy */
export function useDeleteStrategy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => strategyApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STRATEGY_KEYS.lists() });
      toast.success('Strategy deleted successfully.');
    },
    onError: (error: unknown) => {
      const message =
        (error as { message?: string })?.message ||
        'Failed to delete strategy.';
      toast.error(message);
    },
  });
}
