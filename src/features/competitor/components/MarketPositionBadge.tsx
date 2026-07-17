'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { MarketPosition } from '../types/competitor.types';

const positionStyles: Record<MarketPosition, string> = {
  Leader: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  Challenger: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'Niche Player': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  Visionary: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  Unknown: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

interface Props {
  position?: MarketPosition;
  className?: string;
}

export function MarketPositionBadge({ position, className }: Props) {
  if (!position) return null;
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        positionStyles[position] ?? positionStyles.Unknown,
        className,
      )}
    >
      {position}
    </span>
  );
}
