import type { UserRole } from '@/types/user';

/**
 * Returns true if the given role is allowed to pin messages.
 * Only MODERATOR, ADMIN, and OWNER may pin; MEMBER and GUEST may not.
 */
export function canPinForRole(role: UserRole): boolean {
  return role === 'moderator' || role === 'admin' || role === 'owner';
}
