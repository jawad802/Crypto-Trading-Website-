import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    // 1. If user IS logged in and tries to access /login or /register -> Redirect to Home
    if (token && (pathname === "/login" || pathname === "/register")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // 2. If user is NOT logged in and tries to access protected pages (like /watchlist or /tokens)
    const isProtectedPath = pathname.startsWith("/watchlist");
    if (!token && isProtectedPath) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/register", "/watchlist/:path*"],
};