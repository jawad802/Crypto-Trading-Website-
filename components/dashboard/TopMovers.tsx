"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CryptoCoin } from "@/lib/coingecko";

export default function TopMovers() {
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  if (loading) {
    return <div className="p-4 text-gray-400">Loading live market data...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {coins.map((coin) => (
        <Link key={coin.id} href={`/coin/${coin.id}`} className="block">
          <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-700 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
              <div>
                <h3 className="font-semibold text-white">{coin.name}</h3>
                <p className="text-sm text-gray-400 uppercase">{coin.symbol}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-white">
                ${coin.current_price?.toLocaleString()}
              </span>
              <span
                className={`text-sm font-semibold ${coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
                  }`}
              >
                {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}