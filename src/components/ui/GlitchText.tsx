'use client';

import { motion } from 'framer-motion';

interface GlitchTextProps {
  children: string;
  className?: string;
  glitchIntensity?: number;
}

export function GlitchText({
  children,
  className = '',
  glitchIntensity = 0.5
}: GlitchTextProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main text */}
      <span className="relative z-10">{children}</span>

      {/* Glitch layers - only show occasionally */}
      <motion.span
        className="absolute inset-0 text-emerald-400 opacity-60"
        animate={{
          x: [0, glitchIntensity * 1, -glitchIntensity * 0.5, 0],
          opacity: [0, 0.6, 0, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut"
        }}
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
        }}
      >
        {children}
      </motion.span>

      <motion.span
        className="absolute inset-0 text-teal-400 opacity-40"
        animate={{
          x: [0, -glitchIntensity * 0.5, glitchIntensity * 0.8, 0],
          opacity: [0, 0.4, 0, 0],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut"
        }}
        style={{
          clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)'
        }}
      >
        {children}
      </motion.span>
    </div>
  );
}