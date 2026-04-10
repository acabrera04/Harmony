# Final Project Sprint Plan — April 10 – May 3, 2026

## Context
This plan covers the remaining work required to finish Harmony (search-engine-indexable chat app) from today (2026-04-10) through 2026-05-03. It spans two sprints:

- **Sprint 4 — Deployment (April 10–19):** execute `planning/SPRINT_4_PLAN.md` (P6 Deployment on Vercel + Railway). That plan is already detailed and not re-derived here — this doc references it and tracks it as a milestone.
- **Sprint 5 — SEO Feature Completion, Polish, and Final Submission (April 20 – May 3):** finish the SEO Meta Tag Generation feature against `docs/dev-spec-seo-meta-tag-generation.md`, verify it on the deployed Vercel + Railway stack, and produce the final project submission package.

Harmony's headline feature is SEO-indexable public channels, so the project cannot be considered "done" until the SEO meta tag generation feature's acceptance criteria (AC-1 through AC-10 in §14 of the dev spec) are satisfied against the live production deployment.

## Team
5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI

---

## Sprint 4 — Deployment (April 10–19)

Sprint 4 is defined in detail in `planning/SPRINT_4_PLAN.md`. This section only restates milestones and exit criteria so Sprint 5 can assume a concrete starting state.

### Sprint 4 exit criteria (must be true before Sprint 5 starts)
- Public Vercel frontend URL live on the apex domain
- Public Railway backend URL live on `api.<frontend-domain>`
- `backend-api` running with **2+ replicas**; `backend-worker` running as singleton
- Redis-backed shared rate limiting and Cloudflare R2 attachment storage in production
- Single-owner Prisma migration runner; `backend-api` replicas do not race migrations
- `.github/workflows/run-integration-tests.yml`, `deploy-railway.yml`, `deploy-vercel.yml` merged and green
- Branch protection on `main` with required checks
- `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md` committed and current
- README updated for user-facing and deployer-facing instructions
- P6 submission package assembled (links, logs, reflection, LLM logs)

