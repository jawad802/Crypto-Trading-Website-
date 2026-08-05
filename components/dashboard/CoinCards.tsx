"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CoinCardProps {
  coins?: any[];
}

export default function CoinCards({ coins: initialCoins }: CoinCardProps) {
  const [coins, setCoins] = useState<any[]>(initialCoins || []);
  const [loading, setLoading] = useState(!initialCoins || initialCoins.length === 0);

  useEffect(() => {
    // If coins weren't passed as props, fetch them from our API endpoint
    if (!initialCoins || initialCoins.length === 0) {
      async function fetchCoins() {
        try {
          const res = await fetch("/api/coins");
          if (res.ok) {
            const data = await res.json();
            setCoins(data);
          }
        } catch (err) {
          console.error("Failed to load coins for cards:", err);
        } finally {
          setLoading(false);
        }
      }
      fetchCoins();
    }
  }, [initialCoins]);

  const featuredIds = ["bitcoin", "ethereum", "litecoin", "dogecoin"];
  const featuredCoins = coins.filter((c) => featuredIds.includes(c.id));

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[#111622] border border-gray-800/80 rounded-2xl p-5 h-36 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {featuredCoins.map((coin) => {
        const isPositive = coin.price_change_percentage_24h >= 0;

        return (
          <Link
            key={coin.id}
            href={`/coin/${coin.id}`}
            className="bg-[#111622] border border-gray-800/80 hover:border-gray-700 rounded-2xl p-5 shadow-lg transition-all hover:-translate-y-1 block"
          >
            <div className="flex items-center gap-3 mb-4">
              {coin.image && (
                <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
              )}
              <div>
                <h3 className="font-bold text-white text-sm">{coin.name}</h3>
                <span className="text-xs text-gray-400 uppercase">{coin.symbol}</span>
              </div>
            </div>

            {/* Sparkline Trend SVG */}
            <div className="h-10 w-full my-2 flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20">
                <path
                  d={isPositive ? "M 0 15 Q 25 5, 50 12 T 100 2" : "M 0 5 Q 25 15, 50 8 T 100 18"}
                  fill="none"
                  stroke={isPositive ? "#22C55E" : "#EF4444"}
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800/60">
              <span className="font-mono font-bold text-white text-base">
                ${coin.current_price?.toLocaleString()}
              </span>

              <div
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${isPositive
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                  }`}
              >
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {isPositive ? "+" : ""}
                {coin.price_change_percentage_24h?.toFixed(1)}%
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}