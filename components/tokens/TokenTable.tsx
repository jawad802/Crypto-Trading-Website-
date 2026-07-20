"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import TokenRow, { TokenData } from "./TokenRow";
import Pagination from "./Pagination";

const mockTokens: TokenData[] = [
  { name: "Bitcoin", symbol: "BTC", price: "$43,210.55", change24h: 2.14, marketCap: "$845.2B", iconBg: "bg-[#F39C12]", iconSymbol: "₿" },
  { name: "Ethereum", symbol: "ETH", price: "$2,310.78", change24h: 1.08, marketCap: "$277.4B", iconBg: "bg-[#5C79E8]", iconSymbol: "Ξ" },
  { name: "Solana", symbol: "SOL", price: "$97.62", change24h: 6.45, marketCap: "$42.8B", iconBg: "bg-[#14F195]/20 border border-[#14F195]", iconSymbol: "S" },
  { name: "Chainlink", symbol: "LINK", price: "$14.32", change24h: -3.21, marketCap: "$8.01B", iconBg: "bg-[#2A5298]", iconSymbol: "⬡" },
  { name: "Dogecoin", symbol: "DOGE", price: "$0.1082", change24h: 0.92, marketCap: "$15.6B", iconBg: "bg-[#BA9F32]", iconSymbol: "Ð" },
  { name: "Avalanche", symbol: "AVAX", price: "$32.79", change24h: 4.77, marketCap: "$12.6B", iconBg: "bg-[#E84142]", iconSymbol: "A" },
];

export default function TokenTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter token elements based on the search state query
  const filteredTokens = mockTokens.filter((token) =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 selection:bg-emerald-500/20 text-white">

      {/* Search Header Action Container Box */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-100">All Tokens</h2>

        {/* Pixel-Perfect Input Field Box Wrapper */}
        <div className="relative w-full sm:w-[320px]">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search for tokens"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-[#161A1E] text-gray-200 text-sm pl-11 pr-4 rounded-xl outline-none border border-gray-800/80 focus:border-gray-700 transition"
          />
        </div>
      </div>

      {/* Main Table Layer surface container */}
      <div className="w-full bg-[#161A1E] rounded-2xl border border-gray-900/80 overflow-hidden shadow-xl">
        <table className="w-full border-collapse text-left hidden md:table">
          <thead>
            <tr className="border-b border-gray-800/80 bg-[#1E2329]/10">
              <th className="py-4 px-6 text-xs font-semibold text-[#848E9C] tracking-wider uppercase">Token</th>
              <th className="py-4 px-6 text-xs font-semibold text-[#848E9C] tracking-wider uppercase">Price</th>
              <th className="py-4 px-4 text-xs font-semibold text-[#848E9C] tracking-wider uppercase">24h Change</th>
              <th className="py-4 px-6 text-xs font-semibold text-[#848E9C] tracking-wider uppercase">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredTokens.map((token, i) => (
              <TokenRow key={`${token.symbol}-${i}`} token={token} />
            ))}
          </tbody>
        </table>

        {/* Mobile fallback layout rendering outside the table structure */}
        <div className="md:hidden divide-y divide-gray-800/50">
          {filteredTokens.map((token, i) => (
            <TokenRow key={`mobile-${token.symbol}-${i}`} token={token} isMobile />
          ))}
        </div>
      </div>

      {/* Embedded Navigation Bar Element */}
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}