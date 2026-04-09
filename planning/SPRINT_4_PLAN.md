# Deployment Sprint Plan — April 8–19, 2026

## Context
Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend backed by PostgreSQL and Redis. Sprint 4 adapts the P6 deployment assignment to a **Vercel + Railway** production stack:

- **Frontend hosting:** Vercel
- **Backend hosting:** Railway
- **Database:** Railway Postgres
- **Cache / event bus:** Railway Redis
- **Public deployment goal:** keep the app deployed through instructor review
- **Scaling goal:** support **2 or more backend API replicas** on Railway while keeping background event processing correct

This sprint must cover the substance of **P6 Deployment** while ignoring the AWS-only platform choice. The plan therefore replaces:

- AWS Lambda/API Gateway with Railway backend services
- AWS Amplify with Vercel frontend hosting
- AWS CD workflows with Vercel/Railway CD workflows

The assignment requirements we still must satisfy are:

1. Publicly deploy frontend and backend
2. Automate deployment from GitHub
3. Add integration test specifications and implementation
4. Run integration tests locally and in the cloud
5. Add GitHub Actions for integration tests
6. Adopt GitHub hygiene and branch protection
7. Update README with user-facing and deployer-facing instructions
8. Produce the final submission artifacts, links, logs, and reflection

**Assignment:** P6: Deployment  
**Due:** Sunday, April 19, 2026, 11:59 PM AOE

## Team
5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI

## Target Architecture

### Public Services
- `frontend` on Vercel
- `backend-api` on Railway with **2+ replicas**

### Internal / Stateful Services
- `backend-worker` on Railway with **1 replica only**
- `postgres` on Railway
- `redis` on Railway

### Domain Layout
- `https://<frontend-domain>` -> Vercel
- `https://api.<frontend-domain>` -> Railway `backend-api`

### Multi-Backend Railway Rules
To safely support 2+ backend replicas, the sprint must remove or isolate process-local production state:

- Public/auth rate limiting must use **Redis-backed shared storage**
- File uploads must use **shared object storage**, not local disk
- Background subscribers / cache invalidation / sitemap updates must run in a **singleton worker**
- API replicas must be stateless apart from live SSE client connections
- Deployment verification must prove that 2+ API replicas behave correctly behind Railway load balancing

---

## P6 Coverage Map

| P6 Requirement | Vercel + Railway Adaptation | Covered By Issues |
|---|---|---|
| Publicly deploy frontend | Deploy Next.js app to Vercel | #6, #12, #16 |
| Publicly deploy backend | Deploy Express/tRPC app to Railway | #5, #7, #11 |
| Publish backend public interfaces via REST | Keep Railway backend public routes stable and production-configured | #1, #5, #7 |
| Integration test specification | Write English-language integration spec for FE-BE paths | #8 |
| Integration tests on localhost | Add env-aware local integration test flow | #9 |
| Integration tests in cloud | Run same test suite against deployed Vercel + Railway URLs | #9, #14 |
| GitHub Action for integration tests | Add `run-integration-tests.yml` | #10 |
| Continuous deployment | Add backend and frontend deployment workflows for Railway and Vercel | #11, #12 |
| GitHub hygiene / branch protection | Require PRs and required checks before merge | #13 |
| README update | Add user-facing run instructions and deployer guide | #15 |
| Submission links, logs, reflection | Final packaging and artifact checklist | #15 |

---

## Issues (16 total)

> **Note:** Issues are written so they can be opened directly on GitHub with the dependency notes preserved in the body. "Blocked by" means the issue should not be considered complete until those upstream issues land. "Unblocks" is included to make sequencing explicit for the team.

### Phase 1: Architecture, Production Readiness, and Scaling Design — April 8–11

**1. Deployment Architecture + Environment Matrix**
- Define the final Vercel + Railway topology:
  - `frontend`
  - `backend-api`
  - `backend-worker`
  - `postgres`
  - `redis`
- Document production env vars for frontend, backend API, and worker
- Define domain plan (`frontend` domain + `api` subdomain)
- Define promotion flow for preview vs production
- Produce a short architecture section for the sprint and README
- Acceptance criteria:
  - Clear service inventory
  - Clear env var matrix
  - Clear ownership of public vs internal services
  - Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton
- Assignee: **acabrera04**
- Due: April 9
- Blocked by: none
- Unblocks: #2, #6, #7, #8, #16

