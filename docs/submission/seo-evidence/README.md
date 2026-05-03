# SEO Evidence Bundle

This directory is the submission entrypoint for Sprint 5 SEO deployed
validation artifacts.

Generated: `2026-05-03T20:11:41.046Z`

## Live Targets

- Production frontend: `https://harmony-dun-omega.vercel.app`
- Production backend API: `https://harmony-production-13e3.up.railway.app`
- Isolated staging: not provisioned. Issue #360 documents that write-path ACs
  fall back to local-only evidence per
  `docs/deployment/deployment-architecture.md` section 12.2.

## Evidence Index

- `summary.json` - generated overview of target URLs, selected public fixtures,
  crawler captures, replica observations, sitemap checks, and limitations.
- `cloud-seo-test-output.txt` - passing read-only cloud SEO integration test
  output against the active Vercel/Railway hosts.
- `crawler-html/*.html` - raw Googlebot-user-agent HTML captures for three
  public channel pages.
- `structured-data/*.json` - extracted JSON-LD blocks from each crawler HTML
  capture with parse validity.
- `screenshots/*.png` - browser screenshots of the three public channel pages
  plus the attempted Google Rich Results Test result.
- `headers/health-replica-samples.json` - 20 `/health` samples showing two
  distinct `backend-api` instance IDs.
- `api-responses/meta-tags-replica-samples.json` - 20 public meta-tag API
  samples showing the same response hash from both observed API replicas.
- `api-responses/public-fixture-discovery.json` - public server/channel fixture
  discovery used for crawler and API checks.
- `api-responses/sitemap-robots-captures.json` - frontend robots, frontend
  sitemap index, frontend per-server sitemap, and backend sitemap capture
  metadata.
- `sitemaps/*.xml` and `sitemaps/frontend-robots.txt` - raw sitemap and robots
  responses.
- `AC_TRACEABILITY.md` - AC-1 through AC-10 evidence mapping with environment
  labels and explicit local-only fallback notes.

## Key Results

- Read-only cloud SEO integration tests passed against the active deployed
  Vercel/Railway URLs: 4 passed, 10 write-path tests skipped by cloud mode.
- Three public channel pages returned HTTP 200 with non-empty `<title>`,
  `<meta name="description">`, `robots: index, follow`, canonical links, and
  valid JSON-LD of type `DiscussionForumPosting`.
- Replica evidence observed two `backend-api` instances:
  `fe0e0816e7e6-70360a` and `82ea54bdc6b1-fb4504`.
- The repeated meta-tags API response hash was identical across both observed
  API replicas within the capture window:
  `7e9c3a286a97e253a71717df93bb613c7d918a18e5a46fc1614620041de34588`.
- Frontend sitemap index, frontend per-server sitemap, backend sitemap, and
  frontend robots responses returned HTTP 200. The `testserver` frontend and
  backend sitemaps both contained `/c/testserver/new-channel`.

## Limitations

- Google Rich Results Test did not complete in the automated browser session;
  it returned a "Something went wrong" page. The screenshot is preserved at
  `screenshots/google-rich-results-unavailable.png`. Raw crawler HTML and
  machine-validated JSON-LD captures are included as validator-adjacent
  evidence.
- Isolated staging write-path validation was not run because no isolated Sprint
  5 staging environment was provisioned before the #360 handoff. Write-path ACs
  are linked to the existing local-only integration coverage and flagged in
  `AC_TRACEABILITY.md`.
