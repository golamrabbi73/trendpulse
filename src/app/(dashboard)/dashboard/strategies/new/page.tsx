'use client';

import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiCpu } from 'react-icons/fi';
import Link from 'next/link';
import { useAudits } from '@/features/audit/hooks/useAudit';
import { useGenerateStrategy } from '@/features/strategy/hooks/useStrategy';
import { StrategyGenerateForm } from '@/features/strategy/components/StrategyGenerateForm';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';

export default function NewStrategyPage() {
  const router = useRouter();
  const { data: audits, isLoading: auditsLoading, isError: auditsError } = useAudits();
  const generateMutation = useGenerateStrategy();

  const handleGenerate = (data: {
    title: string;
    auditId: string;
    tone: 'Aggressive' | 'Defensive' | 'Growth' | 'Creative' | 'Balanced';
    outputLength: 'Short' | 'Medium' | 'Long';
  }) => {
    generateMutation.mutate(data, {
      onSuccess: (strategy) => {
        router.push(`/dashboard/strategies/${strategy._id}`);
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/strategies">
            <FiArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Generate New Strategy</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Select an audit and configure your strategy parameters.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FiCpu className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>AI Strategy Configuration</CardTitle>
                <CardDescription>
                  Choose your audit source, strategy tone, and output length to generate a comprehensive strategy.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {auditsLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-lg" />
                  ))}
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            ) : auditsError ? (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
                <p className="text-sm font-medium text-destructive">
                  Failed to load audits. Please try refreshing.
                </p>
              </div>
            ) : !audits || audits.length === 0 ? (
              <EmptyState
                title="No audits available"
                description="You need to generate at least one competitor audit before creating a strategy."
                action={
                  <Button asChild>
                    <Link href="/dashboard/audits/new">Generate Audit First</Link>
                  </Button>
                }
              />
            ) : (
              <StrategyGenerateForm
                audits={audits}
                onSubmit={handleGenerate}
                isPending={generateMutation.isPending}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
