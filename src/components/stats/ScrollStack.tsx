'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  company: string;
}

interface ScrollStackProps {
  testimonials: Testimonial[];
  className?: string;
}

export function ScrollStack({ testimonials, className = '' }: ScrollStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [testimonials.length]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -50, rotateX: 15 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="h-full p-10 rounded-none bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-laser-cyan/10 to-transparent border-b border-l border-laser-cyan/20" />
              
              {/* Quote icon */}
              <div className="text-laser-cyan/20 text-7xl font-display mb-4">"</div>

              {/* Content */}
              <p className="text-lg text-white/80 leading-relaxed mb-8 font-body">
                {testimonials[currentIndex].content}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-none bg-gradient-to-br from-neon-purple/40 to-laser-cyan/40 flex items-center justify-center text-xl font-black text-white font-display border border-white/20 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div>
                  <div className="font-display font-black text-white uppercase tracking-tight group-hover:text-laser-cyan transition-colors">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-laser-cyan/70 mt-1">
                    {testimonials[currentIndex].role} // {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-3 mt-10">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 transition-all duration-300 rounded-none ${
              index === currentIndex
                ? 'w-10 bg-laser-cyan shadow-[0_0_10px_var(--laser-cyan)]'
                : 'w-4 bg-white/10 hover:bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ScrollStack;
