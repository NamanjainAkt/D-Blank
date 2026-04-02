import * as React from 'react';
import { useSession } from 'next-auth/react';
import { LogOut, Clock, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminStore } from '@/lib/store/adminStore';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface SidebarFooterProps {
  className?: string;
}

export function SidebarFooter({ className }: SidebarFooterProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { isSidebarCollapsed } = useAdminStore();

  return (
    <div className={cn('border-t border-white/[0.05] p-4 space-y-4 bg-black', className)}>
      {session && (
        <div className={cn('px-3 py-3 rounded-lg bg-black border border-white/[0.05] shadow-[0_0_10px_rgba(0,0,0,0.5)]', isSidebarCollapsed && 'hidden')}>
          <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#71717a] mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_5px_#10b981]" />
            Online
          </p>
          <p className="text-[11px] font-mono text-[#E5E7EB] truncate">{session.user?.email}</p>
        </div>
      )}

      {/* Online indicator for collapsed state */}
      {session && isSidebarCollapsed && (
        <div className="flex justify-center mb-4 cursor-help relative group/status">
          <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse" />
          
          <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-2 bg-black border border-white/10 rounded-md opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible transition-all duration-300 z-50 whitespace-nowrap shadow-[0_0_15px_rgba(16,185,129,0.1)] flex flex-col translate-x-2 group-hover/status:translate-x-0 pointer-events-none">
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-black border-l border-b border-white/10 rotate-45"></div>
            <span className="text-[10px] font-mono text-[#10b981] uppercase tracking-widest mb-1 relative z-10">Online</span>
            <span className="text-[9px] font-mono text-[#E5E7EB] relative z-10">{session.user?.email}</span>
          </div>
        </div>
      )}

      <div className="relative group/logout">
        <button
          type="button"
          onClick={async () => {
            await signOut({ redirect: false });
            router.push('/admin/login');
          }}
          className={cn(
            'h-11 w-full flex items-center rounded-lg px-4 text-[#A0A0A0] hover:text-[#FF007F] hover:bg-[#FF007F]/10 hover:shadow-[0_0_15px_rgba(255,0,127,0.1)] transition-all duration-300 ease-out border border-transparent hover:border-[#FF007F]/20',
            isSidebarCollapsed ? 'justify-center px-0' : 'gap-3'
          )}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className={cn('text-[10px] font-mono uppercase tracking-[0.2em]', isSidebarCollapsed && 'hidden')}>
            Sign Out
          </span>
        </button>

        {/* Tooltip for logout */}
        {isSidebarCollapsed && (
          <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-2 bg-black border border-[#FF007F]/30 rounded-md opacity-0 invisible group-hover/logout:opacity-100 group-hover/logout:visible transition-all duration-300 z-50 whitespace-nowrap shadow-[0_0_15px_rgba(255,0,127,0.2)] flex items-center translate-x-2 group-hover/logout:translate-x-0 pointer-events-none">
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-black border-l border-b border-[#FF007F]/30 rotate-45"></div>
            <span className="text-[10px] font-mono text-[#FF007F] uppercase tracking-widest relative z-10">Sign Out</span>
          </div>
        )}
      </div>
    </div>
  );
}