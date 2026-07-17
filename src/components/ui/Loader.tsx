import * as React from 'react';
import { cn } from '@/utils/cn';
import { FiLoader } from 'react-icons/fi';

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'lg' | 'xl';
  fullScreen?: boolean;
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, size = 'default', fullScreen = false, ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-4 w-4 text-primary',
      default: 'h-8 w-8 text-primary',
      lg: 'h-12 w-12 text-primary',
      xl: 'h-16 w-16 text-primary',
    };

    const loaderElement = (
      <div ref={ref} className={cn('flex items-center justify-center', className)} {...props}>
        <FiLoader className={cn('animate-spin', sizeClasses[size])} />
      </div>
    );

    if (fullScreen) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          {loaderElement}
        </div>
      );
    }

    return loaderElement;
  }
);
Loader.displayName = 'Loader';

export { Loader };
