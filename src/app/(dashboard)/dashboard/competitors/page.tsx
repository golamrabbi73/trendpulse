'use client';

import * as React from 'react';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import { useCompetitors } from '@/features/competitor/hooks/useCompetitor';
import { CompetitorCard } from '@/features/competitor/components/CompetitorCard';
import { CompetitorCardSkeleton } from '@/features/competitor/components/CompetitorCardSkeleton';
import { CompetitorFilters } from '@/features/competitor/components/CompetitorFilters';
import { Pagination } from '@/features/competitor/components/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { GetCompetitorsParams } from '@/features/competitor/types/competitor.types';
import { FiUsers } from 'react-icons/fi';

const DEFAULT_PARAMS: GetCompetitorsParams = {
  page: 1,
  limit: 12,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export default function CompetitorsExplorePage() {
  const [params, setParams] = React.useState<GetCompetitorsParams>(DEFAULT_PARAMS);

  const { data, isLoading, isError, error } = useCompetitors(params);

  const handleParamChange = (next: Partial<GetCompetitorsParams>) => {
    setParams((prev) => ({ ...prev, ...next }));
  };

  const handleReset = () => setParams(DEFAULT_PARAMS);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Explore Competitors</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse and discover all tracked competitors on the platform.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/competitors/add" className="gap-2">
            <FiPlus className="h-4 w-4" />
            Add Competitor
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <CompetitorFilters params={params} onChange={handleParamChange} onReset={handleReset} />

      {/* Error */}
      {isError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
          <p className="text-sm font-medium text-destructive">
            {(error as { message?: string })?.message || 'Failed to load competitors.'}
          </p>
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <CompetitorCardSkeleton key={i} />
          ))}
        </div>
      ) : data?.results.length === 0 ? (
        <EmptyState
          icon={<FiUsers className="h-10 w-10 text-muted-foreground" />}
          title="No competitors found"
          description={
            params.search || params.industry || params.marketPosition
              ? 'Try adjusting your filters or search terms.'
              : 'Be the first to add a competitor to the platform.'
          }
          action={
            <Button asChild>
              <Link href="/dashboard/competitors/add">
                <FiPlus className="mr-2 h-4 w-4" />
                Add First Competitor
              </Link>
            </Button>
          }
        />
      ) : (
        <>
          {/* Total count */}
          {data?.pagination && (
            <p className="text-sm text-muted-foreground">
              Showing{' '}
              <span className="font-medium text-foreground">{data.results.length}</span> of{' '}
              <span className="font-medium text-foreground">{data.pagination.total}</span>{' '}
              competitors
            </p>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.results.map((competitor) => (
              <CompetitorCard key={competitor._id} competitor={competitor} />
            ))}
          </div>

          {data?.pagination && (
            <Pagination
              page={data.pagination.page}
              totalPages={data.pagination.totalPages}
              onPageChange={(page) => handleParamChange({ page })}
            />
          )}
        </>
      )}
    </div>
  );
}
