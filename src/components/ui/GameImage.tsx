'use client';

import { useMemo } from 'react';

interface GameImageProps {
  title: string;
  className?: string;
  width?: number;
  height?: number;
}

export function GameImage({ title, className = '', width = 400, height = 300 }: GameImageProps) {
  const colors = useMemo(() => {
    const colorSchemes = [
      { bg: 'from-teal-900 to-emerald-900', text: 'text-emerald-300' },
      { bg: 'from-emerald-900 to-teal-900', text: 'text-teal-300' },
      { bg: 'from-green-900 to-teal-900', text: 'text-emerald-300' },
      { bg: 'from-teal-900 to-green-900', text: 'text-teal-300' },
      { bg: 'from-gray-900 to-slate-900', text: 'text-gray-300' },
    ];

    // Simple hash to get consistent color for same title
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colorSchemes[hash % colorSchemes.length];
  }, [title]);

  const initials = useMemo(() => {
    return title
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  }, [title]);

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${colors.bg} ${className}`}
      style={{ width, height }}
    >
      {/* Game-like pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent,rgba(255,255,255,0.05),transparent)]" />
      </div>

      {/* Game icon or initials */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`text-6xl font-black ${colors.text} opacity-80 drop-shadow-lg`}>
          {initials}
        </div>
      </div>

      {/* Corner gamepad icon */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.58 16.09l-1.09-1.09c.35-.35.57-.82.57-1.37 0-.55-.22-1.02-.57-1.37l1.09-1.09c.65.65.65 1.71 0 2.36zM14 11h-1V9c0-.55-.45-1-1-1s-1 .45-1 1v2h-1c-.55 0-1 .45-1 1s.45 1 1 1h1v2c0 .55.45 1 1 1s1-.45 1-1v-2h1c.55 0 1-.45 1-1s-.45-1-1-1zM7.05 16.95l-1.09 1.09c-.65-.65-.65-1.71 0-2.36l1.09 1.09c.35.35.57.82.57 1.37 0 .55-.22 1.02-.57 1.37zM4 12c0-.55.22-1.02.57-1.37l1.09 1.09c-.65.65-.65 1.71 0 2.36l-1.09 1.09C4.22 13.02 4 12.55 4 12z"/>
        </svg>
      </div>

      {/* Bottom title overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-white font-bold text-lg truncate">{title}</h3>
      </div>
    </div>
  );
}