'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Edit, Trash2, Gamepad2, AlertCircle, Loader2, Star, Monitor, Smartphone, Layout } from 'lucide-react';
import GameForm from '@/components/admin/games/GameForm';
import { cn } from '@/lib/utils';
import type { GameFormData } from '@/lib/validations';

export default function AdminGamesPage() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const fetchGames = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/games');
      if (!res.ok) throw new Error('Failed to fetch games');
      const data = await res.json();
      setGames(data.games || []);
    } catch (err) {
      console.error('Error fetching games:', err);
      setError('Failed to load games uplink.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const handleSubmit = async (data: GameFormData) => {
    setSaving(true);
    try {
      const url = editingGame ? `/api/admin/games/${editingGame._id}` : '/api/admin/games';
      const method = editingGame ? 'PATCH' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save game');
      }

      setIsModalOpen(false);
      setEditingGame(null);
      fetchGames();
    } catch (err) {
      console.error('Error saving game:', err);
      alert(err instanceof Error ? err.message : 'Error saving game');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (game: any) => {
    setEditingGame(game);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this title? This action cannot be undone.')) return;
    
    try {
      const res = await fetch(`/api/admin/games/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete title');
      fetchGames();
    } catch (err) {
      console.error('Error deleting game:', err);
      alert('Failed to delete title');
    }
  };

  return (
    <div className="space-y-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-4xl font-display font-black text-white tracking-tighter uppercase">
            Game <span className="text-acid-green shadow-acid-green">Archive</span>
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-acid-green shadow-[0_0_8px_#39FF14]" />
            Uplink Status: {games.length} Titles Active
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={(open) => {
          if (!open) setEditingGame(null);
          setIsModalOpen(open);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-acid-green text-black hover:bg-acid-green/90 text-[10px] font-mono font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(57,255,20,0.2)]">
              <Plus className="w-4 h-4 mr-2" />
              Initialize Title
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-ink border-white/5 max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <DialogHeader className="border-b border-white/5 pb-4 mb-6">
              <DialogTitle className="text-xl font-display font-black text-white uppercase tracking-tighter">
                {editingGame ? 'Edit Title Deployment' : 'New Title Initialization'}
              </DialogTitle>
              <DialogDescription className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-2">
                System Protocol // Game Definition Parameters
              </DialogDescription>
            </DialogHeader>
            <GameForm 
              initialData={editingGame} 
              onSubmit={handleSubmit} 
              loading={saving} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Content */}
      <Card className="bg-ink/40 border-white/5 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-acid-green/50 to-transparent" />
        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4 px-6">Project</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Classification</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Uplinks</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Rating</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Status</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4 text-right px-6">Configure</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-acid-green" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">Scanning Archives...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : games.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-6 h-6 text-zinc-700" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">No Titles Detected in Uplink</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  games.map((game) => (
                    <TableRow key={game._id} className="border-white/5 hover:bg-white/[0.02] transition-colors group/row">
                      <TableCell className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                            <img src={game.thumbnailUrl} alt="" className="w-full h-full object-cover grayscale group-hover/row:grayscale-0 transition-all duration-500" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-zinc-200 group-hover/row:text-white transition-colors">
                              {game.title}
                              {game.isFeatured && <Badge className="ml-2 bg-amber-500/10 text-amber-500 border-amber-500/20 text-[8px] h-4">HOT</Badge>}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-tight mt-0.5">/{game.slug}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-sm border border-white/5">
                          {game.genre}
                        </span>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex gap-2">
                          {game.platforms.map((p: string) => (
                            <div key={p} className="p-1.5 bg-white/5 rounded border border-white/5 text-zinc-500" title={p}>
                              {p === 'PC' && <Monitor className="w-3.5 h-3.5" />}
                              {p === 'Mobile' && <Smartphone className="w-3.5 h-3.5" />}
                              {(p === 'Console' || p === 'Switch') && <Gamepad2 className="w-3.5 h-3.5" />}
                              {p !== 'PC' && p !== 'Mobile' && p !== 'Console' && p !== 'Switch' && <Layout className="w-3.5 h-3.5" />}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex items-center gap-1.5">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span className="text-[11px] font-mono font-bold text-zinc-300">{game.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <Badge 
                          variant="outline"
                          className={cn(
                            "text-[9px] font-mono uppercase tracking-widest border px-2 py-0.5",
                            game.isPublished ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                          )}
                        >
                          {game.isPublished ? 'Live' : 'Hidden'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right py-5 px-6">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 w-8 p-0 border-white/5 bg-white/5 hover:border-acid-green/50 text-acid-green"
                            onClick={() => handleEdit(game)}
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 w-8 p-0 border-white/5 bg-white/5 hover:border-red-500/50 text-red-500"
                            onClick={() => handleDelete(game._id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
