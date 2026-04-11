'use client';

import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

let lenisInstance: Lenis | null = null;

export const getLenis = () => {
  if (typeof window === 'undefined') return null;

  // Disable on mobile/touch devices for smoother performance
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch || window.innerWidth < 1024) return null;

  if (!lenisInstance) {
    lenisInstance = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Integrate Lenis with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenisInstance?.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  return lenisInstance;
};

export const startLenis = () => {
  getLenis();
};

export const stopLenis = () => {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
};