**2. Backend Scale Audit for Railway Replicas**
- Audit the current backend for state that will break with 2+ API replicas
- Confirm and document the required changes for:
  - in-memory rate limiting
  - local filesystem attachment storage
  - duplicate startup subscribers / background jobs
  - SSE behavior behind load balancing
  - proxy/IP handling
- Produce a concrete "replica-safe backend" checklist for implementation
- Acceptance criteria:
  - Checklist references the actual code areas that must change
  - Risks are prioritized into must-fix vs acceptable-for-demo
  - `backend-api` vs `backend-worker` responsibilities are finalized
- Assignee: **declanblanc**
- Due: April 9
- Blocked by: #1
- Unblocks: #3, #4, #5, #14

**3. Shared Rate Limiting + Proxy-Aware Networking**
- Replace process-local rate limiting with shared Redis-backed limiting
- Ensure auth and public API rate limits remain correct across 2+ replicas
- Configure Express proxy awareness so client IP handling works correctly behind Railway
- Acceptance criteria:
  - Public and auth rate limits are shared across replicas
  - No process-local limit counters remain in production code paths
  - Rate limit behavior is covered by tests or verification notes
- Assignee: **Aiden-Barrera**
- Due: April 11
- Blocked by: #2
- Unblocks: #14

**4. Production Attachment Storage Provider**
- Implement a production storage provider backed by shared object storage
- Keep local storage available for development only
- Add env-driven provider selection and document required secrets
- Ensure uploaded files remain accessible regardless of which API replica serves subsequent requests
- Acceptance criteria:
  - Production does not rely on local filesystem attachment serving
  - README and env matrix document storage setup
  - Attachment flow works end-to-end in deployed environment
- Assignee: **AvanishKulkarni**
- Due: April 11
- Blocked by: #2
- Unblocks: #14, #15

**5. Split `backend-api` and Singleton `backend-worker`**
- Move background-only startup behavior into a dedicated worker process
- Ensure duplicated subscribers / cache invalidation / sitemap upkeep do not run on every API replica
- Keep API replicas focused on HTTP/tRPC/SSE request handling
- Add startup commands for both Railway backend services
- Acceptance criteria:
  - `backend-api` can run with 2+ replicas without duplicate singleton background side effects
  - `backend-worker` runs with 1 replica and owns singleton event-driven tasks
  - Service responsibilities are documented
- Assignee: **declanblanc**
- Due: April 12
- Blocked by: #2
- Unblocks: #7, #11, #14

### Phase 2: Frontend and Integration Foundations — April 9–13

**6. Frontend Production Configuration for Vercel**
- Add production-safe frontend configuration:
  - absolute canonical URLs
  - `metadataBase`
  - `robots.txt`
  - sitemap support
  - production API base URL handling
- Ensure frontend still supports localhost development cleanly
- Acceptance criteria:
  - Public pages generate correct production metadata
  - Frontend can target local and cloud backends without code edits
  - SEO-critical pages render correctly on the public domain
- Assignee: **AvanishKulkarni**
- Due: April 11
- Blocked by: #1
- Unblocks: #12, #16

**7. Railway Project Provisioning and Service Wiring**
- Create/configure the Railway project and services:
  - `backend-api`
  - `backend-worker`
  - `postgres`
  - `redis`
- Configure internal networking, service env vars, health checks, deploy commands, and domains
- Ensure `backend-api` and `backend-worker` both connect to the same Postgres and Redis instances
- Acceptance criteria:
  - Railway project is provisioned
  - Domains/env vars/health checks are configured
  - `backend-api` and `backend-worker` both boot successfully in Railway
- Assignee: **acabrera04**
- Due: April 13
- Blocked by: #1, #5
- Unblocks: #11, #14, #15

**8. Integration Test Specification**
- Write an English-language integration test specification for all frontend-backend code paths that must work in deployment
- Cover at least:
  - guest public channel rendering
  - login / auth refresh path
  - public API path used by SSR metadata/page rendering
  - visibility change impact on public indexing behavior
  - attachment path if production storage is in scope
  - SSE/realtime smoke behavior if kept in deployed flow
- Acceptance criteria:
  - Every FE-BE pathway has at least one test case
  - Spec includes local-only vs cloud-only notes where relevant
  - Spec is stored under `docs/test-specs/`
- Assignee: **FardeenI**
- Due: April 11
- Blocked by: #1
- Unblocks: #9, #10, #15

