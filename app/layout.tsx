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
        {/*
         * Tema sınıfını ilk boyamadan önce uygular. next-themes'in kendi betiği
         * body içinde kaldığı için Firefox'ta koyu temada beyaz parlama oluşuyordu.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var d=document.documentElement,c=d.classList;c.remove('light','dark');var e=localStorage.getItem('theme');var t=e==='dark'||((!e||e==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);c.add(t?'dark':'light');d.style.colorScheme=t?'dark':'light'}catch(e){}})();"
          }}
        />
        <link
          rel="preload"
          href="/fonts/iosevka-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/iosevka-bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
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
