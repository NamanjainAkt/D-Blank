'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="w-full h-full animate-pulse bg-violet-900/10 rounded-full blur-3xl absolute inset-0"></div>
});

export default function EarthModel({ className }: { className?: string }) {
  return (
    <div className={`relative w-full h-full pointer-events-auto ${className || ''}`}>
      <Spline scene="https://prod.spline.design/oulyzNS-aM5S9spn/scene.splinecode" />
    </div>
  );
}
