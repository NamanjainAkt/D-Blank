'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    cursor.style.opacity = '1';
    trail.style.opacity = '1';

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });
    const trailXTo = gsap.quickTo(trail, 'x', { duration: 0.5, ease: 'power3.out' });
    const trailYTo = gsap.quickTo(trail, 'y', { duration: 0.5, ease: 'power3.out' });

    let activeMagnetic: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      xTo(clientX - 7);
      yTo(clientY - 7);
      trailXTo(clientX - 3);
      trailYTo(clientY - 3);

      if (activeMagnetic) {
        const rect = activeMagnetic.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = Math.max(rect.width, rect.height);

        if (distance < maxDistance) {
          const strength = 8;
          const moveX = (deltaX / maxDistance) * strength;
          const moveY = (deltaY / maxDistance) * strength;
          gsap.to(activeMagnetic, {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      }
    };

    const handleMouseEnterMagnetic = (e: Event) => {
      activeMagnetic = e.currentTarget as HTMLElement;
      gsap.to(cursor, { scale: 2, duration: 0.3, ease: 'power2.out' });
      gsap.to(trail, { scale: 1.5, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeaveMagnetic = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(trail, { scale: 1, duration: 0.3, ease: 'power2.out' });
      activeMagnetic = null;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const magneticElements = document.querySelectorAll<HTMLElement>('[data-magnetic]');
    magneticElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterMagnetic);
      el.addEventListener('mouseleave', handleMouseLeaveMagnetic);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      magneticElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterMagnetic);
        el.removeEventListener('mouseleave', handleMouseLeaveMagnetic);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 14,
          height: 14,
          borderRadius: '50%',
          backgroundColor: '#d946ef',
          boxShadow: '0 0 8px #d946ef, 0 0 20px #d946ef, 0 0 40px rgba(217,70,239,0.5)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          willChange: 'transform',
        }}
      />
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#f0abfc',
          boxShadow: '0 0 6px #d946ef',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
}
