import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useAdminStore } from '@/lib/store/adminStore';

interface SidebarHeaderProps {
  className?: string;
}

export function SidebarHeader({ className }: SidebarHeaderProps) {
  const { isSidebarCollapsed } = useAdminStore();

  return (
    <div className={cn('h-[88px] border-b border-zinc-800 px-6 flex items-center', className)}>
      <div className="relative group/logo w-full">
        <Link
          href="/admin/dashboard"
          className={cn('flex items-center gap-4 min-w-0 transition-all duration-200 group', isSidebarCollapsed && 'justify-center w-full')}
        >
          <div className="w-10 h-10 rounded-lg border border-zinc-700 flex items-center justify-center shrink-0 overflow-hidden group-hover:border-zinc-600 transition-colors">
            <Image
              src="/favicon.jpeg"
              alt="D-Blanks Logo"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          {!isSidebarCollapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-zinc-200 tracking-wide">D-BLANKS</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Admin</p>
            </div>
          )}
        </Link>

        {isSidebarCollapsed && (
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-md opacity-0 invisible group-hover/logo:opacity-100 group-hover/logo:visible transition-all duration-200 z-50 whitespace-nowrap pointer-events-none">
            <span className="text-xs text-zinc-300">D-Blanks Admin</span>
          </div>
        )}
      </div>
    </div>
  );
}
