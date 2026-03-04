import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "Elevate", template: "%s | Elevate" },
  description:
    "The platform built exclusively for PCB designers and hardware engineers. Showcase work, freelance, learn, simulate circuits, and shop components.",
  keywords: ["PCB design", "hardware engineering", "KiCad", "Altium", "electronics"],
  authors: [{ name: "Elevate" }],
  openGraph: {
    title: "Elevate – Hardware Design Platform",
    description: "Where PCB designers and hardware engineers thrive.",
    type: "website",
    locale: "en_IN",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
