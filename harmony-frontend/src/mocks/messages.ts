/**
 * Mock Data: Messages
 * 30+ messages per text/announcement channel across all 3 servers.
 * Voice channels (006, 106, 206) are excluded — no text messages.
 */

import type { Message } from '@/types';

// ─── Helpers ──────────────────────────────────────────────────────────────────
// #c20: These helpers produce ISO strings relative to "now" using the local
// system clock. Displayed relative times ("2 hours ago") are therefore
// correct regardless of timezone, since both the timestamp and the viewer's
// clock share the same local time. toISOString() always serialises to UTC.

function hoursAgo(hours: number, minutesOffset = 0): string {
  const d = new Date();
  d.setHours(d.getHours() - hours);
  d.setMinutes(d.getMinutes() - minutesOffset);
  return d.toISOString();
}

function daysAgo(days: number, hoursOffset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(d.getHours() - hoursOffset);
  return d.toISOString();
}

// ─── Author shorthands ────────────────────────────────────────────────────────

const alice = {
  id: 'user-001',
  username: 'alice_admin',
  displayName: 'Alice',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
};
const bob = {
  id: 'user-002',
  username: 'bob_mod',
  displayName: 'Bob',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
};
const carol = {
  id: 'user-003',
  username: 'carol_dev',
  displayName: 'Carol',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol',
};
const dave = {
  id: 'user-004',
  username: 'dave_42',
  displayName: 'Dave',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dave',
};
const eve = {
  id: 'user-005',
  username: 'eve_designer',
  displayName: 'Eve',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=eve',
};
const frank = {
  id: 'user-006',
  username: 'frank_backend',
  displayName: 'Frank',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=frank',
};
const grace = {
  id: 'user-007',
  username: 'grace_pm',
  displayName: 'Grace',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grace',
};
const henry = {
  id: 'user-008',
  username: 'henry_guest',
  displayName: 'Henry',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=henry',
};
const iris = {
  id: 'user-009',
  username: 'iris_qa',
  displayName: 'Iris',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=iris',
};
const jack = {
  id: 'user-010',
  username: 'jack_ops',
  displayName: 'Jack',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jack',
};

// ─── Harmony HQ — #general (channel-001) ─────────────────────────────────────

const ch001: Message[] = [
  {
    id: 'msg-001',
    channelId: 'channel-001',
    authorId: alice.id,
    author: alice,
    content: 'Welcome to Harmony HQ! 🎉 This is our main hub for all things Harmony.',
    timestamp: daysAgo(7),
    reactions: [
      {
        emoji: '🎉',
        count: 5,
        userIds: ['user-002', 'user-003', 'user-004', 'user-005', 'user-006'],
      },
    ],
  },
  {
    id: 'msg-002',
    channelId: 'channel-001',
    authorId: bob.id,
    author: bob,
    content: 'Thanks for having me! Excited to be part of this community.',
    timestamp: daysAgo(7, -1),
    reactions: [{ emoji: '👋', count: 3, userIds: ['user-001', 'user-003', 'user-004'] }],
  },
  {
    id: 'msg-003',
    channelId: 'channel-001',
    authorId: carol.id,
    author: carol,
    content:
      'Just pushed the latest changes to the dev branch. Please review when you get a chance.',
    timestamp: daysAgo(6),
  },
  {
    id: 'msg-004',
    channelId: 'channel-001',
    authorId: dave.id,
    author: dave,
    content: 'Reviewed! Left some comments. Overall looks great though.',
    timestamp: daysAgo(6, -2),
    reactions: [{ emoji: '✅', count: 2, userIds: ['user-003', 'user-001'] }],
  },
  {
    id: 'msg-005',
    channelId: 'channel-001',
    authorId: eve.id,
    author: eve,
    content: 'New design mockups are ready. Check the #showcase channel for previews.',
    timestamp: daysAgo(5),
  },
  {
    id: 'msg-006',
    channelId: 'channel-001',
    authorId: frank.id,
    author: frank,
    content: 'Backend API endpoints are now stable. Updated the docs accordingly.',
    timestamp: daysAgo(5, -3),
  },
  {
    id: 'msg-007',
    channelId: 'channel-001',
    authorId: alice.id,
    author: alice,
    content:
      'Sprint planning meeting tomorrow at 10am. Please come prepared with your task estimates.',
    timestamp: daysAgo(4),
    reactions: [
      {
        emoji: '📅',
        count: 6,
        userIds: ['user-002', 'user-003', 'user-004', 'user-005', 'user-006', 'user-007'],
      },
    ],
  },
  {
    id: 'msg-008',
    channelId: 'channel-001',
    authorId: grace.id,
    author: grace,
    content:
      'Added the sprint planning agenda to the shared drive. Check your emails for the invite.',
    timestamp: daysAgo(4, -1),
  },
  {
    id: 'msg-009',
    channelId: 'channel-001',
    authorId: carol.id,
    author: carol,
    content:
      'Ran into a weird TypeScript error with the channel visibility enum. Anyone else seen this?',
    timestamp: daysAgo(3),
  },
  {
    id: 'msg-010',
    channelId: 'channel-001',
    authorId: dave.id,
    author: dave,
    content: "Yeah, you need to use `as const` assertion. I'll DM you the fix.",
    timestamp: daysAgo(3, -1),
    reactions: [{ emoji: '💡', count: 1, userIds: ['user-003'] }],
  },
  {
    id: 'msg-011',
    channelId: 'channel-001',
    authorId: iris.id,
    author: iris,
    content: 'QA pass on the latest build — 2 minor bugs found, filed as issues #45 and #46.',
    timestamp: daysAgo(2),
  },
  {
    id: 'msg-012',
    channelId: 'channel-001',
    authorId: bob.id,
    author: bob,
    content: 'On it! Should have fixes out by EOD.',
    timestamp: daysAgo(2, -2),
  },
  {
    id: 'msg-013',
    channelId: 'channel-001',
    authorId: eve.id,
    author: eve,
    content: 'Updated color tokens to match the latest brand guidelines. PR is up for review.',
    timestamp: daysAgo(1),
  },
  {
    id: 'msg-014',
    channelId: 'channel-001',
    authorId: alice.id,
    author: alice,
    content:
      "Great work everyone this week! We're ahead of schedule on the visibility toggle feature 🚀",
    timestamp: hoursAgo(20),
    reactions: [
      {
        emoji: '🚀',
        count: 7,
        userIds: [
          'user-002',
          'user-003',
          'user-004',
          'user-005',
          'user-006',
          'user-007',
          'user-009',
        ],
      },
      { emoji: '❤️', count: 4, userIds: ['user-003', 'user-004', 'user-006', 'user-007'] },
    ],
  },
  {
    id: 'msg-015',
    channelId: 'channel-001',
    authorId: frank.id,
    author: frank,
    content: 'Deployed the new mock service layer to the staging environment. Please test!',
    timestamp: hoursAgo(14),
  },
  {
    id: 'msg-016',
    channelId: 'channel-001',
    authorId: iris.id,
    author: iris,
    content: 'Testing it now. The simulated delays feel very realistic.',
    timestamp: hoursAgo(13),
    reactions: [{ emoji: '👍', count: 2, userIds: ['user-006', 'user-001'] }],
  },
  {
    id: 'msg-017',
    channelId: 'channel-001',
    authorId: dave.id,
    author: dave,
    content:
      "Does anyone know if there's a way to hot-reload the mock data without restarting the dev server?",
    timestamp: hoursAgo(10),
  },
  {
    id: 'msg-018',
    channelId: 'channel-001',
    authorId: carol.id,
    author: carol,
    content:
      'Yes! The mock data is in-memory so any saves to the mock files will hot-reload automatically with Next.js.',
    timestamp: hoursAgo(9),
    editedAt: hoursAgo(8),
  },
  {
    id: 'msg-019',
    channelId: 'channel-001',
    authorId: grace.id,
    author: grace,
    content: 'Reminder: weekly sync call at 3pm today!',
    timestamp: hoursAgo(6),
  },
  {
    id: 'msg-020',
    channelId: 'channel-001',
    authorId: bob.id,
    author: bob,
    content: "Can't make it today, will catch up via recording.",
    timestamp: hoursAgo(5),
  },
  {
    id: 'msg-021',
    channelId: 'channel-001',
    authorId: alice.id,
    author: alice,
    content: "No worries Bob, we'll record it and share the notes.",
    timestamp: hoursAgo(5, 30),
  },
  {
    id: 'msg-022',
    channelId: 'channel-001',
    authorId: jack.id,
    author: jack,
    content: 'Infrastructure update: upgraded Node to v20 LTS across all environments.',
    timestamp: hoursAgo(3),
    reactions: [{ emoji: '⬆️', count: 3, userIds: ['user-001', 'user-006', 'user-002'] }],
  },
  {
    id: 'msg-023',
    channelId: 'channel-001',
    authorId: eve.id,
    author: eve,
    content: 'Anyone else think the SearchBar modal needs a keyboard shortcut? Ctrl+K vibes.',
    timestamp: hoursAgo(2),
  },
  {
    id: 'msg-024',
    channelId: 'channel-001',
    authorId: carol.id,
    author: carol,
    content: '100%. Already planning to add that in the SearchBar implementation.',
    timestamp: hoursAgo(1, 45),
    reactions: [{ emoji: '🔍', count: 2, userIds: ['user-005', 'user-004'] }],
  },
  {
    id: 'msg-025',
    channelId: 'channel-001',
    authorId: iris.id,
    author: iris,
    content: 'Just finished manual testing on the TopBar component. Works great on mobile too!',
    timestamp: hoursAgo(1),
  },
  {
    id: 'msg-026',
    channelId: 'channel-001',
    authorId: dave.id,
    author: dave,
    content: "Nice! I'll merge the TopBar PR once CI passes.",
    timestamp: hoursAgo(0, 45),
  },
  {
    id: 'msg-027',
    channelId: 'channel-001',
    authorId: grace.id,
    author: grace,
    content: "Great progress on the milestone 2 tasks everyone. We're in good shape for the demo.",
    timestamp: hoursAgo(0, 30),
    reactions: [
      {
        emoji: '💪',
        count: 5,
        userIds: ['user-001', 'user-002', 'user-003', 'user-004', 'user-005'],
      },
    ],
  },
  {
    id: 'msg-028',
    channelId: 'channel-001',
    authorId: alice.id,
    author: alice,
    content: "Let's aim to have all Week 2 tasks merged by Friday EOD.",
    timestamp: hoursAgo(0, 20),
  },
  {
    id: 'msg-029',
    channelId: 'channel-001',
    authorId: frank.id,
    author: frank,
    content: "Sounds good. I'll make sure the visibility guard is complete by then.",
    timestamp: hoursAgo(0, 15),
  },
  {
    id: 'msg-030',
    channelId: 'channel-001',
    authorId: bob.id,
    author: bob,
    content:
      'Dropping a quick note: I updated the ESLint config to enforce the import alias rules. No more relative imports!',
    timestamp: hoursAgo(0, 5),
    reactions: [
      { emoji: '🧹', count: 4, userIds: ['user-001', 'user-003', 'user-004', 'user-005'] },
    ],
  },
];

// ─── Harmony HQ — #announcements (channel-002) ───────────────────────────────

const ch002: Message[] = [
  {
    id: 'msg-101',
    channelId: 'channel-002',
    authorId: alice.id,
    author: alice,
    content:
      '📢 **Welcome to Harmony HQ!** This server is the official home for the Harmony project. Please read the rules in #general before posting.',
    timestamp: daysAgo(30),
    reactions: [
      {
        emoji: '✅',
        count: 8,
        userIds: [
          'user-002',
          'user-003',
          'user-004',
          'user-005',
          'user-006',
          'user-007',
          'user-008',
          'user-009',
        ],
      },
    ],
  },
  {
    id: 'msg-102',
    channelId: 'channel-002',
    authorId: alice.id,
    author: alice,
    content:
      "📢 **Project kickoff!** We're officially starting development on Harmony. Assignments have been posted to the GitHub project board.",
    timestamp: daysAgo(14),
    reactions: [
      {
        emoji: '🎉',
        count: 7,
        userIds: [
          'user-002',
          'user-003',
          'user-004',
          'user-005',
          'user-006',
          'user-007',
          'user-009',
        ],
      },
    ],
  },
  {
    id: 'msg-103',
    channelId: 'channel-002',
    authorId: alice.id,
    author: alice,
    content:
      '📢 **Week 1 Milestone:** TypeScript types and Tailwind config are merged. Great work @AvanishKulkarni and the team!',
    timestamp: daysAgo(10),
  },
  {
    id: 'msg-104',
    channelId: 'channel-002',
    authorId: alice.id,
    author: alice,
    content:
      '📢 **v0.1.0 Released!** The initial Harmony prototype is live. Check the release notes in #dev-updates.',
    timestamp: daysAgo(5),
    reactions: [
      {
        emoji: '🚀',
        count: 8,
        userIds: [
          'user-002',
          'user-003',
          'user-004',
          'user-005',
          'user-006',
          'user-007',
          'user-008',
          'user-009',
        ],
      },
    ],
  },
  {
    id: 'msg-105',
    channelId: 'channel-002',
    authorId: grace.id,
    author: grace,
    content:
      '📢 **Sprint planning recap:** Week 2 tasks are assigned. Visibility toggle feature is our main focus. See the project board for your assignments.',
    timestamp: daysAgo(3),
  },
  {
    id: 'msg-106',
    channelId: 'channel-002',
    authorId: alice.id,
    author: alice,
    content:
      '📢 **New rule:** All PRs must pass TypeScript check (`tsc --noEmit`) and ESLint before requesting review. No exceptions!',
    timestamp: daysAgo(2),
    reactions: [
      {
        emoji: '👍',
        count: 6,
        userIds: ['user-002', 'user-003', 'user-004', 'user-005', 'user-006', 'user-007'],
      },
    ],
  },
  {
    id: 'msg-107',
    channelId: 'channel-002',
    authorId: jack.id,
    author: jack,
    content:
      '📢 **Infrastructure:** Staging environment is now live at staging.harmony.dev. Use it for integration testing before merging to main.',
    timestamp: daysAgo(1),
  },
  {
    id: 'msg-108',
    channelId: 'channel-002',
    authorId: alice.id,
    author: alice,
    content:
      '📢 **Demo day is Friday!** Make sure your features are merged and working by Thursday 5pm. Reach out in #general if you need help.',
    timestamp: hoursAgo(4),
    reactions: [
      {
        emoji: '📅',
        count: 7,
        userIds: [
          'user-002',
          'user-003',
          'user-004',
          'user-005',
          'user-006',
          'user-007',
          'user-009',
        ],
      },
    ],
  },
  {
    id: 'msg-109',
    channelId: 'channel-002',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 109.',
    timestamp: daysAgo(60),
  },
  {
    id: 'msg-110',
    channelId: 'channel-002',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 110.',
    timestamp: daysAgo(52),
  },
  {
    id: 'msg-111',
    channelId: 'channel-002',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 111.',
    timestamp: daysAgo(31),
  },
  {
    id: 'msg-112',
    channelId: 'channel-002',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 112.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-113',
    channelId: 'channel-002',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 113.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-114',
    channelId: 'channel-002',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 114.',
    timestamp: daysAgo(54),
  },
  {
    id: 'msg-115',
    channelId: 'channel-002',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 115.',
    timestamp: daysAgo(54),
  },
  {
    id: 'msg-116',
    channelId: 'channel-002',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 116.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-117',
    channelId: 'channel-002',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 117.',
    timestamp: daysAgo(58),
  },
  {
    id: 'msg-118',
    channelId: 'channel-002',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 118.',
    timestamp: daysAgo(37),
  },
  {
    id: 'msg-119',
    channelId: 'channel-002',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 119.',
    timestamp: daysAgo(34),
  },
  {
    id: 'msg-120',
    channelId: 'channel-002',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 120.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-121',
    channelId: 'channel-002',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 121.',
    timestamp: daysAgo(39),
  },
  {
    id: 'msg-122',
    channelId: 'channel-002',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 122.',
    timestamp: daysAgo(41),
  },
  {
    id: 'msg-123',
    channelId: 'channel-002',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 123.',
    timestamp: daysAgo(55),
  },
  {
    id: 'msg-124',
    channelId: 'channel-002',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 124.',
    timestamp: daysAgo(37),
  },
  {
    id: 'msg-125',
    channelId: 'channel-002',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 125.',
    timestamp: daysAgo(42),
  },
  {
    id: 'msg-126',
    channelId: 'channel-002',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 126.',
    timestamp: daysAgo(52),
  },
  {
    id: 'msg-127',
    channelId: 'channel-002',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 127.',
    timestamp: daysAgo(33),
  },
  {
    id: 'msg-128',
    channelId: 'channel-002',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 128.',
    timestamp: daysAgo(45),
  },
  {
    id: 'msg-129',
    channelId: 'channel-002',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 129.',
    timestamp: daysAgo(50),
  },
  {
    id: 'msg-130',
    channelId: 'channel-002',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 002. Message number 130.',
    timestamp: daysAgo(33),
  },
];

