// app/api/coins/[id]/route.ts
import { NextResponse } from "next/server";
import { getCoinDetails } from "@/lib/coingecko";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const coinData = await getCoinDetails(id);

        if (!coinData) {
            return NextResponse.json(
                { error: "Coin not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(coinData);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch coin details" },
            { status: 500 }
        );
    }
}