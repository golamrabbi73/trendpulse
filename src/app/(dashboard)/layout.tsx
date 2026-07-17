export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar will go here */}
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}
