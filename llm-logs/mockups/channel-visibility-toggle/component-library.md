PROMPT:

Design a Figma component library page for Harmony, a Discord-like dark-mode chat app. This page should be titled "🧩 Components" and contain all reusable
  components arranged on a single canvas with 48px gaps between component groups. Label each group with a gray section header (11px uppercase, #72767d).

  Design system: Font = Inter. Background = #36393f (surface), #2f3136 (panels), #202225 (deep). Accent = #5865f2. Text = #dcddde / #b9bbbe / #72767d. Green
  = #3ba55c, Amber = #faa81a, Red = #ed4245. Border radius: badges 9999px, buttons/inputs 6px, cards 8px, modals 12px.

  --- Group 1: VisibilityBadge ---
  Six badge chips in a horizontal row. All pill-shaped (border-radius 9999px), with a 6px color dot preceding the text label (4px gap).

  SM size (height 18px, padding 2px 6px, font 11px weight 600 uppercase):
  - PRIVATE: text+dot color #72767d, background rgba(114,118,125,0.15)
  - UNLISTED: text+dot color #faa81a, background rgba(250,168,26,0.15)
  - INDEXED: text+dot color #3ba55c, background rgba(59,165,92,0.15)

  MD size (height 24px, padding 4px 10px, font 13px weight 600 uppercase): same three variants at larger size.

  --- Group 2: VisibilityRadioGroup ---
  Three variants shown side by side. Each variant is a set of three option cards (full width 480px, stacked, 8px gap). Each
  card: height 80px, border 2px, border-radius 8px, padding 16px, horizontal flex row with: radio dot (20px) | icon (20px) | label+description column
  (flex-grow) | badge (right, md size).

  Card contents:
  - Card 1 (PRIVATE): lock icon #72767d, label "Private" 16px weight 600 #dcddde, description "Only server members can see this channel." 13px #72767d, badge
   PRIVATE
  - Card 2 (UNLISTED): eye-slash icon #faa81a, label "Public — Unlisted", description "Anyone with the link can read it, but search engines won't index it.",
   badge UNLISTED
  - Card 3 (INDEXED): globe icon #3ba55c, label "Public & Indexed", description "Publicly accessible and indexed by Google, Bing, and other search engines.",
   badge INDEXED

  Variant A "Selected: PRIVATE" — Card 1: border 2px #5865f2, bg rgba(88,101,242,0.08), radio dot filled #5865f2 with white inner dot. Cards 2 & 3: border
  rgba(255,255,255,0.12), bg #36393f, radio dot empty.
  Variant B "Selected: UNLISTED" — Card 2 selected.
  Variant C "Selected: INDEXED" — Card 3 selected.
  Also create Variant D "Disabled" — all three cards at 50% opacity.

  --- Group 3: Buttons ---
  Show all button variants in a horizontal row: Primary (bg #5865f2, text white), Secondary (bg #40444b, text #dcddde), Ghost (no bg, text #b9bbbe, hover bg
  rgba(255,255,255,0.06)), Danger (bg #ed4245, text white). Three sizes each: SM (height 32px, padding 0 12px, 13px), MD (height 40px, padding 0 16px, 15px),
   LG (height 48px, padding 0 24px, 16px). Border-radius 6px for all. Also show Disabled state (opacity 50%) and Loading state (spinner replaces text) for
  Primary and Danger.

  --- Group 4: UnsavedChangesToolbar ---
  Full width 600px, height 56px, background #202225, top border 1px rgba(255,255,255,0.06), padding 0 16px. Left: warning triangle icon #faa81a + "Careful —
  you have unsaved changes" text 13px #faa81a. Right: "Reset" ghost button (SM) + "Save Changes" primary button (SM).
  Show two states side by side: Idle (buttons active) and Saving (Save Changes shows white spinner, both buttons 60% opacity).

  --- Group 5: InlineErrorBanner ---
  Width 480px, background rgba(237,66,69,0.15), border-left 4px solid #ed4245, border-radius 6px, padding 12px 16px. Left: warning triangle 20px #ed4245.
  Right text: "Failed to save changes." (13px #dcddde weight 600) on line 1, "Please check your connection and try again. Retry" (13px #b9bbbe, "Retry" in
  #5865f2) on line 2. Show two states: Network Error and Permission Error ("You don't have permission to change this channel's visibility.").

  --- Group 6: Toast ---
  Width 360px, background #2f3136, border-radius 8px, shadow 0 8px 32px rgba(0,0,0,0.6), padding 14px 16px. Left edge: 4px accent bar. Layout: icon (20px
  circle) | text column (flex-grow) | ✕ dismiss (20px #72767d). At bottom: 3px auto-dismiss progress bar.

  Toast A — Success: accent bar #3ba55c, checkmark circle #3ba55c, title "Visibility updated" (13px weight 600 #dcddde), body "#general is now public and
  indexed." (13px #b9bbbe), progress bar #3ba55c at 60% width.
  Toast B — Error: accent bar #ed4245, X circle #ed4245, title "Update failed", body "Could not update channel visibility. Try again." + "Try again" link
  #5865f2 below. No progress bar.

  --- Group 7: SkeletonLoader ---
  Show three skeleton card variants side by side, each 480px wide 80px tall, background #40444b, border-radius 8px. Inside each: two shimmer lines (14px
  height and 10px height, border-radius 4px, color rgba(255,255,255,0.06), widths 50% and 70%). Label them "Loading Card 1", "Loading Card 2", "Loading Card
  3". Add a note beneath: "Shimmer: horizontal gradient sweep animation, 1.4s loop. Disabled when prefers-reduced-motion is set."

  --- Group 8: AuditLogRow ---
  Width 700px, height 48px, horizontal flex row, border-bottom 1px rgba(255,255,255,0.06), padding 0 16px. Columns: avatar circle (24px, with 2-letter
  initials 11px white) + username (13px #dcddde) | From badge (sm) → (arrow #72767d) To badge (sm) | date (13px #72767d) | IP address (13px #72767d
  monospace, last segment masked as .x). Show three rows: JD UNLISTED→INDEXED Feb 17 192.168.1.x | SK PRIVATE→UNLISTED Feb 14 10.0.0.x | MB INDEXED→PRIVATE
  Jan 30 172.16.x.x. Show hover state on first row: background #40444b.

FIGMA MAKE RESPONSE:

This is a comprehensive request to design a Figma component library page for a dark-mode Discord-like chat app called "Harmony". The user wants all components arranged on a single canvas with specific styling and layout requirements.

This is a pure frontend design/implementation task, so I'll classify it as PureFrontend - no backend or Supabase needed.

Let me break down what I need to create:

VisibilityBadge - Small badge components in SM and MD sizes with dot indicators
VisibilityRadioGroup - Radio card selection with 3 options in multiple states
Buttons - Various button styles and sizes
UnsavedChangesToolbar - A warning toolbar with action buttons
InlineErrorBanner - Error message banners
Toast - Notification toasts with success/error states
SkeletonLoader - Loading skeleton cards
AuditLogRow - Audit log entries with user info
I'll need to:

Set up the Inter font
Create individual component files for each group
Import and arrange them in App.tsx with proper spacing and labels
Use the exact colors and styling specified
Install any necessary packages (lucide-react for icons)
Let me start by checking package.json and then creating the components.

I'll create a comprehensive Figma component library page for the Harmony chat app with all the specified components arranged in groups with proper spacing and styling.

Perfect! I've created a comprehensive Figma component library page for the Harmony chat app. The page includes all 8 component groups with proper dark-mode Discord-style theming, 48px gaps between sections, and gray section headers as specified.

Components implemented:

VisibilityBadge - Pill-shaped badges in SM/MD sizes with colored dots
VisibilityRadioGroup - Three radio card options showing Private, Unlisted, and Indexed states with all four variants
Buttons - Primary, Secondary, Ghost, and Danger variants in SM/MD/LG sizes with disabled and loading states
UnsavedChangesToolbar - Warning toolbar with idle and saving states
InlineErrorBanner - Error banners for network and permission errors with retry links
Toast - Success and error notification toasts with progress bars
SkeletonLoader - Animated loading skeletons with shimmer effect (respects prefers-reduced-motion)
AuditLogRow - Audit log entries with hover states, user avatars, badge transitions, dates, and masked IP addresses
All components follow the exact design specifications with Inter font, proper colors (#36393f surface, #5865f2 accent, etc.), and correct border radii. The layout displays all variants side-by-side for easy reference.