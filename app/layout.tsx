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
        url: "https://user-images.githubusercontent.com/84178696/228620835-e3cc5c9b-72fc-4f54-a628-407ef7b650f5.png",
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
    images: [
      "https://user-images.githubusercontent.com/84178696/228620835-e3cc5c9b-72fc-4f54-a628-407ef7b650f5.png",
    ],
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
      <body
        className={`${syne.className} scroll-smooth scrollbar-thin scrollbar-track-[#0E1016] scrollbar-thumb-[#212531]`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
