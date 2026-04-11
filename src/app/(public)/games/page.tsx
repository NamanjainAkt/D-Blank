'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import Footer2 from "@/components/Footer2";
import { 
  Gamepad2, 
  Filter,
  Monitor,
  Smartphone,
  Layout,
  ArrowRight,
  Loader2,
  Play,
  Download,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ParticleField } from '@/components/ui/ParticleField';
import { GlowButton } from '@/components/ui/GlowButton';
import { MorphingBlobs } from '@/components/ui/MorphingBlobs';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import AnimatedContent from '@/components/AnimatedContent';
import { GameCard } from '@/components/GameCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const genres = ['All', 'RPG', 'Racing', 'Strategy', 'Action', 'Roguelike', 'Battle Royale', 'Simulation', 'Sports', 'Adventure', 'Horror', 'Indie'];
const platforms = ['All', 'PC', 'Console', 'Mobile'];

export default function GamesPage() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [showHeroTrailer, setShowHeroTrailer] = useState(false);

  const fetchGames = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedGenre !== 'All') params.set('genre', selectedGenre);
      if (selectedPlatform !== 'All') params.set('platform', selectedPlatform);
      
      const res = await fetch(`/api/games?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setGames(data.games || []);
    } catch (err) {
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedGenre, selectedPlatform]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const featuredGame = games.find(g => g.isFeatured) || games[0];

  const getYoutubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const id = (match && match[2].length === 11) ? match[2] : null;
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
  };

  const heroEmbedUrl = featuredGame ? getYoutubeEmbedUrl(featuredGame.trailerUrl) : null;

  return (
    <main className="min-h-screen bg-black text-white relative isolate selection:bg-primary/30">
      <MagneticCursor />
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <MorphingBlobs 
          colors={['rgba(176, 38, 255, 0.1)', 'rgba(56, 189, 248, 0.08)']} 
          className="opacity-40"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(176,38,255,0.05),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-10" />
      </div>

      {/* ===== FEATURED HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden">
        {featuredGame ? (
          <>
            <div className="absolute inset-0 z-0">
              <img 
                src={featuredGame.thumbnailUrl} 
                alt={featuredGame.title} 
                className="w-full h-full object-cover opacity-40 scale-105 animate-[pulseGlow_6s_ease-in-out_infinite_alternate]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            </div>

            <ParticleField 
              particleCount={30} 
              color="rgba(124, 58, 237, 0.4)" 
              className="z-0" 
            />
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
              <AnimatedContent>
                <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium border-primary/50 bg-primary/20 text-primary uppercase tracking-widest">
                  <Star className="w-4 h-4 mr-2" />
                  Featured Transmission
                </Badge>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 uppercase italic leading-none">
                  <span className="bg-gradient-to-br from-white via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    {featuredGame.title}
                  </span>
                </h1>
                
                <p className="text-zinc-300 text-lg max-w-2xl font-mono text-[13px] uppercase tracking-widest leading-relaxed mb-10 border-l-2 border-primary pl-4">
                  {featuredGame.shortDescription}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {heroEmbedUrl && (
                    <Button 
                      onClick={() => setShowHeroTrailer(true)}
                      className="bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest h-14 px-8 w-full sm:w-auto shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all hover:scale-105"
                    >
                      <Play className="w-5 h-5 mr-3 fill-current" /> Watch Trailer
                    </Button>
                  )}
                  {featuredGame.downloadLink && (
                    <Button 
                      asChild
                      variant="outline"
                      className="border-primary/50 bg-primary/10 hover:bg-primary/20 text-primary font-black uppercase tracking-widest h-14 px-8 w-full sm:w-auto transition-all hover:scale-105"
                    >
                      <a href={featuredGame.downloadLink} target="_blank" rel="noopener noreferrer">
                        <Download className="w-5 h-5 mr-3" /> Initialize Uplink
                      </a>
                    </Button>
                  )}
                </div>
              </AnimatedContent>
            </div>
          </>
        ) : (
          <div className="relative z-10 w-full flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        )}
      </section>

      {/* ===== ALL GAMES ===== */}
      <section className="pb-24 bg-zinc-950 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col gap-6 mb-12">
            <AnimatedContent delay={0.1} className="w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 gap-4">
                
                {/* Classification (Genres) */}
                <div className="flex items-center gap-4 flex-wrap flex-1 border-b md:border-b-0 md:border-r border-zinc-800 pb-4 md:pb-0 md:pr-4">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500 min-w-[120px]">
                    <Filter className="w-3 h-3 text-primary" /> Classification
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <button
                        key={genre}
                        onClick={() => setSelectedGenre(genre)}
                        className={`px-4 py-1.5 rounded-sm text-[10px] font-mono uppercase tracking-widest transition-all ${
                          selectedGenre === genre 
                            ? "bg-primary text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]" 
                            : "bg-black/50 text-zinc-400 hover:bg-primary/20 hover:text-primary"
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Uplink Hub (Platforms) */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    <Monitor className="w-3 h-3 text-accent" /> Uplink Hub
                  </div>
                  <div className="flex gap-2">
                    {platforms.map((platform) => (
                      <button
                        key={platform}
                        onClick={() => setSelectedPlatform(platform)}
                        className={`px-4 py-1.5 rounded-sm text-[10px] font-mono uppercase tracking-widest transition-all ${
                          selectedPlatform === platform 
                            ? "bg-accent/20 border border-accent/50 text-accent shadow-[0_0_15px_rgba(192,38,211,0.3)]" 
                            : "bg-black/50 border border-transparent text-zinc-400 hover:border-accent/30 hover:text-zinc-300"
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </AnimatedContent>
          </div>

          {/* Games Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">Decrypting Archive...</span>
            </div>
          ) : games.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {games.map((game, index) => (
                <AnimatedContent key={game._id} delay={index * 0.05}>
                  <GameCard game={game} />
                </AnimatedContent>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
              <Gamepad2 className="w-16 h-16 mx-auto mb-4 text-zinc-800" />
              <p className="text-zinc-500 font-mono text-[11px] uppercase tracking-widest">No transmissions found matching filters.</p>
              <Button 
                variant="link" 
                onClick={() => { setSelectedGenre('All'); setSelectedPlatform('All'); }}
                className="text-primary mt-2 font-mono text-[10px] uppercase"
              >
                Reset Grid Protocol
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent>
            <div className="relative rounded-3xl border border-primary/20 bg-zinc-900/40 overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.15)] group">
              <ParticleField 
                particleCount={20} 
                color="rgba(192, 38, 211, 0.4)" 
                className="z-0 mix-blend-screen opacity-50 group-hover:opacity-100 transition-opacity duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(217,70,239,0.15)_0%,transparent_70%)] rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
              
              <div className="relative z-10 px-6 py-20 md:py-24 text-center flex flex-col items-center">
                <Badge variant="outline" className="mb-6 px-4 py-1.5 text-xs font-mono border-accent/50 bg-accent/10 text-accent uppercase tracking-widest shadow-[0_0_15px_rgba(192,38,211,0.2)]">
                  <Layout className="w-3.5 h-3.5 mr-2 inline-block" />
                  Creator Core
                </Badge>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tighter italic">
                  <span className="bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
                    Initialize A New Grid
                  </span>
                </h2>
                
                <p className="text-zinc-400 mb-10 max-w-2xl mx-auto font-mono text-[13px] leading-relaxed uppercase tracking-widest border-x border-primary/30 px-8">
                  Stop playing. Start forging. Learn elite game development from industry operators and begin transmitting your own worlds to the archive.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                  <Link href="/courses">
                    <GlowButton 
                      variant="primary"
                      className="min-w-[240px] h-14 bg-accent hover:bg-accent/90 border-accent/50 text-white shadow-[0_0_30px_rgba(192,38,211,0.5)] transition-all hover:scale-105"
                    >
                      <Gamepad2 className="w-4 h-4 mr-2" /> Start Training Module
                    </GlowButton>
                  </Link>
                  <Link href="/contact">
                    <Button 
                      variant="outline"
                      className="min-w-[240px] h-14 border-primary/30 bg-primary/5 hover:bg-primary/20 text-primary uppercase font-black tracking-widest hover:scale-105 transition-all"
                    >
                      Initialize Contact
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Hero Trailer Modal */}
      {featuredGame && heroEmbedUrl && (
        <Dialog open={showHeroTrailer} onOpenChange={setShowHeroTrailer}>
          <DialogContent className="max-w-4xl p-0 bg-black border-white/10 overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.3)]">
            <DialogHeader className="sr-only">
              <DialogTitle>{featuredGame.title} Trailer</DialogTitle>
            </DialogHeader>
            <div className="aspect-video w-full">
              <iframe
                src={heroEmbedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
      <Footer2 />
    </main>
  );
}
