PROMPT:

Design a Figma page titled "📱 Mobile Screens" for Harmony's Guest Public Channel
View. All frames 375×812px, dark mode, Inter font. bg #36393f, panels #2f3136,
deep #202225, elevated #40444b, accent #5865f2, text #dcddde/#b9bbbe/#72767d,
green #3ba55c, amber #faa81a, red #ed4245. Two rows of four, 48px gaps.

Mobile shell (all message frames): status bar 20px #202225 "9:41" white centered +
channel header 52px #2f3136 (☰ 22px #dcddde 44×44px tap left; "# general" 16px
600 center; search + share icons 22px #b9bbbe 44×44px right) + message list
#36393f + GuestPromoBanner 64px sticky bottom #2f3136 border-top rgba(255,255,255,
0.06) (server icon 28px #5865f2 "H" + "Join Harmony Dev" 13px 600 + "Connect with
1,247 members." 11px #b9bbbe + "Join" button 32px #5865f2 radius 6px + ✕ 18px).

Messages (MSG-1–4): jdoe #5865f2 "JD", skumar #3ba55c "SK", mbell #faa81a "MB".
Avatar 28px, username 13px 600, body 14px, timestamp 10px #72767d.

ROW 1:

Frame M1 "Loaded — Default": Full shell, all 4 messages, GuestPromoBanner.
Annotations: ☰ → "Opens channel nav drawer (M2). Full width for content on mobile.";
message list → "SSR-rendered read-only. No message input at any mobile breakpoint.";
banner → "Compact mobile variant: 64px, 'Join' short label."

Frame M2 "Channel Navigation Drawer": App at 30% opacity. rgba(0,0,0,0.72) overlay
covers right 60%. Left drawer 280px #2f3136 full height shadow 4px 0 24px
rgba(0,0,0,0.5): server header (icon 40px #5865f2 + "Harmony Dev" 16px bold +
"1,247 members" 12px #72767d) → divider → "PUBLIC CHANNELS" 11px uppercase → 5
channel rows 44px (#general ACTIVE bg rgba(88,101,242,0.15) left border 2px
#5865f2 text #5865f2 600 + INDEXED badge; others #b9bbbe with appropriate badges)
→ members chip "342 online" green.
Annotations: drawer → "Only PUBLIC_INDEXABLE/PUBLIC_NO_INDEX shown. PRIVATE never
rendered."; overlay → "Tap to close. Swipe left also closes."

Frame M3 "Loading — Skeleton": Shell with real header + banner. Message list: 4
skeleton rows (padding 8px 16px, circle 28px #40444b, two shimmer lines #40444b /
rgba(255,255,255,0.06)). Annotation: "Skeleton matches exact card dimensions.
Banner SSR-rendered — visible from first paint. [S6]"

Frame M4 "Empty Channel": Shell. Message list: centered empty state (# 48px #40444b
+ "No messages yet" 16px 600 + "Be the first to start the conversation." 13px
#72767d + "Join Server" button 40px #5865f2 margin-top 18px). Banner at bottom.
Annotation: "Empty state CTA = conversion prompt. [S7 messages=[]]"

ROW 2:

Frame M5 "Access Denied — Login Prompt": Ghost shell at 30% + rgba(0,0,0,0.72)
overlay. Bottom sheet #2f3136 radius 12px 12px 0 0 height ~540px: drag handle 4px
32px #40444b centered margin-top 8px → lock 40px #72767d in circle 68px rgba(114,
118,125,0.15) → "This channel is private" 18px bold #dcddde → divider → body 13px
#b9bbbe → amber strip bg rgba(250,168,26,0.12) border-left 4px #faa81a padding
10px 12px: "⚠ May be in another public channel." 12px #faa81a → footer flex column
gap 10px: "Log in" primary full-width 48px #5865f2 + "Create Account" secondary
48px #40444b + "Browse Public Channels" ghost 44px #5865f2.
Annotations: sheet → "[E2 mobile] Swipe down does NOT dismiss — user must choose.
[F2.7]"; footer → "Full-width for thumb reach. Conversion priority order."

Frame M6 "Error State (500)": Full shell. Message area replaced (no overlay):
centered error (warning triangle 48px #ed4245 + "Something went wrong" 18px bold +
"We couldn't load this channel right now." 13px #b9bbbe max-width 280px + buttons
stacked full-width: "Try Again" 48px #5865f2 + "Go to Server" 48px #40444b +
error ref 11px #72767d mono). No GuestPromoBanner.
Annotations: panel → "[RF-1] Error boundary. Header stays. Buttons full-width for
thumb reach."; ref → "No stack traces exposed."

Frame M7 "Message Highlighted (Deep Link)": Full shell. MSG-3 centered in viewport,
bg rgba(250,168,26,0.08) left border 2px #faa81a. Pill above: "Jumped to message"
10px #72767d bg #2f3136 radius 9999px padding 4px 12px centered. Banner at bottom.
Annotations: highlight → "C2.2 3s amber tint then fades [M5]"; pill → "Fades 2s.
aria-live='polite'."

Frame M8 "Infinite Scroll — Loading More": Shell scrolled to bottom. MSG-4
partially cut off. Below: loading row 36px flex center: 3-dot spinner 20px #72767d
+ "Loading more..." 12px #72767d 6px gap. Banner scrolled off. Thin scrollbar near
bottom. Annotation: "C2.1 IntersectionObserver. Fetches ?page=2&limit=50. [M2]"

FIGMA MAKE RESPONSE:
This is a detailed request to design a Figma page with 8 mobile screens for a Discord-like app called Harmony. The user wants all frames to be 375×812px in dark mode with specific colors and components.

Let me break down what I need to create:

    8 frames arranged in 2 rows of 4, with 48px gaps
    Each frame is 375×812px
    Dark mode color scheme
    Inter font
    Common mobile shell with status bar, channel header, message list, and guest promo banner
    Different states for each frame

This is a pure frontend task - no Supabase needed. I'll create a React component that displays all 8 frames with the specifications.

Let me start by:

    Creating the main App.tsx with all 8 frames
    Using exact dimensions and colors specified
    Creating reusable components for the mobile shell, messages, etc.

I'll use Tailwind CSS for styling and create a responsive layout.

I'll create a comprehensive Figma-style design page showing all 8 mobile screens for Harmony's Guest Public Channel View. Let me build this with precise specifications and reusable components.

I've created a comprehensive Figma design page showing all 8 mobile screens for Harmony's Guest Public Channel View. Each frame is precisely 375×812px with the exact color scheme and specifications you provided. The screens include: loaded default state, channel navigation drawer, loading skeletons, empty channel state, access denied modal, error state, highlighted message from deep link, and infinite scroll loading. All frames feature the mobile shell with status bar, channel header, message list, and guest promo banner, arranged in 2 rows of 4 with 48px gaps and detailed annotations for each state.

Suggested next steps:

    Add interactive hover states or animations using Motion
    Create additional edge case screens (network offline, rate limiting)
    Build corresponding desktop breakpoint versions


