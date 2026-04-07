'use client';

import * as React from 'react';
import Link from 'next/link';
import { Star, Gamepad2, Play, Download, Monitor, Smartphone, Layout } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HoverScale } from '@/components/ui/HoverScale';
import GlareHover from '@/components/GlareHover';
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
      <HoverScale scale={1.03} className="h-full">
        <GlareHover
          background="linear-gradient(135deg, rgba(88, 28, 135, 0.3) 0%, rgba(30, 10, 60, 0.5) 100%)"
          borderColor="rgba(139, 92, 246, 0.2)"
          glareColor="#8b5cf6"
          className="w-full h-full !rounded-xl border border-white/5 overflow-hidden group"
        >
          <div className="flex flex-col h-full">
            {/* Media Area */}
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={game.thumbnailUrl} 
                alt={game.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <Badge className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-mono border-white/10 uppercase tracking-widest">
                  {game.genre}
                </Badge>
              </div>

              {embedUrl && (
                <button 
                  onClick={() => setShowTrailer(true)}
                  className="absolute inset-0 flex items-center justify-center group/btn"
                >
                  <div className="w-12 h-12 rounded-full bg-violet-600/80 backdrop-blur-sm flex items-center justify-center text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                    <Play className="w-5 h-5 fill-current ml-1" />
                  </div>
                </button>
              )}
            </div>

            {/* Content Area */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors uppercase tracking-tight">{game.title}</h3>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-xs font-bold font-mono">{game.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-zinc-400 mb-6 line-clamp-2 leading-relaxed">
                {game.shortDescription}
              </p>

              <div className="mt-auto space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {game.platforms.map(p => (
                      <div key={p} className="text-zinc-500" title={p}>
                        {p === 'PC' && <Monitor className="w-3.5 h-3.5" />}
                        {p === 'Mobile' && <Smartphone className="w-3.5 h-3.5" />}
                        {(p === 'Console' || p === 'Switch') && <Gamepad2 className="w-3.5 h-3.5" />}
                        {p !== 'PC' && p !== 'Mobile' && p !== 'Console' && p !== 'Switch' && <Layout className="w-3.5 h-3.5" />}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{game.releaseDate}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {embedUrl && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowTrailer(true)}
                      className="border-white/10 bg-white/5 hover:bg-white/10 text-[10px] font-mono uppercase tracking-widest h-9"
                    >
                      Trailer
                    </Button>
                  )}
                  {game.downloadLink ? (
                    <Button 
                      asChild
                      className={cn(
                        "bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-mono uppercase tracking-widest h-9",
                        !embedUrl && "col-span-2"
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
                        "bg-white/5 text-zinc-500 border-white/5 text-[10px] font-mono uppercase tracking-widest h-9",
                        !embedUrl && "col-span-2"
                      )}
                    >
                      Incoming
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </GlareHover>
      </HoverScale>

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
