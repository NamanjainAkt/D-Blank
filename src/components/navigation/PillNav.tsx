'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '@/lib/placeholder-data';

interface PillNavProps {
  activeItem?: string;
}

export function PillNav({ activeItem = '' }: PillNavProps) {
  return (
    <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-none bg-white/5 border border-white/10 backdrop-blur-xl">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`relative px-5 py-2.5 text-sm font-display font-black uppercase tracking-widest transition-all duration-300 ${
            activeItem === item.href
              ? 'text-black'
              : 'text-white/70 hover:text-white'
          }`}
        >
          {activeItem === item.href && (
            <motion.div
              layoutId="pill"
              className="absolute inset-0 rounded-none bg-laser-cyan shadow-lg shadow-laser-cyan/25"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

interface FlowingMenuProps {
  children: React.ReactNode;
  items: { label: string; href: string; submenu?: { label: string; href: string }[] }[];
}

export function FlowingMenu({ children, items }: FlowingMenuProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div
      className="relative inline-block"
      onMouseLeave={() => setActiveIndex(null)}
    >
      <div
        className="flex items-center gap-1"
        onMouseEnter={() => setActiveIndex(0)}
      >
        {children}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-56 py-2 rounded-none bg-black/90 border border-neon-purple/20 backdrop-blur-xl shadow-2xl"
          >
            {items.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-4 py-3 text-sm font-mono uppercase tracking-widest text-white/70 hover:text-laser-cyan hover:bg-laser-cyan/5 transition-colors"
                onMouseEnter={() => setActiveIndex(index + 1)}
              >
                {item.label}
                {item.submenu && (
                  <span className="float-right text-white/30">→</span>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface DockProps {
  items: { label: string; href: string; icon: React.ReactNode }[];
  activeItem?: string;
}

export function Dock({ items, activeItem = '' }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
      <div className="flex items-end gap-2 px-4 py-3 rounded-none bg-black/80 border border-neon-purple/20 backdrop-blur-xl">
        {items.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative p-3 transition-all duration-300 ${
              activeItem === item.href
                ? 'bg-neon-purple text-white shadow-[0_0_15px_var(--neon-purple)]'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <motion.div
              animate={{
                scale: hoveredIndex === index ? 1.2 : 1,
                y: hoveredIndex === index ? -8 : 0,
              }}
              transition={{ type: 'spring', bounce: 0.4, duration: 0.5 }}
            >
              {item.icon}
            </motion.div>

            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-white bg-black/90 border border-neon-purple/20 rounded-none whitespace-nowrap"
              >
                {item.label}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black border-r border-b border-neon-purple/20 rotate-45" />
              </motion.div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Navigation() {
  return (
    <div className="flex items-center justify-between w-full">
      <PillNav />
    </div>
  );
}
