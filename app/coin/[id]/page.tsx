"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Globe, Compass, ArrowUpRight } from "lucide-react";

// Import your custom elements from the component kitchen!
import CoinHeader from "@/components/coin/CoinHeader";
import PriceChart from "@/components/coin/PriceChart";
import OrderBook from "@/components/coin/OrderBook";
import Converter from "@/components/coin/Converter";
import SimilarCoins from "@/components/coin/SimilarCoins";

const mockCoinDetails: Record<string, any> = {
  ethereum: {
    name: "Ethereum", symbol: "ETH", price: "$177,340.48", change24h: 1.2,
    todayChange: "+1.2%", todayIsPositive: true, days30Change: "-11.8%", days30IsPositive: false,
    marketCapRank: "23", marketCap: "$57421.34", volume: "1034", rank: "13", iconSymbol: "Ξ", iconBg: "bg-[#5C79E8]",
  },
  bitcoin: {
    name: "Bitcoin", symbol: "BTC", price: "$43,210.55", change24h: 2.14,
    todayChange: "+2.14%", todayIsPositive: true, days30Change: "+5.4%", days30IsPositive: true,
    marketCapRank: "1", marketCap: "$845.20B", volume: "18240", rank: "1", iconSymbol: "₿", iconBg: "bg-[#F39C12]",
  }
};

export default function CoinDetailPage() {
  const params = useParams();
  const coinId = (params?.id as string) || "ethereum";
  const coin = mockCoinDetails[coinId.toLowerCase()] || mockCoinDetails.ethereum;

  return (
    <div className="min-h-screen bg-[#0B0E11] text-white p-6 md:p-10 font-sans selection:bg-emerald-500/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT TWO-COLUMNS DESKTOP UI */}
        <div className="lg:col-span-2 space-y-6">
          <CoinHeader coin={coin} />
          <PriceChart />

          {/* Quick Stats Banner Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#161A1E] border border-gray-800 rounded-xl p-4">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Market Cap</span>
              <p className="text-base font-bold text-gray-100 mt-1">{coin.marketCap}</p>
            </div>
            <div className="bg-[#161A1E] border border-gray-800 rounded-xl p-4">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Volume</span>
              <p className="text-base font-bold text-gray-100 mt-1">{coin.volume}</p>
            </div>
            <div className="bg-[#161A1E] border border-gray-800 rounded-xl p-4">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Rank</span>
              <p className="text-base font-bold text-gray-100 mt-1">{coin.rank}</p>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href="#" className="flex items-center justify-between bg-[#161A1E] hover:bg-gray-800 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 font-medium transition">
              <div className="flex items-center space-x-2.5"><Globe className="w-4 h-4 text-blue-400" /><span>Link website</span></div>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
            </a>
            <a href="#" className="flex items-center justify-between bg-[#161A1E] hover:bg-gray-800 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 font-medium transition">
              <div className="flex items-center space-x-2.5"><Compass className="w-4 h-4 text-emerald-400" /><span>Website Explorer</span></div>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
            </a>
          </div>

          <OrderBook />
        </div>

        {/* RIGHT COLUMN SIDEBAR UI */}
        <div className="space-y-6">
          <Converter symbol={coin.symbol} />
          <SimilarCoins />
        </div>

      </div>
    </div>
  );
}