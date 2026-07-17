'use client';

import * as React from 'react';
import Link from 'next/link';
import { use } from 'react';
import { FiArrowLeft, FiFileText, FiCalendar } from 'react-icons/fi';
import { useAudit } from '@/features/audit/hooks/useAudit';
import { AuditVisualizations } from '@/features/audit/components/AuditVisualizations';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface Props {
  params: Promise<{ id: string }>;
}

const tagColorMap: Record<string, string> = {
  strengths: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  weaknesses: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  opportunities: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  threats: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  risks: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  marketGaps: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400',
  recommendations: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
};

function TagList({ items, colorKey }: { items: string[]; colorKey: string }) {
  if (!items || items.length === 0)
    return <p className="text-sm italic text-muted-foreground">None identified.</p>;
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <li
          key={i}
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tagColorMap[colorKey] ?? 'bg-muted text-muted-foreground'}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function SectionSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-40" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </CardContent>
    </Card>
  );
}

export default function AuditDetailsPage({ params }: Props) {
  const { id } = use(params);
  const { data: audit, isLoading, isError, error } = useAudit(id);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  if (isError) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <Link
          href="/dashboard/audits"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <FiArrowLeft className="h-4 w-4" /> Back to Audits
        </Link>
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-8 text-center">
          <p className="font-semibold text-destructive">Audit report not found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {(error as { message?: string })?.message || 'This report may have been deleted.'}
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/dashboard/audits">Go back</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/dashboard/audits"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to Audits
        </Link>
      </div>

      {/* Title Card */}
      <Card>
        <CardHeader>
          {isLoading ? (
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FiFileText className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-xl">{audit?.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{audit?.fileName}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <FiCalendar className="h-3.5 w-3.5" />
                  {audit?.createdAt && formatDate(audit.createdAt)}
                </div>
              </div>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Visualization */}
      {isLoading ? (
        <SectionSkeleton />
      ) : audit?.insights ? (
        <AuditVisualizations insights={audit.insights} />
      ) : null}

      {/* Executive Summary */}
      {isLoading ? (
        <SectionSkeleton />
      ) : audit?.insights?.executiveSummary ? (
        <Card>
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {audit.insights.executiveSummary}
            </p>
          </CardContent>
        </Card>
      ) : null}

      {/* SWOT Analysis */}
      {isLoading ? (
        <SectionSkeleton />
      ) : audit?.insights?.swotAnalysis ? (
        <Card>
          <CardHeader>
            <CardTitle>SWOT Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Strengths
                </h4>
                <TagList items={audit.insights.swotAnalysis.strengths} colorKey="strengths" />
              </div>
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Weaknesses
                </h4>
                <TagList items={audit.insights.swotAnalysis.weaknesses} colorKey="weaknesses" />
              </div>
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Opportunities
                </h4>
                <TagList
                  items={audit.insights.swotAnalysis.opportunities}
                  colorKey="opportunities"
                />
              </div>
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Threats
                </h4>
                <TagList items={audit.insights.swotAnalysis.threats} colorKey="threats" />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Pricing Analysis */}
      {isLoading ? (
        <SectionSkeleton />
      ) : audit?.insights?.pricingAnalysis ? (
        <Card>
          <CardHeader>
            <CardTitle>Pricing Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {audit.insights.pricingAnalysis}
            </p>
          </CardContent>
        </Card>
      ) : null}

      {/* Market Gaps */}
      {isLoading ? (
        <SectionSkeleton />
      ) : audit?.insights?.marketGaps && audit.insights.marketGaps.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Market Gaps</CardTitle>
          </CardHeader>
          <CardContent>
            <TagList items={audit.insights.marketGaps} colorKey="marketGaps" />
          </CardContent>
        </Card>
      ) : null}

      {/* Risks */}
      {isLoading ? (
        <SectionSkeleton />
      ) : audit?.insights?.risks && audit.insights.risks.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <TagList items={audit.insights.risks} colorKey="risks" />
          </CardContent>
        </Card>
      ) : null}

      {/* Recommendations */}
      {isLoading ? (
        <SectionSkeleton />
      ) : audit?.insights?.recommendations && audit.insights.recommendations.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {audit.insights.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed text-muted-foreground">{rec}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
