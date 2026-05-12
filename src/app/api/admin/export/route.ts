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
    const search = searchParams.get('search') || '';
    const enrollmentStatus = searchParams.get('enrollmentStatus') || '';

    let query: any = {};

    if (course) {
      query.courseId = course;
    }

    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { studentEmail: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { collegeName: { $regex: search, $options: 'i' } },
        { rollNumber: { $regex: search, $options: 'i' } },
        { enrollmentId: { $regex: search, $options: 'i' } },
      ];
    }

    if (enrollmentStatus) {
      query.enrollmentStatus = enrollmentStatus;
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
      'Original Amount',
      'Discount',
      'Coupon Code',
      'Payment Method',
      'Payment Reference',
      'Payment Status',
      'Enrollment Status',
      'Admin Note',
      'Payment Date',
      'Created At',
    ];

    const rows = enrollments.map((e: any) => [
      e.enrollmentId,
      e.studentName,
      e.studentEmail,
      e.phone,
      e.whatsappNumber || e.phone,
      e.collegeName,
      e.branch,
      e.semester,
      e.rollNumber,
      e.city,
      e.courseId?.title || e.courseName,
      e.paymentAmount || '',
      e.originalAmount || '',
      e.discountAmount || 0,
      e.couponCode || '',
      e.paymentMethod || '',
      e.paymentReferenceId || '',
      e.paymentStatus,
      e.enrollmentStatus,
      e.adminNote || '',
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
