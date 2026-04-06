'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    if (!rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  if (!items) return null;

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 ${className}`}
      style={
        {
          '--r': `${radius}px`,
          '--x': '50%',
          '--y': '50%'
        } as React.CSSProperties
      }
    >
      {items.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          className="group relative flex flex-col w-full sm:max-w-[340px] rounded-[2rem] overflow-hidden border border-white/[0.03] hover:border-violet-500/20 transition-all duration-700 cursor-pointer bg-zinc-950/20 mx-auto"
          style={
            {
              '--card-border': c.borderColor || 'transparent',
              background: c.gradient || 'linear-gradient(180deg, rgba(24,24,27,0.4) 0%, rgba(9,9,11,0.6) 100%)',
              '--spotlight-color': 'rgba(168, 85, 247, 0.12)'
            } as React.CSSProperties
          }
        >
          {/* Spotlight effect */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-700 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle 400px at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%)'
            }}
          />
          
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-violet-500/0 group-hover:bg-violet-500/[0.02] transition-colors duration-1000 z-10 pointer-events-none" />

          <div className="relative z-10 p-3 aspect-[3/4] overflow-hidden">
            <img 
              src={c.image} 
              alt={c.title} 
              loading="lazy" 
              className="w-full h-full object-cover rounded-[1.5rem] group-hover:scale-[1.03] transition-transform duration-1000 ease-out" 
            />
          </div>
          
          <footer className="relative z-20 p-6 pt-0 text-white font-sans flex flex-col gap-2 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent mt-[-80px] backdrop-blur-[2px]">
            <div className="flex justify-between items-end w-full">
              <div className="flex flex-col">
                <h3 className="m-0 text-xl font-black tracking-tight group-hover:text-violet-400 transition-colors duration-500">
                  {c.title}
                </h3>
                <p className="m-0 text-[10px] font-bold text-violet-500/80 uppercase tracking-[0.25em] mt-0.5">
                  {c.subtitle}
                </p>
              </div>
              {c.handle && (
                <span className="text-[10px] font-black tracking-widest bg-violet-600 text-white px-3 py-1 rounded-full border border-violet-400/50 shadow-[0_0_15px_rgba(147,51,234,0.4)] transform group-hover:scale-110 transition-transform duration-500">
                  {c.handle}
                </span>
              )}
            </div>
          </footer>
        </article>
      ))}

      {/* Mask Layers */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.7)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.7)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'
        }}
      />
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.7)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.7)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          opacity: 1
        }}
      />
    </div>
  );
};

export default ChromaGrid;
