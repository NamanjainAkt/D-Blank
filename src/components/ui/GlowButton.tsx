'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function GlowButton({
  children,
  onClick,
  className = '',
  variant = 'primary'
}: GlowButtonProps) {
  const baseClasses = "relative px-6 py-3 font-display font-black uppercase tracking-widest rounded-none transition-all duration-300 overflow-hidden";
  const variantClasses = {
    primary: "bg-neon-purple text-white shadow-lg shadow-neon-purple/25 hover:shadow-neon-purple/40",
    secondary: "bg-white/5 border border-white/10 text-white hover:border-laser-cyan/30 hover:bg-laser-cyan/5"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      whileHover={{
        scale: 1.02,
        boxShadow: variant === 'primary' ? "0 0 20px var(--neon-purple)" : "0 0 20px var(--laser-cyan)",
      }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>

      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-none opacity-0 ${variant === 'primary' ? 'bg-gradient-to-r from-neon-purple/20 to-cyber-pink/20' : 'bg-gradient-to-r from-laser-cyan/20 to-neon-purple/20'}`}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}