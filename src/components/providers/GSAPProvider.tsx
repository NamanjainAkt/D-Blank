'use client';

import { useEffect, type ReactNode } from 'react';
import { ScrollTrigger } from '@/lib/gsap';

interface GSAPProviderProps {
  children: ReactNode;
}

export default function GSAPProvider({ children }: GSAPProviderProps) {
  useEffect(() => {
    // Initial cleanup on mount to ensure no orphaned triggers
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
