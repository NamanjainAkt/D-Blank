import mongoose, { Schema, models, model } from 'mongoose';

const adminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  lastLoginAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const Admin = models.Admin || model('Admin', adminSchema);
