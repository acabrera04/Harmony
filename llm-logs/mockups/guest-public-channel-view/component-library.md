PROMPT:

Design a Figma component library page titled "🧩 Components" for Harmony's Guest
Public Channel View. One canvas, 48px gaps between groups, gray section headers
(11px uppercase letter-spacing 0.12em #72767d). Design system: Inter font.
bg #36393f, panels #2f3136, deep #202225, elevated #40444b, accent #5865f2,
text #dcddde/#b9bbbe/#72767d, green #3ba55c, amber #faa81a, red #ed4245.
Radii: badges 9999px, buttons/inputs 6px, cards 8px, modals 12px.

Group 1: MessageCard (640px wide, vertical stack of 4 variants)
All cards: padding 2px 48px 2px 16px, min-height 44px, avatar 32px circle (#5865f2
"JD" white 12px bold), 8px gap to content. Header: "jdoe" 14px 600 #dcddde +
timestamp 12px #72767d. Body: 15px #dcddde line-height 1.375.
A Default — transparent bg.
B Hover — bg rgba(4,4,5,0.07). Action toolbar top-right: bg #2f3136, border 1px
rgba(255,255,255,0.12), radius 6px, shadow 0 4px 16px rgba(0,0,0,0.4), 3 icon
buttons 28×28px (link, share, copy) #72767d.
C Highlighted — bg rgba(250,168,26,0.08), left border 2px #faa81a. Pill above:
bg #2f3136, radius 9999px, padding 4px 12px, "Jumped to message" 11px #72767d.
D Consecutive — no avatar/header. Timestamp 10px #72767d in 32px area on hover.

Group 2: MessageCard with Attachments (two variants side by side, 640px each)
A Image: card + image block 400×225px #202225 radius 4px, camera icon 32px #40444b
centered, "screenshot.png 2.4 MB" 12px #72767d below.
B File: card + attachment card 400×56px #2f3136 border 1px rgba(255,255,255,0.06)
radius 6px padding 12px 16px: doc icon 28px #5865f2 + "harmony-docs.pdf" 14px 600
#dcddde + "340 KB" 12px #72767d + download icon 20px #72767d right.

Group 3: GuestPromoBanner (two variants side by side)
A Default (800×72px): bg #2f3136, border-top 1px rgba(255,255,255,0.06), flex row
space-between align-center, padding 0 16px. Left: server icon 32px #5865f2 "H" +
"Join Harmony Dev" 14px 600 + "Connect with 1,247 members..." 13px #b9bbbe.
Right: "Join Server" button 36px #5865f2 + ✕ 20px #72767d.
B Dismissed (800×8px): dashed border 1px rgba(255,255,255,0.2), height 0, label
"height: 0px — collapsed after dismiss". Note: 200ms ease-out transition.

Group 4: ServerSidebar (240×600px, bg #2f3136)
Header: icon 40px #5865f2 "H" + "Harmony Dev" 16px 700 + chevron #72767d +
"1,247 members" 12px. Divider. "PUBLIC CHANNELS" header 11px uppercase.
5 channel rows (36px, radius 6px): #general ACTIVE (bg rgba(88,101,242,0.15), left
border 2px #5865f2, text #5865f2 600) + INDEXED badge. #announcements + INDEXED.
#help-and-questions + INDEXED. #off-topic + UNLISTED. #resources + INDEXED.
Hover on #announcements: bg #40444b text #dcddde. Members chip: green dot
"342 online" 11px #3ba55c bg rgba(59,165,92,0.15) radius 9999px.

Group 5: ChannelHeader (860×48px, bg #2f3136, border-bottom 1px rgba(255,255,255,0.06))
Left: # 20px #72767d + "general" 16px 600 + divider 1px 20px + topic 13px #b9bbbe
truncated. Right: search icon + share icon, both 20px #b9bbbe.

Group 6: EmptyState (640×360px, centered)
Hash # 64px #40444b + "No messages yet" 18px 600 #dcddde + "Be the first to start
the conversation." 14px #72767d + "Join Server" button 40px #5865f2 margin-top 20px.

Group 7: SkeletonLoader (three variants side by side)
A MessageCard Skeleton (640×68px): circle 32px #40444b + shimmer line 12px 120px
#40444b + shimmer line 14px 90% rgba(255,255,255,0.06) margin-top 8px.
B SidebarRow Skeleton (240×36px): circle 8px #40444b + shimmer 10px 60% #40444b.
C ChannelHeader Skeleton (640×48px bg #2f3136): shimmer 80×14px + shimmer 200×12px
left; two shimmer circles 20px #40444b right.
Note: "1.4s shimmer sweep. Static #40444b under prefers-reduced-motion."

Group 8: AccessDenied States (three cards horizontal, 400px wide each)
A Login Prompt: bg #2f3136 radius 12px padding 28px. Lock 40px #72767d in circle
68px rgba(114,118,125,0.15). "This channel is private" 20px bold. Divider. Body
13px #b9bbbe. Amber strip bg rgba(250,168,26,0.12) border-left 4px #faa81a radius
6px 12px #faa81a. Footer: "Log in" primary 40px + "Create Account" secondary 40px +
"Browse Public Channels" ghost 36px #5865f2.
B 404 Not Found: compass icon #72767d. "Channel not found" 20px bold. Body 13px +
italic note 12px #72767d. Footer: "Go to Homepage" secondary + "Browse Servers" ghost.
C Rate Limited: clock 40px #faa81a. "Slow down!" 20px bold. Body 13px. Countdown
pill bg #202225 radius 9999px padding 8px 20px: "Try again in 23s" 15px #faa81a mono.

Group 9: EndOfChannel Indicator (640×32px)
Flex row: line flex-1 1px rgba(255,255,255,0.06) — "Beginning of #general" 13px
#72767d padding 0 12px — line flex-1. Note: "Shown when hasMore=false."

FIGMA MAKE RESPONSE:

