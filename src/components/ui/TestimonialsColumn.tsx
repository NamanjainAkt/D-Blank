'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Testimonial {
  id: number | string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

interface TestimonialsColumnProps {
  testimonials: Testimonial[];
  duration?: number;
  className?: string;
  avatarColors: string[];
}

export const TestimonialsColumn = ({
  testimonials,
  duration = 20,
  className = '',
  avatarColors,
}: TestimonialsColumnProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Calculate the height of one full set of testimonials
    const totalHeight = el.scrollHeight / 2;

    const tl = gsap.to(el, {
      y: -totalHeight,
      duration: duration,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      tl.kill();
    };
  }, [duration, testimonials]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={containerRef} className="flex flex-col gap-5 pb-5">
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className="relative rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-violet-500/30 transition-all duration-300 p-5 group overflow-hidden"
          >
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
            {/* Subtle corner glow on hover */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-violet-500/0 group-hover:bg-violet-500/8 rounded-full blur-2xl transition-colors duration-500" />

            {/* Large decorative quote */}
            <div className="text-7xl font-black text-violet-500/12 leading-none mb-1 select-none font-display">
              "
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
              "{testimonial.content}"
            </p>

            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                  avatarColors[index % avatarColors.length]
                } flex items-center justify-center text-white font-bold text-sm shrink-0 ring-2 ring-zinc-800`}
              >
                {testimonial.name[0]}
              </div>
              <div>
                <p className="font-semibold text-white text-sm">
                  {testimonial.name}
                </p>
                <p className="text-xs text-zinc-600">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
