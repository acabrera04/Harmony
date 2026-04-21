import { eventBus, EventChannels } from '../events/eventBus';
import { createLogger } from '../lib/logger';
import { EventListener } from './eventListener';

type UnsubscribeFn = () => void;

const logger = createLogger({ component: 'meta-tag-update-runtime' });

let unsubscribers: UnsubscribeFn[] = [];
let startPromise: Promise<void> | null = null;

export function startMetaTagUpdateRuntime(): Promise<void> {
  if (startPromise) return startPromise;

  startPromise = (async () => {
    const listener = new EventListener();

    const subscriptions = [
      eventBus.subscribe(EventChannels.MESSAGE_CREATED, (payload) =>
        void listener.onMessageCreated(payload),
      ),
      eventBus.subscribe(EventChannels.MESSAGE_EDITED, (payload) =>
        void listener.onMessageEdited(payload),
      ),
      eventBus.subscribe(EventChannels.MESSAGE_DELETED, (payload) =>
        void listener.onMessageDeleted(payload),
      ),
      eventBus.subscribe(EventChannels.VISIBILITY_CHANGED, (payload) =>
        void listener.onVisibilityChanged(payload),
      ),
    ];

    unsubscribers = subscriptions.map((subscription) => subscription.unsubscribe);
    await Promise.all(subscriptions.map((subscription) => subscription.ready));
    logger.info('Meta tag update runtime subscriptions ready');
  })();

  return startPromise;
}

export async function stopMetaTagUpdateRuntime(): Promise<void> {
  startPromise = null;
  for (const unsubscribe of unsubscribers) {
    unsubscribe();
  }
  unsubscribers = [];
}
