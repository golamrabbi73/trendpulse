import type { Metadata } from 'next';
import type * as React from 'react';

export const metadata: Metadata = {
  title: 'Competitors',
};

export default function CompetitorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
