PROMPT:

Design a Figma component library page for Harmony's Guest Public Channel View
feature. Title the page "🧩 Components". Place all component groups on one
canvas with 48px gaps between groups. Label each group with a gray section
header (11px uppercase, letter-spacing 0.12em, color #72767d).

Design system: Font = Inter. Background = #36393f (surface), #2f3136 (panels),
#202225 (deep). Accent = #5865f2. Text = #dcddde / #b9bbbe / #72767d.
Green = #3ba55c, Amber = #faa81a, Red = #ed4245.
Border radius: badges 9999px, buttons/inputs 6px, cards 8px, modals 12px.

--- Group 1: MessageCard ---

Show four MessageCard variants in a vertical stack. Each card is 640px wide.

Card structure (all variants):
- Padding: 2px 48px 2px 16px, min-height 44px
- Left: Avatar circle 32px (show "JD" white 12px bold on #5865f2 fill)
- 8px gap to right content column (flex-grow)
- Header row: username "jdoe" (14px weight 600 #dcddde) + "Today at 3:42 PM"
  (12px #72767d, 4px left gap)
- Body: "Has anyone run into the Unity physics glitch on 2022.3? The rigidbody
  keeps clipping through mesh colliders when speed exceeds 12 units/s."
  (15px #dcddde line-height 1.375)

Variant A "Default": transparent background.

Variant B "Hover": background rgba(4,4,5,0.07). Show message action toolbar
at top-right corner of card: bg #2f3136, border 1px rgba(255,255,255,0.12),
border-radius 6px, shadow 0 4px 16px rgba(0,0,0,0.4), padding 4px, flex row
gap 2px. Three icon buttons (28×28px each, border-radius 4px, hover bg
rgba(255,255,255,0.1)): link-icon, share-icon, copy-icon — all #72767d.
Annotation: "Hover reveals action toolbar. Copy link + share only — no
reactions, no thread for guests."

Variant C "Highlighted (Deep Link)": background rgba(250,168,26,0.08), left
border 2px solid #faa81a. A subtle pill indicator above the card (small, bg
#2f3136, border-radius 9999px, padding 4px 12px, centered): "Jumped to
message" (11px #72767d). Annotation: "Deep link target. Amber tint + left bar
for 3s then fades. C2.2 MessageLinkHandler."

Variant D "Consecutive (Same Author)": same as Default but no avatar circle
and no header row. In the space where avatar would be, show the timestamp
"3:42" (10px #72767d, right-aligned, 32px wide area) only on hover. Body text
starts at same indent as other cards. Annotation: "Messages from same author
within 5 min omit avatar + header. Timestamp visible on hover only."

--- Group 2: MessageCard with Attachments ---

Two variants side by side, 640px wide each.

Variant A "Image Attachment": same card structure as Default. Below message
text (8px gap): image embed block. Background #202225, border-radius 4px,
width 400px, height 225px (16:9 ratio). Inside: centered camera-icon outline
(32px, #40444b) — placeholder for image content. Below embed: filename
"screenshot.png" (12px #72767d) + "2.4 MB" (12px #72767d, 4px left gap).

Variant B "File Attachment": below message text (8px gap): file attachment
card. Width 400px, height 56px, bg #2f3136, border 1px rgba(255,255,255,0.06),
border-radius 6px, padding 12px 16px, flex row align-center gap 12px.
Left: document icon 28px #5865f2. Center: "harmony-docs.pdf" (14px #dcddde
weight 600) + "340 KB" (12px #72767d). Right: download icon 20px #72767d.

--- Group 3: GuestPromoBanner ---

Two variants side by side.

Variant A "Default" (800px wide, 72px tall):
Background #2f3136, border-top 1px rgba(255,255,255,0.06), padding 0 16px.
Flex row align-center, justify-content space-between.

Left cluster (flex row gap 12px, align-center):
- Server icon circle 32px (#5865f2 fill, white "H" 14px bold)
- Text column: "Join Harmony Dev" (14px weight 600 #dcddde) on line 1 +
  "Connect with 1,247 members and participate in the conversation."
  (13px #b9bbbe) on line 2

Right cluster (flex row gap 8px, align-center):
- "Join Server" primary button (height 36px, bg #5865f2, text white 14px
  weight 600, padding 0 16px, border-radius 6px)
- ✕ dismiss icon button (20px #72767d, 32×32px tap area, border-radius 4px)

Annotation arrow pointing to banner: "Sticky bottom of message area. Replaces
the message input box entirely for guests. Never shown to authenticated users."

Variant B "Dismissed" (800px wide, dashed outline only, 8px tall):
Show as a nearly-invisible collapsed state: dashed border 1px rgba(255,255,255,
0.2), height 0 with label "height: 0px — collapsed after dismiss". Annotation:
"Collapses to 0 height with 200ms ease-out transition. AnonymousSessionManager
stores dismiss preference for 24h."

--- Group 4: ServerSidebar ---

Frame 240px wide, 600px tall, background #2f3136, padding 0.

Top section (padding 16px 12px 8px):
Flex row gap 8px align-center: server icon circle 40px (#5865f2 fill, white
"H" 18px bold) + text column: "Harmony Dev" (16px weight 700 #dcddde) +
chevron-down 16px #72767d right-aligned. Second line below: "1,247 members"
(12px #72767d).

Divider: 1px rgba(255,255,255,0.06), margin 8px 0.

Section header: "PUBLIC CHANNELS" (11px uppercase weight 600 #72767d,
padding 16px 8px 4px 8px).

Five channel rows (height 36px each, padding 0 8px, border-radius 6px,
flex row gap 6px, align-center):
1. #general [ACTIVE: bg rgba(88,101,242,0.15), left border 2px #5865f2,
   text "general" #5865f2 weight 600] + INDEXED badge sm (right-aligned)
2. #announcements — text #b9bbbe + INDEXED badge sm
3. #help-and-questions — text #b9bbbe + INDEXED badge sm
4. #off-topic — text #b9bbbe + UNLISTED badge sm
5. #resources — text #b9bbbe + INDEXED badge sm

Each row: # icon (14px #72767d) + channel name (14px) + badge right-aligned.

Show hover state on #announcements row: bg #40444b, text #dcddde.

Section header: "MEMBERS" (same style, margin-top 8px). Member count chip
(bg rgba(59,165,92,0.15), border-radius 9999px, padding 2px 8px, flex row
gap 4px): green dot 6px + "342 online" (11px #3ba55c weight 600).

Annotation: "Only PUBLIC_INDEXABLE and PUBLIC_NO_INDEX channels shown. PRIVATE
channels are never rendered in the sidebar. C1.6 ServerSidebar."

--- Group 5: ChannelHeader ---

Frame 860px wide, 48px tall, bg #2f3136,
border-bottom 1px rgba(255,255,255,0.06), padding 0 16px.

Left side (flex row align-center gap 8px):
- # icon 20px #72767d
- "general" (16px weight 600 #dcddde)
- Vertical divider: 1px rgba(255,255,255,0.12), height 20px, margin 0 12px
- Channel topic: "For general discussion about anything in the server"
  (13px #b9bbbe, max-width 420px, overflow ellipsis)

Right side (flex row gap 8px):
- Search icon 20px #b9bbbe
- Share icon 20px #b9bbbe

Annotation: "Read-only header for guests. No message input rendered below.
No moderation controls. Topic truncated after ~60 chars at 1440px."

--- Group 6: EmptyState ---

Frame 640px wide, 360px tall, centered content, transparent background.

Centered vertically and horizontally:
- Hash # icon outlined, 64px, color #40444b, margin-bottom 16px
- "No messages yet" (18px weight 600 #dcddde)
- "Be the first to start the conversation." (14px #72767d, margin-top 4px)
- "Join Server" primary button (height 40px, bg #5865f2, text white 14px
  weight 600, padding 0 24px, border-radius 6px, margin-top 20px)

Annotation: "Shown when public channel has 0 messages. CTA serves as both
empty-state explanation and conversion prompt."

--- Group 7: SkeletonLoader ---

Show three skeleton variants side by side.

Skeleton A "MessageCard Skeleton" (640px × 68px):
bg transparent. Left: circle 32px bg #40444b. Right column: two shimmer lines:
line 1 (height 12px, width 120px, bg #40444b, border-radius 4px) + line 2
(height 14px, width 90% max-width 560px, bg rgba(255,255,255,0.06),
border-radius 4px, margin-top 8px).

Skeleton B "SidebarRow Skeleton" (240px × 36px):
bg transparent. Left: circle 8px #40444b (channel icon placeholder). Right:
shimmer line (height 10px, width 60%, bg #40444b, border-radius 4px).

Skeleton C "ChannelHeader Skeleton" (640px × 48px, bg #2f3136):
Left: shimmer 80px × 14px + gap + shimmer 200px × 12px. Right: two shimmer
circles 20px #40444b.

Below all three skeletons, add a note:
"Shimmer: 1.4s horizontal gradient sweep animation. Disabled when
prefers-reduced-motion is set (shows static #40444b instead)."

--- Group 8: AccessDenied States ---

Three cards in a horizontal row, 400px wide each, variable height.

Card A "Login Prompt" (from search):
bg #2f3136, border-radius 12px, padding 28px.
- Lock icon 40px #72767d, in circle 68px bg rgba(114,118,125,0.15), centered
- "This channel is private" (20px bold #dcddde, margin-top 16px)
- Divider 1px rgba(255,255,255,0.06) margin 14px 0
- "The content you're looking for is in a private channel. You'll need to
  join the server to access it." (13px #b9bbbe line-height 1.6)
- Amber info strip (bg rgba(250,168,26,0.12), border-left 4px #faa81a,
  border-radius 6px, padding 8px 12px, margin-top 10px):
  "The content you searched for may be in another public channel."
  (12px #faa81a)
- Footer (margin-top 16px, flex column gap 8px):
  "Log in" primary button (full width, height 40px) +
  "Create Account" secondary (full width, height 40px) +
  "Browse Public Channels" ghost text (full width, 13px #5865f2 centered,
  height 36px)

Card B "404 Not Found":
bg #2f3136, border-radius 12px, padding 28px.
- Compass/search icon 40px #72767d, in circle 68px rgba(114,118,125,0.15)
- "Channel not found" (20px bold #dcddde, margin-top 16px)
- Divider
- "This channel doesn't exist, or you may not have access. We can't confirm
  whether it existed." (13px #b9bbbe line-height 1.6)
- "If you followed a link, it may be outdated." (12px #72767d italic,
  margin-top 8px)
- Footer: "Go to Homepage" secondary (full width) + "Browse Servers" ghost

Card C "Rate Limited":
bg #2f3136, border-radius 12px, padding 28px.
- Clock icon 40px #faa81a, in circle 68px rgba(250,168,26,0.15)
- "Slow down!" (20px bold #dcddde, margin-top 16px)
- Divider
- "You're viewing a lot of content. Please wait before continuing."
  (13px #b9bbbe)
- Countdown pill (margin-top 14px, bg #202225, border-radius 9999px,
  padding 8px 20px, display inline-block):
  "Try again in 23s" (15px #faa81a monospace bold)

--- Group 9: EndOfChannel Indicator ---

Frame 640px wide, 32px tall, centered content.
Horizontal rule: flex row align-center gap 12px. Left line: flex-1 height 1px
bg rgba(255,255,255,0.06). Center text: "Beginning of #general" (13px #72767d,
padding 0 12px). Right line: same as left.

Annotation: "Rendered when hasMore = false. Sentinel div removed from DOM.
[State: M1 with hasMore=false]"

FIGMA MAKE RESPONSE:

