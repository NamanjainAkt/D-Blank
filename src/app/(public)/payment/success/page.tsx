'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { Footer } from '@/components/Footer';
import Footer2 from '@/components/Footer2';
import {
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  Mail,
  Video,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';
import { useState } from 'react';

function CopyableId({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 bg-glass-light border border-border-med space-y-1.5">
      <div className="text-[11px] text-white/30 uppercase tracking-wider font-mono">{label}</div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-mono text-emerald truncate">{value}</span>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 p-1.5 hover:bg-glass-med transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald" /> : <Copy className="w-3.5 h-3.5 text-white/30" />}
        </button>
      </div>
    </div>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const enrollmentId = searchParams.get('enrollmentId');
  const transactionId = searchParams.get('transactionId');

  const nextSteps = [
    {
      icon: Mail,
      title: 'Check your email',
      description: 'We\'ve sent enrollment confirmation and course access details to your registered email.',
    },
    {
      icon: MessageCircle,
      title: 'Join the WhatsApp group',
      description: 'Connect with your batch mates and get real-time updates from instructors.',
    },
    {
      icon: Video,
      title: 'Attend your first session',
      description: 'Your class schedule and Google Meet link are included in the confirmation email.',
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald/5 rounded-full blur-[160px]" />
      </div>

      <div className="pb-20 px-4 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="max-w-xl w-full space-y-6">

          {/* Main Success Card */}
          <div className="border border-border-med bg-glass-light overflow-hidden relative">
            {/* Top accent line */}
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, transparent, #10b981, transparent)' }} />

            <div className="p-8 md:p-10 text-center space-y-6">
              {/* Animated Success Icon */}
              <div className="relative inline-block">
                <div className="absolute inset-0 w-20 h-20 bg-emerald/20 rounded-full blur-xl mx-auto" style={{ animation: 'breathe 3s ease-in-out infinite' }} />
                <div className="relative w-20 h-20 bg-emerald-dim border-2 border-emerald/40 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-emerald" />
                </div>
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                  Payment Successful
                </h1>
                <p className="text-sm text-white/40">
                  You&apos;re officially enrolled! Here&apos;s your confirmation.
                </p>
              </div>

              {/* Transaction IDs */}
              <div className="grid sm:grid-cols-2 gap-3">
                <CopyableId label="Enrollment ID" value={enrollmentId || 'N/A'} />
                <CopyableId label="Transaction ID" value={transactionId || 'N/A'} />
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="border border-border-med bg-glass-light overflow-hidden">
            <div className="px-6 py-4 border-b border-border-med">
              <h2 className="text-sm font-display font-semibold text-white">What happens next?</h2>
            </div>
            <div className="divide-y divide-border-med">
              {nextSteps.map((item, i) => (
                <div key={i} className="flex items-start gap-4 px-6 py-4">
                  <div className="w-9 h-9 flex-shrink-0 bg-emerald-dim border border-emerald/20 flex items-center justify-center mt-0.5">
                    <item.icon className="w-4 h-4 text-emerald" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white">{item.title}</div>
                    <div className="text-xs text-white/40 mt-0.5 leading-relaxed">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/courses" className="flex-1">
              <button
                style={{ backgroundColor: '#10b981' }}
                className="w-full h-12 text-black text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:opacity-90"
              >
                Browse More Courses
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/" className="flex-1">
              <button className="w-full h-12 border border-border-med hover:border-border-hi hover:bg-glass-light text-white/60 text-sm font-medium transition-all duration-200">
                Back to Home
              </button>
            </Link>
          </div>

          {/* Security Footer */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald/50" />
            <span className="text-[11px] text-white/20 font-mono tracking-wide">
              Verified &amp; secured by D-Blanks
            </span>
          </div>

        </div>
      </div>

      <Footer />
      <Footer2 />
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-emerald/20 rounded-full" />
          <div className="absolute inset-0 w-16 h-16 border-2 border-emerald border-t-transparent rounded-full animate-spin" />
        </div>
        <span className="text-sm font-mono text-emerald/80 tracking-widest">Verifying payment...</span>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
