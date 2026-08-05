"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";

export default function CoinDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [coin, setCoin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoinDetail() {
      try {
        const res = await fetch(`/api/coins/${id}`);
        if (res.ok) {
          const data = await res.json();
          setCoin(data);
        }
      } catch (err) {
        console.error("Failed to fetch coin detail:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCoinDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0E14] text-gray-400 flex items-center justify-center">
        <div className="animate-pulse text-lg font-medium">Loading live coin metrics...</div>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="min-h-screen bg-[#0B0E14] text-white p-8">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
        </Link>
        <div className="p-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
          Coin details not found.
        </div>
      </div>
    );
  }

  const marketData = coin.market_data || {};
  const isPositive24h = marketData.price_change_percentage_24h >= 0;

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Top Header Row with Back Button */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#161A23] hover:bg-[#1E2330] border border-gray-800 rounded-lg text-sm text-gray-300 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold rounded-full uppercase">
            Rank #{coin.market_cap_rank || "N/A"}
          </span>
        </div>

        {/* Hero Banner: Icon, Name, Price & Change */}
        <div className="bg-[#111622] border border-gray-800/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {coin.image?.large && (
              <img src={coin.image.large} alt={coin.name} className="w-16 h-16 rounded-full" />
            )}
            <div>
              <h1 className="text-3xl font-extrabold text-white">{coin.name}</h1>
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {coin.symbol}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:items-end">
            <span className="text-sm text-gray-400">Current Price</span>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-3xl md:text-4xl font-mono font-bold">
                ${marketData.current_price?.usd?.toLocaleString() ?? "N/A"}
              </span>
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${isPositive24h
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
              >
                {isPositive24h ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {isPositive24h ? "+" : ""}
                {marketData.price_change_percentage_24h?.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        {/* Key Market Metrics Table Grid */}
        <div className="bg-[#111622] border border-gray-800/80 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-200 mb-4">Market Overview</h2>

          <div className="divide-y divide-gray-800/60">
            <div className="py-3.5 flex justify-between items-center text-sm">
              <span className="text-gray-400">Market Capitalization</span>
              <span className="font-mono font-medium text-gray-200">
                ${marketData.market_cap?.usd?.toLocaleString() ?? "N/A"}
              </span>
            </div>

            <div className="py-3.5 flex justify-between items-center text-sm">
              <span className="text-gray-400">24h Trading Volume</span>
              <span className="font-mono font-medium text-gray-200">
                ${marketData.total_volume?.usd?.toLocaleString() ?? "N/A"}
              </span>
            </div>

            <div className="py-3.5 flex justify-between items-center text-sm">
              <span className="text-gray-400">24h High / Low</span>
              <span className="font-mono font-medium">
                <span className="text-green-400">${marketData.high_24h?.usd?.toLocaleString() ?? "N/A"}</span>
                <span className="text-gray-500 mx-2">/</span>
                <span className="text-red-400">${marketData.low_24h?.usd?.toLocaleString() ?? "N/A"}</span>
              </span>
            </div>

            <div className="py-3.5 flex justify-between items-center text-sm">
              <span className="text-gray-400">All-Time High (ATH)</span>
              <span className="font-mono font-medium text-gray-200">
                ${marketData.ath?.usd?.toLocaleString() ?? "N/A"}
              </span>
            </div>

            <div className="py-3.5 flex justify-between items-center text-sm">
              <span className="text-gray-400">Circulating Supply</span>
              <span className="font-mono font-medium text-gray-200">
                {marketData.circulating_supply?.toLocaleString() ?? "N/A"} {coin.symbol?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}