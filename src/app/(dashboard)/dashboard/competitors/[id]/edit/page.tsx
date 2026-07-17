'use client';

import Link from 'next/link';
import { use } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useCompetitor, useUpdateCompetitor } from '@/features/competitor/hooks/useCompetitor';
import { CompetitorForm } from '@/features/competitor/components/CompetitorForm';
import { CompetitorFormInput } from '@/features/competitor/schemas/competitor.schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useRouter } from 'next/navigation';
import * as React from 'react';

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditCompetitorPage({ params }: Props) {
  const { id } = use(params);
  const { data: competitor, isLoading, isError } = useCompetitor(id);
  const { mutate: update, isPending } = useUpdateCompetitor(id);
  const currentUser = useAuthStore((s) => s.user);
  const router = useRouter();

  const isOwner = React.useMemo(() => {
    if (!competitor || !currentUser) return false;
    const cb = competitor.createdBy;
    if (typeof cb === 'string') return cb === currentUser.id;
    return cb._id === currentUser.id;
  }, [competitor, currentUser]);

  // Redirect non-owners
  React.useEffect(() => {
    if (!isLoading && competitor && !isOwner) {
      router.replace(`/dashboard/competitors/${id}`);
    }
  }, [isLoading, competitor, isOwner, id, router]);

  const handleSubmit = (data: CompetitorFormInput) => {
    update({
      ...data,
      logoUrl: data.logoUrl || undefined,
    });
  };

  if (isError) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Link
          href="/dashboard/competitors"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <FiArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-8 text-center">
          <p className="font-semibold text-destructive">Competitor not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href={`/dashboard/competitors/${id}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <FiArrowLeft className="h-4 w-4" />
        Back to Details
      </Link>

      <Card>
        <CardHeader>
          {isLoading ? (
            <>
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-64 mt-2" />
            </>
          ) : (
            <>
              <CardTitle>Edit Competitor</CardTitle>
              <CardDescription>Update the details for {competitor?.name}.</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <CompetitorForm
              initialData={competitor}
              onSubmit={handleSubmit}
              isPending={isPending}
              submitLabel="Update Competitor"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
