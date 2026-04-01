'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, ChevronRight, Gamepad2, BookOpen, Users, Mail } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home',     href: '/',        icon: null },
  { label: 'Games',    href: '/games',   icon: Gamepad2 },
  { label: 'Studio',   href: '/studio',  icon: Users },
  { label: 'Training', href: '/courses', icon: BookOpen },
  { label: 'Contact',  href: '/contact', icon: Mail },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20',
        isScrolled
          ? 'bg-black/85 backdrop-blur-2xl border-b border-violet-500/15 shadow-[0_1px_40px_rgba(0,0,0,0.6)]'
          : 'bg-transparent'
      )}
    >
      {/* Top edge neon line — always present, brightens on scroll */}
      <div className={cn(
        'absolute top-0 left-0 right-0 h-px transition-opacity duration-500',
        isScrolled ? 'opacity-100' : 'opacity-0',
        'bg-gradient-to-r from-transparent via-violet-500/60 to-transparent'
      )} />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-8 h-8 shrink-0">
              {/* Glow behind image */}
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              <Image
                src="/favicon.jpeg"
                alt="D-Blanks"
                fill
                className="relative object-cover rounded-lg ring-1 ring-zinc-700 group-hover:ring-violet-500/60 transition-all duration-300"
              />
            </div>
            <span className="font-display text-[13px] tracking-[0.2em] whitespace-nowrap leading-none">
              D<span className="text-violet-500 group-hover:text-violet-400 transition-colors duration-200">BLANKS</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-4 py-2 text-[10px] font-display tracking-[0.2em] transition-all duration-200 rounded-sm group',
                    active
                      ? 'text-white'
                      : 'text-zinc-500 hover:text-zinc-200'
                  )}
                >
                  {item.label}

                  {/* Active glow underline */}
                  {active && (
                    <>
                      <span className="absolute bottom-0.5 left-3 right-3 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-px bg-violet-400 blur-[2px]" />
                    </>
                  )}

                  {/* Hover underline (slides in) */}
                  {!active && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              href="/admin/login"
              className="text-[10px] font-display tracking-[0.2em] text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
            >
              SIGN IN
            </Link>
            <div className="w-px h-3.5 bg-zinc-800" />
            <Link href="/courses">
              <GlowButton variant="primary" className="px-5 py-2 text-[10px]">
                Get Started
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </GlowButton>
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button
                className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all duration-200"
                aria-label="Open menu"
              >
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[280px] bg-zinc-950/98 border-l border-zinc-800/60 p-0 backdrop-blur-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Menu header */}
                <div className="flex items-center gap-2.5 px-5 py-4 border-b border-zinc-800/60">
                  <div className="relative w-7 h-7 shrink-0">
                    <Image src="/favicon.jpeg" alt="D-Blanks" fill className="object-cover rounded-md" />
                  </div>
                  <span className="font-display text-[11px] tracking-[0.2em]">
                    D<span className="text-violet-500">BLANKS</span>
                  </span>
                </div>

                {/* Nav links */}
                <div className="flex flex-col px-3 py-4 gap-1">
                  {navItems.map((item) => {
                    const active = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-3.5 py-3 rounded-lg text-[11px] font-display tracking-[0.15em] transition-all duration-200',
                          active
                            ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                            : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 border border-transparent'
                        )}
                      >
                        {Icon && (
                          <Icon className={cn('w-4 h-4 shrink-0', active ? 'text-violet-400' : 'text-zinc-600')} />
                        )}
                        <span className="flex-1">{item.label}</span>
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />}
                      </Link>
                    );
                  })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-auto px-4 pb-6 pt-4 border-t border-zinc-800/60 flex flex-col gap-3">
                  <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                    <button className="w-full text-[10px] font-display tracking-[0.2em] text-zinc-600 hover:text-zinc-400 transition-colors py-2">
                      SIGN IN
                    </button>
                  </Link>
                  <Link href="/courses" onClick={() => setIsOpen(false)}>
                    <GlowButton variant="primary" className="w-full text-[10px]">
                      Get Started
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </GlowButton>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