**9. Integration Test Implementation + Environment Matrix**
- Implement the integration tests from the spec
- Add configuration so tests can run against:
  - localhost
  - deployed frontend + backend URLs
- Capture/structure output for both local and cloud runs
- Acceptance criteria:
  - Tests run in a local configuration
  - Tests run in a cloud configuration
  - Any environment-specific exceptions are documented
- Assignee: **Aiden-Barrera**
- Due: April 14
- Blocked by: #8, #6, #7
- Unblocks: #10, #14, #15

### Phase 3: CI/CD and Deployment Automation — April 12–16

**10. GitHub Action — `run-integration-tests.yml`**
- Create `.github/workflows/run-integration-tests.yml`
- Install frontend/backend dependencies
- Set up required environment
- Execute integration tests in CI
- Ensure the workflow name is stable so it can be required in branch protection
- Acceptance criteria:
  - Workflow passes on a PR
  - Workflow is usable as a required status check
  - YAML is committed and documented
- Assignee: **FardeenI**
- Due: April 15
- Blocked by: #8, #9
- Unblocks: #13, #15

**11. GitHub Action — `deploy-railway.yml`**
- Create backend CD workflow for Railway
- Deploy `backend-api` and `backend-worker` on pushes to `main`
- Ensure migrations / build / deploy ordering is safe
- Use GitHub secrets for Railway authentication
- Acceptance criteria:
  - Workflow deploys backend services without manual intervention
  - Deploys target the correct Railway environment
  - Deployment process is documented in README
- Assignee: **acabrera04**
- Due: April 15
- Blocked by: #5, #7
- Unblocks: #14, #15

**12. GitHub Action — `deploy-vercel.yml`**
- Create frontend CD workflow for Vercel
- Build/deploy frontend on pushes to `main`
- Ensure preview/production environment variables are configured properly
- Use GitHub secrets/tokens safely
- Acceptance criteria:
  - Workflow deploys frontend without manual intervention
  - Production deploy points at the production backend URL
  - Deployment process is documented in README
- Assignee: **AvanishKulkarni**
- Due: April 15
- Blocked by: #6, #16
- Unblocks: #15

**13. GitHub Hygiene and Branch Protection**
- Enforce feature branch workflow
- Configure branch protection for `main`
- Require PR review before merge
- Require passing status checks before merge
- Record the exact required checks to enable:
  - existing unit test workflows
  - `run-integration-tests`
- Acceptance criteria:
  - Direct pushes to `main` are blocked
  - PR review is required
  - Required status checks are enabled
  - Team workflow is documented
- Assignee: **Aiden-Barrera**
- Due: April 16
- Blocked by: #10
- Unblocks: #15

**16. Vercel Project Setup, Domains, and Preview/Prod Verification**
- Create/configure the Vercel project
- Bind the production domain
- Configure preview and production environment variables
- Verify frontend is talking to the correct Railway backend in production
- Acceptance criteria:
  - Preview deployment works
  - Production deployment works
  - Domain and environment configuration are documented
- Assignee: **FardeenI**
- Due: April 14
- Blocked by: #1, #6
- Unblocks: #12, #14, #15

### Phase 4: Multi-Replica Validation, Documentation, and Submission — April 16–19

**14. Railway Multi-Replica Validation and Deployment Evidence**
- Scale `backend-api` to **2 or more replicas** on Railway
- Keep `backend-worker` at **1 replica**
- Verify and capture evidence for:
  - public page loads through the deployed frontend
  - authenticated API behavior through multiple API replicas
  - shared rate limiting across replicas
  - attachment access independent of serving replica
  - cache invalidation / indexing behavior via singleton worker
  - SSE/realtime smoke verification in deployed environment
- Capture logs/screenshots/test output needed for submission
- Acceptance criteria:
  - Live deployment is stable with `backend-api` at 2+ replicas
  - No replica-specific failures are observed for required paths
  - Cloud integration tests pass against the deployed system
- Assignee: **declanblanc**
- Due: April 18
- Blocked by: #3, #4, #5, #7, #9, #11, #16
- Unblocks: #15

**15. README, Final Artifact Collection, and Submission Package**
- Update `README.md` with:
  - how web users access the deployed app
  - how to run the app locally
  - how a forked user sets up Vercel + Railway deployment
  - how CI/CD and branch protection are expected to work
