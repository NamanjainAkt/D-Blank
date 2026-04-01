'use client';

import Link from 'next/link';
import { 
  ChevronRight, 
  Gamepad2, 
  Users, 
  Trophy, 
  Zap, 
  Star,
  ArrowRight,
  Sparkles,
  Monitor,
  Code2,
  Palette,
  Layers,
  Youtube,
  Twitter,
  Instagram,
  Github,
  Linkedin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AnimatedContent from '@/components/AnimatedContent';
import GlareHover from '@/components/GlareHover';
import { games, courses, stats, testimonials, founders } from '@/lib/placeholder-data';

// Tool logos as SVG components
const UnityLogo = () => (
  <svg viewBox="0 0 124 124" className="w-8 h-8" fill="white">
    <path d="M85.537 20.024L38.458 0.047C36.542 -0.492 34.534 0.506 33.997 2.436L0.487 92.777c-0.535 1.93 0.467 3.938 2.386 4.424l47.08 19.978c1.916 0.812 4.153 -0.14 4.723 -2.01l5.342 -30.63 21.826 -3.858 10.769 11.155c1.124 1.165 3.005 1.165 4.128 0l11.154 -11.562 9.736 -2.113c1.93 -0.54 2.948 -2.547 2.406 -4.477l-5.342 -30.558z"/>
  </svg>
);

const UnrealLogo = () => (
  <svg viewBox="0 0 124 124" className="w-8 h-8" fill="white">
    <path d="M0 62.5L62 0l62 62-62 62L0 62.5zm33.3 33.3l28.7-28.7 28.7 28.7-28.7 28.7-28.7-28.7z"/>
  </svg>
);

const BlenderLogo = () => (
  <svg viewBox="0 0 124 124" className="w-8 h-8" fill="white">
    <path d="M62 0C28.3 0 0 28.3 0 62s28.3 62 62 62 62-28.3 62-62S95.7 0 62 0zm0 103.3c-22.8 0-41.3-18.5-41.3-41.3S39.2 20.7 62 20.7s41.3 18.5 41.3 41.3-18.5 41.3-41.3 41.3z"/>
  </svg>
);

const GodotLogo = () => (
  <svg viewBox="0 0 124 124" className="w-8 h-8" fill="white">
    <circle cx="62" cy="62" r="50"/>
  </svg>
);

// Avatar colors for testimonials
const avatarColors = [
  'from-violet-600 to-purple-600',
  'from-cyan-600 to-blue-600',
  'from-amber-600 to-orange-600',
  'from-emerald-600 to-green-600',
  'from-pink-600 to-rose-600',
  'from-indigo-600 to-blue-600',
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-black to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[128px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <AnimatedContent>
            <Badge 
              variant="outline" 
              className="mb-8 px-4 py-1.5 text-xs font-medium border-violet-500/50 bg-violet-500/10 text-violet-400"
            >
              <Sparkles className="w-3 h-3 mr-2" />
              AICTE Approved Vocational Partner
            </Badge>
          </AnimatedContent>

          {/* Headline with clamp for responsive font sizes */}
          <AnimatedContent delay={0.1}>
            <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-bold tracking-tight mb-6 leading-tight">
              <span className="block">
                <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  Build. Play.
                </span>
              </span>
              <span className="block">
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                  Create.
                </span>
              </span>
            </h1>
          </AnimatedContent>

          {/* Subheadline */}
          <AnimatedContent delay={0.2}>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              We craft immersive gaming experiences and train the next generation of game developers through industry-leading programs.
            </p>
          </AnimatedContent>

          {/* CTAs - Primary and Secondary */}
          <AnimatedContent delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 h-12 px-8 text-base font-semibold shadow-lg shadow-violet-500/25"
                asChild
              >
                <Link href="/courses">
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 px-8 text-base font-semibold border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600"
                asChild
              >
                <Link href="/games">
                  Explore Games
                </Link>
              </Button>
            </div>
          </AnimatedContent>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-zinc-600 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-zinc-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* ===== STATS GRID ===== */}
      <section className="py-16 border-y border-zinc-800/50 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center hover:border-violet-500/30 transition-colors">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-zinc-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED GAMES ===== */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent>
            <div className="flex items-end justify-between mb-12">
              <div>
                <Badge variant="outline" className="mb-4 text-violet-400 border-violet-500/50">
                  Our Games
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                  Featured Titles
                </h2>
              </div>
              <Button variant="ghost" className="text-zinc-400 hover:text-white hidden sm:flex" asChild>
                <Link href="/games">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </AnimatedContent>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.slice(0, 6).map((game, index) => (
              <AnimatedContent key={game.id} delay={index * 0.1}>
                <GlareHover
                  background="linear-gradient(135deg, rgba(88, 28, 135, 0.2) 0%, rgba(30, 10, 60, 0.4) 100%)"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  glareColor="#8b5cf6"
                  className="w-full !rounded-xl border"
                >
                  <Card className="bg-transparent border-0 shadow-none w-full">
                    <div className="relative aspect-video bg-gradient-to-br from-violet-900/50 to-fuchsia-900/50 rounded-lg overflow-hidden mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Gamepad2 className="w-16 h-16 text-white/10" />
                      </div>
                      {/* Genre badge with accent color */}
                      <Badge 
                        className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-0.5 ${
                          game.genre === 'RPG' ? 'bg-purple-600/80' :
                          game.genre === 'Racing' ? 'bg-cyan-600/80' :
                          game.genre === 'Strategy' ? 'bg-blue-600/80' :
                          game.genre === 'Action' ? 'bg-red-600/80' :
                          game.genre === 'Roguelike' ? 'bg-green-600/80' :
                          game.genre === 'Battle Royale' ? 'bg-orange-600/80' :
                          'bg-zinc-600/80'
                        }`}
                      >
                        {game.genre}
                      </Badge>
                      {game.featured && (
                        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="p-0 mb-2">
                      <CardTitle className="text-lg font-bold">{game.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-sm text-zinc-400 mb-3 line-clamp-2">{game.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-amber-400">
                          <Star className="w-4 h-4 fill-current" />
                          {game.rating}
                        </span>
                        {/* Platform as styled badge */}
                        <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-400">
                          {game.platform}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </GlareHover>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-violet-400 border-violet-500/50">
              Why D-Blanks
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Built for Excellence
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We combine cutting-edge technology with creative mastery to deliver exceptional gaming experiences.
            </p>
          </AnimatedContent>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Large Feature - Full Width */}
            <AnimatedContent className="lg:col-span-2">
              <GlareHover
                background="linear-gradient(135deg, rgba(88, 28, 135, 0.3) 0%, rgba(30, 10, 60, 0.5) 100%)"
                borderColor="rgba(139, 92, 246, 0.3)"
                className="w-full !rounded-2xl border p-8 min-h-[280px]"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Industry-Standard Tools</h3>
                    <p className="text-zinc-400 leading-relaxed mb-6">
                      Master professional workflows used by AAA studios worldwide. Our curriculum is designed with input from industry veterans.
                    </p>
                  </div>
                  {/* Real tool logos */}
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2 bg-zinc-800/50 px-4 py-2 rounded-lg">
                      <UnityLogo />
                      <span className="text-sm font-medium">Unity</span>
                    </div>
                    <div className="flex items-center gap-2 bg-zinc-800/50 px-4 py-2 rounded-lg">
                      <UnrealLogo />
                      <span className="text-sm font-medium">Unreal</span>
                    </div>
                    <div className="flex items-center gap-2 bg-zinc-800/50 px-4 py-2 rounded-lg">
                      <BlenderLogo />
                      <span className="text-sm font-medium">Blender</span>
                    </div>
                    <div className="flex items-center gap-2 bg-zinc-800/50 px-4 py-2 rounded-lg">
                      <GodotLogo />
                      <span className="text-sm font-medium">Godot</span>
                    </div>
                  </div>
                </div>
              </GlareHover>
            </AnimatedContent>

            {/* Small Features - 2x2 grid */}
            <AnimatedContent delay={0.1}>
              <GlareHover
                background="linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.3) 100%)"
                borderColor="rgba(16, 185, 129, 0.3)"
                className="w-full !rounded-xl border p-6"
              >
                <Layers className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">Hands-on Projects</h3>
                <p className="text-sm text-zinc-400">Build real games from day one, not just tutorials.</p>
              </GlareHover>
            </AnimatedContent>

            <AnimatedContent delay={0.2}>
              <GlareHover
                background="linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.3) 100%)"
                borderColor="rgba(59, 130, 246, 0.3)"
                className="w-full !rounded-xl border p-6"
              >
                <Users className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">Expert Mentors</h3>
                <p className="text-sm text-zinc-400">Learn directly from active industry professionals.</p>
              </GlareHover>
            </AnimatedContent>

            <AnimatedContent delay={0.3}>
              <GlareHover
                background="linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.3) 100%)"
                borderColor="rgba(245, 158, 11, 0.3)"
                className="w-full !rounded-xl border p-6"
              >
                <Trophy className="w-8 h-8 text-amber-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">Career Support</h3>
                <p className="text-sm text-zinc-400">Portfolio reviews and job referrals to partner studios.</p>
              </GlareHover>
            </AnimatedContent>

            <AnimatedContent delay={0.4}>
              <GlareHover
                background="linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(219, 39, 119, 0.3) 100%)"
                borderColor="rgba(236, 72, 153, 0.3)"
                className="w-full !rounded-xl border p-6"
              >
                <Monitor className="w-8 h-8 text-pink-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">Multi-Platform</h3>
                <p className="text-sm text-zinc-400">Deploy to PC, Console, Mobile, and Web.</p>
              </GlareHover>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* ===== COURSES PREVIEW ===== */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent>
            <div className="flex items-end justify-between mb-12">
              <div>
                <Badge variant="outline" className="mb-4 text-violet-400 border-violet-500/50">
                  Training Programs
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                  Start Your Journey
                </h2>
              </div>
              <Button variant="ghost" className="text-zinc-400 hover:text-white hidden sm:flex" asChild>
                <Link href="/courses">
                  All Courses
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </AnimatedContent>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <AnimatedContent key={course.id} delay={index * 0.1}>
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-violet-500/50 transition-colors group h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      {/* Category badge with distinct styling */}
                      <Badge 
                        variant="secondary" 
                        className={`text-xs font-medium uppercase tracking-wider ${
                          course.category === 'tech' ? 'bg-blue-500/20 text-blue-400' :
                          course.category === 'design' ? 'bg-purple-500/20 text-purple-400' :
                          course.category === 'creative' ? 'bg-pink-500/20 text-pink-400' :
                          'bg-zinc-700 text-zinc-300'
                        }`}
                      >
                        {course.category}
                      </Badge>
                      {/* Price with nowrap */}
                      <span className="text-2xl font-bold text-white whitespace-nowrap">
                        ₹{(course.price / 100).toLocaleString()}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-violet-400 transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-zinc-400 mt-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Code2 className="w-4 h-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        {course.rating}
                      </span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500" asChild>
                      <Link href={`/courses`}>
                        Enroll Now
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-violet-400 border-violet-500/50">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              What Our Community Says
            </h2>
          </AnimatedContent>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <AnimatedContent key={testimonial.id} delay={index * 0.1}>
                <Card className="bg-zinc-900/50 border-zinc-800 h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 text-amber-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-zinc-300 mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      {/* Styled avatar with color */}
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-bold text-lg`}>
                        {testimonial.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-zinc-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM PREVIEW ===== */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-violet-400 border-violet-500/50">
              Our Team
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Meet the Founders
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              A passionate team of game developers, artists, and educators united by a love for interactive storytelling.
            </p>
          </AnimatedContent>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <AnimatedContent key={founder.id} delay={index * 0.1}>
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-violet-500/50 transition-all group h-full">
                  <CardContent className="pt-6 text-center">
                    {/* Large styled avatar */}
                    <div className="w-28 h-28 rounded-full mx-auto mb-6 overflow-hidden bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 border-2 border-violet-500/30 group-hover:border-violet-500/60 transition-colors">
                      <div className={`w-full h-full bg-gradient-to-br ${avatarColors[index]} flex items-center justify-center text-4xl font-bold text-white/80`}>
                        {founder.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{founder.name}</h3>
                    <p className="text-violet-400 text-sm mb-3 font-medium">{founder.role}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{founder.bio}</p>
                  </CardContent>
                </Card>
              </AnimatedContent>
            ))}
          </div>

          <AnimatedContent className="text-center mt-12">
            <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800" asChild>
              <Link href="/studio">
                View Full Team
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </AnimatedContent>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 bg-gradient-to-b from-zinc-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[128px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedContent>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to Build Something{' '}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Amazing?
              </span>
            </h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of aspiring game developers who have launched their careers with D-Blanks.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 h-12 px-8 text-base font-semibold shadow-lg shadow-violet-500/25"
                asChild
              >
                <Link href="/courses">
                  Start Learning Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 px-8 text-base font-semibold border-zinc-700 hover:bg-zinc-800"
                asChild
              >
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* ===== EXPANDED FOOTER ===== */}
      <footer className="py-16 border-t border-zinc-800 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 group mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold whitespace-nowrap">
                  D<span className="text-violet-500">Blanks</span>
                </span>
              </Link>
              <p className="text-zinc-400 text-sm mb-6">
                World-class gaming experiences combined with AICTE-recognized vocational training.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="text-zinc-400 hover:text-white text-sm transition-colors">Home</Link></li>
                <li><Link href="/games" className="text-zinc-400 hover:text-white text-sm transition-colors">Games</Link></li>
                <li><Link href="/studio" className="text-zinc-400 hover:text-white text-sm transition-colors">Studio</Link></li>
                <li><Link href="/contact" className="text-zinc-400 hover:text-white text-sm transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Courses */}
            <div>
              <h4 className="font-semibold text-white mb-4">Courses</h4>
              <ul className="space-y-3">
                <li><Link href="/courses" className="text-zinc-400 hover:text-white text-sm transition-colors">Game Development</Link></li>
                <li><Link href="/courses" className="text-zinc-400 hover:text-white text-sm transition-colors">3D Modeling</Link></li>
                <li><Link href="/courses" className="text-zinc-400 hover:text-white text-sm transition-colors">Game Design</Link></li>
                <li><Link href="/courses" className="text-zinc-400 hover:text-white text-sm transition-colors">All Programs</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li>hello@dblanks.com</li>
                <li>+91 98765 43210</li>
                <li>Mumbai, Maharashtra</li>
                <li>India</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
            </div>
            <p className="text-sm text-zinc-500">
              © 2026 D-Blanks. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}