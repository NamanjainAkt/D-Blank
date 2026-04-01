'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TypingTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function TypingText({ text, className = '', delay = 0, speed = 0.05 }: TypingTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current || !cursorRef.current) return;

    const chars = text.split('');
    let currentText = '';
    const tl = gsap.timeline({ delay });

    // Typing animation
    chars.forEach((char, index) => {
      tl.to({}, {
        duration: speed,
        onComplete: () => {
          currentText += char;
          if (textRef.current) {
            textRef.current.textContent = currentText;
          }
        }
      });
    });

    // Cursor blink after typing
    tl.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    }, '-=0.5');

    return () => {
      tl.kill();
    };
  }, [text, delay, speed]);

  return (
    <span className={`inline-block ${className}`}>
      <span ref={textRef}></span>
      <span ref={cursorRef} className="text-emerald-400">|</span>
    </span>
  );
}