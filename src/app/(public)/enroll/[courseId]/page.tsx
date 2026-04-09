'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import {
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Cpu,
  User,
  GraduationCap,
  ClipboardCheck,
  Mail,
  Phone,
  MapPin,
  Building2,
  BookOpen,
  Calendar,
  Hash,
  MessageCircle,
  Megaphone,
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

const stepConfig = [
  { label: 'Identity', icon: User, description: 'Personal Information' },
  { label: 'Academic', icon: GraduationCap, description: 'College Details' },
  { label: 'Confirm', icon: ClipboardCheck, description: 'Review & Pay' },
];

const validationMessages: Record<string, string> = {
  name: 'Please enter your full name',
  email: 'A valid email address is required',
  phone: 'Phone number is required for communication',
  collegeName: 'Please enter your college or institute name',
  branch: 'Your branch or specialization is required',
  year: 'Please select your current year',
  semester: 'Please select your current semester',
  rollNumber: 'University roll number is required',
  city: 'Please enter your city',
};

function InputField({ label, icon: Icon, value, onChange, placeholder, error, type = 'text', required = false }: {
  label: string; icon: any; value: string; onChange: (v: string) => void; placeholder: string; error?: string; type?: string; required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-medium text-white/60 tracking-wide">
        <Icon className="w-3.5 h-3.5 text-emerald/70" />
        {label} {required && <span className="text-emerald">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-glass-light border ${error ? 'border-red/60' : 'border-border-med'} p-3 text-sm text-white placeholder-white/30 focus:border-emerald/70 focus:ring-1 focus:ring-emerald/30 outline-none transition-all duration-200`}
      />
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red mt-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({ label, icon: Icon, value, onChange, placeholder, options, error, required = false }: {
  label: string; icon: any; value: string; onChange: (v: string) => void; placeholder: string; options: { value: string; label: string }[]; error?: string; required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-medium text-white/60 tracking-wide">
        <Icon className="w-3.5 h-3.5 text-emerald/70" />
        {label} {required && <span className="text-emerald">*</span>}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full bg-glass-light border ${error ? 'border-red/60' : 'border-border-med'} p-3 text-sm text-white focus:border-emerald/70 focus:ring-1 focus:ring-emerald/30 outline-none transition-all duration-200 appearance-none`}
      >
        <option value="" className="bg-charcoal">{placeholder}</option>
        {options.map(o => <option key={o.value} value={o.value} className="bg-charcoal">{o.label}</option>)}
      </select>
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red mt-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

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
      } catch {
        setError('Failed to load course details.');
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [resolvedParams.courseId]);

  const validateStep = (currentStep: number) => {
    const errs: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) errs.name = validationMessages.name;
      if (!formData.email.trim()) errs.email = validationMessages.email;
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Please enter a valid email address';
      if (!formData.phone.trim()) errs.phone = validationMessages.phone;
      else if (!/^[\d+\-\s()]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) errs.phone = 'Please enter a valid phone number';
    } else if (currentStep === 2) {
      if (!formData.collegeName.trim()) errs.collegeName = validationMessages.collegeName;
      if (!formData.branch.trim()) errs.branch = validationMessages.branch;
      if (!formData.year) errs.year = validationMessages.year;
      if (!formData.semester) errs.semester = validationMessages.semester;
      if (!formData.rollNumber.trim()) errs.rollNumber = validationMessages.rollNumber;
      if (!formData.city.trim()) errs.city = validationMessages.city;
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
      <div className="relative">
        <div className="w-16 h-16 border-2 border-emerald/20 rounded-full" />
        <div className="absolute inset-0 w-16 h-16 border-2 border-emerald border-t-transparent rounded-full animate-spin" />
      </div>
      <span className="text-sm font-mono text-emerald/80 tracking-widest">Loading course...</span>
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white selection:bg-emerald/30 selection:text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal/5 rounded-full blur-[128px]" />
      </div>

      <div className="pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-dim border border-emerald/30 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-emerald" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">Enroll Now</h1>
                <p className="text-sm text-white/40 mt-0.5">Complete the steps below to secure your spot</p>
              </div>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-2 md:gap-3 py-6 border-b border-border-med">
              {stepConfig.map((s, i) => {
                const StepIcon = s.icon;
                const isActive = step === i + 1;
                const isDone = step > i + 1;
                return (
                  <div key={s.label} className="flex items-center gap-2 md:gap-3 flex-1">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center border-2 transition-all duration-300 ${
                        isDone ? 'bg-emerald border-emerald text-black' :
                        isActive ? 'border-emerald text-emerald bg-emerald-dim' : 'border-border-med text-white/30 bg-glass-light'
                      }`}>
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : <StepIcon className="w-4 h-4" />}
                      </div>
                      <div className="hidden md:block min-w-0">
                        <div className={`text-sm font-medium truncate ${isActive ? 'text-white' : isDone ? 'text-emerald' : 'text-white/30'}`}>{s.label}</div>
                        <div className="text-[11px] text-white/20 truncate">{s.description}</div>
                      </div>
                    </div>
                    {i < 2 && (
                      <div className="flex-1 h-px min-w-4">
                        <div className={`h-full transition-colors duration-300 ${isDone ? 'bg-emerald/50' : 'bg-border-med'}`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {error && (
              <div className="p-4 bg-red-dim border border-red/20 text-red text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form Steps */}
            <div className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2">
                    <User className="w-4 h-4 text-emerald" />
                    <h2 className="text-lg font-display font-semibold text-white">Personal Details</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <InputField label="Full Name" icon={User} value={formData.name} onChange={v => updateField('name', v)} placeholder="Enter your full name" error={formErrors.name} required />
                    </div>
                    <InputField label="Email Address" icon={Mail} value={formData.email} onChange={v => updateField('email', v)} placeholder="you@example.com" error={formErrors.email} type="email" required />
                    <InputField label="Phone Number" icon={Phone} value={formData.phone} onChange={v => updateField('phone', v)} placeholder="+91 XXXXX XXXXX" error={formErrors.phone} type="tel" required />
                    <InputField label="WhatsApp Number" icon={MessageCircle} value={formData.whatsappNumber} onChange={v => updateField('whatsappNumber', v)} placeholder="Same as phone or different" />
                    <InputField label="City" icon={MapPin} value={formData.city} onChange={v => updateField('city', v)} placeholder="Your city" error={formErrors.city} required />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2">
                    <GraduationCap className="w-4 h-4 text-emerald" />
                    <h2 className="text-lg font-display font-semibold text-white">Academic Information</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <InputField label="College / Institute" icon={Building2} value={formData.collegeName} onChange={v => updateField('collegeName', v)} placeholder="Enter your college name" error={formErrors.collegeName} required />
                    </div>
                    <InputField label="Branch / Specialization" icon={BookOpen} value={formData.branch} onChange={v => updateField('branch', v)} placeholder="e.g. Computer Science" error={formErrors.branch} required />
                    <SelectField label="Year" icon={Calendar} value={formData.year} onChange={v => updateField('year', v)} placeholder="Select year" options={years.map(y => ({ value: y, label: y }))} error={formErrors.year} required />
                    <SelectField label="Semester" icon={Hash} value={formData.semester} onChange={v => updateField('semester', v)} placeholder="Select semester" options={semesters.map(s => ({ value: s, label: `${s} Semester` }))} error={formErrors.semester} required />
                    <InputField label="Roll Number" icon={Hash} value={formData.rollNumber} onChange={v => updateField('rollNumber', v)} placeholder="University roll number" error={formErrors.rollNumber} required />
                    <div className="md:col-span-2">
                      <InputField label="How did you hear about us?" icon={Megaphone} value={formData.referrer} onChange={v => updateField('referrer', v)} placeholder="Friend, Instagram, YouTube, etc." />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2">
                    <ClipboardCheck className="w-4 h-4 text-emerald" />
                    <h2 className="text-lg font-display font-semibold text-white">Review Your Details</h2>
                  </div>

                  {/* Review Card */}
                  <div className="border border-border-med bg-glass-light overflow-hidden">
                    {/* Personal Info */}
                    <div className="p-5 border-b border-border-med">
                      <div className="flex items-center gap-2 mb-4">
                        <User className="w-4 h-4 text-emerald" />
                        <span className="text-xs font-medium text-emerald uppercase tracking-wider">Personal Information</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <div className="text-[11px] text-white/30 uppercase tracking-wide mb-0.5">Full Name</div>
                          <div className="text-sm text-white font-medium">{formData.name}</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-white/30 uppercase tracking-wide mb-0.5">Email</div>
                          <div className="text-sm text-white/70">{formData.email}</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-white/30 uppercase tracking-wide mb-0.5">Phone</div>
                          <div className="text-sm text-white/70">{formData.phone}</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-white/30 uppercase tracking-wide mb-0.5">City</div>
                          <div className="text-sm text-white/70">{formData.city}</div>
                        </div>
                      </div>
                    </div>

                    {/* Academic Info */}
                    <div className="p-5 border-b border-border-med">
                      <div className="flex items-center gap-2 mb-4">
                        <GraduationCap className="w-4 h-4 text-emerald" />
                        <span className="text-xs font-medium text-emerald uppercase tracking-wider">Academic Details</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <div className="text-[11px] text-white/30 uppercase tracking-wide mb-0.5">College / Institute</div>
                          <div className="text-sm text-white font-medium">{formData.collegeName}</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-white/30 uppercase tracking-wide mb-0.5">Branch</div>
                          <div className="text-sm text-white/70">{formData.branch}</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-white/30 uppercase tracking-wide mb-0.5">Year / Semester</div>
                          <div className="text-sm text-white/70">{formData.year} &middot; {formData.semester} Sem</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-white/30 uppercase tracking-wide mb-0.5">Roll Number</div>
                          <div className="text-sm text-white/70">{formData.rollNumber}</div>
                        </div>
                      </div>
                    </div>

                    {/* Course & Payment */}
                    <div className="p-5 bg-emerald-dim">
                      <div className="flex items-center gap-2 mb-4">
                        <Cpu className="w-4 h-4 text-emerald" />
                        <span className="text-xs font-medium text-emerald uppercase tracking-wider">Enrollment Summary</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-semibold">{course?.title}</div>
                          <div className="text-xs text-white/40 mt-0.5">{course?.duration} &middot; {course?.category}</div>
                        </div>
                        <div className="text-right">
                          {course?.originalPrice && course.originalPrice > course.price && (
                            <div className="text-xs text-white/30 line-through">{formatCurrency(course.originalPrice)}</div>
                          )}
                          <div className="text-2xl font-bold text-emerald">{formatCurrency(course?.price || 0)}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-3 p-4 bg-glass-light border border-border-med">
                    <ShieldCheck className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-white/40 leading-relaxed">
                      By proceeding with enrollment, you agree to the D-Blanks training terms, refund policy, and code of conduct. Your payment is processed securely through our verified gateway.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center pt-6 border-t border-border-med">
              <div className="text-xs text-white/30 font-mono">
                Step {step} of 3
              </div>
              <div className="flex gap-3">
                {step > 1 && (
                  <button onClick={handleBack} className="h-11 px-6 border border-border-med hover:border-border-hi hover:bg-glass-light text-white/60 text-sm font-medium transition-all duration-200">
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button onClick={handleNext} style={{ backgroundColor: '#10b981' }} className="h-11 px-8 text-black text-sm font-semibold transition-all duration-200 flex items-center gap-2 group hover:opacity-90">
                    Continue
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={submitting} style={{ backgroundColor: '#10b981' }} className="h-12 px-8 text-black text-sm font-bold transition-all duration-200 flex items-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90" >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                    {submitting ? 'Processing...' : `Pay ${formatCurrency(course?.price || 0)}`}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-5">
              {/* Course Card */}
              <div className="border border-border-med bg-glass-light overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image src={course?.thumbnailUrl || '/placeholder-course.jpg'} alt={course?.title || ''} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 bg-emerald text-black text-[11px] font-bold uppercase tracking-wide">
                      {course?.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <h3 className="text-base font-display font-semibold text-white leading-snug">{course?.title}</h3>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border-med">
                    <div>
                      <div className="text-[11px] text-white/30 uppercase tracking-wide mb-0.5">Duration</div>
                      <div className="text-sm text-white/80">{course?.duration}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-white/30 uppercase tracking-wide mb-0.5">Schedule</div>
                      <div className="text-sm text-white/80">{course?.schedule}</div>
                    </div>
                  </div>

                  <div className="flex items-end justify-between pt-3 border-t border-border-med">
                    <div className="text-xs text-white/30 uppercase tracking-wide">Total Fee</div>
                    <div className="text-right">
                      {course?.originalPrice && course.originalPrice > course.price && (
                        <div className="text-xs text-white/30 line-through">{formatCurrency(course.originalPrice)}</div>
                      )}
                      <div className="text-2xl font-bold text-emerald">{formatCurrency(course?.price || 0)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="p-4 bg-glass-light border border-border-med flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-dim border border-emerald/20 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <div className="text-xs font-medium text-white">Secure Payment</div>
                  <div className="text-[11px] text-white/30">256-bit SSL encrypted checkout</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
