import { notFound } from "next/navigation";

import { dashboardConfig } from "@/config/dashboard";
import { DashboardNav } from "@/components/DashboardNav";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col space-y-6 py-4">
      <div className="container mx-auto grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
