'use client';

import Link from 'next/link';
import {
  FiCpu,
  FiClock,
  FiChevronRight,
  FiTrash2,
  FiLayers,
} from 'react-icons/fi';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Strategy } from '../types/strategy.types';
import { formatDistanceToNow } from 'date-fns';

interface StrategyCardProps {
  strategy: Strategy;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

const toneColors: Record<string, string> = {
  Aggressive: 'bg-red-500/10 text-red-600 border-red-200 dark:text-red-400 dark:border-red-800',
  Defensive: 'bg-blue-500/10 text-blue-600 border-blue-200 dark:text-blue-400 dark:border-blue-800',
  Growth: 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:text-emerald-400 dark:border-emerald-800',
  Creative: 'bg-purple-500/10 text-purple-600 border-purple-200 dark:text-purple-400 dark:border-purple-800',
  Balanced: 'bg-amber-500/10 text-amber-600 border-amber-200 dark:text-amber-400 dark:border-amber-800',
};

export function StrategyCard({ strategy, onDelete, isDeleting }: StrategyCardProps) {
  return (
    <Card className="group relative transition-all hover:border-primary/50 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FiCpu className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-base line-clamp-1 group-hover:text-primary transition-colors">
                {strategy.title}
              </CardTitle>
              <div className="mt-1 flex items-center gap-2">
                <Badge className={toneColors[strategy.tone] || ''} variant="outline">
                  {strategy.tone}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <FiLayers className="h-3 w-3" />
                  v{strategy.currentVersion}
                </span>
              </div>
            </div>
          </div>
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(strategy._id);
              }}
              disabled={isDeleting}
              className="relative z-10 rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100 disabled:opacity-50"
              aria-label="Delete strategy"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-3 text-xs text-muted-foreground line-clamp-2">
          {strategy.currentContent?.executiveSummary || 'No summary available'}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <FiClock className="h-3.5 w-3.5" />
            {formatDistanceToNow(new Date(strategy.createdAt), { addSuffix: true })}
          </div>
          <div className="flex items-center gap-1 font-medium text-primary">
            View Strategy <FiChevronRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </CardContent>
      <Link href={`/dashboard/strategies/${strategy._id}`} className="absolute inset-0">
        <span className="sr-only">View {strategy.title}</span>
      </Link>
    </Card>
  );
}
