PROMPT:

Design a Figma page titled "🖥 Desktop — Error & Access Denied" for Harmony's
Guest Public Channel View. All frames 1440×900px, dark mode, Inter font. bg #36393f,
panels #2f3136, deep #202225, elevated #40444b, accent #5865f2, text #dcddde/
#b9bbbe/#72767d, green #3ba55c, amber #faa81a, red #ed4245. 64px gap, two rows.

Base app shell (fills the full 1440×900px frame in every frame):
- Server icon rail 72px full-height #202225: circle 48px #5865f2 "H" bold.
- Sidebar 240px full-height #2f3136: server header (icon 40px + "Harmony Dev"
  16px bold + "1,247 members" 12px #72767d) → divider → "PUBLIC CHANNELS" 11px
  uppercase → 5 channel rows 36px (#general, #announcements, #help-and-questions,
  #off-topic, #resources with INDEXED/UNLISTED badges).
- Main area flex-1 full-height #36393f: channel header 48px #2f3136 + message list.

Overlay frames (E2, E4, E5): app shell at 30% opacity + rgba(0,0,0,0.72) overlay
covering the full frame + error panel centered on top at full opacity.
Full-opacity frames (E1, E3): app shell at 100% opacity, no overlay.

ROW 1:

Frame E1 "500 — Server Error":
Full app shell 100% opacity. Message list replaced with centered error block:
- Warning triangle 64px #ed4245 centered.
- "Something went wrong" 24px bold #dcddde margin-top 20px centered.
- Body 15px #b9bbbe max-width 520px centered margin-top 8px.
- Buttons flex row gap 8px justify-center margin-top 28px:
  "Try Again" 44px #5865f2 padding 0 24px radius 6px +
  "Go to Server" 44px #40444b padding 0 24px radius 6px.
- "Error ref: 500 · harmony.app/c/harmony-dev/general" 12px #72767d mono.
Annotations: "[RF-1] SSR crash. App chrome stays visible." | "No stack traces."

Frame E2 "403 — Access Denied (From Search Engine)":
30% app shell + overlay. Centered modal 480px wide #2f3136 radius 12px padding 32px
shadow 0 8px 32px rgba(0,0,0,0.6):
- Lock 48px #72767d in circle 80px rgba(114,118,125,0.15) centered.
- "This channel is private" 22px bold #dcddde margin-top 20px centered.
- Divider 1px rgba(255,255,255,0.06) margin 18px 0.
- Body 14px #b9bbbe line-height 1.6 centered max-width 380px.
- Amber banner full-width bg rgba(250,168,26,0.12) border-left 4px #faa81a
  padding 10px 14px: "⚠ Content may be in another public channel." 13px #faa81a.
- Footer flex column gap 10px margin-top 22px: "Log in" primary full-width 44px
  #5865f2 + "Create Account" secondary 44px #40444b + "Browse Public Channels"
  ghost 40px 14px #5865f2.
Annotations: "[D2] From search + PRIVATE channel [F2.7]" | "Click outside does
NOT dismiss."

Frame E3 "Redirect — Server Landing":
Full app shell 100% opacity, sidebar content replaced:
- Sidebar 240px #2f3136: server icon 64px #5865f2 "H" centered + "Harmony Dev"
  18px bold + "1,247 members" 13px #72767d + "Join Server" full-width 40px #5865f2
  radius 6px. Divider. "PUBLIC CHANNELS". 5 channel rows.
- Main area: amber banner top (bg rgba(250,168,26,0.08), border-bottom 1px rgba
  (250,168,26,0.3), padding 14px 24px): triangle 20px + "The channel you requested
  is private. Here are the public channels you can browse:" 14px #b9bbbe.
- 3 channel preview cards flex row gap 16px padding 24px. Each 280px #2f3136
  radius 8px padding 16px: # icon + name bold + INDEXED badge + description
  13px #72767d. Cards: #general 1,204 msgs; #help-and-questions 847 msgs;
  #announcements 312 msgs.
Annotations: "[D3] Redirect /s/{server} [F2.8]" | "Cards link to public URLs."

Frame E4 "404 — Not Found":
30% app shell + overlay. Centered panel 480px #2f3136 radius 12px padding 32px:
- Compass icon 48px #72767d in circle 80px rgba(114,118,125,0.15) centered.
- "Channel not found" 22px bold #dcddde margin-top 20px centered.
- Divider 1px rgba(255,255,255,0.06) margin 18px 0.
- Body 14px #b9bbbe line-height 1.6 max-width 380px centered.
- "If you followed a link, it may be outdated." 13px #72767d italic.
- Footer flex column gap 10px margin-top 22px: "Go to Homepage" secondary full-
  width 44px + "Browse Servers" ghost 40px 14px #5865f2.
Annotations: "[D4] No existence disclosure — prevents enumeration. [IF-6]"

ROW 2:

Frame E5 "Rate Limited":
30% app shell + overlay. Centered panel 440px #2f3136 radius 12px padding 32px
shadow 0 8px 32px rgba(0,0,0,0.6):
- Clock 48px #faa81a in circle 80px rgba(250,168,26,0.15) centered.
- "Slow down!" 22px bold #dcddde margin-top 20px centered.
- Divider 1px rgba(255,255,255,0.06) margin 18px 0.
- "You're viewing a lot of content. Please wait a moment before continuing."
  14px #b9bbbe centered max-width 340px.
- Countdown pill margin-top 20px bg #202225 radius 9999px padding 10px 28px
  centered: "Try again in 23s" 16px #faa81a mono bold.
- "Limit applies to anonymous browsing only. Creating an account removes rate
  limits." 13px #72767d italic centered margin-top 20px max-width 340px.
Annotations: "[IF-2/C4.3] Per-IP rate limit. Dynamic countdown. Conversion opportunity."

FIGMA MAKE RESPONSE:

