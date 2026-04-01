'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, Suspense } from 'react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '◆' },
  { href: '/admin/students', label: 'Students', icon: '👥' },
  { href: '/admin/courses', label: 'Courses', icon: '📚' },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isLoginPage && status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router, isLoginPage]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/admin/login');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!session && !isLoginPage) return null;

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-56 bg-charcoal border-r border-carbon shrink-0 sticky top-0 h-screen overflow-y-auto flex flex-col">
        <div className="p-6 flex-1">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-bold">D-Blanks</span>
          </Link>

          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  pathname?.startsWith(item.href)
                    ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500'
                    : 'text-gray-500 hover:text-emerald-300 hover:bg-emerald-500/5 border-l-2 border-transparent'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-carbon">
          <div className="text-xs text-gray-600 mb-2">Logged in as</div>
          <div className="text-sm font-medium truncate mb-4">{session!.user?.email}</div>
          <button
            onClick={handleSignOut}
            className="w-full text-xs text-gray-500 hover:text-white transition-colors text-left"
          >
            Sign out →
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  );
}
