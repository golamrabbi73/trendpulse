'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiGrid,
  FiUsers,
  FiPlusCircle,
  FiSettings,
  FiMenu,
  FiX,
  FiLogOut,
  FiTrendingUp,
  FiFileText,
  FiCpu,
  FiTarget,
} from 'react-icons/fi';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useLogout } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/Button';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: FiGrid, exact: true },
  {
    label: 'Competitors',
    icon: FiUsers,
    children: [
      { href: '/dashboard/competitors', label: 'Explore', icon: FiTrendingUp },
      { href: '/dashboard/competitors/add', label: 'Add Competitor', icon: FiPlusCircle },
      { href: '/dashboard/competitors/manage', label: 'Manage', icon: FiSettings },
    ],
  },
  {
    label: 'AI Auditor',
    icon: FiCpu,
    children: [
      { href: '/dashboard/audits', label: 'Audit History', icon: FiFileText },
      { href: '/dashboard/audits/new', label: 'New Audit', icon: FiPlusCircle },
    ],
  },
  {
    label: 'AI Strategy',
    icon: FiTarget,
    children: [
      { href: '/dashboard/strategies', label: 'My Strategies', icon: FiFileText },
      { href: '/dashboard/strategies/new', label: 'Generate New', icon: FiPlusCircle },
    ],
  },
];

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
  onClick?: () => void;
}

function NavLink({ href, label, icon: Icon, exact, onClick }: NavItemProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </Link>
  );
}

interface SidebarProps {
  onClose?: () => void;
}

function Sidebar({ onClose }: SidebarProps) {
  const { mutate: logout } = useLogout();
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center justify-between border-b px-4 py-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold" onClick={onClose}>
          <FiTrendingUp className="h-5 w-5 text-primary" />
          <span>TrendPulse AI</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="rounded p-1 hover:bg-accent lg:hidden" aria-label="Close sidebar">
            <FiX className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) =>
          item.children ? (
            <div key={item.label}>
              <p className="mb-1 mt-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </p>
              {item.children?.map((child) => (
                <NavLink key={child.href} {...child} onClick={onClose} />
              ))}
            </div>
          ) : (
            <NavLink key={item.href} {...item} onClick={onClose} />
          ),
        )}
      </nav>

      {/* User + Logout */}
      <div className="border-t p-3 space-y-3">
        {user && (
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground"
          onClick={() => logout()}
        >
          <FiLogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-lg border bg-background p-2 shadow-sm lg:hidden"
        aria-label="Open sidebar"
      >
        <FiMenu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transition-transform duration-300 lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <Sidebar onClose={() => setMobileOpen(false)} />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r bg-background lg:flex lg:flex-col">
        <Sidebar />
      </aside>
    </>
  );
}
