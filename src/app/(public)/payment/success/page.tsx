'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';

function SuccessContent() {
  const searchParams = useSearchParams();
  const enrollmentId = searchParams.get('id') || searchParams.get('enrollmentId');
  const isBypass = searchParams.get('bypass') === 'true';

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-24 pb-16 px-8">
        <div className="max-w-lg mx-auto">
          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-laser-cyan/20 transition-colors backdrop-blur-sm">
            {/* Test Mode Banner */}
            {isBypass && (
              <div className="bg-laser-cyan/10 border-b border-laser-cyan/20 px-6 py-3 text-center">
                <span className="text-laser-cyan text-[10px] font-mono uppercase tracking-widest flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  TEST MODE - Simulated Enrollment
                </span>
              </div>
            )}

            {/* Success Line */}
            <div className="h-0.5 bg-gradient-to-r from-laser-cyan via-neon-purple to-laser-cyan bg-[length:200%_100%] animate-shimmer" />

            <div className="p-12 text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 mx-auto mb-7 rounded-full bg-laser-cyan/10 border border-laser-cyan/30 flex items-center justify-center animate-scale-in shadow-[0_0_40px_rgba(0,240,255,0.3)]">
                <svg className="w-10 h-10 text-laser-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h1 className="text-3xl font-display font-bold tracking-tight mb-3 text-white">
                Enrollment Confirmed!
              </h1>

              <p className="text-gray-400 leading-relaxed mb-8">
                {isBypass
                  ? 'Test enrollment was successful. In production, payment would have been processed.'
                  : 'Your enrollment has been successfully processed. Check your email for course details, schedule, and Google Meet link.'
                }
              </p>

              {/* Enrollment ID */}
              {enrollmentId && (
                <div className="bg-zinc-800/50 border border-white/10 rounded-lg p-4 mb-8">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">
                    Enrollment ID
                  </div>
                  <div className="font-mono text-lg text-white">{enrollmentId}</div>
                </div>
              )}

              {/* Checklist */}
              <div className="text-left space-y-3.5 mb-8">
                {(isBypass ? [
                  { text: 'Test enrollment created in database' },
                  { text: 'Simulated payment recorded' },
                  { text: 'Ready for production with PhonePe' },
                ] : [
                  { text: 'Check your email for course details' },
                  { text: 'Join the WhatsApp group (check email)' },
                  { text: 'Attend your first session on Google Meet' },
                ]).map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-laser-cyan/10 border border-laser-cyan/30 flex items-center justify-center text-[10px] text-laser-cyan flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-400 font-mono">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <Link href="/courses" className="btn btn-laser w-full">
                  Browse More Courses
                </Link>
                <Link href="/" className="w-full px-6 py-3.5 text-sm font-display font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-all">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
