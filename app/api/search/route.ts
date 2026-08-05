import { NextResponse } from "next/server";
import { searchCoins } from "@/lib/coingecko";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q") || "";

        if (!query.trim()) {
            return NextResponse.json({ coins: [] });
        }

        const results = await searchCoins(query);
        const coins = Array.isArray(results) ? results : results?.coins || [];

        return NextResponse.json({ coins });
    } catch (error) {
        console.error("Search API route error:", error);
        return NextResponse.json(
            { error: "Failed to search coins", coins: [] },
            { status: 500 }
        );
    }
}