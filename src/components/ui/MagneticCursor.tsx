'use client';

import { useEffect, useRef } from 'react';

const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

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

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;
    let trailX = 0;
    let trailY = 0;

    let cursorScale = 1;
    let trailScale = 1;
    let cursorTargetScale = 1;
    let trailTargetScale = 1;

    let activeMagnetic: HTMLElement | null = null;
    const magneticStates = new Map<HTMLElement, { x: number; y: number; targetX: number; targetY: number }>();

    let animationFrameId: number;
    let isInitialized = false;

    const render = () => {
      cursorX = lerp(cursorX, mouseX - 7, 0.15);
      cursorY = lerp(cursorY, mouseY - 7, 0.15);
      trailX = lerp(trailX, mouseX - 3, 0.1);
      trailY = lerp(trailY, mouseY - 3, 0.1);

      cursorScale = lerp(cursorScale, cursorTargetScale, 0.15);
      trailScale = lerp(trailScale, trailTargetScale, 0.15);

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) scale(${cursorScale})`;
      trail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) scale(${trailScale})`;

      magneticStates.forEach((state, el) => {
        state.x = lerp(state.x, state.targetX, 0.15);
        state.y = lerp(state.y, state.targetY, 0.15);
        el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;

        if (state.targetX === 0 && state.targetY === 0 && Math.abs(state.x) < 0.1 && Math.abs(state.y) < 0.1) {
          el.style.transform = 'translate3d(0px, 0px, 0)';
          magneticStates.delete(el);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isInitialized) {
        cursorX = mouseX - 7;
        cursorY = mouseY - 7;
        trailX = mouseX - 3;
        trailY = mouseY - 3;
        isInitialized = true;
      }

      if (activeMagnetic) {
        const state = magneticStates.get(activeMagnetic);
        const currentX = state ? state.x : 0;
        const currentY = state ? state.y : 0;

        const rect = activeMagnetic.getBoundingClientRect();
        const centerX = rect.left - currentX + rect.width / 2;
        const centerY = rect.top - currentY + rect.height / 2;

        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = Math.max(rect.width, rect.height);

        if (distance < maxDistance) {
          const strength = 8;
          const targetX = (deltaX / maxDistance) * strength;
          const targetY = (deltaY / maxDistance) * strength;

          if (!state) {
            magneticStates.set(activeMagnetic, { x: 0, y: 0, targetX, targetY });
          } else {
            state.targetX = targetX;
            state.targetY = targetY;
          }
        }
      }
    };

    const handleMouseEnterMagnetic = (e: Event) => {
      activeMagnetic = e.currentTarget as HTMLElement;
      cursorTargetScale = 2;
      trailTargetScale = 1.5;
    };

    const handleMouseLeaveMagnetic = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const state = magneticStates.get(target);
      if (state) {
        state.targetX = 0;
        state.targetY = 0;
      }
      cursorTargetScale = 1;
      trailTargetScale = 1;
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
      cancelAnimationFrame(animationFrameId);
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
