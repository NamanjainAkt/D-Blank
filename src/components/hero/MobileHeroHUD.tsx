'use client';

import { m } from '@/components/providers/MotionProvider';

export const MobileHeroHUD = () => {
  return (
    <div className="absolute inset-0 pointer-events-none lg:hidden overflow-hidden">
      {/* Top Left Label - Static opacity for performance */}
      <div 
        className="absolute top-24 left-6 flex flex-col gap-1 opacity-30"
      >
        <span className="text-[8px] font-mono text-primary tracking-[0.2em] uppercase">System Status</span>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-accent rounded-full" />
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Active_Link_Established</span>
        </div>
      </div>

      {/* Top Right Label */}
      <div 
        className="absolute top-28 right-6 text-right font-mono opacity-30"
      >
        <span className="text-[8px] text-zinc-600 block mb-1 uppercase tracking-tighter">Network_Grid_04</span>
        <div className="w-12 h-[1px] bg-primary/30 ml-auto" />
      </div>

      {/* Bottom Right Label */}
      <div className="absolute bottom-12 right-6 flex flex-col items-end opacity-40">
        <div className="w-8 h-8 border-r border-b border-primary/40" />
        <span className="text-[8px] font-mono text-zinc-500 mt-2 uppercase tracking-[0.3em]">Sector_7G</span>
      </div>

      {/* Subtle Floating Squares (Disabled on mobile for performance) */}
      <div className="hidden">
        {[...Array(3)].map((_, i) => (
          <m.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20"
            initial={{
              x: Math.random() * 100 + "%",
              y: "110%",
              opacity: 0
            }}
            animate={{
              y: "-10%",
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              delay: i * 4,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Animated Mobile Scroll Indicator */}
      <m.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-display text-zinc-500 uppercase tracking-[0.4em] mb-1">Explore</span>
        <m.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-10 bg-gradient-to-b from-primary/60 to-transparent"
        />
      </m.div>
    </div>
  );
};