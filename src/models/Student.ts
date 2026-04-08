import mongoose, { Schema, models, model } from 'mongoose';

const studentSchema = new Schema({
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

studentSchema.index({ email: 1 });
studentSchema.index({ phone: 1 });

// Sync logic: Update all enrollments if student name/email changes
studentSchema.post('save', async function(doc) {
  try {
    const Enrollment = mongoose.models.Enrollment;
    if (Enrollment) {
      await Enrollment.updateMany(
        { studentId: doc._id },
        { 
          studentName: doc.name,
          studentEmail: doc.email 
        }
      );
    }
  } catch (err) {
    console.error('Error syncing student data to enrollments:', err);
  }
});

export const Student = models.Student || model('Student', studentSchema);
