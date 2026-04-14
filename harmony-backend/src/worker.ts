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
import { createLogger } from './lib/logger';

const rawPort = process.env.PORT;
const PORT =
  rawPort === undefined
    ? 4100
    : (() => {
        if (rawPort.trim() === '') {
          throw new Error(
            `Invalid PORT environment variable: value is blank. Expected an integer between 1 and 65535.`,
          );
        }
        const port = Number(rawPort);
        if (!Number.isInteger(port) || port < 1 || port > 65535) {
          throw new Error(
            `Invalid PORT environment variable: "${rawPort}". Expected an integer between 1 and 65535.`,
          );
        }
        return port;
      })();
const HOST = '0.0.0.0';
const logger = createLogger({ component: 'worker-bootstrap', instanceId, pid: process.pid });

logger.info('Starting backend-worker');

// Tiny health endpoint — deliberately separate from the Express app used by
// backend-api. The worker has no user-facing HTTP surface and should never
// mount auth / tRPC / attachment routes.
const healthServer = http.createServer((req, res) => {
  if (req.method === 'GET' && (req.url === '/health' || req.url === '/')) {
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

healthServer.listen(PORT, HOST, () => {
  logger.info({ host: HOST, port: PORT }, 'Worker health endpoint listening');
});

cacheInvalidator
  .start()
  .then(() => logger.info('Cache invalidator subscriptions ready'))
  .catch((err) => {
    logger.error({ err }, 'Cache invalidator startup failed');
    // Fail fast so Railway restarts us into a clean state rather than running
    // a half-initialized worker that silently drops events.
    process.exit(1);
  });

let shuttingDown = false;
const shutdown = async (signal: string) => {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info({ signal }, 'Shutdown signal received');
  const timer = setTimeout(() => process.exit(1), 10_000);
  await new Promise<void>((resolve) => healthServer.close(() => resolve()));
  await cacheInvalidator.stop();
  clearTimeout(timer);
  process.exit(0);
};

process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));
