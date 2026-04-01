'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ElectricBorderProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export function ElectricBorder({
  children,
  color = '#B026FF',
  className = '',
}: ElectricBorderProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Electric border effect */}
      <div
        className="absolute inset-0 rounded-none animate-pulse"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${color} 25%, ${color} 75%, transparent 100%)`,
          opacity: 0.5,
        }}
      />

      {/* Second layer for more intensity */}
      <div
        className="absolute inset-[2px] rounded-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
          opacity: 0.3,
        }}
      />

      {/* Content */}
      <div className="relative rounded-none bg-black border border-white/10">
        {children}
      </div>
    </div>
  );
}

interface ElectricButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ElectricButton({
  children,
  onClick,
  className = '',
}: ElectricButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative px-6 py-3 rounded-none overflow-hidden ${className}`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-cyber-pink" />

      {/* Electric border */}
      <div className="absolute inset-0 rounded-none animate-pulse" style={{
        boxShadow: `0 0 10px #B026FF, 0 0 20px #FF007F`,
      }} />

      {/* Content */}
      <span className="relative text-sm font-display font-black text-white uppercase tracking-widest">
        {children}
      </span>
    </motion.button>
  );
}

export default ElectricBorder;
