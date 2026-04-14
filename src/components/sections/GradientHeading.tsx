"use client";

import { useRef } from "react";
import SplitText from "./SplitText";
import AnimatedContent from "@/components/AnimatedContent";

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
      <AnimatedContent
        distance={20}
        delay={0.3}
        className="inline-block"
      >
        <span
          className={`inline-block bg-gradient-to-br from-primary via-accent to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(176,38,255,0.4)] ${highlightClassName}`}
        >
          {highlight}
        </span>
      </AnimatedContent>
    </h2>
  );
}
