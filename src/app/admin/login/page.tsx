'use client';

import { useState, useTransition } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    startTransition(async () => {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        rememberMe: rememberMe.toString(),
      });

      if (result?.error) {
        setError('Invalid credentials. Access denied.');
      } else {
        router.push('/admin/dashboard');
      }
    });
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-body">
      {/* Neon glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(176,38,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(176,38,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-3 h-3 bg-neon-purple shadow-[0_0_10px_var(--neon-purple)] animate-pulse" />
          <span className="text-2xl font-display font-black tracking-tight text-white uppercase">D-Blanks</span>
        </div>

        <div className="bg-charcoal/80 backdrop-blur-2xl border border-neon-purple/20 p-6 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-neon-purple/10 border-b border-l border-neon-purple/20" />
          
          <h1 className="text-xl md:text-2xl font-display font-black mb-2 uppercase tracking-tight text-white">Admin Access</h1>
          <p className="text-[11px] font-mono uppercase tracking-widest text-laser-cyan/60 mb-6 md:mb-8">// Restricted area</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-mono uppercase tracking-wider flex items-center gap-2" role="alert" aria-live="assertive">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6" aria-label="Admin login form">
            <div>
              <label htmlFor="email" className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                Operator ID (Email)
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dblanks.in"
                className="f-input font-mono focus:shadow-[0_0_15px_var(--laser-cyan)]"
                required
                autoComplete="email"
                aria-describedby={error ? 'login-error' : undefined}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                Access Code
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="f-input font-mono focus:shadow-[0_0_15px_var(--laser-cyan)]"
                required
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-600 bg-black text-laser-cyan focus:ring-laser-cyan focus:ring-offset-0"
              />
              <label htmlFor="remember" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                Keep session alive
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="btn btn-laser w-full py-3.5 disabled:opacity-50 disabled:cursor-not-allowed hover:translate-y-[-2px] active:translate-y-0 transition-transform"
              aria-describedby="submit-help"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  VERIFYING...
                </span>
              ) : (
                'INITIATE SESSION'
              )}
            </button>
            <span id="submit-help" className="sr-only">Click to authenticate and access the admin portal</span>
          </form>
        </div>

        <p className="text-center text-[10px] font-mono uppercase tracking-widest text-zinc-600 mt-8">
          <Link href="/" className="hover:text-laser-cyan transition-colors inline-flex items-center justify-center gap-2" aria-label="Return to public site">
            <span aria-hidden="true">←</span> Back to Public Uplink
          </Link>
        </p>
      </div>
    </main>
  );
}
