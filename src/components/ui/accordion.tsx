"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

interface AccordionContextValue {
  value: string | string[]
  onValueChange: (value: string) => void
  type: "single" | "multiple"
  collapsible?: boolean
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined)

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    type?: "single" | "multiple"
    collapsible?: boolean
    value?: string | string[]
    defaultValue?: string | string[]
    onValueChange?: (value: any) => void
  }
>(({ className, type = "single", collapsible = false, value, defaultValue, onValueChange, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState<string | string[]>(
    value ?? defaultValue ?? (type === "multiple" ? [] : "")
  )

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value)
    }
  }, [value])

  const handleValueChange = React.useCallback(
    (itemValue: string) => {
      let newValue: string | string[]
      
      if (type === "multiple") {
        const currentValues = Array.isArray(internalValue) ? internalValue : []
        newValue = currentValues.includes(itemValue)
          ? currentValues.filter((v) => v !== itemValue)
          : [...currentValues, itemValue]
      } else {
        const currentValue = typeof internalValue === "string" ? internalValue : ""
        if (currentValue === itemValue) {
          newValue = collapsible ? "" : itemValue
        } else {
          newValue = itemValue
        }
      }

      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    },
    [type, collapsible, internalValue, value, onValueChange]
  )

  return (
    <AccordionContext.Provider value={{ value: internalValue, onValueChange: handleValueChange, type, collapsible }}>
      <div ref={ref} className={className} data-orientation="vertical" {...props} />
    </AccordionContext.Provider>
  )
})
Accordion.displayName = "Accordion"

interface AccordionItemContextValue {
  value: string
}
const AccordionItemContext = React.createContext<AccordionItemContextValue | undefined>(undefined)

const AccordionItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(AccordionContext)
    if (!context) throw new Error("AccordionItem must be used within Accordion")

    const isOpen = context.type === "multiple" 
      ? Array.isArray(context.value) && context.value.includes(value)
      : context.value === value

    return (
      <AccordionItemContext.Provider value={{ value }}>
        <div
          ref={ref}
          data-state={isOpen ? "open" : "closed"}
          className={cn("border-b", className)}
          {...props}
        />
      </AccordionItemContext.Provider>
    )
  }
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext)
    const itemContext = React.useContext(AccordionItemContext)
    if (!context || !itemContext) throw new Error("AccordionTrigger must be used within AccordionItem")

    const isOpen = context.type === "multiple"
      ? Array.isArray(context.value) && context.value.includes(itemContext.value)
      : context.value === itemContext.value

    return (
      <div className="flex">
        <button
          ref={ref}
          type="button"
          data-state={isOpen ? "open" : "closed"}
          aria-expanded={isOpen}
          onClick={() => context.onValueChange(itemContext.value)}
          className={cn(
            "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
            className
          )}
          {...props}
        >
          {children}
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
        </button>
      </div>
    )
  }
)
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext)
    const itemContext = React.useContext(AccordionItemContext)
    if (!context || !itemContext) throw new Error("AccordionContent must be used within AccordionItem")

    const isOpen = context.type === "multiple"
      ? Array.isArray(context.value) && context.value.includes(itemContext.value)
      : context.value === itemContext.value

    return (
      <div
        ref={ref}
        data-state={isOpen ? "open" : "closed"}
        className="grid overflow-hidden text-sm transition-all duration-200 ease-in-out data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]"
        {...props}
      >
        <div className="min-h-0">
          <div className={cn("pb-4 pt-0", className)}>{children}</div>
        </div>
      </div>
    )
  }
)
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
