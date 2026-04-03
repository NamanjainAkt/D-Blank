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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://dblanks.site'),
  title: {
    default: "D-Blanks - Gaming & Vocational Training Platform",
    template: "%s | D-Blanks",
  },
  description: "World-class gaming experiences combined with vocational training for BTech students. Build your dream career with certified courses.",
  keywords: ["D-Blanks", "gaming", "vocational training", "BTech", "online courses", "game development", "certified training"],
  authors: [{ name: "D-Blanks", url: "https://dblanks.site" }],
  creator: "D-Blanks",
  publisher: "D-Blanks",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dblanks.site",
    siteName: "D-Blanks",
    title: "D-Blanks - Gaming & Vocational Training Platform",
    description: "World-class gaming experiences combined with vocational training for BTech students.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "D-Blanks - Gaming & Vocational Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "D-Blanks - Gaming & Vocational Training Platform",
    description: "World-class gaming experiences combined with vocational training for BTech students.",
    images: ["/og-image.png"],
    creator: "@dblanks",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <link rel="icon" href="/favicon.jpeg" sizes="any" />
        <meta name="google-site-verification" content="73MvbbYUl5QmkZTvGo6kZx4FLUE6vMAcOqjfuv1XX-U" />
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
