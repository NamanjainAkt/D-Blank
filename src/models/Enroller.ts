import mongoose, { Schema, models, model } from 'mongoose';

const enrollerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  whatsappNumber: { type: String },
  collegeName: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true }, // e.g., '1st', '2nd', '3rd', '4th', 'Graduated'
  semester: { type: String, required: true },
  rollNumber: { type: String, required: true },
  city: { type: String, required: true },
  referrer: { type: String }, // "How did you hear about us?"
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

enrollerSchema.index({ email: 1 });
enrollerSchema.index({ phone: 1 });

export const Enroller = models.Enroller || model('Enroller', enrollerSchema);
