"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Box, Code2, Database, GitBranch, Terminal } from "lucide-react";

const tools = [
  { name: "Unity", icon: Box, color: "#FFFFFF" },
  { name: "Unreal Engine", icon: Terminal, color: "#3B82F6" },
  { name: "Godot", icon: Box, color: "#60A5FA" },
  { name: "Blender", icon: Box, color: "#F59E0B" },
  { name: "Maya", icon: Box, color: "#22C55E" },
  { name: "Substance Painter", icon: Box, color: "#EF4444" },
  { name: "FMOD", icon: Box, color: "#A78BFA" },
  { name: "Git", icon: GitBranch, color: "#F43F5E" },
  { name: "Perforce", icon: Database, color: "#6366F1" },
  { name: "VS Code", icon: Code2, color: "#0EA5E9" },
];

export default function ToolStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current || !containerRef.current) return;

    const marquee = marqueeRef.current;
    const container = containerRef.current;

    const tl = gsap.to(marquee, {
      x: "-50%",
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    const onMouseEnter = () => gsap.to(tl, { timeScale: 0.2, duration: 0.4 });
    const onMouseLeave = () => gsap.to(tl, { timeScale: 1, duration: 0.4 });

    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      tl.kill();
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
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
              style={{ color: tool.color }}
              className="drop-shadow-[0_0_6px_currentColor]"
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
