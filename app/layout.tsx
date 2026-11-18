import "@/styles/globals.css";

import type { Metadata } from "next";

import ThemeColor from "@/components/theme-color";
import ThemeProvider from "@/components/theme-provider";
import { cx } from "@/lib/utils";

import AnalyticsWrapper from "../components/analytics";

const siteName = "Zelzele";
const title = `${siteName} | Son 100 Deprem`;
const description = "Türkiye sınırları içinde olan son 100 deprem.";
const url = "https://zelzele.vercel.app";
const locale = "tr-TR";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    siteName,
    locale,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    site: "@ademilter"
  },
  robots: {
    index: true,
    follow: true
  },
  themeColor: "#ffffff",
  icons: {
    icon: "/icons-192.png",
    apple: "/icons-192.png"
  },
  manifest: "/manifest.json"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={cx("overflow-y-scroll scroll-smooth")}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Iosevka+Charon:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white font-sans leading-normal text-zinc-600 antialiased dark:bg-zinc-900 dark:text-zinc-400">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeColor />
          <main>{children}</main>
          <AnalyticsWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
