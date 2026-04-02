import type { Metadata, Viewport } from "next";
import { Orbitron, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SessionProvider } from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { MagneticCursor } from "@/components/ui/MagneticCursor";
import "./globals.css";

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const jetbrains = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: "D-Blanks - Gaming & Vocational Training Platform",
    template: "%s | D-Blanks",
  },
  description: "World-class gaming experiences combined with vocational training for BTech students. Build your dream career.",
  keywords: ["D-Blanks", "gaming", "vocational training", "BTech", "online courses", "game development"],
  authors: [{ name: "D-Blanks" }],
  creator: "D-Blanks",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dblanks.in",
    siteName: "D-Blanks",
    title: "D-Blanks - Gaming & Vocational Training Platform",
    description: "World-class gaming experiences combined with vocational training for BTech students.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${orbitron.variable} ${spaceGrotesk.variable} ${jetbrains.variable} font-body bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased`}>
        <SessionProvider>
          <ThemeProvider>
            <LenisProvider>
              <MagneticCursor />
              {children}
            </LenisProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
