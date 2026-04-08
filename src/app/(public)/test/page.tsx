'use client';

import dynamic from 'next/dynamic';

const TestScene = dynamic(() => import('./TestScene'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">
          Initializing Scene...
        </span>
      </div>
    </div>
  ),
});

export default function TestPage() {
  return <TestScene />;
}
