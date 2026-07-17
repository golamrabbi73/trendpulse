'use client';

import Link from 'next/link';
import { FiUsers, FiPlus, FiList, FiCpu } from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useCompetitors } from '@/features/competitor/hooks/useCompetitor';
import { useAudits } from '@/features/audit/hooks/useAudit';

export default function DashboardHomePage() {
  const user = useAuthStore((s) => s.user);
  const { data: competitorData } = useCompetitors({ page: 1, limit: 1 });
  const { data: audits } = useAudits();

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s a quick overview of your TrendPulse workspace.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Competitors
              </CardTitle>
              <FiUsers className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {competitorData?.pagination.total ?? '—'}
            </p>
            <CardDescription className="mt-1">Tracked on the platform</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                AI Audit Reports
              </CardTitle>
              <FiCpu className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{audits?.length ?? '—'}</p>
            <CardDescription className="mt-1">Reports generated</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/dashboard/competitors/add" className="gap-2">
              <FiPlus className="h-4 w-4" /> Add Competitor
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/competitors" className="gap-2">
              <FiUsers className="h-4 w-4" /> Explore Competitors
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/competitors/manage" className="gap-2">
              <FiList className="h-4 w-4" /> Manage Competitors
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/audits/new" className="gap-2">
              <FiCpu className="h-4 w-4" /> New AI Audit
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
