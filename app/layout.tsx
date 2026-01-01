import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeScript } from "./components/ThemeScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atta Navaid | Portfolio",
  description: "Portfolio of Atta Navaid - Full-stack Developer, Designer, and Creator. Specializing in React, TypeScript, and Next.js. Building scalable, production-ready applications.",
  keywords: ["Atta Navaid", "Portfolio", "Developer", "Designer", "Web Developer", "Full-stack Developer", "React", "TypeScript", "Next.js"],
  authors: [{ name: "Atta Navaid" }],
  creator: "Atta Navaid",
  // Enable static generation and SEO
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://attanavaid.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: "Atta Navaid | Portfolio",
    description: "Full-stack Developer, Designer, and Creator. Specializing in React, TypeScript, and Next.js.",
    siteName: "Atta Navaid Portfolio",
    images: [
      {
        url: '/logo512.png',
        width: 512,
        height: 512,
        alt: 'Atta Navaid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Atta Navaid | Portfolio",
    description: "Full-stack Developer, Designer, and Creator. Specializing in React, TypeScript, and Next.js.",
    images: ['/logo512.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://api.github.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeScript />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
