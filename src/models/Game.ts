import mongoose, { Schema, models, model } from 'mongoose';

const gameSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  genre: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String },
  
  // Assets
  thumbnailUrl: { type: String, required: true },
  galleryUrls: [{ type: String }],
  trailerUrl: { type: String }, // YouTube Embed ID or URL
  
  // Details
  platforms: [{ type: String }], // ['PC', 'Console', 'Mobile']
  downloadLink: { type: String },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  releaseDate: { type: String }, // e.g. "2025" or ISO string
  
  // Flags
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false },
  
  createdAt: { type: Date, default: Date.now },
});

gameSchema.index({ slug: 1 }, { unique: true });
gameSchema.index({ isPublished: 1 });
gameSchema.index({ isFeatured: 1 });

export const Game = models.Game || model('Game', gameSchema);
