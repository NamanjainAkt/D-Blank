import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Enrollment } from '@/models/Enrollment';
import { Enroller } from '@/models/Enroller';
import { Course } from '@/models/Course';
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

    const { courseId, studentData, paymentMethod } = body;

    if (!courseId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: 'Invalid course ID' }, { status: 400 });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // 1. Find or Create Enroller
    let enroller = await Enroller.findOne({ 
      $or: [{ email: studentData.email }, { phone: studentData.phone }] 
    });

    if (enroller) {
      // Update existing enroller profile with latest data
      enroller = await Enroller.findByIdAndUpdate(enroller._id, {
        ...studentData,
        updatedAt: new Date()
      }, { new: true });
    } else {
      // Create new enroller
      enroller = await Enroller.create(studentData);
    }

    // 2. Check if already enrolled in THIS course
    const existingEnrollment = await Enrollment.findOne({
      studentId: enroller._id,
      courseId: course._id
    });

    if (existingEnrollment && existingEnrollment.paymentStatus === 'paid') {
      return NextResponse.json(
        { error: 'System detects active authorization for this module already.' },
        { status: 400 }
      );
    }

    // 3. Create/Update Enrollment
    const enrollmentData = {
      studentId: enroller._id,
      courseId: course._id,
      courseName: course.title,
      studentName: enroller.name,
      studentEmail: enroller.email,
      paymentStatus: 'pending',
      enrollmentStatus: 'pending',
      paymentAmount: course.price,
      paymentMethod: paymentMethod || 'UPI',
    };

    let enrollment;
    if (existingEnrollment) {
      enrollment = await Enrollment.findByIdAndUpdate(existingEnrollment._id, enrollmentData, { new: true });
    } else {
      enrollment = await Enrollment.create(enrollmentData);
    }

    return NextResponse.json({
      success: true,
      enrollmentId: enrollment._id,
      courseName: course.title,
      amount: course.price,
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    return NextResponse.json({ error: 'System failure during authorization' }, { status: 500 });
  }
}
