'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema, type CourseFormData } from '@/lib/validations';
import { ImageUploader } from '@/components/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Loader2, 
  Plus, 
  X, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  Trophy, 
  Video, 
  HelpCircle,
  GripVertical,
  Layers,
  ListChecks,
  Code
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface CourseFormProps {
  initialData?: any;
  onSubmit: (data: CourseFormData) => Promise<void>;
  loading: boolean;
}

const categories = ['IT & Software', 'Electronics', 'Mechanical', 'Civil', 'Tech', 'Design', 'Creative', 'Business', 'Marketing', 'Soft Skills'];
const levels = ['Beginner', 'Intermediate', 'Advanced'] as const;

export default function CourseForm({ initialData, onSubmit, loading }: CourseFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: initialData || {
      title: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      level: 'Beginner',
      category: 'Tech',
      price: 0,
      originalPrice: 0,
      duration: '',
      schedule: '',
      totalSeats: 50,
      isPublished: true,
      lifetimeAccess: true,
      certificateIncluded: true,
      recordingAccess: true,
      language: 'Hindi/English',
      learningOutcomes: [''],
      prerequisites: [''],
      softwareRequired: [''],
      curriculum: [{ title: 'Module 1: Introduction', lessons: ['First Lesson'] }],
    },
  });

  // Sync form state with initialData when it changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        title: '',
        slug: '',
        shortDescription: '',
        fullDescription: '',
        level: 'Beginner',
        category: 'Tech',
        price: 0,
        originalPrice: 0,
        earlyBirdPrice: 0,
        earlyBirdDeadline: '',
        duration: '',
        schedule: '',
        batchStartDate: '',
        enrollmentDeadline: '',
        totalSeats: 50,
        projectsCount: 0,
        isPublished: true,
        lifetimeAccess: true,
        certificateIncluded: true,
        recordingAccess: true,
        language: 'Hindi/English',
        learningOutcomes: [''],
        prerequisites: [''],
        softwareRequired: [''],
        curriculum: [{ title: 'Module 1: Introduction', lessons: ['First Lesson'] }],
        tags: [],
      });
    }
  }, [initialData, reset]);

  const { fields: outcomeFields, append: addOutcome, remove: removeOutcome } = useFieldArray({
    control,
    name: 'learningOutcomes' as any,
  });

  const { fields: prereqFields, append: addPrerequisite, remove: removePrerequisite } = useFieldArray({
    control,
    name: 'prerequisites' as any,
  });

  const { fields: softwareFields, append: addSoftware, remove: removeSoftware } = useFieldArray({
    control,
    name: 'softwareRequired' as any,
  });

  const { fields: curriculumFields, append: addModule, remove: removeModule } = useFieldArray({
    control,
    name: 'curriculum' as any,
  });

  const watchTitle = watch('title');
  const watchPrice = watch('price') || 0;
  const watchOriginalPrice = watch('originalPrice') || 0;
  const watchThumbnail = watch('thumbnailUrl');
  const watchSyllabus = watch('syllabusUrl');

  useEffect(() => {
    // Only auto-generate slug if it's empty or we're creating a new course
    const currentSlug = watch('slug');
    if (watchTitle && (!currentSlug || !initialData)) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setValue('slug', slug, { shouldValidate: true });
    }
  }, [watchTitle, setValue, initialData, watch]);

  const discount = watchOriginalPrice > watchPrice 
    ? Math.round(((watchOriginalPrice - watchPrice) / watchOriginalPrice) * 100) 
    : 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-10">
      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="bg-black/40 border border-white/5 p-1 mb-8 w-full justify-start overflow-x-auto custom-scrollbar h-auto flex-nowrap">
          <TabsTrigger value="basics" className={cn(
            "data-[state=active]:bg-acid-green data-[state=active]:text-black text-[10px] font-mono uppercase tracking-widest px-6 py-2.5",
            (errors.title || errors.slug || errors.price || errors.category || errors.shortDescription || errors.fullDescription) && "border-b-2 border-red-500"
          )}>
            01. Basic Info { (errors.title || errors.slug || errors.price || errors.category) && "*" }
          </TabsTrigger>
          <TabsTrigger value="content" className={cn(
            "data-[state=active]:bg-acid-green data-[state=active]:text-black text-[10px] font-mono uppercase tracking-widest px-6 py-2.5",
            (errors.duration || errors.schedule) && "border-b-2 border-red-500"
          )}>
            02. Details { (errors.duration || errors.schedule) && "*" }
          </TabsTrigger>
          <TabsTrigger value="curriculum" className="data-[state=active]:bg-acid-green data-[state=active]:text-black text-[10px] font-mono uppercase tracking-widest px-6 py-2.5">
            03. Curriculum
          </TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-acid-green data-[state=active]:text-black text-[10px] font-mono uppercase tracking-widest px-6 py-2.5">
            04. Media
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-acid-green data-[state=active]:text-black text-[10px] font-mono uppercase tracking-widest px-6 py-2.5">
            05. Settings
          </TabsTrigger>
        </TabsList>

        {/* 01. BASICS */}
        <TabsContent value="basics" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Course Title *</Label>
                <Input id="title" {...register('title')} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
                {errors.title && <p className="text-red-400 text-[10px] font-mono uppercase">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">URL Slug *</Label>
                <Input id="slug" {...register('slug')} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
                {errors.slug && <p className="text-red-400 text-[10px] font-mono uppercase mt-1">{errors.slug.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Category *</Label>
                  <Select value={watch('category')} onValueChange={(v) => setValue('category', v, { shouldValidate: true })}>
                    <SelectTrigger className="bg-black/40 border-white/5 text-[10px] font-mono uppercase tracking-widest h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-ink border-white/5">
                      {categories.map((c) => (
                        <SelectItem key={c} value={c} className="text-[10px] font-mono uppercase tracking-widest">{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-red-400 text-[10px] font-mono uppercase mt-1">{errors.category.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Difficulty Level *</Label>
                  <Select value={watch('level')} onValueChange={(v: any) => setValue('level', v, { shouldValidate: true })}>
                    <SelectTrigger className="bg-black/40 border-white/5 text-[10px] font-mono uppercase tracking-widest h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-ink border-white/5">
                      {levels.map((l) => (
                        <SelectItem key={l} value={l} className="text-[10px] font-mono uppercase tracking-widest">{l}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.level && <p className="text-red-400 text-[10px] font-mono uppercase mt-1">{errors.level.message}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Price (₹) *</Label>
                  <Input type="number" {...register('price', { valueAsNumber: true })} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
                  {errors.price && <p className="text-red-400 text-[10px] font-mono uppercase mt-1">{errors.price.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="originalPrice" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Original Price (₹)</Label>
                  <Input type="number" {...register('originalPrice', { valueAsNumber: true })} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="earlyBirdPrice" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Discounted Price (₹)</Label>
                  <Input type="number" {...register('earlyBirdPrice', { valueAsNumber: true })} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="earlyBirdDeadline" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Discount Deadline</Label>
                  <Input type="date" {...register('earlyBirdDeadline')} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono [&::-webkit-calendar-picker-indicator]:filter-invert" />
                </div>
              </div>
              {discount > 0 && (
                <div className="p-3 bg-acid-green/5 border border-acid-green/20 rounded flex items-center justify-between">
                  <span className="text-[10px] font-mono text-acid-green uppercase tracking-widest">Discount</span>
                  <Badge className="bg-acid-green text-black font-mono text-[10px]">{discount}% OFF</Badge>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalSeats" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Total Seats *</Label>
                  <Input type="number" {...register('totalSeats', { valueAsNumber: true })} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Language</Label>
                  <Input {...register('language')} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Short Description * (Max 120 chars)</Label>
            <Input id="shortDescription" {...register('shortDescription')} maxLength={120} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
            {errors.shortDescription && <p className="text-red-400 text-[10px] font-mono uppercase mt-1">{errors.shortDescription.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullDescription" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Full Description *</Label>
            <Textarea id="fullDescription" {...register('fullDescription')} rows={6} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono resize-none" />
            {errors.fullDescription && <p className="text-red-400 text-[10px] font-mono uppercase mt-1">{errors.fullDescription.message}</p>}
          </div>
        </TabsContent>

        {/* 02. CONTENT/INTELLIGENCE */}
        <TabsContent value="content" className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                  <Trophy className="w-3 h-3 text-acid-green" /> What You'll Learn
                </h4>
                <Button type="button" variant="outline" size="sm" onClick={() => addOutcome('')} className="h-7 px-3 border-white/5 bg-white/5 hover:bg-white/10 text-[9px] font-mono uppercase tracking-tighter">
                  <Plus className="w-3 h-3 mr-1" /> Add Outcome
                </Button>
              </div>
              <div className="space-y-3">
                {outcomeFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input {...register(`learningOutcomes.${index}` as any)} className="bg-black/40 border-white/5 text-xs font-mono h-9" placeholder="e.g. Master React Engine" />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeOutcome(index)} className="h-9 w-9 p-0 border-white/5 text-red-500 hover:bg-red-500/10">
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                  <Layers className="w-3 h-3 text-acid-green" /> Software Needed
                </h4>
                <Button type="button" variant="outline" size="sm" onClick={() => addSoftware('')} className="h-7 px-3 border-white/5 bg-white/5 hover:bg-white/10 text-[9px] font-mono uppercase tracking-tighter">
                  <Plus className="w-3 h-3 mr-1" /> Add Software
                </Button>
              </div>
              <div className="space-y-3">
                {softwareFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input {...register(`softwareRequired.${index}` as any)} className="bg-black/40 border-white/5 text-xs font-mono h-9" placeholder="e.g. VS Code, Node.js" />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeSoftware(index)} className="h-9 w-9 p-0 border-white/5 text-red-500 hover:bg-red-500/10">
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                  <ListChecks className="w-3 h-3 text-acid-green" /> Prerequisites
                </h4>
                <Button type="button" variant="outline" size="sm" onClick={() => addPrerequisite('')} className="h-7 px-3 border-white/5 bg-white/5 hover:bg-white/10 text-[9px] font-mono uppercase tracking-tighter">
                  <Plus className="w-3 h-3 mr-1" /> Add Prerequisite
                </Button>
              </div>
              <div className="space-y-3">
                {prereqFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input {...register(`prerequisites.${index}` as any)} className="bg-black/40 border-white/5 text-xs font-mono h-9" placeholder="e.g. Basic HTML Knowledge" />
                    <Button type="button" variant="outline" size="sm" onClick={() => removePrerequisite(index)} className="h-9 w-9 p-0 border-white/5 text-red-500 hover:bg-red-500/10">
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                <Calendar className="w-3 h-3 text-acid-green" /> Duration & Schedule
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Duration *</Label>
                  <Input {...register('duration')} placeholder="e.g. 6 Weeks" className="bg-black/40 border-white/5 text-xs font-mono h-9" />
                  {errors.duration && <p className="text-red-400 text-[10px] font-mono uppercase mt-1">{errors.duration.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalHours" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Total Hours</Label>
                  <Input type="number" {...register('totalHours', { valueAsNumber: true })} className="bg-black/40 border-white/5 text-xs font-mono h-9" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batchStartDate" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Batch Start Date</Label>
                  <Input type="date" {...register('batchStartDate')} className="bg-black/40 border-white/5 text-xs font-mono h-9 [&::-webkit-calendar-picker-indicator]:filter-invert" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="enrollmentDeadline" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Enrollment Deadline</Label>
                  <Input type="date" {...register('enrollmentDeadline')} className="bg-black/40 border-white/5 text-xs font-mono h-9 [&::-webkit-calendar-picker-indicator]:filter-invert" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schedule" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Class Schedule *</Label>
                  <Input {...register('schedule')} placeholder="e.g. Tue, Thu 8PM-10PM" className="bg-black/40 border-white/5 text-xs font-mono h-9" />
                  {errors.schedule && <p className="text-red-400 text-[10px] font-mono uppercase mt-1">{errors.schedule.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectsCount" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Number of Projects</Label>
                  <Input type="number" {...register('projectsCount', { valueAsNumber: true })} className="bg-black/40 border-white/5 text-xs font-mono h-9" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 03. CURRICULUM */}
        <TabsContent value="curriculum" className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
              <Code className="w-3 h-3 text-acid-green" /> Course Curriculum
            </h4>
            <Button type="button" variant="outline" size="sm" onClick={() => addModule({ title: '', lessons: [''] })} className="h-8 px-4 border-white/5 bg-white/5 hover:bg-acid-green hover:text-black transition-all text-[9px] font-mono uppercase tracking-widest">
              <Plus className="w-3 h-3 mr-2" /> Add Module
            </Button>
          </div>

          <div className="space-y-6">
            {curriculumFields.map((module, moduleIndex) => (
              <div key={module.id} className="p-6 bg-black/40 border border-white/5 rounded-lg space-y-6 relative group/module">
                <button type="button" onClick={() => removeModule(moduleIndex)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover/module:opacity-100">
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-[10px] font-mono text-zinc-500 border border-white/10">
                    {String(moduleIndex + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 space-y-1">
                    <Label className="text-[8px] font-mono uppercase tracking-widest text-zinc-600">Module Title</Label>
                    <Input {...register(`curriculum.${moduleIndex}.title` as any)} className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-acid-green/50 text-sm font-mono font-bold uppercase tracking-tight" placeholder="MODULE TITLE..." />
                  </div>
                </div>

                <div className="pl-12 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-[8px] font-mono uppercase tracking-widest text-zinc-600">Lessons (one per line)</Label>
                    </div>
                  <div className="space-y-2">
                    {/* Handled as comma-separated or similar for simplicity in this version, or we could add another fieldArray */}
                    <Textarea 
                      placeholder="Enter lessons (one per line)..."
                      className="bg-black/20 border-white/5 text-[11px] font-mono resize-none min-h-[80px]"
                      onBlur={(e) => {
                        const lessons = e.target.value
                          .split('\n')
                          .map(l => l.trim())
                          .filter(l => l.length > 0);
                        setValue(`curriculum.${moduleIndex}.lessons` as any, lessons, { shouldValidate: true });
                        // Re-sync the value in the textarea to cleaned version optionally
                        e.target.value = lessons.join('\n');
                      }}
                      defaultValue={(module as any).lessons?.join('\n')}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* 04. MEDIA */}
        <TabsContent value="media" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Course Image (Thumbnail)</Label>
                <ImageUploader
                  value={watchThumbnail || ''}
                  onChange={(url) => setValue('thumbnailUrl', url)}
                  type="image"
                  label="Upload Course Image"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Syllabus PDF</Label>
                <ImageUploader
                  value={watchSyllabus || ''}
                  onChange={(url) => setValue('syllabusUrl', url)}
                  type="pdf"
                  label="Upload Syllabus PDF"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="promoVideoUrl" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <Video className="w-3 h-3" /> Promo Video URL (YouTube)
                </Label>
                <Input {...register('promoVideoUrl')} placeholder="https://youtube.com/watch?v=..." className="bg-black/40 border-white/5 text-xs font-mono h-9" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instructorName" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Instructor Name</Label>
                <Input {...register('instructorName')} className="bg-black/40 border-white/5 text-xs font-mono h-9" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructorImage" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Instructor Photo URL</Label>
                <Input {...register('instructorImage')} placeholder="Cloudinary/Image URL" className="bg-black/40 border-white/5 text-xs font-mono h-9" />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 05. SETTINGS */}
        <TabsContent value="settings" className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                <HelpCircle className="w-3 h-3 text-acid-green" /> Contact Links
              </h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meetLink" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Google Meet Link</Label>
                  <Input {...register('meetLink')} placeholder="https://meet.google.com/..." className="bg-black/40 border-white/5 text-xs font-mono h-9" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsappGroupLink" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">WhatsApp Group Link</Label>
                  <Input {...register('whatsappGroupLink')} className="bg-black/40 border-white/5 text-xs font-mono h-9" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Support Email</Label>
                  <Input {...register('supportEmail')} className="bg-black/40 border-white/5 text-xs font-mono h-9" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                <GraduationCap className="w-3 h-3 text-acid-green" /> Course Options
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'isFeatured', label: 'Featured' },
                  { id: 'isPublished', label: 'Published (Visible to Users)' },
                  { id: 'lifetimeAccess', label: 'Lifetime Access' },
                  { id: 'certificateIncluded', label: 'Certificate Included' },
                  { id: 'recordingAccess', label: 'Recording Access' },
                ].map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 bg-black/40 p-3 border border-white/5 rounded-sm">
                    <Checkbox 
                      id={item.id} 
                      checked={watch(item.id as any)}
                      onCheckedChange={(checked) => setValue(item.id as any, checked as boolean)}
                      className="border-white/20"
                    />
                    <Label htmlFor={item.id} className="text-[9px] font-mono uppercase tracking-widest text-zinc-300 cursor-pointer">
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex justify-end gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-acid-green text-black hover:bg-acid-green/90 text-[10px] font-mono font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(57,255,20,0.3)] h-12 px-10"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" aria-hidden="true" />
                  Saving...
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4 mr-2" />
                  {initialData ? 'Update Course' : 'Save Course'}
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}
