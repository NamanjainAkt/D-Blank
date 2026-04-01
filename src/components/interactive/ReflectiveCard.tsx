'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ReflectiveCardProps {
  children: ReactNode;
  title?: string;
  subtitle?:string;
  className?: string;
}

export function ReflectiveCard({
  children,
  title,
  subtitle,
  className = '',
}: ReflectiveCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`relative group ${className}`}
    >
      {/* Main card */}
      <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 overflow-hidden">
        {/* Reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </div>

        <div className="relative">
          {title && (
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-emerald-400 mb-4">{subtitle}</p>
          )}
          {children}
        </div>
      </div>

      {/* Reflection below */}
      <div className="absolute -bottom-4 left-4 right-4 h-4 rounded-b-2xl bg-gradient-to-b from-white/5 to-transparent blur-md opacity-30 transform scale-y-[-0.5]" />
    </motion.div>
  );
}

export default ReflectiveCard;
