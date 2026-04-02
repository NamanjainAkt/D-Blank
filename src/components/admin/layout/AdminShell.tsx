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
    <div className={cn('min-h-screen bg-black text-[#E5E7EB] flex font-body selection:bg-[#00FFFF]/30 selection:text-[#00FFFF]', className)}>
      <SidebarMobile />
      
      <aside
        className={cn(
          'hidden lg:flex sticky top-0 h-screen z-50 flex-col border-r border-white/[0.05] bg-black transition-all duration-300 ease-out shrink-0',
          isSidebarCollapsed ? 'w-20' : 'w-64'
        )}
      >
        <SidebarHeader />
        <SidebarNav />
        <SidebarFooter />
      </aside>

      <main className="flex-1 min-w-0 relative flex flex-col bg-gradient-to-br from-black via-black to-[#050505] min-h-screen">
        <AdminHeader pageTitle={pageTitle} />
        <div className="flex-1 overflow-y-auto admin-scrollbar p-6 md:p-8 lg:p-10 relative">
          {/* Subtle background glow effects */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00FFFF]/5 rounded-full blur-[100px] pointer-events-none -z-10 mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[100px] pointer-events-none -z-10 mix-blend-screen" />
          
          {children}
        </div>
      </main>
    </div>
  );
}