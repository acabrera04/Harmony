/**
 * CacheInvalidator — subscribes to domain events and invalidates the
 * corresponding Redis cache keys per the §4.4 cache schema.
 *
 * Invalidation rules:
 *   VISIBILITY_CHANGED  → channel:{id}:visibility
 *                       → server:{id}:public_channels
 *                       → meta:channel:{id}
 *   MESSAGE_CREATED     → channel:msgs:{id}:* (all pages)
 *                       → analysis:channel:{id}
 *                       → meta:channel:{id}
 *   MESSAGE_EDITED      → channel:msgs:{id}:* (all pages)
 *                       → analysis:channel:{id}
 *                       → meta:channel:{id}
 *   MESSAGE_DELETED     → channel:msgs:{id}:* (all pages)
 *                       → analysis:channel:{id}
 *                       → meta:channel:{id}
 */

import { eventBus, EventChannels } from '../events/eventBus';
import { cacheService, CacheKeys, sanitizeKeySegment } from './cache.service';
import { indexingService } from './indexing.service';

type UnsubscribeFn = () => void;

let unsubscribers: UnsubscribeFn[] = [];
// Shared startup promise — concurrent callers all await the same initialization
// so no caller returns before subscriptions are confirmed ready.
let startPromise: Promise<void> | null = null;

export const cacheInvalidator = {
  /**
   * Start all event subscriptions.
   * Returns a Promise that resolves once all Redis subscribe handshakes
   * are confirmed — await this in tests to avoid timing-dependent failures.
   * Idempotent: concurrent or repeated calls share the same startup promise.
   */
  start(): Promise<void> {
    if (startPromise !== null) return startPromise;

    startPromise = (async () => {
      const sub1 = eventBus.subscribe(EventChannels.VISIBILITY_CHANGED, (payload) => {
        cacheService
          .invalidate(CacheKeys.channelVisibility(payload.channelId))
          .catch((err) => console.error('[CacheInvalidator] VISIBILITY_CHANGED invalidation failed:', err));

        cacheService
          .invalidate(`server:${sanitizeKeySegment(payload.serverId)}:public_channels`)
          .catch((err) => console.error('[CacheInvalidator] VISIBILITY_CHANGED server key failed:', err));

        cacheService
          .invalidate(CacheKeys.metaChannel(payload.channelId))
          .catch((err) => console.error('[CacheInvalidator] VISIBILITY_CHANGED meta key failed:', err));

        // Update sitemap on visibility changes
        indexingService
          .onVisibilityChanged(payload)
          .catch((err) => console.error('[CacheInvalidator] VISIBILITY_CHANGED sitemap update failed:', err));
      });

      const sub2 = eventBus.subscribe(EventChannels.MESSAGE_CREATED, (payload) => {
        cacheService
          .invalidatePattern(`channel:msgs:${sanitizeKeySegment(payload.channelId)}:*`)
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_CREATED invalidation failed:', err));

        cacheService
          .invalidate(CacheKeys.analysisChannel(payload.channelId))
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_CREATED analysis key failed:', err));

        cacheService
          .invalidate(CacheKeys.metaChannel(payload.channelId))
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_CREATED meta key failed:', err));
      });

      const sub3 = eventBus.subscribe(EventChannels.MESSAGE_EDITED, (payload) => {
        cacheService
          .invalidatePattern(`channel:msgs:${sanitizeKeySegment(payload.channelId)}:*`)
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_EDITED invalidation failed:', err));

        cacheService
          .invalidate(CacheKeys.analysisChannel(payload.channelId))
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_EDITED analysis key failed:', err));

        cacheService
          .invalidate(CacheKeys.metaChannel(payload.channelId))
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_EDITED meta key failed:', err));
      });

      const sub4 = eventBus.subscribe(EventChannels.MESSAGE_DELETED, (payload) => {
        cacheService
          .invalidatePattern(`channel:msgs:${sanitizeKeySegment(payload.channelId)}:*`)
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_DELETED invalidation failed:', err));

        cacheService
          .invalidate(CacheKeys.analysisChannel(payload.channelId))
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_DELETED analysis key failed:', err));

        cacheService
          .invalidate(CacheKeys.metaChannel(payload.channelId))
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_DELETED meta key failed:', err));
      });

      unsubscribers = [sub1.unsubscribe, sub2.unsubscribe, sub3.unsubscribe, sub4.unsubscribe];

      // Wait for all Redis subscribe handshakes to complete
      await Promise.all([sub1.ready, sub2.ready, sub3.ready, sub4.ready]);
    })();

    return startPromise;
  },

  /** Stop all subscriptions and disconnect the subscriber client. */
  async stop(): Promise<void> {
    startPromise = null; // allow restart after stop
    for (const unsub of unsubscribers) unsub();
    unsubscribers = [];
    await eventBus.disconnect();
  },
};
