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
          onClick={() => handleCardClick(c.url)}
          className="group relative flex flex-col w-full sm:max-w-[340px] aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/[0.06] hover:border-primary/20 transition-all duration-500 cursor-pointer mx-auto bg-black"
        >
          {/* Full-bleed background image */}
          <img
            src={c.image}
            alt={c.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.05] transition-transform duration-700 ease-out"
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

          {/* Spotlight on hover */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.04] transition-colors duration-500 pointer-events-none" />

          {/* Footer content — pinned to bottom */}
          <div className="relative z-10 mt-auto p-7 pt-16">
            <div className="flex justify-between items-end w-full">
              <div className="flex flex-col">
                <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-primary transition-colors duration-500">
                  {c.title}
                </h3>
                <p className="text-[10px] font-bold text-primary/80 uppercase tracking-[0.25em] mt-1">
                  {c.subtitle}
                </p>
              </div>
              {c.handle && (
                <span className="text-[10px] font-black tracking-widest bg-primary text-white px-3 py-1 rounded-full border border-primary/50 transform group-hover:scale-110 transition-transform duration-500">
                  {c.handle}
                </span>
              )}
            </div>
          </div>
        </article>
      ))}

      {/* Grayscale mask — reveals color on hover proximity */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          filter: 'grayscale(1) brightness(0.7)',
          mixBlendMode: 'color',
          background: 'rgba(128,128,128,0.5)',
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
          filter: 'grayscale(1) brightness(0.7)',
          mixBlendMode: 'color',
          background: 'rgba(128,128,128,0.5)',
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
