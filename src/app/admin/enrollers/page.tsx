'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  UserCheck, 
  Search, 
  Mail, 
  Phone, 
  School, 
  MapPin, 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  Loader2,
  AlertCircle,
  BarChart3,
  CreditCard
} from 'lucide-react';
import { cn, formatDate, formatCurrency } from '@/lib/utils';

export default function AdminEnrollersPage() {
  const [enrollers, setEnrollers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedEnroller, setSelectedEnroller] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [enrollerDetails, setEnrollerDetails] = useState<any>(null);

  const fetchEnrollers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/enrollers?search=${encodeURIComponent(search)}`);
      if (!res.ok) throw new Error('Failed to fetch enrollers');
      const data = await res.json();
      setEnrollers(data.enrollers || []);
    } catch (err) {
      console.error('Error fetching enrollers:', err);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(fetchEnrollers, 500);
    return () => clearTimeout(timer);
  }, [fetchEnrollers]);

  const viewDetails = async (id: string) => {
    try {
      setDetailLoading(true);
      setSelectedEnroller(id);
      const res = await fetch(`/api/admin/enrollers/${id}`);
      if (!res.ok) throw new Error('Failed to fetch details');
      const data = await res.json();
      setEnrollerDetails(data);
    } catch (err) {
      console.error('Error fetching enroller details:', err);
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-4xl font-display font-black text-white tracking-tighter uppercase">
            Enroller <span className="text-acid-green shadow-acid-green">Registry</span>
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-acid-green shadow-[0_0_8px_#39FF14]" />
            Database Status: {enrollers.length} Unique Entities Detected
          </p>
        </div>
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-acid-green transition-colors" />
          <Input 
            placeholder="SCAN BY NAME / EMAIL / PHONE..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-black/40 border-white/5 focus:border-acid-green/50 text-[10px] font-mono uppercase tracking-widest h-11"
          />
        </div>
      </div>

      {/* Main List */}
      <Card className="bg-ink/40 border-white/5 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-acid-green/50 to-transparent" />
        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4 px-6">Entity Signature</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Communication Uplink</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Origin Hub (College)</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Registered On</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4 text-right px-6">Protocol</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && enrollers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-acid-green" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">Scanning Database...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : enrollers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-6 h-6 text-zinc-700" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">No Entities Found</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  enrollers.map((person) => (
                    <TableRow key={person._id} className="border-white/5 hover:bg-white/[0.02] transition-colors group/row">
                      <TableCell className="py-5 px-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-zinc-200 group-hover/row:text-white transition-colors uppercase tracking-tight">{person.name}</span>
                          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-tight mt-0.5">ID: {person._id.slice(-8)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-zinc-400">
                            <Mail className="w-3 h-3 text-zinc-600" />
                            <span className="text-[11px] font-mono lowercase">{person.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-400">
                            <Phone className="w-3 h-3 text-zinc-600" />
                            <span className="text-[11px] font-mono">{person.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-tight line-clamp-1">{person.collegeName}</span>
                          <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{person.branch} // {person.semester} SEM</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 font-mono text-[11px] text-zinc-500">
                        {formatDate(person.createdAt)}
                      </TableCell>
                      <TableCell className="text-right py-5 px-6">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-9 border-white/5 bg-white/5 hover:border-acid-green/50 text-acid-green text-[10px] font-mono uppercase tracking-widest"
                          onClick={() => viewDetails(person._id)}
                        >
                          Access Profile <ChevronRight className="w-3.5 h-3.5 ml-2" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={!!selectedEnroller} onOpenChange={(open) => !open && setSelectedEnroller(null)}>
        <DialogContent className="bg-ink border-white/5 max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar">
          {detailLoading ? (
            <div className="py-20 flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-acid-green" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">Extracting Profile Data...</span>
            </div>
          ) : enrollerDetails ? (
            <>
              <DialogHeader className="border-b border-white/5 pb-6 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-acid-green/10 flex items-center justify-center border border-acid-green/20">
                    <UserCheck className="w-8 h-8 text-acid-green" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-display font-black text-white uppercase tracking-tighter">
                      {enrollerDetails.enroller.name}
                    </DialogTitle>
                    <DialogDescription className="text-[10px] font-mono text-acid-green uppercase tracking-widest mt-1">
                      Entity Profile // Level 01 Operator
                    </DialogDescription>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="p-3 bg-white/5 border border-white/5 rounded">
                    <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Email Uplink</div>
                    <div className="text-[10px] font-mono text-zinc-300 break-all">{enrollerDetails.enroller.email}</div>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/5 rounded">
                    <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Comm Link</div>
                    <div className="text-[10px] font-mono text-zinc-300">{enrollerDetails.enroller.phone}</div>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/5 rounded">
                    <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Roll Signature</div>
                    <div className="text-[10px] font-mono text-zinc-300">{enrollerDetails.enroller.rollNumber}</div>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/5 rounded">
                    <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Current Year</div>
                    <div className="text-[10px] font-mono text-zinc-300 uppercase">{enrollerDetails.enroller.year} Year</div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-8">
                {/* Secondary Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                      <School className="w-3 h-3" /> Origin Information
                    </h4>
                    <div className="space-y-3 p-4 bg-black/40 border border-white/5 rounded">
                      <div>
                        <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">College/Institution</div>
                        <div className="text-[11px] font-mono text-zinc-300 uppercase tracking-tight">{enrollerDetails.enroller.collegeName}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Branch</div>
                          <div className="text-[11px] font-mono text-zinc-300 uppercase tracking-tight">{enrollerDetails.enroller.branch}</div>
                        </div>
                        <div>
                          <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Semester</div>
                          <div className="text-[11px] font-mono text-zinc-300 uppercase tracking-tight">{enrollerDetails.enroller.semester} SEM</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                        <MapPin className="w-3 h-3 text-zinc-600" />
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{enrollerDetails.enroller.city}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                      <BarChart3 className="w-3 h-3" /> Intelligence Summary
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-black/40 border border-white/5 rounded text-center">
                        <div className="text-[20px] font-display font-black text-white">{enrollerDetails.enrollments.length}</div>
                        <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mt-1">Module Uplinks</div>
                      </div>
                      <div className="p-4 bg-black/40 border border-white/5 rounded text-center">
                        <div className="text-[20px] font-display font-black text-white">
                          ₹{enrollerDetails.enrollments.reduce((acc: number, curr: any) => acc + (curr.paymentStatus === 'paid' ? curr.paymentAmount : 0), 0).toLocaleString()}
                        </div>
                        <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mt-1">LTV Contribution</div>
                      </div>
                      <div className="col-span-2 p-3 bg-white/5 border border-white/5 rounded">
                        <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Acquisition Channel</div>
                        <div className="text-[10px] font-mono text-zinc-400 uppercase">{enrollerDetails.enroller.referrer || 'Organic Discovery'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enrollments History */}
                <div className="space-y-4 pb-4">
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                    <BookOpen className="w-3 h-3" /> Module Authorization History
                  </h4>
                  <div className="space-y-3">
                    {enrollerDetails.enrollments.length === 0 ? (
                      <div className="p-8 text-center border border-white/5 rounded bg-black/20">
                        <span className="text-[10px] font-mono uppercase text-zinc-700">No active module authorizations found.</span>
                      </div>
                    ) : (
                      enrollerDetails.enrollments.map((enr: any) => (
                        <div key={enr._id} className="p-4 bg-black/40 border border-white/5 rounded flex items-center justify-between group hover:border-white/20 transition-all">
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-1 h-8 rounded-full",
                              enr.paymentStatus === 'paid' ? "bg-acid-green shadow-[0_0_8px_#39FF14]" : "bg-red-500 shadow-[0_0_8px_red]"
                            )} />
                            <div>
                              <div className="text-[12px] font-mono font-bold text-zinc-200 uppercase tracking-tight group-hover:text-white transition-colors">{enr.courseId?.title || enr.courseName}</div>
                              <div className="flex items-center gap-4 mt-1">
                                <div className="text-[9px] font-mono text-zinc-600 uppercase flex items-center gap-1">
                                  <Calendar className="w-2.5 h-2.5" /> {formatDate(enr.createdAt)}
                                </div>
                                <div className="text-[9px] font-mono text-zinc-600 uppercase flex items-center gap-1">
                                  <CreditCard className="w-2.5 h-2.5" /> {formatCurrency(enr.paymentAmount || 0)}
                                </div>
                              </div>
                            </div>
                          </div>
                          <Badge className={cn(
                            "text-[8px] font-mono uppercase tracking-widest px-2",
                            enr.paymentStatus === 'paid' ? "bg-acid-green/10 text-acid-green border-acid-green/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                          )}>
                            {enr.paymentStatus}
                          </Badge>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

