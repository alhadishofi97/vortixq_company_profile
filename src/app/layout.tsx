import type { Metadata } from "next";
import { Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  fallback: ["monospace"],
});

// Iosevka font will be loaded via fonts.css

export const metadata: Metadata = {
  title: "VortiQ",
  description: "End-to-End Cyber Resilience Platform",
  icons: {
    icon: '/vortiqx.png',
    shortcut: '/vortiqx.png',
    apple: '/vortiqx.png',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-background text-foreground container-responsive`}
      >
        {/* Background layers inspired by peris.ai */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-slate opacity-[0.12]" style={{ backgroundSize: '24px 24px' }} />
          <div className="absolute inset-0 bg-radial-faded" />
        </div>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
