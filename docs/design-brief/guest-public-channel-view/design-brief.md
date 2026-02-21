# Harmony — Guest Public Channel View: UI Design Brief

**Issue:** #41
**Feature:** Anonymous Access to Public Channel Content
**Dev Spec Reference:** `docs/dev-spec-guest-public-channel-view.md`
**Author:** Aiden-Barrera
**Version:** 1.0 (2026-02-21)
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

The Guest Public Channel View allows anonymous users (guests) to read the full
contents of a public Harmony channel via a direct URL — without being prompted
to log in. This is Harmony's core differentiating feature: making community
knowledge publicly searchable and accessible.

Guests arrive primarily from search engine results. The UI must serve them the
information they need immediately, then gently encourage them to join.

| Channel State         | Guest Can View? | Indexed by Search? |
|---|---|---|
| `PUBLIC_INDEXABLE`    | Yes             | Yes                |
| `PUBLIC_NO_INDEX`     | Yes             | No                 |
| `PRIVATE`             | No              | No                 |

### Design Goals

1. **Zero friction for guests** — No login wall, no modal interruption. Content
   renders immediately on page load via SSR.
2. **Encourage conversion without being intrusive** — The GuestPromoBanner
   replaces the message input area and is dismissible. It never blocks content.
3. **Read-only clarity** — The absence of a message input and reaction controls
   makes the read-only state self-evident without explicit labels.
4. **Graceful failure** — Every error state (404, 403, 500, rate limit) gives
   the guest a clear next step.
5. **SEO-friendly rendering** — Full HTML rendered server-side. No content
   hidden behind client-side loading for search bots.

---

## 2. Visual Design Tokens

### Color Palette

| Token            | Hex                      | Usage                              |
|---|---|---|
| `bg-primary`     | `#36393f`                | Main content area, chat background |
| `bg-secondary`   | `#2f3136`                | Sidebar, headers, panels           |
| `bg-tertiary`    | `#202225`                | Server icon rail, deep background  |
| `bg-elevated`    | `#40444b`                | Hover states, tooltips, skeletons  |
| `accent`         | `#5865f2`                | Buttons, active states, links      |
| `text-primary`   | `#dcddde`                | Body text, usernames               |
| `text-secondary` | `#b9bbbe`                | Subdued body, descriptions         |
| `text-muted`     | `#72767d`                | Timestamps, placeholders, icons    |
| `green`          | `#3ba55c`                | Online, INDEXED badge              |
| `amber`          | `#faa81a`                | Warnings, UNLISTED badge           |
| `red`            | `#ed4245`                | Errors, danger                     |
| `border`         | `rgba(255,255,255,0.06)` | Dividers, card borders             |

### Typography

| Role            | Size | Weight | Color     |
|---|---|---|---|
| Page heading    | 24px | 700    | `#dcddde` |
| Channel name    | 16px | 600    | `#dcddde` |
| Username        | 14px | 600    | `#dcddde` |
| Body / message  | 15px | 400    | `#dcddde` |
| Sidebar label   | 14px | 500    | `#b9bbbe` |
| Timestamp       | 12px | 400    | `#72767d` |
| Section header  | 11px | 700    | `#72767d` |

Font: **Inter**. Section headers uppercase, letter-spacing 0.12em.

### Spacing & Radius

| Element               | Value  |
|---|---|
| Badges / pills        | 9999px |
| Buttons, inputs       | 6px    |
| Cards                 | 8px    |
| Modals / sheets       | 12px   |
| Message hover toolbar | 6px    |

---

## 3. Screen Inventory

### Desktop (≥1024px)

| ID | Screen Name                      | Dev Spec Ref      |
|----|----------------------------------|-------------------|
| D1 | Loaded — Default                 | S7, S9            |
| D2 | Loading — Skeleton               | S6                |
| D3 | Empty Channel                    | S7 (0 messages)   |
| D4 | Message Highlighted (deep link)  | M5                |
| D5 | Infinite Scroll — Loading More   | M2                |
| D6 | Infinite Scroll — All Loaded     | M1 hasMore=false  |
| D7 | Search Terms Highlighted         | F1.25             |
| D8 | Inline Load Error                | RF-5              |
| E1 | 500 Server Error                 | RF-1              |
| E2 | 403 Access Denied (from search)  | D2                |
| E3 | Redirect — Server Landing        | D3                |
| E4 | 404 Not Found                    | D4                |
| E5 | Rate Limited                     | IF-2, C4.3        |

### Mobile (<768px)

| ID | Screen Name                |
|----|---------------------------|
| M1 | Loaded Default             |
| M2 | Drawer (Channel Nav)       |
| M3 | Loading Skeleton           |
| M4 | Empty State                |
| M5 | Access Denied Login Prompt |
| M6 | Error State                |
| M7 | Message Highlighted        |
| M8 | Infinite Scroll Loading    |

---

## 4. Component Library

### C1.5 MessageCard (CL-C1.5)
Avatar (32px circle) + username + timestamp + message body. Hover reveals
action toolbar (copy link, share). Three states: Default, Hover, Highlighted
(amber left bar for deep-link target). Consecutive messages from same author
within 5 min omit avatar and header row.

### C1.4 GuestPromoBanner (CL-C1.4)
Sticky bottom of message area. Replaces message input for guests entirely.
Contains: server icon + server name + member count + "Join Server" CTA + ✕
dismiss. Dismissible — preference stored 24h via AnonymousSessionManager.

### C1.6 ServerSidebar (CL-C1.6)
Server icon + name + member count + PUBLIC CHANNELS list. Only
`PUBLIC_INDEXABLE` and `PUBLIC_NO_INDEX` channels rendered. `PRIVATE` channels
never appear. Active channel has `#5865f2` tint + left border 2px.

