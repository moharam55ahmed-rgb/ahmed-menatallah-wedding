import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

export interface DataStorage {
  get<T = unknown>(key: string): Promise<T | null>;
  set(key: string, value: unknown): Promise<unknown>;
}

// Upstash Redis client cache
let _redisInstance: Redis | null = null;

export function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Guard against placeholder values or missing configuration
  if (!url || !token || url.includes("YOUR_DB_NAME") || url.includes("change_me")) {
    return null;
  }

  if (!_redisInstance) {
    _redisInstance = new Redis({ url, token });
  }

  return _redisInstance;
}

export const WISHES_KEY = "wedding:wishes";
export const RSVP_KEY = "wedding:rsvp";

// ── Server-side Persistent Storage Fallback ───────────────────────────────────
// Used when Upstash Redis is not yet provisioned in environment variables.
// Ensures that GET /api/wishes and POST /api/wishes ALWAYS work as a global
// source of truth across all devices and browsers without relying on localStorage.
const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(DATA_DIR, "global-store.json");

let memoryStore: Record<string, unknown> | null = null;

function loadStoreFromFile(): Record<string, unknown> {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("[Storage] Failed to read store file:", e);
  }
  return {};
}

function saveStoreToFile(store: Record<string, unknown>) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.error("[Storage] Failed to write store file:", e);
  }
}

class ServerStorageAdapter implements DataStorage {
  async get<T = unknown>(key: string): Promise<T | null> {
    if (!memoryStore) {
      memoryStore = loadStoreFromFile();
    }
    if (!(key in memoryStore)) {
      // Warm initial heartfelt seed wishes for Ahmed & Menatallah
      if (key === WISHES_KEY) {
        const seedWishes = [
          {
            id: "seed-1",
            name: "عائلة العريس",
            message: "ألف مبروك لأجمل عريسين، بارك الله لكما وبارك عليكما وجمع بينكما في خير وسعادة دائمة.",
            timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
            isHidden: false,
            recipient: "both",
          },
          {
            id: "seed-2",
            name: "سارة وخالد",
            message: "منة الله القمر وأحمد الغالي، فرحتنا بيكم ما تتوصفش! ربنا يسعدكم ويهنيكم بكل لحظة.",
            timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
            isHidden: false,
            recipient: "both",
          },
          {
            id: "seed-3",
            name: "أصدقاء أحمد",
            message: "مبروك يا عريسنا، ليلة العمر تكتمل بفرحتنا بيك، نتمنى لك حياة مليئة بالحب والنجاح.",
            timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
            isHidden: false,
            recipient: "groom",
          },
        ];
        memoryStore[key] = seedWishes;
        saveStoreToFile(memoryStore);
        return seedWishes as unknown as T;
      }
      return null;
    }
    return (memoryStore[key] as T) ?? null;
  }

  async set(key: string, value: unknown): Promise<unknown> {
    if (!memoryStore) {
      memoryStore = loadStoreFromFile();
    }
    memoryStore[key] = value;
    saveStoreToFile(memoryStore);
    return "OK";
  }
}

const serverStorage = new ServerStorageAdapter();

// ── Helper to detect production / Vercel runtime ─────────────────────────────
export const isProduction =
  process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);

/**
 * Returns the authoritative persistent storage client.
 *
 * In Production (Vercel):
 * - Upstash Redis is STRICTLY REQUIRED as the single source of truth.
 * - Local filesystem fallback is NEVER used in production to prevent data loss
 *   across serverless lambdas or new deployments.
 * - Throws an explicit configuration error if Upstash credentials are missing.
 *
 * In Local Development:
 * - Uses Upstash Redis if configured; otherwise uses a local file store for offline dev.
 */
export function requireRedis(): DataStorage {
  const client = getRedis();
  if (client) {
    return client as unknown as DataStorage;
  }

  if (isProduction) {
    throw new Error(
      "Upstash Redis is required in Production. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in Vercel environment variables."
    );
  }

  return serverStorage;
}
