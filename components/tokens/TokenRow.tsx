"use client";

import React from "react";

export interface TokenData {
  name: string;
  symbol: string;
  price: string;
  change24h: number;
  marketCap: string;
  iconBg: string;
  iconSymbol: string;
}

interface TokenRowProps {
  token: TokenData;
  isMobile?: boolean;
}

export default function TokenRow({ token, isMobile = false }: TokenRowProps) {
  const isPositive = token.change24h >= 0;

  if (isMobile) {
    return (
      <div className="flex items-center justify-between p-4 border-b border-gray-800/60 hover:bg-[#1E2329]/20 transition">
        <div className="flex items-center space-x-3">
          <div className={`w-9 h-9 ${token.iconBg} rounded-full flex items-center justify-center font-bold text-base text-white flex-shrink-0`}>
            {token.iconSymbol}
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{token.name}</div>
            <div className="text-xs text-gray-500 font-medium uppercase">{token.symbol}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-white font-mono">{token.price}</div>
          <div className={`text-xs font-bold mt-0.5 ${isPositive ? "text-[#39E11B]" : "text-[#F14D4D]"}`}>
            {isPositive ? `+${token.change24h}%` : `${token.change24h}%`}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table Layout Row */}
      <tr className="hidden md:table-row border-b border-gray-800/50 hover:bg-[#1E2329]/20 transition-colors duration-150 last:border-0 mt-6">
        {/* Token Identify */}
        <td className="py-5 px-6">
          <div className="flex items-center space-x-3.5">
            <div className={`w-10 h-10 ${token.iconBg} rounded-full flex items-center justify-center font-bold text-lg text-white shadow-sm flex-shrink-0`}>
              {token.iconSymbol}
            </div>
            <span className="text-[15px] font-semibold text-gray-100">
              {token.name} <span className="text-gray-500 font-medium text-sm ml-0.5">({token.symbol})</span>
            </span>
          </div>
        </td>

        {/* Valuation Price */}
        <td className="py-5 px-6 text-[15px] font-medium text-white font-mono">
          {token.price}
        </td>

        {/* 24 Hour Delta Metric */}
        <td className={`py-5 px-6 text-[15px] font-semibold ${isPositive ? "text-[#39E11B]" : "text-[#F14D4D]"}`}>
          {isPositive ? `+${token.change24h}%` : `${token.change24h}%`}
        </td>

        {/* Aggregate Capitalization */}
        <td className="py-5 px-6 text-[15px] font-medium text-gray-200 font-mono">
          {token.marketCap}
        </td>
      </tr>
    </>
  );
}