import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DashboardStats } from '../types/dashboard.types';
import { FiChevronRight, FiCpu, FiTarget } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/Skeleton';

interface DashboardRecentItemsProps {
  stats?: DashboardStats;
  isLoading: boolean;
}

export function DashboardRecentItems({ stats, isLoading }: DashboardRecentItemsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between">
              <Skeleton className="h-5 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const recentAudits = stats?.recentAudits || [];
  const recentStrategies = stats?.recentStrategies || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Recent Audits */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold">Recent Audits</CardTitle>
          <Button variant="ghost" size="sm" asChild className="h-8 text-xs">
            <Link href="/dashboard/audits">
              View all <FiChevronRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentAudits.length > 0 ? (
            <div className="space-y-4 mt-2">
              {recentAudits.map((audit) => (
                <div key={audit._id} className="flex items-center gap-4 border-b last:border-0 pb-3 last:pb-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <FiCpu className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1 overflow-hidden">
                    <p className="truncate text-sm font-medium leading-none">
                      {audit.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(audit.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/dashboard/audits/${audit._id}`}>
                      <FiChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No recent audits found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Strategies */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold">Recent Strategies</CardTitle>
          <Button variant="ghost" size="sm" asChild className="h-8 text-xs">
            <Link href="/dashboard/strategies">
              View all <FiChevronRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentStrategies.length > 0 ? (
            <div className="space-y-4 mt-2">
              {recentStrategies.map((strategy) => (
                <div key={strategy._id} className="flex items-center gap-4 border-b last:border-0 pb-3 last:pb-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <FiTarget className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1 overflow-hidden">
                    <p className="truncate text-sm font-medium leading-none">
                      {strategy.title}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground gap-2">
                      <span className="capitalize">{strategy.tone}</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(strategy.createdAt), { addSuffix: true })}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/dashboard/strategies/${strategy._id}`}>
                      <FiChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No recent strategies found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
