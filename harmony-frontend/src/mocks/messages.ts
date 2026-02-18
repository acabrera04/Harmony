/**
 * Mock Data: Messages
 * 30+ messages per channel with realistic timestamps, varied content, and reactions
 */

import type { Message } from "@/types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

// ─── Messages for #general (channel-001) ─────────────────────────────────────

const generalMessages: Message[] = [
  {
    id: "msg-001",
    channelId: "channel-001",
    authorId: "user-001",
    author: { id: "user-001", username: "alice_admin", displayName: "Alice", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice" },
    content: "Welcome to Harmony HQ! 🎉 This is our main hub for all things Harmony.",
    timestamp: daysAgo(7),
    reactions: [{ emoji: "🎉", count: 5, userIds: ["user-002", "user-003", "user-004", "user-005", "user-006"] }],
  },
  {
    id: "msg-002",
    channelId: "channel-001",
    authorId: "user-002",
    author: { id: "user-002", username: "bob_mod", displayName: "Bob", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob" },
    content: "Thanks for having me! Excited to be part of this community.",
    timestamp: daysAgo(7, -1),
    reactions: [{ emoji: "👋", count: 3, userIds: ["user-001", "user-003", "user-004"] }],
  },
  {
    id: "msg-003",
    channelId: "channel-001",
    authorId: "user-003",
    author: { id: "user-003", username: "carol_dev", displayName: "Carol", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol" },
    content: "Just pushed the latest changes to the dev branch. Please review when you get a chance.",
    timestamp: daysAgo(6),
  },
  {
    id: "msg-004",
    channelId: "channel-001",
    authorId: "user-004",
    author: { id: "user-004", username: "dave_42", displayName: "Dave", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=dave" },
    content: "Reviewed! Left some comments. Overall looks great though.",
    timestamp: daysAgo(6, -2),
    reactions: [{ emoji: "✅", count: 2, userIds: ["user-003", "user-001"] }],
  },
  {
    id: "msg-005",
    channelId: "channel-001",
    authorId: "user-005",
    author: { id: "user-005", username: "eve_designer", displayName: "Eve", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=eve" },
    content: "New design mockups are ready. Check the #showcase channel for previews.",
    timestamp: daysAgo(5),
  },
  {
    id: "msg-006",
    channelId: "channel-001",
    authorId: "user-006",
    author: { id: "user-006", username: "frank_backend", displayName: "Frank", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=frank" },
    content: "Backend API endpoints are now stable. Updated the docs accordingly.",
    timestamp: daysAgo(5, -3),
  },
  {
    id: "msg-007",
    channelId: "channel-001",
    authorId: "user-001",
    author: { id: "user-001", username: "alice_admin", displayName: "Alice", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice" },
    content: "Sprint planning meeting tomorrow at 10am. Please come prepared with your task estimates.",
    timestamp: daysAgo(4),
    reactions: [{ emoji: "📅", count: 6, userIds: ["user-002", "user-003", "user-004", "user-005", "user-006", "user-007"] }],
  },
  {
    id: "msg-008",
    channelId: "channel-001",
    authorId: "user-007",
    author: { id: "user-007", username: "grace_pm", displayName: "Grace", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace" },
    content: "Added the sprint planning agenda to the shared drive. Check your emails for the invite.",
    timestamp: daysAgo(4, -1),
  },
  {
    id: "msg-009",
    channelId: "channel-001",
    authorId: "user-003",
    author: { id: "user-003", username: "carol_dev", displayName: "Carol", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol" },
    content: "Ran into a weird TypeScript error with the channel visibility enum. Anyone else seen this?",
    timestamp: daysAgo(3),
  },
  {
    id: "msg-010",
    channelId: "channel-001",
    authorId: "user-004",
    author: { id: "user-004", username: "dave_42", displayName: "Dave", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=dave" },
    content: "Yeah, you need to use `as const` assertion. I'll DM you the fix.",
    timestamp: daysAgo(3, -1),
    reactions: [{ emoji: "💡", count: 1, userIds: ["user-003"] }],
  },
  {
    id: "msg-011",
    channelId: "channel-001",
    authorId: "user-009",
    author: { id: "user-009", username: "iris_qa", displayName: "Iris", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=iris" },
    content: "QA pass on the latest build — 2 minor bugs found, filed as issues #45 and #46.",
    timestamp: daysAgo(2),
  },
  {
    id: "msg-012",
    channelId: "channel-001",
    authorId: "user-002",
    author: { id: "user-002", username: "bob_mod", displayName: "Bob", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob" },
    content: "On it! Should have fixes out by EOD.",
    timestamp: daysAgo(2, -2),
  },
  {
    id: "msg-013",
    channelId: "channel-001",
    authorId: "user-005",
    author: { id: "user-005", username: "eve_designer", displayName: "Eve", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=eve" },
    content: "Updated color tokens to match the latest brand guidelines. PR is up for review.",
    timestamp: daysAgo(1),
  },
  {
    id: "msg-014",
    channelId: "channel-001",
    authorId: "user-001",
    author: { id: "user-001", username: "alice_admin", displayName: "Alice", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice" },
    content: "Great work everyone this week! We're ahead of schedule on the visibility toggle feature 🚀",
    timestamp: hoursAgo(20),
    reactions: [
      { emoji: "🚀", count: 7, userIds: ["user-002", "user-003", "user-004", "user-005", "user-006", "user-007", "user-009"] },
      { emoji: "❤️", count: 4, userIds: ["user-003", "user-004", "user-006", "user-007"] },
    ],
  },
  {
    id: "msg-015",
    channelId: "channel-001",
    authorId: "user-006",
    author: { id: "user-006", username: "frank_backend", displayName: "Frank", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=frank" },
    content: "Deployed the new mock service layer to the staging environment. Please test!",
    timestamp: hoursAgo(14),
  },
  {
    id: "msg-016",
    channelId: "channel-001",
    authorId: "user-009",
    author: { id: "user-009", username: "iris_qa", displayName: "Iris", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=iris" },
    content: "Testing it now. The simulated delays feel very realistic.",
    timestamp: hoursAgo(13),
    reactions: [{ emoji: "👍", count: 2, userIds: ["user-006", "user-001"] }],
  },
  {
    id: "msg-017",
    channelId: "channel-001",
    authorId: "user-004",
    author: { id: "user-004", username: "dave_42", displayName: "Dave", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=dave" },
    content: "Does anyone know if there's a way to hot-reload the mock data without restarting the dev server?",
    timestamp: hoursAgo(10),
  },
  {
    id: "msg-018",
    channelId: "channel-001",
    authorId: "user-003",
    author: { id: "user-003", username: "carol_dev", displayName: "Carol", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol" },
    content: "Yes! The mock data is in-memory so any saves to the mock files will hot-reload automatically with Next.js.",
    timestamp: hoursAgo(9),
    editedAt: hoursAgo(8),
  },
  {
    id: "msg-019",
    channelId: "channel-001",
    authorId: "user-007",
    author: { id: "user-007", username: "grace_pm", displayName: "Grace", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace" },
    content: "Reminder: weekly sync call at 3pm today!",
    timestamp: hoursAgo(6),
  },
  {
    id: "msg-020",
    channelId: "channel-001",
    authorId: "user-002",
    author: { id: "user-002", username: "bob_mod", displayName: "Bob", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob" },
    content: "Can't make it today, will catch up via recording.",
    timestamp: hoursAgo(5),
  },
  {
    id: "msg-021",
    channelId: "channel-001",
    authorId: "user-001",
    author: { id: "user-001", username: "alice_admin", displayName: "Alice", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice" },
    content: "No worries Bob, we'll record it and share the notes.",
    timestamp: hoursAgo(5, -30),
  },
  {
    id: "msg-022",
    channelId: "channel-001",
    authorId: "user-010",
    author: { id: "user-010", username: "jack_ops", displayName: "Jack", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jack" },
    content: "Infrastructure update: upgraded Node to v20 LTS across all environments.",
    timestamp: hoursAgo(3),
    reactions: [{ emoji: "⬆️", count: 3, userIds: ["user-001", "user-006", "user-002"] }],
  },
  {
    id: "msg-023",
    channelId: "channel-001",
    authorId: "user-005",
    author: { id: "user-005", username: "eve_designer", displayName: "Eve", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=eve" },
    content: "Anyone else think the SearchBar modal needs a keyboard shortcut? Ctrl+K vibes.",
    timestamp: hoursAgo(2),
  },
  {
    id: "msg-024",
    channelId: "channel-001",
    authorId: "user-003",
    author: { id: "user-003", username: "carol_dev", displayName: "Carol", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol" },
    content: "100%. Already planning to add that in the SearchBar implementation.",
    timestamp: hoursAgo(1, 45),
    reactions: [{ emoji: "🔍", count: 2, userIds: ["user-005", "user-004"] }],
  },
  {
    id: "msg-025",
    channelId: "channel-001",
    authorId: "user-009",
    author: { id: "user-009", username: "iris_qa", displayName: "Iris", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=iris" },
    content: "Just finished manual testing on the TopBar component. Works great on mobile too!",
    timestamp: hoursAgo(1),
  },
  {
    id: "msg-026",
    channelId: "channel-001",
    authorId: "user-004",
    author: { id: "user-004", username: "dave_42", displayName: "Dave", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=dave" },
    content: "Nice! I'll merge the TopBar PR once CI passes.",
    timestamp: hoursAgo(0, 45),
  },
  {
    id: "msg-027",
    channelId: "channel-001",
    authorId: "user-007",
    author: { id: "user-007", username: "grace_pm", displayName: "Grace", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace" },
    content: "Great progress on the milestone 2 tasks everyone. We're in good shape for the demo.",
    timestamp: hoursAgo(0, 30),
    reactions: [
      { emoji: "💪", count: 5, userIds: ["user-001", "user-002", "user-003", "user-004", "user-005"] },
    ],
  },
  {
    id: "msg-028",
    channelId: "channel-001",
    authorId: "user-001",
    author: { id: "user-001", username: "alice_admin", displayName: "Alice", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice" },
    content: "Let's aim to have all Week 2 tasks merged by Friday EOD.",
    timestamp: hoursAgo(0, 20),
  },
  {
    id: "msg-029",
    channelId: "channel-001",
    authorId: "user-006",
    author: { id: "user-006", username: "frank_backend", displayName: "Frank", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=frank" },
    content: "Sounds good. I'll make sure the visibility guard is complete by then.",
    timestamp: hoursAgo(0, 15),
  },
  {
    id: "msg-030",
    channelId: "channel-001",
    authorId: "user-002",
    author: { id: "user-002", username: "bob_mod", displayName: "Bob", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob" },
    content: "Dropping a quick note: I updated the ESLint config to enforce the import alias rules. No more relative imports!",
    timestamp: hoursAgo(0, 5),
    reactions: [{ emoji: "🧹", count: 4, userIds: ["user-001", "user-003", "user-004", "user-005"] }],
  },
];

// ─── Minimal messages for other channels ─────────────────────────────────────

const announcementsMessages: Message[] = [
  {
    id: "msg-101",
    channelId: "channel-002",
    authorId: "user-001",
    author: { id: "user-001", username: "alice_admin", displayName: "Alice", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice" },
    content: "📢 **v0.1.0 Released!** The initial Harmony prototype is live. Check the release notes in #dev-updates.",
    timestamp: daysAgo(5),
    reactions: [{ emoji: "🎉", count: 8, userIds: ["user-002", "user-003", "user-004", "user-005", "user-006", "user-007", "user-008", "user-009"] }],
  },
  {
    id: "msg-102",
    channelId: "channel-002",
    authorId: "user-001",
    author: { id: "user-001", username: "alice_admin", displayName: "Alice", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice" },
    content: "📢 **Week 2 Sprint Kickoff** — Visibility toggle feature is our main focus. See the project board for assignments.",
    timestamp: daysAgo(2),
  },
];

// ─── Export all messages ──────────────────────────────────────────────────────

export const mockMessages: Message[] = [
  ...generalMessages,
  ...announcementsMessages,
];
