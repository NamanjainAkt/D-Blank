import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Enrollment } from '@/models/Enrollment';
import { Student } from '@/models/Student';
import { Course } from '@/models/Course';
import { Coupon } from '@/models/Coupon';
import { enrollmentSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validate input
    const validation = enrollmentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { courseId, studentData, paymentMethod, paymentReferenceId, paymentReceiptUrl, couponCode } = body;

    if (!courseId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: 'Invalid course ID' }, { status: 400 });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // 1. Find or Create Student
    let student = await Student.findOne({ 
      $or: [{ email: studentData.email }, { phone: studentData.phone }] 
    });

    if (student) {
      // Update existing student profile with latest data
      student = await Student.findByIdAndUpdate(student._id, {
        ...studentData,
        updatedAt: new Date()
      }, { new: true });
    } else {
      // Create new student
      student = await Student.create(studentData);
    }

    // 2. Check if already enrolled in THIS course
    const existingEnrollment = await Enrollment.findOne({
      studentId: student._id,
      courseId: course._id
    });

    if (existingEnrollment && existingEnrollment.paymentStatus === 'paid') {
      return NextResponse.json(
        { error: 'System detects active authorization for this module already.' },
        { status: 400 }
      );
    }

    // 3. Revalidate coupon server-side (never trust client totals)
    let finalAmount = course.price;
    let discountAmount = 0;
    let appliedCouponCode: string | undefined;
    let couponDoc: any = null;

    if (couponCode && typeof couponCode === 'string' && couponCode.trim()) {
      const code = couponCode.trim().toUpperCase();
      couponDoc = await Coupon.findOne({ code });
      if (!couponDoc) {
        return NextResponse.json({ error: 'Invalid coupon code' }, { status: 400 });
      }
      if (!couponDoc.isActive) {
        return NextResponse.json({ error: 'Coupon is no longer active' }, { status: 400 });
      }
      if (new Date(couponDoc.validUntil) < new Date()) {
        return NextResponse.json({ error: 'Coupon has expired' }, { status: 400 });
      }
      if (couponDoc.maxUses && couponDoc.usedCount >= couponDoc.maxUses) {
        return NextResponse.json({ error: 'Coupon usage limit reached' }, { status: 400 });
      }
      if (couponDoc.minPurchase && course.price < couponDoc.minPurchase) {
        return NextResponse.json(
          { error: `Minimum purchase of ₹${couponDoc.minPurchase} required` },
          { status: 400 }
        );
      }
      discountAmount = Math.min(couponDoc.discountAmount, course.price);
      finalAmount = Math.max(0, course.price - discountAmount);
      appliedCouponCode = couponDoc.code;
    }

    // 4. Create/Update Enrollment
    const enrollmentData = {
      studentId: student._id,
      courseId: course._id,
      courseName: course.title,
      studentName: student.name,
      studentEmail: student.email,
      paymentStatus: 'pending',
      enrollmentStatus: 'pending',
      paymentAmount: finalAmount,
      originalAmount: course.price,
      couponCode: appliedCouponCode,
      discountAmount,
      paymentMethod: paymentMethod || 'UPI',
      paymentReferenceId, // For manual payment
      paymentReceiptUrl, // For manual payment
    };

    let enrollment;
    if (existingEnrollment) {
      enrollment = await Enrollment.findByIdAndUpdate(existingEnrollment._id, enrollmentData, { new: true });
    } else {
      enrollment = await Enrollment.create(enrollmentData);
    }

    // 5. Increment coupon usage (only on first successful use — i.e. not a re-submit)
    if (couponDoc && !existingEnrollment) {
      await Coupon.findByIdAndUpdate(couponDoc._id, { $inc: { usedCount: 1 } });
    }

    return NextResponse.json({
      success: true,
      enrollmentId: enrollment._id,
      courseName: course.title,
      amount: finalAmount,
      originalAmount: course.price,
      discountAmount,
      couponCode: appliedCouponCode,
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    return NextResponse.json({ error: 'System failure during authorization' }, { status: 500 });
  }
}
