'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChromaGrid, { ChromaItem } from '@/components/ui/ChromaGrid';
import { founders } from '@/lib/placeholder-data';

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="w-8 h-px bg-gradient-to-r from-transparent to-violet-500" />
      <span className="text-violet-400 text-[10px] font-display tracking-[0.35em] uppercase">
        {children}
      </span>
      <div className="w-8 h-px bg-gradient-to-l from-transparent to-violet-500" />
    </div>
  );
}

const FoundersSection = () => {
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }
    );

    tl.fromTo(
      gridRef.current,
      { opacity: 0, scale: 0.98 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.4'
    );
  }, []);

  // Map founders to ChromaItem format
  const chromaItems: ChromaItem[] = founders.map(f => ({
    image: f.image,
    title: f.name,
    subtitle: f.role,
    handle: `@${f.name.toLowerCase().replace(/\s+/g, '')}`,
    borderColor: '#b026ff',
    gradient: 'linear-gradient(to bottom, #18181b, #000)',
    url: '/studio'
  }));

  return (
    <section className="py-32 px-4 bg-zinc-950 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-violet-600/[0.03] rounded-full blur-[160px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div ref={headerRef} className="text-center mb-24 opacity-0">
          <SectionLabel>Our Team</SectionLabel>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
            Meet the <span className="text-violet-400">Founders</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            A passionate team of game developers, artists, and educators
            united by a love for interactive storytelling and vocational innovation.
          </p>
        </div>

        <div ref={gridRef} className="opacity-0">
          <ChromaGrid 
            items={chromaItems} 
            radius={350}
            damping={0.5}
            fadeOut={0.8}
          />
        </div>

        <div className="text-center mt-16">
          <Button
            variant="outline"
            className="border-zinc-800 bg-zinc-900/50 hover:border-violet-500/50 hover:bg-violet-500/5 hover:text-violet-400 transition-all duration-300 text-[10px] uppercase font-display tracking-widest px-10 py-6"
            asChild
          >
            <Link href="/studio">
              View Full Team
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
