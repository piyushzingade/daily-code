import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cn } from "@repo/ui/utils";
import { Providers, ThemeProvider } from "../components/Providers";
import NextTopLoader from "nextjs-toploader";
import Head from "next/head";

// Core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
// Used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";
// Used for rendering equations (optional)
import "katex/dist/katex.min.css";
import { Toaster } from "@repo/ui";

const fontSans = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Projects | 100xDevs",
  description: "Code Daily",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>
      <body
        className={`${fontSans.className} min-h-screen overflow-x-hidden bg-neutral-50 antialiased dark:bg-neutral-950`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextTopLoader color="#2E78C7" height={2} />
          <Providers>{children}</Providers>
          <Toaster />
        </ThemeProvider>
        <script>
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then(reg => console.log('Service Worker registered:', reg))
                  .catch(err => console.error('Service Worker registration failed:', err));
              });
            }
          `}
        </script>
      </body>
    </html>
  );
}

