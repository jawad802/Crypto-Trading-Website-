"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, ReferenceLine } from "recharts";

// Mock Data matching the 19:00 - 19:50 timeline with high/low/open/close + volume
const generateChartData = () => {
  const data = [];
  const baseTimes = ["19:00", "19:10", "19:20", "19:30", "19:40", "19:50", "19:50"];
  
  for (let i = 0; i < 45; i++) {
    const isGreen = Math.random() > 0.45;
    const open = isGreen ? 25000 + Math.random() * 12000 : 28000 + Math.random() * 12000;
    const close = isGreen ? open + Math.random() * 5000 : open - Math.random() * 5000;
    const high = Math.max(open, close) + Math.random() * 3000;
    const low = Math.min(open, close) - Math.random() * 3000;
    const volume = 2000 + Math.random() * 8000;

    // Distribute time labels across the X axis
    let timeLabel = "";
    if (i % 7 === 0) timeLabel = baseTimes[Math.floor(i / 7)] || "";

    data.push({
      time: timeLabel,
      open,
      close,
      high,
      low,
      // Recharts trick: The bar renders from the bottom value to the top value
      box: [open, close].sort((a, b) => a - b), 
      wick: [low, high].sort((a, b) => a - b),
      volume,
      isGreen,
    });
  }
  return data;
};

const data = generateChartData();
const timeframes = ["1h", "3h", "1d", "1w", "1m"];

export default function ChartCard() {
  const [activeTimeframe, setActiveTimeframe] = useState("1h");

  return (
    <div className="w-full max-w-7xl mx-auto bg-[#161A1E] text-white rounded-2xl p-5 md:p-8 shadow-xl border border-gray-900 selection:bg-emerald-500/20">
      
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-100">Chart</h2>
        
        {/* Currency Selector */}
        <button className="flex items-center space-x-2 bg-[#20262D] hover:bg-[#2B3139] text-sm font-medium px-3 py-1.5 rounded-lg transition border border-gray-800">
          <span className="text-amber-500 font-bold text-xs bg-amber-500/10 w-5 h-5 rounded-full flex items-center justify-center">$</span>
          <span className="text-gray-200">USD</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Asset Info & Timeframe Selectors Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        {/* Price Tracker */}
        <div className="flex items-center space-x-4">
          {/* Bitcoin Custom Brand Ring */}
          <div className="w-12 h-12 bg-[#F39C12] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/10 flex-shrink-0">
            <span className="text-white font-extrabold text-2xl tracking-tighter">₿</span>
          </div>
          <div>
            <div className="flex items-center space-x-1 cursor-pointer group">
              <span className="text-sm font-medium text-[#848E9C] group-hover:text-gray-300 transition">Bitcoin/BTC</span>
              <ChevronDown className="w-4 h-4 text-[#848E9C] group-hover:text-gray-300 transition" />
            </div>
            <div className="text-2xl md:text-3xl font-bold tracking-tight mt-0.5">$35.352.02</div>
          </div>
        </div>

        {/* Timeframe Toggles */}
        <div className="flex items-center bg-[#1E2329] p-1 rounded-xl self-start sm:self-center border border-gray-800">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
                activeTimeframe === tf
                  ? "bg-[#64DF36] text-black font-semibold shadow-md"
                  : "text-[#848E9C] hover:text-white"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Main Responsive Chart Workspace */}
      <div className="h-[320px] md:h-[400px] w-full relative">
        
        {/* Absolute-positioned Target Price Badge ($34K Line) */}
        <div className="absolute right-0 top-[48.5%] transform -translate-y-1/2 z-10 hidden sm:block">
          <span className="bg-[#64DF36] text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            $34K
          </span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 45, left: -10, bottom: 0 }}>
            {/* X-Axis labels */}
            <XAxis 
              dataKey="time" 
              tickLine={false} 
              axisLine={false}
              tick={{ fill: "#848E9C", fontSize: 12, fontWeight: 500 }}
              dy={15}
            />
            {/* Y-Axis numbers */}
            <YAxis 
              domain={[10000, 55000]} 
              tickCount={5}
              tickFormatter={(v) => `${(v / 1000).toFixed(3)}`}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#848E9C", fontSize: 12, fontWeight: 500 }}
              orientation="left"
            />

            {/* Target Price Dashed Reference Line */}
            <ReferenceLine 
              y={31000} 
              stroke="#848E9C" 
              strokeDasharray="4 4" 
              strokeWidth={1.2}
            />

            {/* Candle Wicks (High/Low Lines) */}
            <Bar
              dataKey="wick"
              fill="none"
              stroke="#475569"
              radius={0}
              xAxisId={0}
              className="opacity-40"
            />

            {/* Candle Bodies (Open/Close Bars) */}
            <Bar
              dataKey="box"
              shape={(props: any) => {
                const { x, y, width, height, payload } = props;
                const fill = payload.isGreen ? "#64DF36" : "#E15241";
                return (
                  <rect
                    x={x + width * 0.15}
                    y={y}
                    width={width * 0.7}
                    height={height}
                    fill={fill}
                    rx={2}
                  />
                );
              }}
            />

            {/* Volume Graph Overlay at the bottom */}
            <Bar
              dataKey="volume"
              fill="#2B3139"
              opacity={0.35}
              shape={(props: any) => {
                const { x, y, width, height } = props;
                // Keep the volume bars restricted strictly to the base of the container
                const chartHeight = 400; 
                const barHeight = Math.min(height * 0.15, 30);
                return (
                  <rect
                    x={x + width * 0.25}
                    y={y + height - barHeight}
                    width={width * 0.5}
                    height={barHeight}
                    fill="#2B3139"
                    rx={1}
                  />
                );
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}