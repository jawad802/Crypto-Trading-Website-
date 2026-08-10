import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

async function getUserId(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;

    const decoded = await verifyToken(token);
    if (!decoded || typeof decoded.userId !== "string") return null;

    return decoded.userId;
}

// GET user's saved watchlist coin IDs
export async function GET() {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const watchlist = await prisma.watchlist.findMany({
        where: { userId },
        select: { coinId: true },
    });

    return NextResponse.json({ watchlist: watchlist.map((item) => item.coinId) });
}

// POST: Add or Remove coin from watchlist (Toggle)
export async function POST(req: Request) {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const coinId = body?.coinId;

    if (!coinId || typeof coinId !== "string") {
        return NextResponse.json({ error: "Valid Coin ID required" }, { status: 400 });
    }

    const existing = await prisma.watchlist.findUnique({
        where: {
            userId_coinId: {
                userId: userId,
                coinId: coinId,
            },
        },
    });

    if (existing) {
        await prisma.watchlist.delete({ where: { id: existing.id } });
        return NextResponse.json({ saved: false, message: "Removed from watchlist" });
    } else {
        await prisma.watchlist.create({
            data: {
                userId: userId,
                coinId: coinId,
            },
        });
        return NextResponse.json({ saved: true, message: "Added to watchlist" });
    }
}