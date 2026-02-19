# Harmony — Channel Visibility Toggle: UI Design Brief

**Issue:** #40
**Feature:** Public/Indexable Channel Control
**Dev Spec Reference:** `docs/dev-spec-channel-visibility-toggle.md`
**Author:** FardeenI
**Version:** 1.0 (2026-02-18)
**Target Tool:** Figma Make

---

## Table of Contents

1. [Overview & Goals](#1-overview--goals)
2. [Visual Design Tokens](#2-visual-design-tokens)
3. [Screen Inventory](#3-screen-inventory)
4. [Component Library](#4-component-library)
5. [Responsive Layout Behavior](#5-responsive-layout-behavior)
6. [Navigation Flow](#6-navigation-flow)
7. [Accessibility Requirements](#7-accessibility-requirements)
8. [Design Rationale](#8-design-rationale)

---

## 1. Overview & Goals

### Feature Summary

The Channel Visibility Toggle lets server administrators control whether a channel is:

| State | Label | Meaning |
|---|---|---|
| `PRIVATE` | Private | Members only. Hidden from guests and search engines. |
| `PUBLIC_NO_INDEX` | Public (unlisted) | Guests can read, but search crawlers are blocked via `X-Robots-Tag: noindex`. |
| `PUBLIC_INDEXABLE` | Public & Indexed | Guests can read and search engines crawl and index the content. |

This is the primary administrative control surface for Harmony's core differentiating feature: making community knowledge publicly searchable.

### Design Goals

1. **Clarity over density** — The three visibility states have meaningfully different consequences. The UI must never leave the admin unsure which state is active or what it implies.
2. **Safe defaults** — Destructive or high-impact transitions (e.g., making a channel searchable on Google, or removing it from the index) require an explicit confirmation step.
3. **Feedback at every step** — Loading, success, and error states must be communicated immediately and unambiguously.
4. **Discord-native aesthetic** — The app uses a Discord-inspired dark-mode palette. Harmony should feel familiar to Discord users while establishing its own identity around the public/indexable concept.
5. **Mobile parity** — All functionality must be accessible on small screens without degradation.

---

## 2. Visual Design Tokens

These tokens should be defined as Figma variables and used throughout all components.

### 2.1 Color Palette

#### Base (Background Layers)

| Token | Hex | Usage |
|---|---|---|
| `bg-primary` | `#36393f` | Main content area background (chat pane, settings panels) |
| `bg-secondary` | `#2f3136` | Sidebars, modals, drawers |
| `bg-tertiary` | `#202225` | Server nav rail, deepest panels, table headers |
| `bg-elevated` | `#40444b` | Hover states on bg-primary surfaces, input fields |
| `bg-overlay` | `rgba(0,0,0,0.70)` | Modal/dialog backdrop |

#### Text

| Token | Hex | Usage |
|---|---|---|
| `text-primary` | `#dcddde` | Body copy, labels, primary content |
| `text-secondary` | `#b9bbbe` | Secondary descriptions, hints |
| `text-muted` | `#72767d` | Placeholder text, disabled labels, timestamps |
| `text-on-accent` | `#ffffff` | Text placed on colored buttons or badges |

#### Interactive

| Token | Hex | Usage |
|---|---|---|
| `accent-blurple` | `#5865f2` | Primary interactive elements (buttons, focus rings, links) |
| `accent-blurple-hover` | `#4752c4` | Hover state of primary interactive elements |
| `accent-blurple-active` | `#3c45a5` | Active/pressed state |

#### Semantic — Visibility States

| Token | Hex | Usage |
|---|---|---|
| `status-private` | `#72767d` | Badge/icon for PRIVATE channels |
| `status-public-no-index` | `#faa81a` | Badge/icon for PUBLIC_NO_INDEX ("unlisted") — amber/yellow |
| `status-public-no-index-bg` | `rgba(250,168,26,0.15)` | Tinted background for PUBLIC_NO_INDEX badges |
| `status-indexable` | `#3ba55c` | Badge/icon for PUBLIC_INDEXABLE — green |
| `status-indexable-bg` | `rgba(59,165,92,0.15)` | Tinted background for indexable badges |

#### Semantic — Alerts

| Token | Hex | Usage |
|---|---|---|
| `danger` | `#ed4245` | Destructive actions, error messages, de-indexing warnings |
| `danger-hover` | `#c03537` | Hover on danger buttons |
| `danger-bg` | `rgba(237,66,69,0.15)` | Tinted background for error banners |
| `warning` | `#faa81a` | Caution states, intermediate transitions |
| `warning-bg` | `rgba(250,168,26,0.15)` | Tinted background for warning banners |
| `success` | `#3ba55c` | Success confirmations, green toasts |
| `success-bg` | `rgba(59,165,92,0.15)` | Tinted background for success banners |

#### Borders

| Token | Hex | Usage |
|---|---|---|
| `border-subtle` | `rgba(255,255,255,0.06)` | Subtle dividers between panel sections |
| `border-default` | `rgba(255,255,255,0.12)` | Card outlines, input borders |
| `border-strong` | `rgba(255,255,255,0.24)` | Focused inputs, emphasized separators |

### 2.2 Typography

**Font Family:** Inter (Google Fonts). Falls back to Open Sans, Arial, Helvetica, sans-serif.

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `text-xs` | 11px | 500 | 1.4 | Section headers (all caps), metadata labels |
| `text-sm` | 13px | 400 | 1.4 | Secondary body copy, helper text, badges |
| `text-base` | 15px | 400 | 1.5 | Primary body copy, option descriptions |
| `text-md` | 16px | 600 | 1.4 | Panel section headings |
| `text-lg` | 20px | 700 | 1.3 | Modal/dialog titles, page headings |
| `text-xl` | 24px | 700 | 1.2 | Large headings (rare) |

**Text rendering:** `font-smooth: antialiased` (matches existing app CSS).

### 2.3 Spacing Scale

Uses a base-4 scale (4px = 1 unit):

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Icon-to-label gap, tight padding |
| `space-2` | 8px | Within-component padding |
| `space-3` | 12px | Component internal padding |
| `space-4` | 16px | Standard section padding |
| `space-5` | 20px | Component gap |
| `space-6` | 24px | Modal/panel padding |
| `space-8` | 32px | Section separation |

### 2.4 Border Radius

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 4px | Badges, chips |
| `radius-md` | 6px | Buttons, input fields |
| `radius-lg` | 8px | Cards, panels |
| `radius-xl` | 12px | Modals/dialogs |
| `radius-full` | 9999px | Toggle switches, pill badges |

### 2.5 Elevation / Shadows

| Token | Value | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 3px rgba(0,0,0,0.4)` | Subtle component lift |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.5)` | Dropdowns, tooltips |
| `shadow-lg` | `0 8px 32px rgba(0,0,0,0.6)` | Modals, dialogs |

### 2.6 Motion / Animation

| Token | Value | Usage |
|---|---|---|
| `duration-fast` | 100ms | Micro-interactions (hover, focus) |
| `duration-normal` | 200ms | Toggle transitions, badge swaps |
| `duration-slow` | 300ms | Modal enter/exit, panel slide |
| `easing-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard UI motion |
| `easing-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering the screen |
| `easing-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving the screen |

> **Note for Figma Make:** Respect `prefers-reduced-motion`. When this media query is active, skip all transitions; show state changes instantly.

---

## 3. Screen Inventory

The following are all distinct screens and interface states that must be mocked in Figma.

---

### Screen 1: Channel List — Server Sidebar (Admin View)

**Route context:** Admin is viewing any channel inside a server. The sidebar lists all channels.

**Layout:** Persistent left sidebar (`w-64`, `bg-secondary`).

#### State 1A — Default (all channel types)

The sidebar channel list shows every channel the admin can see. Each channel row has:
- `#` prefix icon (text channels) in `text-muted`
- Channel name in `text-primary`
- **Visibility badge** (right-aligned, appears on hover OR always-visible for admins)
- **Settings gear icon** (appears on row hover, right of badge)

**Visibility badge specs:**
- Height: 18px
- Padding: 2px 6px
- Border radius: `radius-full`
- Font: `text-xs`, weight 600, all caps

| Visibility | Badge Text | Text Color | Background |
|---|---|---|---|
| PRIVATE | PRIVATE | `status-private` | `rgba(114,118,125,0.15)` |
| PUBLIC_NO_INDEX | UNLISTED | `status-public-no-index` | `status-public-no-index-bg` |
| PUBLIC_INDEXABLE | INDEXED | `status-indexable` | `status-indexable-bg` |

**Section headers above channel groups:**
- Label: `text-xs`, weight 600, uppercase, `text-muted`
- Example: "TEXT CHANNELS" / "VOICE CHANNELS"

#### State 1B — Row Hover

On hover of a channel row:
- Row background: `bg-elevated`
- Gear icon (⚙) appears, right-aligned, color `text-muted`, transitions to `text-primary` on icon hover
- Visibility badge remains visible

#### State 1C — Empty Sidebar (no channels)

- Sidebar still shows server name header
- Body: centered illustration (simple icon of a channel with a "+" prompt)
- Text: "No channels yet. Create your first channel." (`text-muted`, `text-sm`)

---

### Screen 2: Channel Settings Panel

**Trigger:** Admin clicks the gear icon (⚙) on any channel row in the sidebar, OR clicks "Edit Channel" from the channel header context menu.

**Layout (Desktop):** A full-page settings modal with a left nav rail and right content pane. This follows the Discord settings panel pattern.

**Layout (Mobile):** Full-screen bottom sheet that slides up from the bottom of the viewport.

#### State 2A — Loading (fetching settings)

- The content area of the settings panel shows a skeleton loader:
  - A block of height 24px (`bg-elevated`, `radius-md`, 60% width) — represents the section title
  - Three stacked option cards, each showing a shimmer skeleton:
    - Left: circle 20px (`bg-elevated`)
    - Right: two rows of shimmer lines (70% and 40% width)
  - Save button shown as skeleton (height 40px, 120px wide)
- The left nav rail is fully rendered (not skeletonized) so the user sees navigation options

**Shimmer animation:** Horizontal gradient sweep from `bg-elevated` to `rgba(255,255,255,0.04)` and back, 1.4s loop.

#### State 2B — Default (settings loaded, visibility shown)

**Left nav rail** (desktop: `w-48`, `bg-tertiary`; mobile: not visible — replaced by back button):
- Section: "Channel Settings"
  - **Overview** (channel name, topic)
  - **Permissions**
  - **Visibility** ← active/current item, highlighted with `accent-blurple` left border + text
  - **Invites**
  - **Integrations**

**Right content pane** (desktop: `flex-1`, `bg-secondary`; mobile: full width):
- Header: "Visibility & Indexing" (`text-lg`, `text-primary`)
- Sub-header: "Control who can see this channel and whether search engines can index it." (`text-sm`, `text-muted`)
- Divider (`border-subtle`)
- **VisibilityRadioGroup component** (see Component 3 below)
- Divider
- **Changes toolbar** (only visible after a selection change):
  - Left-aligned text: "Careful — you have unsaved changes" (`text-sm`, `warning`)
  - Right: "Reset" ghost button + "Save Changes" primary button
- **Audit Log section** (collapsible):
  - Section header: "RECENT CHANGES" (`text-xs`, uppercase, `text-muted`)
  - Last 5 visibility change entries (see Component 7 — AuditLogRow)
  - "View full history →" link (`accent-blurple`, `text-sm`)

#### State 2C — Selection Changed (unsaved)

User has clicked a different visibility option but not yet saved:
- The selected radio card shows the new selection (highlighted border)
- The previously selected card returns to unselected style
- "Unsaved changes" toolbar animates in from bottom (slide-up + fade-in, `duration-slow`)
- "Save Changes" button is enabled

#### State 2D — Saving (POST in flight)

- "Save Changes" button switches to loading state:
  - Text hidden, replaced by an animated spinner (16px, white, centered)
  - Button is disabled (`pointer-events-none`)
- "Reset" button is disabled
- The selected radio card shows a subtle pulsing outline (animation uses `accent-blurple`, 1s loop)

#### State 2E — Save Success

- Confirmation modal OR inline:
  - If transitioning to `PUBLIC_INDEXABLE` or from `PUBLIC_INDEXABLE` to `PRIVATE`: **Confirmation Modal** fires BEFORE save (see Screen 3)
  - If transitioning between `PRIVATE` ↔ `PUBLIC_NO_INDEX`: **No confirmation required**, proceeds directly to save
- After confirmed save:
  - Toast notification slides in from bottom-right (see Component 6 — Toast)
  - "Unsaved changes" toolbar animates out (fade + slide down)
  - All form controls re-enabled
  - The active radio card briefly flashes green border (200ms) then settles to normal highlighted state

#### State 2F — Save Error

- "Save Changes" button returns to enabled state
- An inline error banner appears below the VisibilityRadioGroup:
  - Background: `danger-bg`
  - Left border: 4px solid `danger`
  - Icon: ⚠ in `danger`
  - Text: "Failed to save changes. [error message here]. Please try again." (`text-sm`, `text-primary`)
  - A "Retry" link at end of message (`accent-blurple`)
- The "Unsaved changes" toolbar remains visible
- Toast: error variant (see Component 6)

---

### Screen 3: Confirmation Modal

Appears before any high-impact visibility transition. Triggered from State 2C when the user clicks "Save Changes" for:
- Any transition **TO** `PUBLIC_INDEXABLE`
- Any transition **FROM** `PUBLIC_INDEXABLE` (to either PRIVATE or PUBLIC_NO_INDEX)

#### State 3A — Confirming: Make Public & Indexable

**Trigger:** Admin selects `PUBLIC_INDEXABLE` and clicks "Save Changes."

**Modal specs:**
- Width: 440px (desktop), full screen minus 24px margin (mobile)
- Background: `bg-secondary`
- Border radius: `radius-xl`
- Padding: 24px
- Drop shadow: `shadow-lg`
- Backdrop: `bg-overlay`

**Content layout:**
- Icon (top, centered or left): Globe icon with green tint (`status-indexable`), 40px × 40px
- Title: "Make #channel-name public and indexed?" (`text-lg`, `text-primary`)
- Body text block:
  - "This channel will become **visible to anyone on the internet**, including search engines like Google and Bing."
  - Bullet list (checkmark icons, `status-indexable`):
    - "All future messages will be publicly readable"
    - "Search engines will be notified and may index content within 24–48 hours"
    - "A canonical URL will be generated: `/c/{server}/{channel}`"
  - Separator
  - Note: "You can reverse this at any time. Removing from search engine indexes may take up to 2 weeks after reverting." (`text-sm`, `text-muted`)
- Footer (right-aligned):
  - "Cancel" — secondary button
  - "Make Public & Indexed" — primary button (`accent-blurple`)

#### State 3B — Confirming: Remove from Index / Make Private

**Trigger:** Admin is currently `PUBLIC_INDEXABLE`, selects `PRIVATE` or `PUBLIC_NO_INDEX`, and clicks "Save Changes."

**Content layout:**
- Icon: Shield-off or lock icon with red tint (`danger`), 40px × 40px
- Title: "Remove #channel-name from search engines?" (`text-lg`, `text-primary`)
- Body text block:
  - Warning banner (inline, full width):
    - Background: `warning-bg`
    - Left border: 4px `warning`
    - Text: "⚠ De-indexing is not instant. Search engines may continue showing cached content for up to **2 weeks**." (`text-sm`)
  - "Harmony will:"
  - Bullet list (x-circle icons, `danger`):
    - "Request removal of this channel's URL from Google and Bing"
    - "Remove the channel from Harmony's public sitemap immediately"
    - "Stop serving the channel to anonymous visitors" (only if transitioning to PRIVATE)
    - "Block search engine crawlers via `X-Robots-Tag: noindex`" (only if transitioning to PUBLIC_NO_INDEX)
- Footer (right-aligned):
  - "Cancel" — secondary button
  - "Confirm" — danger button (`danger` background)

#### State 3C — Modal Loading (Submitting)

- Both buttons disabled
- "Confirm" button shows spinner
- No further user interaction possible until resolution

#### State 3D — Modal Error (Submit Failed)

- Error banner appears within modal above footer:
  - Background: `danger-bg`, border: `danger`
  - Message: "Something went wrong. Please try again."
- Both buttons re-enabled
- Retry is possible

---

### Screen 4: Toast Notification

**Position:** Fixed, bottom-right corner on desktop (24px from bottom, 24px from right). Full-width bottom bar on mobile (0px margin, 16px from bottom).

**Dimensions:** Min-width 320px, max-width 480px.

#### State 4A — Success Toast

- Left accent bar: 4px, `success`
- Icon: ✓ check circle, `success`, 20px
- Title: "Visibility updated" (`text-sm`, weight 600, `text-primary`)
- Body: Contextual message, e.g., "**#general** is now public and indexed." or "**#general** is now private." (`text-sm`, `text-secondary`)
- Auto-dismiss: 5 seconds (with a shrinking progress bar at bottom of toast, `success` color)
- Manual dismiss: ✕ button, top-right of toast

#### State 4B — Error Toast

- Left accent bar: 4px, `danger`
- Icon: ✗ x-circle, `danger`, 20px
- Title: "Update failed" (`text-sm`, weight 600, `text-primary`)
- Body: Human-readable error message (`text-sm`, `text-secondary`)
- No auto-dismiss (requires manual close)
- Manual dismiss: ✕ button
- "Try again" link at end of body (`accent-blurple`)

---

### Screen 5: Audit Log View (Full Page)

**Trigger:** Admin clicks "View full history →" in the Channel Settings panel.

**Layout:** Same settings panel layout but content pane replaced with the audit log table.

#### State 5A — Loading

- Table header row is rendered
- 5 skeleton rows (each row: left circle 32px, three text blocks of varying width)
- Shimmer animation identical to Screen 2A

#### State 5B — Populated

Table columns:
| Column | Description |
|---|---|
| Changed By | User avatar (24px circle) + display name |
| From | Previous visibility badge |
| To | New visibility badge |
| Date & Time | Formatted: "Feb 14, 2026 at 3:42 PM" |
| IP Address | Partially masked: `192.168.x.x` |

- Pagination: 25 rows per page. "Previous" / "Next" navigation below table.
- Table row hover: background `bg-elevated`
- Table header: `bg-tertiary`, `text-xs` uppercase, `text-muted`

#### State 5C — Empty (No History Yet)

- Table header row
- Center of table: ghost illustration (simple calendar/clock icon, muted)
- Text: "No visibility changes have been made yet." (`text-muted`, `text-sm`, centered)

#### State 5D — Error Loading

- Error banner (full table width):
  - Background: `danger-bg`, border `danger`
  - Text: "Could not load audit history. [Retry]"

---

### Screen 6: Mobile — Channel Settings (Bottom Sheet)

On viewports narrower than 768px, the channel settings panel becomes a bottom sheet.

#### State 6A — Collapsed (Hidden)

Not visible. Triggered by tapping the gear icon on the channel header (mobile does not have a persistent sidebar visible).

#### State 6B — Partially Open (Peek)

- Sheet peeks 60px from the bottom showing a drag handle bar (`bg-elevated`, 4px × 32px, centered)
- A brief haptic-like "spring" animation as it settles
- Background is slightly dimmed (`bg-overlay` at 40% opacity)

#### State 6C — Fully Open

- Sheet occupies 90% of viewport height
- Drag handle at top
- Close button (✕) top-right, 44px × 44px tap target
- Content: scrollable list of settings sections (Overview, Permissions, **Visibility**, etc.)
- Tapping "Visibility" expands a nested sub-panel (no separate nav rail — accordion pattern)
- **VisibilityRadioGroup** renders in full width, stacked vertically
- "Save Changes" and "Reset" sticky at bottom of sheet

#### State 6D — Confirmation Modal (Mobile)

- On mobile, the confirmation dialog slides in FROM the bottom sheet (instead of a centered overlay)
- It takes 100% of the sheet area
- Back button (← arrow) top-left instead of "Cancel" button
- Primary action button full-width at bottom

---

## 4. Component Library

All components use the design tokens defined in Section 2.

---

### Component 1: VisibilityRadioGroup

**Purpose:** The primary control for selecting a visibility state. A set of three mutually exclusive option cards.

**Dimensions:**
- Each card: full width of parent, height auto (min 72px)
- Border: 2px, default `border-default`, selected `accent-blurple`
- Border radius: `radius-lg`
- Background: default `bg-primary`, selected `rgba(88,101,242,0.08)` (blurple tint)
- Padding: 16px

**Card internal layout (horizontal flex):**
```
[ Radio dot ]  [ Icon ]  [ Label + Description ]  [ Badge ]
     20px        24px          flex-grow             auto
```

**Radio dot:**
- 20px × 20px circle, border 2px `border-default`
- Selected state: filled with `accent-blurple`, inner white dot (8px)
- Transition: `duration-fast`

**Icon per option:**
- PRIVATE: 🔒 Lock icon, `status-private`
- PUBLIC_NO_INDEX: 👁 Eye with slash icon, `status-public-no-index`
- PUBLIC_INDEXABLE: 🌐 Globe icon, `status-indexable`
- Icon size: 20px × 20px

**Label + Description:**
- Label: `text-base`, weight 600, `text-primary`
- Description: `text-sm`, `text-muted`, wraps to multiple lines if needed
  - PRIVATE: "Only server members can see this channel."
  - PUBLIC_NO_INDEX: "Anyone with the link can read it, but search engines won't index it."
  - PUBLIC_INDEXABLE: "Publicly accessible and indexed by Google, Bing, and other search engines."

**Right badge:**
- Uses VisibilityBadge component (Component 2)
- Only visible on the SELECTED card
- Animates in (fade + scale from 0.8 to 1.0, `duration-fast`) when card becomes selected

**Keyboard behavior:**
- Arrow Up / Arrow Down navigates between options
- Space or Enter selects the focused option
- Tab moves focus out of the radio group

**Interaction states:**
- Default: normal styling
- Hover (unselected): border upgrades to `border-strong`, background `bg-elevated`
- Focus-visible: 2px `accent-blurple` offset ring (3px outer)
- Selected: blurple border + tinted background
- Disabled: `opacity-50`, `cursor-not-allowed`, no hover/focus effects

---

### Component 2: VisibilityBadge

**Purpose:** A compact status chip showing visibility state. Used in the sidebar channel list, the radio group, and the audit log.

**Sizes:**

| Size | Height | Padding | Font |
|---|---|---|---|
| `sm` | 18px | 2px 6px | `text-xs`, weight 600 |
| `md` | 24px | 4px 10px | `text-sm`, weight 600 |
| `lg` | 28px | 4px 12px | `text-base`, weight 600 |

**Variants by state:**

| State | Text | Text color | Background |
|---|---|---|---|
| PRIVATE | PRIVATE | `status-private` | `rgba(114,118,125,0.15)` |
| PUBLIC_NO_INDEX | UNLISTED | `status-public-no-index` | `status-public-no-index-bg` |
| PUBLIC_INDEXABLE | INDEXED | `status-indexable` | `status-indexable-bg` |

Border radius: `radius-full`

A small dot (6px circle, same color as text) precedes the text label with 4px gap.

---

### Component 3: ConfirmationModal

**Purpose:** A focused blocking dialog for high-impact visibility changes.

**Layout:**
```
┌────────────────────────────────────────┐
│  [Icon 40px]                          │
│  Title (text-lg)                      │
│  ─────────────────────────────────    │
│  Body copy (text-sm, text-secondary)  │
│  • bullet 1                           │
│  • bullet 2                           │
│  • bullet 3                           │
│  ─────────────────────────────────    │
│  [ Warning/Note banner ]              │
│  ─────────────────────────────────    │
│  [  Cancel  ]  [ Primary Action  ]   │
└────────────────────────────────────────┘
```

**Animation:**
- Enter: fade backdrop (`duration-slow`), scale modal from 0.95 to 1.0 + fade in (`duration-normal`)
- Exit: reverse (scale to 0.95, fade out)

**Focus management:**
- On open: focus moves to the modal container (`role="dialog"`, `aria-modal="true"`)
- Focus trapped inside modal until dismissed
- On close: focus returns to the trigger element ("Save Changes" button)

---

### Component 4: InlineErrorBanner

**Purpose:** Non-blocking error display within the settings panel content area.

**Layout (horizontal flex):**
```
[Warning icon 20px] [Error message text] [Retry link]
```

- Border-left: 4px `danger`
- Background: `danger-bg`
- Border-radius: `radius-md`
- Padding: 12px 16px
- Appears with slide-down + fade-in animation

---

### Component 5: UnsavedChangesToolbar

**Purpose:** A sticky bar that appears when the user has changed a setting but not saved. Prevents accidental navigation away from unsaved changes.

**Desktop:** Positioned at bottom of the right content pane (sticky bottom of scrollable area).

**Mobile:** Sticky at bottom of the bottom sheet, above the sheet's drag region.

**Layout:**
```
┌────────────────────────────────────────┐
│ ⚠ Careful — unsaved changes  [Reset] [Save Changes] │
└────────────────────────────────────────┘
```

- Background: `bg-tertiary`
- Top border: 1px `border-subtle`
- Height: 56px
- Padding: 0 16px
- Warning text: `text-sm`, `warning`
- "Reset": ghost button (`text-sm`, `text-secondary`)
- "Save Changes": primary button (`accent-blurple`, `text-sm`)
- Animation: slide up from below viewport edge + fade in (`duration-slow`)

---

### Component 6: Toast

Already specified in Screen 4. Summary:
- Fixed position, bottom-right desktop / full-width mobile
- Two variants: success (green) and error (red)
- Auto-dismiss with progress bar (success only)
- Manual dismiss (both)
- Stacks if multiple toasts present (gap 8px between)

---

### Component 7: AuditLogRow

**Purpose:** A single row in the audit history table.

**Layout:**
```
[Avatar 24px] [Username]  |  [From badge]  →  [To badge]  |  [Date]  |  [IP]
```

- Row height: 48px
- Hover: background `bg-elevated`
- Arrow (→) between badges: `text-muted`
- IP address: monospace font, `text-muted`, last octet masked as `.x`

---

### Component 8: SkeletonLoader

Reusable skeleton blocks used in loading states.

**Variants:**
- `SkeletonLine(width, height)` — a single shimmer bar
- `SkeletonCard(height)` — a full-width shimmer block with radius-lg
- `SkeletonAvatar(size)` — a circular shimmer block

**Shimmer keyframe:**
```
0%   → background-position: -200% 0
100% → background-position: 200% 0
```
Background: linear-gradient(90deg, `bg-elevated`, `rgba(255,255,255,0.04)`, `bg-elevated`), 200% width.

Duration: 1.4s, infinite, ease-in-out.

---

### Component 9: ChannelSettingsNav (Left Rail)

Desktop only. Persistent navigation within the settings panel.

**Layout (vertical flex, `bg-tertiary`, `w-48`, full-height):**
```
Section Label (text-xs, uppercase, text-muted)
  Nav Item 1 (Overview)
  Nav Item 2 (Permissions)
  Nav Item 3 (Visibility)  ← active
  Nav Item 4 (Invites)
  ...
```

**Nav item specs:**
- Height: 36px
- Padding: 0 8px
- Border radius: `radius-md`
- Default: `text-sm`, `text-secondary`
- Hover: background `bg-elevated`, `text-primary`
- Active: background `rgba(88,101,242,0.15)`, left border 2px `accent-blurple`, `text-primary`, weight 600

---

## 5. Responsive Layout Behavior

Breakpoints (matching Tailwind defaults, customizable):

| Name | Width | Layout |
|---|---|---|
| `mobile` | 0–767px | Single-column. No persistent sidebars. |
| `tablet` | 768px–1023px | Two-column. Sidebar collapses to icon rail. |
| `desktop` | 1024px+ | Three-column. All sidebars fully visible. |

---

### 5.1 Server Sidebar Behavior

| Breakpoint | Behavior |
|---|---|
| Desktop | Persistent `w-64` left sidebar, always visible |
| Tablet | Collapsed to icon rail (`w-14`). Channel name hidden. Visibility badge hidden. Gear icon visible on hover. |
| Mobile | Hidden entirely. Accessible via hamburger/swipe gesture from left edge. |

**Annotation for Figma:** Draw a desktop frame and a mobile frame side-by-side. Connect with a "Breakpoint < 768px" annotation arrow. Note: "Sidebar becomes a drawer on mobile — triggered by the hamburger button in the mobile channel header."

---

### 5.2 Channel Settings Panel Behavior

| Breakpoint | Behavior |
|---|---|
| Desktop (≥1024px) | Full-page modal with left nav rail + right content pane. Min-height 600px, max-height 90vh. Width: min(860px, 90vw). |
| Tablet (768–1023px) | Left nav rail collapses to icon-only (`w-14`). Tooltips on hover. Content pane expands to fill remaining space. |
| Mobile (<768px) | No modal. Entire settings UI is a bottom sheet. Nav rail is replaced by an accordion-style list of sections. Each section expands in-place. |

**Annotation for Figma:**
- Desktop frame: Label left rail "w-48, bg-tertiary". Label content pane "flex-1, bg-secondary".
- Tablet frame: Label collapsed rail "w-14, icon-only". Add note: "Channel name tooltip appears on icon hover (role='tooltip')".
- Mobile frame: Arrow from bottom of screen up to sheet. Label: "90vh bottom sheet. Drag handle top-center. Close ✕ top-right."

---

### 5.3 Confirmation Modal Behavior

| Breakpoint | Behavior |
|---|---|
| Desktop | Centered overlay, width 440px, `shadow-lg` |
| Tablet | Centered overlay, width min(440px, 90vw) |
| Mobile | Full-screen bottom sheet approach (see Screen 6D) |

**Annotation for Figma:** On the mobile frame, draw the modal as a panel sliding up from the sheet. Label: "On mobile, the dialog fills the bottom sheet. 'Cancel' becomes a back arrow (←). Action button is full-width."

---

### 5.4 Toast Behavior

| Breakpoint | Behavior |
|---|---|
| Desktop | Bottom-right, width 320–480px, 24px from edges |
| Mobile | Full viewport width, sticky to bottom, 0px horizontal margin, 16px from bottom |

---

### 5.5 Audit Log Table Behavior

| Breakpoint | Behavior |
|---|---|
| Desktop | Full table with all 5 columns |
| Tablet | "IP Address" column hidden. Remaining 4 columns. |
| Mobile | Table collapses to card list. Each audit entry = one card. Card shows: Avatar + name (top), From → To badges (middle), Date (bottom). |

---

## 6. Navigation Flow

The following describes the user's path through the UI. This should be represented in Figma as a flow/prototype connecting frames.

```
[1. Channel List Sidebar]
        │
        │  (Admin hovers channel row → gear icon appears)
        │  (Admin clicks ⚙ gear icon)
        ▼
[2. Channel Settings Panel — Loading (2A)]
        │
        │  (Settings load successfully)
        ▼
[3. Channel Settings Panel — Default (2B)]
        │
        ├──► (Admin clicks a DIFFERENT visibility option)
        │               │
        │               ▼
        │    [4. Channel Settings — Selection Changed (2C)]
        │               │
        │               ├──► (Admin clicks "Reset")
        │               │           │
        │               │           ▼
        │               │    [Back to 3. Default (2B)]
        │               │
        │               └──► (Admin clicks "Save Changes")
        │                           │
        │              ┌────────────┴────────────────┐
        │              │ High-impact transition?      │
        │              │ (involves PUBLIC_INDEXABLE)  │
        │              ├─ YES ──────────────────────► │
        │              │                              ▼
        │              │         [5. Confirmation Modal (3A or 3B)]
        │              │                   │
        │              │         ┌─────────┴──────────┐
        │              │         │                    │
        │              │    (Cancel)             (Confirm)
        │              │         │                    │
        │              │         ▼                    ▼
        │              │    [Back to 4.    [6. Saving State (2D)]
        │              │    Selection               │
        │              │    Changed]      ┌─────────┴──────────┐
        │              │                  │                    │
        │              │              (Success)            (Error)
        │              │                  │                    │
        │              └─ NO ─────────────┘                    │
        │                         │                    ▼
        │                         │          [7. Error State (2F)]
        │                         │          [Error Toast (4B)]
        │                         │
        │                         ▼
        │         [8. Success State (2E) + Success Toast (4A)]
        │
        └──► (Admin clicks "View full history →")
                        │
                        ▼
             [9. Audit Log View (Screen 5)]
                        │
                        └──► (Admin clicks ← back)
                                    │
                                    ▼
                             [Back to 3. Default]
```

**Mobile addendum:** On mobile, steps 2–9 happen entirely within the bottom sheet. The gear icon is accessed via the channel header (top of chat area), which opens the sheet.

---

## 7. Accessibility Requirements

All designs must meet **WCAG 2.1 AA** requirements. The following must be explicitly annotated in the Figma file.

### 7.1 Color Contrast

All text/background combinations must meet minimum contrast ratios:
- Normal text (<18px): 4.5:1 minimum
- Large text (≥18px bold or ≥24px): 3:1 minimum
- Interactive components (focus rings, badge outlines): 3:1 against adjacent background

**Verify these specific combinations:**
| Foreground | Background | Required ratio |
|---|---|---|
| `text-primary` (#dcddde) | `bg-primary` (#36393f) | 4.5:1 ✓ (~6.8:1) |
| `text-muted` (#72767d) | `bg-primary` (#36393f) | 4.5:1 ✗ (~2.8:1) — **only acceptable for decorative/non-essential text** |
| `status-indexable` (#3ba55c) | `bg-secondary` (#2f3136) | 4.5:1 — verify and adjust if needed |
| `text-on-accent` (#ffffff) | `accent-blurple` (#5865f2) | 4.5:1 ✓ (~5.1:1) |
| `danger` (#ed4245) | `bg-secondary` (#2f3136) | 3:1 minimum for icons ✓ |

> **Note:** `text-muted` does not meet 4.5:1 against dark backgrounds. Do not use it for functional or required text. Use it only for supplementary labels (timestamps, metadata). Label all instances in Figma with "Non-essential — muted color OK."

### 7.2 Focus Management

Annotate all interactive elements with:
- **Tab order number** (1, 2, 3… in each screen/modal)
- **Focus ring style:** 2px `accent-blurple` outline, 3px offset, visible against all backgrounds

Critical focus management events to annotate:
- **Modal opens:** Focus moves to modal container (`aria-modal="true"`, `role="dialog"`)
- **Modal closes:** Focus returns to the button that triggered it
- **Toast appears:** Does NOT steal focus (announced via `aria-live="polite"`)
- **Error banner appears:** Announced via `aria-live="assertive"`

### 7.3 ARIA Roles and Labels

Annotate each component with the required ARIA attributes:

| Component | Key ARIA |
|---|---|
| VisibilityRadioGroup | `role="radiogroup"`, `aria-labelledby="visibility-group-label"` |
| Each radio card | `role="radio"`, `aria-checked="true/false"`, `aria-describedby` pointing to description |
| ConfirmationModal | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to title |
| Toast container | `role="status"`, `aria-live="polite"` (success) or `aria-live="assertive"` (error) |
| Audit log table | `role="table"`, `<th scope="col">` for each column header |
| Loading skeleton | `aria-busy="true"` on container, `aria-label="Loading channel settings"` |
| InlineErrorBanner | `role="alert"`, `aria-live="assertive"` |
| UnsavedChangesToolbar | `aria-live="polite"`, `aria-label="Unsaved changes"` |

### 7.4 Keyboard Navigation

Annotate the following keyboard interactions:

| Interaction | Key | Behavior |
|---|---|---|
| Open channel settings | Enter or Space on gear icon | Opens settings panel |
| Navigate radio options | ↑ / ↓ arrow keys | Moves focus between option cards |
| Select radio option | Space or Enter | Selects focused option |
| Close modal | Escape | Dismisses modal, returns focus to trigger |
| Close bottom sheet (mobile) | Escape | Dismisses sheet |
| Dismiss toast | Escape or click ✕ | Closes toast |
| Focus trap in modal | Tab / Shift+Tab | Cycles within modal only |

### 7.5 Motion and Animation

Annotate with: "When `prefers-reduced-motion: reduce` is detected, all CSS transitions and animations are disabled. State changes appear instantaneous."

Specific overrides:
- Shimmer skeleton animation → static `bg-elevated` block
- Modal enter/exit → instant show/hide
- Toast slide-in → instant appear
- Bottom sheet slide-up → instant show

### 7.6 Touch Targets (Mobile)

All interactive elements on mobile must have a minimum tap target of **44px × 44px** (Apple HIG / WCAG 2.5.5 AAA guidance).

Annotate:
- Gear icon in channel header: ensure 44px × 44px tap area even if visual icon is smaller
- Close (✕) button on bottom sheet: 44px × 44px
- Radio cards: already full-width, minimum 72px height — compliant
- Buttons: standard height 40px (md) and 48px (lg) — add 4px invisible padding if needed

### 7.7 Screen Reader Announcements

The following events must trigger screen reader announcements. Annotate each with the announcement text:

| Event | Announcement (via aria-live or role="alert") |
|---|---|
| Visibility selection changed (unsaved) | "Visibility changed to [Private / Unlisted / Indexed]. Save to apply." |
| Save in progress | "Saving visibility settings…" |
| Save success | "Channel visibility updated to [state]." |
| Save error | "Error: Could not update visibility. [Error message]." |
| Modal opens (make public) | "Dialog: Confirm making #channel-name public and indexed" |
| Modal opens (remove from index) | "Dialog: Confirm removing #channel-name from search engines" |

---

## 8. Design Rationale

### 8.1 Radio Group vs. Toggle Switch

**Decision:** The visibility control is a **radio button group of cards**, not a binary toggle or a dropdown.

**Rationale:** There are three meaningfully distinct visibility states. A toggle implies binary choice and would require nesting (toggle → sub-option), which obscures the full option space. A dropdown (`<select>`) would hide the descriptions behind an interaction. A card-based radio group presents all three options simultaneously, with space for explanatory copy on each, making it impossible to select an option without reading what it does. This is especially important because the difference between `PUBLIC_NO_INDEX` and `PUBLIC_INDEXABLE` is subtle and high-stakes.

### 8.2 Confirmation Dialogs for HIGH-IMPACT Changes Only

**Decision:** Confirmation is only required when transitioning to or from `PUBLIC_INDEXABLE`.

**Rationale:** Transitions between `PRIVATE` and `PUBLIC_NO_INDEX` are reversible and low-stakes (no external systems are involved). Adding a confirmation to every save would create friction and train users to dismiss dialogs without reading them ("confirmation fatigue"). By reserving the dialog for changes that trigger external search engine API calls, it remains meaningful and attention-worthy.

### 8.3 Audit Log in the Settings Panel

**Decision:** The last 5 audit entries are surfaced inline within the settings panel, with a "View full history" link.

**Rationale:** Admins making a visibility change benefit from immediate context — when was the last change made? By whom? This reduces the chance of accidentally reverting a recent deliberate decision. Full audit history is one interaction away but not cluttering the primary surface.

### 8.4 Discord-Inspired Dark Theme

**Decision:** The app uses the Discord dark palette (`#36393f`, `#2f3136`, `#202225`, `#5865f2`) as its base.

**Rationale:** Harmony is explicitly positioned as a Discord-like application. Using a familiar aesthetic reduces cognitive load for the target audience (community administrators familiar with Discord). The custom color layer (green for indexable, amber for unlisted, red for danger) layers Harmony's unique public/private concept on top of the familiar foundation without breaking the visual language.

### 8.5 Bottom Sheet on Mobile (Not a Modal)

**Decision:** On mobile, channel settings are presented as a bottom sheet, not a centered modal.

**Rationale:** On small screens, centered modals that overlay the full screen are disorienting and hard to dismiss accidentally. Bottom sheets follow native mobile patterns (iOS action sheets, Android bottom sheets), are reachable with one thumb, and communicate their temporary/dismissible nature through their position. The drag handle reinforces dismissibility. Critically, the bottom-sheet approach allows settings to feel contextual and secondary to the underlying channel, rather than replacing the entire view.

### 8.6 Semantic Visibility Colors

**Decision:** PRIVATE = gray, PUBLIC_NO_INDEX (unlisted) = amber/yellow, PUBLIC_INDEXABLE = green.

**Rationale:**
- **Green = published/live** — universally understood as "active" or "published" in publishing workflows (like a traffic light's green = go)
- **Amber = visible but restricted** — suggests "proceed with caution"; this channel is viewable but not promoting itself to search engines
- **Gray = locked/inactive** — neutral, recessive color for the default private state, consistent with Discord's use of gray for disabled or muted states

This palette avoids using red for any of the three states (red is reserved exclusively for errors and destructive actions), preventing confusion between "this channel is private" and "something is wrong."

### 8.7 UnsavedChangesToolbar Position (Sticky Bottom)

**Decision:** The unsaved changes toolbar appears at the bottom of the content pane, sticky.

**Rationale:** On long settings pages, a toolbar at the top or inline with the controls may scroll off-screen. A sticky bottom toolbar ensures the save action is always accessible regardless of scroll position. This pattern is widely used (Notion, Vercel dashboard, Discord server settings) and users recognize its meaning without instruction.

### 8.8 Navigation Flow: Settings Within a Panel (Not a Page)

**Decision:** Channel settings open as a floating panel over the channel view, not a separate page route.

**Rationale:** Navigating away to a new page would lose the channel context entirely. The panel approach (like Discord's server settings) keeps the user oriented — they can see the channel behind the panel — and makes the transition feel modal and intentional. It also avoids adding a route to the browser history for every settings open, which would pollute the back-button stack.

---

## Appendix A: Figma File Structure Recommendation

```
Harmony — Channel Visibility Toggle
├── 🎨 Tokens
│   ├── Colors
│   ├── Typography
│   └── Spacing
├── 🧩 Components
│   ├── VisibilityRadioGroup (all states)
│   ├── VisibilityBadge (all variants & sizes)
│   ├── ConfirmationModal (3A, 3B, 3C, 3D)
│   ├── InlineErrorBanner
│   ├── UnsavedChangesToolbar
│   ├── Toast (success, error)
│   ├── AuditLogRow
│   ├── SkeletonLoader
│   └── ChannelSettingsNav
├── 📱 Mobile Frames (375px wide)
│   ├── 1. Channel List Sidebar (hidden — accessed via hamburger)
│   ├── 2. Channel Header with Gear
│   ├── 3. Bottom Sheet — Loading
│   ├── 4. Bottom Sheet — Default (Visibility section collapsed)
│   ├── 5. Bottom Sheet — Visibility Expanded
│   ├── 6. Bottom Sheet — Selection Changed
│   ├── 7. Bottom Sheet — Saving
│   ├── 8. Bottom Sheet — Success + Toast
│   ├── 9. Bottom Sheet — Error + Toast
│   ├── 10. Confirmation (Indexable)
│   ├── 11. Confirmation (De-index)
│   └── 12. Audit Log (card list)
├── 🖥 Desktop Frames (1440px wide)
│   ├── 1. Channel List — Default
│   ├── 2. Channel List — Row Hover
│   ├── 3. Channel List — Empty
│   ├── 4. Settings Panel — Loading
│   ├── 5. Settings Panel — Default
│   ├── 6. Settings Panel — Selection Changed
│   ├── 7. Settings Panel — Saving
│   ├── 8. Settings Panel — Success
│   ├── 9. Settings Panel — Error
│   ├── 10. Confirmation Modal — Make Indexable
│   ├── 11. Confirmation Modal — De-index
│   ├── 12. Confirmation Modal — Loading
│   ├── 13. Confirmation Modal — Error
│   ├── 14. Toast — Success
│   ├── 15. Toast — Error
│   └── 16. Audit Log — Full Page (loaded, empty, error)
└── 🔗 Prototype Flow
    └── (connect all frames per Section 6 Navigation Flow)
```

---

## Appendix B: Figma Make Prompt Addendum

When passing this brief to Figma Make, include the following prefatory context:

> "Design a high-fidelity UI for Harmony, a Discord-like community chat application with public/searchable channels. Use a dark-mode color scheme with `#36393f` as the primary background, `#2f3136` for sidebars, and `#5865f2` (blurple) as the primary accent. Inter is the font. The feature being designed is the Channel Visibility Toggle — an admin setting that controls whether a channel is Private, publicly viewable (unlisted), or publicly indexed by search engines. All component specifications, states, layout rules, and accessibility requirements are defined in the design brief below."
