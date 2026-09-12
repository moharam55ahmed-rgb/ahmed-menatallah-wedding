import { NextRequest, NextResponse } from "next/server";
import { isProduction } from "@/lib/redis";

function getExpectedPassword(): string | null {
  const envPassword = process.env.DASHBOARD_PASSWORD;
  if (envPassword && envPassword.trim() && envPassword !== "change_me_before_deploying") {
    return envPassword.trim();
  }
  // In local development only, allow local testing fallback if unset
  if (!isProduction) {
    return "ahmed2026";
  }
  return null;
}

/**
 * POST /api/admin/verify
 * Body: { password: string }
 * Returns: { ok: true } on success, 401 on failure, 503 if unconfigured in production.
 *
 * The admin secret key (x-admin-key) is NEVER sent to the client.
 * The client provides the dashboard password, and upon validation, this route
 * issues a secure HttpOnly session cookie (`admin_session`).
 */
export async function POST(req: NextRequest) {
  try {
    const expectedPassword = getExpectedPassword();
    if (!expectedPassword) {
      return NextResponse.json(
        { error: "DASHBOARD_PASSWORD is not configured in production environment variables." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { password } = body as { password?: string };

    if (!password || password !== expectedPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Issue a simple session token
    const sessionToken = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

    const response = NextResponse.json({ ok: true });
    // HttpOnly cookie — not readable by JavaScript
    response.cookies.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

/**
 * DELETE /api/admin/verify — logout
 */
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("admin_session");
  return response;
}
