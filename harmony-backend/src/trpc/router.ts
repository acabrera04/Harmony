import { router, publicProcedure } from './init';
import { channelRouter } from './routers/channel.router';
import { serverRouter } from './routers/server.router';
import { messageRouter } from './routers/message.router';
import { userRouter } from './routers/user.router';

export const appRouter = router({
  health: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),
  channel: channelRouter,
  server: serverRouter,
  message: messageRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
