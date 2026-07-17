import * as React from 'react';

export default function PlaceholderPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-4xl font-bold tracking-tight">Coming Soon</h1>
        <p className="text-muted-foreground">
          We are currently working on this page. Check back later for updates!
        </p>
      </div>
    </div>
  );
}
