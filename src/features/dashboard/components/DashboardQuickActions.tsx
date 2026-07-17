import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FiPlus, FiCpu, FiTarget } from 'react-icons/fi';

export function DashboardQuickActions() {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-lg font-semibold tracking-tight">Quick Actions</h2>
      <div className="flex flex-wrap gap-3">
        <Button asChild className="gap-2">
          <Link href="/dashboard/competitors/add">
            <FiPlus className="h-4 w-4" /> Add Competitor
          </Link>
        </Button>
        <Button variant="outline" asChild className="gap-2 bg-background">
          <Link href="/dashboard/audits/new">
            <FiCpu className="h-4 w-4" /> Run AI Audit
          </Link>
        </Button>
        <Button variant="outline" asChild className="gap-2 bg-background">
          <Link href="/dashboard/strategies/new">
            <FiTarget className="h-4 w-4" /> Generate Strategy
          </Link>
        </Button>
      </div>
    </div>
  );
}
