import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative border-t border-white/10 py-16 bg-black overflow-hidden">
      {/* Gradient border effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 group">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.8)] transition-shadow duration-300" />
            <span className="font-bold text-lg text-white">D-Blanks</span>
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            {[
              { href: '/courses', label: 'Courses' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
              { href: '/privacy-policy', label: 'Privacy' },
              { href: '/terms-of-service', label: 'Terms' },
              { href: '/refund-policy', label: 'Refunds' },
            ].map((link, i) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © {currentYear} D-Blanks. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
