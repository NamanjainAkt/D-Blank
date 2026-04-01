import { z } from 'zod';

export const enrollmentSchema = z.object({
  courseId: z.string().min(1, 'Course is required'),
  studentName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number (10 digits)'),
  whatsappNumber: z.string().regex(/^[6-9]\d{9}$/, 'Invalid WhatsApp number').optional().or(z.literal('')),
  collegeName: z.string().min(2, 'College name is required'),
  branch: z.string().min(2, 'Branch is required'),
  semester: z.string().min(1, 'Semester is required'),
  rollNumber: z.string().min(1, 'Roll number is required'),
  city: z.string().min(2, 'City is required'),
});

export type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

export const courseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  shortDescription: z.string().max(120, 'Short description must be under 120 characters'),
  fullDescription: z.string().min(20, 'Full description must be at least 20 characters'),
  duration: z.string().min(1, 'Duration is required'),
  schedule: z.string().min(1, 'Schedule is required'),
  price: z.number().min(0, 'Price must be positive'),
  originalPrice: z.number().optional(),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(),
  thumbnailUrl: z.string().url().optional().or(z.literal('')),
  syllabusUrl: z.string().url().optional().or(z.literal('')),
  totalSeats: z.number().min(1, 'At least 1 seat required'),
  meetLink: z.string().url().optional().or(z.literal('')),
  instructorName: z.string().optional(),
  isPublished: z.boolean().optional(),
});

export type CourseFormData = z.infer<typeof courseSchema>;
