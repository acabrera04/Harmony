# Sprint 5 SEO AC Traceability

Generated for issue #361 on 2026-05-03.

## Environment Labels

- `production-read-only`: active Vercel/Railway production hosts. No data
  mutations were performed.
- `local-only`: write-path coverage from the integration suite added in issue
  #360. These tests require seeded local data or an isolated staging data plane.
- `not-run`: the requested external or isolated environment was unavailable.

## AC Evidence Matrix

| AC                                                                                  | Environment          | Result                                                                                                                        | Evidence                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-1: public pages serve non-empty title and description                            | production-read-only | Passed                                                                                                                        | `cloud-seo-test-output.txt`; `summary.json`; `crawler-html/testserver__new-channel.html`; `crawler-html/testserver__how-to-use-ai.html`; `crawler-html/hello-world__general.html`                         |
| AC-2: generated title <=60 chars and description 50-160 chars                       | production-read-only | Passed                                                                                                                        | `cloud-seo-test-output.txt`; `api-responses/meta-tags-replica-samples.json`                                                                                                                               |
| AC-3: override limits enforced                                                      | local-only           | Covered by local-only integration tests; skipped in cloud mode                                                                | `tests/integration/seo-meta-tags.test.ts`; `cloud-seo-test-output.txt` skip list; `docs/deployment/deployment-architecture.md` section 12.2                                                               |
| AC-4: PRIVATE visibility invalidates meta-tag cache and removes sitemap URL         | local-only           | Covered by local-only integration tests; skipped in cloud mode                                                                | `tests/integration/seo-meta-tags.test.ts`; `cloud-seo-test-output.txt` skip list; `docs/deployment/deployment-architecture.md` section 12.2                                                               |
| AC-5: regeneration API returns jobId and supports polling                           | local-only           | Covered by local-only integration tests; skipped in cloud mode                                                                | `tests/integration/seo-meta-tags.test.ts`; `cloud-seo-test-output.txt` skip list; `docs/deployment/deployment-architecture.md` section 12.2                                                               |
| AC-6: idempotency key deduplicates regeneration requests                            | local-only           | Covered by local-only integration tests; skipped in cloud mode                                                                | `tests/integration/seo-meta-tags.test.ts`; `cloud-seo-test-output.txt` skip list; `docs/deployment/deployment-architecture.md` section 12.2                                                               |
| AC-7: custom overrides survive background regeneration                              | local-only           | Covered by local-only integration tests; skipped in cloud mode                                                                | `tests/integration/seo-meta-tags.test.ts`; `cloud-seo-test-output.txt` skip list; `docs/deployment/deployment-architecture.md` section 12.2                                                               |
| AC-8: generated tags exclude PII and profanity for fixture content                  | production-read-only | Passed                                                                                                                        | `cloud-seo-test-output.txt`; `summary.json`; `api-responses/meta-tags-replica-samples.json`                                                                                                               |
| AC-9: NLP failure fallback and needs_regeneration flag                              | local-only / not-run | Marked `test.todo` in integration because deployed fault injection is unavailable; issue #360 documents backend/unit fallback | `tests/integration/seo-meta-tags.test.ts`; `cloud-seo-test-output.txt` skip list; issue #360 final comment                                                                                                |
| AC-10: de-index workflow on public to private transition                            | local-only           | Covered by local-only integration tests; skipped in cloud mode                                                                | `tests/integration/seo-meta-tags.test.ts`; `cloud-seo-test-output.txt` skip list; `docs/deployment/deployment-architecture.md` section 12.2                                                               |
| Crawler-UA: Googlebot sees at least three public channels with SEO tags and JSON-LD | production-read-only | Passed                                                                                                                        | `cloud-seo-test-output.txt`; `crawler-html/*.html`; `structured-data/*.json`; `screenshots/testserver-new-channel.png`; `screenshots/testserver-how-to-use-ai.png`; `screenshots/hello-world-general.png` |
| Replica consistency: tags render consistently from both API replicas                | production-read-only | Passed                                                                                                                        | `headers/health-replica-samples.json`; `api-responses/meta-tags-replica-samples.json`; `summary.json`                                                                                                     |
| Sitemap and robots surface                                                          | production-read-only | Passed                                                                                                                        | `sitemaps/frontend-robots.txt`; `sitemaps/frontend-sitemap.xml`; `sitemaps/testserver-frontend-sitemap.xml`; `sitemaps/testserver-backend-sitemap.xml`; `api-responses/sitemap-robots-captures.json`      |
| Google Rich Results screenshot                                                      | not-run              | Google validator returned "Something went wrong" in the automated browser session                                             | `screenshots/google-rich-results-unavailable.png`; `structured-data/*.json`                                                                                                                               |

## Fixture Targets

The production public API discovery selected these crawler targets:

- `https://harmony-dun-omega.vercel.app/c/testserver/new-channel`
- `https://harmony-dun-omega.vercel.app/c/testserver/how-to-use-ai`
- `https://harmony-dun-omega.vercel.app/c/hello-world/general`

The primary API fixture for repeated meta-tag replica checks was
`https://harmony-production-13e3.up.railway.app/api/public/servers/testserver/channels/new-channel/meta-tags`.
