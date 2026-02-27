/**
 * Mock Data: Servers
 * 3 mock servers with names, icons, slugs
 */

import type { Server } from '@/types';

export const mockServers: Server[] = [
  {
    id: 'server-001',
    name: 'Harmony HQ',
    slug: 'harmony-hq',
    icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=harmony',
    ownerId: 'user-001',
    description: 'The official Harmony development server. Open to all contributors.',
    bannerUrl: 'https://placehold.co/1200x400/6366f1/ffffff?text=Harmony+HQ',
    memberCount: 8,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-03-01T12:00:00.000Z',
  },
  {
    id: 'server-002',
    name: 'Open Source Hub',
    slug: 'open-source-hub',
    icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=opensource',
    ownerId: 'user-002',
    description: 'A community server for open source enthusiasts.',
    bannerUrl: 'https://placehold.co/1200x400/10b981/ffffff?text=Open+Source+Hub',
    memberCount: 5,
    createdAt: '2024-02-01T09:00:00.000Z',
    updatedAt: '2024-03-10T14:30:00.000Z',
  },
  {
    id: 'server-003',
    name: 'Design Lab',
    slug: 'design-lab',
    icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=designlab',
    ownerId: 'user-005',
    description: 'A private server for the design team.',
    bannerUrl: 'https://placehold.co/1200x400/f59e0b/ffffff?text=Design+Lab',
    memberCount: 3,
    createdAt: '2024-02-20T11:00:00.000Z',
    updatedAt: '2024-03-12T09:00:00.000Z',
  },
];
