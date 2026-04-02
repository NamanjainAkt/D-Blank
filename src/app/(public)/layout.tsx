'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { MorphingBlobs } from '@/components/ui/MorphingBlobs';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isAdminRoute = pathname?.startsWith('/admin');
  const isApiRoute = pathname?.startsWith('/api');
  
  if (isAdminRoute || isApiRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <MorphingBlobs 
          className="opacity-20" 
          colors={['rgba(176,38,255,0.1)', 'rgba(0,240,255,0.05)']} 
        />
      </div>
      <Navbar />
      {children}
    </>
  );
}