// ─── Harmony HQ — #introductions (channel-003) ───────────────────────────────

const ch003: Message[] = [
  {
    id: 'msg-201',
    channelId: 'channel-003',
    authorId: alice.id,
    author: alice,
    content:
      "Hi everyone! I'm Alice, the project lead. I'm a full-stack developer with a passion for open-source. Looking forward to building something great with all of you! 🙌",
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-202',
    channelId: 'channel-003',
    authorId: bob.id,
    author: bob,
    content:
      "Hey! I'm Bob, handling moderation and also working on some frontend tasks. Been coding for about 5 years, mostly React. Happy to be here!",
    timestamp: daysAgo(29),
  },
  {
    id: 'msg-203',
    channelId: 'channel-003',
    authorId: carol.id,
    author: carol,
    content:
      "Hello everyone! I'm Carol, a full-stack developer with a focus on TypeScript and Next.js. Excited to be working on Harmony's frontend!",
    timestamp: daysAgo(28),
  },
  {
    id: 'msg-204',
    channelId: 'channel-003',
    authorId: dave.id,
    author: dave,
    content:
      "Hey all! Dave here. I'm a software engineer who loves clean code and good tests. Currently handling some of the service layer work.",
    timestamp: daysAgo(27),
  },
  {
    id: 'msg-205',
    channelId: 'channel-003',
    authorId: eve.id,
    author: eve,
    content:
      "Hi! I'm Eve, the designer on the team. I'll be making sure Harmony looks and feels great. I've been doing UI/UX for 4 years. Can't wait to get started!",
    timestamp: daysAgo(26),
  },
  {
    id: 'msg-206',
    channelId: 'channel-003',
    authorId: frank.id,
    author: frank,
    content:
      'Hey team! Frank here — I work on the backend infrastructure and deployment side of things. Also dabble in frontend when needed. Happy to help wherever!',
    timestamp: daysAgo(25),
  },
  {
    id: 'msg-207',
    channelId: 'channel-003',
    authorId: grace.id,
    author: grace,
    content:
      "Hello! I'm Grace, the PM keeping us all on track. 😄 I'll be managing the project board and making sure we hit our milestones.",
    timestamp: daysAgo(24),
  },
  {
    id: 'msg-208',
    channelId: 'channel-003',
    authorId: henry.id,
    author: henry,
    content:
      "Hi everyone, I'm Henry. I'm a community member and occasional contributor. Excited to follow Harmony's progress!",
    timestamp: daysAgo(20),
    reactions: [
      { emoji: '👋', count: 4, userIds: ['user-001', 'user-002', 'user-003', 'user-005'] },
    ],
  },
  {
    id: 'msg-209',
    channelId: 'channel-003',
    authorId: iris.id,
    author: iris,
    content:
      "Hey! I'm Iris, handling QA and testing. I'll make sure we don't ship bugs! 🐛 Background in automation testing and accessibility.",
    timestamp: daysAgo(18),
  },
  {
    id: 'msg-210',
    channelId: 'channel-003',
    authorId: jack.id,
    author: jack,
    content:
      'Hi all! Jack here, DevOps and infrastructure. I keep the servers running and the pipelines green. Nice to meet everyone!',
    timestamp: daysAgo(15),
  },
  {
    id: 'msg-211',
    channelId: 'channel-003',
    authorId: alice.id,
    author: alice,
    content:
      "Welcome everyone! Great to have such a talented team. Don't forget to grab your roles in #general. Let's build something amazing! 💪",
    timestamp: daysAgo(14),
    reactions: [
      {
        emoji: '💪',
        count: 8,
        userIds: [
          'user-002',
          'user-003',
          'user-004',
          'user-005',
          'user-006',
          'user-007',
          'user-008',
          'user-009',
        ],
      },
    ],
  },
  {
    id: 'msg-212',
    channelId: 'channel-003',
    authorId: dave.id,
    author: dave,
    content:
      'Quick tip for everyone: the project board on GitHub is the source of truth for tasks. Check it daily!',
    timestamp: daysAgo(10),
  },
  {
    id: 'msg-213',
    channelId: 'channel-003',
    authorId: carol.id,
    author: carol,
    content:
      "Also — check out the AGENTS.md and WORKFLOW.md files in the repo. They have all the conventions we're following.",
    timestamp: daysAgo(10, -1),
  },
  {
    id: 'msg-214',
    channelId: 'channel-003',
    authorId: iris.id,
    author: iris,
    content:
      "Thanks for the tips! Just read through the workflow doc. Makes a lot of sense. Love that we're following a spec-driven approach.",
    timestamp: daysAgo(9),
  },
  {
    id: 'msg-215',
    channelId: 'channel-003',
    authorId: henry.id,
    author: henry,
    content: 'This is a really welcoming community. Glad I found this server!',
    timestamp: daysAgo(5),
    reactions: [
      {
        emoji: '❤️',
        count: 5,
        userIds: ['user-001', 'user-002', 'user-003', 'user-005', 'user-007'],
      },
    ],
  },
  {
    id: 'msg-216',
    channelId: 'channel-003',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 003. Message number 216.',
    timestamp: daysAgo(53),
  },
  {
    id: 'msg-217',
    channelId: 'channel-003',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 003. Message number 217.',
    timestamp: daysAgo(47),
  },
  {
    id: 'msg-218',
    channelId: 'channel-003',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 003. Message number 218.',
    timestamp: daysAgo(44),
  },
  {
    id: 'msg-219',
    channelId: 'channel-003',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 003. Message number 219.',
    timestamp: daysAgo(40),
  },
  {
    id: 'msg-220',
    channelId: 'channel-003',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 003. Message number 220.',
    timestamp: daysAgo(53),
  },
  {
    id: 'msg-221',
    channelId: 'channel-003',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 003. Message number 221.',
    timestamp: daysAgo(60),
  },
  {
    id: 'msg-222',
    channelId: 'channel-003',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 003. Message number 222.',
    timestamp: daysAgo(35),
  },
  {
    id: 'msg-223',
    channelId: 'channel-003',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 003. Message number 223.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-224',
    channelId: 'channel-003',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 003. Message number 224.',
    timestamp: daysAgo(50),
  },
  {
    id: 'msg-225',
    channelId: 'channel-003',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 003. Message number 225.',
    timestamp: daysAgo(31),
  },
  {
    id: 'msg-226',
    channelId: 'channel-003',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 003. Message number 226.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-227',
    channelId: 'channel-003',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 003. Message number 227.',
    timestamp: daysAgo(50),
  },
  {
    id: 'msg-228',
    channelId: 'channel-003',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 003. Message number 228.',
    timestamp: daysAgo(31),
  },
  {
    id: 'msg-229',
    channelId: 'channel-003',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 003. Message number 229.',
    timestamp: daysAgo(52),
  },
  {
    id: 'msg-230',
    channelId: 'channel-003',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 003. Message number 230.',
    timestamp: daysAgo(32),
  },
];

// ─── Harmony HQ — #dev-updates (channel-004) ─────────────────────────────────

const ch004: Message[] = [
  {
    id: 'msg-301',
    channelId: 'channel-004',
    authorId: alice.id,
    author: alice,
    content:
      '📦 **PR #1 merged** — Repository setup and initial Next.js project scaffolded. Base Tailwind config in place.',
    timestamp: daysAgo(14),
  },
  {
    id: 'msg-302',
    channelId: 'channel-004',
    authorId: carol.id,
    author: carol,
    content:
      '📦 **PR #3 merged** — TypeScript strict mode enabled. `tsconfig.json` updated with path aliases (`@/`).',
    timestamp: daysAgo(13),
  },
  {
    id: 'msg-303',
    channelId: 'channel-004',
    authorId: alice.id,
    author: alice,
    content:
      '📦 **PR #5 merged** — Tailwind config with Discord colour palette (`discord.bg-primary`, `discord.accent`, etc.).',
    timestamp: daysAgo(12),
  },
  {
    id: 'msg-304',
    channelId: 'channel-004',
    authorId: carol.id,
    author: carol,
    content:
      '📦 **PR #7 merged** — TypeScript types for Server, Channel, Message, User. Visibility enum values locked in: `PUBLIC_INDEXABLE`, `PUBLIC_NO_INDEX`, `PRIVATE`.',
    timestamp: daysAgo(11),
  },
  {
    id: 'msg-305',
    channelId: 'channel-004',
    authorId: dave.id,
    author: dave,
    content:
      '📦 **PR #10 merged** — `lib/utils.ts` helpers: `cn()`, `formatRelativeTime()`, `truncate()`, `getChannelUrl()`.',
    timestamp: daysAgo(10),
  },
  {
    id: 'msg-306',
    channelId: 'channel-004',
    authorId: eve.id,
    author: eve,
    content:
      '📦 **PR #12 merged** — `Button` and `Card` UI base components added to `components/ui/`.',
    timestamp: daysAgo(9),
  },
  {
    id: 'msg-307',
    channelId: 'channel-004',
    authorId: frank.id,
    author: frank,
    content:
      '📦 **PR #15 merged** — `ServerSidebar`, `MessageCard`, `MessageList`, `GuestPromoBanner` components.',
    timestamp: daysAgo(8),
  },
  {
    id: 'msg-308',
    channelId: 'channel-004',
    authorId: carol.id,
    author: carol,
    content:
      '📦 **PR #20 merged** — `apiClient` Axios instance with auth interceptors and error handling.',
    timestamp: daysAgo(7),
  },
  {
    id: 'msg-309',
    channelId: 'channel-004',
    authorId: dave.id,
    author: dave,
    content:
      '📦 **PR #56 opened** — Mock data layer + API service modules. All 4 services implemented with async delays.',
    timestamp: daysAgo(2),
  },
  {
    id: 'msg-310',
    channelId: 'channel-004',
    authorId: carol.id,
    author: carol,
    content:
      '📦 **TopBar component** added in #56 — hash icon, channel name/topic, icon buttons, responsive.',
    timestamp: daysAgo(1),
  },
  {
    id: 'msg-311',
    channelId: 'channel-004',
    authorId: eve.id,
    author: eve,
    content:
      '📦 **MembersSidebar component** added in #56 — role groups, status dots, dark theme, mobile overlay.',
    timestamp: daysAgo(1, -2),
  },
  {
    id: 'msg-312',
    channelId: 'channel-004',
    authorId: carol.id,
    author: carol,
    content:
      '📦 **VisibilityGuard + SearchModal** added in #56 — gate content by visibility state, Ctrl+K search.',
    timestamp: hoursAgo(20),
  },
  {
    id: 'msg-313',
    channelId: 'channel-004',
    authorId: frank.id,
    author: frank,
    content:
      '📦 **Discord-like shell wired up** — `/c/:serverSlug/:channelSlug` route live. `npm run dev` shows the full layout now!',
    timestamp: hoursAgo(8),
    reactions: [
      {
        emoji: '🎉',
        count: 6,
        userIds: ['user-001', 'user-002', 'user-003', 'user-005', 'user-007', 'user-009'],
      },
    ],
  },
  {
    id: 'msg-314',
    channelId: 'channel-004',
    authorId: iris.id,
    author: iris,
    content:
      'Just tested the routing — clicking through channels and servers works perfectly. Nice work!',
    timestamp: hoursAgo(6),
    reactions: [
      { emoji: '👍', count: 4, userIds: ['user-001', 'user-003', 'user-004', 'user-006'] },
    ],
  },
  {
    id: 'msg-315',
    channelId: 'channel-004',
    authorId: alice.id,
    author: alice,
    content:
      'Next up: VisibilityToggle, GuestChannelView, and the SEO meta tag pipeline. More updates soon! 📡',
    timestamp: hoursAgo(2),
  },
  {
    id: 'msg-316',
    channelId: 'channel-004',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 004. Message number 316.',
    timestamp: daysAgo(33),
  },
  {
    id: 'msg-317',
    channelId: 'channel-004',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 004. Message number 317.',
    timestamp: daysAgo(35),
  },
  {
    id: 'msg-318',
    channelId: 'channel-004',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 004. Message number 318.',
    timestamp: daysAgo(33),
  },
  {
    id: 'msg-319',
    channelId: 'channel-004',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 004. Message number 319.',
    timestamp: daysAgo(57),
  },
  {
    id: 'msg-320',
    channelId: 'channel-004',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 004. Message number 320.',
    timestamp: daysAgo(41),
  },
  {
    id: 'msg-321',
    channelId: 'channel-004',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 004. Message number 321.',
    timestamp: daysAgo(45),
  },
  {
    id: 'msg-322',
    channelId: 'channel-004',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 004. Message number 322.',
    timestamp: daysAgo(37),
  },
  {
    id: 'msg-323',
    channelId: 'channel-004',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 004. Message number 323.',
    timestamp: daysAgo(58),
  },
  {
    id: 'msg-324',
    channelId: 'channel-004',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 004. Message number 324.',
    timestamp: daysAgo(56),
  },
  {
    id: 'msg-325',
    channelId: 'channel-004',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 004. Message number 325.',
    timestamp: daysAgo(58),
  },
  {
    id: 'msg-326',
    channelId: 'channel-004',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 004. Message number 326.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-327',
    channelId: 'channel-004',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 004. Message number 327.',
    timestamp: daysAgo(58),
  },
  {
    id: 'msg-328',
    channelId: 'channel-004',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 004. Message number 328.',
    timestamp: daysAgo(54),
  },
  {
    id: 'msg-329',
    channelId: 'channel-004',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 004. Message number 329.',
    timestamp: daysAgo(38),
  },
  {
    id: 'msg-330',
    channelId: 'channel-004',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 004. Message number 330.',
    timestamp: daysAgo(48),
  },
];

// ─── Harmony HQ — #staff-only (channel-005, PRIVATE) ─────────────────────────

