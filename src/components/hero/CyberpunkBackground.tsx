'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function CyberpunkBackground() {
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef1 = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || !glowRef1.current || !glowRef2.current) return;

    // Animate grid movement
    gsap.to(gridRef.current, {
      backgroundPosition: '100px 100px',
      duration: 20,
      ease: 'none',
      repeat: -1,
    });

    // Animate glow pulses
    gsap.to([glowRef1.current, glowRef2.current], {
      scale: 1.2,
      opacity: 0.8,
      duration: 3,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 0.5,
    });

    // Floating animation for glows
    gsap.to(glowRef1.current, {
      x: '+=20',
      y: '+=10',
      duration: 8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    gsap.to(glowRef2.current, {
      x: '-=15',
      y: '-=8',
      duration: 6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <>
      {/* Animated Grid Background */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(var(--neon-emerald, #10b981) 1px, transparent 1px),
            linear-gradient(90deg, var(--neon-emerald, #10b981) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Neon Glow Effects */}
      <div
        ref={glowRef1}
        className="absolute top-[-20%] left-1/4 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.03] blur-[150px] pointer-events-none"
      />
      <div
        ref={glowRef2}
        className="absolute bottom-[-10%] right-1/4 w-[500px] h-[500px] rounded-full bg-teal-500/[0.03] blur-[120px] pointer-events-none"
      />

      {/* Additional ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-radial from-emerald-500/[0.02] to-transparent blur-[100px] pointer-events-none" />
    </>
  );
}