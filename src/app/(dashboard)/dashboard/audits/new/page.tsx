'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';
import { useGenerateAudit } from '@/features/audit/hooks/useAudit';
import { AuditUploadForm } from '@/features/audit/components/AuditUploadForm';
import { GenerateAuditInput } from '@/features/audit/schemas/audit.schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export default function NewAuditPage() {
  const router = useRouter();
  const [progress, setProgress] = React.useState(0);
  const { mutate: generate, isPending } = useGenerateAudit();

  const handleSubmit = (data: GenerateAuditInput) => {
    setProgress(0);
    generate(
      { data, onProgress: setProgress },
      {
        onSuccess: (audit) => {
          router.push(`/dashboard/audits/${audit._id}`);
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Back link */}
      <Link
        href="/dashboard/audits"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <FiArrowLeft className="h-4 w-4" />
        Back to Audits
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Generate AI Audit</CardTitle>
          <CardDescription>
            Upload a competitor&apos;s financial report, SEC filing, or article. Our AI will analyze it and extract actionable insights.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuditUploadForm
            onSubmit={handleSubmit}
            isPending={isPending}
            progress={progress}
          />
        </CardContent>
      </Card>
    </div>
  );
}
