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
          'group flex h-10 items-center rounded-md px-3 text-sm transition-colors duration-150 border-l-2 border-transparent',
          isSidebarCollapsed && 'justify-center px-0 border-l-0 rounded-md mx-2',
          isActive
            ? 'bg-zinc-800/80 text-white border-l-white'
            : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50',
          className
        )}
      >
        <Icon
          className={cn(
            'w-4 h-4 shrink-0 transition-colors',
            isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'
          )}
        />
        {!isSidebarCollapsed && (
          <span className="ml-3 min-w-0 text-[13px] font-medium">{label}</span>
        )}
      </Link>

      {isSidebarCollapsed && (
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-md opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-200 z-50 whitespace-nowrap pointer-events-none">
          <span className="text-xs text-zinc-300">{label}</span>
        </div>
      )}
    </div>
  );
}
