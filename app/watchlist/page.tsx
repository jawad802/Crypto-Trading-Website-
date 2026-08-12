"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, ArrowLeft } from "lucide-react";

interface WatchlistItem {
    coinId: string;
    coinSymbol: string;
    coinName: string;
}

interface CoinMarketData {
    id: string;
    image?: string;
    current_price?: number;
    price_change_percentage_24h?: number;
}

export default function WatchlistPage() {
    const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
    const [marketData, setMarketData] = useState<Record<string, CoinMarketData>>({});
    const [loading, setLoading] = useState(true);
    const [unauthorized, setUnauthorized] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                // 1. Fetch saved coins
                const res = await fetch("/api/watchlist");
                if (res.status === 401) {
                    setUnauthorized(true);
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                const items: WatchlistItem[] = data.watchlist || [];
                setWatchlist(items);

                // 2. Fetch live prices for saved coins
                if (items.length > 0) {
                    const coinsRes = await fetch("/api/coins");
                    if (coinsRes.ok) {
                        const coinsList: CoinMarketData[] = await coinsRes.json();
                        const dataMap: Record<string, CoinMarketData> = {};
                        coinsList.forEach((c) => {
                            dataMap[c.id] = c;
                        });
                        setMarketData(dataMap);
                    }
                }
            } catch (error) {
                console.error("Failed to load watchlist data", error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    const handleRemove = async (coinId: string) => {
        try {
            const res = await fetch("/api/watchlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ coinId, coinSymbol: "", coinName: "" }),
            });

            if (res.ok) {
                setWatchlist((prev) => prev.filter((item) => item.coinId !== coinId));
            }
        } catch (err) {
            console.error("Failed to remove coin", err);
        }
    };

    if (loading) {
        return <div className="max-w-6xl mx-auto px-6 py-12 text-slate-700">Loading your watchlist...</div>;
    }

    if (unauthorized) {
        return (
            <div className="max-w-md mx-auto my-20 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Access Restricted</h2>
                <p className="text-slate-500 mb-6 text-sm">Please sign in to view and manage your saved watchlist.</p>
                <Link
                    href="/login"
                    className="inline-block w-full py-2.5 bg-emerald-500 text-slate-950 font-semibold rounded-xl hover:bg-emerald-600 transition-colors"
                >
                    Sign In
                </Link>
            </div>
        );
    }

    return (
        
        <div className="max-w-6xl mx-auto px-6 py-13 ">
            <Link
                href="/"
                className="flex items-center gap-2 text-base font-semibold text-slate-600 hover:text-emerald-600 transition-colors"
            >
                <ArrowLeft className="w-6 h-6" /> Back to Dashboard
            </Link>
            <div className="flex items-center justify-between mb-8 gap-4">

                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Your Watchlist</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        {watchlist.length} {watchlist.length === 1 ? "asset" : "assets"} tracked
                    </p>
                </div>

            </div>

            {watchlist.length === 0 ? (
                <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <p className="text-slate-700 mb-4">Your watchlist is currently empty.</p>
                    <Link
                        href="/"
                        className="inline-block px-5 py-2.5 bg-[#EC5800] text-white font-bold rounded-xl hover:bg-[#E35335] transition-colors"
                    >
                        Explore Cryptos
                    </Link>
                </div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="divide-y divide-slate-100">
                        {watchlist.map((item) => {
                            const liveData = marketData[item.coinId];
                            const price = liveData?.current_price;
                            const change = liveData?.price_change_percentage_24h;
                            const isPositive = change !== undefined ? change >= 0 : true;

                            return (
                                <div
                                    key={item.coinId}
                                    className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        {liveData?.image ? (
                                            <img src={liveData.image} alt={item.coinName} className="w-10 h-10 rounded-full" />
                                        ) : (
                                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
                                                {item.coinSymbol.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <div>
                                            <Link href={`/coin/${item.coinId}`} className="font-bold text-lg text-slate-900 hover:text-emerald-600">
                                                {item.coinName}
                                            </Link>
                                            <p className="text-base text-slate-400 uppercase font-medium">{item.coinSymbol}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <p className="font-mono font-bold text-slate-900">
                                                {price ? `$${price.toLocaleString()}` : "---"}
                                            </p>
                                            {change !== undefined && (
                                                <p className={`text-xs font-semibold ${isPositive ? "text-emerald-600" : "text-rose-500"}`}>
                                                    {isPositive ? "+" : ""}
                                                    {change.toFixed(2)}%
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleRemove(item.coinId)}
                                            className="p-2 text-slate-400 cursor-pointer hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                            title="Remove from watchlist"
                                        >
                                            <Trash2 className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}