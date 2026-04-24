'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  MessageCircle, 
  Copy, 
  Check, 
  Mail, 
  Loader2,
  AlertCircle,
  ExternalLink,
  Calendar,
  CreditCard,
  User,
  GraduationCap,
  BookOpen,
  Clock
} from 'lucide-react';

interface Student {
  _id: string;
  enrollmentId: string;
  studentName: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  collegeName: string;
  branch: string;
  semester: string;
  rollNumber: string;
  city: string;
  referrer?: string;
  courseId?: {
    title: string;
    duration: string;
    schedule: string;
    meetLink: string;
  };
  courseName: string;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'rejected';
  paymentAmount: number;
  originalAmount: number;
  discountAmount: number;
  paymentId: string;
  paymentReferenceId: string;
  paymentReceiptUrl: string;
  adminNote: string;
  couponCode?: string;
  couponDescription?: string;
  paymentDate: string;
  enrollmentStatus: string;
  confirmationEmailSent: boolean;
  createdAt: string;
}

interface InfoFieldProps {
  label: string;
  value?: string | React.ReactNode;
  mono?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function InfoField({ label, value, mono = false, className = '', children }: InfoFieldProps) {
  return (
    <div className={className}>
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white mb-1.5">{label}</div>
      <div className={cn(
        "text-sm",
        mono ? 'font-mono text-white bg-white/5 px-2 py-1 rounded-sm border border-white/5 inline-block' : 'text-white'
      )}>
        {children || value}
      </div>
    </div>
  );
}

function SectionCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-ink/40 border border-white/5 p-6 backdrop-blur-sm relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-laser-cyan/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5 relative z-10">
        <div className="p-2 bg-laser-cyan/10 rounded-sm border border-laser-cyan/20">
          <Icon className="w-4 h-4 text-laser-cyan" aria-hidden="true" />
        </div>
        <h2 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-white">{title}</h2>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await fetch(`/api/admin/enrollments/${resolvedParams.id}`);
        const data = await res.json();
        
        if (!res.ok || data.error) {
          setError(data.error || 'Student not found');
          return;
        }
        
