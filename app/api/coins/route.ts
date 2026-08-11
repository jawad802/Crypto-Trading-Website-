import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = searchParams.get("page") || "1";
        const perPage = searchParams.get("perPage") || "10";

        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`;

        const res = await fetch(url, {
            next: { revalidate: 60 },
        });

        if (res.status === 429) {
            return NextResponse.json(
                { error: "Rate limit exceeded. Please wait a moment." },
                { status: 429 }
            );
        }

        if (!res.ok) {
            throw new Error(`CoinGecko error: ${res.statusText}`);
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch crypto coins" },
            { status: 500 }
        );
    }
}