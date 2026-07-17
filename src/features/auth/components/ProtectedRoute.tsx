'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/auth.store';
import { Loader } from '@/components/ui/Loader';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isMounted, setIsMounted] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isMounted, router]);

  if (!isMounted || !isAuthenticated) {
    return <Loader fullScreen size="lg" />;
  }

  return <>{children}</>;
}
