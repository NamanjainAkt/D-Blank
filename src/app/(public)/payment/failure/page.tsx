'use client';

import Link from 'next/link';
import { Navbar } from '@/components/Navbar';

export default function PaymentFailurePage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-24 pb-16 px-8">
        <div className="max-w-lg mx-auto">
          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-cyber-pink/20 transition-colors backdrop-blur-sm">
            <div className="p-12 text-center">
              {/* Failure Icon */}
              <div className="w-20 h-20 mx-auto mb-7 rounded-full bg-cyber-pink/10 border border-cyber-pink/30 flex items-center justify-center shadow-[0_0_40px_rgba(255,0,127,0.2)]">
                <svg className="w-10 h-10 text-cyber-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>

              <h1 className="text-3xl font-display font-bold tracking-tight mb-3 text-white">
                Payment Failed
              </h1>

              <p className="text-gray-400 leading-relaxed mb-8">
                Unfortunately, your payment could not be processed. This could be due to network issues, insufficient balance, or a cancelled transaction.
              </p>

              {/* Help Text */}
              <div className="bg-zinc-800/50 border border-white/10 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-display font-semibold mb-3 text-white">What you can do:</h3>
                <ul className="space-y-2 text-sm text-gray-400 font-mono">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-cyber-pink mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Try again with a different payment method
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-cyber-pink mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Check your UPI/bank app for any pending transactions
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-cyber-pink mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Ensure you have sufficient balance
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-cyber-pink mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Contact your bank if the issue persists
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => window.history.back()}
                  className="btn btn-laser w-full"
                >
                  Try Again
                </button>
                <Link href="/" className="w-full px-6 py-3.5 text-sm font-display font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-all">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-600 mt-6">
            Need help? Contact us at arshgupta723@gmail.com
          </p>
        </div>
      </div>
    </main>
  );
}
