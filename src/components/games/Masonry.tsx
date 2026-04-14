'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { GameImage } from '@/components/ui/GameImage';

interface MasonryItem {
  id: number;
  title: string;
  genre: string;
  image: string;
  featured?: boolean;
}

interface MasonryProps {
  items: MasonryItem[];
  className?: string;
}

function MasonryCard({ item, index, genreColor }: { item: MasonryItem; index: number; genreColor: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (cardRef.current) {
            observer.unobserve(cardRef.current);
          }
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`break-inside-avoid mb-4 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-neon-purple/30 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(176,38,255,0.2)] transition-all duration-300 ease-out">
        {/* Game Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <GameImage
            title={item.title}
            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
          />

          {/* Genre badge */}
          <div className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-display font-medium backdrop-blur-sm border z-10 rounded-sm uppercase tracking-wider ${genreColor}`}>
            {item.genre}
          </div>

          {/* Featured badge */}
          {item.featured && (
            <div className="absolute top-3 right-3 px-3 py-1 text-[10px] font-display font-bold text-white bg-neon-purple border border-neon-purple shadow-[0_0_10px_var(--neon-purple)] z-10 rounded-sm uppercase tracking-wider">
              FEATURED
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-4 pointer-events-none group-hover:pointer-events-auto">
            <button
              className="btn btn-laser w-full text-sm opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 group-hover:duration-500 delay-0 group-hover:delay-100"
            >
              Play Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Masonry({ items, className = '' }: MasonryProps) {
  // Sort items to create varied heights
  const sortedItems = [...items].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const getGenreColor = (genre: string) => {
    switch (genre.toLowerCase()) {
      case 'rpg': return 'bg-neon-purple/20 text-neon-purple border-neon-purple/30';
      case 'racing': return 'bg-laser-cyan/20 text-laser-cyan border-laser-cyan/30';
      case 'action': return 'bg-cyber-pink/20 text-cyber-pink border-cyber-pink/30';
      case 'strategy': return 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  return (
    <div className={`columns-1 md:columns-2 lg:columns-3 gap-4 ${className}`}>
      {sortedItems.map((item, index) => (
        <MasonryCard key={item.id} item={item} index={index} genreColor={getGenreColor(item.genre)} />
      ))}
    </div>
  );
}

export default Masonry;
