'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface TypingTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function TypingText({ text, className = '', delay = 0, speed = 0.05 }: TypingTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tlRef = useRef<any>(null);

  useEffect(() => {
    if (!textRef.current || !cursorRef.current) return;

    const ctx = gsap.context(() => {
      const obj = { length: 0 };
      const tl = gsap.timeline({ delay });

      tl.to(obj, {
        length: text.length,
        duration: text.length * speed,
        ease: 'none',
        onUpdate: () => {
          if (textRef.current) {
            textRef.current.textContent = text.substring(0, Math.ceil(obj.length));
          }
        }
      });

      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });

      tlRef.current = tl;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          tlRef.current?.pause();
        } else {
          tlRef.current?.resume();
        }
      },
      { threshold: 0 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, [text, delay, speed]);

  return (
    <span className={`inline-block ${className}`}>
      <span ref={textRef}></span>
      <span ref={cursorRef} className="text-emerald-400">|</span>
    </span>
  );
}