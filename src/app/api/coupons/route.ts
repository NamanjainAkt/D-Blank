import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Coupon } from '@/models/Coupon';
import { couponSchema } from '@/lib/validations';

// GET /api/coupons - List all coupons with optional filters
export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');

    const query: Record<string, unknown> = {};
    if (isActive !== null) query.isActive = isActive === 'true';

    const coupons = await Coupon.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ coupons });
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 });
  }
}

// POST /api/coupons - Create new coupon
export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const result = couponSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    // Check for duplicate code
    const existingCoupon = await Coupon.findOne({ code: result.data.code });
    if (existingCoupon) {
      return NextResponse.json(
        { error: 'Coupon code already exists' },
        { status: 400 }
      );
    }

    const coupon = await Coupon.create({
      ...result.data,
      validUntil: new Date(result.data.validUntil),
      validFrom: new Date(),
      usedCount: 0,
    });

    return NextResponse.json({ coupon }, { status: 201 });
  } catch (error) {
    console.error('Error creating coupon:', error);
    return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 });
  }
}