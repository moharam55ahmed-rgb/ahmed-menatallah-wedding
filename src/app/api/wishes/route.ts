import { NextRequest, NextResponse } from "next/server";
import { requireRedis, WISHES_KEY } from "@/lib/redis";
import { isAdminRequest } from "@/lib/auth";
import { GuestWish, containsProfanity } from "@/config/wedding";

const VALID_RECIPIENTS = new Set(["groom", "bride", "both"]);

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/wishes
// Public: returns only visible wishes.
// Admin (cookie or x-admin-key header): returns all wishes.
// ─────────────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const db = requireRedis();
    const admin = isAdminRequest(req);
    const raw = await db.get<GuestWish[]>(WISHES_KEY);
    const wishes: GuestWish[] = Array.isArray(raw) ? raw : [];
    const result = admin ? wishes : wishes.filter((w) => !w.isHidden);
    return NextResponse.json(
      { wishes: result },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (err) {
    console.error("[GET /api/wishes]", err);
    const msg = (err as Error).message ?? "";
    const isConfigError = msg.includes("Upstash Redis is required");
    return NextResponse.json(
      { error: isConfigError ? msg : "Failed to load wishes" },
      { status: isConfigError ? 503 : 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/wishes
// Public: create a new wish.
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

    const { name, message, recipient, sticker } = (body ?? {}) as Record<string, unknown>;

    // ── Input validation ───────────────────────────────────────────────────
    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }
    if (name.trim().length > 60) {
      return NextResponse.json({ error: "Name too long (max 60 chars)" }, { status: 400 });
    }
    if (message.trim().length > 300) {
      return NextResponse.json({ error: "Message too long (max 300 chars)" }, { status: 400 });
    }
    const safeRecipient = VALID_RECIPIENTS.has(recipient as string)
      ? (recipient as "groom" | "bride" | "both")
      : "both";

    const safeSticker =
      typeof sticker === "string" && sticker.trim()
        ? sticker.trim().slice(0, 40)
        : undefined;

    if (containsProfanity(name.trim()) || containsProfanity(message.trim())) {
      return NextResponse.json(
        { error: "الرسالة تحتوي على ألفاظ غير لائقة" },
        { status: 422 }
      );
    }

    const newWish: GuestWish = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      isHidden: false,
      recipient: safeRecipient,
      ...(safeSticker ? { sticker: safeSticker } : {}),
    };

    // Atomic read-modify-write (single Redis instance — acceptable for this scale)
    const raw = await db.get<GuestWish[]>(WISHES_KEY);
    const wishes: GuestWish[] = Array.isArray(raw) ? raw : [];
    wishes.push(newWish);
    await db.set(WISHES_KEY, wishes);

    return NextResponse.json(
      { wish: newWish },
      {
        status: 201,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (err) {
    console.error("[POST /api/wishes]", err);
    const msg = (err as Error).message ?? "";
    const isConfigError = msg.includes("Upstash Redis is required");
    return NextResponse.json(
      { error: isConfigError ? msg : "Failed to save wish" },
      { status: isConfigError ? 503 : 500 }
    );
  }
}
