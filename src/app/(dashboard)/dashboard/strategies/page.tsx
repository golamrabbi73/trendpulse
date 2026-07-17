'use client';

import Link from 'next/link';
import { FiPlus, FiCpu } from 'react-icons/fi';
import { useStrategies, useDeleteStrategy } from '@/features/strategy/hooks/useStrategy';
import { StrategyCard } from '@/features/strategy/components/StrategyCard';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { Modal } from '@/components/ui/Modal';
import * as React from 'react';

export default function StrategiesPage() {
  const { data: strategies, isLoading, isError, error } = useStrategies();
  const deleteMutation = useDeleteStrategy();
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const handleDelete = () => {
    if (!deleteId) return;
    deleteMutation.mutate(deleteId, {
      onSettled: () => setDeleteId(null),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Strategy Generator</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate AI-powered marketing strategies from your competitor audits.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/strategies/new" className="gap-2">
            <FiPlus className="h-4 w-4" />
            New Strategy
          </Link>
        </Button>
      </div>

      {/* Error */}
      {isError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
          <p className="text-sm font-medium text-destructive">
            {(error as { message?: string })?.message || 'Failed to load strategies.'}
          </p>
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
              <div className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : strategies?.length === 0 ? (
        <EmptyState
          icon={<FiCpu className="h-10 w-10 text-muted-foreground" />}
          title="No strategies yet"
          description="Generate your first AI strategy by selecting a competitor audit and choosing your preferred tone."
          action={
            <Button asChild>
              <Link href="/dashboard/strategies/new">
                <FiPlus className="mr-2 h-4 w-4" />
                Generate Strategy
              </Link>
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {strategies?.map((strategy) => (
            <StrategyCard
              key={strategy._id}
              strategy={strategy}
              onDelete={(id) => setDeleteId(id)}
              isDeleting={deleteMutation.isPending}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Strategy?"
        description="This action cannot be undone. All versions of this strategy will be permanently deleted."
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </>
        }
      >
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete this strategy? This will remove all generated content and version history.
        </p>
      </Modal>
    </div>
  );
}
