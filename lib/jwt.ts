import { SignJWT, jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(
    process.env.JWT_SECRET || "default_fallback_secret_key"
);

export async function signToken(payload: Record<string, any>) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(secretKey);
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secretKey);
        return payload;
    } catch (error) {
        return null;
    }
}