const ch005: Message[] = [
  {
    id: 'msg-401',
    channelId: 'channel-005',
    authorId: alice.id,
    author: alice,
    content: 'Staff-only channel. Keep discussions here confidential.',
    timestamp: daysAgo(14),
  },
  {
    id: 'msg-402',
    channelId: 'channel-005',
    authorId: bob.id,
    author: bob,
    content: "Understood. What's the plan for handling bad actors in the community?",
    timestamp: daysAgo(14, -1),
  },
  {
    id: 'msg-403',
    channelId: 'channel-005',
    authorId: alice.id,
    author: alice,
    content:
      '3-strike policy: warning → 24h timeout → permanent ban. Document each action in #moderation-log.',
    timestamp: daysAgo(14, -2),
  },
  {
    id: 'msg-404',
    channelId: 'channel-005',
    authorId: bob.id,
    author: bob,
    content: "Makes sense. I'll update the moderation guide accordingly.",
    timestamp: daysAgo(13),
  },
  {
    id: 'msg-405',
    channelId: 'channel-005',
    authorId: alice.id,
    author: alice,
    content:
      'FYI — we have a new contributor (Henry, user-008). Keep an eye on activity for the first week, standard practice.',
    timestamp: daysAgo(10),
  },
  {
    id: 'msg-406',
    channelId: 'channel-005',
    authorId: bob.id,
    author: bob,
    content: 'Noted. He seems genuine so far, just reading channels and asking good questions.',
    timestamp: daysAgo(10, -1),
  },
  {
    id: 'msg-407',
    channelId: 'channel-005',
    authorId: alice.id,
    author: alice,
    content:
      "Sprint velocity is looking good. We're ahead of the Week 2 schedule by about 20%. Should we pull in some Week 3 tasks?",
    timestamp: daysAgo(5),
  },
  {
    id: 'msg-408',
    channelId: 'channel-005',
    authorId: grace.id,
    author: grace,
    content:
      "I'd hold off until we see the demo feedback. Better to have polished Week 2 work than rushed Week 3 features.",
    timestamp: daysAgo(5, -1),
  },
  {
    id: 'msg-409',
    channelId: 'channel-005',
    authorId: alice.id,
    author: alice,
    content: "Agreed. Let's focus on quality. Good call Grace.",
    timestamp: daysAgo(4),
  },
  {
    id: 'msg-410',
    channelId: 'channel-005',
    authorId: bob.id,
    author: bob,
    content:
      'One thing to discuss: should we make the SearchModal keyboard shortcut Ctrl+K globally, or just when focused in the app?',
    timestamp: daysAgo(2),
  },
  {
    id: 'msg-411',
    channelId: 'channel-005',
    authorId: alice.id,
    author: alice,
    content:
      "Global makes sense for power users. As long as we don't conflict with browser shortcuts.",
    timestamp: daysAgo(2, -1),
  },
  {
    id: 'msg-412',
    channelId: 'channel-005',
    authorId: grace.id,
    author: grace,
    content:
      'Ctrl+K is already used by some browsers for link insertion in text fields. We should test across browsers.',
    timestamp: daysAgo(1),
  },
  {
    id: 'msg-413',
    channelId: 'channel-005',
    authorId: iris.id,
    author: iris,
    content: "I can add this to the QA checklist. I'll test Chrome, Firefox, and Safari.",
    timestamp: daysAgo(1, -1),
  },
  {
    id: 'msg-414',
    channelId: 'channel-005',
    authorId: alice.id,
    author: alice,
    content: 'Perfect. Thanks Iris.',
    timestamp: hoursAgo(12),
  },
  {
    id: 'msg-415',
    channelId: 'channel-005',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 005. Message number 415.',
    timestamp: daysAgo(35),
  },
  {
    id: 'msg-416',
    channelId: 'channel-005',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 005. Message number 416.',
    timestamp: daysAgo(33),
  },
  {
    id: 'msg-417',
    channelId: 'channel-005',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 005. Message number 417.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-418',
    channelId: 'channel-005',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 005. Message number 418.',
    timestamp: daysAgo(55),
  },
  {
    id: 'msg-419',
    channelId: 'channel-005',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 005. Message number 419.',
    timestamp: daysAgo(56),
  },
  {
    id: 'msg-420',
    channelId: 'channel-005',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 005. Message number 420.',
    timestamp: daysAgo(31),
  },
  {
    id: 'msg-421',
    channelId: 'channel-005',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 005. Message number 421.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-422',
    channelId: 'channel-005',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 005. Message number 422.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-423',
    channelId: 'channel-005',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 005. Message number 423.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-424',
    channelId: 'channel-005',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 005. Message number 424.',
    timestamp: daysAgo(44),
  },
  {
    id: 'msg-425',
    channelId: 'channel-005',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 005. Message number 425.',
    timestamp: daysAgo(49),
  },
  {
    id: 'msg-426',
    channelId: 'channel-005',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 005. Message number 426.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-427',
    channelId: 'channel-005',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 005. Message number 427.',
    timestamp: daysAgo(49),
  },
  {
    id: 'msg-428',
    channelId: 'channel-005',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 005. Message number 428.',
    timestamp: daysAgo(33),
  },
  {
    id: 'msg-429',
    channelId: 'channel-005',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 005. Message number 429.',
    timestamp: daysAgo(41),
  },
  {
    id: 'msg-430',
    channelId: 'channel-005',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 005. Message number 430.',
    timestamp: daysAgo(57),
  },
];

// ─── Harmony HQ — #feedback (channel-007) ────────────────────────────────────

const ch007: Message[] = [
  {
    id: 'msg-501',
    channelId: 'channel-007',
    authorId: henry.id,
    author: henry,
    content:
      "The channel sidebar is really clean! One thing I'd love to see is channel categories, like Discord's collapsible groups.",
    timestamp: daysAgo(5),
  },
  {
    id: 'msg-502',
    channelId: 'channel-007',
    authorId: alice.id,
    author: alice,
    content: 'Great suggestion Henry! Categories are on the roadmap for a later milestone.',
    timestamp: daysAgo(5, -1),
    reactions: [{ emoji: '👍', count: 3, userIds: ['user-008', 'user-003', 'user-005'] }],
  },
  {
    id: 'msg-503',
    channelId: 'channel-007',
    authorId: dave.id,
    author: dave,
    content:
      'Would be great to have unread message badges on the channel list items. Easy to miss new messages otherwise.',
    timestamp: daysAgo(4),
  },
  {
    id: 'msg-504',
    channelId: 'channel-007',
    authorId: carol.id,
    author: carol,
    content: 'Adding that to the backlog. Good catch!',
    timestamp: daysAgo(4, -1),
  },
  {
    id: 'msg-505',
    channelId: 'channel-007',
    authorId: iris.id,
    author: iris,
    content:
      'The mobile layout looks great! Just tested on iPhone. The overlay sidebars work really smoothly.',
    timestamp: daysAgo(3),
    reactions: [
      { emoji: '📱', count: 4, userIds: ['user-001', 'user-005', 'user-003', 'user-004'] },
    ],
  },
  {
    id: 'msg-506',
    channelId: 'channel-007',
    authorId: eve.id,
    author: eve,
    content: 'Glad to hear it! The mobile transitions were tricky to get right.',
    timestamp: daysAgo(3, -1),
  },
  {
    id: 'msg-507',
    channelId: 'channel-007',
    authorId: henry.id,
    author: henry,
    content:
      'Suggestion: the message timestamps could show full date/time on hover. Just the relative time can be ambiguous.',
    timestamp: daysAgo(2),
  },
  {
    id: 'msg-508',
    channelId: 'channel-007',
    authorId: carol.id,
    author: carol,
    content:
      "That's a good UX point. I'll add it as a tooltip. Shouldn't be too hard with CSS title attribute or a Radix tooltip.",
    timestamp: daysAgo(2, -1),
  },
  {
    id: 'msg-509',
    channelId: 'channel-007',
    authorId: bob.id,
    author: bob,
    content: 'Feature request: dark/light mode toggle? Some people prefer light theme.',
    timestamp: daysAgo(1),
  },
  {
    id: 'msg-510',
    channelId: 'channel-007',
    authorId: alice.id,
    author: alice,
    content:
      "It's in the backlog but not planned for this sprint. We have the CSS variables set up for it at least.",
    timestamp: daysAgo(1, -1),
  },
  {
    id: 'msg-511',
    channelId: 'channel-007',
    authorId: iris.id,
    author: iris,
    content:
      'The search modal is really fast. Impressed with the client-side filtering performance even with lots of messages.',
    timestamp: hoursAgo(8),
  },
  {
    id: 'msg-512',
    channelId: 'channel-007',
    authorId: dave.id,
    author: dave,
    content:
      "It'll need server-side search when we have thousands of messages, but for the mock data it's perfectly snappy.",
    timestamp: hoursAgo(7),
  },
  {
    id: 'msg-513',
    channelId: 'channel-007',
    authorId: henry.id,
    author: henry,
    content:
      'One small UX bug: when the members sidebar is open and you resize the window from desktop to mobile, the layout breaks slightly.',
    timestamp: hoursAgo(3),
  },
  {
    id: 'msg-514',
    channelId: 'channel-007',
    authorId: carol.id,
    author: carol,
    content:
      "Good catch! I'll add a resize listener to auto-close the overlay on mobile. Filing an issue now.",
    timestamp: hoursAgo(2),
  },
  {
    id: 'msg-515',
    channelId: 'channel-007',
    authorId: alice.id,
    author: alice,
    content:
      'Feedback quality has been excellent this sprint. Keep it coming — this is what makes the product better!',
    timestamp: hoursAgo(1),
    reactions: [
      {
        emoji: '🙌',
        count: 5,
        userIds: ['user-003', 'user-004', 'user-005', 'user-008', 'user-009'],
      },
    ],
  },
  {
    id: 'msg-516',
    channelId: 'channel-007',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 007. Message number 516.',
    timestamp: daysAgo(34),
  },
  {
    id: 'msg-517',
    channelId: 'channel-007',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 007. Message number 517.',
    timestamp: daysAgo(59),
  },
  {
    id: 'msg-518',
    channelId: 'channel-007',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 007. Message number 518.',
    timestamp: daysAgo(31),
  },
  {
    id: 'msg-519',
    channelId: 'channel-007',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 007. Message number 519.',
    timestamp: daysAgo(38),
  },
  {
    id: 'msg-520',
    channelId: 'channel-007',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 007. Message number 520.',
    timestamp: daysAgo(37),
  },
  {
    id: 'msg-521',
    channelId: 'channel-007',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 007. Message number 521.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-522',
    channelId: 'channel-007',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 007. Message number 522.',
    timestamp: daysAgo(47),
  },
  {
    id: 'msg-523',
    channelId: 'channel-007',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 007. Message number 523.',
    timestamp: daysAgo(38),
  },
  {
    id: 'msg-524',
    channelId: 'channel-007',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 007. Message number 524.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-525',
    channelId: 'channel-007',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 007. Message number 525.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-526',
    channelId: 'channel-007',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 007. Message number 526.',
    timestamp: daysAgo(53),
  },
  {
    id: 'msg-527',
    channelId: 'channel-007',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 007. Message number 527.',
    timestamp: daysAgo(43),
  },
  {
    id: 'msg-528',
    channelId: 'channel-007',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 007. Message number 528.',
    timestamp: daysAgo(53),
  },
  {
    id: 'msg-529',
    channelId: 'channel-007',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 007. Message number 529.',
    timestamp: daysAgo(54),
  },
  {
    id: 'msg-530',
    channelId: 'channel-007',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 007. Message number 530.',
    timestamp: daysAgo(43),
  },
];

// ─── Harmony HQ — #moderation-log (channel-008, PRIVATE) ─────────────────────

const ch008: Message[] = [
  {
    id: 'msg-601',
    channelId: 'channel-008',
    authorId: bob.id,
    author: bob,
    content:
      '[LOG] user-008 (henry_guest) joined the server. Monitoring activity as per standard new-member protocol.',
    timestamp: daysAgo(20),
  },
  {
    id: 'msg-602',
    channelId: 'channel-008',
    authorId: bob.id,
    author: bob,
    content:
      '[LOG] user-008 posting in #introductions and #general. Behaviour normal, no concerns.',
    timestamp: daysAgo(18),
  },
  {
    id: 'msg-603',
    channelId: 'channel-008',
    authorId: alice.id,
    author: alice,
    content:
      "[LOG] Promoted user-008 to 'member' role after 7-day observation period. No incidents.",
    timestamp: daysAgo(13),
  },
  {
    id: 'msg-604',
    channelId: 'channel-008',
    authorId: bob.id,
    author: bob,
    content:
      '[LOG] Deleted a spam message from an unknown account (now banned). Message contained a phishing link.',
    timestamp: daysAgo(8),
  },
  {
    id: 'msg-605',
    channelId: 'channel-008',
    authorId: alice.id,
    author: alice,
    content: '[LOG] IP ban applied to the spam account. Added domain to blocklist.',
    timestamp: daysAgo(8, -1),
  },
  {
    id: 'msg-606',
    channelId: 'channel-008',
    authorId: bob.id,
    author: bob,
    content:
      '[LOG] Edited a message in #general that contained accidental PII (email address). User was notified privately.',
    timestamp: daysAgo(5),
  },
  {
    id: 'msg-607',
    channelId: 'channel-008',
    authorId: alice.id,
    author: alice,
    content:
      '[LOG] user-003 (carol_dev) given mod permissions temporarily while Bob is on holiday.',
    timestamp: daysAgo(3),
  },
  {
    id: 'msg-608',
    channelId: 'channel-008',
    authorId: carol.id,
    author: carol,
    content: '[LOG] Taking over mod duties. No incidents to report during the handoff period.',
    timestamp: daysAgo(3, -1),
  },
  {
    id: 'msg-609',
    channelId: 'channel-008',
    authorId: bob.id,
    author: bob,
    content: '[LOG] Back from holiday. Reassuming mod role.',
    timestamp: daysAgo(1),
  },
  {
    id: 'msg-610',
    channelId: 'channel-008',
    authorId: carol.id,
    author: carol,
    content: '[LOG] Mod permissions revoked. All quiet during the handoff. 👍',
    timestamp: daysAgo(1, -1),
  },
  {
    id: 'msg-611',
    channelId: 'channel-008',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 611.',
    timestamp: daysAgo(31),
  },
  {
    id: 'msg-612',
    channelId: 'channel-008',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 612.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-613',
    channelId: 'channel-008',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 613.',
    timestamp: daysAgo(53),
  },
  {
    id: 'msg-614',
    channelId: 'channel-008',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 614.',
    timestamp: daysAgo(45),
  },
  {
    id: 'msg-615',
    channelId: 'channel-008',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 615.',
    timestamp: daysAgo(42),
  },
  {
    id: 'msg-616',
    channelId: 'channel-008',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 616.',
    timestamp: daysAgo(54),
  },
  {
    id: 'msg-617',
    channelId: 'channel-008',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 617.',
    timestamp: daysAgo(38),
  },
  {
    id: 'msg-618',
    channelId: 'channel-008',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 618.',
    timestamp: daysAgo(50),
  },
  {
    id: 'msg-619',
    channelId: 'channel-008',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 619.',
    timestamp: daysAgo(55),
  },
  {
    id: 'msg-620',
    channelId: 'channel-008',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 620.',
    timestamp: daysAgo(59),
  },
  {
    id: 'msg-621',
    channelId: 'channel-008',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 621.',
    timestamp: daysAgo(37),
  },
  {
    id: 'msg-622',
    channelId: 'channel-008',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 622.',
    timestamp: daysAgo(31),
  },
  {
    id: 'msg-623',
    channelId: 'channel-008',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 623.',
    timestamp: daysAgo(50),
  },
  {
    id: 'msg-624',
    channelId: 'channel-008',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 624.',
    timestamp: daysAgo(52),
  },
  {
    id: 'msg-625',
    channelId: 'channel-008',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 625.',
    timestamp: daysAgo(37),
  },
  {
    id: 'msg-626',
    channelId: 'channel-008',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 626.',
    timestamp: daysAgo(39),
  },
  {
    id: 'msg-627',
    channelId: 'channel-008',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 627.',
    timestamp: daysAgo(44),
  },
  {
    id: 'msg-628',
    channelId: 'channel-008',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 628.',
    timestamp: daysAgo(34),
  },
  {
    id: 'msg-629',
    channelId: 'channel-008',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 629.',
    timestamp: daysAgo(42),
  },
  {
    id: 'msg-630',
    channelId: 'channel-008',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 008. Message number 630.',
    timestamp: daysAgo(48),
  },
];

// ─── Harmony HQ — #showcase (channel-009) ────────────────────────────────────

