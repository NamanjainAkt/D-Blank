import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAdminStore } from '@/lib/store/adminStore';

interface AdminNavItemProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}

export function AdminNavItem({ href, label, icon: Icon, className }: AdminNavItemProps) {
  const pathname = usePathname();
  const { isSidebarCollapsed } = useAdminStore();
  const isActive = pathname.startsWith(href);

  return (
    <div className="relative group/nav">
      <Link
        href={href}
        className={cn(
          'group flex h-11 items-center rounded-none px-4 text-[11px] font-mono uppercase tracking-[0.15em] transition-all duration-300 ease-out border-l-2 border-transparent',
          isSidebarCollapsed && 'justify-center px-0 border-l-0',
          isActive
            ? 'bg-gradient-to-r from-[#00FFFF]/10 to-transparent text-[#00FFFF] border-l-[#00FFFF] shadow-[inset_0_0_15px_rgba(0,255,255,0.05)]'
            : 'text-[#71717a] hover:text-[#E5E7EB] hover:bg-white/[0.02]',
          className
        )}
      >
        <Icon 
          className={cn(
            'w-4 h-4 shrink-0 transition-all duration-300 ease-out',
            isActive ? 'text-[#00FFFF] drop-shadow-[0_0_8px_#00FFFF]' : 'text-[#71717a] group-hover:text-[#E5E7EB]'
          )}
        />
        {!isSidebarCollapsed && (
          <span className="ml-3 min-w-0 font-medium">{label}</span>
        )}
      </Link>

      {/* Tooltip for collapsed state */}
      {isSidebarCollapsed && (
        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-2 bg-black border border-white/10 rounded-md opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 z-50 whitespace-nowrap shadow-[0_0_15px_rgba(0,255,255,0.1)] flex items-center translate-x-2 group-hover/nav:translate-x-0 pointer-events-none">
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-black border-l border-b border-white/10 rotate-45"></div>
          <span className="text-[10px] font-mono text-[#00FFFF] uppercase tracking-widest relative z-10">{label}</span>
        </div>
      )}
    </div>
  );
}