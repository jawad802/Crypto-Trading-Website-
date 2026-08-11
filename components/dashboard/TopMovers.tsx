"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { CryptoCoin } from "@/lib/coingecko";

export default function TopMovers() {
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. Fetch live coin market data
  useEffect(() => {
    async function fetchCoins() {
      try {
        const response = await fetch("/api/coins");
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error("Failed to load coins:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, []);

  // 2. Fetch saved watchlist coin IDs
  useEffect(() => {
    async function fetchWatchlist() {
      try {
        const res = await fetch("/api/watchlist");
        if (res.ok) {
          const data = await res.json();
          if (data.watchlist) {
            setWatchlist(data.watchlist.map((item: any) => item.coinId));
          }
        }
      } catch (err) {
        console.error("Failed to fetch watchlist:", err);
      }
    }

    fetchWatchlist();
  }, []);

  // 3. Toggle Watchlist Handler
  const handleToggleWatchlist = async (
    e: React.MouseEvent,
    coin: CryptoCoin
  ) => {
    e.preventDefault(); // Prevents navigating to /coin/[id]

    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coinId: coin.id,
          coinSymbol: coin.symbol,
          coinName: coin.name,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.added) {
          setWatchlist((prev) => [...prev, coin.id]);
        } else {
          setWatchlist((prev) => prev.filter((id) => id !== coin.id));
        }
      }
    } catch (err) {
      console.error("Error toggling watchlist:", err);
    }
  };

  if (loading) {
    return <div className="p-4 text-slate-700">Loading live market data...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {coins.map((coin) => {
        const isSaved = watchlist.includes(coin.id);

        return (
          <Link key={coin.id} href={`/coin/${coin.id}`} className="block group">
            <div className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition cursor-pointer shadow-sm relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <h3 className="font-semibold text-slate-900">{coin.name}</h3>
                    <p className="text-sm text-slate-500 uppercase">{coin.symbol}</p>
                  </div>
                </div>

                {/* Watchlist Bookmark Icon */}
                <button
                  type="button"
                  onClick={(e) => handleToggleWatchlist(e, coin)}
                  className={`p-2 rounded-lg transition-colors border ${isSaved
                      ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                      : "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700"
                    }`}
                  title={isSaved ? "Remove from watchlist" : "Add to watchlist"}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                </button>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">
                  ${coin.current_price?.toLocaleString()}
                </span>
                <span
                  className={`text-sm font-semibold ${coin.price_change_percentage_24h >= 0 ? "text-[#10B981]" : "text-[#F14D4D]"
                    }`}
                >
                  {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}