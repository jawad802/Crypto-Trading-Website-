"use client";

import React from "react";

export default function PriceChart() {
  const points = [45, 60, 35, 75, 40, 50, 65, 30, 55, 70, 48, 62, 38, 52, 68, 42];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-900 tracking-wide">Trend Overview</h3>
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 text-xs">
          <button className="px-3 py-1.5 text-slate-500 font-medium">Daily</button>
          <button className="px-3 py-1.5 bg-[#10B981] text-black font-bold rounded-lg border border-slate-200 shadow-sm">Monthly</button>
          <button className="px-3 py-1.5 text-slate-500 font-medium">Yearly</button>
        </div>
      </div>

      <div className="h-64 w-full flex flex-col justify-between relative mt-4">
        <div className="absolute inset-x-0 top-0 border-b border-slate-200/40 text-[10px] text-slate-500 font-mono pb-1">$17800,00</div>
        <div className="absolute inset-x-0 top-1/4 border-b border-slate-200/40 text-[10px] text-slate-500 font-mono pb-1">$17600,00</div>
        <div className="absolute inset-x-0 top-2/4 border-b border-slate-200/20 text-[10px] text-slate-500 font-mono pb-1">$17400,00</div>
        <div className="absolute inset-x-0 top-3/4 border-b border-slate-200/10 text-[10px] text-slate-500 font-mono pb-1">$17200,00</div>
        <div className="absolute inset-x-0 bottom-0 text-[10px] text-slate-500 font-mono pb-1">$16800,00</div>

        <div className="w-full h-full pt-4 flex items-end justify-between px-2 relative z-10">
          {points.map((height, i) => (
            <div key={i} className="flex flex-col items-center flex-grow group cursor-pointer">
              <div className="w-0.5 h-6 bg-slate-200 group-hover:bg-slate-300 transition-colors" />
              <div
                className={`w-3 rounded-[1px] ${i % 3 === 0 ? "bg-[#F14D4D]" : "bg-[#10B981]"}`}
                style={{ height: `${height}px` }}
              />
              <div className="w-0.5 h-4 bg-slate-200 group-hover:bg-slate-300 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between text-[11px] text-slate-500 font-semibold px-2 mt-4 pt-2 border-t border-slate-200/40">
        <span>July</span>
        <span>August</span>
        <span>September</span>
        <span>October</span>
      </div>
    </div>
  );
}