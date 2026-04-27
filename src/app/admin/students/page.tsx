'use client';

import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  UserCheck, 
  Search, 
  Mail, 
  Phone, 
  School, 
  MapPin, 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  Loader2,
  AlertCircle,
  BarChart3,
  CreditCard
} from 'lucide-react';
import { cn, formatDate, formatCurrency } from '@/lib/utils';
import { StudentFormModal } from '@/components/admin/students/StudentFormModal';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('all');
  const [collegeFilter, setCollegeFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [studentDetails, setStudentDetails] = useState<any>(null);

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (semesterFilter && semesterFilter !== 'all') params.set('semester', semesterFilter);
      if (collegeFilter && collegeFilter !== 'all') params.set('college', collegeFilter);
      
      const res = await fetch(`/api/admin/students?${params}`);
      if (!res.ok) throw new Error('Failed to fetch students');
      const data = await res.json();
      setStudents(data.students || []);
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  }, [search, semesterFilter, collegeFilter]);

  useEffect(() => {
    const timer = setTimeout(fetchStudents, 500);
    return () => clearTimeout(timer);
  }, [fetchStudents]);

  const viewDetails = async (id: string) => {
    try {
      setDetailLoading(true);
      setSelectedStudent(id);
      const res = await fetch(`/api/admin/students/${id}`);
      if (!res.ok) throw new Error('Failed to fetch details');
      const data = await res.json();
      setStudentDetails(data);
    } catch (err) {
      console.error('Error fetching student details:', err);
    } finally {
      setDetailLoading(false);
    }
  };

  const deleteStudent = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this entity?')) return;
    
    try {
      setDeleting(id);
      const res = await fetch(`/api/admin/students/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete student');
      }
      fetchStudents();
    } catch (err: any) {
      console.error('Error deleting student:', err);
      alert(err.message || 'Failed to delete student');
    } finally {
      setDeleting(null);
    }
  };

  const handleEdit = (student: any) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-4xl font-display font-black text-white tracking-tighter uppercase">
            Student <span className="text-acid-green shadow-acid-green">Registry</span>
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-acid-green shadow-[0_0_8px_#39FF14]" />
            Database Status: {students.length} Unique Entities Detected
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => {
              setEditingStudent(null);
              setIsFormOpen(true);
            }}
            className="bg-acid-green text-black hover:bg-acid-green/90 text-[10px] font-mono font-bold uppercase tracking-widest px-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Entity
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-ink/40 p-4 border border-white/5 backdrop-blur-sm rounded-sm">
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-acid-green transition-colors" />
          <Input 
            placeholder="SCAN BY NAME / EMAIL / PHONE..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-black/40 border-white/5 focus:border-acid-green/50 text-[10px] font-mono uppercase tracking-widest h-10"
          />
        </div>
        <div>
          <Select value={semesterFilter} onValueChange={setSemesterFilter}>
            <SelectTrigger className="bg-black/40 border-white/5 focus:border-acid-green/50 text-[10px] font-mono uppercase tracking-widest h-10">
              <SelectValue placeholder="Filter by Semester" />
            </SelectTrigger>
            <SelectContent className="bg-ink border-white/5">
              <SelectItem value="all" className="text-[10px] font-mono uppercase tracking-widest">All Semesters</SelectItem>
              <SelectItem value="1st" className="text-[10px] font-mono uppercase tracking-widest">1st Semester</SelectItem>
              <SelectItem value="2nd" className="text-[10px] font-mono uppercase tracking-widest">2nd Semester</SelectItem>
              <SelectItem value="3rd" className="text-[10px] font-mono uppercase tracking-widest">3rd Semester</SelectItem>
              <SelectItem value="4th" className="text-[10px] font-mono uppercase tracking-widest">4th Semester</SelectItem>
              <SelectItem value="5th" className="text-[10px] font-mono uppercase tracking-widest">5th Semester</SelectItem>
              <SelectItem value="6th" className="text-[10px] font-mono uppercase tracking-widest">6th Semester</SelectItem>
              <SelectItem value="7th" className="text-[10px] font-mono uppercase tracking-widest">7th Semester</SelectItem>
              <SelectItem value="8th" className="text-[10px] font-mono uppercase tracking-widest">8th Semester</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={collegeFilter} onValueChange={setCollegeFilter}>
            <SelectTrigger className="bg-black/40 border-white/5 focus:border-acid-green/50 text-[10px] font-mono uppercase tracking-widest h-10">
              <SelectValue placeholder="Filter by College" />
            </SelectTrigger>
            <SelectContent className="bg-ink border-white/5">
              <SelectItem value="all" className="text-[10px] font-mono uppercase tracking-widest">All Colleges</SelectItem>
              <SelectItem value="BIT" className="text-[10px] font-mono uppercase tracking-widest">BIT</SelectItem>
              <SelectItem value="others" className="text-[10px] font-mono uppercase tracking-widest">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main List */}
      <Card className="bg-ink/40 border-white/5 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-acid-green/50 to-transparent" />
        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4 px-6">Entity Signature</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Communication Uplink</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Origin Hub (College)</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Registered On</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4 text-right px-6">Protocol</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-acid-green" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">Scanning Database...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-6 h-6 text-zinc-700" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">No Entities Found</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((person) => (
                    <TableRow key={person._id} className="border-white/5 hover:bg-white/[0.02] transition-colors group/row">
                      <TableCell className="py-5 px-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-zinc-200 group-hover/row:text-white transition-colors uppercase tracking-tight">{person.name}</span>
                          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-tight mt-0.5">ID: {person._id.slice(-8)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-zinc-400">
                            <Mail className="w-3 h-3 text-zinc-400" />
                            <span className="text-[11px] font-mono lowercase">{person.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-400">
                            <Phone className="w-3 h-3 text-zinc-400" />
                            <span className="text-[11px] font-mono">{person.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-tight line-clamp-1">{person.collegeName}</span>
                          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">{person.branch} // {person.semester} SEM</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 font-mono text-[11px] text-zinc-500">
                        {formatDate(person.createdAt)}
                      </TableCell>
                      <TableCell className="text-right py-5 px-6">
                        <div className="flex items-center justify-end gap-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            title="Access Profile"
                            className="h-9 w-9 p-0 border-white/5 bg-white/5 hover:border-acid-green/50 text-acid-green transition-colors"
                            onClick={() => viewDetails(person._id)}
                          >
                            <UserCheck className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            title="Edit Entity"
                            className="h-9 w-9 p-0 border-white/5 bg-white/5 hover:border-acid-green/50 text-acid-green transition-colors"
                            onClick={() => handleEdit(person)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            title="Delete Entity"
                            disabled={deleting === person._id}
                            className="h-9 w-9 p-0 border-white/5 bg-white/5 hover:border-red-500/50 text-red-500 transition-colors disabled:opacity-50"
                            onClick={() => deleteStudent(person._id)}
                          >
                            {deleting === person._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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

      {/* Detail Modal */}
      <Dialog open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
        <DialogContent className="bg-ink border-white/5 max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar">
          {detailLoading ? (
            <div className="py-20 flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-acid-green" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">Extracting Profile Data...</span>
            </div>
) : studentDetails ? (
            <>
              <DialogHeader className="border-b border-white/5 pb-6 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-acid-green/10 flex items-center justify-center border border-acid-green/20">
                    <UserCheck className="w-8 h-8 text-acid-green" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-display font-black text-white uppercase tracking-tighter">
                      {studentDetails.student?.name || 'Unknown'}
                    </DialogTitle>
                    <DialogDescription className="text-[10px] font-mono text-acid-green uppercase tracking-widest mt-1">
                      Entity Profile // Level 01 Operator
                    </DialogDescription>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="p-3 bg-white/5 border border-white/5 rounded">
                    <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Email Uplink</div>
                    <div className="text-[10px] font-mono text-white break-all">{studentDetails.student?.email || 'N/A'}</div>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/5 rounded">
                    <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Comm Link</div>
                    <div className="text-[10px] font-mono text-white">{studentDetails.student?.phone || 'N/A'}</div>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/5 rounded">
                    <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Roll Signature</div>
                    <div className="text-[10px] font-mono text-white">{studentDetails.student?.rollNumber || 'N/A'}</div>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/5 rounded">
                    <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Current Year</div>
                    <div className="text-[10px] font-mono text-white uppercase">{studentDetails.student?.year || 'N/A'} Year</div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-8">
                {/* Secondary Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
                      <School className="w-3 h-3" /> Origin Information
                    </h4>
                    <div className="space-y-3 p-4 bg-black/40 border border-white/5 rounded">
                      <div>
                        <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest mb-1">College/Institution</div>
                        <div className="text-[11px] font-mono text-white uppercase tracking-tight">{studentDetails.student?.collegeName || 'N/A'}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Branch</div>
                          <div className="text-[11px] font-mono text-white uppercase tracking-tight">{studentDetails.student?.branch || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Semester</div>
                          <div className="text-[11px] font-mono text-white uppercase tracking-tight">{studentDetails.student?.semester || 'N/A'} SEM</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                        <MapPin className="w-3 h-3 text-zinc-400" />
                        <span className="text-[10px] font-mono text-white uppercase tracking-widest">{studentDetails.student?.city || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
                      <BarChart3 className="w-3 h-3" /> Intelligence Summary
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-black/40 border border-white/5 rounded text-center">
                        <div className="text-[20px] font-display font-black text-white">{studentDetails.enrollments?.length || 0}</div>
                        <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest mt-1">Module Uplinks</div>
                      </div>
                      <div className="p-4 bg-black/40 border border-white/5 rounded text-center">
                        <div className="text-[20px] font-display font-black text-white">
                          {(studentDetails.enrollments || []).filter((e: any) => e.paymentStatus === 'paid').length}
                        </div>
                        <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest mt-1">Active Modules</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enrollments List */}
                {studentDetails.enrollments && studentDetails.enrollments.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
                      <BookOpen className="w-3 h-3" /> Module History
                    </h4>
                    <div className="space-y-2">
                      {studentDetails.enrollments.map((enrollment: any) => (
                        <div key={enrollment._id} className="flex items-center justify-between p-3 bg-black/40 border border-white/5 rounded">
                          <div>
                            <div className="text-xs font-mono text-white uppercase">{enrollment.courseId?.title || enrollment.courseName}</div>
                            <div className="text-[10px] font-mono text-zinc-400">{format(new Date(enrollment.createdAt), 'MMM d, yyyy HH:mm')}</div>
                          </div>
                          <Badge variant="outline" className={enrollment.paymentStatus === 'paid' ? 'border-emerald text-emerald' : 'border-amber text-amber'}>
                            {enrollment.paymentStatus}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      <StudentFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        initialData={editingStudent} 
        onSuccess={fetchStudents} 
      />
    </div>
  );
}

