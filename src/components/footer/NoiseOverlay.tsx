import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function NoiseOverlay({ opacity = 8 }: { opacity?: number }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) return null;

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
