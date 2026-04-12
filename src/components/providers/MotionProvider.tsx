'use client';

import { LazyMotion, m } from 'framer-motion';

const loadFeatures = () => import('@/lib/features').then((res) => res.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}

// Re-export m for use in child components
export { m };