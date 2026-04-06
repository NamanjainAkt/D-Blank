"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { BookOpen, Eye, RefreshCw } from "lucide-react";

const steps = [
  { icon: BookOpen, label: "Learn", color: "#B026FF", description: "Guided lessons" },
  { icon: Eye, label: "Review", color: "#E879F9", description: "Expert feedback" },
  { icon: RefreshCw, label: "Iterate", color: "#818CF8", description: "Refine & grow" },
];

export default function MentorshipFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const line = lineRef.current;
    const progress = progressRef.current;
    const dot = dotRef.current;

    if (!line || !progress || !dot) return;

    const tl = gsap.timeline({ repeat: -1 });

    // Animate progress line
    tl.fromTo(
      progress,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power2.inOut" }
    );

    // Animate dot through each step
    steps.forEach((_, i) => {
      const node = nodeRefs.current[i];
      const icon = iconRefs.current[i];

      if (!node) return;

      // Get position of node relative to container
      const nodeLeft = (i / (steps.length - 1)) * 100;

      // Move dot to node
      tl.to(
        dot,
        {
          left: `${nodeLeft}%`,
          scale: 1.4,
          duration: 0.6,
          ease: "power2.out",
        },
        i * 0.8
      );

      // Pulse node
      if (icon) {
        tl.to(icon, {
          scale: 1.2,
          duration: 0.3,
          ease: "back.out(2)",
        });
        tl.to(icon, {
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        });
      }

      // Hold at node
      tl.to({}, { duration: 0.2 });
    });

    // Hold at end
    tl.to({}, { duration: 0.8 });

    // Reset
    tl.to(dot, {
      left: "0%",
      scale: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });

    tl.to(progress, { scaleX: 0, duration: 0.3, ease: "power2.in" });

    tl.to({}, { duration: 0.5 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-4 px-2"
    >
      {/* Roadmap container */}
      <div className="relative flex items-start justify-between">
        {/* Progress line background */}
        <div
          ref={lineRef}
          className="absolute top-[22px] left-[22px] right-[22px] h-[2px] bg-zinc-800 rounded-full overflow-hidden"
        >
          {/* Progress line */}
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-500 origin-left"
            style={{ width: "100%" }}
          />
        </div>

        {/* Traveling dot */}
        <div
          ref={dotRef}
          className="absolute top-[14px] w-5 h-5 rounded-full bg-white shadow-[0_0_12px_rgba(176,38,255,0.8),0_0_4px_white] z-10 pointer-events-none"
          style={{ left: "0%", transform: "translateX(-50%)" }}
        />

        {/* Steps */}
        {steps.map((step, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center z-20"
            style={{ width: `${100 / steps.length}%` }}
          >
            {/* Node circle */}
            <div
              ref={(el) => { nodeRefs.current[i] = el; }}
              className="relative"
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-full blur-md opacity-0"
                style={{ backgroundColor: step.color }}
              />

              {/* Node */}
              <div
                ref={(el) => { iconRefs.current[i] = el; }}
                className="relative w-11 h-11 rounded-full border-2 flex items-center justify-center bg-zinc-950 backdrop-blur-sm transition-transform duration-300"
                style={{
                  borderColor: `${step.color}60`,
                  boxShadow: `0 0 16px ${step.color}30`,
                }}
              >
                <step.icon
                  size={18}
                  style={{ color: step.color }}
                  className="drop-shadow-[0_0_6px_currentColor]"
                />
              </div>
            </div>

            {/* Label */}
            <div className="mt-3 text-center">
              <span
                className="block text-[10px] font-bold uppercase tracking-wider"
                style={{ color: step.color }}
              >
                {step.label}
              </span>
              <span className="block text-[8px] text-zinc-500 mt-0.5 font-mono">
                {step.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-[22px] left-[22px] right-[22px] h-[2px] pointer-events-none">
        {/* Start dot */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-violet-500 -ml-[2px]" />
        {/* End dot */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-indigo-500 -mr-[2px]" />
      </div>
    </div>
  );
}
