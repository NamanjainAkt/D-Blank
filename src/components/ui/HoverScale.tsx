'use client';

import { motion } from 'framer-motion';
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
  // Check for touch device at runtime
  const isTouch = typeof window !== 'undefined' && 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  return (
    <motion.div
      className={className}
      whileHover={isTouch ? {} : { scale }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  );
}