        setStudent(data.student);
      } catch (err) {
        console.error('Error fetching student:', err);
        setError('Failed to load student details');
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, [resolvedParams.id]);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const updateEnrollmentStatus = async (status: string) => {
    if (!student) return;
    setUpdating(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/enrollments/${student._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentStatus: status }),
      });

      if (!res.ok) throw new Error('Failed to update status');
      
      setStudent({ ...student, enrollmentStatus: status });
      showSuccess('Enrollment status updated');
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update enrollment status');
    } finally {
      setUpdating(false);
    }
  };

  const updatePaymentStatus = async (status: 'paid' | 'rejected', note?: string) => {
    if (!student) return;
    setUpdating(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/enrollments/${student._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          paymentStatus: status,
          adminNote: note,
          enrollmentStatus: status === 'paid' ? 'confirmed' : 'pending'
        }),
      });

      if (!res.ok) throw new Error('Failed to update payment status');
      
      setStudent({ 
        ...student, 
        paymentStatus: status, 
        adminNote: note || '',
        enrollmentStatus: status === 'paid' ? 'confirmed' : 'pending'
      });
      showSuccess(`Payment ${status === 'paid' ? 'approved' : 'rejected'}`);
    } catch (err) {
      console.error('Error updating payment:', err);
      setError('Failed to update payment status');
    } finally {
      setUpdating(false);
    }
  };

  const resendConfirmationEmail = async () => {
    if (!student) return;
    setEmailSending(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/resend-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentId: student._id }),
      });

      const data = await res.json();
      
      if (data.success) {
        setStudent({ ...student, confirmationEmailSent: true });
        showSuccess('Confirmation email sent successfully');
      } else {
        setError(data.error || 'Failed to send email');
      }
    } catch (err) {
      console.error('Error sending email:', err);
      setError('Failed to send confirmation email');
    } finally {
      setEmailSending(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const openWhatsApp = (phone: string) => {
    const formatted = phone.replace(/\D/g, '');
    window.open(`https://wa.me/91${formatted}`, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96" role="status" aria-label="Loading student details">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-laser-cyan" aria-hidden="true" />
          <span className="text-[10px] font-mono text-white uppercase tracking-[0.2em]">Retrieving Personnel File...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-6">
        <AlertCircle className="w-12 h-12 text-red-500 opacity-50" aria-hidden="true" />
        <p className="text-white font-mono text-xs uppercase tracking-widest">{error}</p>
        <Button 
          variant="outline" 
          onClick={() => router.push('/admin/enrollments')}
          className="border-white/5 bg-white/5 hover:border-laser-cyan/50 text-[10px] font-mono uppercase tracking-widest"
        >
          Return to Registry
        </Button>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  const whatsappPhone = student.whatsappNumber || student.phone;

  return (
    <div className="space-y-10 animate-fade-up">
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] uppercase tracking-widest backdrop-blur-md animate-scale-in" role="status" aria-live="polite">
          <Check className="w-4 h-4" aria-hidden="true" />
          {successMessage}
        </div>
      )}
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div className="space-y-4">
          <Link 
            href="/admin/enrollments" 
            className="text-[10px] font-mono text-white hover:text-laser-cyan uppercase tracking-[0.2em] transition-colors flex items-center gap-2"
          >
            <span aria-hidden="true">←</span> Back to Registry
          </Link>
          <div>
            <h1 className="text-4xl font-display font-black text-white tracking-tighter uppercase">
              {student.studentName}
            </h1>
            <p className="text-[10px] font-mono text-white uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-laser-cyan shadow-[0_0_8px_#00F0FF]" />
              Personnel ID: {student.enrollmentId} // Archive Entry
            </p>
          </div>
        </div>
        <div className="flex gap-3">
            <Button
              variant="green"
              onClick={() => openWhatsApp(whatsappPhone)}
              className="font-mono font-bold text-[10px] uppercase tracking-widest h-10 px-6 shadow-[0_0_15px_rgba(16,185,129,0.2)] text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
              Open Uplink
            </Button>
          <Button
            variant="outline"
            onClick={() => copyToClipboard(student.phone)}
            className="border-white/5 bg-white/5 hover:border-laser-cyan/50 text-[10px] font-mono uppercase tracking-widest h-10 px-6"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2 text-emerald-400" aria-hidden="true" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" aria-hidden="true" />
                Copy Comm
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <SectionCard title="Personal Dossier" icon={User}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <InfoField label="Legal Identity" value={student.studentName} />
              <InfoField label="Comm Link (Email)" value={
                student.email ? (
                  <a href={`mailto:${student.email}`} className="text-laser-cyan hover:underline transition-colors">
                    {student.email}
                  </a>
                ) : (
                  <span className="text-white/40">Not provided</span>
                )
              } />
              <InfoField label="Primary Comm" value={student.phone} mono />
              <InfoField label="WhatsApp Comm" value={whatsappPhone} mono />
              <InfoField label="Origin (City)" value={student.city} className="sm:col-span-2" />
            </div>
          </SectionCard>

          {/* Academic Information */}
          <SectionCard title="Academic Profile" icon={GraduationCap}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <InfoField label="Educational Institution" value={student.collegeName} />
              <InfoField label="Specialization (Branch)" value={student.branch} />
              <InfoField label="Current Semester" value={student.semester} />
              <InfoField label="System Roll ID" value={student.rollNumber} mono />
            </div>
          </SectionCard>

          {/* Payment Evidence */}
          <SectionCard title="Payment Evidence" icon={CreditCard}>
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <InfoField label="Course Enrolled" value={student.courseName || '-'} />
                <InfoField label="Transaction Reference ID" value={student.paymentReferenceId || 'Not Provided'} mono />
              </div>

              {(student.couponCode || student.discountAmount > 0) && (
                <div className="p-4 bg-laser-cyan/5 border border-laser-cyan/20 rounded-sm">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white mb-3">Coupon Applied</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoField label="Coupon Code" value={student.couponCode || '-'} mono />
                    <InfoField label="Discount Amount" value={student.discountAmount > 0 ? formatCurrency(student.discountAmount) : '-'} />
                    {student.couponDescription && (
                      <InfoField label="Description" value={student.couponDescription} className="sm:col-span-2" />
                    )}
                  </div>
                </div>
              )}

              {student.paymentReceiptUrl && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white mb-3">Verification Image</div>
                  <div className="relative aspect-video w-full max-w-md border border-white/5 bg-black overflow-hidden group">
                    <Image 
                      src={student.paymentReceiptUrl} 
                      alt="Payment Receipt" 
                      fill 
                      className="object-contain"
                    />
                    <a 
                      href={student.paymentReceiptUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4 text-laser-cyan" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white">Open in New Tab</span>
                    </a>
                  </div>
                </div>
              )}

              {student.paymentStatus === 'pending' && (
                <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                   <Button
                     onClick={() => updatePaymentStatus('paid')}
                     disabled={updating}
                     className="bg-emerald-500 text-white hover:bg-emerald-400 font-mono font-bold text-[10px] uppercase tracking-widest h-9 px-6"
                   >
                    {updating ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Check className="w-3 h-3 mr-2" />}
                    Approve Payment
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const note = prompt('Reason for rejection?');
                      if (note) updatePaymentStatus('rejected', note);
                    }}
                    disabled={updating}
                    className="border-red-500/20 text-red-400 hover:bg-red-500/10 text-[10px] font-mono uppercase tracking-widest h-9 px-6"
                  >
                    Reject Payment
                  </Button>
                </div>
              )}

              {student.paymentStatus === 'rejected' && (
                <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-sm">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-red-400 mb-1">Rejection Reason</div>
                  <div className="text-xs text-red-300">{student.adminNote || 'No reason specified'}</div>
                  <Button
                    variant="link"
                    onClick={() => updatePaymentStatus('paid')}
                    className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 p-0 h-auto mt-2"
                  >
                    Re-verify & Approve
                  </Button>
                </div>
              )}
            </div>
          </SectionCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Status Card */}
          <SectionCard title="System Status" icon={Clock}>
            <div className="space-y-6">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white mb-3">Credits Status</div>
                <Badge 
                  variant="outline"
                  className={cn(
                    "text-[10px] font-mono uppercase tracking-widest border px-3 py-1",
                    student.paymentStatus === 'paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]' :
                    student.paymentStatus === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]' :
                    student.paymentStatus === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.1)]' :
                    'bg-zinc-500/10 text-white border-zinc-500/30'
                  )}
                >
                  {student.paymentStatus}
                </Badge>
              </div>
              <div className="space-y-3">
                <label htmlFor="enrollment-status" className="text-[10px] font-mono uppercase tracking-[0.2em] text-white block">
                  Assignment Status
                </label>
                <Select value={student?.enrollmentStatus || 'pending'} onValueChange={updateEnrollmentStatus} disabled={updating}>
                  <SelectTrigger id="enrollment-status" className="w-full bg-ink/40 border-white/5 text-[10px] font-mono uppercase tracking-widest h-10 text-white">
                    {updating ? (
                      <Loader2 className="w-4 h-4 animate-spin text-laser-cyan" aria-hidden="true" />
                    ) : (
                      <SelectValue className="text-white" />
                    )}
                  </SelectTrigger>
                  <SelectContent className="bg-ink border-white/5">
                    <SelectItem value="pending" className="text-[10px] font-mono uppercase tracking-widest text-white">Pending</SelectItem>
                    <SelectItem value="confirmed" className="text-[10px] font-mono uppercase tracking-widest text-white">Confirmed</SelectItem>
                    <SelectItem value="in_progress" className="text-[10px] font-mono uppercase tracking-widest text-white">In Progress</SelectItem>
                    <SelectItem value="completed" className="text-[10px] font-mono uppercase tracking-widest text-white">Completed</SelectItem>
                    <SelectItem value="cancelled" className="text-[10px] font-mono uppercase tracking-widest text-white">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SectionCard>

          {/* Payment Details */}
          <SectionCard title="Credits Ledger" icon={CreditCard}>
            <div className="space-y-6">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white mb-2">Total Transfer</div>
                <div className="text-3xl font-display font-black text-white tracking-tighter">
                  {student.paymentAmount ? formatCurrency(student.paymentAmount) : '-'}
                </div>
              </div>
               <InfoField label="Transaction Hash" value={student.paymentReferenceId?.trim() || student.paymentId?.trim() || '-'} mono />
               <InfoField label="Timestamp" value={
                  student.paymentDate 
                    ? (() => {
                        const date = new Date(student.paymentDate);
                        return isNaN(date.getTime()) ? '-' : format(date, 'yyyy.MM.dd // HH:mm');
                      })()
                    : student.createdAt
                    ? (() => {
                        const date = new Date(student.createdAt);
                        return isNaN(date.getTime()) ? '-' : format(date, 'yyyy.MM.dd // HH:mm');
                      })()
                    : '-'
                } />
            </div>
          </SectionCard>

          {/* Quick Actions */}
          <SectionCard title="Control Panel" icon={ExternalLink}>
            <div className="space-y-3">
                <Button
                  variant="green"
                  onClick={() => openWhatsApp(whatsappPhone)}
                  className="w-full font-mono font-bold text-[10px] uppercase tracking-widest h-10 shadow-[0_0_15px_rgba(16,185,129,0.1)] text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                  Initiate Comm
                </Button>
              <Button
                variant="outline"
                onClick={resendConfirmationEmail}
                disabled={emailSending}
                className="w-full border-white/5 bg-white/5 hover:border-laser-cyan/50 text-[10px] font-mono uppercase tracking-widest h-10"
              >
                {emailSending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin text-laser-cyan" aria-hidden="true" />
                    Transmitting...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                    Resend Briefing
                  </>
                )}
              </Button>
              {student.confirmationEmailSent && (
                <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-emerald-400 mt-2 bg-emerald-500/5 p-2 border border-emerald-500/10">
                  <Check className="w-3 h-3" aria-hidden="true" />
                  Briefing Transmitted Successfully
                </div>
              )}
            </div>
          </SectionCard>

          {/* Timeline */}
          <SectionCard title="Event Log" icon={Calendar}>
            <div className="space-y-6">
              <div className="flex gap-4 group/log">
                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-laser-cyan shadow-[0_0_8px_#00F0FF] flex-shrink-0 group-hover/log:scale-125 transition-transform" />
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-white">File Created</div>
                  <div className="text-[10px] font-mono text-white mt-1">
                    {format(new Date(student.createdAt), 'yyyy.MM.dd // HH:mm')}
                  </div>
                </div>
              </div>
              {student.paymentDate && (
                <div className="flex gap-4 group/log">
                  <div className="w-1.5 h-1.5 mt-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] flex-shrink-0 group-hover/log:scale-125 transition-transform" />
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-white">Credits Received</div>
                    <div className="text-[10px] font-mono text-white mt-1">
                      {format(new Date(student.paymentDate), 'yyyy.MM.dd // HH:mm')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
