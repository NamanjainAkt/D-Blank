'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';

interface GlassSurfaceProps {
  className?: string;
}

export function GlassSurface({ className = '' }: GlassSurfaceProps) {
  const quickLinks = [
    { label: 'Games', href: '/games' },
    { label: 'Training', href: '/courses' },
    { label: 'Studio', href: '/studio' },
    { label: 'Community', href: '/community' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div className={`flex flex-col md:flex-row md:items-start md:justify-between gap-8 ${className}`}>
      {/* Brand column - minimal */}
      <div className="flex-shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2.5 h-2.5 rounded-none bg-neon-purple animate-pulse shadow-lg shadow-neon-purple/50" />
          <span className="text-lg font-display font-black text-white uppercase tracking-wider">D-Blanks</span>
        </div>
        <p className="text-xs text-white/50 max-w-xs leading-relaxed">
          Building worlds. Training legends.
        </p>
        <div className="flex gap-2 mt-4">
          {[
            { icon: 'twitter', href: 'https://twitter.com/dblanks', label: 'Twitter' },
            { icon: 'youtube', href: 'https://youtube.com/@dblanks', label: 'YouTube' },
            { icon: 'instagram', href: 'https://instagram.com/dblanks', label: 'Instagram' },
            { icon: 'messageCircle', href: 'https://discord.gg/dblanks', label: 'Discord' },
          ].map(({ icon, href, label }) => {
            const IconComponent = Icons[icon as keyof typeof Icons];
            return (
              <motion.a
                key={icon}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-8 h-8 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-laser-cyan hover:border-laser-cyan/30 transition-all"
                title={label}
              >
                <IconComponent className="w-3.5 h-3.5" />
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Quick Links - minimal horizontal nav */}
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {quickLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            className="text-xs font-display uppercase tracking-wider text-white/50 hover:text-laser-cyan transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <span className="text-white/20">|</span>
        <Link 
          href='/privacy-policy' 
          className="text-xs font-display uppercase tracking-wider text-white/50 hover:text-laser-cyan transition-colors"
        >
          Privacy
        </Link>
        <Link 
          href='/terms-of-service' 
          className="text-xs font-display uppercase tracking-wider text-white/50 hover:text-laser-cyan transition-colors"
        >
          Terms
        </Link>
      </div>
    </div>
  );
}

export default GlassSurface;
