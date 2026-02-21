PROMPT:

Design a Figma page titled "📐 Responsive & Accessibility" for Harmony's channel visibility toggle. Dark mode
  same palette as prior pages. This page is documentation-focused: wider annotation frames with labels, arrows, and
   callout boxes. Use purple (#9b59b6) for all accessibility annotations and red (#e74c3c) for layout/responsive
  annotations.

  Frame R1 "Responsive — Sidebar Breakpoints" (2400 × 700px):
  Show three sidebar states side by side with 80px between them, connected by dashed red vertical lines labeled
  with breakpoints.

  Left: "Desktop ≥1024px" label above. Full channel sidebar (240px wide, bg #2f3136) with server name, section
  header, 5 channel rows with names and VisibilityBadge sm.

  Middle: "Tablet 768–1023px" label above. Icon-rail sidebar (56px wide, bg #2f3136). Only # hash symbols centered
  (20px #72767d) for each channel. No text labels. No badges. One icon has hover state (bg #40444b) with a tooltip
  floating right: bg #202225, border-radius 6px, padding 6px 10px, text "# off-topic — UNLISTED" (13px #dcddde) +
  UNLISTED badge. Red annotation: "Sidebar collapses to icon rail. Text + badges hidden. Tooltip on hover/focus
  reveals both."

  Right: "Mobile <768px" label above. No sidebar visible — instead show the mobile app header bar (height 52px, bg
  #2f3136, full width 375px) with hamburger ☰ icon on left. A translucent left-drawer overlay shown half-open
  (320px wide, bg #2f3136, shadow, partially covering chat area). Red annotation: "Sidebar becomes a left drawer
  overlay on mobile. Triggered by hamburger or left-edge swipe."

  Between left and middle: dashed vertical red line, label "breakpoint: 1024px".
  Between middle and right: dashed vertical red line, label "breakpoint: 768px".

  Below all three, a full-width annotation box (red outline): "All three layouts provide identical functionality.
  No features are hidden or removed at any breakpoint."

  Frame R2 "Responsive — Settings Panel Breakpoints" (2400 × 700px):
  Three panel versions side by side with 80px gap and dashed red breakpoint lines.

  Left: "Desktop ≥1024px". Full panel (860px wide): left nav rail 192px with text labels + right content pane with
  VisibilityRadioGroup.

  Middle: "Tablet 768–1023px". Panel fills more viewport. Left nav rail collapses to 56px icons-only. Content pane
  expands. Tooltip shown on Visibility icon: "Visibility". Red annotation: "Rail collapses to icon-only. Labels
  hidden, revealed by tooltip."

  Right: "Mobile <768px". No panel modal. Show the bottom sheet (375px × 730px): accordion sections, Visibility
  section expanded, VisibilityRadioGroup full-width. Red annotation: "No modal on mobile. Full-screen bottom sheet
  with accordion nav replaces two-pane layout."

  Below: annotation box: "Layout reflows at each breakpoint. Content order preserved. Save controls always visible
  (sticky footer on mobile, sticky bottom of right pane on desktop)."

  Frame A1 "Accessibility — Settings Panel Annotations" (1200 × 800px):
  Show the desktop Settings Panel (Default state, INDEXED selected) at full opacity. Overlay purple accessibility
  annotations:

  - Purple numbered circles (white text) on each interactive element in tab order:
    ① Modal close ✕ | ② Overview nav | ③ Permissions nav | ④ Visibility nav (current) | ⑤ Invites nav | ⑥
  Integrations nav | ⑦ PRIVATE card | ⑧ UNLISTED card | ⑨ INDEXED card | ⑩ View full history link | ⑪ Delete
  Channel link

  - Purple bracket around VisibilityRadioGroup with label box:
    'role="radiogroup" aria-labelledby="visibility-heading"
    Navigation: ↑↓ Arrow keys move between options
    Tab skips entire group to next focusable element'

  - Purple label on the INDEXED card:
    'role="radio" aria-checked="true"
    aria-describedby="indexed-description"'

  - Purple label on focus ring (draw a visible 2px #5865f2 ring with 3px offset around card ⑨):
    'Focus ring: 2px #5865f2, 3px offset
    Visible on all bg colors'

  - Purple note bottom of frame:
    'Keyboard: Escape closes modal and returns focus to the gear ⚙ icon that opened it.'

  Frame A2 "Accessibility — Modal & Toast Annotations" (1440 × 900px):
  Show the Confirmation Modal (Make Public & Indexed variant) in context over the dimmed app. Purple annotations:

  - Purple box around entire modal:
    'role="dialog" aria-modal="true"
    aria-labelledby="modal-title-id"
    Focus trapped inside modal on open.
    Escape = Cancel.'

  - Purple tab order numbers: ① modal container (receives focus on open) | ② Cancel button | ③ "Make Public &
  Indexed" button

  - Purple arrow from modal title text:
    'id="modal-title-id" — linked by aria-labelledby on the dialog'

  - Purple box in bottom-right corner around Toast position:
    'role="status" aria-live="polite"
    Announced to screen reader without stealing focus.
    Error toasts use aria-live="assertive".'

  - Purple label on ✕ dismiss: 'aria-label="Dismiss notification"'

  - Purple note below modal: 'On close: focus returns to the "Save Changes" button that triggered this modal (not
  the first element on the page).'

  Frame A3 "Accessibility — Mobile Touch Targets" (600 × 900px):
  Show the mobile bottom sheet (M2) at full size. Purple annotations:

  - Purple dashed red 44×44px boxes overlaid on each tappable element:
    - ✕ close button: label "44×44px minimum touch target"
    - Gear ⚙ in header: label "44×44px — icon may be 22px visually but hit area is 44×44"
    - Each accordion section row: label "44px height — full-width tap area"
    - Save Changes button: label "52px height ✓ compliant"
    - Reset button: label "44px height ✓ compliant"
    - Cancel text link: label "44px height tap area — text may appear smaller"

  - Purple note at bottom:
    'All interactive elements meet the 44×44px minimum touch target guideline (Apple HIG, WCAG 2.5.5).
    Visual icon size may be smaller — invisible padding extends the tap region.'

  - Purple note on radio cards: 'Full card width × 80px height = large touch target. No minimum size issue.'

  - Purple motion note (top-right): 'prefers-reduced-motion:
    • Bottom sheet: instant appear, no slide
    • Accordion: instant expand, no animation
    • Skeleton shimmer: static block, no sweep
    • Toast: instant appear, no slide-in'

FIGMA MAKE RESPONSE:

I'll create a comprehensive responsive and accessibility documentation page for Harmony's channel visibility toggle feature, with detailed annotations using purple for accessibility and red for responsive layout notes.

Perfect! I've created a comprehensive responsive and accessibility documentation page for Harmony's channel visibility toggle feature. The design includes:

Responsive Frames:

R1 (Sidebar Breakpoints - 2400×700px): Shows three sidebar states (Desktop ≥1024px full sidebar with badges, Tablet 768-1023px icon rail with tooltips, Mobile <768px drawer overlay) connected by red dashed breakpoint lines with full annotations
R2 (Settings Panel Breakpoints - 2400×700px): Demonstrates how the settings panel adapts across breakpoints (Desktop two-pane, Tablet collapsed rail, Mobile accordion bottom sheet) with detailed layout transformation notes
Accessibility Frames:

A1 (Settings Panel - 1200×800px): Complete tab order annotations with purple numbered circles (①-⑪), ARIA roles and properties, radiogroup keyboard navigation patterns, and focus ring specifications
A2 (Modal & Toast - 1440×900px): Dialog role annotations, focus trap documentation, ARIA live regions for toasts, and focus management return behavior
A3 (Touch Targets - 600×900px): Purple dashed overlays showing 44×44px minimum touch targets, height indicators, and prefers-reduced-motion media query handling
All frames use red (#e74c3c) for responsive/layout annotations and purple (#9b59b6) for accessibility annotations, maintaining Harmony's dark mode design system throughout.