import * as React from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminStore } from '@/lib/store/adminStore';

interface AdminHeaderProps {
  pageTitle: string;
  className?: string;
}

export function AdminHeader({ pageTitle, className }: AdminHeaderProps) {
  const { isMobileOpen, setMobileOpen } = useAdminStore();

  return (
    <header className={cn('lg:hidden h-16 border-b border-zinc-800 bg-zinc-950 px-4 flex items-center justify-between sticky top-0 z-40', className)}>
      <button
        type="button"
        onClick={() => setMobileOpen(!isMobileOpen)}
        className="p-2 -ml-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>
      <span className="text-sm font-semibold text-zinc-200 tracking-wide">
        {pageTitle}
      </span>
      <div className="w-9" />
    </header>
  );
}
