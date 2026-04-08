'use client';

import { motion, useAnimation } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'emerald' | 'fuchsia';
  type?: 'button' | 'submit' | 'reset';
}

export function GlowButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  type = 'button'
}: GlowButtonProps) {
  const shimmer = useAnimation();

  const handleHoverStart = () => {
    shimmer.start({
      x: '250%',
      transition: { duration: 0.55, ease: 'easeOut' }
    });
  };

  const handleHoverEnd = () => {
    shimmer.set({ x: '-100%' });
  };

  const base = "relative px-6 py-3 font-display font-black uppercase tracking-widest rounded-none overflow-hidden text-center flex items-center justify-center gap-2 transition-colors duration-200";

  const variants = {
    primary:   "bg-primary text-primary-foreground border border-primary/50",
    secondary: "bg-transparent text-white border border-white/15 hover:border-primary/40",
    emerald:   "bg-acid-green text-white border border-acid-green/50",
    fuchsia:   "bg-accent text-accent-foreground border border-accent/50",
  };

  const hoverShadow = {
    primary:   "0 0 20px rgba(124,58,237,0.7), 0 0 60px rgba(124,58,237,0.25), inset 0 0 20px rgba(255,255,255,0.06)",
    secondary: "0 0 20px rgba(124,58,237,0.35), 0 0 40px rgba(124,58,237,0.1)",
    emerald:   "0 0 20px rgba(16,185,129,0.6), 0 0 50px rgba(16,185,129,0.2)",
    fuchsia:   "0 0 20px rgba(192,38,211,0.7), 0 0 60px rgba(192,38,211,0.25), inset 0 0 20px rgba(255,255,255,0.06)",
  };

  const shimmerColor = {
    primary:   'from-transparent via-white/25 to-transparent',
    secondary: 'from-transparent via-primary/20 to-transparent',
    emerald:   'from-transparent via-white/20 to-transparent',
    fuchsia:   'from-transparent via-white/25 to-transparent',
  };

  // Subtle bg brightening on hover for secondary
  const hoverBg = {
    primary:   'bg-primary',
    secondary: 'bg-primary/10',
    emerald:   'bg-acid-green',
    fuchsia:   'bg-accent',
  };

  return (
    <motion.button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      onClick={onClick}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover={{ scale: 1.03, boxShadow: hoverShadow[variant] }}
      whileTap={{ scale: 0.97, boxShadow: 'none' }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {/* Text */}
      <span className="relative z-10 flex items-center justify-center gap-2 w-full">
        {children}
      </span>

      {/* Shimmer sweep */}
      <motion.span
        className={`absolute top-0 bottom-0 w-[40%] -skew-x-12 bg-gradient-to-r ${shimmerColor[variant]} pointer-events-none z-20`}
        initial={{ x: '-100%' }}
        animate={shimmer}
      />

      {/* Hover background shift (secondary/emerald) */}
      <motion.span
        className={`absolute inset-0 ${hoverBg[variant]} opacity-0 pointer-events-none`}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      />
    </motion.button>
  );
}
