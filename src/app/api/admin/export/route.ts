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

    // Build search filter — only search fields guaranteed on the Enrollment model
    // (studentName, studentEmail). Student-only fields (phone, collegeName, etc.)
    // are not stored on Enrollment documents created through the app.
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { studentEmail: { $regex: search, $options: 'i' } },
      ];
    }

    if (enrollmentStatus) {
      query.enrollmentStatus = enrollmentStatus;
    }

    const enrollments = await Enrollment.find(query)
      .populate('courseId', 'title')
      .populate('studentId', 'phone whatsappNumber collegeName branch semester rollNumber city name email')
      .sort({ createdAt: -1 });

    // Helper: safely get string, trim whitespace
    const str = (v: any): string => (v == null ? '' : String(v).trim());
    // Helper: trim a number value
    const num = (v: any): string => (v == null || v === '' ? '' : String(v).trim());

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

    const rows = enrollments.map((e: any) => {
      const student = e.studentId || {};
      return [
        // Enrollment ID — fall back to last 8 chars of _id
        str(e.enrollmentId) || e._id.toString().slice(-8).toUpperCase(),
        str(e.studentName),
        str(e.studentEmail),
        // Student fields: prefer populated ref, fall back to direct (seed data)
        str(student.phone || e.phone),
        str(student.whatsappNumber || e.whatsappNumber || student.phone || e.phone),
        str(student.collegeName || e.collegeName),
        str(student.branch || e.branch),
        str(student.semester || e.semester),
        str(student.rollNumber || e.rollNumber),
        str(student.city || e.city),
        str(e.courseId?.title || e.courseName),
        num(e.paymentAmount),
        num(e.originalAmount),
        num(e.discountAmount) || '0',
        str(e.couponCode),
        str(e.paymentMethod),
        str(e.paymentReferenceId),
        str(e.paymentStatus),
        str(e.enrollmentStatus),
        str(e.adminNote),
        e.paymentDate ? new Date(e.paymentDate).toLocaleDateString() : '',
        new Date(e.createdAt).toLocaleDateString(),
      ];
    });

    // Build CSV — escape double-quotes by doubling them (RFC 4180)
    const escapeCsv = (cell: string): string => {
      const s = cell == null ? '' : String(cell);
      return `"${s.replace(/"/g, '""')}"`;
    };

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(escapeCsv).join(',')),
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
