import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
  });

  const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
  if (isMobile) {
    gsap.ticker.fps(30);
  }
}

export { gsap, ScrollTrigger };
