import { NoiseOverlay } from "./footer/NoiseOverlay";

export default function Footer2() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="relative w-full bg-black overflow-hidden pt-40 pb-12 flex flex-col items-center justify-end min-h-[450px] md:min-h-[600px]">
      
      {/* ANIMATED BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(217,70,239,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(217,70,239,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_100%,black,transparent)] pointer-events-none" />

      {/* TEXT WRAPPER for layering */}
      <div className="relative w-full flex justify-center items-center px-4 sm:px-8 mt-auto mb-[-8%] md:mb-[-10%]">
        
        {/* MAIN TEXT LAYER (Crisp & Bright) */}
<h1 className="relative text-[clamp(2.5rem,10vw,8rem)] font-black tracking-tighter
  bg-gradient-to-b from-accent via-accent to-primary
  bg-clip-text text-transparent opacity-95 whitespace-nowrap pointer-events-none font-display select-none
  drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]">
          D-BLANKS
        </h1>
      </div>

      {/* MASK FADE (Top to Bottom fade out to blend into the section above) */}
      <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_top,black_15%,transparent_85%)] bg-black/60" />

      {/* TOP BORDER GLOW to separate from content above */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* NOISE OVERLAY */}
      <NoiseOverlay opacity={18} />

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 text-center text-white/60 text-sm sm:text-base font-display tracking-[0.3em] uppercase mt-auto pb-6">
        <span className="text-accent/80 mr-3">///</span> 
        © {currentYear} D-Blanks Studio 
        <span className="text-accent/80 ml-3">///</span>
      </div>

    </section>
  );
}