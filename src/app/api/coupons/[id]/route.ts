import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Coupon } from '@/models/Coupon';
import { couponSchema } from '@/lib/validations';
import { z } from 'zod';

// Partial coupon schema for updates
const couponUpdateSchema = couponSchema.partial().extend({
  validUntil: z.string().optional(),
});

type CouponUpdateData = z.infer<typeof couponUpdateSchema>;

// GET /api/coupons/[id] - Get single coupon
// PUT /api/coupons/[id] - Update coupon
// DELETE /api/coupons/[id] - Delete coupon
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    return NextResponse.json({ coupon });
  } catch (error) {
    console.error('Error fetching coupon:', error);
    return NextResponse.json({ error: 'Failed to fetch coupon' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const body = await request.json();
    const result = couponUpdateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    // Check code uniqueness if updating code
    if (result.data.code) {
      const existing = await Coupon.findOne({
        code: result.data.code,
        _id: { $ne: id },
      });
      if (existing) {
        return NextResponse.json(
          { error: 'Coupon code already exists' },
          { status: 400 }
        );
      }
    }

    const updateData: Record<string, unknown> = { ...result.data };
    if (result.data.validUntil) {
      updateData.validUntil = new Date(result.data.validUntil);
    }

    const coupon = await Coupon.findByIdAndUpdate(id, updateData, { new: true });

    if (!coupon) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    return NextResponse.json({ coupon });
  } catch (error) {
    console.error('Error updating coupon:', error);
    return NextResponse.json({ error: 'Failed to update coupon' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    return NextResponse.json({ error: 'Failed to delete coupon' }, { status: 500 });
  }
}