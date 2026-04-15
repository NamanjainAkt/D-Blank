'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import Footer2 from "@/components/Footer2";
import { 
  Users, 
  ArrowRight,
  Clock,
  Loader2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ParticleField } from '@/components/ui/ParticleField';
import { GlowButton } from '@/components/ui/GlowButton';
import { MorphingBlobs } from '@/components/ui/MorphingBlobs';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import AnimatedContent from '@/components/AnimatedContent';
import { courseCategories } from '@/lib/placeholder-data';
import { formatCurrency, cn } from '@/lib/utils';

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading, courses]);

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
          colors={['rgba(168, 85, 247, 0.1)', 'rgba(217, 70, 239, 0.1)']} 
          className="opacity-40"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168, 85, 247, 0.05),transparent_70%)]" />
      </div>

      {/* Browse Courses Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedContent className="mb-12 text-center">
            <Badge variant="outline" className="mb-4 text-primary border-primary/40 bg-primary/5">Course Categories</Badge>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Browse Courses</h2>
            
            <div className="inline-flex p-1.5 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-white/5 mt-8">
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                <TabsList className="bg-transparent border-none">
                  {courseCategories.map((cat) => (
                    <TabsTrigger 
                      key={cat.id} 
                      value={cat.id}
                      className="data-[state=active]:bg-primary data-[state=active]:text-white text-[10px] font-mono uppercase tracking-[0.2em] px-6 py-2.5 rounded-xl transition-all"
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
            <div ref={observerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                  <div 
                    key={course._id}
                    className={`group relative h-full flex flex-col rounded-[2.5rem] bg-zinc-900/40 border border-white/5 hover:border-primary/40 hover:-translate-y-[10px] transition-all duration-700 ease-out overflow-hidden transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img 
                        src={course.thumbnailUrl || '/placeholder-course.jpg'} 
                        alt={course.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      />
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
                          <span className="tracking-[0.2em]">{course.duration}</span>
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
                          <GlowButton variant="primary" className="h-10 px-6 text-[10px]">
                            View Details
                          </GlowButton>
                        </Link>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-zinc-500 font-mono text-sm">No courses found in this category.</p>
              <Link href="/contact" className="text-primary hover:underline mt-4 inline-block">
                Contact us for more information
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <Footer2 />
    </main>
  );
}