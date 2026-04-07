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
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ParticleField } from '@/components/ui/ParticleField';
import { GlitchText } from '@/components/ui/GlitchText';
import { GlowButton } from '@/components/ui/GlowButton';
import AnimatedContent from '@/components/AnimatedContent';
import { GameCard } from '@/components/GameCard';

const genres = ['All', 'RPG', 'Racing', 'Strategy', 'Action', 'Roguelike', 'Battle Royale', 'Simulation', 'Sports', 'Adventure', 'Horror', 'Indie'];
const platforms = ['All', 'PC', 'Console', 'Mobile'];

export default function GamesPage() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');

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

  const featuredGame = games.find(g => g.isFeatured);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <ParticleField 
          particleCount={40} 
          color="rgba(139, 92, 246, 0.2)" 
          className="z-0" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 via-black to-black" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium border-violet-500/50 bg-violet-500/10 text-violet-400">
              <Gamepad2 className="w-4 h-4 mr-2" />
              Gaming Library
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 uppercase italic">
              <GlitchText textClassName="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                The Archive
              </GlitchText>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-mono text-[13px] uppercase tracking-widest">
              Immersive transmissions from the D-Blanks studio core.
            </p>
          </AnimatedContent>
        </div>
      </section>

      {/* ===== ALL GAMES ===== */}
      <section className="pb-24 bg-zinc-950 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col gap-6 mb-12">
            <AnimatedContent delay={0.1}>
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500 mr-2">
                  <Filter className="w-3 h-3" /> Classification:
                </div>
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all ${
                      selectedGenre === genre 
                        ? "bg-violet-600 border-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]" 
                        : "bg-white/5 border-white/5 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </AnimatedContent>

            <AnimatedContent delay={0.2}>
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500 mr-2">
                  <Monitor className="w-3 h-3" /> Uplink Hub:
                </div>
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all ${
                      selectedPlatform === platform 
                        ? "bg-fuchsia-600 border-fuchsia-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.3)]" 
                        : "bg-white/5 border-white/5 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </AnimatedContent>
          </div>

          {/* Games Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-violet-500" />
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
                className="text-violet-400 mt-2 font-mono text-[10px] uppercase"
              >
                Reset Grid Protocol
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedContent>
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter">
              Want to <span className="text-violet-400">Initialize</span> Games?
            </h2>
            <p className="text-zinc-400 mb-10 max-w-xl mx-auto font-mono text-[13px] leading-relaxed uppercase tracking-wide">
              Learn game development from lead operators and start creating your own immersive experiences.
            </p>
            <Link href="/courses">
              <GlowButton 
                variant="primary"
                className="min-w-[240px] h-12"
              >
                Start Learning
                <ArrowRight className="inline-block w-4 h-4 ml-2" />
              </GlowButton>
            </Link>
          </AnimatedContent>
        </div>
      </section>

      <Footer />
      <Footer2 />
    </main>
  );
}
