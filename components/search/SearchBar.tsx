"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Loader2, X } from "lucide-react";

interface SearchBarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function SearchBar({ isOpen = true, onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.coins || []);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/10 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl p-4 shadow-2xl relative">

        {/* Header / Input */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search crypto tokens, symbols..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-base"
            autoFocus
          />
          {loading && <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />}
          {onClose && (
            <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="mt-4 max-h-80 overflow-y-auto divide-y divide-slate-200/50">
          {results.length > 0 ? (
            results.slice(0, 10).map((coin) => (
              <Link
                key={coin.id}
                href={`/coin/${coin.id}`}
                onClick={onClose}
                className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all block"
              >
                <div className="flex items-center gap-3">
                  <img src={coin.thumb} alt={coin.name} className="w-7 h-7 rounded-full" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{coin.name}</h4>
                    <span className="text-xs text-slate-500 uppercase">{coin.symbol}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  {coin.market_cap_rank ? `#${coin.market_cap_rank}` : ""}
                </span>
              </Link>
            ))
          ) : query ? (
            <p className="text-center text-slate-500 text-sm py-6">No matching tokens found.</p>
          ) : (
            <p className="text-center text-slate-500 text-sm py-6">Type to start searching...</p>
          )}
        </div>

      </div>
    </div>
  );
}