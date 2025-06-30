import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import ErrorBoundary from "./components/ErrorBoundary";
import Script from "next/script";
import Image from "next/image";

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  fallback: ['system-ui', 'arial'],
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Brian F Wilson - Web Developer & AI Consultant",
  description:
    "Brian F Wilson is a web developer, designer, and AI consultant helping small businesses grow with technology, automation, and strategic design.",
  generator: "Next.js",
  applicationName: "Brian F Wilson",
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
    "web developer",
    "ai consultant",
    "web design",
    "small business technology",
    "automation",
    "seo",
    "custom ai",
    "brian wilson",
    "digital strategy",
    "website development",
    "business automation",
    "growth partner",
    "lead generation"
  ],
  colorScheme: "dark",
  openGraph: {
    title: "Brian F Wilson - Web Developer & AI Consultant",
    description:
      "Brian F Wilson is a web developer, designer, and AI consultant helping small businesses grow with technology, automation, and strategic design.",
    url: "https://www.brianfwilson.com/",
    siteName: "brianfwilson.com",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Brian F Wilson - Web Developer & AI Consultant",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian F Wilson - Web Developer & AI Consultant",
    description:
      "Brian F Wilson is a web developer, designer, and AI consultant helping small businesses grow with technology, automation, and strategic design.",
    creator: "brianfwilson",
    images: ["/hero.jpg"],
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
        <meta name="p:domain_verify" content="312fae9ed0c5f259581e802822936bee"/>
        {/* Pinterest Tag */}
        <Script id="pinterest-tag" strategy="afterInteractive">
          {`
            !function(e){if(!window.pintrk){window.pintrk = function () {
            window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
            n=window.pintrk;n.queue=[],n.version="3.0";var
            t=document.createElement("script");t.async=!0,t.src=e;var
            r=document.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
            pintrk('load', '2613495101560');
            pintrk('page');
          `}
        </Script>
        <noscript>
          <Image height={1} width={1} style={{display: "none"}} alt=""
            src="https://ct.pinterest.com/v3/?event=init&tid=2613495101560&noscript=1" />
        </noscript>
        {/* end Pinterest Tag */}
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
