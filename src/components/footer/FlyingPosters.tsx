'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface FlyingPostersProps {
  className?: string;
}

// Seeded pseudo-random to avoid hydration mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function FlyingPosters({ className = '' }: FlyingPostersProps) {
  const particles = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: seededRandom(i * 7 + 1) * 60 + 30,
    x: seededRandom(i * 7 + 2) * 100,
    y: seededRandom(i * 7 + 3) * 100,
    duration: seededRandom(i * 7 + 4) * 10 + 15,
    delay: seededRandom(i * 7 + 5) * 5,
  })), []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 30, 0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
    </div>
  );
}

export default FlyingPosters;
