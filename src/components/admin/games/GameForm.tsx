'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gameSchema, type GameFormData } from '@/lib/validations';
import { ImageUploader } from '@/components/ImageUploader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Plus, X, Gamepad2, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface GameFormProps {
  initialData?: any;
  onSubmit: (data: GameFormData) => Promise<void>;
  loading: boolean;
}

const genres = ['RPG', 'Racing', 'Strategy', 'Action', 'Roguelike', 'Battle Royale', 'Simulation', 'Sports', 'Adventure', 'Horror', 'Indie'];
const allPlatforms = ['PC', 'Console', 'Mobile', 'Switch', 'VR', 'AR'];

export default function GameForm({ initialData, onSubmit, loading }: GameFormProps) {
  const [gallery, setGallery] = useState<string[]>(initialData?.galleryUrls || []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GameFormData>({
    resolver: zodResolver(gameSchema),
    defaultValues: initialData || {
      title: '',
      slug: '',
      genre: 'Action',
      shortDescription: '',
      fullDescription: '',
      thumbnailUrl: '',
      galleryUrls: [],
      trailerUrl: '',
      platforms: ['PC'],
      downloadLink: '',
      rating: 4.5,
      releaseDate: new Date().getFullYear().toString(),
      isFeatured: false,
      isPublished: true,
    },
  });

  const watchTitle = watch('title');
  const watchThumbnail = watch('thumbnailUrl');
  const watchPlatforms = watch('platforms') || [];
  const watchTrailer = watch('trailerUrl');

  useEffect(() => {
    if (watchTitle && !initialData) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setValue('slug', slug);
    }
  }, [watchTitle, setValue, initialData]);

  const handlePlatformToggle = (platform: string) => {
    const current = watchPlatforms;
    if (current.includes(platform)) {
      setValue('platforms', current.filter(p => p !== platform));
    } else {
      setValue('platforms', [...current, platform]);
    }
  };

  const addGalleryImage = (url: string) => {
    const newGallery = [...gallery, url];
    setGallery(newGallery);
    setValue('galleryUrls', newGallery);
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = gallery.filter((_, i) => i !== index);
    setGallery(newGallery);
    setValue('galleryUrls', newGallery);
  };

  const getYoutubeEmbedId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Game Title *</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="e.g. Shadow Legends"
              className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono"
            />
            {errors.title && <p className="text-red-400 text-[10px] font-mono uppercase">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Access Key (Slug) *</Label>
            <Input
              id="slug"
              {...register('slug')}
              className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono"
            />
            {errors.slug && <p className="text-red-400 text-[10px] font-mono uppercase">{errors.slug.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Genre *</Label>
              <Select defaultValue={watch('genre')} onValueChange={(v) => setValue('genre', v)}>
                <SelectTrigger className="bg-black/40 border-white/5 text-[10px] font-mono uppercase tracking-widest h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-ink border-white/5">
                  {genres.map((g) => (
                    <SelectItem key={g} value={g} className="text-[10px] font-mono uppercase tracking-widest">{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Rating (0-5) *</Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                {...register('rating', { valueAsNumber: true })}
                className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Short Catchline *</Label>
            <Input
              id="shortDescription"
              {...register('shortDescription')}
              placeholder="Epic dark fantasy RPG..."
              className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono"
            />
            {errors.shortDescription && <p className="text-red-400 text-[10px] font-mono uppercase">{errors.shortDescription.message}</p>}
          </div>
        </div>

        {/* Media & Assets */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Main Cover (Thumbnail) *</Label>
            <ImageUploader
              value={watchThumbnail || ''}
              onChange={(url) => setValue('thumbnailUrl', url)}
              type="image"
              label="Upload Cover Image"
            />
            {errors.thumbnailUrl && <p className="text-red-400 text-[10px] font-mono uppercase">{errors.thumbnailUrl.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="trailerUrl" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Trailer Link (YouTube)</Label>
            <div className="relative">
              <Input
                id="trailerUrl"
                {...register('trailerUrl')}
                placeholder="https://youtube.com/watch?v=..."
                className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono pr-10"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Play className={cn("w-4 h-4", getYoutubeEmbedId(watchTrailer || '') ? "text-red-500" : "text-zinc-600")} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Description & Platforms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label htmlFor="fullDescription" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Detailed Transmission (Full Description)</Label>
          <Textarea
            id="fullDescription"
            {...register('fullDescription')}
            rows={6}
            className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono resize-none"
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Deployment Platforms *</Label>
            <div className="flex flex-wrap gap-2">
              {allPlatforms.map((p) => (
                <Badge
                  key={p}
                  variant="outline"
                  className={cn(
                    "cursor-pointer transition-all uppercase font-mono text-[9px] tracking-widest px-3 py-1.5",
                    watchPlatforms.includes(p) 
                      ? "bg-acid-green text-black border-acid-green shadow-[0_0_10px_rgba(57,255,20,0.2)]" 
                      : "bg-white/5 text-zinc-500 border-white/5 hover:border-white/20"
                  )}
                  onClick={() => handlePlatformToggle(p)}
                >
                  {p}
                </Badge>
              ))}
            </div>
            {errors.platforms && <p className="text-red-400 text-[10px] font-mono uppercase">{errors.platforms.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="downloadLink" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Download/Uplink URL</Label>
            <Input
              id="downloadLink"
              {...register('downloadLink')}
              placeholder="https://store.steampowered.com/..."
              className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="releaseDate" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Release Cycle (Year)</Label>
            <Input
              id="releaseDate"
              {...register('releaseDate')}
              placeholder="e.g. 2025"
              className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono"
            />
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="space-y-4">
        <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">In-Game Visual Array (Gallery)</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {gallery.map((url, i) => (
            <div key={i} className="relative group aspect-video rounded-lg overflow-hidden border border-white/5">
              <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeGalleryImage(i)}
                className="absolute top-1 right-1 bg-black/80 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          <div className="aspect-video rounded-lg border-2 border-dashed border-white/5 hover:border-acid-green/50 transition-colors flex items-center justify-center cursor-pointer overflow-hidden">
            <ImageUploader
              onChange={addGalleryImage}
              type="image"
              label=""
            />
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-6 pt-6 border-t border-white/5">
        <div className="flex items-center space-x-3 bg-black/40 p-4 border border-white/5 rounded-sm">
          <Checkbox 
            id="isFeatured" 
            checked={watch('isFeatured')}
            onCheckedChange={(checked) => setValue('isFeatured', checked as boolean)}
            className="border-white/20"
          />
          <Label htmlFor="isFeatured" className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 cursor-pointer">
            Featured Title
          </Label>
        </div>

        <div className="flex items-center space-x-3 bg-black/40 p-4 border border-white/5 rounded-sm">
          <Checkbox 
            id="isPublished" 
            checked={watch('isPublished')}
            onCheckedChange={(checked) => setValue('isPublished', checked as boolean)}
            className="border-white/20"
          />
          <Label htmlFor="isPublished" className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 cursor-pointer">
            Visible to Public Uplink
          </Label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
        <Button
          type="submit"
          disabled={loading}
          className="bg-acid-green text-black hover:bg-acid-green/90 text-[10px] font-mono font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(57,255,20,0.3)] h-11 px-8"
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" aria-hidden="true" />
              Initializing...
            </>
          ) : (
            <>
              <Gamepad2 className="w-4 h-4 mr-2" />
              {initialData ? 'Update Deployment' : 'Confirm Initialization'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
