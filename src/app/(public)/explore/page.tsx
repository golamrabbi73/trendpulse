'use client';

import * as React from 'react';
import Link from 'next/link';
import { useCompetitors } from '@/features/competitor/hooks/useCompetitor';
import { GetCompetitorsParams, MarketPosition } from '@/features/competitor/types/competitor.types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { FiSearch, FiExternalLink, FiUsers, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const INDUSTRIES = ['Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 'Media', 'Manufacturing', 'Retail', 'Other'];
const MARKET_POSITIONS: MarketPosition[] = ['Leader', 'Challenger', 'Niche Player', 'Visionary', 'Unknown'];
const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Newest First' },
  { value: 'name', label: 'Name A–Z' },
  { value: 'updatedAt', label: 'Recently Updated' },
];

const positionColors: Record<MarketPosition, string> = {
  Leader: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Challenger: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'Niche Player': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Visionary: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Unknown: 'bg-muted text-muted-foreground',
};

function CompetitorSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-3.5 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function ExplorePage() {
  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [industry, setIndustry] = React.useState('');
  const [marketPosition, setMarketPosition] = React.useState('');
  const [sortBy, setSortBy] = React.useState('createdAt');
  const [page, setPage] = React.useState(1);
  const LIMIT = 12;

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset to page 1 on filter change is now handled in onChange handlers.

  const params: GetCompetitorsParams = {
    page,
    limit: LIMIT,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(industry && { industry }),
    ...(marketPosition && { marketPosition }),
    sortBy,
    sortOrder: 'desc',
  };

  const { data, isLoading, isError } = useCompetitors(params);
  const competitors = data?.results ?? [];
  const pagination = data?.pagination;

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto px-4 lg:px-6 py-10">
          <h1 className="text-3xl font-bold tracking-tight">Explore Competitors</h1>
          <p className="mt-2 text-muted-foreground">
            Browse and discover competitors across all industries tracked on TrendPulse AI.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or website..."
              className="pl-9"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Select
            value={industry}
            onChange={(e) => {
              setIndustry(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-44"
          >
            <option value="">All Industries</option>
            {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
          </Select>
          <Select
            value={marketPosition}
            onChange={(e) => {
              setMarketPosition(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-48"
          >
            <option value="">All Positions</option>
            {MARKET_POSITIONS.map((pos) => <option key={pos} value={pos}>{pos}</option>)}
          </Select>
          <Select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-48"
          >
            {SORT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </Select>
        </div>

        {/* Results count */}
        {!isLoading && !isError && (
          <p className="text-sm text-muted-foreground mb-6">
            Showing {competitors.length} of {pagination?.total ?? 0} competitors
          </p>
        )}

        {/* Grid */}
        {isError ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-muted-foreground">Failed to load competitors.</p>
            <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {isLoading
              ? Array.from({ length: LIMIT }).map((_, i) => <CompetitorSkeleton key={i} />)
              : competitors.length === 0
              ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20 gap-3">
                  <FiUsers className="h-10 w-10 text-muted-foreground/40" />
                  <p className="text-muted-foreground text-sm">No competitors found matching your criteria.</p>
                  <Button variant="outline" onClick={() => { setSearch(''); setIndustry(''); setMarketPosition(''); }}>
                    Clear filters
                  </Button>
                </div>
              )
              : competitors.map((c) => (
                <Link key={c._id} href={`/explore/${c._id}`} className="group">
                  <Card className="h-full transition-shadow hover:shadow-md group-hover:border-border/80">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-lg font-bold uppercase">
                          {c.name.charAt(0)}
                        </div>
                        <a
                          href={c.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <FiExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <CardTitle className="text-base mt-3">{c.name}</CardTitle>
                      {c.website && (
                        <CardDescription className="text-xs truncate">{c.website.replace(/^https?:\/\//, '')}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      {c.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{c.description}</p>
                      )}
                      <div className="flex flex-wrap gap-1.5">
                        {c.industry && (
                          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                            {c.industry}
                          </span>
                        )}
                        {c.marketPosition && (
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${positionColors[c.marketPosition]}`}>
                            {c.marketPosition}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            }
          </div>
        )}

        {/* Pagination */}
        {!isLoading && pagination && pagination.totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              <FiChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(5, pagination.totalPages) }).map((_, i) => {
              const pageNum = Math.max(1, Math.min(pagination.totalPages - 4, page - 2)) + i;
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPage(pageNum)}
                  className="w-8"
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page >= pagination.totalPages}
            >
              <FiChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
