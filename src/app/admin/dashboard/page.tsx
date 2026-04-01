'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  CreditCard,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardStats {
  today: {
    enrollments: number;
    revenue: number;
  };
  overall: {
    totalStudents: number;
    totalCourses: number;
    totalRevenue: number;
    totalPaid: number;
  };
  paymentBreakdown: {
    paid?: number;
    pending?: number;
    failed?: number;
  };
  recentEnrollments: any[];
  enrollmentTrend: { _id: string; count: number }[];
  courseSaturation: { name: string; seats: number; filled: number; percentage: number }[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-32 bg-zinc-800" />
            <Skeleton className="h-4 w-48 mt-2 bg-zinc-800" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 bg-zinc-800" />
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-zinc-500">Failed to load stats</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Today's Enrollments",
      value: stats.today.enrollments,
      icon: Users,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Today's Revenue",
      value: `₹${stats.today.revenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      trend: "+8%",
      trendUp: true
    },
    {
      title: "Total Students",
      value: stats.overall.totalStudents,
      icon: TrendingUp,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      trend: "+23",
      trendUp: true
    },
    {
      title: "Total Revenue",
      value: `₹${(stats.overall.totalRevenue / 100000).toFixed(1)}L`,
      icon: CreditCard,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      trend: "+15%",
      trendUp: true
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="bg-zinc-900/50 border-zinc-800 hover:border-violet-500/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trendUp ? (
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-400" />
                )}
                <span className={`text-xs ${stat.trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.trend}
                </span>
                <span className="text-xs text-zinc-500">from last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Enrollments */}
        <div className="lg:col-span-2">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Recent Enrollments</CardTitle>
              <a href="/admin/students" className="text-xs text-zinc-500 hover:text-white transition-colors">
                View all →
              </a>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800">
                    <TableHead className="text-zinc-500">Name</TableHead>
                    <TableHead className="text-zinc-500">Course</TableHead>
                    <TableHead className="text-zinc-500">Status</TableHead>
                    <TableHead className="text-zinc-500">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.recentEnrollments.slice(0, 8).map((enrollment: any) => (
                    <TableRow key={enrollment._id} className="border-zinc-800/50">
                      <TableCell>
                        <div className="font-medium">{enrollment.studentName}</div>
                        <div className="text-xs text-zinc-500">{enrollment.phone}</div>
                      </TableCell>
                      <TableCell className="text-zinc-400">
                        {enrollment.courseId?.title || enrollment.courseName}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={enrollment.paymentStatus === 'paid' ? 'default' : enrollment.paymentStatus === 'pending' ? 'secondary' : 'destructive'}
                          className={enrollment.paymentStatus === 'paid' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 
                            enrollment.paymentStatus === 'pending' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 
                            'bg-red-500/20 text-red-400 border-red-500/30'}
                        >
                          {enrollment.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-zinc-500 text-sm">
                        {format(new Date(enrollment.createdAt), 'MMM d')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Course Saturation */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-base">Course Saturation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.courseSaturation.map((course, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium truncate pr-2">{course.name}</span>
                    <span className="text-zinc-500">{course.filled}/{course.seats}</span>
                  </div>
                  <Progress 
                    value={course.percentage} 
                    className={`h-2 ${
                      course.percentage >= 90 ? '[&>div]:bg-red-500' :
                      course.percentage >= 60 ? '[&>div]:bg-amber-500' : '[&>div]:bg-emerald-500'
                    }`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Payment Breakdown */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-base">Payment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-around text-center">
                <div>
                  <div className="text-2xl font-bold text-emerald-400">
                    {stats.paymentBreakdown.paid || 0}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">Paid</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">
                    {stats.paymentBreakdown.pending || 0}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">Pending</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-400">
                    {stats.paymentBreakdown.failed || 0}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">Failed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
