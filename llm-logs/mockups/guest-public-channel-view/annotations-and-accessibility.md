PROMPT:

Design a Figma page titled "📐 Responsive & Accessibility" for Harmony's Guest
Public Channel View. Dark mode same palette as prior pages. Documentation-focused:
wide annotation frames with labels, arrows, callout boxes. Purple (#9b59b6) for
accessibility annotations, red (#e74c3c) for layout/responsive annotations.

Frame R1 "Responsive — Layout Breakpoints" (2400×700px):
Three full-layout states side by side, 80px between, connected by dashed red
breakpoint lines.

Left "Desktop ≥1024px": 3-column thumbnail — server rail 72px (#202225) + sidebar
240px (#2f3136) with channel list + main area flex-1 (#36393f) + GuestPromoBanner
72px. Red annotation: "3-column. Banner 72px full text + icon + CTA + dismiss."

Middle "Tablet 768–1023px": 2-column — icon rail 56px (#202225) icon only + main
area flex-1. Banner: icon + single-line truncated text + "Join Server" + ✕. Red
annotation: "Rail collapses to icons. Sidebar as overlay. Banner single-line."

Right "Mobile <768px": Single column — header 52px + message list + banner 64px
compact ("Join" short label). Red annotation: "No rail or sidebar. Hamburger opens
drawer. Banner 64px compact."

Dashed red vertical lines between columns: "breakpoint: 1024px" and "breakpoint:
768px". Below all three, red-outline annotation box: "Message input NEVER rendered
for guests at any breakpoint. GuestPromoBanner always visible above viewport bottom."

Frame R2 "GuestPromoBanner Adaptation" (2400×320px):
Three banner variants side by side labeled by breakpoint.

Left "≥1024px" (800×72px #2f3136): server icon 32px + "Join Harmony Dev" 14px 600
+ "Connect with 1,247 members and participate in the conversation." 13px #b9bbbe +
"Join Server" 36px button + ✕ 20px. Red annotation: "Full text, both lines."

Middle "768–1023px" (560×64px #2f3136): icon 28px + single truncated line 13px +
"Join Server" 32px + ✕. Red annotation: "Truncated single line with ellipsis."

Right "<768px" (375×64px #2f3136): icon 28px + "Join Harmony Dev" 13px 600 /
"Connect with 1,247 members." 11px + "Join" 32px padding 0 12px + ✕. Red
annotation: "'Join Server' shortened to 'Join'. Fits 375px."

Below: annotation box: "Dismiss stores 24h preference via AnonymousSessionManager.
Never shown to authenticated users."

Frame A1 "Tab Order — Desktop D1" (1440×900px):
Full D1 loaded default at full opacity. Purple numbered circles (22px bg #9b59b6
white 12px bold) on each interactive element in tab order:
① #general channel link (aria-current="page")  ② #announcements  ③ #help-and-
questions  ④ #off-topic  ⑤ #resources  ⑥ Search icon  ⑦ Share icon  ⑧ MSG-1
copy-link (visible on focus)  ⑨ MSG-1 share  ⑩ "Join Server" button  ⑪ ✕ dismiss

Purple bracket on sidebar: 'role="navigation" aria-label="Public channels". ↑↓
arrow keys within list. aria-current="page" on active link.'
Purple label on MSG-1: 'role="article" aria-labelledby="author-ts-{id}". Hover
toolbar on keyboard focus — copy-link and share only for guests.'
Purple note bottom: 'Escape on GuestPromoBanner dismiss: no modal to close. "Join
Server" navigates to auth flow (new page, no focus trap needed).'

Frame A2 "Focus Trap — E2 Access Denied Modal" (1440×900px):
E2 403 modal in context over dimmed app. Purple annotations:

Purple box around modal: 'role="dialog" aria-modal="true" aria-labelledby=
"access-denied-title". Focus trapped on open. Click outside does NOT dismiss —
intentional. Escape: no action (non-dismissible modal).'
Purple tab numbers inside modal: ① modal (receives focus on open)  ② "Log in"
③ "Create Account"  ④ "Browse Public Channels"
Purple arrow on title: 'id="access-denied-title" — linked by aria-labelledby.'
Purple arrow on backdrop: 'aria-hidden="true". Pointer-events ignored for keyboard.'
Purple note: 'Focus stays trapped until user navigates away via a CTA button.'

Frame A3 "Touch Targets & Motion — Mobile M1" (600×900px):
M1 at full size. Purple dashed 44×44px boxes on tappable elements:
☰ hamburger: "44×44px ✓"  |  Search icon: "44×44px ✓"  |  Share icon: "44×44px ✓"
MessageCard (full-width 68px+): "Full-width — no issue"
"Join" button (32px visual, 44px tap via padding): "Extended tap area ✓"
✕ dismiss (18px icon, 32×32px): "32×32px — low-stakes dismissible action"

Purple note: 'All primary elements meet 44×44px minimum (Apple HIG, WCAG 2.5.5).
✕ exception: 32×32px justified by low-stakes reversible action.'
Purple motion callout box top-right: 'prefers-reduced-motion:
• Skeleton shimmer → static #40444b
• Deep-link amber fade → instant apply
• Banner dismiss → instant hide
• Infinite scroll append → instant insert
• Highlight pill → instant hide'

FIGMA MAKE RESPONSE:

