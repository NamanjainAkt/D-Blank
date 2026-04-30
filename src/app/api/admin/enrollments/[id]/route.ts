import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import { Enrollment } from '@/models/Enrollment';
import { Coupon } from '@/models/Coupon';
import { authOptions } from '@/lib/auth';
import { sendPaymentConfirmation } from '@/lib/email';
import { z } from 'zod';

// Validation schema for enrollment updates
const updateEnrollmentSchema = z.object({
  paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded', 'rejected']).optional(),
  enrollmentStatus: z.enum(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']).optional(),
  paymentId: z.string().optional(),
  paymentAmount: z.number().optional(),
  paymentDate: z.union([z.string(), z.date()]).optional(),
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
    
    console.log(`[API] PATCH enrollment ${id} - Body:`, JSON.stringify(body));

    // Add paymentDate if status is paid
    if (body.paymentStatus === 'paid' && !body.paymentDate) {
      body.paymentDate = new Date();
    }

    // Validate input
    const validation = updateEnrollmentSchema.safeParse(body);
    if (!validation.success) {
      console.error(`[API] Validation failed for enrollment ${id}:`, validation.error.format());
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validation.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
        },
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

    // Send payment confirmation email if just marked as paid
    if (body.paymentStatus === 'paid') {
      await sendPaymentConfirmation({
        studentName: enrollment.studentName,
        email: enrollment.studentEmail || (enrollment as any).email, // Handle fallback
        courseName: enrollment.courseName,
        amount: enrollment.paymentAmount || 0,
        transactionId: enrollment.paymentReferenceId || enrollment.paymentId || 'N/A',
      });
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

export async function DELETE(
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

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: 'Invalid enrollment ID format' },
        { status: 400 }
      );
    }

    const enrollment = await Enrollment.findByIdAndDelete(id);

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Error deleting enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to delete enrollment' },
      { status: 500 }
    );
  }
}
