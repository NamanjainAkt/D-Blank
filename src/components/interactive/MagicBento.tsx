'use client';

import { motion } from 'framer-motion';
import { renderIcon } from '@/components/ui/Icons';

interface BentoItem {
  title: string;
  subtitle: string;
  icon: string;
  size?: 'small' | 'medium' | 'large';
}

interface MagicBentoProps {
  items: BentoItem[];
  className?: string;
}

export function MagicBento({ items, className = '' }: MagicBentoProps) {
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 md:col-span-2 row-span-1',
    large: 'col-span-1 md:col-span-2 row-span-2',
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[160px] gap-4 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          className={`group relative overflow-hidden rounded-none bg-white/[0.02] border border-white/10 hover:border-neon-purple/50 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer ${sizeClasses[item.size || 'small']}`}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative h-full p-6 flex flex-col justify-between">
            {/* Icon */}
            <div className="w-12 h-12 rounded-none bg-laser-cyan/10 border border-laser-cyan/20 flex items-center justify-center group-hover:bg-laser-cyan/20 group-hover:border-laser-cyan/30 transition-colors">
              {renderIcon(item.icon as keyof typeof import('@/components/ui/Icons').Icons, { className: "w-5 h-5 text-laser-cyan" })}
            </div>

            {/* Content */}
            <div>
              <h3 className="text-base font-display font-black text-white uppercase tracking-tight group-hover:text-laser-cyan transition-colors">{item.title}</h3>
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/40 mt-2">{item.subtitle}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default MagicBento;
