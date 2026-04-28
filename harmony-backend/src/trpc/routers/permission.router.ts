import { router, publicProcedure } from '../init';
import type { Action } from '../../services/permission.service';

// ─── Static permission matrix ─────────────────────────────────────────────────
// Mirrors the sets defined in permission.service.ts. Exposed as a public
// endpoint so the frontend can render an accurate matrix without duplicating
// the source of truth.

const MATRIX: Record<string, Action[]> = {
  OWNER: [
    'server:read', 'server:update', 'server:delete', 'server:manage_members',
    'channel:read', 'channel:create', 'channel:update', 'channel:delete', 'channel:manage_visibility',
    'message:read', 'message:create', 'message:update_own', 'message:delete_own', 'message:delete_any', 'message:pin', 'message:react',
    'settings:read', 'settings:update',
  ],
  ADMIN: [
    'server:read', 'server:update', 'server:manage_members',
    'channel:read', 'channel:create', 'channel:update', 'channel:delete', 'channel:manage_visibility',
    'message:read', 'message:create', 'message:update_own', 'message:delete_own', 'message:delete_any', 'message:pin', 'message:react',
    'settings:read', 'settings:update',
  ],
  MODERATOR: [
    'server:read',
    'channel:read',
    'message:read', 'message:create', 'message:update_own', 'message:delete_own', 'message:delete_any', 'message:pin', 'message:react',
  ],
  MEMBER: [
    'server:read',
    'channel:read',
    'message:read', 'message:create', 'message:update_own', 'message:delete_own', 'message:react',
  ],
  GUEST: [
    'server:read',
    'channel:read',
    'message:read',
  ],
};

export const permissionRouter = router({
  /** Returns the full static permission matrix for all roles. Public — no auth required. */
  getMatrix: publicProcedure.query(() => MATRIX),
});
