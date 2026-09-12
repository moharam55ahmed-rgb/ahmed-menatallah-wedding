import { NextRequest, NextResponse } from "next/server";
import { requireRedis, WISHES_KEY } from "@/lib/redis";
import { isAdminRequest } from "@/lib/auth";
import { GuestWish } from "@/config/wedding";

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/wishes/[id]  — toggle isHidden  (admin only)
// ─────────────────────────────────────────────────────────────────────────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = requireRedis();
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const raw = await db.get<GuestWish[]>(WISHES_KEY);
    const wishes: GuestWish[] = Array.isArray(raw) ? raw : [];
    const wish = wishes.find((w) => w.id === id);
    if (!wish) {
      return NextResponse.json({ error: "Wish not found" }, { status: 404 });
    }

    wish.isHidden = !wish.isHidden;
    await db.set(WISHES_KEY, wishes);
    return NextResponse.json({ wish });
  } catch (err) {
    console.error("[PATCH /api/wishes/:id]", err);
    const status = (err as Error).message?.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: "Failed to update wish" }, { status });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/wishes/[id]  — permanently remove a wish  (admin only)
// ─────────────────────────────────────────────────────────────────────────────
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = requireRedis();
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const raw = await db.get<GuestWish[]>(WISHES_KEY);
    const wishes: GuestWish[] = Array.isArray(raw) ? raw : [];
    const updated = wishes.filter((w) => w.id !== id);

    if (updated.length === wishes.length) {
      return NextResponse.json({ error: "Wish not found" }, { status: 404 });
    }

    await db.set(WISHES_KEY, updated);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/wishes/:id]", err);
    const status = (err as Error).message?.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: "Failed to delete wish" }, { status });
  }
}
