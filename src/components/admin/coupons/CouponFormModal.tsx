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
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

interface CouponFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSuccess: () => void;
}

export function CouponFormModal({ isOpen, onClose, initialData, onSuccess }: CouponFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      code: '',
      description: '',
      discountAmount: 0,
      minPurchase: 0,
      maxUses: 100,
      validUntil: '',
      isActive: true,
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        validUntil: initialData.validUntil ? new Date(initialData.validUntil).toISOString().split('T')[0] : '',
      });
    } else {
      reset({
        code: '', description: '', discountAmount: 0, minPurchase: 0, maxUses: 100, validUntil: '', isActive: true
      });
    }
  }, [initialData, reset, isOpen]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...data,
        discountAmount: Number(data.discountAmount),
        minPurchase: Number(data.minPurchase),
        maxUses: Number(data.maxUses),
        validUntil: new Date(data.validUntil).toISOString(),
      };

      const url = initialData ? `/api/admin/coupons/${initialData._id}` : '/api/admin/coupons';
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
      <DialogContent className="bg-ink border-white/5 max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-black text-white uppercase tracking-tighter">
            {initialData ? 'Edit Promo Code' : 'Generate Promo Code'}
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
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Code *</Label>
              <Input {...register('code', { required: true })} className="bg-black/40 border-white/5 focus:border-neon-purple/50 text-sm font-mono uppercase" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Expiry Date *</Label>
              <Input type="date" {...register('validUntil', { required: true })} className="bg-black/40 border-white/5 focus:border-neon-purple/50 text-sm font-mono [&::-webkit-calendar-picker-indicator]:filter-invert" />
            </div>
            
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Discount Amount (₹) *</Label>
              <Input type="number" {...register('discountAmount', { required: true })} className="bg-black/40 border-white/5 focus:border-neon-purple/50 text-sm font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Min Purchase (₹)</Label>
              <Input type="number" {...register('minPurchase')} className="bg-black/40 border-white/5 focus:border-neon-purple/50 text-sm font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Max Total Uses</Label>
              <Input type="number" {...register('maxUses')} className="bg-black/40 border-white/5 focus:border-neon-purple/50 text-sm font-mono" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Description</Label>
            <Textarea {...register('description')} rows={2} className="bg-black/40 border-white/5 focus:border-neon-purple/50 text-sm font-mono resize-none" />
          </div>

          <div className="flex items-center space-x-3 bg-black/40 p-3 border border-white/5 rounded-sm">
            <Checkbox 
              id="isActive" 
              checked={watch('isActive')}
              onCheckedChange={(checked) => setValue('isActive', checked as boolean)}
              className="border-white/20"
            />
            <Label htmlFor="isActive" className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 cursor-pointer">
              Is Active
            </Label>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
            <Button type="button" variant="ghost" onClick={onClose} className="text-[10px] font-mono uppercase tracking-widest hover:bg-white/5 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-neon-purple text-white hover:bg-neon-purple/90 text-[10px] font-mono font-bold uppercase tracking-widest px-8 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {initialData ? 'Update Code' : 'Generate Code'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}