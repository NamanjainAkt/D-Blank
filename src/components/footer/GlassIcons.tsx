'use client';

import { motion } from 'framer-motion';

interface GlassIconsProps {
  socials: { name: string; icon: string; href: string }[];
  className?: string;
}

export function GlassIcons({ socials, className = '' }: GlassIconsProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {socials.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1, y: -2 }}
           className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-orange-500/30 transition-all"
          title={social.name}
        >
          <span className="text-lg">{social.icon}</span>
        </motion.a>
      ))}
    </div>
  );
}

export default GlassIcons;
