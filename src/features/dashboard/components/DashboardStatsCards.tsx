import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { FiUsers, FiCpu, FiTarget, FiActivity } from 'react-icons/fi';
import { DashboardStats } from '../types/dashboard.types';
import { Skeleton } from '@/components/ui/Skeleton';

interface DashboardStatsCardsProps {
  stats?: DashboardStats;
  isLoading: boolean;
}

export function DashboardStatsCards({ stats, isLoading }: DashboardStatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/4 mt-1" />
              <Skeleton className="h-3 w-3/4 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          <p className="text-3xl font-bold">{stats?.totalCompetitors ?? 0}</p>
          <CardDescription className="mt-1">Tracked in your platform</CardDescription>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              AI Audits
            </CardTitle>
            <FiCpu className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats?.totalAudits ?? 0}</p>
          <CardDescription className="mt-1">Reports generated</CardDescription>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Strategies
            </CardTitle>
            <FiTarget className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats?.totalStrategies ?? 0}</p>
          <CardDescription className="mt-1">Action plans created</CardDescription>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Recent Activity
            </CardTitle>
            <FiActivity className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            {(stats?.recentAudits?.length ?? 0) + (stats?.recentStrategies?.length ?? 0)}
          </p>
          <CardDescription className="mt-1">New items recently</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
