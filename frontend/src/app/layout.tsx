import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sony Intelligence Dashboard — Küresel Satış & İş Zekası",
  description:
    "Sony küresel satış verileri, PlayStation Network analizleri ve departman gelir dağılımını görselleştiren yönetici analitik paneli.",
  keywords: [
    "Sony",
    "PlayStation",
    "Dashboard",
    "İş Zekası",
    "Analitik",
    "YBS",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
