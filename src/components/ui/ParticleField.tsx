'use client';

import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
}

interface ParticleFieldProps {
  particleCount?: number;
  className?: string;
  color?: string;
}

export function ParticleField({
  particleCount = 20,
  className = '',
  color = 'rgba(16, 185, 129, 0.3)'
}: ParticleFieldProps) {
  const particles = useMemo<Particle[]>(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      arr.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
        drift: Math.random() * 50 - 25,
      });
    }
    return arr;
  }, [particleCount]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <style>{`
        @keyframes particle-float {
          0%, 100% { transform: translate(0, 0); opacity: var(--p-opacity); }
          50% { transform: translate(var(--p-drift), -100px); opacity: calc(var(--p-opacity) * 0.3); }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: color,
            ['--p-opacity' as string]: p.opacity,
            ['--p-drift' as string]: `${p.drift}px`,
            animation: `particle-float ${p.duration}s ${p.delay}s linear infinite`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
