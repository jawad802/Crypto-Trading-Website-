"use client";

import React, { useState } from "react";
import { ArrowRightLeft } from "lucide-react";

interface ConverterProps {
  symbol: string;
}

export default function Converter({ symbol }: ConverterProps) {
  const [cryptoVal, setCryptoVal] = useState("10.42");
  const [fiatVal, setFiatVal] = useState("92,313.02");

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 relative shadow-sm">
      <h3 className="text-sm font-bold text-slate-900 tracking-wide mb-4">{symbol} Converter</h3>

      <div className="space-y-3 relative">
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between">
          <input
            type="text"
            value={cryptoVal}
            onChange={(e) => setCryptoVal(e.target.value)}
            className="bg-white text-slate-900 font-mono font-bold text-sm outline-none w-full"
          />
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 flex items-center space-x-1">
            <span className="text-blue-400">♦</span> <span>{symbol}</span>
          </span>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-[44px] -translate-y-1/2 z-20 bg-[#10B981] p-2 rounded-xl text-black cursor-pointer shadow-md hover:scale-105 transition-all">
          <ArrowRightLeft className="w-3.5 h-3.5 rotate-90 stroke-[2.5]" />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between pt-4">
          <input
            type="text"
            value={fiatVal}
            onChange={(e) => setFiatVal(e.target.value)}
            className="bg-white text-slate-900 font-mono font-bold text-sm outline-none w-full"
          />
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
            USD
          </span>
        </div>
      </div>
    </div>
  );
}