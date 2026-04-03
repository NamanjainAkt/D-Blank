"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Import Micro-components
import GameplayPreview from "./micro/GameplayPreview";
import ToolStack from "./micro/ToolStack";
import OutcomeTimeline from "./micro/OutcomeTimeline";
import MentorshipFlow from "./micro/MentorshipFlow";
import PortfolioStack from "./micro/PortfolioStack";

gsap.registerPlugin(ScrollTrigger);

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
  const glowRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const gridLinesRef = useRef<HTMLDivElement>(null);
  const isLarge = className.includes("col-span-2") || className.includes("col-span-3");
  const MicroComponent = MicroComponents[id];

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Entrance animation
    gsap.fromTo(
      card,
      { y: 60, opacity: 0, scale: 0.92 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: index * 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Number count-up animation (glitch-style reveal)
    if (numberRef.current) {
      const originalText = numberRef.current.textContent || "";
      numberRef.current.textContent = "00";
      
      gsap.to(numberRef.current, {
        onUpdate: function() {
          const progress = this.progress();
          const currentNum = Math.floor(progress * parseInt(originalText));
          numberRef.current!.textContent = currentNum.toString().padStart(2, "0");
        },
        duration: 0.6,
        delay: index * 0.12 + 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onComplete: () => {
          if (numberRef.current) {
            numberRef.current.textContent = originalText;
          }
        },
      });
    }

    // Parallax blob movement
    if (blobRef.current) {
      gsap.to(blobRef.current, {
        y: -40,
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Hover tilt effect
    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x - 100,
          y: y - 100,
          opacity: 0.5,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (iconRef.current) {
        gsap.to(iconRef.current, {
          scale: 1.1,
          rotate: 5,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      if (numberRef.current) {
        gsap.to(numberRef.current, {
          opacity: 0.35,
          duration: 0.3,
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0,
          duration: 0.4,
        });
      }

      if (iconRef.current) {
        gsap.to(iconRef.current, {
          scale: 1,
          rotate: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      if (numberRef.current) {
        gsap.to(numberRef.current, {
          opacity: 0.15,
          duration: 0.3,
        });
      }
    };

    card.addEventListener("mousemove", onMouseMove);
    card.addEventListener("mouseleave", onMouseLeave);

    return () => {
      card.removeEventListener("mousemove", onMouseMove);
      card.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative rounded-xl border border-white/[0.08] bg-zinc-900/50 backdrop-blur-xl transition-all duration-500 hover:border-white/[0.15] hover:bg-zinc-900/60",
        isLarge ? "p-8" : "p-6",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Parallax Background Blob */}
      <div
        ref={blobRef}
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-[0.03] pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      {/* Animated Gradient Background - ONLY for big card */}
      {isLarge && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-fuchsia-500/8 to-indigo-600/10 animate-pulse" />
          <div 
            ref={gridLinesRef}
            className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(90deg,currentColor_1px,transparent_1px),linear-gradient(currentColor_1px,transparent_1px)] bg-[size:32px_32px]"
            style={{ color: accentColor }}
          />
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute top-3/4 right-1/4 w-0.5 h-0.5 bg-white/20 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
            <div className="absolute bottom-1/3 left-1/3 w-0.5 h-0.5 bg-white/25 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
          </div>
        </div>
      )}

      {/* Interactive Cursor Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-48 w-48 rounded-full blur-[100px] opacity-0"
        style={{
          background: accentColor,
          mixBlendMode: "screen",
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      {/* Neon Border Sweep Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div
          className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-current to-transparent"
          style={{ color: accentColor }}
        />
        <div
          className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-current to-transparent"
          style={{ color: accentColor }}
        />
      </div>

      <div className={cn(
        "relative z-10 flex h-full",
        isLarge ? "flex-row items-center gap-6" : "flex-col"
      )}>
        {/* Left / Top content area */}
        <div className={cn(isLarge ? "flex-1" : "flex-1 flex flex-col")}>
          {/* Header: Number + Icon */}
          <div className="flex items-start justify-between mb-4">
            <span
              ref={numberRef}
              className="font-mono text-xs tracking-wider text-white/[0.15] transition-opacity"
            >
              {id}
            </span>
            <div
              ref={iconRef}
              className={cn(
                "rounded-lg border border-white/[0.08] bg-white/[0.03] transition-all duration-500",
                isLarge ? "p-3" : "p-2.5"
              )}
              style={{ color: accentColor }}
            >
              <Icon size={isLarge ? 22 : 18} />
            </div>
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
              ref={titleRef}
              className={cn(
                "font-bold tracking-tight text-white mb-2 transition-all duration-300",
                isLarge
                  ? "text-xl md:text-2xl group-hover:bg-gradient-to-br group-hover:from-violet-400 group-hover:via-fuchsia-300 group-hover:to-indigo-500 group-hover:bg-clip-text group-hover:text-transparent"
                  : "text-sm group-hover:text-violet-300"
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

      {/* Corner Accent Glow */}
      <div
        className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.12] transition-opacity blur-3xl pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />
    </div>
  );
}
