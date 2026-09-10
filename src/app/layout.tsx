import type { Metadata, Viewport } from "next";
import { Cairo, Amiri, Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  weight: ["400", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F8F2EA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmed-menatallah-wedding.vercel.app"),
  title: "أحمد ومنة الله | دعوة زفاف",
  description: "يسعدنا دعوتكم لمشاركتنا فرحة زفاف أحمد ومنة الله يوم 14 أكتوبر 2026 في قاعة قصر كازبلانكا.",
  authors: [{ name: "Ahmed & Menatallah" }],
  keywords: ["دعوة زفاف", "أحمد ومنة الله", "زفاف", "قاعة قصر كازبلانكا", "شبين القناطر"],
  openGraph: {
    title: "أحمد ومنة الله | دعوة زفاف",
    description: "يسعدنا دعوتكم لمشاركتنا فرحة زفاف أحمد ومنة الله يوم 14 أكتوبر 2026 في قاعة قصر كازبلانكا.",
    url: "https://ahmed-menatallah-wedding.vercel.app",
    siteName: "أحمد & منة الله",
    images: [
      {
        url: "/og-wedding.jpg",
        width: 1200,
        height: 630,
        alt: "دعوة زفاف أحمد ومنة الله",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "أحمد ومنة الله | دعوة زفاف",
    description: "يسعدنا دعوتكم لمشاركتنا فرحة زفاف أحمد ومنة الله يوم 14 أكتوبر 2026.",
    images: ["/og-wedding.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${amiri.variable} ${cormorant.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#F8F2EA] text-[#231F1A] font-sans antialiased selection:bg-[#C5A46D]/20 selection:text-[#231F1A] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
