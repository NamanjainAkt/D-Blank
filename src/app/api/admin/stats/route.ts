import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import { Enrollment } from '@/models/Enrollment';
import { Course } from '@/models/Course';
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Today's stats
    const todayEnrollments = await Enrollment.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const todayRevenue = await Enrollment.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          paymentDate: { $gte: today, $lt: tomorrow },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$paymentAmount' },
        },
      },
    ]);

    // Overall stats
    const totalStudents = await Enrollment.countDocuments();
    const totalCourses = await Course.countDocuments({ isPublished: true });

    const revenueData = await Enrollment.aggregate([
      { $match: { paymentStatus: 'paid' } },
      {
        $group: {
          _id: null,
          total: { $sum: '$paymentAmount' },
          count: { $sum: 1 },
        },
      },
    ]);

    // Payment status breakdown
    const paymentStats = await Enrollment.aggregate([
      {
        $group: {
          _id: '$paymentStatus',
          count: { $sum: 1 },
        },
      },
    ]);

    // Recent enrollments
    const recentEnrollments = await Enrollment.find()
      .populate('courseId', 'title')
      .sort({ createdAt: -1 })
      .limit(10);

    // Enrollment trend (last 30 days)
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const enrollmentTrend = await Enrollment.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Course saturation
    const courses = await Course.find({ isPublished: true })
      .select('title totalSeats enrolledCount')
      .sort({ enrolledCount: -1 })
      .limit(5);

    return NextResponse.json({
      today: {
        enrollments: todayEnrollments,
        revenue: todayRevenue[0]?.total || 0,
      },
      overall: {
        totalStudents,
        totalCourses,
        totalRevenue: revenueData[0]?.total || 0,
        totalPaid: revenueData[0]?.count || 0,
      },
      paymentBreakdown: paymentStats.reduce((acc: any, stat: any) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {}),
      recentEnrollments,
      enrollmentTrend,
      courseSaturation: courses.map((c: any) => ({
        name: c.title,
        seats: c.totalSeats,
        filled: c.enrolledCount,
        percentage: Math.round((c.enrolledCount / c.totalSeats) * 100),
      })),
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