const ch009: Message[] = [
  {
    id: 'msg-701',
    channelId: 'channel-009',
    authorId: eve.id,
    author: eve,
    content:
      'First showcase post! Here are the initial wireframes for the Harmony layout. Three-column Discord-style, dark theme. What do you think?',
    timestamp: daysAgo(12),
    reactions: [
      {
        emoji: '🔥',
        count: 6,
        userIds: ['user-001', 'user-002', 'user-003', 'user-004', 'user-006', 'user-007'],
      },
    ],
  },
  {
    id: 'msg-702',
    channelId: 'channel-009',
    authorId: alice.id,
    author: alice,
    content:
      'These look great Eve! The sidebar proportions are spot on. Love the server icon pill animation idea.',
    timestamp: daysAgo(12, -1),
  },
  {
    id: 'msg-703',
    channelId: 'channel-009',
    authorId: carol.id,
    author: carol,
    content: 'The hash icon styling for channels is a nice touch. Very Discord-native.',
    timestamp: daysAgo(12, -2),
  },
  {
    id: 'msg-704',
    channelId: 'channel-009',
    authorId: eve.id,
    author: eve,
    content:
      'Updated the mockups with status indicator dots and the member sidebar role groupings. Much cleaner now.',
    timestamp: daysAgo(9),
    reactions: [
      { emoji: '😍', count: 4, userIds: ['user-001', 'user-003', 'user-006', 'user-007'] },
    ],
  },
  {
    id: 'msg-705',
    channelId: 'channel-009',
    authorId: frank.id,
    author: frank,
    content:
      'Showing off my contribution: the mock service layer architecture diagram. Services → Mock Data → Components.',
    timestamp: daysAgo(7),
  },
  {
    id: 'msg-706',
    channelId: 'channel-009',
    authorId: dave.id,
    author: dave,
    content:
      'Really clean architecture Frank. The in-memory mutation pattern for `updateVisibility` is elegant.',
    timestamp: daysAgo(7, -1),
  },
  {
    id: 'msg-707',
    channelId: 'channel-009',
    authorId: carol.id,
    author: carol,
    content:
      "Here's a screenshot of the SearchModal in action — highlighted results look great! Ctrl+K is so satisfying to use.",
    timestamp: daysAgo(4),
    reactions: [
      {
        emoji: '🔍',
        count: 5,
        userIds: ['user-001', 'user-002', 'user-005', 'user-006', 'user-009'],
      },
    ],
  },
  {
    id: 'msg-708',
    channelId: 'channel-009',
    authorId: iris.id,
    author: iris,
    content:
      'Sharing my QA demo recording. Shows the VisibilityGuard switching between PUBLIC and PRIVATE states. Works perfectly!',
    timestamp: daysAgo(2),
  },
  {
    id: 'msg-709',
    channelId: 'channel-009',
    authorId: alice.id,
    author: alice,
    content:
      'That VisibilityGuard demo is exactly what the professor will want to see. The lock icon + CTA buttons look polished.',
    timestamp: daysAgo(2, -1),
    reactions: [
      { emoji: '💯', count: 4, userIds: ['user-003', 'user-005', 'user-007', 'user-009'] },
    ],
  },
  {
    id: 'msg-710',
    channelId: 'channel-009',
    authorId: eve.id,
    author: eve,
    content:
      'Final design handoff: updated color system, spacing tokens, and dark theme palette all documented.',
    timestamp: daysAgo(1),
  },
  {
    id: 'msg-711',
    channelId: 'channel-009',
    authorId: carol.id,
    author: carol,
    content:
      'App is live in dev! Browse to localhost:3000 and the full Discord-like shell is running. 🎉',
    timestamp: hoursAgo(10),
    reactions: [
      {
        emoji: '🎉',
        count: 7,
        userIds: [
          'user-001',
          'user-002',
          'user-004',
          'user-005',
          'user-006',
          'user-007',
          'user-009',
        ],
      },
    ],
  },
  {
    id: 'msg-712',
    channelId: 'channel-009',
    authorId: henry.id,
    author: henry,
    content: 'Just tried it — looks amazing! Feels just like Discord. Really impressive work team.',
    timestamp: hoursAgo(8),
    reactions: [
      {
        emoji: '❤️',
        count: 5,
        userIds: ['user-001', 'user-003', 'user-005', 'user-007', 'user-009'],
      },
    ],
  },
  {
    id: 'msg-713',
    channelId: 'channel-009',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 713.',
    timestamp: daysAgo(41),
  },
  {
    id: 'msg-714',
    channelId: 'channel-009',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 714.',
    timestamp: daysAgo(49),
  },
  {
    id: 'msg-715',
    channelId: 'channel-009',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 715.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-716',
    channelId: 'channel-009',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 716.',
    timestamp: daysAgo(60),
  },
  {
    id: 'msg-717',
    channelId: 'channel-009',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 717.',
    timestamp: daysAgo(51),
  },
  {
    id: 'msg-718',
    channelId: 'channel-009',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 718.',
    timestamp: daysAgo(35),
  },
  {
    id: 'msg-719',
    channelId: 'channel-009',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 719.',
    timestamp: daysAgo(40),
  },
  {
    id: 'msg-720',
    channelId: 'channel-009',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 720.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-721',
    channelId: 'channel-009',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 721.',
    timestamp: daysAgo(39),
  },
  {
    id: 'msg-722',
    channelId: 'channel-009',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 722.',
    timestamp: daysAgo(40),
  },
  {
    id: 'msg-723',
    channelId: 'channel-009',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 723.',
    timestamp: daysAgo(48),
  },
  {
    id: 'msg-724',
    channelId: 'channel-009',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 724.',
    timestamp: daysAgo(40),
  },
  {
    id: 'msg-725',
    channelId: 'channel-009',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 725.',
    timestamp: daysAgo(54),
  },
  {
    id: 'msg-726',
    channelId: 'channel-009',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 726.',
    timestamp: daysAgo(45),
  },
  {
    id: 'msg-727',
    channelId: 'channel-009',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 727.',
    timestamp: daysAgo(47),
  },
  {
    id: 'msg-728',
    channelId: 'channel-009',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 728.',
    timestamp: daysAgo(51),
  },
  {
    id: 'msg-729',
    channelId: 'channel-009',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 729.',
    timestamp: daysAgo(32),
  },
  {
    id: 'msg-730',
    channelId: 'channel-009',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 009. Message number 730.',
    timestamp: daysAgo(38),
  },
];

// ─── Open Source Hub — #welcome (channel-101) ────────────────────────────────

const ch101: Message[] = [
  {
    id: 'msg-801',
    channelId: 'channel-101',
    authorId: bob.id,
    author: bob,
    content:
      'Welcome to Open Source Hub! 🌍 This is the place to connect with open source contributors, share projects, and find collaborators.',
    timestamp: daysAgo(30),
    reactions: [
      {
        emoji: '🎉',
        count: 5,
        userIds: ['user-003', 'user-004', 'user-005', 'user-007', 'user-009'],
      },
    ],
  },
  {
    id: 'msg-802',
    channelId: 'channel-101',
    authorId: carol.id,
    author: carol,
    content:
      'Happy to be here! Big fan of open source. Currently maintaining a small TS utility library.',
    timestamp: daysAgo(25),
  },
  {
    id: 'msg-803',
    channelId: 'channel-101',
    authorId: dave.id,
    author: dave,
    content:
      "Same here. I've been contributing to open source for about 3 years. Love how collaborative it is.",
    timestamp: daysAgo(20),
  },
  {
    id: 'msg-804',
    channelId: 'channel-101',
    authorId: frank.id,
    author: frank,
    content:
      'First time in a dedicated OSS community server! Really looking forward to the discussions here.',
    timestamp: daysAgo(15),
  },
  {
    id: 'msg-805',
    channelId: 'channel-101',
    authorId: henry.id,
    author: henry,
    content:
      "Hi everyone! I'm relatively new to contributing but I'm learning fast. Any tips for first-time contributors?",
    timestamp: daysAgo(12),
  },
  {
    id: 'msg-806',
    channelId: 'channel-101',
    authorId: carol.id,
    author: carol,
    content:
      "@henry_guest Start with 'good first issue' labels on GitHub. Read the CONTRIBUTING.md before opening a PR. And don't be afraid to ask questions!",
    timestamp: daysAgo(12, -1),
    reactions: [{ emoji: '💡', count: 3, userIds: ['user-008', 'user-004', 'user-007'] }],
  },
  {
    id: 'msg-807',
    channelId: 'channel-101',
    authorId: bob.id,
    author: bob,
    content:
      'Also: good documentation PRs are often overlooked and very welcome. Fixing typos in docs is a great first contribution!',
    timestamp: daysAgo(12, -2),
  },
  {
    id: 'msg-808',
    channelId: 'channel-101',
    authorId: henry.id,
    author: henry,
    content: "Thanks! That's really helpful. I'll look for some docs issues to start with.",
    timestamp: daysAgo(11),
  },
  {
    id: 'msg-809',
    channelId: 'channel-101',
    authorId: iris.id,
    author: iris,
    content:
      'Adding to the tips: writing tests for untested code is also a great way to contribute and learn the codebase at the same time.',
    timestamp: daysAgo(10),
  },
  {
    id: 'msg-810',
    channelId: 'channel-101',
    authorId: dave.id,
    author: dave,
    content:
      'This server is exactly what I needed. Already found two projects in #projects worth contributing to!',
    timestamp: daysAgo(7),
    reactions: [{ emoji: '🙌', count: 3, userIds: ['user-002', 'user-007', 'user-009'] }],
  },
  {
    id: 'msg-811',
    channelId: 'channel-101',
    authorId: bob.id,
    author: bob,
    content:
      'Weekly reminder: post your projects in #projects and any open help requests in #help-wanted. Active community = better OSS!',
    timestamp: daysAgo(3),
  },
  {
    id: 'msg-812',
    channelId: 'channel-101',
    authorId: henry.id,
    author: henry,
    content: "Just opened my first PR! It's a small docs fix but I'm really proud of it. 🎉",
    timestamp: daysAgo(1),
    reactions: [
      {
        emoji: '🎉',
        count: 5,
        userIds: ['user-002', 'user-003', 'user-004', 'user-007', 'user-009'],
      },
    ],
  },
  {
    id: 'msg-813',
    channelId: 'channel-101',
    authorId: alice.id,
    author: alice,
    content: 'Congrats Henry! The first PR is always the hardest. Many more to come! 💪',
    timestamp: hoursAgo(20),
  },
  {
    id: 'msg-814',
    channelId: 'channel-101',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 101. Message number 814.',
    timestamp: daysAgo(50),
  },
  {
    id: 'msg-815',
    channelId: 'channel-101',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 101. Message number 815.',
    timestamp: daysAgo(31),
  },
  {
    id: 'msg-816',
    channelId: 'channel-101',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 101. Message number 816.',
    timestamp: daysAgo(60),
  },
  {
    id: 'msg-817',
    channelId: 'channel-101',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 101. Message number 817.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-818',
    channelId: 'channel-101',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 101. Message number 818.',
    timestamp: daysAgo(60),
  },
  {
    id: 'msg-819',
    channelId: 'channel-101',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 101. Message number 819.',
    timestamp: daysAgo(38),
  },
  {
    id: 'msg-820',
    channelId: 'channel-101',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 101. Message number 820.',
    timestamp: daysAgo(32),
  },
  {
    id: 'msg-821',
    channelId: 'channel-101',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 101. Message number 821.',
    timestamp: daysAgo(53),
  },
  {
    id: 'msg-822',
    channelId: 'channel-101',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 101. Message number 822.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-823',
    channelId: 'channel-101',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 101. Message number 823.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-824',
    channelId: 'channel-101',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 101. Message number 824.',
    timestamp: daysAgo(43),
  },
  {
    id: 'msg-825',
    channelId: 'channel-101',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 101. Message number 825.',
    timestamp: daysAgo(50),
  },
  {
    id: 'msg-826',
    channelId: 'channel-101',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 101. Message number 826.',
    timestamp: daysAgo(39),
  },
  {
    id: 'msg-827',
    channelId: 'channel-101',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 101. Message number 827.',
    timestamp: daysAgo(44),
  },
  {
    id: 'msg-828',
    channelId: 'channel-101',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 101. Message number 828.',
    timestamp: daysAgo(39),
  },
  {
    id: 'msg-829',
    channelId: 'channel-101',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 101. Message number 829.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-830',
    channelId: 'channel-101',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 101. Message number 830.',
    timestamp: daysAgo(50),
  },
];

// ─── Open Source Hub — #projects (channel-102) ───────────────────────────────

const ch102: Message[] = [
  {
    id: 'msg-901',
    channelId: 'channel-102',
    authorId: carol.id,
    author: carol,
    content:
      '🚀 **ts-result** — A TypeScript Result/Either monad library. Zero dependencies, <2kb gzipped. Feedback welcome! github.com/carol/ts-result',
    timestamp: daysAgo(20),
    reactions: [
      { emoji: '⭐', count: 4, userIds: ['user-002', 'user-004', 'user-007', 'user-009'] },
    ],
  },
  {
    id: 'msg-902',
    channelId: 'channel-102',
    authorId: dave.id,
    author: dave,
    content:
      '🚀 **next-cache-utils** — Helper utilities for Next.js App Router caching patterns. Saves a lot of boilerplate. github.com/dave/next-cache-utils',
    timestamp: daysAgo(18),
  },
  {
    id: 'msg-903',
    channelId: 'channel-102',
    authorId: frank.id,
    author: frank,
    content:
      '🚀 **docker-compose-dev** — Production-ready docker-compose templates for Node/Next.js apps with Redis and Postgres. github.com/frank/docker-compose-dev',
    timestamp: daysAgo(15),
    reactions: [
      {
        emoji: '🐳',
        count: 5,
        userIds: ['user-001', 'user-002', 'user-003', 'user-004', 'user-007'],
      },
    ],
  },
  {
    id: 'msg-904',
    channelId: 'channel-102',
    authorId: carol.id,
    author: carol,
    content:
      '@dave Love `next-cache-utils`! I was writing a very similar thing. Mind if I contribute?',
    timestamp: daysAgo(14),
  },
  {
    id: 'msg-905',
    channelId: 'channel-102',
    authorId: dave.id,
    author: dave,
    content: 'Absolutely! Issues are open, PRs welcome. Would love the help.',
    timestamp: daysAgo(14, -1),
  },
  {
    id: 'msg-906',
    channelId: 'channel-102',
    authorId: iris.id,
    author: iris,
    content:
      '🚀 **a11y-checker** — Automated accessibility audit tool for React apps. Integrates with Jest and CI. github.com/iris/a11y-checker',
    timestamp: daysAgo(12),
  },
  {
    id: 'msg-907',
    channelId: 'channel-102',
    authorId: bob.id,
    author: bob,
    content: 'Great project Iris! A11y tooling is severely underrepresented in the OSS space.',
    timestamp: daysAgo(12, -1),
    reactions: [{ emoji: '♿', count: 3, userIds: ['user-007', 'user-009', 'user-001'] }],
  },
  {
    id: 'msg-908',
    channelId: 'channel-102',
    authorId: henry.id,
    author: henry,
    content:
      'Looking for collaborators on a small personal finance CLI tool (Node.js, TypeScript). Nothing fancy, but could use a second pair of eyes.',
    timestamp: daysAgo(8),
  },
  {
    id: 'msg-909',
    channelId: 'channel-102',
    authorId: dave.id,
    author: dave,
    content: 'Happy to take a look Henry! DM me the repo link.',
    timestamp: daysAgo(8, -1),
  },
  {
    id: 'msg-910',
    channelId: 'channel-102',
    authorId: jack.id,
    author: jack,
    content:
      '🚀 **k8s-local-dev** — Lightweight Kubernetes setup for local development using k3d. Works great for Next.js + Redis + Postgres. github.com/jack/k8s-local-dev',
    timestamp: daysAgo(5),
  },
  {
    id: 'msg-911',
    channelId: 'channel-102',
    authorId: frank.id,
    author: frank,
    content: '@jack This is gold. Bookmarking immediately.',
    timestamp: daysAgo(5, -1),
    reactions: [{ emoji: '🔖', count: 3, userIds: ['user-002', 'user-004', 'user-009'] }],
  },
  {
    id: 'msg-912',
    channelId: 'channel-102',
    authorId: carol.id,
    author: carol,
    content:
      'Update on ts-result: v1.2.0 released with async Result type support! Changelog in the repo.',
    timestamp: daysAgo(2),
  },
  {
    id: 'msg-913',
    channelId: 'channel-102',
    authorId: alice.id,
    author: alice,
    content:
      'Reminder: add your projects to the pinned list at the top of this channel so newcomers can find them easily!',
    timestamp: daysAgo(1),
  },
  {
    id: 'msg-914',
    channelId: 'channel-102',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 102. Message number 914.',
    timestamp: daysAgo(40),
  },
  {
    id: 'msg-915',
    channelId: 'channel-102',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 102. Message number 915.',
    timestamp: daysAgo(34),
  },
  {
    id: 'msg-916',
    channelId: 'channel-102',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 102. Message number 916.',
    timestamp: daysAgo(52),
  },
  {
    id: 'msg-917',
    channelId: 'channel-102',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 102. Message number 917.',
    timestamp: daysAgo(45),
  },
  {
    id: 'msg-918',
    channelId: 'channel-102',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 102. Message number 918.',
    timestamp: daysAgo(50),
  },
  {
    id: 'msg-919',
    channelId: 'channel-102',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 102. Message number 919.',
    timestamp: daysAgo(47),
  },
  {
    id: 'msg-920',
    channelId: 'channel-102',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 102. Message number 920.',
    timestamp: daysAgo(33),
  },
  {
    id: 'msg-921',
    channelId: 'channel-102',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 102. Message number 921.',
    timestamp: daysAgo(41),
  },
  {
    id: 'msg-922',
    channelId: 'channel-102',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 102. Message number 922.',
    timestamp: daysAgo(56),
  },
  {
    id: 'msg-923',
    channelId: 'channel-102',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 102. Message number 923.',
    timestamp: daysAgo(41),
  },
  {
    id: 'msg-924',
    channelId: 'channel-102',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 102. Message number 924.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-925',
    channelId: 'channel-102',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 102. Message number 925.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-926',
    channelId: 'channel-102',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 102. Message number 926.',
    timestamp: daysAgo(49),
  },
  {
    id: 'msg-927',
    channelId: 'channel-102',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 102. Message number 927.',
    timestamp: daysAgo(50),
  },
  {
    id: 'msg-928',
    channelId: 'channel-102',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 102. Message number 928.',
    timestamp: daysAgo(43),
  },
  {
    id: 'msg-929',
    channelId: 'channel-102',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 102. Message number 929.',
    timestamp: daysAgo(54),
  },
  {
    id: 'msg-930',
    channelId: 'channel-102',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 102. Message number 930.',
    timestamp: daysAgo(60),
  },
];

