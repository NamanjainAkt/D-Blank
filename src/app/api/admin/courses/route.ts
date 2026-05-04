import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import { Course } from '@/models/Course';
import { Enrollment } from '@/models/Enrollment';
import { authOptions } from '@/lib/auth';
import { courseSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const courses = await Course.find().sort({ createdAt: -1 });

    const coursesWithEnrollment = await Promise.all(
      courses.map(async (course) => {
        const enrollmentCount = await Enrollment.countDocuments({
          courseId: course._id,
          paymentStatus: 'paid',
          enrollmentStatus: { $in: ['confirmed', 'in_progress'] },
        });
        return {
          ...course.toObject(),
          enrolledCount: enrollmentCount,
        };
      })
    );

    return NextResponse.json({ courses: coursesWithEnrollment });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();

    // Validate input
    const validation = courseSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const course = await Course.create({
      ...validation.data,
      enrolledCount: 0,
    });

    return NextResponse.json({
      success: true,
      course,
    });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
