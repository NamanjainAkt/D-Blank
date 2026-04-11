"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const steps = [
  { name: "Idea", color: "#B026FF", completed: false },
  { name: "Prototype", color: "#818CF8", completed: false },
  { name: "Playable", color: "#34D399", completed: false },
  { name: "Polish", color: "#F472B6", completed: false },
];

export default function OutcomeTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!lineRef.current) return;

    const ctx = gsap.context(() => {
      // Reset
      gsap.set(lineRef.current, { scaleX: 0 });
      dotsRef.current.forEach((dot) => {
        if (dot) gsap.set(dot, { scale: 0, opacity: 0 });
      });
      labelsRef.current.forEach((label) => {
        if (label) gsap.set(label, { opacity: 0, y: 8 });
      });

      const tl = gsap.timeline({ 
        repeat: -1, 
        repeatDelay: 2,
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 110%",
          end: "bottom -10%",
          toggleActions: "play pause resume pause",
        }
      });

      steps.forEach((_, i) => {
        const progress = (i + 1) / steps.length;

        // Grow the progress line
        tl.to(lineRef.current, {
          scaleX: progress,
          duration: 0.6,
          ease: "power2.inOut",
        });

        // Pop in the dot
        if (dotsRef.current[i]) {
          tl.to(dotsRef.current[i], {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "back.out(2)",
          }, "-=0.2");
        }

        // Fade in label
        if (labelsRef.current[i]) {
          tl.to(labelsRef.current[i], {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          }, "-=0.2");
        }

        // Pause at each step
        tl.to({}, { duration: 0.4 });
      });

      // Hold at the end
      tl.to({}, { duration: 1.5 });

      // Reset all for next loop
      tl.to(lineRef.current, { scaleX: 0, duration: 0.4, ease: "power2.in" });
      dotsRef.current.forEach((dot) => {
        if (dot) tl.to(dot, { scale: 0, opacity: 0, duration: 0.2 }, "-=0.3");
      });
      labelsRef.current.forEach((label) => {
        if (label) tl.to(label, { opacity: 0, y: 8, duration: 0.2 }, "-=0.3");
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[100px] py-4">
      {/* Track */}
      <div className="relative w-full max-w-[240px] h-12">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-white/[0.06] rounded-full" />

        {/* Progress line */}
        <div
          ref={lineRef}
          className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 rounded-full origin-left"
          style={{
            background: "linear-gradient(90deg, #B026FF, #818CF8, #34D399, #F472B6)",
            transform: "scaleX(0)",
          }}
        />

        {/* Dots */}
        {steps.map((step, i) => (
          <div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${((i + 1) / steps.length) * 100}%` }}
          >
            <div
              ref={(el) => { dotsRef.current[i] = el; }}
              className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
              style={{
                borderColor: step.color,
                backgroundColor: `${step.color}20`,
                boxShadow: `0 0 12px ${step.color}40`,
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.color }} />
            </div>
            <span
              ref={(el) => { labelsRef.current[i] = el; }}
              className="absolute top-5 text-[8px] font-mono uppercase tracking-widest text-zinc-400 whitespace-nowrap"
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
