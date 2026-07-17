'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import {
  FiTrendingUp,
  FiMenu,
  FiX,
  FiGrid,
  FiUsers,
  FiCpu,
  FiTarget,
  FiLogOut,
  FiBarChart2,
} from 'react-icons/fi';
import { useLogout } from '@/features/auth/hooks/useAuth';

const publicLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const authLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: FiGrid },
  { href: '/dashboard/competitors', label: 'Competitors', icon: FiUsers },
  { href: '/dashboard/audits', label: 'Audits', icon: FiCpu },
  { href: '/dashboard/strategies', label: 'Strategies', icon: FiTarget },
  { href: '/dashboard/audits/new', label: 'New Audit', icon: FiBarChart2 },
];

export default function Navbar() {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const { mutate: logout } = useLogout();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isDashboard = pathname.startsWith('/dashboard');

  if (isDashboard) return null;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <FiTrendingUp className="h-5 w-5 text-primary" />
            <span>TrendPulse AI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-foreground',
                    pathname === link.href
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))
            ) : (
              publicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-foreground',
                    pathname === link.href
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">{user?.name}</span>
                <Button variant="outline" size="sm" onClick={() => logout()}>
                  <FiLogOut className="mr-2 h-3.5 w-3.5" /> Sign out
                </Button>
                <Button size="sm" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">Get started free</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden rounded-md p-2 hover:bg-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="absolute top-16 left-0 right-0 bg-background border-b shadow-lg p-4 space-y-2">
            {(isAuthenticated ? authLinks.map(l => ({ href: l.href, label: l.label })) : publicLinks).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t flex flex-col gap-2">
              {isAuthenticated ? (
                <Button variant="outline" className="w-full" onClick={() => { logout(); setMobileOpen(false); }}>
                  Sign out
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full" onClick={() => setMobileOpen(false)}>
                    <Link href="/login">Sign in</Link>
                  </Button>
                  <Button asChild className="w-full" onClick={() => setMobileOpen(false)}>
                    <Link href="/register">Get started free</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
