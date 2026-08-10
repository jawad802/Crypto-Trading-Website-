"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface AssetData {
  name: string;
  symbol: string;
  price: string;
  change24h: number;
  iconBg: string;
  iconSymbol: string;
  isSelected?: boolean; // Matches the active dark blue background row accentuation in Figma
}

interface SearchResultProps {
  asset: AssetData;
}


export default function SearchResult({ asset }: SearchResultProps) {
  const isPositive = asset.change24h >= 0;

  return (
    <div
      className={`flex items-center justify-between px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-150 ${asset.isSelected
        ? "bg-slate-100 border border-slate-300"
        : "hover:bg-slate-50"
        }`}
    >
      {/* Left Column: Icon + Identifiers */}
      <div className="flex items-center space-x-3.5">
        <div className={`w-9 h-9 ${asset.iconBg} rounded-full flex items-center justify-center font-bold text-base text-slate-900 flex-shrink-0 shadow-sm`}>
          {asset.iconSymbol}
        </div>
        <span className="text-sm font-semibold text-slate-900">
          {asset.name} <span className="text-slate-500 font-medium text-xs ml-0.5">({asset.symbol})</span>
        </span>
      </div>

      {/* Right Column: Price Valuation & 24h Metrics */}
      <div className="flex items-center space-x-6 text-right">
        <span className="text-sm font-bold text-slate-900 font-mono">{asset.price}</span>
        <div
          className={`flex items-center space-x-0.5 text-xs font-bold w-[72px] justify-end ${isPositive ? "text-[#10B981]" : "text-[#F14D4D]"
            }`}
        >
          {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          <span>{Math.abs(asset.change24h)}%</span>
        </div>
      </div>
    </div>
  );
}