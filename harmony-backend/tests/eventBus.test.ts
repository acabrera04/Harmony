/**
 * EventBus and CacheInvalidator tests — Issue #111
 *
 * Tests:
 *   - EventBus: typed publish/subscribe round-trip for VISIBILITY_CHANGED
 *     and MESSAGE_* events.
 *   - CacheInvalidator: verifies the correct cache keys are invalidated
 *     when events are received.
 *
 * Requires REDIS_URL pointing at a running Redis instance.
 */

import { eventBus, EventChannels } from '../src/events/eventBus';
import { VisibilityChangedPayload } from '../src/events/eventTypes';
import { cacheInvalidator } from '../src/services/cacheInvalidator.service';
import { cacheService } from '../src/services/cache.service';
import { redis } from '../src/db/redis';

const TEST_CHANNEL_ID = '550e8400-e29b-41d4-a716-446655440001';
const TEST_SERVER_ID = '550e8400-e29b-41d4-a716-446655440002';
const TEST_ACTOR_ID = '550e8400-e29b-41d4-a716-446655440003';
const TEST_MESSAGE_ID = '550e8400-e29b-41d4-a716-446655440004';

/**
 * Polls until `condition()` returns true or `timeout` ms elapses.
 * Resolves immediately once the condition is met, making tests both
 * faster and more resilient to Redis latency than a fixed sleep.
 */
function waitFor(condition: () => boolean, timeout = 2000): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (condition()) return resolve();
      if (Date.now() - start > timeout) return reject(new Error('Timed out waiting for condition'));
      setTimeout(check, 10);
    };
    check();
  });
}

