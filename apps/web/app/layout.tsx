import "../public/css/styles.css";
import "../public/css/zeraus.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { SanityLive } from "@/sanity/live";
import type { Metadata, Viewport } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zera.us";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ZERAus | Digital Studio",
    template: "%s | ZERAus",
  },
  description:
    "ZERAus is a digital studio in Las Vegas building websites, software, integrations and brands.",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    other: [{ rel: "mask-icon", url: "/favicon/safari-pinned-tab.svg", color: "#000000" }],
  },
  openGraph: {
    type: "website",
    siteName: "ZERAus",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    site: "@Zeraus_Studio",
  },
};

export const viewport: Viewport = {
  themeColor: "#191919",
};

// zera.us is a dark brand: default to dark, still honour a visitor's explicit choice.
const setColorSchemeScript = `
(function() {
  try {
    var scheme = localStorage.getItem('color-scheme') || 'dark';
    document.documentElement.setAttribute('color-scheme', scheme);
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className="no-touch">
      <head>
        <script dangerouslySetInnerHTML={{ __html: setColorSchemeScript }} />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
        <SanityLive />
      </body>
    </html>
  );
}
