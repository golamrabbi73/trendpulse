'use client';

import * as React from 'react';
import Link from 'next/link';
import { FiEdit2, FiTrash2, FiPlus, FiExternalLink } from 'react-icons/fi';
import { useCompetitors, useDeleteCompetitor } from '@/features/competitor/hooks/useCompetitor';
import { CompetitorFilters } from '@/features/competitor/components/CompetitorFilters';
import { MarketPositionBadge } from '@/features/competitor/components/MarketPositionBadge';
import { DeleteConfirmModal } from '@/features/competitor/components/DeleteConfirmModal';
import { Pagination } from '@/features/competitor/components/Pagination';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { GetCompetitorsParams, Competitor } from '@/features/competitor/types/competitor.types';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { FiUsers } from 'react-icons/fi';

const DEFAULT_PARAMS: GetCompetitorsParams = {
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export default function ManageCompetitorsPage() {
  const [params, setParams] = React.useState<GetCompetitorsParams>(DEFAULT_PARAMS);
  const [toDelete, setToDelete] = React.useState<Competitor | null>(null);

  const { data, isLoading, isError, error } = useCompetitors(params);
  const { mutate: deleteCompetitor, isPending: isDeleting } = useDeleteCompetitor();
  const currentUser = useAuthStore((s) => s.user);

  const handleParamChange = (next: Partial<GetCompetitorsParams>) => {
    setParams((prev) => ({ ...prev, ...next }));
  };

  const handleDelete = () => {
    if (!toDelete) return;
    deleteCompetitor(toDelete._id, {
      onSettled: () => setToDelete(null),
    });
  };

  const isOwner = (competitor: Competitor) => {
    const createdBy = competitor.createdBy;
    if (typeof createdBy === 'string') return createdBy === currentUser?.id;
    return createdBy._id === currentUser?.id;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Competitors</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Edit or delete competitors you&apos;ve added to the platform.
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
      <CompetitorFilters
        params={params}
        onChange={handleParamChange}
        onReset={() => setParams(DEFAULT_PARAMS)}
      />

      {/* Error */}
      {isError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
          <p className="text-sm font-medium text-destructive">
            {(error as { message?: string })?.message || 'Failed to load competitors.'}
          </p>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-left font-semibold">Competitor</th>
                <th className="hidden px-4 py-3 text-left font-semibold md:table-cell">Industry</th>
                <th className="hidden px-4 py-3 text-left font-semibold sm:table-cell">Position</th>
                <th className="hidden px-4 py-3 text-left font-semibold lg:table-cell">Website</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-8 w-8 rounded-md" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 md:table-cell">
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="hidden px-4 py-3 sm:table-cell">
                        <Skeleton className="h-5 w-20 rounded-full" />
                      </td>
                      <td className="hidden px-4 py-3 lg:table-cell">
                        <Skeleton className="h-4 w-28" />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton className="ml-auto h-8 w-16" />
                      </td>
                    </tr>
                  ))
                : data?.results.map((c) => {
                    const initials = c.name
                      .split(' ')
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase();

                    return (
                      <tr key={c._id} className="transition-colors hover:bg-muted/30">
                        {/* Name + logo */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted text-xs font-bold text-muted-foreground">
                              {c.logoUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={c.logoUrl}
                                  alt=""
                                  className="h-full w-full object-contain p-0.5"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                              ) : (
                                initials
                              )}
                            </div>
                            <Link
                              href={`/dashboard/competitors/${c._id}`}
                              className="font-medium hover:underline"
                            >
                              {c.name}
                            </Link>
                          </div>
                        </td>

                        <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                          {c.industry || '—'}
                        </td>

                        <td className="hidden px-4 py-3 sm:table-cell">
                          {c.marketPosition ? (
                            <MarketPositionBadge position={c.marketPosition} />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>

                        <td className="hidden px-4 py-3 lg:table-cell">
                          {c.website ? (
                            <a
                              href={c.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                            >
                              <FiExternalLink className="h-3 w-3" />
                              {c.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            {isOwner(c) ? (
                              <>
                                <Button variant="ghost" size="icon" asChild>
                                  <Link
                                    href={`/dashboard/competitors/${c._id}/edit`}
                                    aria-label={`Edit ${c.name}`}
                                  >
                                    <FiEdit2 className="h-4 w-4" />
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => setToDelete(c)}
                                  aria-label={`Delete ${c.name}`}
                                >
                                  <FiTrash2 className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <Button variant="ghost" size="icon" asChild>
                                <Link
                                  href={`/dashboard/competitors/${c._id}`}
                                  aria-label={`View ${c.name}`}
                                >
                                  <FiExternalLink className="h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>

        {/* Empty */}
        {!isLoading && data?.results.length === 0 && (
          <div className="p-6">
            <EmptyState
              icon={<FiUsers className="h-10 w-10 text-muted-foreground" />}
              title="No competitors found"
              description="Add a competitor to start tracking and managing them here."
              action={
                <Button asChild>
                  <Link href="/dashboard/competitors/add">
                    <FiPlus className="mr-2 h-4 w-4" />
                    Add Competitor
                  </Link>
                </Button>
              }
            />
          </div>
        )}
      </div>

      {/* Pagination */}
      {data?.pagination && (
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {data.results.length} of {data.pagination.total} competitors
          </p>
          <Pagination
            page={data.pagination.page}
            totalPages={data.pagination.totalPages}
            onPageChange={(page) => handleParamChange({ page })}
          />
        </div>
      )}

      {/* Delete modal */}
      <DeleteConfirmModal
        isOpen={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={handleDelete}
        isPending={isDeleting}
        competitorName={toDelete?.name}
      />
    </div>
  );
}
