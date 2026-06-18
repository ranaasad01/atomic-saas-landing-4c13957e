import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flowmatic — Automate Everything, Effortlessly",
  description:
    "Flowmatic is the modern SaaS platform that lets teams automate workflows, eliminate busywork, and ship faster — without writing a single line of code.",
  keywords: ["automation", "workflow", "SaaS", "no-code", "productivity"],
  openGraph: {
    title: "Flowmatic — Automate Everything, Effortlessly",
    description:
      "Automate workflows, eliminate busywork, and ship faster with Flowmatic.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-slate-900 antialiased font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}