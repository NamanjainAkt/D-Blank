"use client";

import { useEffect, useState, useRef } from "react";
import { BookOpen, Eye, RefreshCw } from "lucide-react";

const steps = [
  { icon: BookOpen, label: "Learn", color: "#B026FF", description: "Guided lessons" },
  { icon: Eye, label: "Review", color: "#E879F9", description: "Expert feedback" },
  { icon: RefreshCw, label: "Iterate", color: "#818CF8", description: "Refine & grow" },
];

export default function MentorshipFlow() {
  const [activeStep, setActiveStep] = useState(0);
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
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-4 px-2"
    >
      <div className="relative flex items-start justify-between">
        {/* Progress line background */}
        <div className="absolute top-[22px] left-[22px] right-[22px] h-[2px] bg-zinc-800 rounded-full overflow-hidden">
          {/* Progress line filled based on active step */}
          <div
            className="h-full bg-gradient-to-r from-primary via-accent to-indigo-500 origin-left transition-all duration-1000 ease-in-out"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Traveling dot */}
        <div
          className="absolute top-[14px] w-5 h-5 rounded-full bg-white shadow-[0_0_12px_rgba(176,38,255,0.8),0_0_4px_white] z-10 pointer-events-none transition-all duration-1000 ease-in-out"
          style={{ 
            left: `${(activeStep / (steps.length - 1)) * 100}%`, 
            transform: "translateX(-50%)" 
          }}
        />

        {/* Steps */}
        {steps.map((step, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center z-20"
            style={{ width: `${100 / steps.length}%` }}
          >
            <div className="relative">
              <div
                className={`absolute inset-0 rounded-full blur-md transition-opacity duration-500 ${
                  activeStep === i ? "opacity-100" : "opacity-0"
                }`}
                style={{ backgroundColor: step.color }}
              />

              <div
                className={`relative w-11 h-11 rounded-full border-2 flex items-center justify-center bg-zinc-950 backdrop-blur-sm transition-all duration-500 ${
                  activeStep === i ? "scale-110 border-white/40" : "scale-100"
                }`}
                style={{
                  borderColor: activeStep === i ? step.color : `${step.color}40`,
                  boxShadow: activeStep === i ? `0 0 16px ${step.color}60` : `0 0 8px ${step.color}20`,
                }}
              >
                <step.icon
                  size={18}
                  style={{ color: step.color }}
                  className={`transition-all duration-500 ${
                    activeStep === i ? "drop-shadow-[0_0_8px_currentColor]" : ""
                  }`}
                />
              </div>
            </div>

            <div className="mt-3 text-center">
              <span
                className={`block text-[10px] font-bold uppercase tracking-wider transition-colors duration-500 ${
                  activeStep === i ? "text-white" : ""
                }`}
                style={{ color: activeStep === i ? undefined : step.color }}
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

      <div className="absolute top-[22px] left-[22px] right-[22px] h-[2px] pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary -ml-[2px]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-indigo-500 -mr-[2px]" />
      </div>
    </div>
  );
}
