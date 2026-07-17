'use client';

import * as React from 'react';
import Link from 'next/link';
import { use } from 'react';
import {
  FiArrowLeft,
  FiEdit2,
  FiGlobe,
  FiCalendar,
  FiUser,
  FiTrash2,
} from 'react-icons/fi';
import { useCompetitor, useDeleteCompetitor } from '@/features/competitor/hooks/useCompetitor';
import { MarketPositionBadge } from '@/features/competitor/components/MarketPositionBadge';
import { DeleteConfirmModal } from '@/features/competitor/components/DeleteConfirmModal';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useRouter } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default function CompetitorDetailsPage({ params }: Props) {
  const { id } = use(params);
  const { data: competitor, isLoading, isError, error } = useCompetitor(id);
  const { mutate: deleteCompetitor, isPending: isDeleting } = useDeleteCompetitor();
  const currentUser = useAuthStore((s) => s.user);
  const router = useRouter();
  const [showDelete, setShowDelete] = React.useState(false);

  const isOwner = React.useMemo(() => {
    if (!competitor || !currentUser) return false;
    const cb = competitor.createdBy;
    if (typeof cb === 'string') return cb === currentUser.id;
    return cb._id === currentUser.id;
  }, [competitor, currentUser]);

  const handleDelete = () => {
    deleteCompetitor(id, {
      onSuccess: () => {
        router.push('/dashboard/competitors');
      },
      onSettled: () => setShowDelete(false),
    });
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  // Error state
  if (isError) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          href="/dashboard/competitors"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <FiArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-8 text-center">
          <p className="font-semibold text-destructive">Competitor not found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {(error as { message?: string })?.message || 'This competitor may have been deleted.'}
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/dashboard/competitors">Go back</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back + Actions */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/dashboard/competitors"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to Competitors
        </Link>

        {!isLoading && isOwner && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/competitors/${id}/edit`} className="gap-2">
                <FiEdit2 className="h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDelete(true)}
              className="gap-2"
            >
              <FiTrash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Main card */}
      <Card>
        <CardHeader className="pb-4">
          {isLoading ? (
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              {/* Logo */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-muted">
                {competitor?.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={competitor.logoUrl}
                    alt={`${competitor.name} logo`}
                    className="h-full w-full object-contain p-1"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-lg font-bold text-muted-foreground">
                    {competitor?.name
                      .split(' ')
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <CardTitle className="text-2xl">{competitor?.name}</CardTitle>
                {competitor?.industry && (
                  <p className="text-sm text-muted-foreground">{competitor.industry}</p>
                )}
                {competitor?.marketPosition && (
                  <MarketPositionBadge position={competitor.marketPosition} />
                )}
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Meta row */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
              </>
            ) : (
              <>
                {competitor?.website && (
                  <a
                    href={competitor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-foreground"
                  >
                    <FiGlobe className="h-4 w-4" />
                    {competitor.website.replace(/^https?:\/\//, '')}
                  </a>
                )}
                {competitor?.createdAt && (
                  <span className="flex items-center gap-1.5">
                    <FiCalendar className="h-4 w-4" />
                    Added {formatDate(competitor.createdAt)}
                  </span>
                )}
                {competitor?.createdBy && typeof competitor.createdBy !== 'string' && (
                  <span className="flex items-center gap-1.5">
                    <FiUser className="h-4 w-4" />
                    By {competitor.createdBy.name}
                  </span>
                )}
              </>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Description
            </h3>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            ) : competitor?.description ? (
              <p className="text-sm leading-relaxed">{competitor.description}</p>
            ) : (
              <p className="text-sm italic text-muted-foreground">No description provided.</p>
            )}
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Strengths */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Strengths
              </h3>
              {isLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-28 rounded-full" />
                  ))}
                </div>
              ) : competitor?.strengths?.length ? (
                <ul className="flex flex-wrap gap-2">
                  {competitor.strengths.map((s, i) => (
                    <li
                      key={i}
                      className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm italic text-muted-foreground">None listed.</p>
              )}
            </div>

            {/* Weaknesses */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Weaknesses
              </h3>
              {isLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-28 rounded-full" />
                  ))}
                </div>
              ) : competitor?.weaknesses?.length ? (
                <ul className="flex flex-wrap gap-2">
                  {competitor.weaknesses.map((w, i) => (
                    <li
                      key={i}
                      className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    >
                      {w}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm italic text-muted-foreground">None listed.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete confirmation */}
      <DeleteConfirmModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        isPending={isDeleting}
        competitorName={competitor?.name}
      />
    </div>
  );
}
