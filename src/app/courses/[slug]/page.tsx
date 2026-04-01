'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';

interface Course {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  schedule: string;
  price: number;
  originalPrice?: number;
  category: string;
  tags?: string[];
  thumbnailUrl?: string;
  syllabusUrl?: string;
  totalSeats: number;
  enrolledCount: number;
  meetLink?: string;
  instructorName?: string;
}

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dblanks.in';

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses/${resolvedParams.slug}`);
        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          setCourse(data.course);
        }
      } catch (err) {
        setError('Failed to load course');
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="flex items-center gap-3 text-gray-500">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading course details...
          </div>
        </div>
      </main>
    );
  }

  if (error || !course) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-32 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">{error || 'Course not found'}</h2>
          <Link href="/courses" className="mt-4 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/10 transition-all">
            Browse Courses
          </Link>
        </div>
      </main>
    );
  }

  const seatsLeft = course.totalSeats - course.enrolledCount;
  const seatsPercentage = (course.enrolledCount / course.totalSeats) * 100;

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription,
    provider: {
      '@type': 'Organization',
      name: 'D-Blanks',
      url: baseUrl,
    },
    offers: {
      '@type': 'Offer',
      price: course.price,
      priceCurrency: 'INR',
      availability: seatsLeft > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/SoldOut',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: course.duration,
    },
  };

  return (
    <main className="min-h-screen bg-black">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema),
        }}
      />
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/courses" className="hover:text-laser-cyan transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-gray-400">{course.category}</span>
            <span>/</span>
            <span className="text-white">{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Image */}
              <div className="relative h-64 md:h-80 bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden mb-8 group">
                {course.thumbnailUrl ? (
                  <Image src={course.thumbnailUrl} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    {course.category === 'IT & Software' && (
                      <svg className="w-20 h-20 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    {course.category === 'Electronics' && (
                      <svg className="w-20 h-20 text-laser-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    {course.category === 'Mechanical' && (
                      <svg className="w-20 h-20 text-cyber-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    {course.category === 'Civil' && (
                      <svg className="w-20 h-20 text-laser-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    )}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="px-3 py-1.5 text-xs font-semibold bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded-full backdrop-blur-sm">
                    {course.category}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
                {course.title}
              </h1>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                {course.fullDescription}
              </p>

              {/* Tags */}
              {course.tags && course.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {course.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 text-xs font-mono uppercase tracking-wide text-laser-cyan/70 bg-laser-cyan/5 border border-laser-cyan/10 rounded-lg hover:border-laser-cyan/20 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Course Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 hover:border-neon-purple/20 transition-colors backdrop-blur-sm">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Duration</div>
                  <div className="font-semibold text-white">{course.duration}</div>
                </div>
                <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 hover:border-neon-purple/20 transition-colors backdrop-blur-sm">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Schedule</div>
                  <div className="font-semibold text-white">{course.schedule}</div>
                </div>
                <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 hover:border-neon-purple/20 transition-colors backdrop-blur-sm">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Seats</div>
                  <div className="font-semibold text-white">{course.totalSeats}</div>
                </div>
                <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 hover:border-neon-purple/20 transition-colors backdrop-blur-sm">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Instructor</div>
                  <div className="font-semibold text-white">{course.instructorName || 'TBA'}</div>
                </div>
              </div>

              {/* Seats Progress */}
              <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 hover:border-neon-purple/20 transition-colors backdrop-blur-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-400 font-display">Seat Availability</span>
                  <span className={`font-mono text-sm ${
                    seatsPercentage >= 90 ? 'text-cyber-pink' :
                    seatsPercentage >= 60 ? 'text-neon-yellow' : 'text-laser-cyan'
                  }`}>
                    {seatsLeft} seats left
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      seatsPercentage >= 90 ? 'bg-cyber-pink shadow-[0_0_10px_var(--cyber-pink)]' :
                      seatsPercentage >= 60 ? 'bg-neon-yellow shadow-[0_0_10px_var(--neon-yellow)]' : 'bg-laser-cyan shadow-[0_0_10px_var(--laser-cyan)]'
                    }`}
                    style={{ width: `${Math.min(seatsPercentage, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {course.enrolledCount} enrolled out of {course.totalSeats}
                </div>
              </div>
            </div>

            {/* Sidebar - Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-neon-purple/20 transition-colors backdrop-blur-sm">
                <div className="p-6 border-b border-white/10">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-2">Course Fee</div>
                  <div className="flex items-baseline gap-2">
                    {course.originalPrice && (
                      <span className="text-lg text-gray-500 font-mono line-through">
                        ₹{course.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-4xl font-mono font-medium text-white">
                      ₹{course.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <Link
                    href={`/enroll/${course._id}`}
                    className="btn btn-laser w-full"
                  >
                    Enroll Now
                  </Link>

                  <p className="text-xs text-gray-500 text-center">
                    Secure payment via PhonePe
                  </p>
                </div>

                <div className="p-6 border-t border-white/10">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration</span>
                      <span className="text-white">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Schedule</span>
                      <span className="text-white">{course.schedule}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category</span>
                      <span className="text-white">{course.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
