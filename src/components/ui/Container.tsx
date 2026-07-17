import * as React from 'react';
import { cn } from '@/utils/cn';

const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('container mx-auto px-4 md:px-8', className)}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';

const Section = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn('py-8 md:py-12 lg:py-16', className)}
        {...props}
      />
    );
  }
);
Section.displayName = 'Section';

export { Container, Section };
