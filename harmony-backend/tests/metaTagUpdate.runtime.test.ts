const subscribeMock = jest.fn();
const unsubscribeMock = jest.fn();

jest.mock('../src/events/eventBus', () => ({
  eventBus: {
    subscribe: subscribeMock,
  },
  EventChannels: {
    MESSAGE_CREATED: 'harmony:MESSAGE_CREATED',
    MESSAGE_EDITED: 'harmony:MESSAGE_EDITED',
    MESSAGE_DELETED: 'harmony:MESSAGE_DELETED',
    VISIBILITY_CHANGED: 'harmony:VISIBILITY_CHANGED',
  },
}));

jest.mock('../src/workers/eventListener', () => ({
  EventListener: jest.fn().mockImplementation(() => ({
    onMessageCreated: jest.fn().mockResolvedValue(undefined),
    onMessageEdited: jest.fn().mockResolvedValue(undefined),
    onMessageDeleted: jest.fn().mockResolvedValue(undefined),
    onVisibilityChanged: jest.fn().mockResolvedValue(undefined),
  })),
}));

import { startMetaTagUpdateRuntime, stopMetaTagUpdateRuntime } from '../src/workers/metaTagUpdate.runtime';

describe('metaTagUpdate runtime', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    subscribeMock.mockReturnValue({
      ready: Promise.resolve(),
      unsubscribe: unsubscribeMock,
    });
    await stopMetaTagUpdateRuntime();
  });

  it('subscribes to regeneration events only when the worker runtime starts', async () => {
    await startMetaTagUpdateRuntime();

    expect(subscribeMock).toHaveBeenCalledTimes(4);
    expect(subscribeMock.mock.calls.map((call: [string]) => call[0])).toEqual([
      'harmony:MESSAGE_CREATED',
      'harmony:MESSAGE_EDITED',
      'harmony:MESSAGE_DELETED',
      'harmony:VISIBILITY_CHANGED',
    ]);

    await stopMetaTagUpdateRuntime();
    expect(unsubscribeMock).toHaveBeenCalledTimes(4);
  });
});
