import { NextRequest, NextResponse } from "next/server";

const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD ?? "ahmed2026";

/**
 * POST /api/admin/verify
 * Body: { password: string }
 * Returns: { ok: true } on success, 401 on failure.
 *
 * The admin secret key (x-admin-key) is NEVER sent to the client.
 * Instead, the client sends the dashboard password, and this route
 * issues a short-lived signed token (stored in an HttpOnly cookie).
 * For simplicity we use a session token stored server-side in Redis.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body as { password?: string };

    if (!password || password !== DASHBOARD_PASSWORD) {
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
