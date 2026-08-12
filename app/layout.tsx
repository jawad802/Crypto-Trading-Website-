import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CoinPulse | Real-Time Crypto Analytics & Watchlist",
  description: "Track real-time cryptocurrency prices, market trends, and manage your custom watchlist with CoinPulse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 transition-colors duration-300 font-sans">
        {children}
      </body>
    </html>
  );
}