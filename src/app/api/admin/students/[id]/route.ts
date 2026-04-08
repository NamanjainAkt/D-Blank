import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import { Student } from '@/models/Student';
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

    const student = await Student.findById(id);

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Get all enrollments for this student
    const enrollments = await Enrollment.find({ studentId: id }).populate('courseId', 'title');

    return NextResponse.json({ student, enrollments });
  } catch (error) {
    console.error('Error fetching student details:', error);
    return NextResponse.json({ error: 'Failed to fetch student details' }, { status: 500 });
  }
}
