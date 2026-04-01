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
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const course = searchParams.get('course') || '';
    const paymentStatus = searchParams.get('paymentStatus') || '';
    const enrollmentStatus = searchParams.get('enrollmentStatus') || '';
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    let query: any = {};

    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { collegeName: { $regex: search, $options: 'i' } },
        { rollNumber: { $regex: search, $options: 'i' } },
      ];
    }

    if (course) {
      query.courseId = course;
    }

    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    if (enrollmentStatus) {
      query.enrollmentStatus = enrollmentStatus;
    }

    const skip = (page - 1) * limit;
    const sortOrder: any = { [sort]: order === 'asc' ? 1 : -1 };

    const [students, total] = await Promise.all([
      Enrollment.find(query)
        .populate('courseId', 'title category')
        .sort(sortOrder)
        .skip(skip)
        .limit(limit),
      Enrollment.countDocuments(query),
    ]);

    // Calculate stats
    const stats = await Enrollment.aggregate([
      { $group: {
        _id: null,
        total: { $sum: 1 },
        paid: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'paid'] }, 1, 0] } },
        pending: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'pending'] }, 1, 0] } },
        failed: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'failed'] }, 1, 0] } },
        revenue: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'paid'] }, '$paymentAmount', 0] } },
      }},
    ]);

    return NextResponse.json({
      students,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: stats[0] || { total: 0, paid: 0, pending: 0, failed: 0, revenue: 0 },
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}
