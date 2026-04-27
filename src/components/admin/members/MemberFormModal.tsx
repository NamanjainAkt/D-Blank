'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
import { Loader2 } from 'lucide-react';

interface MemberFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSuccess: () => void;
}

export function MemberFormModal({ isOpen, onClose, initialData, onSuccess }: MemberFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      designation: '',
      bio: '',
      skills: '',
      image: '',
      handle: '',
      type: 'team',
      status: 'active',
      socials: { twitter: '', linkedin: '', github: '' },
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        skills: initialData.skills?.join(', ') || '',
      });
    } else {
      reset({
        name: '', designation: '', bio: '', skills: '', image: '', handle: '', type: 'team', status: 'active', socials: { twitter: '', linkedin: '', github: '' }
      });
    }
  }, [initialData, reset, isOpen]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...data,
        skills: data.skills.split(',').map((s: string) => s.trim()).filter(Boolean),
      };

      const url = initialData ? `/api/admin/members/${initialData._id}` : '/api/admin/members';
      const res = await fetch(url, {
        method: initialData ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Operation failed');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Submit error:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-ink border-white/5 max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-black text-white uppercase tracking-tighter">
            {initialData ? 'Edit Crew Member' : 'Recruit Crew Member'}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono uppercase tracking-widest rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Name *</Label>
              <Input {...register('name', { required: true })} className="bg-black/40 border-white/5 focus:border-laser-cyan/50 text-sm font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Handle *</Label>
              <Input {...register('handle', { required: true })} className="bg-black/40 border-white/5 focus:border-laser-cyan/50 text-sm font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Designation *</Label>
              <Input {...register('designation', { required: true })} className="bg-black/40 border-white/5 focus:border-laser-cyan/50 text-sm font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Image URL</Label>
              <Input {...register('image')} className="bg-black/40 border-white/5 focus:border-laser-cyan/50 text-sm font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Type *</Label>
              <Select value={watch('type')} onValueChange={(v) => setValue('type', v)}>
                <SelectTrigger className="bg-black/40 border-white/5 focus:border-laser-cyan/50 text-sm font-mono h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="founder" className="text-[10px] font-mono uppercase tracking-widest">Founder</SelectItem>
                  <SelectItem value="team" className="text-[10px] font-mono uppercase tracking-widest">Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Status *</Label>
              <Select value={watch('status')} onValueChange={(v) => setValue('status', v)}>
                <SelectTrigger className="bg-black/40 border-white/5 focus:border-laser-cyan/50 text-sm font-mono h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active" className="text-[10px] font-mono uppercase tracking-widest">Active</SelectItem>
                  <SelectItem value="inactive" className="text-[10px] font-mono uppercase tracking-widest">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Skills (comma-separated)</Label>
            <Input {...register('skills')} className="bg-black/40 border-white/5 focus:border-laser-cyan/50 text-sm font-mono" />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Bio *</Label>
            <Textarea {...register('bio', { required: true })} rows={3} className="bg-black/40 border-white/5 focus:border-laser-cyan/50 text-sm font-mono resize-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Twitter URL</Label>
              <Input {...register('socials.twitter')} className="bg-black/40 border-white/5 focus:border-laser-cyan/50 text-sm font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">LinkedIn URL</Label>
              <Input {...register('socials.linkedin')} className="bg-black/40 border-white/5 focus:border-laser-cyan/50 text-sm font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">GitHub URL</Label>
              <Input {...register('socials.github')} className="bg-black/40 border-white/5 focus:border-laser-cyan/50 text-sm font-mono" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
            <Button type="button" variant="ghost" onClick={onClose} className="text-[10px] font-mono uppercase tracking-widest hover:bg-white/5 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-laser-cyan text-black hover:bg-laser-cyan/90 text-[10px] font-mono font-bold uppercase tracking-widest px-8">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {initialData ? 'Update Crew' : 'Recruit Crew'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}