import { cn } from "@/lib/utils";

export function NoiseOverlay({ opacity = 8 }: { opacity?: number }) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none mix-blend-overlay",
      )}
      style={{
        opacity: opacity / 100,
        backgroundImage: "var(--noise-url)",
      }}
    />
  );
}