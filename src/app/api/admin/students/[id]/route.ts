import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import mongoose from 'mongoose';
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const { id } = await params;
    const updates = await request.json();

    const student = await Student.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    
    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    
    // Trigger save hook manually if needed or since findByIdAndUpdate doesn't trigger 'save' middleware automatically 
    // unless configured. The model has a 'save' hook for syncing.
    const EnrollmentModel = mongoose.models.Enrollment || Enrollment;
    await EnrollmentModel.updateMany(
      { studentId: id },
      { studentName: student.name, studentEmail: student.email }
    );

    return NextResponse.json({ success: true, student });
  } catch (error: any) {
    console.error('Error updating student:', error);
    return NextResponse.json({ error: error.message || 'Failed to update student' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const { id } = await params;

    // Check if student has paid enrollments
    const hasPaidEnrollments = await Enrollment.exists({ studentId: id, paymentStatus: 'paid' });
    if (hasPaidEnrollments) {
      return NextResponse.json({ error: 'Cannot delete student with active paid enrollments' }, { status: 400 });
    }

    const student = await Student.findByIdAndDelete(id);
    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

    // Optionally delete pending enrollments
    await Enrollment.deleteMany({ studentId: id });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting student:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete student' }, { status: 500 });
  }
}
