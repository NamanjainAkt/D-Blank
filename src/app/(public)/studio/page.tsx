'use client';

import * as React from 'react';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import Footer2 from "@/components/Footer2";
import { 
  Users, 
  Target, 
  Rocket, 
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  Cpu,
  Globe
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ParticleField } from '@/components/ui/ParticleField';
import { GlowButton } from '@/components/ui/GlowButton';
import { CrystalButton } from '@/components/ui/CrystalButton';
import { MorphingBlobs } from '@/components/ui/MorphingBlobs';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import ChromaGrid, { ChromaItem } from '@/components/ui/ChromaGrid';
import AnimatedContent from '@/components/AnimatedContent';
import { founders, teamMembers } from '@/lib/placeholder-data';
import { motion } from 'framer-motion';

export default function StudioPage() {
  // Map founders to ChromaItem format for the Visionaries section
  const visionaryItems: ChromaItem[] = founders.map(founder => ({
    image: founder.image,
    title: founder.name,
    subtitle: founder.role,
    handle: `@${founder.name.split(' ')[0].toLowerCase()}`,
  }));

  return (
    <main className="min-h-screen bg-black text-white relative isolate selection:bg-primary/30">
      <MagneticCursor />
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <MorphingBlobs 
          colors={['rgba(176, 38, 255, 0.08)', 'rgba(217, 70, 239, 0.08)']} 
          className="opacity-50"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(176,38,255,0.05),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <AnimatedContent>
            <Badge variant="outline" className="mb-8 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.3em] border-primary/40 bg-primary/5 text-primary shadow-[0_0_15px_rgba(176,38,255,0.2)]">
              About Us
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-8 uppercase italic leading-[0.95] px-4">
              <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-primary bg-clip-text text-transparent">
                Meet The Team
              </span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-12 font-mono text-[13px] uppercase tracking-[0.2em] leading-relaxed opacity-80 px-4">
              A team of passionate game developers, artists, and educators building the future of gaming.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 px-4">
              <Link href="#crew" data-magnetic>
                <GlowButton variant="primary" className="min-w-[200px] h-14">
                  Meet The Team
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </GlowButton>
              </Link>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Philosophy Section - Minimalist replacement for Stats/Journey */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: Cpu, 
                title: "Core Architecture", 
                desc: "Low-level optimization meets high-fidelity visual fidelity.",
                color: "text-primary"
              },
              { 
                icon: Shield, 
                title: "Sovereign Design", 
                desc: "Immersion without compromise. Decoupled from legacy standards.",
                color: "text-blue-500"
              },
              { 
                icon: Zap, 
                title: "Hyper-Response", 
                desc: "Synchronous experience delivery across all digital touchpoints.",
                color: "text-accent"
              }
            ].map((item, i) => (
              <AnimatedContent key={i} delay={i * 0.1}>
                <div className="group p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 hover:border-primary/20 transition-all duration-500">
                  <div className={`p-4 rounded-2xl bg-zinc-950 border border-white/5 w-fit mb-6 shadow-glow transition-transform group-hover:scale-110 group-hover:rotate-3 ${item.color}`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-3 italic">{item.title}</h3>
                  <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Visionaries (ChromaGrid) */}
      <section className="py-32 relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <MorphingBlobs 
            colors={['rgba(176, 38, 255, 0.08)', 'rgba(217, 70, 239, 0.08)']} 
            className="opacity-50"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(176,38,255,0.05),transparent_70%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedContent className="text-center mb-24">
            <Badge variant="outline" className="mb-4 text-accent border-accent/40 bg-accent/5">Founders</Badge>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Our Founders</h2>
          </AnimatedContent>

          <div className="min-h-[600px] w-full">
            <ChromaGrid 
              items={visionaryItems} 
              radius={350}
              damping={0.6}
            />
          </div>
        </div>
      </section>

      {/* The Crew (Developer Grid) */}
      <section id="crew" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <Badge variant="outline" className="mb-4 text-primary border-primary/40 bg-primary/5">Team Members</Badge>
                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">Meet The Experts</h2>
              </div>
              <p className="max-w-md text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] leading-relaxed">
                A team of talented designers, developers, and artists from across the globe.
              </p>
            </div>
          </AnimatedContent>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {teamMembers.map((member, i) => (
              <AnimatedContent key={member.id} delay={i * 0.05}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="group relative h-full flex flex-col p-6 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-primary/40 transition-all duration-500 overflow-hidden"
                >
                  {/* Hover Accent Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 rounded-2xl bg-zinc-950 border border-white/5 group-hover:border-primary/30 transition-colors shadow-inner">
                        <Users className="w-5 h-5 text-zinc-500 group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-[9px] font-mono text-primary/60 uppercase tracking-[0.3em] font-black group-hover:text-primary transition-colors">
                        OP_{member.id.toString().padStart(3, '0')}
                      </span>
                    </div>

                    <h3 className="text-lg font-black italic uppercase tracking-tighter mb-1 text-white group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-[10px] font-mono text-accent/80 uppercase tracking-widest mb-4">
                      {member.role}
                    </p>
                    
                    <p className="text-[10px] font-mono text-zinc-500 uppercase leading-relaxed mb-6 group-hover:text-zinc-400 transition-colors">
                      {member.bio}
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-2">
                      {member.skills.map((skill, si) => (
                        <span key={si} className="px-2 py-0.5 rounded-full bg-zinc-950 border border-white/5 text-[8px] font-mono text-zinc-500 uppercase group-hover:border-primary/10 group-hover:text-primary/60 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cyber-Path SVG Accent */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-100 transition-all duration-700">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary/30 group-hover:stroke-primary/60 stroke-[0.5] transition-colors">
                      <path d="M0 100 L100 0 L100 100 Z" />
                      <circle cx="90" cy="90" r="2" className="fill-primary" />
                    </svg>
                  </div>
                </motion.div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Be Part of the Future */}
      <section className="py-40 relative group overflow-hidden">
        <ParticleField 
          particleCount={50} 
          color="rgba(176, 38, 255, 0.2)" 
          className="absolute inset-0 opacity-40"
        />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedContent className="text-center p-16 rounded-[3rem] bg-gradient-to-b from-zinc-900/50 to-black/50 border border-white/5 backdrop-blur-xl relative overflow-hidden group/card shadow-[0_0_100px_rgba(0,0,0,1)]">
            {/* Focal Point Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,transparent_70%)] rounded-full pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10">
              <Badge variant="outline" className="mb-8 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.4em] border-accent/40 bg-accent/5 text-accent">Initiation Portal</Badge>
              <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-[0.95]">
                Be Part Of The <span className="text-primary italic">Matrix</span>
              </h2>
              <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest max-w-xl mx-auto mb-16 leading-relaxed">
                The syndicate is always looking for rogue talent. Are you ready to initialize your future?
              </p>
              
              <div className="flex flex-col items-center gap-8 translate-y-4">
                <div data-magnetic>
                  <CrystalButton href="/contact" />
                </div>
                <Link href="/courses" className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] hover:text-primary transition-colors hover:underline decoration-primary underline-offset-8">
                  View Mission Training Modules
                </Link>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <Footer />
      <Footer2 />
    </main>
  );
}
