'use client';

import { m } from '@/components/providers/MotionProvider';
import { ReactNode } from 'react';

interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export function HoverScale({
  children,
  scale = 1.05,
  className = ''
}: HoverScaleProps) {
  const isTouch = typeof window !== 'undefined' && 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  return (
    <m.div
      className={className}
      whileHover={isTouch ? {} : { scale }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
    >
      {children}
    </m.div>
  );
}