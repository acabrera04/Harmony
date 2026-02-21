PROMPT:

Design a Figma page titled "📱 Mobile Screens" for Harmony's channel visibility toggle feature. All frames 375 ×
  812px. Dark mode: bg #36393f, panels #2f3136, deep #202225, elevated #40444b, accent #5865f2, text
  #dcddde/#b9bbbe/#72767d, green #3ba55c, amber #faa81a, red #ed4245. Font Inter. Frames in two rows of four, 48px
  gaps.

  ROW 1 — Entry and Main States:

  Frame M1 "Mobile — Channel View (Entry)":
  Full app mobile view. Top header bar: height 52px, bg #2f3136, horizontal padding 16px, flex row align-center.
  Left: hamburger ☰ icon 22px #dcddde (44×44px tap area). Center: "#general" (16px weight 600 #dcddde). Right:
  search icon + gear ⚙ icon both 22px #dcddde, 44×44px tap areas each. Below header: chat content area fills rest
  of screen (#36393f) — show 3 simple mock chat messages (username + bubble, varied heights). Red annotation arrow
  on gear icon: "44×44px tap target. Opens Channel Settings bottom sheet."

  Frame M2 "Mobile — Bottom Sheet (Default, INDEXED)":
  Channel view at 40% opacity as background. rgba(0,0,0,0.70) overlay. Bottom sheet slides up from bottom: bg
  #2f3136, border-radius 12px 12px 0 0, full width, height ~730px (90% of 812). Top of sheet: drag handle (4px ×
  32px, bg #40444b, centered, margin-top 8px). ✕ close button top-right (44×44px, ✕ 20px #72767d). Title "# general
   Settings" (16px weight 600 #dcddde) margin-top 8px, left-padded 16px. Divider. Accordion list (each row height
  44px, flex space-between, padding 0 16px, border-bottom 1px rgba(255,255,255,0.06), 14px weight 600 #b9bbbe,
  chevron right icon 16px #72767d): "Overview" | "Permissions" | "Visibility" [chevron points DOWN, expanded —
  below this row show the VisibilityRadioGroup Selected:INDEXED full width, padding 16px] | "Invites". Sheet footer
   sticky (bg #2f3136, border-top 1px rgba(255,255,255,0.06), height 72px, padding 0 16px, flex gap 8px): Reset
  ghost button (flex-1 height 44px border 1px rgba(255,255,255,0.12) text #b9bbbe border-radius 6px) + Save Changes
   primary (flex-1 height 44px bg #5865f2 text white weight 600 border-radius 6px). Annotations: drag handle arrow
  "Swipe down to dismiss" | accordion arrow "Nav rail collapses to accordion. One section expanded at a time."

  Frame M3 "Mobile — Unsaved Changes (UNLISTED selected)":
  Same as M2 but VisibilityRadioGroup shows Selected:UNLISTED. Save Changes button: a 6px amber dot (#faa81a) badge
   in top-right corner of the button to indicate pending change. Annotation: "Unsaved state: dot badge on Save
  Changes button — no room for full toolbar on mobile."

  Frame M4 "Mobile — Confirmation (Full Sheet)":
  Sheet now fully replaced by the confirmation flow. Drag handle at top. Back arrow ← (44×44px) top-left. "Confirm
  Change" centered title (16px weight 600 #dcddde). Divider. Sheet body (padding 24px, scrollable): globe icon 40px
   #3ba55c in circle rgba(59,165,92,0.15) centered | "Make #general public and indexed?" (18px bold #dcddde,
  centered, margin-top 12px) | body copy and 3 bullet list (13px #b9bbbe) | amber note banner at bottom. Sheet
  footer sticky: "Make Public & Indexed" full-width button (height 52px, bg #5865f2, text white weight 600,
  border-radius 6px) | "Cancel" text link full-width centered below (13px #b9bbbe, 44px tap height, margin-top
  12px). Annotation: "Full-sheet dialog replaces centered modal on mobile. Back arrow replaces Cancel. Full-width
  buttons for thumb reach."

  ROW 2 — Loading, Error, Success States:

  Frame M5 "Mobile — Loading":
  Same sheet structure as M2. In the Visibility accordion expanded section, instead of the VisibilityRadioGroup:
  three skeleton cards (full width, height 80px each, bg #40444b, border-radius 8px, 8px gap). Inside each skeleton
   card: two shimmer lines (14px and 10px height, #40444b lighter, widths 50% and 70%). Footer buttons both 50%
  opacity disabled. Annotation: "Skeleton cards match exact real card dimensions to prevent layout shift."

  Frame M6 "Mobile — Success Toast":
  Channel view at full opacity (sheet dismissed). At bottom of screen, full-width toast bar: bg #2f3136,
  border-radius 12px 12px 0 0, padding 14px 16px. Horizontal flex: checkmark circle (20px #3ba55c) | "Visibility
  updated" (13px weight 600 #dcddde) + "#general is now public and indexed." (13px #b9bbbe) | ✕ (20px #72767d). At
  very top of toast: 3px green bar at 60% width (auto-dismiss countdown). Annotation: "Full-width toast anchors to
  bottom edge on mobile. Does not overlap interactive content."

  Frame M7 "Mobile — Error State":
  Sheet open (M2 structure), UNLISTED selected. InlineErrorBanner appears below the VisibilityRadioGroup within the
   expanded Visibility section: full width within section padding, bg rgba(237,66,69,0.15), border-left 4px
  #ed4245, border-radius 6px, padding 12px. Triangle icon 16px #ed4245 + "Failed to save. Retry?" (13px #dcddde) +
  "Retry" link #5865f2. Footer buttons re-enabled. Annotation: "Error appears inside the sheet. Controls re-enabled
   for retry. Sheet stays open."

  Frame M8 "Mobile — Confirmation (Submitting)":
  Same as M4 but footer: "Make Public & Indexed" button shows white spinner (16px) instead of text, 60% opacity.
  Back arrow hidden (replaced by nothing — non-interactive). "Cancel" text link also 60% opacity. Annotation:
  "Mid-request: no escape. Prevents double-submit on mobile where accidental taps are common."

FIGMA MAKE RESPONSE:

I'll create a comprehensive mobile screens page for Harmony's channel visibility toggle, showing all 8 states across two rows.

Perfect! I've created a comprehensive mobile screens page for Harmony's channel visibility toggle feature. The design includes 8 frames (375 × 812px each) arranged in two rows of four with 48px gaps between them.

Row 1 - Entry and Main States:

M1 (Channel View): Full mobile app with header bar featuring 44×44px tap targets for all interactive elements, showing the entry point via the gear icon
M2 (Bottom Sheet - INDEXED): Settings sheet with accordion navigation where the desktop nav rail collapses to expandable sections, with Visibility expanded showing the radio group
M3 (Unsaved Changes): Same sheet with UNLISTED selected and a small amber dot badge on the Save Changes button to indicate pending changes
M4 (Confirmation): Full-sheet confirmation dialog with back arrow, centered icon, bullet points, and full-width buttons optimized for thumb reach
Row 2 - Loading, Error, Success States:

M5 (Loading): Skeleton cards matching exact dimensions of real cards to prevent layout shift, with disabled footer buttons
M6 (Success Toast): Full-width bottom toast with green progress bar showing auto-dismiss countdown and success message
M7 (Error State): Inline error banner within the expanded Visibility section with retry option, controls re-enabled
M8 (Confirmation Submitting): Loading state during submission with spinner replacing button text, back arrow and cancel options hidden to prevent double-submit
All frames use the Harmony dark mode design system with Inter font, proper touch targets, and mobile-optimized layouts.