"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

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

export default function GameplayPreview() {
  const playerRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const player = playerRef.current;
    const glow = glowRef.current;
    const path = pathRef.current;
    if (!player || !glow || !path) return;

    let tl: gsap.core.Timeline;

    const ctx = gsap.context(() => {
      // Animate path draw
      const pathLength = path.getTotalLength();
      gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

      tl = gsap.timeline({ 
        repeat: -1, 
        repeatDelay: 1.5,
        scrollTrigger: {
          trigger: path,
          start: "top 110%",
          end: "bottom -10%",
          toggleActions: "play pause resume pause",
        }
      });

      // Draw path + move player simultaneously
      const totalDur = 3.5;
      tl.to(path, { strokeDashoffset: 0, duration: totalDur, ease: "power1.inOut" }, 0);

      waypoints.forEach((point, i) => {
        if (i === 0) return;
        const segDur = totalDur / (waypoints.length - 1);
        tl.to([player, glow], {
          attr: { cx: point.x, cy: point.y },
          duration: segDur,
          ease: "power1.inOut",
        }, segDur * i);
      });

      // Hold at end
      tl.to({}, { duration: 1.5 });

      // Reset path
      tl.to(path, { strokeDashoffset: pathLength, duration: 0.5, ease: "power2.in" });
      tl.to([player, glow], {
        attr: { cx: waypoints[0].x, cy: waypoints[0].y },
        duration: 0.3,
        ease: "power2.in",
      }, "-=0.3");

      // Continuous glow pulse
      gsap.to(glow, {
        attr: { r: 16 },
        opacity: 0,
        duration: 1.2,
        repeat: -1,
        ease: "power2.out",
      });
    });

    return () => { 
      ctx.revert();
    };
  }, []);

  // Build path d string
  const pathD = waypoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div className="relative w-full flex items-center justify-center min-h-[130px]">
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
