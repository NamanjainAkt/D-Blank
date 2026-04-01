'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';

interface TiltedCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
}

export function TiltedCard({ children, className = '', tiltAmount = 15 }: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [`-${tiltAmount}deg`, `${tiltAmount}deg`]);
  const rotateY = useTransform(x, [-0.5, 0.5], [`${tiltAmount}deg`, `-${tiltAmount}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = (e.clientX - centerX) / rect.width;
    const mouseY = (e.clientY - centerY) / rect.height;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      <div
        style={{ transform: 'translateZ(20px)' }}
        className="relative"
      >
        {children}
      </div>
    </motion.div>
  );
}

export default TiltedCard;
