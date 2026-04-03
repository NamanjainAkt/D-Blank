"use client";

// Triggering re-build...
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import {
  Gamepad2,
  Settings,
  Rocket,
  BrainCircuit,
  Briefcase,
} from "lucide-react";
import SectionBadge from "./SectionBadge";
import GradientHeading from "./GradientHeading";
import FeatureCard from "./FeatureCard";
import TypingStatus from "./TypingStatus";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const features = [
  {
    id: "01",
    title: "We Build Games First",
    description:
      "We actively design and build immersive game experiences, ensuring our training stays aligned with real production environments.",
    icon: Gamepad2,
    accentColor: "#B026FF",
    className: "md:col-span-2",
  },
  {
    id: "02",
    title: "Industry Tools & Pipelines",
    description:
      "Work with tools used in real studios — Unity, Unreal Engine, Blender, and modern asset pipelines.",
    icon: Settings,
    accentColor: "#E879F9",
    className: "",
  },
  {
    id: "03",
    title: "Project-Based Learning",
    description:
      "Build real, portfolio-ready games from day one, not just tutorials or theory.",
    icon: Rocket,
    accentColor: "#818CF8",
    className: "",
  },
  {
    id: "04",
    title: "Structured Mentorship",
    description:
      "Learn through guided workflows inspired by real game development teams and production cycles.",
    icon: BrainCircuit,
    accentColor: "#C084FC",
    className: "",
  },
  {
    id: "05",
    title: "Career & Portfolio Support",
    description:
      "Get feedback, refine your portfolio, and prepare for real opportunities in the gaming industry.",
    icon: Briefcase,
    accentColor: "#F472B6",
    className: "",
  },
];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgBlob1Ref = useRef<HTMLDivElement>(null);
  const bgBlob2Ref = useRef<HTMLDivElement>(null);
  const bgBlob3Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    // Subtitle fade up with blur reveal
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
        0.4
      );
    }

    // Grid stagger with scale
    if (gridRef.current) {
      tl.fromTo(
        gridRef.current.children,
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" },
        0.5
      );
    }

    // Footer fade
    if (footerRef.current) {
      tl.fromTo(
        footerRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        1.0
      );
    }

    // Parallax background blobs
    if (bgBlob1Ref.current) {
      gsap.to(bgBlob1Ref.current, {
        y: -60,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    if (bgBlob2Ref.current) {
      gsap.to(bgBlob2Ref.current, {
        y: -40,
        x: 20,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }

    if (bgBlob3Ref.current) {
      gsap.to(bgBlob3Ref.current, {
        y: -80,
        x: -30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Cursor glow effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
      
      if (cursorGlowRef.current) {
        gsap.to(cursorGlowRef.current, {
          x: x - 150,
          y: y - 150,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      if (cursorGlowRef.current) {
        gsap.to(cursorGlowRef.current, { opacity: 0, duration: 0.3 });
      }
    };

    containerRef.current.addEventListener("mousemove", handleMouseMove);
    containerRef.current.addEventListener("mouseenter", handleMouseEnter);
    containerRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tl.kill();
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
        containerRef.current.removeEventListener("mouseenter", handleMouseEnter);
        containerRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-32 px-4 overflow-hidden bg-black"
    >
      {/* Cursor-following glow */}
      <div
        ref={cursorGlowRef}
        className="pointer-events-none absolute h-[300px] w-[300px] rounded-full bg-violet-500/15 blur-[80px] opacity-0"
        style={{
          mixBlendMode: "screen",
        }}
      />

      {/* Parallax Background Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating particles background */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => {
            // Deterministic pseudo-random values based on index to avoid hydration mismatch
            const seed = (i * 137 + 47) % 100;
            const seed2 = (i * 73 + 19) % 100;
            const seed3 = (i * 41 + 83) % 10 + 10;
            const seed4 = (i * 53 + 11) % 5;
            return (
              <div
                key={i}
                className="absolute w-1 h-1 bg-violet-500/30 rounded-full animate-float"
                style={{
                  left: `${seed}%`,
                  top: `${seed2}%`,
                  animationDuration: `${seed3}s`,
                  animationDelay: `${seed4}s`,
                }}
              />
            );
          })}
        </div>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }} />
        
        {/* Grid overlay matching hero */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(176,38,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(176,38,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />

        {/* Floating blobs with parallax */}
        <div
          ref={bgBlob1Ref}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[120px]"
        />
        <div
          ref={bgBlob2Ref}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-500/6 rounded-full blur-[100px]"
        />
        <div
          ref={bgBlob3Ref}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px]"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <SectionBadge label="Why D-Blanks" />
          </div>

          <GradientHeading highlight="Real Game Developers" />

          <p
            ref={subtitleRef}
            className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed mt-6 opacity-0"
          >
            We build games and train developers using real industry workflows,
            tools, and production pipelines.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.id}
              {...feature}
              index={i}
            />
          ))}
        </div>

        {/* Transparency Footer */}
        <div ref={footerRef} className="mt-20 flex justify-center opacity-0">
          <div className="group relative px-6 py-4 rounded-xl border border-white/5 bg-zinc-900/20 backdrop-blur-md overflow-hidden min-w-[320px]">
            {/* Shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <TypingStatus />
          </div>
        </div>
      </div>
    </section>
  );
}
