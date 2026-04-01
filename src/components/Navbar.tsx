'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowButton } from '@/components/ui/GlowButton';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import AnimatedContent from './AnimatedContent';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Games', href: '/games' },
  { label: 'Studio', href: '/studio' },
  { label: 'Training', href: '/courses' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20',
        isScrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/10'
          : 'bg-black/50'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative w-10 h-10">
              <Image
                src="/favicon.jpeg"
                alt="D-Blanks"
                fill
                className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
            </div>
            <span className="text-xl font-bold tracking-tight whitespace-nowrap">
              D<span className="text-violet-500">Blanks</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors duration-200 group',
                  pathname === item.href
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full" />
                )}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/admin/login" 
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <div className="w-px h-4 bg-zinc-700" />
            <Link href="/courses">
              <GlowButton
                variant="primary"
                className="px-5 py-2 text-xs"
              >
                Get Started
                <ChevronRight className="w-3 h-3 ml-1" />
              </GlowButton>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-zinc-950 border-l border-white/10 p-0"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <span className="text-lg font-bold text-white">Menu</span>
                </div>
                <div className="flex flex-col p-4 gap-2">
                  {navItems.map((item, index) => (
                    <AnimatedContent
                      key={item.href}
                      delay={index * 0.05}
                      direction="horizontal"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                          pathname === item.href
                            ? 'bg-white/10 text-white'
                            : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                        )}
                      >
                        {item.label}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </AnimatedContent>
                  ))}
                </div>
                <div className="mt-auto p-4 border-t border-white/10">
                  <Link href="/courses" onClick={() => setIsOpen(false)}>
                    <GlowButton
                      variant="primary"
                      className="w-full"
                    >
                      Get Started
                      <ChevronRight className="w-4 h-4 ml-2" />
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
