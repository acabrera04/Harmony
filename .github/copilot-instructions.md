# Copilot Instructions for Harmony

## Repository scope
- Harmony is a **search engine indexable chat application** (`README.md`).
- Repository contains **development specifications** in `docs/` and **frontend implementation** in `harmony-frontend/`.
- Core specs live in:
  - `docs/dev-spec-channel-visibility-toggle.md`
  - `docs/dev-spec-guest-public-channel-view.md`
  - `docs/dev-spec-seo-meta-tag-generation.md`

## Project structure
- **`docs/`** - Development specifications (design documents)
- **`harmony-frontend/`** - Next.js 14+ frontend application
  - Built with TypeScript, React 18.2+, Tailwind CSS
  - Uses App Router (not Pages Router)
  - Path aliases: `@/` maps to `src/`

## Build, test, and lint commands

### Frontend (`harmony-frontend/`)
- **Install dependencies:** `npm install`
- **Dev server:** `npm run dev` (http://localhost:3000)
- **Build:** `npm run build`
- **Production server:** `npm start`
- **Lint:** `npm run lint`
- **Type check:** `npx tsc --noEmit`

### Specs/Docs
- No build/test commands for specifications
- Jest/Playwright/Lighthouse referenced in specs are design intent for future implementation

## High-level architecture (cross-spec)
- The system is designed around a public-route SSR experience (`/c/{serverSlug}/{channelSlug}`) with CDN + app server + database/cache layers.
- `dev-spec-channel-visibility-toggle.md` defines canonical visibility state (`PUBLIC_INDEXABLE`, `PUBLIC_NO_INDEX`, `PRIVATE`) and emits `VISIBILITY_CHANGED`.
- `dev-spec-guest-public-channel-view.md` defines anonymous public-channel rendering and visibility-gated access (via `VisibilityGuard` and public-only query paths).
- `dev-spec-seo-meta-tag-generation.md` defines meta tag generation, caching, background regeneration, and de-index/purge behavior on privacy transitions.
- Cross-spec contract: visibility transitions drive downstream SEO and guest-cache behavior (generate/update/delete tags and warm/invalidate guest cache).

## Key repository conventions
- Dev specs use a strict numbered structure with consistent major sections (`1` through `13` across all three specs; SEO spec also includes `14. Acceptance Criteria`).
- Use and preserve the labeling system across diagrams/tables:
  - Modules: `M#`
  - Classes: `CL-C#`, DTOs: `CL-D#`, Entities: `CL-E#`, Interfaces: `CL-I#`
  - Data schemas: `D#`, Technologies: `T#`, Flows: `F#`, States: `S#`/`B#`
- Keep **Section 3 (Class Diagram)** and **Section 4 (List of Classes)** synchronized whenever classes are added/renamed.
- Preserve canonical visibility enum values exactly: `PUBLIC_INDEXABLE`, `PUBLIC_NO_INDEX`, `PRIVATE`.
- Prefer UUID-based identifiers in cache/data contracts and keep key patterns consistent with each spec’s schema section.

### Frontend Code (`harmony-frontend/`)
- **Component organization:** Domain-driven structure
  - `components/ui/` - Base UI components (Button, Card)
  - `components/channel/` - Channel components (MessageCard, MessageList, GuestPromoBanner)
  - `components/server/` - Server components (ServerSidebar)
  - `components/shared/` - Shared components across domains
- **Utilities:** All helper functions in `lib/utils.ts`, constants in `lib/constants.ts`
- **API calls:** Use `apiClient` from `lib/api-client.ts` (configured Axios instance)
- **Type definitions:** Keep types in `types/` folder, aligned with dev spec data schemas
- **Naming conventions:**
  - Components: PascalCase (e.g., `MessageCard.tsx`)
  - Files: kebab-case for non-components
  - Use named exports for components
- **Dev spec alignment:** Reference dev spec class labels in component documentation (e.g., C1.5, M1)
- **Styling:** Use Tailwind CSS classes; use `cn()` utility from `lib/utils.ts` for conditional classes
- **Path aliases:** Always use `@/` instead of relative imports (e.g., `@/components/ui/Button`)

## Technology stack (Section 8 across all dev specs)
- **T1:** TypeScript 5.3+ (primary language, strict mode enabled)
- **T2:** React 18.2+ (UI framework)
- **T3:** Next.js 14.0+ (SSR/SSG framework - critical for SEO)
- **T4:** Node.js 20 LTS (server runtime)
- **T5:** PostgreSQL 16+ (primary database - future)
- **T6:** Redis 7.2+ (caching, session storage, EventBus - future)
- **T7:** Prisma 5.8+ (type-safe ORM - future)
- **T8:** tRPC 10.45+ (end-to-end typesafe APIs for authenticated internal - future)
- **Frontend installed:** Tailwind CSS, ESLint, Prettier, axios, clsx, tailwind-merge
