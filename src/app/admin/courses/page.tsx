'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { formatCurrency, cn } from '@/lib/utils';
import { ImageUploader } from '@/components/ImageUploader';
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
import { Plus, Edit, AlertCircle, CheckCircle2, Loader2, BookOpen, Copy, Trash2 } from 'lucide-react';
import CourseForm from '@/components/admin/courses/CourseForm';
import { CourseFormData } from '@/lib/validations';

interface Course {
  _id: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  totalSeats: number;
  enrolledCount: number;
  isPublished: boolean;
  createdAt: string;
  instructorName?: string;
  meetLink?: string;
  thumbnailUrl?: string;
  syllabusUrl?: string;
}

export default function AdminCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchCourses = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch('/api/admin/courses');
      if (!res.ok) throw new Error('Failed to fetch courses');
      const data = await res.json();
      setCourses(data.courses || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleSubmit = async (data: CourseFormData) => {
    setSaving(true);
    setError(null);

    try {
      const url = editingCourse 
        ? `/api/admin/courses/${editingCourse._id}`
        : '/api/admin/courses';
      
      const res = await fetch(url, {
        method: editingCourse ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save course');
      }

      setIsModalOpen(false);
      setEditingCourse(null);
      fetchCourses();
      showSuccess(editingCourse ? 'Course updated successfully' : 'Course created successfully');
    } catch (err) {
      console.error('Error saving course:', err);
      setError(err instanceof Error ? err.message : 'Failed to save course');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (course: any) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this course?')) return;
    
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete course');
      }
      fetchCourses();
      showSuccess('Course deleted successfully');
    } catch (err: any) {
      console.error('Error deleting course:', err);
      alert(err.message || 'Failed to delete course');
    }
  };

  const handleDuplicate = async (course: Course) => {
    try {
      setSaving(true);
      const { _id, ...courseData } = course;
      courseData.title = `${course.title} (Copy)`;
      courseData.slug = `${course.slug}-copy-${Date.now()}`;
      courseData.isPublished = false;
      courseData.enrolledCount = 0;
      
      const res = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });

      if (!res.ok) throw new Error('Failed to duplicate course');
      fetchCourses();
      showSuccess('Course duplicated successfully');
    } catch (err: any) {
      console.error('Error duplicating course:', err);
      alert('Failed to duplicate course');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (course: Course) => {
    try {
      const res = await fetch(`/api/admin/courses/${course._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !course.isPublished }),
      });
      
      if (!res.ok) throw new Error('Failed to update status');
      fetchCourses();
      showSuccess(`Course ${course.isPublished ? 'unpublished' : 'published'} successfully`);
    } catch (err) {
      console.error('Error toggling publish:', err);
      setError('Failed to update course status');
    }
  };

  const resetForm = () => {
    setEditingCourse(null);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <div className="space-y-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-4xl font-display font-black text-white tracking-tighter uppercase">
            Module <span className="text-acid-green shadow-acid-green">Control</span>
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-acid-green shadow-[0_0_8px_#39FF14]" />
            Active Modules: {courses.length} // Deployment Status
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
                className="border-white/5 bg-white/5 hover:bg-white/10 hover:border-acid-green/50 text-acid-green text-[10px] font-mono uppercase tracking-widest h-9 shadow-[0_0_15px_rgba(57,255,20,0.1)]"
                onClick={() => setEditingCourse(null)}
              >
                <Plus className="w-3.5 h-3.5 mr-2" />
                Initialize Module
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-ink border-white/5 max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar">
              <DialogHeader className="border-b border-white/5 pb-4 mb-6">
                <DialogTitle className="text-xl font-display font-black text-white uppercase tracking-tighter">
                  {editingCourse ? 'Configure Module' : 'Initialize New Module'}
                </DialogTitle>
                <DialogDescription className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-2">
                  System Protocol // Course Definition Parameters
                </DialogDescription>
              </DialogHeader>
              
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-mono uppercase tracking-widest mb-6" role="alert">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  {error}
                </div>
              )}
              
              <CourseForm 
                key={editingCourse ? editingCourse._id : 'new-module'}
                initialData={editingCourse} 
                onSubmit={handleSubmit} 
                loading={saving} 
              />
            </DialogContent>
          </Dialog>
        </div>
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
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-acid-green/50 to-transparent" />
        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4 px-6">Module Designation</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Classification</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Saturation</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Credits</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Status</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4 text-right px-6">Configure</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && courses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-acid-green" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">Scanning Modules...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : courses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-6 h-6 text-zinc-700" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">No Modules Detected</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  courses.map((course) => (
                    <TableRow key={course._id} className="border-white/5 hover:bg-white/[0.02] transition-colors group/row">
                      <TableCell className="py-5 px-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-zinc-200 group-hover/row:text-white transition-colors">{course.title}</span>
                          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-tight">/{course.slug}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-sm border border-white/5">
                          {course.category}
                        </span>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex flex-col gap-1.5 w-32">
                          <div className="flex justify-between text-[9px] font-mono uppercase text-zinc-500">
                            <span>{course.enrolledCount} / {course.totalSeats}</span>
                            <span>{course.totalSeats > 0 ? Math.round((course.enrolledCount / course.totalSeats) * 100) : 0}%</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-acid-green shadow-[0_0_8px_#39FF14]" 
                              style={{ width: `${course.totalSeats > 0 ? (course.enrolledCount / course.totalSeats) * 100 : 0}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 font-mono text-sm text-zinc-300">
                        {formatCurrency(course.price)}
                      </TableCell>
                      <TableCell className="py-5">
                        <button
                          onClick={() => handleTogglePublish(course)}
                          className="hover:scale-105 transition-transform"
                        >
                          <Badge 
                            variant="outline"
                            className={cn(
                              "text-[9px] font-mono uppercase tracking-widest border px-2 py-0.5",
                              course.isPublished ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                            )}
                          >
                            {course.isPublished ? 'Deployed' : 'Draft'}
                          </Badge>
                        </button>
                      </TableCell>
                      <TableCell className="text-right py-5 px-6">
                        <div className="flex items-center justify-end gap-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            title="Duplicate Course"
                            className="h-9 w-9 p-0 border-white/5 bg-white/5 hover:border-acid-green/50 text-zinc-400 hover:text-acid-green transition-all"
                            onClick={() => handleDuplicate(course as any)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            title="Edit Course"
                            className="h-9 w-9 p-0 border-white/5 bg-white/5 hover:border-acid-green/50 text-acid-green transition-all"
                            onClick={() => handleEdit(course)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            title="Delete Course"
                            className="h-9 w-9 p-0 border-white/5 bg-white/5 hover:border-red-500/50 text-red-500 transition-all"
                            onClick={() => handleDelete(course._id)}
                          >
                            <Trash2 className="w-4 h-4" />
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
