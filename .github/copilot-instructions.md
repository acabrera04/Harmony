# Copilot Instructions for Harmony

## Repository scope
- Harmony is a **search engine indexable chat application** (`README.md`), but this repository currently stores **development specifications** rather than runnable app code.
- Core specs live in:
  - `docs/dev-spec-channel-visibility-toggle.md`
  - `docs/dev-spec-guest-public-channel-view.md`
  - `docs/dev-spec-seo-meta-tag-generation.md`

## Build, test, and lint commands
- No runnable build/lint/test commands are currently defined in this repository.
- No package/build manifests or test configs were found (for example: `package.json`, `pyproject.toml`, `go.mod`, `jest.config.*`, `playwright.config.*`, `.github/workflows/*`).
- **Single-test command:** N/A in current repository state.
- The specs reference Jest/Playwright/Lighthouse as intended tooling for the future implementation; treat those as design intent, not executable commands in this repo.

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
