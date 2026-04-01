'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollSectionProps {
  children: ReactNode;
  className?: string;
}

export default function HorizontalScrollSection({
  children,
  className,
}: HorizontalScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const section = sectionRef.current;
    const inner = innerRef.current;
    const progressBar = progressRef.current;
    if (!section || !inner || !progressBar) return;

    const scrollWidth = inner.scrollWidth - section.offsetWidth;

    if (scrollWidth <= 0) return;

    const tween = gsap.to(inner, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(progressBar, { scaleX: self.progress });
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ready]);

  return (
    <div ref={sectionRef} className={className} style={{ overflow: 'hidden', position: 'relative' }}>
      <div
        ref={innerRef}
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
      <div
        ref={progressRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 2,
          background: '#10b981',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          zIndex: 10,
        }}
      />
    </div>
  );
}
