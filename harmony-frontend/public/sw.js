/* Harmony service worker — handles Web Push notifications */

self.addEventListener('push', (event) => {
  // [DEBUG] Service worker received a push event
  console.log('[SW:push] push event received', event.data ? 'has data' : 'NO DATA');
  if (!event.data) return;

  let payload;
  try {
    payload = event.data.json();
    console.log('[SW:push] parsed payload:', payload);
  } catch {
    payload = { title: 'Harmony', body: event.data.text() };
    console.log('[SW:push] raw text payload:', payload.body);
  }

  const { title = 'Harmony', body = '', icon = '/icon-192.png', tag, data } = payload;
  console.log('[SW:push] showing notification:', { title, body, tag });

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
      tag,
      data,
      badge: '/icon-72.png',
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.url ?? '/';

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        for (const client of windowClients) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      }),
  );
});
