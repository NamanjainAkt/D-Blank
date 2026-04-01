'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AnimationType = 'fadeUp' | 'scaleIn' | 'rotateIn';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  animation?: AnimationType;
}

const animationPresets: Record<AnimationType, gsap.TweenVars> = {
  fadeUp: { y: 40, opacity: 0 },
  scaleIn: { scale: 0, opacity: 0 },
  rotateIn: { rotationX: 90, opacity: 0 },
};

export default function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.03,
  animation = 'fadeUp',
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll<HTMLSpanElement>('.split-char');
    if (chars.length === 0) return;

    const fromVars = animationPresets[animation];

    gsap.set(chars, fromVars);

    const tween = gsap.to(chars, {
      ...Object.fromEntries(
        Object.keys(fromVars).map((key) => [key, key === 'opacity' ? 1 : 0])
      ),
      opacity: 1,
      scale: animation === 'scaleIn' ? 1 : undefined,
      duration: 0.8,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        scrub: false,
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text, delay, stagger, animation]);

  const characters = text.split('').map((char, i) => (
    <span
      key={`${char}-${i}`}
      className="split-char"
      style={{
        display: 'inline-block',
        willChange: 'transform, opacity',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <div ref={containerRef} className={className} style={{ perspective: 600 }}>
      {characters}
    </div>
  );
}
