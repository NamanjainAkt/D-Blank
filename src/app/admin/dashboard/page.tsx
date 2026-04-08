'use client';

import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import {
  Users,
  DollarSign,
  TrendingUp,
  CreditCard,
  ArrowUpRight,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface Enrollment {
  _id: string;
  studentName: string;
  phone: string;
  email: string;
  courseId?: { title: string };
  courseName: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  createdAt: string;
}

interface DashboardStats {
  today: {
    enrollments: number;
    students: number;
    revenue: number;
  };
  overall: {
    totalStudents: number;
    totalEnrollments: number;
    totalCourses: number;
    totalGames: number;
    totalRevenue: number;
    totalPaid: number;
  };
  paymentBreakdown: {
    paid?: number;
    pending?: number;
    failed?: number;
  };
  recentEnrollments: Enrollment[];
  enrollmentTrend: { _id: string; count: number }[];
  courseSaturation: { name: string; seats: number; filled: number; percentage: number }[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend: string;
  trendUp: boolean;
}

function StatCard({ title, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-5 pt-5">
        <CardTitle className="text-xs font-medium text-zinc-500 uppercase tracking-wide">{title}</CardTitle>
        <div className="p-2 rounded-lg bg-zinc-800">
          <Icon className="w-4 h-4 text-zinc-400" aria-hidden="true" />
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-5 pt-1">
        <div className="text-3xl font-semibold text-zinc-100 tracking-tight mb-2">{value}</div>
        <div className="flex items-center gap-2">
          <span className={cn("text-xs font-medium px-1.5 py-0.5 rounded",
            trendUp ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10")}>
            {trendUp ? '+' : ''}{trend}
          </span>
          <span className="text-xs text-zinc-600">vs last period</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch('/api/admin/stats');
      if (!res.ok) throw new Error('Failed to fetch stats');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to load dashboard statistics. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) {
    return (
      <div className="space-y-6" aria-busy="true" aria-label="Loading dashboard">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-40 bg-zinc-800" />
            <Skeleton className="h-4 w-56 mt-2 bg-zinc-800" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-36 bg-zinc-800 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="lg:col-span-2 h-80 bg-zinc-800 rounded-xl" />
          <Skeleton className="h-80 bg-zinc-800 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <AlertCircle className="w-12 h-12 text-red-400" aria-hidden="true" />
        <p className="text-zinc-400 text-sm">{error}</p>
        <Button onClick={fetchStats} variant="outline" size="sm">
          Retry
        </Button>
      </div>
    );
  }

  if (!stats) return null;

  const statCards: StatCardProps[] = [
    {
      title: "Today's Enrollments",
      value: stats.today.enrollments,
      icon: Users,
      trend: "12%",
      trendUp: true
    },
    {
      title: "Today's Revenue",
      value: `₹${stats.today.revenue.toLocaleString()}`,
      icon: DollarSign,
      trend: "8%",
      trendUp: true
    },
    {
      title: "Total Students",
      value: stats.overall.totalStudents ?? 0,
      icon: TrendingUp,
      trend: "+23",
      trendUp: true
    },
    {
      title: "Total Revenue",
      value: `₹${(stats.overall.totalRevenue / 100000).toFixed(1)}L`,
      icon: CreditCard,
      trend: "15%",
      trendUp: true
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">
            Dashboard
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={fetchStats}
          size="sm"
          className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-sm h-9 px-4"
          aria-label="Refresh dashboard"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="region" aria-label="Key statistics">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Enrollments */}
        <div className="lg:col-span-2">
          <Card className="bg-zinc-900 border-zinc-800 rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-800 py-4 px-5">
              <CardTitle className="text-sm font-medium text-zinc-200">Recent Enrollments</CardTitle>
              <Link
                href="/admin/enrollments"
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
                aria-label="View all enrollments"
              >
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800 hover:bg-transparent">
                      <TableHead className="text-xs text-zinc-500 py-3 pl-5">Student</TableHead>
                      <TableHead className="text-xs text-zinc-500 py-3">Course</TableHead>
                      <TableHead className="text-xs text-zinc-500 py-3 text-right pr-5">Payment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.recentEnrollments.map((enrollment) => (
                      <TableRow key={enrollment._id} className="border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                        <TableCell className="py-3 pl-5">
                          <div>
                            <span className="text-sm text-zinc-200">{enrollment.studentName}</span>
                            <span className="block text-xs text-zinc-500 mt-0.5">{enrollment.email}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <span className="text-sm text-zinc-400">
                            {enrollment.courseId?.title || enrollment.courseName}
                          </span>
                        </TableCell>
                        <TableCell className="text-right py-3 pr-5">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs border px-2 py-0.5 rounded-md",
                              enrollment.paymentStatus === 'paid' ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5' :
                              enrollment.paymentStatus === 'pending' ? 'text-amber-400 border-amber-400/30 bg-amber-400/5' :
                              'text-red-400 border-red-400/30 bg-red-400/5'
                            )}
                          >
                            {enrollment.paymentStatus}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Saturation */}
        <div>
          <Card className="bg-zinc-900 border-zinc-800 rounded-xl">
            <CardHeader className="border-b border-zinc-800 py-4 px-5">
              <CardTitle className="text-sm font-medium text-zinc-200">Course Capacity</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-5">
              {stats.courseSaturation.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">{course.name}</span>
                    <span className="text-zinc-500 font-medium">{course.percentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-400 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${course.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
