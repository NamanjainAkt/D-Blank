"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { BrainCircuit, MessageSquare, RefreshCcw } from "lucide-react";

const nodes = [
  { icon: BrainCircuit, label: "Learn", color: "#B026FF" },
  { icon: MessageSquare, label: "Review", color: "#E879F9" },
  { icon: RefreshCcw, label: "Iterate", color: "#818CF8" },
];

export default function MentorshipFlow() {
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodeEls = nodesRef.current.filter(Boolean) as HTMLDivElement[];
    if (nodeEls.length === 0 || !dotRef.current) return;

    // Get positions for the traveling dot
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });

    nodes.forEach((node, i) => {
      const nodeEl = nodeEls[i];

      // Highlight current node
      tl.to(nodeEl, {
        borderColor: node.color,
        boxShadow: `0 0 24px ${node.color}50, inset 0 0 16px ${node.color}15`,
        scale: 1.1,
        duration: 0.4,
      });

      // Move dot to next position
      if (i < nodes.length - 1) {
        tl.to(dotRef.current, {
          x: `+=${110}`,
          duration: 0.5,
          ease: "power2.inOut",
        }, "+=0.3");
      }

      // Dim current node
      tl.to(nodeEl, {
        borderColor: `${node.color}20`,
        boxShadow: "none",
        scale: 1,
        duration: 0.3,
      }, "-=0.2");
    });

    // Return dot to start
    tl.to(dotRef.current, {
      x: 0,
      duration: 0.6,
      ease: "power2.inOut",
    }, "+=0.3");

    // Pause before repeat
    tl.to({}, { duration: 0.5 });

    return () => { tl.kill(); };
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center min-h-[100px] py-3">
      <div className="relative flex items-start gap-0">
        {nodes.map((node, i) => (
          <div key={i} className="flex items-start">
            {/* Node */}
            <div className="flex flex-col items-center gap-2 w-[70px]">
              <div
                ref={(el) => { nodesRef.current[i] = el; }}
                className="relative w-[46px] h-[46px] rounded-xl border-[1.5px] flex items-center justify-center bg-zinc-950/80"
                style={{ borderColor: `${node.color}20` }}
              >
                <node.icon size={20} style={{ color: node.color }} className="drop-shadow-[0_0_8px_currentColor]" />
              </div>
              <span className="text-[7px] font-mono uppercase tracking-[0.12em] text-zinc-500">
                {node.label}
              </span>
            </div>

            {/* Connector */}
            {i < nodes.length - 1 && (
              <div className="flex items-center h-[46px] -mx-2">
                <div className="w-[40px] flex items-center">
                  <div className="flex-1 h-[1.5px] bg-white/[0.06] rounded-full relative overflow-hidden">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${node.color}30, ${nodes[i + 1].color}30)`,
                      }}
                    />
                  </div>
                  <svg width="6" height="10" viewBox="0 0 6 10" className="ml-0.5 flex-shrink-0">
                    <path d="M1 1L5 5L1 9" stroke={`${nodes[i + 1].color}40`} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Traveling dot */}
        <div
          ref={dotRef}
          className="absolute top-[22px] left-[34px] w-2 h-2 rounded-full pointer-events-none"
          style={{
            background: "white",
            boxShadow: "0 0 12px rgba(176, 38, 255, 0.8), 0 0 4px white",
          }}
        />

        {/* Loop indicator below */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-40">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-violet-500/30 rounded-full" />
          <RefreshCcw size={8} className="text-violet-400" />
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-violet-500/30 rounded-full" />
        </div>
      </div>
    </div>
  );
}
