"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  UnityIcon,
  UnrealEngineIcon,
  GodotIcon,
  BlenderIcon,
  AutodeskIcon,
  SubstancePainterIcon,
  FMODIcon,
  GitIcon,
  PerforceIcon,
  VSCodeIcon,
} from "@/components/icons/ToolIcons";

const tools = [
  { name: "Unity", icon: UnityIcon, color: "#FFFFFF" },
  { name: "Unreal Engine", icon: UnrealEngineIcon, color: "#3B82F6" },
  { name: "Godot", icon: GodotIcon, color: "#478CBF" },
  { name: "Blender", icon: BlenderIcon, color: "#F59E0B" },
  { name: "Maya", icon: AutodeskIcon, color: "#22C55E" },
  { name: "Substance Painter", icon: SubstancePainterIcon, color: "#EF4444" },
  { name: "FMOD", icon: FMODIcon, color: "#A78BFA" },
  { name: "Git", icon: GitIcon, color: "#F43F5E" },
  { name: "Perforce", icon: PerforceIcon, color: "#6366F1" },
  { name: "VS Code", icon: VSCodeIcon, color: "#0EA5E9" },
];

export default function ToolStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current || !containerRef.current) return;

    const marquee = marqueeRef.current;
    const container = containerRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.to(marquee, {
        x: "-50%",
        duration: 20,
        ease: "none",
        repeat: -1,
        scrollTrigger: {
          trigger: container,
          start: "top 110%",
          end: "bottom -10%",
          toggleActions: "play pause resume pause",
        }
      });

      const onMouseEnter = () => gsap.to(tl, { timeScale: 0.2, duration: 0.4 });
      const onMouseLeave = () => gsap.to(tl, { timeScale: 1, duration: 0.4 });

      container.addEventListener("mouseenter", onMouseEnter);
      container.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full flex items-center overflow-hidden cursor-pointer py-2">
      <div
        ref={marqueeRef}
        className="flex gap-2.5 items-center whitespace-nowrap"
      >
        {[...tools, ...tools].map((tool, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center px-3 py-2 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-300 min-w-[60px]"
          >
            <tool.icon
              size={16}
              color={tool.color}
            />
            <span className="text-[6px] mt-1.5 text-zinc-500 font-mono uppercase tracking-wider leading-none">
              {tool.name}
            </span>
          </div>
        ))}
      </div>

      {/* Gradient Masks */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-zinc-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-zinc-900 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
