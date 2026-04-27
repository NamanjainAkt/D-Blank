'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const studentSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number is required'),
  whatsappNumber: z.string().optional(),
  collegeName: z.string().min(2, 'College name is required'),
  branch: z.string().min(2, 'Branch is required'),
  year: z.string().min(1, 'Year is required'),
  semester: z.string().min(1, 'Semester is required'),
  rollNumber: z.string().min(1, 'Roll number is required'),
  city: z.string().min(2, 'City is required'),
  referrer: z.string().optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSuccess: () => void;
}

export function StudentFormModal({ isOpen, onClose, initialData, onSuccess }: StudentFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      whatsappNumber: '',
      collegeName: '',
      branch: '',
      year: '1st',
      semester: '1st',
      rollNumber: '',
      city: '',
      referrer: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        name: '',
        email: '',
        phone: '',
        whatsappNumber: '',
        collegeName: '',
        branch: '',
        year: '1st',
        semester: '1st',
        rollNumber: '',
        city: '',
        referrer: '',
      });
    }
  }, [initialData, reset, isOpen]);

  const onSubmit = async (data: StudentFormData) => {
    setLoading(true);
    setError(null);

    try {
      const url = initialData 
        ? `/api/admin/students/${initialData._id}` 
        : '/api/admin/students';
        
      const res = await fetch(url, {
        method: initialData ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
            {initialData ? 'Edit Entity Profile' : 'Register New Entity'}
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
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Full Name *</Label>
              <Input {...register('name')} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
              {errors.name && <p className="text-red-400 text-[10px] font-mono uppercase">{errors.name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Email Address *</Label>
              <Input type="email" {...register('email')} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
              {errors.email && <p className="text-red-400 text-[10px] font-mono uppercase">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Phone Number *</Label>
              <Input {...register('phone')} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
              {errors.phone && <p className="text-red-400 text-[10px] font-mono uppercase">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">WhatsApp Number</Label>
              <Input {...register('whatsappNumber')} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">College Name *</Label>
              <Input {...register('collegeName')} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
              {errors.collegeName && <p className="text-red-400 text-[10px] font-mono uppercase">{errors.collegeName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Branch/Specialization *</Label>
              <Input {...register('branch')} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
              {errors.branch && <p className="text-red-400 text-[10px] font-mono uppercase">{errors.branch.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Year *</Label>
              <Select value={watch('year')} onValueChange={(v) => setValue('year', v)}>
                <SelectTrigger className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['1st', '2nd', '3rd', '4th', 'Graduated'].map((y) => (
                    <SelectItem key={y} value={y} className="text-[10px] font-mono uppercase tracking-widest">{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Semester *</Label>
              <Select value={watch('semester')} onValueChange={(v) => setValue('semester', v)}>
                <SelectTrigger className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'].map((s) => (
                    <SelectItem key={s} value={s} className="text-[10px] font-mono uppercase tracking-widest">{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Roll Number *</Label>
              <Input {...register('rollNumber')} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">City *</Label>
              <Input {...register('city')} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Referrer (Optional)</Label>
            <Input {...register('referrer')} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
            <Button type="button" variant="ghost" onClick={onClose} className="text-[10px] font-mono uppercase tracking-widest hover:bg-white/5 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-acid-green text-black hover:bg-acid-green/90 text-[10px] font-mono font-bold uppercase tracking-widest px-8">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {initialData ? 'Update Entity' : 'Register Entity'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
