'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { renderIcon } from '@/components/ui/Icons';
import { Trophy } from 'lucide-react';

interface CircularGalleryProps {
  items: { icon: string; label: string; description: string }[];
  className?: string;
}

export function CircularGallery({ items, className = '' }: CircularGalleryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const radius = 140;

  return (
    <div ref={ref} className={`relative flex items-center justify-center ${className} h-[400px]`}>
      {/* Center content */}
      <div className="absolute z-10 text-center">
        <div className="w-24 h-24 rounded-none bg-gradient-to-br from-neon-purple to-laser-cyan flex items-center justify-center shadow-lg shadow-neon-purple/40 border border-white/20">
          <Trophy className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Circular items */}
      {items.map((item, index) => {
        const angle = (index / items.length) * 2 * Math.PI - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="absolute"
            style={{
              x,
              y,
            }}
          >
            <div className="group relative">
              <div className="w-14 h-14 rounded-none bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-laser-cyan/50 transition-colors backdrop-blur-sm">
                {renderIcon(item.icon as Parameters<typeof renderIcon>[0], { className: 'w-6 h-6 text-laser-cyan' })}
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-center">
                <div className="text-[10px] font-display font-black text-laser-cyan uppercase">{item.label}</div>
                <div className="text-[8px] font-mono text-white/40 uppercase">{item.description}</div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Connecting ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg className="w-96 h-96 -rotate-90" style={{ opacity: 0.15 }}>
          <circle
            cx="192"
            cy="192"
            r="140"
            fill="none"
            stroke="var(--neon-purple)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
      </div>
    </div>
  );
}

export default CircularGallery;
