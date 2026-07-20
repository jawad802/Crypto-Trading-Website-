"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 w-full mt-5">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="flex items-center space-x-2 bg-[#1E2833] hover:bg-[#2B3139] disabled:opacity-40 disabled:hover:bg-[#1E2329] text-gray-100 text-sm font-medium px-4 py-2.5 rounded-xl border border-gray-100 transition w-full sm:w-auto justify-center"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      {/* Numerical Indicators */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(1)}
          className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition ${currentPage === 1 ? "bg-[#64DF36] text-black" : "text-gray-400 hover:text-white"
            }`}
        >
          1
        </button>
        <button
          onClick={() => onPageChange(2)}
          className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition ${currentPage === 2 ? "bg-[#64DF36] text-black" : "text-gray-400 hover:text-white"
            }`}
        >
          2
        </button>
        <span className="text-gray-600 px-1 text-sm font-bold">...</span>
        <button
          onClick={() => onPageChange(8)}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold text-gray-400 hover:text-white transition"
        >
          8
        </button>
        <button
          onClick={() => onPageChange(10)}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold text-gray-400 hover:text-white transition"
        >
          10
        </button>
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="flex items-center space-x-2 bg-[#1E2329] hover:bg-[#2B3139] disabled:opacity-40 disabled:hover:bg-[#1E2329] text-gray-200 text-sm font-medium px-4 py-2.5 rounded-xl border border-gray-800/80 transition w-full sm:w-auto justify-center"
      >
        <span>Next</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}