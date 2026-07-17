import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | TrendPulse AI",
    default: "TrendPulse AI - Advanced Trend Analysis",
  },
  description: "Advanced trend analysis and insights platform for businesses.",
  keywords: ["trend analysis", "ai", "business insights", "analytics"],
  authors: [{ name: "TrendPulse Team" }],
  creator: "TrendPulse AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://trendpulse.ai",
    title: "TrendPulse AI - Advanced Trend Analysis",
    description: "Advanced trend analysis and insights platform for businesses.",
    siteName: "TrendPulse AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrendPulse AI - Advanced Trend Analysis",
    description: "Advanced trend analysis and insights platform for businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </Providers>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
