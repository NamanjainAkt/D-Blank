import * as React from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNav } from './SidebarNav';
import { SidebarFooter } from './SidebarFooter';
import { useAdminStore } from '@/lib/store/adminStore';
import { cn } from '@/lib/utils';

interface SidebarMobileProps {
  className?: string;
}

export function SidebarMobile({ className }: SidebarMobileProps) {
  const { isMobileOpen, setMobileOpen } = useAdminStore();

  return (
    <Sheet
      open={isMobileOpen}
      onOpenChange={setMobileOpen}
    >
      <SheetContent side="left" className={cn("p-0 bg-zinc-950 border-r border-zinc-800 w-64 lg:hidden", className)}>
        <div className="flex flex-col h-full">
          <SidebarHeader />
          <SidebarNav />
          <SidebarFooter />
        </div>
      </SheetContent>
    </Sheet>
  );
}
