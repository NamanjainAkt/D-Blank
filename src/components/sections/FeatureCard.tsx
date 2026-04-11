"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

import GameplayPreview from "./micro/GameplayPreview";
import ToolStack from "./micro/ToolStack";
import OutcomeTimeline from "./micro/OutcomeTimeline";
import MentorshipFlow from "./micro/MentorshipFlow";
import PortfolioStack from "./micro/PortfolioStack";

const MicroComponents: Record<string, React.ElementType> = {
  "01": GameplayPreview,
  "02": ToolStack,
  "03": OutcomeTimeline,
  "04": MentorshipFlow,
  "05": PortfolioStack,
};

interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  className?: string;
  index: number;
}

export default function FeatureCard({
  id,
  title,
  description,
  icon: Icon,
  accentColor,
  className = "",
  index,
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLarge = className.includes("col-span-2") || className.includes("col-span-3");
  const MicroComponent = MicroComponents[id];

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: index * 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative rounded-xl border border-white/[0.08] bg-zinc-900/50 transition-colors duration-300 hover:border-white/[0.15] hover:bg-zinc-900/70",
        isLarge ? "p-8" : "p-6",
        className
      )}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Subtle corner glow on hover */}
      <div
        className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 blur-2xl rounded-full pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div className={cn(
        "relative z-10 flex h-full",
        isLarge ? "flex-row items-center gap-6" : "flex-col"
      )}>
        <div className={cn(isLarge ? "flex-1" : "flex-1 flex flex-col")}>
          {/* Header: Icon + Number */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className={cn(
                "rounded-lg border border-white/[0.08] bg-white/[0.03] transition-colors duration-300 group-hover:border-white/[0.15]",
                isLarge ? "p-3" : "p-2.5"
              )}
              style={{ color: accentColor }}
            >
              <Icon size={isLarge ? 22 : 18} />
            </div>
            <span className="font-mono text-xs tracking-wider text-white/[0.15]">
              {id}
            </span>
          </div>

          {/* Micro-interaction for small cards */}
          {!isLarge && MicroComponent && (
            <div className="relative mb-3">
              <MicroComponent />
            </div>
          )}

          {/* Content */}
          <div className={cn(!isLarge && "flex-1")}>
            <h3
              className={cn(
                "font-bold tracking-tight text-white mb-2 transition-colors duration-300",
                isLarge
                  ? "text-xl md:text-2xl group-hover:text-primary"
                  : "text-sm group-hover:text-primary"
              )}
            >
              {title}
            </h3>
            <p className={cn(
              "text-zinc-400 leading-relaxed",
              isLarge ? "text-sm max-w-md" : "text-xs max-w-[240px]"
            )}>
              {description}
            </p>
          </div>
        </div>

        {/* Micro-interaction for large cards — right side */}
        {isLarge && MicroComponent && (
          <div className="relative w-2/5 flex items-center justify-center">
            <MicroComponent />
          </div>
        )}
      </div>
    </div>
  );
}
