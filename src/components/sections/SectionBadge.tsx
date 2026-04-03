"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SectionBadgeProps {
  label: string;
  pulseColor?: string;
}

export default function SectionBadge({
  label,
  pulseColor = "bg-violet-400",
}: SectionBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!badgeRef.current || !dotRef.current) return;

    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 10, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
    );

    gsap.to(dotRef.current, {
      scale: 1.5,
      opacity: 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    tl.play();

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={badgeRef}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm opacity-0"
    >
      <div className="relative flex items-center justify-center">
        <div
          ref={dotRef}
          className={`absolute w-1.5 h-1.5 rounded-full ${pulseColor} opacity-30`}
        />
        <div className={`w-1.5 h-1.5 rounded-full ${pulseColor}`} />
      </div>
      <span className="text-[10px] font-display tracking-[0.2em] uppercase text-zinc-400">
        {label}
      </span>
    </div>
  );
}
