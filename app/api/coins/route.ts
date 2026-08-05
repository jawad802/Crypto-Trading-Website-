// app/api/coins/route.ts
import { NextResponse } from "next/server";
import { getTopCoins } from "@/lib/coingecko";

export async function GET() {
    try {
        const coins = await getTopCoins(15); // Fetches top 10 coins by market cap
        return NextResponse.json(coins);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch crypto coins" },
            { status: 500 }
        );
    }
}