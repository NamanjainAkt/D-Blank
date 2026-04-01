'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface PlasmaBackgroundProps {
  className?: string;
}

export function PlasmaBackground({ className = '' }: PlasmaBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      time += 0.01;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Create plasma effect
      for (let x = 0; x < w; x += 4) {
        for (let y = 0; y < h; y += 4) {
          const hue = (Math.sin(x * 0.01 + time) + Math.sin(y * 0.01 + time) + Math.sin((x + y) * 0.01 + time)) * 10 + 160;
          const saturation = 80 + Math.sin(time * 2) * 20;
          const lightness = 30 + Math.sin(x * 0.02 + y * 0.02 + time * 2) * 15;

          ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
          ctx.globalAlpha = 0.03;
          ctx.fillRect(x, y, 4, 4);
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
    </div>
  );
}

export default PlasmaBackground;
