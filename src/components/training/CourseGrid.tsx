'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  category: string;
  level: string;
  price: number;
  description: string;
  students: number;
  rating: number;
  outcomes?: string[];
}

interface CourseGridProps {
  courses: Course[];
  className?: string;
}

export function CourseGrid({ courses, className = '' }: CourseGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden bg-white/[0.02] border border-white/10 hover:border-neon-purple/50 hover:bg-white/[0.04] transition-all duration-300 flex flex-col"
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative p-8 flex-grow">
            {/* Category & Level badges */}
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1.5 text-[10px] font-bold text-laser-cyan bg-laser-cyan/10 border border-laser-cyan/20 uppercase tracking-wider font-display">
                {course.category}
              </span>
              <span className="px-3 py-1.5 text-[10px] font-bold text-white/50 bg-white/5 border border-white/10 uppercase tracking-wider font-display">
                {course.level}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-black text-white mb-3 group-hover:text-laser-cyan transition-colors font-display uppercase tracking-tight leading-tight">
              {course.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-white/50 mb-6 leading-relaxed">
              {course.description}
            </p>

            {/* Outcomes */}
            {course.outcomes && (
              <div className="space-y-2 mb-8">
                <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-laser-cyan mb-3">// What you'll learn</div>
                {course.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/60">
                    <div className="w-1.5 h-1.5 bg-laser-cyan rounded-full flex-shrink-0" />
                    {outcome}
                  </div>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between text-[11px] text-white/40 font-mono uppercase tracking-wider mt-auto pt-6 border-t border-white/5">
              <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-laser-cyan" /> {course.duration}</span>
              <span className="font-black text-laser-cyan">₹{course.price.toLocaleString()}</span>
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ backgroundColor: 'rgb(176 38 255 / 0.15)' }}
            className="w-full py-4 text-xs font-bold font-display uppercase tracking-[0.15em] border-t border-white/10 text-white hover:text-laser-cyan transition-all"
          >
            Enroll Now →
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}

export default CourseGrid;
