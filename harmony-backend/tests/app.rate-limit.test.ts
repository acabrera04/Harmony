/**
 * Verifies that the auth rate limiters in createApp() use the injected store,
 * not an implicit process-local MemoryStore. This is the key property that
 * makes rate limits shared across replicas: every limiter must delegate
 * counting to whatever store is passed in — if it doesn't call increment(),
 * it has its own internal state and won't share across processes.
 *
 * Issue #318 — Shared Rate Limiting + Proxy-Aware Networking
 */

import request from 'supertest';
import type { Store, IncrementResponse, ClientRateLimitInfo, Options } from 'express-rate-limit';
import { createApp } from '../src/app';

/**
 * Minimal mock store that records every increment() call. Returned hit counts
 * stay well below any configured max so the limiter always allows the request
 * through — we only care that increment() is delegated to this store.
 */
function createMockStore(): Store & { incrementCalls: string[] } {
  const incrementCalls: string[] = [];
  const store: Store & { incrementCalls: string[] } = {
    incrementCalls,
    init(_options: Options) {},
    async increment(key: string): Promise<IncrementResponse> {
      incrementCalls.push(key);
      return { totalHits: 1, resetTime: new Date(Date.now() + 15 * 60 * 1000) };
    },
    async decrement(_key: string): Promise<void> {},
    async resetKey(_key: string): Promise<void> {},
    async get(_key: string): Promise<ClientRateLimitInfo | undefined> {
      return { totalHits: 1, resetTime: new Date(Date.now() + 15 * 60 * 1000) };
    },
  };
  return store;
}

describe('auth rate limiters — store delegation (Issue #318)', () => {
  it('calls increment() on the injected store for POST /api/auth/login', async () => {
    const store = createMockStore();
    const app = createApp({ rateLimitStore: store });

    await request(app).post('/api/auth/login').send({});

    expect(store.incrementCalls.length).toBeGreaterThan(0);
  });

  it('calls increment() on the injected store for POST /api/auth/register', async () => {
    const store = createMockStore();
    const app = createApp({ rateLimitStore: store });

    await request(app).post('/api/auth/register').send({});

    expect(store.incrementCalls.length).toBeGreaterThan(0);
  });

  it('calls increment() on the injected store for POST /api/auth/refresh', async () => {
    const store = createMockStore();
    const app = createApp({ rateLimitStore: store });

    await request(app).post('/api/auth/refresh').send({});

    expect(store.incrementCalls.length).toBeGreaterThan(0);
  });

  it('uses the same store instance for all three auth limiters (shared counting)', async () => {
    const store = createMockStore();
    const app = createApp({ rateLimitStore: store });

    await request(app).post('/api/auth/login').send({});
    await request(app).post('/api/auth/register').send({});
    await request(app).post('/api/auth/refresh').send({});

    // All three routes delegated to the same store → 3 increment calls
    expect(store.incrementCalls.length).toBe(3);
  });
});
