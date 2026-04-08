import * as React from 'react';
import { useAdminStore } from '@/lib/store/adminStore';
import { SidebarHeader } from '@/components/admin/sidebar/SidebarHeader';
import { SidebarNav } from '@/components/admin/sidebar/SidebarNav';
import { SidebarFooter } from '@/components/admin/sidebar/SidebarFooter';
import { SidebarMobile } from '@/components/admin/sidebar/SidebarMobile';
import { AdminHeader } from './AdminHeader';
import { cn } from '@/lib/utils';

interface AdminShellProps {
  pageTitle: string;
  children: React.ReactNode;
  className?: string;
}

export function AdminShell({ pageTitle, children, className }: AdminShellProps) {
  const { isSidebarCollapsed } = useAdminStore();

  return (
    <div className={cn('min-h-screen bg-zinc-950 text-zinc-300 flex font-body', className)}>
      <SidebarMobile />

      <aside
        className={cn(
          'hidden lg:flex sticky top-0 h-screen z-50 flex-col border-r border-zinc-800 bg-zinc-950 transition-all duration-200 shrink-0',
          isSidebarCollapsed ? 'w-20' : 'w-64'
        )}
      >
        <SidebarHeader />
        <SidebarNav />
        <SidebarFooter />
      </aside>

      <main className="flex-1 min-w-0 relative flex flex-col bg-zinc-950 min-h-screen">
        <AdminHeader pageTitle={pageTitle} />
        <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
