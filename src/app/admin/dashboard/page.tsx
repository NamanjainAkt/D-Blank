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
  ArrowDownRight,
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
import { Progress } from '@/components/ui/progress';
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
  recentEnrollments: Enrollment[];
  enrollmentTrend: { _id: string; count: number }[];
  courseSaturation: { name: string; seats: number; filled: number; percentage: number }[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  colorClass: string;
  bgColorClass: string;
  trend: string;
  trendUp: boolean;
}

function StatCard({ title, value, icon: Icon, colorClass, bgColorClass, trend, trendUp }: StatCardProps) {
  return (
    <Card className="bg-black border-white/5 hover:border-white/10 transition-all duration-300 group overflow-hidden relative rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(0,255,255,0.05)] hover:-translate-y-0.5">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10 px-6 pt-6">
        <CardTitle className="text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-[#A0A0A0]">{title}</CardTitle>
        <div className={cn(bgColorClass, "p-2 rounded-lg border border-white/5 group-hover:scale-105 transition-transform duration-300")}>
          <Icon className={cn(colorClass, "w-4 h-4")} aria-hidden="true" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10 px-6 pb-6 pt-2">
        <div className="text-4xl font-display font-light text-[#E5E7EB] tracking-tight mb-2">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-wider", 
            trendUp ? "text-[#00FFFF] bg-[#00FFFF]/10 border border-[#00FFFF]/20 shadow-[0_0_10px_rgba(0,255,255,0.1)]" : "text-[#FF007F] bg-[#FF007F]/10 border border-[#FF007F]/20 shadow-[0_0_10px_rgba(255,0,127,0.1)]")}>
            {trendUp ? '▲' : '▼'} {trend}
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#555555]">vs period</span>
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
            <Skeleton className="h-8 w-40 bg-carbon" />
            <Skeleton className="h-4 w-56 mt-2 bg-carbon" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-36 bg-carbon" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="lg:col-span-2 h-80 bg-carbon" />
          <Skeleton className="h-80 bg-carbon" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <AlertCircle className="w-12 h-12 text-red-400" aria-hidden="true" />
        <p className="text-zinc-400 font-mono text-sm">{error}</p>
        <Button onClick={fetchStats} variant="outline" size="sm">
          Retry
        </Button>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const statCards: StatCardProps[] = [
    {
      title: "Today's Enrollments",
      value: stats.today.enrollments,
      icon: Users,
      colorClass: "text-[#00FFFF]",
      bgColorClass: "bg-[#00FFFF]/10 shadow-[0_0_15px_rgba(0,255,255,0.15)]",
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Today's Revenue",
      value: `₹${stats.today.revenue.toLocaleString()}`,
      icon: DollarSign,
      colorClass: "text-[#8B5CF6]",
      bgColorClass: "bg-[#8B5CF6]/10 shadow-[0_0_15px_rgba(139,92,246,0.15)]",
      trend: "+8%",
      trendUp: true
    },
    {
      title: "Total Students",
      value: stats.overall.totalStudents,
      icon: TrendingUp,
      colorClass: "text-[#00FFFF]",
      bgColorClass: "bg-[#00FFFF]/10 shadow-[0_0_15px_rgba(0,255,255,0.15)]",
      trend: "+23",
      trendUp: true
    },
    {
      title: "Total Revenue",
      value: `₹${(stats.overall.totalRevenue / 100000).toFixed(1)}L`,
      icon: CreditCard,
      colorClass: "text-[#8B5CF6]",
      bgColorClass: "bg-[#8B5CF6]/10 shadow-[0_0_15px_rgba(139,92,246,0.15)]",
      trend: "+15%",
      trendUp: true
    }
  ];

  return (
    <div className="space-y-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08] relative">
        <div className="absolute bottom-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-[#00FFFF] to-transparent shadow-[0_0_10px_#00FFFF]" />
        <div>
          <h1 className="text-[28px] md:text-[32px] font-display font-light text-[#E5E7EB] tracking-widest uppercase">
            Operational <span className="font-bold text-[#FF10F0] drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]">Hub</span>
          </h1>
          <p className="text-[11px] font-mono text-[#71717a] uppercase tracking-[0.2em] mt-3 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFFF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FFFF] shadow-[0_0_8px_#00FFFF]"></span>
            </span>
            System Status: Nominal <span className="text-white/20">|</span> {format(new Date(), 'yyyy.MM.dd HH:mm')}
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={fetchStats}
          size="sm"
          className="border-white/10 bg-black hover:bg-white/[0.02] hover:border-[#00FFFF]/50 hover:shadow-[0_0_15px_rgba(0,255,255,0.15)] text-[11px] font-mono text-[#E5E7EB] uppercase tracking-widest h-10 px-6 transition-all duration-300"
          aria-label="Refresh dashboard"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-2 text-[#00FFFF]" />
          Sync Data
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" role="region" aria-label="Key statistics">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Uplinks */}
        <div className="lg:col-span-2">
          <Card className="bg-black border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)] rounded-xl relative overflow-hidden group hover:border-white/10 transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FFFF]/30 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/[0.05] py-5 px-6">
              <CardTitle className="text-xs font-display font-medium uppercase tracking-[0.2em] text-[#E5E7EB]">Recent Uplinks</CardTitle>
              <Link 
                href="/admin/students" 
                className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8B5CF6]/70 hover:text-[#8B5CF6] hover:drop-shadow-[0_0_5px_#8B5CF6] transition-all flex items-center gap-1.5 group/link"
                aria-label="View all students"
              >
                Access Archives <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto custom-scrollbar">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/[0.05] hover:bg-transparent">
                      <TableHead className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] py-4 pl-6">Operator</TableHead>
                      <TableHead className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] py-4">Module</TableHead>
                      <TableHead className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] py-4 text-right pr-6">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.recentEnrollments.map((enrollment) => (
                      <TableRow key={enrollment._id} className="border-white/[0.05] hover:bg-white/[0.02] transition-colors group/row">
                        <TableCell className="py-4 pl-6">
                          <div className="flex flex-col">
                            <span className="text-[13px] font-medium text-[#E5E7EB] group-hover/row:text-white transition-colors">{enrollment.studentName}</span>
                            <span className="text-[10px] font-mono text-[#71717a] uppercase tracking-tight mt-1">{enrollment.email}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="text-[11px] font-mono text-[#A0A0A0] uppercase tracking-tighter">
                            {enrollment.courseId?.title || enrollment.courseName}
                          </span>
                        </TableCell>
                        <TableCell className="text-right py-4 pr-6">
                          <Badge 
                            variant="outline"
                            className={cn(
                              "text-[9px] font-mono uppercase tracking-widest border px-2.5 py-1 rounded",
                              enrollment.paymentStatus === 'paid' ? 'bg-[#00FFFF]/10 text-[#00FFFF] border-[#00FFFF]/20 shadow-[0_0_10px_rgba(0,255,255,0.1)]' :
                              enrollment.paymentStatus === 'pending' ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]' :
                              'bg-[#FF007F]/10 text-[#FF007F] border-[#FF007F]/20 shadow-[0_0_10px_rgba(255,0,127,0.1)]'
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

        {/* System Saturation */}
        <div className="space-y-8">
          <Card className="bg-black border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)] rounded-xl hover:border-white/10 transition-colors duration-300">
            <CardHeader className="border-b border-white/[0.05] py-5 px-6">
              <CardTitle className="text-xs font-display font-medium uppercase tracking-[0.2em] text-[#E5E7EB]">Module Saturation</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-7">
              {stats.courseSaturation.map((course, index) => (
                <div key={index} className="space-y-3 group/sat">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest">
                    <span className="text-[#A0A0A0] group-hover/sat:text-[#00FFFF] transition-colors">{course.name}</span>
                    <span className="text-[#71717a] font-medium">{course.percentage}%</span>
                  </div>
                  <div className="relative h-1.5 w-full bg-white/[0.03] overflow-hidden rounded-full border border-white/[0.05]">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00FFFF] to-[#8B5CF6] transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,255,255,0.4)]"
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
