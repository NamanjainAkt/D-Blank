'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Gamepad2, Play, Download, Monitor, Smartphone, Layout } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Game {
  _id: string;
  title: string;
  slug: string;
  genre: string;
  shortDescription: string;
  thumbnailUrl: string;
  trailerUrl?: string;
  platforms: string[];
  rating: number;
  releaseDate: string;
  downloadLink?: string;
}

export function GameCard({ game }: { game: Game }) {
  const [showTrailer, setShowTrailer] = React.useState(false);

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const id = (match && match[2].length === 11) ? match[2] : null;
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
  };

  const embedUrl = game.trailerUrl ? getYoutubeEmbedUrl(game.trailerUrl) : null;

  return (
    <>
      <div className="group relative h-full">
        {/* Glow effect background */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative h-full flex flex-col bg-black border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:translate-y-[-2px]">
          
          {/* Media Area - Full Width Image */}
          <div className="relative aspect-[16/10] overflow-hidden w-full">
            <Image 
              src={game.thumbnailUrl} 
              alt={game.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
            
            {/* Genre Badge - Floating */}
            <div className="absolute top-4 left-4 z-20">
              <div className="px-2 py-0.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-bold text-white uppercase tracking-wider">
                {game.genre}
              </div>
            </div>

            {/* Play Button Overlay */}
            {embedUrl && (
              <button 
                onClick={() => setShowTrailer(true)}
                className="absolute inset-0 flex items-center justify-center group/btn pointer-events-auto"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-2xl">
                  <Play className="w-5 h-5 fill-current ml-1" />
                </div>
              </button>
            )}
          </div>

          {/* Content Area */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors tracking-tight leading-tight">
                {game.title}
              </h3>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-900 rounded-md border border-zinc-800 shrink-0">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-[11px] font-bold text-zinc-300">{game.rating}</span>
              </div>
            </div>
            
            <p className="text-sm text-zinc-400 mb-6 line-clamp-2 leading-relaxed font-normal">
              {game.shortDescription}
            </p>

            <div className="mt-auto pt-4 border-t border-white/[0.05]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-3">
                  {game.platforms.map(p => (
                    <div key={p} className="text-zinc-500 hover:text-zinc-300 transition-colors" title={p}>
                      {p === 'PC' && <Monitor className="w-4 h-4" />}
                      {p === 'Mobile' && <Smartphone className="w-4 h-4" />}
                      {(p === 'Console' || p === 'Switch') && <Gamepad2 className="w-4 h-4" />}
                      {p !== 'PC' && p !== 'Mobile' && p !== 'Console' && p !== 'Switch' && <Layout className="w-4 h-4" />}
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-widest">{game.releaseDate}</span>
              </div>

              <div className="flex gap-2.5">
                {embedUrl && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowTrailer(true)}
                    className="flex-1 border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/10 text-white text-[11px] font-bold h-10 rounded-xl transition-all"
                  >
                    Trailer
                  </Button>
                )}
                {game.downloadLink ? (
                  <Button 
                    asChild
                    className={cn(
                      "flex-[1.5] bg-white text-black hover:bg-zinc-200 text-xs font-bold h-10 rounded-xl transition-all shadow-lg shadow-white/5",
                      !embedUrl && "w-full"
                    )}
                  >
                    <a href={game.downloadLink} target="_blank" rel="noopener noreferrer">
                      <Download className="w-3.5 h-3.5 mr-2" /> Uplink
                    </a>
                  </Button>
                ) : (
                  <Button 
                    disabled
                    className={cn(
                      "flex-[1.5] bg-white/[0.02] text-zinc-600 border border-white/[0.05] text-[11px] font-bold h-10 rounded-xl",
                      !embedUrl && "w-full"
                    )}
                  >
                    Incoming
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      <Dialog open={showTrailer} onOpenChange={setShowTrailer}>
        <DialogContent className="max-w-4xl p-0 bg-black border-white/10 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>{game.title} Trailer</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {embedUrl && (
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
