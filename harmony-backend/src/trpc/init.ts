import { initTRPC, TRPCError } from '@trpc/server';
import type { Request } from 'express';

export interface TRPCContext {
  userId: string | null;
  ip: string;
}

export function createContext({ req }: { req: Request }): TRPCContext {
  // TODO: wire to express-session (or JWT middleware) once auth is implemented.
  // The cast below matches the shape that express-session would attach to req.
  const session = (req as Request & { session?: { userId?: string } }).session;
  return {
    userId: session?.userId ?? null,
    ip: req.ip ?? '',
  };
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
