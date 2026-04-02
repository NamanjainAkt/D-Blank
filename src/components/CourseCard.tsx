'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Code, Zap, Settings, Building2 } from 'lucide-react';
import { Course } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const seatsLeft = course.totalSeats - course.enrolledCount;
  const seatsPercentage = (course.enrolledCount / course.totalSeats) * 100;
  
  const getSeatsColor = () => {
    if (seatsPercentage >= 90) return 'var(--red)';
    if (seatsPercentage >= 60) return 'var(--amber)';
    return 'var(--emerald)';
  };

  const getBarColor = () => {
    if (seatsPercentage >= 90) return 'var(--red)';
    if (seatsPercentage >= 60) return 'var(--amber)';
    return 'var(--emerald)';
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'IT & Software': return 'bg-[var(--emerald-dim)] text-[var(--emerald)] border-[var(--emerald-dim)]';
      case 'Electronics': return 'bg-[var(--blue-dim)] text-[var(--blue)] border-[var(--blue-dim)]';
      case 'Mechanical': return 'bg-[var(--glass-light)] text-[var(--text-secondary)] border-[var(--border)]';
      case 'Civil': return 'bg-[var(--amber-dim)] text-[var(--amber)] border-[var(--amber-dim)]';
      default: return 'bg-[var(--glass-light)] text-[var(--text-secondary)] border-[var(--border)]';
    }
  };

  return (
    <Link href={`/courses/${course.slug}`} className="block group">
      <div className="card card-hover card-glow p-0 overflow-hidden transition-all duration-300">
        {/* Canvas/Image Area */}
        <div className="relative aspect-video bg-[var(--bg-tertiary)] overflow-hidden">
          {course.thumbnailUrl ? (
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              {course.category === 'IT & Software' && (
                <Code className="w-16 h-16 text-white/20" />
              )}
              {course.category === 'Electronics' && (
                <Zap className="w-16 h-16 text-white/20" />
              )}
              {course.category === 'Mechanical' && (
                <Settings className="w-16 h-16 text-white/20" />
              )}
              {course.category === 'Civil' && (
                <Building2 className="w-16 h-16 text-white/20" />
              )}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-60" />
          
          {/* Category Badge - Better positioning */}
          <span className={`absolute top-4 left-4 px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase rounded-lg border backdrop-blur-sm ${getCategoryColor(course.category)}`}>
            {course.category}
          </span>

          {/* Seats Badge - Top right */}
          {seatsLeft <= 20 && (
            <span className="absolute top-4 right-4 px-3 py-1.5 text-[10px] font-mono font-bold uppercase rounded-lg backdrop-blur-sm"
              style={{ 
                backgroundColor: seatsPercentage >= 90 ? 'var(--red-dim)' : 'var(--amber-dim)',
                color: seatsPercentage >= 90 ? 'var(--red)' : 'var(--amber)',
                border: `1px solid ${seatsPercentage >= 90 ? 'var(--red-dim)' : 'var(--amber-dim)'}`
              }}>
              {seatsLeft} seats left
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Tags */}
          {course.tags && course.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {course.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-wide text-[var(--text-muted)] bg-[var(--glass-light)] border border-[var(--border)] rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title - Better styling */}
          <h3 className="text-lg font-bold leading-tight mb-4 text-[var(--text-primary)] group-hover:text-[var(--emerald)] transition-colors duration-200">
            {course.title}
          </h3>

          {/* Stats - Enhanced */}
          <div className="flex items-center gap-4 mb-5 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {course.duration}
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
            <span>{course.schedule}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
            <span className="text-[var(--emerald)]">{course.enrolledCount} enrolled</span>
          </div>

          {/* Seats Progress */}
          <div className="mb-5">
            <div className="flex justify-between text-[10px] mb-2">
              <span className="text-[var(--text-muted)] font-mono uppercase tracking-wider">Seat availability</span>
              <span className="font-mono font-semibold" style={{ color: getSeatsColor() }}>
                {seatsLeft} left
              </span>
            </div>
            <div className="h-1 bg-[var(--glass-light)] rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(seatsPercentage, 100)}%`, backgroundColor: getBarColor() }}
              />
            </div>
          </div>

          {/* Footer - Enhanced pricing */}
          <div className="flex items-center justify-between pt-5 border-t border-[var(--border)]">
            <div>
              {course.originalPrice && (
                <div className="text-xs text-[var(--text-muted)] font-mono line-through mb-0.5">
                  ₹{course.originalPrice.toLocaleString()}
                </div>
              )}
              <div className="text-2xl font-mono font-bold text-[var(--text-primary)]">
                ₹{course.price.toLocaleString()}
                <span className="text-xs font-normal text-[var(--text-muted)] ml-1">/course</span>
              </div>
            </div>
            <button className="btn-card cursor-pointer">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
