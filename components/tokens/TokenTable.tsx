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
                // Fetch from internal Next.js backend proxy route with server-side caching
                const res = await fetch(`/api/coins?page=${page}&perPage=${perPage}`);

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Failed to fetch token markets.");
                }

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
        <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">All Tokens</h1>

                <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
                                <th className="py-4 px-6">Token</th>
                                <th className="py-4 px-6">Price</th>
                                <th className="py-4 px-6">24h Change</th>
                                <th className="py-4 px-6">Market Cap</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-slate-500">
                                        Loading tokens...
                                    </td>
                                </tr>
                            ) : errorMsg ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-amber-500 font-medium">
                                        {errorMsg}
                                    </td>
                                </tr>
                            ) : (
                                coins.map((coin) => <TokenRow key={coin.id} coin={coin} />)
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination page={page} setPage={setPage} loading={loading} />
            </div>
        </div>
    );
}