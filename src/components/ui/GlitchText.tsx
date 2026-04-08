'use client';

interface GlitchTextProps {
  children: string;
  className?: string;
  textClassName?: string;
  glitchIntensity?: number;
}

export function GlitchText({
  children,
  className = '',
  textClassName = '',
  glitchIntensity = 0.5
}: GlitchTextProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <style>{`
        @keyframes glitch-top {
          0%, 90%, 100% { transform: translateX(0); opacity: 0; }
          92% { transform: translateX(${glitchIntensity}px); opacity: 0.6; }
          95% { transform: translateX(${-glitchIntensity * 0.5}px); opacity: 0; }
        }
        @keyframes glitch-bottom {
          0%, 93%, 100% { transform: translateX(0); opacity: 0; }
          95% { transform: translateX(${-glitchIntensity * 0.5}px); opacity: 0.4; }
          97% { transform: translateX(${glitchIntensity * 0.8}px); opacity: 0; }
        }
      `}</style>
      {/* Main text */}
      <span className={`relative z-10 ${textClassName}`}>{children}</span>

      {/* Glitch layers */}
      <span
        className="absolute inset-0 text-emerald-400"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
          animation: 'glitch-top 2.2s ease-in-out infinite',
        }}
      >
        {children}
      </span>

      <span
        className="absolute inset-0 text-teal-400"
        style={{
          clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
          animation: 'glitch-bottom 3.15s ease-in-out infinite',
        }}
      >
        {children}
      </span>
    </div>
  );
}
