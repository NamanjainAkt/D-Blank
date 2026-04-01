import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import { Enrollment } from '@/models/Enrollment';
import { authOptions } from '@/lib/auth';

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

    const { searchParams } = new URL(request.url);
    const course = searchParams.get('course') || '';
    const paymentStatus = searchParams.get('paymentStatus') || '';

    let query: any = {};

    if (course) {
      query.courseId = course;
    }

    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    const enrollments = await Enrollment.find(query)
      .populate('courseId', 'title')
      .sort({ createdAt: -1 });

    // Create CSV
    const headers = [
      'Enrollment ID',
      'Name',
      'Email',
      'Phone',
      'WhatsApp',
      'College',
      'Branch',
      'Semester',
      'Roll Number',
      'City',
      'Course',
      'Amount',
      'Payment Status',
      'Enrollment Status',
      'Payment Date',
      'Created At',
    ];

    const rows = enrollments.map((e: any) => [
      e.enrollmentId,
      e.studentName,
      e.email,
      e.phone,
      e.whatsappNumber || e.phone,
      e.collegeName,
      e.branch,
      e.semester,
      e.rollNumber,
      e.city,
      e.courseId?.title || e.courseName,
      e.paymentAmount || '',
      e.paymentStatus,
      e.enrollmentStatus,
      e.paymentDate ? new Date(e.paymentDate).toLocaleDateString() : '',
      new Date(e.createdAt).toLocaleDateString(),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell || ''}"`).join(',')),
    ].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="enrollments-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting data:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}
