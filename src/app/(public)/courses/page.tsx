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
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ParticleField } from '@/components/ui/ParticleField';
import { GlitchText } from '@/components/ui/GlitchText';
import { GlowButton } from '@/components/ui/GlowButton';
import { HoverScale } from '@/components/ui/HoverScale';
import AnimatedContent from '@/components/AnimatedContent';
import GlareHover from '@/components/GlareHover';
import { courseCategories, teamMembers, testimonials } from '@/lib/placeholder-data';
import { formatCurrency } from '@/lib/utils';

const outcomes = [
  {
    title: "Real-World Projects",
    description: "Build a portfolio of 3+ fully playable games published on Steam or Play Store.",
    icon: Code2
  },
  {
    title: "Industry Portfolio",
    description: "Create professional-grade 3D assets and animations ready for AAA studios.",
    icon: Trophy
  },
  {
    title: "Placement Support",
    description: "Resume building, interview prep, and direct referrals to our partner studios.",
    icon: Users
  }
];

const processSteps = [
  { step: 1, title: 'Browse', description: 'Find your course' },
  { step: 2, title: 'Enroll', description: 'Sign up instantly' },
  { step: 3, title: 'Learn', description: 'Live sessions' },
  { step: 4, title: 'Certificate', description: 'Get certified' }
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
    <main className="min-h-screen bg-black text-white">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <ParticleField 
          particleCount={40} 
          color="rgba(16, 185, 129, 0.2)" 
          className="z-0" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 via-black to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[128px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedContent>
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium border-emerald-500/50 bg-emerald-500/10 text-emerald-400">
              <Sparkles className="w-4 h-4 mr-2" />
              Certified Training
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                <GlitchText>Build Your Career in</GlitchText>
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
                <GlitchText glitchIntensity={1.5}>Game Development</GlitchText>
              </span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10">
              From zero to pro. Master the tools used by world-class studios with hands-on training from industry experts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#courses">
                <GlowButton 
                  variant="emerald"
                  className="min-w-[200px]"
                >
                  Explore Courses
                  <ArrowRight className="inline-block w-4 h-4 ml-2" />
                </GlowButton>
              </Link>
              <Link href="/contact">
                <GlowButton 
                  variant="secondary"
                  className="min-w-[200px]"
                >
                  Talk to Advisor
                </GlowButton>
              </Link>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="py-8 bg-zinc-950 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-violet-400">98%</div>
              <div className="text-sm text-zinc-500">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">50K+</div>
              <div className="text-sm text-zinc-500">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-violet-400">100%</div>
              <div className="text-sm text-zinc-500">Verified Content</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">Global</div>
              <div className="text-sm text-zinc-500">Certification</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedContent>
                <Badge variant="outline" className="mb-4 text-emerald-400 border-emerald-500/50 cursor-default">
                  Outcomes
                </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                What You Will Achieve
              </h2>
              <div className="space-y-6">
                {outcomes.map((item, index) => (
                  <HoverScale key={index} scale={1.02}>
                    <div className="flex gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-zinc-400">{item.description}</p>
                      </div>
                    </div>
                  </HoverScale>
                ))}
              </div>
            </AnimatedContent>

            <AnimatedContent delay={0.2}>
              <GlareHover
                background="linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.3) 100%)"
                borderColor="rgba(16, 185, 129, 0.3)"
                className="w-full !rounded-2xl border p-8 min-h-[400px]"
              >
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-600 to-violet-600 flex items-center justify-center mb-6">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Career Ready</h3>
                  <p className="text-emerald-400 font-medium mb-4">Mastery to Transformation</p>
                  <p className="text-zinc-400 max-w-sm">
                    Transform from a beginner to a professional game developer with real-world projects and industry mentorship.
                  </p>
                </div>
              </GlareHover>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <section id="courses" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <Badge variant="outline" className="mb-4 text-violet-400 border-violet-500/50">
                  Courses
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Available Programs
                </h2>
              </div>
            </div>
          </AnimatedContent>

          <AnimatedContent delay={0.1} className="mb-8">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-zinc-900">
                {courseCategories.map((cat) => (
                  <TabsTrigger 
                    key={cat.id} 
                    value={cat.id}
                    className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-[10px] font-mono uppercase tracking-widest px-6"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </AnimatedContent>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">Syncing Courses...</span>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <AnimatedContent key={course._id} delay={index * 0.1}>
                  <HoverScale scale={1.03} className="h-full">
                    <Card className="bg-zinc-900/50 border-zinc-800 hover:border-violet-500/50 transition-all group overflow-hidden h-full flex flex-col">
                      <div className="relative aspect-video overflow-hidden">
                        <img src={course.thumbnailUrl || '/placeholder-course.jpg'} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 flex gap-2">
                          <Badge className="bg-violet-600 text-white text-[8px] font-mono uppercase tracking-tighter">
                            {course.level}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-mono uppercase tracking-widest">
                            {course.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl group-hover:text-emerald-400 transition-colors line-clamp-2 uppercase tracking-tight font-black">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="text-zinc-400 mt-2 line-clamp-2 text-xs font-mono">
                          {course.shortDescription}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-[11px] font-mono uppercase text-zinc-500">
                            <Clock className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] font-mono uppercase text-zinc-500">
                            <Users className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{course.enrolledCount} Seats Filled</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <ul className="space-y-2">
                            {course.learningOutcomes?.slice(0, 3).map((outcome: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-[10px] font-mono uppercase text-zinc-400">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5" />
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Separator className="my-4 bg-zinc-800" />

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex flex-col">
                            {course.originalPrice > course.price && (
                              <span className="text-[10px] text-zinc-500 line-through font-mono">
                                {formatCurrency(course.originalPrice)}
                              </span>
                            )}
                            <span className="text-xl font-black text-white font-display italic">
                              {formatCurrency(course.price)}
                            </span>
                          </div>
                          <Button className="bg-emerald-600 hover:bg-emerald-500 text-black font-black uppercase text-[10px] tracking-widest px-6" asChild>
                            <Link href={`/courses/${course.slug}`}>
                              Details
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </HoverScale>
                </AnimatedContent>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-zinc-800" />
              <p className="text-zinc-500 font-mono text-[11px] uppercase tracking-widest">No training modules currently active in this sector.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-violet-400 border-violet-500/50">
              Team
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest">Lead Operators</h2>
          </AnimatedContent>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teamMembers.slice(0, 4).map((member, index) => (
              <AnimatedContent key={member.id} delay={index * 0.1}>
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-violet-500/50 transition-colors text-center overflow-hidden group">
                  <CardContent className="pt-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-emerald-600 mx-auto mb-4 flex items-center justify-center text-2xl font-black text-white/80 border border-white/10 group-hover:scale-110 transition-transform">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <h3 className="font-bold text-white mb-1 uppercase tracking-tighter">{member.name}</h3>
                    <p className="text-[10px] font-mono text-emerald-400 mb-2 uppercase tracking-widest">{member.role}</p>
                    <p className="text-[10px] font-mono text-zinc-500 line-clamp-2 uppercase leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-zinc-950 to-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedContent>
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter">
              Ready to <span className="text-emerald-400">Initialize</span>?
            </h2>
            <p className="text-zinc-400 mb-10 max-w-xl mx-auto font-mono text-[13px] leading-relaxed uppercase tracking-widest">
              Seats are limited for the next cohort. Secure your spot in the studio today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="#courses">
                <GlowButton 
                  variant="emerald"
                  className="min-w-[240px] h-12"
                >
                  Explore Grid
                  <ArrowRight className="inline-block w-4 h-4 ml-2" />
                </GlowButton>
              </Link>
              <Link href="/contact">
                <GlowButton 
                  variant="secondary"
                  className="min-w-[240px] h-12"
                >
                  Comm Advisor
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
