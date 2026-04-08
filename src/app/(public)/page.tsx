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
import { TypingText } from "@/components/ui/TypingText";
import { GlowButton } from "@/components/ui/GlowButton";
import { CrystalButton } from "@/components/ui/CrystalButton";
import { HoverScale } from "@/components/ui/HoverScale";
import AnimatedContent from "@/components/AnimatedContent";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FoundersSection from "@/components/sections/FoundersSection";
import { GameCard } from "@/components/GameCard";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";

const HeroModels = dynamic(() => import("@/components/HeroModels"), {
  ssr: false,
});

export default function HomePage() {
  const [featuredGames, setFeaturedGames] = useState<any[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [modelsReady, setModelsReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const handleModelsLoaded = useCallback(() => {
    setModelsReady(true);
  }, []);

  // Auto-dismiss loader after models load (with min display time) or timeout
  useEffect(() => {
    const minTime = setTimeout(() => {
      // After 1.5s minimum, check if models are loaded
      if (modelsReady) {
        setShowLoader(false);
      }
    }, 1500);

    // Hard timeout — dismiss loader after 6s no matter what
    const maxTime = setTimeout(() => {
      setShowLoader(false);
    }, 6000);

    return () => {
      clearTimeout(minTime);
      clearTimeout(maxTime);
    };
  }, []);

  // Dismiss when models ready (after min display)
  useEffect(() => {
    if (modelsReady) {
      const timer = setTimeout(() => setShowLoader(false), 300);
      return () => clearTimeout(timer);
    }
  }, [modelsReady]);

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch('/api/games?featured=true&limit=3');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setFeaturedGames(data.games || []);
      } catch (err) {
        console.error('Error fetching games:', err);
      } finally {
        setGamesLoading(false);
      }
    }
    fetchGames();
  }, []);

  return (
    <>
      {/* ===== LOADING SCREEN ===== */}
      {showLoader && (
        <div
          className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-500 ${modelsReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          {/* Loader content */}
          <div className="flex flex-col items-center gap-6">
            {/* Logo pulse */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent p-[1px] animate-pulse">
              <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center">
                <Gamepad2 className="w-8 h-8 text-accent" />
              </div>
            </div>

            {/* Brand name */}
            <p className="text-sm font-display tracking-[0.4em] uppercase text-zinc-500">
              D-Blanks
            </p>

            {/* Loading bar */}
            <div className="w-48 h-[2px] bg-zinc-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-loader-bar"
              />
            </div>

            <p className="text-[10px] text-zinc-600 tracking-widest uppercase">
              Loading experience...
            </p>
          </div>

          <style>{`
            @keyframes loader-bar {
              0% { width: 0%; }
              50% { width: 70%; }
              100% { width: 100%; }
            }
            .animate-loader-bar {
              animation: loader-bar 3s ease-out forwards;
            }
          `}</style>
        </div>
      )}

      <main className="min-h-screen bg-black text-white">
        {/* ===== HERO ===== */}
        <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden px-4 py-12 pt-32 sm:pt-40">
          {/* Layered background / Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-black/40 to-black pointer-events-none" />
          <div className="absolute top-1/3 -left-[10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Top edge glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none" />

          {/* Grid — violet tinted */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(176,38,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(176,38,255,0.045)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pointer-events-none">
            <div className="lg:grid lg:grid-cols-[1fr_1fr] items-center min-h-[60vh]">
              {/* Left — Text content */}
              <div className="max-w-2xl lg:pr-8 pointer-events-auto py-12 flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0">
                <AnimatedContent delay={0.1}>
                  <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-black leading-[0.9] mb-8 tracking-tighter">
                    <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                      Build. Play.
                    </span>
                    <span className="block mt-2 bg-gradient-to-br from-primary via-accent to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(176,38,255,0.4)]">
                      Create.
                    </span>
                  </h1>
                </AnimatedContent>

                <AnimatedContent delay={0.2}>
                  <div className="text-base sm:text-lg text-zinc-300 max-w-lg mb-8 leading-relaxed min-h-[4rem] bg-black/30 p-4 rounded-xl border border-white/5 mx-auto lg:mx-0">
                      <TypingText
                        text="Crafting immersive games and training future game developers with pure passion."
                        speed={0.03}
                        delay={0.5}
                      />
                  </div>
                </AnimatedContent>

                <div className="flex flex-col sm:flex-row items-center lg:items-start gap-5 w-full lg:w-auto justify-center lg:justify-start">
                  <CrystalButton
                    href="/games"
                    className="group w-full sm:w-auto"
                  />
                </div>
              </div>

              {/* Right — 3D Models (desktop only) */}
              <div className="hidden lg:flex items-center justify-center h-[85vh] max-h-[750px] pointer-events-none -mr-8">
                <HeroModels onLoaded={handleModelsLoaded} />
              </div>
            </div>
          </div>

          {/* Scroll Indicator - Bottom Left */}
          <div className="absolute bottom-20 left-8 z-10 hidden sm:flex items-center gap-4 text-xs font-display tracking-widest text-primary/60 rotate-[-90deg] origin-left pointer-events-none">
            <span className="uppercase">Scroll to explore</span>
            <div className="w-12 h-px bg-primary/40" />
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* ===== FEATURED GAMES ===== */}
        <section className="min-h-[100dvh] py-20 px-4 bg-black flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <AnimatedContent>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-px bg-primary" />
                    <span className="text-primary text-[10px] font-display tracking-[0.35em] uppercase">
                      Our Games
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                    Featured <span className="bg-gradient-to-br from-primary via-accent to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(176,38,255,0.4)]">Titles</span>
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  className="text-zinc-500 hover:text-primary hidden sm:flex items-center gap-1 transition-colors group text-sm"
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
              {gamesLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="aspect-video bg-white/5 rounded-xl animate-pulse" />
                ))
              ) : featuredGames.length > 0 ? (
                featuredGames.map((game) => (
                  <AnimatedContent key={game._id}>
                    <GameCard game={game} />
                  </AnimatedContent>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-zinc-500 font-mono text-xs uppercase tracking-widest">
                  No featured titles currently deployed.
                </div>
              )}
            </div>

            {/* Mobile: View All link */}
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/games"
                className="text-sm text-primary hover:text-primary transition-colors flex items-center justify-center gap-1"
              >
                View All Games <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* ===== WHY D-BLANKS ===== */}
        <WhyChooseUs />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* ===== TESTIMONIALS ===== */}
        <TestimonialsSection />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* ===== TEAM ===== */}
        <FoundersSection />

        {/* ===== CTA ===== */}
        <section className="relative py-32 md:py-48 px-4 bg-black overflow-hidden flex flex-col items-center justify-center min-h-[600px] md:min-h-[800px]">
          {/* Animated Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(176,38,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(176,38,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none" />

          {/* Core Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[800px] h-[400px] bg-primary/10 blur-[60px] rounded-[100%] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] max-w-[400px] h-[200px] bg-accent/10 blur-[40px] rounded-[100%] pointer-events-none" />

          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50"
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent p-[1px] mb-8 mx-auto shadow-[0_0_30px_rgba(217,70,239,0.3)] animate-float">
                <div className="w-full h-full rounded-2xl bg-zinc-950 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-accent" />
                </div>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6">
                Ready to Build Something{" "}
                <span className="relative inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                  Amazing?
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
                    <CheckCircle2 className="w-4 h-4 text-accent/80 drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]" />
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
    </>
  );
}
