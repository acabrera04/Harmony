/**
 * Mock Data: Users
 * 8+ mock users with varied roles and statuses
 */

import type { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'user-001',
    username: 'alice_admin',
    displayName: 'Alice',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
    status: 'online',
    role: 'owner',
  },
  {
    id: 'user-002',
    username: 'bob_mod',
    displayName: 'Bob',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
    status: 'online',
    role: 'admin',
  },
  {
    id: 'user-003',
    username: 'carol_dev',
    displayName: 'Carol',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol',
    status: 'idle',
    role: 'moderator',
  },
  {
    id: 'user-004',
    username: 'dave_42',
    displayName: 'Dave',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dave',
    status: 'online',
    role: 'member',
  },
  {
    id: 'user-005',
    username: 'eve_designer',
    displayName: 'Eve',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=eve',
    status: 'dnd',
    role: 'member',
  },
  {
    id: 'user-006',
    username: 'frank_backend',
    displayName: 'Frank',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=frank',
    status: 'offline',
    role: 'member',
  },
  {
    id: 'user-007',
    username: 'grace_pm',
    displayName: 'Grace',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grace',
    status: 'idle',
    role: 'member',
  },
  {
    id: 'user-008',
    username: 'henry_guest',
    displayName: 'Henry',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=henry',
    status: 'online',
    role: 'guest',
  },
  {
    id: 'user-009',
    username: 'iris_qa',
    displayName: 'Iris',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=iris',
    status: 'online',
    role: 'member',
  },
  {
    id: 'user-010',
    username: 'jack_ops',
    displayName: 'Jack',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jack',
    status: 'offline',
    role: 'member',
  },
];

export const mockCurrentUser: User = mockUsers[0];
