"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Gamepad2, Sword, Ghost } from "lucide-react";

const projects = [
  { name: "RPG Demo", icon: Sword, gradient: "from-violet-500/30 to-indigo-500/30", accent: "#8B5CF6" },
  { name: "Platformer", icon: Gamepad2, gradient: "from-fuchsia-500/30 to-pink-500/30", accent: "#D946EF" },
  { name: "Horror Game", icon: Ghost, gradient: "from-emerald-500/30 to-cyan-500/30", accent: "#10B981" },
];

export default function PortfolioStack() {
  const card0 = useRef<HTMLDivElement>(null);
  const card1 = useRef<HTMLDivElement>(null);
  const card2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c0 = card0.current;
    const c1 = card1.current;
    const c2 = card2.current;
    if (!c0 || !c1 || !c2) return;

    // Initial stacked state
    gsap.set(c0, { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 3, opacity: 1 });
    gsap.set(c1, { x: 3, y: -8, rotate: -1.5, scale: 0.96, zIndex: 2, opacity: 0.85 });
    gsap.set(c2, { x: 6, y: -16, rotate: -3, scale: 0.92, zIndex: 1, opacity: 0.7 });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    // Gentle float
    tl.to(c0, { y: -10, duration: 1, ease: "sine.inOut" });
    tl.to(c0, { y: 0, duration: 1, ease: "sine.inOut" });

    // Fan out all three cards explicitly
    tl.to(c0, { x: -40, y: 0, rotate: -6, scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.2)" }, "fan");
    tl.to(c1, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 3, duration: 0.5, ease: "back.out(1.2)" }, "fan+=0.06");
    tl.to(c2, { x: 40, y: 0, rotate: 6, scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.2)" }, "fan+=0.12");

    // Hold fanned out
    tl.to({}, { duration: 2.5 });

    // Stack back
    tl.to(c0, { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 3, opacity: 1, duration: 0.4, ease: "power2.inOut" }, "stack");
    tl.to(c1, { x: 3, y: -8, rotate: -1.5, scale: 0.96, zIndex: 2, opacity: 0.85, duration: 0.4, ease: "power2.inOut" }, "stack+=0.04");
    tl.to(c2, { x: 6, y: -16, rotate: -3, scale: 0.92, zIndex: 1, opacity: 0.7, duration: 0.4, ease: "power2.inOut" }, "stack+=0.08");

    // Hold stacked
    tl.to({}, { duration: 1.5 });

    return () => { tl.kill(); };
  }, []);

  const refs = [card0, card1, card2];

  return (
    <div className="relative w-full flex items-center justify-center min-h-[120px] py-2 overflow-visible">
      <div className="relative w-[88px] h-[115px] flex items-center justify-center overflow-visible">
        {projects.map((project, i) => (
          <div
            key={i}
            ref={refs[i]}
            className="absolute w-[88px] h-[115px] rounded-lg border border-white/10 bg-zinc-900/90 shadow-xl overflow-hidden flex flex-col will-change-transform"
          >
            <div className={`flex-1 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}>
              <project.icon size={20} className="text-white/25" />
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: `radial-gradient(circle at center, ${project.accent}40, transparent 70%)` }}
              />
            </div>
            <div className="px-2 py-1.5 border-t border-white/[0.06] bg-zinc-950/50">
              <div className="text-[7px] font-mono uppercase tracking-wider text-zinc-400">{project.name}</div>
              <div className="flex gap-1 mt-0.5">
                <div className="h-[3px] w-6 rounded-full" style={{ backgroundColor: `${project.accent}30` }} />
                <div className="h-[3px] w-4 bg-white/5 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
