import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import ErrorBoundary from "./components/ErrorBoundary";

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  fallback: ['system-ui', 'arial'],
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Heather Hudson - Artist",
  description:
    "Heather Hudson is a multimedia artist and content creator. Browse her Etsy shop or contact her for custom works.",
  generator: "Next.js",
  applicationName: "Heather Hudson",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.jpg', sizes: '16x16', type: 'image/jpeg' },
      { url: '/favicon-32x32.jpg', sizes: '32x32', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        rel: 'icon',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
    ],
  },
  manifest: '/site.webmanifest',
  keywords: [
    "artist",
    "artist portfolio",
    "artist website",
    "artist shop",
    "artist contact",
    "artist Etsy",
    "artist shop",
    "artist contact",
    "artist Etsy",
    "artist shop",
    "artist contact",
    "artist Etsy",  
  ],
  colorScheme: "dark",
  openGraph: {
    title: "Heather Hudson - Artist",
    description:
      "Heather Hudson is a multimedia artist and content creator. Browse her Etsy shop or contact her for custom works.",
    url: "https://www.heatherhudsonart.com/",
    siteName: "www.heatherhudsonart.com",
    images: [
      {
        url: "/heather.jpg",
        width: 1200,
        height: 630,
        alt: "Heather Hudson - Artist",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heather Hudson - Artist",
    description:
      "Heather Hudson is a multimedia artist and content creator. Browse her Etsy shop or contact her for custom works.",
    creator: "heatherhudsonart",
    creatorId: "1243720976552144897",
    images: ["/heather.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  if (typeof window !== 'undefined') {
    window.onerror = (msg, url, lineNo, columnNo, error) => {
      console.error('Global error:', {
        message: msg,
        url,
        lineNo,
        columnNo,
        error: error?.stack
      });
      return false;
    };

    // Add unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', {
        reason: event.reason,
        stack: event.reason?.stack
      });
    });
  }

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <link rel="manifest" href="/site.webmanifest" crossOrigin="use-credentials" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${syne.className} scroll-smooth scrollbar-thin scrollbar-track-[#0E1016] scrollbar-thumb-[#212531]`}
      >
        <ErrorBoundary>
          {children}
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  );
}
