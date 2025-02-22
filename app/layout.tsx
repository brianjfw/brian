import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const syne = Syne({
  subsets: ["latin"],
  display: "block",
  weight: ["400", "500", "600", "700", "800"],
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
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
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
  return (
    <html lang="en">
      <head>
        {/* Add any additional head elements here */}
      </head>
      <body
        className={`${syne.className} scroll-smooth scrollbar-thin scrollbar-track-[#0E1016] scrollbar-thumb-[#212531]`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
