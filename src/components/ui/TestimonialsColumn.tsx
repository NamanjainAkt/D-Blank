'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Quote } from 'lucide-react';

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
            className="relative rounded-3xl bg-white/[0.01] backdrop-blur-2xl border border-white/[0.05] hover:border-violet-500/30 transition-all duration-500 p-4 group overflow-hidden"
          >
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
            
            <Quote className="w-8 h-8 text-violet-500/20 mb-2 rotate-180" />

            <p className="text-zinc-300 text-xs leading-relaxed mb-4 italic">
              "{testimonial.content}"
            </p>

            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                  avatarColors[index % avatarColors.length]
                } flex items-center justify-center text-white font-bold text-[10px] shrink-0 ring-1 ring-white/10`}
              >
                {testimonial.name[0]}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-white text-xs truncate">
                  {testimonial.name}
                </p>
                <p className="text-[10px] text-zinc-500 truncate">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