// ─── Open Source Hub — #help-wanted (channel-103) ────────────────────────────

const ch103: Message[] = [
  {
    id: 'msg-1001',
    channelId: 'channel-103',
    authorId: carol.id,
    author: carol,
    content:
      '**Help wanted on ts-result:** Looking for someone to write a Zod integration. Should be comfortable with TypeScript generics. Check the open issue for specs.',
    timestamp: daysAgo(15),
  },
  {
    id: 'msg-1002',
    channelId: 'channel-103',
    authorId: dave.id,
    author: dave,
    content:
      'I can take a look at that Zod integration! I use Zod a lot. Will comment on the issue.',
    timestamp: daysAgo(15, -1),
  },
  {
    id: 'msg-1003',
    channelId: 'channel-103',
    authorId: carol.id,
    author: carol,
    content: "Amazing! I'll assign you to the issue. Feel free to DM with questions.",
    timestamp: daysAgo(14),
  },
  {
    id: 'msg-1004',
    channelId: 'channel-103',
    authorId: iris.id,
    author: iris,
    content:
      '**Help wanted on a11y-checker:** Need someone to write E2E test fixtures. Jest experience needed. Small scope, good for first contribution!',
    timestamp: daysAgo(12),
  },
  {
    id: 'msg-1005',
    channelId: 'channel-103',
    authorId: henry.id,
    author: henry,
    content: "I'd love to try the a11y-checker fixtures task! Jest is something I'm learning.",
    timestamp: daysAgo(12, -1),
  },
  {
    id: 'msg-1006',
    channelId: 'channel-103',
    authorId: iris.id,
    author: iris,
    content: "Perfect Henry! I'll pair with you on it. Great learning opportunity.",
    timestamp: daysAgo(11),
  },
  {
    id: 'msg-1007',
    channelId: 'channel-103',
    authorId: frank.id,
    author: frank,
    content:
      '**Help wanted on docker-compose-dev:** Need someone to add a MongoDB variant. Docker experience required.',
    timestamp: daysAgo(10),
  },
  {
    id: 'msg-1008',
    channelId: 'channel-103',
    authorId: jack.id,
    author: jack,
    content: "I can do the MongoDB variant Frank. I've written similar compose files before.",
    timestamp: daysAgo(10, -1),
  },
  {
    id: 'msg-1009',
    channelId: 'channel-103',
    authorId: frank.id,
    author: frank,
    content: 'Fantastic! PR template is in the repo. Looking forward to the contribution.',
    timestamp: daysAgo(9),
  },
  {
    id: 'msg-1010',
    channelId: 'channel-103',
    authorId: bob.id,
    author: bob,
    content:
      '**Help wanted:** Seeking someone to set up GitHub Actions CI for a small Go CLI project. Should take 2-3 hours max.',
    timestamp: daysAgo(7),
  },
  {
    id: 'msg-1011',
    channelId: 'channel-103',
    authorId: jack.id,
    author: jack,
    content: "That's right in my wheelhouse Bob. Drop the repo link.",
    timestamp: daysAgo(7, -1),
  },
  {
    id: 'msg-1012',
    channelId: 'channel-103',
    authorId: dave.id,
    author: dave,
    content:
      'Update: Zod integration for ts-result is done! PR is under review. Learned a lot about conditional types in the process.',
    timestamp: daysAgo(3),
    reactions: [
      { emoji: '🎉', count: 4, userIds: ['user-003', 'user-007', 'user-009', 'user-001'] },
    ],
  },
  {
    id: 'msg-1013',
    channelId: 'channel-103',
    authorId: carol.id,
    author: carol,
    content: '@dave PR looks great! Merging now. Thank you so much for the contribution!',
    timestamp: daysAgo(2),
  },
  {
    id: 'msg-1014',
    channelId: 'channel-103',
    authorId: henry.id,
    author: henry,
    content:
      'Update: a11y-checker fixtures PR is up! Iris reviewed it and it looks good. This was such a good learning experience!',
    timestamp: daysAgo(1),
    reactions: [
      {
        emoji: '💪',
        count: 5,
        userIds: ['user-002', 'user-003', 'user-004', 'user-007', 'user-009'],
      },
    ],
  },
  {
    id: 'msg-1015',
    channelId: 'channel-103',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 103. Message number 1015.',
    timestamp: daysAgo(55),
  },
  {
    id: 'msg-1016',
    channelId: 'channel-103',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 103. Message number 1016.',
    timestamp: daysAgo(33),
  },
  {
    id: 'msg-1017',
    channelId: 'channel-103',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 103. Message number 1017.',
    timestamp: daysAgo(42),
  },
  {
    id: 'msg-1018',
    channelId: 'channel-103',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 103. Message number 1018.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-1019',
    channelId: 'channel-103',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 103. Message number 1019.',
    timestamp: daysAgo(44),
  },
  {
    id: 'msg-1020',
    channelId: 'channel-103',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 103. Message number 1020.',
    timestamp: daysAgo(33),
  },
  {
    id: 'msg-1021',
    channelId: 'channel-103',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 103. Message number 1021.',
    timestamp: daysAgo(34),
  },
  {
    id: 'msg-1022',
    channelId: 'channel-103',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 103. Message number 1022.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-1023',
    channelId: 'channel-103',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 103. Message number 1023.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-1024',
    channelId: 'channel-103',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 103. Message number 1024.',
    timestamp: daysAgo(45),
  },
  {
    id: 'msg-1025',
    channelId: 'channel-103',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 103. Message number 1025.',
    timestamp: daysAgo(47),
  },
  {
    id: 'msg-1026',
    channelId: 'channel-103',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 103. Message number 1026.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-1027',
    channelId: 'channel-103',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 103. Message number 1027.',
    timestamp: daysAgo(44),
  },
  {
    id: 'msg-1028',
    channelId: 'channel-103',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 103. Message number 1028.',
    timestamp: daysAgo(37),
  },
  {
    id: 'msg-1029',
    channelId: 'channel-103',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 103. Message number 1029.',
    timestamp: daysAgo(38),
  },
  {
    id: 'msg-1030',
    channelId: 'channel-103',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 103. Message number 1030.',
    timestamp: daysAgo(54),
  },
];

// ─── Open Source Hub — #contributors-lounge (channel-104) ────────────────────

const ch104: Message[] = [
  {
    id: 'msg-1101',
    channelId: 'channel-104',
    authorId: carol.id,
    author: carol,
    content: 'Happy Friday contributors! What are you all working on this weekend?',
    timestamp: daysAgo(9),
  },
  {
    id: 'msg-1102',
    channelId: 'channel-104',
    authorId: dave.id,
    author: dave,
    content:
      'Working on the Zod integration for ts-result. Conditional types are melting my brain a little 😅',
    timestamp: daysAgo(9, -1),
  },
  {
    id: 'msg-1103',
    channelId: 'channel-104',
    authorId: iris.id,
    author: iris,
    content: 'Rest! But also maybe some a11y research for my next feature 😂',
    timestamp: daysAgo(9, -2),
  },
  {
    id: 'msg-1104',
    channelId: 'channel-104',
    authorId: frank.id,
    author: frank,
    content: "Anyone else use Raycast? Just discovered it and it's completely changed my workflow.",
    timestamp: daysAgo(7),
  },
  {
    id: 'msg-1105',
    channelId: 'channel-104',
    authorId: carol.id,
    author: carol,
    content: 'Yes! Raycast is amazing. The clipboard history alone is worth it.',
    timestamp: daysAgo(7, -1),
    reactions: [{ emoji: '🔥', count: 3, userIds: ['user-006', 'user-004', 'user-009'] }],
  },
  {
    id: 'msg-1106',
    channelId: 'channel-104',
    authorId: dave.id,
    author: dave,
    content: 'Hot take: `Array.prototype.at(-1)` is one of the best recent JS additions.',
    timestamp: daysAgo(5),
  },
  {
    id: 'msg-1107',
    channelId: 'channel-104',
    authorId: iris.id,
    author: iris,
    content:
      'Agreed. I still occasionally forget it exists and write `arr[arr.length - 1]` out of habit.',
    timestamp: daysAgo(5, -1),
  },
  {
    id: 'msg-1108',
    channelId: 'channel-104',
    authorId: carol.id,
    author: carol,
    content: 'Same 😭 Muscle memory is hard to override.',
    timestamp: daysAgo(4),
  },
  {
    id: 'msg-1109',
    channelId: 'channel-104',
    authorId: frank.id,
    author: frank,
    content:
      'Anyone have a good resource for learning Rust? I keep seeing it mentioned in OSS circles.',
    timestamp: daysAgo(3),
  },
  {
    id: 'msg-1110',
    channelId: 'channel-104',
    authorId: dave.id,
    author: dave,
    content: 'The Rust Book (doc.rust-lang.org/book) is excellent. Free and very thorough.',
    timestamp: daysAgo(3, -1),
  },
  {
    id: 'msg-1111',
    channelId: 'channel-104',
    authorId: jack.id,
    author: jack,
    content:
      'Also: Rustlings on GitHub is a great hands-on learning tool. Small exercises to build intuition.',
    timestamp: daysAgo(2),
  },
  {
    id: 'msg-1112',
    channelId: 'channel-104',
    authorId: iris.id,
    author: iris,
    content:
      "Sharing a useful tip: `git bisect` has saved me hours of debugging this week. If you haven't used it, learn it!",
    timestamp: daysAgo(1),
    reactions: [
      { emoji: '💡', count: 4, userIds: ['user-003', 'user-004', 'user-006', 'user-007'] },
    ],
  },
  {
    id: 'msg-1113',
    channelId: 'channel-104',
    authorId: carol.id,
    author: carol,
    content:
      "@iris YES. `git bisect` is criminally underused. It's magical for regression hunting.",
    timestamp: hoursAgo(20),
  },
  {
    id: 'msg-1114',
    channelId: 'channel-104',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 104. Message number 1114.',
    timestamp: daysAgo(54),
  },
  {
    id: 'msg-1115',
    channelId: 'channel-104',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 104. Message number 1115.',
    timestamp: daysAgo(58),
  },
  {
    id: 'msg-1116',
    channelId: 'channel-104',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 104. Message number 1116.',
    timestamp: daysAgo(57),
  },
  {
    id: 'msg-1117',
    channelId: 'channel-104',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 104. Message number 1117.',
    timestamp: daysAgo(38),
  },
  {
    id: 'msg-1118',
    channelId: 'channel-104',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 104. Message number 1118.',
    timestamp: daysAgo(51),
  },
  {
    id: 'msg-1119',
    channelId: 'channel-104',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 104. Message number 1119.',
    timestamp: daysAgo(58),
  },
  {
    id: 'msg-1120',
    channelId: 'channel-104',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 104. Message number 1120.',
    timestamp: daysAgo(34),
  },
  {
    id: 'msg-1121',
    channelId: 'channel-104',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 104. Message number 1121.',
    timestamp: daysAgo(53),
  },
  {
    id: 'msg-1122',
    channelId: 'channel-104',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 104. Message number 1122.',
    timestamp: daysAgo(58),
  },
  {
    id: 'msg-1123',
    channelId: 'channel-104',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 104. Message number 1123.',
    timestamp: daysAgo(49),
  },
  {
    id: 'msg-1124',
    channelId: 'channel-104',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 104. Message number 1124.',
    timestamp: daysAgo(39),
  },
  {
    id: 'msg-1125',
    channelId: 'channel-104',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 104. Message number 1125.',
    timestamp: daysAgo(58),
  },
  {
    id: 'msg-1126',
    channelId: 'channel-104',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 104. Message number 1126.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-1127',
    channelId: 'channel-104',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 104. Message number 1127.',
    timestamp: daysAgo(57),
  },
  {
    id: 'msg-1128',
    channelId: 'channel-104',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 104. Message number 1128.',
    timestamp: daysAgo(54),
  },
  {
    id: 'msg-1129',
    channelId: 'channel-104',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 104. Message number 1129.',
    timestamp: daysAgo(55),
  },
  {
    id: 'msg-1130',
    channelId: 'channel-104',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 104. Message number 1130.',
    timestamp: daysAgo(30),
  },
];

// ─── Open Source Hub — #maintainers (channel-105, PRIVATE) ───────────────────

const ch105: Message[] = [
  {
    id: 'msg-1201',
    channelId: 'channel-105',
    authorId: bob.id,
    author: bob,
    content:
      'Maintainers channel. For discussing project governance, roadmap, and non-public decisions.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-1202',
    channelId: 'channel-105',
    authorId: carol.id,
    author: carol,
    content:
      'Should we set up a CODEOWNERS file for the main projects? It would help route PR reviews correctly.',
    timestamp: daysAgo(15),
  },
  {
    id: 'msg-1203',
    channelId: 'channel-105',
    authorId: bob.id,
    author: bob,
    content:
      "Good idea. I'll draft one for ts-result and a11y-checker. Can you do docker-compose-dev?",
    timestamp: daysAgo(15, -1),
  },
  {
    id: 'msg-1204',
    channelId: 'channel-105',
    authorId: carol.id,
    author: carol,
    content: "Sure, I'll ping Frank to help since it's his project.",
    timestamp: daysAgo(14),
  },
  {
    id: 'msg-1205',
    channelId: 'channel-105',
    authorId: frank.id,
    author: frank,
    content: 'Just saw the ping — happy to set up CODEOWNERS for docker-compose-dev.',
    timestamp: daysAgo(13),
  },
  {
    id: 'msg-1206',
    channelId: 'channel-105',
    authorId: bob.id,
    author: bob,
    content:
      'Roadmap discussion: should we adopt Conventional Commits across all projects? Makes changelogs automated.',
    timestamp: daysAgo(10),
  },
  {
    id: 'msg-1207',
    channelId: 'channel-105',
    authorId: iris.id,
    author: iris,
    content:
      'Strongly in favour. `feat:`, `fix:`, `chore:` etc. is already how most of us commit anyway.',
    timestamp: daysAgo(10, -1),
  },
  {
    id: 'msg-1208',
    channelId: 'channel-105',
    authorId: carol.id,
    author: carol,
    content:
      "Agreed. I'll add a commitlint config to the template repo so new projects get it automatically.",
    timestamp: daysAgo(9),
  },
  {
    id: 'msg-1209',
    channelId: 'channel-105',
    authorId: bob.id,
    author: bob,
    content:
      'Should we require issue templates for bug reports and feature requests across all projects?',
    timestamp: daysAgo(5),
  },
  {
    id: 'msg-1210',
    channelId: 'channel-105',
    authorId: frank.id,
    author: frank,
    content:
      "Yes. I'll draft them this weekend. Bug report, feature request, and a blank template.",
    timestamp: daysAgo(4),
  },
  {
    id: 'msg-1211',
    channelId: 'channel-105',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1211.',
    timestamp: daysAgo(56),
  },
  {
    id: 'msg-1212',
    channelId: 'channel-105',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1212.',
    timestamp: daysAgo(59),
  },
  {
    id: 'msg-1213',
    channelId: 'channel-105',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1213.',
    timestamp: daysAgo(32),
  },
  {
    id: 'msg-1214',
    channelId: 'channel-105',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1214.',
    timestamp: daysAgo(50),
  },
  {
    id: 'msg-1215',
    channelId: 'channel-105',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1215.',
    timestamp: daysAgo(40),
  },
  {
    id: 'msg-1216',
    channelId: 'channel-105',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1216.',
    timestamp: daysAgo(39),
  },
  {
    id: 'msg-1217',
    channelId: 'channel-105',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1217.',
    timestamp: daysAgo(58),
  },
  {
    id: 'msg-1218',
    channelId: 'channel-105',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1218.',
    timestamp: daysAgo(33),
  },
  {
    id: 'msg-1219',
    channelId: 'channel-105',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1219.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-1220',
    channelId: 'channel-105',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1220.',
    timestamp: daysAgo(40),
  },
  {
    id: 'msg-1221',
    channelId: 'channel-105',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1221.',
    timestamp: daysAgo(32),
  },
  {
    id: 'msg-1222',
    channelId: 'channel-105',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1222.',
    timestamp: daysAgo(40),
  },
  {
    id: 'msg-1223',
    channelId: 'channel-105',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1223.',
    timestamp: daysAgo(35),
  },
  {
    id: 'msg-1224',
    channelId: 'channel-105',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1224.',
    timestamp: daysAgo(39),
  },
  {
    id: 'msg-1225',
    channelId: 'channel-105',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1225.',
    timestamp: daysAgo(31),
  },
  {
    id: 'msg-1226',
    channelId: 'channel-105',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1226.',
    timestamp: daysAgo(33),
  },
  {
    id: 'msg-1227',
    channelId: 'channel-105',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1227.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-1228',
    channelId: 'channel-105',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1228.',
    timestamp: daysAgo(32),
  },
  {
    id: 'msg-1229',
    channelId: 'channel-105',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1229.',
    timestamp: daysAgo(55),
  },
  {
    id: 'msg-1230',
    channelId: 'channel-105',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 105. Message number 1230.',
    timestamp: daysAgo(31),
  },
];

