'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, AlertCircle, CheckCircle2, Loader2, Tag, Trash2, Percent } from 'lucide-react';

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

interface CouponFormData {
  code: string;
  description: string;
  discountAmount: number;
  minPurchase: number;
  maxUses: number;
  validUntil: string;
  isActive: boolean;
}

const initialFormData: CouponFormData = {
  code: '',
  description: '',
  discountAmount: 0,
  minPurchase: 0,
  maxUses: 100,
  validUntil: '',
  isActive: true,
};

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [formData, setFormData] = useState<CouponFormData>(initialFormData);

  const fetchCoupons = useCallback(async () => {
    try {
      setError(null);
      const params = new URLSearchParams();
      if (filterStatus !== 'all') {
        params.set('isActive', filterStatus === 'active' ? 'true' : 'false');
      }
      
      const res = await fetch(`/api/coupons?${params.toString()}`);
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

  const handleInputChange = (field: keyof CouponFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError(null);

    try {
      const url = editingCoupon 
        ? `/api/coupons/${editingCoupon._id}`
        : '/api/coupons';
      
      const method = editingCoupon ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save coupon');
      }

      setIsModalOpen(false);
      setEditingCoupon(null);
      setFormData(initialFormData);
      fetchCoupons();
      showSuccess(editingCoupon ? 'Coupon updated successfully' : 'Coupon created successfully');
    } catch (err) {
      console.error('Error saving coupon:', err);
      setError(err instanceof Error ? err.message : 'Failed to save coupon');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      description: coupon.description || '',
      discountAmount: coupon.discountAmount,
      minPurchase: coupon.minPurchase,
      maxUses: coupon.maxUses,
      validUntil: new Date(coupon.validUntil).toISOString().split('T')[0],
      isActive: coupon.isActive,
    });
    setIsModalOpen(true);
  };

  const handleToggleActive = async (coupon: Coupon) => {
    try {
      const res = await fetch(`/api/coupons/${coupon._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      });
      
      if (!res.ok) throw new Error('Failed to update coupon');
      fetchCoupons();
      showSuccess(`Coupon ${coupon.isActive ? 'deactivated' : 'activated'} successfully`);
    } catch (err) {
      console.error('Error toggling coupon:', err);
      setError('Failed to update coupon');
    }
  };

  const handleDelete = async (coupon: Coupon) => {
    if (!confirm(`Are you sure you want to delete coupon ${coupon.code}?`)) return;
    
    try {
      const res = await fetch(`/api/coupons/${coupon._id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete coupon');
      fetchCoupons();
      showSuccess('Coupon deleted successfully');
    } catch (err) {
      console.error('Error deleting coupon:', err);
      setError('Failed to delete coupon');
    }
  };

  const resetForm = () => {
    setEditingCoupon(null);
    setFormData(initialFormData);
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
          <Dialog open={isModalOpen} onOpenChange={(open) => {
            if (!open) resetForm();
            setIsModalOpen(open);
          }}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="border-white/5 bg-white/5 hover:bg-white/10 hover:border-laser-cyan/50 text-laser-cyan text-[10px] font-mono uppercase tracking-widest h-9 shadow-[0_0_15px_rgba(0,255,255,0.1)]"
                onClick={() => {
                  setEditingCoupon(null);
                  setFormData(initialFormData);
                }}
              >
                <Plus className="w-3.5 h-3.5 mr-2" />
                Generate Code
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-ink border-white/5 max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar">
              <DialogHeader className="border-b border-white/5 pb-4 mb-6">
                <DialogTitle className="text-xl font-display font-black text-white uppercase tracking-tighter">
                  {editingCoupon ? 'Reconfigure Code' : 'Generate Promo Code'}
                </DialogTitle>
                <DialogDescription className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-2">
                  Discount Parameters // Coupon Configuration
                </DialogDescription>
              </DialogHeader>
              
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-mono uppercase tracking-widest mb-6" role="alert">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  {error}
                </div>
              )}
              
              <div className="space-y-6">
                {/* Code */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Code</Label>
                  <Input 
                    value={formData.code}
                    onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                    placeholder="SAVE500"
                    maxLength={20}
                    className="bg-white/5 border-white/5 text-zinc-200 font-mono text-sm uppercase"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Description</Label>
                  <Textarea 
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Discount description..."
                    rows={2}
                    className="bg-white/5 border-white/5 text-zinc-200 font-mono text-sm resize-none"
                  />
                </div>

                {/* Discount Amount & Min Purchase */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Discount (₹)</Label>
                    <Input 
                      type="number"
                      value={formData.discountAmount}
                      onChange={(e) => handleInputChange('discountAmount', parseInt(e.target.value) || 0)}
                      placeholder="500"
                      min={0}
                      className="bg-white/5 border-white/5 text-zinc-200 font-mono text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Min Purchase (₹)</Label>
                    <Input 
                      type="number"
                      value={formData.minPurchase}
                      onChange={(e) => handleInputChange('minPurchase', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      min={0}
                      className="bg-white/5 border-white/5 text-zinc-200 font-mono text-sm"
                    />
                  </div>
                </div>

                {/* Max Uses & Valid Until */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Max Uses</Label>
                    <Input 
                      type="number"
                      value={formData.maxUses}
                      onChange={(e) => handleInputChange('maxUses', parseInt(e.target.value) || 1)}
                      placeholder="100"
                      min={1}
                      className="bg-white/5 border-white/5 text-zinc-200 font-mono text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Valid Until</Label>
                    <Input 
                      type="date"
                      value={formData.validUntil}
                      onChange={(e) => handleInputChange('validUntil', e.target.value)}
                      className="bg-white/5 border-white/5 text-zinc-200 font-mono text-sm"
                    />
                  </div>
                </div>

                {/* Active Status */}
                <div className="flex items-center gap-3">
                  <Switch 
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked: boolean) => handleInputChange('isActive', checked)}
                  />
                  <Label htmlFor="isActive" className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    Active
                  </Label>
                </div>

                {/* Submit Button */}
                <Button 
                  onClick={handleSubmit}
                  disabled={saving}
                  className="w-full bg-laser-cyan/20 hover:bg-laser-cyan/30 border border-laser-cyan/50 text-laser-cyan font-mono text-xs uppercase tracking-widest"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    editingCoupon ? 'Update Code' : 'Generate Code'
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="md:w-48 bg-white/5 border-white/5 text-zinc-200 font-mono text-sm">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent className="bg-ink border-white/5">
            <SelectItem value="all" className="font-mono text-zinc-200">All Coupons</SelectItem>
            <SelectItem value="active" className="font-mono text-zinc-200">Active</SelectItem>
            <SelectItem value="expired" className="font-mono text-zinc-200">Expired</SelectItem>
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
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 w-8 p-0 border-white/5 bg-white/5 hover:border-laser-cyan/50 text-laser-cyan transition-all"
                              onClick={() => handleEdit(coupon)}
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 w-8 p-0 border-white/5 bg-white/5 hover:border-red-500/50 text-red-400 transition-all"
                              onClick={() => handleDelete(coupon)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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
    </div>
  );
}
