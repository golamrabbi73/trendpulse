'use client';

import * as React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { MARKET_POSITIONS } from '../schemas/competitor.schema';
import { GetCompetitorsParams } from '../types/competitor.types';

interface Props {
  params: GetCompetitorsParams;
  onChange: (next: Partial<GetCompetitorsParams>) => void;
  onReset: () => void;
}

export function CompetitorFilters({ params, onChange, onReset }: Props) {
  const hasFilters = !!(params.search || params.industry || params.marketPosition);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative min-w-[200px] flex-1">
        <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="competitor-search"
          placeholder="Search competitors…"
          value={params.search ?? ''}
          onChange={(e) => onChange({ search: e.target.value, page: 1 })}
          className="pl-9"
        />
      </div>

      {/* Industry */}
      <Input
        id="competitor-industry"
        placeholder="Filter by industry"
        value={params.industry ?? ''}
        onChange={(e) => onChange({ industry: e.target.value, page: 1 })}
        className="min-w-[160px] flex-1 sm:flex-none"
      />

      {/* Market Position */}
      <Select
        id="competitor-market-position"
        value={params.marketPosition ?? ''}
        onChange={(e) => onChange({ marketPosition: e.target.value || undefined, page: 1 })}
        className="min-w-[160px] flex-1 sm:flex-none"
      >
        <option value="">All Positions</option>
        {MARKET_POSITIONS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </Select>

      {/* Sort */}
      <Select
        id="competitor-sort"
        value={`${params.sortBy ?? 'createdAt'}-${params.sortOrder ?? 'desc'}`}
        onChange={(e) => {
          const [sortBy, sortOrder] = e.target.value.split('-') as [string, 'asc' | 'desc'];
          onChange({ sortBy, sortOrder, page: 1 });
        }}
        className="min-w-[160px] flex-1 sm:flex-none"
      >
        <option value="createdAt-desc">Newest First</option>
        <option value="createdAt-asc">Oldest First</option>
        <option value="name-asc">Name A–Z</option>
        <option value="name-desc">Name Z–A</option>
        <option value="marketPosition-asc">Position A–Z</option>
      </Select>

      {/* Reset */}
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onReset} className="gap-1">
          <FiX className="h-4 w-4" /> Clear
        </Button>
      )}
    </div>
  );
}
