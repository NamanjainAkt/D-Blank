'use client';

import { useEffect, useState, useRef } from 'react';

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
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
    setIsMobile(window.innerWidth < 768);
    
    // Pause animations when tab is not visible
    const handleVisibility = () => {
      if (!containerRef.current) return;
      const particles = containerRef.current.querySelectorAll('[data-particle]');
      particles.forEach((p) => {
        (p as HTMLElement).style.animationPlayState = document.hidden ? 'paused' : 'running';
      });
    };
    
    document.onvisibilitychange = handleVisibility;
    return () => { document.onvisibilitychange = null; };
  }, []);

  if (!hasMounted) return null;

  const adjustedCount = isMobile ? Math.min(particleCount, 8) : particleCount;
  if (isMobile && adjustedCount === 0) return null;

  const particles: Particle[] = [];
  // Use a simple seeded pseudo-random if consistency is needed, 
  // but since we only render after mount, it's fine.
  for (let i = 0; i < adjustedCount; i++) {
    particles.push({
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

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <style>{`
        @keyframes particle-float {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: var(--p-opacity); }
          50% { transform: translate3d(var(--p-drift), -100px, 0); opacity: calc(var(--p-opacity) * 0.3); }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          data-particle
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
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
}