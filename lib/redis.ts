import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL;

// Singleton Redis client
let redis: Redis | null = null;

export function getRedisClient(): Redis | null {
  if (!REDIS_URL) {
    console.warn("⚠️ REDIS_URL not configured, caching disabled");
    return null;
  }

  if (!redis) {
    redis = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        if (times > 3) return null;
        return Math.min(times * 100, 2000);
      },
    });

    redis.on("error", (err) => {
      console.error("❌ Redis connection error:", err.message);
    });

    redis.on("connect", () => {
      console.log("✅ Redis connected");
    });
  }

  return redis;
}

/**
 * Get cached data or fetch fresh data, storing result in Redis.
 * @param key - Cache key
 * @param fetchFn - Function to call on cache miss
 * @param ttlSeconds - Time to live in seconds (default: 1 hour)
 */
export async function getCachedData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlSeconds: number = 3600
): Promise<T> {
  const client = getRedisClient();

  if (client) {
    try {
      const cached = await client.get(key);
      if (cached) {
        console.log(`✅ Cache HIT for ${key}`);
        return JSON.parse(cached) as T;
      }
      console.log(`⏳ Cache MISS for ${key}, fetching...`);
    } catch (err) {
      console.error(`❌ Redis GET error for ${key}:`, err);
    }
  }

  // Cache miss or Redis unavailable, fetch fresh data
  const data = await fetchFn();

  if (client) {
    try {
      await client.set(key, JSON.stringify(data), "EX", ttlSeconds);
      console.log(`✅ Cached ${key} for ${ttlSeconds}s`);
    } catch (err) {
      console.error(`❌ Redis SET error for ${key}:`, err);
    }
  }

  return data;
}
