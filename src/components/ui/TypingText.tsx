'use client';

import { useEffect, useState, useRef } from 'react';

interface TypingTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function TypingText({ text, className = '', delay = 0, speed = 50 }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    const type = () => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.substring(0, currentIndex));
        currentIndex++;
        timeout = setTimeout(type, speed);
      }
    };

    const startTimeout = setTimeout(type, delay * 1000);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, [text, delay, speed, isVisible]);

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      <span>{displayedText}</span>
      <span className="text-emerald-400 animate-pulse">|</span>
    </span>
  );
}