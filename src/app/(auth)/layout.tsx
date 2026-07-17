import { PublicRoute } from '@/features/auth/components/PublicRoute';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <PublicRoute>
      <div className="flex min-h-screen items-center justify-center p-4">
        {children}
      </div>
    </PublicRoute>
  );
}
