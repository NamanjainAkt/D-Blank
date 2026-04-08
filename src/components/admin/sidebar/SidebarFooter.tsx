import * as React from 'react';
import { useSession } from 'next-auth/react';
import { LogOut } from 'lucide-react';
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
    <div className={cn('border-t border-zinc-800 p-4 space-y-3', className)}>
      {session && (
        <div className={cn('px-3 py-2.5 rounded-md bg-zinc-900 border border-zinc-800', isSidebarCollapsed && 'hidden')}>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Online
          </p>
          <p className="text-xs text-zinc-300 truncate">{session.user?.email}</p>
        </div>
      )}

      {session && isSidebarCollapsed && (
        <div className="flex justify-center mb-3 cursor-help relative group/status">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />

          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-md opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible transition-all duration-200 z-50 whitespace-nowrap pointer-events-none">
            <span className="text-[10px] text-emerald-400 uppercase tracking-wider block mb-0.5">Online</span>
            <span className="text-xs text-zinc-300">{session.user?.email}</span>
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
            'h-10 w-full flex items-center rounded-md px-3 text-zinc-500 hover:text-red-400 hover:bg-zinc-800/50 transition-colors duration-150',
            isSidebarCollapsed ? 'justify-center px-0' : 'gap-3'
          )}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className={cn('text-sm', isSidebarCollapsed && 'hidden')}>
            Sign Out
          </span>
        </button>

        {isSidebarCollapsed && (
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-md opacity-0 invisible group-hover/logout:opacity-100 group-hover/logout:visible transition-all duration-200 z-50 whitespace-nowrap pointer-events-none">
            <span className="text-xs text-red-400">Sign Out</span>
          </div>
        )}
      </div>
    </div>
  );
}
