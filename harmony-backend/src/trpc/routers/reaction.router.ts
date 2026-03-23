import { z } from 'zod';
import { router, withPermission } from '../init';
import { reactionService } from '../../services/reaction.service';

export const reactionRouter = router({
  /** Add an emoji reaction to a message. Requires message:react (MEMBER+). */
  addReaction: withPermission('message:react')
    .input(
      z.object({
        serverId: z.string().uuid(),
        channelId: z.string().uuid(),
        messageId: z.string().uuid(),
        emoji: z.string().min(1).max(100),
      }),
    )
    .mutation(({ input, ctx }) =>
      reactionService.addReaction({
        messageId: input.messageId,
        channelId: input.channelId,
        userId: ctx.userId,
        emoji: input.emoji,
        serverId: input.serverId,
      }),
    ),

  /** Remove an emoji reaction from a message. Requires message:react (MEMBER+). */
  removeReaction: withPermission('message:react')
    .input(
      z.object({
        serverId: z.string().uuid(),
        channelId: z.string().uuid(),
        messageId: z.string().uuid(),
        emoji: z.string().min(1).max(100),
      }),
    )
    .mutation(({ input, ctx }) =>
      reactionService.removeReaction({
        messageId: input.messageId,
        channelId: input.channelId,
        userId: ctx.userId,
        emoji: input.emoji,
        serverId: input.serverId,
      }),
    ),

  /** Get all reactions for a message grouped by emoji. Requires message:read (GUEST+). */
  getReactions: withPermission('message:read')
    .input(
      z.object({
        serverId: z.string().uuid(),
        channelId: z.string().uuid(),
        messageId: z.string().uuid(),
      }),
    )
    .query(({ input }) =>
      reactionService.getMessageReactions({
        messageId: input.messageId,
        channelId: input.channelId,
        serverId: input.serverId,
      }),
    ),
});
