PROMPT:

Design a Figma page titled "🖥 Desktop — Error & Access Denied" for Harmony's
Guest Public Channel View. All frames 1440×900px, dark mode, Inter font. bg #36393f,
panels #2f3136, deep #202225, elevated #40444b, accent #5865f2, text #dcddde/
#b9bbbe/#72767d, green #3ba55c, amber #faa81a, red #ed4245. 64px gap, two rows.

Ghost layer: app shell (server rail + sidebar + main chat) at 30% opacity as
background context. Default: rgba(0,0,0,0.72) full-viewport overlay above ghost
layer, error panel centered on top. Exceptions noted per frame.

App shell for ghost layer: server icon rail 72px #202225 + sidebar 240px #2f3136
(server header, PUBLIC CHANNELS list with 5 rows) + main area #36393f (channel
header + faded messages).

ROW 1:

Frame E1 "500 — Server Error":
NO overlay. Full app shell at full opacity. Message area replaced with centered
error (inline, no card bg):
- Warning triangle 64px #ed4245 centered.
- "Something went wrong" 24px bold #dcddde margin-top 20px centered.
- Body 15px #b9bbbe max-width 520px centered.
- Buttons flex row gap 8px justify-center margin-top 28px:
  "Try Again" 44px #5865f2 padding 0 24px radius 6px +
  "Go to Server" 44px #40444b padding 0 24px radius 6px.
- "Error ref: 500 · harmony.app/c/harmony-dev/general" 12px #72767d mono centered.
Annotations: panel → "[RF-1] SSR crash. Chrome stays visible.";
"Try Again" → "Full page reload."; ref → "No stack traces exposed."

Frame E2 "403 — Access Denied (From Search Engine)":
Ghost + overlay. Modal 480px #2f3136 radius 12px padding 32px shadow centered:
- Lock 48px #72767d in circle 80px rgba(114,118,125,0.15) centered.
- "This channel is private" 22px bold margin-top 20px centered.
- Divider 1px rgba(255,255,255,0.06) margin 18px 0.
- Body 14px #b9bbbe line-height 1.6 centered max-width 380px.
- Amber banner full-width bg rgba(250,168,26,0.12) border-left 4px #faa81a
  padding 10px 14px: "⚠ Content may be in another public channel." 13px #faa81a.
- Footer flex column gap 10px: "Log in" primary full-width 44px #5865f2 +
  "Create Account" secondary 44px #40444b + "Browse Public Channels" ghost 40px.
Annotations: modal → "[D2] From search + PRIVATE channel [F2.7]"; backdrop →
"Click outside does NOT dismiss."

Frame E3 "Redirect — Server Landing":
NO overlay. Full app shell but sidebar replaced with server landing panel:
- Sidebar 240px #2f3136: server icon 64px #5865f2 "H" centered + "Harmony Dev"
  18px bold + "1,247 members" 13px #72767d + "Join Server" full-width 40px radius
  6px. Divider. "PUBLIC CHANNELS" header. 5 channel rows.
- Main area: amber banner top (bg rgba(250,168,26,0.08), border-bottom 1px rgba(250,
  168,26,0.3), padding 14px 24px): amber triangle 20px + "The channel you requested
  is private. Here are the public channels you can browse:" 14px #b9bbbe.
- Below: 3 channel preview cards flex row gap 16px padding 24px. Each 280px
  #2f3136 border 1px rgba(255,255,255,0.06) radius 8px padding 16px: # icon + name
  bold + INDEXED badge + description 13px #72767d + message count. Cards: #general
  1,204 messages; #help-and-questions 847 messages; #announcements 312 messages.
Annotations: sidebar → "[D3] Redirect /s/{server} [F2.8]"; banner → "Explains
redirect, not an error."; cards → "Link to public URLs."

Frame E4 "404 — Not Found":
Ghost + overlay. Panel 480px #2f3136 radius 12px padding 32px shadow 0 8px 32px
rgba(0,0,0,0.6) centered:
- Compass/search icon 48px #72767d in circle 80px rgba(114,118,125,0.15) centered.
- "Channel not found" 22px bold #dcddde margin-top 20px centered.
- Divider 1px rgba(255,255,255,0.06) margin 18px 0.
- Body: "This channel doesn't exist, or it may have been removed." 14px #b9bbbe
  line-height 1.6 max-width 380px centered.
- Note: "If you followed a link, it may be outdated." 13px #72767d italic margin-top
  10px centered.
- Footer margin-top 22px flex column gap 10px: "Go to Homepage" secondary (full-
  width 44px #40444b) + "Browse Servers" ghost (full-width 40px 14px #5865f2).
Annotations: modal → "[D4] Private channel + private server. No existence disclosure
— prevents enumeration [IF-6]"; body → "Deliberately vague."

ROW 2:

Frame E5 "Rate Limited":
Ghost + overlay. Panel 440px #2f3136 radius 12px padding 32px shadow centered:
- Clock 48px #faa81a in circle 80px rgba(250,168,26,0.15) centered.
- "Slow down!" 22px bold #dcddde margin-top 20px centered.
- Divider 1px rgba(255,255,255,0.06) margin 18px 0.
- Body 14px #b9bbbe centered max-width 340px.
- Countdown pill margin-top 20px bg #202225 radius 9999px padding 10px 28px
  centered: "Try again in 23s" 16px #faa81a mono bold.
- Note 13px #72767d italic centered margin-top 20px: "Limit applies to anonymous
  browsing only. Creating an account removes rate limits."
Annotations: panel → "[IF-2/C4.3] Per-IP rate limit."; countdown → "Dynamic,
server-returned retry-after value."; note → "Conversion opportunity."

FIGMA MAKE RESPONSE:

