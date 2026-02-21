PROMPT:

Design a Figma page titled "🖥 Desktop — Channel View States" for Harmony's
Guest Public Channel View feature. All frames 1440×900px. Dark mode design
system: bg #36393f, panels #2f3136, deep #202225, elevated #40444b,
accent #5865f2, text #dcddde/#b9bbbe/#72767d, green #3ba55c, amber #faa81a,
red #ed4245. Font Inter. 64px gap between frames, organized in two rows of
four frames each.

Full-page layout applied to all frames (unless stated otherwise):

LEFT COLUMN — Server icon rail (72px wide, #202225, full height):
Centered vertically: server icon circle 48px (#5865f2 fill, white "H" 20px
bold, box-shadow 0 2px 8px rgba(0,0,0,0.4)). Active indicator: left bar 4px
#5865f2 spanning full height of icon area.

SIDEBAR — (240px wide, #2f3136, full height, padding 0):
- Server header (padding 16px 12px 8px): icon 40px + "Harmony Dev" 16px bold
  #dcddde + chevron-down #72767d right-aligned. Below: "1,247 members"
  12px #72767d.
- Divider 1px rgba(255,255,255,0.06)
- Section header "PUBLIC CHANNELS" (11px uppercase #72767d, padding 16px 8px
  4px)
- 5 channel rows (height 36px, padding 0 8px, border-radius 6px): #general
  [ACTIVE], #announcements, #help-and-questions, #off-topic [UNLISTED badge],
  #resources — same styling as component library Group 4.
- Members section: "342 online" chip (green dot + text)

MAIN CONTENT AREA — (flex-1, #36393f):
- Channel header (48px, #2f3136, border-bottom 1px rgba(255,255,255,0.06)):
  # icon + "general" 16px bold + divider + topic (13px #b9bbbe truncated)
  + search icon + share icon (right side)
- Message list area (scrollable, fills height between header and banner)
- GuestPromoBanner (72px, sticky bottom, #2f3136, border-top 1px
  rgba(255,255,255,0.06))

Standard message set (use for all loaded frames unless overridden):
MSG-1: "jdoe" (avatar #5865f2 "JD") — "Has anyone run into the Unity physics
  glitch on 2022.3? The rigidbody keeps clipping through mesh colliders when
  speed exceeds 12 units/s." [14:22]
MSG-2: consecutive jdoe — "I've tried adjusting collision detection to
  Continuous but it doesn't help." [14:22, no avatar/header]
MSG-3: "skumar" (avatar #3ba55c "SK") — "Yes! This is a known bug. The fix is
  to increase physics step frequency to 120 in Project Settings > Physics >
  Fixed Timestep = 0.00833" [14:35]
MSG-4: "mbell" (avatar #faa81a "MB") — "Adding to what skumar said — also
  check Rigidbody.maxDepenetrationVelocity, set it to 5 or 10." [14:41]
  + image attachment (400×225px placeholder gray block, "screenshot.png
  2.4 MB")
MSG-5: "skumar" — "Here's the Unity docs on physics timestep:" + file
  attachment card "unity-physics-docs.pdf 340 KB"
MSG-6: "jdoe" — "Incredible, the Fixed Timestep change fixed it completely."
  [14:58]
MSG-7: "mbell" — "Glad it worked! This one trips up a lot of people." [15:01]
MSG-8: "skumar" — "Pinning this thread — super common Unity gotcha." [15:03]

ROW 1:

Frame D1 "Loaded — Default":
Full page layout. All 8 standard messages visible in message list.
GuestPromoBanner: "Join Harmony Dev" + "Connect with 1,247 members and
participate in the conversation." + "Join Server" primary button + ✕.

Add annotation arrows:
- Pointing to sidebar: "C1.6 ServerSidebar — Only PUBLIC_INDEXABLE and
  PUBLIC_NO_INDEX channels shown. PRIVATE channels never rendered."
- Pointing to message list: "C1.3 MessageListComponent — SSR-rendered initial
  50 messages. Infinite scroll loads more. [State: S7, S9]"
- Pointing to GuestPromoBanner: "C1.4 GuestPromoBanner — Sticky bottom.
  Replaces message input. Zero content obstruction."
- Pointing to MSG-1: "C1.5 MessageCard — Read-only. No reactions, no thread
  icon. Hover reveals copy-link + share toolbar."

Frame D2 "Loading — Skeleton":
Full page layout. Sidebar and channel header show real data (same as D1).
Message list area: 8 skeleton MessageCard rows (use component library
Skeleton A). Each skeleton 640px wide, 68px tall, stacked with 2px gap.
GuestPromoBanner at bottom (real, not skeleton — it's part of SSR output).
Annotation: "Skeleton maintains exact MessageCard dimensions to prevent layout
shift on hydration. Banner is SSR-rendered — always shown from first paint.
[State: S6]"

Frame D3 "Empty Channel":
Full page layout. Sidebar and header real. Message list area empty — show
centered empty state from component library Group 6: hash icon 64px #40444b +
"No messages yet" + "Be the first to start the conversation." + "Join Server"
primary button. GuestPromoBanner at bottom.
Annotation: "Empty state CTA doubles as conversion prompt. Shown when channel
has 0 messages. [State: S7 with messages=[]"

Frame D4 "Message Highlighted (Deep Link)":
Full page layout. URL bar shows: harmony.app/c/harmony-dev/general?m=msg3.
Message list scrolled so MSG-3 (skumar's fix reply) is centered vertically in
the viewport. MSG-3 styled as Highlighted variant: bg rgba(250,168,26,0.08),
left border 2px #faa81a. Small indicator pill centered at top of message
list scroll area: bg #2f3136, border-radius 9999px, padding 4px 14px:
"Jumped to message" (11px #72767d). MSG-1, MSG-2 partially visible above;
MSG-4+ below.
Annotations:
- On highlighted message: "C2.2 MessageLinkHandler.scrollToMessage() +
  highlightMessage(). 3s amber tint, then fades. [State: M5]"
- On pill indicator: "Pill fades after 2s. aria-live='polite' announces
  'Jumped to message' to screen readers."

ROW 2:

Frame D5 "Infinite Scroll — Loading More":
Full page layout but scrolled to bottom. Channel header visible at top.
Last visible message is MSG-8 partially cut off by viewport bottom. Below
MSG-8: loading row (flex row justify-center align-center, height 40px):
3-dot animated spinner (#72767d, 24px) + "Loading more messages..."
(13px #72767d, 8px left gap). No GuestPromoBanner visible (scrolled off).
Scroll indicator on right side: thin scrollbar showing position near bottom.
Annotation: "C2.1 InfiniteScrollHandler — IntersectionObserver fires when
sentinel div enters viewport. Fetches page 2 (?page=2&limit=50). [State: M2]"

Frame D6 "Infinite Scroll — All Loaded":
Full page layout, scrolled to show oldest messages at top of channel. Above
all messages: EndOfChannel indicator from component library Group 9: centered
"Beginning of #general" with horizontal rules left and right. Below it: first
message in channel history (different older message: "johndoe" — "Welcome
everyone to #general!" timestamp "Jan 1, 2025").
Annotation: "hasMore = false returned by API. Sentinel div removed from DOM.
IntersectionObserver disconnected. [State: M1 hasMore=false]"

Frame D7 "Search Terms Highlighted":
Identical to D1 (full page, all 8 messages loaded). URL bar shows:
harmony.app/c/harmony-dev/general?ref=google (referrer). In MSG-1, MSG-3,
and MSG-5 the words "Unity physics" are highlighted: inline <mark> style
bg rgba(88,101,242,0.3), border-radius 2px, padding 0 2px.
A subtle annotation banner at the very top of the message list (32px, bg
rgba(88,101,242,0.08), border-bottom 1px rgba(88,101,242,0.2), padding 0
16px, flex row align-center gap 8px): search icon 14px #5865f2 + "Showing
results for 'Unity physics'" (12px #b9bbbe) + ✕ clear (12px #72767d).
Annotation: "C2.3 SearchHighlighter — parses search terms from
document.referrer on client hydration. Highlights applied post-SSR.
[F1.25]"

Frame D8 "Infinite Scroll — Load Error":
Full page layout, scrolled to bottom. MSG-8 partially visible. Below MSG-8
instead of spinner: error inline row (full width, bg rgba(237,66,69,0.08),
border-radius 6px, margin 8px 16px, padding 12px 16px, flex row align-center
gap 10px): warning triangle 20px #ed4245 + "Couldn't load more messages."
(13px #dcddde weight 600) + "Try again" (13px #5865f2 underline, right side).
Annotation: "RF-5 — Infinite scroll failure is non-blocking. Existing
messages remain visible. 'Try again' retriggers fetch. [State: RF-5
fallback]"

FIGMA MAKE RESPONSE:

