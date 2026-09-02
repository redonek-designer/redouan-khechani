import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { ClientProviders } from "@/components/providers/ClientProviders";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "REDNEXT — DJ Agadir / Taghazout",
    template: "%s · REDNEXT",
  },
  description: siteConfig.description,
  keywords: [
    "REDNEXT",
    "DJ Agadir",
    "DJ Taghazout",
    "Morocco DJ",
    "electronic music Morocco",
    "Agadir nightlife",
    "Taghazout",
    "Atlantic",
  ],
  openGraph: {
    title: "REDNEXT — DJ Agadir / Taghazout",
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
    siteName: "REDNEXT",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "REDNEXT — Sound of the Atlantic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REDNEXT — DJ Agadir / Taghazout",
    description: siteConfig.description,
    images: ["/images/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-base text-soft">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
