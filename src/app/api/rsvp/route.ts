import { NextRequest, NextResponse } from "next/server";
import { requireRedis, RSVP_KEY } from "@/lib/redis";
import { isAdminRequest } from "@/lib/auth";

export interface RSVPEntry {
  id: string;
  name: string;
  attendance: "attending" | "not_attending";
  guestsCount: string;
  message: string;
  submittedAt: string;
}

const VALID_ATTENDANCE = new Set(["attending", "not_attending"]);
const VALID_GUESTS_COUNT = new Set(["0", "1", "2", "3"]);

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/rsvp  — admin only: return all RSVP entries
// ─────────────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = requireRedis();
    const raw = await db.get<RSVPEntry[]>(RSVP_KEY);
    return NextResponse.json(
      { entries: Array.isArray(raw) ? raw : [] },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  } catch (err) {
    console.error("[GET /api/rsvp]", err);
    const msg = (err as Error).message ?? "";
    const isConfigError = msg.includes("Upstash Redis is required");
    return NextResponse.json(
      { error: isConfigError ? msg : "Failed to load RSVP data" },
      { status: isConfigError ? 503 : 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/rsvp  — public: guest submits their RSVP
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const db = requireRedis();
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { name, attendance, guestsCount, message } = (body ?? {}) as Record<string, unknown>;

    // ── Input validation ───────────────────────────────────────────────────
    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (name.trim().length > 80) {
      return NextResponse.json({ error: "Name too long (max 80 chars)" }, { status: 400 });
    }
    const safeAttendance = VALID_ATTENDANCE.has(attendance as string)
      ? (attendance as "attending" | "not_attending")
      : "attending";
    const safeGuestsCount = VALID_GUESTS_COUNT.has(guestsCount as string)
      ? (guestsCount as string)
      : "0";
    const safeMessage =
      typeof message === "string" ? message.trim().slice(0, 500) : "";

    const entry: RSVPEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: name.trim(),
      attendance: safeAttendance,
      guestsCount: safeGuestsCount,
      message: safeMessage,
      submittedAt: new Date().toISOString(),
    };

    const raw = await db.get<RSVPEntry[]>(RSVP_KEY);
    const entries: RSVPEntry[] = Array.isArray(raw) ? raw : [];

    // Upsert: update existing entry by name (case-insensitive) or push new
    const existingIdx = entries.findIndex(
      (e) => e.name.toLowerCase() === entry.name.toLowerCase()
    );
    if (existingIdx >= 0) {
      entries[existingIdx] = entry;
    } else {
      entries.push(entry);
    }

    await db.set(RSVP_KEY, entries);
    return NextResponse.json(
      { entry },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[POST /api/rsvp]", err);
    const msg = (err as Error).message ?? "";
    const isConfigError = msg.includes("Upstash Redis is required");
    return NextResponse.json(
      { error: isConfigError ? msg : "Failed to save RSVP" },
      { status: isConfigError ? 503 : 500 }
    );
  }
}
