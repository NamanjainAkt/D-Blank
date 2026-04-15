"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

function usePresence(present: boolean) {
  const [mounted, setMounted] = React.useState(present)

  React.useEffect(() => {
    if (present) setMounted(true)
  }, [present])

  const onAnimationEnd = React.useCallback(() => {
    if (!present) setMounted(false)
  }, [present])

  return { mounted, onAnimationEnd }
}

interface DialogContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue | undefined>(undefined)

const Dialog = ({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: {
  children?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const open = openProp !== undefined ? openProp : internalOpen

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (openProp === undefined) {
        setInternalOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [openProp, onOpenChange]
  )

  return <DialogContext.Provider value={{ open, onOpenChange: handleOpenChange }}>{children}</DialogContext.Provider>
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>(
  ({ className, onClick, asChild, children, ...props }, ref) => {
    const context = React.useContext(DialogContext)
    if (!context) throw new Error("DialogTrigger must be used within Dialog")

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      context.onOpenChange(true)
      onClick?.(e)
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          handleClick(e)
          children.props.onClick?.(e)
        },
        ...props,
      })
    }

    return (
      <button ref={ref} type="button" onClick={handleClick} className={className} {...props}>
        {children}
      </button>
    )
  }
)
DialogTrigger.displayName = "DialogTrigger"

const DialogPortal = ({ children }: { children?: React.ReactNode }) => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return <>{children}</>
}

const DialogOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const context = React.useContext(DialogContext)
    return (
      <div
        ref={ref}
        onClick={() => context?.onOpenChange(false)}
        className={cn(
          "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
          className
        )}
        data-state={context?.open ? "open" : "closed"}
        {...props}
      />
    )
  }
)
DialogOverlay.displayName = "DialogOverlay"

const DialogClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>(
  ({ className, onClick, asChild, children, ...props }, ref) => {
    const context = React.useContext(DialogContext)
    if (!context) throw new Error("DialogClose must be used within Dialog")

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      context.onOpenChange(false)
      onClick?.(e)
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          handleClick(e)
          children.props.onClick?.(e)
        },
        ...props,
      })
    }

    return (
      <button ref={ref} type="button" onClick={handleClick} className={className} {...props}>
        {children}
      </button>
    )
  }
)
DialogClose.displayName = "DialogClose"

const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(DialogContext)
    if (!context) throw new Error("DialogContent must be used within Dialog")

    const { mounted, onAnimationEnd } = usePresence(context.open)

    if (!mounted) return null

    return (
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-40 bg-black/80" />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          onAnimationEnd={(e) => {
            if (e.target === e.currentTarget) onAnimationEnd()
          }}
          className={cn(
            "fixed z-50 rounded-lg border border-white/20 bg-black p-6 shadow-2xl",
            "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-[95vw] max-w-2xl max-h-[85vh] overflow-y-auto",
            className
          )}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          data-state={context.open ? "open" : "closed"}
          {...props}
        >
          <button
            type="button"
            onClick={() => context.onOpenChange(false)}
            className="absolute right-3 top-3 rounded-full p-1.5 bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          {children}
        </div>
      </DialogPortal>
    )
  }
)
DialogContent.displayName = "DialogContent"

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} id="dialog-title" className={cn("text-xl font-display font-black text-white uppercase tracking-tighter", className)} {...props} />
  )
)
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-xs font-mono text-zinc-400 uppercase tracking-widest mt-1", className)} {...props} />
  )
)
DialogDescription.displayName = "DialogDescription"

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}