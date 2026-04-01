'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-8 relative overflow-hidden font-body">
      {/* Neon glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(176,38,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(176,38,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-3 h-3 rounded-none bg-neon-purple shadow-[0_0_10px_var(--neon-purple)] animate-pulse" />
          <span className="text-2xl font-display font-black tracking-tight text-white uppercase">D-Blanks</span>
        </div>

        <div className="bg-charcoal/80 backdrop-blur-2xl border border-neon-purple/20 rounded-none p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-neon-purple/10 border-b border-l border-neon-purple/20" />
          
          <h1 className="text-2xl font-display font-black mb-2 uppercase tracking-tight text-white">Admin Access</h1>
          <p className="text-[11px] font-mono uppercase tracking-widest text-laser-cyan/60 mb-8">// Restricted area</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-none text-red-400 text-[11px] font-mono uppercase tracking-wider flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                Operator ID (Email)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ADMIN@NETWORK.NET"
                className="f-input font-mono uppercase focus:shadow-[0_0_15px_var(--laser-cyan)]"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                Access Code
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="f-input font-mono focus:shadow-[0_0_15px_var(--laser-cyan)]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-laser w-full py-3.5"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  VERIFYING...
                </span>
              ) : (
                'INITIATE SESSION'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] font-mono uppercase tracking-widest text-gray-600 mt-8">
          <a href="/" className="hover:text-laser-cyan transition-colors flex items-center justify-center gap-2">
            <span>←</span> Back to Public Uplink
          </a>
        </p>
      </div>
    </main>
  );
}
