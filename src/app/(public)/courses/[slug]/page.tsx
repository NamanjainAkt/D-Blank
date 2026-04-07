'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Footer2 from "@/components/Footer2";
import { 
  Clock, 
  Users, 
  Calendar, 
  CheckCircle2, 
  BookOpen, 
  Play, 
  Info, 
  ShieldCheck, 
  Award, 
  Infinity,
  ArrowRight,
  ChevronRight,
  MessageCircle,
  Mail,
  Video,
  Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatCurrency, formatDate } from '@/lib/utils';

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveCategory] = useState('overview');

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses/${resolvedParams.slug}`);
        const data = await res.json();
        if (data.error) setError(data.error);
        else setCourse(data.course);
      } catch (err) {
        setError('Failed to load course details.');
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [resolvedParams.slug]);

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const id = (match && match[2].length === 11) ? match[2] : null;
    return id ? `https://www.youtube.com/embed/${id}` : null;
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
    </div>
  );

  if (error || !course) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-tighter">{error || 'Transmission Lost'}</h2>
      <Link href="/courses">
        <Button className="bg-emerald-600 hover:bg-emerald-500 text-black font-black uppercase tracking-widest">Return to Grid</Button>
      </Link>
    </div>
  );

  const embedUrl = getYoutubeEmbedUrl(course.promoVideoUrl);
  const seatsLeft = course.totalSeats - course.enrolledCount;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-black to-black" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-mono uppercase tracking-widest px-3 py-1">
                  {course.category}
                </Badge>
                <Badge variant="outline" className="text-zinc-500 border-zinc-800 text-[10px] font-mono uppercase tracking-widest px-3 py-1">
                  {course.level} Level
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase italic leading-[0.9]">
                {course.title}
              </h1>
              
              <p className="text-zinc-400 text-lg leading-relaxed font-mono text-[14px] uppercase tracking-tight max-w-xl">
                {course.shortDescription}
              </p>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest">{course.enrolledCount} Active Operators</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest">{course.language}</span>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-violet-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative aspect-video bg-zinc-900 rounded-xl overflow-hidden border border-white/10">
                {embedUrl ? (
                  <iframe src={embedUrl} className="w-full h-full" allowFullScreen />
                ) : (
                  <img src={course.thumbnailUrl || '/placeholder-course.jpg'} alt="" className="w-full h-full object-cover" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Mission Briefing */}
              <div className="space-y-6">
                <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                  <Info className="w-6 h-6 text-emerald-500" /> Mission Briefing
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap font-mono text-[13px] uppercase tracking-tight">
                    {course.fullDescription}
                  </p>
                </div>
              </div>

              {/* Learning Outcomes */}
              {course.learningOutcomes?.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <Award className="w-6 h-6 text-emerald-500" /> Tactical Gains (Outcomes)
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {course.learningOutcomes.map((item: string, i: number) => (
                      <div key={i} className="flex gap-3 p-4 bg-zinc-900/50 border border-white/5 rounded-lg group hover:border-emerald-500/30 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-xs font-mono text-zinc-300 uppercase tracking-tight leading-normal">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Syllabus Matrix */}
              {course.curriculum?.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-emerald-500" /> Syllabus Matrix
                  </h2>
                  <Accordion type="single" collapsible className="w-full space-y-3">
                    {course.curriculum.map((module: any, i: number) => (
                      <AccordionItem key={i} value={`module-${i}`} className="border border-white/5 bg-zinc-900/30 rounded-lg px-4 overflow-hidden">
                        <AccordionTrigger className="hover:no-underline py-4 text-xs font-mono uppercase tracking-widest text-zinc-300">
                          <div className="flex items-center gap-4 text-left">
                            <span className="text-emerald-500 font-black">{String(i+1).padStart(2, '0')}</span>
                            <span>{module.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 pt-2">
                          <ul className="space-y-3 pl-10 border-l border-emerald-500/20 ml-2.5">
                            {module.lessons.map((lesson: string, li: number) => (
                              <li key={li} className="flex items-center gap-3 text-[11px] font-mono text-zinc-500 uppercase tracking-tight group">
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-emerald-500 transition-colors" />
                                {lesson}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {/* Prerequisites & Software */}
              <div className="grid md:grid-cols-2 gap-12">
                {course.prerequisites?.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" /> Pre-Flight Requirements
                    </h3>
                    <ul className="space-y-2">
                      {course.prerequisites.map((p: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 uppercase">
                          <ChevronRight className="w-3 h-3 text-emerald-500" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {course.softwareRequired?.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                      <Code className="w-5 h-5 text-emerald-500" /> Hardware/Software
                    </h3>
                    <ul className="space-y-2">
                      {course.softwareRequired.map((s: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 uppercase">
                          <div className="w-1 h-1 bg-emerald-500 rounded-full" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card className="bg-zinc-900 border-emerald-500/20 overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">Operation Cost</div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-black font-display text-white italic">{formatCurrency(course.price)}</span>
                        {course.originalPrice > course.price && (
                          <span className="text-lg text-zinc-600 font-mono line-through">{formatCurrency(course.originalPrice)}</span>
                        )}
                      </div>
                      {course.originalPrice > course.price && (
                        <Badge className="bg-emerald-500 text-black font-black text-[10px] px-2 py-0">
                          -{Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% EFFICIENCY GAIN
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <div className="flex justify-between items-center text-[11px] font-mono uppercase">
                        <span className="text-zinc-500 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Start Cycle</span>
                        <span className="text-zinc-200">{course.batchStartDate ? formatDate(course.batchStartDate) : 'TBA'}</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-mono uppercase">
                        <span className="text-zinc-500 flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Timing</span>
                        <span className="text-zinc-200 text-right">{course.schedule}</span>
                      </div>
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between text-[10px] font-mono uppercase">
                          <span className="text-emerald-500">{seatsLeft} Slots Available</span>
                          <span className="text-zinc-600">{Math.round((course.enrolledCount / course.totalSeats) * 100)}% Saturation</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 shadow-[0_0_8px_#10b981]" style={{ width: `${(course.enrolledCount / course.totalSeats) * 100}%` }} />
                        </div>
                      </div>
                    </div>

                    <Link href={`/enroll/${course._id}`} className="block">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-black font-black uppercase tracking-widest h-14 text-sm group">
                        Authorize Enrollment <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    
                    <p className="text-[9px] font-mono text-zinc-600 text-center uppercase tracking-widest">
                      Secure Uplink via Digital Gateway
                    </p>
                  </div>
                  
                  <div className="bg-white/[0.02] p-6 space-y-4 border-t border-white/5">
                    {[
                      { icon: Infinity, text: 'Lifetime Auth Grant' },
                      { icon: Award, text: 'Credential Issuance' },
                      { icon: ShieldCheck, text: 'Session Logs Archive' },
                      { icon: MessageCircle, text: 'Comm Channel Access' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                        <item.icon className="w-3.5 h-3.5 text-emerald-500/50" />
                        {item.text}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Support Terminal */}
                <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-xl space-y-4">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Support Terminal</div>
                  <div className="space-y-2">
                    <a href={`mailto:${course.supportEmail || 'support@dblanks.site'}`} className="flex items-center gap-3 text-xs font-mono text-zinc-300 hover:text-emerald-400 transition-colors uppercase">
                      <Mail className="w-4 h-4" /> {course.supportEmail || 'support@dblanks.site'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Footer2 />
    </main>
  );
}
