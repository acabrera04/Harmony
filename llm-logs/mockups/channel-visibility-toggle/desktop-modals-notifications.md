PROMPT:

Design a Figma page titled "🖥 Desktop — Modals & Toasts" for Harmony's channel visibility toggle feature. Dark-mode: bg #36393f, panels #2f3136, deep
  #202225, elevated #40444b, accent #5865f2, text #dcddde/#b9bbbe/#72767d, green #3ba55c, amber #faa81a, red #ed4245. Font Inter. All frames 1440 × 900px.
  64px gap between frames.

  For each frame: the Harmony app shell fills the background at 30% opacity (server icon rail on far left, channel sidebar, chat area). A rgba(0,0,0,0.70)
  full-screen overlay sits above it. The modal/toast floats on top.

  Frame 3A "Confirm — Make Public & Indexed":
  Centered modal: width 440px, background #2f3136, border-radius 12px, padding 24px, shadow 0 8px 32px rgba(0,0,0,0.6).
  Top: globe/earth icon 40px centered, color #3ba55c, in a 64px circle with background rgba(59,165,92,0.15).
  Title: "Make #general public and indexed?" (20px bold #dcddde, margin-top 16px).
  Divider 1px rgba(255,255,255,0.06) margin 16px 0.
  Body: "This channel will become visible to anyone on the internet, including search engines like Google and Bing." (15px #b9bbbe).
  Bullet list (margin-top 12px, 3 items, 8px gap each): green checkmark icon + "All future messages will be publicly readable" | green checkmark + "Search
  engines will be notified within 24–48 hours" | green checkmark + "A public URL will be created: /c/harmony-dev/general". Each bullet: 13px #b9bbbe.
  Divider.
  Note: "You can reverse this at any time. Removing from search engine indexes may take up to 2 weeks after reverting." (13px #72767d italic).
  Footer (margin-top 20px, flex row justify-end gap 8px): "Cancel" button (secondary: bg #40444b, text #dcddde, height 40px padding 0 16px border-radius 6px)
   + "Make Public & Indexed" (primary: bg #5865f2, text white, same size).
  Annotations: arrow from Cancel labeled "Escape key also dismisses. Focus returns to 'Save Changes' button." | arrow from backdrop labeled "Click outside =
  dismiss."

  Frame 3B "Confirm — Remove from Index":
  Same modal shell. Shield-with-X icon 40px, color #ed4245, in circle rgba(237,66,69,0.15).
  Title: "Remove #general from search engines?" (20px bold #dcddde).
  Divider.
  Warning banner (full width, margin-bottom 12px): background rgba(250,168,26,0.15), border-left 4px solid #faa81a, border-radius 6px, padding 10px 14px.
  Text: "⚠ De-indexing is not instant. Search engines may show cached content for up to 2 weeks." (13px #faa81a).
  Body: "Harmony will request removal of this channel from search engines." (15px #b9bbbe).
  Bullet list: red X-circle icon + "Request removal from Google and Bing" | red X + "Remove channel from Harmony's public sitemap" | red X + "Stop serving
  channel to anonymous visitors". Each 13px #b9bbbe.
  Divider.
  Note: "Content already cached by search engines may remain visible during the removal window." (13px #72767d italic).
  Footer: "Cancel" secondary + "Confirm" danger (bg #ed4245, text white).
  Annotation on Confirm button: "Danger red reserved exclusively for destructive/irreversible actions."

  Frame 3C "Confirm — Submitting":
  Exact same layout as Frame 3B but: both footer buttons disabled (50% opacity), Confirm button shows 16px white spinner instead of text. Annotation: "Both
  buttons disabled mid-request. No cancel to prevent partial state."

  Frame 3D "Toast — Success (in context)":
  No modal overlay. Show the settings panel from the previous page (Default state, INDEXED selected) at full opacity as background context. In the
  bottom-right corner of the 1440×900 frame, 24px from bottom and right edges, place the Toast success: width 360px, background #2f3136, border-radius 8px,
  shadow 0 8px 32px rgba(0,0,0,0.6), padding 14px 16px. Left edge: 4px bar #3ba55c. Layout: checkmark circle (20px #3ba55c) | title "Visibility updated"
  (13px weight 600 #dcddde) + body "#general is now public and indexed." (13px #b9bbbe) | ✕ (20px #72767d). Bottom: 3px progress bar #3ba55c at 60% width.
  Annotations: "Fixed bottom-right. Does not steal focus — aria-live='polite'." | arrow to progress bar "Auto-dismisses after 5s."

  Frame 3E "Toast — Error (in context)":
  Same background context (settings panel, UNLISTED selected, InlineErrorBanner visible). Toast error bottom-right: 4px bar #ed4245, X-circle (20px #ed4245),
   title "Update failed", body "Could not update channel visibility." + "Try again" link #5865f2 on line below. No progress bar. Annotation: "No auto-dismiss
   on errors. Requires explicit close. 'Try again' retriggers save."

FIGMA MAKE RESPONSE:

I'll create a comprehensive Figma design page showcasing Harmony's channel visibility modal and toast states with precise dark mode styling and detailed annotations.

Perfect! I've created a comprehensive Figma design page showcasing Harmony's channel visibility modal and toast states. The page includes all five frames (3A through 3E) with precise dark mode styling, proper spacing (64px gaps), and detailed annotations as specified. Each frame is 1440×900px and features the Harmony app shell at 30% opacity with a dark overlay, topped with the relevant modal or toast component. All colors, typography (Inter font), spacing, and interactive states match the exact specifications provided.