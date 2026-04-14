"use client";

import React from "react";
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
import AnimatedContent from "@/components/AnimatedContent";

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
  return (
    <section
      className="relative min-h-screen py-32 px-4 overflow-hidden bg-black"
    >
      {/* Lightweight background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(176,38,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(176,38,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_70%)] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(217,70,239,0.06)_0%,transparent_70%)] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedContent distance={20} className="mb-6">
            <SectionBadge label="Why D-Blanks" />
          </AnimatedContent>

          <GradientHeading highlight="Real Game Developers" />

          <AnimatedContent 
            distance={10} 
            delay={0.4}
            className="mt-6"
          >
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
              We build games and train developers using real industry workflows,
              tools, and production pipelines.
            </p>
          </AnimatedContent>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.id}
              {...feature}
              index={i}
            />
          ))}
        </div>

        {/* Footer */}
        <AnimatedContent 
          distance={20} 
          delay={0.8}
          className="mt-20 flex justify-center"
        >
          <div className="group relative px-6 py-4 rounded-xl border border-white/5 bg-zinc-900/30 overflow-hidden min-w-[320px]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <TypingStatus />
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