// ─── Open Source Hub — #release-notes (channel-107) ─────────────────────────

const ch107: Message[] = [
  {
    id: 'msg-1301',
    channelId: 'channel-107',
    authorId: carol.id,
    author: carol,
    content:
      '📦 **ts-result v1.0.0** — Initial release! Result<T, E> and Option<T> monads for TypeScript. Zero deps, fully typed.',
    timestamp: daysAgo(20),
  },
  {
    id: 'msg-1302',
    channelId: 'channel-107',
    authorId: carol.id,
    author: carol,
    content:
      '📦 **ts-result v1.1.0** — Added `mapErr`, `flatMapErr`, and `bimap` operators. See CHANGELOG.md.',
    timestamp: daysAgo(14),
  },
  {
    id: 'msg-1303',
    channelId: 'channel-107',
    authorId: iris.id,
    author: iris,
    content:
      '📦 **a11y-checker v0.1.0** — First public beta! WCAG 2.1 AA rules, Jest integration, CI-ready. Feedback very welcome.',
    timestamp: daysAgo(12),
    reactions: [
      { emoji: '🎉', count: 4, userIds: ['user-002', 'user-003', 'user-006', 'user-007'] },
    ],
  },
  {
    id: 'msg-1304',
    channelId: 'channel-107',
    authorId: frank.id,
    author: frank,
    content:
      '📦 **docker-compose-dev v2.0.0** — Major update. Added Redis Sentinel, Postgres replica, and health check configs. Breaking change: renamed `POSTGRES_DB_NAME` env var.',
    timestamp: daysAgo(10),
  },
  {
    id: 'msg-1305',
    channelId: 'channel-107',
    authorId: carol.id,
    author: carol,
    content:
      '📦 **ts-result v1.2.0** — Async Result type, Zod integration (thanks @dave_42!), and ESM/CJS dual build.',
    timestamp: daysAgo(3),
    reactions: [
      {
        emoji: '🚀',
        count: 5,
        userIds: ['user-002', 'user-004', 'user-006', 'user-007', 'user-009'],
      },
    ],
  },
  {
    id: 'msg-1306',
    channelId: 'channel-107',
    authorId: jack.id,
    author: jack,
    content:
      '📦 **k8s-local-dev v1.0.0** — Stable release! k3d-based local Kubernetes with Traefik ingress, auto-cert, and hot-reload support.',
    timestamp: daysAgo(1),
  },
  {
    id: 'msg-1307',
    channelId: 'channel-107',
    authorId: iris.id,
    author: iris,
    content:
      '📦 **a11y-checker v0.2.0** — E2E test fixtures added (thanks @henry_guest for the PR!), improved error messages, React 18 support.',
    timestamp: hoursAgo(6),
    reactions: [{ emoji: '🎉', count: 3, userIds: ['user-002', 'user-004', 'user-008'] }],
  },
  {
    id: 'msg-1308',
    channelId: 'channel-107',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1308.',
    timestamp: daysAgo(40),
  },
  {
    id: 'msg-1309',
    channelId: 'channel-107',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1309.',
    timestamp: daysAgo(57),
  },
  {
    id: 'msg-1310',
    channelId: 'channel-107',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1310.',
    timestamp: daysAgo(59),
  },
  {
    id: 'msg-1311',
    channelId: 'channel-107',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1311.',
    timestamp: daysAgo(34),
  },
  {
    id: 'msg-1312',
    channelId: 'channel-107',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1312.',
    timestamp: daysAgo(34),
  },
  {
    id: 'msg-1313',
    channelId: 'channel-107',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1313.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-1314',
    channelId: 'channel-107',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1314.',
    timestamp: daysAgo(42),
  },
  {
    id: 'msg-1315',
    channelId: 'channel-107',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1315.',
    timestamp: daysAgo(44),
  },
  {
    id: 'msg-1316',
    channelId: 'channel-107',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1316.',
    timestamp: daysAgo(43),
  },
  {
    id: 'msg-1317',
    channelId: 'channel-107',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1317.',
    timestamp: daysAgo(56),
  },
  {
    id: 'msg-1318',
    channelId: 'channel-107',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1318.',
    timestamp: daysAgo(45),
  },
  {
    id: 'msg-1319',
    channelId: 'channel-107',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1319.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-1320',
    channelId: 'channel-107',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1320.',
    timestamp: daysAgo(34),
  },
  {
    id: 'msg-1321',
    channelId: 'channel-107',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1321.',
    timestamp: daysAgo(33),
  },
  {
    id: 'msg-1322',
    channelId: 'channel-107',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1322.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-1323',
    channelId: 'channel-107',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1323.',
    timestamp: daysAgo(38),
  },
  {
    id: 'msg-1324',
    channelId: 'channel-107',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1324.',
    timestamp: daysAgo(50),
  },
  {
    id: 'msg-1325',
    channelId: 'channel-107',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1325.',
    timestamp: daysAgo(55),
  },
  {
    id: 'msg-1326',
    channelId: 'channel-107',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1326.',
    timestamp: daysAgo(32),
  },
  {
    id: 'msg-1327',
    channelId: 'channel-107',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1327.',
    timestamp: daysAgo(44),
  },
  {
    id: 'msg-1328',
    channelId: 'channel-107',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1328.',
    timestamp: daysAgo(31),
  },
  {
    id: 'msg-1329',
    channelId: 'channel-107',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1329.',
    timestamp: daysAgo(50),
  },
  {
    id: 'msg-1330',
    channelId: 'channel-107',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 107. Message number 1330.',
    timestamp: daysAgo(48),
  },
];

// ─── Open Source Hub — #ci-logs (channel-108, PRIVATE) ───────────────────────

const ch108: Message[] = [
  {
    id: 'msg-1401',
    channelId: 'channel-108',
    authorId: jack.id,
    author: jack,
    content: '[CI] ts-result — Build #142 PASSED ✅ (2m 14s). All 87 tests green.',
    timestamp: daysAgo(7),
  },
  {
    id: 'msg-1402',
    channelId: 'channel-108',
    authorId: jack.id,
    author: jack,
    content:
      '[CI] a11y-checker — Build #58 FAILED ❌ — TypeScript error in `src/rules/contrast.ts:42`. Notified @iris_qa.',
    timestamp: daysAgo(6),
  },
  {
    id: 'msg-1403',
    channelId: 'channel-108',
    authorId: iris.id,
    author: iris,
    content:
      'Fixed the TypeScript error. Missing `null` check on the DOM element query. Repushing.',
    timestamp: daysAgo(6, -1),
  },
  {
    id: 'msg-1404',
    channelId: 'channel-108',
    authorId: jack.id,
    author: jack,
    content: '[CI] a11y-checker — Build #59 PASSED ✅ (3m 02s).',
    timestamp: daysAgo(6, -2),
  },
  {
    id: 'msg-1405',
    channelId: 'channel-108',
    authorId: jack.id,
    author: jack,
    content: '[CI] docker-compose-dev — Build #33 PASSED ✅ — Docker image published to GHCR.',
    timestamp: daysAgo(5),
  },
  {
    id: 'msg-1406',
    channelId: 'channel-108',
    authorId: jack.id,
    author: jack,
    content:
      '[CI] ts-result — Build #147 FAILED ❌ — npm audit found 1 high-severity vulnerability in devDependency.',
    timestamp: daysAgo(4),
  },
  {
    id: 'msg-1407',
    channelId: 'channel-108',
    authorId: carol.id,
    author: carol,
    content: 'Bumping the affected package now. PR up in 5 mins.',
    timestamp: daysAgo(4, -1),
  },
  {
    id: 'msg-1408',
    channelId: 'channel-108',
    authorId: jack.id,
    author: jack,
    content: '[CI] ts-result — Build #148 PASSED ✅. Vulnerability resolved.',
    timestamp: daysAgo(3),
  },
  {
    id: 'msg-1409',
    channelId: 'channel-108',
    authorId: jack.id,
    author: jack,
    content: '[CI] All projects — Weekly dependency audit complete. 0 vulnerabilities found. ✅',
    timestamp: daysAgo(1),
  },
  {
    id: 'msg-1410',
    channelId: 'channel-108',
    authorId: jack.id,
    author: jack,
    content:
      '[CI] k8s-local-dev — Build #12 PASSED ✅ — v1.0.0 release tagged and pushed to GitHub Releases.',
    timestamp: hoursAgo(10),
  },
  {
    id: 'msg-1411',
    channelId: 'channel-108',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1411.',
    timestamp: daysAgo(33),
  },
  {
    id: 'msg-1412',
    channelId: 'channel-108',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1412.',
    timestamp: daysAgo(42),
  },
  {
    id: 'msg-1413',
    channelId: 'channel-108',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1413.',
    timestamp: daysAgo(55),
  },
  {
    id: 'msg-1414',
    channelId: 'channel-108',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1414.',
    timestamp: daysAgo(33),
  },
  {
    id: 'msg-1415',
    channelId: 'channel-108',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1415.',
    timestamp: daysAgo(35),
  },
  {
    id: 'msg-1416',
    channelId: 'channel-108',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1416.',
    timestamp: daysAgo(45),
  },
  {
    id: 'msg-1417',
    channelId: 'channel-108',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1417.',
    timestamp: daysAgo(37),
  },
  {
    id: 'msg-1418',
    channelId: 'channel-108',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1418.',
    timestamp: daysAgo(51),
  },
  {
    id: 'msg-1419',
    channelId: 'channel-108',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1419.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-1420',
    channelId: 'channel-108',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1420.',
    timestamp: daysAgo(52),
  },
  {
    id: 'msg-1421',
    channelId: 'channel-108',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1421.',
    timestamp: daysAgo(59),
  },
  {
    id: 'msg-1422',
    channelId: 'channel-108',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1422.',
    timestamp: daysAgo(40),
  },
  {
    id: 'msg-1423',
    channelId: 'channel-108',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1423.',
    timestamp: daysAgo(48),
  },
  {
    id: 'msg-1424',
    channelId: 'channel-108',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1424.',
    timestamp: daysAgo(57),
  },
  {
    id: 'msg-1425',
    channelId: 'channel-108',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1425.',
    timestamp: daysAgo(44),
  },
  {
    id: 'msg-1426',
    channelId: 'channel-108',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1426.',
    timestamp: daysAgo(31),
  },
  {
    id: 'msg-1427',
    channelId: 'channel-108',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1427.',
    timestamp: daysAgo(33),
  },
  {
    id: 'msg-1428',
    channelId: 'channel-108',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1428.',
    timestamp: daysAgo(53),
  },
  {
    id: 'msg-1429',
    channelId: 'channel-108',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1429.',
    timestamp: daysAgo(48),
  },
  {
    id: 'msg-1430',
    channelId: 'channel-108',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 108. Message number 1430.',
    timestamp: daysAgo(57),
  },
];

// ─── Design Lab — #design-general (channel-201, PRIVATE) ─────────────────────

const ch201: Message[] = [
  {
    id: 'msg-1501',
    channelId: 'channel-201',
    authorId: eve.id,
    author: eve,
    content:
      'Welcome to the Design Lab! 🎨 This is our private workspace for design discussions, critiques, and collaboration.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-1502',
    channelId: 'channel-201',
    authorId: alice.id,
    author: alice,
    content:
      'Thanks for setting this up Eve! Having a dedicated space for design will really help.',
    timestamp: daysAgo(29),
  },
  {
    id: 'msg-1503',
    channelId: 'channel-201',
    authorId: grace.id,
    author: grace,
    content: 'Agreed. The designer–PM feedback loop has been a bottleneck. This should help.',
    timestamp: daysAgo(28),
  },
  {
    id: 'msg-1504',
    channelId: 'channel-201',
    authorId: eve.id,
    author: eve,
    content:
      "Quick question: should we use `rem` or `px` for spacing? I've been mixing both and want to standardise.",
    timestamp: daysAgo(20),
  },
  {
    id: 'msg-1505',
    channelId: 'channel-201',
    authorId: carol.id,
    author: carol,
    content:
      "Tailwind uses `rem` by default and it's better for accessibility (respects user font-size settings). Let's go all `rem`.",
    timestamp: daysAgo(20, -1),
  },
  {
    id: 'msg-1506',
    channelId: 'channel-201',
    authorId: eve.id,
    author: eve,
    content: "Makes sense. I'll update the spacing tokens in the design system to use rem.",
    timestamp: daysAgo(19),
  },
  {
    id: 'msg-1507',
    channelId: 'channel-201',
    authorId: grace.id,
    author: grace,
    content: "What's our accessibility target? WCAG 2.1 AA or AAA?",
    timestamp: daysAgo(15),
  },
  {
    id: 'msg-1508',
    channelId: 'channel-201',
    authorId: eve.id,
    author: eve,
    content:
      "AA as a minimum. We'll aim for AAA on core UI elements. Colour contrast is the main thing to watch.",
    timestamp: daysAgo(15, -1),
  },
  {
    id: 'msg-1509',
    channelId: 'channel-201',
    authorId: alice.id,
    author: alice,
    content: "The Discord dark colour palette we're using — has anyone checked contrast ratios?",
    timestamp: daysAgo(10),
  },
  {
    id: 'msg-1510',
    channelId: 'channel-201',
    authorId: eve.id,
    author: eve,
    content:
      "Yes! Primary text `#dcddde` on `#36393f` background gives 7.3:1 ratio — well above AA (4.5:1). We're good.",
    timestamp: daysAgo(10, -1),
    reactions: [{ emoji: '✅', count: 3, userIds: ['user-001', 'user-007', 'user-003'] }],
  },
  {
    id: 'msg-1511',
    channelId: 'channel-201',
    authorId: grace.id,
    author: grace,
    content: 'Update on the logo: we have two concepts. Posting in #wireframes for review.',
    timestamp: daysAgo(5),
  },
  {
    id: 'msg-1512',
    channelId: 'channel-201',
    authorId: eve.id,
    author: eve,
    content:
      'I prefer concept B. The soundwave-meets-hash aesthetic ties Harmony (music) and chat together perfectly.',
    timestamp: daysAgo(5, -1),
    reactions: [{ emoji: '❤️', count: 3, userIds: ['user-001', 'user-007', 'user-003'] }],
  },
  {
    id: 'msg-1513',
    channelId: 'channel-201',
    authorId: alice.id,
    author: alice,
    content: "I agree. Concept B it is. Let's move forward with that.",
    timestamp: daysAgo(4),
  },
  {
    id: 'msg-1514',
    channelId: 'channel-201',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 201. Message number 1514.',
    timestamp: daysAgo(41),
  },
  {
    id: 'msg-1515',
    channelId: 'channel-201',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 201. Message number 1515.',
    timestamp: daysAgo(40),
  },
  {
    id: 'msg-1516',
    channelId: 'channel-201',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 201. Message number 1516.',
    timestamp: daysAgo(37),
  },
  {
    id: 'msg-1517',
    channelId: 'channel-201',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 201. Message number 1517.',
    timestamp: daysAgo(51),
  },
  {
    id: 'msg-1518',
    channelId: 'channel-201',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 201. Message number 1518.',
    timestamp: daysAgo(47),
  },
  {
    id: 'msg-1519',
    channelId: 'channel-201',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 201. Message number 1519.',
    timestamp: daysAgo(59),
  },
  {
    id: 'msg-1520',
    channelId: 'channel-201',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 201. Message number 1520.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-1521',
    channelId: 'channel-201',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 201. Message number 1521.',
    timestamp: daysAgo(41),
  },
  {
    id: 'msg-1522',
    channelId: 'channel-201',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 201. Message number 1522.',
    timestamp: daysAgo(54),
  },
  {
    id: 'msg-1523',
    channelId: 'channel-201',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 201. Message number 1523.',
    timestamp: daysAgo(53),
  },
  {
    id: 'msg-1524',
    channelId: 'channel-201',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 201. Message number 1524.',
    timestamp: daysAgo(45),
  },
  {
    id: 'msg-1525',
    channelId: 'channel-201',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 201. Message number 1525.',
    timestamp: daysAgo(48),
  },
  {
    id: 'msg-1526',
    channelId: 'channel-201',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 201. Message number 1526.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-1527',
    channelId: 'channel-201',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 201. Message number 1527.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-1528',
    channelId: 'channel-201',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 201. Message number 1528.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-1529',
    channelId: 'channel-201',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 201. Message number 1529.',
    timestamp: daysAgo(53),
  },
  {
    id: 'msg-1530',
    channelId: 'channel-201',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 201. Message number 1530.',
    timestamp: daysAgo(44),
  },
];

