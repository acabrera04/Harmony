import 'dotenv/config';
import { createApp } from './app';
import { cacheInvalidator } from './services/cacheInvalidator.service';

const PORT = Number(process.env.PORT) || 4000;

const app = createApp();

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Harmony backend listening on 0.0.0.0:${PORT}`);
});

cacheInvalidator.start().catch((err) => console.error('[cacheInvalidator] start failed:', err));

let shuttingDown = false;
const shutdown = async () => {
  if (shuttingDown) return;
  shuttingDown = true;
  const timer = setTimeout(() => process.exit(1), 10_000);
  await new Promise<void>((resolve) => server.close(() => resolve()));
  await cacheInvalidator.stop();
  clearTimeout(timer);
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
