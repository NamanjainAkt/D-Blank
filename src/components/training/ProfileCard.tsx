'use client';

import { m } from '@/components/providers/MotionProvider';

interface ProfileCardProps {
  name: string;
  role: string;
  bio: string;
  image?: string;
  socials?: { platform: string; url: string }[];
  className?: string;
}

export function ProfileCard({
  name,
  role,
  bio,
  image,
  socials = [],
  className = '',
}: ProfileCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`relative p-6 rounded-none bg-white/[0.02] border border-white/10 hover:border-neon-purple/50 hover:bg-white/[0.04] transition-all duration-300 group cursor-pointer ${className}`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        {/* Avatar placeholder */}
        <div className="w-20 h-20 mx-auto mb-5 rounded-none bg-gradient-to-br from-neon-purple/20 to-laser-cyan/20 border-2 border-neon-purple/30 flex items-center justify-center text-2xl font-black text-white font-display group-hover:border-laser-cyan/30 transition-colors">
          {name.charAt(0)}
        </div>

        <div className="text-center">
          <h3 className="text-lg font-black text-white mb-2 font-display uppercase tracking-tight group-hover:text-laser-cyan transition-colors">{name}</h3>
          <p className="text-[11px] text-laser-cyan mb-3 font-mono uppercase tracking-widest">{role}</p>
          <p className="text-sm text-white/50 leading-relaxed font-body">{bio}</p>
        </div>

        {/* Social links */}
        {socials.length > 0 && (
          <div className="flex justify-center gap-3 mt-5">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 text-white/60 hover:text-laser-cyan hover:bg-white/10 border border-transparent hover:border-laser-cyan/30 transition-all duration-300 font-mono text-[10px] uppercase"
              >
                {social.platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </m.div>
  );
}

export default ProfileCard;