import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/bcrypt";
import { signToken } from "@/lib/jwt";
export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Fetch the complete user object (including password)
        const user = await prisma.user.findUnique({
            where: { email },
        }) as { id: string; email: string; password: string; name?: string | null } | null;

        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const token = await signToken({ userId: user.id, email: user.email });

        const response = NextResponse.json({
            user: { id: user.id, email: user.email, name: user.name },
            message: "Logged in successfully",
        });

        // Save token in secure HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}