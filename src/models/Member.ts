import mongoose, { Schema, models, model } from 'mongoose';

export interface ISocials {
  twitter?: string;
  linkedin?: string;
  github?: string;
}

export interface IMember {
  name: string;
  designation: string;
  bio: string;
  skills: string[];
  image: string;
  handle: string;
  type: 'founder' | 'team';
  status: 'active' | 'inactive';
  socials: ISocials;
  createdAt: Date;
  updatedAt: Date;
}

const socialsSchema = new Schema<ISocials>({
  twitter: String,
  linkedin: String,
  github: String,
}, { _id: false });

const memberSchema = new Schema<IMember>({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  bio: { type: String, required: true },
  skills: { type: [String], default: [] },
  image: { type: String, default: '' },
  handle: { type: String, required: true },
  type: { type: String, enum: ['founder', 'team'], required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  socials: { type: socialsSchema, default: {} },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes for common query patterns
memberSchema.index({ type: 1 });
memberSchema.index({ status: 1 });
memberSchema.index({ handle: 1 }, { unique: true });

export const Member = models.Member || model('Member', memberSchema);