### C1.3 MessageListComponent (CL-C1.3)
Scrollable message container. SSR renders initial 50 messages. Infinite scroll
loads more client-side. Shows: skeleton during load, end-of-channel indicator
when `hasMore = false`, inline error row on fetch failure.

### Access Denied / Error States
- **Login Prompt (403)** — lock icon, explanation, Login / Create Account / Browse CTAs
- **Server Landing (303)** — redirects to `/s/{server}` with public channel list
- **Not Found (404)** — generic "channel not found", no existence disclosure
- **Rate Limited** — countdown timer, "try again in Ns"
- **500 Error** — try again + go to server CTAs

---

## 5. Responsive Layout Behavior

### Breakpoints

| Breakpoint   | Layout                                               |
|---|---|
| ≥1024px      | Server rail (72px) + Sidebar (240px) + Main (flex-1) |
| 768–1023px   | Sidebar icon rail (56px) + Main expanded             |
| <768px       | Single column; sidebar → left drawer overlay         |

### GuestPromoBanner Adaptation

| Breakpoint   | Content                                                 |
|---|---|
| ≥1024px      | Full: icon + full text + "Join Server" + ✕             |
| 768–1023px   | Icon + single-line truncated text + "Join Server" + ✕  |
| <768px       | Icon + compact text + "Join" (short label) + ✕         |

### Rules
- GuestPromoBanner always visible above viewport bottom at all breakpoints
- Message input **never rendered** for guests at any breakpoint
- Channel topic text hides at 768–1023px breakpoint
- Server icon rail hides at tablet and mobile

---

## 6. Navigation Flow

```
Guest arrives (search result or direct link)
              │
              ▼
    Visibility check (C4.1 VisibilityGuard)
              │
    ┌─────────┴────────────────────┐
    │ PUBLIC_INDEXABLE /           │ PRIVATE
    │ PUBLIC_NO_INDEX              │
    ▼                              ▼
Render full page             Check referrer + server
(D1 default)                 ┌────┴───────────────────────┐
                             │ From search?    Server public?
                             ▼                ▼
                        Login prompt    Server landing
                        (E2 modal)      redirect (E3)
                                   ┌────┘
                                   │ Neither
                                   ▼
                                  404 (E4)

Within the full channel page:
  ├─ URL ?m={id}        → Scroll + highlight message (D4)
  ├─ Referrer = Google  → Highlight search terms (D7)
  ├─ Scroll to bottom   → Load more messages (D5 → D6)
  ├─ Click channel row  → Navigate to that channel
  └─ Click "Join Server"→ Auth flow (login/register)
```

---

## 7. Accessibility Requirements

### Tab Order (Desktop D1)

① Sidebar public channel links (arrow-key navigation)
② Channel header: search icon, share icon
③ MessageCard copy-link (visible on keyboard focus)
④ MessageCard share
⑤ GuestPromoBanner "Join Server" button
⑥ GuestPromoBanner dismiss ✕

### ARIA Roles

| Component            | ARIA                                                  |
|---|---|
| MessageListComponent | `role="feed"` `aria-busy="true/false"`               |
| MessageCard          | `role="article"` `aria-labelledby="author-ts-{id}"`  |
| ServerSidebar        | `role="navigation"` `aria-label="Public channels"`   |
| Active channel link  | `aria-current="page"`                                 |
| GuestPromoBanner     | `role="complementary"` `aria-label="Join server"`    |
| Access denied modal  | `role="dialog"` `aria-modal="true"`                  |
| Load more sentinel   | `aria-label="Loading more messages"`                 |

### Focus Management
- Access denied modals trap focus inside when open
- Escape key dismisses modal, returns focus to triggering element
- GuestPromoBanner uses `aria-live="polite"` — announces after page load,
  not on first render, to avoid interrupting screen reader flow
- Search `<mark>` highlights are announced via parent paragraph `aria-label`

### Motion
- Skeleton shimmer respects `prefers-reduced-motion: reduce`
- Message highlight 3s fade-out skips to end under reduced motion
- Infinite scroll message append does not cause scroll jump

---

## 8. Design Rationale

### No Login Wall
Guests arrive with a specific question from a search result. Any friction
before the answer defeats Harmony's core value proposition. The design never
blocks content behind authentication for public channels.

### GuestPromoBanner Placement
The banner replaces the dead space of the message input (which guests cannot
use). It does not float over content or create a visual barrier. Being
dismissible with 24h preference storage means repeat visitors are not
harassed with the same CTA.

### Read-Only Through Absence
Read-only state is communicated by omission: no message input, no reaction bar,
no thread controls. This is immediately recognizable to Discord-familiar users
without requiring "read-only" labels that would clutter the UI.

### Three Access Denied Variants
One generic error page would fail in three distinct situations:
1. **Login prompt** — user came from search expecting content, deserves
   explanation and a path to access it
2. **Server landing** — server is public; redirect keeps the user engaged
   with available content rather than bouncing them
3. **404** — confirms nothing about channel or server existence, preventing
   enumeration attacks (IF-6)

### Component Reuse from Issue #40
The `VisibilityBadge` (sm) from the Channel Visibility Toggle design is reused
in the ServerSidebar channel rows. The skeleton loading pattern is also
consistent. This ensures visual language is shared between admin controls and
the public-facing view.

### Mobile Drawer vs Icon Rail
At <768px there is insufficient width for a sidebar icon rail alongside
readable message content. A full left-drawer overlay preserves navigation
capability without sacrificing the reading experience on small screens.
