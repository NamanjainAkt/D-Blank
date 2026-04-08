'use client';

import Link from 'next/link';
import { Sparkles, Users, Target, Rocket, Zap, ArrowRight } from 'lucide-react';
import { ParticleField } from '@/components/ui/ParticleField';
import { GlitchText } from '@/components/ui/GlitchText';
import { GlowButton } from '@/components/ui/GlowButton';
import AnimatedContent from '@/components/AnimatedContent';
import { Footer } from '@/components/Footer';
import Footer2 from '@/components/Footer2';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-[60vh]">
        <ParticleField 
          particleCount={50} 
          color="rgba(217, 70, 239, 0.2)" 
          className="z-0" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-black to-black" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedContent>
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium border-accent/50 bg-accent/10 text-accent">
              <Sparkles className="w-4 h-4 mr-2" />
              About D-Blanks
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8">
              <GlitchText textClassName="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                Pioneering the Future
              </GlitchText>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                of Game Development
              </span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              We are a premier gaming studio and educational platform, bridging the gap between playing games and creating them. 
            </p>
          </AnimatedContent>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="py-24 bg-zinc-950/50 border-y border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedContent>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
                Our <span className="text-accent">Mission</span>
              </h2>
              <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
                <p>
                  D-Blanks was founded with a singular vision: to cultivate the next generation of top-tier game developers while producing world-class gaming experiences.
                </p>
                <p>
                  We believe that the best way to learn game development is by actively building games. That’s why our training academy works hand-in-hand with our active game studio, giving students unprecedented access to real-world pipelines, assets, and workflows.
                </p>
              </div>
            </AnimatedContent>
            <AnimatedContent delay={0.2} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl rounded-full" />
              <div className="relative aspect-square rounded-2xl border border-zinc-800 bg-black overflow-hidden flex items-center justify-center p-8">
                <div className="grid grid-cols-2 gap-4 w-full h-full">
                  <div className="rounded-xl bg-zinc-900 flex flex-col items-center justify-center text-center p-6 border border-zinc-800 hover:border-primary/50 transition-colors">
                    <Target className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-bold text-white mb-2">Precision</h3>
                    <p className="text-xs text-zinc-500">Industry standard workflows</p>
                  </div>
                  <div className="rounded-xl bg-zinc-900 flex flex-col items-center justify-center text-center p-6 border border-zinc-800 hover:border-accent/50 transition-colors mt-8">
                    <Zap className="w-10 h-10 text-accent mb-4" />
                    <h3 className="font-bold text-white mb-2">Innovation</h3>
                    <p className="text-xs text-zinc-500">Cutting-edge technologies</p>
                  </div>
                  <div className="rounded-xl bg-zinc-900 flex flex-col items-center justify-center text-center p-6 border border-zinc-800 hover:border-accent/50 transition-colors -mt-8">
                    <Users className="w-10 h-10 text-accent mb-4" />
                    <h3 className="font-bold text-white mb-2">Community</h3>
                    <p className="text-xs text-zinc-500">Collaborative learning</p>
                  </div>
                  <div className="rounded-xl bg-zinc-900 flex flex-col items-center justify-center text-center p-6 border border-zinc-800 hover:border-primary/50 transition-colors">
                    <Rocket className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-bold text-white mb-2">Launch</h3>
                    <p className="text-xs text-zinc-500">From concept to release</p>
                  </div>
                </div>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-32 px-4 bg-black relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(176,38,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(176,38,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-[100%] pointer-events-none" />

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          <AnimatedContent>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
              Join the <span className="text-accent drop-shadow-[0_0_15px_rgba(217,70,239,0.4)]">Movement</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Whether you want to play our upcoming titles or build the next big hit with us, there's a place for you at D-Blanks.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/courses">
                <GlowButton variant="primary" className="w-full sm:w-auto min-w-[200px] shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                  View Courses
                  <ArrowRight className="inline-block w-4 h-4 ml-2" />
                </GlowButton>
              </Link>
              <Link href="/games">
                <GlowButton variant="secondary" className="w-full sm:w-auto min-w-[200px] border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 hover:text-white">
                  Explore Games
                </GlowButton>
              </Link>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <Footer />
      <Footer2 />
    </main>
  );
}