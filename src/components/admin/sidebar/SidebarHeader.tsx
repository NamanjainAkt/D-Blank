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
    <div className={cn('h-[88px] border-b border-white/[0.05] px-6 flex items-center bg-black', className)}>
      <div className="relative group/logo w-full">
        <Link
          href="/admin/dashboard"
          className={cn('flex items-center gap-4 min-w-0 transition-all duration-300 ease-out group', isSidebarCollapsed && 'justify-center w-full')}
        >
          <div className="w-10 h-10 rounded-lg bg-black border border-white/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:border-[#00FFFF]/50 group-hover:shadow-[0_0_15px_rgba(0,255,255,0.15)] transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0" />
            <Image 
              src="/favicon.jpeg" 
              alt="D-Blanks Logo" 
              width={40} 
              height={40} 
              className="w-full h-full object-cover relative z-10 opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </div>
          {!isSidebarCollapsed && (
            <div className="min-w-0">
              <p className="font-display text-[13px] tracking-[0.2em] text-[#E5E7EB] uppercase leading-none font-medium">D-BLANKS</p>
              <p className="text-[10px] text-[#00FFFF] uppercase tracking-[0.3em] mt-2 font-mono flex items-center gap-1.5 opacity-80">
                <span className="w-1 h-1 rounded-full bg-[#00FFFF] shadow-[0_0_5px_#00FFFF] animate-pulse" />
                Admin
              </p>
            </div>
          )}
        </Link>
        
        {/* Tooltip for collapsed state */}
        {isSidebarCollapsed && (
          <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-2 bg-black border border-white/10 rounded-md opacity-0 invisible group-hover/logo:opacity-100 group-hover/logo:visible transition-all duration-300 z-50 whitespace-nowrap shadow-[0_0_15px_rgba(0,255,255,0.1)] flex flex-col translate-x-2 group-hover/logo:translate-x-0 pointer-events-none">
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-black border-l border-b border-white/10 rotate-45"></div>
            <span className="text-[10px] font-mono text-[#00FFFF] uppercase tracking-widest relative z-10">D-Blanks Hub</span>
          </div>
        )}
      </div>
    </div>
  );
}