'use client';

import * as React from 'react';
import { AdminShell } from '@/components/admin/layout/AdminShell';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useAdminStore } from '@/lib/store/adminStore';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();
  const { setLastPageTitle } = useAdminStore();

  useEffect(() => {
    const titleMap: Record<string, string> = {
      '/admin': 'Dashboard',
      '/admin/dashboard': 'Dashboard',
      '/admin/students': 'Students',
      '/admin/courses': 'Courses',
      '/admin/enrollments': 'Enrollments',
      '/admin/analytics': 'Analytics',
    };
    const title = titleMap[pathname] || 'Admin';
    setLastPageTitle(title);
  }, [pathname, setLastPageTitle]);

  useEffect(() => {
    if (!session && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [session, pathname, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-admin-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-admin-border border-t-admin-active rounded-full animate-spin" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-admin-muted">Loading Panel</span>
        </div>
      </div>
    );
  }

  if (!session && pathname !== '/admin/login') return null;

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const titleMap: Record<string, string> = {
    '/admin': 'Dashboard',
    '/admin/dashboard': 'Dashboard',
    '/admin/students': 'Students',
    '/admin/courses': 'Courses',
    '/admin/enrollments': 'Enrollments',
    '/admin/analytics': 'Analytics',
  };
  const pageTitle = titleMap[pathname] || 'Admin';

  return (
    <AdminShell pageTitle={pageTitle}>
      {children}
    </AdminShell>
  );
}