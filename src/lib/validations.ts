import { z } from 'zod';

// Student Schema
export const studentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number (10 digits)'),
  whatsappNumber: z.string().regex(/^[6-9]\d{9}$/, 'Invalid WhatsApp number').optional().or(z.literal('')),
  collegeName: z.string().min(2, 'College name is required'),
  branch: z.string().min(2, 'Branch is required'),
  year: z.string().min(1, 'Year is required'),
  semester: z.string().min(1, 'Semester is required'),
  rollNumber: z.string().min(1, 'Roll number is required'),
  city: z.string().min(2, 'City is required'),
  referrer: z.string().optional().or(z.literal('')),
});

// Enrollment Schema
export const enrollmentSchema = z.object({
  courseId: z.string().min(1, 'Course is required'),
  studentId: z.string().optional(), // For logged in/existing students
  studentData: studentSchema.optional(), // For new students
  paymentMethod: z.string().optional(),
  paymentReferenceId: z.string().optional(), // Manual transaction ID
  paymentReceiptUrl: z.string().url('Invalid receipt URL').optional().or(z.literal('')), // Optional but recommended
});

// Course Module Schema
export const courseModuleSchema = z.object({
  title: z.string().min(1, 'Module title is required'),
  lessons: z.array(z.string()).min(1, 'At least one lesson required'),
});

// Course Schema
export const courseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  shortDescription: z.string().max(120, 'Short description must be under 120 characters'),
  fullDescription: z.string().min(20, 'Full description must be at least 20 characters'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).default('Beginner'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(),
  
  price: z.coerce.number().min(0, 'Price must be positive'),
  originalPrice: z.coerce.number().optional(),
  earlyBirdPrice: z.coerce.number().optional(),
  earlyBirdDeadline: z.string().optional().or(z.literal('')),
  
  duration: z.string().min(1, 'Duration is required'),
  totalHours: z.coerce.number().optional(),
  schedule: z.string().min(1, 'Schedule is required'),
  batchStartDate: z.string().optional().or(z.literal('')),
  enrollmentDeadline: z.string().optional().or(z.literal('')),
  
  learningOutcomes: z.array(z.string()).optional(),
  curriculum: z.array(courseModuleSchema).optional(),
  prerequisites: z.array(z.string()).optional(),
  softwareRequired: z.array(z.string()).optional(),
  
  thumbnailUrl: z.string().optional().or(z.literal('')),
  syllabusUrl: z.string().optional().or(z.literal('')),
  promoVideoUrl: z.string().optional().or(z.literal('')),
  
  totalSeats: z.coerce.number().min(1, 'At least 1 seat required'),
  instructorName: z.string().optional(),
  instructorImage: z.string().optional().or(z.literal('')),
  meetLink: z.string().optional().or(z.literal('')),
  whatsappGroupLink: z.string().optional().or(z.literal('')),
  supportEmail: z.string().optional().or(z.literal('')),
  
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  lifetimeAccess: z.boolean().default(true),
  certificateIncluded: z.boolean().default(true),
  recordingAccess: z.boolean().default(true),
  projectsCount: z.coerce.number().default(0),
  language: z.string().default('Hindi/English'),
});

// Game Schema
export const gameSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  genre: z.string().min(1, 'Genre is required'),
  shortDescription: z.string().min(10, 'Short description must be at least 10 characters'),
  fullDescription: z.string().optional(),
  thumbnailUrl: z.string().url('Invalid thumbnail URL'),
  galleryUrls: z.array(z.string().url()).optional(),
  trailerUrl: z.string().optional().or(z.literal('')),
  platforms: z.array(z.string()).min(1, 'At least one platform required'),
  downloadLink: z.string().url().optional().or(z.literal('')),
  rating: z.number().min(0).max(5).default(0),
  releaseDate: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
});

export type EnrollmentFormData = z.infer<typeof enrollmentSchema>;
export type CourseFormData = z.infer<typeof courseSchema>;
export type GameFormData = z.infer<typeof gameSchema>;
export type StudentFormData = z.infer<typeof studentSchema>;

// Member Schema
export const memberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  designation: z.string().min(2, 'Designation is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  skills: z.array(z.string()).default([]),
  image: z.string().optional().or(z.literal('')),
  handle: z.string().min(2, 'Handle is required'),
  type: z.enum(['founder', 'team']),
  status: z.enum(['active', 'inactive']).default('active'),
  socials: z.object({
    twitter: z.string().optional().or(z.literal('')),
    linkedin: z.string().optional().or(z.literal('')),
    github: z.string().optional().or(z.literal('')),
  }).optional(),
});

// Member update schema (all fields optional for partial updates)
export const memberUpdateSchema = memberSchema.partial();

// Coupon Schema
export const couponSchema = z.object({
  code: z.string().min(3, 'Code must be at least 3 characters').max(20, 'Code too long').transform(val => val.toUpperCase()),
  description: z.string().optional().or(z.literal('')),
  discountAmount: z.coerce.number().positive('Discount must be positive'),
  minPurchase: z.coerce.number().min(0).default(0),
  maxUses: z.coerce.number().int().min(1, 'At least 1 use required'),
  validUntil: z.string().refine(val => new Date(val) > new Date(), { message: 'Valid until must be a future date' }),
});

// Coupon validate request
export const couponValidateSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  coursePrice: z.coerce.number().min(0).default(0),
});

export type MemberFormData = z.infer<typeof memberSchema>;
export type MemberUpdateData = z.infer<typeof memberUpdateSchema>;
export type CouponFormData = z.infer<typeof couponSchema>;
export type CouponValidateData = z.infer<typeof couponValidateSchema>;
