'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FiArrowLeft,
  FiRefreshCw,
  FiEdit3,
  FiTrash2,
  FiLayers,
} from 'react-icons/fi';
import {
  useStrategy,
  useRegenerateStrategy,
  useUpdateStrategy,
  useDeleteStrategy,
} from '@/features/strategy/hooks/useStrategy';
import { StrategyContentDisplay, contentToMarkdown } from '@/features/strategy/components/StrategyContentDisplay';
import { StrategyVersionHistory } from '@/features/strategy/components/StrategyVersionHistory';
import { StrategyEditor } from '@/features/strategy/components/StrategyEditor';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { Modal } from '@/components/ui/Modal';
import { StrategyContent, StrategyVersion } from '@/features/strategy/types/strategy.types';
import { formatDistanceToNow } from 'date-fns';

const toneColors: Record<string, string> = {
  Aggressive: 'bg-red-500/10 text-red-600 border-red-200 dark:text-red-400 dark:border-red-800',
  Defensive: 'bg-blue-500/10 text-blue-600 border-blue-200 dark:text-blue-400 dark:border-blue-800',
  Growth: 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:text-emerald-400 dark:border-emerald-800',
  Creative: 'bg-purple-500/10 text-purple-600 border-purple-200 dark:text-purple-400 dark:border-purple-800',
  Balanced: 'bg-amber-500/10 text-amber-600 border-amber-200 dark:text-amber-400 dark:border-amber-800',
};

export default function StrategyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: strategy, isLoading, isError, error } = useStrategy(id);
  const regenerateMutation = useRegenerateStrategy();
  const updateMutation = useUpdateStrategy(id);
  const deleteMutation = useDeleteStrategy();

  const [isEditing, setIsEditing] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [viewingVersion, setViewingVersion] = React.useState<StrategyVersion | null>(null);

  const displayContent = viewingVersion?.content ?? strategy?.currentContent;

  const handleRegenerate = () => {
    regenerateMutation.mutate(id, {
      onSuccess: () => {
        setViewingVersion(null);
      },
    });
  };

  const handleSave = (content: StrategyContent) => {
    updateMutation.mutate(
      { currentContent: content },
      {
        onSuccess: () => {
          setIsEditing(false);
          setViewingVersion(null);
        },
      },
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        router.push('/dashboard/strategies');
      },
    });
  };

  const handleExportMarkdown = () => {
    if (!displayContent || !strategy) return;
    const md = contentToMarkdown(displayContent);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${strategy.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_strategy.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportPdf = () => {
    window.print();
  };

  const handleSelectVersion = (version: StrategyVersion) => {
    if (version.versionNumber === strategy?.currentVersion) {
      setViewingVersion(null);
    } else {
      setViewingVersion(version);
      setIsEditing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-md" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-6 space-y-3">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/strategies">
              <FiArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Strategy Not Found</h1>
        </div>
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
          <p className="text-sm font-medium text-destructive">
            {(error as { message?: string })?.message || 'Failed to load strategy.'}
          </p>
        </div>
      </div>
    );
  }

  if (!strategy) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" className="mt-0.5 shrink-0" asChild>
            <Link href="/dashboard/strategies">
              <FiArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{strategy.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge
                className={toneColors[strategy.tone] || ''}
                variant="outline"
              >
                {strategy.tone}
              </Badge>
              <Badge variant="secondary">
                {strategy.outputLength}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <FiLayers className="h-3 w-3" />
                v{strategy.currentVersion}
              </span>
              <span className="text-xs text-muted-foreground">
                · Created{' '}
                {formatDistanceToNow(new Date(strategy.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
          {!isEditing && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsEditing(true);
                  setViewingVersion(null);
                }}
                className="gap-1.5"
              >
                <FiEdit3 className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerate}
                disabled={regenerateMutation.isPending}
                className="gap-1.5"
              >
                <FiRefreshCw
                  className={`h-3.5 w-3.5 ${regenerateMutation.isPending ? 'animate-spin' : ''}`}
                />
                {regenerateMutation.isPending ? 'Regenerating...' : 'Regenerate'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteModal(true)}
                className="gap-1.5 text-destructive hover:text-destructive"
              >
                <FiTrash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Viewing old version banner */}
      {viewingVersion && !isEditing && (
        <div className="flex items-center justify-between gap-4 rounded-lg border border-blue-200 bg-blue-50/50 p-3 dark:border-blue-800 dark:bg-blue-950/30">
          <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Viewing Version {viewingVersion.versionNumber} (
            {viewingVersion.tone} · {viewingVersion.outputLength})
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewingVersion(null)}
          >
            View Current
          </Button>
        </div>
      )}

      {/* Regenerating indicator */}
      {regenerateMutation.isPending && (
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3 rounded-lg border bg-primary/5 p-4">
            <div className="relative">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary">
                Regenerating strategy...
              </p>
              <p className="text-xs text-muted-foreground">
                A new version is being generated. Your current version will be preserved.
              </p>
            </div>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full w-1/3 rounded-full bg-primary"
              style={{ animation: 'indeterminate 1.5s ease-in-out infinite' }}
            />
          </div>
        </div>
      )}

      {/* Version History */}
      {strategy.versions && strategy.versions.length > 1 && (
        <StrategyVersionHistory
          versions={strategy.versions}
          currentVersion={strategy.currentVersion}
          onSelectVersion={handleSelectVersion}
        />
      )}

      {/* Content */}
      {isEditing && displayContent ? (
        <StrategyEditor
          content={displayContent}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          isSaving={updateMutation.isPending}
        />
      ) : displayContent ? (
        <StrategyContentDisplay
          content={displayContent}
          onExportMarkdown={handleExportMarkdown}
          onExportPdf={handleExportPdf}
        />
      ) : null}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Strategy?"
        description="This action cannot be undone. All versions of this strategy will be permanently deleted."
        footer={
          <>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
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
          Are you sure you want to delete &ldquo;{strategy.title}&rdquo;? This
          will remove all generated content and version history.
        </p>
      </Modal>
    </div>
  );
}
