'use client';

import React, { ReactNode } from 'react';

export interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'emerald' | 'fuchsia';
  asChild?: boolean;
}

export const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ children, onClick, className = '', variant = 'primary', type = 'button', asChild = false, ...props }, ref) => {
    const base = "group relative px-6 py-3 font-display font-black uppercase tracking-widest rounded-none overflow-hidden text-center flex items-center justify-center gap-2 transition-all duration-[180ms] ease-out hover:scale-[1.03] active:scale-[0.97] active:[box-shadow:none]";

    const variants = {
      primary:   "bg-primary text-primary-foreground border border-primary/50",
      secondary: "bg-transparent text-white border border-white/15 hover:border-primary/40",
      emerald:   "bg-acid-green text-white border border-acid-green/50",
      fuchsia:   "bg-accent text-accent-foreground border border-accent/50",
    };

    const hoverShadow = {
      primary:   "0 0 20px rgba(124,58,237,0.7), 0 0 60px rgba(124,58,237,0.25), inset 0 0 20px rgba(255,255,255,0.06)",
      secondary: "0 0 20px rgba(124,58,237,0.35), 0 0 40px rgba(124,58,237,0.1)",
      emerald:   "0 0 20px rgba(16,185,129,0.6), 0 0 50px rgba(16,185,129,0.2)",
      fuchsia:   "0 0 20px rgba(192,38,211,0.7), 0 0 60px rgba(192,38,211,0.25), inset 0 0 20px rgba(255,255,255,0.06)",
    };

    const shimmerColor = {
      primary:   'from-transparent via-white/25 to-transparent',
      secondary: 'from-transparent via-primary/20 to-transparent',
      emerald:   'from-transparent via-white/20 to-transparent',
      fuchsia:   'from-transparent via-white/25 to-transparent',
    };

    // Subtle bg brightening on hover for secondary
    const hoverBg = {
      primary:   'bg-primary',
      secondary: 'bg-primary/10',
      emerald:   'bg-acid-green',
      fuchsia:   'bg-accent',
    };

    const computedClass = `${base} ${variants[variant]} hover:[box-shadow:var(--hover-shadow)] ${className}`;
    const computedStyle = { '--hover-shadow': hoverShadow[variant], ...(props.style || {}) } as React.CSSProperties;

    const innerContent = (
      <>
        {/* Text */}
        <span className="relative z-10 flex items-center justify-center gap-2 w-full">
          {asChild && React.isValidElement(children) ? children.props.children : children}
        </span>

        {/* Shimmer sweep */}
        <span
          className={`absolute top-0 bottom-0 left-0 w-[40%] -skew-x-12 bg-gradient-to-r ${shimmerColor[variant]} pointer-events-none z-20 -translate-x-full transition-transform duration-0 group-hover:duration-[550ms] group-hover:translate-x-[250%] ease-out`}
        />

        {/* Hover background shift (secondary/emerald) */}
        <span
          className={`absolute inset-0 ${hoverBg[variant]} opacity-0 pointer-events-none transition-opacity duration-[250ms] group-hover:opacity-100`}
        />
      </>
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        className: `${computedClass} ${(children.props as any).className || ''}`,
        style: { ...computedStyle, ...((children.props as any).style || {}) },
        ref: ref,
        onClick: onClick || (children.props as any).onClick,
        ...props,
        children: innerContent
      });
    }

    return (
      <button
        type={type}
        className={computedClass}
        style={computedStyle}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {innerContent}
      </button>
    );
  }
);
GlowButton.displayName = 'GlowButton';
