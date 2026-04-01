import mongoose, { Schema, models, model } from 'mongoose';

const courseSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  shortDescription: { type: String, required: true, maxlength: 120 },
  fullDescription: { type: String, required: true },
  duration: { type: String, required: true },
  schedule: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, required: true },
  tags: [{ type: String }],
  thumbnailUrl: { type: String },
  syllabusUrl: { type: String },
  totalSeats: { type: Number, default: 50 },
  enrolledCount: { type: Number, default: 0 },
  meetLink: { type: String },
  instructorName: { type: String },
  isPublished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

courseSchema.index({ slug: 1 }, { unique: true });
courseSchema.index({ isPublished: 1 });
courseSchema.index({ category: 1 });

export const Course = models.Course || model('Course', courseSchema);
