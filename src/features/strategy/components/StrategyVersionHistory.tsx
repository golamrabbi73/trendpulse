'use client';

import * as React from 'react';
import { FiClock, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';
import { StrategyVersion } from '../types/strategy.types';
import { formatDistanceToNow, format } from 'date-fns';

interface StrategyVersionHistoryProps {
  versions: StrategyVersion[];
  currentVersion: number;
  onSelectVersion?: (version: StrategyVersion) => void;
}

export function StrategyVersionHistory({
  versions,
  currentVersion,
  onSelectVersion,
}: StrategyVersionHistoryProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const sorted = [...versions].sort(
    (a, b) => b.versionNumber - a.versionNumber,
  );

  if (sorted.length <= 1) return null;

  return (
    <div className="rounded-xl border bg-card">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
      >
        <div className="flex items-center gap-2">
          <FiClock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            Version History ({sorted.length} versions)
          </span>
        </div>
        {isExpanded ? (
          <FiChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <FiChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t px-4 pb-4">
          <div className="relative mt-4 space-y-0">
            {sorted.map((version, index) => {
              const isCurrent = version.versionNumber === currentVersion;
              const isLast = index === sorted.length - 1;

              return (
                <div key={version.versionNumber} className="relative flex gap-3">
                  {/* Timeline line */}
                  {!isLast && (
                    <div className="absolute left-[7px] top-5 h-full w-px bg-border" />
                  )}
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      'relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2',
                      isCurrent
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground/30 bg-background',
                    )}
                  />
                  {/* Content */}
                  <button
                    type="button"
                    onClick={() => onSelectVersion?.(version)}
                    className={cn(
                      'mb-4 flex-1 rounded-lg border p-3 text-left transition-all',
                      isCurrent
                        ? 'border-primary/30 bg-primary/5'
                        : 'hover:border-primary/20 hover:bg-muted/50',
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          Version {version.versionNumber}
                        </span>
                        {isCurrent && (
                          <Badge variant="default" className="text-[10px] px-1.5 py-0">
                            Current
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        {version.tone}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {format(new Date(version.generatedAt), 'MMM d, yyyy h:mm a')}
                      {' · '}
                      {formatDistanceToNow(new Date(version.generatedAt), {
                        addSuffix: true,
                      })}
                    </p>
                    <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">
                      {version.content.executiveSummary}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
