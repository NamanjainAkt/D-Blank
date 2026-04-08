"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const statuses = [
  "Building first-gen game titles...",
  "Onboarding early developer community...",
  "Syncing industry asset pipelines...",
  "Initializing production environments...",
];

export default function TypingStatus() {
  const [text, setText] = useState("");
  const [statusIndex, setStatusIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentStatus = statuses[statusIndex];
    let charIndex = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      currentStatus = statuses[statusIndex];
      
      if (!isDeleting) {
        setText(currentStatus.substring(0, charIndex + 1));
        charIndex++;
        
        if (charIndex === currentStatus.length) {
          isDeleting = true;
          timeout = setTimeout(type, 3000); // Pause at end
        } else {
          timeout = setTimeout(type, 50);
        }
      } else {
        setText(currentStatus.substring(0, charIndex - 1));
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          setStatusIndex((prev) => (prev + 1) % statuses.length);
          timeout = setTimeout(type, 500);
        } else {
          timeout = setTimeout(type, 30);
        }
      }
    };

    timeout = setTimeout(type, 1000);

    return () => clearTimeout(timeout);
  }, [statusIndex]);

  return (
    <div ref={containerRef} className="flex items-center gap-3">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-2 h-2 rounded-full bg-primary/30 animate-ping" />
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>
      <p className="text-[10px] font-mono text-zinc-500 tracking-wider">
        <span className="text-primary opacity-50">&gt;</span> {text}
        <span className="inline-block w-1.5 h-3 ml-1 bg-primary/50 animate-pulse align-middle" />
      </p>
    </div>
  );
}
