'use client';

import { motion } from 'framer-motion';

interface SpotlightCardProps {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  video?: string;
  stats?: { label: string; value: string }[];
  ctaText?: string;
  className?: string;
}

export function SpotlightCard({
  title,
  subtitle,
  description,
  image,
  video,
  stats = [],
  ctaText = 'Learn More',
  className = '',
}: SpotlightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 ${className}`}
    >
      {/* Spotlight glow effect */}
      <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-neon-purple/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />

      <div className="relative grid md:grid-cols-2 gap-8 p-8">
        {/* Content side */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-display font-medium text-neon-purple bg-neon-purple/10 rounded-full w-fit uppercase tracking-widest border border-neon-purple/20">
            <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse shadow-[0_0_8px_var(--neon-purple)]" />
            {subtitle}
          </div>

          <h3 className="text-3xl md:text-4xl font-display font-black text-white">
            {title}
          </h3>

          <p className="text-white/70 leading-relaxed">
            {description}
          </p>

          {/* Stats */}
          {stats.length > 0 && (
            <div className="flex gap-6 font-mono">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl font-bold text-laser-cyan">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-wider text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-laser px-8 py-3 w-fit"
          >
            {ctaText}
            <span>→</span>
          </motion.button>
        </div>

        {/* Image/Video side */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-laser-cyan/20 rounded-2xl" />
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
            {video ? (
              <motion.video
                src={video}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onLoadedData={(e) => {
                  // Ensure video loads properly
                  e.currentTarget.play();
                }}
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/50 to-laser-cyan/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🎮</span>
                </div>
              </>
            )}
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-neon-purple/20 rounded-full blur-2xl" />
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-laser-cyan/20 rounded-full blur-xl" />
        </div>
      </div>
    </motion.div>
  );
}

export default SpotlightCard;
