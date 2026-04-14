import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laser-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-neon-purple text-white shadow hover:bg-neon-purple/90",
        destructive:
          "bg-red text-white shadow-sm hover:bg-red/90",
        outline:
          "border-2 border-neon-purple bg-transparent text-white hover:bg-neon-purple/20 hover:border-neon-purple/80",
        secondary:
          "bg-charcoal border border-carbon text-white hover:bg-carbon/50",
        ghost: "text-zinc-400 hover:text-white hover:bg-charcoal",
        link: "text-laser-cyan underline-offset-4 hover:underline",
        // Cyberpunk variants
        cyber: "bg-neon-purple text-white border-2 border-neon-purple shadow-[0_0_20px_rgba(176,38,255,0.3)] hover:bg-cyber-pink hover:border-cyber-pink hover:shadow-[0_0_30px_rgba(255,0,127,0.4)]",
        laser: "bg-laser-cyan text-black border-2 border-laser-cyan shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]",
        green: "bg-emerald text-white border-2 border-emerald shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]",
      },
      size: {
        default: "h-10 px-5 py-2 rounded-none",
        sm: "h-8 px-3 text-xs rounded-none",
        lg: "h-12 px-8 text-sm rounded-none",
        icon: "h-10 w-10 rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    // Basic Slot replacement that just clones the child if asChild is true
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        className: cn(buttonVariants({ variant, size, className }), (children.props as any).className),
        ref: ref,
        ...props
      })
    }

    const Comp = "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
