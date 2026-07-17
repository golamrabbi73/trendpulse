'use client';

import * as React from 'react';
import Link from 'next/link';
import { FiExternalLink, FiGlobe } from 'react-icons/fi';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Competitor } from '../types/competitor.types';
import { MarketPositionBadge } from './MarketPositionBadge';

interface Props {
  competitor: Competitor;
}

export function CompetitorCard({ competitor }: Props) {
  const initials = competitor.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          {/* Logo / Avatar */}
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border bg-muted">
            {competitor.logoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={competitor.logoUrl}
                alt={`${competitor.name} logo`}
                className="h-full w-full object-contain p-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-sm font-bold text-muted-foreground">
                {initials}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <CardTitle className="truncate text-base">{competitor.name}</CardTitle>
            {competitor.industry && (
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{competitor.industry}</p>
            )}
          </div>
        </div>

        {competitor.marketPosition && (
          <MarketPositionBadge position={competitor.marketPosition} className="mt-2 self-start" />
        )}
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        {competitor.description ? (
          <p className="line-clamp-3 text-sm text-muted-foreground">{competitor.description}</p>
        ) : (
          <p className="text-sm italic text-muted-foreground">No description provided.</p>
        )}
      </CardContent>

      <CardFooter className="justify-between gap-2 border-t pt-3">
        {/* Website */}
        {competitor.website && (
          <a
            href={competitor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <FiGlobe className="h-3 w-3" />
            <span className="max-w-[120px] truncate">
              {competitor.website.replace(/^https?:\/\//, '')}
            </span>
          </a>
        )}

        <Link
          href={`/dashboard/competitors/${competitor._id}`}
          className="ml-auto flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:underline"
        >
          View Details <FiExternalLink className="h-3 w-3" />
        </Link>
      </CardFooter>
    </Card>
  );
}
