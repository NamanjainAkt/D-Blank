'use client';

import Spline from '@splinetool/react-spline';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold text-center py-8">3D Components Test</h1>
      
      <section className="h-screen border-b border-gray-800">
        <h2 className="text-2xl text-center py-4">Earth Model</h2>
        <Spline scene="https://prod.spline.design/oulyzNS-aM5S9spn/scene.splinecode" />
      </section>
      
      <section className="h-screen border-b border-gray-800">
        <h2 className="text-2xl text-center py-4">Infinity Logo Animation</h2>
        <Spline scene="https://prod.spline.design/oQw8RJG7b7TDDKdK/scene.splinecode" />
      </section>
      
      <section className="h-screen">
        <h2 className="text-2xl text-center py-4">R4X Bot Model</h2>
        <Spline scene="https://prod.spline.design/QKrmdL4BWKTacM-h/scene.splinecode" />
      </section>
    </div>
  );
}