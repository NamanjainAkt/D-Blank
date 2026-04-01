'use client';

interface MorphingBlobsProps {
  className?: string;
  colors?: [string, string];
}

const defaultColors: [string, string] = [
  'rgba(16,185,129,0.07)',
  'rgba(20,184,166,0.07)',
];

export function MorphingBlobs({
  className,
  colors = defaultColors,
}: MorphingBlobsProps) {
  const blobs = [
    {
      size: 500,
      color: colors[0],
      top: '10%',
      left: '20%',
      delay: '0s',
      duration: '20s',
    },
    {
      size: 400,
      color: colors[1],
      top: '50%',
      right: '10%',
      delay: '-7s',
      duration: '25s',
    },
    {
      size: 350,
      color: colors[0],
      bottom: '10%',
      left: '40%',
      delay: '-14s',
      duration: '22s',
    },
  ];

  return (
    <div
      className={className}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: blob.size,
            height: blob.size,
            borderRadius: '50%',
            background: blob.color,
            filter: 'blur(80px)',
            opacity: 1,
            top: blob.top,
            left: blob.left,
            right: (blob as Record<string, unknown>).right as string | undefined,
            bottom: (blob as Record<string, unknown>).bottom as string | undefined,
            animation: `morph-blob ${blob.duration} ease-in-out infinite`,
            animationDelay: blob.delay,
            willChange: 'border-radius, transform',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes morph-blob {
          0%,
          100% {
            border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          25% {
            border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%;
            transform: translate(30px, -50px) rotate(90deg) scale(1.05);
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: translate(-20px, 20px) rotate(180deg) scale(0.95);
          }
          75% {
            border-radius: 50% 40% 50% 60% / 40% 50% 60% 50%;
            transform: translate(20px, 40px) rotate(270deg) scale(1.02);
          }
        }
      `}</style>
    </div>
  );
}
