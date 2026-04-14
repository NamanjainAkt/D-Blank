'use client';

import React, { useEffect, useRef, useState } from 'react';

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
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div 
        ref={containerRef} 
        className="flex flex-col gap-5 pb-5 will-change-transform"
        style={{
          animation: `scrollUp ${duration}s linear infinite`,
          animationPlayState: (!isVisible || isHovered) ? 'paused' : 'running'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className="relative rounded-3xl bg-zinc-900/60 sm:bg-white/[0.01] sm:backdrop-blur-2xl border border-white/[0.05] hover:border-primary/30 transition-all duration-500 p-4 group overflow-hidden"
          >
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            
            <svg className="w-8 h-8 text-primary/20 mb-2 rotate-180" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </svg>

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
      <style>{`
        @keyframes scrollUp {
          from { transform: translateY(0); }
          to { transform: translateY(calc(-50% - 10px)); }
        }
      `}</style>
    </div>
  );
};