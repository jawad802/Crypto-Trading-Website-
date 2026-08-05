// app/api/coins/[id]/chart/route.ts
import { NextResponse } from "next/server";
import { getCoinChartData } from "@/lib/coingecko";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const days = searchParams.get("days") || "1";

    const chartData = await getCoinChartData(id, Number(days));

    if (!chartData) {
      return NextResponse.json(
        { error: "Failed to load chart data" },
        { status: 404 }
      );
    }

    return NextResponse.json(chartData);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error fetching chart data" },
      { status: 500 }
    );
  }
}