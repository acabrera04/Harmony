import { Request, Response, NextFunction } from 'express';
import { cacheService, CacheOptions } from '../services/cache.service';

export interface CacheMiddlewareOptions extends CacheOptions {
  keyFn: (req: Request) => string;
}

/**
 * Express middleware that caches JSON responses for public API endpoints.
 * Uses stale-while-revalidate: serves stale data immediately while
 * refreshing in the background.
 */
export function cacheMiddleware(options: CacheMiddlewareOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = options.keyFn(req);

    try {
      const entry = await cacheService.get(key);

      if (entry) {
        const isStale = cacheService.isStale(entry, options.ttl);
        res.set('X-Cache', isStale ? 'STALE' : 'HIT');
        res.set('X-Cache-Key', key);
        return res.json(entry.data);
      }
    } catch {
      // Redis error — fall through to origin
    }

    // Cache miss — intercept res.json to cache the response
    res.set('X-Cache', 'MISS');
    res.set('X-Cache-Key', key);

    const originalJson = res.json.bind(res);
    res.json = (body: unknown) => {
      // Only cache successful responses
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cacheService.set(key, body, options).catch(() => {});
      }
      return originalJson(body);
    };

    next();
  };
}
