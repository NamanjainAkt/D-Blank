import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import { Enroller } from '@/models/Enroller';
import { Enrollment } from '@/models/Enrollment';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const enroller = await Enroller.findById(id);

    if (!enroller) {
      return NextResponse.json({ error: 'Enroller not found' }, { status: 404 });
    }

    // Get all enrollments for this enroller
    const enrollments = await Enrollment.find({ studentId: id }).populate('courseId', 'title');

    return NextResponse.json({ enroller, enrollments });
  } catch (error) {
    console.error('Error fetching enroller details:', error);
    return NextResponse.json({ error: 'Failed to fetch enroller details' }, { status: 500 });
  }
}