beforeAll(async () => {
  try {
    await redis.connect().catch(() => {});
    await redis.ping();
  } catch (err) {
    const redisUrl = process.env.REDIS_URL ?? '<not set>';
    throw new Error(
      `Failed to connect to Redis for tests. Ensure a Redis instance is running and REDIS_URL is correctly set (current value: ${redisUrl}). ` +
        `Original error: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
});

afterAll(async () => {
  await cacheInvalidator.stop();
  await redis.quit();
});

// ─── EventBus: publish / subscribe ───────────────────────────────────────────

describe('EventBus.publish / subscribe', () => {
  afterEach(async () => {
    // Disconnect subscriber so each test group starts clean
    await eventBus.disconnect();
  });

  it('delivers VISIBILITY_CHANGED payload to subscriber', async () => {
    const received: unknown[] = [];
    const { unsubscribe, ready } = eventBus.subscribe(EventChannels.VISIBILITY_CHANGED, (payload) => {
      received.push(payload);
    });
    await ready;

    const payload: VisibilityChangedPayload = {
      channelId: TEST_CHANNEL_ID,
      serverId: TEST_SERVER_ID,
      oldVisibility: 'PRIVATE',
      newVisibility: 'PUBLIC_INDEXABLE',
      actorId: TEST_ACTOR_ID,
      timestamp: new Date().toISOString(),
    };

    await eventBus.publish(EventChannels.VISIBILITY_CHANGED, payload);
    await waitFor(() => received.length === 1);

    expect(received).toHaveLength(1);
    expect(received[0]).toEqual(payload);

    unsubscribe();
  });

  it('delivers MESSAGE_CREATED payload to subscriber', async () => {
    const received: unknown[] = [];
    const { unsubscribe, ready } = eventBus.subscribe(EventChannels.MESSAGE_CREATED, (payload) => {
      received.push(payload);
    });
    await ready;

    const payload = {
      messageId: TEST_MESSAGE_ID,
      channelId: TEST_CHANNEL_ID,
      authorId: TEST_ACTOR_ID,
      timestamp: new Date().toISOString(),
    };

    await eventBus.publish(EventChannels.MESSAGE_CREATED, payload);
    await waitFor(() => received.length === 1);

    expect(received).toHaveLength(1);
    expect(received[0]).toEqual(payload);

    unsubscribe();
  });

  it('delivers MESSAGE_EDITED payload to subscriber', async () => {
    const received: unknown[] = [];
    const { unsubscribe, ready } = eventBus.subscribe(EventChannels.MESSAGE_EDITED, (payload) => {
      received.push(payload);
    });
    await ready;

    const payload = {
      messageId: TEST_MESSAGE_ID,
      channelId: TEST_CHANNEL_ID,
      timestamp: new Date().toISOString(),
    };

    await eventBus.publish(EventChannels.MESSAGE_EDITED, payload);
    await waitFor(() => received.length === 1);

    expect(received).toHaveLength(1);
    expect(received[0]).toEqual(payload);

    unsubscribe();
  });

  it('delivers MESSAGE_DELETED payload to subscriber', async () => {
    const received: unknown[] = [];
    const { unsubscribe, ready } = eventBus.subscribe(EventChannels.MESSAGE_DELETED, (payload) => {
      received.push(payload);
    });
    await ready;

    const payload = {
      messageId: TEST_MESSAGE_ID,
      channelId: TEST_CHANNEL_ID,
      timestamp: new Date().toISOString(),
    };

    await eventBus.publish(EventChannels.MESSAGE_DELETED, payload);
    await waitFor(() => received.length === 1);

    expect(received).toHaveLength(1);
    expect(received[0]).toEqual(payload);

    unsubscribe();
  });

  it('unsubscribe stops handler from receiving further messages', async () => {
    const received: unknown[] = [];
    const { unsubscribe, ready } = eventBus.subscribe(EventChannels.VISIBILITY_CHANGED, (payload) => {
      received.push(payload);
    });
    await ready;
    unsubscribe(); // unsubscribe before publishing

    await eventBus.publish(EventChannels.VISIBILITY_CHANGED, {
      channelId: TEST_CHANNEL_ID,
      serverId: TEST_SERVER_ID,
      oldVisibility: 'PRIVATE' as const,
      newVisibility: 'PUBLIC_NO_INDEX' as const,
      actorId: TEST_ACTOR_ID,
      timestamp: new Date().toISOString(),
    });
    // Fixed wait: no positive condition to poll for a "nothing arrived" assertion
    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(received).toHaveLength(0);
  });
});

// ─── CacheInvalidator: event-driven cache invalidation ───────────────────────

describe('CacheInvalidator', () => {
  let invalidateSpy: jest.SpyInstance;
  let invalidatePatternSpy: jest.SpyInstance;

  beforeAll(async () => {
    invalidateSpy = jest.spyOn(cacheService, 'invalidate').mockResolvedValue();
    invalidatePatternSpy = jest.spyOn(cacheService, 'invalidatePattern').mockResolvedValue();
    // start() now awaits all Redis subscribe handshakes — no fixed sleep needed
    await cacheInvalidator.start();
  });

  afterAll(async () => {
    invalidateSpy.mockRestore();
    invalidatePatternSpy.mockRestore();
    await cacheInvalidator.stop();
  });

  afterEach(() => {
    invalidateSpy.mockClear();
    invalidatePatternSpy.mockClear();
  });

  it('VISIBILITY_CHANGED invalidates all required cache keys in one publish', async () => {
    await eventBus.publish(EventChannels.VISIBILITY_CHANGED, {
      channelId: TEST_CHANNEL_ID,
      serverId: TEST_SERVER_ID,
      oldVisibility: 'PRIVATE' as const,
      newVisibility: 'PUBLIC_INDEXABLE' as const,
      actorId: TEST_ACTOR_ID,
      timestamp: new Date().toISOString(),
    });
    // VISIBILITY_CHANGED triggers 3 invalidations; wait for all of them
    await waitFor(() => invalidateSpy.mock.calls.length >= 3);

    expect(invalidateSpy).toHaveBeenCalledWith(`channel:${TEST_CHANNEL_ID}:visibility`);
    expect(invalidateSpy).toHaveBeenCalledWith(`server:${TEST_SERVER_ID}:public_channels`);
    expect(invalidateSpy).toHaveBeenCalledWith(`meta:channel:${TEST_CHANNEL_ID}`);
  });

  it('MESSAGE_CREATED invalidates messages, analysis, and meta cache keys', async () => {
    await eventBus.publish(EventChannels.MESSAGE_CREATED, {
      messageId: TEST_MESSAGE_ID,
      channelId: TEST_CHANNEL_ID,
      authorId: TEST_ACTOR_ID,
      timestamp: new Date().toISOString(),
    });
    await waitFor(() => invalidatePatternSpy.mock.calls.length >= 1 && invalidateSpy.mock.calls.length >= 2);

    expect(invalidatePatternSpy).toHaveBeenCalledWith(`channel:msgs:${TEST_CHANNEL_ID}:*`);
    expect(invalidateSpy).toHaveBeenCalledWith(`analysis:channel:${TEST_CHANNEL_ID}`);
    expect(invalidateSpy).toHaveBeenCalledWith(`meta:channel:${TEST_CHANNEL_ID}`);
  });

  it('MESSAGE_EDITED invalidates messages, analysis, and meta cache keys', async () => {
    await eventBus.publish(EventChannels.MESSAGE_EDITED, {
      messageId: TEST_MESSAGE_ID,
      channelId: TEST_CHANNEL_ID,
      timestamp: new Date().toISOString(),
    });
    await waitFor(() => invalidatePatternSpy.mock.calls.length >= 1 && invalidateSpy.mock.calls.length >= 2);

    expect(invalidatePatternSpy).toHaveBeenCalledWith(`channel:msgs:${TEST_CHANNEL_ID}:*`);
    expect(invalidateSpy).toHaveBeenCalledWith(`analysis:channel:${TEST_CHANNEL_ID}`);
    expect(invalidateSpy).toHaveBeenCalledWith(`meta:channel:${TEST_CHANNEL_ID}`);
  });

  it('MESSAGE_DELETED invalidates messages, analysis, and meta cache keys', async () => {
    await eventBus.publish(EventChannels.MESSAGE_DELETED, {
      messageId: TEST_MESSAGE_ID,
      channelId: TEST_CHANNEL_ID,
      timestamp: new Date().toISOString(),
    });
    await waitFor(() => invalidatePatternSpy.mock.calls.length >= 1 && invalidateSpy.mock.calls.length >= 2);

    expect(invalidatePatternSpy).toHaveBeenCalledWith(`channel:msgs:${TEST_CHANNEL_ID}:*`);
    expect(invalidateSpy).toHaveBeenCalledWith(`analysis:channel:${TEST_CHANNEL_ID}`);
    expect(invalidateSpy).toHaveBeenCalledWith(`meta:channel:${TEST_CHANNEL_ID}`);
  });

  it('cacheInvalidator.start() is idempotent (double-start safe)', async () => {
    await expect(cacheInvalidator.start()).resolves.toBeUndefined();
  });
});
