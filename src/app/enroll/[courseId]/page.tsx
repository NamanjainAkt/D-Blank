'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { formatCurrency } from '@/lib/utils';

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
  totalSeats: number;
  enrolledCount: number;
}

interface FormData {
  courseId: string;
  studentName: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  collegeName: string;
  branch: string;
  semester: string;
  rollNumber: string;
  city: string;
}

const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

export default function EnrollPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [enrollmentId, setEnrollmentId] = useState('');

  const [formData, setFormData] = useState<FormData>({
    courseId: resolvedParams.courseId,
    studentName: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    collegeName: '',
    branch: '',
    semester: '',
    rollNumber: '',
    city: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        const foundCourse = data.courses?.find((c: any) => c._id === resolvedParams.courseId);
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setError('Course not found');
        }
      } catch (err) {
        setError('Failed to load course');
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [resolvedParams.courseId]);

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (currentStep === 1) {
      if (!formData.studentName.trim()) newErrors.studentName = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      else if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = 'Invalid phone (10 digits)';
    } else if (currentStep === 2) {
      if (!formData.collegeName.trim()) newErrors.collegeName = 'College is required';
      if (!formData.branch.trim()) newErrors.branch = 'Branch is required';
      if (!formData.semester) newErrors.semester = 'Semester is required';
      if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setSubmitting(false);
        return;
      }

      setEnrollmentId(data.enrollment.id);

      const paymentRes = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enrollmentId: data.enrollment.id,
          amount: course?.price,
        }),
      });

      const paymentData = await paymentRes.json();

      if (paymentData.bypass) {
        router.push(`/payment/success?enrollmentId=${data.enrollment.id}&bypass=true`);
      } else if (paymentData.paymentUrl) {
        window.location.href = paymentData.paymentUrl;
      } else {
        setError('Failed to initiate payment');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="flex items-center gap-3 text-laser-cyan/50 font-mono uppercase tracking-widest animate-pulse">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading mission details...
          </div>
        </div>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-32 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-none bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-display font-bold mb-2 uppercase tracking-tight">Mission Not Found</h2>
          <Link href="/courses" className="mt-4 btn btn-outline">
            Browse Missions
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white font-body overflow-x-hidden">
      <Navbar />

      <div className="pt-24 pb-16 px-8 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-bg opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-charcoal/80 border border-neon-purple/20 rounded-none overflow-hidden hover:border-neon-purple/40 transition-colors backdrop-blur-xl">
                {/* Progress Bar */}
                <div className="px-8 py-6 border-b border-white/5 bg-white/2">
                  <div className="flex items-center gap-2">
                    {[
                      { num: 1, name: 'Personal' },
                      { num: 2, name: 'Academic' },
                      { num: 3, name: 'Review' },
                    ].map((s, i) => (
                      <div key={s.num} className="flex items-center">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-none flex items-center justify-center text-xs font-display font-black transition-all ${
                            step > s.num ? 'bg-neon-purple text-white' :
                            step === s.num ? 'bg-laser-cyan text-black' :
                            'bg-white/5 text-gray-600 border border-white/10'
                          }`}>
                            {step > s.num ? (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : s.num}
                          </div>
                          <span className={`text-[10px] font-display font-black uppercase tracking-widest ${
                            step >= s.num ? 'text-white' : 'text-gray-600'
                          }`}>
                            {s.name}
                          </span>
                        </div>
                        {i < 2 && <span className="mx-3 text-neon-purple/30">→</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Body */}
                <div className="p-8">
                  {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-none text-red-400 text-[11px] font-mono uppercase tracking-wider flex items-center gap-2">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="animate-fade-up">
                      <h2 className="text-2xl font-display font-black mb-2 uppercase tracking-tight text-white">Personal Data</h2>
                      <p className="text-[11px] font-mono uppercase tracking-widest text-laser-cyan mb-8">// Identification required</p>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                            Full Legal Name *
                          </label>
                          <input
                            type="text"
                            value={formData.studentName}
                            onChange={(e) => updateField('studentName', e.target.value)}
                            placeholder="OPERATOR NAME"
                            className={`f-input font-mono uppercase ${errors.studentName ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'focus:shadow-[0_0_15px_var(--laser-cyan)]'}`}
                          />
                          {errors.studentName && (
                            <p className="text-red-400 text-[10px] font-mono mt-2 uppercase tracking-tighter">{errors.studentName}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                              Comms Link (Email) *
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => updateField('email', e.target.value)}
                              placeholder="ID@NETWORK.NET"
                              className={`f-input font-mono uppercase ${errors.email ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'focus:shadow-[0_0_15px_var(--laser-cyan)]'}`}
                            />
                            {errors.email && (
                              <p className="text-red-400 text-[10px] font-mono mt-2 uppercase tracking-tighter">{errors.email}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                              Mobile Uplink *
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => updateField('phone', e.target.value)}
                              placeholder="+91-0000000000"
                              className={`f-input font-mono ${errors.phone ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'focus:shadow-[0_0_15px_var(--laser-cyan)]'}`}
                            />
                            {errors.phone && (
                              <p className="text-red-400 text-[10px] font-mono mt-2 uppercase tracking-tighter">{errors.phone}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                            Secondary Comms (Optional)
                          </label>
                          <input
                            type="tel"
                            value={formData.whatsappNumber}
                            onChange={(e) => updateField('whatsappNumber', e.target.value)}
                            placeholder="WHATSAPP_ID"
                            className="f-input font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                            Base City *
                          </label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => updateField('city', e.target.value)}
                            placeholder="LOCATION_ID"
                            className={`f-input font-mono uppercase ${errors.city ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'focus:shadow-[0_0_15px_var(--laser-cyan)]'}`}
                          />
                          {errors.city && (
                            <p className="text-red-400 text-[10px] font-mono mt-2 uppercase tracking-tighter">{errors.city}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="animate-fade-up">
                      <h2 className="text-2xl font-display font-black mb-2 uppercase tracking-tight text-white">Academy Specs</h2>
                      <p className="text-[11px] font-mono uppercase tracking-widest text-laser-cyan mb-8">// Educational background</p>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                            Institute / Academy *
                          </label>
                          <input
                            type="text"
                            value={formData.collegeName}
                            onChange={(e) => updateField('collegeName', e.target.value)}
                            placeholder="ACADEMY_ID"
                            className={`f-input font-mono uppercase ${errors.collegeName ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'focus:shadow-[0_0_15px_var(--laser-cyan)]'}`}
                          />
                          {errors.collegeName && (
                            <p className="text-red-400 text-[10px] font-mono mt-2 uppercase tracking-tighter">{errors.collegeName}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                              Specialization *
                            </label>
                            <input
                              type="text"
                              value={formData.branch}
                              onChange={(e) => updateField('branch', e.target.value)}
                              placeholder="e.g. CORE_CS"
                              className={`f-input font-mono uppercase ${errors.branch ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'focus:shadow-[0_0_15px_var(--laser-cyan)]'}`}
                            />
                            {errors.branch && (
                              <p className="text-red-400 text-[10px] font-mono mt-2 uppercase tracking-tighter">{errors.branch}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                              Level (Semester) *
                            </label>
                            <select
                              value={formData.semester}
                              onChange={(e) => updateField('semester', e.target.value)}
                              className={`f-input font-mono uppercase ${errors.semester ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'focus:shadow-[0_0_15px_var(--laser-cyan)]'}`}
                            >
                              <option value="">SELECT_LEVEL</option>
                              {semesters.map((s) => (
                                <option key={s} value={s}>{s} LEVEL</option>
                              ))}
                            </select>
                            {errors.semester && (
                              <p className="text-red-400 text-[10px] font-mono mt-2 uppercase tracking-tighter">{errors.semester}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                            Registry Number *
                          </label>
                          <input
                            type="text"
                            value={formData.rollNumber}
                            onChange={(e) => updateField('rollNumber', e.target.value)}
                            placeholder="ROLL_NUM_ID"
                            className={`f-input font-mono uppercase ${errors.rollNumber ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'focus:shadow-[0_0_15px_var(--laser-cyan)]'}`}
                          />
                          {errors.rollNumber && (
                            <p className="text-red-400 text-[10px] font-mono mt-2 uppercase tracking-tighter">{errors.rollNumber}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="animate-fade-up">
                      <h2 className="text-2xl font-display font-black mb-2 uppercase tracking-tight text-white">Review Uplink</h2>
                      <p className="text-[11px] font-mono uppercase tracking-widest text-laser-cyan mb-8">// Confirm mission parameters</p>

                      <div className="space-y-4 text-[11px] font-mono uppercase tracking-widest">
                        <div className="grid grid-cols-2 gap-4 p-6 bg-white/2 border border-white/5">
                          <div className="border-l border-neon-purple/50 pl-3">
                            <div className="text-gray-500 mb-1">OPERATOR</div>
                            <div className="font-bold text-white truncate">{formData.studentName}</div>
                          </div>
                          <div className="border-l border-neon-purple/50 pl-3">
                            <div className="text-gray-500 mb-1">COMMS</div>
                            <div className="font-bold text-white truncate">{formData.email}</div>
                          </div>
                          <div className="border-l border-neon-purple/50 pl-3">
                            <div className="text-gray-500 mb-1">MOBILE</div>
                            <div className="font-bold text-white truncate">{formData.phone}</div>
                          </div>
                          <div className="border-l border-neon-purple/50 pl-3">
                            <div className="text-gray-500 mb-1">BASE_CITY</div>
                            <div className="font-bold text-white truncate">{formData.city}</div>
                          </div>
                          <div className="border-l border-neon-purple/50 pl-3">
                            <div className="text-gray-500 mb-1">INSTITUTE</div>
                            <div className="font-bold text-white truncate">{formData.collegeName}</div>
                          </div>
                          <div className="border-l border-neon-purple/50 pl-3">
                            <div className="text-gray-500 mb-1">SPECIAL</div>
                            <div className="font-bold text-white truncate">{formData.branch}</div>
                          </div>
                          <div className="border-l border-neon-purple/50 pl-3">
                            <div className="text-gray-500 mb-1">LEVEL</div>
                            <div className="font-bold text-white truncate">{formData.semester}</div>
                          </div>
                          <div className="border-l border-neon-purple/50 pl-3">
                            <div className="text-gray-500 mb-1">REG_ID</div>
                            <div className="font-bold text-white truncate">{formData.rollNumber}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5">
                    <div className="text-[10px] text-laser-cyan/50 font-mono uppercase tracking-widest">
                      PHASE 0{step} / 03
                    </div>
                    <div className="flex gap-4">
                      {step > 1 && (
                        <button onClick={handleBack} className="btn btn-outline py-2.5 px-6 text-xs">
                          Back
                        </button>
                      )}
                      {step < 3 ? (
                        <button onClick={handleNext} className="btn btn-laser py-2.5 px-8 text-xs">
                          Continue
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          disabled={submitting}
                          className="btn btn-cyber py-3 px-10 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {submitting ? (
                            <span className="flex items-center gap-2">
                              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              UPLINKING...
                            </span>
                          ) : (
                            process.env.NEXT_PUBLIC_BYPASS_PAYMENT === 'true' ? (
                              <>CONFIRM_ENROLL</>
                            ) : (
                              <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
                                </svg>
                                PAY ₹{course.price.toLocaleString()}
                              </span>
                            )
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 bg-charcoal/80 border border-laser-cyan/20 rounded-none overflow-hidden hover:border-laser-cyan/40 transition-colors backdrop-blur-xl">
                {/* Course Preview */}
                <div className="relative h-48 bg-zinc-900 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-laser-cyan/20 z-10" />
                  {course.thumbnailUrl ? (
                    <Image src={course.thumbnailUrl} alt={course.title} fill className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-graphite z-10">
                      <span className="text-4xl font-display font-black text-white/10">{course.title[0]}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent z-20" />
                  
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-laser-cyan/10 border-b border-l border-laser-cyan/20 z-30" />
                </div>

                <div className="p-8 relative">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-laser-cyan/60 mb-3">// MISSION_SPEC</div>
                  <h3 className="text-xl font-display font-black leading-tight mb-6 text-white uppercase tracking-tight">{course.title}</h3>

                  <div className="space-y-4 text-[11px] font-mono border-t border-white/5 pt-6 uppercase tracking-widest">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">DURATION</span>
                      <span className="text-white border-b border-laser-cyan/30">{course.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">WINDOW</span>
                      <span className="text-white border-b border-laser-cyan/30">{course.schedule}</span>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-white/2 border border-white/5 rounded-none">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">TOTAL_FEE</span>
                      <div className="text-right">
                        {course.originalPrice && (
                          <div className="text-xs text-gray-600 font-mono line-through mb-1">
                            ₹{course.originalPrice.toLocaleString()}
                          </div>
                        )}
                        <div className="text-3xl font-display font-black text-white">
                          ₹{course.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-laser-cyan animate-pulse shadow-[0_0_8px_var(--laser-cyan)]" />
                    {process.env.NEXT_PUBLIC_BYPASS_PAYMENT === 'true'
                      ? 'SIMULATION_MODE_ACTIVE'
                      : 'SECURE_UPLINK_VIA_PHONEPE'
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