### Sprint 4 key dates
| Date | Milestone |
|------|-----------|
| Apr 11 (Sat) | Architecture + scale audit locked (#1, #2) |
| Apr 12 (Sun) | API/worker split done; CD workflows scaffolded (#5, #11, #12) |
| Apr 14 (Tue) | Vercel live, integration tests running local + cloud (#9, #16) |
| Apr 16 (Thu) | Branch protection enabled (#13) |
| Apr 18 (Sat) | Multi-replica validation evidence captured (#14) |
| Apr 19 (Sun) | P6 submission package complete (#15) |

---

## Sprint 5 — SEO Feature Completion, Polish, and Final Submission (April 20 – May 3)

### Goal
Ship the SEO Meta Tag Generation feature end-to-end on the deployed Vercel + Railway stack, verified against dev spec §14 acceptance criteria, and deliver the final project submission package by Sunday, May 3.

### Scope anchor
Dev spec: `docs/dev-spec-seo-meta-tag-generation.md`
- Modules M1–M5 (page rendering, meta tag generation, content analysis, background processing, caching)
- Classes C1.1–C6.x per §3 / §4
- APIs / public interfaces per §9 / §10
- Acceptance criteria AC-1 through AC-10 per §14

### Sprint 5 guardrails
- All work on feature branches with PR review (branch protection is live from Sprint 4)
- Every PR must pass `run-integration-tests` + unit workflows before merge
- No backend code that re-introduces process-local singletons on `backend-api` replicas — new SEO subscribers/workers land on `backend-worker` only
- Cache writes go through Redis (`MetaTagCache` / C2.6), not process memory
- All destructive schema changes follow the expand/contract convention established in Sprint 4

---

### Phase A — SEO backend core (April 20–23)

**S1. Meta tag generation service skeleton (M2)**
- Implement `MetaTagService`, `TitleGenerator`, `DescriptionGenerator`, `OpenGraphGenerator`, `StructuredDataGen`, and `MetaTagCache` per dev spec §3/§4
- Wire Redis-backed `MetaTagCache` with configurable TTL
- Unit tests for template application, length limits (AC-2), sanitization, fallback behavior (AC-9)
- Assignee: **declanblanc**
- Backup: **acabrera04**
- Due: Apr 22
- Blocked by: Sprint 4 exit criteria

**S2. Content analysis module (M3)**
- Implement `ContentAnalyzer`, `KeywordExtractor`, `TextSummarizer`, `TopicClassifier`
- Ensure deterministic fallbacks so `MetaTagService` can degrade to template-only output on NLP timeout
- Unit tests covering keyword extraction, summarization, and fallback paths
- Assignee: **Aiden-Barrera**
- Backup: **declanblanc**
- Due: Apr 22
- Blocked by: none (parallel with S1)

**S3. Data schema + persistence for meta tag overrides (§11)**
- Prisma migration for meta tag storage fields (`customTitle`, `customDescription`, `needsRegeneration`, cache metadata) per dev spec §11
- Respect Sprint 4 expand/contract migration rules so rollout is safe with 2+ API replicas
- Custom overrides must never be overwritten by background regeneration (AC-7)
- Assignee: **FardeenI**
- Backup: **AvanishKulkarni**
- Due: Apr 22
- Blocked by: Sprint 4 migration-runner ownership

**S4. REST + tRPC endpoints (§9, §10)**
- `GET /api/channels/:id/meta-tags`
- `PUT /api/channels/:id/meta-tags` with override validation (customTitle ≤70, customDescription ≤200 — AC-3)
- `POST /api/channels/:id/meta-tags/regenerate` returning `jobId` with idempotency key (AC-5, AC-6)
- `GET /api/channels/:id/meta-tags/regenerate/:jobId` status polling
- API integration tests for each endpoint
- Assignee: **FardeenI**
- Due: Apr 23
- Blocked by: S1, S3

---

### Phase B — Background processing + visibility lifecycle (April 22–25)

**S5. Background meta tag update worker (M4) on `backend-worker`**
- Implement `MetaTagUpdateWorker`, `EventListener`, and job queue integration
- Subscribe to `MessageCreated`, `MessageEdited`, `MessageDeleted`, `VisibilityChanged` events on the shared Redis event bus
- Worker must run as singleton only (enforced by Sprint 4 topology)
- Debounce/batch regeneration so noisy channels don't overwhelm the pipeline
- Assignee: **Aiden-Barrera**
- Backup: **declanblanc**
- Due: Apr 24
- Blocked by: S1, S2

**S6. Visibility transition + de-indexing workflow (AC-4, AC-10)**
- On `VISIBILITY_CHANGED → PRIVATE`: invalidate `MetaTagCache`, remove sitemap URL, flip `noindex`
- On `VISIBILITY_CHANGED → PUBLIC_INDEXABLE`: re-enqueue regeneration
- Integration tests covering both directions and cache/sitemap side effects
- Assignee: **declanblanc**
- Due: Apr 25
- Blocked by: S5

**S7. Security + content filtering (§12, AC-8)**
- PII and profanity filters on generated titles/descriptions
- Ensure overrides and generated tags cannot inject HTML/attributes into rendered `<head>`
- Unit tests with fixture content covering PII/profanity/XSS
- Assignee: **AvanishKulkarni**
- Backup: **Aiden-Barrera**
- Due: Apr 25
- Blocked by: S1

---

### Phase C — Frontend rendering + SEO surface (April 23–27)

**S8. `HeadComponent` + `PublicChannelPage` integration (M1)**
- Server-render meta tags, Open Graph tags, Twitter cards, canonical URL, and JSON-LD `DiscussionForumPosting`
- Use `getServerSideProps` / Next.js route handlers to fetch meta tags from backend at request time
- Canonical host is the frontend apex domain per Sprint 4 SEO ownership decision — no crawler-facing artifact may point at the API subdomain
- Unit/E2E tests: every public channel page serves non-empty `<title>` and `<meta name="description">` (AC-1)
- Assignee: **declanblanc**
- Due: Apr 26
- Blocked by: S4, Sprint 4 #6 (frontend prod config)

**S9. Sitemap + robots.txt finalization**
- Ensure Next.js route handlers for sitemap/sitemap index fetch from backend at request time and serve under the frontend apex domain
- `robots.txt` respects `PUBLIC_NO_INDEX` and `PRIVATE` visibility
- Smoke test that private channels do not appear in sitemap
- Assignee: **AvanishKulkarni**
- Backup: **FardeenI**
- Due: Apr 27
- Blocked by: S6, S8

**S10. Meta tag admin UI (creator override flow)**
- UI under channel settings for creator to view generated tags, override title/description, and trigger manual regeneration with job status polling
- Respect `customTitle`/`customDescription` length limits with client-side validation
- Assignee: **acabrera04**
- Backup: **declanblanc**
- Due: Apr 27
- Blocked by: S4

---

### Phase D — End-to-end verification on production (April 27–30)

**S11. Integration tests for SEO feature (local + cloud)**
- Extend the Sprint 4 integration test suite with cases covering AC-1 through AC-10
- Cloud-mode coverage stays read-only (reuse Sprint 4 isolation rules) — no mutation of the instructor-reviewed production dataset
- Add test cases for crawler view of public pages (fetch as Googlebot UA, assert tags present)
- Assignee: **Aiden-Barrera**
- Due: Apr 29
- Blocked by: S8, S9, S10

**S12. Production validation + evidence capture**
- Run cloud-target SEO integration suite against the deployed Vercel + Railway stack
- Verify: meta tags render through the Vercel edge, cache hits are served from Redis, background regeneration triggered by worker reaches the cache observable by both API replicas, `noindex`/sitemap removal works on visibility flip
- Use Sprint 4 replica observability (instance identity headers/logs) to confirm tags render consistently regardless of which `backend-api` replica served the SSR fetch
- Capture screenshots, crawler-view HTML, and structured-data validator output (Google Rich Results test) for submission
- Assignee: **declanblanc**
- Backup: **Aiden-Barrera**
- Due: Apr 30
- Blocked by: S11

**S13. Bug bash + polish**
- Full-team bug bash across deployed app: auth, channels, messaging, attachments, SEO, realtime
- Triage to `must-fix-for-submission` vs `accept-as-known-limitation`
- Fix must-fix items only; document the rest in the reflection
- Assignee: **whole team**, coordinator: **FardeenI**
- Due: May 1
- Blocked by: S12

---

### Phase E — Final submission package (May 1–3)

**S14. README + deployer guide final pass**
- Fold SEO feature usage, override flow, and regeneration behavior into README
- Update deployer guide with any new env vars introduced in Phase A–C (NLP keys, R2 bucket for OG images if any, etc.)
- Assignee: **acabrera04**
- Due: May 2
- Blocked by: S10

**S15. Final project submission package**
- Compile final deliverable checklist:
  - Public frontend URL + public backend URL (from Sprint 4)
  - Links to every dev spec document under `docs/`
  - Links to SEO feature PRs and commits
  - Integration test specs + code + local/cloud run output
  - All GitHub Actions workflow links (`run-integration-tests`, `deploy-vercel`, `deploy-railway`)
  - Branch protection screenshot
  - Acceptance criteria AC-1..AC-10 verification evidence (from S12)
  - Reflection document (lessons learned, what worked, what didn't, per-developer contributions)
  - LLM interaction logs under `llm-logs/` with model/version labels
- Assignee: **acabrera04**
- Backup: **FardeenI**
- Due: May 3
- Blocked by: S12, S13, S14

**S16. Final reflection + retrospective**
- Team retrospective on the full project (Sprints 1–5)
- Each developer contributes a short written reflection to the submission doc
- Assignee: **whole team**, coordinator: **declanblanc**
- Due: May 3
- Blocked by: S15 draft

---

## Sprint 5 assignment summary

| Developer | Issues | Focus |
|-----------|--------|-------|
| acabrera04 | S10, S14, S15 | Override UI, README, final submission package |
| Aiden-Barrera | S2, S5, S11 | Content analysis, background worker, SEO integration tests |
| AvanishKulkarni | S7, S9 | Security filters, sitemap/robots |
| declanblanc | S1, S6, S8, S12, S16 | Meta tag service core, visibility lifecycle, frontend rendering, prod validation |
| FardeenI | S3, S4, S13 coordinator | Schema/migration, API endpoints, bug bash coordination |

## Sprint 5 critical path

```text
S1 Meta tag service  ─┐
S2 Content analysis  ─┼─► S4 APIs ─► S8 Frontend ─┐
S3 Schema/migration  ─┘                           │
                                                  ├─► S11 SEO tests ─► S12 Prod validation ─► S13 Bug bash ─► S15 Submission
S5 Worker (needs S1, S2) ─► S6 Visibility ────────┘
S7 Security (needs S1) ──────────────────────────►
S9 Sitemap (needs S6, S8) ───────────────────────►
S10 Override UI (needs S4) ──────────────────────►
                                                   S14 README (needs S10) ─► S15
                                                   S16 Retrospective (parallel)
```

## Sprint 5 timeline

| Date | Milestone |
|------|-----------|
| Apr 20 (Mon) | Sprint 5 kickoff; Phase A work begins on feature branches |
| Apr 22 (Wed) | S1, S2, S3 merged (backend core + schema) |
| Apr 23 (Thu) | S4 merged (SEO APIs live); Phase B starts |
| Apr 25 (Sat) | S5, S6, S7 merged (worker + visibility + security) |
| Apr 26 (Sun) | S8 merged (frontend SSR meta tag rendering) |
| Apr 27 (Mon) | S9, S10 merged (sitemap, override UI) |
| Apr 29 (Wed) | S11 merged; SEO integration tests running in CI and cloud |
| Apr 30 (Thu) | S12 complete; production evidence captured for AC-1..AC-10 |
| May 1 (Fri) | S13 bug bash complete; must-fix items merged |
| May 2 (Sat) | S14 README final pass merged |
| May 3 (Sun) | S15 submission package delivered; S16 retrospective complete |

## Sprint 5 deliverables checklist

The project is not complete until all of the following exist:

- All SEO dev-spec acceptance criteria AC-1 through AC-10 verified against the deployed Vercel + Railway stack
- SEO meta tag generation service, content analysis, background worker, overrides API, and frontend SSR integration merged to `main`
- Creator override UI shipped
- Sitemap and robots.txt correctly respect channel visibility
- Cloud + local integration tests covering SEO paths passing in CI
- Production validation evidence: crawler-view HTML, Rich Results test output, cache/regeneration screenshots, replica-observability confirmation
- README updated for SEO feature and any new env vars
- Final submission package in `planning/` or `docs/submission/` with links, logs, and reflection
- LLM interaction logs archived under `llm-logs/`
- Team retrospective recorded

## Notes

- Sprint 4 must hit its exit criteria by April 19 or Sprint 5's Phase A will slip. If Sprint 4 slips, cut Sprint 5 Phase C non-essentials (e.g., S10 override UI can degrade to backend-only override via API + curl documented in README).
- If NLP/summarization work (S2) is at risk, fall back to the template-only path in dev spec §14 fallback (AC-9) and document the degradation.
- Cloud-mode tests remain read-only throughout Sprint 5 to protect the instructor-reviewed deployment.
- Keep `tasks/todo.md` and GitHub Issues in sync per `WORKFLOW.md`; every Sprint 5 item above should become a GitHub Issue on the Harmony Project Board at Sprint 5 kickoff on April 20.
