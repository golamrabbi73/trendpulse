import Link from 'next/link';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <EmptyState
        title="Page Not Found"
        description="Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist."
        action={
          <Link 
            href="/" 
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Return Home
          </Link>
        }
      />
    </div>
  );
}
