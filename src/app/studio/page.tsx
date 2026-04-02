'use client';

import Link from 'next/link';
import { 
  Gamepad2, 
  Users, 
  Trophy,
  Star,
  ArrowRight,
  Sparkles,
  Award,
  Rocket,
  Globe,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ParticleField } from '@/components/ui/ParticleField';
import { GlitchText } from '@/components/ui/GlitchText';
import { GlowButton } from '@/components/ui/GlowButton';
import { HoverScale } from '@/components/ui/HoverScale';
import AnimatedContent from '@/components/AnimatedContent';
import GlareHover from '@/components/GlareHover';
import { achievements, teamMembers, founders } from '@/lib/placeholder-data';

const stats = [
  { icon: Gamepad2, label: 'Games', value: '120+', color: 'violet' },
  { icon: Users, label: 'Players', value: '50K+', color: 'emerald' },
  { icon: Trophy, label: 'Awards', value: '15+', color: 'amber' },
  { icon: Rocket, label: 'Founded', value: '2025', color: 'fuchsia' },
];

export default function StudioPage() {
  const currentYear = new Date().getFullYear();
  
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[70vh] flex items-center">
        {/* Particle Field Background */}
        <ParticleField 
          particleCount={40} 
          color="rgba(176, 38, 255, 0.2)" 
          className="z-0" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 via-black to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[128px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedContent>
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium border-violet-500/50 bg-violet-500/10 text-violet-400">
              <Sparkles className="w-4 h-4 mr-2" />
              Inside the Studio
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                <GlitchText>We Build Worlds</GlitchText>
              </span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
              D-Blanks is a high-performance game studio and creative collective pushing the boundaries of interactive entertainment.
            </p>
          </AnimatedContent>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-zinc-950 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedContent key={stat.label} delay={index * 0.1}>
                <div className="text-center cursor-pointer">
                  <div className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center transition-transform hover:scale-110 ${
                      stat.color === 'violet' ? 'bg-violet-500/20' :
                      stat.color === 'emerald' ? 'bg-emerald-500/20' :
                      stat.color === 'amber' ? 'bg-amber-500/20' :
                      'bg-fuchsia-500/20'
                    }`}>
                    <stat.icon className={`w-7 h-7 ${
                      stat.color === 'violet' ? 'text-violet-400' :
                      stat.color === 'emerald' ? 'text-emerald-400' :
                      stat.color === 'amber' ? 'text-amber-400' :
                      'text-fuchsia-400'
                    }`} />
                  </div>
                  <div className={`text-3xl md:text-4xl font-bold mb-1 ${
                      stat.color === 'violet' ? 'text-violet-400' :
                      stat.color === 'emerald' ? 'text-emerald-400' :
                      stat.color === 'amber' ? 'text-amber-400' :
                      'text-fuchsia-400'
                    }`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-violet-400 border-violet-500/50">
              Leadership
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              The Visionaries
            </h2>
          </AnimatedContent>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <AnimatedContent key={founder.id} delay={index * 0.1}>
                <GlareHover
                  background="linear-gradient(135deg, rgba(88, 28, 135, 0.3) 0%, rgba(30, 10, 60, 0.5) 100%)"
                  borderColor="rgba(139, 92, 246, 0.2)"
                  className="w-full !rounded-xl border"
                >
                  <Card className="bg-transparent border-0 shadow-none w-full">
                    <CardContent className="pt-6 text-center">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border-2 border-violet-500/30 mx-auto mb-6 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-3xl font-bold text-white/50">
                          {founder.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{founder.name}</h3>
                      <p className="text-violet-400 text-sm mb-4">{founder.role}</p>
                      <p className="text-zinc-400 text-sm leading-relaxed">{founder.bio}</p>
                    </CardContent>
                  </Card>
                </GlareHover>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-violet-400 border-violet-500/50">
              The Crew
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Our Talented Developers
            </h2>
          </AnimatedContent>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.slice(0, 8).map((member, index) => (
              <AnimatedContent key={member.id} delay={index * 0.05}>
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-violet-500/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-sm font-bold text-white">
                        {member.name[0]}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{member.name}</h4>
                        <p className="text-xs text-violet-400">@{member.handle}</p>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-2">{member.bio}</p>
                  </CardContent>
                </Card>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="mb-12">
            <Badge variant="outline" className="mb-4 text-emerald-400 border-emerald-500/50">
              Milestones
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Our Journey
            </h2>
          </AnimatedContent>

          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <AnimatedContent key={index} delay={index * 0.1}>
                <div className="flex gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-colors">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-xl font-bold flex-shrink-0">
                    {achievement.year.slice(2)}
                  </div>
                  <div className="flex-1">
                    <Badge variant="secondary" className="mb-2 bg-violet-500/20 text-violet-400">
                      {achievement.title}
                    </Badge>
                    <p className="text-zinc-400">{achievement.event}</p>
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-zinc-950 to-black border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedContent>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Be Part of the <span className="text-violet-400">Future</span>
            </h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
              Whether you are a player or a future developer, there is a place for you at D-Blanks.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/games">
                <GlowButton 
                  variant="primary"
                  className="min-w-[200px]"
                >
                  Play Our Games
                  <ArrowRight className="inline-block w-4 h-4 ml-2" />
                </GlowButton>
              </Link>
              <Link href="/courses">
                <GlowButton 
                  variant="secondary"
                  className="min-w-[200px]"
                >
                  Join the Studio
                </GlowButton>
              </Link>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-800 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">D<span className="text-violet-500">Blanks</span></span>
            </div>
            <p className="text-sm text-zinc-500">
              {currentYear} D-Blanks. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
