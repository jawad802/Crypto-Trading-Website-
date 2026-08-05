"use client";

import { useState, useEffect } from "react";
import TokenRow from "@/components/tokens/TokenRow";
import Pagination from "@/components/tokens/Pagination";

export default function TokenTable() {
    const [coins, setCoins] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const perPage = 10;

    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            setLoading(true);
            setErrorMsg("");

            try {
                // Option A: Use your internal proxy route `/api/tokens?page=${page}` if built
                // Option B: Direct fetch from CoinGecko
                const res = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`
                );

                if (!res.ok) {
                    if (res.status === 429) {
                        throw new Error("Rate limit exceeded! Please wait a few seconds before clicking next.");
                    }
                    throw new Error("Failed to fetch token markets.");
                }

                const data = await res.json();
                if (isMounted) setCoins(data);
            } catch (err: any) {
                if (isMounted) setErrorMsg(err.message || "An error occurred");
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [page]);

    return (
        <div className="min-h-screen bg-[#0d0f12] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">All Tokens</h1>

                <div className="bg-[#16191e] rounded-xl overflow-hidden border border-gray-800 shadow-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800 text-xs text-gray-400 uppercase tracking-wider">
                                <th className="py-4 px-6">Token</th>
                                <th className="py-4 px-6">Price</th>
                                <th className="py-4 px-6">24h Change</th>
                                <th className="py-4 px-6">Market Cap</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-gray-400">
                                        Loading tokens...
                                    </td>
                                </tr>
                            ) : errorMsg ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-amber-400 font-medium">
                                        {errorMsg}
                                    </td>
                                </tr>
                            ) : (
                                coins.map((coin) => <TokenRow key={coin.id} coin={coin} />)
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PASS LOADING STATE TO PAGINATION */}
                <Pagination page={page} setPage={setPage} loading={loading} />
            </div>
        </div>
    );
}