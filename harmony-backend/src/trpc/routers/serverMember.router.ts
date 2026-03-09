import { z } from 'zod';
import { router, authedProcedure, withPermission } from '../init';
import { serverMemberService } from '../../services/serverMember.service';

export const serverMemberRouter = router({
  /** Join a server (self). */
  joinServer: authedProcedure
    .input(z.object({ serverId: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      return serverMemberService.joinServer(ctx.userId, input.serverId);
    }),

  /** Leave a server (self). */
  leaveServer: authedProcedure
    .input(z.object({ serverId: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      await serverMemberService.leaveServer(ctx.userId, input.serverId);
      return { success: true };
    }),

  /** List members of a server. Requires server:read permission. */
  getMembers: withPermission('server:read')
    .input(z.object({ serverId: z.string().uuid() }))
    .query(async ({ input }) => {
      return serverMemberService.getServerMembers(input.serverId);
    }),

  /** Change a member's role. Requires server:manage_members permission. */
  changeRole: withPermission('server:manage_members')
    .input(
      z.object({
        serverId: z.string().uuid(),
        targetUserId: z.string().uuid(),
        newRole: z.enum(['ADMIN', 'MODERATOR', 'MEMBER', 'GUEST']),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return serverMemberService.changeRole(
        input.targetUserId,
        input.serverId,
        input.newRole,
        ctx.userId,
      );
    }),

  /** Remove a member from the server. Requires server:manage_members permission. */
  removeMember: withPermission('server:manage_members')
    .input(
      z.object({
        serverId: z.string().uuid(),
        targetUserId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await serverMemberService.removeMember(input.targetUserId, input.serverId, ctx.userId);
      return { success: true };
    }),
});
