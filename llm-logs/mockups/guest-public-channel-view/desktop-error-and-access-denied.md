PROMPT:

Design a Figma page titled "🖥 Desktop — Error & Access Denied" for Harmony's
Guest Public Channel View feature. All frames 1440×900px. Same dark-mode
design system: bg #36393f, panels #2f3136, deep #202225, elevated #40444b,
accent #5865f2, text #dcddde/#b9bbbe/#72767d, green #3ba55c, amber #faa81a,
red #ed4245. Font Inter. 64px gap between frames. Frames arranged in two rows.

For each frame: the Harmony app shell (server icon rail + sidebar + main chat
area with faded messages) is rendered at 30% opacity as a background
"ghost layer" to provide context. Unless stated otherwise, a
rgba(0,0,0,0.72) full-viewport overlay sits above the ghost layer, and the
error panel or modal floats centered on top.

ROW 1:

Frame E1 "500 — Server Error":
NO overlay. Full app shell at full opacity (same 3-column layout as D1 but
message list area is replaced). In the main content area (right of sidebar),
centered horizontally and vertically within the message area:

Warning triangle icon 64px #ed4245, centered.
"Something went wrong" (24px bold #dcddde, margin-top 20px, centered).
"We couldn't load this channel right now. This is likely a temporary issue."
(15px #b9bbbe, margin-top 8px, max-width 520px centered, line-height 1.6).

Two buttons (flex row gap 8px, justify-center, margin-top 28px):
- "Try Again" primary (height 44px, bg #5865f2, text white 15px weight 600,
  padding 0 24px, border-radius 6px)
- "Go to Server" secondary (height 44px, bg #40444b, text #dcddde 15px,
  padding 0 24px, border-radius 6px)

Below buttons (margin-top 16px):
"Error ref: 500 · harmony.app/c/harmony-dev/general" (12px #72767d
monospace, centered).

Annotations:
- Arrow to error panel: "[RF-1] SSR crash caught by React error boundary.
  App chrome (sidebar, header) remains visible — only message content fails."
- Arrow to "Try Again" button: "Triggers full page reload. Server retries
  SSR render."
- Arrow to error ref: "Error code shown for support tickets. No stack traces
  exposed to guest."

Frame E2 "403 — Access Denied (From Search Engine)":
Ghost layer + overlay. Centered modal: 480px wide, bg #2f3136,
border-radius 12px, padding 32px, shadow 0 8px 32px rgba(0,0,0,0.6).

Lock icon 48px #72767d, inside circle 80px bg rgba(114,118,125,0.15), centered.
"This channel is private" (22px bold #dcddde, margin-top 20px, centered).
Divider 1px rgba(255,255,255,0.06), margin 18px 0.
Body: "The content you're looking for is in a private channel. You'll need to
join the server and be granted access to view it." (14px #b9bbbe line-height
1.6, centered, max-width 380px).

Amber info banner (full width, margin-top 14px, bg rgba(250,168,26,0.12),
border-left 4px solid #faa81a, border-radius 0 6px 6px 0, padding 10px 14px):
"⚠ The content you were searching for may be in another public channel."
(13px #faa81a, line-height 1.5).

Footer (margin-top 22px, flex column gap 10px):
- "Log in" primary (full width, height 44px, bg #5865f2, text white 15px
  weight 600, border-radius 6px)
- "Create Account" secondary (full width, height 44px, bg #40444b, text
  #dcddde, border-radius 6px)
- "Browse Public Channels" ghost text (full width, height 40px, 14px #5865f2
  centered, no bg)

Annotations:
- Arrow to modal: "[State: D2] Shown when referrer = search engine AND
  channel = PRIVATE. [F2.7]"
- Arrow to amber banner: "Guides user toward available public content."
- Arrow to footer: "Three CTAs ordered by conversion priority: auth first,
  browse fallback."
- Outside modal, arrow to backdrop: "Click outside does NOT dismiss — user
  must make a choice. No accidental dismissal."

Frame E3 "Redirect — Server Landing":
NO overlay. Full app shell at full opacity but SIDEBAR is replaced with
server landing layout:

Sidebar (240px, #2f3136): Server icon 64px circle centered (#5865f2 "H" 24px
bold) + "Harmony Dev" (18px bold #dcddde, margin-top 12px, centered) + "1,247
members" (13px #72767d, centered) + "Join Server" primary button (full width
minus 16px padding each side, height 40px, border-radius 6px, margin-top 12px).
Divider. "PUBLIC CHANNELS" section header. 5 channel rows (same as sidebar).

Main content area (replacing message list): amber info banner full-width at
top (bg rgba(250,168,26,0.08), border-bottom 1px rgba(250,168,26,0.3),
padding 14px 24px, flex row gap 12px align-center): amber warning triangle
20px + "The channel you requested is private. Here are the public channels
you can browse:" (14px #b9bbbe).

Below banner: 3 channel preview cards (flex row, gap 16px, padding 24px,
flex-wrap wrap). Each card (width ~280px, bg #2f3136, border-radius 8px,
border 1px rgba(255,255,255,0.06), padding 16px):
- Card 1: # icon 20px #dcddde + "general" (15px bold #dcddde) + INDEXED badge
  + "For general discussion" (13px #72767d, margin-top 4px) + message count
  "1,204 messages" (12px #72767d)
- Card 2: #help-and-questions, INDEXED, "Ask questions and get answers", "847
  messages"
- Card 3: #announcements, INDEXED, "Official server announcements", "312
  messages"

Annotations:
- Arrow to sidebar: "[State: D3] Redirect to /s/{server} landing. Server is
  public — show available public channels. [F2.8]"
- Arrow to amber banner: "Banner explains why user was redirected. Not an
  error — helpful guidance."
- Arrow to channel cards: "Channel preview cards link to their public URLs.
  Guest can immediately navigate to public content."

Frame E4 "404 — Not Found":
Ghost layer + overlay. Centered panel: 480px wide, bg #2f3136,
border-radius 12px, padding 32px, shadow 0 8px 32px rgba(0,0,0,0.6).

Compass/search icon 48px #72767d, inside circle 80px rgba(114,118,125,0.15),
centered.
"Channel not found" (22px bold #dcddde, margin-top 20px, centered).
Divider 1px rgba(255,255,255,0.06) margin 18px 0.
Body: "This channel doesn't exist, or it may have been removed. We can't
confirm whether it existed." (14px #b9bbbe line-height 1.6, max-width 380px
centered).
Note: "If you followed a link, it may be outdated." (13px #72767d italic,
margin-top 10px, centered).

Footer (margin-top 22px, flex column gap 10px):
- "Go to Homepage" secondary (full width, height 44px)
- "Browse Servers" ghost text (full width, 14px #5865f2)

Annotations:
- Arrow to modal: "[State: D4] Shown for: missing channel OR PRIVATE channel
  with PRIVATE server. No existence disclosure — prevents enumeration attacks
  [IF-6]. [F2.4]"
- Arrow to body copy: "Deliberately vague — does not reveal whether channel
  exists or is private."

ROW 2:

Frame E5 "Rate Limited":
Ghost layer + overlay. Centered panel: 440px wide, bg #2f3136,
border-radius 12px, padding 32px, shadow 0 8px 32px rgba(0,0,0,0.6).

Clock icon 48px #faa81a, inside circle 80px rgba(250,168,26,0.15), centered.
"Slow down!" (22px bold #dcddde, margin-top 20px, centered).
Divider 1px rgba(255,255,255,0.06) margin 18px 0.
"You're viewing a lot of content. Please wait a moment before continuing."
(14px #b9bbbe, line-height 1.6, centered, max-width 340px).

Countdown pill (margin-top 20px, bg #202225, border-radius 9999px, padding
10px 28px, display inline-block centered): "Try again in 23s" (16px #faa81a
monospace bold).

Note (margin-top 20px): "This limit applies to anonymous browsing only.
Creating a free account removes rate limits." (13px #72767d italic, centered,
max-width 340px).

Annotations:
- Arrow to panel: "[IF-2 / C4.3 RateLimiter] Per-IP rate limit for anonymous
  guests. Prevents scraping abuse."
- Arrow to countdown: "Countdown is dynamic — updates every second client-
  side. Displays server-returned retry-after value."
- Arrow to note: "Conversion opportunity — rate limit friction motivates
  account creation."

FIGMA MAKE RESPONSE:

