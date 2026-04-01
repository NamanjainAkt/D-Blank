'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Achievement {
  year: string;
  title: string;
  event: string;
}

interface AnimatedListProps {
  items: Achievement[];
  className?: string;
}

export function AnimatedList({ items, className = '' }: AnimatedListProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 p-6 rounded-none bg-white/5 border border-white/10 hover:border-neon-purple/50 transition-all duration-300 group"
        >
          {/* Year badge */}
          <div className="flex-shrink-0 px-4 py-2 rounded-none bg-neon-purple/10 border border-neon-purple/20 group-hover:bg-neon-purple/20 transition-colors">
            <span className="text-sm font-black text-neon-purple font-display">{item.year}</span>
          </div>

          {/* Content */}
          <div className="flex-grow">
            <h4 className="text-base font-display font-black text-white uppercase tracking-tight group-hover:text-laser-cyan transition-colors">{item.title}</h4>
            <p className="text-xs text-white/40 font-mono uppercase tracking-widest mt-1">{item.event}</p>
          </div>

          {/* Icon */}
          <div className="flex-shrink-0 text-laser-cyan opacity-50 group-hover:opacity-100 transition-opacity">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default AnimatedList;
