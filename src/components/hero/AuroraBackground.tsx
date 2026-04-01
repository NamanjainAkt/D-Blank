'use client';

import { motion } from 'framer-motion';

interface AuroraBackgroundProps {
  className?: string;
  colors?: string[];
}

export function AuroraBackground({
  className = '',
  colors = ['#f97316', '#ea580c', '#fb923c', '#f97316'],
}: AuroraBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base dark layer */}
      <div className="absolute inset-0 bg-black" />

      {/* Aurora gradients */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, ${colors[0]}40 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 20%, ${colors[1]}30 0%, transparent 50%),
            radial-gradient(ellipse 70% 60% at 40% 80%, ${colors[2]}20 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 60% 60%, ${colors[3]}25 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Animated noise/grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50" />
    </div>
  );
}

export default AuroraBackground;
