import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Enrollment } from '@/models/Enrollment';
import { Course } from '@/models/Course';
import { enrollmentSchema } from '@/lib/validations';
import { generateEnrollmentId } from '@/lib/utils';

// Simple in-memory rate limiter (for production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // Max requests
const RATE_WINDOW_MS = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

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

    // Validate courseId format
    if (!courseId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: 'Invalid course ID format' },
        { status: 400 }
      );
    }

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
