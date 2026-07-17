'use client';

import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { CompetitorForm } from '@/features/competitor/components/CompetitorForm';
import { useCreateCompetitor } from '@/features/competitor/hooks/useCompetitor';
import { CompetitorFormInput } from '@/features/competitor/schemas/competitor.schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export default function AddCompetitorPage() {
  const { mutate: create, isPending } = useCreateCompetitor();

  const handleSubmit = (data: CompetitorFormInput) => {
    create({
      ...data,
      logoUrl: data.logoUrl || undefined,
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Back link */}
      <Link
        href="/dashboard/competitors"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <FiArrowLeft className="h-4 w-4" />
        Back to Competitors
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Add Competitor</CardTitle>
          <CardDescription>
            Fill in the details below to track a new competitor on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompetitorForm
            onSubmit={handleSubmit}
            isPending={isPending}
            submitLabel="Add Competitor"
          />
        </CardContent>
      </Card>
    </div>
  );
}
