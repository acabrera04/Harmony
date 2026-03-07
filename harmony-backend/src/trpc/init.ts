import { initTRPC, TRPCError } from '@trpc/server';
import type { Request } from 'express';
import { authService } from '../services/auth.service';

export interface TRPCContext {
  userId: string | null;
  ip: string;
}

export function createContext({ req }: { req: Request }): TRPCContext {
  let userId: string | null = null;

  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    try {
      const payload = authService.verifyAccessToken(authHeader.slice(7));
      userId = payload.sub;
    } catch {
      // Invalid token — context userId remains null; authedProcedure will reject
    }
  }

  return { userId, ip: req.ip ?? '' };
}

const t = initTRPC.context<TRPCContext>().create();

export const router = t.router;

/** Use for unauthenticated procedures (health, public REST). */
export const publicProcedure = t.procedure;

/** Use for all admin/authenticated tRPC procedures.
 *  Throws UNAUTHORIZED if no userId is present in context. */
export const authedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});
