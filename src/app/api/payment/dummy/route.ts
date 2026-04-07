import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Enrollment } from '@/models/Enrollment';
import { Course } from '@/models/Course';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { enrollmentId } = body;

    if (!enrollmentId) {
      return NextResponse.json({ error: 'Enrollment ID missing' }, { status: 400 });
    }

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    if (enrollment.paymentStatus === 'paid') {
      return NextResponse.json({ success: true, message: 'Already authorized' });
    }

    // 1. Mark Enrollment as Paid
    enrollment.paymentStatus = 'paid';
    enrollment.paymentId = 'DUMMY_' + Math.random().toString(36).substr(2, 9).toUpperCase();
    enrollment.paymentDate = new Date();
    enrollment.enrollmentStatus = 'confirmed';
    await enrollment.save();

    // 2. Increment Course Enrolled Count
    await Course.findByIdAndUpdate(enrollment.courseId, {
      $inc: { enrolledCount: 1 }
    });

    return NextResponse.json({
      success: true,
      transactionId: enrollment.paymentId,
      courseName: enrollment.courseName
    });
  } catch (error) {
    console.error('Dummy payment error:', error);
    return NextResponse.json({ error: 'Transaction uplink failed' }, { status: 500 });
  }
}
