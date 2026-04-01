'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { formatCurrency } from '@/lib/utils';
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
import { Download, Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface Student {
  _id: string;
  enrollmentId: string;
  studentName: string;
  email: string;
  phone: string;
  collegeName: string;
  branch: string;
  semester: string;
  rollNumber: string;
  city: string;
  courseId: { title: string };
  courseName: string;
  paymentStatus: string;
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

export default function AdminStudentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [students, setStudents] = useState<Student[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', searchParams.get('page') || '1');
      params.set('limit', '20');
      if (search) params.set('search', search);
      if (statusFilter) params.set('paymentStatus', statusFilter);

      const res = await fetch(`/api/admin/students?${params}`);
      const data = await res.json();
      setStudents(data.students || []);
      setPagination(data.pagination || { page: 1, limit: 20, total: 0, pages: 0 });
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  }, [searchParams, search, statusFilter]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleSearch = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`/admin/students?${params.toString()}`);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('paymentStatus', value);
    } else {
      params.delete('paymentStatus');
    }
    params.set('page', '1');
    router.push(`/admin/students?${params.toString()}`);
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter) params.set('paymentStatus', statusFilter);

      const res = await fetch(`/api/admin/export?${params}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `enrollments-${Date.now()}.csv`;
      a.click();
    } catch (error) {
      console.error('Error exporting:', error);
    }
  };

  const updateEnrollmentStatus = async (studentId: string, status: string) => {
    try {
      await fetch(`/api/admin/students/${studentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentStatus: status }),
      });
      fetchStudents();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <p className="text-sm text-zinc-500">{pagination.total} total enrollments</p>
        </div>
        <Button onClick={handleExport} variant="outline" className="border-emerald-500/50 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name, email, phone, college..."
            className="pl-10 bg-zinc-800 border-zinc-700"
          />
        </div>
        <Select value={statusFilter} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-zinc-700">
            <SelectItem value="">All Status</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800">
                <TableHead className="text-zinc-500">Student</TableHead>
                <TableHead className="text-zinc-500">College</TableHead>
                <TableHead className="text-zinc-500">Course</TableHead>
                <TableHead className="text-zinc-500">Amount</TableHead>
                <TableHead className="text-zinc-500">Status</TableHead>
                <TableHead className="text-zinc-500">Date</TableHead>
                <TableHead className="text-zinc-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-zinc-500">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-zinc-500">
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow 
                    key={student._id} 
                    className="border-zinc-800/50 cursor-pointer hover:bg-zinc-800/30"
                    onClick={() => router.push(`/admin/students/${student._id}`)}
                  >
                    <TableCell>
                      <div className="font-medium">{student.studentName}</div>
                      <div className="text-xs text-zinc-500 font-mono">{student.phone}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{student.collegeName}</div>
                      <div className="text-xs text-zinc-500">{student.branch} - {student.semester}</div>
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      {student.courseId?.title || student.courseName}
                    </TableCell>
                    <TableCell className="font-mono">
                      {student.paymentAmount ? formatCurrency(student.paymentAmount) : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={student.paymentStatus === 'paid' ? 'default' : student.paymentStatus === 'pending' ? 'secondary' : 'destructive'}
                        className={
                          student.paymentStatus === 'paid' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                          student.paymentStatus === 'pending' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                          'bg-red-500/20 text-red-400 border-red-500/30'
                        }
                      >
                        {student.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-500 text-sm font-mono">
                      {format(new Date(student.createdAt), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/admin/students/${student._id}`)}
                          className="text-zinc-400 hover:text-white"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Select value={student.enrollmentStatus} onValueChange={(v) => updateEnrollmentStatus(student._id, v)}>
                          <SelectTrigger className="w-[130px] h-8 text-xs bg-zinc-800 border-zinc-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700">
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set('page', String(pagination.page - 1));
              router.push(`/admin/students?${params.toString()}`);
            }}
            disabled={pagination.page === 1}
            className="border-zinc-700"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm text-zinc-500 px-4">
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set('page', String(pagination.page + 1));
              router.push(`/admin/students?${params.toString()}`);
            }}
            disabled={pagination.page === pagination.pages}
            className="border-zinc-700"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
