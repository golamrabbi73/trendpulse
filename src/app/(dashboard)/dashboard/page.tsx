'use client';

import React from 'react';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useDashboardStats } from '@/features/dashboard/hooks/useDashboard';
import { DashboardStatsCards } from '@/features/dashboard/components/DashboardStatsCards';
import { DashboardCharts } from '@/features/dashboard/components/DashboardCharts';
import { DashboardRecentItems } from '@/features/dashboard/components/DashboardRecentItems';
import { DashboardQuickActions } from '@/features/dashboard/components/DashboardQuickActions';
import { FiAlertCircle } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';

export default function DashboardHomePage() {
  const user = useAuthStore((s) => s.user);
  const { data: stats, isLoading, isError, refetch } = useDashboardStats();

  if (isError) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <FiAlertCircle className="h-6 w-6" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold">Failed to load dashboard</h2>
          <p className="text-sm text-muted-foreground">There was a problem fetching your statistics.</p>
        </div>
        <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s a high-level overview of your TrendPulse workspace.
        </p>
      </div>

      {/* KPI Cards */}
      <DashboardStatsCards stats={stats} isLoading={isLoading} />

      {/* Quick Actions */}
      <DashboardQuickActions />

      {/* Charts / Data Visualization */}
      <DashboardCharts stats={stats} isLoading={isLoading} />

      {/* Recent Items Lists */}
      <DashboardRecentItems stats={stats} isLoading={isLoading} />
    </div>
  );
}
