import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

async function getUserId(req: NextRequest): Promise<string | null> {
    const token = req.cookies.get("token")?.value;
    if (!token) return null;

    try {
        const secret = process.env.JWT_SECRET || "fallback-secret-key";
        const decoded = jwt.verify(token, secret) as { userId: string };
        return decoded.userId;
    } catch {
        return null;
    }
}

// GET user's saved watchlist coin IDs
export async function GET(req: NextRequest) {
    const userId = await getUserId(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const watchlist = await prisma.watchlist.findMany({
        where: { userId },
        select: { coinId: true, coinSymbol: true, coinName: true },
    });

    return NextResponse.json({ watchlist });
}

// POST: Add or Remove coin from watchlist (Toggle)
export async function POST(req: NextRequest) {
    const userId = await getUserId(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { coinId, coinSymbol, coinName } = body;

    if (!coinId || typeof coinId !== "string") {
        return NextResponse.json({ error: "Invalid coinId" }, { status: 400 });
    }

    // Check if coin is already in watchlist
    const existingItem = await prisma.watchlist.findUnique({
        where: {
            userId_coinId: { userId, coinId },
        },
    });

    if (existingItem) {
        // If exists -> Remove it
        await prisma.watchlist.delete({
            where: { id: existingItem.id },
        });
        return NextResponse.json({ message: "Removed from watchlist", added: false });
    } else {
        // If doesn't exist -> Add it
        await prisma.watchlist.create({
            data: {
                userId,
                coinId,
                coinSymbol: coinSymbol || coinId.toUpperCase(),
                coinName: coinName || coinId,
            },
        });
        return NextResponse.json({ message: "Added to watchlist", added: true });
    }
}