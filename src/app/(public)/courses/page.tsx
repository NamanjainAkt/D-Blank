'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import Footer2 from "@/components/Footer2";
import { 
  BookOpen, 
  Users, 
  Trophy,
  Star,
  ArrowRight,
  CheckCircle2,
  Code2,
  Clock,
  Sparkles,
  Loader2,
  Shield,
  Zap,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ParticleField } from '@/components/ui/ParticleField';
import { GlowButton } from '@/components/ui/GlowButton';
import { MorphingBlobs } from '@/components/ui/MorphingBlobs';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import AnimatedContent from '@/components/AnimatedContent';
import GlareHover from '@/components/GlareHover';
import { courseCategories, teamMembers } from '@/lib/placeholder-data';
import { formatCurrency, cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const outcomes = [
  {
    title: "Production Pipeline",
    description: "Master the complete development pipeline from concept to deployment.",
    icon: Code2,
    color: "text-primary"
  },
  {
    title: "Professional Portfolio",
    description: "Build a portfolio of 3+ fully functional projects for your career.",
    icon: Trophy,
    color: "text-accent"
  },
  {
    title: "Job Placement",
    description: "Get direct referrals to industry partners and partner studios.",
    icon: Users,
    color: "text-blue-500"
  }
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/courses?category=${activeCategory}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setCourses(data.courses || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <main className="min-h-screen bg-black text-white relative isolate selection:bg-primary/30">
      <MagneticCursor />
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <MorphingBlobs 
          colors={['rgba(176, 38, 255, 0.1)', 'rgba(217, 70, 239, 0.1)']} 
          className="opacity-40"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(176,38,255,0.05),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <AnimatedContent>
            <Badge variant="outline" className="mb-8 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.3em] border-primary/40 bg-primary/5 text-primary shadow-[0_0_15px_rgba(176,38,255,0.2)]">
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              Training Courses
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-8 uppercase italic leading-[0.95] px-4">
              <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-primary bg-clip-text text-transparent">
                Start Your Career
              </span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-12 font-mono text-[13px] uppercase tracking-[0.2em] leading-relaxed opacity-80 px-4">
              Master in-demand skills with industry-certified courses taught by experts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 px-4">
              <Link href="#modules" data-magnetic>
                <GlowButton variant="primary" className="min-w-[220px] h-14">
                  Browse Courses
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </GlowButton>
              </Link>
              <Link href="/contact" data-magnetic>
                <GlowButton variant="secondary" className="min-w-[220px] h-14 border-zinc-800 text-zinc-500 hover:text-white">
                  Contact Us
                </GlowButton>
              </Link>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Stats Section - Refined */}
      <section className="py-16 border-y border-white/5 bg-zinc-950/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Success Rate", value: "98%", color: "text-primary" },
              { label: "Students Trained", value: "50K+", color: "text-accent" },
              { label: "Verified Courses", value: "100%", color: "text-primary" },
              { label: "Certification", value: "Industry", color: "text-accent" }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className={cn("text-3xl md:text-4xl font-black italic tracking-tighter group-hover:scale-110 transition-transform duration-500", stat.color)}>
                  {stat.value}
                </div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.25em] mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes Section - Achievement Matrix */}
      <section className="py-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <AnimatedContent>
              <Badge variant="outline" className="mb-6 text-accent border-accent/40 bg-accent/5">What You'll Get</Badge>
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-12">Our Achievements</h2>
              <div className="space-y-6">
                {outcomes.map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex gap-6 p-6 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-accent/30 transition-all duration-500 group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:border-accent/40 shadow-inner">
                      <item.icon className={cn("w-8 h-8 transition-transform group-hover:scale-110", item.color)} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight mb-2 italic group-hover:text-accent transition-colors">{item.title}</h3>
                      <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedContent>

            <AnimatedContent delay={0.2}>
              <GlareHover
                background="radial-gradient(circle at 50% 50%, rgba(176, 38, 255, 0.15) 0%, transparent 80%)"
                borderColor="rgba(176, 38, 255, 0.2)"
                className="w-full !rounded-[3rem] border border-white/5 p-1 relative overflow-hidden group shadow-2xl"
              >
                <div className="bg-black/40 backdrop-blur-xl h-full w-full rounded-[2.8rem] p-12 flex flex-col items-center justify-center text-center">
                  <div className="relative mb-10">
                    <div className="absolute inset-0 bg-primary/40 rounded-full blur-[40px] animate-pulse" />
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center relative z-10 border border-white/20">
                      <BookOpen className="w-14 h-14 text-white drop-shadow-lg" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Elite Mastery</h3>
                  <p className="text-accent font-mono text-[10px] uppercase tracking-[0.4em] mb-6">Transition Confirmed</p>
                  <p className="text-zinc-500 font-mono text-xs uppercase leading-loose max-w-sm">
                    Move beyond the surface. Implement high-fidelity industrial protocols with a syndicate of elite creators.
                  </p>
                </div>
              </GlareHover>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section id="modules" className="py-40 bg-black relative overflow-hidden">
        {/* Matrix Grid Pattern Background */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedContent className="mb-20 text-center">
            <Badge variant="outline" className="mb-4 text-primary border-primary/40 bg-primary/5">Course Categories</Badge>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-12">Browse Courses</h2>
            
            <div className="inline-flex p-1.5 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-white/5">
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                <TabsList className="bg-transparent border-none">
                  {courseCategories.map((cat) => (
                    <TabsTrigger 
                      key={cat.id} 
                      value={cat.id}
                      className="data-[state=active]:bg-primary data-[state=active]:text-white text-[10px] font-mono uppercase tracking-[0.2em] px-8 py-2.5 rounded-xl transition-all"
                    >
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </AnimatedContent>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600 animate-pulse">Loading courses...</span>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <AnimatedContent key={course._id} delay={index * 0.1}>
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="group relative h-full flex flex-col rounded-[2.5rem] bg-zinc-900/40 border border-white/5 hover:border-primary/40 transition-all duration-700 overflow-hidden"
                  >
                    {/* Thumbnail with Scanlines */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img 
                        src={course.thumbnailUrl || '/placeholder-course.jpg'} 
                        alt={course.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-zinc-950/20 mix-blend-overlay opacity-50 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary/20 backdrop-blur-md text-primary border border-primary/30 text-[9px] font-mono uppercase tracking-widest px-3 py-1">
                          {course.level}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="secondary" className="bg-accent/10 text-accent border border-accent/20 text-[9px] font-mono uppercase tracking-[0.2em] px-3 py-1">
                          {course.category}
                        </Badge>
                      </div>
                      
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors duration-500">
                        {course.title}
                      </h3>
                      
                      <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest leading-relaxed mb-8 line-clamp-2">
                        {course.shortDescription}
                      </p>

                      <div className="space-y-4 mb-10">
                        <div className="flex items-center gap-3 text-[10px] font-mono uppercase text-zinc-400">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="tracking-[0.2em]">{course.duration} Duration</span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-mono uppercase text-zinc-400">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="tracking-[0.2em] font-black">{course.enrolledCount} Students Enrolled</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex flex-col">
                          {course.originalPrice > course.price && (
                            <span className="text-[10px] text-zinc-600 line-through font-mono tracking-tighter mb-1">
                              {formatCurrency(course.originalPrice)}
                            </span>
                          )}
                          <span className="text-2xl font-black text-white italic tracking-tighter drop-shadow-glow">
                            {formatCurrency(course.price)}
                          </span>
                        </div>
                        
                        <Link href={`/courses/${course.slug}`}>
                          <GlowButton variant="primary" className="h-10 px-6 rounded-none font-black text-[10px] uppercase tracking-[0.3em] border-r-2 border-b-2 border-white/10 group-hover:border-primary/40">
                            Authorize
                          </GlowButton>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedContent>
              ))}
            </div>
          ) : (
            <div className="text-center py-40 border border-dashed border-white/10 rounded-[3rem] bg-white/[0.01] backdrop-blur-sm">
              <BookOpen className="w-20 h-20 mx-auto mb-6 text-zinc-900" />
              <p className="text-zinc-600 font-mono text-xs uppercase tracking-[0.5em]">No synchronization detected in this sector.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Initialize */}
      <section className="py-24 bg-gradient-to-b from-zinc-950 to-black relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(176,38,255,0.1),transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedContent>
            <h2 className="text-4xl md:text-7xl font-black mb-10 uppercase tracking-tighter italic">
              Ready to <span className="text-primary italic">Initialize</span>?
            </h2>
            <p className="text-zinc-500 mb-16 max-w-xl mx-auto font-mono text-[13px] leading-[1.8] uppercase tracking-[0.25em]">
              Operational capacity is limited for the next training cycle. Secure your uplink in the matrix today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link href="#modules" data-magnetic>
                <GlowButton variant="primary" className="min-w-[260px] h-16 text-lg">
                  Explore Grid
                </GlowButton>
              </Link>
              <Link href="/contact" data-magnetic>
                <GlowButton variant="secondary" className="min-w-[260px] h-16 text-lg border-zinc-800 text-zinc-500">
                  Contact Syndicate
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
