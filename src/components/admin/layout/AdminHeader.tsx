import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminStore } from '@/lib/store/adminStore';

interface AdminHeaderProps {
  pageTitle: string;
  className?: string;
}

export function AdminHeader({ pageTitle, className }: AdminHeaderProps) {
  const pathname = usePathname();
  const { isMobileOpen, setMobileOpen } = useAdminStore();

  const handleMenuToggle = () => {
    setMobileOpen(!isMobileOpen);
  };

  return (
    <header className={cn('lg:hidden h-16 border-b border-white/[0.05] bg-black/80 backdrop-blur-xl px-4 flex items-center justify-between sticky top-0 z-40', className)}>
      <button
        type="button"
        onClick={handleMenuToggle}
        className="p-2 -ml-2 rounded-lg text-[#A0A0A0] hover:text-[#00FFFF] hover:bg-[#00FFFF]/10 transition-all duration-300 ease-out"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>
      <span className="font-display text-sm font-bold text-[#E5E7EB] tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
        {pageTitle}
      </span>
      <div className="w-9" />
    </header>
  );
}