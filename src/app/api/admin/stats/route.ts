import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import { Enrollment } from '@/models/Enrollment';
import { Course } from '@/models/Course';
import { Game } from '@/models/Game';
import { Student } from '@/models/Student';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

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
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const dayBeforeYesterday = new Date(yesterday);
    dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 1);

    // Today's stats
    const todayEnrollments = await Enrollment.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const todayStudents = await Student.countDocuments({
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

    // Yesterday's stats for trend calculation
    const yesterdayEnrollments = await Enrollment.countDocuments({
      createdAt: { $gte: yesterday, $lt: today },
    });

    const yesterdayStudents = await Student.countDocuments({
      createdAt: { $gte: yesterday, $lt: today },
    });

    const yesterdayRevenue = await Enrollment.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          paymentDate: { $gte: yesterday, $lt: today },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$paymentAmount' },
        },
      },
    ]);

    // Day before yesterday for previous period comparison
    const dayBeforeYesterdayEnrollments = await Enrollment.countDocuments({
      createdAt: { $gte: dayBeforeYesterday, $lt: yesterday },
    });

    const dayBeforeYesterdayStudents = await Student.countDocuments({
      createdAt: { $gte: dayBeforeYesterday, $lt: yesterday },
    });

    const dayBeforeYesterdayRevenue = await Enrollment.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          paymentDate: { $gte: dayBeforeYesterday, $lt: yesterday },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$paymentAmount' },
        },
      },
    ]);

    // Calculate trends (current vs previous period)
    const dailyEnrollmentTrend = yesterdayEnrollments > 0 
      ? Math.round(((todayEnrollments - yesterdayEnrollments) / yesterdayEnrollments) * 100)
      : (todayEnrollments > 0 ? 100 : 0);
    
    const dailyRevenueTrend = yesterdayRevenue[0]?.total > 0 
      ? Math.round(((todayRevenue[0]?.total || 0) - yesterdayRevenue[0]?.total) / yesterdayRevenue[0]?.total * 100)
      : (todayRevenue[0]?.total > 0 ? 100 : 0);

    const dailyStudentTrend = dayBeforeYesterdayStudents > 0
      ? todayStudents - yesterdayStudents
      : todayStudents;

    // Overall stats
    const totalEnrollments = await Enrollment.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments({ isPublished: true });
    const totalGames = await Game.countDocuments({ isPublished: true });

    // const revenueData = await Enrollment.aggregate([
    //   { $match: { paymentStatus: 'paid' } },
    //   {
    //     $group: {
    //       _id: null,
    //       total: { $sum: '$paymentAmount' },
    //       count: { $sum: 1 },
    //     },
    //   },
    // ]);
    const totalPaidEnrollments = await Enrollment.countDocuments({ paymentStatus: 'paid' });
    const totalRevenue = 1500 * totalEnrollments;

    // Previous period revenue (same period last month)
    const prevPeriodStart = new Date(today);
    prevPeriodStart.setMonth(prevPeriodStart.getMonth() - 1);
    const prevPeriodRevenueData = await Enrollment.aggregate([
      { 
        $match: { 
          paymentStatus: 'paid',
          createdAt: { $gte: prevPeriodStart, $lt: today }
        } 
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$paymentAmount' },
        },
      },
    ]);
    const previousPeriodRevenue = prevPeriodRevenueData[0]?.total || 0;
    const totalRevTrend = previousPeriodRevenue > 0
      ? Math.round(((totalRevenue) - previousPeriodRevenue) / previousPeriodRevenue * 100)
      : (totalRevenue > 0 ? 100 : 0);

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

    // Recent games
    const recentGames = await Game.find().sort({ createdAt: -1 }).limit(5);

    // Enrollment trend (last 30 days)
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const last30DaysEnrollmentTrend = await Enrollment.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Course saturation - calculate from Enrollment collection
    const courses = await Course.find({ isPublished: true })
      .select('title totalSeats')
      .sort({ title: 1 })
      .limit(5);

    // Get real enrollment counts from Enrollment collection
    const enrollmentCounts = await Enrollment.aggregate([
      { $match: { paymentStatus: 'paid', courseId: { $ne: null } } },
      {
        $group: {
          _id: '$courseId',
          count: { $sum: 1 },
        },
      },
    ]);

    const enrollmentCountMap = enrollmentCounts.reduce((acc: Record<string, number>, item: any) => {
      acc[item._id?.toString() || ''] = item.count;
      return acc;
    }, {});

    return NextResponse.json({
      today: {
        enrollments: todayEnrollments,
        students: todayStudents,
        revenue: todayRevenue[0]?.total || 0,
        enrollmentsTrend: dailyEnrollmentTrend,
        revenueTrend: dailyRevenueTrend,
        studentsTrend: dailyStudentTrend,
      },
      overall: {
        totalEnrollments,
        totalStudents,
        totalCourses,
        totalGames,
        totalRevenue,
        totalPaid: totalPaidEnrollments,
        revenueTrend: totalRevTrend,
      },
      paymentBreakdown: paymentStats.reduce((acc: any, stat: any) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {}),
      recentEnrollments,
      recentGames,
      enrollmentTrend: last30DaysEnrollmentTrend,
      courseSaturation: courses.map((c: any) => {
        const courseId = c._id.toString();
        const seats = c.totalSeats || 60;
        const filled = enrollmentCountMap[courseId] || 0;
        const percentage = seats > 0 ? Math.min(Math.round((filled / seats) * 100), 100) : 0;
        return {
          name: c.title,
          seats,
          filled,
          percentage,
        };
      }),
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
