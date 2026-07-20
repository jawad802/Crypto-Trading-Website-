"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon } from "lucide-react";
import SearchResult, { AssetData } from "./SearchResult";

interface SearchBarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockTrendingAssets: AssetData[] = [
  { name: "Bitcoin", symbol: "BTC", price: "$7,598", change24h: -56.89, iconBg: "bg-[#F39C12]", iconSymbol: "₿", isSelected: true },
  { name: "Ethereum", symbol: "ETH", price: "$1,791", change24h: 76.89, iconBg: "bg-[#5C79E8]", iconSymbol: "Ξ" },
  { name: "Solana", symbol: "SOL", price: "$0.481", change24h: 67.89, iconBg: "bg-[#14F195]/20 border border-[#14F195]", iconSymbol: "S" },
  { name: "Avalanche", symbol: "AVAX", price: "$2,427", change24h: 24.89, iconBg: "bg-[#E84142]", iconSymbol: "A" },
  { name: "Cardano", symbol: "CAR", price: "$1,653", change24h: 67.89, iconBg: "bg-[#2A5298]", iconSymbol: "₳" },
];

export default function SearchBar({ isOpen, onClose }: SearchBarModalProps) {
  const [query, setQuery] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Close when pressing the escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredAssets = mockTrendingAssets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(query.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity">
      {/* Click outside to close overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container Matching Figma */}
      <div
        ref={modalRef}
        className="relative w-full max-w-xl bg-[#161A1E] border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col scale-100 transition-all duration-200"
      >
        {/* Search Input and Button Header Row */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              autoFocus
              placeholder="Search for a token by name or symbol"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-11 bg-transparent text-gray-200 placeholder-gray-500 text-[15px] outline-none border-b border-gray-800 focus:border-gray-600 transition font-sans"
            />
          </div>

          <button className="flex items-center space-x-1.5 bg-[#64DF36] hover:bg-[#57c42f] text-black font-bold text-sm px-4 h-10 rounded-xl transition-colors duration-150 shadow-md">
            <SearchIcon className="w-4 h-4 stroke-[2.5]" />
            <span>Search</span>
          </button>
        </div>

        {/* Results List Section */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 tracking-wider mb-4 uppercase">
            Trending assets
          </h4>

          <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1">
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset, idx) => (
                <SearchResult key={`${asset.symbol}-${idx}`} asset={asset} />
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-6">No assets match your search details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}