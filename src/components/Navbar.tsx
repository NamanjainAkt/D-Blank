'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Gamepad2, BookOpen, Users, Mail, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
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
  const router = useRouter();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        router.push('/admin/login');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20',
        isScrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-zinc-800/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      )}
    >
      {/* Top edge accent line */}
      <div className={cn(
        'absolute top-0 left-0 right-0 h-px transition-all duration-500',
        isScrolled ? 'opacity-100' : 'opacity-0',
        'bg-gradient-to-r from-transparent via-primary/40 to-transparent'
      )} />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">

          {/* ── Logo ── */}
          <Logo size="md" />

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-1">
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

                  {/* Active indicator */}
                  {active && (
                    <>
                      <span className="absolute bottom-0.5 left-3 right-3 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-px bg-primary blur-[2px]" />
                    </>
                  )}

                  {/* Hover indicator */}
                  {!active && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Mobile Menu ── */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button
                className="relative w-9 h-9 flex items-center justify-center border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all duration-200"
                aria-label="Open menu"
              >
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[280px] bg-zinc-950/98 border-l border-zinc-800/60 p-0 backdrop-blur-xl"
            >
              <div className="flex flex-col h-full">
                {/* Menu header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/60">
                  <Logo size="sm" />
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
                          'flex items-center gap-3 px-3.5 py-3 text-[11px] font-display tracking-[0.15em] transition-all duration-200',
                          active
                            ? 'text-primary'
                            : 'text-zinc-500 hover:text-zinc-200'
                        )}
                      >
                        {Icon && (
                          <Icon className={cn('w-4 h-4 shrink-0', active ? 'text-primary' : 'text-zinc-600')} />
                        )}
                        <span className="flex-1">{item.label}</span>
                        {active && <span className="w-1.5 h-1.5 bg-primary shrink-0" />}
                      </Link>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="mt-auto px-5 py-4 border-t border-zinc-800/60">
                  <p className="text-[9px] text-zinc-600 font-display tracking-[0.2em]">
                    © 2024 D-BLANKS
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
