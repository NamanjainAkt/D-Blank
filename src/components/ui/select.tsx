"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

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

interface SelectContextValue {
  value: string
  onValueChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  itemMap: Record<string, React.ReactNode>
  registerItem: (value: string, label: React.ReactNode) => void
  unregisterItem: (value: string) => void
  disabled?: boolean
}

const SelectContext = React.createContext<SelectContextValue | undefined>(undefined)

const Select = ({
  children,
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled,
}: {
  children?: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const value = valueProp !== undefined ? valueProp : internalValue

  const [open, setOpen] = React.useState(false)
  const [itemMap, setItemMap] = React.useState<Record<string, React.ReactNode>>({})

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (valueProp === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    },
    [valueProp, onValueChange]
  )

  const registerItem = React.useCallback((val: string, label: React.ReactNode) => {
    setItemMap((prev) => ({ ...prev, [val]: label }))
  }, [])

  const unregisterItem = React.useCallback((val: string) => {
    setItemMap((prev) => {
      const newMap = { ...prev }
      delete newMap[val]
      return newMap
    })
  }, [])

  return (
    <SelectContext.Provider value={{ value, onValueChange: handleValueChange, open, setOpen, itemMap, registerItem, unregisterItem, disabled }}>
      <div className="relative w-full">
         {children}
      </div>
    </SelectContext.Provider>
  )
}

const SelectGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="group" className={cn("py-1", className)} {...props} />
  )
)
SelectGroup.displayName = "SelectGroup"

const SelectValue = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement> & { placeholder?: React.ReactNode }>(
  ({ className, placeholder, ...props }, ref) => {
    const context = React.useContext(SelectContext)
    if (!context) throw new Error("SelectValue must be used within Select")

    return (
      <span ref={ref} className={cn("truncate pointer-events-none", className)} {...props}>
        {context.value && context.itemMap[context.value] !== undefined 
          ? context.itemMap[context.value] 
          : placeholder ? <span className="text-muted-foreground">{placeholder}</span> : null}
      </span>
    )
  }
)
SelectValue.displayName = "SelectValue"

const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>(
  ({ className, children, onClick, asChild, ...props }, ref) => {
    const context = React.useContext(SelectContext)
    if (!context) throw new Error("SelectTrigger must be used within Select")

    const triggerRef = React.useRef<HTMLButtonElement>(null)
    React.useImperativeHandle(ref, () => triggerRef.current as HTMLButtonElement)

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
          let target = event.target as HTMLElement | null;
          let isInsideMenu = false;
          while (target) {
            if (target.getAttribute('role') === 'listbox' || target.hasAttribute('data-select-content')) {
              isInsideMenu = true;
              break;
            }
            target = target.parentElement;
          }
          if (isInsideMenu) return;
          context.setOpen(false)
        }
      }

      if (context.open) {
        document.addEventListener("mousedown", handleClickOutside)
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [context])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (context.disabled || props.disabled) return;
      context.setOpen(!context.open)
      onClick?.(e)
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref: triggerRef,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          handleClick(e)
          children.props.onClick?.(e)
        },
        "aria-expanded": context.open,
        role: "combobox",
        disabled: context.disabled || props.disabled,
        ...props,
      })
    }

    return (
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={context.open}
        onClick={handleClick}
        disabled={context.disabled || props.disabled}
        className={cn(
          "flex h-10 w-full items-center justify-between whitespace-nowrap rounded-md border border-white/10 bg-black px-3 py-2 text-sm text-white shadow-sm placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-laser-cyan disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

const SelectScrollUpButton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
      <ChevronUp className="h-4 w-4" />
    </div>
  )
)
SelectScrollUpButton.displayName = "SelectScrollUpButton"

const SelectScrollDownButton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
      <ChevronDown className="h-4 w-4" />
    </div>
  )
)
SelectScrollDownButton.displayName = "SelectScrollDownButton"

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { position?: "popper" | "item-aligned" }>(
  ({ className, children, position = "popper", ...props }, ref) => {
    const context = React.useContext(SelectContext)
    const { mounted, onAnimationEnd } = usePresence(context?.open ?? false)

    if (!context) throw new Error("SelectContent must be used within Select")

    if (!mounted) return null

    return (
      <div
        ref={ref}
        role="listbox"
        data-select-content="true"
        onAnimationEnd={(e) => {
          if (e.target === e.currentTarget) onAnimationEnd()
        }}
        className={cn(
          "absolute top-full z-50 mt-1 max-h-96 min-w-[8rem] w-full overflow-hidden rounded-md border border-white/10 bg-black shadow-lg",
          className
        )}
        data-state={context.open ? "open" : "closed"}
        {...props}
      >
        <div className={cn("p-1 max-h-80 overflow-y-auto w-full custom-scrollbar")}>{children}</div>
      </div>
    )
  }
)
SelectContent.displayName = "SelectContent"

const SelectLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />
  )
)
SelectLabel.displayName = "SelectLabel"

const SelectItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ className, children, value, ...props }, ref) => {
    const context = React.useContext(SelectContext)
    if (!context) throw new Error("SelectItem must be used within Select")

    const isSelected = context.value === value

    React.useEffect(() => {
      context.registerItem(value, children)
      return () => context.unregisterItem(value)
    }, [value, children, context])

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        onClick={() => {
          context.onValueChange(value)
          context.setOpen(false)
        }}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-3 pr-8 text-sm text-white hover:bg-white/10 hover:text-laser-cyan data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          isSelected && "bg-laser-cyan/10 text-laser-cyan",
          className
        )}
        {...props}
      >
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          {isSelected && <Check className="h-4 w-4" />}
        </span>
        <span className="truncate">{children}</span>
      </div>
    )
  }
)
SelectItem.displayName = "SelectItem"

const SelectSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
  )
)
SelectSeparator.displayName = "SelectSeparator"

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
