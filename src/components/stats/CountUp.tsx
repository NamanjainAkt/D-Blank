'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUp({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    // Use gsap.context() for better cleanup
    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      ScrollTrigger.create({
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          setIsLoading(false);
          gsap.to(counter, {
            value: end,
            duration: duration,
            ease: 'power2.out',
            onUpdate: () => {
              setCount(Math.floor(counter.value));
            },
          });
        },
        onLeaveBack: () => {
          setCount(0);
          counter.value = 0;
        },
      });
    }, element);

    return () => ctx.revert();
  }, [end, duration]);

  // Debug: Force initial render with actual values for immediate visibility
  useEffect(() => {
    if (ref.current) {
      // Check if element is already visible on mount
      const rect = ref.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

      if (isVisible) {
        // Start animation immediately if visible
        setIsLoading(false);
        const counter = { value: 0 };
        gsap.to(counter, {
          value: end,
          duration: duration,
          ease: 'power2.out',
          onUpdate: () => {
            setCount(Math.floor(counter.value));
          },
        });
      }
    }
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {isLoading ? (
        <span className="inline-block w-16 h-8 bg-white/10 animate-pulse rounded"></span>
      ) : (
        count.toLocaleString()
      )}
      {suffix}
    </span>
  );
}

interface StatsRowProps {
  stats: { value: number; label: string; suffix: string }[];
  className?: string;
}

export function StatsRow({ stats, className = '' }: StatsRowProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-8 md:gap-16 ${className}`}>
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-laser-gradient font-display">
            <CountUp end={stat.value} suffix={stat.suffix} />
          </div>
          <div className="mt-2 text-[10px] font-mono uppercase tracking-widest text-white/40">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export default CountUp;
