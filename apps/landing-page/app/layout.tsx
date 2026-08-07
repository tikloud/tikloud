import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Ti Kloud — Cloud infrastructure, simplified",
    template: "%s | Ti Kloud",
  },
  description:
    "Ti Kloud builds the tools your organization needs to ship faster — starting with the landing page and dashboard you see here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white font-sans text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
