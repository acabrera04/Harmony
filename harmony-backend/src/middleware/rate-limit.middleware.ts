import { Request, Response, NextFunction } from 'express';

/**
 * Verified crawler User-Agent substrings (lowercase) per §9.3 of the unified
 * backend architecture. Used to grant elevated rate limits (1000 req/min) to
 * known search engine bots.
 */
const VERIFIED_BOT_TOKENS: { token: string; name: string }[] = [
  { token: 'googlebot', name: 'googlebot' },
  { token: 'bingbot', name: 'bingbot' },
];

/**
 * Determines whether an incoming request is from a verified search engine bot
 * by performing a case-insensitive check against the known bot list.
 * Returns the normalized bot name if matched, or null otherwise.
 */
export function detectVerifiedBot(userAgent: string | undefined): string | null {
  if (!userAgent) return null;
  const lower = userAgent.toLowerCase();
  const match = VERIFIED_BOT_TOKENS.find((b) => lower.includes(b.token));
  return match?.name ?? null;
}

/** Backwards-compatible helper used in tests. */
export function isVerifiedBot(userAgent: string | undefined): boolean {
  return detectVerifiedBot(userAgent) !== null;
}

/**
 * Token bucket entry stored per IP (or bot identity).
 */
interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

/**
 * In-process token bucket store.
 * Maps IP (or bot name key) -> bucket state.
 */
const buckets = new Map<string, TokenBucket>();

const HUMAN_CAPACITY = 100;   // max tokens
const BOT_CAPACITY = 1000;    // max tokens
const WINDOW_MS = 60_000;     // 1 minute — full refill period
const MAX_BUCKETS = 100_000;  // cap to prevent memory exhaustion

/**
 * Returns the bucket for `key`, refilling tokens proportionally to elapsed
 * time (true token-bucket algorithm: tokens drip in continuously rather than
 * resetting at window boundaries).
 */
function getOrRefillBucket(key: string, capacity: number): TokenBucket {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing) {
    // Evict stale entries when the map is over capacity
    if (buckets.size >= MAX_BUCKETS) {
      evictStaleBuckets();
    }
    const bucket: TokenBucket = { tokens: capacity, lastRefill: now };
    buckets.set(key, bucket);
    return bucket;
  }

  const elapsed = now - existing.lastRefill;

  if (elapsed > 0) {
    // Gradual refill: tokens accrue proportionally to elapsed time
    const refillRate = capacity / WINDOW_MS; // tokens per ms
    const newTokens = Math.min(capacity, existing.tokens + elapsed * refillRate);
    existing.tokens = newTokens;
    existing.lastRefill = now;
  }

  return existing;
}

/**
 * Evict buckets that have been idle for longer than the refill window
 * (they would be at full capacity anyway).
 */
function evictStaleBuckets(): void {
  const cutoff = Date.now() - WINDOW_MS;
  for (const [key, bucket] of buckets) {
    if (bucket.lastRefill < cutoff) {
      buckets.delete(key);
    }
  }
}

/**
 * Consume one token from an existing bucket (caller must check tokens > 0 first).
 */
function consumeToken(bucket: TokenBucket): void {
  bucket.tokens -= 1;
}

/**
 * Compute seconds until one token becomes available again.
 */
function retryAfterSeconds(capacity: number): number {
  const msPerToken = WINDOW_MS / capacity;
  return Math.max(1, Math.ceil(msPerToken / 1000));
}

/**
 * Token-bucket rate limiting middleware for the public API.
 *
 * Uses a true token-bucket algorithm: tokens refill continuously at a rate of
 * `capacity / WINDOW_MS` tokens per millisecond, up to the maximum capacity.
 *
 * Limits:
 *   - Verified bots (Googlebot, Bingbot): 1000 req/min per bot name
 *   - Human users / other clients:         100 req/min per IP
 *
 * Responses:
 *   - 429 Too Many Requests + Retry-After header when limit is exceeded
 *   - RateLimit-Limit / RateLimit-Remaining / RateLimit-Reset on every response
 */
export function tokenBucketRateLimiter(req: Request, res: Response, next: NextFunction): void {
  const userAgent = req.headers['user-agent'];
  const botName = detectVerifiedBot(userAgent);

  // Bot key uses the normalized bot name (bounded set); human key uses IP
  const key = botName ? `bot:${botName}` : `ip:${req.ip ?? 'unknown'}`;
  const capacity = botName ? BOT_CAPACITY : HUMAN_CAPACITY;

  const bucket = getOrRefillBucket(key, capacity);

  // Set standard rate-limit response headers
  const resetAt = Math.ceil((bucket.lastRefill + WINDOW_MS) / 1000);
  res.set('RateLimit-Limit', String(capacity));
  res.set('RateLimit-Remaining', String(Math.max(0, Math.floor(bucket.tokens))));
  res.set('RateLimit-Reset', String(resetAt));

  if (bucket.tokens < 1) {
    const retryAfter = retryAfterSeconds(capacity);
    res.set('Retry-After', String(retryAfter));
    res.status(429).json({ error: 'Too many requests. Please try again later.' });
    return;
  }

  consumeToken(bucket);
  // Update Remaining header after consumption
  res.set('RateLimit-Remaining', String(Math.floor(bucket.tokens)));

  next();
}

/**
 * Clears the in-process bucket store.
 * Intended for use in tests only.
 */
export function _clearBucketsForTesting(): void {
  buckets.clear();
}
