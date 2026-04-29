import { z } from 'zod';
import { router, authedProcedure } from '../init';
import { notificationService } from '../../services/notification.service';

export const notificationRouter = router({
  /** List the 50 most-recent notifications for the authenticated user. */
  getNotifications: authedProcedure.query(({ ctx }) =>
    notificationService.getNotifications(ctx.userId),
  ),

  /** Count of unread notifications. */
  getUnreadCount: authedProcedure.query(({ ctx }) =>
    notificationService.getUnreadCount(ctx.userId),
  ),

  /** Mark a single notification as read. */
  markAsRead: authedProcedure
    .input(z.object({ notificationId: z.string().uuid() }))
    .mutation(({ ctx, input }) =>
      notificationService.markAsRead(input.notificationId, ctx.userId),
    ),

  /** Mark all notifications as read. */
  markAllAsRead: authedProcedure.mutation(({ ctx }) =>
    notificationService.markAllAsRead(ctx.userId),
  ),
});