// ─── Design Lab — #wireframes (channel-202, PRIVATE) ─────────────────────────

const ch202: Message[] = [
  {
    id: 'msg-1601',
    channelId: 'channel-202',
    authorId: eve.id,
    author: eve,
    content:
      '**Wireframe v1 — App Layout:** Three-column Discord-style layout. Server list (72px) + Channel sidebar (240px) + Main content. Critique welcome!',
    timestamp: daysAgo(20),
  },
  {
    id: 'msg-1602',
    channelId: 'channel-202',
    authorId: alice.id,
    author: alice,
    content:
      'Love the proportions. The server list being so narrow feels right — it recedes visually and lets the content shine.',
    timestamp: daysAgo(20, -1),
  },
  {
    id: 'msg-1603',
    channelId: 'channel-202',
    authorId: grace.id,
    author: grace,
    content:
      'The TopBar looks a bit tall at 60px. Discord uses 48px which feels more compact. Thoughts?',
    timestamp: daysAgo(19),
  },
  {
    id: 'msg-1604',
    channelId: 'channel-202',
    authorId: eve.id,
    author: eve,
    content: 'Good call. Reduced to 48px. Feels much better. Updated wireframe incoming.',
    timestamp: daysAgo(18),
  },
  {
    id: 'msg-1605',
    channelId: 'channel-202',
    authorId: eve.id,
    author: eve,
    content:
      '**Wireframe v2 — TopBar (48px):** Channel name + topic in the left, action icons in the right. Hamburger for mobile.',
    timestamp: daysAgo(17),
  },
  {
    id: 'msg-1606',
    channelId: 'channel-202',
    authorId: carol.id,
    author: carol,
    content: 'The topic text truncation on mobile is a nice touch. Clean.',
    timestamp: daysAgo(17, -1),
  },
  {
    id: 'msg-1607',
    channelId: 'channel-202',
    authorId: eve.id,
    author: eve,
    content:
      '**Wireframe v1 — Members Sidebar:** Role groups, status dots, online-first ordering. 240px width.',
    timestamp: daysAgo(14),
  },
  {
    id: 'msg-1608',
    channelId: 'channel-202',
    authorId: alice.id,
    author: alice,
    content:
      'The role grouping headers are clear. One question: should offline users be hidden or just dimmed?',
    timestamp: daysAgo(14, -1),
  },
  {
    id: 'msg-1609',
    channelId: 'channel-202',
    authorId: eve.id,
    author: eve,
    content: "Dimmed (50% opacity). Hiding them entirely loses the context of who's in the server.",
    timestamp: daysAgo(13),
  },
  {
    id: 'msg-1610',
    channelId: 'channel-202',
    authorId: grace.id,
    author: grace,
    content:
      '**Wireframe v1 — VisibilityGuard/AccessDenied:** Lock icon centred, two CTA buttons. Simple and clear.',
    timestamp: daysAgo(10),
  },
  {
    id: 'msg-1611',
    channelId: 'channel-202',
    authorId: eve.id,
    author: eve,
    content:
      'Updated the lock icon to be larger (64px circle bg) — feels more communicative at a glance.',
    timestamp: daysAgo(9),
  },
  {
    id: 'msg-1612',
    channelId: 'channel-202',
    authorId: alice.id,
    author: alice,
    content: 'These wireframes are excellent quality Eve. Very easy to implement from. Great work!',
    timestamp: daysAgo(7),
    reactions: [{ emoji: '🙌', count: 3, userIds: ['user-007', 'user-003', 'user-005'] }],
  },
  {
    id: 'msg-1613',
    channelId: 'channel-202',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1613.',
    timestamp: daysAgo(39),
  },
  {
    id: 'msg-1614',
    channelId: 'channel-202',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1614.',
    timestamp: daysAgo(45),
  },
  {
    id: 'msg-1615',
    channelId: 'channel-202',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1615.',
    timestamp: daysAgo(59),
  },
  {
    id: 'msg-1616',
    channelId: 'channel-202',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1616.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-1617',
    channelId: 'channel-202',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1617.',
    timestamp: daysAgo(35),
  },
  {
    id: 'msg-1618',
    channelId: 'channel-202',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1618.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-1619',
    channelId: 'channel-202',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1619.',
    timestamp: daysAgo(31),
  },
  {
    id: 'msg-1620',
    channelId: 'channel-202',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1620.',
    timestamp: daysAgo(54),
  },
  {
    id: 'msg-1621',
    channelId: 'channel-202',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1621.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-1622',
    channelId: 'channel-202',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1622.',
    timestamp: daysAgo(34),
  },
  {
    id: 'msg-1623',
    channelId: 'channel-202',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1623.',
    timestamp: daysAgo(45),
  },
  {
    id: 'msg-1624',
    channelId: 'channel-202',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1624.',
    timestamp: daysAgo(55),
  },
  {
    id: 'msg-1625',
    channelId: 'channel-202',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1625.',
    timestamp: daysAgo(50),
  },
  {
    id: 'msg-1626',
    channelId: 'channel-202',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1626.',
    timestamp: daysAgo(54),
  },
  {
    id: 'msg-1627',
    channelId: 'channel-202',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1627.',
    timestamp: daysAgo(55),
  },
  {
    id: 'msg-1628',
    channelId: 'channel-202',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1628.',
    timestamp: daysAgo(37),
  },
  {
    id: 'msg-1629',
    channelId: 'channel-202',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1629.',
    timestamp: daysAgo(34),
  },
  {
    id: 'msg-1630',
    channelId: 'channel-202',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 202. Message number 1630.',
    timestamp: daysAgo(39),
  },
];

// ─── Design Lab — #inspiration (channel-203) ─────────────────────────────────

const ch203: Message[] = [
  {
    id: 'msg-1701',
    channelId: 'channel-203',
    authorId: eve.id,
    author: eve,
    content:
      "Sharing some inspo for the dark theme: Linear's design system is exceptional. Clean, high contrast, lots of negative space. linear.app",
    timestamp: daysAgo(20),
    reactions: [{ emoji: '😍', count: 3, userIds: ['user-001', 'user-005', 'user-007'] }],
  },
  {
    id: 'msg-1702',
    channelId: 'channel-203',
    authorId: alice.id,
    author: alice,
    content:
      "Love Linear's UI. Their use of monospace fonts in specific contexts is really distinctive too.",
    timestamp: daysAgo(20, -1),
  },
  {
    id: 'msg-1703',
    channelId: 'channel-203',
    authorId: grace.id,
    author: grace,
    content:
      "Vercel's dashboard is another great reference for dark mode done right. Especially the sidebar.",
    timestamp: daysAgo(18),
  },
  {
    id: 'msg-1704',
    channelId: 'channel-203',
    authorId: eve.id,
    author: eve,
    content:
      "Yes! Vercel uses a very subtle grey hierarchy that's worth studying. I've been taking notes.",
    timestamp: daysAgo(17),
  },
  {
    id: 'msg-1705',
    channelId: 'channel-203',
    authorId: carol.id,
    author: carol,
    content:
      "For animation inspo: Framer's website has amazing micro-interactions. Especially their card hover effects.",
    timestamp: daysAgo(15),
  },
  {
    id: 'msg-1706',
    channelId: 'channel-203',
    authorId: eve.id,
    author: eve,
    content:
      "Noted! I'll look at incorporating some tasteful transitions for the sidebar toggle and modal open/close.",
    timestamp: daysAgo(14),
  },
  {
    id: 'msg-1707',
    channelId: 'channel-203',
    authorId: grace.id,
    author: grace,
    content:
      "Sharing a Figma community file: Discord's official design kit. Useful for cross-referencing exact spacing values.",
    timestamp: daysAgo(10),
  },
  {
    id: 'msg-1708',
    channelId: 'channel-203',
    authorId: eve.id,
    author: eve,
    content:
      'This is perfect! The icon grid specs in here are exactly what I needed for the ServerList icons.',
    timestamp: daysAgo(10, -1),
    reactions: [{ emoji: '💯', count: 3, userIds: ['user-001', 'user-007', 'user-003'] }],
  },
  {
    id: 'msg-1709',
    channelId: 'channel-203',
    authorId: alice.id,
    author: alice,
    content:
      "Inspo for the SearchModal: Spotlight on macOS and Arc browser's command palette are both excellent UX references.",
    timestamp: daysAgo(7),
  },
  {
    id: 'msg-1710',
    channelId: 'channel-203',
    authorId: eve.id,
    author: eve,
    content:
      "Arc's command palette is stunning. The instant filtering and result grouping is what we should aim for.",
    timestamp: daysAgo(6),
  },
  {
    id: 'msg-1711',
    channelId: 'channel-203',
    authorId: carol.id,
    author: carol,
    content:
      'Our SearchModal is already pretty close to that Arc feel. The highlight text on results is a nice touch.',
    timestamp: daysAgo(3),
    reactions: [{ emoji: '🎯', count: 3, userIds: ['user-005', 'user-007', 'user-001'] }],
  },
  {
    id: 'msg-1712',
    channelId: 'channel-203',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1712.',
    timestamp: daysAgo(58),
  },
  {
    id: 'msg-1713',
    channelId: 'channel-203',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1713.',
    timestamp: daysAgo(59),
  },
  {
    id: 'msg-1714',
    channelId: 'channel-203',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1714.',
    timestamp: daysAgo(48),
  },
  {
    id: 'msg-1715',
    channelId: 'channel-203',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1715.',
    timestamp: daysAgo(53),
  },
  {
    id: 'msg-1716',
    channelId: 'channel-203',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1716.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-1717',
    channelId: 'channel-203',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1717.',
    timestamp: daysAgo(50),
  },
  {
    id: 'msg-1718',
    channelId: 'channel-203',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1718.',
    timestamp: daysAgo(45),
  },
  {
    id: 'msg-1719',
    channelId: 'channel-203',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1719.',
    timestamp: daysAgo(38),
  },
  {
    id: 'msg-1720',
    channelId: 'channel-203',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1720.',
    timestamp: daysAgo(59),
  },
  {
    id: 'msg-1721',
    channelId: 'channel-203',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1721.',
    timestamp: daysAgo(39),
  },
  {
    id: 'msg-1722',
    channelId: 'channel-203',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1722.',
    timestamp: daysAgo(53),
  },
  {
    id: 'msg-1723',
    channelId: 'channel-203',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1723.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-1724',
    channelId: 'channel-203',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1724.',
    timestamp: daysAgo(49),
  },
  {
    id: 'msg-1725',
    channelId: 'channel-203',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1725.',
    timestamp: daysAgo(34),
  },
  {
    id: 'msg-1726',
    channelId: 'channel-203',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1726.',
    timestamp: daysAgo(58),
  },
  {
    id: 'msg-1727',
    channelId: 'channel-203',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1727.',
    timestamp: daysAgo(56),
  },
  {
    id: 'msg-1728',
    channelId: 'channel-203',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1728.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-1729',
    channelId: 'channel-203',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1729.',
    timestamp: daysAgo(37),
  },
  {
    id: 'msg-1730',
    channelId: 'channel-203',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 203. Message number 1730.',
    timestamp: daysAgo(56),
  },
];

// ─── Design Lab — #announcements (channel-204) ───────────────────────────────

const ch204: Message[] = [
  {
    id: 'msg-1801',
    channelId: 'channel-204',
    authorId: eve.id,
    author: eve,
    content:
      "📢 **Design Lab is open!** This is the team's creative hub. Check the channel list for dedicated spaces: wireframes, inspiration, assets, and portfolio.",
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-1802',
    channelId: 'channel-204',
    authorId: eve.id,
    author: eve,
    content:
      '📢 **Design system v1 complete.** Colour tokens, spacing scale, and type ramp are all defined. Figma file link shared in #assets.',
    timestamp: daysAgo(15),
    reactions: [
      { emoji: '🎨', count: 4, userIds: ['user-001', 'user-003', 'user-007', 'user-009'] },
    ],
  },
  {
    id: 'msg-1803',
    channelId: 'channel-204',
    authorId: eve.id,
    author: eve,
    content:
      '📢 **Logo decision made.** Going with Concept B (soundwave + hash). Final SVG assets will be in #assets by EOD.',
    timestamp: daysAgo(4),
    reactions: [
      { emoji: '✅', count: 4, userIds: ['user-001', 'user-003', 'user-007', 'user-009'] },
    ],
  },
  {
    id: 'msg-1804',
    channelId: 'channel-204',
    authorId: grace.id,
    author: grace,
    content:
      '📢 **Design review Friday 2pm.** Will cover the full UI kit, accessibility audit results, and final wireframes. All team members welcome.',
    timestamp: daysAgo(2),
  },
  {
    id: 'msg-1805',
    channelId: 'channel-204',
    authorId: eve.id,
    author: eve,
    content:
      '📢 **Accessibility audit complete.** All contrast ratios meet WCAG 2.1 AA. Primary text 7.3:1, muted text 4.6:1. Full report in #ux-research.',
    timestamp: hoursAgo(3),
  },
  {
    id: 'msg-1806',
    channelId: 'channel-204',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1806.',
    timestamp: daysAgo(42),
  },
  {
    id: 'msg-1807',
    channelId: 'channel-204',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1807.',
    timestamp: daysAgo(40),
  },
  {
    id: 'msg-1808',
    channelId: 'channel-204',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1808.',
    timestamp: daysAgo(56),
  },
  {
    id: 'msg-1809',
    channelId: 'channel-204',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1809.',
    timestamp: daysAgo(50),
  },
  {
    id: 'msg-1810',
    channelId: 'channel-204',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1810.',
    timestamp: daysAgo(58),
  },
  {
    id: 'msg-1811',
    channelId: 'channel-204',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1811.',
    timestamp: daysAgo(52),
  },
  {
    id: 'msg-1812',
    channelId: 'channel-204',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1812.',
    timestamp: daysAgo(35),
  },
  {
    id: 'msg-1813',
    channelId: 'channel-204',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1813.',
    timestamp: daysAgo(43),
  },
  {
    id: 'msg-1814',
    channelId: 'channel-204',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1814.',
    timestamp: daysAgo(53),
  },
  {
    id: 'msg-1815',
    channelId: 'channel-204',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1815.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-1816',
    channelId: 'channel-204',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1816.',
    timestamp: daysAgo(31),
  },
  {
    id: 'msg-1817',
    channelId: 'channel-204',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1817.',
    timestamp: daysAgo(39),
  },
  {
    id: 'msg-1818',
    channelId: 'channel-204',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1818.',
    timestamp: daysAgo(31),
  },
  {
    id: 'msg-1819',
    channelId: 'channel-204',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1819.',
    timestamp: daysAgo(38),
  },
  {
    id: 'msg-1820',
    channelId: 'channel-204',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1820.',
    timestamp: daysAgo(34),
  },
  {
    id: 'msg-1821',
    channelId: 'channel-204',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1821.',
    timestamp: daysAgo(48),
  },
  {
    id: 'msg-1822',
    channelId: 'channel-204',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1822.',
    timestamp: daysAgo(35),
  },
  {
    id: 'msg-1823',
    channelId: 'channel-204',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1823.',
    timestamp: daysAgo(35),
  },
  {
    id: 'msg-1824',
    channelId: 'channel-204',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1824.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-1825',
    channelId: 'channel-204',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1825.',
    timestamp: daysAgo(57),
  },
  {
    id: 'msg-1826',
    channelId: 'channel-204',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1826.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-1827',
    channelId: 'channel-204',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1827.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-1828',
    channelId: 'channel-204',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1828.',
    timestamp: daysAgo(54),
  },
  {
    id: 'msg-1829',
    channelId: 'channel-204',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1829.',
    timestamp: daysAgo(32),
  },
  {
    id: 'msg-1830',
    channelId: 'channel-204',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 204. Message number 1830.',
    timestamp: daysAgo(39),
  },
];

// ─── Design Lab — #assets (channel-205, PRIVATE) ─────────────────────────────

