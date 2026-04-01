import mongoose, { Schema, models, model } from 'mongoose';

const enrollmentSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  courseName: { type: String, required: true },
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  whatsappNumber: { type: String },
  collegeName: { type: String, required: true },
  branch: { type: String, required: true },
  semester: { type: String, required: true },
  rollNumber: { type: String, required: true },
  city: { type: String, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: { type: String },
  paymentAmount: { type: Number },
  paymentDate: { type: Date },
  enrollmentStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  confirmationEmailSent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

enrollmentSchema.index({ courseId: 1 });
enrollmentSchema.index({ phone: 1 });
enrollmentSchema.index({ email: 1 });
enrollmentSchema.index({ paymentStatus: 1 });
enrollmentSchema.index({ createdAt: -1 });

export const Enrollment = models.Enrollment || model('Enrollment', enrollmentSchema);
