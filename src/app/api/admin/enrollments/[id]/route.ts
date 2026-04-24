import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import { Enrollment } from '@/models/Enrollment';
import { Coupon } from '@/models/Coupon';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

// Validation schema for enrollment updates
const updateEnrollmentSchema = z.object({
  paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded', 'rejected']).optional(),
  enrollmentStatus: z.enum(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']).optional(),
  paymentId: z.string().optional(),
  paymentAmount: z.number().optional(),
  paymentDate: z.string().optional(),
  adminNote: z.string().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    // Validate input
    const validation = updateEnrollmentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: 'Invalid enrollment ID format' },
        { status: 400 }
      );
    }

    const enrollment = await Enrollment.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    ).populate('courseId', 'title');

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      enrollment,
    });
  } catch (error) {
    console.error('Error updating enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to update enrollment' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    const { id } = await params;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: 'Invalid enrollment ID format' },
        { status: 400 }
      );
    }

    const enrollment = await Enrollment.findById(id)
      .populate('courseId', 'title duration schedule meetLink')
      .populate('studentId', 'name email phone whatsappNumber collegeName branch semester rollNumber city referrer');

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    let couponDescription = '';
    if (enrollment.couponCode) {
      const couponDoc = await Coupon.findOne({ code: enrollment.couponCode }).select('description');
      couponDescription = couponDoc?.description || '';
    }

    const enrollmentObj = enrollment.toObject();

    return NextResponse.json({ 
      success: true,
      student: {
        ...enrollmentObj,
        _id: enrollmentObj._id.toString(),
        enrollmentId: enrollmentObj._id.toString(),
        // Map student data from populated studentId
        email: enrollmentObj.studentId?.email || enrollmentObj.studentEmail,
        phone: enrollmentObj.studentId?.phone || enrollmentObj.phone,
        whatsappNumber: enrollmentObj.studentId?.whatsappNumber || enrollmentObj.whatsappNumber,
        collegeName: enrollmentObj.studentId?.collegeName || '',
        branch: enrollmentObj.studentId?.branch || '',
        semester: enrollmentObj.studentId?.semester || '',
        rollNumber: enrollmentObj.studentId?.rollNumber || '',
        city: enrollmentObj.studentId?.city || enrollmentObj.city,
        referrer: enrollmentObj.studentId?.referrer || '',
        // Keep courseId as populated object
        courseId: enrollmentObj.courseId,
        // Add coupon description
        couponDescription,
      }
    });
  } catch (error) {
    console.error('Error fetching enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enrollment' },
      { status: 500 }
    );
  }
}
