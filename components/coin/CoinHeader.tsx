"use client";

import React from "react";
import { Share2 } from "lucide-react";

interface CoinHeaderProps {
  coin: {
    name: string;
    symbol: string;
    price: string;
    change24h: number;
    todayChange: string;
    todayIsPositive: boolean;
    days30Change: string;
    days30IsPositive: boolean;
    marketCapRank: string;
    iconSymbol: string;
    iconBg: string;
  };
}

export default function CoinHeader({ coin }: CoinHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">{coin.name}</span>
        <div className="flex items-center space-x-3 mt-1">
          <div className={`w-10 h-10 ${coin.iconBg} rounded-full flex items-center justify-center font-bold text-lg text-slate-900 shadow-md`}>
            {coin.iconSymbol}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{coin.price}</h1>
          <span className={`flex items-center space-x-0.5 px-2 py-0.5 rounded-md text-xs font-bold ${coin.todayIsPositive ? "bg-[#39E11B]/10 text-[#39E11B]" : "bg-[#F14D4D]/10 text-[#F14D4D]"}`}>
            {coin.todayIsPositive ? "▲" : "▼"} {coin.change24h}%
          </span>
        </div>
      </div>

      {/* Pill blocks from Figma */}
      <div className="flex items-center space-x-4">
        <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 min-w-[75px]">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Today</p>
          <p className={`text-sm font-bold mt-0.5 ${coin.todayIsPositive ? "text-[#10B981]" : "text-[#F14D4D]"}`}>{coin.todayChange}</p>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 min-w-[75px]">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">30 Days</p>
          <p className={`text-sm font-bold mt-0.5 ${coin.days30IsPositive ? "text-[#10B981]" : "text-[#F14D4D]"}`}>{coin.days30Change}</p>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 min-w-[110px]">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Market Cap Rank</p>
          <p className="text-sm font-bold text-slate-900 mt-0.5">{coin.marketCapRank}</p>
        </div>
        <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 p-2.5 rounded-xl transition">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}