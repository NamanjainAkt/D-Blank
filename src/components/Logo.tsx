'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: { icon: 'w-8 h-8', text: 'text-sm', sub: 'text-[8px]' },
    md: { icon: 'w-14 h-14', text: 'text-2xl', sub: 'text-[8px]' },
    lg: { icon: 'w-16 h-16', text: 'text-3xl', sub: 'text-[10px]' },
    xl: { icon: 'w-40 h-40', text: 'text-4xl', sub: 'text-xs tracking-[0.4em]' },
  };

  const sizes = sizeClasses[size];

  return (
    <Link href="/" className={cn('group flex items-center gap-4 shrink-0', className)}>
      {/* Logo Icon - Favicon Image */}
      <div className={cn('relative shrink-0', sizes.icon)}>
        {/* Outer glow */}
        <div className="absolute -inset-1.5 bg-gradient-to-br from-primary/50 via-transparent to-cyan-400/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Main container */}
        <div className="relative w-full h-full border border-zinc-700/80 bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 overflow-hidden">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-primary/60" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-400/60" />
          
          {/* Favicon Image */}
          <Image
            src="/favicon.jpeg"
            alt="D-Blanks"
            fill
            sizes="40px"
            className="object-cover p-0.5"
            priority
          />
        </div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col justify-center">
        <span className={cn(
          'font-display font-bold tracking-[0.2em] leading-tight',
          sizes.text,
          'text-zinc-100'
        )}>
          D<span className="text-primary group-hover:text-primary transition-colors duration-200">-</span>BLANKS
        </span>
        <span className={cn('text-zinc-500 font-display uppercase mt-0.5', sizes.sub || 'text-[8px] tracking-[0.3em]')}>
          Gaming Studio
        </span>
      </div>
    </Link>
  );
}
