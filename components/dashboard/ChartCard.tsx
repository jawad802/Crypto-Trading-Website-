"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AVAILABLE_COINS = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "binancecoin", name: "BNB", symbol: "BNB" },
  { id: "solana", name: "Solana", symbol: "SOL" },
  { id: "ripple", name: "XRP", symbol: "XRP" },
];

const TIMEFRAMES = [
  { label: "1h", days: "1" },
  { label: "3h", days: "1" },
  { label: "1d", days: "1" },
  { label: "1w", days: "7" },
  { label: "1m", days: "30" },
];

export default function ChartCard() {
  const [selectedCoin, setSelectedCoin] = useState(AVAILABLE_COINS[0]);
  const [activeTimeframe, setActiveTimeframe] = useState("1d");
  const [chartData, setChartData] = useState<any[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChart() {
      setLoading(true);
      try {
        const selectedTf = TIMEFRAMES.find((tf) => tf.label === activeTimeframe);
        const days = selectedTf ? selectedTf.days : "1";

        const res = await fetch(`/api/coins/${selectedCoin.id}/chart?days=${days}`);
        if (res.ok) {
          const data = await res.json();
          if (data.prices && Array.isArray(data.prices)) {
            const formatted = data.prices.map(([timestamp, price]: [number, number]) => {
              const date = new Date(timestamp);
              const timeStr =
                days === "1"
                  ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                  : date.toLocaleDateString([], { month: "short", day: "numeric" });

              return {
                time: timeStr,
                price: Number(price.toFixed(2)),
              };
            });

            setChartData(formatted);

            if (formatted.length > 0) {
              setCurrentPrice(formatted[formatted.length - 1].price);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load chart data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchChart();
  }, [selectedCoin, activeTimeframe]);

  return (
    <div className="bg-[#111622] border border-gray-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between max-h-[750px]">

      {/* Chart Header with Dropdown & Timeframe selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">

        {/* Coin Selector Dropdown */}
        <div>
          <div className="flex items-center gap-2">
            <select
              value={selectedCoin.id}
              onChange={(e) => {
                const coin = AVAILABLE_COINS.find((c) => c.id === e.target.value);
                if (coin) setSelectedCoin(coin);
              }}
              className="bg-[#161A23] border border-gray-800 text-white font-bold text-lg rounded-lg px-3 py-1 focus:outline-none focus:border-green-500 cursor-pointer"
            >
              {AVAILABLE_COINS.map((coin) => (
                <option key={coin.id} value={coin.id} className="bg-[#111622] text-white">
                  {coin.name} ({coin.symbol})
                </option>
              ))}
            </select>
          </div>

          <h2 className="text-3xl font-extrabold text-white font-mono mt-2">
            {currentPrice !== null ? `$${currentPrice.toLocaleString()}` : "$0.00"}
          </h2>
        </div>

        {/* Timeframe Selector Buttons */}
        <div className="flex items-center gap-1.5 bg-[#161A23] p-1.5 rounded-xl border border-gray-800">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.label}
              onClick={() => setActiveTimeframe(tf.label)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTimeframe === tf.label
                  ? "bg-[#22C55E] text-black shadow-md font-bold"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="h-[300px] w-full">
        {loading ? (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm animate-pulse">
            Loading chart data...
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#4B5563" fontSize={11} tickLine={false} />
              <YAxis
                domain={["auto", "auto"]}
                stroke="#4B5563"
                fontSize={11}
                tickLine={false}
                orientation="right"
                tickFormatter={(val) => `$${val.toLocaleString()}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#161A23",
                  borderColor: "#374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(val: any) => [`$${Number(val).toLocaleString()}`, "Price"]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#22C55E"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            No chart data available.
          </div>
        )}
      </div>

    </div>
  );
}