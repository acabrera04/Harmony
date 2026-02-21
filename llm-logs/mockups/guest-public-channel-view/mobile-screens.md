PROMPT:

Design a Figma page titled "📱 Mobile Screens" for Harmony's Guest Public Channel
View feature. All frames 375×812px. Dark mode: bg #36393f, panels #2f3136, deep
#202225, elevated #40444b, accent #5865f2, text #dcddde/#b9bbbe/#72767d, green
#3ba55c, amber #faa81a, red #ed4245. Font Inter. Frames in two rows of four, 48px
gaps.

Standard mobile message set (use in all loaded frames unless overridden):
MSG-1: "jdoe" (avatar #5865f2 "JD") — "Has anyone run into the Unity physics glitch
  on 2022.3? The rigidbody keeps clipping through mesh colliders." [14:22]
MSG-2: consecutive jdoe — "I've tried adjusting collision detection to Continuous
  but it doesn't help." [14:22, no avatar/header]
MSG-3: "skumar" (avatar #3ba55c "SK") — "Yes! This is a known bug. Set Fixed
  Timestep = 0.00833 in Project Settings > Physics." [14:35]
MSG-4: "mbell" (avatar #faa81a "MB") — "Also check
  Rigidbody.maxDepenetrationVelocity, set to 5 or 10." [14:41]

Mobile app shell (applied to all message-visible frames):
- Status bar: 20px, bg #202225, centered clock "9:41" white 12px (iOS-style)
- Channel header: 52px, bg #2f3136, flex row align-center, padding 0 16px, gap 8px.
  Left: hamburger ☰ icon 22px #dcddde (44×44px tap area). Center: "# general"
  16px weight 600 #dcddde. Right: search icon 22px #b9bbbe (44×44px tap area) +
  share icon 22px #b9bbbe (44×44px tap area).
- Message list area: fills height between header and GuestPromoBanner (#36393f)
- GuestPromoBanner: 64px, sticky bottom, bg #2f3136, border-top 1px
  rgba(255,255,255,0.06). Flex row align-center, padding 0 12px, gap 8px.
  Left: server icon circle 28px (#5865f2 "H" 12px bold). Text column: "Join Harmony
  Dev" (13px weight 600 #dcddde) + "Connect with 1,247 members." (11px #b9bbbe).
  Right: "Join" button (height 32px, bg #5865f2, text white 13px weight 600, padding
  0 12px, border-radius 6px) + ✕ (18px #72767d, 32×32px tap area).

ROW 1:

Frame M1 "Loaded — Default":
Full mobile app shell. Message list shows all 4 standard messages. Each MessageCard:
padding 8px 16px, avatar 28px circle, username 13px weight 600 #dcddde, timestamp
10px #72767d, body 14px #dcddde line-height 1.375. GuestPromoBanner sticky at bottom.

Annotations:
- Arrow to ☰ hamburger: "Tap opens channel navigation drawer (M2). No sidebar
  visible on mobile — full width for content."
- Arrow to message list: "C1.3 MessageListComponent — SSR-rendered, read-only.
  No message input rendered at any mobile breakpoint."
- Arrow to GuestPromoBanner: "C1.4 GuestPromoBanner — compact mobile variant.
  Short 'Join' label (vs 'Join Server' on desktop). 64px height."

Frame M2 "Channel Navigation Drawer":
Message list at 30% opacity (app behind drawer). rgba(0,0,0,0.72) overlay covers
right 60% of screen (tap to close). Left drawer slides in from left edge: 280px wide,
bg #2f3136, full height, shadow 4px 0 24px rgba(0,0,0,0.5).

Drawer content:
- Drag indicator: 4px × 40px #40444b, centered horizontally just inside right edge
  of drawer at mid-height (visual affordance for swipe-to-close).
- Server header (padding 16px 12px 12px): server icon circle 40px (#5865f2 "H" 18px
  bold) + "Harmony Dev" 16px bold #dcddde + "1,247 members" 12px #72767d. Chevron
  right icon 14px #72767d right side.
- Divider 1px rgba(255,255,255,0.06).
- Section header "PUBLIC CHANNELS" (11px uppercase #72767d, padding 12px 8px 4px).
- 5 channel rows (height 44px, padding 0 8px, border-radius 6px, flex row gap 8px):
  #general [ACTIVE: bg rgba(88,101,242,0.15), text #5865f2 weight 600, left border
  2px #5865f2] + INDEXED badge sm right-aligned.
  #announcements — #b9bbbe + INDEXED badge sm.
  #help-and-questions — #b9bbbe + INDEXED badge sm.
  #off-topic — #b9bbbe + UNLISTED badge sm.
  #resources — #b9bbbe + INDEXED badge sm.
  Each row: # icon 14px #72767d + channel name 14px + badge.
- Members chip (margin-top 8px, padding 4px 8px, bg rgba(59,165,92,0.15),
  border-radius 9999px): green dot 6px + "342 online" 11px #3ba55c weight 600.

Annotations:
- Arrow to drawer: "[State: Drawer Open] Left drawer — same channel list as desktop
  sidebar. Only PUBLIC_INDEXABLE and PUBLIC_NO_INDEX shown. PRIVATE never rendered."
- Arrow to overlay: "Tap overlay to close drawer. Swipe left on drawer also closes."
- Arrow to INDEXED badge: "VisibilityBadge sm — reused from Issue #40 component
  library. Consistent visual language across admin and guest views."

Frame M3 "Loading — Skeleton":
Full mobile app shell. Channel header and GuestPromoBanner show real data. Message
list area: 4 skeleton MessageCard rows. Each skeleton: padding 8px 16px, flex row
gap 10px. Left: circle 28px #40444b. Right column: shimmer line 1 (height 10px,
width 90px, #40444b, border-radius 4px) + shimmer line 2 (height 13px, width 85%,
rgba(255,255,255,0.06), border-radius 4px, margin-top 8px) + shimmer line 3
(height 13px, width 60%, rgba(255,255,255,0.06), border-radius 4px, margin-top 4px).

Annotation: "Skeleton maintains exact MessageCard dimensions to prevent layout shift
on hydration. GuestPromoBanner is SSR-rendered — always visible from first paint.
[State: S6] Shimmer respects prefers-reduced-motion."

Frame M4 "Empty Channel":
Full mobile app shell. Message list area: centered empty state (margin auto, padding
32px 24px). Hash # icon outlined 48px #40444b, centered. "No messages yet" (16px
weight 600 #dcddde, margin-top 14px, centered). "Be the first to start the
conversation." (13px #72767d, margin-top 4px, centered). "Join Server" button
(height 40px, bg #5865f2, text white 14px weight 600, padding 0 20px, border-radius
6px, margin-top 18px). GuestPromoBanner at bottom.

Annotation: "Empty state CTA doubles as conversion prompt. Centered within available
message area height. [State: S7 with messages=[]]"

ROW 2:

Frame M5 "Access Denied — Login Prompt":
Full status bar + channel header at 30% opacity as ghost layer. rgba(0,0,0,0.72)
full-screen overlay. Bottom sheet slides up from bottom: bg #2f3136, border-radius
12px 12px 0 0, full width, height ~540px. Top: drag handle 4px × 32px #40444b
centered, margin-top 8px.

Sheet content (padding 24px):
- Lock icon 40px #72767d, in circle 68px bg rgba(114,118,125,0.15), centered.
- "This channel is private" (18px bold #dcddde, margin-top 16px, centered).
- Divider 1px rgba(255,255,255,0.06), margin 14px 0.
- Body: "You'll need to join the server and be granted access to view this channel."
  (13px #b9bbbe, line-height 1.6, centered).
- Amber info strip (full width, bg rgba(250,168,26,0.12), border-left 4px #faa81a,
  border-radius 0 6px 6px 0, padding 10px 12px, margin-top 12px):
  "⚠ The content you searched for may be in another public channel." (12px #faa81a,
  line-height 1.5).
- Footer (margin-top 20px, flex column gap 10px):
  "Log in" primary (full width, height 48px, bg #5865f2, text white 15px weight 600,
  border-radius 6px).
  "Create Account" secondary (full width, height 48px, bg #40444b, text #dcddde
  15px, border-radius 6px).
  "Browse Public Channels" ghost text (full width, height 44px, 14px #5865f2
  centered, no bg).

Annotations:
- Arrow to sheet: "[State: E2 mobile] Bottom sheet replaces centered modal. Swipe
  down does NOT dismiss — user must make a choice. [F2.7]"
- Arrow to footer: "Full-width buttons for thumb reach. Same three CTAs as desktop,
  ordered by conversion priority."

Frame M6 "Error State (500)":
Full mobile app shell — channel header visible, message list area replaced with
centered error state. No overlay, full opacity.

Centered in message area (padding 32px 24px):
- Warning triangle icon 48px #ed4245, centered.
- "Something went wrong" (18px bold #dcddde, margin-top 16px, centered).
- "We couldn't load this channel right now." (13px #b9bbbe, margin-top 8px,
  centered, line-height 1.6, max-width 280px).
- Two buttons stacked (flex column, gap 8px, margin-top 24px, full width within
  content padding):
  "Try Again" primary (height 48px, bg #5865f2, text white 14px weight 600,
  border-radius 6px, full width).
  "Go to Server" secondary (height 48px, bg #40444b, text #dcddde 14px, border-
  radius 6px, full width).
- "Error ref: 500 · harmony.app/c/harmony-dev/general" (11px #72767d monospace,
  margin-top 12px, centered).

GuestPromoBanner NOT shown (error state — no content rendered).

Annotations:
- Arrow to error panel: "[State: E1 mobile] SSR crash caught by React error
  boundary. App chrome (header) remains. Buttons stack full-width for mobile thumb
  reach. [RF-1]"
- Arrow to error ref: "No stack traces exposed. Error code for support tickets only."

Frame M7 "Message Highlighted (Deep Link)":
Full mobile app shell. URL shown in status bar area (small annotation, not part of
shell): "harmony.app/c/harmony-dev/general?m=msg3". Message list scrolled so MSG-3
(skumar's fix reply) is visible and centered in the viewport. MSG-3 styled as
Highlighted variant: bg rgba(250,168,26,0.08), left border 2px #faa81a. Pill
indicator just above MSG-3 (small, bg #2f3136, border-radius 9999px, padding 4px
12px, centered): "Jumped to message" (10px #72767d). MSG-1, MSG-2 partially visible
above; MSG-4 below. GuestPromoBanner at bottom.

Annotations:
- Arrow to highlighted message: "C2.2 MessageLinkHandler.scrollToMessage() +
  highlightMessage(). 3s amber tint then fades. [State: M5]"
- Arrow to pill: "Pill fades after 2s. aria-live='polite' announces 'Jumped to
  message' to screen readers."

Frame M8 "Infinite Scroll — Loading More":
Full mobile app shell, scrolled to bottom. MSG-4 partially cut off by viewport
bottom. Below MSG-4: loading row (flex row justify-center align-center, height 36px,
padding 0 16px): 3-dot animated spinner 20px #72767d + "Loading more..." (12px
#72767d, 6px left gap). GuestPromoBanner not visible (scrolled off).

Right edge: thin scrollbar showing position near bottom of scroll area.

Annotation: "C2.1 InfiniteScrollHandler — IntersectionObserver fires when sentinel
div enters viewport. Fetches page 2 (?page=2&limit=50). Spinner replaces 3-column
desktop loader — same pattern, tighter on mobile. [State: M2]"

FIGMA MAKE RESPONSE:

