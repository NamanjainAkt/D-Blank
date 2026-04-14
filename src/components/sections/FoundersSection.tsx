'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChromaGrid, { ChromaItem } from '@/components/ui/ChromaGrid';
import { MorphingBlobs } from '@/components/ui/MorphingBlobs';
import { founders } from '@/lib/placeholder-data';
import AnimatedContent from '@/components/AnimatedContent';

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary" />
      <span className="text-primary text-[10px] font-display tracking-[0.35em] uppercase">
        {children}
      </span>
      <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary" />
    </div>
  );
}

const FoundersSection = () => {
  // Map founders to ChromaItem format
  const chromaItems: ChromaItem[] = founders.map(f => ({
    image: f.image,
    title: f.name,
    subtitle: f.role,
    handle: `@${f.name.toLowerCase().replace(/\s+/g, '')}`,
    borderColor: '#a855f7',
    gradient: 'linear-gradient(to bottom, #18181b, #000)',
    url: '/studio'
  }));

  return (
    <section className="py-32 px-4 bg-black relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <MorphingBlobs 
          colors={['rgba(168, 85, 247, 0.08)', 'rgba(217, 70, 239, 0.08)']} 
          className="opacity-50"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168, 85, 247, 0.05),transparent_70%)]" />
      </div>

      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-primary/[0.03] rounded-full blur-[60px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <AnimatedContent 
          className="text-center mb-24"
          distance={20}
        >
          <SectionLabel>Our Team</SectionLabel>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
            Meet the <span className="bg-gradient-to-br from-primary via-accent to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(168, 85, 247, 0.4)]">Founders</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            A passionate team of game developers, artists, and educators
            united by a love for interactive storytelling and vocational innovation.
          </p>
        </AnimatedContent>

        <AnimatedContent 
          delay={0.2}
          distance={20}
          scale={0.98}
        >
          <ChromaGrid 
            items={chromaItems} 
            radius={350}
            damping={0.5}
            fadeOut={0.8}
          />
        </AnimatedContent>

        <div className="text-center mt-16">
          <Button
            variant="outline"
            className="border-zinc-800 bg-zinc-900/50 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300 text-[10px] uppercase font-display tracking-widest px-10 py-6"
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
