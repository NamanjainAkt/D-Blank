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
import { Plus, Edit, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

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

const categories = ['IT & Software', 'Electronics', 'Mechanical', 'Civil', 'Tech', 'Design', 'Creative'];

interface FormState {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  schedule: string;
  price: number;
  originalPrice: number;
  category: string;
  tags: string;
  totalSeats: number;
  instructorName: string;
  meetLink: string;
  isPublished: boolean;
  thumbnailUrl: string;
  syllabusUrl: string;
}

const initialFormState: FormState = {
  title: '',
  slug: '',
  shortDescription: '',
  fullDescription: '',
  duration: '',
  schedule: '',
  price: 0,
  originalPrice: 0,
  category: 'IT & Software',
  tags: '',
  totalSeats: 50,
  instructorName: '',
  meetLink: '',
  isPublished: true,
  thumbnailUrl: '',
  syllabusUrl: '',
};

export default function AdminCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<FormState>(initialFormState);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        originalPrice: formData.originalPrice || undefined,
      };

      const url = editingCourse 
        ? `/api/admin/courses/${editingCourse._id}`
        : '/api/admin/courses';
      
      const res = await fetch(url, {
        method: editingCourse ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save course');
      }

      setIsModalOpen(false);
      setEditingCourse(null);
      setFormData(initialFormState);
      fetchCourses();
      showSuccess(editingCourse ? 'Course updated successfully' : 'Course created successfully');
    } catch (err) {
      console.error('Error saving course:', err);
      setError(err instanceof Error ? err.message : 'Failed to save course');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      slug: course.slug,
      shortDescription: '',
      fullDescription: '',
      duration: '',
      schedule: '',
      price: course.price,
      originalPrice: course.originalPrice || 0,
      category: course.category,
      tags: '',
      totalSeats: course.totalSeats,
      instructorName: course.instructorName || '',
      meetLink: course.meetLink || '',
      isPublished: course.isPublished,
      thumbnailUrl: course.thumbnailUrl || '',
      syllabusUrl: course.syllabusUrl || '',
    });
    setIsModalOpen(true);
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
    setFormData(initialFormState);
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
                onClick={() => { resetForm(); }}
              >
                <Plus className="w-3.5 h-3.5 mr-2" />
                Initialize Module
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-ink border-white/5 max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
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
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Module Designation *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        title: e.target.value,
                        slug: generateSlug(e.target.value)
                      })}
                      required
                      className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Access Key (Slug) *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                      className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono h-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Category *</Label>
                    <Select value={formData.category} onValueChange={(v: string) => setFormData({ ...formData, category: v })}>
                      <SelectTrigger className="bg-black/40 border-white/5 text-[10px] font-mono uppercase tracking-widest h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-ink border-white/5">
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat} className="text-[10px] font-mono uppercase tracking-widest">{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalSeats" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Capacity *</Label>
                    <Input
                      id="totalSeats"
                      type="number"
                      value={formData.totalSeats}
                      onChange={(e) => setFormData({ ...formData, totalSeats: parseInt(e.target.value) || 0 })}
                      min="1"
                      required
                      className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono h-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Credits (Price) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                      min="0"
                      required
                      className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Base Credits</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) || 0 })}
                      min="0"
                      className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono h-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Runtime (Duration) *</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g. 45 Hours | 6 Weeks"
                      required
                      className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Operational Cycle *</Label>
                    <Input
                      id="schedule"
                      value={formData.schedule}
                      onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                      placeholder="e.g. Weekdays 7PM-9PM"
                      required
                      className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Quick Summary</Label>
                  <Input
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono h-10"
                    maxLength={120}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullDescription" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Technical Briefing *</Label>
                  <Textarea
                    id="fullDescription"
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    required
                    className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Module Visual</Label>
                    <ImageUploader
                      value={formData.thumbnailUrl}
                      onChange={(url) => setFormData({ ...formData, thumbnailUrl: url })}
                      type="image"
                      label="Upload Visual"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Syllabus Matrix</Label>
                    <ImageUploader
                      value={formData.syllabusUrl}
                      onChange={(url) => setFormData({ ...formData, syllabusUrl: url })}
                      type="pdf"
                      label="Upload Matrix"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-black/40 p-4 border border-white/5 rounded-sm">
                  <Checkbox 
                    id="isPublished" 
                    checked={formData.isPublished}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked as boolean })}
                    className="border-white/20 data-[state=checked]:bg-acid-green data-[state=checked]:border-acid-green"
                  />
                  <Label htmlFor="isPublished" className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 cursor-pointer">
                    Deploy to Public Uplink
                  </Label>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="border-white/5 hover:bg-white/5 text-[10px] font-mono uppercase tracking-widest"
                    disabled={saving}
                  >
                    Abort
                  </Button>
                  <Button
                    type="submit"
                    disabled={saving}
                    className="bg-acid-green text-black hover:bg-acid-green/90 text-[10px] font-mono font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" aria-hidden="true" />
                        Processing...
                      </>
                    ) : (
                      editingCourse ? 'Update Module' : 'Confirm Initialization'
                    )}
                  </Button>
                </div>
              </form>
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
                            <span>{Math.round((course.enrolledCount / course.totalSeats) * 100)}%</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-acid-green shadow-[0_0_8px_#39FF14]" 
                              style={{ width: `${(course.enrolledCount / course.totalSeats) * 100}%` }}
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 w-8 p-0 border-white/5 bg-white/5 hover:border-acid-green/50 text-acid-green transition-all"
                          onClick={() => handleEdit(course)}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
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
