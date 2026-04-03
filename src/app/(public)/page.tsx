"use client";

import Link from "next/link";
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
import { games, testimonials, founders } from "@/lib/placeholder-data";

const currentYear = new Date().getFullYear();

const avatarColors = [
  "from-violet-600 to-purple-700",
  "from-cyan-600 to-blue-700",
  "from-amber-600 to-orange-700",
  "from-emerald-600 to-green-700",
  "from-pink-600 to-rose-700",
  "from-indigo-600 to-blue-700",
];

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
                  text="Crafting immersive games. Training future game developers."
                  speed={0.03}
                  delay={0.5}
                />
              </div>
            </AnimatedContent>

            {/* CTAs */}
            <AnimatedContent delay={0.3}>
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <CrystalButton
                  href="/games"
                  className="group w-full sm:w-auto"
                />
              </div>
            </AnimatedContent>
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
                  Featured <span className="text-violet-400">Titles</span>
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
      <section className="min-h-[100dvh] py-20 px-4 bg-black flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <AnimatedContent className="text-center mb-14">
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              What Our <span className="text-violet-400">Community</span> Says
            </h2>
          </AnimatedContent>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <AnimatedContent key={testimonial.id} delay={index * 0.08}>
                <div className="relative h-full rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-violet-500/30 transition-all duration-300 p-6 group overflow-hidden">
                  {/* Top gradient line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
                  {/* Subtle corner glow on hover */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-violet-500/0 group-hover:bg-violet-500/8 rounded-full blur-2xl transition-colors duration-500" />

                  {/* Large decorative quote */}
                  <div className="text-7xl font-black text-violet-500/12 leading-none mb-1 select-none font-display">
                    "
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm shrink-0 ring-2 ring-zinc-800`}
                    >
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-zinc-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      {/* ===== TEAM ===== */}
      <section className="min-h-[100dvh] py-20 px-4 bg-zinc-950 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <AnimatedContent className="text-center mb-14">
            <SectionLabel>Our Team</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
              Meet the <span className="text-violet-400">Founders</span>
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
              A passionate team of game developers, artists, and educators
              united by a love for interactive storytelling.
            </p>
          </AnimatedContent>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {founders.map((founder, index) => (
              <AnimatedContent key={founder.id} delay={index * 0.1}>
                <div className="relative rounded-xl overflow-hidden border border-zinc-800/80 hover:border-violet-500/40 transition-all duration-500 group bg-zinc-900/30">
                  {/* Image */}
                  <div className="relative h-52 sm:h-60 overflow-hidden">
                    <Image
                      src={`/team/founder${index + 1}.jpeg`}
                      alt={founder.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                    {/* Role chip */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 text-[9px] font-display tracking-widest bg-black/60 border border-violet-500/40 text-violet-300 rounded-md backdrop-blur-sm uppercase">
                        {founder.role.split(" ")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-white text-sm mb-0.5 tracking-wide">
                      {founder.name}
                    </h3>
                    <p className="text-violet-400 text-xs mb-2 font-medium">
                      {founder.role}
                    </p>
                    <p className="text-zinc-600 text-xs line-clamp-2 leading-relaxed">
                      {founder.bio}
                    </p>
                  </div>

                  {/* Bottom hover accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </div>
              </AnimatedContent>
            ))}
          </div>

          <AnimatedContent className="text-center mt-12">
            <Button
              variant="outline"
              className="border-zinc-700 hover:border-violet-500/50 hover:bg-violet-500/5 hover:text-violet-400 transition-all duration-300 text-xs tracking-widest px-8 py-5"
              asChild
            >
              <Link href="/studio">
                View Full Team
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Link>
            </Button>
          </AnimatedContent>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 px-4 bg-gradient-to-b from-zinc-950 to-black relative overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(176,38,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(176,38,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto w-full">
          <AnimatedContent>
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/15 via-fuchsia-500/8 to-violet-500/15 blur-2xl" />

            {/* Card */}
            <div className="relative rounded-2xl border border-violet-500/20 bg-zinc-950/90 backdrop-blur-sm p-10 sm:p-14 text-center">
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-violet-500/50 rounded-tl-sm" />
              <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-violet-500/50 rounded-tr-sm" />
              <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-violet-500/50 rounded-bl-sm" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-violet-500/50 rounded-br-sm" />

              {/* Top line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-6 h-6 text-violet-400" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4">
                Ready to Build Something{" "}
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent">
                  Amazing?
                </span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base mb-8 max-w-lg mx-auto leading-relaxed">
                Join thousands of aspiring game developers who have launched
                their careers with D-Blanks.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
                <Link href="/courses">
                  <GlowButton
                    variant="primary"
                    className="w-full sm:w-auto min-w-[200px]"
                  >
                    Start Learning Free
                    <ArrowRight className="inline-block w-4 h-4 ml-2" />
                  </GlowButton>
                </Link>
                <Link href="/contact">
                  <GlowButton
                    variant="secondary"
                    className="w-full sm:w-auto min-w-[200px]"
                  >
                    Contact Us
                  </GlowButton>
                </Link>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-600">
                {[
                  "No credit card needed",
                  "Industry Certified",
                  "Industry mentors",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-500/70" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-14 px-4 border-t border-zinc-800/50 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <Link
                href="/"
                className="flex items-center gap-2.5 group mb-5 w-fit"
              >
                <div className="relative w-8 h-8 rounded-lg overflow-hidden ring-1 ring-zinc-700 group-hover:ring-violet-500/50 transition-all">
                  <Image
                    src="/favicon.jpeg"
                    alt="D-Blanks"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-black tracking-[0.15em] text-sm">
                  D
                  <span className="text-violet-500 group-hover:text-violet-400 transition-colors">
                    BLANKS
                  </span>
                </span>
              </Link>
              <p className="text-zinc-500 text-xs mb-6 leading-relaxed">
                World-class gaming experiences combined with certified
                vocational training.
              </p>
              <div className="flex items-center gap-2">
                {/* X (Twitter) */}
                <a
                  href="#"
                  aria-label="X"
                  className="w-8 h-8 rounded-lg bg-zinc-800/80 border border-zinc-700/40 flex items-center justify-center text-zinc-600 hover:text-violet-400 hover:border-violet-500/40 transition-all duration-300"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-zinc-800/80 border border-zinc-700/40 flex items-center justify-center text-zinc-600 hover:text-violet-400 hover:border-violet-500/40 transition-all duration-300"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                {/* GitHub */}
                <a
                  href="#"
                  aria-label="GitHub"
                  className="w-8 h-8 rounded-lg bg-zinc-800/80 border border-zinc-700/40 flex items-center justify-center text-zinc-600 hover:text-violet-400 hover:border-violet-500/40 transition-all duration-300"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-lg bg-zinc-800/80 border border-zinc-700/40 flex items-center justify-center text-zinc-600 hover:text-violet-400 hover:border-violet-500/40 transition-all duration-300"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-lg bg-zinc-800/80 border border-zinc-700/40 flex items-center justify-center text-zinc-600 hover:text-violet-400 hover:border-violet-500/40 transition-all duration-300"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white text-[10px] font-display tracking-[0.25em] uppercase mb-5">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {[
                  ["/", "Home"],
                  ["/games", "Games"],
                  ["/studio", "Studio"],
                  ["/contact", "Contact"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-zinc-500 hover:text-violet-400 text-sm transition-colors flex items-center gap-1.5 group w-fit"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Courses */}
            <div>
              <h4 className="text-white text-[10px] font-display tracking-[0.25em] uppercase mb-5">
                Courses
              </h4>
              <ul className="space-y-2.5">
                {[
                  ["Game Development", "/courses"],
                  ["3D Modeling", "/courses"],
                  ["Game Design", "/courses"],
                  ["All Programs", "/courses"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-zinc-500 hover:text-violet-400 text-sm transition-colors flex items-center gap-1.5 group w-fit"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white text-[10px] font-display tracking-[0.25em] uppercase mb-5">
                Contact
              </h4>
              <ul className="space-y-2.5 text-xs text-zinc-500">
                <li className="hover:text-violet-400 transition-colors cursor-default">
                  hello@dblanks.com
                </li>
                <li className="hover:text-violet-400 transition-colors cursor-default">
                  +91 98765 43210
                </li>
                <li>Mumbai, Maharashtra</li>
                <li>India</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-zinc-800/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap justify-center gap-5 text-xs text-zinc-700">
              <Link
                href="/privacy-policy"
                className="hover:text-zinc-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-zinc-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/refund-policy"
                className="hover:text-zinc-400 transition-colors"
              >
                Refund Policy
              </Link>
            </div>
            <p className="text-xs text-zinc-700">
              © {currentYear} D-Blanks. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
