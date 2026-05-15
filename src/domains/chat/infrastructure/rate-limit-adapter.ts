interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

export function checkRateLimit(ip: string, maxRequests: number = 10): { allowed: boolean; resetAt: number } {
  const now = Date.now();
  const minute = Math.floor(now / 60000);
  const key = `ratelimit:${ip}:${minute}`;

  cleanup(now);

  const entry = store.get(key);

  if (!entry) {
    store.set(key, { count: 1, resetAt: (minute + 1) * 60000 });
    return { allowed: true, resetAt: (minute + 1) * 60000 };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return { allowed: true, resetAt: entry.resetAt };
}

function cleanup(now: number): void {
  const cutoff = now - 120000;
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < cutoff) {
      store.delete(key);
    }
  }
}
