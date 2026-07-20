"use client";

import React from "react";

const mockSimilarCoins = [
  { name: "Bitcoin", symbol: "BTC", change: "+3.98%", price: "$7,598.00", isPositive: true, bg: "bg-[#F39C12]", initial: "₿" },
  { name: "Ethereum", symbol: "ETH", change: "+3.98%", price: "$1,598.00", isPositive: true, bg: "bg-[#5C79E8]", initial: "Ξ" },
  { name: "Cardano", symbol: "ADA", change: "+3.98%", price: "$2,598.00", isPositive: true, bg: "bg-[#2A5298]", initial: "₳" },
  { name: "Solana", symbol: "SOL", change: "+3.98%", price: "$3,598.00", isPositive: false, bg: "bg-[#14F195]/20 text-[#14F195]", initial: "S" },
  { name: "XRP", symbol: "XRP", change: "+3.98%", price: "$2,598.00", isPositive: true, bg: "bg-[#23292F]", initial: "X" },
];

export default function SimilarCoins() {
  return (
    <div className="bg-[#161A1E] border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-200 tracking-wide">Similar Coins</h3>
        <select className="bg-transparent text-xs text-gray-400 outline-none font-semibold cursor-pointer">
          <option>Popular</option>
          <option>Gainers</option>
        </select>
      </div>

      <div className="space-y-3">
        {mockSimilarCoins.map((token, index) => (
          <div key={`${token.symbol}-${index}`} className="flex items-center justify-between p-2 rounded-xl hover:bg-[#0B0E11]/30 transition duration-150">
            <div className="flex items-center space-x-3">
              <div className={`w-9 h-9 ${token.bg} rounded-full flex items-center justify-center font-bold text-sm text-white shadow-sm`}>
                {token.initial}
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-200">{token.name}</h4>
                <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">{token.symbol}</p>
              </div>
            </div>

            <div className="text-right">
              <span className={`text-xs font-bold ${token.isPositive ? "text-[#39E11B]" : "text-[#F14D4D]"}`}>
                {token.change}
              </span>
              <p className="text-xs font-bold font-mono text-gray-300 mt-0.5">{token.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}