import Link from "next/link";
import { Disc as Discord, Shield, Zap, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 text-slate-600 font-sans mt-auto mt-5">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 ">

          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#EC5800] bg-transparent">
                <svg
                  className="w-6 h-6 text-[#EC5800]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-2xl font-medium tracking-tight text-slate-900">
                Coin<span className=" text-slate-900">Pulse</span>
              </span>
            </Link>
            <p className="text-base text-slate-600 leading-relaxed">
              Track real-time market trends, explore top crypto assets, and manage your watchlist seamlessly.
            </p>
            <div className="flex items-center space-x-4 pt-2 text-slate-400">
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-[#EC5800] transition-colors">
                <Discord className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-2.5 text-base">
              <li>
                <Link href="/" className="hover:text-slate-900 transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link href="/tokens" className="hover:text-slate-900 transition-colors">All Tokens</Link>
              </li>
              <li>
                <Link href="/watchlist" className="hover:text-slate-900 transition-colors">Watchlist</Link>
              </li>
            </ul>
          </div>

          {/* Features / Markets */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 uppercase tracking-wider mb-4">Features</h3>
            <ul className="space-y-2.5 text-base text-slate-500">
              <li className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#EC5800]" /> Live Market Data
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#EC5800]" /> Secure Auth
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#EC5800]" /> CoinGecko API
              </li>
            </ul>
          </div>

          {/* Newsletter / Disclaimer */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 uppercase tracking-wider mb-4">Disclaimer</h3>
            <p className="text-base text-slate-500 leading-relaxed">
              Data provided by public market APIs. This application is for educational and portfolio demonstration purposes only and does not offer financial advice.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-base text-slate-500">
          <p>© {new Date().getFullYear()} CoinPulse. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}