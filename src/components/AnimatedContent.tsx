import React, { useRef, useEffect, useState } from 'react';

interface AnimatedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  container?: Element | string | null;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  container,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'ease-out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'ease-in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const el = ref.current;
    if (!el) return;

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
          if (onComplete) {
            setTimeout(onComplete, (duration + delay) * 1000);
          }
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, hasAnimated, duration, delay, onComplete]);

  const axis = direction === 'horizontal' ? 'X' : 'Y';
  
  // Only use mobile specific values after mounting to avoid hydration mismatch
  const isMobile = hasMounted && window.innerWidth < 768;
  const baseDistance = isMobile ? Math.min(distance, 20) : distance;
  const offset = reverse ? -baseDistance : baseDistance;
  
  const finalScale = isMobile ? 1 : scale;

  const initialStyles: React.CSSProperties = {
    opacity: animateOpacity ? initialOpacity : 1,
    transform: `translate${axis}(${offset}px) scale(${finalScale})`,
    transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    visibility: isVisible ? 'visible' : 'hidden', // to prevent interaction before entrance
  };

  const visibleStyles: React.CSSProperties = {
    opacity: 1,
    transform: `translate${axis}(0px) scale(1)`,
    transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    visibility: 'visible',
  };

  return (
    <div 
      ref={ref} 
      className={className} 
      style={hasAnimated ? visibleStyles : initialStyles}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedContent;
