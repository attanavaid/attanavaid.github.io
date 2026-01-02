import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeScript } from "./components/ThemeScript";

// Montserrat - For headers (variable font for all weights)
const montserrat = localFont({
  src: "./fonts/Montserrat/Montserrat-VariableFont_wght.ttf",
  variable: "--font-montserrat",
  display: "swap",
  preload: true, // Preload headers since they're critical
});

// Roboto - For body text (variable font for width and weight)
const roboto = localFont({
  src: "./fonts/Roboto/Roboto-VariableFont_wdth,wght.ttf",
  variable: "--font-roboto",
  display: "swap",
  preload: true, // Preload body font since it's used everywhere
});

// Space Mono - For name and profession in hero section
const spaceMono = localFont({
  src: [
    {
      path: "./fonts/Space_Mono/SpaceMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Space_Mono/SpaceMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Space_Mono/SpaceMono-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Space_Mono/SpaceMono-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-space-mono",
  display: "swap",
  preload: true, // Preload since it's in the hero section (above the fold)
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
        {/* DNS prefetch for external resources (GitHub API for potential future features) */}
        <link rel="dns-prefetch" href="https://api.github.com" />
      </head>
      <body
        className={`${montserrat.variable} ${roboto.variable} ${spaceMono.variable} antialiased`}
      >
        <ThemeScript />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
