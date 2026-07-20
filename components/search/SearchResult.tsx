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
        ? "bg-[#1B233A] border border-blue-900/40"
        : "hover:bg-[#1E2329]/30"
        }`}
    >
      {/* Left Column: Icon + Identifiers */}
      <div className="flex items-center space-x-3.5">
        <div className={`w-9 h-9 ${asset.iconBg} rounded-full flex items-center justify-center font-bold text-base text-white flex-shrink-0 shadow-sm`}>
          {asset.iconSymbol}
        </div>
        <span className="text-sm font-semibold text-gray-100">
          {asset.name} <span className="text-gray-400 font-medium text-xs ml-0.5">({asset.symbol})</span>
        </span>
      </div>

      {/* Right Column: Price Valuation & 24h Metrics */}
      <div className="flex items-center space-x-6 text-right">
        <span className="text-sm font-bold text-white font-mono">{asset.price}</span>
        <div
          className={`flex items-center space-x-0.5 text-xs font-bold w-[72px] justify-end ${isPositive ? "text-[#39E11B]" : "text-[#F14D4D]"
            }`}
        >
          {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          <span>{Math.abs(asset.change24h)}%</span>
        </div>
      </div>
    </div>
  );
}