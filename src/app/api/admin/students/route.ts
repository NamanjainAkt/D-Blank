import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import { Student } from '@/models/Student';
import { Enrollment } from '@/models/Enrollment';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const semester = searchParams.get('semester') || '';
    const college = searchParams.get('college') || '';

    let query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { collegeName: { $regex: search, $options: 'i' } },
      ];
    }
    
    if (semester && semester !== 'all') {
      query.semester = semester;
    }
    
    if (college && college !== 'all') {
      if (college.toLowerCase() === 'others' || college.toLowerCase() === 'other') {
        query.collegeName = { $not: { $regex: /bit/i } };
      } else {
        query.collegeName = { $regex: college, $options: 'i' };
      }
    }

    const students = await Student.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ students });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();

    const existingStudent = await Student.findOne({ 
      $or: [{ email: data.email }, { phone: data.phone }] 
    });

    if (existingStudent) {
      return NextResponse.json(
        { error: 'Student with this email or phone already exists' },
        { status: 400 }
      );
    }

    const student = await Student.create(data);

    return NextResponse.json({ success: true, student });
  } catch (error: any) {
    console.error('Error creating student:', error);
    return NextResponse.json({ error: error.message || 'Failed to create student' }, { status: 500 });
  }
}
