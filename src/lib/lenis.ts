'use client';

import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

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

    const raf = (time: number) => {
      lenisInstance?.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
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
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
};
