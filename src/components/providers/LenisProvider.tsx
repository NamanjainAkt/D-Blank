'use client';

import { useEffect } from 'react';
import { startLenis } from '@/lib/lenis';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    startLenis();

    return () => {
      // Lenis cleanup will be handled by the lenis instance
    };
  }, []);

  return <>{children}</>;
}