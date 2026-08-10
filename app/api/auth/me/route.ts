import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        const secret = process.env.JWT_SECRET || "your-fallback-secret-key";

        // Verify token
        const decoded = jwt.verify(token, secret) as { userId: string };

        // Find user in DB
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, name: true, email: true },
        });

        if (!user) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Auth verification error in /api/auth/me:", error);
        return NextResponse.json({ user: null }, { status: 200 });
    }
}