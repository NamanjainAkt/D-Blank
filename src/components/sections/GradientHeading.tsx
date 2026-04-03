"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

interface GradientHeadingProps {
  prefix?: string;
  highlight: string;
  className?: string;
  prefixClassName?: string;
  highlightClassName?: string;
}

export default function GradientHeading({
  prefix = "Built for",
  highlight,
  className = "",
  prefixClassName = "",
  highlightClassName = "",
}: GradientHeadingProps) {
  const highlightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!highlightRef.current) return;

    const el = highlightRef.current;
    gsap.set(el, { opacity: 0, y: 30, filter: "blur(8px)" });

    ScrollTrigger.create({
      trigger: el,
      start: "top 95%",
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
        });
      },
    });

    // Fallback: if element is already in view, animate immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        delay: 0.5,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <h2
      className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter ${className}`}
    >
      {prefix && (
        <SplitText
          text={`${prefix} `}
          className={`text-white ${prefixClassName}`}
          delay={0.1}
        />
      )}
      <br className="md:hidden" />
      <span
        ref={highlightRef}
        className={`inline-block bg-gradient-to-br from-violet-400 via-fuchsia-300 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(176,38,255,0.4)] ${highlightClassName}`}
      >
        {highlight}
      </span>
    </h2>
  );
}
