"use client";

import React from "react";

const mockOrderBook = {
  bids: [
    { price: "0.020371", amountBTC: "14:04:54", amountETH: "1.262415" },
    { price: "0.020371", amountBTC: "14:05:24", amountETH: "1.262424" },
    { price: "0.020371", amountBTC: "14:05:58", amountETH: "1.262420" },
  ],
  asks: [
    { price: "0.022572", amountBTC: "14:04:59", amountETH: "1.262404" },
    { price: "0.022572", amountBTC: "14:05:35", amountETH: "1.262404" },
  ]
};

export default function OrderBook() {
  return (
    <div className="bg-[#161A1E] border border-gray-800 rounded-2xl p-6">
      <h3 className="text-sm font-bold text-gray-200 tracking-wide mb-4">Order Book</h3>

      <div className="w-full">
        <div className="grid grid-cols-3 text-[11px] font-bold text-gray-500 tracking-wider uppercase pb-2 border-b border-gray-800">
          <span>Price (BTC)</span>
          <span className="text-center">Amount (BTC)</span>
          <span className="text-right">Amount (ETH)</span>
        </div>

        <div className="divide-y divide-gray-800/30 font-mono text-xs mt-1.5 space-y-0.5">
          {mockOrderBook.bids.map((bid, i) => (
            <div key={`bid-${i}`} className="grid grid-cols-3 py-2.5 bg-[#39E11B]/5 px-2 rounded-lg text-[#39E11B] font-bold">
              <span>{bid.price}</span>
              <span className="text-center text-gray-400 font-medium">{bid.amountBTC}</span>
              <span className="text-right text-gray-400 font-medium">{bid.amountETH}</span>
            </div>
          ))}

          {mockOrderBook.asks.map((ask, i) => (
            <div key={`ask-${i}`} className="grid grid-cols-3 py-2.5 bg-[#F14D4D]/5 px-2 rounded-lg text-[#F14D4D] font-bold">
              <span>{ask.price}</span>
              <span className="text-center text-gray-400 font-medium">{ask.amountBTC}</span>
              <span className="text-right text-gray-400 font-medium">{ask.amountETH}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}