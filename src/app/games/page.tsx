'use client';

import Link from 'next/link';
import { 
  ChevronRight, 
  Gamepad2, 
  Star,
  ArrowRight,
  Filter,
  Zap,
  Monitor,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ParticleField } from '@/components/ui/ParticleField';
import { GlitchText } from '@/components/ui/GlitchText';
import { GlowButton } from '@/components/ui/GlowButton';
import { HoverScale } from '@/components/ui/HoverScale';
import AnimatedContent from '@/components/AnimatedContent';
import GlareHover from '@/components/GlareHover';
import { games } from '@/lib/placeholder-data';
import { useState } from 'react';

const genres = ['All', 'RPG', 'Racing', 'Strategy', 'Action', 'Roguelike', 'Battle Royale', 'Simulation', 'Sports'];
const platforms = ['All', 'PC', 'Console', 'Mobile'];

export default function GamesPage() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');

  const filteredGames = games.filter(game => {
    const genreMatch = selectedGenre === 'All' || game.genre === selectedGenre;
    const platformMatch = selectedPlatform === 'All' || game.platform.includes(selectedPlatform);
    return genreMatch && platformMatch;
  });

  const featuredGame = games.find(g => g.featured);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Particle Field Background */}
        <ParticleField 
          particleCount={40} 
          color="rgba(139, 92, 246, 0.2)" 
          className="z-0" 
        />
        
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 via-black to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[128px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium border-violet-500/50 bg-violet-500/10 text-violet-400">
              <Gamepad2 className="w-4 h-4 mr-2" />
              Gaming Library
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                <GlitchText>Our Games</GlitchText>
              </span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Explore our collection of immersive gaming experiences crafted with passion and innovation.
            </p>
          </AnimatedContent>
        </div>
      </section>

      {/* ===== FEATURED GAME ===== */}
      {featuredGame && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedContent>
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-violet-900/30 via-fuchsia-900/20 to-black border border-violet-500/20">
                <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                  <div className="flex flex-col justify-center">
                    <Badge className="w-fit mb-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white">
                      Featured Game
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{featuredGame.title}</h2>
                    <Badge variant="outline" className="w-fit mb-6 text-zinc-400 border-zinc-600">
                      {featuredGame.genre}
                    </Badge>
                    <p className="text-zinc-400 mb-8 leading-relaxed">
                      {featuredGame.description}
                    </p>
                    <div className="flex items-center gap-6 mb-8">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-400 fill-current" />
                        <span className="font-semibold">{featuredGame.rating}</span>
                      </div>
                      <div className="h-4 w-px bg-zinc-700" />
                      <span className="text-zinc-500">{featuredGame.platform}</span>
                      <div className="h-4 w-px bg-zinc-700" />
                      <span className="text-zinc-500">{featuredGame.releaseDate}</span>
                    </div>
                    <GlowButton 
                      variant="primary"
                      className="w-fit"
                    >
                      Play Now
                      <ArrowRight className="inline-block w-4 h-4 ml-2" />
                    </GlowButton>
                  </div>
                  <div className="relative aspect-video md:aspect-square rounded-xl bg-gradient-to-br from-violet-900/50 to-fuchsia-900/50 flex items-center justify-center">
                    <Gamepad2 className="w-32 h-32 text-white/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </div>
              </div>
            </AnimatedContent>
          </div>
        </section>
      )}

      {/* ===== ALL GAMES ===== */}
      <section className="pb-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">All Games</h2>
          </AnimatedContent>

          {/* Filters */}
          <AnimatedContent delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Filter className="w-4 h-4" />
                Filter:
              </div>
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGenre(genre)}
                  className={
                    selectedGenre === genre 
                      ? "bg-violet-600 hover:bg-violet-500 border-0" 
                      : "border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }
                >
                  {genre}
                </Button>
              ))}
            </div>
          </AnimatedContent>

          <AnimatedContent delay={0.2} className="mb-8">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Monitor className="w-4 h-4" />
                Platform:
              </div>
              {platforms.map((platform) => (
                <Button
                  key={platform}
                  variant={selectedPlatform === platform ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPlatform(platform)}
                  className={
                    selectedPlatform === platform 
                      ? "bg-fuchsia-600 hover:bg-fuchsia-500 border-0" 
                      : "border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }
                >
                  {platform}
                </Button>
              ))}
            </div>
          </AnimatedContent>

          {/* Games Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game, index) => (
              <AnimatedContent key={game.id} delay={index * 0.05}>
                <HoverScale scale={1.03} className="h-full">
                  <GlareHover
                    background="linear-gradient(135deg, rgba(88, 28, 135, 0.3) 0%, rgba(30, 10, 60, 0.5) 100%)"
                    borderColor="rgba(139, 92, 246, 0.2)"
                    glareColor="#8b5cf6"
                    className="w-full h-full !rounded-xl border"
                  >
                    <Card className="bg-transparent border-0 shadow-none w-full h-full flex flex-col">
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-violet-900/50 to-fuchsia-900/50 rounded-lg overflow-hidden mb-4 shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Gamepad2 className="w-12 h-12 text-white/10" />
                        </div>
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                          <Badge className="bg-black/60 backdrop-blur-sm text-white text-xs">
                            {game.genre}
                          </Badge>
                        </div>
                        {game.featured && (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-0 flex-grow">
                        <h3 className="text-lg font-bold mb-2">{game.title}</h3>
                        <p className="text-sm text-zinc-400 mb-3 line-clamp-2">{game.description}</p>
                        <div className="flex items-center justify-between text-sm mt-auto">
                          <span className="flex items-center gap-1 text-amber-400">
                            <Star className="w-4 h-4 fill-current" />
                            {game.rating}
                          </span>
                          <span className="text-zinc-500 text-xs">{game.platform}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </GlareHover>
                </HoverScale>
              </AnimatedContent>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="text-center py-16 text-zinc-500">
              <Gamepad2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No games found matching your filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 bg-black border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedContent>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Want to <span className="text-violet-400">Create</span> Games?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Learn game development from industry experts and start creating your own immersive experiences.
            </p>
            <Link href="/courses">
              <GlowButton 
                variant="primary"
                className="min-w-[200px]"
              >
                Learn Game Dev
                <ArrowRight className="inline-block w-4 h-4 ml-2" />
              </GlowButton>
            </Link>
          </AnimatedContent>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 border-t border-zinc-800 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">D<span className="text-violet-500">Blanks</span></span>
            </div>
            <p className="text-sm text-zinc-500">
              © 2026 D-Blanks. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
