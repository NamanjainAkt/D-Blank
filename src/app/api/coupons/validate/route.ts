import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Coupon } from '@/models/Coupon';
import { couponValidateSchema } from '@/lib/validations';

// POST /api/coupons/validate - Validate coupon code for checkout
export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const result = couponValidateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { code, coursePrice } = result.data;

    // Find coupon by code (case-insensitive)
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return NextResponse.json(
        { valid: false, error: 'Invalid coupon code' },
        { status: 400 }
      );
    }

    // Check if coupon is active
    if (!coupon.isActive) {
      return NextResponse.json(
        { valid: false, error: 'Coupon is no longer active' },
        { status: 400 }
      );
    }

    // Check if coupon has expired
    if (new Date(coupon.validUntil) < new Date()) {
      return NextResponse.json(
        { valid: false, error: 'Coupon has expired' },
        { status: 400 }
      );
    }

    // Check if max uses reached
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json(
        { valid: false, error: 'Coupon usage limit reached' },
        { status: 400 }
      );
    }

    // Check minimum purchase requirement
    if (coupon.minPurchase && coursePrice < coupon.minPurchase) {
      return NextResponse.json(
        { 
          valid: false, 
          error: `Minimum purchase of ₹${coupon.minPurchase} required` 
        },
        { status: 400 }
      );
    }

    // Calculate discount
    const discount = Math.min(coupon.discountAmount, coursePrice);
    const finalPrice = Math.max(0, coursePrice - discount);

    return NextResponse.json({
      valid: true,
      coupon: {
        code: coupon.code,
        description: coupon.description,
        discountAmount: coupon.discountAmount,
        originalPrice: coursePrice,
        discountedPrice: finalPrice,
        savings: discount,
      },
    });
  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json({ error: 'Failed to validate coupon' }, { status: 500 });
  }
}