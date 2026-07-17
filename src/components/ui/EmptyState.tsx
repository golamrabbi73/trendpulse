import * as React from 'react';
import { cn } from '@/utils/cn';
import { FiInbox } from 'react-icons/fi';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title, description, icon, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center animate-in fade-in-50',
          className
        )}
        {...props}
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          {icon || <FiInbox className="h-10 w-10 text-muted-foreground" />}
        </div>
        <h2 className="mt-6 text-xl font-semibold">{title}</h2>
        {description && (
          <p className="mt-2 mb-8 text-center text-sm font-normal leading-6 text-muted-foreground max-w-sm">
            {description}
          </p>
        )}
        {action && <div className="mt-6">{action}</div>}
      </div>
    );
  }
);
EmptyState.displayName = 'EmptyState';

export { EmptyState };
