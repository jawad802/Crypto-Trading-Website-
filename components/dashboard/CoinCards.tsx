"use client";

import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface CryptoCardData {
  name: string;
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
  iconBg: string;
  iconSymbol: string;
  sparklineData: { val: number }[];
}

const cryptoCardsData: CryptoCardData[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: "$17,780.16",
    change: "+1.2%",
    isPositive: true,
    iconBg: "bg-[#F39C12]",
    iconSymbol: "₿",
    sparklineData: [{ val: 15 }, { val: 12 }, { val: 18 }, { val: 30 }, { val: 25 }, { val: 28 }, { val: 24 }, { val: 32 }, { val: 33 }, { val: 20 }, { val: 30 }, { val: 28 }, { val: 36 }, { val: 39 }]
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "$17,780.16",
    change: "+1.2%", // Styled as a negative trend layout based on 3.PNG's red graph style
    isPositive: false,
    iconBg: "bg-[#5C79E8]",
    iconSymbol: "Ξ",
    sparklineData: [{ val: 35 }, { val: 28 }, { val: 18 }, { val: 38 }, { val: 36 }, { val: 28 }, { val: 26 }, { val: 30 }, { val: 22 }, { val: 24 }, { val: 31 }, { val: 27 }, { val: 35 }, { val: 20 }]
  },
  {
    name: "Litecoin",
    symbol: "LTE",
    price: "$17,780.16",
    change: "+1.2%",
    isPositive: true,
    iconBg: "bg-[#1E74D4]",
    iconSymbol: "Ł",
    sparklineData: [{ val: 15 }, { val: 12 }, { val: 11 }, { val: 18 }, { val: 23 }, { val: 22 }, { val: 20 }, { val: 22 }, { val: 21 }, { val: 25 }, { val: 23 }, { val: 27 }, { val: 26 }, { val: 32 }]
  },
  {
    name: "Doge Coin",
    symbol: "DOGE",
    price: "$17,780.16",
    change: "+1.2%",
    isPositive: false,
    iconBg: "bg-[#BA9F32]",
    iconSymbol: "Ð",
    sparklineData: [{ val: 35 }, { val: 31 }, { val: 25 }, { val: 21 }, { val: 29 }, { val: 27 }, { val: 21 }, { val: 18 }, { val: 20 }, { val: 14 }, { val: 14 }, { val: 16 }, { val: 12 }, { val: 15 }]
  }
];

export default function CoinCards() {
  return (
    <div className="w-full max-w-8xl mx-auto px-4 py-6">
      {/* Dynamic Grid Layout Layering */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cryptoCardsData.map((coin, index) => (
          <div
            key={`${coin.symbol}-${index}`}
            className="bg-[#161A1E] rounded-2xl p-5 border border-gray-900/60 shadow-md flex flex-col justify-between h-[230px] hover:border-gray-800/80 transition-all duration-200"
          >
            {/* Top Row: Icon + Meta Info */}
            <div className="flex items-center space-x-3.5">
              <div className={`w-11 h-11 ${coin.iconBg} rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl shadow-inner`}>
                {coin.iconSymbol}
              </div>
              <div>
                <h4 className="text-[15px] font-semibold tracking-wide text-gray-100">{coin.name}</h4>
                <p className="text-xs font-semibold text-[#848E9C] mt-0.5 tracking-wider uppercase">{coin.symbol}</p>
              </div>
            </div>

            {/* Middle Row: Micro-Sparkline Chart Container */}
            <div className="w-full h-[45px] my-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={coin.sparklineData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                  <Line
                    type="monotone"
                    dataKey="val"
                    stroke={coin.isPositive ? "#10B981" : "#EF4444"}
                    strokeWidth={1.5}
                    dot={false}
                    activeDot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bottom Row: Valuation Data & Tag Status Badge */}
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-bold tracking-tight text-white font-mono">
                {coin.price}
              </span>

              <div
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold ${coin.isPositive
                  ? "bg-[#10B981]/10 text-[#10B981]"
                  : "bg-[#EF4444]/10 text-[#EF4444]"
                  }`}
              >
                <span>{coin.change}</span>
                <span className="text-[10px]">
                  {coin.isPositive ? "↗" : "↘"}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}