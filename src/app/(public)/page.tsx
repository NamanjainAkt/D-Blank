"use client";

import Link from "next/link";
import { Footer } from '@/components/Footer';
import Footer2 from "@/components/Footer2";
import Image from "next/image";
import {
  ChevronRight,
  Star,
  ArrowRight,
  Linkedin,
  Gamepad2,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ParticleField } from "@/components/ui/ParticleField";
import { GlitchText } from "@/components/ui/GlitchText";
import { TypingText } from "@/components/ui/TypingText";
import { GlowButton } from "@/components/ui/GlowButton";
import { CrystalButton } from "@/components/ui/CrystalButton";
import { HoverScale } from "@/components/ui/HoverScale";
import AnimatedContent from "@/components/AnimatedContent";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FoundersSection from "@/components/sections/FoundersSection";
import { games } from "@/lib/placeholder-data";

const currentYear = new Date().getFullYear();

const genreStyles: Record<
  string,
  { gradient: string; border: string; badge: string }
> = {
  RPG: {
    gradient: "from-purple-900/70 to-violet-950/80",
    border: "hover:border-violet-500/60",
    badge: "bg-violet-600/90",
  },
  Racing: {
    gradient: "from-cyan-900/70 to-blue-950/80",
    border: "hover:border-cyan-500/60",
    badge: "bg-cyan-600/90",
  },
  Strategy: {
    gradient: "from-blue-900/70 to-indigo-950/80",
    border: "hover:border-blue-500/60",
    badge: "bg-blue-600/90",
  },
  Action: {
    gradient: "from-red-900/70 to-rose-950/80",
    border: "hover:border-red-500/60",
    badge: "bg-red-600/90",
  },
  Roguelike: {
    gradient: "from-amber-900/70 to-orange-950/80",
    border: "hover:border-amber-500/60",
    badge: "bg-amber-600/90",
  },
};

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="w-8 h-px bg-gradient-to-r from-transparent to-violet-500" />
      <span className="text-violet-400 text-[10px] font-display tracking-[0.35em] uppercase">
        {children}
      </span>
      <div className="w-8 h-px bg-gradient-to-l from-transparent to-violet-500" />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden px-4 py-12 pt-32 sm:pt-40">
        <ParticleField
          particleCount={60}
          color="rgba(176, 38, 255, 0.15)"
          className="z-0 pointer-events-none"
        />

        {/* Layered background / Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/10 via-black/40 to-black pointer-events-none" />
        <div className="absolute top-1/3 -left-[10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Top edge glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent pointer-events-none" />

        {/* Grid — violet tinted */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(176,38,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(176,38,255,0.045)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pointer-events-none mt-12 sm:mt-0">
          <div className="max-w-2xl sm:pr-8 pointer-events-auto">
            {/* Headline — Asymmetric, left-aligned, overlapping the 3D model slightly */}
            <AnimatedContent delay={0.1}>
              <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-black leading-[0.9] mb-8 tracking-tighter">
                <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  Build. Play.
                </span>
                <span className="block mt-2">
                  <GlitchText
                    glitchIntensity={1.2}
                    textClassName="bg-gradient-to-br from-violet-400 via-fuchsia-300 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(176,38,255,0.4)]"
                  >
                    Create.
                  </GlitchText>
                </span>
              </h1>
            </AnimatedContent>

            {/* Subheadline */}
            <AnimatedContent delay={0.2}>
              <div className="text-base sm:text-lg text-zinc-300 max-w-lg mb-8 leading-relaxed min-h-[4rem] backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/5">
                <TypingText
                  text="Crafting immersive games and training future game developers with passion."
                  speed={0.03}
                  delay={0.5}
                />
              </div>
            </AnimatedContent>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <CrystalButton
                href="/games"
                className="group w-full sm:w-auto"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Bottom Left */}
        <div className="absolute bottom-10 left-8 z-10 hidden sm:flex items-center gap-4 text-xs font-display tracking-widest text-violet-400/60 rotate-[-90deg] origin-left pointer-events-none">
          <span className="uppercase">Scroll to explore</span>
          <div className="w-12 h-px bg-violet-500/40" />
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      {/* ===== FEATURED GAMES ===== */}
      <section className="min-h-[100dvh] py-20 px-4 bg-black flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <AnimatedContent>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-px bg-violet-500" />
                  <span className="text-violet-400 text-[10px] font-display tracking-[0.35em] uppercase">
                    Our Games
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  Featured <span className="bg-gradient-to-br from-violet-400 via-fuchsia-300 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(176,38,255,0.4)]">Titles</span>
                </h2>
              </div>
              <Button
                variant="ghost"
                className="text-zinc-500 hover:text-violet-400 hidden sm:flex items-center gap-1 transition-colors group text-sm"
                asChild
              >
                <Link href="/games">
                  View All Games
                  <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
            </div>
          </AnimatedContent>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {games.slice(0, 3).map((game, index) => {
              const style = genreStyles[game.genre] ?? {
                gradient: "from-violet-900/70 to-fuchsia-950/80",
                border: "hover:border-violet-500/60",
                badge: "bg-violet-600/90",
              };
              return (
                <AnimatedContent key={game.id} delay={index * 0.1}>
                  <HoverScale scale={1.02} className="h-full">
                    <div
                      className={`group h-full rounded-xl overflow-hidden border border-zinc-800 ${style.border} transition-all duration-400 bg-zinc-900/50 hover:shadow-xl hover:shadow-violet-500/10`}
                    >
                      {/* Genre-colored top area */}
                      <div
                        className={`relative aspect-video bg-gradient-to-br ${style.gradient} overflow-hidden`}
                      >
                        {/* Subtle grid inside */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Gamepad2 className="w-14 h-14 text-white/10 group-hover:text-white/20 group-hover:scale-110 transition-all duration-500" />
                        </div>
                        {/* Bottom-left: rating */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-md px-2.5 py-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold text-amber-400">
                            {game.rating}
                          </span>
                        </div>
                        {/* Top-right: genre */}
                        <div
                          className={`absolute top-3 right-3 text-white text-[10px] font-bold px-2.5 py-1 rounded-md ${style.badge}`}
                        >
                          {game.genre}
                        </div>
                        {game.featured && (
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded tracking-widest">
                            FEATURED
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <h3 className="text-base font-bold mb-1.5 group-hover:text-violet-400 transition-colors tracking-wide">
                          {game.title}
                        </h3>
                        <p className="text-xs text-zinc-500 mb-4 line-clamp-2 leading-relaxed">
                          {game.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-zinc-600 bg-zinc-800/60 px-2.5 py-1 rounded-md border border-zinc-700/50">
                            {game.platform}
                          </span>
                          <span className="text-xs text-zinc-700">
                            {game.releaseDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverScale>
                </AnimatedContent>
              );
            })}
          </div>

          {/* Mobile: View All link */}
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/games"
              className="text-sm text-violet-400 hover:text-violet-300 transition-colors flex items-center justify-center gap-1"
            >
              View All Games <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      {/* ===== WHY D-BLANKS ===== */}
      <WhyChooseUs />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialsSection />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      {/* ===== TEAM ===== */}
      <FoundersSection />

      {/* ===== CTA ===== */}
      <section className="relative py-32 md:py-48 px-4 bg-black overflow-hidden flex flex-col items-center justify-center min-h-[600px] md:min-h-[800px]">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(176,38,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(176,38,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none" />
        
        {/* Core Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[800px] h-[400px] bg-violet-600/10 blur-[120px] rounded-[100%] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] max-w-[400px] h-[200px] bg-fuchsia-600/10 blur-[80px] rounded-[100%] pointer-events-none" />

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-violet-500/5 to-transparent opacity-50" 
               style={{ animation: 'scanline 8s linear infinite' }} />
        </div>

        {/* Giant Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center pointer-events-none">
          <h1 className="text-[clamp(6rem,20vw,20rem)] font-black tracking-tighter bg-gradient-to-b from-white/[0.03] to-transparent bg-clip-text text-transparent select-none font-display">
            BUILD
          </h1>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          <AnimatedContent>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-[1px] mb-8 mx-auto shadow-[0_0_30px_rgba(217,70,239,0.3)] animate-float">
              <div className="w-full h-full rounded-2xl bg-zinc-950 flex items-center justify-center">
                <Zap className="w-8 h-8 text-fuchsia-400" />
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6">
              Ready to Build Something{" "}
              <span className="relative inline-block">
                {/* Text Glow Layers */}
                <span className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent blur-xl opacity-60">Amazing?</span>
                <span className="relative bg-gradient-to-r from-violet-400 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                  Amazing?
                </span>
              </span>
            </h2>
            
            <p className="text-zinc-400 text-base sm:text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of aspiring game developers who have launched their careers with D-Blanks.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12">
              <Link href="/courses">
                <GlowButton variant="primary" className="w-full sm:w-auto min-w-[220px] text-sm py-4 shadow-[0_0_20px_rgba(217,70,239,0.4)]">
                  Start Learning
                  <ArrowRight className="inline-block w-4 h-4 ml-2" />
                </GlowButton>
              </Link>
              <Link href="/contact">
                <GlowButton variant="secondary" className="w-full sm:w-auto min-w-[220px] text-sm py-4 border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 hover:text-white">
                  Contact Us
                </GlowButton>
              </Link>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs md:text-sm text-zinc-500 font-medium tracking-wide">
              {[
                "Real-World Projects",
                "Industry Certified",
                "Industry Mentors",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-fuchsia-500/80 drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]" />
                  {item}
                </span>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </section>

      <Footer />
      <Footer2 />
    </main>
  );
}