- Compile the final P6-equivalent artifact checklist:
  - frontend deployment URL
  - backend deployment URL
  - integration test specification link
  - integration test code links
  - localhost test output
  - cloud test output
  - `run-integration-tests.yml` link
  - `deploy-vercel.yml` link
  - `deploy-railway.yml` link
  - README link
  - reflection placeholder/coordination
  - LLM log collection
- Acceptance criteria:
  - README is complete and accurate
  - Submission checklist has no missing artifacts
  - Team knows who owns final reflection/log collation
- Assignee: **acabrera04**
- Due: April 19
- Blocked by: #4, #8, #9, #10, #11, #12, #13, #14, #16

---

## Assignment Summary

| Developer | Issues | Focus Area |
|-----------|--------|------------|
| acabrera04 | #1, #7, #11, #15 | Architecture/env matrix, Railway provisioning, backend CD, final packaging |
| Aiden-Barrera | #3, #9, #13 | Shared rate limiting, integration test implementation, branch protection |
| AvanishKulkarni | #4, #6, #12 | Production storage, Vercel-ready frontend config, frontend CD |
| declanblanc | #2, #5, #14 | Replica-safety audit, API/worker split, multi-replica validation |
| FardeenI | #8, #10, #16 | Integration test spec, integration-test CI, Vercel project/domain setup |

---

## Dependency Graph

```text
Foundation
==========
#1 Deployment Architecture + Env Matrix
  -> #2 Backend Scale Audit
  -> #6 Frontend Production Config
  -> #7 Railway Provisioning
  -> #8 Integration Test Spec
  -> #16 Vercel Project Setup

Scaling Safety
==============
#2 Backend Scale Audit
  -> #3 Shared Rate Limiting
  -> #4 Production Storage
  -> #5 API/Worker Split

Deployable App
==============
#5 API/Worker Split -> #7 Railway Provisioning -> #11 deploy-railway.yml
#6 Frontend Production Config -> #16 Vercel Setup -> #12 deploy-vercel.yml

Testing
=======
#8 Integration Test Spec -> #9 Integration Tests -> #10 run-integration-tests.yml

GitHub Hygiene
==============
#10 run-integration-tests.yml -> #13 Branch Protection

Final Validation
================
#3, #4, #5, #7, #9, #11, #16 -> #14 Multi-Replica Validation

Submission
==========
#4, #8, #9, #10, #11, #12, #13, #14, #16 -> #15 Final Packaging
```

---

## Timeline

| Date | Milestone |
|------|-----------|
| April 8 (Wed) | Sprint kickoff, architecture alignment, issue creation |
| April 9 (Thu) | Issue #1 and #2 complete; deployment/scaling approach locked |
| April 11 (Sat) | Replica-safety implementation issues (#3, #4, #6, #8) complete |
| April 12 (Sun) | API/worker split complete; backend ready for Railway service split |
| April 13 (Mon) | Railway provisioning complete |
| April 14 (Tue) | Vercel project live; integration tests running locally and against cloud env |
| April 15 (Wed) | `run-integration-tests.yml`, `deploy-railway.yml`, and `deploy-vercel.yml` complete |
| April 16 (Thu) | Branch protection enabled; CD path verified through PR merge |
| April 18 (Sat) | Railway running with 2+ API replicas; deployment evidence captured |
| April 19 (Sun) | README finalized; submission package and reflection/log checklist complete |

---

## Deliverables Checklist

The sprint is not complete until all of the following exist:

- Public Vercel frontend URL
- Public Railway backend URL
- Railway backend deployed with **2+ `backend-api` replicas**
- Singleton Railway `backend-worker`
- Integration test specification document
- Integration test code committed
- Local integration test output captured
- Cloud integration test output captured
- `.github/workflows/run-integration-tests.yml`
- `.github/workflows/deploy-railway.yml`
- `.github/workflows/deploy-vercel.yml`
- Branch protection enabled on `main`
- Updated `README.md`
- Final submission checklist document/materials
- Reflection ownership assigned
- LLM interaction logs collected with model/version labels

---

## Notes

- We are intentionally satisfying the **intent** of P6 using Vercel + Railway rather than AWS.
- The backend **must not** be considered successfully deployed until it has been verified with **2 or more Railway API replicas**.
- `backend-worker` is a deliberate singleton to prevent duplicate background event processing.
- Any production reliance on local filesystem storage or in-memory shared state is a sprint blocker.
- All work should proceed on feature branches with PR review; no direct pushes to `main`.
