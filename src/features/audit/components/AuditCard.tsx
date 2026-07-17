import Link from 'next/link';
import { FiFileText, FiClock, FiChevronRight } from 'react-icons/fi';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Audit } from '../types/audit.types';
import { formatDistanceToNow } from 'date-fns';

interface AuditCardProps {
  audit: Audit;
}

export function AuditCard({ audit }: AuditCardProps) {
  return (
    <Card className="group relative transition-all hover:border-primary/50 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FiFileText className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base line-clamp-1 group-hover:text-primary transition-colors">
                {audit.title}
              </CardTitle>
              <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                {audit.fileName}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <FiClock className="h-3.5 w-3.5" />
            {formatDistanceToNow(new Date(audit.createdAt), { addSuffix: true })}
          </div>
          <div className="flex items-center gap-1 font-medium text-primary">
            View Report <FiChevronRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </CardContent>
      <Link href={`/dashboard/audits/${audit._id}`} className="absolute inset-0">
        <span className="sr-only">View {audit.title}</span>
      </Link>
    </Card>
  );
}
