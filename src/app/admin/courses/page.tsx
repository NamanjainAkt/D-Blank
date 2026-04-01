'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
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
import { Plus, Edit, BookOpen } from 'lucide-react';

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

const categories = ['IT & Software', 'Electronics', 'Mechanical', 'Civil', 'tech', 'design', 'creative'];

export default function AdminCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
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
  });

  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/courses');
      const data = await res.json();
      setCourses(data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

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

      if (res.ok) {
        setIsModalOpen(false);
        setEditingCourse(null);
        resetForm();
        fetchCourses();
      }
    } catch (error) {
      console.error('Error saving course:', error);
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
      await fetch(`/api/admin/courses/${course._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !course.isPublished }),
      });
      fetchCourses();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const resetForm = () => {
    setFormData({
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
    });
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
          <p className="text-sm text-zinc-500">{courses.length} courses</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingCourse(null); resetForm(); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-900 border-zinc-800">
            <DialogHeader>
              <DialogTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      title: e.target.value,
                      slug: generateSlug(e.target.value)
                    })}
                    required
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    className="bg-zinc-800 border-zinc-700 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={formData.category} onValueChange={(v: string) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalSeats">Total Seats *</Label>
                  <Input
                    id="totalSeats"
                    type="number"
                    value={formData.totalSeats}
                    onChange={(e) => setFormData({ ...formData, totalSeats: parseInt(e.target.value) })}
                    min="1"
                    required
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (Rs) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                    min="0"
                    required
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price (Rs)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) })}
                    min="0"
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 45 Hours | 6 Weeks"
                    required
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule *</Label>
                  <Input
                    id="schedule"
                    value={formData.schedule}
                    onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                    placeholder="e.g. Weekdays 7PM-9PM"
                    required
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="One-liner for course cards (max 120 chars)"
                  maxLength={120}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullDescription">Full Description *</Label>
                <Textarea
                  id="fullDescription"
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Detailed course description"
                  required
                  className="bg-zinc-800 border-zinc-700 min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g. Python, IoT, Automation"
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Course Thumbnail</Label>
                  <ImageUploader
                    value={formData.thumbnailUrl}
                    onChange={(url) => setFormData({ ...formData, thumbnailUrl: url })}
                    type="image"
                    label="Upload Thumbnail"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Syllabus PDF</Label>
                  <ImageUploader
                    value={formData.syllabusUrl}
                    onChange={(url) => setFormData({ ...formData, syllabusUrl: url })}
                    type="pdf"
                    label="Upload Syllabus"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instructorName">Instructor Name</Label>
                  <Input
                    id="instructorName"
                    value={formData.instructorName}
                    onChange={(e) => setFormData({ ...formData, instructorName: e.target.value })}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meetLink">Google Meet Link</Label>
                  <Input
                    id="meetLink"
                    type="url"
                    value={formData.meetLink}
                    onChange={(e) => setFormData({ ...formData, meetLink: e.target.value })}
                    placeholder="https://meet.google.com/..."
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isPublished" 
                  checked={formData.isPublished}
                  onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked as boolean })}
                />
                <Label htmlFor="isPublished" className="text-sm font-normal">
                  Publish immediately
                </Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border-zinc-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1"
                >
                  {saving ? 'Saving...' : (editingCourse ? 'Update Course' : 'Create Course')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800">
                <TableHead className="text-zinc-500">Course</TableHead>
                <TableHead className="text-zinc-500">Category</TableHead>
                <TableHead className="text-zinc-500">Price</TableHead>
                <TableHead className="text-zinc-500">Seats</TableHead>
                <TableHead className="text-zinc-500">Status</TableHead>
                <TableHead className="text-zinc-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-zinc-500">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : courses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-zinc-500">
                    No courses yet. Add your first course!
                  </TableCell>
                </TableRow>
              ) : (
                courses.map((course) => (
                  <TableRow key={course._id} className="border-zinc-800/50">
                    <TableCell>
                      <div className="font-medium">{course.title}</div>
                      <div className="text-xs text-zinc-500 font-mono">/{course.slug}</div>
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      {course.category}
                    </TableCell>
                    <TableCell className="font-mono">
                      {formatCurrency(course.price)}
                      {course.originalPrice && (
                        <span className="text-zinc-500 line-through ml-2">
                          {formatCurrency(course.originalPrice)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm ${
                        (course.enrolledCount / course.totalSeats) >= 0.9 ? 'text-red-400' :
                        (course.enrolledCount / course.totalSeats) >= 0.6 ? 'text-amber-400' : 'text-zinc-400'
                      }`}>
                        {course.enrolledCount}/{course.totalSeats}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTogglePublish(course)}
                        className={course.isPublished ? 'text-emerald-400' : 'text-zinc-500'}
                      >
                        <Badge 
                          variant={course.isPublished ? 'default' : 'secondary'}
                          className={course.isPublished ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-zinc-800'}
                        >
                          {course.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(course)}
                        className="text-zinc-400 hover:text-white"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
