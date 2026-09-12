import { Redis } from "@upstash/redis";

// Guard against missing env vars at module evaluation time.
// The Redis client is instantiated lazily on the server so that `next build`
// can run without throwing build-time errors when environment variables
// are not present yet in local or CI environments.
let _redisInstance: Redis | null = null;

export function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  if (!_redisInstance) {
    _redisInstance = new Redis({ url, token });
  }

  return _redisInstance;
}

export const WISHES_KEY = "wedding:wishes";
export const RSVP_KEY = "wedding:rsvp";

/** Helper used in every route to fail fast if Redis is unconfigured at runtime. */
export function requireRedis(): Redis {
  const client = getRedis();
  if (!client) {
    throw new Error(
      "Redis is not configured. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN."
    );
  }
  return client;
}
