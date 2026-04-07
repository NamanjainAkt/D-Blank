'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Footer2 from "@/components/Footer2";
import { CheckCircle2, ShieldCheck, ArrowRight, MessageCircle, Mail, Terminal, Cpu, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function SuccessContent() {
  const searchParams = useSearchParams();
  const enrollmentId = searchParams.get('enrollmentId');
  const transactionId = searchParams.get('transactionId');
  const isBypass = process.env.NEXT_PUBLIC_BYPASS_PAYMENT === 'true';

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-32 pb-20 px-4 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="max-w-2xl w-full">
          <div className="bg-zinc-900 border border-emerald-500/20 overflow-hidden relative group">
            {/* Top Glow */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_15px_#10b981]" />
            
            <div className="p-8 md:p-12 text-center space-y-8">
              {/* Success Icon */}
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
                <div className="relative w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl font-black uppercase tracking-tighter italic">Mission Authorized</h1>
                <p className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.3em]">// System access granted successfully</p>
              </div>

              <p className="text-zinc-400 font-mono text-sm leading-relaxed uppercase">
                Your authorization protocol is complete. The training modules are now active for your unique signature.
              </p>

              {/* Transaction Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-black/40 border border-white/5 text-left space-y-1">
                  <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Enrollment ID</div>
                  <div className="text-[11px] font-mono text-emerald-500 uppercase truncate">{enrollmentId}</div>
                </div>
                <div className="p-4 bg-black/40 border border-white/5 text-left space-y-1">
                  <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Transaction ID</div>
                  <div className="text-[11px] font-mono text-emerald-500 uppercase truncate">{transactionId || 'SIMULATED_UPLINK'}</div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="space-y-4 text-left border-t border-white/5 pt-8">
                <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">Post-Authorization Protocol:</h3>
                {[
                  { icon: Mail, text: 'Check your comms terminal (email) for authorization keys.' },
                  { icon: MessageCircle, text: 'Join the private operator group on WhatsApp.' },
                  { icon: Terminal, text: 'Attend your first tactical session via the Meet Link.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-white/[0.02] border border-white/5">
                    <item.icon className="w-4 h-4 text-emerald-500/50" />
                    <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/courses" className="flex-1">
                  <Button className="w-full bg-white text-black font-black uppercase tracking-widest h-12 text-[10px]">
                    Explore More Grid
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-zinc-400 font-black uppercase tracking-widest h-12 text-[10px]">
                    Return to Hub
                  </Button>
                </Link>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="bg-emerald-500/5 border-t border-white/5 px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Authorized by D-Blanks Core</span>
              </div>
              <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Secure Uplink: Stable</span>
            </div>
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
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Decrypting Transaction...</span>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
