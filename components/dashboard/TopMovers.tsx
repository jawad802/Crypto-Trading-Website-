"use client";

import React from "react";
// 1. Import Next.js Link component wrapper
import Link from "next/link";

interface CryptoMover {
  name: string;
  symbol: string;
  change: number;
  price: string;
  iconBg: string;
  iconSymbol: string;
  customIcon?: React.ReactNode;
}

const moversData: CryptoMover[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    change: 3.98,
    price: "$7,598.00",
    iconBg: "bg-[#F39C12]",
    iconSymbol: "₿",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    change: -3.98,
    price: "$1,598.00",
    iconBg: "bg-[#5C79E8]",
    iconSymbol: "Ξ",
    customIcon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L4.63 14.18L12 18.5L19.37 14.18L12 2Z" opacity="0.8" />
        <path d="M12 22L4.63 15.37L12 19.68L19.37 15.37L12 22Z" opacity="0.6" />
      </svg>
    )
  },
  {
    name: "Cardano",
    symbol: "ADA",
    change: 3.98,
    price: "$2,598.00",
    iconBg: "bg-[#2A5298]",
    iconSymbol: "₳",
    customIcon: (
      <span className="text-white font-serif font-semibold text-lg italic -skew-x-6">L</span>
    )
  },
  {
    name: "Solana",
    symbol: "SOL",
    change: -3.98,
    price: "$3,598.00",
    iconBg: "bg-transparent",
    iconSymbol: "",
    customIcon: (
      <div className="relative w-8 h-8 flex items-center justify-center rounded-full border-2 border-pink-500 border-dashed animate-spin-slow">
        <div className="w-2 h-2 bg-pink-500 rounded-full" />
      </div>
    )
  },
  {
    name: "XRP",
    symbol: "XRP",
    change: 3.98,
    price: "$2,598.00",
    iconBg: "bg-[#E13C3C]",
    iconSymbol: "",
    customIcon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 22H22L12 2ZM12 6L19 19H5L12 6Z" />
      </svg>
    )
  },
];

export default function TopMovers() {
  return (
    <div className="w-full max-w-2xl mt-5 mx-auto bg-[#161A1E] text-white rounded-2xl p-6 shadow-xl border border-gray-900 selection:bg-emerald-500/20">

      {/* Card Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold tracking-tight text-gray-100">Top Movers</h3>
        <div className="w-full h-[1px] bg-gradient-to-r from-blue-900/40 via-transparent to-transparent mt-4 opacity-40" />
      </div>

      {/* Crypto Rows Wrapper */}
      <div className="space-y-5">
        {moversData.map((coin, index) => {
          const isPositive = coin.change >= 0;

          // 2. Generate path dynamic folder strings matching the dynamic key ids in coin/[id]/page.tsx
          const dynamicRoutePath = `/coin/${coin.name.toLowerCase()}`;

          return (
            // 3. Changed this row wrapper from a <div> to Next.js <Link> component
            <Link
              key={`${coin.symbol}-${index}`}
              href={dynamicRoutePath}
              className="flex items-center justify-between group p-1 rounded-xl transition-all duration-200 hover:bg-gray-800/20 cursor-pointer layout-row block"
            >
              {/* Left Column: Icon + Text Identifiers */}
              <div className="flex items-center space-x-4">
                <div className={`w-11 h-11 ${coin.iconBg} rounded-full flex items-center justify-center shadow-md flex-shrink-0`}>
                  {coin.customIcon ? (
                    coin.customIcon
                  ) : (
                    <span className="text-white font-bold text-xl">{coin.iconSymbol}</span>
                  )}
                </div>
                <div>
                  <h4 className="text-base font-medium tracking-wide text-gray-100 transition group-hover:text-white">
                    {coin.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#848E9C] tracking-wider mt-0.5 uppercase">
                    {coin.symbol}
                  </p>
                </div>
              </div>

              {/* Middle Column: Dynamic Color % Allocation */}
              <div className="text-right flex-grow pr-6 sm:pr-10">
                <span
                  className={`text-sm font-semibold tracking-wide ${isPositive ? "text-[#39E11B]" : "text-[#F14D4D]"
                    }`}
                >
                  {isPositive ? `+${coin.change}%` : `${coin.change}%`}
                </span>
              </div>

              {/* Right Column: Fiat Valuation */}
              <div className="text-right">
                <span className="text-base font-medium tracking-tight text-gray-100 font-mono">
                  {coin.price}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}