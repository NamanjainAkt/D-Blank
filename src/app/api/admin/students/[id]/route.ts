import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import { Enrollment } from '@/models/Enrollment';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

// Validation schema for enrollment updates
const updateEnrollmentSchema = z.object({
  paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded']).optional(),
  enrollmentStatus: z.enum(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']).optional(),
  paymentId: z.string().optional(),
  paymentAmount: z.number().optional(),
  paymentDate: z.string().optional(),
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

    const enrollment = await Enrollment.findById(id).populate('courseId', 'title duration schedule meetLink');

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ enrollment });
  } catch (error) {
    console.error('Error fetching enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enrollment' },
      { status: 500 }
    );
  }
}