const ch205: Message[] = [
  {
    id: 'msg-1901',
    channelId: 'channel-205',
    authorId: eve.id,
    author: eve,
    content: 'Uploading the Figma design system file here. Password-protected — DM me for access.',
    timestamp: daysAgo(15),
  },
  {
    id: 'msg-1902',
    channelId: 'channel-205',
    authorId: alice.id,
    author: alice,
    content: 'Got access, thank you! The component library is really thorough.',
    timestamp: daysAgo(14),
  },
  {
    id: 'msg-1903',
    channelId: 'channel-205',
    authorId: eve.id,
    author: eve,
    content:
      'Exporting SVG icons for the TopBar: hash, search, pin, members, gear, hamburger. All 24x24 viewBox, stroke-based.',
    timestamp: daysAgo(12),
  },
  {
    id: 'msg-1904',
    channelId: 'channel-205',
    authorId: carol.id,
    author: carol,
    content: "Perfect. I'll inline these as JSX in the components to avoid extra dependencies.",
    timestamp: daysAgo(12, -1),
  },
  {
    id: 'msg-1905',
    channelId: 'channel-205',
    authorId: eve.id,
    author: eve,
    content:
      'Colour palette export: all CSS custom properties for the discord.* token set. Add to globals.css.',
    timestamp: daysAgo(10),
  },
  {
    id: 'msg-1906',
    channelId: 'channel-205',
    authorId: eve.id,
    author: eve,
    content:
      'Logo SVG (concept B) is ready. Two variants: full wordmark, and icon-only. Both in `#202225` and white.',
    timestamp: daysAgo(3),
  },
  {
    id: 'msg-1907',
    channelId: 'channel-205',
    authorId: grace.id,
    author: grace,
    content:
      'Using the icon-only variant in the server list looks great. Perfect fit for the 72px column.',
    timestamp: daysAgo(2),
  },
  {
    id: 'msg-1908',
    channelId: 'channel-205',
    authorId: eve.id,
    author: eve,
    content:
      'Final design export package uploaded: all icons, colour palette, spacing tokens, and type scale in one zip.',
    timestamp: hoursAgo(6),
  },
  {
    id: 'msg-1909',
    channelId: 'channel-205',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1909.',
    timestamp: daysAgo(52),
  },
  {
    id: 'msg-1910',
    channelId: 'channel-205',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1910.',
    timestamp: daysAgo(37),
  },
  {
    id: 'msg-1911',
    channelId: 'channel-205',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1911.',
    timestamp: daysAgo(52),
  },
  {
    id: 'msg-1912',
    channelId: 'channel-205',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1912.',
    timestamp: daysAgo(33),
  },
  {
    id: 'msg-1913',
    channelId: 'channel-205',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1913.',
    timestamp: daysAgo(39),
  },
  {
    id: 'msg-1914',
    channelId: 'channel-205',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1914.',
    timestamp: daysAgo(55),
  },
  {
    id: 'msg-1915',
    channelId: 'channel-205',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1915.',
    timestamp: daysAgo(32),
  },
  {
    id: 'msg-1916',
    channelId: 'channel-205',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1916.',
    timestamp: daysAgo(37),
  },
  {
    id: 'msg-1917',
    channelId: 'channel-205',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1917.',
    timestamp: daysAgo(50),
  },
  {
    id: 'msg-1918',
    channelId: 'channel-205',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1918.',
    timestamp: daysAgo(43),
  },
  {
    id: 'msg-1919',
    channelId: 'channel-205',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1919.',
    timestamp: daysAgo(52),
  },
  {
    id: 'msg-1920',
    channelId: 'channel-205',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1920.',
    timestamp: daysAgo(34),
  },
  {
    id: 'msg-1921',
    channelId: 'channel-205',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1921.',
    timestamp: daysAgo(41),
  },
  {
    id: 'msg-1922',
    channelId: 'channel-205',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1922.',
    timestamp: daysAgo(43),
  },
  {
    id: 'msg-1923',
    channelId: 'channel-205',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1923.',
    timestamp: daysAgo(45),
  },
  {
    id: 'msg-1924',
    channelId: 'channel-205',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1924.',
    timestamp: daysAgo(47),
  },
  {
    id: 'msg-1925',
    channelId: 'channel-205',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1925.',
    timestamp: daysAgo(57),
  },
  {
    id: 'msg-1926',
    channelId: 'channel-205',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1926.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-1927',
    channelId: 'channel-205',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1927.',
    timestamp: daysAgo(59),
  },
  {
    id: 'msg-1928',
    channelId: 'channel-205',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1928.',
    timestamp: daysAgo(51),
  },
  {
    id: 'msg-1929',
    channelId: 'channel-205',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1929.',
    timestamp: daysAgo(51),
  },
  {
    id: 'msg-1930',
    channelId: 'channel-205',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 205. Message number 1930.',
    timestamp: daysAgo(54),
  },
];

// ─── Design Lab — #portfolio (channel-207) ───────────────────────────────────

const ch207: Message[] = [
  {
    id: 'msg-2001',
    channelId: 'channel-207',
    authorId: eve.id,
    author: eve,
    content:
      'Sharing my design portfolio: the Harmony project makes up the centrepiece of my latest case study. 6 weeks of work condensed into 12 slides.',
    timestamp: daysAgo(10),
  },
  {
    id: 'msg-2002',
    channelId: 'channel-207',
    authorId: alice.id,
    author: alice,
    content: 'This is really impressive Eve! The before/after wireframe comparison is very clear.',
    timestamp: daysAgo(9),
    reactions: [{ emoji: '🔥', count: 3, userIds: ['user-007', 'user-003', 'user-009'] }],
  },
  {
    id: 'msg-2003',
    channelId: 'channel-207',
    authorId: grace.id,
    author: grace,
    content:
      'The metrics section is strong too. Quantifying the design decisions with accessibility scores adds real credibility.',
    timestamp: daysAgo(8),
  },
  {
    id: 'msg-2004',
    channelId: 'channel-207',
    authorId: carol.id,
    author: carol,
    content:
      'Showcasing my GitHub profile as a developer portfolio for this project. 50+ commits, 5 PRs merged. Happy with that!',
    timestamp: daysAgo(7),
  },
  {
    id: 'msg-2005',
    channelId: 'channel-207',
    authorId: eve.id,
    author: eve,
    content: "@carol_dev That's a solid contribution! The commit history tells a great story.",
    timestamp: daysAgo(6),
  },
  {
    id: 'msg-2006',
    channelId: 'channel-207',
    authorId: iris.id,
    author: iris,
    content:
      'Posting my QA case study here — documented the testing approach, accessibility checks, and how I caught the mobile resize bug.',
    timestamp: daysAgo(5),
  },
  {
    id: 'msg-2007',
    channelId: 'channel-207',
    authorId: alice.id,
    author: alice,
    content:
      'The mobile resize bug catch is a great story for the portfolio Iris. Shows proactive QA thinking.',
    timestamp: daysAgo(4),
    reactions: [{ emoji: '💯', count: 3, userIds: ['user-005', 'user-007', 'user-003'] }],
  },
  {
    id: 'msg-2008',
    channelId: 'channel-207',
    authorId: frank.id,
    author: frank,
    content:
      'Infrastructure write-up: how we set up the staging environment, CI/CD pipeline, and zero-downtime deploy strategy.',
    timestamp: daysAgo(3),
  },
  {
    id: 'msg-2009',
    channelId: 'channel-207',
    authorId: eve.id,
    author: eve,
    content:
      "These portfolio pieces collectively tell a really compelling team story. Proud of what we've built together 🎉",
    timestamp: daysAgo(1),
    reactions: [
      {
        emoji: '❤️',
        count: 6,
        userIds: ['user-001', 'user-002', 'user-003', 'user-006', 'user-007', 'user-009'],
      },
    ],
  },
  {
    id: 'msg-2010',
    channelId: 'channel-207',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2010.',
    timestamp: daysAgo(39),
  },
  {
    id: 'msg-2011',
    channelId: 'channel-207',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2011.',
    timestamp: daysAgo(41),
  },
  {
    id: 'msg-2012',
    channelId: 'channel-207',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2012.',
    timestamp: daysAgo(54),
  },
  {
    id: 'msg-2013',
    channelId: 'channel-207',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2013.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-2014',
    channelId: 'channel-207',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2014.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-2015',
    channelId: 'channel-207',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2015.',
    timestamp: daysAgo(49),
  },
  {
    id: 'msg-2016',
    channelId: 'channel-207',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2016.',
    timestamp: daysAgo(35),
  },
  {
    id: 'msg-2017',
    channelId: 'channel-207',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2017.',
    timestamp: daysAgo(34),
  },
  {
    id: 'msg-2018',
    channelId: 'channel-207',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2018.',
    timestamp: daysAgo(53),
  },
  {
    id: 'msg-2019',
    channelId: 'channel-207',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2019.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-2020',
    channelId: 'channel-207',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2020.',
    timestamp: daysAgo(39),
  },
  {
    id: 'msg-2021',
    channelId: 'channel-207',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2021.',
    timestamp: daysAgo(43),
  },
  {
    id: 'msg-2022',
    channelId: 'channel-207',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2022.',
    timestamp: daysAgo(39),
  },
  {
    id: 'msg-2023',
    channelId: 'channel-207',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2023.',
    timestamp: daysAgo(40),
  },
  {
    id: 'msg-2024',
    channelId: 'channel-207',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2024.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-2025',
    channelId: 'channel-207',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2025.',
    timestamp: daysAgo(54),
  },
  {
    id: 'msg-2026',
    channelId: 'channel-207',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2026.',
    timestamp: daysAgo(35),
  },
  {
    id: 'msg-2027',
    channelId: 'channel-207',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2027.',
    timestamp: daysAgo(37),
  },
  {
    id: 'msg-2028',
    channelId: 'channel-207',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2028.',
    timestamp: daysAgo(34),
  },
  {
    id: 'msg-2029',
    channelId: 'channel-207',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2029.',
    timestamp: daysAgo(51),
  },
  {
    id: 'msg-2030',
    channelId: 'channel-207',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 207. Message number 2030.',
    timestamp: daysAgo(58),
  },
];

// ─── Design Lab — #ux-research (channel-208, PRIVATE) ────────────────────────

const ch208: Message[] = [
  {
    id: 'msg-2101',
    channelId: 'channel-208',
    authorId: eve.id,
    author: eve,
    content:
      'Starting a user research log here. Will document any UX insights, usability findings, and decisions with rationale.',
    timestamp: daysAgo(20),
  },
  {
    id: 'msg-2102',
    channelId: 'channel-208',
    authorId: grace.id,
    author: grace,
    content: "Great idea. I'll add PM perspective alongside. Design + PM alignment in one place.",
    timestamp: daysAgo(19),
  },
  {
    id: 'msg-2103',
    channelId: 'channel-208',
    authorId: eve.id,
    author: eve,
    content:
      '**Finding #1:** Users expect the members sidebar to be open by default (like Discord). Currently it defaults open — keeping it.',
    timestamp: daysAgo(15),
  },
  {
    id: 'msg-2104',
    channelId: 'channel-208',
    authorId: eve.id,
    author: eve,
    content:
      '**Finding #2:** Channel topic text is too small at `text-xs` on mobile. Increased to `text-sm` on mobile breakpoint.',
    timestamp: daysAgo(12),
  },
  {
    id: 'msg-2105',
    channelId: 'channel-208',
    authorId: iris.id,
    author: iris,
    content:
      "**Accessibility finding:** Screen reader didn't announce the members sidebar toggle. Added `aria-pressed` attribute to the button.",
    timestamp: daysAgo(10),
  },
  {
    id: 'msg-2106',
    channelId: 'channel-208',
    authorId: eve.id,
    author: eve,
    content: 'Good catch Iris! `aria-pressed` is exactly right for toggle buttons.',
    timestamp: daysAgo(9),
  },
  {
    id: 'msg-2107',
    channelId: 'channel-208',
    authorId: grace.id,
    author: grace,
    content:
      "**User test session notes:** Tested 3 users on the channel visibility toggle flow. All 3 understood what 'Public (Not Indexed)' meant after reading the description text.",
    timestamp: daysAgo(7),
  },
  {
    id: 'msg-2108',
    channelId: 'channel-208',
    authorId: eve.id,
    author: eve,
    content:
      "That's really promising! The description text was a last-minute addition so glad it's working.",
    timestamp: daysAgo(6),
  },
  {
    id: 'msg-2109',
    channelId: 'channel-208',
    authorId: iris.id,
    author: iris,
    content:
      '**WCAG audit complete:** Full report:\n- Contrast: PASS (all elements)\n- Keyboard navigation: PASS\n- Focus indicators: PASS\n- Alt text: PASS\n- ARIA labels: PASS\n\nOverall: WCAG 2.1 AA compliant ✅',
    timestamp: daysAgo(3),
    reactions: [
      { emoji: '✅', count: 4, userIds: ['user-001', 'user-005', 'user-007', 'user-009'] },
    ],
  },
  {
    id: 'msg-2110',
    channelId: 'channel-208',
    authorId: alice.id,
    author: alice,
    content:
      'Excellent work everyone on the research side of this. The WCAG AA compliance is a major deliverable. 🎉',
    timestamp: daysAgo(2),
    reactions: [
      { emoji: '🎉', count: 4, userIds: ['user-005', 'user-007', 'user-009', 'user-003'] },
    ],
  },
  {
    id: 'msg-2111',
    channelId: 'channel-208',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2111.',
    timestamp: daysAgo(38),
  },
  {
    id: 'msg-2112',
    channelId: 'channel-208',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2112.',
    timestamp: daysAgo(46),
  },
  {
    id: 'msg-2113',
    channelId: 'channel-208',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2113.',
    timestamp: daysAgo(35),
  },
  {
    id: 'msg-2114',
    channelId: 'channel-208',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2114.',
    timestamp: daysAgo(34),
  },
  {
    id: 'msg-2115',
    channelId: 'channel-208',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2115.',
    timestamp: daysAgo(40),
  },
  {
    id: 'msg-2116',
    channelId: 'channel-208',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2116.',
    timestamp: daysAgo(39),
  },
  {
    id: 'msg-2117',
    channelId: 'channel-208',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2117.',
    timestamp: daysAgo(51),
  },
  {
    id: 'msg-2118',
    channelId: 'channel-208',
    authorId: henry.id,
    author: henry,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2118.',
    timestamp: daysAgo(30),
  },
  {
    id: 'msg-2119',
    channelId: 'channel-208',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2119.',
    timestamp: daysAgo(43),
  },
  {
    id: 'msg-2120',
    channelId: 'channel-208',
    authorId: eve.id,
    author: eve,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2120.',
    timestamp: daysAgo(33),
  },
  {
    id: 'msg-2121',
    channelId: 'channel-208',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2121.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-2122',
    channelId: 'channel-208',
    authorId: dave.id,
    author: dave,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2122.',
    timestamp: daysAgo(36),
  },
  {
    id: 'msg-2123',
    channelId: 'channel-208',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2123.',
    timestamp: daysAgo(45),
  },
  {
    id: 'msg-2124',
    channelId: 'channel-208',
    authorId: alice.id,
    author: alice,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2124.',
    timestamp: daysAgo(44),
  },
  {
    id: 'msg-2125',
    channelId: 'channel-208',
    authorId: carol.id,
    author: carol,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2125.',
    timestamp: daysAgo(58),
  },
  {
    id: 'msg-2126',
    channelId: 'channel-208',
    authorId: jack.id,
    author: jack,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2126.',
    timestamp: daysAgo(50),
  },
  {
    id: 'msg-2127',
    channelId: 'channel-208',
    authorId: bob.id,
    author: bob,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2127.',
    timestamp: daysAgo(55),
  },
  {
    id: 'msg-2128',
    channelId: 'channel-208',
    authorId: grace.id,
    author: grace,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2128.',
    timestamp: daysAgo(37),
  },
  {
    id: 'msg-2129',
    channelId: 'channel-208',
    authorId: iris.id,
    author: iris,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2129.',
    timestamp: daysAgo(32),
  },
  {
    id: 'msg-2130',
    channelId: 'channel-208',
    authorId: frank.id,
    author: frank,
    content:
      'This is a generated message for testing scroll and load behaviors in channel 208. Message number 2130.',
    timestamp: daysAgo(44),
  },
];

// ─── Combined export ──────────────────────────────────────────────────────────

export const mockMessages: Message[] = [
  ...ch001,
  ...ch002,
  ...ch003,
  ...ch004,
  ...ch005,
  ...ch007,
  ...ch008,
  ...ch009,
  ...ch101,
  ...ch102,
  ...ch103,
  ...ch104,
  ...ch105,
  ...ch107,
  ...ch108,
  ...ch201,
  ...ch202,
  ...ch203,
  ...ch204,
  ...ch205,
  ...ch207,
  ...ch208,
];
