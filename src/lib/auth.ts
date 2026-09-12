import { NextRequest } from "next/server";

/**
 * Checks whether the incoming request is from an authenticated admin.
 *
 * Two mechanisms are supported:
 * 1. HttpOnly cookie `admin_session` — set by /api/admin/verify (browser dashboard)
 * 2. `x-admin-key` header — for direct API testing / CI (value must match
 *    the ADMIN_SECRET_KEY env var, which is NEVER exposed to the client)
 *
 * Never put ADMIN_SECRET_KEY in a NEXT_PUBLIC_ variable.
 */
export function isAdminRequest(req: NextRequest): boolean {
  // Check header (for API / server-to-server use)
  const headerKey = req.headers.get("x-admin-key");
  const secretKey = process.env.ADMIN_SECRET_KEY;
  if (secretKey && headerKey === secretKey) return true;

  // Check HttpOnly cookie (for browser dashboard)
  const sessionCookie = req.cookies.get("admin_session");
  if (sessionCookie?.value?.startsWith("sess_")) return true;

  return false;
}
