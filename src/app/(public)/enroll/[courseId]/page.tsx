'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { formatCurrency } from '@/lib/utils';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ShieldCheck,
  Cpu
} from 'lucide-react';

interface Course {
  _id: string;
  title: string;
  shortDescription: string;
  duration: string;
  schedule: string;
  price: number;
  originalPrice?: number;
  category: string;
  thumbnailUrl?: string;
}

const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduated'];

export default function EnrollPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    collegeName: '',
    branch: '',
    year: '',
    semester: '',
    rollNumber: '',
    city: '',
    referrer: '',
  });

  const [formErrors, setErrors] = useState<Partial<Record<string, string>>>({});

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        const foundCourse = data.courses?.find((c: any) => c._id === resolvedParams.courseId);
        if (foundCourse) setCourse(foundCourse);
        else setError('Course not found');
      } catch (err) {
        setError('Failed to load course details.');
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [resolvedParams.courseId]);

  const validateStep = (currentStep: number) => {
    const errs: any = {};
    if (currentStep === 1) {
      if (!formData.name) errs.name = 'REQUIRED';
      if (!formData.email) errs.email = 'REQUIRED';
      if (!formData.phone) errs.phone = 'REQUIRED';
    } else if (currentStep === 2) {
      if (!formData.collegeName) errs.collegeName = 'REQUIRED';
      if (!formData.branch) errs.branch = 'REQUIRED';
      if (!formData.year) errs.year = 'REQUIRED';
      if (!formData.semester) errs.semester = 'REQUIRED';
      if (!formData.rollNumber) errs.rollNumber = 'REQUIRED';
      if (!formData.city) errs.city = 'REQUIRED';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => { if (validateStep(step)) setStep(step + 1); };
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      // 1. Create Enrollment & Enroller Profile
      const enrollRes = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course?._id,
          studentData: formData,
          paymentMethod: 'UPI'
        }),
      });

      const enrollData = await enrollRes.json();
      if (!enrollRes.ok) throw new Error(enrollData.error || 'Failed to authorize');

      const enrollmentId = enrollData.enrollmentId;

      // 2. Handle Payment (Simulated if bypass is on)
      if (process.env.NEXT_PUBLIC_BYPASS_PAYMENT === 'true') {
        const payRes = await fetch('/api/payment/dummy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enrollmentId }),
        });
        const payData = await payRes.json();
        if (payRes.ok) {
          router.push(`/payment/success?enrollmentId=${enrollmentId}&transactionId=${payData.transactionId}`);
        } else {
          throw new Error(payData.error || 'Transaction failed');
        }
      } else {
        // Real PhonePe flow would go here
        const initiateRes = await fetch('/api/payment/initiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enrollmentId, amount: course?.price }),
        });
        const initiateData = await initiateRes.json();
        if (initiateData.paymentUrl) window.location.href = initiateData.paymentUrl;
        else throw new Error('Payment gateway uplink failed');
      }
    } catch (err: any) {
      setError(err.message || 'System error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (f: string, v: string) => {
    setFormData({ ...formData, [f]: v });
    if (formErrors[f]) setErrors({ ...formErrors, [f]: '' });
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Scanning Grid...</span>
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter italic">Mission Authorization</h1>
                <p className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">// Authorization Protocol Phase 0{step}</p>
              </div>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-4 border-b border-white/5 pb-8">
              {['Identity', 'Academic', 'Verification'].map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-8 h-8 flex items-center justify-center text-[10px] font-mono border ${
                    step > i + 1 ? 'bg-emerald-500 border-emerald-500 text-black' :
                    step === i + 1 ? 'border-emerald-500 text-emerald-500' : 'border-white/10 text-zinc-600'
                  }`}>
                    {step > i + 1 ? <CheckCircle2 className="w-4 h-4" /> : `0${i+1}`}
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${step === i + 1 ? 'text-white' : 'text-zinc-600'}`}>{s}</span>
                  {i < 2 && <div className="w-8 h-px bg-white/5" />}
                </div>
              ))}
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono uppercase tracking-widest flex items-center gap-3">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            {/* Form Steps */}
            <div className="space-y-8 animate-in fade-in duration-500">
              {step === 1 && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Full Signature Name *</label>
                    <input value={formData.name} onChange={e => updateField('name', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-emerald-500/50 outline-none uppercase" placeholder="OPERATOR_NAME" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Comms Uplink (Email) *</label>
                    <input value={formData.email} onChange={e => updateField('email', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-emerald-500/50 outline-none uppercase" placeholder="ID@NETWORK.NET" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Mobile Link (Phone) *</label>
                    <input value={formData.phone} onChange={e => updateField('phone', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-emerald-500/50 outline-none" placeholder="+91-XXXXX-XXXXX" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Secondary WhatsApp (Opt)</label>
                    <input value={formData.whatsappNumber} onChange={e => updateField('whatsappNumber', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-emerald-500/50 outline-none" placeholder="SEC_LINK" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Origin Base (City) *</label>
                    <input value={formData.city} onChange={e => updateField('city', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-emerald-500/50 outline-none uppercase" placeholder="LOCATION_ID" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Institute / Academy *</label>
                    <input value={formData.collegeName} onChange={e => updateField('collegeName', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-emerald-500/50 outline-none uppercase" placeholder="ACADEMY_ID" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Stream / Specialization *</label>
                    <input value={formData.branch} onChange={e => updateField('branch', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-emerald-500/50 outline-none uppercase" placeholder="e.g. CS_ENGINEERING" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Year *</label>
                    <select value={formData.year} onChange={e => updateField('year', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-emerald-500/50 outline-none uppercase appearance-none">
                      <option value="">SELECT_YEAR</option>
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Level (Semester) *</label>
                    <select value={formData.semester} onChange={e => updateField('semester', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-emerald-500/50 outline-none uppercase appearance-none">
                      <option value="">SELECT_LEVEL</option>
                      {semesters.map(s => <option key={s} value={s}>{s} LEVEL</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Registration ID (Roll Num) *</label>
                    <input value={formData.rollNumber} onChange={e => updateField('rollNumber', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-emerald-500/50 outline-none uppercase" placeholder="ROLL_ID" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Acquisition Channel (Referrer)</label>
                    <input value={formData.referrer} onChange={e => updateField('referrer', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-emerald-500/50 outline-none uppercase" placeholder="HOW DID YOU FIND US?" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="p-8 bg-white/[0.02] border border-white/5 space-y-6">
                  <div className="grid md:grid-cols-2 gap-8 text-[11px] font-mono uppercase tracking-widest">
                    <div className="space-y-1">
                      <span className="text-zinc-600 text-[9px]">Identity</span>
                      <div className="text-zinc-200">{formData.name}</div>
                      <div className="text-zinc-400 lowercase">{formData.email}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-zinc-600 text-[9px]">Base</span>
                      <div className="text-zinc-200">{formData.city}</div>
                      <div className="text-zinc-400">{formData.phone}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-zinc-600 text-[9px]">Academy</span>
                      <div className="text-zinc-200 line-clamp-1">{formData.collegeName}</div>
                      <div className="text-zinc-400">{formData.branch} // {formData.semester}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-zinc-600 text-[9px]">Mission</span>
                      <div className="text-emerald-500 font-black">{course?.title}</div>
                      <div className="text-zinc-400">{formatCurrency(course?.price || 0)}</div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/5 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-normal">
                      By authorizing, you agree to the D-Blanks training protocol and code of conduct.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Nav Controls */}
            <div className="flex justify-between items-center pt-10 border-t border-white/5">
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                Uplink Phase 0{step} / 03
              </div>
              <div className="flex gap-4">
                {step > 1 && (
                  <button onClick={handleBack} className="h-12 px-8 border border-white/10 hover:bg-white/5 font-mono text-[10px] uppercase tracking-widest transition-all">
                    Previous
                  </button>
                )}
                {step < 3 ? (
                  <button onClick={handleNext} className="h-12 px-10 bg-white text-black hover:bg-zinc-200 font-mono text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 group">
                    Continue <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={submitting} className="h-14 px-12 bg-emerald-600 hover:bg-emerald-500 text-black font-black text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center gap-3 disabled:opacity-50">
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Cpu className="w-4 h-4" />}
                    {submitting ? 'AUTHORIZING...' : `CONFIRM ENROLLMENT // ${formatCurrency(course?.price || 0)}`}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <div className="bg-zinc-900 border border-white/5 overflow-hidden">
                <div className="relative aspect-[4/3] opacity-40">
                  <Image src={course?.thumbnailUrl || '/placeholder-course.jpg'} alt="" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Target Mission</div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight leading-tight">{course?.title}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Duration</div>
                      <div className="text-[10px] font-mono text-zinc-300">{course?.duration}</div>
                    </div>
                    <div>
                      <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Category</div>
                      <div className="text-[10px] font-mono text-zinc-300">{course?.category}</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                    <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Operation Fee</div>
                    <div className="text-2xl font-black text-emerald-500 font-display italic">{formatCurrency(course?.price || 0)}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 text-center space-y-2">
                <div className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-widest">Secure Gateway Enabled</div>
                <p className="text-[9px] font-mono text-zinc-600 uppercase leading-relaxed">
                  Encryption Layer 256-bit AES <br />
                  Digital Transmission Active
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
