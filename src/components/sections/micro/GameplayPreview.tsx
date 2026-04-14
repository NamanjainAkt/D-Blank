"use client";

import { useEffect, useRef, useState } from "react";

const waypoints = [
  { x: 40, y: 120 },
  { x: 110, y: 120 },
  { x: 110, y: 50 },
  { x: 200, y: 50 },
  { x: 200, y: 150 },
  { x: 290, y: 150 },
  { x: 290, y: 80 },
  { x: 360, y: 80 },
];

function useIntersectionObserver(options: IntersectionObserverInit = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, isIntersecting] as const;
}

export default function GameplayPreview() {
  const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const playerRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const player = playerRef.current;
    const glow = glowRef.current;
    const path = pathRef.current;
    if (!player || !glow || !path) return;

    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const pathLength = path.getTotalLength() || 1000;
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
    const easeInCubic = (t: number) => t * t * t;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % 7000;

      // 1. Path drawing
      if (elapsed <= 3500) {
        const progress = Math.min(elapsed / 3500, 1);
        const eased = easeInOutQuad(progress);
        path.style.strokeDashoffset = `${pathLength * (1 - eased)}`;
      } else if (elapsed > 3500 && elapsed <= 5000) {
        path.style.strokeDashoffset = "0";
      } else if (elapsed > 5000 && elapsed <= 5500) {
        const progress = Math.min((elapsed - 5000) / 500, 1);
        const eased = easeInCubic(progress);
        path.style.strokeDashoffset = `${pathLength * eased}`;
      } else {
        path.style.strokeDashoffset = `${pathLength}`;
      }

      // 2. Player moving
      if (elapsed <= 3500) {
        const segmentDuration = 3500 / 7;
        let segmentIndex = Math.floor(elapsed / segmentDuration);
        let segmentProgress = (elapsed % segmentDuration) / segmentDuration;
        
        if (segmentIndex >= 7) {
          segmentIndex = 6;
          segmentProgress = 1.0;
        }

        const eased = easeInOutQuad(segmentProgress);
        const startPoint = waypoints[segmentIndex];
        const endPoint = waypoints[segmentIndex + 1];

        const x = startPoint.x + (endPoint.x - startPoint.x) * eased;
        const y = startPoint.y + (endPoint.y - startPoint.y) * eased;

        player.setAttribute("cx", `${x}`);
        player.setAttribute("cy", `${y}`);
        glow.setAttribute("cx", `${x}`);
        glow.setAttribute("cy", `${y}`);
      } else if (elapsed > 3500 && elapsed <= 5200) {
        const endPoint = waypoints[waypoints.length - 1];
        player.setAttribute("cx", `${endPoint.x}`);
        player.setAttribute("cy", `${endPoint.y}`);
        glow.setAttribute("cx", `${endPoint.x}`);
        glow.setAttribute("cy", `${endPoint.y}`);
      } else if (elapsed > 5200 && elapsed <= 5500) {
        const progress = Math.min((elapsed - 5200) / 300, 1);
        const eased = easeInCubic(progress);
        const startPoint = waypoints[waypoints.length - 1];
        const endPoint = waypoints[0];

        const x = startPoint.x + (endPoint.x - startPoint.x) * eased;
        const y = startPoint.y + (endPoint.y - startPoint.y) * eased;

        player.setAttribute("cx", `${x}`);
        player.setAttribute("cy", `${y}`);
        glow.setAttribute("cx", `${x}`);
        glow.setAttribute("cy", `${y}`);
      } else {
        const startPoint = waypoints[0];
        player.setAttribute("cx", `${startPoint.x}`);
        player.setAttribute("cy", `${startPoint.y}`);
        glow.setAttribute("cx", `${startPoint.x}`);
        glow.setAttribute("cy", `${startPoint.y}`);
      }

      // 3. Glow pulsing
      const pulseElapsed = (timestamp - startTime) % 1200;
      const pulseProgress = pulseElapsed / 1200;
      const pulseEased = easeOutCubic(pulseProgress);
      const r = 8 + 8 * pulseEased;
      const opacity = 0.5 * (1 - pulseEased);

      glow.setAttribute("r", `${r}`);
      glow.setAttribute("opacity", `${opacity}`);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  const pathD = waypoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center min-h-[130px] transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <svg viewBox="0 0 400 200" className="w-full max-w-[320px] opacity-60 group-hover:opacity-90 transition-opacity duration-500">
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B026FF" />
            <stop offset="50%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Checkpoints */}
        {[
          { x: 40, y: 120, label: "Idea", color: "#B026FF" },
          { x: 110, y: 50, label: "Build", color: "#818CF8" },
          { x: 200, y: 150, label: "Test", color: "#E879F9" },
          { x: 360, y: 80, label: "Ship", color: "#34D399" },
        ].map((cp, i) => (
          <g key={i}>
            <circle cx={cp.x} cy={cp.y} r="14" fill={`${cp.color}08`} stroke={`${cp.color}30`} strokeWidth="1" />
            <circle cx={cp.x} cy={cp.y} r="3" fill={cp.color} opacity="0.6" />
            <text
              x={cp.x}
              y={cp.y + 26}
              textAnchor="middle"
              fill={`${cp.color}80`}
              fontSize="8"
              fontFamily="monospace"
              letterSpacing="0.1em"
            >
              {cp.label.toUpperCase()}
            </text>
          </g>
        ))}

        {/* Animated path */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Player glow */}
        <circle
          ref={glowRef}
          cx={waypoints[0].x}
          cy={waypoints[0].y}
          r="8"
          fill="#B026FF"
          opacity="0.5"
        />
        {/* Player dot */}
        <circle
          ref={playerRef}
          cx={waypoints[0].x}
          cy={waypoints[0].y}
          r="4"
          fill="white"
          filter="url(#glow)"
        />
      </svg>
    </div>
  );
}