'use client';

import { motion } from 'framer-motion';
import { renderIcon } from '@/components/ui/Icons';

interface BounceCardsProps {
  items: {
    title: string;
    description: string;
    icon: string;
    cta?: string;
  }[];
  className?: string;
}

export function BounceCards({ items, className = '' }: BounceCardsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -10, scale: 1.02 }}
          className="group relative p-10 rounded-none bg-white/[0.02] border border-white/10 hover:border-laser-cyan/50 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-laser-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative">
            {/* Icon */}
            <div className="w-16 h-16 mb-8 rounded-none bg-gradient-to-br from-laser-cyan/20 to-neon-purple/20 flex items-center justify-center shadow-lg shadow-laser-cyan/10 border border-laser-cyan/30 group-hover:border-laser-cyan/50 transition-colors">
              {renderIcon(item.icon as keyof typeof import('@/components/ui/Icons').Icons, { className: "w-8 h-8 text-laser-cyan" })}
            </div>

            {/* Content */}
            <h3 className="text-xl font-display font-black text-white mb-4 uppercase tracking-tight group-hover:text-laser-cyan transition-colors">{item.title}</h3>
            <p className="text-sm text-white/50 mb-8 font-body leading-relaxed">{item.description}</p>

            {/* CTA */}
            {item.cta && (
              <motion.span
                whileHover={{ x: 6 }}
                className="inline-flex items-center gap-3 text-[11px] font-mono font-black text-laser-cyan uppercase tracking-[0.15em] cursor-pointer border-b border-laser-cyan/30 pb-1 hover:border-laser-cyan transition-all"
              >
                {item.cta}
                <span className="text-lg">→</span>
              </motion.span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default BounceCards;
