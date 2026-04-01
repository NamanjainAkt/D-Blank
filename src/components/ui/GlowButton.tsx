'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'emerald';
  type?: 'button' | 'submit' | 'reset';
}

export function GlowButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  type = 'button'
}: GlowButtonProps) {
  const baseClasses = "relative px-6 py-3 font-display font-black uppercase tracking-widest rounded-none transition-all duration-300 overflow-hidden text-center flex items-center justify-center gap-2";
  const variantClasses = {
    primary: "bg-neon-purple text-white shadow-lg shadow-neon-purple/25 hover:shadow-neon-purple/40",
    secondary: "bg-white/5 border border-white/10 text-white hover:border-laser-cyan/30 hover:bg-laser-cyan/5",
    emerald: "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
  };

  const glowStyles = {
    primary: "0 0 20px var(--neon-purple)",
    secondary: "0 0 20px var(--laser-cyan)",
    emerald: "0 0 20px var(--emerald)"
  };

  const gradientStyles = {
    primary: 'bg-gradient-to-r from-neon-purple/20 to-cyber-pink/20',
    secondary: 'bg-gradient-to-r from-laser-cyan/20 to-neon-purple/20',
    emerald: 'bg-gradient-to-r from-emerald-500/20 to-teal-400/20'
  };

  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      whileHover={{
        scale: 1.02,
        boxShadow: glowStyles[variant],
      }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 w-full">{children}</span>

      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-none opacity-0 ${gradientStyles[variant]}`}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
