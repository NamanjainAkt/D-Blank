'use client';

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
    <div
      className={`transition-transform duration-300 hover:scale-[${scale}] ${className}`}
    >
      {children}
    </div>
  );
}