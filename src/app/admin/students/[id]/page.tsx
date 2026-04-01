'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { formatCurrency } from '@/lib/utils';

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
  courseId: {
    title: string;
    duration: string;
    schedule: string;
    meetLink: string;
  };
  courseName: string;
  paymentStatus: string;
  paymentAmount: number;
  paymentId: string;
  paymentDate: string;
  enrollmentStatus: string;
  confirmationEmailSent: boolean;
  createdAt: string;
}

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await fetch(`/api/admin/students/${resolvedParams.id}`);
        const data = await res.json();
        
        if (data.error) {
          router.push('/admin/students');
          return;
        }
        
        setStudent(data.student);
      } catch (error) {
        console.error('Error fetching student:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, [resolvedParams.id, router]);

  const updateEnrollmentStatus = async (status: string) => {
    if (!student) return;
    setUpdating(true);

    try {
      const res = await fetch(`/api/admin/students/${student._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentStatus: status }),
      });

      if (res.ok) {
        setStudent({ ...student, enrollmentStatus: status });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const resendConfirmationEmail = async () => {
    if (!student) return;
    setEmailSending(true);

    try {
      const res = await fetch('/api/admin/resend-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentId: student._id }),
      });

      const data = await res.json();
      
      if (data.success) {
        setStudent({ ...student, confirmationEmailSent: true });
        alert('Confirmation email sent successfully!');
      } else {
        alert('Failed to send email: ' + data.error);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    } finally {
      setEmailSending(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openWhatsApp = (phone: string) => {
    const formatted = phone.replace(/\D/g, '');
    window.open(`https://wa.me/91${formatted}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-4xl mb-4">❌</div>
        <h2 className="text-xl font-bold mb-2">Student not found</h2>
        <Link href="/admin/students" className="btn btn-ghost mt-4">
          Back to Students
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <Link href="/admin/students" className="text-sm text-gray-500 hover:text-white mb-2 inline-flex items-center gap-1">
            ← Back to Students
          </Link>
          <h1 className="text-3xl font-bold tracking-[-1px] mb-2">
            {student.studentName}
          </h1>
          <p className="text-sm text-gray-500 font-mono">
            Enrollment: {student.enrollmentId}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => openWhatsApp(student.phone)}
            className="btn btn-green"
          >
            💬 WhatsApp
          </button>
          <button
            onClick={() => copyToClipboard(student.phone)}
            className="btn btn-ghost"
          >
            {copied ? '✓ Copied' : '📋 Copy Phone'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-charcoal border border-carbon rounded-xl p-6">
            <h2 className="font-bold mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Full Name</div>
                <div className="text-white">{student.studentName}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Email</div>
                <a href={`mailto:${student.email}`} className="text-emerald-400 hover:underline">
                  {student.email}
                </a>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Phone</div>
                <div className="text-white font-mono">{student.phone}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">WhatsApp</div>
                <div className="text-white font-mono">
                  {student.whatsappNumber || student.phone}
                </div>
              </div>
              <div className="col-span-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">City</div>
                <div className="text-white">{student.city}</div>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-charcoal border border-carbon rounded-xl p-6">
            <h2 className="font-bold mb-4">Academic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">College</div>
                <div className="text-white">{student.collegeName}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Branch</div>
                <div className="text-white">{student.branch}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Semester</div>
                <div className="text-white">{student.semester}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Roll Number</div>
                <div className="text-white font-mono">{student.rollNumber}</div>
              </div>
            </div>
          </div>

          {/* Course Information */}
          <div className="bg-charcoal border border-carbon rounded-xl p-6">
            <h2 className="font-bold mb-4">Course Information</h2>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Course</div>
                <div className="text-white">{student.courseId?.title || student.courseName}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Duration</div>
                  <div className="text-white">{student.courseId?.duration || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Schedule</div>
                  <div className="text-white">{student.courseId?.schedule || 'N/A'}</div>
                </div>
              </div>
              {student.courseId?.meetLink && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Google Meet</div>
                  <a 
                    href={student.courseId.meetLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:underline"
                  >
                    {student.courseId.meetLink}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-charcoal border border-carbon rounded-xl p-6">
            <h2 className="font-bold mb-4">Status</h2>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-2">Payment Status</div>
                <span className={`status-chip ${student.paymentStatus}`}>
                  {student.paymentStatus}
                </span>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-2">Enrollment Status</div>
                <select
                  value={student.enrollmentStatus}
                  onChange={(e) => updateEnrollmentStatus(e.target.value)}
                  disabled={updating}
                  className="f-input w-full"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-charcoal border border-carbon rounded-xl p-6">
            <h2 className="font-bold mb-4">Payment Details</h2>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Amount</div>
                <div className="text-2xl font-mono font-medium text-white">
                  {student.paymentAmount ? formatCurrency(student.paymentAmount) : '-'}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Transaction ID</div>
                <div className="text-sm text-white font-mono break-all">
                  {student.paymentId || '-'}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Payment Date</div>
                <div className="text-sm text-white">
                  {student.paymentDate 
                    ? format(new Date(student.paymentDate), 'MMM d, yyyy h:mm a')
                    : '-'
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-charcoal border border-carbon rounded-xl p-6">
            <h2 className="font-bold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button
                onClick={() => openWhatsApp(student.phone)}
                className="btn btn-green w-full justify-center"
              >
                💬 Open WhatsApp
              </button>
              <button
                onClick={resendConfirmationEmail}
                disabled={emailSending}
                className="btn btn-ghost w-full justify-center"
              >
                {emailSending ? 'Sending...' : '📧 Resend Confirmation Email'}
              </button>
              {student.confirmationEmailSent && (
                <div className="text-xs text-emerald-400 text-center mt-2">
                  ✓ Confirmation email sent
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-charcoal border border-carbon rounded-xl p-6">
            <h2 className="font-bold mb-4">Timeline</h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-teal-500 flex-shrink-0" />
                <div>
                  <div className="text-sm text-white">Enrolled</div>
                  <div className="text-xs text-gray-500">
                    {format(new Date(student.createdAt), 'MMM d, yyyy h:mm a')}
                  </div>
                </div>
              </div>
              {student.paymentDate && (
                <div className="flex gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-white">Payment Received</div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(student.paymentDate), 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
