'use client';

import Link from 'next/link';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { Button } from '@/components/ui/Button';
import { FiTrendingUp } from 'react-icons/fi';

export default function Navbar() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <FiTrendingUp className="h-5 w-5 text-primary" />
          TrendPulse AI
        </Link>

        <nav className="flex items-center gap-3">
          {isAuthenticated ? (
            <Button asChild size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Get started</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
