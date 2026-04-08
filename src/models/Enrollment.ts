import mongoose, { Schema, models, model } from 'mongoose';

const enrollmentSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  courseName: { type: String, required: true },
  
  // Flattened student name for quick access in lists
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: { type: String },
  paymentAmount: { type: Number },
  paymentDate: { type: Date },
  paymentMethod: { type: String }, // 'UPI', 'Card', 'NetBanking', etc.
  
  enrollmentStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  confirmationEmailSent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

enrollmentSchema.index({ studentId: 1 });
enrollmentSchema.index({ courseId: 1 });
enrollmentSchema.index({ paymentStatus: 1 });
enrollmentSchema.index({ createdAt: -1 });

export const Enrollment = models.Enrollment || model('Enrollment', enrollmentSchema);
