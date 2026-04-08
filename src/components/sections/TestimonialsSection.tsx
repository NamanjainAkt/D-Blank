'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TestimonialsColumn } from '@/components/ui/TestimonialsColumn';
import { testimonials } from '@/lib/placeholder-data';

const avatarColors = [
  'from-primary to-purple-700',
  'from-cyan-600 to-blue-700',
  'from-amber-600 to-orange-700',
  'from-emerald-600 to-green-700',
  'from-pink-600 to-rose-700',
  'from-indigo-600 to-blue-700',
];

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

const TestimonialsSection = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      }
    );
  }, []);

  // Prepare columns (staggered display for visual variation)
  const firstColumn = [...testimonials];
  const secondColumn = [...testimonials.slice(2), ...testimonials.slice(0, 2)];
  const thirdColumn = [...testimonials.slice(4), ...testimonials.slice(0, 4)];

  return (
    <section className="py-20 px-4 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div ref={headerRef} className="text-center mb-14 opacity-0">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            What Our <span className="bg-gradient-to-br from-primary via-accent to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(176,38,255,0.4)]">Community</span> Says
          </h2>
          <p className="text-zinc-500 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            See what our players and developers have to say about their experience with D-Blanks.
          </p>
        </div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn
            testimonials={firstColumn}
            duration={25}
            avatarColors={avatarColors}
          />
          <TestimonialsColumn
            testimonials={secondColumn}
            duration={32}
            className="hidden sm:block"
            avatarColors={[...avatarColors].reverse()}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            duration={28}
            className="hidden lg:block"
            avatarColors={avatarColors}
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
