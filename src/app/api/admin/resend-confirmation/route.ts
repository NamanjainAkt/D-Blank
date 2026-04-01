import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import { Enrollment } from '@/models/Enrollment';
import { Course } from '@/models/Course';
import { sendEnrollmentConfirmation } from '@/lib/email';
import { authOptions } from '@/lib/auth';

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
    const { enrollmentId } = body;

    if (!enrollmentId) {
      return NextResponse.json(
        { error: 'Enrollment ID is required' },
        { status: 400 }
      );
    }

    const enrollment = await Enrollment.findById(enrollmentId).populate('courseId');

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    const course = enrollment.courseId as any;

    const result = await sendEnrollmentConfirmation({
      studentName: enrollment.studentName,
      email: enrollment.email,
      courseName: enrollment.courseName,
      enrollmentId: enrollment.enrollmentId,
      duration: course?.duration || 'TBA',
      schedule: course?.schedule || 'TBA',
      meetLink: course?.meetLink || 'https://meet.google.com',
      whatsappGroupLink: undefined,
    });

    if (result.success) {
      enrollment.confirmationEmailSent = true;
      await enrollment.save();
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return NextResponse.json(
      { error: 'Failed to send confirmation email' },
      { status: 500 }
    );
  }
}
