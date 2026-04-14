"use client";

import { Gamepad2, Sword, Ghost } from "lucide-react";

const projects = [
  { name: "RPG Demo", icon: Sword, gradient: "from-primary/30 to-indigo-500/30", accent: "#8B5CF6" },
  { name: "Platformer", icon: Gamepad2, gradient: "from-accent/30 to-pink-500/30", accent: "#D946EF" },
  { name: "Horror Game", icon: Ghost, gradient: "from-emerald-500/30 to-cyan-500/30", accent: "#10B981" },
];

export default function PortfolioStack() {
  return (
    <div className="relative w-full flex items-center justify-center min-h-[120px] py-2 overflow-visible">
      <style jsx>{`
        @keyframes card-0-anim {
          0%, 100% { transform: translate(0, 0) rotate(0) scale(1); z-index: 3; opacity: 1; }
          10% { transform: translate(0, -10px) rotate(0) scale(1); }
          20% { transform: translate(-40px, 0) rotate(-6deg) scale(1); opacity: 1; }
          70% { transform: translate(-40px, 0) rotate(-6deg) scale(1); opacity: 1; }
          80% { transform: translate(0, 0) rotate(0) scale(1); opacity: 1; }
        }
        @keyframes card-1-anim {
          0%, 100% { transform: translate(3px, -8px) rotate(-1.5deg) scale(0.96); z-index: 2; opacity: 0.85; }
          22% { transform: translate(3px, -8px) rotate(-1.5deg) scale(0.96); opacity: 0.85; }
          32% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; z-index: 4; }
          70% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; z-index: 4; }
          82% { transform: translate(3px, -8px) rotate(-1.5deg) scale(0.96); opacity: 0.85; z-index: 2; }
        }
        @keyframes card-2-anim {
          0%, 100% { transform: translate(6px, -16px) rotate(-3deg) scale(0.92); z-index: 1; opacity: 0.7; }
          24% { transform: translate(6px, -16px) rotate(-3deg) scale(0.92); opacity: 0.7; }
          34% { transform: translate(40px, 0) rotate(6deg) scale(1); opacity: 1; }
          70% { transform: translate(40px, 0) rotate(6deg) scale(1); opacity: 1; }
          84% { transform: translate(6px, -16px) rotate(-3deg) scale(0.92); opacity: 0.7; }
        }
        .animate-card-0 { animation: card-0-anim 6s infinite; }
        .animate-card-1 { animation: card-1-anim 6s infinite; }
        .animate-card-2 { animation: card-2-anim 6s infinite; }
      `}</style>
      <div className="relative w-[88px] h-[115px] flex items-center justify-center overflow-visible">
        {projects.map((project, i) => (
          <div
            key={i}
            className={`absolute w-[88px] h-[115px] rounded-lg border border-white/10 bg-zinc-900/90 shadow-xl overflow-hidden flex flex-col will-change-transform animate-card-${i}`}
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
