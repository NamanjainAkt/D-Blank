import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Enrollment } from '@/models/Enrollment';
import { Course } from '@/models/Course';
import { enrollmentSchema } from '@/lib/validations';
import { generateEnrollmentId } from '@/lib/utils';

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

    const { courseId, phone, email } = body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Check for existing enrollment
    const existingEnrollment = await Enrollment.findOne({
      courseId,
      $or: [{ phone }, { email }]
    });

    if (existingEnrollment && existingEnrollment.paymentStatus === 'paid') {
      return NextResponse.json(
        { error: 'You have already enrolled in this course' },
        { status: 400 }
      );
    }

    // Create or update enrollment
    const enrollmentData = {
      ...body,
      courseName: course.title,
      enrollmentId: generateEnrollmentId(),
      paymentStatus: 'pending',
      enrollmentStatus: 'pending',
    };

    let enrollment;

    if (existingEnrollment) {
      // Update existing pending enrollment
      enrollment = await Enrollment.findByIdAndUpdate(
        existingEnrollment._id,
        enrollmentData,
        { new: true }
      );
    } else {
      // Create new enrollment
      enrollment = await Enrollment.create(enrollmentData);
    }

    return NextResponse.json({
      success: true,
      enrollment: {
        id: enrollment._id,
        enrollmentId: enrollment.enrollmentId,
        courseName: enrollment.courseName,
        amount: course.price,
      },
    });
  } catch (error) {
    console.error('Error creating enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to create enrollment' },
      { status: 500 }
    );
  }
}
