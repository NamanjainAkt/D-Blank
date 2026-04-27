'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit, Loader2, Tag, Trash2, CheckCircle2 } from 'lucide-react';
import { CouponFormModal } from '@/components/admin/coupons/CouponFormModal';

interface Coupon {
  _id: string;
  code: string;
  description: string;
  discountAmount: number;
  minPurchase: number;
  maxUses: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (filterStatus !== 'all') {
        params.set('isActive', filterStatus === 'active' ? 'true' : 'false');
      }
      
      const res = await fetch(`/api/admin/coupons?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch coupons');
      const data = await res.json();
      setCoupons(data.coupons || []);
    } catch (err) {
      console.error('Error fetching coupons:', err);
      setError('Failed to load coupons. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setIsModalOpen(true);
  };

  const handleToggleActive = async (coupon: Coupon) => {
    try {
      const res = await fetch(`/api/admin/coupons/${coupon._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      });
      
      if (!res.ok) throw new Error('Failed to update coupon');
      fetchCoupons();
      showSuccess(`Coupon ${coupon.isActive ? 'deactivated' : 'activated'} successfully`);
    } catch (err) {
      console.error('Error toggling coupon:', err);
      alert('Failed to update coupon');
    }
  };

  const handleDelete = async (coupon: Coupon) => {
    if (!confirm(`Are you sure you want to delete coupon ${coupon.code}?`)) return;
    
    try {
      const res = await fetch(`/api/admin/coupons/${coupon._id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete coupon');
      fetchCoupons();
      showSuccess('Coupon deleted successfully');
    } catch (err) {
      console.error('Error deleting coupon:', err);
      alert('Failed to delete coupon');
    }
  };

  const isExpired = (validUntil: string) => {
    return new Date(validUntil) < new Date();
  };

  const filteredCoupons = coupons.filter(coupon => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'expired') return isExpired(coupon.validUntil);
    if (filterStatus === 'active') return coupon.isActive && !isExpired(coupon.validUntil);
    return true;
  });

  return (
    <div className="space-y-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-4xl font-display font-black text-white tracking-tighter uppercase">
            Promo <span className="text-laser-cyan shadow-laser-cyan">Codes</span>
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-laser-cyan shadow-[0_0_8px_#00FFFF]" />
            Active Coupons: {coupons.filter(c => c.isActive && !isExpired(c.validUntil)).length} // Total: {coupons.length}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="border-white/5 bg-white/5 hover:bg-white/10 hover:border-laser-cyan/50 text-laser-cyan text-[10px] font-mono uppercase tracking-widest h-9 shadow-[0_0_15px_rgba(0,255,255,0.1)]"
            onClick={() => {
              setEditingCoupon(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="w-3.5 h-3.5 mr-2" />
            Generate Code
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-ink/40 p-4 border border-white/5 rounded-sm backdrop-blur-sm">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="md:w-48 bg-black/40 border-white/5 text-zinc-200 font-mono text-[10px] uppercase tracking-widest h-10">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent className="bg-ink border-white/5">
            <SelectItem value="all" className="font-mono text-[10px] uppercase tracking-widest text-zinc-200">All Coupons</SelectItem>
            <SelectItem value="active" className="font-mono text-[10px] uppercase tracking-widest text-zinc-200">Active</SelectItem>
            <SelectItem value="expired" className="font-mono text-[10px] uppercase tracking-widest text-zinc-200">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] uppercase tracking-widest animate-fade-up" role="status" aria-live="polite">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          {successMessage}
        </div>
      )}

      {/* Main Content */}
      <Card className="bg-ink/40 border-white/5 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-laser-cyan/50 to-transparent" />
        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4 px-6">Code</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Description</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Discount</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Min Purchase</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Uses</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Expires</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Status</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4 text-right px-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && coupons.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-laser-cyan" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">Scanning Codes...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredCoupons.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Tag className="w-6 h-6 text-zinc-700" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">No Coupons Found</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCoupons.map((coupon) => {
                    const expired = isExpired(coupon.validUntil);
                    return (
                      <TableRow key={coupon._id} className="border-white/5 hover:bg-white/[0.02] transition-colors group/row">
                        <TableCell className="py-5 px-6">
                          <span className="text-sm font-mono font-bold text-laser-cyan group-hover/row:text-white transition-colors">
                            {coupon.code}
                          </span>
                        </TableCell>
                        <TableCell className="py-5">
                          <span className="text-sm text-zinc-400 max-w-[200px] truncate block">
                            {coupon.description || '-'}
                          </span>
                        </TableCell>
                        <TableCell className="py-5 font-mono text-sm text-emerald-400">
                          {formatCurrency(coupon.discountAmount)}
                        </TableCell>
                        <TableCell className="py-5 font-mono text-sm text-zinc-400">
                          {coupon.minPurchase > 0 ? formatCurrency(coupon.minPurchase) : '-'}
                        </TableCell>
                        <TableCell className="py-5">
                          <div className="flex flex-col gap-1 w-20">
                            <span className="text-[11px] font-mono text-zinc-300">
                              {coupon.usedCount} / {coupon.maxUses}
                            </span>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-laser-cyan shadow-[0_0_8px_#00FFFF]" 
                                style={{ width: `${Math.min((coupon.usedCount / coupon.maxUses) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-5 font-mono text-sm text-zinc-400">
                          {new Date(coupon.validUntil).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell className="py-5">
                          <button
                            onClick={() => handleToggleActive(coupon)}
                            disabled={expired}
                            className="hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Badge 
                              variant="outline"
                              className={cn(
                                "text-[9px] font-mono uppercase tracking-widest border px-2 py-0.5",
                                coupon.isActive && !expired 
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                  : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                              )}
                            >
                              {expired ? 'Expired' : coupon.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </button>
                        </TableCell>
                        <TableCell className="text-right py-5 px-6">
                          <div className="flex items-center justify-end gap-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              title="Edit Code"
                              className="h-9 w-9 p-0 border-white/5 bg-white/5 hover:border-laser-cyan/50 text-laser-cyan transition-all"
                              onClick={() => handleEdit(coupon)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              title="Delete Code"
                              className="h-9 w-9 p-0 border-white/5 bg-white/5 hover:border-red-500/50 text-red-400 transition-all"
                              onClick={() => handleDelete(coupon)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CouponFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={editingCoupon} 
        onSuccess={fetchCoupons} 
      />
    </div>
  );
}
