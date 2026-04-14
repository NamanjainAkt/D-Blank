"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const AvatarContext = React.createContext<{
  status: "idle" | "loading" | "loaded" | "error"
  setStatus: (status: "idle" | "loading" | "loaded" | "error") => void
}>({ status: "idle", setStatus: () => {} })

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [status, setStatus] = React.useState<"idle" | "loading" | "loaded" | "error">("idle")

  return (
    <AvatarContext.Provider value={{ status, setStatus }}>
      <div
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
      />
    </AvatarContext.Provider>
  )
})
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & { onLoadingStatusChange?: (status: "idle" | "loading" | "loaded" | "error") => void }
>(({ className, src, onLoadingStatusChange, ...props }, ref) => {
  const { status, setStatus } = React.useContext(AvatarContext)

  React.useEffect(() => {
    if (!src) {
      setStatus("error")
    } else {
      setStatus("loading")
    }
  }, [src, setStatus])

  React.useEffect(() => {
    onLoadingStatusChange?.(status)
  }, [status, onLoadingStatusChange])

  if (!src) return null

  return (
    <img
      ref={ref}
      src={src}
      className={cn(
        "aspect-square h-full w-full object-cover",
        status !== "loaded" && "hidden",
        className
      )}
      onLoad={() => setStatus("loaded")}
      onError={() => setStatus("error")}
      {...props}
    />
  )
})
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { delayMs?: number }
>(({ className, delayMs, ...props }, ref) => {
  const { status } = React.useContext(AvatarContext)
  const [canRender, setCanRender] = React.useState(delayMs === undefined)

  React.useEffect(() => {
    if (delayMs !== undefined) {
      const timer = setTimeout(() => setCanRender(true), delayMs)
      return () => clearTimeout(timer)
    }
  }, [delayMs])

  if (!canRender || status === "loaded") {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className
      )}
      {...props}
    />
  )
})
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
