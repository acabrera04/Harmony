PROMPT:

Design a Figma page titled "🖥 Desktop — Sidebar & Settings" for Harmony, a Discord-like dark-mode admin interface. Place all frames on one canvas with 64px
   gaps between frames, organized in two rows.

  Design system: Font Inter. Colors: main bg #36393f, panel bg #2f3136, deep bg #202225, elevated #40444b, accent #5865f2, text #dcddde/#b9bbbe/#72767d,
  green #3ba55c, amber #faa81a, red #ed4245.

  ROW 1 — Channel List Sidebar States (frame size 320 × 600px each, 3 frames)

  Frame 1A "Sidebar — Default":
  Background #2f3136, padding 16px. Top: server name "Harmony Dev" (20px bold #dcddde). Divider 1px rgba(255,255,255,0.06). Section header "TEXT CHANNELS"
  (11px uppercase weight 600 #72767d, padding 16px 8px 4px 0). Five channel rows (height 36px, horizontal padding 8px, border-radius 6px, flex row gap 8px):
  # symbol (14px #72767d) + channel name (14px #dcddde) + VisibilityBadge sm right-aligned.
  Rows: #general [INDEXED green] | #announcements [INDEXED green] | #off-topic [UNLISTED amber] | #staff-only [PRIVATE gray] | #dev-logs [PRIVATE gray].
  Add a blue annotation arrow pointing to the badges: "Color-coded visibility at a glance — no need to open settings."

  Frame 1B "Sidebar — Row Hover":
  Identical to 1A except #off-topic row: background #40444b, and a gear ⚙ icon (16px, #72767d) appears at far right after the badge. Red annotation arrow on
  gear: "⚙ Hover reveals gear → tap/click opens Channel Settings panel."

  Frame 1C "Sidebar — Empty State":
  Same background. No channel rows. Center of frame: outlined # hash icon (48px, #40444b), below it "No channels yet" (15px #72767d weight 600), below that
  "Create your first channel to get started." (13px #72767d). Centered vertically.

  ROW 2 — Settings Panel States (frame size 860 × 600px each, 4 frames)

  Each frame shows the full settings panel modal: left nav rail (192px wide, #202225, border-radius 12px 0 0 12px) + right content pane (flex-1, #2f3136,
  border-radius 0 12px 12px 0). A dimmed app background (#36393f at 40% opacity) is visible behind the panel with a rgba(0,0,0,0.70) backdrop.

  Nav rail contents (all frames identical): padding 16px 8px. Section label "CHANNEL SETTINGS" (11px uppercase #72767d). Nav items (height 36px,
  border-radius 6px, padding 0 8px): Overview (#b9bbbe) | Permissions (#b9bbbe) | Visibility [ACTIVE: bg rgba(88,101,242,0.15), left border 2px #5865f2, text
   #5865f2 weight 600] | Invites (#b9bbbe) | Integrations (#b9bbbe). At bottom: "Delete Channel" (13px #ed4245).

  Frame 2A "Settings — Default":
  Right pane padding 24px. Heading "Visibility & Indexing" (20px bold #dcddde). Subheading "Control who can see this channel and whether search engines can
  index it." (13px #72767d, margin-top 4px). Divider 1px rgba(255,255,255,0.06) margin 16px 0. VisibilityRadioGroup (Selected: INDEXED, full width). Divider.
   Section header "RECENT CHANGES" (11px uppercase #72767d). Three AuditLogRows (JD UNLISTED→INDEXED | SK PRIVATE→UNLISTED | MB INDEXED→PRIVATE). Below:
  "View full history →" (13px #5865f2).

  Frame 2B "Settings — Unsaved Changes":
  Same as 2A but VisibilityRadioGroup shows Selected: UNLISTED. At bottom of right pane, pinned: UnsavedChangesToolbar (full width, 56px, bg #202225,
  border-top 1px rgba(255,255,255,0.06)), Idle state. Red annotation: "Toolbar animates up from below when selection changes. Sticky to bottom of right
  pane."

  Frame 2C "Settings — Saving":
  Same as 2B but VisibilityRadioGroup is Disabled (50% opacity). UnsavedChangesToolbar in Saving state (spinner on Save Changes, both buttons 60% opacity).
  Annotation: "Controls disabled mid-save. Prevents double-submit."

  Frame 2D "Settings — Error":
  Same as 2B (UNLISTED selected, toolbar Idle/re-enabled). Between the VisibilityRadioGroup and the divider before the audit section, add InlineErrorBanner
  (Network Error variant, full width). Annotation: "Error banner slides in below the controls. Toolbar remains — user can retry immediately."

FIGMA MAKE Response:

This is a comprehensive Figma design request for a Discord-like dark-mode admin interface. The user wants me to create multiple frames showing different states of a sidebar and settings panel.

Let me break down what I need to create:

ROW 1 - Channel List Sidebar (3 frames, 320×600px each):

Frame 1A "Sidebar — Default" - Shows channel list with visibility badges
Frame 1B "Sidebar — Row Hover" - Same but with hover state on #off-topic
Frame 1C "Sidebar — Empty State" - Empty state with centered message
ROW 2 - Settings Panel (4 frames, 860×600px each):

Frame 2A "Settings — Default" - Settings panel with nav rail and visibility settings
Frame 2B "Settings — Unsaved Changes" - Same but with unsaved changes toolbar
Frame 2C "Settings — Saving" - Saving state with disabled controls
Frame 2D "Settings — Error" - Error state with error banner
The user wants:

Inter font
Specific color palette
64px gaps between frames
Two rows of frames
Various UI components like badges, radio groups, audit logs, toolbars, etc.
Since this is a web application design task, I should create React components for all the UI elements and lay them out in a canvas view. I'll use Tailwind CSS for styling with the provided color system.

Let me start by:

Reading the current App.tsx to see what's there
Creating the component structure
Implementing all the frames with proper spacing
I'll need to create:

Visibility badge components
Channel row components
Settings panel with nav rail
Radio group for visibility
Audit log rows
Unsaved changes toolbar
Error banner
Annotations (arrows with text)
I'll create a comprehensive Figma-style design page for Harmony's admin interface with all the sidebar and settings panel states you specified. Let me build this with proper dark-mode styling and all the interactive states.

Perfect! I've created a comprehensive Figma design page for Harmony's Discord-like admin interface with all the states you specified. The design includes:

ROW 1 - Channel List Sidebar (3 frames at 320×600px):

Frame 1A showing default state with color-coded visibility badges
Frame 1B showing hover state with gear icon reveal
Frame 1C showing empty state with centered message
ROW 2 - Settings Panel States (4 frames at 860×600px):

Frame 2A showing default settings panel with visibility controls and audit log
Frame 2B showing unsaved changes with sticky toolbar at bottom
Frame 2C showing saving state with disabled controls and spinner
Frame 2D showing error state with inline error banner and retry option
All frames use the Inter font and your exact color palette (dark mode with #36393f main bg, #2f3136 panels, #5865f2 accent). The components include visibility badges (green/amber/gray), channel rows, radio groups, audit logs, and interactive annotations that point out key UX features. Everything is laid out with 64px gaps in a two-row grid structure as specified.