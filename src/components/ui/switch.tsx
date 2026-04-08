'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, onCheckedChange, disabled, id, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        id={id}
        onClick={() => !disabled && onCheckedChange?.(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-white/20",
          "transition-colors duration-200 ease-in-out",
          "focus-visible:ring-2 focus-visible:ring-laser-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
          "disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-acid-green border-acid-green" : "bg-transparent",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg",
            "transition-transform duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
    );
  }
);
Switch.displayName = 'Switch';

export { Switch };
export type { SwitchProps };
