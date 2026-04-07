import mongoose, { Schema, models, model } from 'mongoose';

const moduleSchema = new Schema({
  title: { type: String, required: true },
  lessons: [{ type: String }],
});

const courseSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  shortDescription: { type: String, required: true, maxlength: 120 },
  fullDescription: { type: String, required: true },
  level: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  category: { type: String, required: true },
  tags: [{ type: String }],
  
  // Pricing
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: Number }, // Auto-calculated in frontend
  earlyBirdPrice: { type: Number },
  earlyBirdDeadline: { type: Date },
  
  // Content
  duration: { type: String, required: true }, // e.g. "45 Hours"
  totalHours: { type: Number },
  schedule: { type: String, required: true }, // e.g. "Mon-Fri 7PM"
  batchStartDate: { type: Date },
  enrollmentDeadline: { type: Date },
  
  learningOutcomes: [{ type: String }],
  curriculum: [moduleSchema],
  prerequisites: [{ type: String }],
  softwareRequired: [{ type: String }],
  
  // Media
  thumbnailUrl: { type: String },
  syllabusUrl: { type: String },
  promoVideoUrl: { type: String }, // YouTube/Cloudinary URL
  
  // Stats & Management
  totalSeats: { type: Number, default: 50 },
  enrolledCount: { type: Number, default: 0 },
  instructorName: { type: String },
  instructorImage: { type: String },
  
  // Linkages
  meetLink: { type: String },
  whatsappGroupLink: { type: String },
  supportEmail: { type: String, default: 'support@dblanks.site' },
  
  // Features
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false },
  lifetimeAccess: { type: Boolean, default: true },
  certificateIncluded: { type: Boolean, default: true },
  recordingAccess: { type: Boolean, default: true },
  projectsCount: { type: Number, default: 0 },
  language: { type: String, default: 'Hindi/English' },
  
  createdAt: { type: Date, default: Date.now },
});

courseSchema.index({ slug: 1 }, { unique: true });
courseSchema.index({ isPublished: 1 });
courseSchema.index({ category: 1 });
courseSchema.index({ isFeatured: 1 });

export const Course = models.Course || model('Course', courseSchema);
