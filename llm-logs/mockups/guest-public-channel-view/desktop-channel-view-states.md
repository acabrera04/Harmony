PROMPT:

Design a Figma page titled "🖥 Desktop — Channel View States" for Harmony's Guest
Public Channel View. All frames 1440×900px, dark mode, Inter font. bg #36393f,
panels #2f3136, deep #202225, elevated #40444b, accent #5865f2, text #dcddde/
#b9bbbe/#72767d, green #3ba55c, amber #faa81a, red #ed4245. 64px gaps, two rows
of four frames.

Base layout (all frames unless noted):
- Server icon rail 72px #202225: circle 48px #5865f2 "H" bold, active indicator
  left bar 4px #5865f2.
- Sidebar 240px #2f3136: server header (icon 40px + "Harmony Dev" 16px bold +
  chevron + "1,247 members" 12px #72767d) → divider → "PUBLIC CHANNELS" 11px
  uppercase → 5 channel rows 36px (#general ACTIVE with #5865f2 tint + INDEXED
  badge, #announcements INDEXED, #help-and-questions INDEXED, #off-topic UNLISTED,
  #resources INDEXED) → members chip "342 online" green.
- Main area flex-1 #36393f: channel header 48px #2f3136 (# + "general" 16px bold +
  divider + topic 13px + search + share icons right) → message list (scrollable) →
  GuestPromoBanner 72px sticky bottom #2f3136 border-top 1px rgba(255,255,255,0.06).

Standard messages (all loaded frames):
MSG-1 jdoe (#5865f2 "JD"): "Has anyone run into the Unity physics glitch on 2022.3?
  Rigidbody clips through mesh colliders above 12 units/s." [14:22]
MSG-2 jdoe consecutive: "Tried Continuous collision detection — no help." [14:22]
MSG-3 skumar (#3ba55c "SK"): "Known bug — set Fixed Timestep=0.00833 in Physics." [14:35]
MSG-4 mbell (#faa81a "MB"): "Also set maxDepenetrationVelocity to 5-10." [14:41]
  + image 400×225px #202225 placeholder + "screenshot.png 2.4 MB"
MSG-5 skumar: "Unity docs:" + file card "unity-physics-docs.pdf 340 KB" #2f3136.
MSG-6 jdoe: "Fixed Timestep change fixed it completely." [14:58]
MSG-7 mbell: "Glad it worked!" [15:01]
MSG-8 skumar: "Pinning this — super common Unity gotcha." [15:03]

ROW 1:

Frame D1 "Loaded — Default": Base layout, all 8 messages. GuestPromoBanner: "Join
Harmony Dev" + "Connect with 1,247 members and participate in the conversation."
+ "Join Server" primary + ✕. Annotations: sidebar → "C1.6 Only PUBLIC_INDEXABLE/
PUBLIC_NO_INDEX channels shown"; message list → "C1.3 SSR-rendered 50 messages,
infinite scroll [S7, S9]"; banner → "C1.4 Sticky, replaces input, dismissible";
MSG-1 → "C1.5 Read-only. Hover reveals copy-link + share only."

Frame D2 "Loading — Skeleton": Base layout, sidebar + header real. Message list:
8 skeleton rows (640×68px each, 2px gap) using Skeleton A. GuestPromoBanner real
(SSR). Annotation: "Skeleton matches exact card dimensions — no layout shift on
hydration. Banner SSR-rendered always. [S6]"

Frame D3 "Empty Channel": Base layout, message list empty. Centered empty state:
# 64px #40444b + "No messages yet" 18px 600 + "Be the first to start the
conversation." 14px #72767d + "Join Server" button. GuestPromoBanner at bottom.
Annotation: "Empty state CTA doubles as conversion. [S7 messages=[]]"

Frame D4 "Message Highlighted (Deep Link)": Base layout. URL: "harmony.app/c/
harmony-dev/general?m=msg3". MSG-3 centered vertically: bg rgba(250,168,26,0.08),
left border 2px #faa81a. Pill above scroll: "Jumped to message" 11px #72767d
bg #2f3136 radius 9999px padding 4px 14px. Annotations: msg → "C2.2 3s amber
tint then fades [M5]"; pill → "Fades 2s, aria-live='polite'."

ROW 2:

Frame D5 "Infinite Scroll — Loading More": Base layout, scrolled to bottom. MSG-8
partially cut off. Below: loading row 40px flex center: 3-dot spinner 24px #72767d
+ "Loading more messages..." 13px #72767d 8px gap. No banner visible (scrolled).
Annotation: "C2.1 IntersectionObserver on sentinel div. Fetches ?page=2&limit=50.
[M2]"

Frame D6 "Infinite Scroll — All Loaded": Scrolled to channel top. Above all
messages: EndOfChannel indicator "Beginning of #general" with horizontal rules
left/right (13px #72767d). Below: oldest message "johndoe — Welcome everyone to
#general! [Jan 1, 2025]". Annotation: "hasMore=false. Sentinel removed from DOM.
IntersectionObserver disconnected. [M1]"

Frame D7 "Search Terms Highlighted": Identical to D1. URL: "harmony.app/c/harmony-
dev/general?ref=google". In MSG-1, MSG-3, MSG-5 highlight "Unity physics": bg
rgba(88,101,242,0.3) radius 2px padding 0 2px. Banner top of message list (32px,
bg rgba(88,101,242,0.08), border-bottom 1px rgba(88,101,242,0.2)): search icon
14px #5865f2 + "Showing results for 'Unity physics'" 12px + ✕.
Annotation: "C2.3 Parses referrer on hydration. [F1.25]"

Frame D8 "Infinite Scroll — Load Error": Scrolled to bottom. MSG-8 partially
visible. Below: error row full-width margin 8px 16px bg rgba(237,66,69,0.08)
radius 6px padding 12px 16px flex align-center gap 10px: warning triangle 20px
#ed4245 + "Couldn't load more messages." 13px #dcddde 600 + "Try again" 13px
#5865f2 underline right. Annotation: "RF-5 Non-blocking. Existing messages stay.
'Try again' retriggers fetch."

FIGMA MAKE RESPONSE:

