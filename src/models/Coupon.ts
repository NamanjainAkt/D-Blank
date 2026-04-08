import mongoose, { Schema, models, model } from 'mongoose';

export interface ICoupon {
  code: string;
  description: string;
  discountAmount: number;
  minPurchase: number;
  maxUses: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  createdAt: Date;
}

const couponSchema = new Schema<ICoupon>({
  code: { type: String, required: true, uppercase: true },
  description: { type: String, default: '' },
  discountAmount: { type: Number, required: true, min: 0 },
  minPurchase: { type: Number, default: 0, min: 0 },
  maxUses: { type: Number, required: true, min: 1 },
  usedCount: { type: Number, default: 0, min: 0 },
  validFrom: { type: Date, default: Date.now },
  validUntil: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Indexes for common query patterns
couponSchema.index({ code: 1 }, { unique: true });
couponSchema.index({ isActive: 1 });
couponSchema.index({ validUntil: 1 });

export const Coupon = models.Coupon || model('Coupon', couponSchema);
