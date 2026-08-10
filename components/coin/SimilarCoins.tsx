"use client";

import React from "react";

const mockSimilarCoins = [
  { name: "Bitcoin", symbol: "BTC", change: "+3.98%", price: "$7,598.00", isPositive: true, bg: "bg-[#F39C12]", textColor: "text-slate-50", initial: "₿" },
  { name: "Ethereum", symbol: "ETH", change: "+3.98%", price: "$1,598.00", isPositive: true, bg: "bg-[#5C79E8]", textColor: "text-slate-50", initial: "Ξ" },
  { name: "Cardano", symbol: "ADA", change: "+3.98%", price: "$2,598.00", isPositive: true, bg: "bg-[#2A5298]", textColor: "text-slate-50", initial: "₳" },
  { name: "Solana", symbol: "SOL", change: "+3.98%", price: "$3,598.00", isPositive: false, bg: "bg-[#14F195]/20", textColor: "text-[#14F195]", initial: "S" },
  { name: "XRP", symbol: "XRP", change: "+3.98%", price: "$2,598.00", isPositive: true, bg: "bg-[#23292F]", textColor: "text-slate-50", initial: "X" },
];

export default function SimilarCoins() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900 tracking-wide">Similar Coins</h3>
        <select className="bg-white text-xs text-slate-500 outline-none font-semibold cursor-pointer">
          <option>Popular</option>
          <option>Gainers</option>
        </select>
      </div>

      <div className="space-y-3">
        {mockSimilarCoins.map((token, index) => (
          <div key={`${token.symbol}-${index}`} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition duration-150">
            <div className="flex items-center space-x-3">
              <div className={`w-9 h-9 ${token.bg} rounded-full flex items-center justify-center font-bold text-sm ${token.textColor} shadow-sm`}>
                {token.initial}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{token.name}</h4>
                <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">{token.symbol}</p>
              </div>
            </div>

            <div className="text-right">
              <span className={`text-xs font-bold ${token.isPositive ? "text-[#10B981]" : "text-[#F14D4D]"}`}>
                {token.change}
              </span>
              <p className="text-xs font-bold font-mono text-slate-700 mt-0.5">{token.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}