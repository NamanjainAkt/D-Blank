import Link from 'next/link';
import { ChevronRight, Gamepad2, Instagram, Youtube, Sparkles } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { NoiseOverlay } from './footer/NoiseOverlay';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black overflow-hidden pt-24 pb-8 border-t border-zinc-800/50">

      <NoiseOverlay opacity={10} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* BRAND COLUMN (Takes up more space) */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start">
            <div className="mb-6">
              <Logo size="xl" />
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-sm">
              Pushing the boundaries of interactive entertainment and empowering the next generation of game developers with industry-certified training.
            </p>
            
            {/* SOCIALS */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a href="https://www.instagram.com/d_blanks.games" target="_blank" rel="noopener noreferrer" className="group relative w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300">
                <Instagram className="w-4 h-4 text-zinc-400 group-hover:text-accent relative z-10 transition-colors" />
              </a>
              {/* YouTube */}
              <a href="https://youtube.com/@aashu01in?si=3YMh3iXi0uqgMiG6" target="_blank" rel="noopener noreferrer" className="group relative w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300">
                <Youtube className="w-4 h-4 text-zinc-400 group-hover:text-accent relative z-10 transition-colors" />
              </a>
            </div>
          </div>

          {/* LINKS COLUMNS */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Explore */}
            <div>
              <h4 className="text-white text-xs font-display tracking-[0.25em] uppercase mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-accent shadow-[0_0_8px_rgba(217,70,239,0.8)]" />
                Explore
              </h4>
              <ul className="space-y-3">
                {[
                  ["/games", "Games Library"],
                  ["/studio", "The Studio"],
                  ["/courses", "Training Academy"],
                  ["/about", "About Us"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="group flex items-center text-sm text-zinc-400 hover:text-white transition-colors w-fit">
                      <ChevronRight className="w-3.5 h-3.5 mr-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:mr-1 group-hover:translate-x-0 group-hover:text-accent transition-all duration-300" />
                      <span className="relative">
                        {label}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white text-xs font-display tracking-[0.25em] uppercase mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-primary shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                Support
              </h4>
              <ul className="space-y-3">
                {[
                  ["/contact", "Contact Us"],
                  ["/privacy-policy", "Privacy Policy"],
                  ["/terms-of-service", "Terms of Service"],
                  ["/refund-policy", "Refund Policy"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="group flex items-center text-sm text-zinc-400 hover:text-white transition-colors w-fit">
                      <ChevronRight className="w-3.5 h-3.5 mr-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:mr-1 group-hover:translate-x-0 group-hover:text-primary transition-all duration-300" />
                      <span className="relative">
                        {label}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info (Spans 2 cols on md, 1 on lg) */}
            <div className="col-span-2 lg:col-span-1 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h4 className="text-white text-xs font-display tracking-[0.25em] uppercase mb-4 relative z-10">
                HQ
              </h4>
              <div className="space-y-4 relative z-10 text-sm text-zinc-400">
                <p className="flex items-start gap-3">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                  Sindhya Nagar, Durg<br/>Chhattisgarh 491001
                </p>
                <p className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                  arshgupta723@gmail.com
                </p>
                <p className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                  +91 9340576811
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-6 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 font-medium">
            © {currentYear} D-Blanks Gaming Studio.
          </p>
          <div className="flex items-center gap-2 text-xs font-display tracking-widest text-zinc-600 uppercase">
            <Sparkles className="w-3 h-3 text-accent/70" />
            <span>Built for the Future</span>
          </div>
        </div>
      </div>
    </footer>
  );
}