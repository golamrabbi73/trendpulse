'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCompetitor, useCompetitors } from '@/features/competitor/hooks/useCompetitor';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { MarketPosition } from '@/features/competitor/types/competitor.types';
import {
  FiArrowLeft, FiExternalLink, FiTrendingUp, FiTrendingDown,
  FiAlertCircle, FiCheckCircle, FiTarget, FiUsers,
  FiBarChart2, FiCalendar,
} from 'react-icons/fi';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { formatDistanceToNow } from 'date-fns';

const positionColors: Record<MarketPosition, string> = {
  Leader: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Challenger: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'Niche Player': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Visionary: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Unknown: 'bg-muted text-muted-foreground',
};

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="h-48" />
        <Skeleton className="h-48 lg:col-span-2" />
      </div>
    </div>
  );
}

export default function CompetitorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: competitor, isLoading, isError } = useCompetitor(id);
  const { data: relatedData } = useCompetitors({
    industry: competitor?.industry,
    limit: 4,
  });

  const related = relatedData?.results?.filter((c) => c._id !== id).slice(0, 3) ?? [];

  const strengths = competitor?.strengths ?? [];
  const weaknesses = competitor?.weaknesses ?? [];

  // Build simple radar data from strengths/weaknesses count as a proxy
  const radarData = [
    { subject: 'Strengths', value: Math.min(10, strengths.length * 2) },
    { subject: 'Market Fit', value: competitor?.marketPosition === 'Leader' ? 9 : competitor?.marketPosition === 'Challenger' ? 7 : 5 },
    { subject: 'Brand', value: 7 },
    { subject: 'Innovation', value: competitor?.marketPosition === 'Visionary' ? 9 : 6 },
    { subject: 'Risk', value: Math.max(1, 10 - weaknesses.length) },
  ];

  const swotPieData = [
    { name: 'Strengths', value: Math.max(1, strengths.length), color: '#16a34a' },
    { name: 'Weaknesses', value: Math.max(1, weaknesses.length), color: '#e11d48' },
  ];

  if (isLoading) return (
    <div className="container mx-auto px-4 lg:px-6 py-10">
      <DetailSkeleton />
    </div>
  );

  if (isError || !competitor) return (
    <div className="container mx-auto px-4 lg:px-6 py-20 text-center">
      <FiAlertCircle className="mx-auto h-10 w-10 text-muted-foreground/40 mb-4" />
      <h2 className="text-lg font-semibold">Competitor not found</h2>
      <p className="text-muted-foreground text-sm mt-2">This competitor may have been removed.</p>
      <Button variant="outline" asChild className="mt-6">
        <Link href="/explore"><FiArrowLeft className="mr-2 h-4 w-4" /> Back to Explore</Link>
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb + header */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <FiArrowLeft className="h-4 w-4" /> Back to Explore
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-card border text-2xl font-bold uppercase">
                {competitor.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{competitor.name}</h1>
                <a
                  href={competitor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                >
                  {competitor.website.replace(/^https?:\/\//, '')}
                  <FiExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {competitor.industry && (
                <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  {competitor.industry}
                </span>
              )}
              {competitor.marketPosition && (
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${positionColors[competitor.marketPosition]}`}>
                  {competitor.marketPosition}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-8 space-y-8">
        {/* Overview + Key Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {competitor.description || 'No description available for this competitor.'}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</p>
                  <a href={competitor.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate block">
                    {competitor.website}
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Industry</p>
                  <p>{competitor.industry || '—'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Market Position</p>
                  <p>{competitor.marketPosition || '—'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Added</p>
                  <p className="flex items-center gap-1">
                    <FiCalendar className="h-3.5 w-3.5 text-muted-foreground" />
                    {formatDistanceToNow(new Date(competitor.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30">
                    <FiTrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{strengths.length}</p>
                    <p className="text-xs text-muted-foreground">Strengths identified</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30">
                    <FiTrendingDown className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{weaknesses.length}</p>
                    <p className="text-xs text-muted-foreground">Weaknesses identified</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* SWOT Analysis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FiCheckCircle className="h-4 w-4 text-green-500" /> Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              {strengths.length > 0 ? (
                <ul className="space-y-2">
                  {strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 h-4 w-4 rounded-full bg-green-100 text-green-600 text-[10px] flex items-center justify-center font-bold shrink-0">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No strengths recorded.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FiAlertCircle className="h-4 w-4 text-red-500" /> Weaknesses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {weaknesses.length > 0 ? (
                <ul className="space-y-2">
                  {weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 h-4 w-4 rounded-full bg-red-100 text-red-600 text-[10px] flex items-center justify-center font-bold shrink-0">
                        {i + 1}
                      </span>
                      {w}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No weaknesses recorded.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        {(strengths.length > 0 || weaknesses.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FiBarChart2 className="h-4 w-4" /> Competitive Radar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                      <Radar name="Score" dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FiTarget className="h-4 w-4" /> SWOT Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={swotPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={4}>
                        {swotPieData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [value, name]} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-2 text-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-green-600" />
                    <span className="text-muted-foreground">Strengths ({strengths.length})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-600" />
                    <span className="text-muted-foreground">Weaknesses ({weaknesses.length})</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* AI Insights CTA */}
        <Card className="border-dashed">
          <CardContent className="py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">Want deeper AI insights on {competitor.name}?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Run an AI audit to get a full SWOT analysis, pricing gaps, and strategic recommendations.
                </p>
              </div>
              <Button asChild className="shrink-0">
                <Link href="/register">Run AI Audit</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Competitors */}
        {related.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiUsers className="h-5 w-5" /> Related Competitors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((c) => (
                <Link key={c._id} href={`/explore/${c._id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-bold uppercase shrink-0">
                          {c.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{c.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{c.industry || 'Unknown industry'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
