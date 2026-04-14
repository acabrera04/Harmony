/**
 * backend-worker entry point.
 *
 * This process owns singleton background work that must NOT multiply with
 * backend-api replica count: Redis Pub/Sub subscribers (cacheInvalidator),
 * sitemap/meta regeneration, and any future queue consumers.
 *
 * Exposes a tiny HTTP health endpoint so Railway's health check / restart
 * loop has something to probe. The health server runs on PORT (Railway sets
 * one per service) or 4100 for local dev. See
 * docs/deployment/deployment-architecture.md §8.1.
 */

import 'dotenv/config';
import http from 'http';
import { cacheInvalidator } from './services/cacheInvalidator.service';
import { instanceId } from './lib/instance-identity';
import { parsePortEnv } from './lib/parsePortEnv';

const PORT = parsePortEnv(4100);
const HOST = '0.0.0.0';

console.log(
  `[worker] starting backend-worker instance=${instanceId} pid=${process.pid}`,
);

// Tiny health endpoint — deliberately separate from the Express app used by
// backend-api. The worker has no user-facing HTTP surface and should never
// mount auth / tRPC / attachment routes.
const healthServer = http.createServer((req, res) => {
  const pathname = new URL(req.url!, 'http://localhost').pathname;
  if (req.method === 'GET' && (pathname === '/health' || pathname === '/')) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'X-Instance-Id': instanceId,
    });
    res.end(
      JSON.stringify({
        status: 'ok',
        service: 'backend-worker',
        instanceId,
        timestamp: new Date().toISOString(),
      }),
    );
    return;
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

healthServer.on('error', (err: NodeJS.ErrnoException) => {
  console.error(
    `[worker] health server error instance=${instanceId} host=${HOST} port=${PORT} code=${err.code ?? 'unknown'} errno=${err.errno ?? 'unknown'} syscall=${err.syscall ?? 'unknown'}`,
    err,
  );
  process.exit(1);
});

healthServer.listen(PORT, HOST, () => {
  console.log(`[worker] health endpoint listening on http://${HOST}:${PORT}/health`);
});

cacheInvalidator
  .start()
  .then(() => console.log('[worker] cacheInvalidator subscriptions ready'))
  .catch((err) => {
    console.error('[worker] cacheInvalidator start failed:', err);
    // Fail fast so Railway restarts us into a clean state rather than running
    // a half-initialized worker that silently drops events.
    process.exit(1);
  });

let shuttingDown = false;
const shutdown = async (signal: string) => {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`[worker] ${signal} received, shutting down instance=${instanceId}`);
  const timer = setTimeout(() => process.exit(1), 10_000);
  let exitCode = 0;

  try {
    try {
      await new Promise<void>((resolve, reject) =>
        healthServer.close((err) => (err ? reject(err) : resolve())),
      );
    } catch (err) {
      exitCode = 1;
      console.error('[worker] healthServer close failed during shutdown:', err);
    }

    try {
      await cacheInvalidator.stop();
    } catch (err) {
      exitCode = 1;
      console.error('[worker] cacheInvalidator stop failed during shutdown:', err);
    }
  } finally {
    clearTimeout(timer);
    process.exit(exitCode);
  }
};

process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));
