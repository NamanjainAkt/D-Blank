"use client";

import { useEffect, useState, useRef } from "react";

const steps = [
  { name: "Idea", color: "#B026FF", completed: false },
  { name: "Prototype", color: "#818CF8", completed: false },
  { name: "Playable", color: "#34D399", completed: false },
  { name: "Polish", color: "#F472B6", completed: false },
];

export default function OutcomeTimeline() {
  const [activeStep, setActiveStep] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setActiveStep(-1);
      return;
    }

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= steps.length ? -1 : prev + 1));
    }, 1500);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div ref={containerRef} className="relative w-full flex flex-col items-center justify-center min-h-[100px] py-4">
      {/* Track */}
      <div className="relative w-full max-w-[240px] h-12">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-white/[0.06] rounded-full" />

        {/* Progress line */}
        <div
          className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 rounded-full origin-left transition-transform duration-1000 ease-in-out"
          style={{
            background: "linear-gradient(90deg, #B026FF, #818CF8, #34D399, #F472B6)",
            transform: `scaleX(${activeStep === -1 ? 0 : (activeStep + 1) / steps.length})`,
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
              className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                activeStep >= i ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
              style={{
                borderColor: step.color,
                backgroundColor: `${step.color}20`,
                boxShadow: `0 0 12px ${step.color}40`,
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.color }} />
            </div>
            <span
              className={`absolute top-5 text-[8px] font-mono uppercase tracking-widest text-zinc-400 whitespace-nowrap transition-all duration-500 ${
                activeStep >= i ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
