"use client";

import { useEffect, useRef, useState } from "react";

interface SectionBadgeProps {
  label: string;
  pulseColor?: string;
}

export default function SectionBadge({
  label,
  pulseColor = "bg-primary",
}: SectionBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (badgeRef.current) {
            observer.unobserve(badgeRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (badgeRef.current) {
      observer.observe(badgeRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={badgeRef}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
      }`}
    >
      <div className="relative flex items-center justify-center">
        <div
          className={`absolute w-1.5 h-1.5 rounded-full ${pulseColor} opacity-30 md:animate-ping`}
        />
        <div className={`w-1.5 h-1.5 rounded-full ${pulseColor}`} />
      </div>
      <span className="text-[10px] font-display tracking-[0.2em] uppercase text-zinc-400">
        {label}
      </span>
    </div>
  );
}
