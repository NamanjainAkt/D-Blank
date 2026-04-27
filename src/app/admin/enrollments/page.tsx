'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
import { Download, Search, ChevronLeft, ChevronRight, Eye, AlertCircle, Loader2, Plus, Trash2 } from 'lucide-react';
import { EnrollmentFormModal } from '@/components/admin/enrollments/EnrollmentFormModal';

interface Student {
  _id: string;
  studentName: string;
  email: string;
  phone: string;
  studentId?: { collegeName: string };
  collegeName?: string; // Fallback
  branch: string;
  semester: string;
  rollNumber: string;
  city: string;
  courseId?: { title: string };
  courseName: string;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'rejected';
  paymentAmount: number;
  enrollmentStatus: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function AdminEnrollmentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [students, setStudents] = useState<Student[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(() => {
    const status = searchParams.get('status');
    return status === '' || status === null ? 'all' : status;
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if "all" is selected (either explicitly or when value is empty)
  const isAllStatus = statusFilter === 'all' || statusFilter === '';

  const fetchStudents = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set('page', searchParams.get('page') || '1');
      params.set('limit', '20');
      if (search) params.set('search', search);
      if (statusFilter && statusFilter !== 'all') params.set('paymentStatus', statusFilter);

      const res = await fetch(`/api/admin/enrollments?${params}`);
      if (!res.ok) throw new Error('Failed to fetch enrollments');
      const data = await res.json();
      setStudents(data.enrollments || []);
      setPagination(data.pagination || { page: 1, limit: 20, total: 0, pages: 0 });
    } catch (err) {
      console.error('Error fetching enrollments:', err);
      setError('Failed to load enrollments. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, searchParams]);

  // Debounced search effect
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      fetchStudents(false);
    }, 300);
    
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search, statusFilter]);

  // Initial fetch
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams();
    if (value) params.set('search', value);
    if (statusFilter && statusFilter !== 'all') params.set('paymentStatus', statusFilter);
    params.set('page', '1');
    router.push(`/admin/enrollments?${params.toString()}`);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (value && value !== 'all') params.set('paymentStatus', value);
    params.set('page', '1');
    router.push(`/admin/enrollments?${params.toString()}`);
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter && statusFilter !== 'all') params.set('paymentStatus', statusFilter);

      const res = await fetch(`/api/admin/export?${params}`);
      if (!res.ok) throw new Error('Export failed');
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `enrollments-${Date.now()}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      showSuccess('Export completed successfully');
    } catch (err) {
      console.error('Error exporting:', err);
      setError('Failed to export data. Please try again.');
    }
  };

  const updateEnrollmentStatus = async (studentId: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/enrollments/${studentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentStatus: status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      fetchStudents(false);
      showSuccess('Enrollment status updated');
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update enrollment status');
    }
  };

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    router.push(`/admin/enrollments?${params.toString()}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enrollment?')) return;
    try {
      setDeleting(id);
      const res = await fetch(`/api/admin/enrollments/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete enrollment');
      }
      fetchStudents(false);
      showSuccess('Enrollment deleted successfully');
    } catch (err: any) {
      console.error('Error deleting enrollment:', err);
      alert(err.message || 'Failed to delete enrollment');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-4xl font-display font-black text-white tracking-tighter uppercase">
            Personnel <span className="text-laser-cyan shadow-laser-cyan">Database</span>
          </h1>
          <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-laser-cyan shadow-[0_0_8px_#00F0FF]" />
            Records: {pagination.total} // Authorized Access Only
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-laser-cyan text-black hover:bg-laser-cyan/90 text-[10px] font-mono font-bold uppercase tracking-widest px-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Enrollment
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExport}
            size="sm"
            className="border-white/5 bg-white/5 hover:bg-white/10 hover:border-laser-cyan/50 text-[10px] font-mono uppercase tracking-widest h-10"
          >
            <Download className="w-3.5 h-3.5 mr-2" />
            Export Archive
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-ink/40 p-4 border border-white/5 backdrop-blur-sm rounded-sm">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            placeholder="Search by name, email, or enrollment ID..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-black/40 border-white/5 focus:border-laser-cyan/50 text-sm font-mono placeholder:text-zinc-400 h-10"
          />
        </div>
        <div>
          <Select value={statusFilter} onValueChange={handleStatusFilter}>
            <SelectTrigger className="bg-black/40 border-white/5 focus:border-laser-cyan/50 text-[10px] font-mono uppercase tracking-widest h-10">
              <SelectValue placeholder="Status Filter" />
            </SelectTrigger>
            <SelectContent className="bg-ink border-white/5">
              <SelectItem value="all" className="text-[10px] font-mono uppercase tracking-widest">All Status</SelectItem>
              <SelectItem value="paid" className="text-[10px] font-mono uppercase tracking-widest">Paid</SelectItem>
              <SelectItem value="pending" className="text-[10px] font-mono uppercase tracking-widest">Pending</SelectItem>
              <SelectItem value="failed" className="text-[10px] font-mono uppercase tracking-widest">Failed</SelectItem>
              <SelectItem value="rejected" className="text-[10px] font-mono uppercase tracking-widest">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <Card className="bg-ink/40 border-white/5 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-laser-cyan/50 to-transparent" />
        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 py-4">Operator</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 py-4">ID / Origin</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 py-4">Module</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 py-4">Status</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 py-4 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-laser-cyan" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">Retrieving Records...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-6 h-6 text-zinc-700" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">No Records Found</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((student) => (
                    <TableRow key={student._id} className="border-white/5 hover:bg-white/[0.02] transition-colors group/row">
                      <TableCell className="py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-zinc-200 group-hover/row:text-white transition-colors">{student.studentName}</span>
                          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-tight">{student.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-mono text-zinc-400">{student._id.slice(-8).toUpperCase()}</span>
                          <span className="text-[9px] font-mono text-zinc-400 uppercase">{student.studentId?.collegeName || student.collegeName || 'N/A'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-tighter">
                          {student.courseId?.title || student.courseName}
                        </span>
                      </TableCell>
                      <TableCell className="py-5">
                        <Badge 
                          variant="outline"
                          className={`text-[9px] font-mono uppercase tracking-widest border px-2 py-0.5 ${
                            student.paymentStatus === 'paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            student.paymentStatus === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                            student.paymentStatus === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                          }`}
                        >
                          {student.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right py-5">
                        <div className="flex justify-end gap-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            title="View Enrollment"
                            className="h-9 w-9 p-0 border-white/5 bg-white/5 hover:border-laser-cyan/50 text-laser-cyan transition-all"
                            onClick={() => router.push(`/admin/enrollments/${student._id}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            title="Delete Enrollment"
                            disabled={deleting === student._id}
                            className="h-9 w-9 p-0 border-white/5 bg-white/5 hover:border-red-500/50 text-red-500 transition-all disabled:opacity-50"
                            onClick={() => handleDelete(student._id)}
                          >
                            {deleting === student._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between pt-6">
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
            Page {pagination.page} of {pagination.pages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1}
              onClick={() => navigateToPage(pagination.page - 1)}
              className="h-9 w-9 p-0 border-white/5 bg-white/5 hover:border-laser-cyan/50 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page >= pagination.pages}
              onClick={() => navigateToPage(pagination.page + 1)}
              className="h-9 w-9 p-0 border-white/5 bg-white/5 hover:border-laser-cyan/50 disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <EnrollmentFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => fetchStudents(false)} 
      />
    </div>
  );
}
