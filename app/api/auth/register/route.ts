import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Regex patterns for validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        // 1. Check missing fields
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Name, email, and password are required." },
                { status: 400 }
            );
        }

        // 2. Validate email format
        if (!EMAIL_REGEX.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format. Must contain '@' and a domain (e.g. user@example.com)." },
                { status: 400 }
            );
        }

        // 3. Validate password strength
        if (!PASSWORD_REGEX.test(password)) {
            return NextResponse.json(
                {
                    error:
                        "Password must be at least 5 characters long and contain at least one uppercase letter, one number, and one special character (@$!%*?&).",
                },
                { status: 400 }
            );
        }

        // 4. Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists with this email." },
                { status: 400 }
            );
        }

        // 5. Hash password and save user
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // 6. Generate auth token
        const secret = process.env.JWT_SECRET || "fallback-secret-key";
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            secret,
            { expiresIn: "7d" }
        );

        const response = NextResponse.json(
            {
                user: { id: user.id, email: user.email, name: user.name },
                message: "Registered and logged in successfully",
            },
            { status: 201 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong during registration." },
            { status: 500 }
        );
    }
}