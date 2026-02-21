PROMPT:

Design a Figma page titled "📐 Responsive & Accessibility" for Harmony's Guest
Public Channel View feature. Dark mode same palette as prior pages. This page is
documentation-focused: wider annotation frames with labels, arrows, and callout
boxes. Use purple (#9b59b6) for all accessibility annotations and red (#e74c3c) for
layout/responsive annotations.

Frame R1 "Responsive — Full Layout Breakpoints" (2400×700px):
Show three full-page layout states side by side with 80px between them, connected
by dashed red vertical lines labeled with breakpoints.

Left: "Desktop ≥1024px" label above. Three-column layout thumbnail (1440px shown
at ~33% scale): server icon rail 72px (#202225) + sidebar 240px (#2f3136) with
PUBLIC CHANNELS list + main content area (flex-1, #36393f) with message list +
GuestPromoBanner 72px at bottom. Red annotation: "Full 3-column layout. Server rail
+ sidebar + main area. GuestPromoBanner 72px, full text."

Middle: "Tablet 768–1023px" label above. Two-column layout: icon rail 56px
(#202225, only server icon, no text) + main content (flex-1). No sidebar text
labels. GuestPromoBanner shows icon + single-line truncated text + "Join Server" +
✕. Red annotation: "Server rail narrows to 56px, icon only. Sidebar collapses —
hamburger reveals it as overlay. GuestPromoBanner truncates to single line."

Right: "Mobile <768px" label above. Single column: full-width header bar (52px) +
message list + GuestPromoBanner 64px compact (short 'Join' label). Red annotation:
"Single column. No rail, no sidebar. GuestPromoBanner compact: 64px, short label.
Drawer accessed via ☰ hamburger."

Between left and middle: dashed vertical red line, label "breakpoint: 1024px".
Between middle and right: dashed vertical red line, label "breakpoint: 768px".

Below all three, full-width annotation box (red outline): "Message input is NEVER
rendered for guests at any breakpoint. GuestPromoBanner always occupies its position
above the viewport bottom edge. Zero content obstruction at all breakpoints."

Frame R2 "Responsive — GuestPromoBanner Adaptation" (2400×400px):
Three banner variants side by side, labeled by breakpoint.

Left "≥1024px — Full" (800px wide, 72px tall, bg #2f3136, border-top 1px
rgba(255,255,255,0.06)):
Flex row: server icon 32px + text column "Join Harmony Dev" (14px bold) / "Connect
with 1,247 members and participate in the conversation." (13px #b9bbbe) + "Join
Server" primary button (36px) + ✕ 20px.
Red annotation: "Full variant. All elements visible. Server icon + full two-line
text + CTA button + dismiss."

Middle "768–1023px — Compact" (560px wide, 64px tall, bg #2f3136):
Flex row: server icon 28px + "Join Harmony Dev — Connect with 1,247 members."
(single line 13px #b9bbbe, truncated with ellipsis at ~260px) + "Join Server"
button (32px) + ✕ 18px.
Red annotation: "Topic text truncated to single line. Button label unchanged.
Icon slightly smaller."

Right "<768px — Mobile" (375px wide, 64px tall, bg #2f3136):
Flex row: server icon 28px + text column "Join Harmony Dev" (13px bold) / "Connect
with 1,247 members." (11px #b9bbbe) + "Join" button (32px, shorter label, padding
0 12px) + ✕ 18px.
Red annotation: "Mobile: 'Join Server' shortened to 'Join'. Text column two lines
but smaller. Fits 375px without overflow."

Below all three, annotation box: "Dismiss stores preference for 24h via
AnonymousSessionManager (localStorage). Re-shown after 24h. Never shown to
authenticated users."

Frame A1 "Accessibility — Desktop Tab Order (D1 Loaded Default)" (1440×900px):
Show the full desktop channel view (D1 — Loaded Default) at full opacity. Overlay
purple accessibility annotations.

Purple numbered circles (white text bold 12px, circle 22px bg #9b59b6) placed on
each interactive element in tab order:
① Sidebar: first channel link (#general, aria-current="page")
② Sidebar: #announcements channel link
③ Sidebar: #help-and-questions channel link
④ Sidebar: #off-topic channel link
⑤ Sidebar: #resources channel link
⑥ Channel header: search icon button
⑦ Channel header: share icon button
⑧ MessageCard (first): copy-link icon (visible on keyboard focus, hidden by default)
⑨ MessageCard (first): share icon
⑩ GuestPromoBanner: "Join Server" button
⑪ GuestPromoBanner: ✕ dismiss button

Purple bracket around sidebar channel list with label box:
'role="navigation" aria-label="Public channels"
Navigation: ↑↓ Arrow keys within the list.
Tab moves to next landmark (channel header).
aria-current="page" on active channel link.'

Purple label on MSG-1 MessageCard:
'role="article"
aria-labelledby="author-ts-{id}"
Hover toolbar appears on focus — not just pointer hover.
Copy-link and share are the only guest-accessible actions.'

Purple note at bottom of frame:
'Keyboard: Tab cycles through ①–⑪. Shift+Tab reverses order.
GuestPromoBanner dismiss ✕ does not close any modal — no focus trap needed.
"Join Server" button navigates to auth flow (new page — no focus trap).'

Frame A2 "Accessibility — Modal Focus Trap (E2 Access Denied)" (1440×900px):
Show the 403 Access Denied modal (E2 frame) in context over the dimmed app.
Purple annotations:

Purple box around entire modal (480px panel):
'role="dialog" aria-modal="true"
aria-labelledby="access-denied-title"
Focus trapped inside modal on open.
Click outside does NOT dismiss — user must make a choice.
Escape key: no action (modal is non-dismissible — intentional).'

Purple tab order numbers inside modal:
① Modal container (receives focus on open — first focusable element)
② "Log in" primary button
③ "Create Account" secondary button
④ "Browse Public Channels" ghost text link

Purple arrow from "This channel is private" heading:
'id="access-denied-title" — linked by aria-labelledby on the dialog element.'

Purple note on amber banner:
'role="note" — informational, not a live region.
Announces on screen reader when modal opens (part of dialog content).'

Purple note at bottom:
'Focus does NOT return on close — modal requires user to navigate away.
"Log in" opens new auth page. "Browse Public Channels" navigates to server landing.'

Purple arrow to backdrop:
'aria-hidden="true" — backdrop is decorative.
Pointer-events: none for keyboard users (no click-outside close).
Screen readers see only modal content while open.'

Frame A3 "Accessibility — Mobile Touch Targets (M1)" (600×900px):
Show the mobile loaded default frame (M1) at full size. Purple accessibility
annotations.

Purple dashed boxes (2px #9b59b6) overlaid on each tappable element showing
minimum 44×44px touch targets:
- Hamburger ☰ icon (22px visual, 44×44px tap area): label "44×44px minimum — ✓"
- Search icon in header (22px visual, 44×44px): label "44×44px — ✓"
- Share icon in header (22px visual, 44×44px): label "44×44px — ✓"
- MessageCard (full width, 68px+ height): label "Full-width tap — no minimum issue"
- GuestPromoBanner "Join" button (32px height): label "32px visual — extended to
  44px tap area via padding"
- GuestPromoBanner ✕ dismiss (18px icon, 32×32px): label "32×32px — ⚠ minimum
  recommended is 44×44px; banner dismiss is low-stakes action"

Purple note at bottom:
'All primary interactive elements meet the 44×44px minimum touch target
(Apple HIG, WCAG 2.5.5 Level AAA). The ✕ dismiss is the only exception:
32×32px, justified by low-stakes, reversible action (banner re-appears after 24h).'

Purple motion note (top-right callout box, purple border):
'prefers-reduced-motion: reduce effects:
• Skeleton shimmer: static #40444b block — no sweep animation
• Deep-link highlight: amber tint applied instantly, no 3s fade
• Infinite scroll append: instant DOM insert — no slide-in
• GuestPromoBanner dismiss: instant hide — no collapse animation
• Message highlight pill: instant hide — no fade-out
Harmony respects user motion preferences across all guest view interactions.'

Purple note on MessageCard rows:
'role="article" + aria-labelledby ensures each message is a discrete landmark.
Screen readers can navigate message-to-message via article navigation shortcut (V).'

Purple note on GuestPromoBanner:
'role="complementary" aria-label="Join server"
aria-live="polite" — announces after page load.
Never interrupts screen reader on initial render.'

Frame A4 "Accessibility — ARIA Roles Reference" (1200×600px):
Documentation table (no app shell — pure annotation content). Title: "ARIA Role
Map — Guest Public Channel View" (18px bold #dcddde, margin-bottom 24px).

Table (full width, rows alternating bg #2f3136 / transparent, 1px rgba(255,255,255,
0.06) row borders):
Headers (11px uppercase #72767d): COMPONENT | ROLE | KEY ATTRIBUTES | NOTES

Rows:
MessageListComponent | role="feed" aria-busy="true/false" | Updates aria-busy on
  load | Feed role supports infinite scroll natively.
MessageCard | role="article" aria-labelledby="author-ts-{id}" | — | Enables article
  keyboard navigation for screen readers.
ServerSidebar | role="navigation" aria-label="Public channels" | — | Landmark
  navigation for skip links.
Active channel link | role="link" aria-current="page" | — | Communicates active
  page to screen readers.
GuestPromoBanner | role="complementary" aria-label="Join server" | aria-live="polite"
  | Announces after initial render delay.
Access denied modal | role="dialog" aria-modal="true" | aria-labelledby=heading id |
  Focus trapped. Non-dismissible by design.
Load more sentinel | role="status" aria-label="Loading more messages" | — | Hidden
  when hasMore=false.
Search mark highlights | — (inline <mark>) | Parent p aria-label includes full text |
  <mark> alone doesn't announce in all screen readers — parent label covers it.
End of channel | role="status" | aria-label="Beginning of #general" | Announces
  once when hasMore=false.

Below table, purple note: "All interactive elements require visible focus indicators
(2px #5865f2, 3px offset) meeting WCAG 2.4.11 Focus Appearance (Level AA)."

FIGMA MAKE RESPONSE:

