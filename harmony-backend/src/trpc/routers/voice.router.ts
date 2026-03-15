import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, withPermission } from '../init';
import { voiceService } from '../../services/voice.service';
import { redis } from '../../db/redis';

export const voiceRouter = router({
  /**
   * Join a voice channel. Returns the Twilio access token and the current
   * participant list so the client can render existing participants immediately.
   *
   * Requires channel:read (server membership) to prevent unauthenticated or
   * non-member users from obtaining a Twilio room token for private channels.
   */
  join: withPermission('channel:read')
    .input(z.object({ serverId: z.string().uuid(), channelId: z.string().uuid() }))
    .mutation(({ input, ctx }) =>
      voiceService.join(ctx.userId, input.channelId),
    ),

  /**
   * Leave a voice channel. The service removes the user from Redis and
   * publishes a USER_LEFT_VOICE event. If no participants remain, the
   * Twilio room is destroyed (no-op in mock mode).
   *
   * Requires channel:read so that non-members cannot trigger room destruction
   * for channels they were never admitted to.
   */
  leave: withPermission('channel:read')
    .input(z.object({ serverId: z.string().uuid(), channelId: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      await voiceService.leave(ctx.userId, input.channelId);
      return { success: true as const };
    }),

  /**
   * Update muted / deafened state for the calling user. Publishes
   * VOICE_STATE_CHANGED so connected clients can reflect the new state.
   *
   * Two-layer guard:
   *  1. withPermission('channel:read') — caller must be a server member.
   *  2. sismember check — caller must currently be in the voice channel's
   *     Redis participant set to prevent writing state for channels never joined.
   */
  updateState: withPermission('channel:read')
    .input(
      z.object({
        serverId: z.string().uuid(),
        channelId: z.string().uuid(),
        muted: z.boolean(),
        deafened: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const pKey = `voice:channel:${input.channelId}:participants`;
      const isMember = await redis.sismember(pKey, ctx.userId);
      if (!isMember) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'You are not in this voice channel' });
      }

      await voiceService.updateState(ctx.userId, input.channelId, {
        muted: input.muted,
        deafened: input.deafened,
      });
      return { success: true as const };
    }),

  /**
   * Return the current participant list for a channel, including each
   * participant's mute / deafen state from Redis.
   *
   * Requires channel:read to prevent unauthenticated or non-member users from
   * enumerating who is in a channel (presence data is equally sensitive as
   * message content for PRIVATE channels).
   */
  getParticipants: withPermission('channel:read')
    .input(z.object({ serverId: z.string().uuid(), channelId: z.string().uuid() }))
    .query(({ input }) => voiceService.getParticipants(input.channelId)),
});
