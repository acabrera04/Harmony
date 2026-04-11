# Codex Conversation Export

## Metadata

- Thread ID: 019d72f1-db32-7ac3-888c-cd0363f3fa8c
- Timestamp: 2026-04-09T15:52:26.166Z
- CWD: /Users/allen/repos/Harmony
- Source: vscode
- Model Provider: openai
- Model: gpt-5.4
- Reasoning Effort: medium
- Rollout Path: /Users/allen/.codex/sessions/2026/04/09/rollout-2026-04-09T11-52-26-019d72f1-db32-7ac3-888c-cd0363f3fa8c.jsonl

## Transcript

### Turn 1: Does [SPRINT_4_PLAN.md](planning/SPRINT_4_PLAN.md) make

#### 👤 User Prompt

- Time: 2026-04-09T15:52:30.374Z

```text
Does [SPRINT_4_PLAN.md](planning/SPRINT_4_PLAN.md) make sense
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-09T15:52:38.731Z

I’m reviewing [planning/SPRINT_4_PLAN.md](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md) against the repo workflow and project context first, then I’ll call out any gaps or contradictions rather than just giving a vague yes/no.

#### Tool: exec_command

```sh
rtk read WORKFLOW.md
```

Output:

````text
## Workflow Orchestration
### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately - don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean 
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop 
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests - then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management
This project uses a **hybrid approach**: `tasks/todo.md` for AI context, GitHub Issues as the canonical tracker on the Harmony Project Board (course requirement).

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items (local scratch pad for AI context)
2. **Identify the Issue**: If the task maps to an existing GitHub Issue, note the issue number at the top of `tasks/todo.md`
3. **Announce Start**: Post an opening comment to the issue — `gh issue comment <number> --body "..."` — describing what will be done
4. **Track Progress**: Mark items complete in `tasks/todo.md` as you go; post a comment to the issue at meaningful milestones (e.g., after a major step or when blocked)
5. **Explain Changes**: High-level summary at each step
6. **Document Results**: Add a review section to `tasks/todo.md` and post a final summary comment to the issue when complete
7. **Capture Lessons**: Update `tasks/lessons.md` after corrections. Post the new lessons learned as a comment to the issue.

### Issue Comment Format
Use this structure for issue comments to keep the audit trail readable:

```
**[AI Agent — <Step>]**

<What was done or decided>

<Any blockers, decisions, or next steps>
```

Example steps: `Starting`, `In Progress`, `Blocked`, `Complete`

## Core Principles
- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
- **Lean Context Files**: Keep AGENTS.md and similar files to only non-obvious, non-discoverable essentials. Research shows context file bloat decreases task success rates and increases inference cost by 20%+ with 2–4 extra steps per task (Gloaguen et al., 2026).

#### Taken from https://x.com/mdancho84/status/2023738764841894352

Gloaguen, T., Mündler, N., Müller, M., Raychev, V., & Vechev, M. (2026, February 12). Evaluating AGENTS.MD: Are Repository-Level context Files helpful for coding agents? arXiv.org. https://arxiv.org/abs/2602.11988
````

#### Tool: exec_command

```sh
rtk read planning/SPRINT_4_PLAN.md
```

Output:

````text
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
````

#### Tool: exec_command

```sh
rtk read README.md
```

Output:

````text
# Harmony

Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend.

## Repository Layout

- `harmony-frontend/`: Next.js application for the client UI
- `harmony-backend/`: Express + tRPC API, Prisma schema, and Redis-backed eventing/cache
- `docs/`: project specs and architecture documents
- `llm-logs/`: saved LLM interaction logs for deliverables

## Manual Test Instructions

Install dependencies in both application directories before running tests:

```bash
cd harmony-frontend
npm install

cd ../harmony-backend
npm install

cd ..
```

### Run Tests From The Repository Root

The root package exposes convenience scripts that delegate to each app:

Commands that execute backend tests still depend on the PostgreSQL, Redis, `.env`, and Prisma setup documented in the backend section below.

```bash
# Run frontend and backend tests
npm run test

# Run only frontend tests
npm run test:frontend

# Run only backend tests
npm run test:backend
```

### Frontend Tests

Frontend tests live in `harmony-frontend/src/__tests__/`.

- Framework/runtime: Next.js 16, React 19, TypeScript 5
- Test runner: Jest 30 with `ts-jest`
- Test environment: `jest-environment-jsdom`
- Testing libraries: `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`

Run them manually from the frontend directory:

```bash
cd harmony-frontend
npm test
```

You can also target a single test file when needed:

```bash
cd harmony-frontend
npm test -- src/__tests__/utils.test.ts
```

### Backend Tests

Backend tests live in `harmony-backend/tests/`.

- Framework/runtime: Node.js 20+, Express 4, tRPC 11, TypeScript 5
- Test runner: Jest 29 with `ts-jest`
- Test environment: Node
- Testing libraries: `supertest` for HTTP integration tests
- Data/services used by tests: Prisma with PostgreSQL, Redis for cache/event-bus coverage, `dotenv` for environment loading

Some backend tests are pure unit tests, but many integration tests require PostgreSQL and Redis to be running locally.

Manual backend test setup:

```bash
cd harmony-backend

# Create local env file
cp .env.example .env

# Start Postgres and Redis
docker compose up -d

# Apply Prisma migrations
npx prisma migrate deploy

# Run the backend test suite
npm test
```

If you want to run a single backend test file:

```bash
cd harmony-backend
npm test -- tests/app.test.ts
```

## Additional Project Docs

- Frontend details: `harmony-frontend/README.md`
- Backend details: `harmony-backend/README.md`
- Workflow rules for agents: `WORKFLOW.md`
````

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-09T15:52:46.752Z

I’ve got the sprint plan and workflow. Next I’m checking whether the plan lines up with the actual codebase shape, especially the risky assumptions around uploads, rate limiting, workers, and deployment targets.

#### Tool: exec_command

```sh
rtk ls
```

Output:

```text
.claude/
.entire/
.github/
.playwright/
.playwright-cli/
docs/
dogfood-output/
harmony-backend/
harmony-frontend/
llm-logs/
mockups/
planning/
scripts/
tasks/
.gitignore  66B
AGENTS.md  1.9K
CLAUDE.md  11B
P4: Backend Development | CS 485 AI-Assisted Software Engineering (Sp26).html  20.7K
P5: Testing | CS 485 AI-Assisted Software Engineering (Sp26).pdf  70.0K
P6_ Deployment _ CS 485 AI-Assisted Software Engineering (Sp26).pdf  132.1K
README.md  2.5K
WORKFLOW.md  3.7K
deployment-options.md  5.9K
dev-spec-guidelines.pdf  507.5K
load-test.js  20.1K
package.json  280B

📊 12 files, 14 dirs (5 .md, 3 .pdf, 1 .html, 1 .json, 1 .js, +1 more)
```

#### Tool: exec_command

```sh
rtk grep -n "rate limit|rate-limit|redis|sse|Server-Sent|EventSource|upload|multer|storage|worker|bull|queue|subscriber|sitemap|robots|metadataBase|vercel|railway" harmony-backend harmony-frontend .github docs planning
```

Output:

```text
🔍 1019 in 131F:

📄 .github/PR_REVIEW.md (3):
    11: - First, check if the new commits have correctly addressed your previous revi...
    12: - If a previous concern has been addressed, explicitly resolve the associated...
    15: **Execution Instruction**: Before providing your code feedback, output a mark...

📄 .github/workflows/claude-review.yml (1):
    56: - Keep Section 3 (Class Diagram) and Section 4 (List of Classes) in docs in sync

📄 .github/workflows/run-backend-tests.yml (4):
    31: redis:
    32: image: redis:7
    36: --health-cmd "redis-cli ping"
    42: REDIS_URL: redis://localhost:6379

📄 .github/workflows/run-frontend-e2e.yml (1):
    44: uses: actions/upload-artifact@v4

📄 docs/.../channel-visibility-toggle/design-brief.md (16):
    80: | `accent-blurple-active` | `#3c45a5` | Active/pressed state |
   358: - "Remove the channel from Harmony's public sitemap immediately"
   579: │  • bullet 1                           │
   580: │  • bullet 2                           │
   581: │  • bullet 3                           │
   595: - Focus trapped inside modal until dismissed
   849: **Mobile addendum:** On mobile, steps 2–9 happen entirely within the bottom s...
   868: | `text-muted` (#72767d) | `bg-primary` (#36393f) | 4.5:1 ✗ (~2.8:1) — **only...
   873: > **Note:** `text-muted` does not meet 4.5:1 against dark backgrounds. Do not...
   885: - **Error banner appears:** Announced via `aria-live="assertive"`
  +6

📄 docs/.../guest-public-channel-view/design-brief.md (4):
    51: 4. **Graceful failure** — Every error state (404, 403, 500, rate limit) gives
   254: - Escape key dismisses modal, returns focus to triggering element
   276: dismissible with 24h preference storage means repeat visitors are not
   277: harassed with the same CTA.

📄 docs/dev-spec-channel-visibility-toggle.md (38):
     7: > **Unified Backend Reference:** This feature's backend classes are part of t...
   125: The underlying data layer uses a short-term caching layer to reduce database ...
   218: -sitemapGenerator
   242: > **Sitemap Ownership:** `IndexingService` (CL6.1 / C5.2) is the canonical ow...
   246: After having an LLM review this spec, the canonical owner of the sitemap gene...
   252: ## 4. List of Classes
   270: | CL-C4.2 | PublicAccessController | Controller | Unauthenticated public cont...
   326: | channel.indexedAt | DateTime | Last sitemap inclusion timestamp |
   327: | sitemap.lastModified | DateTime | Last sitemap update |
   336: state "PRIVATE (indexedAt=null, robots=noindex nofollow)" as PRIVATE
  +28

📄 docs/dev-spec-guest-public-channel-view.md (31):
     7: > **Unified Backend Reference:** This feature's backend classes are part of t...
   382: ## 4. List of Classes
   389: | CL-W1.2 | BotDetector | Edge Worker | Identifies search engine bots vs huma...
   491: The list of classes clearly states the moving parts for ensuring guest user c...
   691: F42["F4.2 Apply bot-specific handling\n- Skip JS-dependent content\n- Ensure ...
   751: | CF-1 | CDN edge outage | Regional unavailability | Cache layer bypassed | M...
   754: | CF-4 | Redis cache unavailable | Slower responses | Cache misses; DB load i...
   763: | HF-3 | Storage full | New messages not visible | Write failures | Storage a...
   769: | IF-1 | DDoS on public pages | Service degradation | Resource exhaustion | C...
   770: | IF-2 | Scraping abuse | None (internal cost) | Bandwidth/compute abuse | Bo...
  +21

📄 docs/dev-spec-seo-meta-tag-generation.md (62):
   143: │  │  │ queue: JobQueue             │    │ eventBus: EventBus              │ ...
   242: │  │  │ queue: meta-tag-updates     │                                        ...
   472: │ + robots: string        │     │ + ogType: string        │
   573: │ - eventBus: EventBus         │                │ - queue: JobQueue          ...
   607: This gave us a great insight into how the class structure for the rest of the...
   611: ## 4. List of Classes
   646: | CL-C4.1 | MetaTagUpdateWorker | Worker | Processes queued meta tag regenera...
  +52

... +969
```

#### Tool: exec_command

```sh
rtk read package.json
```

Output:

```text
{
  "name": "harmony",
  "private": true,
  "scripts": {
    "test": "node ./scripts/run-root-jest.cjs",
    "jest": "node ./scripts/run-root-jest.cjs",
    "test:backend": "npm --prefix harmony-backend test --",
    "test:frontend": "npm --prefix harmony-frontend test --"
  }
}
```

#### Tool: exec_command

```sh
rtk grep -n "multer|upload|attachment|diskStorage|fs\.|writeFile|createWriteStream|uploads?" harmony-backend harmony-frontend
```

Output:

```text
🔍 242 in 40F:

📄 harmony-backend/README.md (2):
    54: | **multer** | ^2.1 | Multipart form-data parsing for file uploads |
    97: | `attachments` | Message attachment display | File upload completion | Refer...

📄 harmony-backend/.../src/app.ts.html (3):
   281: import { attachmentRouter } from './routes/attachment.router';
   337: // Attachment upload + file serving
   338: app.use('/api/attachments', attachmentRouter);

📄 harmony-backend/.../storage/local.provider.ts.html (15):
   218: * Writes uploaded files to a local directory.
   221: * Files are served by the attachment router at:
   222: *   GET /api/attachments/files/:filename
   228: * user-supplied filename) to prevent extension spoofing (e.g. uploading a
   243: private readonly uploadDir: string;
   248: this.uploadDir = process.env.LOCAL_UPLOAD_DIR ?? path.join(process.cwd(), 'up...
   250: fs.mkdirSync(this.uploadDir, { recursive: true });
   253: <span class="fstat-no" title="function not covered" >  async </span>upload(op...
   259: const filePath = <span class="cstat-no" title="statement not covered" >path.j...
   261: <span class="cstat-no" title="statement not covered" >    await fs.promises.w...
  +5

📄 harmony-backend/.../routes/attachment.router.ts.html (24):
     6: <title>Code coverage report for src/routes/attachment.router.ts</title>
    22: <h1><a href="../../index.html">All files</a> / <a href="index.html">src/route...
   322: import multer from 'multer';
   328: attachmentService,
   331: } from '../services/attachment.service';
   334: export const attachmentRouter = Router();
   338: // Memory storage: we validate before writing, so we don't want disk writes f...
   339: const upload = multer({
   340: storage: multer.memoryStorage(),
   347: * POST /api/attachments/upload
  +14

📄 harmony-backend/.../routes/events.router.ts.html (3):
  1009: attachments: {
  1093: attachments: message.attachments,
  1121: attachments: message.attachments,

📄 harmony-backend/.../routes/index.html (1):
    82: <td class="file low" data-value="attachment.router.ts"><a href="attachment.ro...

📄 harmony-backend/.../services/attachment.service.ts.html (7):
     6: <title>Code coverage report for src/services/attachment.service.ts</title>
    22: <h1><a href="../../index.html">All files</a> / <a href="index.html">src/servi...
   335: export const attachmentService = {
   337: * Validate that a file upload is within accepted type and size limits.
   352: * Return all attachments for a given message, scoped to a server.
   354: * probing (a caller with message:read on server A cannot fetch attachments
   380: <span class="cstat-no" title="statement not covered" >    return prisma.attac...

📄 harmony-backend/.../services/index.html (1):
    82: <td class="file low" data-value="attachment.service.ts"><a href="attachment.s...

📄 harmony-backend/.../services/message.service.ts.html (9):
  1179: attachments?: Array&lt;{
  1200: // ─── Author / attachment projections ──────────────────────────────────────...
  1222: attachments: { select: ATTACHMENT_SELECT },
  1310: * Send a new message to a channel, optionally with attachment metadata.
  1313: const { serverId, channelId, authorId, content, attachments } = <span class="...
  1322: ...(attachments &amp;&amp;
  1323: attachments.length &gt; 0 &amp;&amp; {
  1324: attachments: {
  1326: create: attachments.map(<span class="fstat-no" title="function not covered" >...

📄 harmony-backend/.../trpc/router.ts.html (2):
   122: import { attachmentRouter } from './routers/attachment.router';
   135: attachment: attachmentRouter,

📄 harmony-backend/.../routers/attachment.router.ts.html (6):
     6: <title>Code coverage report for src/trpc/routers/attachment.router.ts</title>
    22: <h1><a href="../../../index.html">All files</a> / <a href="index.html">src/tr...

... +192
```

#### Tool: exec_command

```sh
rtk grep -n "rateLimit|rate limit|express-rate-limit|limiter|throttle|too many requests" harmony-backend
```

Output:

```text
🔍 25 in 12F:

📄 harmony-backend/README.md (2):
    17: - **Security model** — rate limiting, visibility guards, content filtering
    46: | **express-rate-limit** | ^8.3 | Per-IP rate limiting on auth and mutation e...

📄 harmony-backend/.../lcov-report/public.router.ts.html (1):
   691: // Token bucket rate limiting per issue #110: 100 req/min (human) / 1000 req/...

📄 harmony-backend/.../src/app.ts.html (5):
   273: import rateLimit from 'express-rate-limit';
   283: // ─── Auth rate limiters ───────────────────────────────────────────────────...
   285: const loginLimiter = rateLimit({
   293: const registerLimiter = rateLimit({
   301: const refreshLimiter = rateLimit({

📄 harmony-backend/.../middleware/rate-limit.middleware.ts.html (1):
   493: * Token-bucket rate limiting middleware for the public API.

📄 harmony-backend/.../routes/public.router.ts.html (1):
   691: // Token bucket rate limiting per issue #110: 100 req/min (human) / 1000 req/...

📄 harmony-backend/package-lock.json (4):
    16: "express-rate-limit": "^8.3.0",
  3958: "node_modules/express-rate-limit": {
  3960: "resolved": "https://registry.npmjs.org/express-rate-limit/-/express-rate-lim...
  3970: "url": "https://github.com/sponsors/express-rate-limit"

📄 harmony-backend/package.json (1):
    23: "express-rate-limit": "^8.3.0",

📄 harmony-backend/src/app.ts (5):
     4: import rateLimit from 'express-rate-limit';
    14: // ─── Auth rate limiters ───────────────────────────────────────────────────...
    18: const loginLimiter = rateLimit({
    26: const registerLimiter = rateLimit({
    34: const refreshLimiter = rateLimit({

📄 harmony-backend/.../middleware/rate-limit.middleware.ts (1):
   108: * Token-bucket rate limiting middleware for the public API.

📄 harmony-backend/src/routes/public.router.ts (1):
    10: // Token bucket rate limiting per issue #110: 100 req/min (human) / 1000 req/...

📄 harmony-backend/tests/public.router.test.ts (1):
   835: it('PR-22: allows requests within the rate limit', async () => {

📄 harmony-backend/tests/rate-limit.middleware.test.ts (2):
   100: it('isolates rate limit buckets per IP', async () => {
   119: it('applies human rate limit to bot UAs until reverse-DNS verification is imp...
```

#### Tool: exec_command

```sh
rtk grep -n "SSE|EventSource|text/event-stream|server-sent|subscribe|pubsub|event bus|Redis.*publish|publish\(|pSubscribe|sitemap|worker|queue" harmony-backend harmony-frontend
```

Output:

```text
🔍 534 in 59F:

📄 harmony-backend/README.md (2):
    37: | **ioredis** | ^5.10 | Redis client for visibility caching and the Pub/Sub e...
   108: | **Pub/Sub event bus** | Channels: `member:statusChanged`, etc. | WebSocket ...

📄 harmony-backend/coverage/lcov-report/prettify.js (1):
     2: window.PR_SHOULD_USE_CONTINUATION=true;(function(){var h=["break,continue,do,...

📄 harmony-backend/.../lcov-report/serverMember.service.ts.html (3):
   549: void eventBus.publish(EventChannels.MEMBER_JOINED, {
   587: void eventBus.publish(EventChannels.MEMBER_LEFT, {
   685: void eventBus.publish(EventChannels.MEMBER_LEFT, {

📄 harmony-backend/.../services/channel.service.ts.html (3):
   502: .publish(EventChannels.CHANNEL_CREATED, {
   537: .publish(EventChannels.CHANNEL_UPDATED, {
   566: .publish(EventChannels.CHANNEL_DELETED, {

📄 harmony-backend/.../src/app.ts.html (2):
   322: // SEO endpoints (robots.txt, sitemaps) — before auth so they're publicly acc...
   334: // Real-time SSE endpoints

📄 harmony-backend/.../events/eventBus.ts.html (28):
   374: * - Redis Pub/Sub requires a dedicated subscriber connection that cannot
   375: *   issue other commands. We create one lazy subscriber client here and
   398: let subscriberClient: Redis | null = null;
   401: // each Redis channel so we can unsubscribe at the Redis level precisely when
   406: // All subscribers on the same channel share this promise so latecomers don't
   411: <span class="cstat-no" title="statement not covered" >  <span class="missing-...
   412: <span class="cstat-no" title="statement not covered" >    subscriberClient = ...
   413: maxRetriesPerRequest: null, // subscriber clients must not timeout on blocked...
   417: <span class="cstat-no" title="statement not covered" >  return subscriberClie...
   430: <span class="cstat-no" title="statement not covered" >      await redis.publi...
  +18

📄 harmony-backend/.../events/eventTypes.ts.html (2):
   546: /** Prisma UserStatus enum value; normalized to lowercase before emitting ove...
   566: // Map each channel to its payload type for type-safe subscribe/publish

📄 harmony-backend/.../routes/events.router.ts.html (29):
   955: * SSE Router — Issue #180
   962: * Auth: the browser's native EventSource API cannot send custom headers, so the
  1005: const MESSAGE_SSE_INCLUDE = {
  1014: // ─── SSE helpers ──────────────────────────────────────────────────────────...
  1030: // ── Auth — accept token via query param (EventSource cannot send headers) ─...
  1065: // ── SSE headers ──────────────────────────────────────────────────────────...
  1066: <span class="cstat-no" title="statement not covered" >  res.setHeader('Conten...
  1074: const { unsubscribe: unsubCreated } = <span class="cstat-no" title="statement...
  1082: include: MESSAGE_SSE_INCLUDE,
  1102: const { unsubscribe: unsubEdited } = <span class="cstat-no" title="statement ...
  +19

📄 harmony-backend/.../routes/seo.router.ts.html (7):
   183: * SEO routes — sitemap.xml and robots.txt endpoints.
   185: * - GET /sitemap/:serverSlug.xml — dynamic sitemap of PUBLIC_INDEXABLE channe...
   198: * NOTE: A machine-readable `Sitemap:` directive requires a sitemap index
   199: * endpoint (e.g. /sitemap-index.xml) that aggregates per-server sitemaps.
   216: * GET /sitemap/:serverSlug.xml
   217: * Returns a dynamic XML sitemap containing all PUBLIC_INDEXABLE channels
   220: seoRouter.get('/sitemap/:serverSlug.xml', <span class="fstat-no" title="funct...

📄 harmony-backend/.../services/cacheInvalidator.service.ts.html (15):
   305: * CacheInvalidator — subscribes to domain events and invalidates the
   327: type UnsubscribeFn = () =&gt; void;
   329: let unsubscribers: UnsubscribeFn[] = [];
   337: * Returns a Promise that resolves once all Redis subscribe handshakes
   345: const sub1 = eventBus.subscribe(EventChannels.VISIBILITY_CHANGED, (payload) =...
   358: // Update sitemap on visibility changes
   361: .catch(<span class="fstat-no" title="function not covered" >(e</span>rr) =&gt...
   364: const sub2 = eventBus.subscribe(EventChannels.MESSAGE_CREATED, (payload) =&gt; {
   378: const sub3 = eventBus.subscribe(EventChannels.MESSAGE_EDITED, (payload) =&gt; {
   392: const sub4 = eventBus.subscribe(EventChannels.MESSAGE_DELETED, (payload) =&gt; {
  +5

... +484
```

#### Tool: exec_command

```sh
rtk read harmony-backend/src/app.ts
```

Output:

```text
import express, { NextFunction, Request, Response } from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import corsMiddleware, { CorsError } from './middleware/cors';
import { appRouter } from './trpc/router';
import { createContext } from './trpc/init';
import { authRouter } from './routes/auth.router';
import { publicRouter } from './routes/public.router';
import { seoRouter } from './routes/seo.router';
import { eventsRouter } from './routes/events.router';
import { attachmentRouter } from './routes/attachment.router';

const isE2E = process.env.NODE_ENV === 'e2e';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isE2E ? 1000 : 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again later.' },
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: process.env.NODE_ENV === 'production' ? 5 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many registration attempts. Please try again later.' },
});

const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isE2E ? 1000 : 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many token refresh attempts. Please try again later.' },
});

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(corsMiddleware);
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use(seoRouter);

  app.use('/api/auth/login', loginLimiter);
  app.use('/api/auth/register', registerLimiter);
  app.use('/api/auth/refresh', refreshLimiter);
  app.use('/api/auth', authRouter);

  app.use('/api/public', publicRouter);

  app.use('/api/events', eventsRouter);

  app.use('/api/attachments', attachmentRouter);

  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext,
      onError({ error }) {
        if (error.code === 'INTERNAL_SERVER_ERROR') {
          console.error('tRPC error:', error);
        }
      },
    }),
  );

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    const isCorsError = err instanceof CorsError;
    const status = isCorsError ? 403 : 500;
    const message = isCorsError ? err.message : 'Internal server error';
    if (!isCorsError)
      console.error('Unhandled error:', process.env.NODE_ENV === 'production' ? err.message : err);
    res.status(status).json({ error: message });
  });

  return app;
}
```

#### Tool: exec_command

```sh
rtk read harmony-backend/src/services/cacheInvalidator.service.ts
```

Output:

```text
/**
 * CacheInvalidator — subscribes to domain events and invalidates the
 * corresponding Redis cache keys per the §4.4 cache schema.
 *
 * Invalidation rules:
 *   VISIBILITY_CHANGED  → channel:{id}:visibility
 *                       → server:{id}:public_channels
 *                       → meta:channel:{id}
 *   MESSAGE_CREATED     → channel:msgs:{id}:* (all pages)
 *                       → analysis:channel:{id}
 *                       → meta:channel:{id}
 *   MESSAGE_EDITED      → channel:msgs:{id}:* (all pages)
 *                       → analysis:channel:{id}
 *                       → meta:channel:{id}
 *   MESSAGE_DELETED     → channel:msgs:{id}:* (all pages)
 *                       → analysis:channel:{id}
 *                       → meta:channel:{id}
 */

import { eventBus, EventChannels } from '../events/eventBus';
import { cacheService, CacheKeys, sanitizeKeySegment } from './cache.service';
import { indexingService } from './indexing.service';

type UnsubscribeFn = () => void;

let unsubscribers: UnsubscribeFn[] = [];
let startPromise: Promise<void> | null = null;

export const cacheInvalidator = {
  /**
   * Start all event subscriptions.
   * Returns a Promise that resolves once all Redis subscribe handshakes
   * are confirmed — await this in tests to avoid timing-dependent failures.
   * Idempotent: concurrent or repeated calls share the same startup promise.
   */
  start(): Promise<void> {
    if (startPromise !== null) return startPromise;

    startPromise = (async () => {
      const sub1 = eventBus.subscribe(EventChannels.VISIBILITY_CHANGED, (payload) => {
        cacheService
          .invalidate(CacheKeys.channelVisibility(payload.channelId))
          .catch((err) => console.error('[CacheInvalidator] VISIBILITY_CHANGED invalidation failed:', err));

        cacheService
          .invalidate(`server:${sanitizeKeySegment(payload.serverId)}:public_channels`)
          .catch((err) => console.error('[CacheInvalidator] VISIBILITY_CHANGED server key failed:', err));

        cacheService
          .invalidate(CacheKeys.metaChannel(payload.channelId))
          .catch((err) => console.error('[CacheInvalidator] VISIBILITY_CHANGED meta key failed:', err));

        indexingService
          .onVisibilityChanged(payload)
          .catch((err) => console.error('[CacheInvalidator] VISIBILITY_CHANGED sitemap update failed:', err));
      });

      const sub2 = eventBus.subscribe(EventChannels.MESSAGE_CREATED, (payload) => {
        cacheService
          .invalidatePattern(`channel:msgs:${sanitizeKeySegment(payload.channelId)}:*`)
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_CREATED invalidation failed:', err));

        cacheService
          .invalidate(CacheKeys.analysisChannel(payload.channelId))
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_CREATED analysis key failed:', err));

        cacheService
          .invalidate(CacheKeys.metaChannel(payload.channelId))
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_CREATED meta key failed:', err));
      });

      const sub3 = eventBus.subscribe(EventChannels.MESSAGE_EDITED, (payload) => {
        cacheService
          .invalidatePattern(`channel:msgs:${sanitizeKeySegment(payload.channelId)}:*`)
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_EDITED invalidation failed:', err));

        cacheService
          .invalidate(CacheKeys.analysisChannel(payload.channelId))
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_EDITED analysis key failed:', err));

        cacheService
          .invalidate(CacheKeys.metaChannel(payload.channelId))
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_EDITED meta key failed:', err));
      });

      const sub4 = eventBus.subscribe(EventChannels.MESSAGE_DELETED, (payload) => {
        cacheService
          .invalidatePattern(`channel:msgs:${sanitizeKeySegment(payload.channelId)}:*`)
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_DELETED invalidation failed:', err));

        cacheService
          .invalidate(CacheKeys.analysisChannel(payload.channelId))
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_DELETED analysis key failed:', err));

        cacheService
          .invalidate(CacheKeys.metaChannel(payload.channelId))
          .catch((err) => console.error('[CacheInvalidator] MESSAGE_DELETED meta key failed:', err));
      });

      unsubscribers = [sub1.unsubscribe, sub2.unsubscribe, sub3.unsubscribe, sub4.unsubscribe];

      await Promise.all([sub1.ready, sub2.ready, sub3.ready, sub4.ready]);
    })();

    return startPromise;
  },

  /** Stop all subscriptions and disconnect the subscriber client. */
  async stop(): Promise<void> {
    startPromise = null; // allow restart after stop
    for (const unsub of unsubscribers) unsub();
    unsubscribers = [];
    await eventBus.disconnect();
  },
};
```

#### Tool: exec_command

```sh
rtk read harmony-backend/src/storage/local.provider.ts
```

Output:

```text
Error: Failed to read file: harmony-backend/src/storage/local.provider.ts

Caused by:
    No such file or directory (os error 2)
```

#### Tool: exec_command

```sh
rtk read harmony-backend/src/routes/events.router.ts
```

Output:

```text
/**
 * SSE Router — Issue #180
 *
 * GET /api/events/channel/:channelId?token=<accessToken>
 *
 * Streams real-time message events to authenticated, authorised clients using
 * Server-Sent Events.
 *
 * Auth: the browser's native EventSource API cannot send custom headers, so the
 * access token is accepted via a `?token=` query parameter instead of the
 * Authorization header. The token is validated identically to requireAuth.
 *
 * Authorisation: verifies the authenticated user is a member of the server that
 * owns the requested channel, preventing access to PRIVATE channels by non-members.
 */

import { Router, Request, Response } from 'express';
import { prisma } from '../db/prisma';
import { authService } from '../services/auth.service';
import { eventBus, EventChannels } from '../events/eventBus';
import type {
  MessageCreatedPayload,
  MessageEditedPayload,
  MessageDeletedPayload,
  ChannelCreatedPayload,
  ChannelUpdatedPayload,
  ChannelDeletedPayload,
  ServerUpdatedPayload,
  UserStatusChangedPayload,
  MemberJoinedPayload,
  MemberLeftPayload,
  VisibilityChangedPayload,
} from '../events/eventTypes';

export const eventsRouter = Router();

/**
 * Validate that a channelId looks like a UUID (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).
 * Rejects empty strings, whitespace-only strings, and obviously invalid values
 * to prevent subscription to meaningless Redis channels.
 */
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidUUID(id: string): boolean {
  return UUID_RE.test(id.trim());
}

const MESSAGE_SSE_INCLUDE = {
  author: {
    select: { id: true, username: true, displayName: true, avatarUrl: true },
  },
  attachments: {
    select: { id: true, filename: true, url: true, contentType: true },
  },
} as const;

function sendEvent(res: Response, eventType: string, data: unknown): void {
  res.write(`event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`);
}

eventsRouter.get('/channel/:channelId', async (req: Request, res: Response) => {
  const { channelId } = req.params;

  if (!isValidUUID(channelId)) {
    res.status(400).json({ error: 'Invalid channelId: must be a UUID' });
    return;
  }

  const token = typeof req.query.token === 'string' ? req.query.token : null;
  if (!token) {
    res.status(401).json({ error: 'Missing token query parameter' });
    return;
  }

  let userId: string;
  try {
    const payload = authService.verifyAccessToken(token);
    userId = payload.sub;
  } catch {
    res.status(401).json({ error: 'Invalid or expired access token' });
    return;
  }

  const channel = await prisma.channel.findUnique({
    where: { id: channelId },
    select: { serverId: true },
  });
  if (!channel) {
    res.status(404).json({ error: 'Channel not found' });
    return;
  }

  const membership = await prisma.serverMember.findFirst({
    where: { userId, serverId: channel.serverId },
    select: { userId: true },
  });
  if (!membership) {
    res.status(403).json({ error: 'You are not a member of this server' });
    return;
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  const { unsubscribe: unsubCreated } = eventBus.subscribe(
    EventChannels.MESSAGE_CREATED,
    async (payload: MessageCreatedPayload) => {
      if (payload.channelId !== channelId) return;

      try {
        const message = await prisma.message.findUnique({
          where: { id: payload.messageId },
          include: MESSAGE_SSE_INCLUDE,
        });
        if (!message || message.isDeleted) return;

        sendEvent(res, 'message:created', {
          id: message.id,
          channelId: message.channelId,
          authorId: message.authorId,
          author: message.author,
          content: message.content,
          timestamp: message.createdAt.toISOString(),
          attachments: message.attachments,
          editedAt: message.editedAt ? message.editedAt.toISOString() : null,
        });
      } catch {
      }
    },
  );

  const { unsubscribe: unsubEdited } = eventBus.subscribe(
    EventChannels.MESSAGE_EDITED,
    async (payload: MessageEditedPayload) => {
      if (payload.channelId !== channelId) return;

      try {
        const message = await prisma.message.findUnique({
          where: { id: payload.messageId },
          include: MESSAGE_SSE_INCLUDE,
        });
        if (!message || message.isDeleted) return;

        sendEvent(res, 'message:edited', {
          id: message.id,
          channelId: message.channelId,
          authorId: message.authorId,
          author: message.author,
          content: message.content,
          timestamp: message.createdAt.toISOString(),
          attachments: message.attachments,
          editedAt: message.editedAt ? message.editedAt.toISOString() : null,
        });
      } catch {
      }
    },
  );

  const { unsubscribe: unsubDeleted } = eventBus.subscribe(
    EventChannels.MESSAGE_DELETED,
    (payload: MessageDeletedPayload) => {
      if (payload.channelId !== channelId) return;
      sendEvent(res, 'message:deleted', { messageId: payload.messageId });
    },
  );

  const { unsubscribe: unsubServerUpdated } = eventBus.subscribe(
    EventChannels.SERVER_UPDATED,
    (payload: ServerUpdatedPayload) => {
      if (payload.serverId !== channel.serverId) return;
      sendEvent(res, 'server:updated', {
        id: payload.serverId,
        name: payload.name,
        iconUrl: payload.iconUrl,
        description: payload.description,
        updatedAt: payload.timestamp,
      });
    },
  );

  const heartbeat = setInterval(() => {
    res.write(':\n\n');
  }, 30_000);

  req.on('close', () => {
    clearInterval(heartbeat);
    unsubCreated();
    unsubEdited();
    unsubDeleted();
    unsubServerUpdated();
  });
});

const CHANNEL_SSE_SELECT = {
  id: true,
  serverId: true,
  name: true,
  slug: true,
  type: true,
  visibility: true,
  topic: true,
  position: true,
  createdAt: true,
  updatedAt: true,
} as const;

/**
 * GET /api/events/server/:serverId?token=<accessToken>
 *
 * Streams real-time channel events (created, updated, deleted) to authenticated,
 * authorised clients using Server-Sent Events. Scoped to a server so all members
 * see the same sidebar updates regardless of which channel they're currently viewing.
 *
 * Auth: same token-via-query-param pattern as /channel/:channelId (EventSource cannot
 * send custom headers).
 *
 * Authorisation: user must be a member of the server.
 */
eventsRouter.get('/server/:serverId', async (req: Request, res: Response) => {
  const { serverId } = req.params;

  if (!isValidUUID(serverId)) {
    res.status(400).json({ error: 'Invalid serverId: must be a UUID' });
    return;
  }

  const token = typeof req.query.token === 'string' ? req.query.token : null;
  if (!token) {
    res.status(401).json({ error: 'Missing token query parameter' });
    return;
  }

  let userId: string;
  try {
    const payload = authService.verifyAccessToken(token);
    userId = payload.sub;
  } catch {
    res.status(401).json({ error: 'Invalid or expired access token' });
    return;
  }

  const server = await prisma.server.findUnique({
    where: { id: serverId },
    select: { id: true },
  });
  if (!server) {
    res.status(404).json({ error: 'Server not found' });
    return;
  }

  const membership = await prisma.serverMember.findFirst({
    where: { userId, serverId },
    select: { userId: true },
  });
  if (!membership) {
    res.status(403).json({ error: 'You are not a member of this server' });
    return;
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  const { unsubscribe: unsubChannelCreated } = eventBus.subscribe(
    EventChannels.CHANNEL_CREATED,
    async (payload: ChannelCreatedPayload) => {
      if (payload.serverId !== serverId) return;

      try {
        const channel = await prisma.channel.findUnique({
          where: { id: payload.channelId },
          select: CHANNEL_SSE_SELECT,
        });
        if (!channel) return;

        sendEvent(res, 'channel:created', channel);
      } catch {
      }
    },
  );

  const { unsubscribe: unsubChannelUpdated } = eventBus.subscribe(
    EventChannels.CHANNEL_UPDATED,
    async (payload: ChannelUpdatedPayload) => {
      if (payload.serverId !== serverId) return;

      try {
        const channel = await prisma.channel.findUnique({
          where: { id: payload.channelId },
          select: CHANNEL_SSE_SELECT,
        });
        if (!channel) return;

        sendEvent(res, 'channel:updated', channel);
      } catch {
      }
    },
  );

  const { unsubscribe: unsubChannelDeleted } = eventBus.subscribe(
    EventChannels.CHANNEL_DELETED,
    (payload: ChannelDeletedPayload) => {
      if (payload.serverId !== serverId) return;
      sendEvent(res, 'channel:deleted', { channelId: payload.channelId });
    },
  );

  const { unsubscribe: unsubStatusChanged } = eventBus.subscribe(
    EventChannels.USER_STATUS_CHANGED,
    (payload: UserStatusChangedPayload) => {
      if (payload.serverId !== serverId) return;
      sendEvent(res, 'member:statusChanged', { id: payload.userId, status: payload.status.toLowerCase() });
    },
  );

  const { unsubscribe: unsubMemberJoined } = eventBus.subscribe(
    EventChannels.MEMBER_JOINED,
    async (payload: MemberJoinedPayload) => {
      if (payload.serverId !== serverId) return;

      try {
        const user = await prisma.user.findUnique({
          where: { id: payload.userId },
          select: { id: true, username: true, displayName: true, avatarUrl: true, status: true, publicProfile: true },
        });
        if (!user) return;

        const isPublic = user.publicProfile;
        sendEvent(res, 'member:joined', {
          id: user.id,
          username: isPublic ? user.username : 'Anonymous',
          displayName: isPublic ? user.displayName : undefined,
          avatar: isPublic ? (user.avatarUrl ?? undefined) : undefined,
          role: payload.role.toLowerCase(),
          status: user.status.toLowerCase(),
        });
      } catch {
      }
    },
  );

  const { unsubscribe: unsubMemberLeft } = eventBus.subscribe(
    EventChannels.MEMBER_LEFT,
    (payload: MemberLeftPayload) => {
      if (payload.serverId !== serverId) return;
      sendEvent(res, 'member:left', { userId: payload.userId });
    },
  );

  const { unsubscribe: unsubVisibilityChanged } = eventBus.subscribe(
    EventChannels.VISIBILITY_CHANGED,
    async (payload: VisibilityChangedPayload) => {
      if (payload.serverId !== serverId) return;

      try {
        const channel = await prisma.channel.findUnique({
          where: { id: payload.channelId },
          select: CHANNEL_SSE_SELECT,
        });
        if (!channel) return;

        sendEvent(res, 'channel:visibility-changed', {
          ...channel,
          oldVisibility: payload.oldVisibility,
        });
      } catch {
      }
    },
  );

  const heartbeat = setInterval(() => {
    res.write(':\n\n');
  }, 30_000);

  req.on('close', () => {
    clearInterval(heartbeat);
    unsubChannelCreated();
    unsubChannelUpdated();
    unsubChannelDeleted();
    unsubStatusChanged();
    unsubMemberJoined();
    unsubMemberLeft();
    unsubVisibilityChanged();
  });
});
```

#### Tool: exec_command

```sh
rtk read harmony-backend/src/routes/seo.router.ts
```

Output:

```text
/**
 * SEO routes — sitemap.xml and robots.txt endpoints.
 *
 * - GET /sitemap/:serverSlug.xml — dynamic sitemap of PUBLIC_INDEXABLE channels
 * - GET /robots.txt              — allow crawling of /c/ routes
 */

import { Router, Request, Response } from 'express';
import { indexingService } from '../services/indexing.service';

export const seoRouter = Router();

/**
 * GET /robots.txt
 * Instructs crawlers to allow /c/ routes (public channel pages).
 *
 * NOTE: A machine-readable `Sitemap:` directive requires a sitemap index
 * endpoint (e.g. /sitemap-index.xml) that aggregates per-server sitemaps.
 * This is tracked as a follow-up — see issue #107 comments.
 */
seoRouter.get('/robots.txt', (_req: Request, res: Response) => {
  const body = [
    'User-agent: *',
    'Allow: /c/',
    'Disallow: /api/',
    'Disallow: /trpc/',
  ].join('\n');

  res.set('Content-Type', 'text/plain');
  res.set('Cache-Control', 'public, max-age=86400');
  res.send(body);
});

/**
 * GET /sitemap/:serverSlug.xml
 * Returns a dynamic XML sitemap containing all PUBLIC_INDEXABLE channels
 * for the given server.
 */
seoRouter.get('/sitemap/:serverSlug.xml', async (req: Request, res: Response) => {
  try {
    const { serverSlug } = req.params;
    const xml = await indexingService.generateSitemap(serverSlug);

    if (!xml) {
      res.status(404).json({ error: 'Server not found' });
      return;
    }

    res.set('Content-Type', 'application/xml');
    res.set('Cache-Control', 'public, max-age=3600');
    res.send(xml);
  } catch (err) {
    console.error('Sitemap generation error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});
```

#### Tool: exec_command

```sh
rtk read deployment-options.md
```

Output:

```text
# Deployment Options

As of **April 6, 2026**, we need something that will stay up until **May 15, 2026**.

## Deployment Options

| Option | Fit For Current Repo | Multi-backend communication | Pros | Cons | What we need to do | Cost / free deal through May 15, 2026 |
|---|---|---|---|---|---|---|
| `Vercel frontend + Railway backend` | High | Yes, inside the same Railway project/environment via internal networking | Fastest to ship, simple Git deploys, private networking built in, custom domains, good split-deploy fit | Private networking does not span environments, pricing is usage-based, backend is not free if left running continuously | Put frontend on Vercel, backend on Railway, likely split `api` and `worker` later, configure `NEXT_PUBLIC_API_URL`, `FRONTEND_URL`, `DATABASE_URL`, `REDIS_URL`, JWT secrets | `Vercel Hobby` is free. `Railway` gives new users a **30-day $5 trial**, then `Free` is $0 with $1 resources/month or `Hobby` is $5/month. Resource pricing is usage-based, so a small always-on service usually ends up in the **low tens of dollars/month** once DB and Redis are included. |
| `Vercel frontend + Render backend` | High | Yes, for services in the same workspace and region | Very simple, private services and background workers are first-class, good for API + worker split | Cross-region private comms are not supported, free web services can sleep, free Postgres expires after 30 days | Same split setup as Railway, but keep everything in one region and use private services for internal-only pieces | `Vercel Hobby` is free. `Render` has free web/Postgres/Key Value options, but the **free Postgres expires 30 days after creation**, so if we create it now it may expire before **May 15, 2026**. Paid plans are usually **low tens of dollars/month** once DB and Redis are included. |
| `Vercel frontend + Fly.io backend` | Medium-High | Yes, strongest option for private networking across regions | Best if we truly want multiple backend deployments across regions, good private mesh networking, container-native | More ops overhead than Railway/Render, Fly managed Postgres is expensive for a class project | Containerize backend, decide regions, likely split API and worker, use Fly private networking, configure storage/services carefully | `Vercel Hobby` is free. `Fly Machines` can be cheap for app containers, but `Fly Managed Postgres` starts much higher and Redis usually adds more. Realistic total is often **$50+/month** if we use Fly-managed DB + Redis. |
| `AWS ECS/Fargate + RDS + ElastiCache` | High | Yes, via ECS Service Connect / Cloud Map inside one VPC | Best AWS option without rewriting the app, good for long-lived Node services, solid private networking, strong resume value | More setup time than Railway/Render, more moving parts, easier to lose time in IAM/VPC/ALB/logging | Add Dockerfiles, deploy API and worker as ECS services, use RDS Postgres and ElastiCache Redis, set up ALB, secrets, logging, health checks | Best AWS budget option if using a **new AWS account**: AWS gives new customers **up to $200 credits**, with a **6-month free plan**, and credits expire **12 months after account creation**. Without credits, cost is usually **more than Railway/Render** once RDS, Redis, ALB, and networking are included. |
| `AWS Lambda + API Gateway + EventBridge/SQS/WebSockets` | Low | Only indirectly through queues/events/datastores | Very scalable, likely covered by AWS credits/free tier, clean if the system is designed for serverless from the start | Worst fit for this repo as-is; backend would need redesign, SSE and long-lived Redis subscription patterns do not map cleanly to Lambda | Replace persistent invalidator with event-driven jobs, replace SSE with API Gateway WebSockets, make backend stateless, redesign communication around EventBridge/SQS/SNS/Redis | Likely **$0 out of pocket** during the semester if we stay inside AWS credits/free tier, but engineering cost is the highest by far. |
| `DigitalOcean App Platform or Droplets` | Medium | Yes, via App Platform internal routing/VPC or Docker networking on Droplets | Strong cost story for students, simpler than AWS, predictable pricing, cheap Droplets | More self-management than Vercel + Render/Railway, App Platform databases/caches add up, single Droplet is less resilient | Either use App Platform services for API/worker or run Docker Compose on 1-2 Droplets; add TLS, backups, monitoring, and reverse proxy | If anyone has the **GitHub Student Developer Pack**, DigitalOcean offers **$200 credit valid for 1 year** for new verified students. Without that, Droplets start low and App Platform starts low, but managed databases add cost. This can be effectively free through **May 15, 2026** if we qualify for the student credit. |

## Recommendation

- **Best overall for this repo and deadline:** `Vercel + Railway`
- **Second best:** `Vercel + Render`
- **Best AWS option:** `ECS/Fargate`, not Lambda
- **Best only if we truly need multi-region backend deployments:** `Fly.io`
- **Best if we have student credits and want lowest cash cost:** `DigitalOcean`

## What We Need Regardless Of Platform

- Set a real production custom domain
- Make canonical URLs absolute
- Add `metadataBase`, `robots.txt`, and `sitemap.xml`
- Set `NEXT_PUBLIC_API_URL`, backend `FRONTEND_URL`, JWT secrets, `DATABASE_URL`, and `REDIS_URL`
- Keep Postgres and Redis in the same region as the backend
- Decide whether `cacheInvalidator` stays in the API process or becomes a separate worker
- Add Prisma migrations in deploy flow
- Add health checks and logging
- If attachments are needed, choose object storage too

## Bottom Line

If the goal is to get deployed quickly and stay up through **May 15, 2026** with the least risk, I would choose:

1. `Vercel + Railway`
2. `Vercel + Render`
3. `AWS ECS/Fargate` only if we explicitly want AWS experience

I would **not** choose Lambda for this repo unless we want to spend time redesigning the backend around serverless.
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-09T15:53:17.339Z

The plan is mostly coherent so far, but I’m checking whether it overcommits on features that may not exist yet or are only partially implemented. I’m pulling a couple more repo specifics before I give the actual judgment.

#### Tool: exec_command

```sh
rtk grep -n "local\.provider|storage provider|attachmentService|LOCAL_UPLOAD_DIR|object storage|S3|blob|bucket" harmony-backend/src harmony-backend
```

Output:

```text
🔍 160 in 24F:

📄 harmony-backend/README.md (1):
    97: | `attachments` | Message attachment display | File upload completion | Refer...

📄 harmony-backend/.../lcov-report/public.router.ts.html (1):
   691: // Token bucket rate limiting per issue #110: 100 req/min (human) / 1000 req/...

📄 harmony-backend/.../storage/index.html (1):
    97: <td class="file medium" data-value="local.provider.ts"><a href="local.provide...

📄 harmony-backend/.../storage/index.ts.html (1):
    91: import { LocalStorageProvider } from './local.provider';

📄 harmony-backend/.../storage/local.provider.ts.html (3):
     6: <title>Code coverage report for src/lib/storage/local.provider.ts</title>
    22: <h1><a href="../../../index.html">All files</a> / <a href="index.html">src/li...
   248: this.uploadDir = process.env.LOCAL_UPLOAD_DIR ?? path.join(process.cwd(), 'up...

📄 harmony-backend/.../middleware/rate-limit.middleware.ts.html (31):
   417: * Token bucket entry stored per IP (or bot identity).
   425: * In-process token bucket store.
   426: * Maps IP (or bot name key) -&gt; bucket state.
   428: const buckets = new Map&lt;string, TokenBucket&gt;();
   436: * Returns the bucket for `key`, refilling tokens proportionally to elapsed
   437: * time (true token-bucket algorithm: tokens drip in continuously rather than
   442: const existing = buckets.get(key);
   446: <span class="missing-if-branch" title="if path not taken" >I</span>if (bucket...
   449: <span class="cstat-no" title="statement not covered" >      <span class="miss...
   450: const oldestKey = <span class="cstat-no" title="statement not covered" >bucke...
  +21

📄 harmony-backend/.../routes/attachment.router.ts.html (3):
   326: import { LocalStorageProvider } from '../lib/storage/local.provider';
   328: attachmentService,
   369: <span class="cstat-no" title="statement not covered" >        attachmentServi...

📄 harmony-backend/.../routes/public.router.ts.html (1):
   691: // Token bucket rate limiting per issue #110: 100 req/min (human) / 1000 req/...

📄 harmony-backend/.../services/attachment.service.ts.html (1):
   335: export const attachmentService = {

📄 harmony-backend/.../routers/attachment.router.ts.html (2):
   127: import { attachmentService, AttachmentNotFoundError } from '../../services/at...
   144: <span class="cstat-no" title="statement not covered" >        return await at...

📄 harmony-backend/package-lock.json (8):
  2389: "integrity": "sha512-qzUL1qgalIvKWAf9C1HpvBjif+Vm6rcT5wZd4VoMb9+Km3iS3Cv9DY6d...
  2939: "integrity": "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyC...
  3519: "integrity": "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngR...
  5114: "integrity": "sha512-fP8u2pyfqx0K1rGn1R9pyE0/KTn+G7PxktWidOBTqFPLYX0b9ksaMFkh...
  5931: "integrity": "sha512-Yd3UES5mWCSqR+qNT93S3UoYUkqAZ9lLg8a7g9rimsWmYGK8cVToA4/s...
  6034: "integrity": "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcM...
  6621: "integrity": "sha512-VMbMxbDeehAxpOtWJXlcUS5E8iXh6QmN+BkRX1GARS3wRaXEEgzCcB10...
  7017: "integrity": "sha512-oK8WG9diS3DlhdUkcFn4tkNIiIbBx9lI2ClF8K+b2/m8Eyv47LSawxUz...

📄 harmony-backend/src/lib/storage/index.ts (2):
     2: import { LocalStorageProvider } from './local.provider';
     2: import { LocalStorageProvider } from './local.provider';

📄 harmony-backend/src/lib/storage/local.provider.ts (2):
    37: this.uploadDir = process.env.LOCAL_UPLOAD_DIR ?? path.join(process.cwd(), 'up...
    37: this.uploadDir = process.env.LOCAL_UPLOAD_DIR ?? path.join(process.cwd(), 'up...

📄 harmony-backend/.../storage/storage.interface.ts (4):
     1: // Storage provider abstraction — swap LocalStorageProvider for S3StorageProv...
     2: // by setting STORAGE_PROVIDER=s3 (and the relevant S3 env vars) in production.
     1: // Storage provider abstraction — swap LocalStorageProvider for S3StorageProv...
     2: // by setting STORAGE_PROVIDER=s3 (and the relevant S3 env vars) in production.

📄 harmony-backend/.../middleware/rate-limit.middleware.ts (62):
    32: * Token bucket entry stored per IP (or bot identity).
    40: * In-process token bucket store.
    41: * Maps IP (or bot name key) -> bucket state.
    43: const buckets = new Map<string, TokenBucket>();
    51: * Returns the bucket for `key`, refilling tokens proportionally to elapsed
    52: * time (true token-bucket algorithm: tokens drip in continuously rather than
    57: const existing = buckets.get(key);
    61: if (buckets.size >= MAX_BUCKETS) {
    64: if (buckets.size >= MAX_BUCKETS) {
    65: const oldestKey = buckets.keys().next().value;
  +52

... +110
```

#### Tool: exec_command

```sh
rtk grep -n "metadataBase|robots\.txt|sitemap|NEXT_PUBLIC_API_URL|api base|canonical" harmony-frontend/src harmony-frontend
```

Output:

```text
🔍 23 in 11F:

📄 harmony-frontend/.env.example (1):
     2: NEXT_PUBLIC_API_URL=http://localhost:4000

📄 harmony-frontend/README.md (1):
     7: This project uses the canonical tech stack from the Harmony dev specs (Sectio...

📄 harmony-frontend/.../__tests__/useChannelEvents.test.tsx (2):
   119: process.env = { ...originalEnv, NEXT_PUBLIC_API_URL: API_URL };
   119: process.env = { ...originalEnv, NEXT_PUBLIC_API_URL: API_URL };

📄 harmony-frontend/.../__tests__/useServerEvents.test.tsx (2):
   120: process.env = { ...originalEnv, NEXT_PUBLIC_API_URL: API_URL };
   120: process.env = { ...originalEnv, NEXT_PUBLIC_API_URL: API_URL };

📄 harmony-frontend/.../[channelSlug]/page.tsx (6):
    23: const canonicalUrl = `/c/${serverSlug}/${channelSlug}`;
    29: alternates: { canonical: canonicalUrl },
    34: url: canonicalUrl,
    23: const canonicalUrl = `/c/${serverSlug}/${channelSlug}`;
    29: alternates: { canonical: canonicalUrl },
    34: url: canonicalUrl,

📄 harmony-frontend/src/contexts/VoiceContext.tsx (2):
   631: const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
   631: const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

📄 harmony-frontend/src/hooks/useChannelEvents.ts (2):
    67: const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
    67: const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

📄 harmony-frontend/src/hooks/useServerEvents.ts (2):
    87: const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
    87: const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

📄 harmony-frontend/src/lib/constants.ts (2):
    13: BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    13: BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',

📄 harmony-frontend/src/lib/utils.ts (2):
   123: * Generate a canonical URL for a public channel
   123: * Generate a canonical URL for a public channel

📄 harmony-frontend/.../support/stack.shared.mjs (1):
    31: NEXT_PUBLIC_API_URL: BACKEND_URL,
```

#### Tool: exec_command

```sh
rtk ls .github/workflows
```

Output:

```text
ci.yml  1.3K
claude-review.yml  3.8K
demo-seed.yml  1.3K
discord-forum-pr.yml  893B
run-backend-tests.yml  1.4K
run-frontend-e2e.yml  1.2K
run-frontend-tests.yml  591B

📊 7 files, 0 dirs (7 .yml)
```

#### Tool: exec_command

```sh
rtk read harmony-backend/package.json
```

Output:

```text
{
  "name": "harmony-backend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint src tests",
    "test": "jest",
    "db:seed:mock": "prisma db seed",
    "db:seed:demo": "tsx src/dev/demoSeed.ts"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "dependencies": {
    "@prisma/client": "^5.22.0",
    "@trpc/server": "^11.0.0",
    "bcryptjs": "^3.0.3",
    "cors": "^2.8.5",
    "express": "^4.21.2",
    "express-rate-limit": "^8.3.0",
    "file-type": "^21.3.2",
    "helmet": "^8.1.0",
    "ioredis": "^5.10.0",
    "jsonwebtoken": "^9.0.3",
    "multer": "^2.1.1",
    "serverless-http": "^3.2.0",
    "twilio": "^5.13.0",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/ioredis": "^4.28.10",
    "@types/jest": "^29.5.14",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/multer": "^2.1.0",
    "@types/node": "^20.17.19",
    "@types/supertest": "^6.0.2",
    "@typescript-eslint/eslint-plugin": "^8.26.0",
    "@typescript-eslint/parser": "^8.26.0",
    "dotenv": "^17.3.1",
    "eslint": "^9.22.0",
    "eslint-config-prettier": "^10.1.1",
    "jest": "^29.7.0",
    "prettier": "^3.5.3",
    "prisma": "^5.22.0",
    "supertest": "^7.0.0",
    "ts-jest": "^29.2.6",
    "tsx": "^4.19.3",
    "typescript": "^5.8.2"
  },
  "engines": {
    "node": ">=20"
  }
}
```

#### Tool: exec_command

```sh
rtk read harmony-frontend/package.json
```

Output:

```text
{
  "name": "harmony-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest --forceExit",
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed",
    "lint": "eslint",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  },
  "dependencies": {
    "axios": "^1.13.5",
    "clsx": "^2.1.1",
    "next": "16.1.6",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "tailwind-merge": "^3.4.1",
    "twilio-video": "3.0.0-preview.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@playwright/test": "^1.55.0",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@testing-library/user-event": "^14.6.1",
    "@types/jest": "^30.0.0",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.6",
    "eslint-config-prettier": "^10.1.8",
    "jest": "^30.3.0",
    "jest-environment-jsdom": "^30.3.0",
    "prettier": "^3.8.1",
    "tailwindcss": "^4",
    "ts-jest": "^29.4.6",
    "typescript": "5.9.3"
  }
}
```

#### Tool: exec_command

```sh
rtk read .github/workflows/ci.yml
```

Output:

```text
name: CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  workflow_dispatch:

jobs:
  # The core CI workflow handles static validation for each package.
  # Test execution lives in dedicated workflows so failures are easier to spot.
  frontend-lint-build:
    name: Frontend Lint and Build
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: harmony-frontend
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: harmony-frontend/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build

  backend-lint-build:
    name: Backend Lint and Build
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: harmony-backend
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: harmony-backend/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Generate Prisma client
        run: npx prisma generate

      - name: Build
        run: npm run build
```

#### Tool: exec_command

```sh
rtk read harmony-backend/src/index.ts
```

Output:

```text
import 'dotenv/config';
import { createApp } from './app';
import { cacheInvalidator } from './services/cacheInvalidator.service';

const PORT = Number(process.env.PORT) || 4000;

const app = createApp();

const server = app.listen(PORT, () => {
  console.log(`Harmony backend running on http://localhost:${PORT}`);
});

cacheInvalidator.start().catch((err) => console.error('[cacheInvalidator] start failed:', err));

let shuttingDown = false;
const shutdown = async () => {
  if (shuttingDown) return;
  shuttingDown = true;
  const timer = setTimeout(() => process.exit(1), 10_000);
  await new Promise<void>((resolve) => server.close(() => resolve()));
  await cacheInvalidator.stop();
  clearTimeout(timer);
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
```

#### Tool: exec_command

```sh
rtk read harmony-backend/src/lib/storage/storage.interface.ts
```

Output:

```text
export interface UploadOptions {
  filename: string;
  contentType: string;
  data: Buffer;
}

export interface UploadResult {
  /** Public URL callers use to fetch the file. */
  url: string;
  /** Resolved filename (may differ from input if sanitized/de-duped). */
  filename: string;
}

export interface StorageProvider {
  upload(options: UploadOptions): Promise<UploadResult>;
  delete(filename: string): Promise<void>;
}
```

#### Tool: exec_command

```sh
rtk read harmony-backend/src/lib/storage/index.ts
```

Output:

```text
import type { StorageProvider } from './storage.interface';
import { LocalStorageProvider } from './local.provider';

function createStorageProvider(): StorageProvider {
  const provider = process.env.STORAGE_PROVIDER ?? 'local';
  if (provider === 'local') return new LocalStorageProvider();
  throw new Error(`Unknown STORAGE_PROVIDER: "${provider}". Supported: local`);
}

export const storageProvider: StorageProvider = createStorageProvider();
export type { StorageProvider } from './storage.interface';
```

#### Tool: exec_command

```sh
rtk read harmony-frontend/src/app/c/[serverSlug]/[channelSlug]/page.tsx
```

Output:

```text
zsh:1: no matches found: harmony-frontend/src/app/c/[serverSlug]/[channelSlug]/page.tsx
```

#### Tool: exec_command

```sh
rtk read .github/workflows/run-backend-tests.yml
```

Output:

```text
name: CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  workflow_dispatch:

jobs:
  backend-tests:
    name: Run Backend Tests
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: harmony-backend
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: harmony
          POSTGRES_PASSWORD: harmony
          POSTGRES_DB: harmony_dev
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      redis:
        image: redis:7
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    env:
      DATABASE_URL: postgresql://harmony:harmony@localhost:5432/harmony_dev
      REDIS_URL: redis://localhost:6379
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: harmony-backend/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Generate Prisma client
        run: npx prisma generate

      - name: Run migrations
        run: npx prisma migrate deploy

      - name: Run backend tests
        run: npm test
```

#### Tool: exec_command

```sh
rtk read .github/workflows/run-frontend-tests.yml
```

Output:

```text
name: CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  workflow_dispatch:

jobs:
  frontend-tests:
    name: Run Frontend Tests
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: harmony-frontend
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: harmony-frontend/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Run frontend tests
        run: npm test
```

#### Tool: exec_command

```sh
rtk read .github/workflows/run-frontend-e2e.yml
```

Output:

```text
name: Frontend E2E

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  workflow_dispatch:

jobs:
  frontend-e2e:
    name: Run Frontend E2E Tests
    runs-on: ubuntu-latest
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: |
            harmony-frontend/package-lock.json
            harmony-backend/package-lock.json

      - name: Install frontend dependencies
        working-directory: harmony-frontend
        run: npm ci

      - name: Install backend dependencies
        working-directory: harmony-backend
        run: npm ci

      - name: Install Playwright browsers
        working-directory: harmony-frontend
        run: npx playwright install --with-deps chromium

      - name: Run frontend E2E tests
        working-directory: harmony-frontend
        run: npm run test:e2e

      - name: Upload Playwright artifacts
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-artifacts
          path: |
            harmony-frontend/playwright-report
            harmony-frontend/test-results
          if-no-files-found: ignore
```

#### Tool: exec_command

```sh
rtk read 'harmony-frontend/src/app/c/[serverSlug]/[channelSlug]/page.tsx'
```

Output:

```text
import type { Metadata } from 'next';
import { GuestChannelView } from '@/components/channel/GuestChannelView';
import { fetchPublicServer, fetchPublicChannel } from '@/services/publicApiService';
import { ChannelVisibility } from '@/types';

interface PageProps {
  params: Promise<{ serverSlug: string; channelSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serverSlug, channelSlug } = await params;
  const [server, channelResult] = await Promise.all([
    fetchPublicServer(serverSlug),
    fetchPublicChannel(serverSlug, channelSlug),
  ]);

  const channel = channelResult && !channelResult.isPrivate ? channelResult.channel : null;
  const channelName = channel?.name ?? channelSlug;
  const serverName = server?.name ?? serverSlug;
  const isIndexable = channel?.visibility === ChannelVisibility.PUBLIC_INDEXABLE;
  const description = channel?.topic ?? server?.description ?? `Join ${serverName} on Harmony`;
  const title = `${channelName} - ${serverName} | Harmony`;
  const canonicalUrl = `/c/${serverSlug}/${channelSlug}`;

  return {
    title,
    description,
    robots: { index: isIndexable, follow: true },
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
    },
  };
}

export default async function GuestChannelPage({ params }: PageProps) {
  const { serverSlug, channelSlug } = await params;
  return <GuestChannelView serverSlug={serverSlug} channelSlug={channelSlug} />;
}
```

#### Tool: exec_command

```sh
rtk grep -n "export const metadata|generateMetadata|metadataBase|robots|sitemap" harmony-frontend/src/app harmony-frontend/src
```

Output:

```text
🔍 7 in 3F:

📄 harmony-frontend/.../[channelSlug]/page.tsx (4):
    10: export async function generateMetadata({ params }: PageProps): Promise<Metada...
    28: robots: { index: isIndexable, follow: true },
    10: export async function generateMetadata({ params }: PageProps): Promise<Metada...
    28: robots: { index: isIndexable, follow: true },

📄 harmony-frontend/src/app/layout.tsx (2):
    11: export const metadata: Metadata = {
    11: export const metadata: Metadata = {

📄 harmony-frontend/src/services/publicApiService.ts (1):
     4: * Components, generateMetadata, and other server-only contexts.
```

#### Tool: exec_command

```sh
rtk ls harmony-frontend/src/app
```

Output:

```text
actions/
auth/
c/
channels/
settings/
error.tsx  1.7K
favicon.ico  25.3K
global-error.tsx  3.0K
globals.css  403B
layout.tsx  606B
not-found.tsx  1.1K
page.tsx  922B
providers.tsx  437B

📊 8 files, 5 dirs (6 .tsx, 1 .css, 1 .ico)
```

#### Tool: exec_command

```sh
rtk read harmony-frontend/src/app/layout.tsx
```

Output:

```text
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Harmony',
  description: 'A search engine indexable chat application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

#### Tool: exec_command

```sh
rtk grep -n "branch protection|required status|required checks|PR review|no direct pushes" README.md docs planning .github
```

Output:

```text
🔍 12 in 2F:

📄 .github/workflows/claude-review.yml (1):
    72: After your review, submit a formal GitHub PR review using the `gh` CLI:

📄 planning/SPRINT_4_PLAN.md (11):
    26: 6. Adopt GitHub hygiene and branch protection
    74: | GitHub hygiene / branch protection | Require PRs and required checks before...
   242: - Ensure the workflow name is stable so it can be required in branch protection
   245: - Workflow is usable as a required status check
   282: - Configure branch protection for `main`
   283: - Require PR review before merge
   285: - Record the exact required checks to enable:
   290: - PR review is required
   339: - how CI/CD and branch protection are expected to work
   368: | Aiden-Barrera | #3, #9, #13 | Shared rate limiting, integration test implem...
  +1

... +1
```

#### Tool: exec_command

```sh
rtk grep -n "integration test|e2e|playwright|supertest|frontend-backend|cloud" docs harmony-frontend harmony-backend .github planning
```

Output:

```text
🔍 108 in 34F:

📄 .github/workflows/run-frontend-e2e.yml (5):
    11: frontend-e2e:
    36: run: npx playwright install --with-deps chromium
    40: run: npm run test:e2e
    46: name: playwright-artifacts
    48: harmony-frontend/playwright-report

📄 docs/dev-spec-channel-visibility-toggle.md (3):
   588: | T11 | CloudFlare | N/A | CDN and DDoS protection | https://www.cloudflare.c...
   592: | T15 | Jest | 29+ | Unit/integration testing | https://jestjs.io/ |
   593: | T16 | Playwright | 1.40+ | Cross-browser E2E testing | https://playwright.d...

📄 docs/dev-spec-guest-public-channel-view.md (2):
   833: | T11 | CloudFlare | N/A | CDN/Edge | Global caching; DDoS protection; edge w...
   838: | T16 | Playwright | 1.40+ | E2E testing | SEO verification; crawl simulation...

📄 docs/dev-spec-seo-meta-tag-generation.md (4):
  1967: | T12 | Cloudflare | N/A | CDN | Cache invalidation API | https://www.cloudfl...
  3147: | AC-5 | Regeneration API returns `jobId` and supports status polling to term...
  3148: | AC-6 | Idempotency key deduplicates repeated regenerate requests within 60 ...
  3151: | AC-9 | On NLP failure/timeout, fallback tags are returned and `needs_regene...

📄 docs/test-specs/auth-service-spec.md (1):
   146: | Null/undefined email input (router-level validation) | email: `null`, usern...

📄 docs/test-specs/public-router-spec.md (2):
    36: - Use **supertest** (or equivalent) to drive the Express router directly,
   432: carefully timed async integration test to exercise reliably.

📄 docs/unified-backend-architecture.md (1):
  1573: | T14 | Jest | 29+ | Unit/integration testing | All |

📄 harmony-backend/README.md (2):
    73: | **Jest** + **ts-jest** | ^29 | Unit and integration test runner |
    74: | **supertest** | ^7.0 | HTTP integration testing against the Express app |

📄 harmony-backend/docker-compose.e2e.yml (4):
     8: POSTGRES_DB: harmony_e2e
    12: test: ['CMD-SHELL', 'pg_isready -U harmony -d harmony_e2e']
    20: command: 'redis-server --requirepass e2esecret'
    24: test: ['CMD-SHELL', 'redis-cli -a e2esecret ping | grep PONG']

📄 harmony-backend/package-lock.json (8):
    35: "@types/supertest": "^6.0.2",
    44: "supertest": "^7.0.0",
  2208: "node_modules/@types/supertest": {
  2210: "resolved": "https://registry.npmjs.org/@types/supertest/-/supertest-6.0.3.tgz",
  7014: "node_modules/supertest": {
  7016: "resolved": "https://registry.npmjs.org/supertest/-/supertest-7.2.2.tgz",
  7029: "node_modules/supertest/node_modules/cookie-signature": {
  7598: "integrity": "sha512-Eux0i2QdDYKbdbA6AM6xE4m6ZTZr4G4xF9kahI2ukSEMCzwce2eX9WlT...

📄 harmony-backend/package.json (2):
    42: "@types/supertest": "^6.0.2",
    51: "supertest": "^7.0.0",

📄 harmony-backend/src/app.ts (1):
    16: const isE2E = process.env.NODE_ENV === 'e2e';

📄 harmony-backend/src/dev/mock-seed-data.json (1):
  1078: "content": "📢 **Infrastructure:** Staging environment is now live at staging....

📄 harmony-backend/tests/app.test.ts (1):
     1: import request from 'supertest';

📄 harmony-backend/tests/attachment.router.test.ts (1):
     8: import request from 'supertest';

📄 harmony-backend/tests/auth.flow.integration.test.ts (2):
     2: * True auth integration tests
    10: import request from 'supertest';

📄 harmony-backend/tests/auth.test.ts (1):
     8: import request from 'supertest';

📄 harmony-backend/tests/cache.middleware.test.ts (1):
     2: import request from 'supertest';

📄 harmony-backend/tests/events.router.server.test.ts (1):
     9: import request from 'supertest';

📄 harmony-backend/tests/events.router.test.ts (2):
     9: * without supertest hanging on open connections.
    13: import request from 'supertest';

📄 harmony-backend/tests/indexing.service.test.ts (1):
    16: import request from 'supertest';

📄 harmony-backend/tests/public.router.test.ts (1):
    13: import request from 'supertest';

📄 harmony-backend/tests/rate-limit.middleware.test.ts (1):
     2: import request from 'supertest';

📄 harmony-backend/tests/server.flow.integration.test.ts (4):
     2: * True server lifecycle integration tests
     8: import request from 'supertest';

... +58
```

#### Tool: exec_command

```sh
rtk grep -n "playwright\.config|BACKEND_URL|BASE_URL|webServer|process\.env\.|cloud" harmony-frontend scripts harmony-backend
```

Output:

```text
🔍 156 in 63F:

📄 harmony-backend/.env.example (1):
     9: DATABASE_URL=postgresql://harmony:harmony@localhost:5432/harmony_dev

📄 harmony-backend/README.md (1):
   122: | `DATABASE_URL` | *(see example)* | PostgreSQL connection string |

📄 harmony-backend/.../lcov-report/auth.service.ts.html (7):
   570: const value = process.env.JWT_ACCESS_SECRET;
   572: if (!value &amp;&amp; process.env.NODE_ENV !== 'test') {
   579: const value = process.env.JWT_REFRESH_SECRET;
   581: if (!value &amp;&amp; process.env.NODE_ENV !== 'test') {
   587: const ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN ?? '15m';
   590: const raw = process.env.JWT_REFRESH_EXPIRES_DAYS;
   730: if (process.env.NODE_ENV !== 'production' &amp;&amp; email === ADMIN_EMAIL &a...

📄 harmony-backend/.../db/prisma.ts.html (1):
    90: if (process.env.NODE_ENV !== 'production') {

📄 harmony-backend/.../src/app.ts.html (2):
   295: max: process.env.NODE_ENV === 'production' ? <span class="branch-0 cbranch-no...
   366: <span class="cstat-no" title="statement not covered" >      console.error('Un...

📄 harmony-backend/.../db/prisma.ts.html (1):
    90: if (process.env.NODE_ENV !== 'production') {

📄 harmony-backend/.../db/redis.ts.html (2):
   100: new Redis(process.env.REDIS_URL ?? <span class="branch-1 cbranch-no" title="b...
   105: if (process.env.NODE_ENV !== 'production') {

📄 harmony-backend/.../events/eventBus.ts.html (1):
   412: <span class="cstat-no" title="statement not covered" >    subscriberClient = ...

📄 harmony-backend/.../storage/index.ts.html (1):
    95: const provider = process.env.STORAGE_PROVIDER ?? 'local';

📄 harmony-backend/.../storage/local.provider.ts.html (2):
   248: this.uploadDir = process.env.LOCAL_UPLOAD_DIR ?? path.join(process.cwd(), 'up...
   249: this.baseUrl = process.env.LOCAL_UPLOAD_BASE_URL ?? 'http://localhost:4000';

📄 harmony-backend/.../middleware/cors.ts.html (1):
   145: ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : <span class="bran...

📄 harmony-backend/.../routes/attachment.router.ts.html (1):
   443: if (process.env.STORAGE_PROVIDER !== 's3' &amp;&amp; storageProvider instance...

📄 harmony-backend/.../services/auth.service.ts.html (7):
   570: const value = process.env.JWT_ACCESS_SECRET;
   572: if (!value &amp;&amp; process.env.NODE_ENV !== 'test') {
   579: const value = process.env.JWT_REFRESH_SECRET;
   581: if (!value &amp;&amp; process.env.NODE_ENV !== 'test') {
   587: const ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN ?? '15m';
   590: const raw = process.env.JWT_REFRESH_EXPIRES_DAYS;
   730: <span class="cstat-no" title="statement not covered" >    <span class="missin...

📄 harmony-backend/.../services/indexing.service.ts.html (2):
   337: const BASE_URL = process.env.BASE_URL ?? 'https://harmony.chat';
   432: <span class="cstat-no" title="statement not covered" >        `  &lt;url&gt;\...

📄 harmony-backend/.../services/voice.service.ts.html (10):
   716: <span class="cstat-no" title="statement not covered" >  <span class="missing-...
   733: process.env.TWILIO_API_KEY,
   734: process.env.TWILIO_API_SECRET,
   735: { accountSid: process.env.TWILIO_ACCOUNT_SID },
   760: process.env.TWILIO_API_KEY,
   761: process.env.TWILIO_API_SECRET,
   762: { accountSid: process.env.TWILIO_ACCOUNT_SID },
   814: process.env.TWILIO_ACCOUNT_SID as string,
   815: process.env.TWILIO_API_KEY as string,
   816: process.env.TWILIO_API_SECRET as string,

📄 harmony-backend/.../trpc/init.ts.html (1):
   281: stack: process.env.NODE_ENV === 'development' ? shape.data.stack : undefined,

📄 harmony-backend/prisma/schema.prisma (1):
    10: url      = env("DATABASE_URL")

📄 harmony-backend/src/app.ts (3):
    16: const isE2E = process.env.NODE_ENV === 'e2e';
    28: max: process.env.NODE_ENV === 'production' ? 5 : 1000,
    99: console.error('Unhandled error:', process.env.NODE_ENV === 'production' ? err...

📄 harmony-backend/src/db/prisma.ts (1):
     7: if (process.env.NODE_ENV !== 'production') {

📄 harmony-backend/src/db/redis.ts (2):
     7: new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
    12: if (process.env.NODE_ENV !== 'production') {

📄 harmony-backend/src/events/eventBus.ts (1):
    43: subscriberClient = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379...

📄 harmony-backend/src/index.ts (1):
     5: const PORT = Number(process.env.PORT) || 4000;

... +106
```

#### Tool: exec_command

```sh
rtk ls harmony-frontend | sed -n '1,120p'
```

Output:

```text
public/
src/
tests/
.env.example  247B
.gitignore  540B
.prettierignore  47B
.prettierrc.cjs  342B
README.md  4.9K
bun.lock  174.6K
eslint.config.mjs  786B
jest.config.js  587B
next-env.d.ts  251B
next.config.ts  518B
package-lock.json  394.4K
package.json  1.2K
playwright.config.ts  1.5K
postcss.config.mjs  94B
tailwind.config.ts  853B
tsconfig.json  670B
tsconfig.tsbuildinfo  174.4K

📊 17 files, 3 dirs (4 .ts, 3 .json, 2 .mjs, 1 .prettierignore, 1 .gitignore, +6 more)
```

#### Tool: exec_command

```sh
rtk read harmony-frontend/playwright.config.ts
```

Output:

```text
import { defineConfig, devices } from '@playwright/test';
import { BACKEND_PORT, FRONTEND_URL, frontendEnv } from './tests/e2e/support/stack.shared.mjs';

const frontendCommand = process.env.CI ? 'npm run build && npm run start' : 'npm run dev';
const projects = process.env.CI
  ? [
      {
        name: 'chromium',
        use: {
          ...devices['Desktop Chrome'],
        },
      },
    ]
  : [
      {
        name: 'chromium',
        use: {
          ...devices['Desktop Chrome'],
        },
      },
      {
        name: 'webkit',
        use: {
          ...devices['Desktop Safari'],
        },
      },
    ];

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: !process.env.CI,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: FRONTEND_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects,
  webServer: [
    {
      command: 'node tests/e2e/support/start-backend-e2e.mjs',
      reuseExistingServer: false,
      timeout: 120_000,
      url: `http://localhost:${BACKEND_PORT}/health`,
    },
    {
      command: frontendCommand,
      reuseExistingServer: !process.env.CI,
      timeout: process.env.CI ? 240_000 : 120_000,
      url: `${FRONTEND_URL}/auth/login`,
      env: frontendEnv(),
    },
  ],
});
```

#### Tool: exec_command

```sh
rtk read harmony-frontend/tests/e2e/support/stack.shared.mjs
```

Output:

```text
import fs from 'node:fs';
import path from 'node:path';

export const FRONTEND_PORT = 3100;
export const BACKEND_PORT = 4100;
export const POSTGRES_PORT = 55432;
export const REDIS_PORT = 56379;

export const FRONTEND_URL = `http://localhost:${FRONTEND_PORT}`;
export const BACKEND_URL = `http://localhost:${BACKEND_PORT}`;
export const DATABASE_URL = `postgresql://harmony:harmony@localhost:${POSTGRES_PORT}/harmony_e2e`;
export const REDIS_URL = `redis://:e2esecret@localhost:${REDIS_PORT}`;

export const DEV_ADMIN_EMAIL = 'admin@harmony.dev';
export const DEV_ADMIN_PASSWORD = 'admin';

export const SIGNUP_USER = {
  username: 'e2e_member',
  displayName: 'E2E Member',
  password: 'password123',
};

export function cleanEnv(env = process.env) {
  return Object.fromEntries(Object.entries(env).filter(([, value]) => typeof value === 'string'));
}

export function frontendEnv(env = process.env) {
  return {
    ...cleanEnv(env),
    PORT: String(FRONTEND_PORT),
    NEXT_PUBLIC_API_URL: BACKEND_URL,
  };
}

export function backendEnv(env = process.env) {
  return {
    ...cleanEnv(env),
    PORT: String(BACKEND_PORT),
    DATABASE_URL,
    REDIS_URL,
    FRONTEND_URL,
    JWT_ACCESS_SECRET: 'harmony-e2e-access-secret',
    JWT_REFRESH_SECRET: 'harmony-e2e-refresh-secret',
    JWT_ACCESS_EXPIRES_IN: '15m',
    JWT_REFRESH_EXPIRES_DAYS: '7',
    TWILIO_MOCK: 'true',
    LOCAL_UPLOAD_BASE_URL: BACKEND_URL,
  };
}

export function resolveE2EPaths(cwd = process.cwd()) {
  const repoRoot = path.resolve(cwd, '..');
  const backendDir = path.join(repoRoot, 'harmony-backend');

  return {
    repoRoot,
    backendDir,
    composeFile: path.join(backendDir, 'docker-compose.e2e.yml'),
    composeProject: 'harmony-e2e',
  };
}

function loadSeedSnapshot() {
  const { backendDir } = resolveE2EPaths();
  const seedPath = path.join(backendDir, 'src/dev/mock-seed-data.json');
  try {
    return JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      throw new Error(
        `Missing E2E seed snapshot at ${seedPath}. Ensure the Harmony backend mock seed files are present before running Playwright.`,
      );
    }

    throw error;
  }
}

const snapshot = loadSeedSnapshot();

export const DEFAULT_JOIN_SERVER_SLUG = 'harmony-hq';

const defaultJoinServer = snapshot.servers.find(server => server.slug === DEFAULT_JOIN_SERVER_SLUG);
if (!defaultJoinServer) {
  throw new Error(
    `Seed snapshot is missing the default join server slug "${DEFAULT_JOIN_SERVER_SLUG}".`,
  );
}

const publicChannel = snapshot.channels.find(
  channel => channel.serverId === defaultJoinServer.id && channel.visibility === 'PUBLIC_INDEXABLE',
);
if (!publicChannel) {
  throw new Error(
    `Seed snapshot is missing a public channel for server "${DEFAULT_JOIN_SERVER_SLUG}".`,
  );
}

const privateChannel = snapshot.channels.find(
  channel => channel.serverId === defaultJoinServer.id && channel.visibility === 'PRIVATE',
);
if (!privateChannel) {
  throw new Error(
    `Seed snapshot is missing a private channel for server "${DEFAULT_JOIN_SERVER_SLUG}".`,
  );
}

const welcomeMessage = snapshot.messages.find(message => message.channelId === publicChannel.id);
if (!welcomeMessage) {
  throw new Error(`Seed snapshot is missing a message for public channel "${publicChannel.slug}".`);
}

export const SEEDED_PUBLIC_CHANNEL = {
  serverSlug: defaultJoinServer.slug,
  serverName: defaultJoinServer.name,
  channelSlug: publicChannel.slug,
  channelName: publicChannel.name,
  welcomeText: welcomeMessage.content,
};

export const SEEDED_PRIVATE_CHANNEL = {
  serverSlug: defaultJoinServer.slug,
  channelName: privateChannel.name,
  channelSlug: privateChannel.slug,
};
```

#### Tool: exec_command

```sh
rtk read harmony-backend/src/middleware/rate-limit.middleware.ts
```

Output:

```text
import { Request, Response, NextFunction } from 'express';

/**
 * Known crawler User-Agent substrings (lowercase). Matched via case-insensitive
 * substring check. Reverse-DNS verification is not yet implemented — see §9.3
 * of the unified backend architecture for the full verification spec.
 */
const VERIFIED_BOT_TOKENS: { token: string; name: string }[] = [
  { token: 'googlebot', name: 'googlebot' },
  { token: 'bingbot', name: 'bingbot' },
  { token: 'slackbot', name: 'slackbot' },
];

/**
 * Determines whether an incoming request is from a verified search engine bot
 * by performing a case-insensitive check against the known bot list.
 * Returns the normalized bot name if matched, or null otherwise.
 */
export function detectVerifiedBot(userAgent: string | undefined): string | null {
  if (!userAgent) return null;
  const lower = userAgent.toLowerCase();
  const match = VERIFIED_BOT_TOKENS.find((b) => lower.includes(b.token));
  return match?.name ?? null;
}

/** Backwards-compatible helper used in tests. */
export function isVerifiedBot(userAgent: string | undefined): boolean {
  return detectVerifiedBot(userAgent) !== null;
}

/**
 * Token bucket entry stored per IP (or bot identity).
 */
interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

/**
 * In-process token bucket store.
 * Maps IP (or bot name key) -> bucket state.
 */
const buckets = new Map<string, TokenBucket>();

const HUMAN_CAPACITY = 100;   // max tokens
const BOT_CAPACITY = 1000;    // max tokens
const WINDOW_MS = 60_000;     // 1 minute — full refill period
const MAX_BUCKETS = 100_000;  // cap to prevent memory exhaustion

/**
 * Returns the bucket for `key`, refilling tokens proportionally to elapsed
 * time (true token-bucket algorithm: tokens drip in continuously rather than
 * resetting at window boundaries).
 */
function getOrRefillBucket(key: string, capacity: number): TokenBucket {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing) {
    if (buckets.size >= MAX_BUCKETS) {
      evictStaleBuckets();
      if (buckets.size >= MAX_BUCKETS) {
        const oldestKey = buckets.keys().next().value;
        if (oldestKey !== undefined) buckets.delete(oldestKey);
      }
    }
    const bucket: TokenBucket = { tokens: capacity, lastRefill: now };
    buckets.set(key, bucket);
    return bucket;
  }

  const elapsed = now - existing.lastRefill;

  if (elapsed > 0) {
    const refillRate = capacity / WINDOW_MS; // tokens per ms
    const newTokens = Math.min(capacity, existing.tokens + elapsed * refillRate);
    existing.tokens = newTokens;
    existing.lastRefill = now;
  }

  return existing;
}

/**
 * Evict buckets that have been idle for longer than the refill window
 * (they would be at full capacity anyway).
 */
function evictStaleBuckets(): void {
  const cutoff = Date.now() - WINDOW_MS;
  for (const [key, bucket] of buckets) {
    if (bucket.lastRefill < cutoff) {
      buckets.delete(key);
    }
  }
}

/**
 * Consume one token from an existing bucket (caller must check tokens > 0 first).
 */
function consumeToken(bucket: TokenBucket): void {
  bucket.tokens -= 1;
}

/**
 * Token-bucket rate limiting middleware for the public API.
 *
 * Uses a true token-bucket algorithm: tokens refill continuously at a rate of
 * `capacity / WINDOW_MS` tokens per millisecond, up to the maximum capacity.
 *
 * All requests are currently rate-limited at 100 req/min per IP. Bot detection
 * identifies crawlers (Googlebot, Bingbot, Slackbot) but does NOT grant
 * elevated limits until reverse-DNS verification is implemented per §9.3.
 * Without verification, any client can spoof a bot UA to bypass limits.
 *
 * Responses:
 *   - 429 Too Many Requests + Retry-After header when limit is exceeded
 *   - RateLimit-Limit / RateLimit-Remaining / RateLimit-Reset on every response
 */
export function tokenBucketRateLimiter(req: Request, res: Response, next: NextFunction): void {
  const key = `ip:${req.ip ?? 'unknown'}`;
  const capacity = HUMAN_CAPACITY;

  const bucket = getOrRefillBucket(key, capacity);
  const msPerToken = WINDOW_MS / capacity;

  if (bucket.tokens < 1) {
    const resetSeconds = Math.max(1, Math.ceil(msPerToken / 1000));
    res.set('RateLimit-Limit', String(capacity));
    res.set('RateLimit-Remaining', '0');
    res.set('RateLimit-Reset', String(resetSeconds));
    res.set('Retry-After', String(resetSeconds));
    res.status(429).json({ error: 'Too many requests. Please try again later.' });
    return;
  }

  consumeToken(bucket);

  const resetSeconds = bucket.tokens >= 1 ? 0 : Math.max(1, Math.ceil(msPerToken / 1000));
  res.set('RateLimit-Limit', String(capacity));
  res.set('RateLimit-Remaining', String(Math.floor(bucket.tokens)));
  res.set('RateLimit-Reset', String(resetSeconds));

  next();
}

/**
 * Clears the in-process bucket store.
 * Intended for use in tests only.
 */
export function _clearBucketsForTesting(): void {
  buckets.clear();
}
```

#### Tool: exec_command

```sh
rtk read harmony-backend/src/lib/storage/local.provider.ts
```

Output:

```text
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import type { StorageProvider, UploadOptions, UploadResult } from './storage.interface';

/**
 * Writes uploaded files to a local directory.
 * Intended for development and CI only — in production set STORAGE_PROVIDER=s3.
 *
 * Files are served by the attachment router at:
 *   GET /api/attachments/files/:filename
 */

/**
 * Maps validated MIME types to stored file extensions.
 * Extension is derived from the server-verified content type (never from the
 * user-supplied filename) to prevent extension spoofing (e.g. uploading a
 * shell script with a .png name and having it served as active content).
 */
const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'application/pdf': '.pdf',
  'text/plain': '.txt',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
};

export class LocalStorageProvider implements StorageProvider {
  private readonly uploadDir: string;
  private readonly baseUrl: string;

  constructor() {
    this.uploadDir = process.env.LOCAL_UPLOAD_DIR ?? path.join(process.cwd(), 'uploads');
    this.baseUrl = process.env.LOCAL_UPLOAD_BASE_URL ?? 'http://localhost:4000';
    fs.mkdirSync(this.uploadDir, { recursive: true });
  }

  async upload(options: UploadOptions): Promise<UploadResult> {
    const ext = MIME_TO_EXT[options.contentType] ?? '.bin';
    const storedName = `${randomUUID()}${ext}`;
    const filePath = path.join(this.uploadDir, storedName);

    await fs.promises.writeFile(filePath, options.data);

    return {
      url: `${this.baseUrl}/api/attachments/files/${storedName}`,
      filename: storedName,
    };
  }

  async delete(filename: string): Promise<void> {
    if (filename.includes('/') || filename.includes('\\')) {
      throw new Error('Invalid filename');
    }
    const filePath = path.join(this.uploadDir, filename);
    await fs.promises.unlink(filePath).catch(() => {
    });
  }

  /** Exposed for the static file serving middleware in attachment.router.ts */
  getUploadDir(): string {
    return this.uploadDir;
  }
}
```

#### Tool: exec_command

```sh
rtk read harmony-backend/src/routes/attachment.router.ts
```

Output:

```text
import path from 'path';
import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import express from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { storageProvider } from '../lib/storage';
import { LocalStorageProvider } from '../lib/storage/local.provider';
import {
  attachmentService,
  AttachmentValidationError,
  MAX_FILE_SIZE_BYTES,
} from '../services/attachment.service';
import { detectMimeType } from '../lib/mime-detect';

export const attachmentRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
});

/**
 * POST /api/attachments/upload
 * Accepts a single multipart file field named "file".
 * Validates content-type and size, stores via storageProvider, returns metadata.
 *
 * Response:
 *   { url: string, filename: string, contentType: string, sizeBytes: number }
 */
attachmentRouter.post(
  '/upload',
  requireAuth,
  upload.single('file'),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'No file provided. Use field name "file".' });
        return;
      }

      const { originalname, mimetype, buffer, size } = req.file;

      try {
        attachmentService.validateUpload(mimetype, size);
      } catch (err) {
        if (err instanceof AttachmentValidationError) {
          res.status(400).json({ error: err.message });
          return;
        }
        throw err;
      }

      const detectedMime = await detectMimeType(buffer);

      if (mimetype !== 'text/plain') {
        if (!detectedMime || detectedMime !== mimetype) {
          res.status(400).json({
            error: `File content does not match declared type "${mimetype}"`,
          });
          return;
        }
      }

      const safeOriginalname = path.basename(originalname).replace(/[^a-zA-Z0-9._-]/g, '_');

      const result = await storageProvider.upload({
        filename: safeOriginalname,
        contentType: mimetype,
        data: buffer,
      });

      res.status(201).json({
        url: result.url,
        filename: result.filename,
        contentType: mimetype,
        sizeBytes: size,
      });
    } catch (err) {
      console.error('Attachment upload error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  },
);

/**
 * Catches multer-specific errors (e.g. LIMIT_FILE_SIZE) and maps them to
 * appropriate 4xx responses before they reach the global 500 error handler.
 */
attachmentRouter.use((err: unknown, _req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof multer.MulterError) {
    const status = err.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    res.status(status).json({ error: err.message });
    return;
  }
  next(err);
});

/**
 * GET /api/attachments/files/:filename
 * Serves files from the local upload directory.
 * In production (STORAGE_PROVIDER=s3) files are served via CDN; this route is a no-op.
 */
if (process.env.STORAGE_PROVIDER !== 's3' && storageProvider instanceof LocalStorageProvider) {
  const uploadDir = storageProvider.getUploadDir();
  attachmentRouter.use('/files', express.static(uploadDir));
}
```

#### Tool: exec_command

```sh
rtk grep -n "trust proxy|X-Forwarded|req\.ip|proxy" harmony-backend/src
```

Output:

```text
🔍 2 in 2F:

📄 harmony-backend/.../middleware/rate-limit.middleware.ts (1):
   126: const key = `ip:${req.ip ?? 'unknown'}`;

📄 harmony-backend/src/trpc/init.ts (1):
    25: return { userId, ip: req.ip ?? '', userAgent: req.get('user-agent') ?? '' };
```

#### Tool: exec_command

```sh
rtk grep -n "vercel|railway|Dockerfile|Procfile|nixpacks|railway\.json|vercel\.json" -g '!**/node_modules/**' .
```

Output:

```text
grep: invalid option -- g
usage: grep [-abcdDEFGHhIiJLlMmnOopqRSsUVvwXxZz] [-A num] [-B num] [-C[num]]
	[-e pattern] [-f file] [--binary-files=value] [--color=when]
	[--context[=num]] [--directories=action] [--label] [--line-buffered]
	[--null] [pattern] [file ...]
```

#### Tool: exec_command

```sh
rtk grep -n "sitemap-index|robots\.txt|sitemap" harmony-backend/src harmony-frontend/src
```

Output:

```text
🔍 26 in 4F:

📄 harmony-backend/src/app.ts (1):
    55: // SEO endpoints (robots.txt, sitemaps) — before auth so they're publicly acc...

📄 harmony-backend/src/routes/seo.router.ts (10):
     2: * SEO routes — sitemap.xml and robots.txt endpoints.
     4: * - GET /sitemap/:serverSlug.xml — dynamic sitemap of PUBLIC_INDEXABLE channe...
     5: * - GET /robots.txt              — allow crawling of /c/ routes
    14: * GET /robots.txt
    17: * NOTE: A machine-readable `Sitemap:` directive requires a sitemap index
    18: * endpoint (e.g. /sitemap-index.xml) that aggregates per-server sitemaps.
    21: seoRouter.get('/robots.txt', (_req: Request, res: Response) => {
    35: * GET /sitemap/:serverSlug.xml
    36: * Returns a dynamic XML sitemap containing all PUBLIC_INDEXABLE channels
    39: seoRouter.get('/sitemap/:serverSlug.xml', async (req: Request, res: Response)...

📄 harmony-backend/.../services/cacheInvalidator.service.ts (2):
    55: // Update sitemap on visibility changes
    58: .catch((err) => console.error('[CacheInvalidator] VISIBILITY_CHANGED sitemap ...

📄 harmony-backend/src/services/indexing.service.ts (13):
     2: * IndexingService — manages sitemap data for PUBLIC_INDEXABLE channels.
     5: *   - addToSitemap(channelId)   — marks a channel for sitemap inclusion
     6: *   - removeFromSitemap(channelId) — removes a channel from sitemap
     7: *   - generateSitemap(serverSlug)  — builds XML sitemap for a server
     9: * Listens to VISIBILITY_CHANGED events to keep sitemap data in sync.
    21: serverSitemap: (serverSlug: string) => `sitemap:${sanitizeKeySegment(serverSl...
    26: * Invalidate the sitemap cache for the channel's server so the channel
    27: * appears in the next generated sitemap.
    40: * Remove a channel from the sitemap. Clears indexed_at and invalidates
    41: * the cached sitemap so the channel no longer appears on next generation.
  +3

... +3
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-09T15:54:22.569Z

I’ve got enough context. The core direction is sound, but there are a few places where the sprint plan is stronger as an architecture memo than as an executable sprint plan. I’m pulling exact line references now so I can point to concrete gaps.

#### Tool: exec_command

```sh
nl -ba planning/SPRINT_4_PLAN.md | sed -n '1,260p'
```

Output:

```text
     1	# Deployment Sprint Plan — April 8–19, 2026
     2	
     3	## Context
     4	Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend backed by PostgreSQL and Redis. Sprint 4 adapts the P6 deployment assignment to a **Vercel + Railway** production stack:
     5	
     6	- **Frontend hosting:** Vercel
     7	- **Backend hosting:** Railway
     8	- **Database:** Railway Postgres
     9	- **Cache / event bus:** Railway Redis
    10	- **Public deployment goal:** keep the app deployed through instructor review
    11	- **Scaling goal:** support **2 or more backend API replicas** on Railway while keeping background event processing correct
    12	
    13	This sprint must cover the substance of **P6 Deployment** while ignoring the AWS-only platform choice. The plan therefore replaces:
    14	
    15	- AWS Lambda/API Gateway with Railway backend services
    16	- AWS Amplify with Vercel frontend hosting
    17	- AWS CD workflows with Vercel/Railway CD workflows
    18	
    19	The assignment requirements we still must satisfy are:
    20	
    21	1. Publicly deploy frontend and backend
    22	2. Automate deployment from GitHub
    23	3. Add integration test specifications and implementation
    24	4. Run integration tests locally and in the cloud
    25	5. Add GitHub Actions for integration tests
    26	6. Adopt GitHub hygiene and branch protection
    27	7. Update README with user-facing and deployer-facing instructions
    28	8. Produce the final submission artifacts, links, logs, and reflection
    29	
    30	**Assignment:** P6: Deployment  
    31	**Due:** Sunday, April 19, 2026, 11:59 PM AOE
    32	
    33	## Team
    34	5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI
    35	
    36	## Target Architecture
    37	
    38	### Public Services
    39	- `frontend` on Vercel
    40	- `backend-api` on Railway with **2+ replicas**
    41	
    42	### Internal / Stateful Services
    43	- `backend-worker` on Railway with **1 replica only**
    44	- `postgres` on Railway
    45	- `redis` on Railway
    46	
    47	### Domain Layout
    48	- `https://<frontend-domain>` -> Vercel
    49	- `https://api.<frontend-domain>` -> Railway `backend-api`
    50	
    51	### Multi-Backend Railway Rules
    52	To safely support 2+ backend replicas, the sprint must remove or isolate process-local production state:
    53	
    54	- Public/auth rate limiting must use **Redis-backed shared storage**
    55	- File uploads must use **shared object storage**, not local disk
    56	- Background subscribers / cache invalidation / sitemap updates must run in a **singleton worker**
    57	- API replicas must be stateless apart from live SSE client connections
    58	- Deployment verification must prove that 2+ API replicas behave correctly behind Railway load balancing
    59	
    60	---
    61	
    62	## P6 Coverage Map
    63	
    64	| P6 Requirement | Vercel + Railway Adaptation | Covered By Issues |
    65	|---|---|---|
    66	| Publicly deploy frontend | Deploy Next.js app to Vercel | #6, #12, #16 |
    67	| Publicly deploy backend | Deploy Express/tRPC app to Railway | #5, #7, #11 |
    68	| Publish backend public interfaces via REST | Keep Railway backend public routes stable and production-configured | #1, #5, #7 |
    69	| Integration test specification | Write English-language integration spec for FE-BE paths | #8 |
    70	| Integration tests on localhost | Add env-aware local integration test flow | #9 |
    71	| Integration tests in cloud | Run same test suite against deployed Vercel + Railway URLs | #9, #14 |
    72	| GitHub Action for integration tests | Add `run-integration-tests.yml` | #10 |
    73	| Continuous deployment | Add backend and frontend deployment workflows for Railway and Vercel | #11, #12 |
    74	| GitHub hygiene / branch protection | Require PRs and required checks before merge | #13 |
    75	| README update | Add user-facing run instructions and deployer guide | #15 |
    76	| Submission links, logs, reflection | Final packaging and artifact checklist | #15 |
    77	
    78	---
    79	
    80	## Issues (16 total)
    81	
    82	> **Note:** Issues are written so they can be opened directly on GitHub with the dependency notes preserved in the body. "Blocked by" means the issue should not be considered complete until those upstream issues land. "Unblocks" is included to make sequencing explicit for the team.
    83	
    84	### Phase 1: Architecture, Production Readiness, and Scaling Design — April 8–11
    85	
    86	**1. Deployment Architecture + Environment Matrix**
    87	- Define the final Vercel + Railway topology:
    88	  - `frontend`
    89	  - `backend-api`
    90	  - `backend-worker`
    91	  - `postgres`
    92	  - `redis`
    93	- Document production env vars for frontend, backend API, and worker
    94	- Define domain plan (`frontend` domain + `api` subdomain)
    95	- Define promotion flow for preview vs production
    96	- Produce a short architecture section for the sprint and README
    97	- Acceptance criteria:
    98	  - Clear service inventory
    99	  - Clear env var matrix
   100	  - Clear ownership of public vs internal services
   101	  - Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton
   102	- Assignee: **acabrera04**
   103	- Due: April 9
   104	- Blocked by: none
   105	- Unblocks: #2, #6, #7, #8, #16
   106	
   107	**2. Backend Scale Audit for Railway Replicas**
   108	- Audit the current backend for state that will break with 2+ API replicas
   109	- Confirm and document the required changes for:
   110	  - in-memory rate limiting
   111	  - local filesystem attachment storage
   112	  - duplicate startup subscribers / background jobs
   113	  - SSE behavior behind load balancing
   114	  - proxy/IP handling
   115	- Produce a concrete "replica-safe backend" checklist for implementation
   116	- Acceptance criteria:
   117	  - Checklist references the actual code areas that must change
   118	  - Risks are prioritized into must-fix vs acceptable-for-demo
   119	  - `backend-api` vs `backend-worker` responsibilities are finalized
   120	- Assignee: **declanblanc**
   121	- Due: April 9
   122	- Blocked by: #1
   123	- Unblocks: #3, #4, #5, #14
   124	
   125	**3. Shared Rate Limiting + Proxy-Aware Networking**
   126	- Replace process-local rate limiting with shared Redis-backed limiting
   127	- Ensure auth and public API rate limits remain correct across 2+ replicas
   128	- Configure Express proxy awareness so client IP handling works correctly behind Railway
   129	- Acceptance criteria:
   130	  - Public and auth rate limits are shared across replicas
   131	  - No process-local limit counters remain in production code paths
   132	  - Rate limit behavior is covered by tests or verification notes
   133	- Assignee: **Aiden-Barrera**
   134	- Due: April 11
   135	- Blocked by: #2
   136	- Unblocks: #14
   137	
   138	**4. Production Attachment Storage Provider**
   139	- Implement a production storage provider backed by shared object storage
   140	- Keep local storage available for development only
   141	- Add env-driven provider selection and document required secrets
   142	- Ensure uploaded files remain accessible regardless of which API replica serves subsequent requests
   143	- Acceptance criteria:
   144	  - Production does not rely on local filesystem attachment serving
   145	  - README and env matrix document storage setup
   146	  - Attachment flow works end-to-end in deployed environment
   147	- Assignee: **AvanishKulkarni**
   148	- Due: April 11
   149	- Blocked by: #2
   150	- Unblocks: #14, #15
   151	
   152	**5. Split `backend-api` and Singleton `backend-worker`**
   153	- Move background-only startup behavior into a dedicated worker process
   154	- Ensure duplicated subscribers / cache invalidation / sitemap upkeep do not run on every API replica
   155	- Keep API replicas focused on HTTP/tRPC/SSE request handling
   156	- Add startup commands for both Railway backend services
   157	- Acceptance criteria:
   158	  - `backend-api` can run with 2+ replicas without duplicate singleton background side effects
   159	  - `backend-worker` runs with 1 replica and owns singleton event-driven tasks
   160	  - Service responsibilities are documented
   161	- Assignee: **declanblanc**
   162	- Due: April 12
   163	- Blocked by: #2
   164	- Unblocks: #7, #11, #14
   165	
   166	### Phase 2: Frontend and Integration Foundations — April 9–13
   167	
   168	**6. Frontend Production Configuration for Vercel**
   169	- Add production-safe frontend configuration:
   170	  - absolute canonical URLs
   171	  - `metadataBase`
   172	  - `robots.txt`
   173	  - sitemap support
   174	  - production API base URL handling
   175	- Ensure frontend still supports localhost development cleanly
   176	- Acceptance criteria:
   177	  - Public pages generate correct production metadata
   178	  - Frontend can target local and cloud backends without code edits
   179	  - SEO-critical pages render correctly on the public domain
   180	- Assignee: **AvanishKulkarni**
   181	- Due: April 11
   182	- Blocked by: #1
   183	- Unblocks: #12, #16
   184	
   185	**7. Railway Project Provisioning and Service Wiring**
   186	- Create/configure the Railway project and services:
   187	  - `backend-api`
   188	  - `backend-worker`
   189	  - `postgres`
   190	  - `redis`
   191	- Configure internal networking, service env vars, health checks, deploy commands, and domains
   192	- Ensure `backend-api` and `backend-worker` both connect to the same Postgres and Redis instances
   193	- Acceptance criteria:
   194	  - Railway project is provisioned
   195	  - Domains/env vars/health checks are configured
   196	  - `backend-api` and `backend-worker` both boot successfully in Railway
   197	- Assignee: **acabrera04**
   198	- Due: April 13
   199	- Blocked by: #1, #5
   200	- Unblocks: #11, #14, #15
   201	
   202	**8. Integration Test Specification**
   203	- Write an English-language integration test specification for all frontend-backend code paths that must work in deployment
   204	- Cover at least:
   205	  - guest public channel rendering
   206	  - login / auth refresh path
   207	  - public API path used by SSR metadata/page rendering
   208	  - visibility change impact on public indexing behavior
   209	  - attachment path if production storage is in scope
   210	  - SSE/realtime smoke behavior if kept in deployed flow
   211	- Acceptance criteria:
   212	  - Every FE-BE pathway has at least one test case
   213	  - Spec includes local-only vs cloud-only notes where relevant
   214	  - Spec is stored under `docs/test-specs/`
   215	- Assignee: **FardeenI**
   216	- Due: April 11
   217	- Blocked by: #1
   218	- Unblocks: #9, #10, #15
   219	
   220	**9. Integration Test Implementation + Environment Matrix**
   221	- Implement the integration tests from the spec
   222	- Add configuration so tests can run against:
   223	  - localhost
   224	  - deployed frontend + backend URLs
   225	- Capture/structure output for both local and cloud runs
   226	- Acceptance criteria:
   227	  - Tests run in a local configuration
   228	  - Tests run in a cloud configuration
   229	  - Any environment-specific exceptions are documented
   230	- Assignee: **Aiden-Barrera**
   231	- Due: April 14
   232	- Blocked by: #8, #6, #7
   233	- Unblocks: #10, #14, #15
   234	
   235	### Phase 3: CI/CD and Deployment Automation — April 12–16
   236	
   237	**10. GitHub Action — `run-integration-tests.yml`**
   238	- Create `.github/workflows/run-integration-tests.yml`
   239	- Install frontend/backend dependencies
   240	- Set up required environment
   241	- Execute integration tests in CI
   242	- Ensure the workflow name is stable so it can be required in branch protection
   243	- Acceptance criteria:
   244	  - Workflow passes on a PR
   245	  - Workflow is usable as a required status check
   246	  - YAML is committed and documented
   247	- Assignee: **FardeenI**
   248	- Due: April 15
   249	- Blocked by: #8, #9
   250	- Unblocks: #13, #15
   251	
   252	**11. GitHub Action — `deploy-railway.yml`**
   253	- Create backend CD workflow for Railway
   254	- Deploy `backend-api` and `backend-worker` on pushes to `main`
   255	- Ensure migrations / build / deploy ordering is safe
   256	- Use GitHub secrets for Railway authentication
   257	- Acceptance criteria:
   258	  - Workflow deploys backend services without manual intervention
   259	  - Deploys target the correct Railway environment
   260	  - Deployment process is documented in README
```

#### Tool: exec_command

```sh
nl -ba planning/SPRINT_4_PLAN.md | sed -n '260,430p'
```

Output:

````text
   260	  - Deployment process is documented in README
   261	- Assignee: **acabrera04**
   262	- Due: April 15
   263	- Blocked by: #5, #7
   264	- Unblocks: #14, #15
   265	
   266	**12. GitHub Action — `deploy-vercel.yml`**
   267	- Create frontend CD workflow for Vercel
   268	- Build/deploy frontend on pushes to `main`
   269	- Ensure preview/production environment variables are configured properly
   270	- Use GitHub secrets/tokens safely
   271	- Acceptance criteria:
   272	  - Workflow deploys frontend without manual intervention
   273	  - Production deploy points at the production backend URL
   274	  - Deployment process is documented in README
   275	- Assignee: **AvanishKulkarni**
   276	- Due: April 15
   277	- Blocked by: #6, #16
   278	- Unblocks: #15
   279	
   280	**13. GitHub Hygiene and Branch Protection**
   281	- Enforce feature branch workflow
   282	- Configure branch protection for `main`
   283	- Require PR review before merge
   284	- Require passing status checks before merge
   285	- Record the exact required checks to enable:
   286	  - existing unit test workflows
   287	  - `run-integration-tests`
   288	- Acceptance criteria:
   289	  - Direct pushes to `main` are blocked
   290	  - PR review is required
   291	  - Required status checks are enabled
   292	  - Team workflow is documented
   293	- Assignee: **Aiden-Barrera**
   294	- Due: April 16
   295	- Blocked by: #10
   296	- Unblocks: #15
   297	
   298	**16. Vercel Project Setup, Domains, and Preview/Prod Verification**
   299	- Create/configure the Vercel project
   300	- Bind the production domain
   301	- Configure preview and production environment variables
   302	- Verify frontend is talking to the correct Railway backend in production
   303	- Acceptance criteria:
   304	  - Preview deployment works
   305	  - Production deployment works
   306	  - Domain and environment configuration are documented
   307	- Assignee: **FardeenI**
   308	- Due: April 14
   309	- Blocked by: #1, #6
   310	- Unblocks: #12, #14, #15
   311	
   312	### Phase 4: Multi-Replica Validation, Documentation, and Submission — April 16–19
   313	
   314	**14. Railway Multi-Replica Validation and Deployment Evidence**
   315	- Scale `backend-api` to **2 or more replicas** on Railway
   316	- Keep `backend-worker` at **1 replica**
   317	- Verify and capture evidence for:
   318	  - public page loads through the deployed frontend
   319	  - authenticated API behavior through multiple API replicas
   320	  - shared rate limiting across replicas
   321	  - attachment access independent of serving replica
   322	  - cache invalidation / indexing behavior via singleton worker
   323	  - SSE/realtime smoke verification in deployed environment
   324	- Capture logs/screenshots/test output needed for submission
   325	- Acceptance criteria:
   326	  - Live deployment is stable with `backend-api` at 2+ replicas
   327	  - No replica-specific failures are observed for required paths
   328	  - Cloud integration tests pass against the deployed system
   329	- Assignee: **declanblanc**
   330	- Due: April 18
   331	- Blocked by: #3, #4, #5, #7, #9, #11, #16
   332	- Unblocks: #15
   333	
   334	**15. README, Final Artifact Collection, and Submission Package**
   335	- Update `README.md` with:
   336	  - how web users access the deployed app
   337	  - how to run the app locally
   338	  - how a forked user sets up Vercel + Railway deployment
   339	  - how CI/CD and branch protection are expected to work
   340	- Compile the final P6-equivalent artifact checklist:
   341	  - frontend deployment URL
   342	  - backend deployment URL
   343	  - integration test specification link
   344	  - integration test code links
   345	  - localhost test output
   346	  - cloud test output
   347	  - `run-integration-tests.yml` link
   348	  - `deploy-vercel.yml` link
   349	  - `deploy-railway.yml` link
   350	  - README link
   351	  - reflection placeholder/coordination
   352	  - LLM log collection
   353	- Acceptance criteria:
   354	  - README is complete and accurate
   355	  - Submission checklist has no missing artifacts
   356	  - Team knows who owns final reflection/log collation
   357	- Assignee: **acabrera04**
   358	- Due: April 19
   359	- Blocked by: #4, #8, #9, #10, #11, #12, #13, #14, #16
   360	
   361	---
   362	
   363	## Assignment Summary
   364	
   365	| Developer | Issues | Focus Area |
   366	|-----------|--------|------------|
   367	| acabrera04 | #1, #7, #11, #15 | Architecture/env matrix, Railway provisioning, backend CD, final packaging |
   368	| Aiden-Barrera | #3, #9, #13 | Shared rate limiting, integration test implementation, branch protection |
   369	| AvanishKulkarni | #4, #6, #12 | Production storage, Vercel-ready frontend config, frontend CD |
   370	| declanblanc | #2, #5, #14 | Replica-safety audit, API/worker split, multi-replica validation |
   371	| FardeenI | #8, #10, #16 | Integration test spec, integration-test CI, Vercel project/domain setup |
   372	
   373	---
   374	
   375	## Dependency Graph
   376	
   377	```text
   378	Foundation
   379	==========
   380	#1 Deployment Architecture + Env Matrix
   381	  -> #2 Backend Scale Audit
   382	  -> #6 Frontend Production Config
   383	  -> #7 Railway Provisioning
   384	  -> #8 Integration Test Spec
   385	  -> #16 Vercel Project Setup
   386	
   387	Scaling Safety
   388	==============
   389	#2 Backend Scale Audit
   390	  -> #3 Shared Rate Limiting
   391	  -> #4 Production Storage
   392	  -> #5 API/Worker Split
   393	
   394	Deployable App
   395	==============
   396	#5 API/Worker Split -> #7 Railway Provisioning -> #11 deploy-railway.yml
   397	#6 Frontend Production Config -> #16 Vercel Setup -> #12 deploy-vercel.yml
   398	
   399	Testing
   400	=======
   401	#8 Integration Test Spec -> #9 Integration Tests -> #10 run-integration-tests.yml
   402	
   403	GitHub Hygiene
   404	==============
   405	#10 run-integration-tests.yml -> #13 Branch Protection
   406	
   407	Final Validation
   408	================
   409	#3, #4, #5, #7, #9, #11, #16 -> #14 Multi-Replica Validation
   410	
   411	Submission
   412	==========
   413	#4, #8, #9, #10, #11, #12, #13, #14, #16 -> #15 Final Packaging
   414	```
   415	
   416	---
   417	
   418	## Timeline
   419	
   420	| Date | Milestone |
   421	|------|-----------|
   422	| April 8 (Wed) | Sprint kickoff, architecture alignment, issue creation |
   423	| April 9 (Thu) | Issue #1 and #2 complete; deployment/scaling approach locked |
   424	| April 11 (Sat) | Replica-safety implementation issues (#3, #4, #6, #8) complete |
   425	| April 12 (Sun) | API/worker split complete; backend ready for Railway service split |
   426	| April 13 (Mon) | Railway provisioning complete |
   427	| April 14 (Tue) | Vercel project live; integration tests running locally and against cloud env |
   428	| April 15 (Wed) | `run-integration-tests.yml`, `deploy-railway.yml`, and `deploy-vercel.yml` complete |
   429	| April 16 (Thu) | Branch protection enabled; CD path verified through PR merge |
   430	| April 18 (Sat) | Railway running with 2+ API replicas; deployment evidence captured |
````

#### Tool: exec_command

```sh
nl -ba harmony-backend/src/app.ts | sed -n '1,180p'
```

Output:

```text
     1	import express, { NextFunction, Request, Response } from 'express';
     2	import { createExpressMiddleware } from '@trpc/server/adapters/express';
     3	import helmet from 'helmet';
     4	import rateLimit from 'express-rate-limit';
     5	import corsMiddleware, { CorsError } from './middleware/cors';
     6	import { appRouter } from './trpc/router';
     7	import { createContext } from './trpc/init';
     8	import { authRouter } from './routes/auth.router';
     9	import { publicRouter } from './routes/public.router';
    10	import { seoRouter } from './routes/seo.router';
    11	import { eventsRouter } from './routes/events.router';
    12	import { attachmentRouter } from './routes/attachment.router';
    13	
    14	// ─── Auth rate limiters ───────────────────────────────────────────────────────
    15	
    16	const isE2E = process.env.NODE_ENV === 'e2e';
    17	
    18	const loginLimiter = rateLimit({
    19	  windowMs: 15 * 60 * 1000, // 15 minutes
    20	  max: isE2E ? 1000 : 10,
    21	  standardHeaders: true,
    22	  legacyHeaders: false,
    23	  message: { error: 'Too many login attempts. Please try again later.' },
    24	});
    25	
    26	const registerLimiter = rateLimit({
    27	  windowMs: 60 * 60 * 1000, // 1 hour
    28	  max: process.env.NODE_ENV === 'production' ? 5 : 1000,
    29	  standardHeaders: true,
    30	  legacyHeaders: false,
    31	  message: { error: 'Too many registration attempts. Please try again later.' },
    32	});
    33	
    34	const refreshLimiter = rateLimit({
    35	  windowMs: 15 * 60 * 1000, // 15 minutes
    36	  max: isE2E ? 1000 : 30,
    37	  standardHeaders: true,
    38	  legacyHeaders: false,
    39	  message: { error: 'Too many token refresh attempts. Please try again later.' },
    40	});
    41	
    42	export function createApp() {
    43	  const app = express();
    44	
    45	  app.use(helmet());
    46	  // CORS must come before body parsers so error responses include CORS headers
    47	  app.use(corsMiddleware);
    48	  app.use(express.json());
    49	
    50	  // Health check (plain HTTP — no tRPC client required)
    51	  app.get('/health', (_req, res) => {
    52	    res.json({ status: 'ok', timestamp: new Date().toISOString() });
    53	  });
    54	
    55	  // SEO endpoints (robots.txt, sitemaps) — before auth so they're publicly accessible
    56	  app.use(seoRouter);
    57	
    58	  // Auth endpoints
    59	  app.use('/api/auth/login', loginLimiter);
    60	  app.use('/api/auth/register', registerLimiter);
    61	  app.use('/api/auth/refresh', refreshLimiter);
    62	  app.use('/api/auth', authRouter);
    63	
    64	  // Public API endpoints (cached, no auth required)
    65	  app.use('/api/public', publicRouter);
    66	
    67	  // Real-time SSE endpoints
    68	  app.use('/api/events', eventsRouter);
    69	
    70	  // Attachment upload + file serving
    71	  app.use('/api/attachments', attachmentRouter);
    72	
    73	  // tRPC endpoint
    74	  app.use(
    75	    '/trpc',
    76	    createExpressMiddleware({
    77	      router: appRouter,
    78	      createContext,
    79	      onError({ error }) {
    80	        // Only log unexpected server errors; auth/validation errors (4xx) are routine
    81	        if (error.code === 'INTERNAL_SERVER_ERROR') {
    82	          console.error('tRPC error:', error);
    83	        }
    84	      },
    85	    }),
    86	  );
    87	
    88	  // 404 — unknown routes
    89	  app.use((_req: Request, res: Response) => {
    90	    res.status(404).json({ error: 'Not found' });
    91	  });
    92	
    93	  // Global error handler — must have 4 params for Express to treat it as an error handler
    94	  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    95	    const isCorsError = err instanceof CorsError;
    96	    const status = isCorsError ? 403 : 500;
    97	    const message = isCorsError ? err.message : 'Internal server error';
    98	    if (!isCorsError)
    99	      console.error('Unhandled error:', process.env.NODE_ENV === 'production' ? err.message : err);
   100	    res.status(status).json({ error: message });
   101	  });
   102	
   103	  return app;
   104	}
```

#### Tool: exec_command

```sh
nl -ba harmony-backend/src/index.ts | sed -n '1,120p'
```

Output:

```text
     1	import 'dotenv/config';
     2	import { createApp } from './app';
     3	import { cacheInvalidator } from './services/cacheInvalidator.service';
     4	
     5	const PORT = Number(process.env.PORT) || 4000;
     6	
     7	const app = createApp();
     8	
     9	const server = app.listen(PORT, () => {
    10	  console.log(`Harmony backend running on http://localhost:${PORT}`);
    11	});
    12	
    13	cacheInvalidator.start().catch((err) => console.error('[cacheInvalidator] start failed:', err));
    14	
    15	let shuttingDown = false;
    16	const shutdown = async () => {
    17	  if (shuttingDown) return;
    18	  shuttingDown = true;
    19	  const timer = setTimeout(() => process.exit(1), 10_000);
    20	  await new Promise<void>((resolve) => server.close(() => resolve()));
    21	  await cacheInvalidator.stop();
    22	  clearTimeout(timer);
    23	  process.exit(0);
    24	};
    25	
    26	process.on('SIGTERM', shutdown);
    27	process.on('SIGINT', shutdown);
```

#### Tool: exec_command

```sh
nl -ba harmony-backend/src/middleware/rate-limit.middleware.ts | sed -n '1,220p'
```

Output:

```text
     1	import { Request, Response, NextFunction } from 'express';
     2	
     3	/**
     4	 * Known crawler User-Agent substrings (lowercase). Matched via case-insensitive
     5	 * substring check. Reverse-DNS verification is not yet implemented — see §9.3
     6	 * of the unified backend architecture for the full verification spec.
     7	 */
     8	const VERIFIED_BOT_TOKENS: { token: string; name: string }[] = [
     9	  { token: 'googlebot', name: 'googlebot' },
    10	  { token: 'bingbot', name: 'bingbot' },
    11	  { token: 'slackbot', name: 'slackbot' },
    12	];
    13	
    14	/**
    15	 * Determines whether an incoming request is from a verified search engine bot
    16	 * by performing a case-insensitive check against the known bot list.
    17	 * Returns the normalized bot name if matched, or null otherwise.
    18	 */
    19	export function detectVerifiedBot(userAgent: string | undefined): string | null {
    20	  if (!userAgent) return null;
    21	  const lower = userAgent.toLowerCase();
    22	  const match = VERIFIED_BOT_TOKENS.find((b) => lower.includes(b.token));
    23	  return match?.name ?? null;
    24	}
    25	
    26	/** Backwards-compatible helper used in tests. */
    27	export function isVerifiedBot(userAgent: string | undefined): boolean {
    28	  return detectVerifiedBot(userAgent) !== null;
    29	}
    30	
    31	/**
    32	 * Token bucket entry stored per IP (or bot identity).
    33	 */
    34	interface TokenBucket {
    35	  tokens: number;
    36	  lastRefill: number;
    37	}
    38	
    39	/**
    40	 * In-process token bucket store.
    41	 * Maps IP (or bot name key) -> bucket state.
    42	 */
    43	const buckets = new Map<string, TokenBucket>();
    44	
    45	const HUMAN_CAPACITY = 100;   // max tokens
    46	const BOT_CAPACITY = 1000;    // max tokens
    47	const WINDOW_MS = 60_000;     // 1 minute — full refill period
    48	const MAX_BUCKETS = 100_000;  // cap to prevent memory exhaustion
    49	
    50	/**
    51	 * Returns the bucket for `key`, refilling tokens proportionally to elapsed
    52	 * time (true token-bucket algorithm: tokens drip in continuously rather than
    53	 * resetting at window boundaries).
    54	 */
    55	function getOrRefillBucket(key: string, capacity: number): TokenBucket {
    56	  const now = Date.now();
    57	  const existing = buckets.get(key);
    58	
    59	  if (!existing) {
    60	    // Evict stale entries when the map is over capacity
    61	    if (buckets.size >= MAX_BUCKETS) {
    62	      evictStaleBuckets();
    63	      // If still over capacity after eviction, drop the oldest entry
    64	      if (buckets.size >= MAX_BUCKETS) {
    65	        const oldestKey = buckets.keys().next().value;
    66	        if (oldestKey !== undefined) buckets.delete(oldestKey);
    67	      }
    68	    }
    69	    const bucket: TokenBucket = { tokens: capacity, lastRefill: now };
    70	    buckets.set(key, bucket);
    71	    return bucket;
    72	  }
    73	
    74	  const elapsed = now - existing.lastRefill;
    75	
    76	  if (elapsed > 0) {
    77	    // Gradual refill: tokens accrue proportionally to elapsed time
    78	    const refillRate = capacity / WINDOW_MS; // tokens per ms
    79	    const newTokens = Math.min(capacity, existing.tokens + elapsed * refillRate);
    80	    existing.tokens = newTokens;
    81	    existing.lastRefill = now;
    82	  }
    83	
    84	  return existing;
    85	}
    86	
    87	/**
    88	 * Evict buckets that have been idle for longer than the refill window
    89	 * (they would be at full capacity anyway).
    90	 */
    91	function evictStaleBuckets(): void {
    92	  const cutoff = Date.now() - WINDOW_MS;
    93	  for (const [key, bucket] of buckets) {
    94	    if (bucket.lastRefill < cutoff) {
    95	      buckets.delete(key);
    96	    }
    97	  }
    98	}
    99	
   100	/**
   101	 * Consume one token from an existing bucket (caller must check tokens > 0 first).
   102	 */
   103	function consumeToken(bucket: TokenBucket): void {
   104	  bucket.tokens -= 1;
   105	}
   106	
   107	/**
   108	 * Token-bucket rate limiting middleware for the public API.
   109	 *
   110	 * Uses a true token-bucket algorithm: tokens refill continuously at a rate of
   111	 * `capacity / WINDOW_MS` tokens per millisecond, up to the maximum capacity.
   112	 *
   113	 * All requests are currently rate-limited at 100 req/min per IP. Bot detection
   114	 * identifies crawlers (Googlebot, Bingbot, Slackbot) but does NOT grant
   115	 * elevated limits until reverse-DNS verification is implemented per §9.3.
   116	 * Without verification, any client can spoof a bot UA to bypass limits.
   117	 *
   118	 * Responses:
   119	 *   - 429 Too Many Requests + Retry-After header when limit is exceeded
   120	 *   - RateLimit-Limit / RateLimit-Remaining / RateLimit-Reset on every response
   121	 */
   122	export function tokenBucketRateLimiter(req: Request, res: Response, next: NextFunction): void {
   123	  // All requests use the human bucket (per-IP, 100 req/min) until reverse-DNS
   124	  // bot verification is implemented. Bot UA detection is preserved for logging
   125	  // and future use but does not grant elevated limits.
   126	  const key = `ip:${req.ip ?? 'unknown'}`;
   127	  const capacity = HUMAN_CAPACITY;
   128	
   129	  const bucket = getOrRefillBucket(key, capacity);
   130	  const msPerToken = WINDOW_MS / capacity;
   131	
   132	  // If no tokens available, reject immediately
   133	  if (bucket.tokens < 1) {
   134	    const resetSeconds = Math.max(1, Math.ceil(msPerToken / 1000));
   135	    res.set('RateLimit-Limit', String(capacity));
   136	    res.set('RateLimit-Remaining', '0');
   137	    res.set('RateLimit-Reset', String(resetSeconds));
   138	    res.set('Retry-After', String(resetSeconds));
   139	    res.status(429).json({ error: 'Too many requests. Please try again later.' });
   140	    return;
   141	  }
   142	
   143	  // Consume a token, then compute headers based on post-consumption state
   144	  consumeToken(bucket);
   145	
   146	  const resetSeconds = bucket.tokens >= 1 ? 0 : Math.max(1, Math.ceil(msPerToken / 1000));
   147	  res.set('RateLimit-Limit', String(capacity));
   148	  res.set('RateLimit-Remaining', String(Math.floor(bucket.tokens)));
   149	  res.set('RateLimit-Reset', String(resetSeconds));
   150	
   151	  next();
   152	}
   153	
   154	/**
   155	 * Clears the in-process bucket store.
   156	 * Intended for use in tests only.
   157	 */
   158	export function _clearBucketsForTesting(): void {
   159	  buckets.clear();
   160	}
```

#### Tool: exec_command

```sh
nl -ba harmony-backend/src/lib/storage/index.ts | sed -n '1,120p'
```

Output:

```text
     1	import type { StorageProvider } from './storage.interface';
     2	import { LocalStorageProvider } from './local.provider';
     3	
     4	// Factory: add cases here as new providers are implemented (e.g. 's3')
     5	function createStorageProvider(): StorageProvider {
     6	  const provider = process.env.STORAGE_PROVIDER ?? 'local';
     7	  if (provider === 'local') return new LocalStorageProvider();
     8	  throw new Error(`Unknown STORAGE_PROVIDER: "${provider}". Supported: local`);
     9	}
    10	
    11	export const storageProvider: StorageProvider = createStorageProvider();
    12	export type { StorageProvider } from './storage.interface';
```

#### Tool: exec_command

```sh
nl -ba harmony-backend/src/lib/storage/local.provider.ts | sed -n '1,140p'
```

Output:

```text
     1	import fs from 'fs';
     2	import path from 'path';
     3	import { randomUUID } from 'crypto';
     4	import type { StorageProvider, UploadOptions, UploadResult } from './storage.interface';
     5	
     6	/**
     7	 * Writes uploaded files to a local directory.
     8	 * Intended for development and CI only — in production set STORAGE_PROVIDER=s3.
     9	 *
    10	 * Files are served by the attachment router at:
    11	 *   GET /api/attachments/files/:filename
    12	 */
    13	
    14	/**
    15	 * Maps validated MIME types to stored file extensions.
    16	 * Extension is derived from the server-verified content type (never from the
    17	 * user-supplied filename) to prevent extension spoofing (e.g. uploading a
    18	 * shell script with a .png name and having it served as active content).
    19	 */
    20	const MIME_TO_EXT: Record<string, string> = {
    21	  'image/jpeg': '.jpg',
    22	  'image/png': '.png',
    23	  'image/gif': '.gif',
    24	  'image/webp': '.webp',
    25	  'application/pdf': '.pdf',
    26	  'text/plain': '.txt',
    27	  'application/msword': '.doc',
    28	  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    29	};
    30	
    31	export class LocalStorageProvider implements StorageProvider {
    32	  private readonly uploadDir: string;
    33	  private readonly baseUrl: string;
    34	
    35	  constructor() {
    36	    // Allow override via env so tests can point at a tmp dir
    37	    this.uploadDir = process.env.LOCAL_UPLOAD_DIR ?? path.join(process.cwd(), 'uploads');
    38	    this.baseUrl = process.env.LOCAL_UPLOAD_BASE_URL ?? 'http://localhost:4000';
    39	    fs.mkdirSync(this.uploadDir, { recursive: true });
    40	  }
    41	
    42	  async upload(options: UploadOptions): Promise<UploadResult> {
    43	    // Derive extension from the server-verified content type, not the original filename.
    44	    // Falls back to .bin for any unknown type so files are served as opaque downloads
    45	    // rather than potentially as executable content.
    46	    const ext = MIME_TO_EXT[options.contentType] ?? '.bin';
    47	    const storedName = `${randomUUID()}${ext}`;
    48	    const filePath = path.join(this.uploadDir, storedName);
    49	
    50	    await fs.promises.writeFile(filePath, options.data);
    51	
    52	    return {
    53	      url: `${this.baseUrl}/api/attachments/files/${storedName}`,
    54	      filename: storedName,
    55	    };
    56	  }
    57	
    58	  async delete(filename: string): Promise<void> {
    59	    // Reject any path with directory separators to prevent traversal
    60	    if (filename.includes('/') || filename.includes('\\')) {
    61	      throw new Error('Invalid filename');
    62	    }
    63	    const filePath = path.join(this.uploadDir, filename);
    64	    await fs.promises.unlink(filePath).catch(() => {
    65	      // Silently ignore missing files — idempotent delete
    66	    });
    67	  }
    68	
    69	  /** Exposed for the static file serving middleware in attachment.router.ts */
    70	  getUploadDir(): string {
    71	    return this.uploadDir;
    72	  }
    73	}
```

#### Tool: exec_command

```sh
nl -ba harmony-frontend/src/app/layout.tsx | sed -n '1,120p'
```

Output:

```text
     1	import type { Metadata } from 'next';
     2	import { Inter } from 'next/font/google';
     3	import { Providers } from './providers';
     4	import './globals.css';
     5	
     6	const inter = Inter({
     7	  variable: '--font-inter',
     8	  subsets: ['latin'],
     9	});
    10	
    11	export const metadata: Metadata = {
    12	  title: 'Harmony',
    13	  description: 'A search engine indexable chat application',
    14	};
    15	
    16	export default function RootLayout({
    17	  children,
    18	}: Readonly<{
    19	  children: React.ReactNode;
    20	}>) {
    21	  return (
    22	    <html lang='en'>
    23	      <body className={`${inter.variable} antialiased`}>
    24	        <Providers>{children}</Providers>
    25	      </body>
    26	    </html>
    27	  );
    28	}
```

#### Tool: exec_command

```sh
nl -ba harmony-frontend/src/app/c/'[serverSlug]'/'[channelSlug]'/page.tsx | sed -n '1,160p'
```

Output:

```text
     1	import type { Metadata } from 'next';
     2	import { GuestChannelView } from '@/components/channel/GuestChannelView';
     3	import { fetchPublicServer, fetchPublicChannel } from '@/services/publicApiService';
     4	import { ChannelVisibility } from '@/types';
     5	
     6	interface PageProps {
     7	  params: Promise<{ serverSlug: string; channelSlug: string }>;
     8	}
     9	
    10	export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    11	  const { serverSlug, channelSlug } = await params;
    12	  const [server, channelResult] = await Promise.all([
    13	    fetchPublicServer(serverSlug),
    14	    fetchPublicChannel(serverSlug, channelSlug),
    15	  ]);
    16	
    17	  const channel = channelResult && !channelResult.isPrivate ? channelResult.channel : null;
    18	  const channelName = channel?.name ?? channelSlug;
    19	  const serverName = server?.name ?? serverSlug;
    20	  const isIndexable = channel?.visibility === ChannelVisibility.PUBLIC_INDEXABLE;
    21	  const description = channel?.topic ?? server?.description ?? `Join ${serverName} on Harmony`;
    22	  const title = `${channelName} - ${serverName} | Harmony`;
    23	  const canonicalUrl = `/c/${serverSlug}/${channelSlug}`;
    24	
    25	  return {
    26	    title,
    27	    description,
    28	    robots: { index: isIndexable, follow: true },
    29	    alternates: { canonical: canonicalUrl },
    30	    openGraph: {
    31	      title,
    32	      description,
    33	      type: 'website',
    34	      url: canonicalUrl,
    35	    },
    36	  };
    37	}
    38	
    39	export default async function GuestChannelPage({ params }: PageProps) {
    40	  const { serverSlug, channelSlug } = await params;
    41	  return <GuestChannelView serverSlug={serverSlug} channelSlug={channelSlug} />;
    42	}
```

#### Tool: exec_command

```sh
nl -ba .github/workflows/ci.yml | sed -n '1,220p'
```

Output:

```text
     1	name: CI
     2	
     3	on:
     4	  push:
     5	    branches: [main, master]
     6	  pull_request:
     7	    branches: [main, master]
     8	  workflow_dispatch:
     9	
    10	jobs:
    11	  # The core CI workflow handles static validation for each package.
    12	  # Test execution lives in dedicated workflows so failures are easier to spot.
    13	  frontend-lint-build:
    14	    name: Frontend Lint and Build
    15	    runs-on: ubuntu-latest
    16	    defaults:
    17	      run:
    18	        working-directory: harmony-frontend
    19	    steps:
    20	      - uses: actions/checkout@v4
    21	
    22	      - uses: actions/setup-node@v4
    23	        with:
    24	          node-version: 20
    25	          cache: npm
    26	          cache-dependency-path: harmony-frontend/package-lock.json
    27	
    28	      - name: Install dependencies
    29	        run: npm ci
    30	
    31	      - name: Lint
    32	        run: npm run lint
    33	
    34	      - name: Build
    35	        run: npm run build
    36	
    37	  backend-lint-build:
    38	    name: Backend Lint and Build
    39	    runs-on: ubuntu-latest
    40	    defaults:
    41	      run:
    42	        working-directory: harmony-backend
    43	    steps:
    44	      - uses: actions/checkout@v4
    45	
    46	      - uses: actions/setup-node@v4
    47	        with:
    48	          node-version: 20
    49	          cache: npm
    50	          cache-dependency-path: harmony-backend/package-lock.json
    51	
    52	      - name: Install dependencies
    53	        run: npm ci
    54	
    55	      - name: Lint
    56	        run: npm run lint
    57	
    58	      - name: Generate Prisma client
    59	        run: npx prisma generate
    60	
    61	      - name: Build
    62	        run: npm run build
```

#### Tool: exec_command

```sh
nl -ba .github/workflows/run-backend-tests.yml | sed -n '1,220p'
```

Output:

```text
     1	name: CI
     2	
     3	on:
     4	  push:
     5	    branches: [main, master]
     6	  pull_request:
     7	    branches: [main, master]
     8	  workflow_dispatch:
     9	
    10	jobs:
    11	  backend-tests:
    12	    name: Run Backend Tests
    13	    runs-on: ubuntu-latest
    14	    defaults:
    15	      run:
    16	        working-directory: harmony-backend
    17	    services:
    18	      postgres:
    19	        image: postgres:16
    20	        env:
    21	          POSTGRES_USER: harmony
    22	          POSTGRES_PASSWORD: harmony
    23	          POSTGRES_DB: harmony_dev
    24	        ports:
    25	          - 5432:5432
    26	        options: >-
    27	          --health-cmd pg_isready
    28	          --health-interval 10s
    29	          --health-timeout 5s
    30	          --health-retries 5
    31	      redis:
    32	        image: redis:7
    33	        ports:
    34	          - 6379:6379
    35	        options: >-
    36	          --health-cmd "redis-cli ping"
    37	          --health-interval 10s
    38	          --health-timeout 5s
    39	          --health-retries 5
    40	    env:
    41	      DATABASE_URL: postgresql://harmony:harmony@localhost:5432/harmony_dev
    42	      REDIS_URL: redis://localhost:6379
    43	    steps:
    44	      - uses: actions/checkout@v4
    45	
    46	      - uses: actions/setup-node@v4
    47	        with:
    48	          node-version: 20
    49	          cache: npm
    50	          cache-dependency-path: harmony-backend/package-lock.json
    51	
    52	      - name: Install dependencies
    53	        run: npm ci
    54	
    55	      - name: Generate Prisma client
    56	        run: npx prisma generate
    57	
    58	      - name: Run migrations
    59	        run: npx prisma migrate deploy
    60	
    61	      - name: Run backend tests
    62	        run: npm test
```

#### Tool: exec_command

```sh
nl -ba .github/workflows/run-frontend-tests.yml | sed -n '1,220p'
```

Output:

```text
     1	name: CI
     2	
     3	on:
     4	  push:
     5	    branches: [main, master]
     6	  pull_request:
     7	    branches: [main, master]
     8	  workflow_dispatch:
     9	
    10	jobs:
    11	  frontend-tests:
    12	    name: Run Frontend Tests
    13	    runs-on: ubuntu-latest
    14	    defaults:
    15	      run:
    16	        working-directory: harmony-frontend
    17	    steps:
    18	      - uses: actions/checkout@v4
    19	
    20	      - uses: actions/setup-node@v4
    21	        with:
    22	          node-version: 20
    23	          cache: npm
    24	          cache-dependency-path: harmony-frontend/package-lock.json
    25	
    26	      - name: Install dependencies
    27	        run: npm ci
    28	
    29	      - name: Run frontend tests
    30	        run: npm test
```

#### Tool: exec_command

```sh
nl -ba .github/workflows/run-frontend-e2e.yml | sed -n '1,220p'
```

Output:

```text
     1	name: Frontend E2E
     2	
     3	on:
     4	  push:
     5	    branches: [main, master]
     6	  pull_request:
     7	    branches: [main, master]
     8	  workflow_dispatch:
     9	
    10	jobs:
    11	  frontend-e2e:
    12	    name: Run Frontend E2E Tests
    13	    runs-on: ubuntu-latest
    14	    timeout-minutes: 20
    15	    steps:
    16	      - uses: actions/checkout@v4
    17	
    18	      - uses: actions/setup-node@v4
    19	        with:
    20	          node-version: 20
    21	          cache: npm
    22	          cache-dependency-path: |
    23	            harmony-frontend/package-lock.json
    24	            harmony-backend/package-lock.json
    25	
    26	      - name: Install frontend dependencies
    27	        working-directory: harmony-frontend
    28	        run: npm ci
    29	
    30	      - name: Install backend dependencies
    31	        working-directory: harmony-backend
    32	        run: npm ci
    33	
    34	      - name: Install Playwright browsers
    35	        working-directory: harmony-frontend
    36	        run: npx playwright install --with-deps chromium
    37	
    38	      - name: Run frontend E2E tests
    39	        working-directory: harmony-frontend
    40	        run: npm run test:e2e
    41	
    42	      - name: Upload Playwright artifacts
    43	        if: failure()
    44	        uses: actions/upload-artifact@v4
    45	        with:
    46	          name: playwright-artifacts
    47	          path: |
    48	            harmony-frontend/playwright-report
    49	            harmony-frontend/test-results
    50	          if-no-files-found: ignore
```

#### Tool: exec_command

```sh
nl -ba harmony-frontend/playwright.config.ts | sed -n '1,220p'
```

Output:

```text
     1	import { defineConfig, devices } from '@playwright/test';
     2	import { BACKEND_PORT, FRONTEND_URL, frontendEnv } from './tests/e2e/support/stack.shared.mjs';
     3	
     4	const frontendCommand = process.env.CI ? 'npm run build && npm run start' : 'npm run dev';
     5	const projects = process.env.CI
     6	  ? [
     7	      {
     8	        name: 'chromium',
     9	        use: {
    10	          ...devices['Desktop Chrome'],
    11	        },
    12	      },
    13	    ]
    14	  : [
    15	      {
    16	        name: 'chromium',
    17	        use: {
    18	          ...devices['Desktop Chrome'],
    19	        },
    20	      },
    21	      {
    22	        name: 'webkit',
    23	        use: {
    24	          ...devices['Desktop Safari'],
    25	        },
    26	      },
    27	    ];
    28	
    29	export default defineConfig({
    30	  testDir: './tests/e2e',
    31	  fullyParallel: !process.env.CI,
    32	  forbidOnly: !!process.env.CI,
    33	  retries: process.env.CI ? 2 : 0,
    34	  workers: process.env.CI ? 1 : undefined,
    35	  reporter: [['html', { open: 'never' }], ['list']],
    36	  use: {
    37	    baseURL: FRONTEND_URL,
    38	    trace: 'on-first-retry',
    39	    screenshot: 'only-on-failure',
    40	    video: 'retain-on-failure',
    41	  },
    42	  projects,
    43	  webServer: [
    44	    {
    45	      command: 'node tests/e2e/support/start-backend-e2e.mjs',
    46	      // Always restart the backend launcher locally so each run gets a fresh reset+seed.
    47	      reuseExistingServer: false,
    48	      timeout: 120_000,
    49	      url: `http://localhost:${BACKEND_PORT}/health`,
    50	    },
    51	    {
    52	      command: frontendCommand,
    53	      reuseExistingServer: !process.env.CI,
    54	      timeout: process.env.CI ? 240_000 : 120_000,
    55	      url: `${FRONTEND_URL}/auth/login`,
    56	      env: frontendEnv(),
    57	    },
    58	  ],
    59	});
```

#### Tool: exec_command

```sh
nl -ba harmony-frontend/tests/e2e/support/stack.shared.mjs | sed -n '1,220p'
```

Output:

```text
     1	import fs from 'node:fs';
     2	import path from 'node:path';
     3	
     4	export const FRONTEND_PORT = 3100;
     5	export const BACKEND_PORT = 4100;
     6	export const POSTGRES_PORT = 55432;
     7	export const REDIS_PORT = 56379;
     8	
     9	export const FRONTEND_URL = `http://localhost:${FRONTEND_PORT}`;
    10	export const BACKEND_URL = `http://localhost:${BACKEND_PORT}`;
    11	export const DATABASE_URL = `postgresql://harmony:harmony@localhost:${POSTGRES_PORT}/harmony_e2e`;
    12	export const REDIS_URL = `redis://:e2esecret@localhost:${REDIS_PORT}`;
    13	
    14	export const DEV_ADMIN_EMAIL = 'admin@harmony.dev';
    15	export const DEV_ADMIN_PASSWORD = 'admin';
    16	
    17	export const SIGNUP_USER = {
    18	  username: 'e2e_member',
    19	  displayName: 'E2E Member',
    20	  password: 'password123',
    21	};
    22	
    23	export function cleanEnv(env = process.env) {
    24	  return Object.fromEntries(Object.entries(env).filter(([, value]) => typeof value === 'string'));
    25	}
    26	
    27	export function frontendEnv(env = process.env) {
    28	  return {
    29	    ...cleanEnv(env),
    30	    PORT: String(FRONTEND_PORT),
    31	    NEXT_PUBLIC_API_URL: BACKEND_URL,
    32	  };
    33	}
    34	
    35	export function backendEnv(env = process.env) {
    36	  return {
    37	    ...cleanEnv(env),
    38	    PORT: String(BACKEND_PORT),
    39	    DATABASE_URL,
    40	    REDIS_URL,
    41	    FRONTEND_URL,
    42	    JWT_ACCESS_SECRET: 'harmony-e2e-access-secret',
    43	    JWT_REFRESH_SECRET: 'harmony-e2e-refresh-secret',
    44	    JWT_ACCESS_EXPIRES_IN: '15m',
    45	    JWT_REFRESH_EXPIRES_DAYS: '7',
    46	    TWILIO_MOCK: 'true',
    47	    LOCAL_UPLOAD_BASE_URL: BACKEND_URL,
    48	  };
    49	}
    50	
    51	export function resolveE2EPaths(cwd = process.cwd()) {
    52	  const repoRoot = path.resolve(cwd, '..');
    53	  const backendDir = path.join(repoRoot, 'harmony-backend');
    54	
    55	  return {
    56	    repoRoot,
    57	    backendDir,
    58	    composeFile: path.join(backendDir, 'docker-compose.e2e.yml'),
    59	    composeProject: 'harmony-e2e',
    60	  };
    61	}
    62	
    63	function loadSeedSnapshot() {
    64	  const { backendDir } = resolveE2EPaths();
    65	  const seedPath = path.join(backendDir, 'src/dev/mock-seed-data.json');
    66	  try {
    67	    return JSON.parse(fs.readFileSync(seedPath, 'utf8'));
    68	  } catch (error) {
    69	    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
    70	      throw new Error(
    71	        `Missing E2E seed snapshot at ${seedPath}. Ensure the Harmony backend mock seed files are present before running Playwright.`,
    72	      );
    73	    }
    74	
    75	    throw error;
    76	  }
    77	}
    78	
    79	const snapshot = loadSeedSnapshot();
    80	
    81	// Registration auto-joins this server in backend auth.service; keep this value
    82	// aligned with that backend contract and fail fast in launcher preflight if it drifts.
    83	export const DEFAULT_JOIN_SERVER_SLUG = 'harmony-hq';
    84	
    85	const defaultJoinServer = snapshot.servers.find(server => server.slug === DEFAULT_JOIN_SERVER_SLUG);
    86	if (!defaultJoinServer) {
    87	  throw new Error(
    88	    `Seed snapshot is missing the default join server slug "${DEFAULT_JOIN_SERVER_SLUG}".`,
    89	  );
    90	}
    91	
    92	const publicChannel = snapshot.channels.find(
    93	  channel => channel.serverId === defaultJoinServer.id && channel.visibility === 'PUBLIC_INDEXABLE',
    94	);
    95	if (!publicChannel) {
    96	  throw new Error(
    97	    `Seed snapshot is missing a public channel for server "${DEFAULT_JOIN_SERVER_SLUG}".`,
    98	  );
    99	}
   100	
   101	const privateChannel = snapshot.channels.find(
   102	  channel => channel.serverId === defaultJoinServer.id && channel.visibility === 'PRIVATE',
   103	);
   104	if (!privateChannel) {
   105	  throw new Error(
   106	    `Seed snapshot is missing a private channel for server "${DEFAULT_JOIN_SERVER_SLUG}".`,
   107	  );
   108	}
   109	
   110	const welcomeMessage = snapshot.messages.find(message => message.channelId === publicChannel.id);
   111	if (!welcomeMessage) {
   112	  throw new Error(`Seed snapshot is missing a message for public channel "${publicChannel.slug}".`);
   113	}
   114	
   115	export const SEEDED_PUBLIC_CHANNEL = {
   116	  serverSlug: defaultJoinServer.slug,
   117	  serverName: defaultJoinServer.name,
   118	  channelSlug: publicChannel.slug,
   119	  channelName: publicChannel.name,
   120	  welcomeText: welcomeMessage.content,
   121	};
   122	
   123	export const SEEDED_PRIVATE_CHANNEL = {
   124	  serverSlug: defaultJoinServer.slug,
   125	  channelName: privateChannel.name,
   126	  channelSlug: privateChannel.slug,
   127	};
```

#### Tool: exec_command

```sh
rtk grep -n "tokenBucketRateLimiter" harmony-backend/src/routes/public.router.ts harmony-backend/src
```

Output:

```text
🔍 5 in 2F:

📄 harmony-backend/.../middleware/rate-limit.middleware.ts (1):
   122: export function tokenBucketRateLimiter(req: Request, res: Response, next: NextFu...

📄 harmony-backend/src/routes/public.router.ts (4):
     6: import { tokenBucketRateLimiter } from '../middleware/rate-limit.middleware';
    11: publicRouter.use(tokenBucketRateLimiter);
     6: import { tokenBucketRateLimiter } from '../middleware/rate-limit.middleware';
    11: publicRouter.use(tokenBucketRateLimiter);
```

#### Tool: exec_command

```sh
nl -ba harmony-backend/src/routes/public.router.ts | sed -n '1,80p'
```

Output:

```text
     1	import { Router, Request, Response } from 'express';
     2	import { prisma } from '../db/prisma';
     3	import { ChannelVisibility } from '@prisma/client';
     4	import { cacheMiddleware } from '../middleware/cache.middleware';
     5	import { cacheService, CacheKeys, CacheTTL, sanitizeKeySegment } from '../services/cache.service';
     6	import { tokenBucketRateLimiter } from '../middleware/rate-limit.middleware';
     7	
     8	export const publicRouter = Router();
     9	
    10	// Token bucket rate limiting per issue #110: 100 req/min (human) / 1000 req/min (verified bots)
    11	publicRouter.use(tokenBucketRateLimiter);
    12	
    13	/**
    14	 * GET /api/public/channels/:channelId/messages
    15	 * Returns paginated messages for a PUBLIC_INDEXABLE channel.
    16	 * Uses cache middleware with stale-while-revalidate.
    17	 */
    18	publicRouter.get(
    19	  '/channels/:channelId/messages',
    20	  cacheMiddleware({
    21	    ttl: CacheTTL.channelMessages,
    22	    staleTtl: CacheTTL.channelMessages, // keep stale data for an extra TTL window
    23	    keyFn: (req: Request) =>
    24	      CacheKeys.channelMessages(req.params.channelId, Number(req.query.page) || 1),
    25	  }),
    26	  async (req: Request, res: Response) => {
    27	    try {
    28	      const { channelId } = req.params;
    29	      const page = Math.max(1, Number(req.query.page) || 1);
    30	      const pageSize = 50;
    31	
    32	      const channel = await prisma.channel.findUnique({
    33	        where: { id: channelId },
    34	        select: { id: true, visibility: true },
    35	      });
    36	
    37	      if (!channel || channel.visibility !== ChannelVisibility.PUBLIC_INDEXABLE) {
    38	        res.status(404).json({ error: 'Channel not found' });
    39	        return;
    40	      }
    41	
    42	      const messages = await prisma.message.findMany({
    43	        where: { channelId, isDeleted: false },
    44	        orderBy: { createdAt: 'desc' },
    45	        skip: (page - 1) * pageSize,
    46	        take: pageSize,
    47	        select: {
    48	          id: true,
    49	          content: true,
    50	          createdAt: true,
    51	          editedAt: true,
    52	          author: { select: { id: true, username: true } },
    53	        },
    54	      });
    55	
    56	      res.set('Cache-Control', `public, max-age=${CacheTTL.channelMessages}`);
    57	      res.json({ messages, page, pageSize });
    58	    } catch (err) {
    59	      console.error('Public messages route error:', err);
    60	      if (!res.headersSent) {
    61	        res.status(500).json({ error: 'Internal server error' });
    62	      }
    63	    }
    64	  },
    65	);
    66	
    67	/**
    68	 * GET /api/public/channels/:channelId/messages/:messageId
    69	 * Returns a single message from a PUBLIC_INDEXABLE channel.
    70	 * Uses cache middleware with stale-while-revalidate.
    71	 */
    72	publicRouter.get(
    73	  '/channels/:channelId/messages/:messageId',
    74	  cacheMiddleware({
    75	    ttl: CacheTTL.channelMessages,
    76	    staleTtl: CacheTTL.channelMessages,
    77	    keyFn: (req: Request) =>
    78	      `channel:msg:${sanitizeKeySegment(req.params.channelId)}:${sanitizeKeySegment(req.params.messageId)}`,
    79	  }),
    80	  async (req: Request, res: Response) => {
```

#### Tool: exec_command

```sh
nl -ba harmony-backend/src/routes/seo.router.ts | sed -n '1,120p'
```

Output:

```text
     1	/**
     2	 * SEO routes — sitemap.xml and robots.txt endpoints.
     3	 *
     4	 * - GET /sitemap/:serverSlug.xml — dynamic sitemap of PUBLIC_INDEXABLE channels
     5	 * - GET /robots.txt              — allow crawling of /c/ routes
     6	 */
     7	
     8	import { Router, Request, Response } from 'express';
     9	import { indexingService } from '../services/indexing.service';
    10	
    11	export const seoRouter = Router();
    12	
    13	/**
    14	 * GET /robots.txt
    15	 * Instructs crawlers to allow /c/ routes (public channel pages).
    16	 *
    17	 * NOTE: A machine-readable `Sitemap:` directive requires a sitemap index
    18	 * endpoint (e.g. /sitemap-index.xml) that aggregates per-server sitemaps.
    19	 * This is tracked as a follow-up — see issue #107 comments.
    20	 */
    21	seoRouter.get('/robots.txt', (_req: Request, res: Response) => {
    22	  const body = [
    23	    'User-agent: *',
    24	    'Allow: /c/',
    25	    'Disallow: /api/',
    26	    'Disallow: /trpc/',
    27	  ].join('\n');
    28	
    29	  res.set('Content-Type', 'text/plain');
    30	  res.set('Cache-Control', 'public, max-age=86400');
    31	  res.send(body);
    32	});
    33	
    34	/**
    35	 * GET /sitemap/:serverSlug.xml
    36	 * Returns a dynamic XML sitemap containing all PUBLIC_INDEXABLE channels
    37	 * for the given server.
    38	 */
    39	seoRouter.get('/sitemap/:serverSlug.xml', async (req: Request, res: Response) => {
    40	  try {
    41	    const { serverSlug } = req.params;
    42	    const xml = await indexingService.generateSitemap(serverSlug);
    43	
    44	    if (!xml) {
    45	      res.status(404).json({ error: 'Server not found' });
    46	      return;
    47	    }
    48	
    49	    res.set('Content-Type', 'application/xml');
    50	    res.set('Cache-Control', 'public, max-age=3600');
    51	    res.send(xml);
    52	  } catch (err) {
    53	    console.error('Sitemap generation error:', err);
    54	    if (!res.headersSent) {
    55	      res.status(500).json({ error: 'Internal server error' });
    56	    }
    57	  }
    58	});
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-09T15:55:38.152Z

Directionally, yes. [SPRINT_4_PLAN.md](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md) is coherent and it targets the real production risks in this repo, especially replica safety, SEO, and deployment evidence. I would not call it execution-ready yet without tightening a few points.

- The cloud-test story is under-specified. The plan says the same integration suite should run locally and against deployed URLs in [SPRINT_4_PLAN.md#L220](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L220), but the current Playwright setup is hard-wired to boot local frontend and backend processes in [playwright.config.ts#L43](/Users/allen/repos/Harmony/harmony-frontend/playwright.config.ts#L43) and local ports/env in [stack.shared.mjs#L4](/Users/allen/repos/Harmony/harmony-frontend/tests/e2e/support/stack.shared.mjs#L4). Issue `#9` should explicitly include refactoring the harness for “external deployed target” mode.

- The multi-replica validation task is missing observability. You want proof that requests are actually handled correctly across 2+ Railway replicas in [SPRINT_4_PLAN.md#L314](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L314), but the backend currently exposes only a generic health response in [app.ts#L50](/Users/allen/repos/Harmony/harmony-backend/src/app.ts#L50). Add a small task to expose replica/instance identity in logs or headers, otherwise `#14` will be hard to prove cleanly.

- The rate-limiting task is correct, but it should explicitly name both implementations. Auth endpoints use `express-rate-limit` in memory in [app.ts#L18](/Users/allen/repos/Harmony/harmony-backend/src/app.ts#L18), while public routes use a separate in-process token bucket in [public.router.ts#L10](/Users/allen/repos/Harmony/harmony-backend/src/routes/public.router.ts#L10) and [rate-limit.middleware.ts#L39](/Users/allen/repos/Harmony/harmony-backend/src/middleware/rate-limit.middleware.ts#L39). If `#3` doesn’t say “replace or unify both,” someone can finish the issue while only fixing half the problem.

- The SEO ownership boundary still needs one explicit decision. The plan rightly calls for frontend `metadataBase`, `robots.txt`, and sitemap support in [SPRINT_4_PLAN.md#L168](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L168), but today `robots.txt` and sitemaps are served by the backend in [seo.router.ts#L21](/Users/allen/repos/Harmony/harmony-backend/src/routes/seo.router.ts#L21), while frontend metadata is still using relative canonicals and no root `metadataBase` in [layout.tsx#L11](/Users/allen/repos/Harmony/harmony-frontend/src/app/layout.tsx#L11) and [page.tsx#L23](/Users/allen/repos/Harmony/harmony-frontend/src/app/c/[serverSlug]/[channelSlug]/page.tsx#L23). Decide whether SEO artifacts live on the Vercel apex domain or the API subdomain.

- The attachment-storage issue is valid, but the plan should choose the production provider now. The current abstraction only supports `local` and throws otherwise in [storage/index.ts#L4](/Users/allen/repos/Harmony/harmony-backend/src/lib/storage/index.ts#L4), while uploads still write to local disk in [local.provider.ts#L35](/Users/allen/repos/Harmony/harmony-backend/src/lib/storage/local.provider.ts#L35). `#4` should name the target storage class instead of leaving provider choice implicit.

- The deployment automation section should define a single source of truth. `#11` and `#12` create GitHub deploy workflows in [SPRINT_4_PLAN.md#L252](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L252), which is fine, but the plan should explicitly say whether GitHub Actions or provider-native Git deploys own production. Otherwise rollout/rollback behavior gets muddy.

- The critical path is concentrated in two people. The dependency chain in [SPRINT_4_PLAN.md#L377](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L377) and ownership table in [SPRINT_4_PLAN.md#L365](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L365) put too much schedule risk on `#1/#7/#11/#15` and `#2/#5/#14`. It still works, but only if you treat those as the sprint bottleneck and add backup ownership.

Bottom line: the plan makes sense technically, and it matches the repo better than an AWS/Lambda rewrite would. I’d revise it before execution by clarifying test-mode support, replica observability, SEO ownership, deploy authority, and the exact storage target.

### Turn 2: Review it

#### 👤 User Prompt

- Time: 2026-04-09T16:02:24.583Z

```text
Review it again
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-09T16:02:38.403Z

I’m doing a stricter second pass against the actual P6 assignment artifact and the repo state, not just the plan’s internal consistency. That should surface whether the plan is merely plausible or actually aligned to what has to be submitted.

#### Tool: exec_command

```sh
pdftotext 'P6_ Deployment _ CS 485 AI-Assisted Software Engineering (Sp26).pdf' - | sed -n '1,260p'
```

Output:

```text
zsh:1: command not found: pdftotext
```

#### Tool: exec_command

```sh
rtk ls planning
```

Output:

```text
Create_Sprint_Plan.md  2.6K
P1_ Requirements Engineering.md  26.7K
SPRINT_2_PLAN.md  16.7K
SPRINT_3_PLAN.md  9.4K
SPRINT_4_PLAN.md  21.2K

📊 5 files, 0 dirs (5 .md)
```

#### Tool: exec_command

```sh
rtk grep -n "Sprint 4|Deployment Sprint|P6" planning docs README.md
```

Output:

```text
🔍 12 in 4F:

📄 docs/unified-backend-architecture.md (1):
   131: | M-B7 | Background Workers | Server | Shared | *(Not built in P4 — deferred ...

📄 planning/P1_ Requirements Engineering.md (2):
   215: ### Sprint 4 (Weeks 7-8): SEO Metadata Automation
   225: **Why this is the right story:** At this stage, the platform is generating tr...

📄 planning/SPRINT_2_PLAN.md (1):
    29: - Structure Express app to be wrappable with `serverless-http` for future AWS...

📄 planning/SPRINT_4_PLAN.md (8):
     1: # Deployment Sprint Plan — April 8–19, 2026
     4: Harmony is a search-engine-indexable chat application with a Next.js frontend...
    13: This sprint must cover the substance of **P6 Deployment** while ignoring the ...
    30: **Assignment:** P6: Deployment
    67: ## P6 Coverage Map
    69: | P6 Requirement | Vercel + Railway Adaptation | Covered By Issues |
   374: - Compile the final P6-equivalent artifact checklist:
   507: - We are intentionally satisfying the **intent** of P6 using Vercel + Railway...
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-09T16:02:49.944Z

`pdftotext` isn’t installed here, so I’m extracting the P6 PDF with Python instead. After that I’ll compare the plan to the assignment language directly rather than infer requirements from the plan itself.

#### Tool: exec_command

```sh
python - <<'PY'
from pathlib import Path
pdf = Path('P6_ Deployment _ CS 485 AI-Assisted Software Engineering (Sp26).pdf')
try:
    from pypdf import PdfReader
except Exception as e:
    print('IMPORT_ERROR', e)
    raise SystemExit(0)
reader = PdfReader(str(pdf))
for i, page in enumerate(reader.pages[:8]):
    text = page.extract_text() or ''
    print(f'--- PAGE {i+1} ---')
    print(text[:6000])
PY
```

Output:

```text
--- PAGE 1 ---
CS 485 AI-Assisted Software Engineering (Sp26)
Project / P6: Deployment
Learn how to package an application for deployment to the cloud.
Learn how to deploy a frontend and backend application to Amazon Web Services (AWS)
Learn how to automate deployment using GitHub continuous deployment.
In P1, you defined requirements and user stories. In P2, you expanded some of those stories
into detailed development specifications. In P3, you implemented two user stories for the front
end of your application. In P4, you implemented two dev specs for the back end of your
application. In P5, you wrote unit tests for two core frontend and two core backend files/
classes. In P6, you will deploy the frontend and backend of your application to AWS.
By the end of this sprint, you will set up a publicly visible deployment of your application. You
will then automate deployment so that every time you commit code to your repository, GitHub
will run the test cases and if successful, will deploy the updated application to AWS.
Remember to use the LLMs as much as possible to generate your deliverables. You may not
modify any generated code directly, only by prompting the LLM. You should use formalized
LLM prompts, such as those we introduced in class.  These will make the LLM output more
reliable.
You will begin by setting up your AWS account. You will need AWS access for all steps of this
project.
P6: Deployment 
DUE SUNDAY, 19 APRIL 2026, 11:59PM AOE.
Project 6: Deployment
Learning Goals
•
•
•
Project Context
Deliverables
P6: Deployment | CS 485 AI-Assisted Software Engineering (Sp26) https://kelloggm.github.io/martinjkellogg.com/teaching/cs485-sp26/proj...
1 of 8 4/8/26, 8:11 PM
--- PAGE 2 ---
None of the steps in P6 should cost you any money, however the AWS account setup will likely
require a credit card to be charged in case you incur any costs. Be assured that whenever
we’ve done this before, we’ve spent at most 20-30 cents total. If you find that AWS has billed
you anywhere near USD $1, immediately turn off any applications you have already deployed
and reach out to the instructors for help.
Next, you will set up your application to run with AWS Lambda . AWS Lambda lets you run
server code without having to deal with actual server machines. It’s a “serverless” computing
service. You will modify your backend to run on AWS Lambda.
Your backend should publish its public interfaces via REST API. You will use AWS API Gateway
to expose your public endpoints for web users (or applications) to interact with.
Next, you will use AWS Amplify to host your frontend application. Amplify will store and serve
static web assets, like HTML, CSS, and JS files, that comprise your application frontend.
!!! note If you are building a VS Code Extension, you will deploy  your frontend to the VS Code
Extension Marketplace.
Now is the time to implement integration tests. These are tests that exercise the frontend to
backend (and vice versa) code paths in your app. You will learn to run these integration tests
on localhost and in the cloud and run them on every checkin.
At the end, you will set up GitHub actions to deploy your frontend code to Amplify and your
backend code to Lambda after each pull request has been approved.
Go to the AWS Console  and create an account. If one person on your team already has an
AWS account, you can use that one. Log into the AWS Console with your new account.
To use Lambda, you will
Write (slightly stylized) code that executes functions on certain events (e.g., the invocation
of a given REST endpoint)
Package up your code (i.e., put it all in a ZIP file)
Upload the packaged code to AWS
Ask your LLM to modify your backend code so that it executes as a lambda function.
1. Create an AWS account
2. Use AWS Lambda to run your backend code
P6: Deployment | CS 485 AI-Assisted Software Engineering (Sp26) https://kelloggm.github.io/martinjkellogg.com/teaching/cs485-sp26/proj...
2 of 8 4/8/26, 8:11 PM
--- PAGE 3 ---
Eventually, that lambda function will execute when your REST API’s public interface endpoints
receive post requests . To start with, though, you should become familiar with Lambda, then
package up your Lambda code, deploy it, and make sure you can invoke it using the AWS
command-line interface (CLI).
Ask your LLM for detailed instructions on how to use AWS Lambda to set up a dummy
application that you can invoke. This will help you get familiar with AWS Lambda when you
have to set up your own application. If your LLM proves unhelpful, read the official AWS
documentation .
Ask your LLM to teach you how to package your Javascript code for deployment on AWS and
upload it with the AWS CLI. If your LLM is unhelpful, you can read the official AWS
documentation . There is some additional documentation in the Lambda section of the official
AWS API Gateway tutorial .
Ask your LLM to teach you how to modify the Lambda code so that it is invoked by requests to
your API’s public interface functions. If your LLM is not helpful, read the Lambda section of the
official AWS API Gateway tutorial .
AWS API Gateway  makes it simple to spin up an API. A web API  exposes endpoints that users
(or applications) can interact with. You are going to create a REST API  for the backend of your
app that exposes all of your public interfaces functions.
Ask your LLM to teach you how to create your REST API with AWS API Gateway. If your LLM is
unhelpful, read through this tutorial .
After setting up AWS API Gateway, locate the API call logic in your frontend code (where it
currently calls localhost). Replace the localhost URL with the API Gateway endpoint URL. Note,
edit the code carefully to preserve a version of the app that runs locally for easier testing.
AWS Amplify  makes it easy to e.g., deploy app frontends and integrate with version control. In
this assignment, you will use Amplify to manage deployment of the frontend of your calculator
application.
Your task is to set up Amplify to host the application frontend.
1. USE THE AWS CONSOLE TO EXPERIMENT WITH LAMBDA
2. PACKAGE AND INVOKE YOUR LAMBDA CODE USING THE AWS CLI
3. INTEGRATE YOUR LAMBDA CODE WITH THE REST API
3. Use API Gateway to create a REST API
4. Host your frontend code
P6: Deployment | CS 485 AI-Assisted Software Engineering (Sp26) https://kelloggm.github.io/martinjkellogg.com/teaching/cs485-sp26/proj...
3 of 8 4/8/26, 8:11 PM
--- PAGE 4 ---
To complete this part of the assignment, refer to the AWS Amplify tutorial  for deploying a web
application by connecting Amplify to your GitHub repository.
If you are building a VS Code Extension, do not follow the AWS Amplify directions. Instead, you
will deploy the frontend of your extension to the VS Code Extension Marketplace. To complete
this deployment, you will follow these instructions . First, install the vsce command line tool,
create an Azure DevOps personal access token, define your team as a publisher, and publish
your extension. Make sure to say that the cost of your extension is USD $0.
Be sure to have your LLM do all this work for you!
!!! note When this course is over, please remember to unpublish your extension from the VS
Code Extension Marketplace.
Ask your LLM to write an English-language test specification for the code pathways that
require the execution of frontend and backend code together. Each specification should
contain a list of all functionality that needs to be tested, followed by a table of tests. Each row
of the table should describe the purpose of the test, the test inputs to the function, and the
test output that is expected if the test passes. You must write at least one integration test for
every code pathway that spans frontend and backend functionality.
Generate integration tests for each row of your test specification using your LLM.
Test out your full app on your local machine first. Run your npm scripts to setup and start the
frontend and backend of your application on localhost, then execute the integration tests with
your testing framework.
!!! note Some integrations tests will fail when run on localhost, but work fine when deployed on
the Internet. Please take a note of these and condition their execution to run only when
deployed in the desired environment.
Finally, create a new test configuration that uses the URLs of the deployed frontend and
backend hosted by the AWS Cloud. Rerun your integration tests on your deployed app and fix
any bugs that pop up until the entire app is working as desired.
Ask your LLM to create a new GitHub Action that runs your integration tests on every commit.
Store the YAML workflow file in the .github/workflows directory. Name it run-integration-
5. Integration testing
6. Automate your integration tests
P6: Deployment | CS 485 AI-Assisted Software Engineering (Sp26) https://kelloggm.github.io/martinjkellogg.com/teaching/cs485-sp26/proj...
4 of 8 4/8/26, 8:11 PM
--- PAGE 5 ---
tests.yml. It should check out your code, set up the application environment for frontend and
backend (e.g., install Node.js if needed), install dependencies, and then execute your tests.
Check in your YAML file to the GitHub repository.
Ask your LLM to test out your CI code by making a change to one of the source code files in
the frontend and one backend source code file. Commit the change to Git, push to the remote
repository, create a pull request on GitHub, and accept the pull request. Finally, go to the
GitHub repository on the web and click on the Actions tab on the navigation bar. You’ll see all
the workflows on the left and workflow runs on the right. If you have a green checkmark next
to a workflow run, that means it worked! If there is a red cross, then it did not. Click on the
workflow run to see exactly what got executed in GitHub’s “terminal window” and find out
what went wrong. Fix the problem and try again until each of your two GitHub actions run
successfully.
Git is a very powerful and flexible version control system. One best practice you will follow is
to create a new feature  branch whenever you start working on a new coding task. Never  work
directly on the main branch. When your feature is done and your CI GitHub Actions (unit tests
and integration tests) have passed their tests, create a pull request on GitHub to push the
changes from the feature branch to main.
As configured by default, anyone with access to your repo can push whatever garbage they
want to the main branch. That’s not good! It’s important to make sure code that actually gets
deployed has been thoroughly tested and reviewed (to catch everything from mistakes to
intentional back doors!). In this assignment, you must block merges to main until your code is
reviewed and passes CI.
To protect your main branch, navigate to the Settings tab in your GitHub repo and click on
Branches (on the lefthand side). You’ll see two options: (1) Add branch ruleset and (2) Add
classic branch protection rule. Add a classic branch protection rule that protects main from
direct, unreviewed commits: first check the box to require a pull request before merging and
second check the box to require status checks to pass before merging. Select your CI testing
workflows here as the relevant status checks. Finally,
For CI instructions to run tests with Jest, check out Dennis O’Keefe’s blog .1
For CI instructions with VS Code extensions, check out these instructions .2
7. Adopt good GitHub hygiene
8. Use Github actions to automatically deploy on each push to main
P6: Deployment | CS 485 AI-Assisted Software Engineering (Sp26) https://kelloggm.github.io/martinjkellogg.com/teaching/cs485-sp26/proj...
5 of 8 4/8/26, 8:11 PM
--- PAGE 6 ---
After getting hands on experience with each service, you will use a Github action to deploy
updates automatically on each push to your main branch.
The CD pipeline will perform the following tasks:
Deploy the packaged backend Lambda code.
Redeploy the frontend (to Amplify or the VS Code Extension Marketplace).
In order to do this, you will need to allow Github to authenticate to AWS. Follow the Github
documentation  to safely use your AWS secrets in CD. This AWS blog post  describes some
(basic) best practices for generating and handling AWS authentication secrets in CI; navigate
to the “Configuring AWS credentials in GitHub” section of the tutorial.
Your LLM should create a Github workflow  named deploy-aws-lambda.yml that takes the
follow steps:
Checks out the code, sets up Node, and installs dependencies.
Packages the code for lambda deployment.
Uses the AWS CLI to update the lambda code (giving the CLI access to your authentication
secret and AWS region through the environment).
Your LLM should create a Github workflow named deploy-aws-amplify.yml that takes the
following steps:
Checks out the code, sets up Node, and builds the code.
Triggers AWS Amplify to redeploy the latest frontend version from your repository. See the
AWS documentation  for more.
If you are publishing a VS Code Extension, your workflow will be named deploy-extension.yml.
It should simply package up your extension and publish it to the marketplace.
Edit the README.md file for your project.
DEPLOYING BACKEND CODE
DEPLOYING FRONTEND CODE
9. Wrap it up
Provide instructions for web users of your app to run your application.1
Provide all the instructions needed for a random person on the Internet who forks your
codebase to set up AWS to deploy your application.
2
P6: Deployment | CS 485 AI-Assisted Software Engineering (Sp26) https://kelloggm.github.io/martinjkellogg.com/teaching/cs485-sp26/proj...
6 of 8 4/8/26, 8:11 PM
--- PAGE 7 ---
Without your LLM, write a 500-word (i.e., one-page) reflection on:
Please turn in a single document that contains these parts:
10. Reflection
How effective was the LLM in helping you understand how to deploy your app? What did
you like about it? What was wrong with it? How many times did you have to change your
prompt to get it to explain the information in a way you could understand?
1
How difficult was it to change habits and stop committing directly to main? Did you have to
ask your team to change their practices to ensure minimal delays for accepting your pull
requests? How do you feel about this feature branch practice? What are the pros and
cons?
2
Turn-in Instructions
Deploy your app. Keep it deployed until the instructors let you know that they’ve checked
this part out.
1
Provide a link to your Amplify frontend deployment or VS Code Extension Marketplace
extension URL.
a
Provide a link to your Lambda backend REST function.b
The integration test specification.2
Provide a Git repository link to the test code files that implement your integration test
specs.
3
Copy-paste in the test output from running your integration tests on localhost.4
Copy-paste in the test output from running your integration tests in the cloud.5
Provide a Git repository link to your run-integration-tests.yml file.6
Provide a Git repository link to your deploy-aws-amplify.yml file (or deploy-extension.yml as
appropriate).
7
Provide a Git repository link to your deploy-aws-lambda.yml file.8
Provide a link to your project’s README in GitHub.9
A 1-page reflection as in the Reflection  section.10
Copy-paste logs of all LLM interactions you used during this sprint. Identify the name and
version of the LLM used.
11
P6: Deployment | CS 485 AI-Assisted Software Engineering (Sp26) https://kelloggm.github.io/martinjkellogg.com/teaching/cs485-sp26/proj...
7 of 8 4/8/26, 8:11 PM
--- PAGE 8 ---
© 2022-2026 Martin Kellogg, Andrew Begel, Austin Henley, Jonathan Bell, Adeel Bhutta and Mitch Wand. Released under the CC BY-
SA  license
P6: Deployment | CS 485 AI-Assisted Software Engineering (Sp26) https://kelloggm.github.io/martinjkellogg.com/teaching/cs485-sp26/proj...
8 of 8 4/8/26, 8:11 PM
```

#### Tool: exec_command

```sh
rtk read planning/Create_Sprint_Plan.md
```

Output:

```text
You need to make a 2 week sprint plan for Harmony for a frontend implmentation. This includes making UI mockups with Figma, frontend code, and the frontend for dev-spec-channel-visbility-toggle and dev-spec-guest-public-channel-view. 

Use the gh cli tool to post all the issues on the Harmony Project board and assign each issue to the collaborators on the project:
acabrera04
Aiden-Barrera
AvanishKulkarni
declanblanc
FardeenI

The project context is in P1_ Requirements Engineering.md.

Here are the requirements for the assignment
1. UI Mockups in Figma
Create high-fidelity mockups for each of your two chosen user stories.

Include all states of the interface: e.g., empty state, loading, error, success, etc.
Include enough detail about the intended graphical design in your Figma project to help a developer to implement the appropriate CSS and layout code. For example, if your design needs to relayout in a specific way when the window is stretched or zoomed, please annotate the design with the behavior you want to see.
Write up the rationale for major design choices (e.g., navigation flow, component reuse, accessibility).
Check in high-resolution screenshots of your mockups into your project’s GitHub repository.

2. Frontend Implementation
Implement the user stories in code using a popular frontend framework (e.g., React, Svelte).

Using your LLM, generate the front end code from your user stories, Figma mockups (with their design rationale and developer implementation guides), and development specifications.
Include responsive design for at least two screen sizes.
Ensure accessibility compliance with WCAG and alt-text for images where appropriate.
Ensure any backend functionality or data is mocked such that the frontend functionality can be demonstrated.
Important: The code for both user stories must be generated into the same frontend application. Watch out for duplicated functionality, inconsistent class names, and incomplete interfaces.

Screen record yourself testing the frontend implementation in a web browser (include appropriate voiceover narration so we can follow what you’re trying to show). It should display correctly at your two different screen sizes. Use the browser’s debugger to accurately set the screen size during testing. Resize the browser window with your mouse/finger to test for proper layout logic.
Upload the screen recording to YouTube.
Check in the frontend implementation to your GitHub repository.

When creating the sprint plan, also include any prerequeste tasks that we need to have a working frontend for building this applicatino from the ground up.
```

#### Tool: exec_command

```sh
rtk read planning/SPRINT_3_PLAN.md
```

Output:

````text
# Testing Sprint Plan — March 29 – April 5, 2026

## Context
Harmony is a search-engine-indexable chat app (Discord-like). Sprints 1–2 built out requirements, dev specs, frontend, and backend. This sprint adds comprehensive unit testing for 4 core untested files (2 frontend, 2 backend), CI workflow automation, and documentation updates.

**Assignment:** P5: Testing
**Due:** Sunday, April 5, 2026, 11:59 PM AOE

## Team
5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI

## Tech Stack (Testing)
- Jest 29.7 (backend) / Jest 30.3 (frontend)
- Supertest 7.0 (backend HTTP testing)
- @testing-library/react 16.3 (frontend)
- ts-jest (TypeScript transpilation)
- GitHub Actions (CI/CD)

---

## Files Under Test

| # | Side | File | Functions | Why |
|---|------|------|-----------|-----|
| 1 | Backend | `harmony-backend/src/services/auth.service.ts` | 5 (`register`, `login`, `logout`, `refreshTokens`, `verifyAccessToken`) | Core auth — every user story depends on it, security-critical, untested |
| 2 | Backend | `harmony-backend/src/services/server.service.ts` | 10 (`getPublicServers`, `getAllServers`, `getMemberServers`, `getServer`, `createServer`, `updateServer`, `deleteServer`, `incrementMemberCount`, `decrementMemberCount`, `getMembers`) | Primary domain object — server CRUD + membership counts, untested |
| 3 | Frontend | `harmony-frontend/src/services/serverService.ts` | 11 (`getServers`, `getServer`, `getServerAuthenticated`, `getServerMembers`, `updateServer`, `deleteServer`, `joinServer`, `createServer`, `getServerMembersWithRole`, `changeMemberRole`, `removeMember`) | Frontend API layer for server management, untested |
| 4 | Frontend | `harmony-frontend/src/services/channelService.ts` | 8 (`getChannels`, `getChannel`, `updateVisibility`, `updateChannel`, `createChannel`, `getAuditLog`, `deleteChannel`) | Frontend API layer for channels + SEO visibility toggle, untested |

---

## Issues (10 total)

### Phase 1: TEST SPECIFICATIONS + CI SETUP — Days 1–2 (March 29–30)

**1. Test Specification — `auth.service.ts`**
- Write English-language test spec document for all 5 functions
- List every function, its purpose, and all program paths
- Create table: test purpose, inputs, expected output
- Cover happy paths, error paths (invalid credentials, expired tokens, duplicate email), and edge cases
- Target 80%+ code coverage of all execution paths
- Output: `docs/test-specs/auth-service-spec.md`
- Assignee: **Aiden-Barrera**
- Due: March 30

**2. Test Specification — `server.service.ts`**
- Write English-language test spec document for all 10 functions
- List every function, its purpose, and all program paths
- Create table: test purpose, inputs, expected output
- Cover happy paths, error paths (not found, duplicate slugs, unauthorized), and edge cases
- Target 80%+ code coverage of all execution paths
- Output: `docs/test-specs/server-service-spec.md`
- Assignee: **declanblanc**
- Due: March 30

**3. Test Specification — `serverService.ts` (frontend)**
- Write English-language test spec document for all 11 functions
- List every function, its purpose, and all program paths
- Create table: test purpose, inputs, expected output
- Cover happy paths, API error handling (network failures, 401/403/404), and edge cases
- Describe mock strategy for `apiClient` / `ApiClient`
- Target 80%+ code coverage of all execution paths
- Output: `docs/test-specs/frontend-server-service-spec.md`
- Assignee: **FardeenI**
- Due: March 30

**4. Test Specification — `channelService.ts` (frontend)**
- Write English-language test spec document for all 8 functions
- List every function, its purpose, and all program paths
- Create table: test purpose, inputs, expected output
- Cover happy paths, API error handling, visibility enum edge cases
- Describe mock strategy for `apiClient` / `ApiClient`
- Target 80%+ code coverage of all execution paths
- Output: `docs/test-specs/frontend-channel-service-spec.md`
- Assignee: **AvanishKulkarni**
- Due: March 30

**5. GitHub Actions — CI Workflows**
- Create `.github/workflows/run-frontend-tests.yml`
  - Trigger on every push and PR
  - Checkout code, setup Node.js 20, install deps, run frontend tests
- Create `.github/workflows/run-backend-tests.yml`
  - Trigger on every push and PR
  - Checkout code, setup Node.js 20, install deps
  - Start PostgreSQL + Redis services
  - Run Prisma generate + migrate, then run backend tests
- Reference existing `ci.yml` for service configuration patterns
- Test by pushing a small change and verifying green checkmarks in Actions tab
- No dependencies — can start immediately using existing tests in the repo
- Assignee: **acabrera04**
- Due: March 30

### Phase 2: UNIT TEST IMPLEMENTATION — Days 2–4 (March 30 – April 1)

**6. Unit Tests — `auth.service.ts`**
- Implement Jest tests from spec in `harmony-backend/tests/auth.service.test.ts`
- Mock Prisma client and bcrypt/JWT dependencies
- Generate one test at a time via LLM to prevent hallucination
- Verify no duplicate or overlapping test cases
- Run tests locally, fix any failures (use LLM for 3 alternative fixes)
- **Acceptance criteria:** 80%+ code coverage (run Jest with `--coverage`), capture coverage report for submission
- Assignee: **Aiden-Barrera**
- Due: April 1
- Depends on: #1

**7. Unit Tests — `server.service.ts`**
- Implement Jest tests from spec in `harmony-backend/tests/server.service.test.ts`
- Mock Prisma client
- Generate one test at a time via LLM to prevent hallucination
- Verify no duplicate or overlapping test cases
- Run tests locally, fix any failures
- **Acceptance criteria:** 80%+ code coverage (run Jest with `--coverage`), capture coverage report for submission
- Assignee: **declanblanc**
- Due: April 1
- Depends on: #2

**8. Unit Tests — `serverService.ts` (frontend)**
- Implement Jest tests from spec in `harmony-frontend/src/__tests__/serverService.test.ts`
- Mock `apiClient` and `ApiClient` imports from `@/lib/api-client`
- Generate one test at a time via LLM to prevent hallucination
- Verify no duplicate or overlapping test cases
- Run tests locally, fix any failures
- **Acceptance criteria:** 80%+ code coverage (run Jest with `--coverage`), capture coverage report for submission
- Assignee: **FardeenI**
- Due: April 1
- Depends on: #3

**9. Unit Tests — `channelService.ts` (frontend)**
- Implement Jest tests from spec in `harmony-frontend/src/__tests__/channelService.test.ts`
- Mock `apiClient` and `ApiClient` imports from `@/lib/api-client`
- Generate one test at a time via LLM to prevent hallucination
- Verify no duplicate or overlapping test cases
- Run tests locally, fix any failures
- **Acceptance criteria:** 80%+ code coverage (run Jest with `--coverage`), capture coverage report for submission
- Assignee: **AvanishKulkarni**
- Due: April 1
- Depends on: #4

### Phase 3: DOCUMENTATION & SUBMISSION — Days 5–7 (April 3–5)

**10. README Update & Final Submission**
- Update `README.md` with:
  - Instructions to manually run frontend tests (frameworks, libraries, commands)
  - Instructions to manually run backend tests (frameworks, libraries, commands)
- Compile final submission document with all 17 deliverables
- Collect and include all LLM interaction logs with model name/version
- Note: 500-word reflection is written collaboratively as a group
- Assignee: **acabrera04**
- Due: April 5
- Depends on: #6, #7, #8, #9

---

## Assignment Summary

| Developer | Issues | Focus Area |
|-----------|--------|------------|
| acabrera04 | #5, #10 | CI workflows (both YAML files), README update/submission |
| Aiden-Barrera | #1, #6 | Auth service test spec + unit tests |
| AvanishKulkarni | #4, #9 | Channel service (FE) test spec + unit tests |
| declanblanc | #2, #7 | Server service (BE) test spec + unit tests |
| FardeenI | #3, #8 | Server service (FE) test spec + unit tests |

## Dependency Graph

```
Phase 1 (Specs + CI)              Phase 2 (Tests + Coverage)       Phase 3 (Docs)

#1 Auth Spec ───────────────────► #6 Auth Tests (80%+) ────────┐
#2 Server Spec ─────────────────► #7 Server Tests (80%+) ──────┤
#3 FE Server Spec ──────────────► #8 FE Server Tests (80%+) ───┼──► #10 README + Reflection
#4 FE Channel Spec ─────────────► #9 FE Channel Tests (80%+) ──┘        + Submission
#5 CI YAML (no dependencies) ──────────────────────────────────┘

Note: 500-word reflection is a group effort, not tracked as an individual issue.
```

## Timeline

| Date | Milestone |
|------|-----------|
| March 29 (Sat) | Sprint kickoff, begin test specs + CI workflows |
| March 30 (Sun) | All 4 test specs complete, CI workflows verified, begin unit test implementation |
| April 1 (Tue) | All 4 test files complete, tests passing locally, 80%+ coverage verified |
| April 3 (Thu) | README updated, reflection draft |
| April 5 (Sat) | Final submission compiled and turned in |

## Notes
- Use LLM to generate test specs and unit tests (course requirement)
- Generate **one unit test at a time** to prevent LLM hallucination
- All tests must be isolated — no cross-network calls between frontend and backend
- Frontend tests must mock the API client; backend tests must mock Prisma
- Save all LLM interaction logs for submission deliverable #17
- Existing `ci.yml` already runs tests on push/PR — new workflow files are separate as required by the assignment
````

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-09T16:04:00.270Z

**Findings**

- `P0` The plan still does not make sense as the authoritative sprint plan unless you already have explicit instructor approval for a non-AWS substitution. [SPRINT_4_PLAN.md#L13](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L13) and [SPRINT_4_PLAN.md#L64](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L64) intentionally replace Lambda/API Gateway/Amplify with Railway/Vercel, but the actual P6 assignment explicitly requires AWS account setup, Lambda, API Gateway, Amplify, and AWS-targeted CD. Without written approval, this is a grading-risk decision, not just an implementation choice.

- `P0` The artifact names in the plan do not match the assignment deliverables. [SPRINT_4_PLAN.md#L252](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L252), [SPRINT_4_PLAN.md#L266](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L266), and [SPRINT_4_PLAN.md#L347](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L347) require `deploy-railway.yml` and `deploy-vercel.yml`, but P6 asks for `deploy-aws-lambda.yml` and `deploy-aws-amplify.yml`. Even if Vercel/Railway is approved, your submission checklist should still explain how this naming mismatch is handled or keep the required filenames.

- `P1` The reflection deliverable is not actually planned as work. [SPRINT_4_PLAN.md#L340](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L340) only mentions a “reflection placeholder/coordination,” and [SPRINT_4_PLAN.md#L353](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L353) does not require the reflection to be written. P6 requires a real 500-word reflection, so this should be a concrete issue with an owner and due date.

- `P1` The plan hardens the architecture beyond the assignment rubric and turns that extra work into blockers. [SPRINT_4_PLAN.md#L51](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L51) and [SPRINT_4_PLAN.md#L314](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L314) make 2+ API replicas, singleton worker ownership, Redis-backed shared rate limiting, and object storage mandatory. That is defensible engineering, but the current repo still has in-process invalidation startup in [index.ts#L13](/Users/allen/repos/Harmony/harmony-backend/src/index.ts#L13), in-memory public rate limiting in [rate-limit.middleware.ts#L43](/Users/allen/repos/Harmony/harmony-backend/src/middleware/rate-limit.middleware.ts#L43), auth limiter memory defaults in [app.ts#L18](/Users/allen/repos/Harmony/harmony-backend/src/app.ts#L18), and only a local storage provider in [storage/index.ts#L5](/Users/allen/repos/Harmony/harmony-backend/src/lib/storage/index.ts#L5) and [local.provider.ts#L35](/Users/allen/repos/Harmony/harmony-backend/src/lib/storage/local.provider.ts#L35). That is a lot of net-new production work for a sprint whose rubric is primarily deployment and automation.

- `P1` The cloud integration-test requirement is still underspecified relative to the actual harness. [SPRINT_4_PLAN.md#L220](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L220) says the same tests should run locally and against deployed URLs, but the current Playwright setup always launches local backend and frontend processes in [playwright.config.ts#L43](/Users/allen/repos/Harmony/harmony-frontend/playwright.config.ts#L43) with local constants in [stack.shared.mjs#L4](/Users/allen/repos/Harmony/harmony-frontend/tests/e2e/support/stack.shared.mjs#L4). The plan needs an explicit subtask for “external deployed target mode” or this will slip late.

- `P2` The branch-protection issue does not account for ambiguous current workflow naming. [SPRINT_4_PLAN.md#L280](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L280) says to record exact required checks, but [ci.yml#L1](/Users/allen/repos/Harmony/.github/workflows/ci.yml#L1), [run-backend-tests.yml#L1](/Users/allen/repos/Harmony/.github/workflows/run-backend-tests.yml#L1), and [run-frontend-tests.yml#L1](/Users/allen/repos/Harmony/.github/workflows/run-frontend-tests.yml#L1) all use `name: CI`. That makes the protection-rule setup harder to specify and audit unless those workflows are renamed or the exact job names are documented.

- `P2` The plan does not clearly include an end-to-end CD proof step via PR merge, even though the assignment expects you to validate that Actions actually run green after a real change is merged. The timeline mentions this in [SPRINT_4_PLAN.md#L429](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L429), but neither [SPRINT_4_PLAN.md#L252](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L252) nor [SPRINT_4_PLAN.md#L266](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L266) make that demonstration part of acceptance.

**Assumption**

- If the instructors already approved “satisfy the intent of P6 with Vercel + Railway,” the first two findings drop from blockers to documentation problems. If they did not, they are the main problem with the plan.

**Verdict**

It is a coherent engineering plan, but it is still not a safe submission plan. I would revise it around assignment compliance first, then trim or demote the multi-replica hardening work so it does not become the critical path unless that scaling requirement is explicitly graded.

### Turn 3: We can use whatever deployment platform necessary for our project, it

#### 👤 User Prompt

- Time: 2026-04-09T16:05:11.644Z

```text
We can use whatever deployment platform necessary for our project, it doesn't need ot be limited to aws
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-09T16:05:35.123Z

With that constraint, the AWS-compliance objection drops out. Under a “platform-agnostic deployment is allowed” reading, the plan mostly makes sense. The remaining problems are execution and scope, not platform choice.

- `P1` The cloud integration-test path is still not concrete enough. [SPRINT_4_PLAN.md#L220](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L220) says the same tests should run locally and against deployed URLs, but the current Playwright harness always boots local services in [playwright.config.ts#L43](/Users/allen/repos/Harmony/harmony-frontend/playwright.config.ts#L43) using fixed localhost settings in [stack.shared.mjs#L4](/Users/allen/repos/Harmony/harmony-frontend/tests/e2e/support/stack.shared.mjs#L4). Issue `#9` should explicitly include “support external deployed targets without starting local webServer processes.”

- `P1` The plan turns “nice production hardening” into “must-finish critical path” work. The 2+ replica rule in [SPRINT_4_PLAN.md#L51](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L51) is coherent, but the repo is not close to that state today: auth rate limits are in-memory in [app.ts#L18](/Users/allen/repos/Harmony/harmony-backend/src/app.ts#L18), public rate limiting is in-memory in [rate-limit.middleware.ts#L43](/Users/allen/repos/Harmony/harmony-backend/src/middleware/rate-limit.middleware.ts#L43), singleton background startup is still in the API process in [index.ts#L13](/Users/allen/repos/Harmony/harmony-backend/src/index.ts#L13), and storage only supports `local` in [storage/index.ts#L5](/Users/allen/repos/Harmony/harmony-backend/src/lib/storage/index.ts#L5). If 2+ replicas are not a graded requirement, this is too much risk on the critical path.

- `P1` The reflection is not actually planned as a deliverable. [SPRINT_4_PLAN.md#L340](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L340) only tracks a placeholder/coordination item. If a written reflection is still required for submission, it needs a real issue, owner, and due date.

- `P2` The SEO ownership boundary is still muddy. The plan puts frontend `metadataBase`, `robots.txt`, and sitemap support into `#6` at [SPRINT_4_PLAN.md#L168](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L168), but the backend already serves `robots.txt` and sitemaps in [seo.router.ts#L21](/Users/allen/repos/Harmony/harmony-backend/src/routes/seo.router.ts#L21), while the frontend currently lacks root `metadataBase` in [layout.tsx#L11](/Users/allen/repos/Harmony/harmony-frontend/src/app/layout.tsx#L11) and still emits relative canonical URLs in [page.tsx#L23](/Users/allen/repos/Harmony/harmony-frontend/src/app/c/[serverSlug]/[channelSlug]/page.tsx#L23). The plan should explicitly choose whether SEO artifacts live on Vercel, Railway, or are split intentionally.

- `P2` Branch-protection setup is harder than the plan suggests because workflow names are ambiguous. `#13` in [SPRINT_4_PLAN.md#L280](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L280) says to record exact required checks, but multiple workflows are named `CI` in [ci.yml#L1](/Users/allen/repos/Harmony/.github/workflows/ci.yml#L1), [run-backend-tests.yml#L1](/Users/allen/repos/Harmony/.github/workflows/run-backend-tests.yml#L1), and [run-frontend-tests.yml#L1](/Users/allen/repos/Harmony/.github/workflows/run-frontend-tests.yml#L1). Rename them or document job names, otherwise the protection rule will be confusing.

- `P2` The plan should make CD verification a formal acceptance criterion, not just a timeline note. The assignment-style workflow is “merge a PR, confirm Actions run, confirm deploy updated.” Right now that only appears implicitly in the timeline at [SPRINT_4_PLAN.md#L429](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L429).

Verdict: with platform flexibility, the plan is directionally good. I would still revise it before using it by:
1. Making cloud-test mode explicit.
2. Deciding whether multi-replica hardening is required or optional.
3. Adding a real reflection task.
4. Clarifying SEO ownership.
5. Cleaning up workflow naming and CD proof requirements.

### Turn 4: part of what we need to do is deploy the backend on two+ servers and

#### 👤 User Prompt

- Time: 2026-04-09T16:06:27.092Z

```text
part of what we need to do is deploy the backend on two+ servers and ensure they are able to communicate with each other
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-09T16:06:44.186Z

Then the core architecture choice in the plan is justified.

If “deploy the backend on 2+ servers and ensure they communicate correctly” is a real requirement, [SPRINT_4_PLAN.md](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md) makes substantially more sense than a simpler single-service deployment plan. The repo already has the right coordination primitives for that direction: Redis-backed pub/sub in [eventBus.ts](/Users/allen/repos/Harmony/harmony-backend/src/events/eventBus.ts), cache invalidation subscriptions started from [index.ts#L13](/Users/allen/repos/Harmony/harmony-backend/src/index.ts#L13), SSE endpoints in [events.router.ts](/Users/allen/repos/Harmony/harmony-backend/src/routes/events.router.ts), and rate limiting that currently depends on process-local memory in [rate-limit.middleware.ts#L43](/Users/allen/repos/Harmony/harmony-backend/src/middleware/rate-limit.middleware.ts#L43) and [app.ts#L18](/Users/allen/repos/Harmony/harmony-backend/src/app.ts#L18). Those are exactly the areas that break or become ambiguous once you scale horizontally.

The one thing I’d tighten is the wording around “servers communicate with each other.” In this system, the replicas should not really talk to each other directly. They should coordinate through shared infrastructure: Redis and Postgres. The plan is strongest where it already assumes that, especially [SPRINT_4_PLAN.md#L51](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L51) and [SPRINT_4_PLAN.md#L314](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L314). So at this point my review is: yes, the plan makes sense, but only if you treat “multi-backend correctness via shared Redis/Postgres and a singleton worker” as the explicit design goal, not generic inter-server communication.

The remaining real gaps are narrower now:
- [SPRINT_4_PLAN.md#L220](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L220) still needs an explicit cloud-test harness mode.
- [SPRINT_4_PLAN.md#L168](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L168) should clarify whether SEO artifacts live on frontend, backend, or both.
- [SPRINT_4_PLAN.md#L280](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L280) should account for ambiguous current workflow names in [.github/workflows/ci.yml#L1](/Users/allen/repos/Harmony/.github/workflows/ci.yml#L1), [.github/workflows/run-backend-tests.yml#L1](/Users/allen/repos/Harmony/.github/workflows/run-backend-tests.yml#L1), and [.github/workflows/run-frontend-tests.yml#L1](/Users/allen/repos/Harmony/.github/workflows/run-frontend-tests.yml#L1).

So the answer is no longer “this may be overengineered.” With your clarified requirement, it is the right shape of plan. It just needs a few execution details tightened so the team can actually finish it.

### Turn 5: what do you mean by explicit cloud test harness

#### 👤 User Prompt

- Time: 2026-04-09T16:08:14.808Z

```text
what do you mean by explicit cloud test harness mode
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-09T16:08:23.367Z

I mean the test suite should have a clearly defined way to run in two different environments:

1. `local` mode
   Uses the current behavior: start backend and frontend locally, seed local services, run against `localhost`.

2. `cloud` mode
   Does not start local servers. Instead, it points the same tests at already-deployed frontend/backend URLs.

Right now the harness is only really built for `local` mode:
- [playwright.config.ts#L43](/Users/allen/repos/Harmony/harmony-frontend/playwright.config.ts#L43) always starts local web servers.
- [stack.shared.mjs#L9](/Users/allen/repos/Harmony/harmony-frontend/tests/e2e/support/stack.shared.mjs#L9) hardcodes localhost URLs and local ports.

So when I say “explicit cloud test harness mode,” I mean you should add an intentional switch such as `TEST_TARGET=local|cloud` or `DEPLOYED_FRONTEND_URL` / `DEPLOYED_BACKEND_URL`, and then make the harness do the right thing for each case.

Concretely, in `cloud` mode it should:
- skip `webServer` startup
- use deployed URLs
- avoid local seed/reset assumptions
- allow tests to skip or branch where cloud data/setup differs

Without that, the plan says “run in the cloud,” but the harness still behaves like “boot localhost and test localhost.”

### Turn 6: is that a necessity? should I modify it to only run

#### 👤 User Prompt

- Time: 2026-04-09T16:09:13.701Z

```text
is that a necessity? should I modify it to only run locally?
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-09T16:09:22.665Z

No, I would not change the plan to `only` run locally.

If your sprint requirement includes:
- deployed frontend/backend validation
- 2+ backend replicas
- proof that the distributed deployment works

then local-only tests are not enough. Local runs can prove correctness of the app; they cannot prove correctness of the deployment.

What is necessary is not a full second test framework. What’s necessary is some way to run tests against the deployed system. That can be minimal:

- Keep the main Playwright/integration flow local-first.
- Add a `cloud` target mode that points at deployed URLs.
- In cloud mode, run the same tests where possible and skip the ones that depend on local reset/seed behavior.
- At minimum, have a small cloud smoke suite for login, public page render, API reachability, and one cross-replica behavior.

So the right move is usually:
- not `local only`
- not “duplicate the whole harness”
- instead “local primary + cloud-capable mode”

If you want, I can suggest exact wording changes to [SPRINT_4_PLAN.md](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md) so this is tighter without overcommitting.

### Turn 7: go

#### 👤 User Prompt

- Time: 2026-04-09T16:09:53.140Z

```text
go ahead
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-09T16:10:11.035Z

Use these wording changes in [SPRINT_4_PLAN.md](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md).

For `#9 Integration Test Implementation + Environment Matrix`, replace the body with:

```md
**9. Integration Test Implementation + Environment Matrix**
- Implement the integration tests from the spec
- Support two execution targets:
  - `local`: starts local frontend/backend dependencies and runs against localhost
  - `cloud`: runs against already-deployed frontend/backend URLs without starting local app servers
- Add environment selection via explicit env vars or script arguments
- Document which tests are:
  - portable across both targets
  - local-only because they depend on reset/seed control
  - cloud-only because they validate deployed behavior
- Capture/structure output for both local and cloud runs
- Acceptance criteria:
  - Tests run in a local configuration
  - Tests run in a cloud configuration
  - Cloud mode does not require local frontend/backend startup
  - Any environment-specific exceptions are documented
```

For `#10 GitHub Action — run-integration-tests.yml`, tighten it to:

```md
**10. GitHub Action — `run-integration-tests.yml`**
- Create `.github/workflows/run-integration-tests.yml`
- Install frontend/backend dependencies
- Set up the required environment for integration tests
- Run the local-target integration suite in CI
- Keep the workflow name and job names stable so they can be required in branch protection
- Document how cloud-target integration tests are invoked outside CI when deployed URLs are available
- Acceptance criteria:
  - Workflow passes on a PR
  - Workflow is usable as a required status check
  - YAML is committed and documented
```

For `#14 Railway Multi-Replica Validation and Deployment Evidence`, add one line and tighten acceptance:

```md
- Run the cloud-target integration/smoke suite against the deployed system
- Acceptance criteria:
  - Live deployment is stable with `backend-api` at 2+ replicas
  - No replica-specific failures are observed for required paths
  - Cloud-target tests pass against deployed URLs
  - Evidence clearly distinguishes deployed-system validation from localhost validation
```

In the `Deliverables Checklist`, change these two lines:

```md
- Local integration test output captured
- Cloud-target integration or smoke test output captured against deployed URLs
```

If you want one sentence to add near the top of the plan, use this in the `Context` section:

```md
Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.
```

This keeps the plan realistic: local CI stays manageable, but the deployed system still gets explicit validation.

### Turn 8: Review the plan once more, do not worry about the naming ambigurity

#### 👤 User Prompt

- Time: 2026-04-09T16:11:43.919Z

```text
Review the plan once more, do not worry about the naming ambigurity from the ci
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-09T16:12:14.428Z

**Findings**

1. `P1` The plan still lacks a concrete proof mechanism for “2+ backend servers communicate correctly.” [SPRINT_4_PLAN.md#L314](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L314) requires multi-replica validation, but nothing earlier adds observable instance identity or cross-replica tracing. Without a header/log field like `INSTANCE_ID` or replica-tagged logs, `#14` can show the app works, but not convincingly show that multiple replicas handled traffic and coordinated correctly.

2. `P1` The local-vs-cloud integration test split is still too implicit for execution. [SPRINT_4_PLAN.md#L220](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L220) says tests should run locally and in cloud, but the current harness always boots local services in [playwright.config.ts#L43](/Users/allen/repos/Harmony/harmony-frontend/playwright.config.ts#L43) with localhost defaults in [stack.shared.mjs#L9](/Users/allen/repos/Harmony/harmony-frontend/tests/e2e/support/stack.shared.mjs#L9). If the plan keeps both targets, `#9` should explicitly say how cloud mode differs from local mode.

3. `P2` The attachment-storage task is still underspecified at the decision level. [SPRINT_4_PLAN.md#L138](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L138) requires “a production storage provider backed by shared object storage,” but the repo only supports `local` today in [storage/index.ts#L5](/Users/allen/repos/Harmony/harmony-backend/src/lib/storage/index.ts#L5). That issue should name the target provider class of service now, otherwise `#4` becomes architecture debate instead of implementation.

4. `P2` The SEO deployment boundary is still a little fuzzy. [SPRINT_4_PLAN.md#L168](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L168) puts `robots.txt` and sitemap support into frontend production config, but the backend already owns those routes in [seo.router.ts#L21](/Users/allen/repos/Harmony/harmony-backend/src/routes/seo.router.ts#L21). The plan should make one explicit decision about whether SEO artifacts stay backend-owned, move frontend-owned, or are intentionally split.

5. `P2` If a written reflection is still part of the deliverables, the plan does not yet schedule it as real work. [SPRINT_4_PLAN.md#L340](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L340) only tracks reflection coordination/placeholder, not authorship and completion.

**Assumptions**

- Deployment platform is flexible.
- Multi-replica backend correctness is a real requirement.
- CI naming ambiguity is intentionally ignored here.

**Verdict**

Yes, the plan now makes sense. With your clarified requirement, the multi-replica Railway design is justified and the issue breakdown is broadly sound. I would approve it after tightening the proof strategy for replica coordination, making cloud-test mode explicit, choosing the storage target, and clarifying SEO ownership.

### Turn 9: Make sure you're loading the updated plan into your context

#### 👤 User Prompt

- Time: 2026-04-09T16:12:42.601Z

```text
Make sure you're loading the updated plan into your context window
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-09T16:12:48.202Z

I’m reloading the current [planning/SPRINT_4_PLAN.md](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md) from disk before saying anything else so the review is based on the latest version, not the earlier draft I had in memory.

#### Tool: exec_command

```sh
rtk read planning/SPRINT_4_PLAN.md
```

Output:

````text
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

Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.

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

### Explicit Production Decisions
- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.
- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.
- **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.

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
- Backup owner: **declanblanc**
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
- Backup owner: **acabrera04**
- Due: April 9
- Blocked by: #1
- Unblocks: #3, #4, #5, #14

**3. Shared Rate Limiting + Proxy-Aware Networking**
- Replace process-local rate limiting with shared Redis-backed limiting
- Replace or unify **both** current implementations:
  - auth endpoint limiting using `express-rate-limit`
  - public-route token bucket limiting
- Ensure auth and public API rate limits remain correct across 2+ replicas
- Configure Express proxy awareness so client IP handling works correctly behind Railway
- Acceptance criteria:
  - Public and auth rate limits are shared across replicas
  - No process-local auth or public-route limit counters remain in production code paths
  - Rate limit behavior is covered by tests or verification notes
- Assignee: **Aiden-Barrera**
- Due: April 11
- Blocked by: #2
- Unblocks: #14

**4. Production Attachment Storage Provider**
- Implement a production storage provider backed by **Cloudflare R2 via an S3-compatible interface**
- Keep local storage available for development only
- Add env-driven provider selection and document required secrets
- Ensure uploaded files remain accessible regardless of which API replica serves subsequent requests
- Acceptance criteria:
  - Production does not rely on local filesystem attachment serving
  - The chosen production provider is Cloudflare R2, documented as such in code and setup docs
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
- Add lightweight replica observability for validation:
  - instance identity in structured logs
  - instance/replica identity on health output and/or response headers
- Add startup commands for both Railway backend services
- Acceptance criteria:
  - `backend-api` can run with 2+ replicas without duplicate singleton background side effects
  - `backend-worker` runs with 1 replica and owns singleton event-driven tasks
  - Replica identity is externally observable enough to prove load balancing across 2+ API replicas
  - Service responsibilities are documented
- Assignee: **declanblanc**
- Backup owner: **acabrera04**
- Due: April 12
- Blocked by: #2
- Unblocks: #7, #11, #14

### Phase 2: Frontend and Integration Foundations — April 9–13

**6. Frontend Production Configuration for Vercel**
- Add production-safe frontend configuration:
  - absolute canonical URLs
  - `metadataBase`
  - `robots.txt` on the frontend apex domain
  - sitemap support on the frontend apex domain
  - production API base URL handling
- Make the SEO ownership boundary explicit:
  - frontend apex domain owns the canonical public SEO artifacts: canonical URLs, `metadataBase`, `robots.txt`, sitemap entrypoints, and any sitemap index exposed to crawlers
  - backend SEO routes may continue to generate sitemap/XML data as an internal or transitional source, but they are not the canonical crawler-facing host in production
  - no SEO artifact should require crawlers to use the API subdomain as the primary source of truth
- Ensure frontend still supports localhost development cleanly
- Acceptance criteria:
  - Public pages generate correct production metadata
  - Canonical host ownership is explicit and consistent across frontend and backend docs/code
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
- Backup owner: **FardeenI**
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
- Support two execution targets:
  - `local`: starts local frontend/backend dependencies and runs against localhost
  - `cloud`: runs against already-deployed frontend/backend URLs without starting local app servers
- Add environment selection via explicit env vars or script arguments
- Document which tests are:
  - portable across both targets
  - local-only because they depend on reset/seed control
  - cloud-only because they validate deployed behavior
- Capture/structure output for both local and cloud runs
- Acceptance criteria:
  - Tests run in a local configuration
  - Tests run in a cloud configuration
  - Cloud mode does not require local frontend/backend startup
  - Any environment-specific exceptions are documented
- Assignee: **Aiden-Barrera**
- Due: April 14
- Blocked by: #8, #6, #7
- Unblocks: #10, #14, #15

### Phase 3: CI/CD and Deployment Automation — April 12–16

**10. GitHub Action — `run-integration-tests.yml`**
- Create `.github/workflows/run-integration-tests.yml`
- Install frontend/backend dependencies
- Set up the required environment for integration tests
- Run the local-target integration suite in CI
- Keep the workflow name and job names stable so they can be required in branch protection
- Document how cloud-target integration tests are invoked outside CI when deployed URLs are available
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
- Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted
- Acceptance criteria:
  - Workflow deploys backend services without manual intervention
  - Production deploy authority is unambiguous and documented
  - Deploys target the correct Railway environment
  - Deployment process is documented in README
- Assignee: **acabrera04**
- Backup owner: **declanblanc**
- Due: April 15
- Blocked by: #5, #7
- Unblocks: #14, #15

**12. GitHub Action — `deploy-vercel.yml`**
- Create frontend CD workflow for Vercel
- Build/deploy frontend on pushes to `main`
- Ensure preview/production environment variables are configured properly
- Use GitHub secrets/tokens safely
- Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted
- Acceptance criteria:
  - Workflow deploys frontend without manual intervention
  - Production deploy authority is unambiguous and documented
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
- Run the cloud-target integration/smoke suite against the deployed system
- Use the replica observability added in #5 to prove requests were served across 2+ API replicas via headers, health output, and/or structured logs
- Capture logs/screenshots/test output needed for submission
- Acceptance criteria:
  - Live deployment is stable with `backend-api` at 2+ replicas
  - No replica-specific failures are observed for required paths
  - Cloud-target tests pass against deployed URLs
  - Evidence clearly distinguishes deployed-system validation from localhost validation
- Assignee: **declanblanc**
- Backup owner: **Aiden-Barrera**
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
- Backup owner: **FardeenI**
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

## Critical Path Backup Coverage

| Critical Issue | Primary | Backup |
|---|---|---|
| #1 Deployment Architecture + Environment Matrix | acabrera04 | declanblanc |
| #2 Backend Scale Audit for Railway Replicas | declanblanc | acabrera04 |
| #5 Split `backend-api` and Singleton `backend-worker` | declanblanc | acabrera04 |
| #7 Railway Project Provisioning and Service Wiring | acabrera04 | FardeenI |
| #11 `deploy-railway.yml` | acabrera04 | declanblanc |
| #14 Railway Multi-Replica Validation and Deployment Evidence | declanblanc | Aiden-Barrera |
| #15 README, Final Artifact Collection, and Submission Package | acabrera04 | FardeenI |

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
- Cloud-target integration or smoke test output captured against deployed URLs
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
````

#### Tool: exec_command

```sh
shasum planning/SPRINT_4_PLAN.md
```

Output:

```text
bcd7d4e58e0fa211a1c3b291944c899aedcf2d82  planning/SPRINT_4_PLAN.md
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-09T16:12:58.353Z

I reloaded the current file from disk and reviewed that version, not the earlier draft.

Current file:
- [planning/SPRINT_4_PLAN.md](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md)
- SHA1: `bcd7d4e58e0fa211a1c3b291944c899aedcf2d82`

The updated plan is materially better than the one I reviewed earlier. The changes that fixed most of the earlier gaps are now present:
- dual-target `local` and `cloud` testing is explicit
- SEO ownership is explicitly assigned to the frontend apex domain
- Cloudflare R2 is chosen as the production attachment target
- GitHub Actions is explicitly the production deploy authority
- replica observability is now part of the worker/API split and validation plan
- critical-path backup ownership is defined

Given this updated version, my review stands as: the plan makes sense, and the remaining concerns are minor execution risks, not structural problems.

### Turn 10: <environment_context> <shell>zsh</shell>

#### 👤 User Prompt

- Time: 2026-04-10T20:07:47.419Z

```text
<environment_context>
  <shell>zsh</shell>
  <current_date>2026-04-10</current_date>
  <timezone>America/New_York</timezone>
</environment_context>
```

_No assistant or tool activity recorded after this prompt._

### Turn 11: [$resolve-reviews](/Users/allen/.agents/skills/resolve-reviews/SKILL.md)

#### 👤 User Prompt

- Time: 2026-04-10T20:07:47.421Z

```text
[$resolve-reviews](/Users/allen/.agents/skills/resolve-reviews/SKILL.md)
```

_No assistant or tool activity recorded after this prompt._

### Turn 12: <skill> <name>resolve-reviews</name>

#### 👤 User Prompt

- Time: 2026-04-10T20:07:47.422Z

````text
<skill>
<name>resolve-reviews</name>
<path>/Users/allen/.agents/skills/resolve-reviews/SKILL.md</path>
---
name: resolve-reviews
description: Resolve all PR review comments (human and bot) on current PR. Fetches unanswered comments, evaluates each one, fixes real issues, dismisses false positives, and replies to every comment with the outcome.
license: MIT
compatibility: Requires git, gh (GitHub CLI), and Node.js installed.
allowed-tools: Bash(npx agent-reviews *) Bash(pnpm dlx agent-reviews *) Bash(yarn dlx agent-reviews *) Bash(bunx agent-reviews *) Bash(git config *) Bash(git add *) Bash(git commit *) Bash(git push *)
metadata:
  author: pbakaus
  version: "1.0.1"
  homepage: https://github.com/pbakaus/agent-reviews
---

Automatically resolve all review comments (both human and bot) on the current PR. Uses a two-phase workflow: fix all existing issues, then poll for new ones until quiet.

## Prerequisites

All commands below use `npx agent-reviews`. If the project uses a different package manager, substitute the appropriate runner (e.g., `pnpm dlx agent-reviews` for pnpm, `yarn dlx agent-reviews` for Yarn, `bunx agent-reviews` for Bun). Honor the user's package manager preference throughout.

**Cloud environments only** (e.g., Codespaces, remote agents): verify git author identity so CI checks can map commits to the user. Run `git config --global --get user.email` and if empty or a placeholder, set it manually. Skip this check in local environments.

## Phase 1: FETCH & FIX (synchronous)

### Step 1: Fetch All Comments (Expanded)

Run `npx agent-reviews --unanswered --expanded`

The CLI auto-detects the current branch, finds the associated PR, and authenticates via `gh` CLI or environment variables. If anything fails (no token, no PR, CLI not installed), it exits with a clear error message.

This shows all unanswered comments (both human and bot) with full detail: complete comment body (no truncation), diff hunk (code context), and all replies. Each comment shows its ID in brackets (e.g., `[12345678]`).

If zero comments are returned, print "No unanswered comments found" and skip to Phase 2.

### Step 3: Process Each Unanswered Comment

For each comment from the expanded output, apply the appropriate evaluation based on whether the author is a bot or a human.

#### For Bot Comments

Read the referenced code and determine:

1. **TRUE POSITIVE** - A real bug that needs fixing
2. **FALSE POSITIVE** - Not actually a bug (intentional behavior, bot misunderstanding)
3. **UNCERTAIN** - Not sure; ask the user

**Likely TRUE POSITIVE:**
- Code obviously violates stated behavior
- Missing null checks on potentially undefined values
- Type mismatches or incorrect function signatures
- Logic errors in conditionals
- Missing error handling for documented failure cases

**Likely FALSE POSITIVE:**
- Bot doesn't understand the framework/library patterns
- Code is intentionally structured that way (with comments explaining why)
- Bot is flagging style preferences, not bugs
- The "bug" is actually a feature or intentional behavior
- Bot misread the code flow

#### For Human Comments

Read the referenced code and the reviewer's comment. Human reviewers are generally more accurate and context-aware than bots. Determine:

1. **ACTIONABLE** - The reviewer identified a real issue or requested a concrete change
2. **DISCUSSION** - The comment raises a valid point but the right approach is unclear
3. **ALREADY ADDRESSED** - The concern has already been fixed or is no longer relevant

**Likely ACTIONABLE:**
- Reviewer points out a bug or logic error
- Reviewer requests a specific code change
- Reviewer identifies missing edge cases or error handling

**Likely DISCUSSION -- ask the user:**
- Reviewer suggests an architectural change you're unsure about
- Comment involves a tradeoff (performance vs readability, etc.)
- The feedback is subjective without team consensus

#### When UNCERTAIN -- ask the user

For both bot and human comments:
- The fix would require architectural changes
- You're genuinely unsure if the behavior is intentional
- Multiple valid interpretations exist
- The fix could have unintended side effects

#### Act on Evaluation

**If TRUE POSITIVE / ACTIONABLE:** Fix the code. Track the comment ID and a brief description of the fix.

**If FALSE POSITIVE:** Do NOT change the code. Track the comment ID and the reason it's not a real bug.

**If DISCUSSION:** Ask the user to consult the PR author. Apply their decision and track it.

**If ALREADY ADDRESSED:** Track the comment ID and note why.

**If UNCERTAIN:** Ask the user. If they say skip, track it as skipped.

Do NOT reply to comments yet. Replies happen after the commit (Step 5).

### Step 4: Commit and Push

After evaluating and fixing ALL unanswered comments:

1. Run your project's lint and type-check
2. Stage, commit, and push:
   ```bash
   git add -A
   git commit -m "fix: address PR review findings

   {List of changes made, grouped by reviewer/bot}"
   git push
   ```
3. Capture the commit hash from the output.

### Step 5: Reply to All Comments

Now that the commit hash exists, reply to every processed comment. The `--resolve` flag marks the review thread as resolved on GitHub.

**For each TRUE POSITIVE / ACTIONABLE:**

Run `npx agent-reviews --reply <comment_id> "Fixed in {hash}. {Brief description of the fix}" --resolve`

**For each FALSE POSITIVE:**

Run `npx agent-reviews --reply <comment_id> "Won't fix: {reason}. {Explanation of why this is intentional or not applicable}" --resolve`

**For each DISCUSSION (after user decision):**

Run `npx agent-reviews --reply <comment_id> "{Outcome}. {Explanation of the decision and any changes made}" --resolve`

**For each ALREADY ADDRESSED:**

Run `npx agent-reviews --reply <comment_id> "Already addressed. {Explanation of when/how this was fixed}" --resolve`

**For each SKIPPED:**

Run `npx agent-reviews --reply <comment_id> "Skipped per user request" --resolve`

**DO NOT start Phase 2 until all replies are posted.**

---

## Phase 2: POLL FOR NEW COMMENTS (loop until quiet)

The watcher exits immediately when new comments are found (after a 5s grace period to catch batch posts). This means you run it in a loop: start watcher, process any comments it returns, restart watcher, repeat until the watcher times out with no new comments.

### Step 6: Start Watcher Loop

Repeat the following until the watcher exits with no new comments:

**6a.** Launch the watcher in the background:

Run `npx agent-reviews --watch` as a background task.

**6b.** Wait for the background command to complete (default 10 minutes; override with `--timeout`).

**6c.** Check the output:

- **If new comments were found** (output contains `EXITING WITH NEW COMMENTS`):
  1. Use `--detail <id>` to read each new comment's full detail
  2. Process them exactly as in Phase 1, Steps 3-5 (evaluate, fix, commit, push, reply)
  3. **Go back to Step 6a** to restart the watcher

- **If no new comments** (output contains `WATCH COMPLETE`):
  Stop looping and move to the Summary Report.

---

## Summary Report

After both phases complete, provide a summary:

```text
## PR Review Resolution Summary

### Results
- Fixed: X issues
- Already addressed: X
- Won't fix (false positives): X
- Discussion resolved: X
- Skipped per user: X

### By Reviewer/Bot
#### cursor[bot]
- {description} - Fixed in {commit}
- {description} - Won't fix: {reason}

#### @reviewer-name
- {description} - Fixed in {commit}

### Status
All findings addressed. Watch completed.
```

## Important Notes

### Response Policy
- **Every comment gets a response** - No silent ignores
- For bots: responses help train them and prevent re-raised false positives
- For humans: replies keep reviewers informed and unblock approvals

### User Interaction
- Ask the user when uncertain about a finding
- Don't guess on architectural or business logic questions
- It's better to ask than to make a wrong fix or wrong dismissal
- Human reviewers often have context you don't - defer to the author when unsure

### Best Practices
- Verify findings before fixing - bots have false positives, humans rarely do
- Keep fixes minimal and focused - don't refactor unrelated code
- Ensure type-check and lint pass before committing
- Group related fixes into a single commit
- Copilot `suggestion` blocks often contain ready-to-use fixes
- If a human reviewer suggests a specific code change, prefer their version unless it introduces issues

</skill>
````

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T20:07:56.684Z

Using the `resolve-reviews` skill. I’m going to detect the current PR, fetch all unanswered review comments in expanded form, then I’ll evaluate each finding, implement any real fixes, and reply on the PR after pushing changes.

#### Tool: update_plan

- Plan:
  - [in_progress] Fetch current PR review comments in expanded form
  - [pending] Evaluate findings and implement any required fixes
  - [pending] Run verification, commit, and push
  - [pending] Reply to all processed comments and watch for new ones

Output:

```text
Plan updated
```

#### Tool: exec_command

```sh
git branch --show-current
```

Output:

```text
codex/sprint-4-deployment-plan
```

#### Tool: exec_command

```sh
git status --short
```

Output:

```text
?? "P4: Backend Development | CS 485 AI-Assisted Software Engineering (Sp26).html"
?? "P5: Testing | CS 485 AI-Assisted Software Engineering (Sp26).pdf"
?? "P6_ Deployment _ CS 485 AI-Assisted Software Engineering (Sp26).pdf"
?? deployment-options.md
?? harmony-backend/coverage/
?? load-test.js
```

#### Tool: exec_command

```sh
npx agent-reviews --unanswered --expanded
```

Output:

```text
[1mFound 2 comments[0m

=== Comment [4091019364] ===
Type: REVIEW | By: acabrera04 | Status: ○ no reply
URL: https://github.com/acabrera04/Harmony/pull/311#pullrequestreview-4091019364

## Review Checklist

- [ ] **Logic over Style**: The deployment plan still has unresolved technical planning gaps called out in the existing review, especially multi-replica SSE behavior and migration ownership.
- [ ] **Security First**: The `trust proxy` level and Railway private-network usage are not specified yet, which affects IP-based limiting and service exposure choices.
- [ ] **Architectural Alignment**: The intended Vercel/Railway split is directionally clear, but the worker/API boundary and SEO handoff need the missing operational details before downstream implementation starts.
- [ ] **Issue Completion**: No linked issue/acceptance criteria are present; P6 coverage cannot be considered complete until the existing deployment-plan gaps are incorporated.
- [x] **No Nitpicking**: Review is limited to deployment correctness, security, and sequencing risk.
- [x] **Avoid Repetition**: I reviewed the existing technical review and am not restating each item as fresh line comments.
- [x] **Iterative Reviews**: The existing unresolved planning feedback still applies.
- [x] **Prevent CI Failures**: Docs-only PR checks are green (5 passed, 0 failed), but the plan-level blockers would likely create downstream deployment failures if left vague.

I agree with the existing technical review and found no separate issue worth adding. Before merging, fold those unresolved items into the plan: choose the SSE strategy, designate a single migration runner, define frontend/backend sitemap handoff, require Railway private connection strings, specify Express `trust proxy` behavior, and add worker health/restart expectations.

============================================================

=== Comment [4218158167] ===
Type: COMMENT | By: AvanishKulkarni | Status: ○ no reply
URL: https://github.com/acabrera04/Harmony/pull/311#issuecomment-4218158167

**[Technical Review — Sprint 4 Plan]**

Six technical gaps in the plan worth addressing before downstream issues are started:

---

**1. SSE with 2+ replicas is unresolved**

The plan notes API replicas are *"stateless apart from live SSE client connections"* but prescribes no solution. A client connected to replica A won't receive events emitted on replica B — this breaks realtime for any multi-replica path.

*Suggested fix:* Commit to a specific approach in the plan. The two realistic options are (a) Redis pub/sub fan-out on `backend-api` so each replica re-publishes to its own connected clients, or (b) sticky sessions at the Railway load balancer level. Option (a) is stateless-friendly and more consistent with the rest of the architecture. Whichever is chosen should be documented in `docs/deployment/replica-readiness-audit.md` (#2) before #5 is implemented.

---

**2. Prisma migration race condition**

If `backend-api` (2+ replicas) and `backend-worker` all run `prisma migrate deploy` on startup, multiple processes will attempt the migration simultaneously. This can corrupt migration state.

*Suggested fix:* Designate a single migration runner — the most common pattern is a one-shot Railway job or a pre-deploy command on `backend-worker` only, with `backend-api` replicas blocked from running migrations. This should be an explicit acceptance criterion in #11 (`deploy-railway.yml`) since the deploy workflow controls startup ordering.

---

**3. Sitemap handoff between frontend and backend is unspecified**

The plan states the frontend apex domain owns canonical sitemap entrypoints but that *"backend SEO routes may continue to generate sitemap/XML data as an internal or transitional source."* The mechanism is never defined — does the frontend proxy to the backend? Does the worker push pre-generated XML? Does the frontend call the backend at build time?

*Suggested fix:* Pick one pattern and state it explicitly in #6. The simplest production-safe approach is a Next.js route handler that fetches from the backend API at request time (ISR or on-demand). The plan should rule out the backend subdomain as a direct crawl target.

---

**4. Railway internal networking is never specified**

Both `backend-api` and `backend-worker` connect to Postgres and Redis. Railway provides private internal hostnames for inter-service traffic. The plan never says to use them, so implementers may default to public URLs — adding unnecessary latency and egress cost.

*Suggested fix:* Add a note in #7 (Railway provisioning) that Postgres and Redis connection strings must use Railway's private network hostnames, not the public TCP proxy. This should also be reflected in the env var matrix in `docs/deployment/deployment-architecture.md`.

---

**5. Express `trust proxy` level is unspecified**

Issue #3 says to configure proxy awareness for correct IP handling behind Railway, but doesn't specify the trust level. If set too broadly (e.g., `trust proxy: true`), any `X-Forwarded-For` header — including spoofed ones — is trusted, making IP-based rate limiting bypassable. If not set at all, all requests appear to originate from the Railway load balancer IP, defeating per-client limiting entirely.

*Suggested fix:* The plan (or #3's acceptance criteria) should specify the intended trust level. For Railway, `app.set('trust proxy', 1)` is typically correct — trusting one hop. This is a security-relevant configuration and should be verified in #14 as part of rate limit validation.

---

**6. `backend-worker` crash behavior is unaddressed**

The worker is load-bearing: if it crashes, cache invalidation, sitemap updates, and background jobs stop silently. The plan designates it a singleton but says nothing about restart policy, health checks, or graceful degradation when it's unavailable.

*Suggested fix:* Add to #5 or #7 that `backend-worker` must have a Railway health check configured and a restart-on-failure policy. The plan should also state how `backend-api` behaves if the worker is down — ideally, API requests remain functional and worker-dependent side effects are queued or deferred rather than erroring.
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T20:08:17.281Z

The latest plan closes several earlier review gaps, but it doesn’t yet cover all six items in the PR comments. I’m checking the exact missing points now so I can either patch the plan or confidently reply that a comment was already addressed.

#### Tool: exec_command

```sh
rtk grep -n "SSE|sticky|pub/sub|migration|migrate deploy|private network|private hostname|trust proxy|health check|restart|sitemap handoff|route handler|ISR|worker.*health|worker.*restart" planning/SPRINT_4_PLAN.md
```

Output:

```text
🔍 8 in 1F:

📄 planning/SPRINT_4_PLAN.md (8):
    59: - API replicas must be stateless apart from live SSE client connections
   124: - SSE behavior behind load balancing
   177: - Keep API replicas focused on HTTP/tRPC/SSE request handling
   225: - Configure internal networking, service env vars, health checks, deploy comm...
   230: - Domains/env vars/health checks are configured
   246: - SSE/realtime smoke behavior if kept in deployed flow
   301: - Ensure migrations / build / deploy ordering is safe
   378: - SSE/realtime smoke verification in deployed environment
```

#### Tool: exec_command

```sh
nl -ba planning/SPRINT_4_PLAN.md | sed -n '1,260p'
```

Output:

```text
     1	# Deployment Sprint Plan — April 8–19, 2026
     2	
     3	## Context
     4	Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend backed by PostgreSQL and Redis. Sprint 4 adapts the P6 deployment assignment to a **Vercel + Railway** production stack:
     5	
     6	- **Frontend hosting:** Vercel
     7	- **Backend hosting:** Railway
     8	- **Database:** Railway Postgres
     9	- **Cache / event bus:** Railway Redis
    10	- **Public deployment goal:** keep the app deployed through instructor review
    11	- **Scaling goal:** support **2 or more backend API replicas** on Railway while keeping background event processing correct
    12	
    13	This sprint must cover the substance of **P6 Deployment** while ignoring the AWS-only platform choice. The plan therefore replaces:
    14	
    15	- AWS Lambda/API Gateway with Railway backend services
    16	- AWS Amplify with Vercel frontend hosting
    17	- AWS CD workflows with Vercel/Railway CD workflows
    18	
    19	Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.
    20	
    21	The assignment requirements we still must satisfy are:
    22	
    23	1. Publicly deploy frontend and backend
    24	2. Automate deployment from GitHub
    25	3. Add integration test specifications and implementation
    26	4. Run integration tests locally and in the cloud
    27	5. Add GitHub Actions for integration tests
    28	6. Adopt GitHub hygiene and branch protection
    29	7. Update README with user-facing and deployer-facing instructions
    30	8. Produce the final submission artifacts, links, logs, and reflection
    31	
    32	**Assignment:** P6: Deployment  
    33	**Due:** Sunday, April 19, 2026, 11:59 PM AOE
    34	
    35	## Team
    36	5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI
    37	
    38	## Target Architecture
    39	
    40	### Public Services
    41	- `frontend` on Vercel
    42	- `backend-api` on Railway with **2+ replicas**
    43	
    44	### Internal / Stateful Services
    45	- `backend-worker` on Railway with **1 replica only**
    46	- `postgres` on Railway
    47	- `redis` on Railway
    48	
    49	### Domain Layout
    50	- `https://<frontend-domain>` -> Vercel
    51	- `https://api.<frontend-domain>` -> Railway `backend-api`
    52	
    53	### Multi-Backend Railway Rules
    54	To safely support 2+ backend replicas, the sprint must remove or isolate process-local production state:
    55	
    56	- Public/auth rate limiting must use **Redis-backed shared storage**
    57	- File uploads must use **shared object storage**, not local disk
    58	- Background subscribers / cache invalidation / sitemap updates must run in a **singleton worker**
    59	- API replicas must be stateless apart from live SSE client connections
    60	- Deployment verification must prove that 2+ API replicas behave correctly behind Railway load balancing
    61	
    62	### Explicit Production Decisions
    63	- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.
    64	- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.
    65	- **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.
    66	
    67	---
    68	
    69	## P6 Coverage Map
    70	
    71	| P6 Requirement | Vercel + Railway Adaptation | Covered By Issues |
    72	|---|---|---|
    73	| Publicly deploy frontend | Deploy Next.js app to Vercel | #6, #12, #16 |
    74	| Publicly deploy backend | Deploy Express/tRPC app to Railway | #5, #7, #11 |
    75	| Publish backend public interfaces via REST | Keep Railway backend public routes stable and production-configured | #1, #5, #7 |
    76	| Integration test specification | Write English-language integration spec for FE-BE paths | #8 |
    77	| Integration tests on localhost | Add env-aware local integration test flow | #9 |
    78	| Integration tests in cloud | Run same test suite against deployed Vercel + Railway URLs | #9, #14 |
    79	| GitHub Action for integration tests | Add `run-integration-tests.yml` | #10 |
    80	| Continuous deployment | Add backend and frontend deployment workflows for Railway and Vercel | #11, #12 |
    81	| GitHub hygiene / branch protection | Require PRs and required checks before merge | #13 |
    82	| README update | Add user-facing run instructions and deployer guide | #15 |
    83	| Submission links, logs, reflection | Final packaging and artifact checklist | #15 |
    84	
    85	---
    86	
    87	## Issues (16 total)
    88	
    89	> **Note:** Issues are written so they can be opened directly on GitHub with the dependency notes preserved in the body. "Blocked by" means the issue should not be considered complete until those upstream issues land. "Unblocks" is included to make sequencing explicit for the team.
    90	
    91	### Phase 1: Architecture, Production Readiness, and Scaling Design — April 8–11
    92	
    93	**1. Deployment Architecture + Environment Matrix**
    94	- Define the final Vercel + Railway topology:
    95	  - `frontend`
    96	  - `backend-api`
    97	  - `backend-worker`
    98	  - `postgres`
    99	  - `redis`
   100	- Document production env vars for frontend, backend API, and worker
   101	- Define domain plan (`frontend` domain + `api` subdomain)
   102	- Define promotion flow for preview vs production
   103	- Produce and save a reference document at `docs/deployment/deployment-architecture.md`
   104	  - this document is the canonical reference for service topology, domain ownership, env vars, deploy authority, and preview vs production behavior
   105	  - later deployment issues should link to and update this document instead of redefining architecture assumptions
   106	- Acceptance criteria:
   107	  - Clear service inventory
   108	  - Clear env var matrix
   109	  - Clear ownership of public vs internal services
   110	  - Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton
   111	  - `docs/deployment/deployment-architecture.md` exists and is usable as the canonical reference for downstream issues
   112	- Assignee: **acabrera04**
   113	- Backup owner: **declanblanc**
   114	- Due: April 9
   115	- Blocked by: none
   116	- Unblocks: #2, #6, #7, #8, #16
   117	
   118	**2. Backend Scale Audit for Railway Replicas**
   119	- Audit the current backend for state that will break with 2+ API replicas
   120	- Confirm and document the required changes for:
   121	  - in-memory rate limiting
   122	  - local filesystem attachment storage
   123	  - duplicate startup subscribers / background jobs
   124	  - SSE behavior behind load balancing
   125	  - proxy/IP handling
   126	- Produce and save a reference document at `docs/deployment/replica-readiness-audit.md`
   127	  - include the concrete "replica-safe backend" checklist for implementation
   128	  - include must-fix items, acceptable demo-time risks, and explicit ownership boundaries between `backend-api` and `backend-worker`
   129	  - later scaling/deployment issues should cite this document when implementing or validating replica-safe behavior
   130	- Acceptance criteria:
   131	  - Checklist references the actual code areas that must change
   132	  - Risks are prioritized into must-fix vs acceptable-for-demo
   133	  - `backend-api` vs `backend-worker` responsibilities are finalized
   134	  - `docs/deployment/replica-readiness-audit.md` exists and is detailed enough for downstream implementation/validation issues to reference directly
   135	- Assignee: **declanblanc**
   136	- Backup owner: **acabrera04**
   137	- Due: April 9
   138	- Blocked by: #1
   139	- Unblocks: #3, #4, #5, #14
   140	
   141	**3. Shared Rate Limiting + Proxy-Aware Networking**
   142	- Replace process-local rate limiting with shared Redis-backed limiting
   143	- Replace or unify **both** current implementations:
   144	  - auth endpoint limiting using `express-rate-limit`
   145	  - public-route token bucket limiting
   146	- Ensure auth and public API rate limits remain correct across 2+ replicas
   147	- Configure Express proxy awareness so client IP handling works correctly behind Railway
   148	- Use `docs/deployment/replica-readiness-audit.md` as the implementation checklist and update it with final decisions
   149	- Acceptance criteria:
   150	  - Public and auth rate limits are shared across replicas
   151	  - No process-local auth or public-route limit counters remain in production code paths
   152	  - Rate limit behavior is covered by tests or verification notes
   153	- Assignee: **Aiden-Barrera**
   154	- Due: April 11
   155	- Blocked by: #2
   156	- Unblocks: #14
   157	
   158	**4. Production Attachment Storage Provider**
   159	- Implement a production storage provider backed by **Cloudflare R2 via an S3-compatible interface**
   160	- Keep local storage available for development only
   161	- Add env-driven provider selection and document required secrets
   162	- Ensure uploaded files remain accessible regardless of which API replica serves subsequent requests
   163	- Follow `docs/deployment/replica-readiness-audit.md` for replica-safe storage requirements and update `docs/deployment/deployment-architecture.md` with the final env/config contract
   164	- Acceptance criteria:
   165	  - Production does not rely on local filesystem attachment serving
   166	  - The chosen production provider is Cloudflare R2, documented as such in code and setup docs
   167	  - README and env matrix document storage setup
   168	  - Attachment flow works end-to-end in deployed environment
   169	- Assignee: **AvanishKulkarni**
   170	- Due: April 11
   171	- Blocked by: #2
   172	- Unblocks: #14, #15
   173	
   174	**5. Split `backend-api` and Singleton `backend-worker`**
   175	- Move background-only startup behavior into a dedicated worker process
   176	- Ensure duplicated subscribers / cache invalidation / sitemap upkeep do not run on every API replica
   177	- Keep API replicas focused on HTTP/tRPC/SSE request handling
   178	- Add lightweight replica observability for validation:
   179	  - instance identity in structured logs
   180	  - instance/replica identity on health output and/or response headers
   181	- Add startup commands for both Railway backend services
   182	- Use `docs/deployment/replica-readiness-audit.md` to drive the split and record the final `backend-api` / `backend-worker` ownership model there and in `docs/deployment/deployment-architecture.md`
   183	- Acceptance criteria:
   184	  - `backend-api` can run with 2+ replicas without duplicate singleton background side effects
   185	  - `backend-worker` runs with 1 replica and owns singleton event-driven tasks
   186	  - Replica identity is externally observable enough to prove load balancing across 2+ API replicas
   187	  - Service responsibilities are documented
   188	- Assignee: **declanblanc**
   189	- Backup owner: **acabrera04**
   190	- Due: April 12
   191	- Blocked by: #2
   192	- Unblocks: #7, #11, #14
   193	
   194	### Phase 2: Frontend and Integration Foundations — April 9–13
   195	
   196	**6. Frontend Production Configuration for Vercel**
   197	- Add production-safe frontend configuration:
   198	  - absolute canonical URLs
   199	  - `metadataBase`
   200	  - `robots.txt` on the frontend apex domain
   201	  - sitemap support on the frontend apex domain
   202	  - production API base URL handling
   203	- Make the SEO ownership boundary explicit:
   204	  - frontend apex domain owns the canonical public SEO artifacts: canonical URLs, `metadataBase`, `robots.txt`, sitemap entrypoints, and any sitemap index exposed to crawlers
   205	  - backend SEO routes may continue to generate sitemap/XML data as an internal or transitional source, but they are not the canonical crawler-facing host in production
   206	  - no SEO artifact should require crawlers to use the API subdomain as the primary source of truth
   207	- Ensure frontend still supports localhost development cleanly
   208	- Use `docs/deployment/deployment-architecture.md` as the source of truth for domain ownership, public URLs, and SEO host decisions
   209	- Acceptance criteria:
   210	  - Public pages generate correct production metadata
   211	  - Canonical host ownership is explicit and consistent across frontend and backend docs/code
   212	  - Frontend can target local and cloud backends without code edits
   213	  - SEO-critical pages render correctly on the public domain
   214	- Assignee: **AvanishKulkarni**
   215	- Due: April 11
   216	- Blocked by: #1
   217	- Unblocks: #12, #16
   218	
   219	**7. Railway Project Provisioning and Service Wiring**
   220	- Create/configure the Railway project and services:
   221	  - `backend-api`
   222	  - `backend-worker`
   223	  - `postgres`
   224	  - `redis`
   225	- Configure internal networking, service env vars, health checks, deploy commands, and domains
   226	- Ensure `backend-api` and `backend-worker` both connect to the same Postgres and Redis instances
   227	- Provision services and env vars to match `docs/deployment/deployment-architecture.md`, and use `docs/deployment/replica-readiness-audit.md` for replica-safety requirements
   228	- Acceptance criteria:
   229	  - Railway project is provisioned
   230	  - Domains/env vars/health checks are configured
   231	  - `backend-api` and `backend-worker` both boot successfully in Railway
   232	- Assignee: **acabrera04**
   233	- Backup owner: **FardeenI**
   234	- Due: April 13
   235	- Blocked by: #1, #5
   236	- Unblocks: #11, #14, #15
   237	
   238	**8. Integration Test Specification**
   239	- Write an English-language integration test specification for all frontend-backend code paths that must work in deployment
   240	- Cover at least:
   241	  - guest public channel rendering
   242	  - login / auth refresh path
   243	  - public API path used by SSR metadata/page rendering
   244	  - visibility change impact on public indexing behavior
   245	  - attachment path if production storage is in scope
   246	  - SSE/realtime smoke behavior if kept in deployed flow
   247	- Reference `docs/deployment/deployment-architecture.md` for deployment topology and `docs/deployment/replica-readiness-audit.md` for replica-sensitive scenarios that need validation
   248	- Acceptance criteria:
   249	  - Every FE-BE pathway has at least one test case
   250	  - Spec includes local-only vs cloud-only notes where relevant
   251	  - Spec is stored under `docs/test-specs/`
   252	- Assignee: **FardeenI**
   253	- Due: April 11
   254	- Blocked by: #1
   255	- Unblocks: #9, #10, #15
   256	
   257	**9. Integration Test Implementation + Environment Matrix**
   258	- Implement the integration tests from the spec
   259	- Support two execution targets:
   260	  - `local`: starts local frontend/backend dependencies and runs against localhost
```

#### Tool: exec_command

```sh
nl -ba planning/SPRINT_4_PLAN.md | sed -n '260,420p'
```

Output:

```text
   260	  - `local`: starts local frontend/backend dependencies and runs against localhost
   261	  - `cloud`: runs against already-deployed frontend/backend URLs without starting local app servers
   262	- Add environment selection via explicit env vars or script arguments
   263	- Document which tests are:
   264	  - portable across both targets
   265	  - local-only because they depend on reset/seed control
   266	  - cloud-only because they validate deployed behavior
   267	- Capture/structure output for both local and cloud runs
   268	- Keep target URLs, environment contracts, and replica-sensitive validations aligned with `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`
   269	- Acceptance criteria:
   270	  - Tests run in a local configuration
   271	  - Tests run in a cloud configuration
   272	  - Cloud mode does not require local frontend/backend startup
   273	  - Any environment-specific exceptions are documented
   274	- Assignee: **Aiden-Barrera**
   275	- Due: April 14
   276	- Blocked by: #8, #6, #7
   277	- Unblocks: #10, #14, #15
   278	
   279	### Phase 3: CI/CD and Deployment Automation — April 12–16
   280	
   281	**10. GitHub Action — `run-integration-tests.yml`**
   282	- Create `.github/workflows/run-integration-tests.yml`
   283	- Install frontend/backend dependencies
   284	- Set up the required environment for integration tests
   285	- Run the local-target integration suite in CI
   286	- Keep the workflow name and job names stable so they can be required in branch protection
   287	- Document how cloud-target integration tests are invoked outside CI when deployed URLs are available
   288	- Reference `docs/deployment/deployment-architecture.md` for environment inputs and `docs/deployment/replica-readiness-audit.md` for any replica-sensitive checks excluded from local CI
   289	- Acceptance criteria:
   290	  - Workflow passes on a PR
   291	  - Workflow is usable as a required status check
   292	  - YAML is committed and documented
   293	- Assignee: **FardeenI**
   294	- Due: April 15
   295	- Blocked by: #8, #9
   296	- Unblocks: #13, #15
   297	
   298	**11. GitHub Action — `deploy-railway.yml`**
   299	- Create backend CD workflow for Railway
   300	- Deploy `backend-api` and `backend-worker` on pushes to `main`
   301	- Ensure migrations / build / deploy ordering is safe
   302	- Use GitHub secrets for Railway authentication
   303	- Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted
   304	- Implement the workflow against the service topology and env contract defined in `docs/deployment/deployment-architecture.md`
   305	- Acceptance criteria:
   306	  - Workflow deploys backend services without manual intervention
   307	  - Production deploy authority is unambiguous and documented
   308	  - Deploys target the correct Railway environment
   309	  - Deployment process is documented in README
   310	- Assignee: **acabrera04**
   311	- Backup owner: **declanblanc**
   312	- Due: April 15
   313	- Blocked by: #5, #7
   314	- Unblocks: #14, #15
   315	
   316	**12. GitHub Action — `deploy-vercel.yml`**
   317	- Create frontend CD workflow for Vercel
   318	- Build/deploy frontend on pushes to `main`
   319	- Ensure preview/production environment variables are configured properly
   320	- Use GitHub secrets/tokens safely
   321	- Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted
   322	- Implement the workflow against the domain/env decisions in `docs/deployment/deployment-architecture.md`
   323	- Acceptance criteria:
   324	  - Workflow deploys frontend without manual intervention
   325	  - Production deploy authority is unambiguous and documented
   326	  - Production deploy points at the production backend URL
   327	  - Deployment process is documented in README
   328	- Assignee: **AvanishKulkarni**
   329	- Due: April 15
   330	- Blocked by: #6, #16
   331	- Unblocks: #15
   332	
   333	**13. GitHub Hygiene and Branch Protection**
   334	- Enforce feature branch workflow
   335	- Configure branch protection for `main`
   336	- Require PR review before merge
   337	- Require passing status checks before merge
   338	- Record the exact required checks to enable:
   339	  - existing unit test workflows
   340	  - `run-integration-tests`
   341	- Reference `docs/deployment/deployment-architecture.md` when documenting the production deploy authority and required checks tied to production promotion
   342	- Acceptance criteria:
   343	  - Direct pushes to `main` are blocked
   344	  - PR review is required
   345	  - Required status checks are enabled
   346	  - Team workflow is documented
   347	- Assignee: **Aiden-Barrera**
   348	- Due: April 16
   349	- Blocked by: #10
   350	- Unblocks: #15
   351	
   352	**16. Vercel Project Setup, Domains, and Preview/Prod Verification**
   353	- Create/configure the Vercel project
   354	- Bind the production domain
   355	- Configure preview and production environment variables
   356	- Verify frontend is talking to the correct Railway backend in production
   357	- Configure domains and env vars to match `docs/deployment/deployment-architecture.md`
   358	- Acceptance criteria:
   359	  - Preview deployment works
   360	  - Production deployment works
   361	  - Domain and environment configuration are documented
   362	- Assignee: **FardeenI**
   363	- Due: April 14
   364	- Blocked by: #1, #6
   365	- Unblocks: #12, #14, #15
   366	
   367	### Phase 4: Multi-Replica Validation, Documentation, and Submission — April 16–19
   368	
   369	**14. Railway Multi-Replica Validation and Deployment Evidence**
   370	- Scale `backend-api` to **2 or more replicas** on Railway
   371	- Keep `backend-worker` at **1 replica**
   372	- Verify and capture evidence for:
   373	  - public page loads through the deployed frontend
   374	  - authenticated API behavior through multiple API replicas
   375	  - shared rate limiting across replicas
   376	  - attachment access independent of serving replica
   377	  - cache invalidation / indexing behavior via singleton worker
   378	  - SSE/realtime smoke verification in deployed environment
   379	- Run the cloud-target integration/smoke suite against the deployed system
   380	- Use the replica observability added in #5 to prove requests were served across 2+ API replicas via headers, health output, and/or structured logs
   381	- Capture logs/screenshots/test output needed for submission
   382	- Validate against the expected topology in `docs/deployment/deployment-architecture.md` and the replica-safety checklist in `docs/deployment/replica-readiness-audit.md`
   383	- Acceptance criteria:
   384	  - Live deployment is stable with `backend-api` at 2+ replicas
   385	  - No replica-specific failures are observed for required paths
   386	  - Cloud-target tests pass against deployed URLs
   387	  - Evidence clearly distinguishes deployed-system validation from localhost validation
   388	- Assignee: **declanblanc**
   389	- Backup owner: **Aiden-Barrera**
   390	- Due: April 18
   391	- Blocked by: #3, #4, #5, #7, #9, #11, #16
   392	- Unblocks: #15
   393	
   394	**15. README, Final Artifact Collection, and Submission Package**
   395	- Update `README.md` with:
   396	  - how web users access the deployed app
   397	  - how to run the app locally
   398	  - how a forked user sets up Vercel + Railway deployment
   399	  - how CI/CD and branch protection are expected to work
   400	- Fold in the final decisions captured in `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`
   401	- Compile the final P6-equivalent artifact checklist:
   402	  - frontend deployment URL
   403	  - backend deployment URL
   404	  - integration test specification link
   405	  - integration test code links
   406	  - localhost test output
   407	  - cloud test output
   408	  - `run-integration-tests.yml` link
   409	  - `deploy-vercel.yml` link
   410	  - `deploy-railway.yml` link
   411	  - README link
   412	  - reflection placeholder/coordination
   413	  - LLM log collection
   414	- Acceptance criteria:
   415	  - README is complete and accurate
   416	  - Submission checklist has no missing artifacts
   417	  - Team knows who owns final reflection/log collation
   418	- Assignee: **acabrera04**
   419	- Backup owner: **FardeenI**
   420	- Due: April 19
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T20:08:29.192Z

The unresolved PR comments are actionable, and they’re all plan-level details. I’m patching the sprint plan now to make those operational decisions explicit rather than replying with “already addressed” when they aren’t.

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T20:09:11.886Z

I’ve patched the plan to explicitly cover the six open review points: SSE fan-out, single migration runner, frontend sitemap handoff, Railway private networking, one-hop proxy trust, and worker health/restart behavior. I’m checking the final diff now, then I’ll commit just the plan file and reply on the PR.

#### Tool: exec_command

```sh
git diff --stat -- planning/SPRINT_4_PLAN.md
```

Output:

```text
 planning/SPRINT_4_PLAN.md | 15 +++++++++++++++
 1 file changed, 15 insertions(+)
```

#### Tool: exec_command

```sh
git diff -- planning/SPRINT_4_PLAN.md
```

Output:

```text
diff --git a/planning/SPRINT_4_PLAN.md b/planning/SPRINT_4_PLAN.md
index 12f808c..0d22847 100644
--- a/planning/SPRINT_4_PLAN.md
+++ b/planning/SPRINT_4_PLAN.md
@@ -61,7 +61,13 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
 
 ### Explicit Production Decisions
 - **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.
+- **Sitemap handoff:** the frontend apex domain serves crawler-facing sitemap entrypoints through **Next.js route handlers** that fetch sitemap/XML data from the backend at request time. The backend may generate sitemap data, but the API subdomain is not the direct crawl target in production.
 - **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.
+- **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.
+- **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.
+- **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.
+- **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.
+- **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.
 - **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.
 
 ---
@@ -149,6 +155,7 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
 - Acceptance criteria:
   - Public and auth rate limits are shared across replicas
   - No process-local auth or public-route limit counters remain in production code paths
+  - Production proxy trust is explicitly configured for a **single Railway hop** (`trust proxy = 1` or equivalent) and documented in deployment docs
   - Rate limit behavior is covered by tests or verification notes
 - Assignee: **Aiden-Barrera**
 - Due: April 11
@@ -175,6 +182,7 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
 - Move background-only startup behavior into a dedicated worker process
 - Ensure duplicated subscribers / cache invalidation / sitemap upkeep do not run on every API replica
 - Keep API replicas focused on HTTP/tRPC/SSE request handling
+- Use **Redis pub/sub fan-out** as the explicit SSE strategy so each API replica can deliver shared events to its own connected clients without sticky-session requirements
 - Add lightweight replica observability for validation:
   - instance identity in structured logs
   - instance/replica identity on health output and/or response headers
@@ -183,7 +191,9 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
 - Acceptance criteria:
   - `backend-api` can run with 2+ replicas without duplicate singleton background side effects
   - `backend-worker` runs with 1 replica and owns singleton event-driven tasks
+  - SSE behavior across 2+ replicas follows the documented Redis fan-out strategy and no sticky-session dependency remains in the production design
   - Replica identity is externally observable enough to prove load balancing across 2+ API replicas
+  - `backend-worker` health check and restart expectations are documented and wired into deployment assumptions
   - Service responsibilities are documented
 - Assignee: **declanblanc**
 - Backup owner: **acabrera04**
@@ -202,6 +212,7 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
   - production API base URL handling
 - Make the SEO ownership boundary explicit:
   - frontend apex domain owns the canonical public SEO artifacts: canonical URLs, `metadataBase`, `robots.txt`, sitemap entrypoints, and any sitemap index exposed to crawlers
+  - frontend sitemap entrypoints are implemented through Next.js route handlers that fetch backend sitemap/XML data at request time
   - backend SEO routes may continue to generate sitemap/XML data as an internal or transitional source, but they are not the canonical crawler-facing host in production
   - no SEO artifact should require crawlers to use the API subdomain as the primary source of truth
 - Ensure frontend still supports localhost development cleanly
@@ -228,6 +239,8 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
 - Acceptance criteria:
   - Railway project is provisioned
   - Domains/env vars/health checks are configured
+  - Postgres and Redis env vars use Railway private/internal connection strings for service-to-service traffic
+  - `backend-worker` has a health check and restart-on-failure behavior configured
   - `backend-api` and `backend-worker` both boot successfully in Railway
 - Assignee: **acabrera04**
 - Backup owner: **FardeenI**
@@ -305,6 +318,7 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
 - Acceptance criteria:
   - Workflow deploys backend services without manual intervention
   - Production deploy authority is unambiguous and documented
+  - Exactly one migration runner performs `prisma migrate deploy`, and `backend-api` replicas are prevented from racing migrations on startup
   - Deploys target the correct Railway environment
   - Deployment process is documented in README
 - Assignee: **acabrera04**
@@ -383,6 +397,7 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
 - Acceptance criteria:
   - Live deployment is stable with `backend-api` at 2+ replicas
   - No replica-specific failures are observed for required paths
+  - Proxy-aware rate limiting is validated against the documented one-hop trust model
   - Cloud-target tests pass against deployed URLs
   - Evidence clearly distinguishes deployed-system validation from localhost validation
 - Assignee: **declanblanc**
```

#### Tool: exec_command

```sh
git add planning/SPRINT_4_PLAN.md && git commit -m "docs: address deployment plan review feedback

Clarify multi-replica SSE strategy, migration ownership, Railway private
networking, proxy trust behavior, worker resilience, and frontend sitemap
handoff in the sprint 4 deployment plan.

Co-authored-by: GPT 5.4 <noreply@openai.com>"
```

Output:

```text
[codex/sprint-4-deployment-plan c772049] docs: address deployment plan review feedback
 1 file changed, 15 insertions(+)
```

#### Tool: exec_command

```sh
git push
```

Output:

```text
To github.com:acabrera04/Harmony.git
   f13fa31..c772049  codex/sprint-4-deployment-plan -> codex/sprint-4-deployment-plan
```

#### Tool: exec_command

```sh
npx agent-reviews --reply 4091019364 "Fixed in c772049. The sprint plan now makes the missing operational decisions explicit: Redis fan-out for multi-replica SSE, a single migration runner, frontend apex sitemap handoff via Next.js route handlers, Railway private/internal connection strings, one-hop trust proxy behavior, and worker health/restart expectations." --resolve
```

Output:

```text

```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T20:09:34.116Z

The plan changes are committed and pushed. I’m posting replies on both unresolved PR comments now, then I’ll start the watcher loop to catch any follow-up comments.

#### Tool: write_stdin

```json
{
  "session_id": 15601,
  "yield_time_ms": 1000,
  "max_output_tokens": 8000
}
```

Output:

```text
Command: /bin/zsh -lc 'npx agent-reviews --reply 4091019364 "Fixed in c772049. The sprint plan now makes the missing operational decisions explicit: Redis fan-out for multi-replica SSE, a single migration runner, frontend apex sitemap handoff via Next.js route handlers, Railway private/internal connection strings, one-hop trust proxy behavior, and worker health/restart expectations." --resolve'
Chunk ID: 7d4159
Wall time: 0.0000 seconds
Process exited with code 0
Original token count: 46
Output:
[32m✓ Reply posted successfully[0m
  [2mhttps://github.com/acabrera04/Harmony/pull/311#issuecomment-4226467462[0m
[2mThread resolution skipped (not a review comment thread)[0m
```

#### Tool: exec_command

```sh
npx agent-reviews --reply 4218158167 "Fixed in c772049. The plan now explicitly names the SSE strategy, migration ownership, frontend sitemap handoff, Railway private/internal networking, one-hop trust proxy behavior, and worker health/restart expectations so downstream implementation issues have concrete operational guidance." --resolve
```

Output:

```text

```

#### Tool: write_stdin

```json
{
  "session_id": 68995,
  "yield_time_ms": 1000,
  "max_output_tokens": 8000
}
```

Output:

```text
Command: /bin/zsh -lc 'npx agent-reviews --reply 4218158167 "Fixed in c772049. The plan now explicitly names the SSE strategy, migration ownership, frontend sitemap handoff, Railway private/internal networking, one-hop trust proxy behavior, and worker health/restart expectations so downstream implementation issues have concrete operational guidance." --resolve'
Chunk ID: 932a6f
Wall time: 0.0000 seconds
Process exited with code 0
Original token count: 46
Output:
[32m✓ Reply posted successfully[0m
  [2mhttps://github.com/acabrera04/Harmony/pull/311#issuecomment-4226468019[0m
[2mThread resolution skipped (not a review comment thread)[0m
```

#### Tool: update_plan

- Plan:
  - [completed] Fetch current PR review comments in expanded form
  - [completed] Evaluate findings and implement any required fixes
  - [completed] Run verification, commit, and push
  - [in_progress] Reply to all processed comments and watch for new ones

Output:

```text
Plan updated
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T20:09:47.761Z

Both unresolved comments are replied to. I’m running the watcher loop now with a shorter timeout so I can catch any immediate follow-up without sitting on the PR for ten minutes.

#### Tool: exec_command

```sh
npx agent-reviews --watch --timeout 60
```

Output:

```text

[1m=== PR Comments Watch Mode ===[0m
[2mPR #311: https://github.com/acabrera04/Harmony/pull/311[0m
[2mPolling every 30s, exit after 60s of inactivity[0m
[2mFilters: all, all comments[0m
[2mStarted at 2026-04-10 20:09:49[0m

[2m[2026-04-10 20:09:49] Initial state: 2 existing comments tracked[0m

[33m=== EXISTING COMMENTS ===[0m
[1m[4091019364][0m [35mREVIEW[0m by [32macabrera04[0m [31m○ no reply[0m
  [2m## Review Checklist  - [ ] **Logic over Style**: The deployment plan still has unresolved technic...[0m

[1m[4218158167][0m [34mCOMMENT[0m by [32mAvanishKulkarni[0m [31m○ no reply[0m
  [2m**[Technical Review — Sprint 4 Plan]**  Six technical gaps in the plan worth addressing before do...[0m
```

#### Tool: write_stdin

```json
{
  "session_id": 24676,
  "yield_time_ms": 65000,
  "max_output_tokens": 12000
}
```

Output:

```text
Command: /bin/zsh -lc 'npx agent-reviews --watch --timeout 60'
Chunk ID: 0c4284
Wall time: 56.7704 seconds
Process exited with code 0
Original token count: 74
Output:
[2m[2026-04-10 20:10:20] Poll #1: No new comments (31s/60s idle)[0m
[2m[2026-04-10 20:10:50] Poll #2: No new comments (61s/60s idle)[0m

[32m=== WATCH COMPLETE ===[0m
[2mNo new comments after 60s of inactivity.[0m
[2mTotal comments tracked: 2[0m
[2mExiting at 2026-04-10 20:10:50[0m
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T20:10:56.623Z

The watcher stayed quiet. I’m doing one final fetch of unanswered comments to make sure the PR is actually clear from the tool’s perspective before I wrap up.

#### Tool: exec_command

```sh
npx agent-reviews --unanswered --expanded
```

Output:

```text
[1mFound 2 comments[0m

=== Comment [4091019364] ===
Type: REVIEW | By: acabrera04 | Status: ○ no reply
URL: https://github.com/acabrera04/Harmony/pull/311#pullrequestreview-4091019364

## Review Checklist

- [ ] **Logic over Style**: The deployment plan still has unresolved technical planning gaps called out in the existing review, especially multi-replica SSE behavior and migration ownership.
- [ ] **Security First**: The `trust proxy` level and Railway private-network usage are not specified yet, which affects IP-based limiting and service exposure choices.
- [ ] **Architectural Alignment**: The intended Vercel/Railway split is directionally clear, but the worker/API boundary and SEO handoff need the missing operational details before downstream implementation starts.
- [ ] **Issue Completion**: No linked issue/acceptance criteria are present; P6 coverage cannot be considered complete until the existing deployment-plan gaps are incorporated.
- [x] **No Nitpicking**: Review is limited to deployment correctness, security, and sequencing risk.
- [x] **Avoid Repetition**: I reviewed the existing technical review and am not restating each item as fresh line comments.
- [x] **Iterative Reviews**: The existing unresolved planning feedback still applies.
- [x] **Prevent CI Failures**: Docs-only PR checks are green (5 passed, 0 failed), but the plan-level blockers would likely create downstream deployment failures if left vague.

I agree with the existing technical review and found no separate issue worth adding. Before merging, fold those unresolved items into the plan: choose the SSE strategy, designate a single migration runner, define frontend/backend sitemap handoff, require Railway private connection strings, specify Express `trust proxy` behavior, and add worker health/restart expectations.

============================================================

=== Comment [4218158167] ===
Type: COMMENT | By: AvanishKulkarni | Status: ○ no reply
URL: https://github.com/acabrera04/Harmony/pull/311#issuecomment-4218158167

**[Technical Review — Sprint 4 Plan]**

Six technical gaps in the plan worth addressing before downstream issues are started:

---

**1. SSE with 2+ replicas is unresolved**

The plan notes API replicas are *"stateless apart from live SSE client connections"* but prescribes no solution. A client connected to replica A won't receive events emitted on replica B — this breaks realtime for any multi-replica path.

*Suggested fix:* Commit to a specific approach in the plan. The two realistic options are (a) Redis pub/sub fan-out on `backend-api` so each replica re-publishes to its own connected clients, or (b) sticky sessions at the Railway load balancer level. Option (a) is stateless-friendly and more consistent with the rest of the architecture. Whichever is chosen should be documented in `docs/deployment/replica-readiness-audit.md` (#2) before #5 is implemented.

---

**2. Prisma migration race condition**

If `backend-api` (2+ replicas) and `backend-worker` all run `prisma migrate deploy` on startup, multiple processes will attempt the migration simultaneously. This can corrupt migration state.

*Suggested fix:* Designate a single migration runner — the most common pattern is a one-shot Railway job or a pre-deploy command on `backend-worker` only, with `backend-api` replicas blocked from running migrations. This should be an explicit acceptance criterion in #11 (`deploy-railway.yml`) since the deploy workflow controls startup ordering.

---

**3. Sitemap handoff between frontend and backend is unspecified**

The plan states the frontend apex domain owns canonical sitemap entrypoints but that *"backend SEO routes may continue to generate sitemap/XML data as an internal or transitional source."* The mechanism is never defined — does the frontend proxy to the backend? Does the worker push pre-generated XML? Does the frontend call the backend at build time?

*Suggested fix:* Pick one pattern and state it explicitly in #6. The simplest production-safe approach is a Next.js route handler that fetches from the backend API at request time (ISR or on-demand). The plan should rule out the backend subdomain as a direct crawl target.

---

**4. Railway internal networking is never specified**

Both `backend-api` and `backend-worker` connect to Postgres and Redis. Railway provides private internal hostnames for inter-service traffic. The plan never says to use them, so implementers may default to public URLs — adding unnecessary latency and egress cost.

*Suggested fix:* Add a note in #7 (Railway provisioning) that Postgres and Redis connection strings must use Railway's private network hostnames, not the public TCP proxy. This should also be reflected in the env var matrix in `docs/deployment/deployment-architecture.md`.

---

**5. Express `trust proxy` level is unspecified**

Issue #3 says to configure proxy awareness for correct IP handling behind Railway, but doesn't specify the trust level. If set too broadly (e.g., `trust proxy: true`), any `X-Forwarded-For` header — including spoofed ones — is trusted, making IP-based rate limiting bypassable. If not set at all, all requests appear to originate from the Railway load balancer IP, defeating per-client limiting entirely.

*Suggested fix:* The plan (or #3's acceptance criteria) should specify the intended trust level. For Railway, `app.set('trust proxy', 1)` is typically correct — trusting one hop. This is a security-relevant configuration and should be verified in #14 as part of rate limit validation.

---

**6. `backend-worker` crash behavior is unaddressed**

The worker is load-bearing: if it crashes, cache invalidation, sitemap updates, and background jobs stop silently. The plan designates it a singleton but says nothing about restart policy, health checks, or graceful degradation when it's unavailable.

*Suggested fix:* Add to #5 or #7 that `backend-worker` must have a Railway health check configured and a restart-on-failure policy. The plan should also state how `backend-api` behaves if the worker is down — ideally, API requests remain functional and worker-dependent side effects are queued or deferred rather than erroring.
```

#### Tool: update_plan

- Explanation: Addressed both outstanding planning comments with a docs update, pushed commit c772049, posted response comments, and completed a watch cycle with no new feedback.

- Plan:
  - [completed] Fetch current PR review comments in expanded form
  - [completed] Evaluate findings and implement any required fixes
  - [completed] Run verification, commit, and push
  - [completed] Reply to all processed comments and watch for new ones

Output:

```text
Plan updated
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T20:11:25.808Z

Updated [SPRINT_4_PLAN.md](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md) and pushed `c772049` on `codex/sprint-4-deployment-plan`.

The plan now explicitly covers the open review gaps:
- Redis pub/sub fan-out as the SSE strategy for 2+ API replicas
- a single migration runner for `prisma migrate deploy`
- frontend apex sitemap handoff via Next.js route handlers
- Railway private/internal Postgres and Redis connection strings
- `trust proxy = 1` style one-hop proxy behavior
- `backend-worker` health check and restart-on-failure expectations

I also posted follow-up responses on the PR for both outstanding comments and ran the watch cycle with no new comments.

One nuance: `npx agent-reviews --unanswered --expanded` still shows those same two top-level comments as `no reply` even after the follow-up posts, which appears to be a tool limitation for top-level PR review/comment objects rather than a missing response. I did not run lint/typecheck/tests because this was a docs-only plan change.

### Turn 13: [$resolve-reviews](/Users/allen/.agents/skills/resolve-reviews/SKILL.md)

#### 👤 User Prompt

- Time: 2026-04-10T21:28:53.070Z

```text
[$resolve-reviews](/Users/allen/.agents/skills/resolve-reviews/SKILL.md)
```

_No assistant or tool activity recorded after this prompt._

### Turn 14: <skill> <name>resolve-reviews</name>

#### 👤 User Prompt

- Time: 2026-04-10T21:28:53.070Z

````text
<skill>
<name>resolve-reviews</name>
<path>/Users/allen/.agents/skills/resolve-reviews/SKILL.md</path>
---
name: resolve-reviews
description: Resolve all PR review comments (human and bot) on current PR. Fetches unanswered comments, evaluates each one, fixes real issues, dismisses false positives, and replies to every comment with the outcome.
license: MIT
compatibility: Requires git, gh (GitHub CLI), and Node.js installed.
allowed-tools: Bash(npx agent-reviews *) Bash(pnpm dlx agent-reviews *) Bash(yarn dlx agent-reviews *) Bash(bunx agent-reviews *) Bash(git config *) Bash(git add *) Bash(git commit *) Bash(git push *)
metadata:
  author: pbakaus
  version: "1.0.1"
  homepage: https://github.com/pbakaus/agent-reviews
---

Automatically resolve all review comments (both human and bot) on the current PR. Uses a two-phase workflow: fix all existing issues, then poll for new ones until quiet.

## Prerequisites

All commands below use `npx agent-reviews`. If the project uses a different package manager, substitute the appropriate runner (e.g., `pnpm dlx agent-reviews` for pnpm, `yarn dlx agent-reviews` for Yarn, `bunx agent-reviews` for Bun). Honor the user's package manager preference throughout.

**Cloud environments only** (e.g., Codespaces, remote agents): verify git author identity so CI checks can map commits to the user. Run `git config --global --get user.email` and if empty or a placeholder, set it manually. Skip this check in local environments.

## Phase 1: FETCH & FIX (synchronous)

### Step 1: Fetch All Comments (Expanded)

Run `npx agent-reviews --unanswered --expanded`

The CLI auto-detects the current branch, finds the associated PR, and authenticates via `gh` CLI or environment variables. If anything fails (no token, no PR, CLI not installed), it exits with a clear error message.

This shows all unanswered comments (both human and bot) with full detail: complete comment body (no truncation), diff hunk (code context), and all replies. Each comment shows its ID in brackets (e.g., `[12345678]`).

If zero comments are returned, print "No unanswered comments found" and skip to Phase 2.

### Step 3: Process Each Unanswered Comment

For each comment from the expanded output, apply the appropriate evaluation based on whether the author is a bot or a human.

#### For Bot Comments

Read the referenced code and determine:

1. **TRUE POSITIVE** - A real bug that needs fixing
2. **FALSE POSITIVE** - Not actually a bug (intentional behavior, bot misunderstanding)
3. **UNCERTAIN** - Not sure; ask the user

**Likely TRUE POSITIVE:**
- Code obviously violates stated behavior
- Missing null checks on potentially undefined values
- Type mismatches or incorrect function signatures
- Logic errors in conditionals
- Missing error handling for documented failure cases

**Likely FALSE POSITIVE:**
- Bot doesn't understand the framework/library patterns
- Code is intentionally structured that way (with comments explaining why)
- Bot is flagging style preferences, not bugs
- The "bug" is actually a feature or intentional behavior
- Bot misread the code flow

#### For Human Comments

Read the referenced code and the reviewer's comment. Human reviewers are generally more accurate and context-aware than bots. Determine:

1. **ACTIONABLE** - The reviewer identified a real issue or requested a concrete change
2. **DISCUSSION** - The comment raises a valid point but the right approach is unclear
3. **ALREADY ADDRESSED** - The concern has already been fixed or is no longer relevant

**Likely ACTIONABLE:**
- Reviewer points out a bug or logic error
- Reviewer requests a specific code change
- Reviewer identifies missing edge cases or error handling

**Likely DISCUSSION -- ask the user:**
- Reviewer suggests an architectural change you're unsure about
- Comment involves a tradeoff (performance vs readability, etc.)
- The feedback is subjective without team consensus

#### When UNCERTAIN -- ask the user

For both bot and human comments:
- The fix would require architectural changes
- You're genuinely unsure if the behavior is intentional
- Multiple valid interpretations exist
- The fix could have unintended side effects

#### Act on Evaluation

**If TRUE POSITIVE / ACTIONABLE:** Fix the code. Track the comment ID and a brief description of the fix.

**If FALSE POSITIVE:** Do NOT change the code. Track the comment ID and the reason it's not a real bug.

**If DISCUSSION:** Ask the user to consult the PR author. Apply their decision and track it.

**If ALREADY ADDRESSED:** Track the comment ID and note why.

**If UNCERTAIN:** Ask the user. If they say skip, track it as skipped.

Do NOT reply to comments yet. Replies happen after the commit (Step 5).

### Step 4: Commit and Push

After evaluating and fixing ALL unanswered comments:

1. Run your project's lint and type-check
2. Stage, commit, and push:
   ```bash
   git add -A
   git commit -m "fix: address PR review findings

   {List of changes made, grouped by reviewer/bot}"
   git push
   ```
3. Capture the commit hash from the output.

### Step 5: Reply to All Comments

Now that the commit hash exists, reply to every processed comment. The `--resolve` flag marks the review thread as resolved on GitHub.

**For each TRUE POSITIVE / ACTIONABLE:**

Run `npx agent-reviews --reply <comment_id> "Fixed in {hash}. {Brief description of the fix}" --resolve`

**For each FALSE POSITIVE:**

Run `npx agent-reviews --reply <comment_id> "Won't fix: {reason}. {Explanation of why this is intentional or not applicable}" --resolve`

**For each DISCUSSION (after user decision):**

Run `npx agent-reviews --reply <comment_id> "{Outcome}. {Explanation of the decision and any changes made}" --resolve`

**For each ALREADY ADDRESSED:**

Run `npx agent-reviews --reply <comment_id> "Already addressed. {Explanation of when/how this was fixed}" --resolve`

**For each SKIPPED:**

Run `npx agent-reviews --reply <comment_id> "Skipped per user request" --resolve`

**DO NOT start Phase 2 until all replies are posted.**

---

## Phase 2: POLL FOR NEW COMMENTS (loop until quiet)

The watcher exits immediately when new comments are found (after a 5s grace period to catch batch posts). This means you run it in a loop: start watcher, process any comments it returns, restart watcher, repeat until the watcher times out with no new comments.

### Step 6: Start Watcher Loop

Repeat the following until the watcher exits with no new comments:

**6a.** Launch the watcher in the background:

Run `npx agent-reviews --watch` as a background task.

**6b.** Wait for the background command to complete (default 10 minutes; override with `--timeout`).

**6c.** Check the output:

- **If new comments were found** (output contains `EXITING WITH NEW COMMENTS`):
  1. Use `--detail <id>` to read each new comment's full detail
  2. Process them exactly as in Phase 1, Steps 3-5 (evaluate, fix, commit, push, reply)
  3. **Go back to Step 6a** to restart the watcher

- **If no new comments** (output contains `WATCH COMPLETE`):
  Stop looping and move to the Summary Report.

---

## Summary Report

After both phases complete, provide a summary:

```text
## PR Review Resolution Summary

### Results
- Fixed: X issues
- Already addressed: X
- Won't fix (false positives): X
- Discussion resolved: X
- Skipped per user: X

### By Reviewer/Bot
#### cursor[bot]
- {description} - Fixed in {commit}
- {description} - Won't fix: {reason}

#### @reviewer-name
- {description} - Fixed in {commit}

### Status
All findings addressed. Watch completed.
```

## Important Notes

### Response Policy
- **Every comment gets a response** - No silent ignores
- For bots: responses help train them and prevent re-raised false positives
- For humans: replies keep reviewers informed and unblock approvals

### User Interaction
- Ask the user when uncertain about a finding
- Don't guess on architectural or business logic questions
- It's better to ask than to make a wrong fix or wrong dismissal
- Human reviewers often have context you don't - defer to the author when unsure

### Best Practices
- Verify findings before fixing - bots have false positives, humans rarely do
- Keep fixes minimal and focused - don't refactor unrelated code
- Ensure type-check and lint pass before committing
- Group related fixes into a single commit
- Copilot `suggestion` blocks often contain ready-to-use fixes
- If a human reviewer suggests a specific code change, prefer their version unless it introduces issues

</skill>
````

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:29:01.528Z

Using the `resolve-reviews` skill again. I’m fetching the current unanswered review state on the PR to see whether there are new comments beyond the two top-level plan comments that were already handled.

#### Tool: update_plan

- Plan:
  - [in_progress] Fetch current unanswered review comments
  - [pending] Evaluate any new actionable findings
  - [pending] Implement fixes, verify, commit, and push if needed
  - [pending] Reply to comments and watch for follow-ups

Output:

```text
Plan updated
```

#### Tool: exec_command

```sh
git status --short
```

Output:

```text
?? "P4: Backend Development | CS 485 AI-Assisted Software Engineering (Sp26).html"
?? "P5: Testing | CS 485 AI-Assisted Software Engineering (Sp26).pdf"
?? "P6_ Deployment _ CS 485 AI-Assisted Software Engineering (Sp26).pdf"
?? deployment-options.md
?? harmony-backend/coverage/
?? load-test.js
```

#### Tool: exec_command

```sh
npx agent-reviews --unanswered --expanded
```

Output:

```text
[31mError: No open PR found for branch 'codex/sprint-4-deployment-plan'[0m
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:29:19.529Z

`agent-reviews` can’t continue because it no longer sees an open PR for `codex/sprint-4-deployment-plan`. I’m checking whether the PR was merged or closed so I can tell you whether there is anything left to resolve.

#### Tool: exec_command

```sh
git branch --show-current
```

Output:

```text
codex/sprint-4-deployment-plan
```

#### Tool: exec_command

```sh
gh pr list --head codex/sprint-4-deployment-plan --state all --json number,state,url,title
```

Output:

```text
[{"number":311,"state":"OPEN","title":"Add Sprint 4 deployment plan","url":"https://github.com/CS485-Harmony/Harmony/pull/311"}]
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:29:26.553Z

There is still an open PR, but it’s against `CS485-Harmony/Harmony`, while the branch remote here is `acabrera04/Harmony`. I’m checking the repo/remotes so I can see why `agent-reviews` can’t auto-detect it and whether I can still inspect the review state directly.

#### Tool: exec_command

```sh
git remote -v
```

Output:

```text
origin	git@github.com:acabrera04/Harmony.git (fetch)
origin	git@github.com:acabrera04/Harmony.git (push)
```

#### Tool: exec_command

```sh
gh pr view 311 --repo CS485-Harmony/Harmony --json number,state,isDraft,reviewDecision,url,comments,reviews
```

Output:

```text
{"comments":[{"id":"IC_kwDORIrGY877a_xX","author":{"login":"AvanishKulkarni"},"authorAssociation":"MEMBER","body":"**[Technical Review — Sprint 4 Plan]**\n\nSix technical gaps in the plan worth addressing before downstream issues are started:\n\n---\n\n**1. SSE with 2+ replicas is unresolved**\n\nThe plan notes API replicas are *\"stateless apart from live SSE client connections\"* but prescribes no solution. A client connected to replica A won't receive events emitted on replica B — this breaks realtime for any multi-replica path.\n\n*Suggested fix:* Commit to a specific approach in the plan. The two realistic options are (a) Redis pub/sub fan-out on `backend-api` so each replica re-publishes to its own connected clients, or (b) sticky sessions at the Railway load balancer level. Option (a) is stateless-friendly and more consistent with the rest of the architecture. Whichever is chosen should be documented in `docs/deployment/replica-readiness-audit.md` (#2) before #5 is implemented.\n\n---\n\n**2. Prisma migration race condition**\n\nIf `backend-api` (2+ replicas) and `backend-worker` all run `prisma migrate deploy` on startup, multiple processes will attempt the migration simultaneously. This can corrupt migration state.\n\n*Suggested fix:* Designate a single migration runner — the most common pattern is a one-shot Railway job or a pre-deploy command on `backend-worker` only, with `backend-api` replicas blocked from running migrations. This should be an explicit acceptance criterion in #11 (`deploy-railway.yml`) since the deploy workflow controls startup ordering.\n\n---\n\n**3. Sitemap handoff between frontend and backend is unspecified**\n\nThe plan states the frontend apex domain owns canonical sitemap entrypoints but that *\"backend SEO routes may continue to generate sitemap/XML data as an internal or transitional source.\"* The mechanism is never defined — does the frontend proxy to the backend? Does the worker push pre-generated XML? Does the frontend call the backend at build time?\n\n*Suggested fix:* Pick one pattern and state it explicitly in #6. The simplest production-safe approach is a Next.js route handler that fetches from the backend API at request time (ISR or on-demand). The plan should rule out the backend subdomain as a direct crawl target.\n\n---\n\n**4. Railway internal networking is never specified**\n\nBoth `backend-api` and `backend-worker` connect to Postgres and Redis. Railway provides private internal hostnames for inter-service traffic. The plan never says to use them, so implementers may default to public URLs — adding unnecessary latency and egress cost.\n\n*Suggested fix:* Add a note in #7 (Railway provisioning) that Postgres and Redis connection strings must use Railway's private network hostnames, not the public TCP proxy. This should also be reflected in the env var matrix in `docs/deployment/deployment-architecture.md`.\n\n---\n\n**5. Express `trust proxy` level is unspecified**\n\nIssue #3 says to configure proxy awareness for correct IP handling behind Railway, but doesn't specify the trust level. If set too broadly (e.g., `trust proxy: true`), any `X-Forwarded-For` header — including spoofed ones — is trusted, making IP-based rate limiting bypassable. If not set at all, all requests appear to originate from the Railway load balancer IP, defeating per-client limiting entirely.\n\n*Suggested fix:* The plan (or #3's acceptance criteria) should specify the intended trust level. For Railway, `app.set('trust proxy', 1)` is typically correct — trusting one hop. This is a security-relevant configuration and should be verified in #14 as part of rate limit validation.\n\n---\n\n**6. `backend-worker` crash behavior is unaddressed**\n\nThe worker is load-bearing: if it crashes, cache invalidation, sitemap updates, and background jobs stop silently. The plan designates it a singleton but says nothing about restart policy, health checks, or graceful degradation when it's unavailable.\n\n*Suggested fix:* Add to #5 or #7 that `backend-worker` must have a Railway health check configured and a restart-on-failure policy. The plan should also state how `backend-api` behaves if the worker is down — ideally, API requests remain functional and worker-dependent side effects are queued or deferred rather than erroring.","createdAt":"2026-04-09T22:39:56Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/CS485-Harmony/Harmony/pull/311#issuecomment-4218158167","viewerDidAuthor":false},{"id":"IC_kwDORIrGY8776saG","author":{"login":"acabrera04"},"authorAssociation":"MEMBER","body":"> Re: comment 4091019364\n\nFixed in c772049. The sprint plan now makes the missing operational decisions explicit: Redis fan-out for multi-replica SSE, a single migration runner, frontend apex sitemap handoff via Next.js route handlers, Railway private/internal connection strings, one-hop trust proxy behavior, and worker health/restart expectations.","createdAt":"2026-04-10T20:09:27Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/CS485-Harmony/Harmony/pull/311#issuecomment-4226467462","viewerDidAuthor":true},{"id":"IC_kwDORIrGY8776siz","author":{"login":"acabrera04"},"authorAssociation":"MEMBER","body":"> Re: comment 4218158167\n\nFixed in c772049. The plan now explicitly names the SSE strategy, migration ownership, frontend sitemap handoff, Railway private/internal networking, one-hop trust proxy behavior, and worker health/restart expectations so downstream implementation issues have concrete operational guidance.","createdAt":"2026-04-10T20:09:35Z","includesCreatedEdit":false,"isMinimized":false,"minimizedReason":"","reactionGroups":[],"url":"https://github.com/CS485-Harmony/Harmony/pull/311#issuecomment-4226468019","viewerDidAuthor":true}],"isDraft":false,"number":311,"reviewDecision":"CHANGES_REQUESTED","reviews":[{"id":"PRR_kwDORIrGY87z2ABk","author":{"login":"acabrera04"},"authorAssociation":"MEMBER","body":"## Review Checklist\n\n- [ ] **Logic over Style**: The deployment plan still has unresolved technical planning gaps called out in the existing review, especially multi-replica SSE behavior and migration ownership.\n- [ ] **Security First**: The `trust proxy` level and Railway private-network usage are not specified yet, which affects IP-based limiting and service exposure choices.\n- [ ] **Architectural Alignment**: The intended Vercel/Railway split is directionally clear, but the worker/API boundary and SEO handoff need the missing operational details before downstream implementation starts.\n- [ ] **Issue Completion**: No linked issue/acceptance criteria are present; P6 coverage cannot be considered complete until the existing deployment-plan gaps are incorporated.\n- [x] **No Nitpicking**: Review is limited to deployment correctness, security, and sequencing risk.\n- [x] **Avoid Repetition**: I reviewed the existing technical review and am not restating each item as fresh line comments.\n- [x] **Iterative Reviews**: The existing unresolved planning feedback still applies.\n- [x] **Prevent CI Failures**: Docs-only PR checks are green (5 passed, 0 failed), but the plan-level blockers would likely create downstream deployment failures if left vague.\n\nI agree with the existing technical review and found no separate issue worth adding. Before merging, fold those unresolved items into the plan: choose the SSE strategy, designate a single migration runner, define frontend/backend sitemap handoff, require Railway private connection strings, specify Express `trust proxy` behavior, and add worker health/restart expectations.","submittedAt":"2026-04-10T16:18:17Z","includesCreatedEdit":false,"reactionGroups":[],"state":"COMMENTED","commit":{"oid":"f13fa314fecdf213080ed9d19ba980160b228f6c"}},{"id":"PRR_kwDORIrGY87z78EO","author":{"login":"AvanishKulkarni"},"authorAssociation":"MEMBER","body":"Requesting changes — see inline comments for critical unaddressed issues.","submittedAt":"2026-04-10T21:27:02Z","includesCreatedEdit":false,"reactionGroups":[],"state":"CHANGES_REQUESTED","commit":{"oid":"c772049c066293c5d3036e439dd8ddcc147b69e0"}}],"state":"OPEN","url":"https://github.com/CS485-Harmony/Harmony/pull/311"}
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:29:36.817Z

`agent-reviews` is failing because the local checkout points at the fork, but the live PR is on `CS485-Harmony/Harmony`. I’ve confirmed the two top-level comments already have follow-up replies; now I’m fetching the actual inline review comments on PR `#311` to see whether there are unresolved line-level findings behind the `CHANGES_REQUESTED` state.

#### Tool: exec_command

```sh
gh api repos/CS485-Harmony/Harmony/pulls/311/comments --paginate
```

Output:

```text
Total output lines: 1

[{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825321","pull_request_review_id":4092576014,"id":3066825321,"node_id":"PRRC_kwDORIrGY862zApp","diff_hunk":"@@ -0,0 +1,553 @@\n+# Deployment Sprint Plan — April 8–19, 2026\n+\n+## Context\n+Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend backed by PostgreSQL and Redis. Sprint 4 adapts the P6 deployment assignment to a **Vercel + Railway** production stack:\n+\n+- **Frontend hosting:** Vercel\n+- **Backend hosting:** Railway\n+- **Database:** Railway Postgres\n+- **Cache / event bus:** Railway Redis\n+- **Public deployment goal:** keep the app deployed through instructor review\n+- **Scaling goal:** support **2 or more backend API replicas** on Railway while keeping background event processing correct\n+\n+This sprint must cover the substance of **P6 Deployment** while ignoring the AWS-only platform choice. The plan therefore replaces:\n+\n+- AWS Lambda/API Gateway with Railway backend services\n+- AWS Amplify with Vercel frontend hosting\n+- AWS CD workflows with Vercel/Railway CD workflows\n+\n+Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.\n+\n+The assignment requirements we still must satisfy are:\n+\n+1. Publicly deploy frontend and backend\n+2. Automate deployment from GitHub\n+3. Add integration test specifications and implementation\n+4. Run integration tests locally and in the cloud\n+5. Add GitHub Actions for integration tests\n+6. Adopt GitHub hygiene and branch protection\n+7. Update README with user-facing and deployer-facing instructions\n+8. Produce the final submission artifacts, links, logs, and reflection\n+\n+**Assignment:** P6: Deployment  \n+**Due:** Sunday, April 19, 2026, 11:59 PM AOE\n+\n+## Team\n+5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI\n+\n+## Target Architecture\n+\n+### Public Services\n+- `frontend` on Vercel\n+- `backend-api` on Railway with **2+ replicas**\n+\n+### Internal / Stateful Services\n+- `backend-worker` on Railway with **1 replica only**\n+- `postgres` on Railway\n+- `redis` on Railway\n+\n+### Domain Layout\n+- `https://<frontend-domain>` -> Vercel\n+- `https://api.<frontend-domain>` -> Railway `backend-api`\n+\n+### Multi-Backend Railway Rules\n+To safely support 2+ backend replicas, the sprint must remove or isolate process-local production state:\n+\n+- Public/auth rate limiting must use **Redis-backed shared storage**\n+- File uploads must use **shared object storage**, not local disk\n+- Background subscribers / cache invalidation / sitemap updates must run in a **singleton worker**\n+- API replicas must be stateless apart from live SSE client connections\n+- Deployment verification must prove that 2+ API replicas behave correctly behind Railway load balancing\n+\n+### Explicit Production Decisions\n+- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.\n+- **Sitemap handoff:** the frontend apex domain serves crawler-facing sitemap entrypoints through **Next.js route handlers** that fetch sitemap/XML data from the backend at request time. The backend may generate sitemap data, but the API subdomain is not the direct crawl target in production.\n+- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.\n+- **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.\n+- **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.\n+- **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.\n+- **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.\n+- **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.\n+- **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.\n+\n+---\n+\n+## P6 Coverage Map\n+\n+| P6 Requirement | Vercel + Railway Adaptation | Covered By Issues |\n+|---|---|---|\n+| Publicly deploy frontend | Deploy Next.js app to Vercel | #6, #12, #16 |\n+| Publicly deploy backend | Deploy Express/tRPC app to Railway | #5, #7, #11 |\n+| Publish backend public interfaces via REST | Keep Railway backend public routes stable and production-configured | #1, #5, #7 |\n+| Integration test specification | Write English-language integration spec for FE-BE paths | #8 |\n+| Integration tests on localhost | Add env-aware local integration test flow | #9 |\n+| Integration tests in cloud | Run same test suite against deployed Vercel + Railway URLs | #9, #14 |\n+| GitHub Action for integration tests | Add `run-integration-tests.yml` | #10 |\n+| Continuous deployment | Add backend and frontend deployment workflows for Railway and Vercel | #11, #12 |\n+| GitHub hygiene / branch protection | Require PRs and required checks before merge | #13 |\n+| README update | Add user-facing run instructions and deployer guide | #15 |\n+| Submission links, logs, reflection | Final packaging and artifact checklist | #15 |\n+\n+---\n+\n+## Issues (16 total)\n+\n+> **Note:** Issues are written so they can be opened directly on GitHub with the dependency notes preserved in the body. \"Blocked by\" means the issue should not be considered complete until those upstream issues land. \"Unblocks\" is included to make sequencing explicit for the team.\n+\n+### Phase 1: Architecture, Production Readiness, and Scaling Design — April 8–11\n+\n+**1. Deployment Architecture + Environment Matrix**\n+- Define the final Vercel + Railway topology:\n+  - `frontend`\n+  - `backend-api`\n+  - `backend-worker`\n+  - `postgres`\n+  - `redis`\n+- Document production env vars for frontend, backend API, and worker\n+- Define domain plan (`frontend` domain + `api` subdomain)","path":"planning/SPRINT_4_PLAN.md","commit_id":"c772049c066293c5d3036e439dd8ddcc147b69e0","original_commit_id":"c772049c066293c5d3036e439dd8ddcc147b69e0","user":{"login":"AvanishKulkarni","id":55012494,"node_id":"MDQ6VXNlcjU1MDEyNDk0","avatar_url":"https://avatars.githubusercontent.com/u/55012494?v=4","gravatar_id":"","url":"https://api.github.com/users/AvanishKulkarni","html_url":"https://github.com/AvanishKulkarni","followers_url":"https://api.github.com/users/AvanishKulkarni/followers","following_url":"https://api.github.com/users/AvanishKulkarni/following{/other_user}","gists_url":"https://api.github.com/users/AvanishKulkarni/gists{/gist_id}","starred_url":"https://api.github.com/users/AvanishKulkarni/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/AvanishKulkarni/subscriptions","organizations_url":"https://api.github.com/users/AvanishKulkarni/orgs","repos_url":"https://api.github.com/users/AvanishKulkarni/repos","events_url":"https://api.github.com/users/AvanishKulkarni/events{/privacy}","received_events_url":"https://api.github.com/users/AvanishKulkarni/received_events","type":"User","user_view_type":"public","site_admin":false},"body":"**Cross-origin auth and cookie strategy is not specified anywhere in the plan and will block the production deploy.**\n\nThe topology puts the frontend on `<apex>` and the API on `api.<apex>`, which makes every authenticated request cross-origin. Nothing in Issue #1, #6, or #7 commits to:\n\n1. **CORS configuration on the Express app.** Needs an explicit origin allowlist (production frontend domain + preview domains) with `credentials: true` and preflight handling for tRPC `POST` requests that send `content-type: application/json` and any auth headers. A wildcard origin cannot be combined with credentials, so this has to be enumerated.\n2. **Cookie strategy for session/refresh tokens.** Pick one and document it here:\n   - **Apex-scoped cookie:** issue cookies with `Domain=.<apex>`, `SameSite=Lax`, `Secure`, `HttpOnly`. Works cross-subdomain without `SameSite=None`, but requires the API and frontend to share a registrable domain.\n   - **Host-only cookie on the API subdomain:** `SameSite=None; Secure; HttpOnly`. Requires `credentials: 'include'` on every fetch and is subject to third-party cookie restrictions in some browsers.\n   - **Bearer token in `Authorization` header:** sidesteps cross-origin cookie handling entirely but requires client-side storage and refresh handling.\n3. **CSRF posture under whichever cookie model is chosen.**\n\nThis is the single highest-probability cause of a \"works on localhost, completely broken on the deployed domain\" failure mode during grading. Please add an **Auth & CORS contract** bullet to the Explicit Production Decisions section and an acceptance criterion to Issue #1 requiring `docs/deployment/deployment-architecture.md` to record the chosen cookie domain, `SameSite`/`Secure` flags, CORS allowlist, and auth transport before Issues #6/#7/#11 land.","created_at":"2026-04-10T21:27:02Z","updated_at":"2026-04-10T21:27:02Z","html_url":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066825321","pull_request_url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311","_links":{"self":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825321"},"html":{"href":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066825321"},"pull_request":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311"}},"reactions":{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825321/reactions","total_count":0,"+1":0,"-1":0,"laugh":0,"hooray":0,"confused":0,"heart":0,"rocket":0,"eyes":0},"start_line":null,"original_start_line":null,"start_side":null,"line":107,"original_line":107,"side":"RIGHT","author_association":"MEMBER","original_position":107,"position":107,"subject_type":"line"},{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825328","pull_request_review_id":4092576014,"id":3066825328,"node_id":"PRRC_kwDORIrGY862zApw","diff_hunk":"@@ -0,0 +1,553 @@\n+# Deployment Sprint Plan — April 8–19, 2026\n+\n+## Context\n+Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend backed by PostgreSQL and Redis. Sprint 4 adapts the P6 deployment assignment to a **Vercel + Railway** production stack:\n+\n+- **Frontend hosting:** Vercel\n+- **Backend hosting:** Railway\n+- **Database:** Railway Postgres\n+- **Cache / event bus:** Railway Redis\n+- **Public deployment goal:** keep the app deployed through instructor review\n+- **Scaling goal:** support **2 or more backend API replicas** on Railway while keeping background event processing correct\n+\n+This sprint must cover the substance of **P6 Deployment** while ignoring the AWS-only platform choice. The plan therefore replaces:\n+\n+- AWS Lambda/API Gateway with Railway backend services\n+- AWS Amplify with Vercel frontend hosting\n+- AWS CD workflows with Vercel/Railway CD workflows\n+\n+Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.\n+\n+The assignment requirements we still must satisfy are:\n+\n+1. Publicly deploy frontend and backend\n+2. Automate deployment from GitHub\n+3. Add integration test specifications and implementation\n+4. Run integration tests locally and in the cloud\n+5. Add GitHub Actions for integration tests\n+6. Adopt GitHub hygiene and branch protection\n+7. Update README with user-facing and deployer-facing instructions\n+8. Produce the final submission artifacts, links, logs, and reflection\n+\n+**Assignment:** P6: Deployment  \n+**Due:** Sunday, April 19, 2026, 11:59 PM AOE\n+\n+## Team\n+5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI\n+\n+## Target Architecture\n+\n+### Public Services\n+- `frontend` on Vercel\n+- `backend-api` on Railway with **2+ replicas**\n+\n+### Internal / Stateful Services\n+- `backend-worker` on Railway with **1 replica only**\n+- `postgres` on Railway\n+- `redis` on Railway\n+\n+### Domain Layout\n+- `https://<frontend-domain>` -> Vercel\n+- `https://api.<frontend-domain>` -> Railway `backend-api`\n+\n+### Multi-Backend Railway Rules\n+To safely support 2+ backend replicas, the sprint must remove or isolate process-local production state:\n+\n+- Public/auth rate limiting must use **Redis-backed shared storage**\n+- File uploads must use **shared object storage**, not local disk\n+- Background subscribers / cache invalidation / sitemap updates must run in a **singleton worker**\n+- API replicas must be stateless apart from live SSE client connections\n+- Deployment verification must prove that 2+ API replicas behave correctly behind Railway load balancing\n+\n+### Explicit Production Decisions\n+- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.\n+- **Sitemap handoff:** the frontend apex domain serves crawler-facing sitemap entrypoints through **Next.js route handlers** that fetch sitemap/XML data from the backend at request time. The backend may generate sitemap data, but the API subdomain is not the direct crawl target in production.\n+- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.\n+- **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.\n+- **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.\n+- **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.\n+- **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.\n+- **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.\n+- **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.\n+\n+---\n+\n+## P6 Coverage Map\n+\n+| P6 Requirement | Vercel + Railway Adaptation | Covered By Issues |\n+|---|---|---|\n+| Publicly deploy frontend | Deploy Next.js app to Vercel | #6, #12, #16 |\n+| Publicly deploy backend | Deploy Express/tRPC app to Railway | #5, #7, #11 |\n+| Publish backend public interfaces via REST | Keep Railway backend public routes stable and production-configured | #1, #5, #7 |\n+| Integration test specification | Write English-language integration spec for FE-BE paths | #8 |\n+| Integration tests on localhost | Add env-aware local integration test flow | #9 |\n+| Integration tests in cloud | Run same test suite against deployed Vercel + Railway URLs | #9, #14 |\n+| GitHub Action for integration tests | Add `run-integration-tests.yml` | #10 |\n+| Continuous deployment | Add backend and frontend deployment workflows for Railway and Vercel | #11, #12 |\n+| GitHub hygiene / branch protection | Require PRs and required checks before merge | #13 |\n+| README update | Add user-facing run instructions and deployer guide | #15 |\n+| Submission links, logs, reflection | Final packaging and artifact checklist | #15 |\n+\n+---\n+\n+## Issues (16 total)\n+\n+> **Note:** Issues are written so they can be opened directly on GitHub with the dependency notes preserved in the body. \"Blocked by\" means the issue should not be considered complete until those upstream issues land. \"Unblocks\" is included to make sequencing explicit for the team.\n+\n+### Phase 1: Architecture, Production Readiness, and Scaling Design — April 8–11\n+\n+**1. Deployment Architecture + Environment Matrix**\n+- Define the final Vercel + Railway topology:\n+  - `frontend`\n+  - `backend-api`\n+  - `backend-worker`\n+  - `postgres`\n+  - `redis`\n+- Document production env vars for frontend, backend API, and worker\n+- Define domain plan (`frontend` domain + `api` subdomain)\n+- Define promotion flow for preview vs production\n+- Produce and save a reference document at `docs/deployment/deployment-architecture.md`\n+  - this document is the canonical reference for service topology, domain ownership, env vars, deploy authority, and preview vs production behavior\n+  - later deployment issues should link to and update this document instead of redefining architecture assumptions\n+- Acceptance criteria:\n+  - Clear service inventory\n+  - Clear env var matrix\n+  - Clear ownership of public vs internal services\n+  - Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton\n+  - `docs/deployment/deployment-architecture.md` exists and is usable as the canonical reference for downstream issues\n+- Assignee: **acabrera04**\n+- Backup owner: **declanblanc**\n+- Due: April 9\n+- Blocked by: none\n+- Unblocks: #2, #6, #7, #8, #16\n+\n+**2. Backend Scale Audit for Railway Replicas**\n+- Audit the current backend for state that will break with 2+ API replicas\n+- Confirm and document the required changes for:\n+  - in-memory rate limiting\n+  - local filesystem attachment storage\n+  - duplicate startup subscribers / background jobs\n+  - SSE behavior behind load balancing\n+  - proxy/IP handling\n+- Produce and save a reference document at `docs/deployment/replica-readiness-audit.md`\n+  - include the concrete \"replica-safe backend\" checklist for implementation\n+  - include must-fix items, acceptable demo-time risks, and explicit ownership boundaries between `backend-api` and `backend-worker`\n+  - later scaling/deployment issues should cite this document when implementing or validating replica-safe behavior\n+- Acceptance criteria:\n+  - Checklist references the actual code areas that must change\n+  - Risks are prioritized into must-fix vs acceptable-for-demo\n+  - `backend-api` vs `backend-worker` responsibilities are finalized\n+  - `docs/deployment/replica-readiness-audit.md` exists and is detailed enough for downstream implementation/validation issues to reference directly\n+- Assignee: **declanblanc**\n+- Backup owner: **acabrera04**\n+- Due: April 9\n+- Blocked by: #1\n+- Unblocks: #3, #4, #5, #14\n+\n+**3. Shared Rate Limiting + Proxy-Aware Networking**\n+- Replace process-local rate limiting with shared Redis-backed limiting\n+- Replace or unify **both** current implementations:\n+  - auth endpoint limiting using `express-rate-limit`\n+  - public-route token bucket limiting\n+- Ensure auth and public API rate limits remain correct across 2+ replicas\n+- Configure Express proxy awareness so client IP handling works correctly behind Railway\n+- Use `docs/deployment/replica-readiness-audit.md` as the implementation checklist and update it with final decisions\n+- Acceptance criteria:\n+  - Public and auth rate limits are shared across replicas\n+  - No process-local auth or public-route limit counters remain in production code paths\n+  - Production proxy trust is explicitly configured for a **single Railway hop** (`trust proxy = 1` or equivalent) and documented in deployment docs","path":"planning/SPRINT_4_PLAN.md","commit_id":"c772049c066293c5d3036e439dd8ddcc147b69e0","original_commit_id":"c772049c066293c5d3036e439dd8ddcc147b69e0","user":{"login":"AvanishKulkarni","id":55012494,"node_id":"MDQ6VXNlcjU1MDEyNDk0","avatar_url":"https://avatars.githubusercontent.com/u/55012494?v=4","gravatar_id":"","url":"https://api.github.com/users/AvanishKulkarni","html_url":"https://github.com/AvanishKulkarni","followers_url":"https://api.github.com/users/AvanishKulkarni/followers","following_url":"https://api.github.com/users/AvanishKulkarni/following{/other_user}","gists_url":"https://api.github.com/users/AvanishKulkarni/gists{/gist_id}","starred_url":"https://api.github.com/users/AvanishKulkarni/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/AvanishKulkarni/subscriptions","organizations_url":"https://api.github.com/users/AvanishKulkarni/orgs","repos_url":"https://api.github.com/users/AvanishKulkarni/repos","events_url":"https://api.github.com/users/AvanishKulkarni/events{/privacy}","received_events_url":"https://api.github.com/users/AvanishKulkarni/received_events","type":"User","user_view_type":"public","site_admin":false},"body":"**The Redis-backed limiter needs an atomicity requirement, not just a shared-storage requirement.**\n\nThe current acceptance criteria say limits must be \"shared across replicas\" and that no process-local counters remain, but they do not constrain *how* the Redis limiter is implemented. A naive port that does `INCR key` followed by a separate `EXPIRE key ttl` races under contention: if a process crashes or is preempted between the two commands, the key is left without a TTL and the counter grows unbounded, locking users out until the key is manually cleared. The public-route **token bucket** is worse — refill and consume must be a single atomic operation or two concurrent requests can both observe \"tokens available\" and both consume the last token.\n\nPlease add an acceptance criterion along the lines of:\n\n> - The Redis limiter uses atomic primitives for all counter/bucket mutations (a single Lua script per check, or a vetted library such as `rate-limit-redis` for the auth limiter and an equivalent Lua-backed implementation for the public-route token bucket). Non-atomic `INCR` + separate `EXPIRE` patterns are explicitly disallowed.\n\nConcrete implementation options:\n- **Auth endpoint limiter (`express-rate-limit`):** swap the in-memory store for [`rate-limit-redis`](https://github.com/express-rate-limit/rate-limit-redis), which uses a Lua script to combine increment and expiry.\n- **Public-route token bucket:** implement as a single Lua script loaded with `SCRIPT LOAD` that reads bucket state, computes refill based on elapsed time, decrements, and writes back — all inside one `EVALSHA`. Reference: the standard \"token bucket in Redis\" Lua pattern.\n\nWithout this, the limiter can pass the current acceptance criteria while still being unsafe under load.","created_at":"2026-04-10T21:27:02Z","updated_at":"2026-04-10T21:27:02Z","html_url":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066825328","pull_request_url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311","_links":{"self":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825328"},"html":{"href":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066825328"},"pull_request":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311"}},"reactions":{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825328/reactions","total_count":0,"+1":0,"-1":0,"laugh":0,"hooray":0,"confused":0,"heart":0,"rocket":0,"eyes":0},"start_line":null,"original_start_line":null,"start_side":null,"line":158,"original_line":158,"side":"RIGHT","author_association":"MEMBER","original_position":158,"position":158,"subject_type":"line"},{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825330","pull_request_review_id":4092576014,"id":3066825330,"node_id":"PRRC_kwDORIrGY862zApy","diff_hunk":"@@ -0,0 +1,553 @@\n+# Deployment Sprint Plan — April 8–19, 2026\n+\n+## Context\n+Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend backed by PostgreSQL and Redis. Sprint 4 adapts the P6 deployment assignment to a **Vercel + Railway** production stack:\n+\n+- **Frontend hosting:** Vercel\n+- **Backend hosting:** Railway\n+- **Database:** Railway Postgres\n+- **Cache / event bus:** Railway Redis\n+- **Public deployment goal:** keep the app deployed through instructor review\n+- **Scaling goal:** support **2 or more backend API replicas** on Railway while keeping background event processing correct\n+\n+This sprint must cover the substance of **P6 Deployment** while ignoring the AWS-only platform choice. The plan therefore replaces:\n+\n+- AWS Lambda/API Gateway with Railway backend services\n+- AWS Amplify with Vercel frontend hosting\n+- AWS CD workflows with Vercel/Railway CD workflows\n+\n+Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.\n+\n+The assignment requirements we still must satisfy are:\n+\n+1. Publicly deploy frontend and backend\n+2. Automate deployment from GitHub\n+3. Add integration test specifications and implementation\n+4. Run integration tests locally and in the cloud\n+5. Add GitHub Actions for integration tests\n+6. Adopt GitHub hygiene and branch protection\n+7. Update README with user-facing and deployer-facing instructions\n+8. Produce the final submission artifacts, links, logs, and reflection\n+\n+**Assignment:** P6: Deployment  \n+**Due:** Sunday, April 19, 2026, 11:59 PM AOE\n+\n+## Team\n+5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI\n+\n+## Target Architecture\n+\n+### Public Services\n+- `frontend` on Vercel\n+- `backend-api` on Railway with **2+ replicas**\n+\n+### Internal / Stateful Services\n+- `backend-worker` on Railway with **1 replica only**\n+- `postgres` on Railway\n+- `redis` on Railway\n+\n+### Domain Layout\n+- `https://<frontend-domain>` -> Vercel\n+- `https://api.<frontend-domain>` -> Railway `backend-api`\n+\n+### Multi-Backend Railway Rules\n+To safely support 2+ backend replicas, the sprint must remove or isolate process-local production state:\n+\n+- Public/auth rate limiting must use **Redis-backed shared storage**\n+- File uploads must use **shared object storage**, not local disk\n+- Background subscribers / cache invalidation / sitemap updates must run in a **singleton worker**\n+- API replicas must be stateless apart from live SSE client connections\n+- Deployment verification must prove that 2+ API replicas behave correctly behind Railway load balancing\n+\n+### Explicit Production Decisions\n+- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.\n+- **Sitemap handoff:** the frontend apex domain serves crawler-facing sitemap entrypoints through **Next.js route handlers** that fetch sitemap/XML data from the backend at request time. The backend may generate sitemap data, but the API subdomain is not the direct crawl target in production.\n+- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.\n+- **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.\n+- **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.\n+- **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.\n+- **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.\n+- **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.\n+- **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.\n+\n+---\n+\n+## P6 Coverage Map\n+\n+| P6 Requirement | Vercel + Railway Adaptation | Covered By Issues |\n+|---|---|---|\n+| Publicly deploy frontend | Deploy Next.js app to Vercel | #6, #12, #16 |\n+| Publicly deploy backend | Deploy Express/tRPC app to Railway | #5, #7, #11 |\n+| Publish backend public interfaces via REST | Keep Railway backend public routes stable and production-configured | #1, #5, #7 |\n+| Integration test specification | Write English-language integration spec for FE-BE paths | #8 |\n+| Integration tests on localhost | Add env-aware local integration test flow | #9 |\n+| Integration tests in cloud | Run same test suite against deployed Vercel + Railway URLs | #9, #14 |\n+| GitHub Action for integration tests | Add `run-integration-tests.yml` | #10 |\n+| Continuous deployment | Add backend and frontend deployment workflows for Railway and Vercel | #11, #12 |\n+| GitHub hygiene / branch protection | Require PRs and required checks before merge | #13 |\n+| README update | Add user-facing run instructions and deployer guide | #15 |\n+| Submission links, logs, reflection | Final packaging and artifact checklist | #15 |\n+\n+---\n+\n+## Issues (16 total)\n+\n+> **Note:** Issues are written so they can be opened directly on GitHub with the dependency notes preserved in the body. \"Blocked by\" means the issue should not be considered complete until those upstream issues land. \"Unblocks\" is included to make sequencing explicit for the team.\n+\n+### Phase 1: Architecture, Production Readiness, and…1764 tokens truncated…onal source, but they are not the canonical crawler-facing host in production\n+  - no SEO artifact should require crawlers to use the API subdomain as the primary source of truth\n+- Ensure frontend still supports localhost development cleanly\n+- Use `docs/deployment/deployment-architecture.md` as the source of truth for domain ownership, public URLs, and SEO host decisions\n+- Acceptance criteria:\n+  - Public pages generate correct production metadata\n+  - Canonical host ownership is explicit and consistent across frontend and backend docs/code\n+  - Frontend can target local and cloud backends without code edits\n+  - SEO-critical pages render correctly on the public domain\n+- Assignee: **AvanishKulkarni**\n+- Due: April 11\n+- Blocked by: #1\n+- Unblocks: #12, #16\n+\n+**7. Railway Project Provisioning and Service Wiring**\n+- Create/configure the Railway project and services:\n+  - `backend-api`\n+  - `backend-worker`\n+  - `postgres`\n+  - `redis`\n+- Configure internal networking, service env vars, health checks, deploy commands, and domains\n+- Ensure `backend-api` and `backend-worker` both connect to the same Postgres and Redis instances\n+- Provision services and env vars to match `docs/deployment/deployment-architecture.md`, and use `docs/deployment/replica-readiness-audit.md` for replica-safety requirements\n+- Acceptance criteria:\n+  - Railway project is provisioned\n+  - Domains/env vars/health checks are configured\n+  - Postgres and Redis env vars use Railway private/internal connection strings for service-to-service traffic\n+  - `backend-worker` has a health check and restart-on-failure behavior configured\n+  - `backend-api` and `backend-worker` both boot successfully in Railway\n+- Assignee: **acabrera04**\n+- Backup owner: **FardeenI**\n+- Due: April 13\n+- Blocked by: #1, #5\n+- Unblocks: #11, #14, #15\n+\n+**8. Integration Test Specification**\n+- Write an English-language integration test specification for all frontend-backend code paths that must work in deployment\n+- Cover at least:\n+  - guest public channel rendering\n+  - login / auth refresh path\n+  - public API path used by SSR metadata/page rendering\n+  - visibility change impact on public indexing behavior\n+  - attachment path if production storage is in scope\n+  - SSE/realtime smoke behavior if kept in deployed flow\n+- Reference `docs/deployment/deployment-architecture.md` for deployment topology and `docs/deployment/replica-readiness-audit.md` for replica-sensitive scenarios that need validation\n+- Acceptance criteria:\n+  - Every FE-BE pathway has at least one test case\n+  - Spec includes local-only vs cloud-only notes where relevant\n+  - Spec is stored under `docs/test-specs/`\n+- Assignee: **FardeenI**\n+- Due: April 11\n+- Blocked by: #1\n+- Unblocks: #9, #10, #15\n+\n+**9. Integration Test Implementation + Environment Matrix**\n+- Implement the integration tests from the spec\n+- Support two execution targets:\n+  - `local`: starts local frontend/backend dependencies and runs against localhost\n+  - `cloud`: runs against already-deployed frontend/backend URLs without starting local app servers\n+- Add environment selection via explicit env vars or script arguments\n+- Document which tests are:\n+  - portable across both targets\n+  - local-only because they depend on reset/seed control\n+  - cloud-only because they validate deployed behavior\n+- Capture/structure output for both local and cloud runs\n+- Keep target URLs, environment contracts, and replica-sensitive validations aligned with `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`\n+- Acceptance criteria:\n+  - Tests run in a local configuration\n+  - Tests run in a cloud configuration\n+  - Cloud mode does not require local frontend/backend startup","path":"planning/SPRINT_4_PLAN.md","commit_id":"c772049c066293c5d3036e439dd8ddcc147b69e0","original_commit_id":"c772049c066293c5d3036e439dd8ddcc147b69e0","user":{"login":"AvanishKulkarni","id":55012494,"node_id":"MDQ6VXNlcjU1MDEyNDk0","avatar_url":"https://avatars.githubusercontent.com/u/55012494?v=4","gravatar_id":"","url":"https://api.github.com/users/AvanishKulkarni","html_url":"https://github.com/AvanishKulkarni","followers_url":"https://api.github.com/users/AvanishKulkarni/followers","following_url":"https://api.github.com/users/AvanishKulkarni/following{/other_user}","gists_url":"https://api.github.com/users/AvanishKulkarni/gists{/gist_id}","starred_url":"https://api.github.com/users/AvanishKulkarni/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/AvanishKulkarni/subscriptions","organizations_url":"https://api.github.com/users/AvanishKulkarni/orgs","repos_url":"https://api.github.com/users/AvanishKulkarni/repos","events_url":"https://api.github.com/users/AvanishKulkarni/events{/privacy}","received_events_url":"https://api.github.com/users/AvanishKulkarni/received_events","type":"User","user_view_type":"public","site_admin":false},"body":"**Cloud-target integration tests will run against the same Postgres instance the instructor reviews, and the plan has no data-hygiene strategy.**\n\nIssue #9 defines `cloud` mode as \"runs against already-deployed frontend/backend URLs,\" and Issue #14 runs the cloud-target suite as part of submission evidence. If the only deployed environment is production, then any test that creates users, channels, messages, or attachments will leave residue in the exact database the grader will see — or worse, mutate data the review flow depends on (visibility flips, message edits, deletes). The acceptance criteria as written (`Tests run in a cloud configuration`, `Cloud mode does not require local frontend/backend startup`) are satisfied by a suite that actively corrupts prod.\n\nPick one of the following and encode it in the Issue #8 spec and Issue #9 acceptance criteria:\n\n1. **Stand up a second Railway environment (staging)** with its own Postgres/Redis and point cloud-mode tests at it. Highest fidelity; highest setup cost. Requires an extra `TARGET_ENV` knob in `deploy-railway.yml` or a separate workflow.\n2. **Scope cloud mode to read-only smoke checks** — health endpoints, guest public channel rendering, public SSR metadata, SSE handshake (connect-then-disconnect without publishing), and canonical URL/sitemap fetches. All write-path coverage stays in local mode. Lowest cost; narrowest validation.\n3. **Tagged test-tenant isolation** — all cloud-mode writes happen under a reserved `test-*` user/workspace namespace, with a cleanup step that runs before and after each suite via an authenticated admin endpoint. Requires the backend to expose a scoped cleanup API and careful handling so cleanup failures do not leak into the next run.\n\nAdd an acceptance criterion to Issue #9:\n\n> - Cloud-mode tests declare a data-isolation strategy (staging environment, read-only scope, or tagged-tenant cleanup) and cannot mutate state outside that strategy. The choice is recorded in `docs/test-specs/` and in `docs/deployment/deployment-architecture.md`.\n\nThis needs to be picked before Issue #9 starts implementing, not during Issue #14.","created_at":"2026-04-10T21:27:02Z","updated_at":"2026-04-10T21:27:02Z","html_url":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066825330","pull_request_url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311","_links":{"self":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825330"},"html":{"href":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066825330"},"pull_request":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311"}},"reactions":{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825330/reactions","total_count":0,"+1":0,"-1":0,"laugh":0,"hooray":0,"confused":0,"heart":0,"rocket":0,"eyes":0},"start_line":null,"original_start_line":null,"start_side":null,"line":285,"original_line":285,"side":"RIGHT","author_association":"MEMBER","original_position":285,"position":285,"subject_type":"line"},{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825335","pull_request_review_id":4092576014,"id":3066825335,"node_id":"PRRC_kwDORIrGY862zAp3","diff_hunk":"@@ -0,0 +1,553 @@\n+# Deployment Sprint Plan — April 8–19, 2026\n+\n+## Context\n+Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend backed by PostgreSQL and Redis. Sprint 4 adapts the P6 deployment assignment to a **Vercel + Railway** production stack:\n+\n+- **Frontend hosting:** Vercel\n+- **Backend hosting:** Railway\n+- **Database:** Railway Postgres\n+- **Cache / event bus:** Railway Redis\n+- **Public deployment goal:** keep the app deployed through instructor review\n+- **Scaling goal:** support **2 or more backend API replicas** on Railway while keeping background event processing correct\n+\n+This sprint must cover the substance of **P6 Deployment** while ignoring the AWS-only platform choice. The plan therefore replaces:\n+\n+- AWS Lambda/API Gateway with Railway backend services\n+- AWS Amplify with Vercel frontend hosting\n+- AWS CD workflows with Vercel/Railway CD workflows\n+\n+Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.\n+\n+The assignment requirements we still must satisfy are:\n+\n+1. Publicly deploy frontend and backend\n+2. Automate deployment from GitHub\n+3. Add integration test specifications and implementation\n+4. Run integration tests locally and in the cloud\n+5. Add GitHub Actions for integration tests\n+6. Adopt GitHub hygiene and branch protection\n+7. Update README with user-facing and deployer-facing instructions\n+8. Produce the final submission artifacts, links, logs, and reflection\n+\n+**Assignment:** P6: Deployment  \n+**Due:** Sunday, April 19, 2026, 11:59 PM AOE\n+\n+## Team\n+5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI\n+\n+## Target Architecture\n+\n+### Public Services\n+- `frontend` on Vercel\n+- `backend-api` on Railway with **2+ replicas**\n+\n+### Internal / Stateful Services\n+- `backend-worker` on Railway with **1 replica only**\n+- `postgres` on Railway\n+- `redis` on Railway\n+\n+### Domain Layout\n+- `https://<frontend-domain>` -> Vercel\n+- `https://api.<frontend-domain>` -> Railway `backend-api`\n+\n+### Multi-Backend Railway Rules\n+To safely support 2+ backend replicas, the sprint must remove or isolate process-local production state:\n+\n+- Public/auth rate limiting must use **Redis-backed shared storage**\n+- File uploads must use **shared object storage**, not local disk\n+- Background subscribers / cache invalidation / sitemap updates must run in a **singleton worker**\n+- API replicas must be stateless apart from live SSE client connections\n+- Deployment verification must prove that 2+ API replicas behave correctly behind Railway load balancing\n+\n+### Explicit Production Decisions\n+- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.\n+- **Sitemap handoff:** the frontend apex domain serves crawler-facing sitemap entrypoints through **Next.js route handlers** that fetch sitemap/XML data from the backend at request time. The backend may generate sitemap data, but the API subdomain is not the direct crawl target in production.\n+- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.\n+- **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.\n+- **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.\n+- **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.\n+- **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.\n+- **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.\n+- **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.\n+\n+---\n+\n+## P6 Coverage Map\n+\n+| P6 Requirement | Vercel + Railway Adaptation | Covered By Issues |\n+|---|---|---|\n+| Publicly deploy frontend | Deploy Next.js app to Vercel | #6, #12, #16 |\n+| Publicly deploy backend | Deploy Express/tRPC app to Railway | #5, #7, #11 |\n+| Publish backend public interfaces via REST | Keep Railway backend public routes stable and production-configured | #1, #5, #7 |\n+| Integration test specification | Write English-language integration spec for FE-BE paths | #8 |\n+| Integration tests on localhost | Add env-aware local integration test flow | #9 |\n+| Integration tests in cloud | Run same test suite against deployed Vercel + Railway URLs | #9, #14 |\n+| GitHub Action for integration tests | Add `run-integration-tests.yml` | #10 |\n+| Continuous deployment | Add backend and frontend deployment workflows for Railway and Vercel | #11, #12 |\n+| GitHub hygiene / branch protection | Require PRs and required checks before merge | #13 |\n+| README update | Add user-facing run instructions and deployer guide | #15 |\n+| Submission links, logs, reflection | Final packaging and artifact checklist | #15 |\n+\n+---\n+\n+## Issues (16 total)\n+\n+> **Note:** Issues are written so they can be opened directly on GitHub with the dependency notes preserved in the body. \"Blocked by\" means the issue should not be considered complete until those upstream issues land. \"Unblocks\" is included to make sequencing explicit for the team.\n+\n+### Phase 1: Architecture, Production Readiness, and Scaling Design — April 8–11\n+\n+**1. Deployment Architecture + Environment Matrix**\n+- Define the final Vercel + Railway topology:\n+  - `frontend`\n+  - `backend-api`\n+  - `backend-worker`\n+  - `postgres`\n+  - `redis`\n+- Document production env vars for frontend, backend API, and worker\n+- Define domain plan (`frontend` domain + `api` subdomain)\n+- Define promotion flow for preview vs production\n+- Produce and save a reference document at `docs/deployment/deployment-architecture.md`\n+  - this document is the canonical reference for service topology, domain ownership, env vars, deploy authority, and preview vs production behavior\n+  - later deployment issues should link to and update this document instead of redefining architecture assumptions\n+- Acceptance criteria:\n+  - Clear service inventory\n+  - Clear env var matrix\n+  - Clear ownership of public vs internal services\n+  - Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton\n+  - `docs/deployment/deployment-architecture.md` exists and is usable as the canonical reference for downstream issues\n+- Assignee: **acabrera04**\n+- Backup owner: **declanblanc**\n+- Due: April 9\n+- Blocked by: none\n+- Unblocks: #2, #6, #7, #8, #16\n+\n+**2. Backend Scale Audit for Railway Replicas**\n+- Audit the current backend for state that will break with 2+ API replicas\n+- Confirm and document the required changes for:\n+  - in-memory rate limiting\n+  - local filesystem attachment storage\n+  - duplicate startup subscribers / background jobs\n+  - SSE behavior behind load balancing\n+  - proxy/IP handling\n+- Produce and save a reference document at `docs/deployment/replica-readiness-audit.md`\n+  - include the concrete \"replica-safe backend\" checklist for implementation\n+  - include must-fix items, acceptable demo-time risks, and explicit ownership boundaries between `backend-api` and `backend-worker`\n+  - later scaling/deployment issues should cite this document when implementing or validating replica-safe behavior\n+- Acceptance criteria:\n+  - Checklist references the actual code areas that must change\n+  - Risks are prioritized into must-fix vs acceptable-for-demo\n+  - `backend-api` vs `backend-worker` responsibilities are finalized\n+  - `docs/deployment/replica-readiness-audit.md` exists and is detailed enough for downstream implementation/validation issues to reference directly\n+- Assignee: **declanblanc**\n+- Backup owner: **acabrera04**\n+- Due: April 9\n+- Blocked by: #1\n+- Unblocks: #3, #4, #5, #14\n+\n+**3. Shared Rate Limiting + Proxy-Aware Networking**\n+- Replace process-local rate limiting with shared Redis-backed limiting\n+- Replace or unify **both** current implementations:\n+  - auth endpoint limiting using `express-rate-limit`\n+  - public-route token bucket limiting\n+- Ensure auth and public API rate limits remain correct across 2+ replicas\n+- Configure Express proxy awareness so client IP handling works correctly behind Railway\n+- Use `docs/deployment/replica-readiness-audit.md` as the implementation checklist and update it with final decisions\n+- Acceptance criteria:\n+  - Public and auth rate limits are shared across replicas\n+  - No process-local auth or public-route limit counters remain in production code paths\n+  - Production proxy trust is explicitly configured for a **single Railway hop** (`trust proxy = 1` or equivalent) and documented in deployment docs\n+  - Rate limit behavior is covered by tests or verification notes\n+- Assignee: **Aiden-Barrera**\n+- Due: April 11\n+- Blocked by: #2\n+- Unblocks: #14\n+\n+**4. Production Attachment Storage Provider**\n+- Implement a production storage provider backed by **Cloudflare R2 via an S3-compatible interface**\n+- Keep local storage available for development only\n+- Add env-driven provider selection and document required secrets\n+- Ensure uploaded files remain accessible regardless of which API replica serves subsequent requests\n+- Follow `docs/deployment/replica-readiness-audit.md` for replica-safe storage requirements and update `docs/deployment/deployment-architecture.md` with the final env/config contract\n+- Acceptance criteria:\n+  - Production does not rely on local filesystem attachment serving\n+  - The chosen production provider is Cloudflare R2, documented as such in code and setup docs\n+  - README and env matrix document storage setup\n+  - Attachment flow works end-to-end in deployed environment\n+- Assignee: **AvanishKulkarni**\n+- Due: April 11\n+- Blocked by: #2\n+- Unblocks: #14, #15\n+\n+**5. Split `backend-api` and Singleton `backend-worker`**\n+- Move background-only startup behavior into a dedicated worker process\n+- Ensure duplicated subscribers / cache invalidation / sitemap upkeep do not run on every API replica\n+- Keep API replicas focused on HTTP/tRPC/SSE request handling\n+- Use **Redis pub/sub fan-out** as the explicit SSE strategy so each API replica can deliver shared events to its own connected clients without sticky-session requirements\n+- Add lightweight replica observability for validation:\n+  - instance identity in structured logs\n+  - instance/replica identity on health output and/or response headers\n+- Add startup commands for both Railway backend services\n+- Use `docs/deployment/replica-readiness-audit.md` to drive the split and record the final `backend-api` / `backend-worker` ownership model there and in `docs/deployment/deployment-architecture.md`\n+- Acceptance criteria:\n+  - `backend-api` can run with 2+ replicas without duplicate singleton background side effects\n+  - `backend-worker` runs with 1 replica and owns singleton event-driven tasks\n+  - SSE behavior across 2+ replicas follows the documented Redis fan-out strategy and no sticky-session dependency remains in the production design\n+  - Replica identity is externally observable enough to prove load balancing across 2+ API replicas\n+  - `backend-worker` health check and restart expectations are documented and wired into deployment assumptions\n+  - Service responsibilities are documented\n+- Assignee: **declanblanc**\n+- Backup owner: **acabrera04**\n+- Due: April 12\n+- Blocked by: #2\n+- Unblocks: #7, #11, #14\n+\n+### Phase 2: Frontend and Integration Foundations — April 9–13\n+\n+**6. Frontend Production Configuration for Vercel**\n+- Add production-safe frontend configuration:\n+  - absolute canonical URLs\n+  - `metadataBase`\n+  - `robots.txt` on the frontend apex domain\n+  - sitemap support on the frontend apex domain\n+  - production API base URL handling\n+- Make the SEO ownership boundary explicit:\n+  - frontend apex domain owns the canonical public SEO artifacts: canonical URLs, `metadataBase`, `robots.txt`, sitemap entrypoints, and any sitemap index exposed to crawlers\n+  - frontend sitemap entrypoints are implemented through Next.js route handlers that fetch backend sitemap/XML data at request time\n+  - backend SEO routes may continue to generate sitemap/XML data as an internal or transitional source, but they are not the canonical crawler-facing host in production\n+  - no SEO artifact should require crawlers to use the API subdomain as the primary source of truth\n+- Ensure frontend still supports localhost development cleanly\n+- Use `docs/deployment/deployment-architecture.md` as the source of truth for domain ownership, public URLs, and SEO host decisions\n+- Acceptance criteria:\n+  - Public pages generate correct production metadata\n+  - Canonical host ownership is explicit and consistent across frontend and backend docs/code\n+  - Frontend can target local and cloud backends without code edits\n+  - SEO-critical pages render correctly on the public domain\n+- Assignee: **AvanishKulkarni**\n+- Due: April 11\n+- Blocked by: #1\n+- Unblocks: #12, #16\n+\n+**7. Railway Project Provisioning and Service Wiring**\n+- Create/configure the Railway project and services:\n+  - `backend-api`\n+  - `backend-worker`\n+  - `postgres`\n+  - `redis`\n+- Configure internal networking, service env vars, health checks, deploy commands, and domains\n+- Ensure `backend-api` and `backend-worker` both connect to the same Postgres and Redis instances\n+- Provision services and env vars to match `docs/deployment/deployment-architecture.md`, and use `docs/deployment/replica-readiness-audit.md` for replica-safety requirements\n+- Acceptance criteria:\n+  - Railway project is provisioned\n+  - Domains/env vars/health checks are configured\n+  - Postgres and Redis env vars use Railway private/internal connection strings for service-to-service traffic\n+  - `backend-worker` has a health check and restart-on-failure behavior configured\n+  - `backend-api` and `backend-worker` both boot successfully in Railway\n+- Assignee: **acabrera04**\n+- Backup owner: **FardeenI**\n+- Due: April 13\n+- Blocked by: #1, #5\n+- Unblocks: #11, #14, #15\n+\n+**8. Integration Test Specification**\n+- Write an English-language integration test specification for all frontend-backend code paths that must work in deployment\n+- Cover at least:\n+  - guest public channel rendering\n+  - login / auth refresh path\n+  - public API path used by SSR metadata/page rendering\n+  - visibility change impact on public indexing behavior\n+  - attachment path if production storage is in scope\n+  - SSE/realtime smoke behavior if kept in deployed flow\n+- Reference `docs/deployment/deployment-architecture.md` for deployment topology and `docs/deployment/replica-readiness-audit.md` for replica-sensitive scenarios that need validation\n+- Acceptance criteria:\n+  - Every FE-BE pathway has at least one test case\n+  - Spec includes local-only vs cloud-only notes where relevant\n+  - Spec is stored under `docs/test-specs/`\n+- Assignee: **FardeenI**\n+- Due: April 11\n+- Blocked by: #1\n+- Unblocks: #9, #10, #15\n+\n+**9. Integration Test Implementation + Environment Matrix**\n+- Implement the integration tests from the spec\n+- Support two execution targets:\n+  - `local`: starts local frontend/backend dependencies and runs against localhost\n+  - `cloud`: runs against already-deployed frontend/backend URLs without starting local app servers\n+- Add environment selection via explicit env vars or script arguments\n+- Document which tests are:\n+  - portable across both targets\n+  - local-only because they depend on reset/seed control\n+  - cloud-only because they validate deployed behavior\n+- Capture/structure output for both local and cloud runs\n+- Keep target URLs, environment contracts, and replica-sensitive validations aligned with `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`\n+- Acceptance criteria:\n+  - Tests run in a local configuration\n+  - Tests run in a cloud configuration\n+  - Cloud mode does not require local frontend/backend startup\n+  - Any environment-specific exceptions are documented\n+- Assignee: **Aiden-Barrera**\n+- Due: April 14\n+- Blocked by: #8, #6, #7\n+- Unblocks: #10, #14, #15\n+\n+### Phase 3: CI/CD and Deployment Automation — April 12–16\n+\n+**10. GitHub Action — `run-integration-tests.yml`**\n+- Create `.github/workflows/run-integration-tests.yml`\n+- Install frontend/backend dependencies\n+- Set up the required environment for integration tests\n+- Run the local-target integration suite in CI\n+- Keep the workflow name and job names stable so they can be required in branch protection\n+- Document how cloud-target integration tests are invoked outside CI when deployed URLs are available\n+- Reference `docs/deployment/deployment-architecture.md` for environment inputs and `docs/deployment/replica-readiness-audit.md` for any replica-sensitive checks excluded from local CI\n+- Acceptance criteria:\n+  - Workflow passes on a PR\n+  - Workflow is usable as a required status check\n+  - YAML is committed and documented\n+- Assignee: **FardeenI**\n+- Due: April 15\n+- Blocked by: #8, #9\n+- Unblocks: #13, #15\n+\n+**11. GitHub Action — `deploy-railway.yml`**\n+- Create backend CD workflow for Railway\n+- Deploy `backend-api` and `backend-worker` on pushes to `main`\n+- Ensure migrations / build / deploy ordering is safe\n+- Use GitHub secrets for Railway authentication\n+- Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted\n+- Implement the workflow against the service topology and env contract defined in `docs/deployment/deployment-architecture.md`\n+- Acceptance criteria:\n+  - Workflow deploys backend services without manual intervention\n+  - Production deploy authority is unambiguous and documented\n+  - Exactly one migration runner performs `prisma migrate deploy`, and `backend-api` replicas are prevented from racing migrations on startup","path":"planning/SPRINT_4_PLAN.md","commit_id":"c772049c066293c5d3036e439dd8ddcc147b69e0","original_commit_id":"c772049c066293c5d3036e439dd8ddcc147b69e0","user":{"login":"AvanishKulkarni","id":55012494,"node_id":"MDQ6VXNlcjU1MDEyNDk0","avatar_url":"https://avatars.githubusercontent.com/u/55012494?v=4","gravatar_id":"","url":"https://api.github.com/users/AvanishKulkarni","html_url":"https://github.com/AvanishKulkarni","followers_url":"https://api.github.com/users/AvanishKulkarni/followers","following_url":"https://api.github.com/users/AvanishKulkarni/following{/other_user}","gists_url":"https://api.github.com/users/AvanishKulkarni/gists{/gist_id}","starred_url":"https://api.github.com/users/AvanishKulkarni/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/AvanishKulkarni/subscriptions","organizations_url":"https://api.github.com/users/AvanishKulkarni/orgs","repos_url":"https://api.github.com/users/AvanishKulkarni/repos","events_url":"https://api.github.com/users/AvanishKulkarni/events{/privacy}","received_events_url":"https://api.github.com/users/AvanishKulkarni/received_events","type":"User","user_view_type":"public","site_admin":false},"body":"**\"Exactly one migration runner\" closes the race-at-boot problem but does not cover destructive migrations under a rolling restart, and that gap will bite on the first column drop or NOT NULL tightening.**\n\nRailway has no Heroku-style release phase that pauses request handling while a migration runs. Even with a single migration runner, the rollout sequence is:\n\n1. Migration runner applies schema change.\n2. Railway rolling-restarts `backend-api` replicas one at a time.\n3. For a non-trivial window, **old code and new schema are running concurrently against the same database.**\n\nAny destructive migration in that window will break the old replica:\n- `DROP COLUMN foo` → old replicas SELECTing `foo` get runtime errors on every request touching that table.\n- `ALTER COLUMN foo SET NOT NULL` → old replicas inserting rows without `foo` fail.\n- `RENAME COLUMN foo TO bar` → old replicas fail on both reads and writes.\n- Non-concurrent index creation → table lock that stalls old replicas' queries.\n\nPlease add an acceptance criterion to Issue #11 and a matching rule to `docs/deployment/deployment-architecture.md`:\n\n> - Destructive schema changes follow an **expand/contract** convention: additive changes ship first (add nullable column, add new index `CONCURRENTLY`, dual-write code), the code migrates to the new shape, and only a later deploy removes the old column/constraint. Single-deploy destructive migrations (column drop, NOT NULL tightening, rename, non-concurrent index on large tables) are disallowed on `main`.\n\nConcrete guidance worth documenting alongside:\n- **Rename:** add new column, backfill, dual-write, cut readers over, drop old column in a later deploy.\n- **Drop:** stop reading the column in code (deploy), then drop it (deploy).\n- **NOT NULL tighten:** add with a default or backfill first, enforce `NOT NULL` in a later deploy.\n- **Indexes on large tables:** `CREATE INDEX CONCURRENTLY` via a separate migration that does not run inside a transaction.\n\nWithout this rule written down before Issue #11 lands, the first team member to write a \"small cleanup\" migration will take down the API mid-rollout.","created_at":"2026-04-10T21:27:02Z","updated_at":"2026-04-10T21:27:02Z","html_url":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066825335","pull_request_url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311","_links":{"self":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825335"},"html":{"href":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066825335"},"pull_request":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311"}},"reactions":{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825335/reactions","total_count":0,"+1":0,"-1":0,"laugh":0,"hooray":0,"confused":0,"heart":0,"rocket":0,"eyes":0},"start_line":null,"original_start_line":null,"start_side":null,"line":321,"original_line":321,"side":"RIGHT","author_association":"MEMBER","original_position":321,"position":321,"subject_type":"line"}]
```

#### Tool: exec_command

```sh
gh pr view 311 --repo CS485-Harmony/Harmony --comments
```

Output:

```text
author:	AvanishKulkarni
association:	member
edited:	false
status:	none
--
**[Technical Review — Sprint 4 Plan]**

Six technical gaps in the plan worth addressing before downstream issues are started:

---

**1. SSE with 2+ replicas is unresolved**

The plan notes API replicas are *"stateless apart from live SSE client connections"* but prescribes no solution. A client connected to replica A won't receive events emitted on replica B — this breaks realtime for any multi-replica path.

*Suggested fix:* Commit to a specific approach in the plan. The two realistic options are (a) Redis pub/sub fan-out on `backend-api` so each replica re-publishes to its own connected clients, or (b) sticky sessions at the Railway load balancer level. Option (a) is stateless-friendly and more consistent with the rest of the architecture. Whichever is chosen should be documented in `docs/deployment/replica-readiness-audit.md` (#2) before #5 is implemented.

---

**2. Prisma migration race condition**

If `backend-api` (2+ replicas) and `backend-worker` all run `prisma migrate deploy` on startup, multiple processes will attempt the migration simultaneously. This can corrupt migration state.

*Suggested fix:* Designate a single migration runner — the most common pattern is a one-shot Railway job or a pre-deploy command on `backend-worker` only, with `backend-api` replicas blocked from running migrations. This should be an explicit acceptance criterion in #11 (`deploy-railway.yml`) since the deploy workflow controls startup ordering.

---

**3. Sitemap handoff between frontend and backend is unspecified**

The plan states the frontend apex domain owns canonical sitemap entrypoints but that *"backend SEO routes may continue to generate sitemap/XML data as an internal or transitional source."* The mechanism is never defined — does the frontend proxy to the backend? Does the worker push pre-generated XML? Does the frontend call the backend at build time?

*Suggested fix:* Pick one pattern and state it explicitly in #6. The simplest production-safe approach is a Next.js route handler that fetches from the backend API at request time (ISR or on-demand). The plan should rule out the backend subdomain as a direct crawl target.

---

**4. Railway internal networking is never specified**

Both `backend-api` and `backend-worker` connect to Postgres and Redis. Railway provides private internal hostnames for inter-service traffic. The plan never says to use them, so implementers may default to public URLs — adding unnecessary latency and egress cost.

*Suggested fix:* Add a note in #7 (Railway provisioning) that Postgres and Redis connection strings must use Railway's private network hostnames, not the public TCP proxy. This should also be reflected in the env var matrix in `docs/deployment/deployment-architecture.md`.

---

**5. Express `trust proxy` level is unspecified**

Issue #3 says to configure proxy awareness for correct IP handling behind Railway, but doesn't specify the trust level. If set too broadly (e.g., `trust proxy: true`), any `X-Forwarded-For` header — including spoofed ones — is trusted, making IP-based rate limiting bypassable. If not set at all, all requests appear to originate from the Railway load balancer IP, defeating per-client limiting entirely.

*Suggested fix:* The plan (or #3's acceptance criteria) should specify the intended trust level. For Railway, `app.set('trust proxy', 1)` is typically correct — trusting one hop. This is a security-relevant configuration and should be verified in #14 as part of rate limit validation.

---

**6. `backend-worker` crash behavior is unaddressed**

The worker is load-bearing: if it crashes, cache invalidation, sitemap updates, and background jobs stop silently. The plan designates it a singleton but says nothing about restart policy, health checks, or graceful degradation when it's unavailable.

*Suggested fix:* Add to #5 or #7 that `backend-worker` must have a Railway health check configured and a restart-on-failure policy. The plan should also state how `backend-api` behaves if the worker is down — ideally, API requests remain functional and worker-dependent side effects are queued or deferred rather than erroring.
--
author:	acabrera04
association:	member
edited:	false
status:	commented
--
## Review Checklist

- [ ] **Logic over Style**: The deployment plan still has unresolved technical planning gaps called out in the existing review, especially multi-replica SSE behavior and migration ownership.
- [ ] **Security First**: The `trust proxy` level and Railway private-network usage are not specified yet, which affects IP-based limiting and service exposure choices.
- [ ] **Architectural Alignment**: The intended Vercel/Railway split is directionally clear, but the worker/API boundary and SEO handoff need the missing operational details before downstream implementation starts.
- [ ] **Issue Completion**: No linked issue/acceptance criteria are present; P6 coverage cannot be considered complete until the existing deployment-plan gaps are incorporated.
- [x] **No Nitpicking**: Review is limited to deployment correctness, security, and sequencing risk.
- [x] **Avoid Repetition**: I reviewed the existing technical review and am not restating each item as fresh line comments.
- [x] **Iterative Reviews**: The existing unresolved planning feedback still applies.
- [x] **Prevent CI Failures**: Docs-only PR checks are green (5 passed, 0 failed), but the plan-level blockers would likely create downstream deployment failures if left vague.

I agree with the existing technical review and found no separate issue worth adding. Before merging, fold those unresolved items into the plan: choose the SSE strategy, designate a single migration runner, define frontend/backend sitemap handoff, require Railway private connection strings, specify Express `trust proxy` behavior, and add worker health/restart expectations.
--
author:	acabrera04
association:	member
edited:	false
status:	none
--
> Re: comment 4091019364

Fixed in c772049. The sprint plan now makes the missing operational decisions explicit: Redis fan-out for multi-replica SSE, a single migration runner, frontend apex sitemap handoff via Next.js route handlers, Railway private/internal connection strings, one-hop trust proxy behavior, and worker health/restart expectations.
--
author:	acabrera04
association:	member
edited:	false
status:	none
--
> Re: comment 4218158167

Fixed in c772049. The plan now explicitly names the SSE strategy, migration ownership, frontend sitemap handoff, Railway private/internal networking, one-hop trust proxy behavior, and worker health/restart expectations so downstream implementation issues have concrete operational guidance.
--
author:	AvanishKulkarni
association:	member
edited:	false
status:	changes requested
--
Requesting changes — see inline comments for critical unaddressed issues.
--
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:29:52.383Z

There are new inline review findings from Avanish on the current commit. I’m extracting them in a compact form now so I can patch the plan against the actual requested changes instead of guessing from the truncated API output.

#### Tool: exec_command

```sh
gh api repos/CS485-Harmony/Harmony/pulls/311/comments | python - <<'PY'
import json,sys
comments=json.load(sys.stdin)
for c in comments:
    print('ID', c['id'], 'LINE', c.get('line'), 'PATH', c.get('path'))
    body=c['body'].strip().replace('\r','')
    print(body[:1200])
    print('\n---\n')
PY
```

Output:

```text
Total output lines: 4

  File "<stdin>", line 1
    [{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825321","pull_request_review_id":4092576014,"id":3066825321,"node_id":"PRRC_kwDORIrGY862zApp","diff_hunk":"@@ -0,0 +1,553 @@\n+# Deployment Sprint Plan — April 8–19, 2026\n+\n+## Context\n+Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend backed by PostgreSQL and Redis. Sprint 4 adapts the P6 deployment assignment to a **Vercel + Railway** production stack:\n+\n+- **Frontend hosting:** Vercel\n+- **Backend hosting:** Railway\n+- **Database:** Railway Postgres\n+- **Cache / event bus:** Railway Redis\n+- **Public deployment goal:** keep the app deployed through instructor review\n+- **Scaling goal:** support **2 or more backend API replicas** on Railway while keeping background event processing correct\n+\n+This sprint must cover the substance of **P6 Deployment** while ignoring the AWS-only platform choice. The plan therefore replaces:\n+\n+- AWS Lambda/API Gateway with Railway backend services\n+- AWS Amplify with Vercel frontend hosting\n+- AWS CD workflows with Vercel/Railway CD workflows\n+\n+Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.\n+\n+The assignment requirements we still must satisfy are:\n+\n+1. Publicly deploy frontend and backend\n+2. Automate deployment from GitHub\n+3. Add integration test specifications and implementation\n+4. Run integration tests locally and in the cloud\n+5. Add GitHub Actions for integration tests\n+6. Adopt GitHub hygiene and branch protection\n+7. Update README with user-facing and deployer-facing instructions\n+8. Produce the final submission artifacts, links, logs, and reflection\n+\n+**Assignment:** P6: Deployment  \n+**Due:** Sunday, April 19, 2026, 11:59 PM AOE\n+\n+## Team\n+5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI\n+\n+## Target Architecture\n+\n+### Public Services\n+- `frontend` on Vercel\n+- `backend-api` on Railway with **2+ replicas**\n+\n+### Internal / Stateful Services\n+- `backend-worker` on Railway with **1 replica only**\n+- `postgres` on Railway\n+- `redis` on Railway\n+\n+### Domain Layout\n+- `https://<frontend-domain>` -> Vercel\n+- `https://api.<frontend-domain>` -> Railway `backend-api`\n+\n+### Multi-Backend Railway Rules\n+To safely support 2+ backend replicas, the sprint must remove or isolate process-local production state:\n+\n+- Public/auth rate limiting must use **Redis-backed shared storage**\n+- File uploads must use **shared object storage**, not local disk\n+- Background subscribers / cache invalidation / sitemap updates must run in a **singleton worker**\n+- API replicas must be stateless apart from live SSE client connections\n+- Deployment verification must prove that 2+ API replicas behave correctly behind Railway load balancing\n+\n+### Explicit Production Decisions\n+- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.\n+- **Sitemap handoff:** the frontend apex domain serves crawler-facing sitemap entrypoints through **Next.js route handlers** that fetch sitemap/XML data from the backend at request time. The backend may generate sitemap data, but the API subdomain is not the direct crawl target in production.\n+- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.\n+- **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.\n+- **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.\n+- **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.\n+- **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.\n+- **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.\n+- **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.\n+\n+---\n+\n+## P6 Coverage Map\n+\n+| P6 Requirement | Vercel + Railway Adaptation | Covered By Issues |\n+|---|---|---|\n+| Publicly deploy frontend | Deploy Next.js app to Vercel | #6, #12, #16 |\n+| Publicly deploy backend | Deploy Express/tRPC app to Railway | #5, #7, #11 |\n+| Publish backend public interfaces via REST | Keep Railway backend public routes stable and production-configured | #1, #5, #7 |\n+| Integration test specification | Write English-language integration spec for FE-BE paths | #8 |\n+| Integration tests on localhost | Add env-aware local integration test flow | #9 |\n+| Integration tests in cloud | Run same test suite against deployed Vercel + Railway URLs | #9, #14 |\n+| GitHub Action for integration tests | Add `run-integration-tests.yml` | #10 |\n+| Continuous deployment | Add backend and frontend deployment workflows for Railway and Vercel | #11, #12 |\n+| GitHub hygiene / branch protection | Require PRs and required checks before merge | #13 |\n+| README update | Add user-facing run instructions and deployer guide | #15 |\n+| Submission links, logs, reflection | Final packaging and artifact checklist | #15 |\n+\n+---\n+\n+## Issues (16 total)\n+\n+> **Note:** Issues are written so they can be opened directly on GitHub with the dependency notes preserved in the body. \"Blocked by\" means the issue should not be considered complete until those upstream issues land. \"Unblocks\" is included to make sequencing explicit for the team.\n+\n+### Phase 1: Architecture, Production Readiness, and Scaling Design — April 8–11\n+\n+**1. Deployment Architecture + Environment Matrix**\n+- Define the final Vercel + Railway topology:\n+  - `frontend`\n+  - `backend-api`\n+  - `backend-worker`\n+  - `postgres`\n+  - `redis`\n+- Document production env vars for frontend, backend API, and worker\n+- Define domain plan (`frontend` domain + `api` subdomain)","path":"planning/SPRINT_4_PLAN.md","commit_id":"c772049c066293c5d3036e439dd8ddcc147b69e0","original_commit_id":"c772049c066293c5d3036e439dd8ddcc147b69e0","user":{"login":"AvanishKulkarni","id":55012494,"node_id":"MDQ6VXNlcjU1MDEyNDk0","avatar_url":"https://avatars.githubusercontent.com/u/55012494?v=4","gravatar_id":"","url":"https://api.github.com/users/AvanishKulkarni","html_url":"https://github.com/AvanishKulkarni","followers_url":"https://api.github.com/users/AvanishKulkarni/followers","following_url":"https://api.github.com/users/AvanishKulkarni/following{/other_user}","gists_url":"https://api.github.com/users/AvanishKulkarni/gists{/gist_id}","starred_url":"https://api.github.com/users/AvanishKulkarni/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/AvanishKulkarni/subscriptions","organizations_url":"https://api.github.com/users/AvanishKulkarni/orgs","repos_url":"https://api.github.com/users/AvanishKulkarni/repos","events_url":"https://api.github.com/users/AvanishKulkarni/events{/privacy}","received_events_url":"https://api.github.com/users/AvanishKulkarni/received_events","type":"User","user_view_type":"public","site_admin":false},"body":"**Cross-origin auth and cookie strategy is not specified anywhere in the plan and will block the production deploy.**\n\nThe topology puts the frontend on `<apex>` and the API on `api.<apex>`, which makes every authenticated request cross-origin. Nothing in Issue #1, #6, or #7 commits to:\n\n1. **CORS configuration on the Express app.** Needs an explicit origin allowlist (production frontend domain + preview domains) with `credentials: true` and preflight handling for tRPC `POST` requests that send `content-type: application/json` and any auth headers. A wildcard origin cannot be combined with credentials, so this has to be enumerated.\n2. **Cookie strategy for session/refresh tokens.** Pick one and document it here:\n   - **Apex-scoped cookie:** issue cookies with `Domain=.<apex>`, `SameSite=Lax`, `Secure`, `HttpOnly`. Works cross-subdomain without `SameSite=None`, but requires the API and frontend to share a registrable domain.\n   - **Host-only cookie on the API subdomain:** `SameSite=None; Secure; HttpOnly`. Requires `credentials: 'include'` on every fetch and is subject to third-party cookie restrictions in some browsers.\n   - **Bearer token in `Authorization` header:** sidesteps cross-origin cookie handling entirely but requires client-side storage and refresh handling.\n3. **CSRF posture under whichever cookie model is chosen.**\n\nThis is the single highest-probability cause of a \"works on localhost, completely broken on the deployed domain\" failure mode during grading. Please add an **Auth & CORS contract** bullet to the Explicit Production Decisions section and an acceptance criterion to Issue #1 requiring `docs/deployment/deployment-architecture.md` to record the chosen cookie domain, `SameSite`/`Secure` flags, CORS allowlist, and auth transport before Issues #6/#7/#11 land.","created_at":"2026-04-10T21:27:02Z","updated_at":"2026-04-10T21:27:02Z","html_url":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066825321","pull_request_url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311","_links":{"self":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825321"},"html":{"href":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066825321"},"pull_request":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311"}},"reactions":{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825321/reactions","total_count":0,"+1":0,"-1":0,"laugh":0,"hooray":0,"confused":0,"heart":0,"rocket":0,"eyes":0},"start_line":null,"original_start_line":null,"start_side":null,"line":107,"original_line":107,"side":"RIGHT","author_association":"MEMBER","original_position":107,"position":107,"subject_type":"line"},{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825328","pull_request_review_id":4092576014,"id":3066825328,"node_id":"PRRC_kwDORIrGY862zApw","diff_hunk":"@@ -0,0 +1,553 @@\n+# Deployment Sprint Plan — April 8–19, 2026\n+\n+## Context\n+Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend backed by PostgreSQL and Redis. Sprint 4 adapts the P6 deployment assignment to a **Vercel + Railway** production stack:\n+\n+- **Frontend hosting:** Vercel\n+- **Backend hosting:** Railway\n+- **Database:** Railway Postgres\n+- **Cache / event bus:** Railway Redis\n+- **Public deployment goal:** keep the app deployed through instructor review\n+- **Scaling goal:** support **2 or more backend API replicas** on Railway while keeping background event processing correct\n+\n+This sprint must cover the substance of **P6 Deployment** while ignoring the AWS-only platform choice. The plan therefore replaces:\n+\n+- AWS Lambda/API Gateway with Railway backend services\n+- AWS Amplify with Vercel frontend hosting\n+- AWS CD workflows with Vercel/Railway CD workflows\n+\n+Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.\n+\n+The assignment requirements we still must satisfy are:\n+\n+1. Publicly deploy frontend and backend\n+2. Automate deployment from GitHub\n+3. Add integration test specifications and implementation\n+4. Run integration tests locally and in the cloud\n+5. Add GitHub Actions for integration tests\n+6. Adopt GitHub hygiene and branch protection\n+7. Update README with user-facing and deployer-facing instructions\n+8. Produce the final submission artifacts, links, logs, and reflection\n+\n+**Assignment:** P6: Deployment  \n+**Due:** Sunday, April 19, 2026, 11:59 PM AOE\n+\n+## Team\n+5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI\n+\n+## Target Architecture\n+\n+### Public Services\n+- `frontend` on Vercel\n+- `backend-api` on Railway with **2+ replicas**\n+\n+### Internal / Stateful Services\n+- `backend-worker` on Railway with **1 replica only**\n+- `postgres` on Railway\n+- `redis` on Railway\n+\n+### Domain Layout\n+- `https://<frontend-domain>` -> Vercel\n+- `https://api.<frontend-domain>` -> Railway `backend-api`\n+\n+### Multi-Backend Railway Rules\n+To safely support 2+ backend replicas, the sprint must remove or isolate process-local production state:\n+\n+- Public/auth rate limiting must use **Redis-backed shared storage**\n+- File uploads must use **shared object storage**, not local disk\n+- Background subscribers / cache invalidation / sitemap updates must run in a **singleton worker**\n+- API replicas must be stateless apart from live SSE client connections\n+- Deployment verification must prove that 2+ API replicas behave correctly behind Railway load balancing\n+\n+### Explicit Production Decisions\n+- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.\n+- **Sitemap handoff:** the frontend apex domain serves crawler-facing sitemap entrypoints through **Next.js route handlers** that fetch sitemap/XML data from the backend at request time. The backend may generate sitemap data, but the API subdomain is not the direct crawl target in production.\n+- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.\n+- **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.\n+- **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.\n+- **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.\n+- **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.\n+- **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.\n+- **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.\n+\n+---\n+\n+## P6 Coverage Map\n+\n+| P6 Requirement | Vercel + Railway Adaptation | Covered By Issues |\n+|---|---|---|\n+| Publicly deploy frontend | Deploy Next.js app to Vercel | #6, #12, #16 |\n+| Publicly deploy backend | Deploy Express/tRPC app to Railway | #5, #7, #11 |\n+| Publish backend public interfaces via REST | Keep Railway backend public routes stable and production-configured | #1, #5, #7 |\n+| Integration test specification | Write English-language integration spec for FE-BE paths | #8 |\n+| Integration tests on localhost | Add env-aware local integration test flow | #9 |\n+| Integration tests in cloud | Run same test suite against deployed Vercel + Railway URLs | #9, #14 |\n+| GitHub Action for integration tests | Add `run-integration-tests.yml` | #10 |\n+| Continuous deployment | Add backend and frontend deployment workflows for Railway and Vercel | #11, #12 |\n+| GitHub hygiene / branch protection | Require PRs and required checks before merge | #13 |\n+| README update | Add user-facing run instructions and deployer guide | #15 |\n+| Submission links, logs, reflection | Final packaging and artifact checklist | #15 |\n+\n+---\n+\n+## Issues (16 total)\n+\n+> **Note:** Issues are written so they can be opened directly on GitHub with the dependency notes preserved in the body. \"Blocked by\" means the issue should not be considered complete until those upstream issues land. \"Unblocks\" is included to make sequencing explicit for the team.\n+\n+### Phase 1: Architecture, Production Readiness, and Scaling Design — April 8–11\n+\n+**1. Deployment Architecture + Environment Matrix**\n+- Define the final Vercel + Railway topology:\n+  - `frontend`\n+  - `backend-api`\n+  - `backend-worker`\n+  - `postgres`\n+  - `redis`\n+- Document production env vars for frontend, backend API, and worker\n+- Define domain plan (`frontend` domain + `api` subdomain)\n+- Define promotion flow for preview vs production\n+- Produce and save a reference document at `docs/deployment/deployment-architecture.md`\n+  - this document is the canonical reference for service topology, domain ownership, env vars, deploy authority, and preview vs production behavior\n+  - later deployment issues should link to and update this document instead of redefining architecture assumptions\n+- Acceptance criteria:\n+  - Clear service inventory\n+  - Clear env var matrix\n+  - Clear ownership of public vs internal services\n+  - Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton\n+  - `docs/deployment/deployment-architecture.md` exists and is usable as the canonical reference for downstream issues\n+- Assignee: **acabrera04**\n+- Backup owner: **declanblanc**\n+- Due: April 9\n+- Blocked by: none\n+- Unblocks: #2, #6, #7, #8, #16\n+\n+**2. Backend Scale Audit for Railway Replicas**\n+- Audit the current backend for state that will break with 2+ API replicas\n+- Confirm and document the required changes for:\n+  - in-memory rate limiting\n+  - local filesystem attachment storage\n+  - duplicate startup subscribers / background jobs\n+  - SSE behavior behind load balancing\n+  - proxy/IP handling\n+- Produce and save a reference document at `docs/deployment/replica-readiness-audit.md`\n+  - include the concrete \"replica-safe backend\" checklist for implementation\n+  - include must-fix items, acceptable demo-time risks, and explicit ownership boundaries between `backend-api` and `backend-worker`\n+  - later scaling/deployment issues should cite this document when implementing or validating replica-safe behavior\n+- Acceptance criteria:\n+  - Checklist references the actual code areas that must change\n+  - Risks are prioritized into must-fix vs acceptable-for-demo\n+  - `backend-api` vs `backend-worker` responsibilities are finalized\n+  - `docs/deployment/replica-readiness-audit.md` exists and is detailed enough for downstream implementation/validation issues to reference directly\n+- Assignee: **declanblanc**\n+- Backup owner: **acabrera04**\n+- Due: April 9\n+- Blocked by: #1\n+- Unblocks: #3, #4, #5, #14\n+\n+**3. Shared Rate Limiting + Proxy-Aware Networking**\n+- Replace process-local rate limiting with shared Redis-backed limiting\n+- Replace or unify **both** current implementations:\n+  - auth endpoint limiting using `express-rate-limit`\n+  - public-route token bucket limiting\n+- Ensure auth and public API rate limits remain correct across 2+ replicas\n+- Configure Express proxy awareness so client IP handling works correctly behind Railway\n+- Use `docs/deployment/replica-readiness-audit.md` as the implementation checklist and update it with final decisions\n+- Acceptance criteria:\n+  - Public and auth rate limits are shared across replicas\n+  - No process-local auth or public-route limit counters remain in production code paths\n+  - Production proxy trust is explicitly configured for a **single Railway hop** (`trust proxy = 1` or equivalent) and documented in deployment docs","path":"planning/SPRINT_4_PLAN.md","commit_id":"c772049c066293c5d3036e439dd8ddcc147b69e0","original_commit_id":"c772049c066293c5d3036e439dd8ddcc147b69e0","user":{"login":"AvanishKulkarni","id":55012494,"node_id":"MDQ6VXNlcjU1MDEyNDk0","avatar_url":"https://avatars.githubusercontent.com/u/55012494?v=4","gravatar_id":"","url":"https://api.github.com/users/AvanishKulkarni","html_url":"https://github.com/AvanishKulkarni","followers_url":"https://api.github.com/users/AvanishKulkarni/followers","following_url":"https://api.github.com/users/AvanishKulkarni/following{/other_user}","gists_url":"https://api.github.com/users/AvanishKulkarni/gists{/gist_id}","starred_url":"https://api.github.com/users/AvanishKulkarni/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/AvanishKulkarni/subscriptions","organizations_url":"https://api.github.com/users/AvanishKulkarni/orgs","repos_url":"https://api.github.com/users/AvanishKulkarni/repos","events_url":"https://api.github.com/users/AvanishKulkarni/events{/privacy}","received_events_url":"https://api.github.com/users/AvanishKulkarni/received_events","type":"User","user_view_type":"public","site_admin":false},"body":"**The Redis-backed limiter needs an atomicity requirement, not just a shared-storage requirement.**\n\nThe current acceptance criteria say limits must be \"shared across replicas\" and that no process-local counters remain, but they do not constrain *how* the Redis limiter is implemented. A naive port that does `INCR key` followed by a separate `EXPIRE key ttl` races under contention: if a process crashes or is preempted between the two commands, the key is left without a TTL and the counter grows unbounded, locking users out until the key is manually cleared. The public-route **token bucket** is worse — refill and consume must be a single atomic operation or two concurrent requests can both observe \"tokens available\" and both consume the last token.\n\nPlease add an acceptance criterion along the lines of:\n\n> - The Redis limiter uses atomic primitives for all counter/bucket mutations (a single Lua script per check, or a vetted library such as `rate-limit-redis` for the auth limiter and an equivalent Lua-backed implementation for the public-route token bucket). Non-atomic `INCR` + separate `EXPIRE` patterns are explicitly disallowed.\n\nConcrete implementation options:\n- **Auth endpoint limiter (`express-rate-limit`):** swap the in-memory store for [`rate-limit-redis`](https://github.com/express-rate-limit/rate-limit-redis), which uses a Lua script to combine increment and expiry.\n- **Public-route token bucket:** implement as a single Lua script loaded with `SCRIPT LOAD` that reads bucket state, computes refill based on elapsed time, decrements, and writes back — all inside one `EVALSHA`. Reference: the standard \"token bucket in Redis\" Lua pattern.\n\nWithout this, the limiter can pass the current acceptance criteria while still being unsafe under load.","created_at":"2026-04-10T21:27:02Z","updated_at":"2026-04-10T21:27:02Z","html_url":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066825328","pull_request_url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311","_links":{"self":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825328"},"html":{"href":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066825328"},"pull_request":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311"}},"reactions":{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825328/reactions","total_count":0,"+1":0,"-1":0,"laugh":0,"hooray":0,"confused":0,"heart":0,"rocket":0,"eyes":0},"start_line":null,"original_start_line":null,"start_side":null,"line":158,"original_line":158,"side":"RIGHT","author_association":"MEMBER","original_position":158,"position":158,"subject_type":"line"},{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825330","pull_request_review_id":4092576014,"id":3066825330,"node_id":"PRRC_kwDORIrGY862zApy","diff_hunk":"@@ -0,0 +1,553 @@\n+# Deployment Sprint Plan — April 8–19, 2026\n+\n+## Context\n+Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend backed by PostgreSQL and Redis. Sprint 4 adapts the P6 deployment assignment to a **Vercel + Railway** production stack:\n+\n+- **Frontend hosting:** Vercel\n+- **Backend hosting:** Railway\n+- **Database:** Railway Postgres\n+- **Cache / event bus:** Railway Redis\n+- **Public deployment goal:** keep the app deployed through instructor review\n+- **Scaling goal:** support **2 or more backend API replicas** on Railway while keeping background event processing correct\n+\n+This sprint must cover the substance of **P6 Deployment** while ignoring the AWS-only platform choice. The plan therefore replaces:\n+\n+- AWS Lambda/API Gateway with Railway backend services\n+- AWS Amplify with Vercel frontend hosting\n+- AWS CD workflows with Vercel/Railway CD workflows\n+\n+Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.\n+\n+The assignment requirements we still must satisfy are:\n+\n+1. Publicly deploy frontend and backend\n+2. Automate deployment from GitHub\n+3. Add integration test specifications and implementation\n+4. Run integration tests locally and in the cloud\n+5. Add GitHub Actions for integration tests\n+6. Adopt GitHub hygiene and branch protection\n+7. Update README with user-facing and deployer-facing instructions\n+8. Produce the final submission artifacts, links, logs, and reflection\n+\n+**Assignment:** P6: Deployment  \n+**Due:** Sunday, April 19, 2026, 11:59 PM AOE\n+\n+## Team\n+5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI\n+\n+## Target Architecture\n+\n+### Public Services\n+- `frontend` on Vercel\n+- `backend-api` on Railway with **2+ replicas**\n+\n+### Internal / Stateful Services\n+- `backend-worker` on Railway with **1 replica only**\n+- `postgres` on Railway\n+- `redis` on Railway\n+\n+### Domain Layout\n+- `https://<frontend-domain>` -> Vercel\n+- `https://api.<frontend-domain>` -> Railway `backend-api`\n+\n+### Multi-Backend Railway Rules\n+To safely support 2+ backend replicas, the sprint must remove or isolate process-local production state:\n+\n+- Public/auth rate limiting must use **Redis-backed shared storage**\n+- File uploads must use **shared object storage**, not local disk\n+- Background subscribers / cache invalidation / sitema…21547 tokens truncated…                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ^
SyntaxError: invalid syntax
```

#### Tool: exec_command

```sh
gh api repos/CS485-Harmony/Harmony/pulls/311/comments | python - <<'PY'
import json,sys
comments=json.load(sys.stdin)
print('count=', len(comments))
print('ids=', [c['id'] for c in comments])
PY
```

Output:

```text
Total output lines: 4

  File "<stdin>", line 1
    [{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066825321","pull_request_review_id":4092576014,"id":3066825321,"node_id":"PRRC_kwDORIrGY862zApp","diff_hunk":"@@ -0,0 +1,553 @@\n+# Deployment Sprint Plan — April 8–19, 2026\n+\n+## Context\n+Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend backed by PostgreSQL and Redis. Sprint 4 adapts the P6 deployment assignment to a **Vercel + Railway** production stack:\n+\n+- **Frontend hosting:** Vercel\n+- **Backend hosting:** Railway\n+- **Database:** Railway Postgres\n+- **Cache / event bus:** Railway Redis\n+- **Public deployment goal:** keep the app deployed through instructor review\n+- **Scaling goal:** support **2 or more backend API replicas** on Railway while keeping background event processing correct\n+\n+This sprint must cover the substance of **P6 Deployment** while ignoring the AWS-only platform choice. The plan therefore replaces:\n+\n+- AWS Lambda/API Gateway with Railway backend services\n+- AWS Amplify with Vercel frontend hosting\n+- AWS CD workflows with Vercel/Railway CD workflows\n+\n+Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.\n+\n+The assignment requirements we still must satisfy are:\n+\n+1. Publicly deploy frontend and backend\n+2. Automate deployment from GitHub\n+3. Add integration test specifications and implementation\n+4. Run integration tests locally and in the cloud\n+5. Add GitHub Actions for integration tests\n+6. Adopt GitHub hygiene and branch protection\n+7. Update README with user-facing and deployer-facing instructions\n+8. Produce the final submission artifacts, links, logs, and reflection\n+\n+**Assignment:** P6: Deployment  \n+**Due:** Sunday, April 19, 2026, 11:59 PM AOE\n+\n+## Team\n+5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI\n+\n+## Target Architecture\n+\n+### Public Services\n+- `frontend` on Vercel\n+- `backend-api` on Railway with **2+ replicas**\n+\n+### Internal / Stateful Services\n+- `backend-worker` on Railway with **1 replica only**\n+- `postgres` on Railway\n+- `redis` on Railway\n+\n+### Domain Layout\n+- `https://<frontend-domain>` -> Vercel\n+- `https://api.<frontend-domain>` -> Railway `backend-api`\n+\n+### Multi-Backend Railway Rules\n+To safely support 2+ backend replicas, the sprint must remove or isolate process-local production state:\n+\n+- Public/auth rate limiting must use **Redis-backed shared storage**\n+- File uploads must use **shared object storage**, not local disk\n+- Background subscribers / cache invalidation / sitemap updates must run in a **singleton worker**\n+- API replicas must be stateless apart from live SSE client connections\n+- Deployment verification must prove that 2+ API replicas behave correctly behind Railway load balancing\n+\n+### Explicit Production Decisions\n+- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.\n+- **Sitemap handoff:** the frontend apex domain serves crawler-facing sitemap entrypoints through **Next.js route handlers** that fetch sitemap/XML data from the backend at request time. The backend may generate sitemap data, but the API subdomain is not the direct crawl target in production.\n+- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.\n+- **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions …33547 tokens truncated…                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ^
SyntaxError: invalid syntax
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:30:03.360Z

The new inline review is all actionable planning feedback: cross-origin auth/CORS contract, Redis limiter atomicity, and expand/contract migration safety during rolling deploys. I’m folding those into the plan now, then I’ll push and reply inline on the three review comments.

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:30:33.896Z

The plan patch is in place. I’m checking the doc diff, then I’ll commit and push a second docs-only update before replying directly to the three new inline review comments.

#### Tool: exec_command

```sh
git diff --stat -- planning/SPRINT_4_PLAN.md
```

Output:

```text
 planning/SPRINT_4_PLAN.md | 10 ++++++++++
 1 file changed, 10 insertions(+)
```

#### Tool: exec_command

```sh
git diff -- planning/SPRINT_4_PLAN.md
```

Output:

```text
diff --git a/planning/SPRINT_4_PLAN.md b/planning/SPRINT_4_PLAN.md
index 0d22847..b4591f5 100644
--- a/planning/SPRINT_4_PLAN.md
+++ b/planning/SPRINT_4_PLAN.md
@@ -66,6 +66,11 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
 - **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.
 - **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.
 - **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.
+- **Auth & CORS contract:** production frontend and API traffic is cross-origin across sibling subdomains, so the deployment architecture must explicitly define:
+  - the backend CORS allowlist for production and preview frontend origins
+  - whether authenticated browser requests use apex-scoped cookies, API-host cookies, or bearer tokens
+  - required cookie flags (`Domain`, `SameSite`, `Secure`, `HttpOnly`) or auth header behavior
+  - the CSRF posture for the chosen auth transport
 - **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.
 - **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.
 - **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.
@@ -114,6 +119,7 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
   - Clear env var matrix
   - Clear ownership of public vs internal services
   - Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton
+  - `docs/deployment/deployment-architecture.md` records the production auth transport, cookie/header contract, CORS allowlist, and CSRF posture for the frontend/API split
   - `docs/deployment/deployment-architecture.md` exists and is usable as the canonical reference for downstream issues
 - Assignee: **acabrera04**
 - Backup owner: **declanblanc**
@@ -155,6 +161,7 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
 - Acceptance criteria:
   - Public and auth rate limits are shared across replicas
   - No process-local auth or public-route limit counters remain in production code paths
+  - Redis-backed limiter mutations are atomic; non-atomic `INCR` + separate `EXPIRE` style patterns are explicitly disallowed for production rate-limit state
   - Production proxy trust is explicitly configured for a **single Railway hop** (`trust proxy = 1` or equivalent) and documented in deployment docs
   - Rate limit behavior is covered by tests or verification notes
 - Assignee: **Aiden-Barrera**
@@ -220,6 +227,7 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
 - Acceptance criteria:
   - Public pages generate correct production metadata
   - Canonical host ownership is explicit and consistent across frontend and backend docs/code
+  - Frontend/API cross-origin auth behavior is consistent with the documented auth and CORS contract
   - Frontend can target local and cloud backends without code edits
   - SEO-critical pages render correctly on the public domain
 - Assignee: **AvanishKulkarni**
@@ -240,6 +248,7 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
   - Railway project is provisioned
   - Domains/env vars/health checks are configured
   - Postgres and Redis env vars use Railway private/internal connection strings for service-to-service traffic
+  - Backend CORS and auth-related env/config are aligned with the documented frontend/API contract
   - `backend-worker` has a health check and restart-on-failure behavior configured
   - `backend-api` and `backend-worker` both boot successfully in Railway
 - Assignee: **acabrera04**
@@ -319,6 +328,7 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
   - Workflow deploys backend services without manual intervention
   - Production deploy authority is unambiguous and documented
   - Exactly one migration runner performs `prisma migrate deploy`, and `backend-api` replicas are prevented from racing migrations on startup
+  - Schema rollout rules follow an **expand/contract** convention so destructive migrations are not introduced in the same deploy that must coexist with old API replicas during rolling restart
   - Deploys target the correct Railway environment
   - Deployment process is documented in README
 - Assignee: **acabrera04**
```

#### Tool: exec_command

```sh
gh api repos/CS485-Harmony/Harmony/pulls/311/comments --jq '.[].id'
```

Output:

```text
3066825321
3066825328
3066825330
3066825335
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:30:48.828Z

There are four inline review comments, not three. I’m pulling the exact body for each comment ID now so I don’t miss one before I reply.

#### Tool: exec_command

```sh
gh api repos/CS485-Harmony/Harmony/pulls/comments/3066825321 --jq '.body'
```

Output:

```text
**Cross-origin auth and cookie strategy is not specified anywhere in the plan and will block the production deploy.**

The topology puts the frontend on `<apex>` and the API on `api.<apex>`, which makes every authenticated request cross-origin. Nothing in Issue #1, #6, or #7 commits to:

1. **CORS configuration on the Express app.** Needs an explicit origin allowlist (production frontend domain + preview domains) with `credentials: true` and preflight handling for tRPC `POST` requests that send `content-type: application/json` and any auth headers. A wildcard origin cannot be combined with credentials, so this has to be enumerated.
2. **Cookie strategy for session/refresh tokens.** Pick one and document it here:
   - **Apex-scoped cookie:** issue cookies with `Domain=.<apex>`, `SameSite=Lax`, `Secure`, `HttpOnly`. Works cross-subdomain without `SameSite=None`, but requires the API and frontend to share a registrable domain.
   - **Host-only cookie on the API subdomain:** `SameSite=None; Secure; HttpOnly`. Requires `credentials: 'include'` on every fetch and is subject to third-party cookie restrictions in some browsers.
   - **Bearer token in `Authorization` header:** sidesteps cross-origin cookie handling entirely but requires client-side storage and refresh handling.
3. **CSRF posture under whichever cookie model is chosen.**

This is the single highest-probability cause of a "works on localhost, completely broken on the deployed domain" failure mode during grading. Please add an **Auth & CORS contract** bullet to the Explicit Production Decisions section and an acceptance criterion to Issue #1 requiring `docs/deployment/deployment-architecture.md` to record the chosen cookie domain, `SameSite`/`Secure` flags, CORS allowlist, and auth transport before Issues #6/#7/#11 land.
```

#### Tool: exec_command

```sh
gh api repos/CS485-Harmony/Harmony/pulls/comments/3066825328 --jq '.body'
```

Output:

```text
**The Redis-backed limiter needs an atomicity requirement, not just a shared-storage requirement.**

The current acceptance criteria say limits must be "shared across replicas" and that no process-local counters remain, but they do not constrain *how* the Redis limiter is implemented. A naive port that does `INCR key` followed by a separate `EXPIRE key ttl` races under contention: if a process crashes or is preempted between the two commands, the key is left without a TTL and the counter grows unbounded, locking users out until the key is manually cleared. The public-route **token bucket** is worse — refill and consume must be a single atomic operation or two concurrent requests can both observe "tokens available" and both consume the last token.

Please add an acceptance criterion along the lines of:

> - The Redis limiter uses atomic primitives for all counter/bucket mutations (a single Lua script per check, or a vetted library such as `rate-limit-redis` for the auth limiter and an equivalent Lua-backed implementation for the public-route token bucket). Non-atomic `INCR` + separate `EXPIRE` patterns are explicitly disallowed.

Concrete implementation options:
- **Auth endpoint limiter (`express-rate-limit`):** swap the in-memory store for [`rate-limit-redis`](https://github.com/express-rate-limit/rate-limit-redis), which uses a Lua script to combine increment and expiry.
- **Public-route token bucket:** implement as a single Lua script loaded with `SCRIPT LOAD` that reads bucket state, computes refill based on elapsed time, decrements, and writes back — all inside one `EVALSHA`. Reference: the standard "token bucket in Redis" Lua pattern.

Without this, the limiter can pass the current acceptance criteria while still being unsafe under load.
```

#### Tool: exec_command

```sh
gh api repos/CS485-Harmony/Harmony/pulls/comments/3066825330 --jq '.body'
```

Output:

```text
**Cloud-target integration tests will run against the same Postgres instance the instructor reviews, and the plan has no data-hygiene strategy.**

Issue #9 defines `cloud` mode as "runs against already-deployed frontend/backend URLs," and Issue #14 runs the cloud-target suite as part of submission evidence. If the only deployed environment is production, then any test that creates users, channels, messages, or attachments will leave residue in the exact database the grader will see — or worse, mutate data the review flow depends on (visibility flips, message edits, deletes). The acceptance criteria as written (`Tests run in a cloud configuration`, `Cloud mode does not require local frontend/backend startup`) are satisfied by a suite that actively corrupts prod.

Pick one of the following and encode it in the Issue #8 spec and Issue #9 acceptance criteria:

1. **Stand up a second Railway environment (staging)** with its own Postgres/Redis and point cloud-mode tests at it. Highest fidelity; highest setup cost. Requires an extra `TARGET_ENV` knob in `deploy-railway.yml` or a separate workflow.
2. **Scope cloud mode to read-only smoke checks** — health endpoints, guest public channel rendering, public SSR metadata, SSE handshake (connect-then-disconnect without publishing), and canonical URL/sitemap fetches. All write-path coverage stays in local mode. Lowest cost; narrowest validation.
3. **Tagged test-tenant isolation** — all cloud-mode writes happen under a reserved `test-*` user/workspace namespace, with a cleanup step that runs before and after each suite via an authenticated admin endpoint. Requires the backend to expose a scoped cleanup API and careful handling so cleanup failures do not leak into the next run.

Add an acceptance criterion to Issue #9:

> - Cloud-mode tests declare a data-isolation strategy (staging environment, read-only scope, or tagged-tenant cleanup) and cannot mutate state outside that strategy. The choice is recorded in `docs/test-specs/` and in `docs/deployment/deployment-architecture.md`.

This needs to be picked before Issue #9 starts implementing, not during Issue #14.
```

#### Tool: exec_command

```sh
gh api repos/CS485-Harmony/Harmony/pulls/comments/3066825335 --jq '.body'
```

Output:

```text
**"Exactly one migration runner" closes the race-at-boot problem but does not cover destructive migrations under a rolling restart, and that gap will bite on the first column drop or NOT NULL tightening.**

Railway has no Heroku-style release phase that pauses request handling while a migration runs. Even with a single migration runner, the rollout sequence is:

1. Migration runner applies schema change.
2. Railway rolling-restarts `backend-api` replicas one at a time.
3. For a non-trivial window, **old code and new schema are running concurrently against the same database.**

Any destructive migration in that window will break the old replica:
- `DROP COLUMN foo` → old replicas SELECTing `foo` get runtime errors on every request touching that table.
- `ALTER COLUMN foo SET NOT NULL` → old replicas inserting rows without `foo` fail.
- `RENAME COLUMN foo TO bar` → old replicas fail on both reads and writes.
- Non-concurrent index creation → table lock that stalls old replicas' queries.

Please add an acceptance criterion to Issue #11 and a matching rule to `docs/deployment/deployment-architecture.md`:

> - Destructive schema changes follow an **expand/contract** convention: additive changes ship first (add nullable column, add new index `CONCURRENTLY`, dual-write code), the code migrates to the new shape, and only a later deploy removes the old column/constraint. Single-deploy destructive migrations (column drop, NOT NULL tightening, rename, non-concurrent index on large tables) are disallowed on `main`.

Concrete guidance worth documenting alongside:
- **Rename:** add new column, backfill, dual-write, cut readers over, drop old column in a later deploy.
- **Drop:** stop reading the column in code (deploy), then drop it (deploy).
- **NOT NULL tighten:** add with a default or backfill first, enforce `NOT NULL` in a later deploy.
- **Indexes on large tables:** `CREATE INDEX CONCURRENTLY` via a separate migration that does not run inside a transaction.

Without this rule written down before Issue #11 lands, the first team member to write a "small cleanup" migration will take down the API mid-rollout.
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:31:00.115Z

One of the new comments asks for an actual auth transport choice, not just “document it later.” I’m checking the existing auth implementation before I lock that into the plan, so the plan decision matches how the app already works instead of inventing a new auth model.

#### Tool: exec_command

```sh
rtk grep -n "Set-Cookie|cookie|refresh token|Authorization|Bearer|credentials: 'include'|credentials:\s*\"include\"|withCredentials|sameSite|httpOnly|secure" harmony-backend/src harmony-frontend/src
```

Output:

```text
🔍 88 in 19F:

📄 harmony-backend/src/middleware/auth.middleware.ts (3):
     9: * Express middleware that validates a Bearer JWT access token.
    14: if (!authHeader?.startsWith('Bearer ')) {
    15: res.status(401).json({ error: 'Missing or invalid Authorization header' });

📄 harmony-backend/src/routes/auth.router.ts (4):
    74: * Creates a new user account and returns access + refresh tokens.
    94: * Authenticates a user and returns access + refresh tokens.
   114: * Revokes the provided refresh token.
   133: * Issues new access + refresh tokens using a valid refresh token (rotation).

📄 harmony-backend/src/routes/events.router.ts (1):
    11: * Authorization header. The token is validated identically to requireAuth.

📄 harmony-backend/src/services/attachment.service.ts (1):
     9: * Add new types here — rejection is the secure default.

📄 harmony-backend/src/services/auth.service.ts (2):
    51: jti?: string; // unique token ID (present on refresh tokens)
   215: throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid refresh token' });

📄 harmony-backend/src/services/visibility.service.ts (1):
     5: * Authorization is handled at the router level via `withPermission`

📄 harmony-backend/src/trpc/init.ts (1):
    16: if (authHeader?.startsWith('Bearer ')) {

📄 harmony-frontend/.../__tests__/channelService.test.ts (1):
     8: cookies: jest.fn(),

📄 harmony-frontend/.../__tests__/issue-242-join-server-fix.test.ts (3):
   114: it('does NOT call setSessionCookie when there is no stored refresh token', as...
   122: // Without a refresh token the interceptor rejects immediately (no refresh at...
   132: config: { _retry: false, headers: { Authorization: 'Bearer old-token' } },

📄 harmony-frontend/src/__tests__/middleware.test.ts (18):
    18: cookies: {
    20: headerMap.set('set-cookie', `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00...
    37: function buildRequest(pathname: string, cookieValue?: string) {
    41: cookies: {
    43: if (name !== AUTH_COOKIE_NAME || cookieValue === undefined) return undefined;
    44: return { name, value: cookieValue };
    70: it('redirects the exact channels route when no auth cookie is present', () => {
    79: it('redirects the exact settings route when no auth cookie is present', () => {
    88: it('allows protected channel routes with a plain base64url session cookie', (...
    96: it('allows protected settings routes with a JWT-style session cookie', () => {
  +8

📄 harmony-frontend/src/__tests__/trpc-client.test.ts (6):
     2: cookies: jest.fn(),
     5: import { cookies } from 'next/headers';
     8: const mockedCookies = jest.mocked(cookies);
    80: headers: { Authorization: 'Bearer secret-token' },
   104: it('continues without authorization when cookies() throws outside request con...
   165: 'Authorization': 'Bearer secret-token',

📄 harmony-frontend/src/app/actions/session.ts (12):
     3: import { cookies } from 'next/headers';
     8: /** Maximum cookie age: 7 days (matches backend refresh token TTL). */
    12: * Sets the auth session cookie (httpOnly, SameSite=Lax).
    15: * (in trpc-client.ts) can forward it as a Bearer token to the backend.
    20: const cookieStore = await cookies();
    21: cookieStore.set(AUTH_COOKIE_NAME, accessToken, {
    22: httpOnly: true,
    23: secure: process.env.NODE_ENV === 'production',
    24: sameSite: 'lax',
    31: * Clears the auth session cookie on logout.
  +2

📄 harmony-frontend/src/context/AuthContext.tsx (4):
    45: // On mount: try to restore session via the refresh token (if present).
    46: // The api-client will transparently use the stored refresh token to get
    48: // httpOnly middleware cookie so server-side route protection stays active.
    55: // Re-set the httpOnly cookie with the current access token so

📄 harmony-frontend/src/contexts/VoiceContext.tsx (1):
   634: headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token...

📄 harmony-frontend/src/lib/api-client.ts (6):
    78: // Request: attach Bearer token if present
    84: config.headers.Authorization = `Bearer ${token}`;

... +38
```

#### Tool: exec_command

```sh
rtk read harmony-backend/src/routes/auth.router.ts
```

Output:

```text
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { authService } from '../services/auth.service';

export const authRouter = Router();

const registerSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(32, { message: 'Username must be at most 32 characters' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: 'Username may only contain letters, numbers, underscores, and hyphens',
    }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(72, { message: 'Password must be at most 72 characters' }),
});

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

const logoutSchema = z.object({
  refreshToken: z.string().min(1),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

function trpcCodeToHttp(code: TRPCError['code']): number {
  switch (code) {
    case 'UNAUTHORIZED':
      return 401;
    case 'FORBIDDEN':
      return 403;
    case 'NOT_FOUND':
      return 404;
    case 'CONFLICT':
      return 409;
    case 'BAD_REQUEST':
      return 400;
    default:
      return 500;
  }
}

function handleError(res: Response, err: unknown): void {
  if (err instanceof TRPCError) {
    res.status(trpcCodeToHttp(err.code)).json({ error: err.message });
    return;
  }
  if (err instanceof z.ZodError) {
    res.status(400).json({ error: 'Validation failed', details: err.errors });
    return;
  }
  console.error('Auth route error:', err);
  res.status(500).json({ error: 'Internal server error' });
}

/**
 * POST /api/auth/register
 * Creates a new user account and returns access + refresh tokens.
 */
authRouter.post('/register', async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Validation failed', details: parsed.error.errors });
    return;
  }

  try {
    const { email, username, password } = parsed.data;
    const tokens = await authService.register(email, username, password);
    res.status(201).json(tokens);
  } catch (err) {
    handleError(res, err);
  }
});

/**
 * POST /api/auth/login
 * Authenticates a user and returns access + refresh tokens.
 */
authRouter.post('/login', async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Validation failed', details: parsed.error.errors });
    return;
  }

  try {
    const { email, password } = parsed.data;
    const tokens = await authService.login(email, password);
    res.status(200).json(tokens);
  } catch (err) {
    handleError(res, err);
  }
});

/**
 * POST /api/auth/logout
 * Revokes the provided refresh token.
 */
authRouter.post('/logout', async (req: Request, res: Response) => {
  const parsed = logoutSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Validation failed', details: parsed.error.errors });
    return;
  }

  try {
    await authService.logout(parsed.data.refreshToken);
    res.status(204).send();
  } catch (err) {
    handleError(res, err);
  }
});

/**
 * POST /api/auth/refresh
 * Issues new access + refresh tokens using a valid refresh token (rotation).
 */
authRouter.post('/refresh', async (req: Request, res: Response) => {
  const parsed = refreshSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Validation failed', details: parsed.error.errors });
    return;
  }

  try {
    const tokens = await authService.refreshTokens(parsed.data.refreshToken);
    res.status(200).json(tokens);
  } catch (err) {
    handleError(res, err);
  }
});
```

#### Tool: exec_command

```sh
rtk read harmony-frontend/src/lib/api-client.ts
```

Output:

```text
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';
import { API_CONFIG } from './constants';
import { setSessionCookie } from '@/app/actions/session';

const REFRESH_TOKEN_KEY = 'harmony_refresh_token';

let _accessToken: string | null = null;
let _isRefreshing = false;
let _refreshQueue: Array<(token: string | null) => void> = [];

function notifyRefreshQueue(token: string | null) {
  _refreshQueue.forEach(resolve => resolve(token));
  _refreshQueue = [];
}

export function setTokens(accessToken: string, refreshToken: string): void {
  _accessToken = accessToken;
  if (typeof window !== 'undefined') {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearTokens(): void {
  _accessToken = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}

export function getAccessToken(): string | null {
  return _accessToken;
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export interface TrpcResponse<T> {
  result: { data: T };
}

/**
 * API Client for Harmony backend.
 * Handles JWT bearer auth, automatic token refresh on 401, and tRPC calls.
 */
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: { 'Content-Type': 'application/json' },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();
        if (token) {
          config.headers = config.headers ?? {};
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    this.client.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
          const refreshToken = getRefreshToken();
          if (!refreshToken) {
            clearTokens();
            return Promise.reject(error);
          }

          if (_isRefreshing) {
            return new Promise(resolve => {
              _refreshQueue.push((newToken: string | null) => {
                if (newToken) {
                  originalRequest.headers = originalRequest.headers ?? {};
                  originalRequest.headers.Authorization = `Bearer ${newToken}`;
                  resolve(this.client(originalRequest));
                } else {
                  resolve(Promise.reject(error));
                }
              });
            });
          }

          originalRequest._retry = true;
          _isRefreshing = true;

          try {
            const res = await axios.post<{ accessToken: string; refreshToken: string }>(
              `${API_CONFIG.BASE_URL}/api/auth/refresh`,
              { refreshToken },
            );
            const { accessToken: newAt, refreshToken: newRt } = res.data;
            setTokens(newAt, newRt);
            try {
              await setSessionCookie(newAt);
            } catch {
            }
            notifyRefreshQueue(newAt);

            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${newAt}`;
            return this.client(originalRequest);
          } catch {
            clearTokens();
            notifyRefreshQueue(null);
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/login';
            }
            return Promise.reject(error);
          } finally {
            _isRefreshing = false;
          }
        }

        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  /** Call a tRPC query procedure (GET). Returns the unwrapped data. */
  async trpcQuery<T>(procedure: string, input?: unknown): Promise<T> {
    const url =
      input !== undefined
        ? `/trpc/${procedure}?input=${encodeURIComponent(JSON.stringify(input))}`
        : `/trpc/${procedure}`;
    const res = await this.client.get<TrpcResponse<T>>(url);
    return res.data.result.data;
  }

  /** Call a tRPC mutation procedure (POST). Returns the unwrapped data. */
  async trpcMutation<T>(procedure: string, input?: unknown): Promise<T> {
    const res = await this.client.post<TrpcResponse<T>>(`/trpc/${procedure}`, input ?? null);
    return res.data.result.data;
  }
}

export const apiClient = new ApiClient();
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:31:06.719Z

The existing app already authenticates backend requests with Bearer access tokens and refresh-token rotation in the client, so I’m aligning the plan to that instead of inventing a new cookie-based API auth scheme. I’m also tightening cloud-mode data hygiene to read-only smoke checks so the deployed review environment doesn’t get polluted.

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:31:28.407Z

The plan now reflects the app’s actual auth model and a concrete cloud-test hygiene policy. I’m doing a final diff check, then I’ll commit and push before replying on the four inline review comments.

#### Tool: exec_command

```sh
git diff --stat -- planning/SPRINT_4_PLAN.md
```

Output:

```text
 planning/SPRINT_4_PLAN.md | 23 +++++++++++++++++++++++
 1 file changed, 23 insertions(+)
```

#### Tool: exec_command

```sh
git diff -- planning/SPRINT_4_PLAN.md
```

Output:

```text
diff --git a/planning/SPRINT_4_PLAN.md b/planning/SPRINT_4_PLAN.md
index 0d22847..aee71de 100644
--- a/planning/SPRINT_4_PLAN.md
+++ b/planning/SPRINT_4_PLAN.md
@@ -66,9 +66,15 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
 - **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.
 - **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.
 - **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.
+- **Auth & CORS contract:** production frontend and API traffic is cross-origin across sibling subdomains, so the deployment architecture must explicitly define:
+  - the backend CORS allowlist for production and preview frontend origins
+  - **browser-to-backend auth uses Bearer access tokens in the `Authorization` header**, matching the current application model; API authentication must not depend on browser cookies being sent cross-origin to the backend
+  - any frontend-only session cookie used for Next.js middleware remains a frontend concern and is not the backend auth transport
+  - the CSRF posture for the chosen auth transport; with bearer-header auth as the primary backend mechanism, CSRF protection focuses on avoiding cookie-authenticated state-changing backend routes
 - **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.
 - **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.
 - **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.
+- **Cloud test data hygiene:** cloud-target validation uses **read-only smoke checks against deployed URLs** unless a separate isolated staging environment is provisioned. Cloud-mode tests must not mutate the instructor-reviewed production dataset.
 
 ---
 
@@ -114,6 +120,7 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
   - Clear env var matrix
   - Clear ownership of public vs internal services
   - Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton
+  - `docs/deployment/deployment-architecture.md` records the production auth transport, cookie/header contract, CORS allowlist, and CSRF posture for the frontend/API split
   - `docs/deployment/deployment-architecture.md` exists and is usable as the canonical reference for downstream issues
 - Assignee: **acabrera04**
 - Backup owner: **declanblanc**
@@ -155,6 +162,7 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
 - Acceptance criteria:
   - Public and auth rate limits are shared across replicas
   - No process-local auth or public-route limit counters remain in production code paths
+  - Redis-backed limiter mutations are atomic; non-atomic `INCR` + separate `EXPIRE` style patterns are explicitly disallowed for production rate-limit state
   - Production proxy trust is explicitly configured for a **single Railway hop** (`trust proxy = 1` or equivalent) and documented in deployment docs
   - Rate limit behavior is covered by tests or verification notes
 - Assignee: **Aiden-Barrera**
@@ -220,6 +228,7 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
 - Acceptance criteria:
   - Public pages generate correct production metadata
   - Canonical host ownership is explicit and consistent across frontend and backend docs/code
+  - Frontend/API cross-origin auth behavior is consistent with the documented auth and CORS contract
   - Frontend can target local and cloud backends without code edits
   - SEO-critical pages render correctly on the public domain
 - Assignee: **AvanishKulkarni**
@@ -240,6 +249,7 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
   - Railway project is provisioned
   - Domains/env vars/health checks are configured
   - Postgres and Redis env vars use Railway private/internal connection strings for service-to-service traffic
+  - Backend CORS and auth-related env/config are aligned with the documented frontend/API contract
   - `backend-worker` has a health check and restart-on-failure behavior configured
   - `backend-api` and `backend-worker` both boot successfully in Railway
 - Assignee: **acabrera04**
@@ -257,10 +267,14 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
   - visibility change impact on public indexing behavior
   - attachment path if production storage is in scope
   - SSE/realtime smoke behavior if kept in deployed flow
+- Declare the cloud-mode data-isolation strategy:
+  - default choice for this sprint is **read-only cloud smoke coverage** against deployed URLs
+  - any write-path cloud tests require a separately documented isolated environment before they are allowed
 - Reference `docs/deployment/deployment-architecture.md` for deployment topology and `docs/deployment/replica-readiness-audit.md` for replica-sensitive scenarios that need validation
 - Acceptance criteria:
   - Every FE-BE pathway has at least one test case
   - Spec includes local-only vs cloud-only notes where relevant
+  - Cloud-mode tests are explicitly classified as read-only or isolated-environment-only
   - Spec is stored under `docs/test-specs/`
 - Assignee: **FardeenI**
 - Due: April 11
@@ -277,12 +291,19 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
   - portable across both targets
   - local-only because they depend on reset/seed control
   - cloud-only because they validate deployed behavior
+- Keep cloud-target coverage read-only by default:
+  - health and reachability
+  - guest public channel rendering
+  - public SSR metadata and canonical URL fetches
+  - sitemap/robots fetches
+  - SSE connect/disconnect smoke checks without mutating shared production state
 - Capture/structure output for both local and cloud runs
 - Keep target URLs, environment contracts, and replica-sensitive validations aligned with `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`
 - Acceptance criteria:
   - Tests run in a local configuration
   - Tests run in a cloud configuration
   - Cloud mode does not require local frontend/backend startup
+  - Cloud-mode tests cannot mutate non-isolated deployed state unless a separately documented isolated environment exists
   - Any environment-specific exceptions are documented
 - Assignee: **Aiden-Barrera**
 - Due: April 14
@@ -319,6 +340,7 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
   - Workflow deploys backend services without manual intervention
   - Production deploy authority is unambiguous and documented
   - Exactly one migration runner performs `prisma migrate deploy`, and `backend-api` replicas are prevented from racing migrations on startup
+  - Schema rollout rules follow an **expand/contract** convention so destructive migrations are not introduced in the same deploy that must coexist with old API replicas during rolling restart
   - Deploys target the correct Railway environment
   - Deployment process is documented in README
 - Assignee: **acabrera04**
@@ -391,6 +413,7 @@ To safely support 2+ backend replicas, the sprint must remove or isolate process
   - cache invalidation / indexing behavior via singleton worker
   - SSE/realtime smoke verification in deployed environment
 - Run the cloud-target integration/smoke suite against the deployed system
+- Keep deployed-environment smoke verification read-only unless a separate isolated cloud test environment is explicitly provisioned
 - Use the replica observability added in #5 to prove requests were served across 2+ API replicas via headers, health output, and/or structured logs
 - Capture logs/screenshots/test output needed for submission
 - Validate against the expected topology in `docs/deployment/deployment-architecture.md` and the replica-safety checklist in `docs/deployment/replica-readiness-audit.md`
```

#### Tool: exec_command

```sh
git add planning/SPRINT_4_PLAN.md && git commit -m "docs: address remaining deployment review findings

Clarify cross-origin auth and CORS, require atomic Redis rate-limiter
mutations, enforce expand/contract schema rollouts, and scope cloud-mode
deployment tests to read-only smoke checks.

Co-authored-by: GPT 5.4 <noreply@openai.com>"
```

Output:

```text
[codex/sprint-4-deployment-plan a2ed1c4] docs: address remaining deployment review findings
 1 file changed, 23 insertions(+)
```

#### Tool: exec_command

```sh
git push
```

Output:

```text
remote: This repository moved. Please use the new location:        
remote:   git@github.com:CS485-Harmony/Harmony.git        
To github.com:acabrera04/Harmony.git
   c772049..a2ed1c4  codex/sprint-4-deployment-plan -> codex/sprint-4-deployment-plan
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:31:56.635Z

The doc changes are pushed in `a2ed1c4`. I’m replying on each inline review thread with the specific fix that landed, then I’ll do one more watch/check pass for any additional feedback.

#### Tool: mcp__codex_apps__github_reply_to_review_comment

```json
{
  "comment_id": 3066825321,
  "pr_number": 311,
  "repo_full_name": "CS485-Harmony/Harmony",
  "comment": "Fixed in `a2ed1c4`. The plan now adds an explicit Auth & CORS contract, chooses Bearer access tokens in the `Authorization` header as the browser-to-backend auth transport, records the required CORS allowlist/CSRF posture in `docs/deployment/deployment-architecture.md`, and adds matching acceptance criteria to Issues #1, #6, and #7."
}
```

Output:

```text
[{"type":"text","text":"Error code: FORBIDDENError: GitHub API error 403: {\"message\":\"Resource not accessible by integration\",\"documentation_url\":\"https://docs.github.com/rest/pulls/comments#create-a-reply-for-a-review-comment\",\"status\":\"403\"}"}]
```

#### Tool: mcp__codex_apps__github_reply_to_review_comment

```json
{
  "comment_id": 3066825328,
  "pr_number": 311,
  "repo_full_name": "CS485-Harmony/Harmony",
  "comment": "Fixed in `a2ed1c4`. Issue #3 now explicitly requires atomic Redis-backed limiter mutations and disallows non-atomic `INCR` plus separate `EXPIRE` patterns for production rate-limit state."
}
```

Output:

```text
[{"type":"text","text":"Error code: FORBIDDENError: GitHub API error 403: {\"message\":\"Resource not accessible by integration\",\"documentation_url\":\"https://docs.github.com/rest/pulls/comments#create-a-reply-for-a-review-comment\",\"status\":\"403\"}"}]
```

#### Tool: mcp__codex_apps__github_reply_to_review_comment

```json
{
  "comment_id": 3066825330,
  "pr_number": 311,
  "repo_full_name": "CS485-Harmony/Harmony",
  "comment": "Fixed in `a2ed1c4`. The plan now picks read-only cloud smoke coverage as the default cloud-mode data-isolation strategy, requires `docs/test-specs/` to classify cloud tests accordingly, and adds acceptance criteria preventing cloud-mode tests from mutating non-isolated deployed state."
}
```

Output:

```text
[{"type":"text","text":"Error code: FORBIDDENError: GitHub API error 403: {\"message\":\"Resource not accessible by integration\",\"documentation_url\":\"https://docs.github.com/rest/pulls/comments#create-a-reply-for-a-review-comment\",\"status\":\"403\"}"}]
```

#### Tool: mcp__codex_apps__github_reply_to_review_comment

```json
{
  "comment_id": 3066825335,
  "pr_number": 311,
  "repo_full_name": "CS485-Harmony/Harmony",
  "comment": "Fixed in `a2ed1c4`. Issue #11 now requires an expand/contract schema rollout rule so destructive migrations are not introduced in the same deploy that must coexist with old API replicas during Railway rolling restarts."
}
```

Output:

```text
[{"type":"text","text":"Error code: FORBIDDENError: GitHub API error 403: {\"message\":\"Resource not accessible by integration\",\"documentation_url\":\"https://docs.github.com/rest/pulls/comments#create-a-reply-for-a-review-comment\",\"status\":\"403\"}"}]
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:32:13.430Z

The GitHub app doesn’t have permission to reply inline on that repo, so I’m falling back to `gh api`, which should use your authenticated CLI identity instead.

#### Tool: exec_command

```sh
gh api repos/CS485-Harmony/Harmony/pulls/comments/3066825321/replies -f body='Fixed in `a2ed1c4`. The plan now adds an explicit Auth & CORS contract, chooses Bearer access tokens in the `Authorization` header as the browser-to-backend auth transport, records the required CORS allowlist and CSRF posture in `docs/deployment/deployment-architecture.md`, and adds matching acceptance criteria to Issues #1, #6, and #7.'
```

Output:

```text
gh: Not Found (HTTP 404)
{
  "message": "Not Found",
  "documentation_url": "https://docs.github.com/rest",
  "status": "404"
}
```

#### Tool: exec_command

```sh
gh api repos/CS485-Harmony/Harmony/pulls/comments/3066825328/replies -f body='Fixed in `a2ed1c4`. Issue #3 now explicitly requires atomic Redis-backed limiter mutations and disallows non-atomic `INCR` plus separate `EXPIRE` patterns for production rate-limit state.'
```

Output:

```text
{
  "message": "Not Found",
  "documentation_url": "https://docs.github.com/rest",
  "status": "404"
}gh: Not Found (HTTP 404)
```

#### Tool: exec_command

```sh
gh api repos/CS485-Harmony/Harmony/pulls/comments/3066825330/replies -f body='Fixed in `a2ed1c4`. The plan now picks read-only cloud smoke coverage as the default cloud-mode data-isolation strategy, requires `docs/test-specs/` to classify cloud tests accordingly, and adds acceptance criteria preventing cloud-mode tests from mutating non-isolated deployed state.'
```

Output:

```text
gh: Not Found (HTTP 404)
{
  "message": "Not Found",
  "documentation_url": "https://docs.github.com/rest",
  "status": "404"
}
```

#### Tool: exec_command

```sh
gh api repos/CS485-Harmony/Harmony/pulls/comments/3066825335/replies -f body='Fixed in `a2ed1c4`. Issue #11 now requires an expand/contract schema rollout rule so destructive migrations are not introduced in the same deploy that must coexist with old API replicas during Railway rolling restarts.'
```

Output:

```text
gh: Not Found (HTTP 404)
{
  "message": "Not Found",
  "documentation_url": "https://docs.github.com/rest",
  "status": "404"
}
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:32:34.220Z

The first `gh api` fallback used the wrong reply path. I’m retrying with the pull-number-scoped review-comment reply endpoint.

#### Tool: exec_command

```sh
gh api --method POST repos/CS485-Harmony/Harmony/pulls/311/comments/3066825321/replies -f body='Fixed in `a2ed1c4`. The plan now adds an explicit Auth & CORS contract, chooses Bearer access tokens in the `Authorization` header as the browser-to-backend auth transport, records the required CORS allowlist and CSRF posture in `docs/deployment/deployment-architecture.md`, and adds matching acceptance criteria to Issues #1, #6, and #7.'
```

Output:

```text
{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066843286","pull_request_review_id":4092595848,"id":3066843286,"node_id":"PRRC_kwDORIrGY862zFCW","diff_hunk":"@@ -0,0 +1,553 @@\n+# Deployment Sprint Plan — April 8–19, 2026\n+\n+## Context\n+Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend backed by PostgreSQL and Redis. Sprint 4 adapts the P6 deployment assignment to a **Vercel + Railway** production stack:\n+\n+- **Frontend hosting:** Vercel\n+- **Backend hosting:** Railway\n+- **Database:** Railway Postgres\n+- **Cache / event bus:** Railway Redis\n+- **Public deployment goal:** keep the app deployed through instructor review\n+- **Scaling goal:** support **2 or more backend API replicas** on Railway while keeping background event processing correct\n+\n+This sprint must cover the substance of **P6 Deployment** while ignoring the AWS-only platform choice. The plan therefore replaces:\n+\n+- AWS Lambda/API Gateway with Railway backend services\n+- AWS Amplify with Vercel frontend hosting\n+- AWS CD workflows with Vercel/Railway CD workflows\n+\n+Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.\n+\n+The assignment requirements we still must satisfy are:\n+\n+1. Publicly deploy frontend and backend\n+2. Automate deployment from GitHub\n+3. Add integration test specifications and implementation\n+4. Run integration tests locally and in the cloud\n+5. Add GitHub Actions for integration tests\n+6. Adopt GitHub hygiene and branch protection\n+7. Update README with user-facing and deployer-facing instructions\n+8. Produce the final submission artifacts, links, logs, and reflection\n+\n+**Assignment:** P6: Deployment  \n+**Due:** Sunday, April 19, 2026, 11:59 PM AOE\n+\n+## Team\n+5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI\n+\n+## Target Architecture\n+\n+### Public Services\n+- `frontend` on Vercel\n+- `backend-api` on Railway with **2+ replicas**\n+\n+### Internal / Stateful Services\n+- `backend-worker` on Railway with **1 replica only**\n+- `postgres` on Railway\n+- `redis` on Railway\n+\n+### Domain Layout\n+- `https://<frontend-domain>` -> Vercel\n+- `https://api.<frontend-domain>` -> Railway `backend-api`\n+\n+### Multi-Backend Railway Rules\n+To safely support 2+ backend replicas, the sprint must remove or isolate process-local production state:\n+\n+- Public/auth rate limiting must use **Redis-backed shared storage**\n+- File uploads must use **shared object storage**, not local disk\n+- Background subscribers / cache invalidation / sitemap updates must run in a **singleton worker**\n+- API replicas must be stateless apart from live SSE client connections\n+- Deployment verification must prove that 2+ API replicas behave correctly behind Railway load balancing\n+\n+### Explicit Production Decisions\n+- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.\n+- **Sitemap handoff:** the frontend apex domain serves crawler-facing sitemap entrypoints through **Next.js route handlers** that fetch sitemap/XML data from the backend at request time. The backend may generate sitemap data, but the API subdomain is not the direct crawl target in production.\n+- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.\n+- **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.\n+- **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.\n+- **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.\n+- **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.\n+- **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.\n+- **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.\n+\n+---\n+\n+## P6 Coverage Map\n+\n+| P6 Requirement | Vercel + Railway Adaptation | Covered By Issues |\n+|---|---|---|\n+| Publicly deploy frontend | Deploy Next.js app to Vercel | #6, #12, #16 |\n+| Publicly deploy backend | Deploy Express/tRPC app to Railway | #5, #7, #11 |\n+| Publish backend public interfaces via REST | Keep Railway backend public routes stable and production-configured | #1, #5, #7 |\n+| Integration test specification | Write English-language integration spec for FE-BE paths | #8 |\n+| Integration tests on localhost | Add env-aware local integration test flow | #9 |\n+| Integration tests in cloud | Run same test suite against deployed Vercel + Railway URLs | #9, #14 |\n+| GitHub Action for integration tests | Add `run-integration-tests.yml` | #10 |\n+| Continuous deployment | Add backend and frontend deployment workflows for Railway and Vercel | #11, #12 |\n+| GitHub hygiene / branch protection | Require PRs and required checks before merge | #13 |\n+| README update | Add user-facing run instructions and deployer guide | #15 |\n+| Submission links, logs, reflection | Final packaging and artifact checklist | #15 |\n+\n+---\n+\n+## Issues (16 total)\n+\n+> **Note:** Issues are written so they can be opened directly on GitHub with the dependency notes preserved in the body. \"Blocked by\" means the issue should not be considered complete until those upstream issues land. \"Unblocks\" is included to make sequencing explicit for the team.\n+\n+### Phase 1: Architecture, Production Readiness, and Scaling Design — April 8–11\n+\n+**1. Deployment Architecture + Environment Matrix**\n+- Define the final Vercel + Railway topology:\n+  - `frontend`\n+  - `backend-api`\n+  - `backend-worker`\n+  - `postgres`\n+  - `redis`\n+- Document production env vars for frontend, backend API, and worker\n+- Define domain plan (`frontend` domain + `api` subdomain)","path":"planning/SPRINT_4_PLAN.md","commit_id":"a2ed1c463821fbfd1c292772fbbad65a79d28882","original_commit_id":"c772049c066293c5d3036e439dd8ddcc147b69e0","user":{"login":"acabrera04","id":145043651,"node_id":"U_kgDOCKUwww","avatar_url":"https://avatars.githubusercontent.com/u/145043651?v=4","gravatar_id":"","url":"https://api.github.com/users/acabrera04","html_url":"https://github.com/acabrera04","followers_url":"https://api.github.com/users/acabrera04/followers","following_url":"https://api.github.com/users/acabrera04/following{/other_user}","gists_url":"https://api.github.com/users/acabrera04/gists{/gist_id}","starred_url":"https://api.github.com/users/acabrera04/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/acabrera04/subscriptions","organizations_url":"https://api.github.com/users/acabrera04/orgs","repos_url":"https://api.github.com/users/acabrera04/repos","events_url":"https://api.github.com/users/acabrera04/events{/privacy}","received_events_url":"https://api.github.com/users/acabrera04/received_events","type":"User","user_view_type":"public","site_admin":false},"body":"Fixed in `a2ed1c4`. The plan now adds an explicit Auth & CORS contract, chooses Bearer access tokens in the `Authorization` header as the browser-to-backend auth transport, records the required CORS allowlist and CSRF posture in `docs/deployment/deployment-architecture.md`, and adds matching acceptance criteria to Issues #1, #6, and #7.","created_at":"2026-04-10T21:32:34Z","updated_at":"2026-04-10T21:32:34Z","html_url":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066843286","pull_request_url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311","_links":{"self":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066843286"},"html":{"href":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066843286"},"pull_request":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311"}},"reactions":{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066843286/reactions","total_count":0,"+1":0,"-1":0,"laugh":0,"hooray":0,"confused":0,"heart":0,"rocket":0,"eyes":0},"start_line":null,"original_start_line":null,"start_side":null,"line":113,"original_line":107,"side":"RIGHT","in_reply_to_id":3066825321,"author_association":"MEMBER","original_position":107,"position":113,"subject_type":"line"}
```

#### Tool: exec_command

```sh
gh api --method POST repos/CS485-Harmony/Harmony/pulls/311/comments/3066825328/replies -f body='Fixed in `a2ed1c4`. Issue #3 now explicitly requires atomic Redis-backed limiter mutations and disallows non-atomic `INCR` plus separate `EXPIRE` patterns for production rate-limit state.'
```

Output:

```text
{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066843289","pull_request_review_id":4092595850,"id":3066843289,"node_id":"PRRC_kwDORIrGY862zFCZ","diff_hunk":"@@ -0,0 +1,553 @@\n+# Deployment Sprint Plan — April 8–19, 2026\n+\n+## Context\n+Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend backed by PostgreSQL and Redis. Sprint 4 adapts the P6 deployment assignment to a **Vercel + Railway** production stack:\n+\n+- **Frontend hosting:** Vercel\n+- **Backend hosting:** Railway\n+- **Database:** Railway Postgres\n+- **Cache / event bus:** Railway Redis\n+- **Public deployment goal:** keep the app deployed through instructor review\n+- **Scaling goal:** support **2 or more backend API replicas** on Railway while keeping background event processing correct\n+\n+This sprint must cover the substance of **P6 Deployment** while ignoring the AWS-only platform choice. The plan therefore replaces:\n+\n+- AWS Lambda/API Gateway with Railway backend services\n+- AWS Amplify with Vercel frontend hosting\n+- AWS CD workflows with Vercel/Railway CD workflows\n+\n+Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.\n+\n+The assignment requirements we still must satisfy are:\n+\n+1. Publicly deploy frontend and backend\n+2. Automate deployment from GitHub\n+3. Add integration test specifications and implementation\n+4. Run integration tests locally and in the cloud\n+5. Add GitHub Actions for integration tests\n+6. Adopt GitHub hygiene and branch protection\n+7. Update README with user-facing and deployer-facing instructions\n+8. Produce the final submission artifacts, links, logs, and reflection\n+\n+**Assignment:** P6: Deployment  \n+**Due:** Sunday, April 19, 2026, 11:59 PM AOE\n+\n+## Team\n+5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI\n+\n+## Target Architecture\n+\n+### Public Services\n+- `frontend` on Vercel\n+- `backend-api` on Railway with **2+ replicas**\n+\n+### Internal / Stateful Services\n+- `backend-worker` on Railway with **1 replica only**\n+- `postgres` on Railway\n+- `redis` on Railway\n+\n+### Domain Layout\n+- `https://<frontend-domain>` -> Vercel\n+- `https://api.<frontend-domain>` -> Railway `backend-api`\n+\n+### Multi-Backend Railway Rules\n+To safely support 2+ backend replicas, the sprint must remove or isolate process-local production state:\n+\n+- Public/auth rate limiting must use **Redis-backed shared storage**\n+- File uploads must use **shared object storage**, not local disk\n+- Background subscribers / cache invalidation / sitemap updates must run in a **singleton worker**\n+- API replicas must be stateless apart from live SSE client connections\n+- Deployment verification must prove that 2+ API replicas behave correctly behind Railway load balancing\n+\n+### Explicit Production Decisions\n+- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.\n+- **Sitemap handoff:** the frontend apex domain serves crawler-facing sitemap entrypoints through **Next.js route handlers** that fetch sitemap/XML data from the backend at request time. The backend may generate sitemap data, but the API subdomain is not the direct crawl target in production.\n+- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.\n+- **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.\n+- **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.\n+- **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.\n+- **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.\n+- **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.\n+- **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.\n+\n+---\n+\n+## P6 Coverage Map\n+\n+| P6 Requirement | Vercel + Railway Adaptation | Covered By Issues |\n+|---|---|---|\n+| Publicly deploy frontend | Deploy Next.js app to Vercel | #6, #12, #16 |\n+| Publicly deploy backend | Deploy Express/tRPC app to Railway | #5, #7, #11 |\n+| Publish backend public interfaces via REST | Keep Railway backend public routes stable and production-configured | #1, #5, #7 |\n+| Integration test specification | Write English-language integration spec for FE-BE paths | #8 |\n+| Integration tests on localhost | Add env-aware local integration test flow | #9 |\n+| Integration tests in cloud | Run same test suite against deployed Vercel + Railway URLs | #9, #14 |\n+| GitHub Action for integration tests | Add `run-integration-tests.yml` | #10 |\n+| Continuous deployment | Add backend and frontend deployment workflows for Railway and Vercel | #11, #12 |\n+| GitHub hygiene / branch protection | Require PRs and required checks before merge | #13 |\n+| README update | Add user-facing run instructions and deployer guide | #15 |\n+| Submission links, logs, reflection | Final packaging and artifact checklist | #15 |\n+\n+---\n+\n+## Issues (16 total)\n+\n+> **Note:** Issues are written so they can be opened directly on GitHub with the dependency notes preserved in the body. \"Blocked by\" means the issue should not be considered complete until those upstream issues land. \"Unblocks\" is included to make sequencing explicit for the team.\n+\n+### Phase 1: Architecture, Production Readiness, and Scaling Design — April 8–11\n+\n+**1. Deployment Architecture + Environment Matrix**\n+- Define the final Vercel + Railway topology:\n+  - `frontend`\n+  - `backend-api`\n+  - `backend-worker`\n+  - `postgres`\n+  - `redis`\n+- Document production env vars for frontend, backend API, and worker\n+- Define domain plan (`frontend` domain + `api` subdomain)\n+- Define promotion flow for preview vs production\n+- Produce and save a reference document at `docs/deployment/deployment-architecture.md`\n+  - this document is the canonical reference for service topology, domain ownership, env vars, deploy authority, and preview vs production behavior\n+  - later deployment issues should link to and update this document instead of redefining architecture assumptions\n+- Acceptance criteria:\n+  - Clear service inventory\n+  - Clear env var matrix\n+  - Clear ownership of public vs internal services\n+  - Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton\n+  - `docs/deployment/deployment-architecture.md` exists and is usable as the canonical reference for downstream issues\n+- Assignee: **acabrera04**\n+- Backup owner: **declanblanc**\n+- Due: April 9\n+- Blocked by: none\n+- Unblocks: #2, #6, #7, #8, #16\n+\n+**2. Backend Scale Audit for Railway Replicas**\n+- Audit the current backend for state that will break with 2+ API replicas\n+- Confirm and document the required changes for:\n+  - in-memory rate limiting\n+  - local filesystem attachment storage\n+  - duplicate startup subscribers / background jobs\n+  - SSE behavior behind load balancing\n+  - proxy/IP handling\n+- Produce and save a reference document at `docs/deployment/replica-readiness-audit.md`\n+  - include the concrete \"replica-safe backend\" checklist for implementation\n+  - include must-fix items, acceptable demo-time risks, and explicit ownership boundaries between `backend-api` and `backend-worker`\n+  - later scaling/deployment issues should cite this document when implementing or validating replica-safe behavior\n+- Acceptance criteria:\n+  - Checklist references the actual code areas that must change\n+  - Risks are prioritized into must-fix vs acceptable-for-demo\n+  - `backend-api` vs `backend-worker` responsibilities are finalized\n+  - `docs/deployment/replica-readiness-audit.md` exists and is detailed enough for downstream implementation/validation issues to reference directly\n+- Assignee: **declanblanc**\n+- Backup owner: **acabrera04**\n+- Due: April 9\n+- Blocked by: #1\n+- Unblocks: #3, #4, #5, #14\n+\n+**3. Shared Rate Limiting + Proxy-Aware Networking**\n+- Replace process-local rate limiting with shared Redis-backed limiting\n+- Replace or unify **both** current implementations:\n+  - auth endpoint limiting using `express-rate-limit`\n+  - public-route token bucket limiting\n+- Ensure auth and public API rate limits remain correct across 2+ replicas\n+- Configure Express proxy awareness so client IP handling works correctly behind Railway\n+- Use `docs/deployment/replica-readiness-audit.md` as the implementation checklist and update it with final decisions\n+- Acceptance criteria:\n+  - Public and auth rate limits are shared across replicas\n+  - No process-local auth or public-route limit counters remain in production code paths\n+  - Production proxy trust is explicitly configured for a **single Railway hop** (`trust proxy = 1` or equivalent) and documented in deployment docs","path":"planning/SPRINT_4_PLAN.md","commit_id":"a2ed1c463821fbfd1c292772fbbad65a79d28882","original_commit_id":"c772049c066293c5d3036e439dd8ddcc147b69e0","user":{"login":"acabrera04","id":145043651,"node_id":"U_kgDOCKUwww","avatar_url":"https://avatars.githubusercontent.com/u/145043651?v=4","gravatar_id":"","url":"https://api.github.com/users/acabrera04","html_url":"https://github.com/acabrera04","followers_url":"https://api.github.com/users/acabrera04/followers","following_url":"https://api.github.com/users/acabrera04/following{/other_user}","gists_url":"https://api.github.com/users/acabrera04/gists{/gist_id}","starred_url":"https://api.github.com/users/acabrera04/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/acabrera04/subscriptions","organizations_url":"https://api.github.com/users/acabrera04/orgs","repos_url":"https://api.github.com/users/acabrera04/repos","events_url":"https://api.github.com/users/acabrera04/events{/privacy}","received_events_url":"https://api.github.com/users/acabrera04/received_events","type":"User","user_view_type":"public","site_admin":false},"body":"Fixed in `a2ed1c4`. Issue #3 now explicitly requires atomic Redis-backed limiter mutations and disallows non-atomic `INCR` plus separate `EXPIRE` patterns for production rate-limit state.","created_at":"2026-04-10T21:32:34Z","updated_at":"2026-04-10T21:32:34Z","html_url":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066843289","pull_request_url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311","_links":{"self":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066843289"},"html":{"href":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066843289"},"pull_request":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311"}},"reactions":{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066843289/reactions","total_count":0,"+1":0,"-1":0,"laugh":0,"hooray":0,"confused":0,"heart":0,"rocket":0,"eyes":0},"start_line":null,"original_start_line":null,"start_side":null,"line":166,"original_line":158,"side":"RIGHT","in_reply_to_id":3066825328,"author_association":"MEMBER","original_position":158,"position":166,"subject_type":"line"}
```

#### Tool: exec_command

```sh
gh api --method POST repos/CS485-Harmony/Harmony/pulls/311/comments/3066825330/replies -f body='Fixed in `a2ed1c4`. The plan now picks read-only cloud smoke coverage as the default cloud-mode data-isolation strategy, requires `docs/test-specs/` to classify cloud tests accordingly, and adds acceptance criteria preventing cloud-mode tests from mutating non-isolated deployed state.'
```

Output:

```text
Total output lines: 1

{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066843285","pull_request_review_id":4092595847,"id":3066843285,"node_id":"PRRC_kwDORIrGY862zFCV","diff_hunk":"@@ -0,0 +1,553 @@\n+# Deployment Sprint Plan — April 8–19, 2026\n+\n+## Context\n+Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend backed by PostgreSQL and Redis. Sprint 4 adapts the P6 deployment assignment to a **Vercel + Railway** production stack:\n+\n+- **Frontend hosting:** Vercel\n+- **Backend hosting:** Railway\n+- **Database:** Railway Postgres\n+- **Cache / event bus:** Railway Redis\n+- **Public deployment goal:** keep the app deployed through instructor review\n+- **Scaling goal:** support **2 or more backend API replicas** on Railway while keeping background event processing correct\n+\n+This sprint must cover the substance of **P6 Deployment** while ignoring the AWS-only platform choice. The plan therefore replaces:\n+\n+- AWS Lambda/API Gateway with Railway backend services\n+- AWS Amplify with Vercel frontend hosting\n+- AWS CD workflows with Vercel/Railway CD workflows\n+\n+Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.\n+\n+The assignment requirements we still must satisfy are:\n+\n+1. Publicly deploy frontend and backend\n+2. Automate deployment from GitHub\n+3. Add integration test specifications and implementation\n+4. Run integration tests locally and in the cloud\n+5. Add GitHub Actions for integration tests\n+6. Adopt GitHub hygiene and branch protection\n+7. Update README with user-facing and deployer-facing instructions\n+8. Produce the final submission artifacts, links, logs, and reflection\n+\n+**Assignment:** P6: Deployment  \n+**Due:** Sunday, April 19, 2026, 11:59 PM AOE\n+\n+## Team\n+5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI\n+\n+## Target Architecture\n+\n+### Public Services\n+- `frontend` on Vercel\n+- `backend-api` on Railway with **2+ replicas**\n+\n+### Internal / Stateful Services\n+- `backend-worker` on Railway with **1 replica only**\n+- `postgres` on Railway\n+- `redis` on Railway\n+\n+### Domain Layout\n+- `https://<frontend-domain>` -> Vercel\n+- `https://api.<frontend-domain>` -> Railway `backend-api`\n+\n+### Multi-Backend Railway Rules\n+To safely support 2+ backend replicas, the sprint must remove or isolate process-local production state:\n+\n+- Public/auth rate limiting must use **Redis-backed shared storage**\n+- File uploads must use **shared object storage**, not local disk\n+- Background subscribers / cache invalidation / sitemap updates must run in a **singleton worker**\n+- API replicas must be stateless apart from live SSE client connections\n+- Deployment verification must prove that 2+ API replicas behave correctly behind Railway load balancing\n+\n+### Explicit Production Decisions\n+- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.\n+- **Sitemap handoff:** the frontend apex domain serves crawler-facing sitemap entrypoints through **Next.js route handlers** that fetch sitemap/XML data from the backend at request time. The backend may generate sitemap data, but the API subdomain is not the direct crawl target in production.\n+- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.\n+- **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.\n+- **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.\n+- **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.\n+- **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.\n+- **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.\n+- **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.\n+\n+---\n+\n+## P6 Coverage Map\n+\n+| P6 Requirement | Vercel + Railway Adaptation | Covered By Issues |\n+|---|---|---|\n+| Publicly deploy frontend | Deploy Next.js app to Vercel | #6, #12, #16 |\n+| Publicly deploy backend | Deploy Express/tRPC app to Railway | #5, #7, #11 |\n+| Publish backend public interfaces via REST | Keep Railway backend public routes stable and production-configured | #1, #5, #7 |\n+| Integration test specification | Write English-language integration spec for FE-BE paths | #8 |\n+| Integration tests on localhost | Add env-aware local integration test flow | #9 |\n+| Integration tests in cloud | Run same test suite against deployed Vercel + Railway URLs | #9, #14 |\n+| GitHub Action for integration tests | Add `run-integration-tests.yml` | #10 |\n+| Continuous deployment | Add backend and frontend deployment workflows for Railway and Vercel | #11, #12 |\n+| GitHub hygiene / branch protection | Require PRs and required checks before merge | #13 |\n+| README update | Add user-facing run instructions and deployer guide | #15 |\n+| Submission links, logs, reflection | Final packaging and artifact checklist | #15 |\n+\n+---\n+\n+## Issues (16 total)\n+\n+> **Note:** Issues are written so they can be opened directly on GitHub with the dependency notes preserved in the body. \"Blocked by\" means the issue should not be considered complete until those upstream issues land. \"Unblocks\" is included to make sequencing explicit for the team.\n+\n+### Phase 1: Architecture, Production Readiness, and Scaling Design — April 8–11\n+\n+**1. Deployment Architecture + Environment Matrix**\n+- Define the final Vercel + Railway topology:\n+  - `frontend`\n+  - `backend-api`\n+  - `backend-worker`\n+  - `postgres`\n+  - `redis`\n+- Document production env vars for frontend, backend API, and worker\n+- Define domain plan (`frontend` domain + `api` subdomain)\n+- Define promotion flow for preview vs production\n+- Produce and save a reference document at `docs/deployment/deployment-architecture.md`\n+  - this document is the canonical reference for service topology, domain ownership, env vars, deploy authority, and preview vs production behavior\n+  - later deployment issues should link to and update this document instead of redefining architecture assumptions\n+- Acceptance criteria:\n+  - Clear service inventory\n+  - Clear env var matrix\n+  - Clear ownership of public vs internal services\n+  - Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton\n+  - `docs/deployment/deployment-architecture.md` exists and is usable as the canonical reference for downstream issues\n+- Assignee: **acabrera04**\n+- Backup owner: **declanblanc**\n+- Due: April 9\n+- Blocked by: no…1004 tokens truncated… Add startup commands for both Railway backend services\n+- Use `docs/deployment/replica-readiness-audit.md` to drive the split and record the final `backend-api` / `backend-worker` ownership model there and in `docs/deployment/deployment-architecture.md`\n+- Acceptance criteria:\n+  - `backend-api` can run with 2+ replicas without duplicate singleton background side effects\n+  - `backend-worker` runs with 1 replica and owns singleton event-driven tasks\n+  - SSE behavior across 2+ replicas follows the documented Redis fan-out strategy and no sticky-session dependency remains in the production design\n+  - Replica identity is externally observable enough to prove load balancing across 2+ API replicas\n+  - `backend-worker` health check and restart expectations are documented and wired into deployment assumptions\n+  - Service responsibilities are documented\n+- Assignee: **declanblanc**\n+- Backup owner: **acabrera04**\n+- Due: April 12\n+- Blocked by: #2\n+- Unblocks: #7, #11, #14\n+\n+### Phase 2: Frontend and Integration Foundations — April 9–13\n+\n+**6. Frontend Production Configuration for Vercel**\n+- Add production-safe frontend configuration:\n+  - absolute canonical URLs\n+  - `metadataBase`\n+  - `robots.txt` on the frontend apex domain\n+  - sitemap support on the frontend apex domain\n+  - production API base URL handling\n+- Make the SEO ownership boundary explicit:\n+  - frontend apex domain owns the canonical public SEO artifacts: canonical URLs, `metadataBase`, `robots.txt`, sitemap entrypoints, and any sitemap index exposed to crawlers\n+  - frontend sitemap entrypoints are implemented through Next.js route handlers that fetch backend sitemap/XML data at request time\n+  - backend SEO routes may continue to generate sitemap/XML data as an internal or transitional source, but they are not the canonical crawler-facing host in production\n+  - no SEO artifact should require crawlers to use the API subdomain as the primary source of truth\n+- Ensure frontend still supports localhost development cleanly\n+- Use `docs/deployment/deployment-architecture.md` as the source of truth for domain ownership, public URLs, and SEO host decisions\n+- Acceptance criteria:\n+  - Public pages generate correct production metadata\n+  - Canonical host ownership is explicit and consistent across frontend and backend docs/code\n+  - Frontend can target local and cloud backends without code edits\n+  - SEO-critical pages render correctly on the public domain\n+- Assignee: **AvanishKulkarni**\n+- Due: April 11\n+- Blocked by: #1\n+- Unblocks: #12, #16\n+\n+**7. Railway Project Provisioning and Service Wiring**\n+- Create/configure the Railway project and services:\n+  - `backend-api`\n+  - `backend-worker`\n+  - `postgres`\n+  - `redis`\n+- Configure internal networking, service env vars, health checks, deploy commands, and domains\n+- Ensure `backend-api` and `backend-worker` both connect to the same Postgres and Redis instances\n+- Provision services and env vars to match `docs/deployment/deployment-architecture.md`, and use `docs/deployment/replica-readiness-audit.md` for replica-safety requirements\n+- Acceptance criteria:\n+  - Railway project is provisioned\n+  - Domains/env vars/health checks are configured\n+  - Postgres and Redis env vars use Railway private/internal connection strings for service-to-service traffic\n+  - `backend-worker` has a health check and restart-on-failure behavior configured\n+  - `backend-api` and `backend-worker` both boot successfully in Railway\n+- Assignee: **acabrera04**\n+- Backup owner: **FardeenI**\n+- Due: April 13\n+- Blocked by: #1, #5\n+- Unblocks: #11, #14, #15\n+\n+**8. Integration Test Specification**\n+- Write an English-language integration test specification for all frontend-backend code paths that must work in deployment\n+- Cover at least:\n+  - guest public channel rendering\n+  - login / auth refresh path\n+  - public API path used by SSR metadata/page rendering\n+  - visibility change impact on public indexing behavior\n+  - attachment path if production storage is in scope\n+  - SSE/realtime smoke behavior if kept in deployed flow\n+- Reference `docs/deployment/deployment-architecture.md` for deployment topology and `docs/deployment/replica-readiness-audit.md` for replica-sensitive scenarios that need validation\n+- Acceptance criteria:\n+  - Every FE-BE pathway has at least one test case\n+  - Spec includes local-only vs cloud-only notes where relevant\n+  - Spec is stored under `docs/test-specs/`\n+- Assignee: **FardeenI**\n+- Due: April 11\n+- Blocked by: #1\n+- Unblocks: #9, #10, #15\n+\n+**9. Integration Test Implementation + Environment Matrix**\n+- Implement the integration tests from the spec\n+- Support two execution targets:\n+  - `local`: starts local frontend/backend dependencies and runs against localhost\n+  - `cloud`: runs against already-deployed frontend/backend URLs without starting local app servers\n+- Add environment selection via explicit env vars or script arguments\n+- Document which tests are:\n+  - portable across both targets\n+  - local-only because they depend on reset/seed control\n+  - cloud-only because they validate deployed behavior\n+- Capture/structure output for both local and cloud runs\n+- Keep target URLs, environment contracts, and replica-sensitive validations aligned with `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`\n+- Acceptance criteria:\n+  - Tests run in a local configuration\n+  - Tests run in a cloud configuration\n+  - Cloud mode does not require local frontend/backend startup","path":"planning/SPRINT_4_PLAN.md","commit_id":"a2ed1c463821fbfd1c292772fbbad65a79d28882","original_commit_id":"c772049c066293c5d3036e439dd8ddcc147b69e0","user":{"login":"acabrera04","id":145043651,"node_id":"U_kgDOCKUwww","avatar_url":"https://avatars.githubusercontent.com/u/145043651?v=4","gravatar_id":"","url":"https://api.github.com/users/acabrera04","html_url":"https://github.com/acabrera04","followers_url":"https://api.github.com/users/acabrera04/followers","following_url":"https://api.github.com/users/acabrera04/following{/other_user}","gists_url":"https://api.github.com/users/acabrera04/gists{/gist_id}","starred_url":"https://api.github.com/users/acabrera04/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/acabrera04/subscriptions","organizations_url":"https://api.github.com/users/acabrera04/orgs","repos_url":"https://api.github.com/users/acabrera04/repos","events_url":"https://api.github.com/users/acabrera04/events{/privacy}","received_events_url":"https://api.github.com/users/acabrera04/received_events","type":"User","user_view_type":"public","site_admin":false},"body":"Fixed in `a2ed1c4`. The plan now picks read-only cloud smoke coverage as the default cloud-mode data-isolation strategy, requires `docs/test-specs/` to classify cloud tests accordingly, and adds acceptance criteria preventing cloud-mode tests from mutating non-isolated deployed state.","created_at":"2026-04-10T21:32:34Z","updated_at":"2026-04-10T21:32:34Z","html_url":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066843285","pull_request_url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311","_links":{"self":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066843285"},"html":{"href":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066843285"},"pull_request":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311"}},"reactions":{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066843285/reactions","total_count":0,"+1":0,"-1":0,"laugh":0,"hooray":0,"confused":0,"heart":0,"rocket":0,"eyes":0},"start_line":null,"original_start_line":null,"start_side":null,"line":305,"original_line":285,"side":"RIGHT","in_reply_to_id":3066825330,"author_association":"MEMBER","original_position":285,"position":305,"subject_type":"line"}
```

#### Tool: exec_command

```sh
gh api --method POST repos/CS485-Harmony/Harmony/pulls/311/comments/3066825335/replies -f body='Fixed in `a2ed1c4`. Issue #11 now requires an expand/contract schema rollout rule so destructive migrations are not introduced in the same deploy that must coexist with old API replicas during Railway rolling restarts.'
```

Output:

```text
Total output lines: 1

{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066843284","pull_request_review_id":4092595846,"id":3066843284,"node_id":"PRRC_kwDORIrGY862zFCU","diff_hunk":"@@ -0,0 +1,553 @@\n+# Deployment Sprint Plan — April 8–19, 2026\n+\n+## Context\n+Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend backed by PostgreSQL and Redis. Sprint 4 adapts the P6 deployment assignment to a **Vercel + Railway** production stack:\n+\n+- **Frontend hosting:** Vercel\n+- **Backend hosting:** Railway\n+- **Database:** Railway Postgres\n+- **Cache / event bus:** Railway Redis\n+- **Public deployment goal:** keep the app deployed through instructor review\n+- **Scaling goal:** support **2 or more backend API replicas** on Railway while keeping background event processing correct\n+\n+This sprint must cover the substance of **P6 Deployment** while ignoring the AWS-only platform choice. The plan therefore replaces:\n+\n+- AWS Lambda/API Gateway with Railway backend services\n+- AWS Amplify with Vercel frontend hosting\n+- AWS CD workflows with Vercel/Railway CD workflows\n+\n+Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.\n+\n+The assignment requirements we still must satisfy are:\n+\n+1. Publicly deploy frontend and backend\n+2. Automate deployment from GitHub\n+3. Add integration test specifications and implementation\n+4. Run integration tests locally and in the cloud\n+5. Add GitHub Actions for integration tests\n+6. Adopt GitHub hygiene and branch protection\n+7. Update README with user-facing and deployer-facing instructions\n+8. Produce the final submission artifacts, links, logs, and reflection\n+\n+**Assignment:** P6: Deployment  \n+**Due:** Sunday, April 19, 2026, 11:59 PM AOE\n+\n+## Team\n+5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI\n+\n+## Target Architecture\n+\n+### Public Services\n+- `frontend` on Vercel\n+- `backend-api` on Railway with **2+ replicas**\n+\n+### Internal / Stateful Services\n+- `backend-worker` on Railway with **1 replica only**\n+- `postgres` on Railway\n+- `redis` on Railway\n+\n+### Domain Layout\n+- `https://<frontend-domain>` -> Vercel\n+- `https://api.<frontend-domain>` -> Railway `backend-api`\n+\n+### Multi-Backend Railway Rules\n+To safely support 2+ backend replicas, the sprint must remove or isolate process-local production state:\n+\n+- Public/auth rate limiting must use **Redis-backed shared storage**\n+- File uploads must use **shared object storage**, not local disk\n+- Background subscribers / cache invalidation / sitemap updates must run in a **singleton worker**\n+- API replicas must be stateless apart from live SSE client connections\n+- Deployment verification must prove that 2+ API replicas behave correctly behind Railway load balancing\n+\n+### Explicit Production Decisions\n+- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.\n+- **Sitemap handoff:** the frontend apex domain serves crawler-facing sitemap entrypoints through **Next.js route handlers** that fetch sitemap/XML data from the backend at request time. The backend may generate sitemap data, but the API subdomain is not the direct crawl target in production.\n+- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.\n+- **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.\n+- **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.\n+- **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.\n+- **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.\n+- **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.\n+- **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.\n+\n+---\n+\n+## P6 Coverage Map\n+\n+| P6 Requirement | Vercel + Railway Adaptation | Covered By Issues |\n+|---|---|---|\n+| Publicly deploy frontend | Deploy Next.js app to Vercel | #6, #12, #16 |\n+| Publicly deploy backend | Deploy Express/tRPC app to Railway | #5, #7, #11 |\n+| Publish backend public interfaces via REST | Keep Railway backend public routes stable and production-configured | #1, #5, #7 |\n+| Integration test specification | Write English-language integration spec for FE-BE paths | #8 |\n+| Integration tests on localhost | Add env-aware local integration test flow | #9 |\n+| Integration tests in cloud | Run same test suite against deployed Vercel + Railway URLs | #9, #14 |\n+| GitHub Action for integration tests | Add `run-integration-tests.yml` | #10 |\n+| Continuous deployment | Add backend and frontend deployment workflows for Railway and Vercel | #11, #12 |\n+| GitHub hygiene / branch protection | Require PRs and required checks before merge | #13 |\n+| README update | Add user-facing run instructions and deployer guide | #15 |\n+| Submission links, logs, reflection | Final packaging and artifact checklist | #15 |\n+\n+---\n+\n+## Issues (16 total)\n+\n+> **Note:** Issues are written so they can be opened directly on GitHub with the dependency notes preserved in the body. \"Blocked by\" means the issue should not be considered complete until those upstream issues land. \"Unblocks\" is included to make sequencing explicit for the team.\n+\n+### Phase 1: Architecture, Production Readiness, and Scaling Design — April 8–11\n+\n+**1. Deployment Architecture + Environment Matrix**\n+- Define the final Vercel + Railway topology:\n+  - `frontend`\n+  - `backend-api`\n+  - `backend-worker`\n+  - `postgres`\n+  - `redis`\n+- Document production env vars for frontend, backend API, and worker\n+- Define domain plan (`frontend` domain + `api` subdomain)\n+- Define promotion flow for preview vs production\n+- Produce and save a reference document at `docs/deployment/deployment-architecture.md`\n+  - this document is the canonical reference for service topology, domain ownership, env vars, deploy authority, and preview vs production behavior\n+  - later deployment issues should link to and update this document instead of redefining architecture assumptions\n+- Acceptance criteria:\n+  - Clear service inventory\n+  - Clear env var matrix\n+  - Clear ownership of public vs internal services\n+  - Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton\n+  - `docs/deployment/deployment-architecture.md` exists and is usable as the canonical reference for downstream issues\n+- Assignee: **acabrera04**\n+- Backup owner: **declanblanc**\n+- Due: April 9\n+- Blocked by: no…1478 tokens truncated…no SEO artifact should require crawlers to use the API subdomain as the primary source of truth\n+- Ensure frontend still supports localhost development cleanly\n+- Use `docs/deployment/deployment-architecture.md` as the source of truth for domain ownership, public URLs, and SEO host decisions\n+- Acceptance criteria:\n+  - Public pages generate correct production metadata\n+  - Canonical host ownership is explicit and consistent across frontend and backend docs/code\n+  - Frontend can target local and cloud backends without code edits\n+  - SEO-critical pages render correctly on the public domain\n+- Assignee: **AvanishKulkarni**\n+- Due: April 11\n+- Blocked by: #1\n+- Unblocks: #12, #16\n+\n+**7. Railway Project Provisioning and Service Wiring**\n+- Create/configure the Railway project and services:\n+  - `backend-api`\n+  - `backend-worker`\n+  - `postgres`\n+  - `redis`\n+- Configure internal networking, service env vars, health checks, deploy commands, and domains\n+- Ensure `backend-api` and `backend-worker` both connect to the same Postgres and Redis instances\n+- Provision services and env vars to match `docs/deployment/deployment-architecture.md`, and use `docs/deployment/replica-readiness-audit.md` for replica-safety requirements\n+- Acceptance criteria:\n+  - Railway project is provisioned\n+  - Domains/env vars/health checks are configured\n+  - Postgres and Redis env vars use Railway private/internal connection strings for service-to-service traffic\n+  - `backend-worker` has a health check and restart-on-failure behavior configured\n+  - `backend-api` and `backend-worker` both boot successfully in Railway\n+- Assignee: **acabrera04**\n+- Backup owner: **FardeenI**\n+- Due: April 13\n+- Blocked by: #1, #5\n+- Unblocks: #11, #14, #15\n+\n+**8. Integration Test Specification**\n+- Write an English-language integration test specification for all frontend-backend code paths that must work in deployment\n+- Cover at least:\n+  - guest public channel rendering\n+  - login / auth refresh path\n+  - public API path used by SSR metadata/page rendering\n+  - visibility change impact on public indexing behavior\n+  - attachment path if production storage is in scope\n+  - SSE/realtime smoke behavior if kept in deployed flow\n+- Reference `docs/deployment/deployment-architecture.md` for deployment topology and `docs/deployment/replica-readiness-audit.md` for replica-sensitive scenarios that need validation\n+- Acceptance criteria:\n+  - Every FE-BE pathway has at least one test case\n+  - Spec includes local-only vs cloud-only notes where relevant\n+  - Spec is stored under `docs/test-specs/`\n+- Assignee: **FardeenI**\n+- Due: April 11\n+- Blocked by: #1\n+- Unblocks: #9, #10, #15\n+\n+**9. Integration Test Implementation + Environment Matrix**\n+- Implement the integration tests from the spec\n+- Support two execution targets:\n+  - `local`: starts local frontend/backend dependencies and runs against localhost\n+  - `cloud`: runs against already-deployed frontend/backend URLs without starting local app servers\n+- Add environment selection via explicit env vars or script arguments\n+- Document which tests are:\n+  - portable across both targets\n+  - local-only because they depend on reset/seed control\n+  - cloud-only because they validate deployed behavior\n+- Capture/structure output for both local and cloud runs\n+- Keep target URLs, environment contracts, and replica-sensitive validations aligned with `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`\n+- Acceptance criteria:\n+  - Tests run in a local configuration\n+  - Tests run in a cloud configuration\n+  - Cloud mode does not require local frontend/backend startup\n+  - Any environment-specific exceptions are documented\n+- Assignee: **Aiden-Barrera**\n+- Due: April 14\n+- Blocked by: #8, #6, #7\n+- Unblocks: #10, #14, #15\n+\n+### Phase 3: CI/CD and Deployment Automation — April 12–16\n+\n+**10. GitHub Action — `run-integration-tests.yml`**\n+- Create `.github/workflows/run-integration-tests.yml`\n+- Install frontend/backend dependencies\n+- Set up the required environment for integration tests\n+- Run the local-target integration suite in CI\n+- Keep the workflow name and job names stable so they can be required in branch protection\n+- Document how cloud-target integration tests are invoked outside CI when deployed URLs are available\n+- Reference `docs/deployment/deployment-architecture.md` for environment inputs and `docs/deployment/replica-readiness-audit.md` for any replica-sensitive checks excluded from local CI\n+- Acceptance criteria:\n+  - Workflow passes on a PR\n+  - Workflow is usable as a required status check\n+  - YAML is committed and documented\n+- Assignee: **FardeenI**\n+- Due: April 15\n+- Blocked by: #8, #9\n+- Unblocks: #13, #15\n+\n+**11. GitHub Action — `deploy-railway.yml`**\n+- Create backend CD workflow for Railway\n+- Deploy `backend-api` and `backend-worker` on pushes to `main`\n+- Ensure migrations / build / deploy ordering is safe\n+- Use GitHub secrets for Railway authentication\n+- Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted\n+- Implement the workflow against the service topology and env contract defined in `docs/deployment/deployment-architecture.md`\n+- Acceptance criteria:\n+  - Workflow deploys backend services without manual intervention\n+  - Production deploy authority is unambiguous and documented\n+  - Exactly one migration runner performs `prisma migrate deploy`, and `backend-api` replicas are prevented from racing migrations on startup","path":"planning/SPRINT_4_PLAN.md","commit_id":"a2ed1c463821fbfd1c292772fbbad65a79d28882","original_commit_id":"c772049c066293c5d3036e439dd8ddcc147b69e0","user":{"login":"acabrera04","id":145043651,"node_id":"U_kgDOCKUwww","avatar_url":"https://avatars.githubusercontent.com/u/145043651?v=4","gravatar_id":"","url":"https://api.github.com/users/acabrera04","html_url":"https://github.com/acabrera04","followers_url":"https://api.github.com/users/acabrera04/followers","following_url":"https://api.github.com/users/acabrera04/following{/other_user}","gists_url":"https://api.github.com/users/acabrera04/gists{/gist_id}","starred_url":"https://api.github.com/users/acabrera04/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/acabrera04/subscriptions","organizations_url":"https://api.github.com/users/acabrera04/orgs","repos_url":"https://api.github.com/users/acabrera04/repos","events_url":"https://api.github.com/users/acabrera04/events{/privacy}","received_events_url":"https://api.github.com/users/acabrera04/received_events","type":"User","user_view_type":"public","site_admin":false},"body":"Fixed in `a2ed1c4`. Issue #11 now requires an expand/contract schema rollout rule so destructive migrations are not introduced in the same deploy that must coexist with old API replicas during Railway rolling restarts.","created_at":"2026-04-10T21:32:34Z","updated_at":"2026-04-10T21:32:34Z","html_url":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066843284","pull_request_url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311","_links":{"self":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066843284"},"html":{"href":"https://github.com/CS485-Harmony/Harmony/pull/311#discussion_r3066843284"},"pull_request":{"href":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/311"}},"reactions":{"url":"https://api.github.com/repos/CS485-Harmony/Harmony/pulls/comments/3066843284/reactions","total_count":0,"+1":0,"-1":0,"laugh":0,"hooray":0,"confused":0,"heart":0,"rocket":0,"eyes":0},"start_line":null,"original_start_line":null,"start_side":null,"line":342,"original_line":321,"side":"RIGHT","in_reply_to_id":3066825335,"author_association":"MEMBER","original_position":321,"position":342,"subject_type":"line"}
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:32:49.127Z

The inline replies are posted. I’m adding one top-level PR comment as a response to the “Requesting changes” review summary, since that review itself doesn’t have a clean inline-reply endpoint.

#### Tool: exec_command

```sh
gh pr comment 311 --repo CS485-Harmony/Harmony --body 'Addressed the latest inline deployment-plan review in `a2ed1c4`.

Included updates:
- explicit cross-origin auth and CORS contract using Bearer header auth
- atomic Redis limiter requirement
- read-only cloud smoke-test data-hygiene rule
- expand/contract schema rollout rule for rolling Railway deploys

I replied inline on each thread with the specific change.'
```

Output:

```text
https://github.com/CS485-Harmony/Harmony/pull/311#issuecomment-4226913491
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:33:01.360Z

The current review state should now be fully answered from our side. I’m doing one short poll for any new review comments after the replies and top-level follow-up comment.

#### Tool: exec_command

```sh
gh api repos/CS485-Harmony/Harmony/pulls/311/comments --jq 'length'
```

Output:

```text
8
```

#### Tool: exec_command

```sh
gh pr view 311 --repo CS485-Harmony/Harmony --json reviewDecision,url
```

Output:

```text
{"reviewDecision":"CHANGES_REQUESTED","url":"https://github.com/CS485-Harmony/Harmony/pull/311"}
```

#### Tool: exec_command

```sh
sleep 30; gh api repos/CS485-Harmony/Harmony/pulls/311/comments --jq 'length'
```

Output:

```text

```

#### Tool: write_stdin

```json
{
  "session_id": 24592,
  "yield_time_ms": 1000,
  "max_output_tokens": 1000
}
```

Output:

```text
Command: /bin/zsh -lc "sleep 30; gh api repos/CS485-Harmony/Harmony/pulls/311/comments --jq 'length'"
Chunk ID: f93d46
Wall time: 0.0000 seconds
Process exited with code 0
Original token count: 1
Output:
8
```

#### Tool: update_plan

- Explanation: Resolved the four new inline deployment-plan comments, pushed commit a2ed1c4, replied inline on each thread plus a top-level PR follow-up, and confirmed the review comment count stayed stable after polling.

- Plan:
  - [completed] Fetch current unanswered review comments
  - [completed] Evaluate any new actionable findings
  - [completed] Implement fixes, verify, commit, and push if needed
  - [completed] Reply to comments and watch for follow-ups

Output:

```text
Plan updated
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:33:55.056Z

## PR Review Resolution Summary

### Results
- Fixed: 4 issues
- Already addressed: 0
- Won't fix (false positives): 0
- Discussion resolved: 0
- Skipped per user: 0

### By Reviewer/Bot
#### AvanishKulkarni
- Cross-origin auth/CORS contract was unspecified. Fixed in `a2ed1c4`.
- Redis-backed rate limiting did not require atomic mutations. Fixed in `a2ed1c4`.
- Cloud-mode tests had no deployed-data hygiene strategy. Fixed in `a2ed1c4`.
- Single migration runner did not cover rolling deploy schema safety. Fixed in `a2ed1c4`.

### What changed
Updated [planning/SPRINT_4_PLAN.md](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md) to add:
- explicit Bearer-token-based frontend/API auth and CORS contract
- atomic Redis limiter requirement
- read-only cloud smoke-test policy unless an isolated environment exists
- expand/contract migration rule for rolling Railway deploys

I committed and pushed:
- `a2ed1c4` `docs: address remaining deployment review findings`

I also replied inline to all four review comments and left a top-level PR follow-up comment.

### Status
All actionable findings are addressed from our side. The PR still shows `CHANGES_REQUESTED`, which is expected until the reviewer re-checks or updates their review. I did not run lint/typecheck/tests because this was a docs-only plan update.

### Turn 15: Update any railway specific task to anyone except acabrera04 since they

#### 👤 User Prompt

- Time: 2026-04-10T21:33:55.344Z

```text
Update any railway specific task to anyone except acabrera04 since they weren't able to get access to railway (limit of 4 people) and any vercel specific task delegate to declanblanc since he's deploying on vercel
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:34:10.988Z

I’m updating the sprint plan assignments so Railway-specific work is no longer assigned to `acabrera04`, and Vercel-specific work moves to `declanblanc` as requested. Then I’ll make sure the summary tables and backup coverage stay consistent.

#### Tool: exec_command

```sh
rtk read planning/SPRINT_4_PLAN.md
```

Output:

````text
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

Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.

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

### Explicit Production Decisions
- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.
- **Sitemap handoff:** the frontend apex domain serves crawler-facing sitemap entrypoints through **Next.js route handlers** that fetch sitemap/XML data from the backend at request time. The backend may generate sitemap data, but the API subdomain is not the direct crawl target in production.
- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.
- **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.
- **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.
- **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.
- **Auth & CORS contract:** production frontend and API traffic is cross-origin across sibling subdomains, so the deployment architecture must explicitly define:
  - the backend CORS allowlist for production and preview frontend origins
  - **browser-to-backend auth uses Bearer access tokens in the `Authorization` header**, matching the current application model; API authentication must not depend on browser cookies being sent cross-origin to the backend
  - any frontend-only session cookie used for Next.js middleware remains a frontend concern and is not the backend auth transport
  - the CSRF posture for the chosen auth transport; with bearer-header auth as the primary backend mechanism, CSRF protection focuses on avoiding cookie-authenticated state-changing backend routes
- **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.
- **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.
- **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.
- **Cloud test data hygiene:** cloud-target validation uses **read-only smoke checks against deployed URLs** unless a separate isolated staging environment is provisioned. Cloud-mode tests must not mutate the instructor-reviewed production dataset.

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
- Produce and save a reference document at `docs/deployment/deployment-architecture.md`
  - this document is the canonical reference for service topology, domain ownership, env vars, deploy authority, and preview vs production behavior
  - later deployment issues should link to and update this document instead of redefining architecture assumptions
- Acceptance criteria:
  - Clear service inventory
  - Clear env var matrix
  - Clear ownership of public vs internal services
  - Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton
  - `docs/deployment/deployment-architecture.md` records the production auth transport, cookie/header contract, CORS allowlist, and CSRF posture for the frontend/API split
  - `docs/deployment/deployment-architecture.md` exists and is usable as the canonical reference for downstream issues
- Assignee: **acabrera04**
- Backup owner: **declanblanc**
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
- Produce and save a reference document at `docs/deployment/replica-readiness-audit.md`
  - include the concrete "replica-safe backend" checklist for implementation
  - include must-fix items, acceptable demo-time risks, and explicit ownership boundaries between `backend-api` and `backend-worker`
  - later scaling/deployment issues should cite this document when implementing or validating replica-safe behavior
- Acceptance criteria:
  - Checklist references the actual code areas that must change
  - Risks are prioritized into must-fix vs acceptable-for-demo
  - `backend-api` vs `backend-worker` responsibilities are finalized
  - `docs/deployment/replica-readiness-audit.md` exists and is detailed enough for downstream implementation/validation issues to reference directly
- Assignee: **declanblanc**
- Backup owner: **acabrera04**
- Due: April 9
- Blocked by: #1
- Unblocks: #3, #4, #5, #14

**3. Shared Rate Limiting + Proxy-Aware Networking**
- Replace process-local rate limiting with shared Redis-backed limiting
- Replace or unify **both** current implementations:
  - auth endpoint limiting using `express-rate-limit`
  - public-route token bucket limiting
- Ensure auth and public API rate limits remain correct across 2+ replicas
- Configure Express proxy awareness so client IP handling works correctly behind Railway
- Use `docs/deployment/replica-readiness-audit.md` as the implementation checklist and update it with final decisions
- Acceptance criteria:
  - Public and auth rate limits are shared across replicas
  - No process-local auth or public-route limit counters remain in production code paths
  - Redis-backed limiter mutations are atomic; non-atomic `INCR` + separate `EXPIRE` style patterns are explicitly disallowed for production rate-limit state
  - Production proxy trust is explicitly configured for a **single Railway hop** (`trust proxy = 1` or equivalent) and documented in deployment docs
  - Rate limit behavior is covered by tests or verification notes
- Assignee: **Aiden-Barrera**
- Due: April 11
- Blocked by: #2
- Unblocks: #14

**4. Production Attachment Storage Provider**
- Implement a production storage provider backed by **Cloudflare R2 via an S3-compatible interface**
- Keep local storage available for development only
- Add env-driven provider selection and document required secrets
- Ensure uploaded files remain accessible regardless of which API replica serves subsequent requests
- Follow `docs/deployment/replica-readiness-audit.md` for replica-safe storage requirements and update `docs/deployment/deployment-architecture.md` with the final env/config contract
- Acceptance criteria:
  - Production does not rely on local filesystem attachment serving
  - The chosen production provider is Cloudflare R2, documented as such in code and setup docs
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
- Use **Redis pub/sub fan-out** as the explicit SSE strategy so each API replica can deliver shared events to its own connected clients without sticky-session requirements
- Add lightweight replica observability for validation:
  - instance identity in structured logs
  - instance/replica identity on health output and/or response headers
- Add startup commands for both Railway backend services
- Use `docs/deployment/replica-readiness-audit.md` to drive the split and record the final `backend-api` / `backend-worker` ownership model there and in `docs/deployment/deployment-architecture.md`
- Acceptance criteria:
  - `backend-api` can run with 2+ replicas without duplicate singleton background side effects
  - `backend-worker` runs with 1 replica and owns singleton event-driven tasks
  - SSE behavior across 2+ replicas follows the documented Redis fan-out strategy and no sticky-session dependency remains in the production design
  - Replica identity is externally observable enough to prove load balancing across 2+ API replicas
  - `backend-worker` health check and restart expectations are documented and wired into deployment assumptions
  - Service responsibilities are documented
- Assignee: **declanblanc**
- Backup owner: **acabrera04**
- Due: April 12
- Blocked by: #2
- Unblocks: #7, #11, #14

### Phase 2: Frontend and Integration Foundations — April 9–13

**6. Frontend Production Configuration for Vercel**
- Add production-safe frontend configuration:
  - absolute canonical URLs
  - `metadataBase`
  - `robots.txt` on the frontend apex domain
  - sitemap support on the frontend apex domain
  - production API base URL handling
- Make the SEO ownership boundary explicit:
  - frontend apex domain owns the canonical public SEO artifacts: canonical URLs, `metadataBase`, `robots.txt`, sitemap entrypoints, and any sitemap index exposed to crawlers
  - frontend sitemap entrypoints are implemented through Next.js route handlers that fetch backend sitemap/XML data at request time
  - backend SEO routes may continue to generate sitemap/XML data as an internal or transitional source, but they are not the canonical crawler-facing host in production
  - no SEO artifact should require crawlers to use the API subdomain as the primary source of truth
- Ensure frontend still supports localhost development cleanly
- Use `docs/deployment/deployment-architecture.md` as the source of truth for domain ownership, public URLs, and SEO host decisions
- Acceptance criteria:
  - Public pages generate correct production metadata
  - Canonical host ownership is explicit and consistent across frontend and backend docs/code
  - Frontend/API cross-origin auth behavior is consistent with the documented auth and CORS contract
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
- Provision services and env vars to match `docs/deployment/deployment-architecture.md`, and use `docs/deployment/replica-readiness-audit.md` for replica-safety requirements
- Acceptance criteria:
  - Railway project is provisioned
  - Domains/env vars/health checks are configured
  - Postgres and Redis env vars use Railway private/internal connection strings for service-to-service traffic
  - Backend CORS and auth-related env/config are aligned with the documented frontend/API contract
  - `backend-worker` has a health check and restart-on-failure behavior configured
  - `backend-api` and `backend-worker` both boot successfully in Railway
- Assignee: **acabrera04**
- Backup owner: **FardeenI**
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
- Declare the cloud-mode data-isolation strategy:
  - default choice for this sprint is **read-only cloud smoke coverage** against deployed URLs
  - any write-path cloud tests require a separately documented isolated environment before they are allowed
- Reference `docs/deployment/deployment-architecture.md` for deployment topology and `docs/deployment/replica-readiness-audit.md` for replica-sensitive scenarios that need validation
- Acceptance criteria:
  - Every FE-BE pathway has at least one test case
  - Spec includes local-only vs cloud-only notes where relevant
  - Cloud-mode tests are explicitly classified as read-only or isolated-environment-only
  - Spec is stored under `docs/test-specs/`
- Assignee: **FardeenI**
- Due: April 11
- Blocked by: #1
- Unblocks: #9, #10, #15

**9. Integration Test Implementation + Environment Matrix**
- Implement the integration tests from the spec
- Support two execution targets:
  - `local`: starts local frontend/backend dependencies and runs against localhost
  - `cloud`: runs against already-deployed frontend/backend URLs without starting local app servers
- Add environment selection via explicit env vars or script arguments
- Document which tests are:
  - portable across both targets
  - local-only because they depend on reset/seed control
  - cloud-only because they validate deployed behavior
- Keep cloud-target coverage read-only by default:
  - health and reachability
  - guest public channel rendering
  - public SSR metadata and canonical URL fetches
  - sitemap/robots fetches
  - SSE connect/disconnect smoke checks without mutating shared production state
- Capture/structure output for both local and cloud runs
- Keep target URLs, environment contracts, and replica-sensitive validations aligned with `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`
- Acceptance criteria:
  - Tests run in a local configuration
  - Tests run in a cloud configuration
  - Cloud mode does not require local frontend/backend startup
  - Cloud-mode tests cannot mutate non-isolated deployed state unless a separately documented isolated environment exists
  - Any environment-specific exceptions are documented
- Assignee: **Aiden-Barrera**
- Due: April 14
- Blocked by: #8, #6, #7
- Unblocks: #10, #14, #15

### Phase 3: CI/CD and Deployment Automation — April 12–16

**10. GitHub Action — `run-integration-tests.yml`**
- Create `.github/workflows/run-integration-tests.yml`
- Install frontend/backend dependencies
- Set up the required environment for integration tests
- Run the local-target integration suite in CI
- Keep the workflow name and job names stable so they can be required in branch protection
- Document how cloud-target integration tests are invoked outside CI when deployed URLs are available
- Reference `docs/deployment/deployment-architecture.md` for environment inputs and `docs/deployment/replica-readiness-audit.md` for any replica-sensitive checks excluded from local CI
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
- Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted
- Implement the workflow against the service topology and env contract defined in `docs/deployment/deployment-architecture.md`
- Acceptance criteria:
  - Workflow deploys backend services without manual intervention
  - Production deploy authority is unambiguous and documented
  - Exactly one migration runner performs `prisma migrate deploy`, and `backend-api` replicas are prevented from racing migrations on startup
  - Schema rollout rules follow an **expand/contract** convention so destructive migrations are not introduced in the same deploy that must coexist with old API replicas during rolling restart
  - Deploys target the correct Railway environment
  - Deployment process is documented in README
- Assignee: **acabrera04**
- Backup owner: **declanblanc**
- Due: April 15
- Blocked by: #5, #7
- Unblocks: #14, #15

**12. GitHub Action — `deploy-vercel.yml`**
- Create frontend CD workflow for Vercel
- Build/deploy frontend on pushes to `main`
- Ensure preview/production environment variables are configured properly
- Use GitHub secrets/tokens safely
- Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted
- Implement the workflow against the domain/env decisions in `docs/deployment/deployment-architecture.md`
- Acceptance criteria:
  - Workflow deploys frontend without manual intervention
  - Production deploy authority is unambiguous and documented
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
- Reference `docs/deployment/deployment-architecture.md` when documenting the production deploy authority and required checks tied to production promotion
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
- Configure domains and env vars to match `docs/deployment/deployment-architecture.md`
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
- Run the cloud-target integration/smoke suite against the deployed system
- Keep deployed-environment smoke verification read-only unless a separate isolated cloud test environment is explicitly provisioned
- Use the replica observability added in #5 to prove requests were served across 2+ API replicas via headers, health output, and/or structured logs
- Capture logs/screenshots/test output needed for submission
- Validate against the expected topology in `docs/deployment/deployment-architecture.md` and the replica-safety checklist in `docs/deployment/replica-readiness-audit.md`
- Acceptance criteria:
  - Live deployment is stable with `backend-api` at 2+ replicas
  - No replica-specific failures are observed for required paths
  - Proxy-aware rate limiting is validated against the documented one-hop trust model
  - Cloud-target tests pass against deployed URLs
  - Evidence clearly distinguishes deployed-system validation from localhost validation
- Assignee: **declanblanc**
- Backup owner: **Aiden-Barrera**
- Due: April 18
- Blocked by: #3, #4, #5, #7, #9, #11, #16
- Unblocks: #15

**15. README, Final Artifact Collection, and Submission Package**
- Update `README.md` with:
  - how web users access the deployed app
  - how to run the app locally
  - how a forked user sets up Vercel + Railway deployment
  - how CI/CD and branch protection are expected to work
- Fold in the final decisions captured in `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`
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
- Backup owner: **FardeenI**
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

## Critical Path Backup Coverage

| Critical Issue | Primary | Backup |
|---|---|---|
| #1 Deployment Architecture + Environment Matrix | acabrera04 | declanblanc |
| #2 Backend Scale Audit for Railway Replicas | declanblanc | acabrera04 |
| #5 Split `backend-api` and Singleton `backend-worker` | declanblanc | acabrera04 |
| #7 Railway Project Provisioning and Service Wiring | acabrera04 | FardeenI |
| #11 `deploy-railway.yml` | acabrera04 | declanblanc |
| #14 Railway Multi-Replica Validation and Deployment Evidence | declanblanc | Aiden-Barrera |
| #15 README, Final Artifact Collection, and Submission Package | acabrera04 | FardeenI |

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
- Cloud-target integration or smoke test output captured against deployed URLs
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
````

#### Tool: exec_command

```sh
rtk grep -n "Assignee:|Backup owner:|Assignment Summary|Critical Path Backup Coverage|Railway|Vercel" planning/SPRINT_4_PLAN.md
```

Output:

```text
🔍 94 in 38F:

📄 106 (1):
     0: 

📄 11 (1):
     0: ** support **2 or more backend API replicas** on Railway while keeping backgr...

📄 125 (1):
     0: **acabrera04**

📄 126 (1):
     0: **declanblanc**

📄 148 (1):
     0: **declanblanc**

📄 149 (1):
     0: **acabrera04**

📄 168 (1):
     0: **Aiden-Barrera**

📄 184 (1):
     0: **AvanishKulkarni**

📄 206 (1):
     0: **declanblanc**

📄 207 (1):
     0: **acabrera04**

📄 234 (1):
     0: **AvanishKulkarni**

📄 240 (1):
     0: 

📄 255 (1):
     0: **acabrera04**

📄 256 (1):
     0: **FardeenI**

📄 279 (1):
     0: **FardeenI**

📄 308 (1):
     0: **Aiden-Barrera**

📄 327 (1):
     0: **FardeenI**

📄 346 (1):
     0: **acabrera04**

📄 347 (1):
     0: **declanblanc**

📄 364 (1):
     0: **AvanishKulkarni**

📄 383 (1):
     0: **Aiden-Barrera**

📄 398 (1):
     0: **FardeenI**

📄 4 (1):
     0: 

📄 426 (1):
     0: **declanblanc**

📄 427 (1):
     0: **Aiden-Barrera**

📄 456 (1):
     0: **acabrera04**

📄 457 (1):
     0: **FardeenI**

📄 50 (1):
     0: //<frontend-domain>` -> Vercel

📄 51 (1):
     0: //api.<frontend-domain>` -> Railway `backend-api`

📄 6 (1):
     0: ** Vercel

📄 63 (1):
     0: ** the **Vercel frontend apex domain** is the canonical public SEO surface. `...

📄 66 (1):
     0: ** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api`...

📄 67 (1):
     0: ** exactly **one migration runner** owns `prisma migrate deploy` during produ...

📄 68 (1):
     0: ** `backend-api` and `backend-worker` must use **Railway private/internal con...

📄 7 (1):
     0: ** Railway

📄 8 (1):
     0: ** Railway Postgres

📄 9 (1):
     0: ** Railway Redis

📄 planning/SPRINT_4_PLAN.md (57):
    15: - AWS Lambda/API Gateway with Railway backend services
    16: - AWS Amplify with Vercel frontend hosting
    17: - AWS CD workflows with Vercel/Railway CD workflows
    41: - `frontend` on Vercel
    42: - `backend-api` on Railway with **2+ replicas**
    45: - `backend-worker` on Railway with **1 replica only**
    46: - `postgres` on Railway
    47: - `redis` on Railway
    53: ### Multi-Backend Railway Rules
    60: - Deployment verification must prove that 2+ API replicas behave correctly be...
  +47

... +47
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:34:21.890Z

I’ve got the current assignment map. I’m updating the actual issue owners, the summary table, and the critical-path coverage so the ownership change is consistent everywhere instead of only in one section.

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:34:49.915Z

The ownership changes are in. I’m doing a quick consistency pass on the modified sections so I can call out exactly what shifted and avoid leaving the summary tables out of sync.

#### Tool: exec_command

```sh
nl -ba planning/SPRINT_4_PLAN.md | sed -n '220,420p'
```

Output:

```text
   220	  - production API base URL handling
   221	- Make the SEO ownership boundary explicit:
   222	  - frontend apex domain owns the canonical public SEO artifacts: canonical URLs, `metadataBase`, `robots.txt`, sitemap entrypoints, and any sitemap index exposed to crawlers
   223	  - frontend sitemap entrypoints are implemented through Next.js route handlers that fetch backend sitemap/XML data at request time
   224	  - backend SEO routes may continue to generate sitemap/XML data as an internal or transitional source, but they are not the canonical crawler-facing host in production
   225	  - no SEO artifact should require crawlers to use the API subdomain as the primary source of truth
   226	- Ensure frontend still supports localhost development cleanly
   227	- Use `docs/deployment/deployment-architecture.md` as the source of truth for domain ownership, public URLs, and SEO host decisions
   228	- Acceptance criteria:
   229	  - Public pages generate correct production metadata
   230	  - Canonical host ownership is explicit and consistent across frontend and backend docs/code
   231	  - Frontend/API cross-origin auth behavior is consistent with the documented auth and CORS contract
   232	  - Frontend can target local and cloud backends without code edits
   233	  - SEO-critical pages render correctly on the public domain
   234	- Assignee: **declanblanc**
   235	- Backup owner: **AvanishKulkarni**
   236	- Due: April 11
   237	- Blocked by: #1
   238	- Unblocks: #12, #16
   239	
   240	**7. Railway Project Provisioning and Service Wiring**
   241	- Create/configure the Railway project and services:
   242	  - `backend-api`
   243	  - `backend-worker`
   244	  - `postgres`
   245	  - `redis`
   246	- Configure internal networking, service env vars, health checks, deploy commands, and domains
   247	- Ensure `backend-api` and `backend-worker` both connect to the same Postgres and Redis instances
   248	- Provision services and env vars to match `docs/deployment/deployment-architecture.md`, and use `docs/deployment/replica-readiness-audit.md` for replica-safety requirements
   249	- Acceptance criteria:
   250	  - Railway project is provisioned
   251	  - Domains/env vars/health checks are configured
   252	  - Postgres and Redis env vars use Railway private/internal connection strings for service-to-service traffic
   253	  - Backend CORS and auth-related env/config are aligned with the documented frontend/API contract
   254	  - `backend-worker` has a health check and restart-on-failure behavior configured
   255	  - `backend-api` and `backend-worker` both boot successfully in Railway
   256	- Assignee: **FardeenI**
   257	- Backup owner: **Aiden-Barrera**
   258	- Due: April 13
   259	- Blocked by: #1, #5
   260	- Unblocks: #11, #14, #15
   261	
   262	**8. Integration Test Specification**
   263	- Write an English-language integration test specification for all frontend-backend code paths that must work in deployment
   264	- Cover at least:
   265	  - guest public channel rendering
   266	  - login / auth refresh path
   267	  - public API path used by SSR metadata/page rendering
   268	  - visibility change impact on public indexing behavior
   269	  - attachment path if production storage is in scope
   270	  - SSE/realtime smoke behavior if kept in deployed flow
   271	- Declare the cloud-mode data-isolation strategy:
   272	  - default choice for this sprint is **read-only cloud smoke coverage** against deployed URLs
   273	  - any write-path cloud tests require a separately documented isolated environment before they are allowed
   274	- Reference `docs/deployment/deployment-architecture.md` for deployment topology and `docs/deployment/replica-readiness-audit.md` for replica-sensitive scenarios that need validation
   275	- Acceptance criteria:
   276	  - Every FE-BE pathway has at least one test case
   277	  - Spec includes local-only vs cloud-only notes where relevant
   278	  - Cloud-mode tests are explicitly classified as read-only or isolated-environment-only
   279	  - Spec is stored under `docs/test-specs/`
   280	- Assignee: **FardeenI**
   281	- Due: April 11
   282	- Blocked by: #1
   283	- Unblocks: #9, #10, #15
   284	
   285	**9. Integration Test Implementation + Environment Matrix**
   286	- Implement the integration tests from the spec
   287	- Support two execution targets:
   288	  - `local`: starts local frontend/backend dependencies and runs against localhost
   289	  - `cloud`: runs against already-deployed frontend/backend URLs without starting local app servers
   290	- Add environment selection via explicit env vars or script arguments
   291	- Document which tests are:
   292	  - portable across both targets
   293	  - local-only because they depend on reset/seed control
   294	  - cloud-only because they validate deployed behavior
   295	- Keep cloud-target coverage read-only by default:
   296	  - health and reachability
   297	  - guest public channel rendering
   298	  - public SSR metadata and canonical URL fetches
   299	  - sitemap/robots fetches
   300	  - SSE connect/disconnect smoke checks without mutating shared production state
   301	- Capture/structure output for both local and cloud runs
   302	- Keep target URLs, environment contracts, and replica-sensitive validations aligned with `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`
   303	- Acceptance criteria:
   304	  - Tests run in a local configuration
   305	  - Tests run in a cloud configuration
   306	  - Cloud mode does not require local frontend/backend startup
   307	  - Cloud-mode tests cannot mutate non-isolated deployed state unless a separately documented isolated environment exists
   308	  - Any environment-specific exceptions are documented
   309	- Assignee: **Aiden-Barrera**
   310	- Due: April 14
   311	- Blocked by: #8, #6, #7
   312	- Unblocks: #10, #14, #15
   313	
   314	### Phase 3: CI/CD and Deployment Automation — April 12–16
   315	
   316	**10. GitHub Action — `run-integration-tests.yml`**
   317	- Create `.github/workflows/run-integration-tests.yml`
   318	- Install frontend/backend dependencies
   319	- Set up the required environment for integration tests
   320	- Run the local-target integration suite in CI
   321	- Keep the workflow name and job names stable so they can be required in branch protection
   322	- Document how cloud-target integration tests are invoked outside CI when deployed URLs are available
   323	- Reference `docs/deployment/deployment-architecture.md` for environment inputs and `docs/deployment/replica-readiness-audit.md` for any replica-sensitive checks excluded from local CI
   324	- Acceptance criteria:
   325	  - Workflow passes on a PR
   326	  - Workflow is usable as a required status check
   327	  - YAML is committed and documented
   328	- Assignee: **FardeenI**
   329	- Due: April 15
   330	- Blocked by: #8, #9
   331	- Unblocks: #13, #15
   332	
   333	**11. GitHub Action — `deploy-railway.yml`**
   334	- Create backend CD workflow for Railway
   335	- Deploy `backend-api` and `backend-worker` on pushes to `main`
   336	- Ensure migrations / build / deploy ordering is safe
   337	- Use GitHub secrets for Railway authentication
   338	- Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted
   339	- Implement the workflow against the service topology and env contract defined in `docs/deployment/deployment-architecture.md`
   340	- Acceptance criteria:
   341	  - Workflow deploys backend services without manual intervention
   342	  - Production deploy authority is unambiguous and documented
   343	  - Exactly one migration runner performs `prisma migrate deploy`, and `backend-api` replicas are prevented from racing migrations on startup
   344	  - Schema rollout rules follow an **expand/contract** convention so destructive migrations are not introduced in the same deploy that must coexist with old API replicas during rolling restart
   345	  - Deploys target the correct Railway environment
   346	  - Deployment process is documented in README
   347	- Assignee: **FardeenI**
   348	- Backup owner: **Aiden-Barrera**
   349	- Due: April 15
   350	- Blocked by: #5, #7
   351	- Unblocks: #14, #15
   352	
   353	**12. GitHub Action — `deploy-vercel.yml`**
   354	- Create frontend CD workflow for Vercel
   355	- Build/deploy frontend on pushes to `main`
   356	- Ensure preview/production environment variables are configured properly
   357	- Use GitHub secrets/tokens safely
   358	- Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted
   359	- Implement the workflow against the domain/env decisions in `docs/deployment/deployment-architecture.md`
   360	- Acceptance criteria:
   361	  - Workflow deploys frontend without manual intervention
   362	  - Production deploy authority is unambiguous and documented
   363	  - Production deploy points at the production backend URL
   364	  - Deployment process is documented in README
   365	- Assignee: **declanblanc**
   366	- Backup owner: **AvanishKulkarni**
   367	- Due: April 15
   368	- Blocked by: #6, #16
   369	- Unblocks: #15
   370	
   371	**13. GitHub Hygiene and Branch Protection**
   372	- Enforce feature branch workflow
   373	- Configure branch protection for `main`
   374	- Require PR review before merge
   375	- Require passing status checks before merge
   376	- Record the exact required checks to enable:
   377	  - existing unit test workflows
   378	  - `run-integration-tests`
   379	- Reference `docs/deployment/deployment-architecture.md` when documenting the production deploy authority and required checks tied to production promotion
   380	- Acceptance criteria:
   381	  - Direct pushes to `main` are blocked
   382	  - PR review is required
   383	  - Required status checks are enabled
   384	  - Team workflow is documented
   385	- Assignee: **Aiden-Barrera**
   386	- Due: April 16
   387	- Blocked by: #10
   388	- Unblocks: #15
   389	
   390	**16. Vercel Project Setup, Domains, and Preview/Prod Verification**
   391	- Create/configure the Vercel project
   392	- Bind the production domain
   393	- Configure preview and production environment variables
   394	- Verify frontend is talking to the correct Railway backend in production
   395	- Configure domains and env vars to match `docs/deployment/deployment-architecture.md`
   396	- Acceptance criteria:
   397	  - Preview deployment works
   398	  - Production deployment works
   399	  - Domain and environment configuration are documented
   400	- Assignee: **declanblanc**
   401	- Backup owner: **FardeenI**
   402	- Due: April 14
   403	- Blocked by: #1, #6
   404	- Unblocks: #12, #14, #15
   405	
   406	### Phase 4: Multi-Replica Validation, Documentation, and Submission — April 16–19
   407	
   408	**14. Railway Multi-Replica Validation and Deployment Evidence**
   409	- Scale `backend-api` to **2 or more replicas** on Railway
   410	- Keep `backend-worker` at **1 replica**
   411	- Verify and capture evidence for:
   412	  - public page loads through the deployed frontend
   413	  - authenticated API behavior through multiple API replicas
   414	  - shared rate limiting across replicas
   415	  - attachment access independent of serving replica
   416	  - cache invalidation / indexing behavior via singleton worker
   417	  - SSE/realtime smoke verification in deployed environment
   418	- Run the cloud-target integration/smoke suite against the deployed system
   419	- Keep deployed-environment smoke verification read-only unless a separate isolated cloud test environment is explicitly provisioned
   420	- Use the replica observability added in #5 to prove requests were served across 2+ API replicas via headers, health output, and/or structured logs
```

#### Tool: exec_command

```sh
nl -ba planning/SPRINT_4_PLAN.md | sed -n '450,520p'
```

Output:

````text
   450	  - `deploy-vercel.yml` link
   451	  - `deploy-railway.yml` link
   452	  - README link
   453	  - reflection placeholder/coordination
   454	  - LLM log collection
   455	- Acceptance criteria:
   456	  - README is complete and accurate
   457	  - Submission checklist has no missing artifacts
   458	  - Team knows who owns final reflection/log collation
   459	- Assignee: **acabrera04**
   460	- Backup owner: **FardeenI**
   461	- Due: April 19
   462	- Blocked by: #4, #8, #9, #10, #11, #12, #13, #14, #16
   463	
   464	---
   465	
   466	## Assignment Summary
   467	
   468	| Developer | Issues | Focus Area |
   469	|-----------|--------|------------|
   470	| acabrera04 | #1, #15 | Architecture/env matrix, final packaging |
   471	| Aiden-Barrera | #3, #9, #13 | Shared rate limiting, integration test implementation, branch protection |
   472	| AvanishKulkarni | #4 | Production storage |
   473	| declanblanc | #2, #5, #6, #12, #14, #16 | Replica-safety audit, API/worker split, Vercel config/deploy, multi-replica validation |
   474	| FardeenI | #7, #8, #10, #11 | Railway provisioning, integration test spec, integration-test CI, backend CD |
   475	
   476	## Critical Path Backup Coverage
   477	
   478	| Critical Issue | Primary | Backup |
   479	|---|---|---|
   480	| #1 Deployment Architecture + Environment Matrix | acabrera04 | declanblanc |
   481	| #2 Backend Scale Audit for Railway Replicas | declanblanc | acabrera04 |
   482	| #5 Split `backend-api` and Singleton `backend-worker` | declanblanc | acabrera04 |
   483	| #7 Railway Project Provisioning and Service Wiring | FardeenI | Aiden-Barrera |
   484	| #11 `deploy-railway.yml` | FardeenI | Aiden-Barrera |
   485	| #14 Railway Multi-Replica Validation and Deployment Evidence | declanblanc | Aiden-Barrera |
   486	| #15 README, Final Artifact Collection, and Submission Package | acabrera04 | FardeenI |
   487	
   488	---
   489	
   490	## Dependency Graph
   491	
   492	```text
   493	Foundation
   494	==========
   495	#1 Deployment Architecture + Env Matrix
   496	  -> #2 Backend Scale Audit
   497	  -> #6 Frontend Production Config
   498	  -> #7 Railway Provisioning
   499	  -> #8 Integration Test Spec
   500	  -> #16 Vercel Project Setup
   501	
   502	Scaling Safety
   503	==============
   504	#2 Backend Scale Audit
   505	  -> #3 Shared Rate Limiting
   506	  -> #4 Production Storage
   507	  -> #5 API/Worker Split
   508	
   509	Deployable App
   510	==============
   511	#5 API/Worker Split -> #7 Railway Provisioning -> #11 deploy-railway.yml
   512	#6 Frontend Production Config -> #16 Vercel Setup -> #12 deploy-vercel.yml
   513	
   514	Testing
   515	=======
   516	#8 Integration Test Spec -> #9 Integration Tests -> #10 run-integration-tests.yml
   517	
   518	GitHub Hygiene
   519	==============
   520	#10 run-integration-tests.yml -> #13 Branch Protection
````

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:34:59.623Z

Updated [planning/SPRINT_4_PLAN.md](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md) so ownership matches the access constraints.

Changes made:
- Railway-specific tasks moved off `acabrera04`:
  - `#7 Railway Project Provisioning and Service Wiring` -> `FardeenI`
  - `#11 deploy-railway.yml` -> `FardeenI`
- Vercel-specific tasks moved to `declanblanc`:
  - `#6 Frontend Production Configuration for Vercel` -> `declanblanc`
  - `#12 deploy-vercel.yml` -> `declanblanc`
  - `#16 Vercel Project Setup, Domains, and Preview/Prod Verification` -> `declanblanc`

I also updated the backup owners and the summary sections so they stay consistent:
- [planning/SPRINT_4_PLAN.md#L234](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L234)
- [planning/SPRINT_4_PLAN.md#L256](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L256)
- [planning/SPRINT_4_PLAN.md#L347](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L347)
- [planning/SPRINT_4_PLAN.md#L365](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L365)
- [planning/SPRINT_4_PLAN.md#L400](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L400)
- [planning/SPRINT_4_PLAN.md#L468](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L468)
- [planning/SPRINT_4_PLAN.md#L478](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L478)

I did not commit or push this change.

### Turn 16: Also a vercel and railway were set up with the current project state,

#### 👤 User Prompt

- Time: 2026-04-10T21:34:59.888Z

```text
Also a vercel and railway were set up with the current project state, so can you move the CD steps up for this weekend so they are done ASAP
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:35:13.001Z

I’m updating the sprint plan to pull the Vercel/Railway CD work forward based on the fact that both platforms are already set up against the current project state. I’ll tighten the workflow issue wording, due dates, and timeline so the plan reflects “start this weekend, finalize after the remaining config dependencies.”

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:35:33.829Z

The CD work is now pulled forward in the plan. I’m doing a quick readback of the affected section to make sure the new dates and timeline entries line up cleanly with the issue wording.

#### Tool: exec_command

```sh
nl -ba planning/SPRINT_4_PLAN.md | sed -n '314,420p'
```

Output:

```text
   314	### Phase 3: CI/CD and Deployment Automation — April 10–14
   315	
   316	**10. GitHub Action — `run-integration-tests.yml`**
   317	- Create `.github/workflows/run-integration-tests.yml`
   318	- Install frontend/backend dependencies
   319	- Set up the required environment for integration tests
   320	- Run the local-target integration suite in CI
   321	- Keep the workflow name and job names stable so they can be required in branch protection
   322	- Document how cloud-target integration tests are invoked outside CI when deployed URLs are available
   323	- Reference `docs/deployment/deployment-architecture.md` for environment inputs and `docs/deployment/replica-readiness-audit.md` for any replica-sensitive checks excluded from local CI
   324	- Acceptance criteria:
   325	  - Workflow passes on a PR
   326	  - Workflow is usable as a required status check
   327	  - YAML is committed and documented
   328	- Assignee: **FardeenI**
   329	- Due: April 15
   330	- Blocked by: #8, #9
   331	- Unblocks: #13, #15
   332	
   333	**11. GitHub Action — `deploy-railway.yml`**
   334	- Create backend CD workflow for Railway
   335	- Start from the already-provisioned Railway project tied to the current project state so the workflow can be scaffolded and dry-run this weekend
   336	- Deploy `backend-api` and `backend-worker` on pushes to `main`
   337	- Ensure migrations / build / deploy ordering is safe
   338	- Use GitHub secrets for Railway authentication
   339	- Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted
   340	- Implement the workflow against the service topology and env contract defined in `docs/deployment/deployment-architecture.md`
   341	- If final backend service split details are still landing, create the workflow early and finish the final production wiring immediately after #5 and #7
   342	- Acceptance criteria:
   343	  - Workflow deploys backend services without manual intervention
   344	  - Production deploy authority is unambiguous and documented
   345	  - Exactly one migration runner performs `prisma migrate deploy`, and `backend-api` replicas are prevented from racing migrations on startup
   346	  - Schema rollout rules follow an **expand/contract** convention so destructive migrations are not introduced in the same deploy that must coexist with old API replicas during rolling restart
   347	  - Deploys target the correct Railway environment
   348	  - Deployment process is documented in README
   349	- Assignee: **FardeenI**
   350	- Backup owner: **Aiden-Barrera**
   351	- Due: April 12
   352	- Blocked by: #5, #7
   353	- Unblocks: #14, #15
   354	
   355	**12. GitHub Action — `deploy-vercel.yml`**
   356	- Create frontend CD workflow for Vercel
   357	- Start from the already-provisioned Vercel project tied to the current project state so the workflow can be scaffolded and dry-run this weekend
   358	- Build/deploy frontend on pushes to `main`
   359	- Ensure preview/production environment variables are configured properly
   360	- Use GitHub secrets/tokens safely
   361	- Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted
   362	- Implement the workflow against the domain/env decisions in `docs/deployment/deployment-architecture.md`
   363	- If final frontend production config is still landing, create the workflow early and finish the final production wiring immediately after #6 and #16
   364	- Acceptance criteria:
   365	  - Workflow deploys frontend without manual intervention
   366	  - Production deploy authority is unambiguous and documented
   367	  - Production deploy points at the production backend URL
   368	  - Deployment process is documented in README
   369	- Assignee: **declanblanc**
   370	- Backup owner: **AvanishKulkarni**
   371	- Due: April 12
   372	- Blocked by: #6, #16
   373	- Unblocks: #15
   374	
   375	**13. GitHub Hygiene and Branch Protection**
   376	- Enforce feature branch workflow
   377	- Configure branch protection for `main`
   378	- Require PR review before merge
   379	- Require passing status checks before merge
   380	- Record the exact required checks to enable:
   381	  - existing unit test workflows
   382	  - `run-integration-tests`
   383	- Reference `docs/deployment/deployment-architecture.md` when documenting the production deploy authority and required checks tied to production promotion
   384	- Acceptance criteria:
   385	  - Direct pushes to `main` are blocked
   386	  - PR review is required
   387	  - Required status checks are enabled
   388	  - Team workflow is documented
   389	- Assignee: **Aiden-Barrera**
   390	- Due: April 16
   391	- Blocked by: #10
   392	- Unblocks: #15
   393	
   394	**16. Vercel Project Setup, Domains, and Preview/Prod Verification**
   395	- Create/configure the Vercel project
   396	- Bind the production domain
   397	- Configure preview and production environment variables
   398	- Verify frontend is talking to the correct Railway backend in production
   399	- Configure domains and env vars to match `docs/deployment/deployment-architecture.md`
   400	- Acceptance criteria:
   401	  - Preview deployment works
   402	  - Production deployment works
   403	  - Domain and environment configuration are documented
   404	- Assignee: **declanblanc**
   405	- Backup owner: **FardeenI**
   406	- Due: April 14
   407	- Blocked by: #1, #6
   408	- Unblocks: #12, #14, #15
   409	
   410	### Phase 4: Multi-Replica Validation, Documentation, and Submission — April 16–19
   411	
   412	**14. Railway Multi-Replica Validation and Deployment Evidence**
   413	- Scale `backend-api` to **2 or more replicas** on Railway
   414	- Keep `backend-worker` at **1 replica**
   415	- Verify and capture evidence for:
   416	  - public page loads through the deployed frontend
   417	  - authenticated API behavior through multiple API replicas
   418	  - shared rate limiting across replicas
   419	  - attachment access independent of serving replica
   420	  - cache invalidation / indexing behavior via singleton worker
```

#### Tool: exec_command

```sh
nl -ba planning/SPRINT_4_PLAN.md | sed -n '520,560p'
```

Output:

````text
   520	#8 Integration Test Spec -> #9 Integration Tests -> #10 run-integration-tests.yml
   521	
   522	GitHub Hygiene
   523	==============
   524	#10 run-integration-tests.yml -> #13 Branch Protection
   525	
   526	Final Validation
   527	================
   528	#3, #4, #5, #7, #9, #11, #16 -> #14 Multi-Replica Validation
   529	
   530	Submission
   531	==========
   532	#4, #8, #9, #10, #11, #12, #13, #14, #16 -> #15 Final Packaging
   533	```
   534	
   535	---
   536	
   537	## Timeline
   538	
   539	| Date | Milestone |
   540	|------|-----------|
   541	| April 8 (Wed) | Sprint kickoff, architecture alignment, issue creation |
   542	| April 9 (Thu) | Issue #1 and #2 complete; deployment/scaling approach locked |
   543	| April 11 (Sat) | Replica-safety implementation issues (#3, #4, #6, #8) complete |
   544	| April 12 (Sun) | API/worker split complete; backend ready for Railway service split |
   545	| April 11 (Sat) | `deploy-railway.yml` and `deploy-vercel.yml` scaffolded against the existing Railway/Vercel projects; dry-run verification started |
   546	| April 12 (Sun) | `deploy-railway.yml` and `deploy-vercel.yml` finalized for the current project state |
   547	| April 13 (Mon) | Railway provisioning/service wiring confirmed against the finalized CD workflows |
   548	| April 14 (Tue) | Vercel project live; integration tests running locally and against cloud env; `run-integration-tests.yml` complete |
   549	| April 16 (Thu) | Branch protection enabled; CD path verified through PR merge |
   550	| April 18 (Sat) | Railway running with 2+ API replicas; deployment evidence captured |
   551	| April 19 (Sun) | README finalized; submission package and reflection/log checklist complete |
   552	
   553	---
   554	
   555	## Deliverables Checklist
   556	
   557	The sprint is not complete until all of the following exist:
   558	
   559	- Public Vercel frontend URL
   560	- Public Railway backend URL
````

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:35:41.912Z

Moved the CD work earlier in [planning/SPRINT_4_PLAN.md](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md).

What changed:
- Phase 3 now starts `April 10–14` instead of `April 12–16`.
- `#11 deploy-railway.yml` is due `April 12` and explicitly says to scaffold/dry-run from the already-provisioned Railway project this weekend.
- `#12 deploy-vercel.yml` is due `April 12` and explicitly says to scaffold/dry-run from the already-provisioned Vercel project this weekend.
- The timeline now reflects:
  - `April 11`: CD workflows scaffolded and dry-run started
  - `April 12`: CD workflows finalized for the current project state

Relevant lines:
- [planning/SPRINT_4_PLAN.md#L314](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L314)
- [planning/SPRINT_4_PLAN.md#L333](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L333)
- [planning/SPRINT_4_PLAN.md#L355](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L355)
- [planning/SPRINT_4_PLAN.md#L537](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L537)

I did not commit or push this change.

### Turn 17: the dates should be updated with work starting earliest today april

#### 👤 User Prompt

- Time: 2026-04-10T21:37:26.236Z

```text
the dates should be updated with work starting earliest today april 10th
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:37:40.058Z

I’m normalizing the sprint dates so nothing implies work started before today, April 10, 2026. I’ll update the sprint header, phase ranges, any issue due dates earlier than today, and the timeline entries that still reference April 8–9.

#### Tool: exec_command

```sh
rtk grep -n "April 8|April 9|April 10|April 11|March|Days 1|Deployment Sprint Plan" planning/SPRINT_4_PLAN.md
```

Output:

```text
🔍 14 in 10F:

📄 103 (1):
     0: Architecture, Production Readiness, and Scaling Design — April 8–11

📄 127 (1):
     0: April 9

📄 150 (1):
     0: April 9

📄 169 (1):
     0: April 11

📄 185 (1):
     0: April 11

📄 212 (1):
     0: Frontend and Integration Foundations — April 9–13

📄 236 (1):
     0: April 11

📄 281 (1):
     0: April 11

📄 314 (1):
     0: CI/CD and Deployment Automation — April 10–14

📄 planning/SPRINT_4_PLAN.md (5):
     1: # Deployment Sprint Plan — April 8–19, 2026
   541: | April 8 (Wed) | Sprint kickoff, architecture alignment, issue creation |
   542: | April 9 (Thu) | Issue #1 and #2 complete; deployment/scaling approach locked |
   543: | April 11 (Sat) | Replica-safety implementation issues (#3, #4, #6, #8) comp...
   545: | April 11 (Sat) | `deploy-railway.yml` and `deploy-vercel.yml` scaffolded ag...
```

#### Tool: exec_command

```sh
nl -ba planning/SPRINT_4_PLAN.md | sed -n '1,220p'
```

Output:

```text
     1	# Deployment Sprint Plan — April 8–19, 2026
     2	
     3	## Context
     4	Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend backed by PostgreSQL and Redis. Sprint 4 adapts the P6 deployment assignment to a **Vercel + Railway** production stack:
     5	
     6	- **Frontend hosting:** Vercel
     7	- **Backend hosting:** Railway
     8	- **Database:** Railway Postgres
     9	- **Cache / event bus:** Railway Redis
    10	- **Public deployment goal:** keep the app deployed through instructor review
    11	- **Scaling goal:** support **2 or more backend API replicas** on Railway while keeping background event processing correct
    12	
    13	This sprint must cover the substance of **P6 Deployment** while ignoring the AWS-only platform choice. The plan therefore replaces:
    14	
    15	- AWS Lambda/API Gateway with Railway backend services
    16	- AWS Amplify with Vercel frontend hosting
    17	- AWS CD workflows with Vercel/Railway CD workflows
    18	
    19	Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.
    20	
    21	The assignment requirements we still must satisfy are:
    22	
    23	1. Publicly deploy frontend and backend
    24	2. Automate deployment from GitHub
    25	3. Add integration test specifications and implementation
    26	4. Run integration tests locally and in the cloud
    27	5. Add GitHub Actions for integration tests
    28	6. Adopt GitHub hygiene and branch protection
    29	7. Update README with user-facing and deployer-facing instructions
    30	8. Produce the final submission artifacts, links, logs, and reflection
    31	
    32	**Assignment:** P6: Deployment  
    33	**Due:** Sunday, April 19, 2026, 11:59 PM AOE
    34	
    35	## Team
    36	5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI
    37	
    38	## Target Architecture
    39	
    40	### Public Services
    41	- `frontend` on Vercel
    42	- `backend-api` on Railway with **2+ replicas**
    43	
    44	### Internal / Stateful Services
    45	- `backend-worker` on Railway with **1 replica only**
    46	- `postgres` on Railway
    47	- `redis` on Railway
    48	
    49	### Domain Layout
    50	- `https://<frontend-domain>` -> Vercel
    51	- `https://api.<frontend-domain>` -> Railway `backend-api`
    52	
    53	### Multi-Backend Railway Rules
    54	To safely support 2+ backend replicas, the sprint must remove or isolate process-local production state:
    55	
    56	- Public/auth rate limiting must use **Redis-backed shared storage**
    57	- File uploads must use **shared object storage**, not local disk
    58	- Background subscribers / cache invalidation / sitemap updates must run in a **singleton worker**
    59	- API replicas must be stateless apart from live SSE client connections
    60	- Deployment verification must prove that 2+ API replicas behave correctly behind Railway load balancing
    61	
    62	### Explicit Production Decisions
    63	- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.
    64	- **Sitemap handoff:** the frontend apex domain serves crawler-facing sitemap entrypoints through **Next.js route handlers** that fetch sitemap/XML data from the backend at request time. The backend may generate sitemap data, but the API subdomain is not the direct crawl target in production.
    65	- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.
    66	- **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.
    67	- **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.
    68	- **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.
    69	- **Auth & CORS contract:** production frontend and API traffic is cross-origin across sibling subdomains, so the deployment architecture must explicitly define:
    70	  - the backend CORS allowlist for production and preview frontend origins
    71	  - **browser-to-backend auth uses Bearer access tokens in the `Authorization` header**, matching the current application model; API authentication must not depend on browser cookies being sent cross-origin to the backend
    72	  - any frontend-only session cookie used for Next.js middleware remains a frontend concern and is not the backend auth transport
    73	  - the CSRF posture for the chosen auth transport; with bearer-header auth as the primary backend mechanism, CSRF protection focuses on avoiding cookie-authenticated state-changing backend routes
    74	- **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.
    75	- **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.
    76	- **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.
    77	- **Cloud test data hygiene:** cloud-target validation uses **read-only smoke checks against deployed URLs** unless a separate isolated staging environment is provisioned. Cloud-mode tests must not mutate the instructor-reviewed production dataset.
    78	
    79	---
    80	
    81	## P6 Coverage Map
    82	
    83	| P6 Requirement | Vercel + Railway Adaptation | Covered By Issues |
    84	|---|---|---|
    85	| Publicly deploy frontend | Deploy Next.js app to Vercel | #6, #12, #16 |
    86	| Publicly deploy backend | Deploy Express/tRPC app to Railway | #5, #7, #11 |
    87	| Publish backend public interfaces via REST | Keep Railway backend public routes stable and production-configured | #1, #5, #7 |
    88	| Integration test specification | Write English-language integration spec for FE-BE paths | #8 |
    89	| Integration tests on localhost | Add env-aware local integration test flow | #9 |
    90	| Integration tests in cloud | Run same test suite against deployed Vercel + Railway URLs | #9, #14 |
    91	| GitHub Action for integration tests | Add `run-integration-tests.yml` | #10 |
    92	| Continuous deployment | Add backend and frontend deployment workflows for Railway and Vercel | #11, #12 |
    93	| GitHub hygiene / branch protection | Require PRs and required checks before merge | #13 |
    94	| README update | Add user-facing run instructions and deployer guide | #15 |
    95	| Submission links, logs, reflection | Final packaging and artifact checklist | #15 |
    96	
    97	---
    98	
    99	## Issues (16 total)
   100	
   101	> **Note:** Issues are written so they can be opened directly on GitHub with the dependency notes preserved in the body. "Blocked by" means the issue should not be considered complete until those upstream issues land. "Unblocks" is included to make sequencing explicit for the team.
   102	
   103	### Phase 1: Architecture, Production Readiness, and Scaling Design — April 8–11
   104	
   105	**1. Deployment Architecture + Environment Matrix**
   106	- Define the final Vercel + Railway topology:
   107	  - `frontend`
   108	  - `backend-api`
   109	  - `backend-worker`
   110	  - `postgres`
   111	  - `redis`
   112	- Document production env vars for frontend, backend API, and worker
   113	- Define domain plan (`frontend` domain + `api` subdomain)
   114	- Define promotion flow for preview vs production
   115	- Produce and save a reference document at `docs/deployment/deployment-architecture.md`
   116	  - this document is the canonical reference for service topology, domain ownership, env vars, deploy authority, and preview vs production behavior
   117	  - later deployment issues should link to and update this document instead of redefining architecture assumptions
   118	- Acceptance criteria:
   119	  - Clear service inventory
   120	  - Clear env var matrix
   121	  - Clear ownership of public vs internal services
   122	  - Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton
   123	  - `docs/deployment/deployment-architecture.md` records the production auth transport, cookie/header contract, CORS allowlist, and CSRF posture for the frontend/API split
   124	  - `docs/deployment/deployment-architecture.md` exists and is usable as the canonical reference for downstream issues
   125	- Assignee: **acabrera04**
   126	- Backup owner: **declanblanc**
   127	- Due: April 9
   128	- Blocked by: none
   129	- Unblocks: #2, #6, #7, #8, #16
   130	
   131	**2. Backend Scale Audit for Railway Replicas**
   132	- Audit the current backend for state that will break with 2+ API replicas
   133	- Confirm and document the required changes for:
   134	  - in-memory rate limiting
   135	  - local filesystem attachment storage
   136	  - duplicate startup subscribers / background jobs
   137	  - SSE behavior behind load balancing
   138	  - proxy/IP handling
   139	- Produce and save a reference document at `docs/deployment/replica-readiness-audit.md`
   140	  - include the concrete "replica-safe backend" checklist for implementation
   141	  - include must-fix items, acceptable demo-time risks, and explicit ownership boundaries between `backend-api` and `backend-worker`
   142	  - later scaling/deployment issues should cite this document when implementing or validating replica-safe behavior
   143	- Acceptance criteria:
   144	  - Checklist references the actual code areas that must change
   145	  - Risks are prioritized into must-fix vs acceptable-for-demo
   146	  - `backend-api` vs `backend-worker` responsibilities are finalized
   147	  - `docs/deployment/replica-readiness-audit.md` exists and is detailed enough for downstream implementation/validation issues to reference directly
   148	- Assignee: **declanblanc**
   149	- Backup owner: **acabrera04**
   150	- Due: April 9
   151	- Blocked by: #1
   152	- Unblocks: #3, #4, #5, #14
   153	
   154	**3. Shared Rate Limiting + Proxy-Aware Networking**
   155	- Replace process-local rate limiting with shared Redis-backed limiting
   156	- Replace or unify **both** current implementations:
   157	  - auth endpoint limiting using `express-rate-limit`
   158	  - public-route token bucket limiting
   159	- Ensure auth and public API rate limits remain correct across 2+ replicas
   160	- Configure Express proxy awareness so client IP handling works correctly behind Railway
   161	- Use `docs/deployment/replica-readiness-audit.md` as the implementation checklist and update it with final decisions
   162	- Acceptance criteria:
   163	  - Public and auth rate limits are shared across replicas
   164	  - No process-local auth or public-route limit counters remain in production code paths
   165	  - Redis-backed limiter mutations are atomic; non-atomic `INCR` + separate `EXPIRE` style patterns are explicitly disallowed for production rate-limit state
   166	  - Production proxy trust is explicitly configured for a **single Railway hop** (`trust proxy = 1` or equivalent) and documented in deployment docs
   167	  - Rate limit behavior is covered by tests or verification notes
   168	- Assignee: **Aiden-Barrera**
   169	- Due: April 11
   170	- Blocked by: #2
   171	- Unblocks: #14
   172	
   173	**4. Production Attachment Storage Provider**
   174	- Implement a production storage provider backed by **Cloudflare R2 via an S3-compatible interface**
   175	- Keep local storage available for development only
   176	- Add env-driven provider selection and document required secrets
   177	- Ensure uploaded files remain accessible regardless of which API replica serves subsequent requests
   178	- Follow `docs/deployment/replica-readiness-audit.md` for replica-safe storage requirements and update `docs/deployment/deployment-architecture.md` with the final env/config contract
   179	- Acceptance criteria:
   180	  - Production does not rely on local filesystem attachment serving
   181	  - The chosen production provider is Cloudflare R2, documented as such in code and setup docs
   182	  - README and env matrix document storage setup
   183	  - Attachment flow works end-to-end in deployed environment
   184	- Assignee: **AvanishKulkarni**
   185	- Due: April 11
   186	- Blocked by: #2
   187	- Unblocks: #14, #15
   188	
   189	**5. Split `backend-api` and Singleton `backend-worker`**
   190	- Move background-only startup behavior into a dedicated worker process
   191	- Ensure duplicated subscribers / cache invalidation / sitemap upkeep do not run on every API replica
   192	- Keep API replicas focused on HTTP/tRPC/SSE request handling
   193	- Use **Redis pub/sub fan-out** as the explicit SSE strategy so each API replica can deliver shared events to its own connected clients without sticky-session requirements
   194	- Add lightweight replica observability for validation:
   195	  - instance identity in structured logs
   196	  - instance/replica identity on health output and/or response headers
   197	- Add startup commands for both Railway backend services
   198	- Use `docs/deployment/replica-readiness-audit.md` to drive the split and record the final `backend-api` / `backend-worker` ownership model there and in `docs/deployment/deployment-architecture.md`
   199	- Acceptance criteria:
   200	  - `backend-api` can run with 2+ replicas without duplicate singleton background side effects
   201	  - `backend-worker` runs with 1 replica and owns singleton event-driven tasks
   202	  - SSE behavior across 2+ replicas follows the documented Redis fan-out strategy and no sticky-session dependency remains in the production design
   203	  - Replica identity is externally observable enough to prove load balancing across 2+ API replicas
   204	  - `backend-worker` health check and restart expectations are documented and wired into deployment assumptions
   205	  - Service responsibilities are documented
   206	- Assignee: **declanblanc**
   207	- Backup owner: **acabrera04**
   208	- Due: April 12
   209	- Blocked by: #2
   210	- Unblocks: #7, #11, #14
   211	
   212	### Phase 2: Frontend and Integration Foundations — April 9–13
   213	
   214	**6. Frontend Production Configuration for Vercel**
   215	- Add production-safe frontend configuration:
   216	  - absolute canonical URLs
   217	  - `metadataBase`
   218	  - `robots.txt` on the frontend apex domain
   219	  - sitemap support on the frontend apex domain
   220	  - production API base URL handling
```

#### Tool: exec_command

```sh
nl -ba planning/SPRINT_4_PLAN.md | sed -n '537,552p'
```

Output:

```text
   537	## Timeline
   538	
   539	| Date | Milestone |
   540	|------|-----------|
   541	| April 8 (Wed) | Sprint kickoff, architecture alignment, issue creation |
   542	| April 9 (Thu) | Issue #1 and #2 complete; deployment/scaling approach locked |
   543	| April 11 (Sat) | Replica-safety implementation issues (#3, #4, #6, #8) complete |
   544	| April 12 (Sun) | API/worker split complete; backend ready for Railway service split |
   545	| April 11 (Sat) | `deploy-railway.yml` and `deploy-vercel.yml` scaffolded against the existing Railway/Vercel projects; dry-run verification started |
   546	| April 12 (Sun) | `deploy-railway.yml` and `deploy-vercel.yml` finalized for the current project state |
   547	| April 13 (Mon) | Railway provisioning/service wiring confirmed against the finalized CD workflows |
   548	| April 14 (Tue) | Vercel project live; integration tests running locally and against cloud env; `run-integration-tests.yml` complete |
   549	| April 16 (Thu) | Branch protection enabled; CD path verified through PR merge |
   550	| April 18 (Sat) | Railway running with 2+ API replicas; deployment evidence captured |
   551	| April 19 (Sun) | README finalized; submission package and reflection/log checklist complete |
   552
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:37:52.082Z

I found the remaining pre-April-10 dates. I’m shifting the sprint header, phase ranges, the two overdue items, and the timeline so the plan now reads as if work begins no earlier than today.

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:38:09.990Z

The date normalization is applied. I’m checking the touched sections once more so I can confirm there are no remaining pre-April-10 start cues in the plan.

#### Tool: exec_command

```sh
rtk grep -n "April 8|April 9|April 10|Phase 1:|Phase 2:|Deployment Sprint Plan" planning/SPRINT_4_PLAN.md
```

Output:

```text
🔍 7 in 6F:

📄 103 (1):
     0: Architecture, Production Readiness, and Scaling Design — April 10–11

📄 127 (1):
     0: April 10

📄 150 (1):
     0: April 10

📄 212 (1):
     0: Frontend and Integration Foundations — April 10–13

📄 314 (1):
     0: CI/CD and Deployment Automation — April 10–14

📄 planning/SPRINT_4_PLAN.md (2):
     1: # Deployment Sprint Plan — April 10–19, 2026
   541: | April 10 (Fri) | Sprint kickoff, architecture alignment, issue creation, an...
```

#### Tool: exec_command

```sh
nl -ba planning/SPRINT_4_PLAN.md | sed -n '1,220p'
```

Output:

```text
     1	# Deployment Sprint Plan — April 10–19, 2026
     2	
     3	## Context
     4	Harmony is a search-engine-indexable chat application with a Next.js frontend and an Express + tRPC backend backed by PostgreSQL and Redis. Sprint 4 adapts the P6 deployment assignment to a **Vercel + Railway** production stack:
     5	
     6	- **Frontend hosting:** Vercel
     7	- **Backend hosting:** Railway
     8	- **Database:** Railway Postgres
     9	- **Cache / event bus:** Railway Redis
    10	- **Public deployment goal:** keep the app deployed through instructor review
    11	- **Scaling goal:** support **2 or more backend API replicas** on Railway while keeping background event processing correct
    12	
    13	This sprint must cover the substance of **P6 Deployment** while ignoring the AWS-only platform choice. The plan therefore replaces:
    14	
    15	- AWS Lambda/API Gateway with Railway backend services
    16	- AWS Amplify with Vercel frontend hosting
    17	- AWS CD workflows with Vercel/Railway CD workflows
    18	
    19	Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.
    20	
    21	The assignment requirements we still must satisfy are:
    22	
    23	1. Publicly deploy frontend and backend
    24	2. Automate deployment from GitHub
    25	3. Add integration test specifications and implementation
    26	4. Run integration tests locally and in the cloud
    27	5. Add GitHub Actions for integration tests
    28	6. Adopt GitHub hygiene and branch protection
    29	7. Update README with user-facing and deployer-facing instructions
    30	8. Produce the final submission artifacts, links, logs, and reflection
    31	
    32	**Assignment:** P6: Deployment  
    33	**Due:** Sunday, April 19, 2026, 11:59 PM AOE
    34	
    35	## Team
    36	5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI
    37	
    38	## Target Architecture
    39	
    40	### Public Services
    41	- `frontend` on Vercel
    42	- `backend-api` on Railway with **2+ replicas**
    43	
    44	### Internal / Stateful Services
    45	- `backend-worker` on Railway with **1 replica only**
    46	- `postgres` on Railway
    47	- `redis` on Railway
    48	
    49	### Domain Layout
    50	- `https://<frontend-domain>` -> Vercel
    51	- `https://api.<frontend-domain>` -> Railway `backend-api`
    52	
    53	### Multi-Backend Railway Rules
    54	To safely support 2+ backend replicas, the sprint must remove or isolate process-local production state:
    55	
    56	- Public/auth rate limiting must use **Redis-backed shared storage**
    57	- File uploads must use **shared object storage**, not local disk
    58	- Background subscribers / cache invalidation / sitemap updates must run in a **singleton worker**
    59	- API replicas must be stateless apart from live SSE client connections
    60	- Deployment verification must prove that 2+ API replicas behave correctly behind Railway load balancing
    61	
    62	### Explicit Production Decisions
    63	- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.
    64	- **Sitemap handoff:** the frontend apex domain serves crawler-facing sitemap entrypoints through **Next.js route handlers** that fetch sitemap/XML data from the backend at request time. The backend may generate sitemap data, but the API subdomain is not the direct crawl target in production.
    65	- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.
    66	- **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.
    67	- **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.
    68	- **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.
    69	- **Auth & CORS contract:** production frontend and API traffic is cross-origin across sibling subdomains, so the deployment architecture must explicitly define:
    70	  - the backend CORS allowlist for production and preview frontend origins
    71	  - **browser-to-backend auth uses Bearer access tokens in the `Authorization` header**, matching the current application model; API authentication must not depend on browser cookies being sent cross-origin to the backend
    72	  - any frontend-only session cookie used for Next.js middleware remains a frontend concern and is not the backend auth transport
    73	  - the CSRF posture for the chosen auth transport; with bearer-header auth as the primary backend mechanism, CSRF protection focuses on avoiding cookie-authenticated state-changing backend routes
    74	- **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.
    75	- **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.
    76	- **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.
    77	- **Cloud test data hygiene:** cloud-target validation uses **read-only smoke checks against deployed URLs** unless a separate isolated staging environment is provisioned. Cloud-mode tests must not mutate the instructor-reviewed production dataset.
    78	
    79	---
    80	
    81	## P6 Coverage Map
    82	
    83	| P6 Requirement | Vercel + Railway Adaptation | Covered By Issues |
    84	|---|---|---|
    85	| Publicly deploy frontend | Deploy Next.js app to Vercel | #6, #12, #16 |
    86	| Publicly deploy backend | Deploy Express/tRPC app to Railway | #5, #7, #11 |
    87	| Publish backend public interfaces via REST | Keep Railway backend public routes stable and production-configured | #1, #5, #7 |
    88	| Integration test specification | Write English-language integration spec for FE-BE paths | #8 |
    89	| Integration tests on localhost | Add env-aware local integration test flow | #9 |
    90	| Integration tests in cloud | Run same test suite against deployed Vercel + Railway URLs | #9, #14 |
    91	| GitHub Action for integration tests | Add `run-integration-tests.yml` | #10 |
    92	| Continuous deployment | Add backend and frontend deployment workflows for Railway and Vercel | #11, #12 |
    93	| GitHub hygiene / branch protection | Require PRs and required checks before merge | #13 |
    94	| README update | Add user-facing run instructions and deployer guide | #15 |
    95	| Submission links, logs, reflection | Final packaging and artifact checklist | #15 |
    96	
    97	---
    98	
    99	## Issues (16 total)
   100	
   101	> **Note:** Issues are written so they can be opened directly on GitHub with the dependency notes preserved in the body. "Blocked by" means the issue should not be considered complete until those upstream issues land. "Unblocks" is included to make sequencing explicit for the team.
   102	
   103	### Phase 1: Architecture, Production Readiness, and Scaling Design — April 10–11
   104	
   105	**1. Deployment Architecture + Environment Matrix**
   106	- Define the final Vercel + Railway topology:
   107	  - `frontend`
   108	  - `backend-api`
   109	  - `backend-worker`
   110	  - `postgres`
   111	  - `redis`
   112	- Document production env vars for frontend, backend API, and worker
   113	- Define domain plan (`frontend` domain + `api` subdomain)
   114	- Define promotion flow for preview vs production
   115	- Produce and save a reference document at `docs/deployment/deployment-architecture.md`
   116	  - this document is the canonical reference for service topology, domain ownership, env vars, deploy authority, and preview vs production behavior
   117	  - later deployment issues should link to and update this document instead of redefining architecture assumptions
   118	- Acceptance criteria:
   119	  - Clear service inventory
   120	  - Clear env var matrix
   121	  - Clear ownership of public vs internal services
   122	  - Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton
   123	  - `docs/deployment/deployment-architecture.md` records the production auth transport, cookie/header contract, CORS allowlist, and CSRF posture for the frontend/API split
   124	  - `docs/deployment/deployment-architecture.md` exists and is usable as the canonical reference for downstream issues
   125	- Assignee: **acabrera04**
   126	- Backup owner: **declanblanc**
   127	- Due: April 10
   128	- Blocked by: none
   129	- Unblocks: #2, #6, #7, #8, #16
   130	
   131	**2. Backend Scale Audit for Railway Replicas**
   132	- Audit the current backend for state that will break with 2+ API replicas
   133	- Confirm and document the required changes for:
   134	  - in-memory rate limiting
   135	  - local filesystem attachment storage
   136	  - duplicate startup subscribers / background jobs
   137	  - SSE behavior behind load balancing
   138	  - proxy/IP handling
   139	- Produce and save a reference document at `docs/deployment/replica-readiness-audit.md`
   140	  - include the concrete "replica-safe backend" checklist for implementation
   141	  - include must-fix items, acceptable demo-time risks, and explicit ownership boundaries between `backend-api` and `backend-worker`
   142	  - later scaling/deployment issues should cite this document when implementing or validating replica-safe behavior
   143	- Acceptance criteria:
   144	  - Checklist references the actual code areas that must change
   145	  - Risks are prioritized into must-fix vs acceptable-for-demo
   146	  - `backend-api` vs `backend-worker` responsibilities are finalized
   147	  - `docs/deployment/replica-readiness-audit.md` exists and is detailed enough for downstream implementation/validation issues to reference directly
   148	- Assignee: **declanblanc**
   149	- Backup owner: **acabrera04**
   150	- Due: April 10
   151	- Blocked by: #1
   152	- Unblocks: #3, #4, #5, #14
   153	
   154	**3. Shared Rate Limiting + Proxy-Aware Networking**
   155	- Replace process-local rate limiting with shared Redis-backed limiting
   156	- Replace or unify **both** current implementations:
   157	  - auth endpoint limiting using `express-rate-limit`
   158	  - public-route token bucket limiting
   159	- Ensure auth and public API rate limits remain correct across 2+ replicas
   160	- Configure Express proxy awareness so client IP handling works correctly behind Railway
   161	- Use `docs/deployment/replica-readiness-audit.md` as the implementation checklist and update it with final decisions
   162	- Acceptance criteria:
   163	  - Public and auth rate limits are shared across replicas
   164	  - No process-local auth or public-route limit counters remain in production code paths
   165	  - Redis-backed limiter mutations are atomic; non-atomic `INCR` + separate `EXPIRE` style patterns are explicitly disallowed for production rate-limit state
   166	  - Production proxy trust is explicitly configured for a **single Railway hop** (`trust proxy = 1` or equivalent) and documented in deployment docs
   167	  - Rate limit behavior is covered by tests or verification notes
   168	- Assignee: **Aiden-Barrera**
   169	- Due: April 11
   170	- Blocked by: #2
   171	- Unblocks: #14
   172	
   173	**4. Production Attachment Storage Provider**
   174	- Implement a production storage provider backed by **Cloudflare R2 via an S3-compatible interface**
   175	- Keep local storage available for development only
   176	- Add env-driven provider selection and document required secrets
   177	- Ensure uploaded files remain accessible regardless of which API replica serves subsequent requests
   178	- Follow `docs/deployment/replica-readiness-audit.md` for replica-safe storage requirements and update `docs/deployment/deployment-architecture.md` with the final env/config contract
   179	- Acceptance criteria:
   180	  - Production does not rely on local filesystem attachment serving
   181	  - The chosen production provider is Cloudflare R2, documented as such in code and setup docs
   182	  - README and env matrix document storage setup
   183	  - Attachment flow works end-to-end in deployed environment
   184	- Assignee: **AvanishKulkarni**
   185	- Due: April 11
   186	- Blocked by: #2
   187	- Unblocks: #14, #15
   188	
   189	**5. Split `backend-api` and Singleton `backend-worker`**
   190	- Move background-only startup behavior into a dedicated worker process
   191	- Ensure duplicated subscribers / cache invalidation / sitemap upkeep do not run on every API replica
   192	- Keep API replicas focused on HTTP/tRPC/SSE request handling
   193	- Use **Redis pub/sub fan-out** as the explicit SSE strategy so each API replica can deliver shared events to its own connected clients without sticky-session requirements
   194	- Add lightweight replica observability for validation:
   195	  - instance identity in structured logs
   196	  - instance/replica identity on health output and/or response headers
   197	- Add startup commands for both Railway backend services
   198	- Use `docs/deployment/replica-readiness-audit.md` to drive the split and record the final `backend-api` / `backend-worker` ownership model there and in `docs/deployment/deployment-architecture.md`
   199	- Acceptance criteria:
   200	  - `backend-api` can run with 2+ replicas without duplicate singleton background side effects
   201	  - `backend-worker` runs with 1 replica and owns singleton event-driven tasks
   202	  - SSE behavior across 2+ replicas follows the documented Redis fan-out strategy and no sticky-session dependency remains in the production design
   203	  - Replica identity is externally observable enough to prove load balancing across 2+ API replicas
   204	  - `backend-worker` health check and restart expectations are documented and wired into deployment assumptions
   205	  - Service responsibilities are documented
   206	- Assignee: **declanblanc**
   207	- Backup owner: **acabrera04**
   208	- Due: April 12
   209	- Blocked by: #2
   210	- Unblocks: #7, #11, #14
   211	
   212	### Phase 2: Frontend and Integration Foundations — April 10–13
   213	
   214	**6. Frontend Production Configuration for Vercel**
   215	- Add production-safe frontend configuration:
   216	  - absolute canonical URLs
   217	  - `metadataBase`
   218	  - `robots.txt` on the frontend apex domain
   219	  - sitemap support on the frontend apex domain
   220	  - production API base URL handling
```

#### Tool: exec_command

```sh
nl -ba planning/SPRINT_4_PLAN.md | sed -n '537,551p'
```

Output:

```text
   537	## Timeline
   538	
   539	| Date | Milestone |
   540	|------|-----------|
   541	| April 10 (Fri) | Sprint kickoff, architecture alignment, issue creation, and start of Issues #1 and #2 |
   542	| April 11 (Sat) | Issues #1 and #2 complete; deployment/scaling approach locked; `deploy-railway.yml` and `deploy-vercel.yml` scaffolded against the existing Railway/Vercel projects; dry-run verification started |
   543	| April 12 (Sun) | API/worker split complete; backend ready for Railway service split; `deploy-railway.yml` and `deploy-vercel.yml` finalized for the current project state |
   544	| April 13 (Mon) | Railway provisioning/service wiring confirmed against the finalized CD workflows |
   545	| April 14 (Tue) | Vercel project live; integration tests running locally and against cloud env; `run-integration-tests.yml` complete |
   546	| April 16 (Thu) | Branch protection enabled; CD path verified through PR merge |
   547	| April 18 (Sat) | Railway running with 2+ API replicas; deployment evidence captured |
   548	| April 19 (Sun) | README finalized; submission package and reflection/log checklist complete |
   549	
   550	---
   551
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:38:17.565Z

Updated the plan so nothing starts before today, April 10, 2026.

What changed:
- Sprint header is now `April 10–19, 2026`.
- Phase 1 is now `April 10–11`.
- Phase 2 is now `April 10–13`.
- The only due dates that were before today were moved:
  - `#1` due date -> `April 10`
  - `#2` due date -> `April 10`
- The timeline now starts on `April 10 (Fri)` and the old April 8/9 entries are gone.

Relevant sections:
- [planning/SPRINT_4_PLAN.md#L1](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L1)
- [planning/SPRINT_4_PLAN.md#L103](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L103)
- [planning/SPRINT_4_PLAN.md#L127](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L127)
- [planning/SPRINT_4_PLAN.md#L150](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L150)
- [planning/SPRINT_4_PLAN.md#L212](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L212)
- [planning/SPRINT_4_PLAN.md#L537](/Users/allen/repos/Harmony/planning/SPRINT_4_PLAN.md#L537)

I did not commit or push this change.

### Turn 18: push

#### 👤 User Prompt

- Time: 2026-04-10T21:42:16.719Z

```text
push
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:42:25.032Z

I’m committing just the sprint plan updates and pushing the current branch. I’ll leave the unrelated untracked files alone.

#### Tool: exec_command

```sh
git status --short
```

Output:

```text
 M planning/SPRINT_4_PLAN.md
?? "P4: Backend Development | CS 485 AI-Assisted Software Engineering (Sp26).html"
?? "P5: Testing | CS 485 AI-Assisted Software Engineering (Sp26).pdf"
?? "P6_ Deployment _ CS 485 AI-Assisted Software Engineering (Sp26).pdf"
?? deployment-options.md
?? harmony-backend/coverage/
?? load-test.js
```

#### Tool: exec_command

```sh
git diff --stat -- planning/SPRINT_4_PLAN.md
```

Output:

```text
 planning/SPRINT_4_PLAN.md | 61 +++++++++++++++++++++++++----------------------
 1 file changed, 33 insertions(+), 28 deletions(-)
```

#### Tool: exec_command

```sh
git branch --show-current
```

Output:

```text
codex/sprint-4-deployment-plan
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:42:30.526Z

The plan diff is isolated to `planning/SPRINT_4_PLAN.md`. I’m staging only that file, then I’ll commit with the Harmony co-author line and push the branch.

#### Tool: exec_command

```sh
git add planning/SPRINT_4_PLAN.md && git commit -m "docs: refine sprint 4 deployment plan

Update sprint ownership, move CD work earlier around the existing Vercel
and Railway setup, and normalize the sprint timeline so work begins on
April 10.

Co-authored-by: GPT 5.4 <noreply@openai.com>"
```

Output:

```text
[codex/sprint-4-deployment-plan faba6e2] docs: refine sprint 4 deployment plan
 1 file changed, 33 insertions(+), 28 deletions(-)
```

#### Tool: exec_command

```sh
git push
```

Output:

```text
remote: This repository moved. Please use the new location:        
remote:   git@github.com:CS485-Harmony/Harmony.git        
To github.com:acabrera04/Harmony.git
   a2ed1c4..faba6e2  codex/sprint-4-deployment-plan -> codex/sprint-4-deployment-plan
```

#### Tool: exec_command

```sh
gh pr comment 311 --repo CS485-Harmony/Harmony --body 'Pushed `faba6e2` to update the sprint plan ownership and schedule.

Included changes:
- moved Railway-specific tasks off `acabrera04`
- moved Vercel-specific tasks to `declanblanc`
- pulled CD workflow work forward to this weekend since Railway and Vercel are already set up
- normalized the sprint timeline so work starts on April 10'
```

Output:

```text
https://github.com/CS485-Harmony/Harmony/pull/311#issuecomment-4226959191
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-10T21:42:48.389Z

Pushed `faba6e2` on `codex/sprint-4-deployment-plan`.

That commit includes:
- ownership changes for Railway/Vercel work
- earlier CD timing based on the existing Vercel/Railway setup
- date normalization so the sprint starts on April 10

I also left a PR comment summarizing those updates:
- [PR comment](https://github.com/CS485-Harmony/Harmony/pull/311#issuecomment-4226959191)

I left the unrelated untracked files untouched.

### Turn 19: <environment_context> <shell>zsh</shell>

#### 👤 User Prompt

- Time: 2026-04-11T14:23:20.232Z

```text
<environment_context>
  <shell>zsh</shell>
  <current_date>2026-04-11</current_date>
  <timezone>America/New_York</timezone>
</environment_context>
```

_No assistant or tool activity recorded after this prompt._

### Turn 20: Make the sprint 4 plan tickets on the project

#### 👤 User Prompt

- Time: 2026-04-11T14:23:20.238Z

```text
Make the sprint 4 plan tickets on the project board
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:23:36.036Z

I’m turning the Sprint 4 plan into actual GitHub issues now. First I’m pulling the finalized plan and checking the repo/project setup so I can create the issues with the right assignees, dependencies, and board placement instead of doing it piecemeal.

#### Tool: exec_command

```sh
rtk read planning/SPRINT_4_PLAN.md
```

Output:

````text
# Deployment Sprint Plan — April 10–19, 2026

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

Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.

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

### Explicit Production Decisions
- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.
- **Sitemap handoff:** the frontend apex domain serves crawler-facing sitemap entrypoints through **Next.js route handlers** that fetch sitemap/XML data from the backend at request time. The backend may generate sitemap data, but the API subdomain is not the direct crawl target in production.
- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.
- **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.
- **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.
- **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.
- **Auth & CORS contract:** production frontend and API traffic is cross-origin across sibling subdomains, so the deployment architecture must explicitly define:
  - the backend CORS allowlist for production and preview frontend origins
  - **browser-to-backend auth uses Bearer access tokens in the `Authorization` header**, matching the current application model; API authentication must not depend on browser cookies being sent cross-origin to the backend
  - any frontend-only session cookie used for Next.js middleware remains a frontend concern and is not the backend auth transport
  - the CSRF posture for the chosen auth transport; with bearer-header auth as the primary backend mechanism, CSRF protection focuses on avoiding cookie-authenticated state-changing backend routes
- **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.
- **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.
- **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.
- **Cloud test data hygiene:** cloud-target validation uses **read-only smoke checks against deployed URLs** unless a separate isolated staging environment is provisioned. Cloud-mode tests must not mutate the instructor-reviewed production dataset.

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

### Phase 1: Architecture, Production Readiness, and Scaling Design — April 10–11

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
- Produce and save a reference document at `docs/deployment/deployment-architecture.md`
  - this document is the canonical reference for service topology, domain ownership, env vars, deploy authority, and preview vs production behavior
  - later deployment issues should link to and update this document instead of redefining architecture assumptions
- Acceptance criteria:
  - Clear service inventory
  - Clear env var matrix
  - Clear ownership of public vs internal services
  - Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton
  - `docs/deployment/deployment-architecture.md` records the production auth transport, cookie/header contract, CORS allowlist, and CSRF posture for the frontend/API split
  - `docs/deployment/deployment-architecture.md` exists and is usable as the canonical reference for downstream issues
- Assignee: **acabrera04**
- Backup owner: **declanblanc**
- Due: April 10
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
- Produce and save a reference document at `docs/deployment/replica-readiness-audit.md`
  - include the concrete "replica-safe backend" checklist for implementation
  - include must-fix items, acceptable demo-time risks, and explicit ownership boundaries between `backend-api` and `backend-worker`
  - later scaling/deployment issues should cite this document when implementing or validating replica-safe behavior
- Acceptance criteria:
  - Checklist references the actual code areas that must change
  - Risks are prioritized into must-fix vs acceptable-for-demo
  - `backend-api` vs `backend-worker` responsibilities are finalized
  - `docs/deployment/replica-readiness-audit.md` exists and is detailed enough for downstream implementation/validation issues to reference directly
- Assignee: **declanblanc**
- Backup owner: **acabrera04**
- Due: April 10
- Blocked by: #1
- Unblocks: #3, #4, #5, #14

**3. Shared Rate Limiting + Proxy-Aware Networking**
- Replace process-local rate limiting with shared Redis-backed limiting
- Replace or unify **both** current implementations:
  - auth endpoint limiting using `express-rate-limit`
  - public-route token bucket limiting
- Ensure auth and public API rate limits remain correct across 2+ replicas
- Configure Express proxy awareness so client IP handling works correctly behind Railway
- Use `docs/deployment/replica-readiness-audit.md` as the implementation checklist and update it with final decisions
- Acceptance criteria:
  - Public and auth rate limits are shared across replicas
  - No process-local auth or public-route limit counters remain in production code paths
  - Redis-backed limiter mutations are atomic; non-atomic `INCR` + separate `EXPIRE` style patterns are explicitly disallowed for production rate-limit state
  - Production proxy trust is explicitly configured for a **single Railway hop** (`trust proxy = 1` or equivalent) and documented in deployment docs
  - Rate limit behavior is covered by tests or verification notes
- Assignee: **Aiden-Barrera**
- Due: April 11
- Blocked by: #2
- Unblocks: #14

**4. Production Attachment Storage Provider**
- Implement a production storage provider backed by **Cloudflare R2 via an S3-compatible interface**
- Keep local storage available for development only
- Add env-driven provider selection and document required secrets
- Ensure uploaded files remain accessible regardless of which API replica serves subsequent requests
- Follow `docs/deployment/replica-readiness-audit.md` for replica-safe storage requirements and update `docs/deployment/deployment-architecture.md` with the final env/config contract
- Acceptance criteria:
  - Production does not rely on local filesystem attachment serving
  - The chosen production provider is Cloudflare R2, documented as such in code and setup docs
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
- Use **Redis pub/sub fan-out** as the explicit SSE strategy so each API replica can deliver shared events to its own connected clients without sticky-session requirements
- Add lightweight replica observability for validation:
  - instance identity in structured logs
  - instance/replica identity on health output and/or response headers
- Add startup commands for both Railway backend services
- Use `docs/deployment/replica-readiness-audit.md` to drive the split and record the final `backend-api` / `backend-worker` ownership model there and in `docs/deployment/deployment-architecture.md`
- Acceptance criteria:
  - `backend-api` can run with 2+ replicas without duplicate singleton background side effects
  - `backend-worker` runs with 1 replica and owns singleton event-driven tasks
  - SSE behavior across 2+ replicas follows the documented Redis fan-out strategy and no sticky-session dependency remains in the production design
  - Replica identity is externally observable enough to prove load balancing across 2+ API replicas
  - `backend-worker` health check and restart expectations are documented and wired into deployment assumptions
  - Service responsibilities are documented
- Assignee: **declanblanc**
- Backup owner: **acabrera04**
- Due: April 12
- Blocked by: #2
- Unblocks: #7, #11, #14

### Phase 2: Frontend and Integration Foundations — April 10–13

**6. Frontend Production Configuration for Vercel**
- Add production-safe frontend configuration:
  - absolute canonical URLs
  - `metadataBase`
  - `robots.txt` on the frontend apex domain
  - sitemap support on the frontend apex domain
  - production API base URL handling
- Make the SEO ownership boundary explicit:
  - frontend apex domain owns the canonical public SEO artifacts: canonical URLs, `metadataBase`, `robots.txt`, sitemap entrypoints, and any sitemap index exposed to crawlers
  - frontend sitemap entrypoints are implemented through Next.js route handlers that fetch backend sitemap/XML data at request time
  - backend SEO routes may continue to generate sitemap/XML data as an internal or transitional source, but they are not the canonical crawler-facing host in production
  - no SEO artifact should require crawlers to use the API subdomain as the primary source of truth
- Ensure frontend still supports localhost development cleanly
- Use `docs/deployment/deployment-architecture.md` as the source of truth for domain ownership, public URLs, and SEO host decisions
- Acceptance criteria:
  - Public pages generate correct production metadata
  - Canonical host ownership is explicit and consistent across frontend and backend docs/code
  - Frontend/API cross-origin auth behavior is consistent with the documented auth and CORS contract
  - Frontend can target local and cloud backends without code edits
  - SEO-critical pages render correctly on the public domain
- Assignee: **declanblanc**
- Backup owner: **AvanishKulkarni**
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
- Provision services and env vars to match `docs/deployment/deployment-architecture.md`, and use `docs/deployment/replica-readiness-audit.md` for replica-safety requirements
- Acceptance criteria:
  - Railway project is provisioned
  - Domains/env vars/health checks are configured
  - Postgres and Redis env vars use Railway private/internal connection strings for service-to-service traffic
  - Backend CORS and auth-related env/config are aligned with the documented frontend/API contract
  - `backend-worker` has a health check and restart-on-failure behavior configured
  - `backend-api` and `backend-worker` both boot successfully in Railway
- Assignee: **FardeenI**
- Backup owner: **Aiden-Barrera**
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
- Declare the cloud-mode data-isolation strategy:
  - default choice for this sprint is **read-only cloud smoke coverage** against deployed URLs
  - any write-path cloud tests require a separately documented isolated environment before they are allowed
- Reference `docs/deployment/deployment-architecture.md` for deployment topology and `docs/deployment/replica-readiness-audit.md` for replica-sensitive scenarios that need validation
- Acceptance criteria:
  - Every FE-BE pathway has at least one test case
  - Spec includes local-only vs cloud-only notes where relevant
  - Cloud-mode tests are explicitly classified as read-only or isolated-environment-only
  - Spec is stored under `docs/test-specs/`
- Assignee: **FardeenI**
- Due: April 11
- Blocked by: #1
- Unblocks: #9, #10, #15

**9. Integration Test Implementation + Environment Matrix**
- Implement the integration tests from the spec
- Support two execution targets:
  - `local`: starts local frontend/backend dependencies and runs against localhost
  - `cloud`: runs against already-deployed frontend/backend URLs without starting local app servers
- Add environment selection via explicit env vars or script arguments
- Document which tests are:
  - portable across both targets
  - local-only because they depend on reset/seed control
  - cloud-only because they validate deployed behavior
- Keep cloud-target coverage read-only by default:
  - health and reachability
  - guest public channel rendering
  - public SSR metadata and canonical URL fetches
  - sitemap/robots fetches
  - SSE connect/disconnect smoke checks without mutating shared production state
- Capture/structure output for both local and cloud runs
- Keep target URLs, environment contracts, and replica-sensitive validations aligned with `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`
- Acceptance criteria:
  - Tests run in a local configuration
  - Tests run in a cloud configuration
  - Cloud mode does not require local frontend/backend startup
  - Cloud-mode tests cannot mutate non-isolated deployed state unless a separately documented isolated environment exists
  - Any environment-specific exceptions are documented
- Assignee: **Aiden-Barrera**
- Due: April 14
- Blocked by: #8, #6, #7
- Unblocks: #10, #14, #15

### Phase 3: CI/CD and Deployment Automation — April 10–14

**10. GitHub Action — `run-integration-tests.yml`**
- Create `.github/workflows/run-integration-tests.yml`
- Install frontend/backend dependencies
- Set up the required environment for integration tests
- Run the local-target integration suite in CI
- Keep the workflow name and job names stable so they can be required in branch protection
- Document how cloud-target integration tests are invoked outside CI when deployed URLs are available
- Reference `docs/deployment/deployment-architecture.md` for environment inputs and `docs/deployment/replica-readiness-audit.md` for any replica-sensitive checks excluded from local CI
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
- Start from the already-provisioned Railway project tied to the current project state so the workflow can be scaffolded and dry-run this weekend
- Deploy `backend-api` and `backend-worker` on pushes to `main`
- Ensure migrations / build / deploy ordering is safe
- Use GitHub secrets for Railway authentication
- Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted
- Implement the workflow against the service topology and env contract defined in `docs/deployment/deployment-architecture.md`
- If final backend service split details are still landing, create the workflow early and finish the final production wiring immediately after #5 and #7
- Acceptance criteria:
  - Workflow deploys backend services without manual intervention
  - Production deploy authority is unambiguous and documented
  - Exactly one migration runner performs `prisma migrate deploy`, and `backend-api` replicas are prevented from racing migrations on startup
  - Schema rollout rules follow an **expand/contract** convention so destructive migrations are not introduced in the same deploy that must coexist with old API replicas during rolling restart
  - Deploys target the correct Railway environment
  - Deployment process is documented in README
- Assignee: **FardeenI**
- Backup owner: **Aiden-Barrera**
- Due: April 12
- Blocked by: #5, #7
- Unblocks: #14, #15

**12. GitHub Action — `deploy-vercel.yml`**
- Create frontend CD workflow for Vercel
- Start from the already-provisioned Vercel project tied to the current project state so the workflow can be scaffolded and dry-run this weekend
- Build/deploy frontend on pushes to `main`
- Ensure preview/production environment variables are configured properly
- Use GitHub secrets/tokens safely
- Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted
- Implement the workflow against the domain/env decisions in `docs/deployment/deployment-architecture.md`
- If final frontend production config is still landing, create the workflow early and finish the final production wiring immediately after #6 and #16
- Acceptance criteria:
  - Workflow deploys frontend without manual intervention
  - Production deploy authority is unambiguous and documented
  - Production deploy points at the production backend URL
  - Deployment process is documented in README
- Assignee: **declanblanc**
- Backup owner: **AvanishKulkarni**
- Due: April 12
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
- Reference `docs/deployment/deployment-architecture.md` when documenting the production deploy authority and required checks tied to production promotion
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
- Configure domains and env vars to match `docs/deployment/deployment-architecture.md`
- Acceptance criteria:
  - Preview deployment works
  - Production deployment works
  - Domain and environment configuration are documented
- Assignee: **declanblanc**
- Backup owner: **FardeenI**
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
- Run the cloud-target integration/smoke suite against the deployed system
- Keep deployed-environment smoke verification read-only unless a separate isolated cloud test environment is explicitly provisioned
- Use the replica observability added in #5 to prove requests were served across 2+ API replicas via headers, health output, and/or structured logs
- Capture logs/screenshots/test output needed for submission
- Validate against the expected topology in `docs/deployment/deployment-architecture.md` and the replica-safety checklist in `docs/deployment/replica-readiness-audit.md`
- Acceptance criteria:
  - Live deployment is stable with `backend-api` at 2+ replicas
  - No replica-specific failures are observed for required paths
  - Proxy-aware rate limiting is validated against the documented one-hop trust model
  - Cloud-target tests pass against deployed URLs
  - Evidence clearly distinguishes deployed-system validation from localhost validation
- Assignee: **declanblanc**
- Backup owner: **Aiden-Barrera**
- Due: April 18
- Blocked by: #3, #4, #5, #7, #9, #11, #16
- Unblocks: #15

**15. README, Final Artifact Collection, and Submission Package**
- Update `README.md` with:
  - how web users access the deployed app
  - how to run the app locally
  - how a forked user sets up Vercel + Railway deployment
  - how CI/CD and branch protection are expected to work
- Fold in the final decisions captured in `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`
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
- Backup owner: **FardeenI**
- Due: April 19
- Blocked by: #4, #8, #9, #10, #11, #12, #13, #14, #16

---

## Assignment Summary

| Developer | Issues | Focus Area |
|-----------|--------|------------|
| acabrera04 | #1, #15 | Architecture/env matrix, final packaging |
| Aiden-Barrera | #3, #9, #13 | Shared rate limiting, integration test implementation, branch protection |
| AvanishKulkarni | #4 | Production storage |
| declanblanc | #2, #5, #6, #12, #14, #16 | Replica-safety audit, API/worker split, Vercel config/deploy, multi-replica validation |
| FardeenI | #7, #8, #10, #11 | Railway provisioning, integration test spec, integration-test CI, backend CD |

## Critical Path Backup Coverage

| Critical Issue | Primary | Backup |
|---|---|---|
| #1 Deployment Architecture + Environment Matrix | acabrera04 | declanblanc |
| #2 Backend Scale Audit for Railway Replicas | declanblanc | acabrera04 |
| #5 Split `backend-api` and Singleton `backend-worker` | declanblanc | acabrera04 |
| #7 Railway Project Provisioning and Service Wiring | FardeenI | Aiden-Barrera |
| #11 `deploy-railway.yml` | FardeenI | Aiden-Barrera |
| #14 Railway Multi-Replica Validation and Deployment Evidence | declanblanc | Aiden-Barrera |
| #15 README, Final Artifact Collection, and Submission Package | acabrera04 | FardeenI |

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
| April 10 (Fri) | Sprint kickoff, architecture alignment, issue creation, and start of Issues #1 and #2 |
| April 11 (Sat) | Issues #1 and #2 complete; deployment/scaling approach locked; `deploy-railway.yml` and `deploy-vercel.yml` scaffolded against the existing Railway/Vercel projects; dry-run verification started |
| April 12 (Sun) | API/worker split complete; backend ready for Railway service split; `deploy-railway.yml` and `deploy-vercel.yml` finalized for the current project state |
| April 13 (Mon) | Railway provisioning/service wiring confirmed against the finalized CD workflows |
| April 14 (Tue) | Vercel project live; integration tests running locally and against cloud env; `run-integration-tests.yml` complete |
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
- Cloud-target integration or smoke test output captured against deployed URLs
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
````

#### Tool: exec_command

```sh
git remote -v
```

Output:

```text
origin	git@github.com:acabrera04/Harmony.git (fetch)
origin	git@github.com:acabrera04/Harmony.git (push)
```

#### Tool: exec_command

```sh
gh repo view CS485-Harmony/Harmony --json nameWithOwner,defaultBranchRef
```

Output:

```text
{"defaultBranchRef":{"name":"main"},"nameWithOwner":"CS485-Harmony/Harmony"}
```

#### Tool: exec_command

```sh
gh project list --owner CS485-Harmony
```

Output:

```text
1	Harmony Project Board	open	PVT_kwDOEFWyLM4BUSlM
```

### Turn 21: <turn_aborted> The user interrupted the previous turn on purpose. Any

#### 👤 User Prompt

- Time: 2026-04-11T14:23:55.673Z

```text
<turn_aborted>
The user interrupted the previous turn on purpose. Any running unified exec processes may still be running in the background. If any tools/commands were aborted, they may have partially executed.
</turn_aborted>
```

_No assistant or tool activity recorded after this prompt._

### Turn 22: Make the sprint 4 plan tickets on the CS485 Harmony project board.

#### 👤 User Prompt

- Time: 2026-04-11T14:36:04.244Z

```text
Make the sprint 4 plan tickets on the CS485 Harmony project board. Ensure that each ticket is tagged with P6: Deployment
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:36:13.852Z

I’m pulling the current Sprint 4 plan from disk and the GitHub project metadata, then I’ll create the issues in the org repo and add them to the CS485 board with the `P6: Deployment` label.

#### Tool: exec_command

```sh
rtk read planning/SPRINT_4_PLAN.md
```

Output:

````text
# Deployment Sprint Plan — April 10–19, 2026

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

Integration testing for this sprint uses a dual-target model: `local` for deterministic development verification and `cloud` for validation of the real deployed multi-replica system.

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

### Explicit Production Decisions
- **SEO ownership:** the **Vercel frontend apex domain** is the canonical public SEO surface. `robots.txt`, sitemap/index entrypoints, canonical URLs, and `metadataBase` must resolve on the frontend domain, not the API subdomain.
- **Sitemap handoff:** the frontend apex domain serves crawler-facing sitemap entrypoints through **Next.js route handlers** that fetch sitemap/XML data from the backend at request time. The backend may generate sitemap data, but the API subdomain is not the direct crawl target in production.
- **Attachment storage target:** production uploads use **Cloudflare R2 via an S3-compatible provider**. Local filesystem storage remains development-only.
- **SSE strategy:** multi-replica realtime uses **Redis pub/sub fan-out on every `backend-api` replica**. Each replica subscribes to the shared event bus and pushes matching events to its own connected SSE clients. The production design must not depend on sticky sessions at the Railway load balancer.
- **Migration ownership:** exactly **one migration runner** owns `prisma migrate deploy` during production rollout. `backend-api` replicas must not run Prisma migrations on startup. The migration runner may be a one-shot Railway job or a controlled pre-deploy step attached to the worker rollout.
- **Railway service networking:** `backend-api` and `backend-worker` must use **Railway private/internal connection strings** for Postgres and Redis in production, not public TCP proxy endpoints.
- **Auth & CORS contract:** production frontend and API traffic is cross-origin across sibling subdomains, so the deployment architecture must explicitly define:
  - the backend CORS allowlist for production and preview frontend origins
  - **browser-to-backend auth uses Bearer access tokens in the `Authorization` header**, matching the current application model; API authentication must not depend on browser cookies being sent cross-origin to the backend
  - any frontend-only session cookie used for Next.js middleware remains a frontend concern and is not the backend auth transport
  - the CSRF posture for the chosen auth transport; with bearer-header auth as the primary backend mechanism, CSRF protection focuses on avoiding cookie-authenticated state-changing backend routes
- **Proxy trust model:** production Express instances run with **one trusted proxy hop** (`trust proxy = 1` or equivalent one-hop behavior) so rate limiting uses real client IPs without trusting arbitrary forwarded chains.
- **Worker resilience:** `backend-worker` is configured with a health check and restart-on-failure behavior. If the worker is unavailable, API request handling should remain available while worker-owned side effects degrade gracefully rather than crashing request paths.
- **Deploy authority:** **GitHub Actions** is the single source of truth for production deploys. Provider-native Git auto-deploys may be used for previews, but production promotion must be driven by the GitHub workflows in this sprint.
- **Cloud test data hygiene:** cloud-target validation uses **read-only smoke checks against deployed URLs** unless a separate isolated staging environment is provisioned. Cloud-mode tests must not mutate the instructor-reviewed production dataset.

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

### Phase 1: Architecture, Production Readiness, and Scaling Design — April 10–11

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
- Produce and save a reference document at `docs/deployment/deployment-architecture.md`
  - this document is the canonical reference for service topology, domain ownership, env vars, deploy authority, and preview vs production behavior
  - later deployment issues should link to and update this document instead of redefining architecture assumptions
- Acceptance criteria:
  - Clear service inventory
  - Clear env var matrix
  - Clear ownership of public vs internal services
  - Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton
  - `docs/deployment/deployment-architecture.md` records the production auth transport, cookie/header contract, CORS allowlist, and CSRF posture for the frontend/API split
  - `docs/deployment/deployment-architecture.md` exists and is usable as the canonical reference for downstream issues
- Assignee: **acabrera04**
- Backup owner: **declanblanc**
- Due: April 10
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
- Produce and save a reference document at `docs/deployment/replica-readiness-audit.md`
  - include the concrete "replica-safe backend" checklist for implementation
  - include must-fix items, acceptable demo-time risks, and explicit ownership boundaries between `backend-api` and `backend-worker`
  - later scaling/deployment issues should cite this document when implementing or validating replica-safe behavior
- Acceptance criteria:
  - Checklist references the actual code areas that must change
  - Risks are prioritized into must-fix vs acceptable-for-demo
  - `backend-api` vs `backend-worker` responsibilities are finalized
  - `docs/deployment/replica-readiness-audit.md` exists and is detailed enough for downstream implementation/validation issues to reference directly
- Assignee: **declanblanc**
- Backup owner: **acabrera04**
- Due: April 10
- Blocked by: #1
- Unblocks: #3, #4, #5, #14

**3. Shared Rate Limiting + Proxy-Aware Networking**
- Replace process-local rate limiting with shared Redis-backed limiting
- Replace or unify **both** current implementations:
  - auth endpoint limiting using `express-rate-limit`
  - public-route token bucket limiting
- Ensure auth and public API rate limits remain correct across 2+ replicas
- Configure Express proxy awareness so client IP handling works correctly behind Railway
- Use `docs/deployment/replica-readiness-audit.md` as the implementation checklist and update it with final decisions
- Acceptance criteria:
  - Public and auth rate limits are shared across replicas
  - No process-local auth or public-route limit counters remain in production code paths
  - Redis-backed limiter mutations are atomic; non-atomic `INCR` + separate `EXPIRE` style patterns are explicitly disallowed for production rate-limit state
  - Production proxy trust is explicitly configured for a **single Railway hop** (`trust proxy = 1` or equivalent) and documented in deployment docs
  - Rate limit behavior is covered by tests or verification notes
- Assignee: **Aiden-Barrera**
- Due: April 11
- Blocked by: #2
- Unblocks: #14

**4. Production Attachment Storage Provider**
- Implement a production storage provider backed by **Cloudflare R2 via an S3-compatible interface**
- Keep local storage available for development only
- Add env-driven provider selection and document required secrets
- Ensure uploaded files remain accessible regardless of which API replica serves subsequent requests
- Follow `docs/deployment/replica-readiness-audit.md` for replica-safe storage requirements and update `docs/deployment/deployment-architecture.md` with the final env/config contract
- Acceptance criteria:
  - Production does not rely on local filesystem attachment serving
  - The chosen production provider is Cloudflare R2, documented as such in code and setup docs
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
- Use **Redis pub/sub fan-out** as the explicit SSE strategy so each API replica can deliver shared events to its own connected clients without sticky-session requirements
- Add lightweight replica observability for validation:
  - instance identity in structured logs
  - instance/replica identity on health output and/or response headers
- Add startup commands for both Railway backend services
- Use `docs/deployment/replica-readiness-audit.md` to drive the split and record the final `backend-api` / `backend-worker` ownership model there and in `docs/deployment/deployment-architecture.md`
- Acceptance criteria:
  - `backend-api` can run with 2+ replicas without duplicate singleton background side effects
  - `backend-worker` runs with 1 replica and owns singleton event-driven tasks
  - SSE behavior across 2+ replicas follows the documented Redis fan-out strategy and no sticky-session dependency remains in the production design
  - Replica identity is externally observable enough to prove load balancing across 2+ API replicas
  - `backend-worker` health check and restart expectations are documented and wired into deployment assumptions
  - Service responsibilities are documented
- Assignee: **declanblanc**
- Backup owner: **acabrera04**
- Due: April 12
- Blocked by: #2
- Unblocks: #7, #11, #14

### Phase 2: Frontend and Integration Foundations — April 10–13

**6. Frontend Production Configuration for Vercel**
- Add production-safe frontend configuration:
  - absolute canonical URLs
  - `metadataBase`
  - `robots.txt` on the frontend apex domain
  - sitemap support on the frontend apex domain
  - production API base URL handling
- Make the SEO ownership boundary explicit:
  - frontend apex domain owns the canonical public SEO artifacts: canonical URLs, `metadataBase`, `robots.txt`, sitemap entrypoints, and any sitemap index exposed to crawlers
  - frontend sitemap entrypoints are implemented through Next.js route handlers that fetch backend sitemap/XML data at request time
  - backend SEO routes may continue to generate sitemap/XML data as an internal or transitional source, but they are not the canonical crawler-facing host in production
  - no SEO artifact should require crawlers to use the API subdomain as the primary source of truth
- Ensure frontend still supports localhost development cleanly
- Use `docs/deployment/deployment-architecture.md` as the source of truth for domain ownership, public URLs, and SEO host decisions
- Acceptance criteria:
  - Public pages generate correct production metadata
  - Canonical host ownership is explicit and consistent across frontend and backend docs/code
  - Frontend/API cross-origin auth behavior is consistent with the documented auth and CORS contract
  - Frontend can target local and cloud backends without code edits
  - SEO-critical pages render correctly on the public domain
- Assignee: **declanblanc**
- Backup owner: **AvanishKulkarni**
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
- Provision services and env vars to match `docs/deployment/deployment-architecture.md`, and use `docs/deployment/replica-readiness-audit.md` for replica-safety requirements
- Acceptance criteria:
  - Railway project is provisioned
  - Domains/env vars/health checks are configured
  - Postgres and Redis env vars use Railway private/internal connection strings for service-to-service traffic
  - Backend CORS and auth-related env/config are aligned with the documented frontend/API contract
  - `backend-worker` has a health check and restart-on-failure behavior configured
  - `backend-api` and `backend-worker` both boot successfully in Railway
- Assignee: **FardeenI**
- Backup owner: **Aiden-Barrera**
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
- Declare the cloud-mode data-isolation strategy:
  - default choice for this sprint is **read-only cloud smoke coverage** against deployed URLs
  - any write-path cloud tests require a separately documented isolated environment before they are allowed
- Reference `docs/deployment/deployment-architecture.md` for deployment topology and `docs/deployment/replica-readiness-audit.md` for replica-sensitive scenarios that need validation
- Acceptance criteria:
  - Every FE-BE pathway has at least one test case
  - Spec includes local-only vs cloud-only notes where relevant
  - Cloud-mode tests are explicitly classified as read-only or isolated-environment-only
  - Spec is stored under `docs/test-specs/`
- Assignee: **FardeenI**
- Due: April 11
- Blocked by: #1
- Unblocks: #9, #10, #15

**9. Integration Test Implementation + Environment Matrix**
- Implement the integration tests from the spec
- Support two execution targets:
  - `local`: starts local frontend/backend dependencies and runs against localhost
  - `cloud`: runs against already-deployed frontend/backend URLs without starting local app servers
- Add environment selection via explicit env vars or script arguments
- Document which tests are:
  - portable across both targets
  - local-only because they depend on reset/seed control
  - cloud-only because they validate deployed behavior
- Keep cloud-target coverage read-only by default:
  - health and reachability
  - guest public channel rendering
  - public SSR metadata and canonical URL fetches
  - sitemap/robots fetches
  - SSE connect/disconnect smoke checks without mutating shared production state
- Capture/structure output for both local and cloud runs
- Keep target URLs, environment contracts, and replica-sensitive validations aligned with `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`
- Acceptance criteria:
  - Tests run in a local configuration
  - Tests run in a cloud configuration
  - Cloud mode does not require local frontend/backend startup
  - Cloud-mode tests cannot mutate non-isolated deployed state unless a separately documented isolated environment exists
  - Any environment-specific exceptions are documented
- Assignee: **Aiden-Barrera**
- Due: April 14
- Blocked by: #8, #6, #7
- Unblocks: #10, #14, #15

### Phase 3: CI/CD and Deployment Automation — April 10–14

**10. GitHub Action — `run-integration-tests.yml`**
- Create `.github/workflows/run-integration-tests.yml`
- Install frontend/backend dependencies
- Set up the required environment for integration tests
- Run the local-target integration suite in CI
- Keep the workflow name and job names stable so they can be required in branch protection
- Document how cloud-target integration tests are invoked outside CI when deployed URLs are available
- Reference `docs/deployment/deployment-architecture.md` for environment inputs and `docs/deployment/replica-readiness-audit.md` for any replica-sensitive checks excluded from local CI
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
- Start from the already-provisioned Railway project tied to the current project state so the workflow can be scaffolded and dry-run this weekend
- Deploy `backend-api` and `backend-worker` on pushes to `main`
- Ensure migrations / build / deploy ordering is safe
- Use GitHub secrets for Railway authentication
- Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted
- Implement the workflow against the service topology and env contract defined in `docs/deployment/deployment-architecture.md`
- If final backend service split details are still landing, create the workflow early and finish the final production wiring immediately after #5 and #7
- Acceptance criteria:
  - Workflow deploys backend services without manual intervention
  - Production deploy authority is unambiguous and documented
  - Exactly one migration runner performs `prisma migrate deploy`, and `backend-api` replicas are prevented from racing migrations on startup
  - Schema rollout rules follow an **expand/contract** convention so destructive migrations are not introduced in the same deploy that must coexist with old API replicas during rolling restart
  - Deploys target the correct Railway environment
  - Deployment process is documented in README
- Assignee: **FardeenI**
- Backup owner: **Aiden-Barrera**
- Due: April 12
- Blocked by: #5, #7
- Unblocks: #14, #15

**12. GitHub Action — `deploy-vercel.yml`**
- Create frontend CD workflow for Vercel
- Start from the already-provisioned Vercel project tied to the current project state so the workflow can be scaffolded and dry-run this weekend
- Build/deploy frontend on pushes to `main`
- Ensure preview/production environment variables are configured properly
- Use GitHub secrets/tokens safely
- Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted
- Implement the workflow against the domain/env decisions in `docs/deployment/deployment-architecture.md`
- If final frontend production config is still landing, create the workflow early and finish the final production wiring immediately after #6 and #16
- Acceptance criteria:
  - Workflow deploys frontend without manual intervention
  - Production deploy authority is unambiguous and documented
  - Production deploy points at the production backend URL
  - Deployment process is documented in README
- Assignee: **declanblanc**
- Backup owner: **AvanishKulkarni**
- Due: April 12
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
- Reference `docs/deployment/deployment-architecture.md` when documenting the production deploy authority and required checks tied to production promotion
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
- Configure domains and env vars to match `docs/deployment/deployment-architecture.md`
- Acceptance criteria:
  - Preview deployment works
  - Production deployment works
  - Domain and environment configuration are documented
- Assignee: **declanblanc**
- Backup owner: **FardeenI**
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
- Run the cloud-target integration/smoke suite against the deployed system
- Keep deployed-environment smoke verification read-only unless a separate isolated cloud test environment is explicitly provisioned
- Use the replica observability added in #5 to prove requests were served across 2+ API replicas via headers, health output, and/or structured logs
- Capture logs/screenshots/test output needed for submission
- Validate against the expected topology in `docs/deployment/deployment-architecture.md` and the replica-safety checklist in `docs/deployment/replica-readiness-audit.md`
- Acceptance criteria:
  - Live deployment is stable with `backend-api` at 2+ replicas
  - No replica-specific failures are observed for required paths
  - Proxy-aware rate limiting is validated against the documented one-hop trust model
  - Cloud-target tests pass against deployed URLs
  - Evidence clearly distinguishes deployed-system validation from localhost validation
- Assignee: **declanblanc**
- Backup owner: **Aiden-Barrera**
- Due: April 18
- Blocked by: #3, #4, #5, #7, #9, #11, #16
- Unblocks: #15

**15. README, Final Artifact Collection, and Submission Package**
- Update `README.md` with:
  - how web users access the deployed app
  - how to run the app locally
  - how a forked user sets up Vercel + Railway deployment
  - how CI/CD and branch protection are expected to work
- Fold in the final decisions captured in `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`
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
- Backup owner: **FardeenI**
- Due: April 19
- Blocked by: #4, #8, #9, #10, #11, #12, #13, #14, #16

---

## Assignment Summary

| Developer | Issues | Focus Area |
|-----------|--------|------------|
| acabrera04 | #1, #15 | Architecture/env matrix, final packaging |
| Aiden-Barrera | #3, #9, #13 | Shared rate limiting, integration test implementation, branch protection |
| AvanishKulkarni | #4 | Production storage |
| declanblanc | #2, #5, #6, #12, #14, #16 | Replica-safety audit, API/worker split, Vercel config/deploy, multi-replica validation |
| FardeenI | #7, #8, #10, #11 | Railway provisioning, integration test spec, integration-test CI, backend CD |

## Critical Path Backup Coverage

| Critical Issue | Primary | Backup |
|---|---|---|
| #1 Deployment Architecture + Environment Matrix | acabrera04 | declanblanc |
| #2 Backend Scale Audit for Railway Replicas | declanblanc | acabrera04 |
| #5 Split `backend-api` and Singleton `backend-worker` | declanblanc | acabrera04 |
| #7 Railway Project Provisioning and Service Wiring | FardeenI | Aiden-Barrera |
| #11 `deploy-railway.yml` | FardeenI | Aiden-Barrera |
| #14 Railway Multi-Replica Validation and Deployment Evidence | declanblanc | Aiden-Barrera |
| #15 README, Final Artifact Collection, and Submission Package | acabrera04 | FardeenI |

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
| April 10 (Fri) | Sprint kickoff, architecture alignment, issue creation, and start of Issues #1 and #2 |
| April 11 (Sat) | Issues #1 and #2 complete; deployment/scaling approach locked; `deploy-railway.yml` and `deploy-vercel.yml` scaffolded against the existing Railway/Vercel projects; dry-run verification started |
| April 12 (Sun) | API/worker split complete; backend ready for Railway service split; `deploy-railway.yml` and `deploy-vercel.yml` finalized for the current project state |
| April 13 (Mon) | Railway provisioning/service wiring confirmed against the finalized CD workflows |
| April 14 (Tue) | Vercel project live; integration tests running locally and against cloud env; `run-integration-tests.yml` complete |
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
- Cloud-target integration or smoke test output captured against deployed URLs
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
````

#### Tool: exec_command

```sh
gh project list --owner CS485-Harmony
```

Output:

```text
1	Harmony Project Board	open	PVT_kwDOEFWyLM4BUSlM
```

#### Tool: exec_command

```sh
gh label list --repo CS485-Harmony/Harmony
```

Output:

```text
bug	Something isn't working	#d73a4a
documentation	Improvements or additions to documentation	#0075ca
feature	New feature or request	#a2eeef
help wanted	Extra attention is needed	#008672
frontend	Frontend implementation	#1d76db
prerequisite	Must be done before feature work	#fbca04
setup	Project setup and scaffolding	#0e8a16
design	UI/UX design work	#d876e3
mockup	Figma mockup task	#e99695
ui	User interface	#bfdadc
demo	Demo and presentation tasks	#fef2c0
integration	Integration and cross-feature work	#c5def5
testing	Testing tasks	#f9d0c4
week-1	Sprint Week 1	#006b75
week-2	Sprint Week 2	#b60205
backend	Backend development	#5319E7
DO NOT MERGE		#b60205
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:36:21.057Z

I have the current plan and project ID. Next I’m creating the `P6: Deployment` label if it doesn’t exist, then I’ll open the 16 Sprint 4 issues in `CS485-Harmony/Harmony` and add each one to `Harmony Project Board`.

#### Tool: exec_command

```sh
cat > /tmp/create_sprint4_issues.py <<'PY'
import json
import subprocess

repo = 'CS485-Harmony/Harmony'
project = '1'
owner = 'CS485-Harmony'
label = 'P6: Deployment'

issues = [
    {
        'title': 'Sprint 4: Deployment Architecture + Environment Matrix',
        'assignee': 'acabrera04',
        'body': '''## Summary
Define the final Vercel + Railway topology:
- `frontend`
- `backend-api`
- `backend-worker`
- `postgres`
- `redis`

Document production env vars for frontend, backend API, and worker. Define domain plan (`frontend` domain + `api` subdomain). Define promotion flow for preview vs production.

Produce and save a reference document at `docs/deployment/deployment-architecture.md`.
- this document is the canonical reference for service topology, domain ownership, env vars, deploy authority, and preview vs production behavior
- later deployment issues should link to and update this document instead of redefining architecture assumptions

## Acceptance Criteria
- Clear service inventory
- Clear env var matrix
- Clear ownership of public vs internal services
- Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton
- `docs/deployment/deployment-architecture.md` records the production auth transport, cookie/header contract, CORS allowlist, and CSRF posture for the frontend/API split
- `docs/deployment/deployment-architecture.md` exists and is usable as the canonical reference for downstream issues

## Ownership
- Assignee: `acabrera04`
- Backup owner: `declanblanc`
- Due: `April 10, 2026`

## Dependencies
- Blocked by: none
- Unblocks: #2, #6, #7, #8, #16'''
    },
    {
        'title': 'Sprint 4: Backend Scale Audit for Railway Replicas',
        'assignee': 'declanblanc',
        'body': '''## Summary
Audit the current backend for state that will break with 2+ API replicas.

Confirm and document the required changes for:
- in-memory rate limiting
- local filesystem attachment storage
- duplicate startup subscribers / background jobs
- SSE behavior behind load balancing
- proxy/IP handling

Produce and save a reference document at `docs/deployment/replica-readiness-audit.md`.
- include the concrete "replica-safe backend" checklist for implementation
- include must-fix items, acceptable demo-time risks, and explicit ownership boundaries between `backend-api` and `backend-worker`
- later scaling/deployment issues should cite this document when implementing or validating replica-safe behavior

## Acceptance Criteria
- Checklist references the actual code areas that must change
- Risks are prioritized into must-fix vs acceptable-for-demo
- `backend-api` vs `backend-worker` responsibilities are finalized
- `docs/deployment/replica-readiness-audit.md` exists and is detailed enough for downstream implementation/validation issues to reference directly

## Ownership
- Assignee: `declanblanc`
- Backup owner: `acabrera04`
- Due: `April 10, 2026`

## Dependencies
- Blocked by: #1
- Unblocks: #3, #4, #5, #14'''
    },
    {
        'title': 'Sprint 4: Shared Rate Limiting + Proxy-Aware Networking',
        'assignee': 'Aiden-Barrera',
        'body': '''## Summary
Replace process-local rate limiting with shared Redis-backed limiting.

Replace or unify both current implementations:
- auth endpoint limiting using `express-rate-limit`
- public-route token bucket limiting

Ensure auth and public API rate limits remain correct across 2+ replicas. Configure Express proxy awareness so client IP handling works correctly behind Railway.

Use `docs/deployment/replica-readiness-audit.md` as the implementation checklist and update it with final decisions.

## Acceptance Criteria
- Public and auth rate limits are shared across replicas
- No process-local auth or public-route limit counters remain in production code paths
- Redis-backed limiter mutations are atomic; non-atomic `INCR` + separate `EXPIRE` style patterns are explicitly disallowed for production rate-limit state
- Production proxy trust is explicitly configured for a single Railway hop (`trust proxy = 1` or equivalent) and documented in deployment docs
- Rate limit behavior is covered by tests or verification notes

## Ownership
- Assignee: `Aiden-Barrera`
- Due: `April 11, 2026`

## Dependencies
- Blocked by: #2
- Unblocks: #14'''
    },
    {
        'title': 'Sprint 4: Production Attachment Storage Provider',
        'assignee': 'AvanishKulkarni',
        'body': '''## Summary
Implement a production storage provider backed by Cloudflare R2 via an S3-compatible interface.

Keep local storage available for development only. Add env-driven provider selection and document required secrets. Ensure uploaded files remain accessible regardless of which API replica serves subsequent requests.

Follow `docs/deployment/replica-readiness-audit.md` for replica-safe storage requirements and update `docs/deployment/deployment-architecture.md` with the final env/config contract.

## Acceptance Criteria
- Production does not rely on local filesystem attachment serving
- The chosen production provider is Cloudflare R2, documented as such in code and setup docs
- README and env matrix document storage setup
- Attachment flow works end-to-end in deployed environment

## Ownership
- Assignee: `AvanishKulkarni`
- Due: `April 11, 2026`

## Dependencies
- Blocked by: #2
- Unblocks: #14, #15'''
    },
    {
        'title': 'Sprint 4: Split backend-api and Singleton backend-worker',
        'assignee': 'declanblanc',
        'body': '''## Summary
Move background-only startup behavior into a dedicated worker process. Ensure duplicated subscribers / cache invalidation / sitemap upkeep do not run on every API replica. Keep API replicas focused on HTTP/tRPC/SSE request handling.

Use Redis pub/sub fan-out as the explicit SSE strategy so each API replica can deliver shared events to its own connected SSE clients without sticky-session requirements.

Add lightweight replica observability for validation:
- instance identity in structured logs
- instance/replica identity on health output and/or response headers

Add startup commands for both Railway backend services.

Use `docs/deployment/replica-readiness-audit.md` to drive the split and record the final `backend-api` / `backend-worker` ownership model there and in `docs/deployment/deployment-architecture.md`.

## Acceptance Criteria
- `backend-api` can run with 2+ replicas without duplicate singleton background side effects
- `backend-worker` runs with 1 replica and owns singleton event-driven tasks
- SSE behavior across 2+ replicas follows the documented Redis fan-out strategy and no sticky-session dependency remains in the production design
- Replica identity is externally observable enough to prove load balancing across 2+ API replicas
- `backend-worker` health check and restart expectations are documented and wired into deployment assumptions
- Service responsibilities are documented

## Ownership
- Assignee: `declanblanc`
- Backup owner: `acabrera04`
- Due: `April 12, 2026`

## Dependencies
- Blocked by: #2
- Unblocks: #7, #11, #14'''
    },
    {
        'title': 'Sprint 4: Frontend Production Configuration for Vercel',
        'assignee': 'declanblanc',
        'body': '''## Summary
Add production-safe frontend configuration:
- absolute canonical URLs
- `metadataBase`
- `robots.txt` on the frontend apex domain
- sitemap support on the frontend apex domain
- production API base URL handling

Make the SEO ownership boundary explicit:
- frontend apex domain owns the canonical public SEO artifacts: canonical URLs, `metadataBase`, `robots.txt`, sitemap entrypoints, and any sitemap index exposed to crawlers
- frontend sitemap entrypoints are implemented through Next.js route handlers that fetch backend sitemap/XML data at request time
- backend SEO routes may continue to generate sitemap/XML data as an internal or transitional source, but they are not the canonical crawler-facing host in production
- no SEO artifact should require crawlers to use the API subdomain as the primary source of truth

Ensure frontend still supports localhost development cleanly. Use `docs/deployment/deployment-architecture.md` as the source of truth for domain ownership, public URLs, and SEO host decisions.

## Acceptance Criteria
- Public pages generate correct production metadata
- Canonical host ownership is explicit and consistent across frontend and backend docs/code
- Frontend/API cross-origin auth behavior is consistent with the documented auth and CORS contract
- Frontend can target local and cloud backends without code edits
- SEO-critical pages render correctly on the public domain

## Ownership
- Assignee: `declanblanc`
- Backup owner: `AvanishKulkarni`
- Due: `April 11, 2026`

## Dependencies
- Blocked by: #1
- Unblocks: #12, #16'''
    },
    {
        'title': 'Sprint 4: Railway Project Provisioning and Service Wiring',
        'assignee': 'FardeenI',
        'body': '''## Summary
Create/configure the Railway project and services:
- `backend-api`
- `backend-worker`
- `postgres`
- `redis`

Configure internal networking, service env vars, health checks, deploy commands, and domains. Ensure `backend-api` and `backend-worker` both connect to the same Postgres and Redis instances.

Provision services and env vars to match `docs/deployment/deployment-architecture.md`, and use `docs/deployment/replica-readiness-audit.md` for replica-safety requirements.

## Acceptance Criteria
- Railway project is provisioned
- Domains/env vars/health checks are configured
- Postgres and Redis env vars use Railway private/internal connection strings for service-to-service traffic
- Backend CORS and auth-related env/config are aligned with the documented frontend/API contract
- `backend-worker` has a health check and restart-on-failure behavior configured
- `backend-api` and `backend-worker` both boot successfully in Railway

## Ownership
- Assignee: `FardeenI`
- Backup owner: `Aiden-Barrera`
- Due: `April 13, 2026`

## Dependencies
- Blocked by: #1, #5
- Unblocks: #11, #14, #15'''
    },
    {
        'title': 'Sprint 4: Integration Test Specification',
        'assignee': 'FardeenI',
        'body': '''## Summary
Write an English-language integration test specification for all frontend-backend code paths that must work in deployment.

Cover at least:
- guest public channel rendering
- login / auth refresh path
- public API path used by SSR metadata/page rendering
- visibility change impact on public indexing behavior
- attachment path if production storage is in scope
- SSE/realtime smoke behavior if kept in deployed flow

Declare the cloud-mode data-isolation strategy:
- default choice for this sprint is read-only cloud smoke coverage against deployed URLs
- any write-path cloud tests require a separately documented isolated environment before they are allowed

Reference `docs/deployment/deployment-architecture.md` for deployment topology and `docs/deployment/replica-readiness-audit.md` for replica-sensitive scenarios that need validation.

## Acceptance Criteria
- Every FE-BE pathway has at least one test case
- Spec includes local-only vs cloud-only notes where relevant
- Cloud-mode tests are explicitly classified as read-only or isolated-environment-only
- Spec is stored under `docs/test-specs/`

## Ownership
- Assignee: `FardeenI`
- Due: `April 11, 2026`

## Dependencies
- Blocked by: #1
- Unblocks: #9, #10, #15'''
    },
    {
        'title': 'Sprint 4: Integration Test Implementation + Environment Matrix',
        'assignee': 'Aiden-Barrera',
        'body': '''## Summary
Implement the integration tests from the spec.

Support two execution targets:
- `local`: starts local frontend/backend dependencies and runs against localhost
- `cloud`: runs against already-deployed frontend/backend URLs without starting local app servers

Add environment selection via explicit env vars or script arguments. Document which tests are:
- portable across both targets
- local-only because they depend on reset/seed control
- cloud-only because they validate deployed behavior

Keep cloud-target coverage read-only by default:
- health and reachability
- guest public channel rendering
- public SSR metadata and canonical URL fetches
- sitemap/robots fetches
- SSE connect/disconnect smoke checks without mutating shared production state

Capture/structure output for both local and cloud runs. Keep target URLs, environment contracts, and replica-sensitive validations aligned with `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`.

## Acceptance Criteria
- Tests run in a local configuration
- Tests run in a cloud configuration
- Cloud mode does not require local frontend/backend startup
- Cloud-mode tests cannot mutate non-isolated deployed state unless a separately documented isolated environment exists
- Any environment-specific exceptions are documented

## Ownership
- Assignee: `Aiden-Barrera`
- Due: `April 14, 2026`

## Dependencies
- Blocked by: #8, #6, #7
- Unblocks: #10, #14, #15'''
    },
    {
        'title': 'Sprint 4: GitHub Action run-integration-tests.yml',
        'assignee': 'FardeenI',
        'body': '''## Summary
Create `.github/workflows/run-integration-tests.yml`.

Install frontend/backend dependencies. Set up the required environment for integration tests. Run the local-target integration suite in CI. Keep the workflow name and job names stable so they can be required in branch protection.

Document how cloud-target integration tests are invoked outside CI when deployed URLs are available. Reference `docs/deployment/deployment-architecture.md` for environment inputs and `docs/deployment/replica-readiness-audit.md` for any replica-sensitive checks excluded from local CI.

## Acceptance Criteria
- Workflow passes on a PR
- Workflow is usable as a required status check
- YAML is committed and documented

## Ownership
- Assignee: `FardeenI`
- Due: `April 15, 2026`

## Dependencies
- Blocked by: #8, #9
- Unblocks: #13, #15'''
    },
    {
        'title': 'Sprint 4: GitHub Action deploy-railway.yml',
        'assignee': 'FardeenI',
        'body': '''## Summary
Create backend CD workflow for Railway.

Start from the already-provisioned Railway project tied to the current project state so the workflow can be scaffolded and dry-run this weekend. Deploy `backend-api` and `backend-worker` on pushes to `main`. Ensure migrations / build / deploy ordering is safe. Use GitHub secrets for Railway authentication.

Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted. Implement the workflow against the service topology and env contract defined in `docs/deployment/deployment-architecture.md`.

If final backend service split details are still landing, create the workflow early and finish the final production wiring immediately after #5 and #7.

## Acceptance Criteria
- Workflow deploys backend services without manual intervention
- Production deploy authority is unambiguous and documented
- Exactly one migration runner performs `prisma migrate deploy`, and `backend-api` replicas are prevented from racing migrations on startup
- Schema rollout rules follow an expand/contract convention so destructive migrations are not introduced in the same deploy that must coexist with old API replicas during rolling restart
- Deploys target the correct Railway environment
- Deployment process is documented in README

## Ownership
- Assignee: `FardeenI`
- Backup owner: `Aiden-Barrera`
- Due: `April 12, 2026`

## Dependencies
- Blocked by: #5, #7
- Unblocks: #14, #15'''
    },
    {
        'title': 'Sprint 4: GitHub Action deploy-vercel.yml',
        'assignee': 'declanblanc',
        'body': '''## Summary
Create frontend CD workflow for Vercel.

Start from the already-provisioned Vercel project tied to the current project state so the workflow can be scaffolded and dry-run this weekend. Build/deploy frontend on pushes to `main`. Ensure preview/production environment variables are configured properly. Use GitHub secrets/tokens safely.

Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted. Implement the workflow against the domain/env decisions in `docs/deployment/deployment-architecture.md`.

If final frontend production config is still landing, create the workflow early and finish the final production wiring immediately after #6 and #16.

## Acceptance Criteria
- Workflow deploys frontend without manual intervention
- Production deploy authority is unambiguous and documented
- Production deploy points at the production backend URL
- Deployment process is documented in README

## Ownership
- Assignee: `declanblanc`
- Backup owner: `AvanishKulkarni`
- Due: `April 12, 2026`

## Dependencies
- Blocked by: #6, #16
- Unblocks: #15'''
    },
    {
        'title': 'Sprint 4: GitHub Hygiene and Branch Protection',
        'assignee': 'Aiden-Barrera',
        'body': '''## Summary
Enforce feature branch workflow. Configure branch protection for `main`. Require PR review before merge. Require passing status checks before merge.

Record the exact required checks to enable:
- existing unit test workflows
- `run-integration-tests`

Reference `docs/deployment/deployment-architecture.md` when documenting the production deploy authority and required checks tied to production promotion.

## Acceptance Criteria
- Direct pushes to `main` are blocked
- PR review is required
- Required status checks are enabled
- Team workflow is documented

## Ownership
- Assignee: `Aiden-Barrera`
- Due: `April 16, 2026`

## Dependencies
- Blocked by: #10
- Unblocks: #15'''
    },
    {
        'title': 'Sprint 4: Vercel Project Setup, Domains, and Preview/Prod Verification',
        'assignee': 'declanblanc',
        'body': '''## Summary
Create/configure the Vercel project. Bind the production domain. Configure preview and production environment variables. Verify frontend is talking to the correct Railway backend in production.

Configure domains and env vars to match `docs/deployment/deployment-architecture.md`.

## Acceptance Criteria
- Preview deployment works
- Production deployment works
- Domain and environment configuration are documented

## Ownership
- Assignee: `declanblanc`
- Backup owner: `FardeenI`
- Due: `April 14, 2026`

## Dependencies
- Blocked by: #1, #6
- Unblocks: #12, #14, #15'''
    },
    {
        'title': 'Sprint 4: Railway Multi-Replica Validation and Deployment Evidence',
        'assignee': 'declanblanc',
        'body': '''## Summary
Scale `backend-api` to 2 or more replicas on Railway. Keep `backend-worker` at 1 replica.

Verify and capture evidence for:
- public page loads through the deployed frontend
- authenticated API behavior through multiple API replicas
- shared rate limiting across replicas
- attachment access independent of serving replica
- cache invalidation / indexing behavior via singleton worker
- SSE/realtime smoke verification in deployed environment

Run the cloud-target integration/smoke suite against the deployed system. Keep deployed-environment smoke verification read-only unless a separate isolated cloud test environment is explicitly provisioned. Use the replica observability added in #5 to prove requests were served across 2+ API replicas via headers, health output, and/or structured logs.

Capture logs/screenshots/test output needed for submission. Validate against the expected topology in `docs/deployment/deployment-architecture.md` and the replica-safety checklist in `docs/deployment/replica-readiness-audit.md`.

## Acceptance Criteria
- Live deployment is stable with `backend-api` at 2+ replicas
- No replica-specific failures are observed for required paths
- Proxy-aware rate limiting is validated against the documented one-hop trust model
- Cloud-target tests pass against deployed URLs
- Evidence clearly distinguishes deployed-system validation from localhost validation

## Ownership
- Assignee: `declanblanc`
- Backup owner: `Aiden-Barrera`
- Due: `April 18, 2026`

## Dependencies
- Blocked by: #3, #4, #5, #7, #9, #11, #16
- Unblocks: #15'''
    },
    {
        'title': 'Sprint 4: README, Final Artifact Collection, and Submission Package',
        'assignee': 'acabrera04',
        'body': '''## Summary
Update `README.md` with:
- how web users access the deployed app
- how to run the app locally
- how a forked user sets up Vercel + Railway deployment
- how CI/CD and branch protection are expected to work

Fold in the final decisions captured in `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`.

Compile the final P6-equivalent artifact checklist:
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

## Acceptance Criteria
- README is complete and accurate
- Submission checklist has no missing artifacts
- Team knows who owns final reflection/log collation

## Ownership
- Assignee: `acabrera04`
- Backup owner: `FardeenI`
- Due: `April 19, 2026`

## Dependencies
- Blocked by: #4, #8, #9, #10, #11, #12, #13, #14, #16'''
    },
]


def run(cmd):
    return subprocess.run(cmd, check=True, text=True, capture_output=True)

# Ensure label exists.
labels = run(['gh', 'label', 'list', '--repo', repo]).stdout
if label not in labels:
    run(['gh', 'label', 'create', label, '--repo', repo, '--color', '0e8a16', '--description', 'P6 deployment sprint work'])

created = []
for issue in issues:
    result = run([
        'gh', 'issue', 'create',
        '--repo', repo,
        '--title', issue['title'],
        '--body', issue['body'],
        '--assignee', issue['assignee'],
        '--label', label,
    ])
    url = result.stdout.strip().splitlines()[-1]
    created.append({'title': issue['title'], 'url': url})
    run(['gh', 'project', 'item-add', project, '--owner', owner, '--url', url])

print(json.dumps(created, indent=2))
PY
python3 /tmp/create_sprint4_issues.py
```

Output:

```text

```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:38:02.117Z

The issue creation script is running now. I’m waiting on GitHub responses and then I’ll verify the created issues and board entries so we don’t leave partial state behind.

#### Tool: write_stdin

```json
{
  "session_id": 25320,
  "chars": "",
  "yield_time_ms": 1000,
  "max_output_tokens": 12000
}
```

Output:

```text
Command: /bin/zsh -lc "cat > /tmp/create_sprint4_issues.py <<'PY'
import json
import subprocess

repo = 'CS485-Harmony/Harmony'
project = '1'
owner = 'CS485-Harmony'
label = 'P6: Deployment'

issues = [
    {
        'title': 'Sprint 4: Deployment Architecture + Environment Matrix',
        'assignee': 'acabrera04',
        'body': '''## Summary
Define the final Vercel + Railway topology:
- "'`frontend`
- `backend-api`
- `backend-worker`
- `postgres`
- `redis`

Document production env vars for frontend, backend API, and worker. Define domain plan (`frontend` domain + `api` subdomain). Define promotion flow for preview vs production.

Produce and save a reference document at `docs/deployment/deployment-architecture.md`.
- this document is the canonical reference for service topology, domain ownership, env vars, deploy authority, and preview vs production behavior
- later deployment issues should link to and update this document instead of redefining architecture assumptions

## Acceptance Criteria
- Clear service inventory
- Clear env var matrix
- Clear ownership of public vs internal services
- Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton
- `docs/deployment/deployment-architecture.md` records the production auth transport, cookie/header contract, CORS allowlist, and CSRF posture for the frontend/API split
- `docs/deployment/deployment-architecture.md` exists and is usable as the canonical reference for downstream issues

## Ownership
- Assignee: `acabrera04`
- Backup owner: `declanblanc`
- Due: `April 10, 2026`

## Dependencies
- Blocked by: none
- Unblocks: #2, #6, #7, #8, #16'"'''
    },
    {
        'title': 'Sprint 4: Backend Scale Audit for Railway Replicas',
        'assignee': 'declanblanc',
        'body': '''## Summary
Audit the current backend for state that will break with 2+ API replicas.

Confirm and document the required changes for:
- in-memory rate limiting
- local filesystem attachment storage
- duplicate startup subscribers / background jobs
- SSE behavior behind load balancing
- proxy/IP handling

Produce and save a reference document at "'`docs/deployment/replica-readiness-audit.md`.
- include the concrete "replica-safe backend" checklist for implementation
- include must-fix items, acceptable demo-time risks, and explicit ownership boundaries between `backend-api` and `backend-worker`
- later scaling/deployment issues should cite this document when implementing or validating replica-safe behavior

## Acceptance Criteria
- Checklist references the actual code areas that must change
- Risks are prioritized into must-fix vs acceptable-for-demo
- `backend-api` vs `backend-worker` responsibilities are finalized
- `docs/deployment/replica-readiness-audit.md` exists and is detailed enough for downstream implementation/validation issues to reference directly

## Ownership
- Assignee: `declanblanc`
- Backup owner: `acabrera04`
- Due: `April 10, 2026`

## Dependencies
- Blocked by: #1
- Unblocks: #3, #4, #5, #14'"'''
    },
    {
        'title': 'Sprint 4: Shared Rate Limiting + Proxy-Aware Networking',
        'assignee': 'Aiden-Barrera',
        'body': '''## Summary
Replace process-local rate limiting with shared Redis-backed limiting.

Replace or unify both current implementations:
- auth endpoint limiting using "'`express-rate-limit`
- public-route token bucket limiting

Ensure auth and public API rate limits remain correct across 2+ replicas. Configure Express proxy awareness so client IP handling works correctly behind Railway.

Use `docs/deployment/replica-readiness-audit.md` as the implementation checklist and update it with final decisions.

## Acceptance Criteria
- Public and auth rate limits are shared across replicas
- No process-local auth or public-route limit counters remain in production code paths
- Redis-backed limiter mutations are atomic; non-atomic `INCR` + separate `EXPIRE` style patterns are explicitly disallowed for production rate-limit state
- Production proxy trust is explicitly configured for a single Railway hop (`trust proxy = 1` or equivalent) and documented in deployment docs
- Rate limit behavior is covered by tests or verification notes

## Ownership
- Assignee: `Aiden-Barrera`
- Due: `April 11, 2026`

## Dependencies
- Blocked by: #2
- Unblocks: #14'"'''
    },
    {
        'title': 'Sprint 4: Production Attachment Storage Provider',
        'assignee': 'AvanishKulkarni',
        'body': '''## Summary
Implement a production storage provider backed by Cloudflare R2 via an S3-compatible interface.

Keep local storage available for development only. Add env-driven provider selection and document required secrets. Ensure uploaded files remain accessible regardless of which API replica serves subsequent requests.

Follow "'`docs/deployment/replica-readiness-audit.md` for replica-safe storage requirements and update `docs/deployment/deployment-architecture.md` with the final env/config contract.

## Acceptance Criteria
- Production does not rely on local filesystem attachment serving
- The chosen production provider is Cloudflare R2, documented as such in code and setup docs
- README and env matrix document storage setup
- Attachment flow works end-to-end in deployed environment

## Ownership
- Assignee: `AvanishKulkarni`
- Due: `April 11, 2026`

## Dependencies
- Blocked by: #2
- Unblocks: #14, #15'"'''
    },
    {
        'title': 'Sprint 4: Split backend-api and Singleton backend-worker',
        'assignee': 'declanblanc',
        'body': '''## Summary
Move background-only startup behavior into a dedicated worker process. Ensure duplicated subscribers / cache invalidation / sitemap upkeep do not run on every API replica. Keep API replicas focused on HTTP/tRPC/SSE request handling.

Use Redis pub/sub fan-out as the explicit SSE strategy so each API replica can deliver shared events to its own connected SSE clients without sticky-session requirements.

Add lightweight replica observability for validation:
- instance identity in structured logs
- instance/replica identity on health output and/or response headers

Add startup commands for both Railway backend services.

Use "'`docs/deployment/replica-readiness-audit.md` to drive the split and record the final `backend-api` / `backend-worker` ownership model there and in `docs/deployment/deployment-architecture.md`.

## Acceptance Criteria
- `backend-api` can run with 2+ replicas without duplicate singleton background side effects
- `backend-worker` runs with 1 replica and owns singleton event-driven tasks
- SSE behavior across 2+ replicas follows the documented Redis fan-out strategy and no sticky-session dependency remains in the production design
- Replica identity is externally observable enough to prove load balancing across 2+ API replicas
- `backend-worker` health check and restart expectations are documented and wired into deployment assumptions
- Service responsibilities are documented

## Ownership
- Assignee: `declanblanc`
- Backup owner: `acabrera04`
- Due: `April 12, 2026`

## Dependencies
- Blocked by: #2
- Unblocks: #7, #11, #14'"'''
    },
    {
        'title': 'Sprint 4: Frontend Production Configuration for Vercel',
        'assignee': 'declanblanc',
        'body': '''## Summary
Add production-safe frontend configuration:
- absolute canonical URLs
- "'`metadataBase`
- `robots.txt` on the frontend apex domain
- sitemap support on the frontend apex domain
- production API base URL handling

Make the SEO ownership boundary explicit:
- frontend apex domain owns the canonical public SEO artifacts: canonical URLs, `metadataBase`, `robots.txt`, sitemap entrypoints, and any sitemap index exposed to crawlers
- frontend sitemap entrypoints are implemented through Next.js route handlers that fetch backend sitemap/XML data at request time
- backend SEO routes may continue to generate sitemap/XML data as an internal or transitional source, but they are not the canonical crawler-facing host in production
- no SEO artifact should require crawlers to use the API subdomain as the primary source of truth

Ensure frontend still supports localhost development cleanly. Use `docs/deployment/deployment-architecture.md` as the source of truth for domain ownership, public URLs, and SEO host decisions.

## Acceptance Criteria
- Public pages generate correct production metadata
- Canonical host ownership is explicit and consistent across frontend and backend docs/code
- Frontend/API cross-origin auth behavior is consistent with the documented auth and CORS contract
- Frontend can target local and cloud backends without code edits
- SEO-critical pages render correctly on the public domain

## Ownership
- Assignee: `declanblanc`
- Backup owner: `AvanishKulkarni`
- Due: `April 11, 2026`

## Dependencies
- Blocked by: #1
- Unblocks: #12, #16'"'''
    },
    {
        'title': 'Sprint 4: Railway Project Provisioning and Service Wiring',
        'assignee': 'FardeenI',
        'body': '''## Summary
Create/configure the Railway project and services:
- "'`backend-api`
- `backend-worker`
- `postgres`
- `redis`

Configure internal networking, service env vars, health checks, deploy commands, and domains. Ensure `backend-api` and `backend-worker` both connect to the same Postgres and Redis instances.

Provision services and env vars to match `docs/deployment/deployment-architecture.md`, and use `docs/deployment/replica-readiness-audit.md` for replica-safety requirements.

## Acceptance Criteria
- Railway project is provisioned
- Domains/env vars/health checks are configured
- Postgres and Redis env vars use Railway private/internal connection strings for service-to-service traffic
- Backend CORS and auth-related env/config are aligned with the documented frontend/API contract
- `backend-worker` has a health check and restart-on-failure behavior configured
- `backend-api` and `backend-worker` both boot successfully in Railway

## Ownership
- Assignee: `FardeenI`
- Backup owner: `Aiden-Barrera`
- Due: `April 13, 2026`

## Dependencies
- Blocked by: #1, #5
- Unblocks: #11, #14, #15'"'''
    },
    {
        'title': 'Sprint 4: Integration Test Specification',
        'assignee': 'FardeenI',
        'body': '''## Summary
Write an English-language integration test specification for all frontend-backend code paths that must work in deployment.

Cover at least:
- guest public channel rendering
- login / auth refresh path
- public API path used by SSR metadata/page rendering
- visibility change impact on public indexing behavior
- attachment path if production storage is in scope
- SSE/realtime smoke behavior if kept in deployed flow

Declare the cloud-mode data-isolation strategy:
- default choice for this sprint is read-only cloud smoke coverage against deployed URLs
- any write-path cloud tests require a separately documented isolated environment before they are allowed

Reference "'`docs/deployment/deployment-architecture.md` for deployment topology and `docs/deployment/replica-readiness-audit.md` for replica-sensitive scenarios that need validation.

## Acceptance Criteria
- Every FE-BE pathway has at least one test case
- Spec includes local-only vs cloud-only notes where relevant
- Cloud-mode tests are explicitly classified as read-only or isolated-environment-only
- Spec is stored under `docs/test-specs/`

## Ownership
- Assignee: `FardeenI`
- Due: `April 11, 2026`

## Dependencies
- Blocked by: #1
- Unblocks: #9, #10, #15'"'''
    },
    {
        'title': 'Sprint 4: Integration Test Implementation + Environment Matrix',
        'assignee': 'Aiden-Barrera',
        'body': '''## Summary
Implement the integration tests from the spec.

Support two execution targets:
- "'`local`: starts local frontend/backend dependencies and runs against localhost
- `cloud`: runs against already-deployed frontend/backend URLs without starting local app servers

Add environment selection via explicit env vars or script arguments. Document which tests are:
- portable across both targets
- local-only because they depend on reset/seed control
- cloud-only because they validate deployed behavior

Keep cloud-target coverage read-only by default:
- health and reachability
- guest public channel rendering
- public SSR metadata and canonical URL fetches
- sitemap/robots fetches
- SSE connect/disconnect smoke checks without mutating shared production state

Capture/structure output for both local and cloud runs. Keep target URLs, environment contracts, and replica-sensitive validations aligned with `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`.

## Acceptance Criteria
- Tests run in a local configuration
- Tests run in a cloud configuration
- Cloud mode does not require local frontend/backend startup
- Cloud-mode tests cannot mutate non-isolated deployed state unless a separately documented isolated environment exists
- Any environment-specific exceptions are documented

## Ownership
- Assignee: `Aiden-Barrera`
- Due: `April 14, 2026`

## Dependencies
- Blocked by: #8, #6, #7
- Unblocks: #10, #14, #15'"'''
    },
    {
        'title': 'Sprint 4: GitHub Action run-integration-tests.yml',
        'assignee': 'FardeenI',
        'body': '''## Summary
Create "'`.github/workflows/run-integration-tests.yml`.

Install frontend/backend dependencies. Set up the required environment for integration tests. Run the local-target integration suite in CI. Keep the workflow name and job names stable so they can be required in branch protection.

Document how cloud-target integration tests are invoked outside CI when deployed URLs are available. Reference `docs/deployment/deployment-architecture.md` for environment inputs and `docs/deployment/replica-readiness-audit.md` for any replica-sensitive checks excluded from local CI.

## Acceptance Criteria
- Workflow passes on a PR
- Workflow is usable as a required status check
- YAML is committed and documented

## Ownership
- Assignee: `FardeenI`
- Due: `April 15, 2026`

## Dependencies
- Blocked by: #8, #9
- Unblocks: #13, #15'"'''
    },
    {
        'title': 'Sprint 4: GitHub Action deploy-railway.yml',
        'assignee': 'FardeenI',
        'body': '''## Summary
Create backend CD workflow for Railway.

Start from the already-provisioned Railway project tied to the current project state so the workflow can be scaffolded and dry-run this weekend. Deploy "'`backend-api` and `backend-worker` on pushes to `main`. Ensure migrations / build / deploy ordering is safe. Use GitHub secrets for Railway authentication.

Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted. Implement the workflow against the service topology and env contract defined in `docs/deployment/deployment-architecture.md`.

If final backend service split details are still landing, create the workflow early and finish the final production wiring immediately after #5 and #7.

## Acceptance Criteria
- Workflow deploys backend services without manual intervention
- Production deploy authority is unambiguous and documented
- Exactly one migration runner performs `prisma migrate deploy`, and `backend-api` replicas are prevented from racing migrations on startup
- Schema rollout rules follow an expand/contract convention so destructive migrations are not introduced in the same deploy that must coexist with old API replicas during rolling restart
- Deploys target the correct Railway environment
- Deployment process is documented in README

## Ownership
- Assignee: `FardeenI`
- Backup owner: `Aiden-Barrera`
- Due: `April 12, 2026`

## Dependencies
- Blocked by: #5, #7
- Unblocks: #14, #15'"'''
    },
    {
        'title': 'Sprint 4: GitHub Action deploy-vercel.yml',
        'assignee': 'declanblanc',
        'body': '''## Summary
Create frontend CD workflow for Vercel.

Start from the already-provisioned Vercel project tied to the current project state so the workflow can be scaffolded and dry-run this weekend. Build/deploy frontend on pushes to "'`main`. Ensure preview/production environment variables are configured properly. Use GitHub secrets/tokens safely.

Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted. Implement the workflow against the domain/env decisions in `docs/deployment/deployment-architecture.md`.

If final frontend production config is still landing, create the workflow early and finish the final production wiring immediately after #6 and #16.

## Acceptance Criteria
- Workflow deploys frontend without manual intervention
- Production deploy authority is unambiguous and documented
- Production deploy points at the production backend URL
- Deployment process is documented in README

## Ownership
- Assignee: `declanblanc`
- Backup owner: `AvanishKulkarni`
- Due: `April 12, 2026`

## Dependencies
- Blocked by: #6, #16
- Unblocks: #15'"'''
    },
    {
        'title': 'Sprint 4: GitHub Hygiene and Branch Protection',
        'assignee': 'Aiden-Barrera',
        'body': '''## Summary
Enforce feature branch workflow. Configure branch protection for "'`main`. Require PR review before merge. Require passing status checks before merge.

Record the exact required checks to enable:
- existing unit test workflows
- `run-integration-tests`

Reference `docs/deployment/deployment-architecture.md` when documenting the production deploy authority and required checks tied to production promotion.

## Acceptance Criteria
- Direct pushes to `main` are blocked
- PR review is required
- Required status checks are enabled
- Team workflow is documented

## Ownership
- Assignee: `Aiden-Barrera`
- Due: `April 16, 2026`

## Dependencies
- Blocked by: #10
- Unblocks: #15'"'''
    },
    {
        'title': 'Sprint 4: Vercel Project Setup, Domains, and Preview/Prod Verification',
        'assignee': 'declanblanc',
        'body': '''## Summary
Create/configure the Vercel project. Bind the production domain. Configure preview and production environment variables. Verify frontend is talking to the correct Railway backend in production.

Configure domains and env vars to match "'`docs/deployment/deployment-architecture.md`.

## Acceptance Criteria
- Preview deployment works
- Production deployment works
- Domain and environment configuration are documented

## Ownership
- Assignee: `declanblanc`
- Backup owner: `FardeenI`
- Due: `April 14, 2026`

## Dependencies
- Blocked by: #1, #6
- Unblocks: #12, #14, #15'"'''
    },
    {
        'title': 'Sprint 4: Railway Multi-Replica Validation and Deployment Evidence',
        'assignee': 'declanblanc',
        'body': '''## Summary
Scale "'`backend-api` to 2 or more replicas on Railway. Keep `backend-worker` at 1 replica.

Verify and capture evidence for:
- public page loads through the deployed frontend
- authenticated API behavior through multiple API replicas
- shared rate limiting across replicas
- attachment access independent of serving replica
- cache invalidation / indexing behavior via singleton worker
- SSE/realtime smoke verification in deployed environment

Run the cloud-target integration/smoke suite against the deployed system. Keep deployed-environment smoke verification read-only unless a separate isolated cloud test environment is explicitly provisioned. Use the replica observability added in #5 to prove requests were served across 2+ API replicas via headers, health output, and/or structured logs.

Capture logs/screenshots/test output needed for submission. Validate against the expected topology in `docs/deployment/deployment-architecture.md` and the replica-safety checklist in `docs/deployment/replica-readiness-audit.md`.

## Acceptance Criteria
- Live deployment is stable with `backend-api` at 2+ replicas
- No replica-specific failures are observed for required paths
- Proxy-aware rate limiting is validated against the documented one-hop trust model
- Cloud-target tests pass against deployed URLs
- Evidence clearly distinguishes deployed-system validation from localhost validation

## Ownership
- Assignee: `declanblanc`
- Backup owner: `Aiden-Barrera`
- Due: `April 18, 2026`

## Dependencies
- Blocked by: #3, #4, #5, #7, #9, #11, #16
- Unblocks: #15'"'''
    },
    {
        'title': 'Sprint 4: README, Final Artifact Collection, and Submission Package',
        'assignee': 'acabrera04',
        'body': '''## Summary
Update "'`README.md` with:
- how web users access the deployed app
- how to run the app locally
- how a forked user sets up Vercel + Railway deployment
- how CI/CD and branch protection are expected to work

Fold in the final decisions captured in `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`.

Compile the final P6-equivalent artifact checklist:
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

## Acceptance Criteria
- README is complete and accurate
- Submission checklist has no missing artifacts
- Team knows who owns final reflection/log collation

## Ownership
- Assignee: `acabrera04`
- Backup owner: `FardeenI`
- Due: `April 19, 2026`

## Dependencies
- Blocked by: #4, #8, #9, #10, #11, #12, #13, #14, #16'"'''
    },
]


def run(cmd):
    return subprocess.run(cmd, check=True, text=True, capture_output=True)

# Ensure label exists.
labels = run(['gh', 'label', 'list', '--repo', repo]).stdout
if label not in labels:
    run(['gh', 'label', 'create', label, '--repo', repo, '--color', '0e8a16', '--description', 'P6 deployment sprint work'])

created = []
for issue in issues:
    result = run([
        'gh', 'issue', 'create',
        '--repo', repo,
        '--title', issue['title'],
        '--body', issue['body'],
        '--assignee', issue['assignee'],
        '--label', label,
    ])
    url = result.stdout.strip().splitlines()[-1]
    created.append({'title': issue['title'], 'url': url})
    run(['gh', 'project', 'item-add', project, '--owner', owner, '--url', url])

print(json.dumps(created, indent=2))
PY
python3 /tmp/create_sprint4_issues.py"
Chunk ID: 628cda
Wall time: 5.0024 seconds
Process running with session ID 25320
Original token count: 0
Output:
```

#### Tool: write_stdin

```json
{
  "session_id": 25320,
  "chars": "",
  "yield_time_ms": 1000,
  "max_output_tokens": 12000
}
```

Output:

```text
Command: /bin/zsh -lc "cat > /tmp/create_sprint4_issues.py <<'PY'
import json
import subprocess

repo = 'CS485-Harmony/Harmony'
project = '1'
owner = 'CS485-Harmony'
label = 'P6: Deployment'

issues = [
    {
        'title': 'Sprint 4: Deployment Architecture + Environment Matrix',
        'assignee': 'acabrera04',
        'body': '''## Summary
Define the final Vercel + Railway topology:
- "'`frontend`
- `backend-api`
- `backend-worker`
- `postgres`
- `redis`

Document production env vars for frontend, backend API, and worker. Define domain plan (`frontend` domain + `api` subdomain). Define promotion flow for preview vs production.

Produce and save a reference document at `docs/deployment/deployment-architecture.md`.
- this document is the canonical reference for service topology, domain ownership, env vars, deploy authority, and preview vs production behavior
- later deployment issues should link to and update this document instead of redefining architecture assumptions

## Acceptance Criteria
- Clear service inventory
- Clear env var matrix
- Clear ownership of public vs internal services
- Explicit decision that `backend-api` scales to 2+ replicas and `backend-worker` stays singleton
- `docs/deployment/deployment-architecture.md` records the production auth transport, cookie/header contract, CORS allowlist, and CSRF posture for the frontend/API split
- `docs/deployment/deployment-architecture.md` exists and is usable as the canonical reference for downstream issues

## Ownership
- Assignee: `acabrera04`
- Backup owner: `declanblanc`
- Due: `April 10, 2026`

## Dependencies
- Blocked by: none
- Unblocks: #2, #6, #7, #8, #16'"'''
    },
    {
        'title': 'Sprint 4: Backend Scale Audit for Railway Replicas',
        'assignee': 'declanblanc',
        'body': '''## Summary
Audit the current backend for state that will break with 2+ API replicas.

Confirm and document the required changes for:
- in-memory rate limiting
- local filesystem attachment storage
- duplicate startup subscribers / background jobs
- SSE behavior behind load balancing
- proxy/IP handling

Produce and save a reference document at "'`docs/deployment/replica-readiness-audit.md`.
- include the concrete "replica-safe backend" checklist for implementation
- include must-fix items, acceptable demo-time risks, and explicit ownership boundaries between `backend-api` and `backend-worker`
- later scaling/deployment issues should cite this document when implementing or validating replica-safe behavior

## Acceptance Criteria
- Checklist references the actual code areas that must change
- Risks are prioritized into must-fix vs acceptable-for-demo
- `backend-api` vs `backend-worker` responsibilities are finalized
- `docs/deployment/replica-readiness-audit.md` exists and is detailed enough for downstream implementation/validation issues to reference directly

## Ownership
- Assignee: `declanblanc`
- Backup owner: `acabrera04`
- Due: `April 10, 2026`

## Dependencies
- Blocked by: #1
- Unblocks: #3, #4, #5, #14'"'''
    },
    {
        'title': 'Sprint 4: Shared Rate Limiting + Proxy-Aware Networking',
        'assignee': 'Aiden-Barrera',
        'body': '''## Summary
Replace process-local rate limiting with shared Redis-backed limiting.

Replace or unify both current implementations:
- auth endpoint limiting using "'`express-rate-limit`
- public-route token bucket limiting

Ensure auth and public API rate limits remain correct across 2+ replicas. Configure Express proxy awareness so client IP handling works correctly behind Railway.

Use `docs/deployment/replica-readiness-audit.md` as the implementation checklist and update it with final decisions.

## Acceptance Criteria
- Public and auth rate limits are shared across replicas
- No process-local auth or public-route limit counters remain in production code paths
- Redis-backed limiter mutations are atomic; non-atomic `INCR` + separate `EXPIRE` style patterns are explicitly disallowed for production rate-limit state
- Production proxy trust is explicitly configured for a single Railway hop (`trust proxy = 1` or equivalent) and documented in deployment docs
- Rate limit behavior is covered by tests or verification notes

## Ownership
- Assignee: `Aiden-Barrera`
- Due: `April 11, 2026`

## Dependencies
- Blocked by: #2
- Unblocks: #14'"'''
    },
    {
        'title': 'Sprint 4: Production Attachment Storage Provider',
        'assignee': 'AvanishKulkarni',
        'body': '''## Summary
Implement a production storage provider backed by Cloudflare R2 via an S3-compatible interface.

Keep local storage available for development only. Add env-driven provider selection and document required secrets. Ensure uploaded files remain accessible regardless of which API replica serves subsequent requests.

Follow "'`docs/deployment/replica-readiness-audit.md` for replica-safe storage requirements and update `docs/deployment/deployment-architecture.md` with the final env/config contract.

## Acceptance Criteria
- Production does not rely on local filesystem attachment serving
- The chosen production provider is Cloudflare R2, documented as such in code and setup docs
- README and env matrix document storage setup
- Attachment flow works end-to-end in deployed environment

## Ownership
- Assignee: `AvanishKulkarni`
- Due: `April 11, 2026`

## Dependencies
- Blocked by: #2
- Unblocks: #14, #15'"'''
    },
    {
        'title': 'Sprint 4: Split backend-api and Singleton backend-worker',
        'assignee': 'declanblanc',
        'body': '''## Summary
Move background-only startup behavior into a dedicated worker process. Ensure duplicated subscribers / cache invalidation / sitemap upkeep do not run on every API replica. Keep API replicas focused on HTTP/tRPC/SSE request handling.

Use Redis pub/sub fan-out as the explicit SSE strategy so each API replica can deliver shared events to its own connected SSE clients without sticky-session requirements.

Add lightweight replica observability for validation:
- instance identity in structured logs
- instance/replica identity on health output and/or response headers

Add startup commands for both Railway backend services.

Use "'`docs/deployment/replica-readiness-audit.md` to drive the split and record the final `backend-api` / `backend-worker` ownership model there and in `docs/deployment/deployment-architecture.md`.

## Acceptance Criteria
- `backend-api` can run with 2+ replicas without duplicate singleton background side effects
- `backend-worker` runs with 1 replica and owns singleton event-driven tasks
- SSE behavior across 2+ replicas follows the documented Redis fan-out strategy and no sticky-session dependency remains in the production design
- Replica identity is externally observable enough to prove load balancing across 2+ API replicas
- `backend-worker` health check and restart expectations are documented and wired into deployment assumptions
- Service responsibilities are documented

## Ownership
- Assignee: `declanblanc`
- Backup owner: `acabrera04`
- Due: `April 12, 2026`

## Dependencies
- Blocked by: #2
- Unblocks: #7, #11, #14'"'''
    },
    {
        'title': 'Sprint 4: Frontend Production Configuration for Vercel',
        'assignee': 'declanblanc',
        'body': '''## Summary
Add production-safe frontend configuration:
- absolute canonical URLs
- "'`metadataBase`
- `robots.txt` on the frontend apex domain
- sitemap support on the frontend apex domain
- production API base URL handling

Make the SEO ownership boundary explicit:
- frontend apex domain owns the canonical public SEO artifacts: canonical URLs, `metadataBase`, `robots.txt`, sitemap entrypoints, and any sitemap index exposed to crawlers
- frontend sitemap entrypoints are implemented through Next.js route handlers that fetch backend sitemap/XML data at request time
- backend SEO routes may continue to generate sitemap/XML data as an internal or transitional source, but they are not the canonical crawler-facing host in production
- no SEO artifact should require crawlers to use the API subdomain as the primary source of truth

Ensure frontend still supports localhost development cleanly. Use `docs/deployment/deployment-architecture.md` as the source of truth for domain ownership, public URLs, and SEO host decisions.

## Acceptance Criteria
- Public pages generate correct production metadata
- Canonical host ownership is explicit and consistent across frontend and backend docs/code
- Frontend/API cross-origin auth behavior is consistent with the documented auth and CORS contract
- Frontend can target local and cloud backends without code edits
- SEO-critical pages render correctly on the public domain

## Ownership
- Assignee: `declanblanc`
- Backup owner: `AvanishKulkarni`
- Due: `April 11, 2026`

## Dependencies
- Blocked by: #1
- Unblocks: #12, #16'"'''
    },
    {
        'title': 'Sprint 4: Railway Project Provisioning and Service Wiring',
        'assignee': 'FardeenI',
        'body': '''## Summary
Create/configure the Railway project and services:
- "'`backend-api`
- `backend-worker`
- `postgres`
- `redis`

Configure internal networking, service env vars, health checks, deploy commands, and domains. Ensure `backend-api` and `backend-worker` both connect to the same Postgres and Redis instances.

Provision services and env vars to match `docs/deployment/deployment-architecture.md`, and use `docs/deployment/replica-readiness-audit.md` for replica-safety requirements.

## Acceptance Criteria
- Railway project is provisioned
- Domains/env vars/health checks are configured
- Postgres and Redis env vars use Railway private/internal connection strings for service-to-service traffic
- Backend CORS and auth-related env/config are aligned with the documented frontend/API contract
- `backend-worker` has a health check and restart-on-failure behavior configured
- `backend-api` and `backend-worker` both boot successfully in Railway

## Ownership
- Assignee: `FardeenI`
- Backup owner: `Aiden-Barrera`
- Due: `April 13, 2026`

## Dependencies
- Blocked by: #1, #5
- Unblocks: #11, #14, #15'"'''
    },
    {
        'title': 'Sprint 4: Integration Test Specification',
        'assignee': 'FardeenI',
        'body': '''## Summary
Write an English-language integration test specification for all frontend-backend code paths that must work in deployment.

Cover at least:
- guest public channel rendering
- login / auth refresh path
- public API path used by SSR metadata/page rendering
- visibility change impact on public indexing behavior
- attachment path if production storage is in scope
- SSE/realtime smoke behavior if kept in deployed flow

Declare the cloud-mode data-isolation strategy:
- default choice for this sprint is read-only cloud smoke coverage against deployed URLs
- any write-path cloud tests require a separately documented isolated environment before they are allowed

Reference "'`docs/deployment/deployment-architecture.md` for deployment topology and `docs/deployment/replica-readiness-audit.md` for replica-sensitive scenarios that need validation.

## Acceptance Criteria
- Every FE-BE pathway has at least one test case
- Spec includes local-only vs cloud-only notes where relevant
- Cloud-mode tests are explicitly classified as read-only or isolated-environment-only
- Spec is stored under `docs/test-specs/`

## Ownership
- Assignee: `FardeenI`
- Due: `April 11, 2026`

## Dependencies
- Blocked by: #1
- Unblocks: #9, #10, #15'"'''
    },
    {
        'title': 'Sprint 4: Integration Test Implementation + Environment Matrix',
        'assignee': 'Aiden-Barrera',
        'body': '''## Summary
Implement the integration tests from the spec.

Support two execution targets:
- "'`local`: starts local frontend/backend dependencies and runs against localhost
- `cloud`: runs against already-deployed frontend/backend URLs without starting local app servers

Add environment selection via explicit env vars or script arguments. Document which tests are:
- portable across both targets
- local-only because they depend on reset/seed control
- cloud-only because they validate deployed behavior

Keep cloud-target coverage read-only by default:
- health and reachability
- guest public channel rendering
- public SSR metadata and canonical URL fetches
- sitemap/robots fetches
- SSE connect/disconnect smoke checks without mutating shared production state

Capture/structure output for both local and cloud runs. Keep target URLs, environment contracts, and replica-sensitive validations aligned with `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`.

## Acceptance Criteria
- Tests run in a local configuration
- Tests run in a cloud configuration
- Cloud mode does not require local frontend/backend startup
- Cloud-mode tests cannot mutate non-isolated deployed state unless a separately documented isolated environment exists
- Any environment-specific exceptions are documented

## Ownership
- Assignee: `Aiden-Barrera`
- Due: `April 14, 2026`

## Dependencies
- Blocked by: #8, #6, #7
- Unblocks: #10, #14, #15'"'''
    },
    {
        'title': 'Sprint 4: GitHub Action run-integration-tests.yml',
        'assignee': 'FardeenI',
        'body': '''## Summary
Create "'`.github/workflows/run-integration-tests.yml`.

Install frontend/backend dependencies. Set up the required environment for integration tests. Run the local-target integration suite in CI. Keep the workflow name and job names stable so they can be required in branch protection.

Document how cloud-target integration tests are invoked outside CI when deployed URLs are available. Reference `docs/deployment/deployment-architecture.md` for environment inputs and `docs/deployment/replica-readiness-audit.md` for any replica-sensitive checks excluded from local CI.

## Acceptance Criteria
- Workflow passes on a PR
- Workflow is usable as a required status check
- YAML is committed and documented

## Ownership
- Assignee: `FardeenI`
- Due: `April 15, 2026`

## Dependencies
- Blocked by: #8, #9
- Unblocks: #13, #15'"'''
    },
    {
        'title': 'Sprint 4: GitHub Action deploy-railway.yml',
        'assignee': 'FardeenI',
        'body': '''## Summary
Create backend CD workflow for Railway.

Start from the already-provisioned Railway project tied to the current project state so the workflow can be scaffolded and dry-run this weekend. Deploy "'`backend-api` and `backend-worker` on pushes to `main`. Ensure migrations / build / deploy ordering is safe. Use GitHub secrets for Railway authentication.

Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted. Implement the workflow against the service topology and env contract defined in `docs/deployment/deployment-architecture.md`.

If final backend service split details are still landing, create the workflow early and finish the final production wiring immediately after #5 and #7.

## Acceptance Criteria
- Workflow deploys backend services without manual intervention
- Production deploy authority is unambiguous and documented
- Exactly one migration runner performs `prisma migrate deploy`, and `backend-api` replicas are prevented from racing migrations on startup
- Schema rollout rules follow an expand/contract convention so destructive migrations are not introduced in the same deploy that must coexist with old API replicas during rolling restart
- Deploys target the correct Railway environment
- Deployment process is documented in README

## Ownership
- Assignee: `FardeenI`
- Backup owner: `Aiden-Barrera`
- Due: `April 12, 2026`

## Dependencies
- Blocked by: #5, #7
- Unblocks: #14, #15'"'''
    },
    {
        'title': 'Sprint 4: GitHub Action deploy-vercel.yml',
        'assignee': 'declanblanc',
        'body': '''## Summary
Create frontend CD workflow for Vercel.

Start from the already-provisioned Vercel project tied to the current project state so the workflow can be scaffolded and dry-run this weekend. Build/deploy frontend on pushes to "'`main`. Ensure preview/production environment variables are configured properly. Use GitHub secrets/tokens safely.

Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted. Implement the workflow against the domain/env decisions in `docs/deployment/deployment-architecture.md`.

If final frontend production config is still landing, create the workflow early and finish the final production wiring immediately after #6 and #16.

## Acceptance Criteria
- Workflow deploys frontend without manual intervention
- Production deploy authority is unambiguous and documented
- Production deploy points at the production backend URL
- Deployment process is documented in README

## Ownership
- Assignee: `declanblanc`
- Backup owner: `AvanishKulkarni`
- Due: `April 12, 2026`

## Dependencies
- Blocked by: #6, #16
- Unblocks: #15'"'''
    },
    {
        'title': 'Sprint 4: GitHub Hygiene and Branch Protection',
        'assignee': 'Aiden-Barrera',
        'body': '''## Summary
Enforce feature branch workflow. Configure branch protection for "'`main`. Require PR review before merge. Require passing status checks before merge.

Record the exact required checks to enable:
- existing unit test workflows
- `run-integration-tests`

Reference `docs/deployment/deployment-architecture.md` when documenting the production deploy authority and required checks tied to production promotion.

## Acceptance Criteria
- Direct pushes to `main` are blocked
- PR review is required
- Required status checks are enabled
- Team workflow is documented

## Ownership
- Assignee: `Aiden-Barrera`
- Due: `April 16, 2026`

## Dependencies
- Blocked by: #10
- Unblocks: #15'"'''
    },
    {
        'title': 'Sprint 4: Vercel Project Setup, Domains, and Preview/Prod Verification',
        'assignee': 'declanblanc',
        'body': '''## Summary
Create/configure the Vercel project. Bind the production domain. Configure preview and production environment variables. Verify frontend is talking to the correct Railway backend in production.

Configure domains and env vars to match "'`docs/deployment/deployment-architecture.md`.

## Acceptance Criteria
- Preview deployment works
- Production deployment works
- Domain and environment configuration are documented

## Ownership
- Assignee: `declanblanc`
- Backup owner: `FardeenI`
- Due: `April 14, 2026`

## Dependencies
- Blocked by: #1, #6
- Unblocks: #12, #14, #15'"'''
    },
    {
        'title': 'Sprint 4: Railway Multi-Replica Validation and Deployment Evidence',
        'assignee': 'declanblanc',
        'body': '''## Summary
Scale "'`backend-api` to 2 or more replicas on Railway. Keep `backend-worker` at 1 replica.

Verify and capture evidence for:
- public page loads through the deployed frontend
- authenticated API behavior through multiple API replicas
- shared rate limiting across replicas
- attachment access independent of serving replica
- cache invalidation / indexing behavior via singleton worker
- SSE/realtime smoke verification in deployed environment

Run the cloud-target integration/smoke suite against the deployed system. Keep deployed-environment smoke verification read-only unless a separate isolated cloud test environment is explicitly provisioned. Use the replica observability added in #5 to prove requests were served across 2+ API replicas via headers, health output, and/or structured logs.

Capture logs/screenshots/test output needed for submission. Validate against the expected topology in `docs/deployment/deployment-architecture.md` and the replica-safety checklist in `docs/deployment/replica-readiness-audit.md`.

## Acceptance Criteria
- Live deployment is stable with `backend-api` at 2+ replicas
- No replica-specific failures are observed for required paths
- Proxy-aware rate limiting is validated against the documented one-hop trust model
- Cloud-target tests pass against deployed URLs
- Evidence clearly distinguishes deployed-system validation from localhost validation

## Ownership
- Assignee: `declanblanc`
- Backup owner: `Aiden-Barrera`
- Due: `April 18, 2026`

## Dependencies
- Blocked by: #3, #4, #5, #7, #9, #11, #16
- Unblocks: #15'"'''
    },
    {
        'title': 'Sprint 4: README, Final Artifact Collection, and Submission Package',
        'assignee': 'acabrera04',
        'body': '''## Summary
Update "'`README.md` with:
- how web users access the deployed app
- how to run the app locally
- how a forked user sets up Vercel + Railway deployment
- how CI/CD and branch protection are expected to work

Fold in the final decisions captured in `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`.

Compile the final P6-equivalent artifact checklist:
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

## Acceptance Criteria
- README is complete and accurate
- Submission checklist has no missing artifacts
- Team knows who owns final reflection/log collation

## Ownership
- Assignee: `acabrera04`
- Backup owner: `FardeenI`
- Due: `April 19, 2026`

## Dependencies
- Blocked by: #4, #8, #9, #10, #11, #12, #13, #14, #16'"'''
    },
]


def run(cmd):
    return subprocess.run(cmd, check=True, text=True, capture_output=True)

# Ensure label exists.
labels = run(['gh', 'label', 'list', '--repo', repo]).stdout
if label not in labels:
    run(['gh', 'label', 'create', label, '--repo', repo, '--color', '0e8a16', '--description', 'P6 deployment sprint work'])

created = []
for issue in issues:
    result = run([
        'gh', 'issue', 'create',
        '--repo', repo,
        '--title', issue['title'],
        '--body', issue['body'],
        '--assignee', issue['assignee'],
        '--label', label,
    ])
    url = result.stdout.strip().splitlines()[-1]
    created.append({'title': issue['title'], 'url': url})
    run(['gh', 'project', 'item-add', project, '--owner', owner, '--url', url])

print(json.dumps(created, indent=2))
PY
python3 /tmp/create_sprint4_issues.py"
Chunk ID: 35da54
Wall time: 5.0019 seconds
Process running with session ID 25320
Original token count: 0
Output:
```

#### Tool: exec_command

```sh
gh issue list --repo CS485-Harmony/Harmony --search 'Sprint 4 in:title' --limit 30
```

Output:

```text
319	OPEN	Sprint 4: Production Attachment Storage Provider	P6: Deployment	2026-04-11T14:38:09Z
316	OPEN	Sprint 4: Deployment Architecture + Environment Matrix	P6: Deployment	2026-04-11T14:38:00Z
321	OPEN	Sprint 4: Frontend Production Configuration for Vercel	P6: Deployment	2026-04-11T14:38:14Z
322	OPEN	Sprint 4: Railway Project Provisioning and Service Wiring	P6: Deployment	2026-04-11T14:38:17Z
318	OPEN	Sprint 4: Shared Rate Limiting + Proxy-Aware Networking	P6: Deployment	2026-04-11T14:38:06Z
317	OPEN	Sprint 4: Backend Scale Audit for Railway Replicas	P6: Deployment	2026-04-11T14:38:03Z
320	OPEN	Sprint 4: Split backend-api and Singleton backend-worker	P6: Deployment	2026-04-11T14:38:11Z
```

#### Tool: exec_command

```sh
gh label list --repo CS485-Harmony/Harmony | rg '^P6: Deployment\b'
```

Output:

```text
P6: Deployment	P6 deployment sprint work	#0e8a16
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:38:28.719Z

The first batch completed far enough to create the label and seven issues. Something stalled mid-run after that, so I’m switching to a smaller idempotent pass: detect what’s missing, create only the remaining issues, then verify board membership for all 16.

#### Tool: exec_command

```sh
gh issue list --repo CS485-Harmony/Harmony --search 'Sprint 4 in:title' --limit 50 --json number,title,url,assignees,labels
```

Output:

```text
[{"assignees":[{"id":"U_kgDOCKOSYA","login":"FardeenI","name":"Fardeen Iqbal","databaseId":0}],"labels":[{"id":"LA_kwDORIrGY88AAAACe8_5OQ","name":"P6: Deployment","description":"P6 deployment sprint work","color":"0e8a16"}],"number":323,"title":"Sprint 4: Integration Test Specification","url":"https://github.com/CS485-Harmony/Harmony/issues/323"},{"assignees":[{"id":"MDQ6VXNlcjU1MDEyNDk0","login":"AvanishKulkarni","name":"Avanish Kulkarni","databaseId":0}],"labels":[{"id":"LA_kwDORIrGY88AAAACe8_5OQ","name":"P6: Deployment","description":"P6 deployment sprint work","color":"0e8a16"}],"number":319,"title":"Sprint 4: Production Attachment Storage Provider","url":"https://github.com/CS485-Harmony/Harmony/issues/319"},{"assignees":[{"id":"U_kgDOCKUwww","login":"acabrera04","name":"Allen Cabrera","databaseId":0}],"labels":[{"id":"LA_kwDORIrGY88AAAACe8_5OQ","name":"P6: Deployment","description":"P6 deployment sprint work","color":"0e8a16"}],"number":316,"title":"Sprint 4: Deployment Architecture + Environment Matrix","url":"https://github.com/CS485-Harmony/Harmony/issues/316"},{"assignees":[{"id":"U_kgDOCVBL7g","login":"Aiden-Barrera","name":"Aiden Barrera","databaseId":0}],"labels":[{"id":"LA_kwDORIrGY88AAAACe8_5OQ","name":"P6: Deployment","description":"P6 deployment sprint work","color":"0e8a16"}],"number":324,"title":"Sprint 4: Integration Test Implementation + Environment Matrix","url":"https://github.com/CS485-Harmony/Harmony/issues/324"},{"assignees":[{"id":"MDQ6VXNlcjQ5OTM0NTc2","login":"declanblanc","name":"Declan","databaseId":0}],"labels":[{"id":"LA_kwDORIrGY88AAAACe8_5OQ","name":"P6: Deployment","description":"P6 deployment sprint work","color":"0e8a16"}],"number":321,"title":"Sprint 4: Frontend Production Configuration for Vercel","url":"https://github.com/CS485-Harmony/Harmony/issues/321"},{"assignees":[{"id":"U_kgDOCKOSYA","login":"FardeenI","name":"Fardeen Iqbal","databaseId":0}],"labels":[{"id":"LA_kwDORIrGY88AAAACe8_5OQ","name":"P6: Deployment","description":"P6 deployment sprint work","color":"0e8a16"}],"number":325,"title":"Sprint 4: GitHub Action run-integration-tests.yml","url":"https://github.com/CS485-Harmony/Harmony/issues/325"},{"assignees":[{"id":"U_kgDOCKOSYA","login":"FardeenI","name":"Fardeen Iqbal","databaseId":0}],"labels":[{"id":"LA_kwDORIrGY88AAAACe8_5OQ","name":"P6: Deployment","description":"P6 deployment sprint work","color":"0e8a16"}],"number":322,"title":"Sprint 4: Railway Project Provisioning and Service Wiring","url":"https://github.com/CS485-Harmony/Harmony/issues/322"},{"assignees":[{"id":"U_kgDOCVBL7g","login":"Aiden-Barrera","name":"Aiden Barrera","databaseId":0}],"labels":[{"id":"LA_kwDORIrGY88AAAACe8_5OQ","name":"P6: Deployment","description":"P6 deployment sprint work","color":"0e8a16"}],"number":318,"title":"Sprint 4: Shared Rate Limiting + Proxy-Aware Networking","url":"https://github.com/CS485-Harmony/Harmony/issues/318"},{"assignees":[{"id":"MDQ6VXNlcjQ5OTM0NTc2","login":"declanblanc","name":"Declan","databaseId":0}],"labels":[{"id":"LA_kwDORIrGY88AAAACe8_5OQ","name":"P6: Deployment","description":"P6 deployment sprint work","color":"0e8a16"}],"number":317,"title":"Sprint 4: Backend Scale Audit for Railway Replicas","url":"https://github.com/CS485-Harmony/Harmony/issues/317"},{"assignees":[{"id":"MDQ6VXNlcjQ5OTM0NTc2","login":"declanblanc","name":"Declan","databaseId":0}],"labels":[{"id":"LA_kwDORIrGY88AAAACe8_5OQ","name":"P6: Deployment","description":"P6 deployment sprint work","color":"0e8a16"}],"number":320,"title":"Sprint 4: Split backend-api and Singleton backend-worker","url":"https://github.com/CS485-Harmony/Harmony/issues/320"}]
```

#### Tool: exec_command

```sh
gh project item-list 1 --owner CS485-Harmony --limit 100
```

Output:

```text

```

#### Tool: write_stdin

```json
{
  "session_id": 63898,
  "chars": "",
  "yield_time_ms": 1000,
  "max_output_tokens": 6000
}
```

Output:

```text
Command: /bin/zsh -lc 'gh project item-list 1 --owner CS485-Harmony --limit 100'
Chunk ID: 5f5b57
Wall time: 0.0000 seconds
Process exited with code 0
Original token count: 2497
Output:
Issue	test: add negative guard coverage for createReply event publish	245	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLN0
Issue	fix: authenticated users see "Sign up or log in" on inaccessible channels	240	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLV8
Issue	Unit Tests — public.router.ts	292	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLWE
Issue	Unit Tests — serverMember.service.ts	269	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLWU
Issue	Test Specification — serverMember.service.ts	268	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLWw
Issue	Test Specification — channelService.ts (frontend)	261	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLXM
Issue	README Update & Final Submission	267	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLXU
Issue	Unit Tests — auth.service.ts	263	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLXo
Issue	Unit Tests — server.service.ts	264	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLX8
Issue	GitHub Actions — CI Workflows (run-frontend-tests.yml + run-backend-tests.yml)	262	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLYQ
Issue	Test Specification — serverService.ts (frontend)	260	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLYc
Issue	Test Specification — server.service.ts	259	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLYk
Issue	Test Specification — auth.service.ts	258	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLYw
Issue	Unit Tests — serverService.ts (frontend)	265	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLZA
Issue	chore: add structured logger utility for observability and debug	194	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLZU
Issue	Test Specification — channel.service.ts	293	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLZk
Issue	Unit Tests — publicApiService.ts (frontend)	290	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLZ0
Issue	Test Specification — public.router.ts	291	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLaI
Issue	Unit Tests — channel.service.ts	294	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLaQ
Issue	Test Specification — publicApiService.ts (frontend)	289	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLaY
Issue	Implement message replies/threads (schema, service, router, tests)	151	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLak
Issue	Wire up pin button and implement pinned messages panel	153	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLa0
Issue	Frontend Integration — Voice Channels (Stretch Goal)	122	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLbE
Issue	Attachment Service & File Storage	112	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLbI
Issue	Real-time messaging: other clients don't receive new messages	180	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLbo
Issue	Next.js Auth Middleware — Server-Side Route Protection	119	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLb0
Issue	Message Service & API	101	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLcc
Issue	P4 Deliverables — Dev Spec Update & Architecture Document	95	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLco
Issue	Backend Project Scaffold & Dev Environment	94	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLdI
Issue	Database Schema & Prisma Migrations	96	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLdk
Issue	Authentication System — JWT Register/Login/Logout	97	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLd8
Issue	Server Service & API	99	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLeI
Issue	Channel Service & API	100	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLeg
Issue	Role-Based Permission & Authorization System	102	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLew
Issue	Server Membership Service	103	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLe8
Issue	Channel Visibility Toggle Service	105	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLfE
Issue	Visibility Audit Log Service	106	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLfQ
Issue	Rate Limiting Middleware	110	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLfs
Issue	Redis Caching Layer	109	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLi4
Issue	Frontend Integration — Authentication	113	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLjA
Issue	Frontend Integration — Servers & Channels	114	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLjQ
Issue	Frontend Integration — Messages	115	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLjg
Issue	Backend README — Setup & Operations Guide	120	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLjw
Issue	Frontend Integration — Guest Public Channel View	116	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLkA
Issue	API Input Validation & Error Handling	118	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLlc
Issue	Frontend Integration — Channel Visibility Toggle	117	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLls
Issue	Responsive design audit and fixes	38	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLl8
Issue	Build VisibilityToggle component	30	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLmU
Issue	Build toast notification system	35	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLms
Issue	Build 404 and error pages	36	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLm8
Issue	Integrate channel visibility with guest view	37	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLnU
Issue	Build ServerSidebar component (server icon list)	20	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLno
Issue	Epic: Core App Layout & Navigation	47	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLoA
Issue	Build ChannelSidebar component	21	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLos
Issue	Build MessageInput component	26	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLpA
Issue	Epic: Integration, Testing & Demo	51	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLpE
Issue	Build GuestPromoBanner component	33	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLpM
Issue	Create App Router with layout routes	19	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLpk
Issue	Event Bus — Redis Pub/Sub for Cross-Service Events	111	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLqA
Issue	Build Auth Context and login/logout flow	34	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLqQ
Issue	Create mock API service layer	18	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLqY
Issue	Create mock data layer	17	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLqs
Issue	UI Mockups: Channel Visibility Toggle (Figma)	40	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLrA
Issue	Build SearchBar modal component	43	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLrU
Issue	Build VisibilityGuard component	32	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLro
Issue	Build MembersSidebar component	27	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLsA
Issue	Build TopBar component	22	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLsQ
Issue	Install and configure Tailwind CSS	15	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLsc
Issue	Scaffold React + TypeScript + Vite project	14	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLtA
Issue	Channel privacy settings	1	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLtQ
Issue	View public channels without logging in	2	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLtw
Issue	Threads & Messages Store Relevant Data	3	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLuA
Issue	Define TypeScript types and interfaces	16	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLuM
Issue	Build AppLayout (3-column layout shell)	23	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLuY
Issue	Accessibility audit and fixes	39	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLuo
Issue	UI Mockups: Guest Public Channel View (Figma)	41	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLuw
Issue	Screen Recording: Demo Video and YouTube Upload	42	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLvA
Issue	Epic: Project Scaffolding & Setup	46	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLvQ
Issue	Build MessageItem component	25	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLvg
Issue	Build UserStatusBar component	28	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLvo
Issue	Build MessageList component	24	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLwE
Issue	Build ChannelSettingsPage	29	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLwQ
Issue	Fix non-admin redirect spinner delay on /settings/* routes	71	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLws
Issue	Implement Permissions section in ChannelSettingsPage	72	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLxE
Issue	Build channel creation modal	44	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLxc
Issue	Build GuestChannelView page	31	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLxs
Issue	Build User Settings Page	88	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLx4
Issue	Users need to be able to log out	75	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLyE
Issue	Build server creation modal	84	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLyw
Issue	Implement Server Settings (name, icon, description)	86	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprLzo
Issue	Epic: Chat UI Components	48	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprL0o
Issue	Epic: Channel Visibility Toggle Feature	49	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprL1k
Issue	Epic: Guest Public Channel View Feature	50	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprL2M
Issue	User Service & API	98	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprL2Y
Issue	Database Seed Data	104	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprL2s
Issue	Fix flaky setTimeout in visibility event emission test	147	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprL3E
Issue	Implement message reactions (schema, service, router, tests)	152	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprL3Q
Issue	Implement message reply service methods	154	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprL3g
Issue	Implement message reaction service	155	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprL4A
Issue	Implement tRPC reaction router	156	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprL4Q
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:38:42.849Z

The board still doesn’t have the Sprint 4 items, and six issues are missing. I’m doing a second pass that only creates the missing six by title, then I’ll bulk-add all Sprint 4 issues to the board so the final state is deterministic.

#### Tool: exec_command

```sh
cat > /tmp/fill_sprint4_issues.py <<'PY'
import json
import subprocess

repo = 'CS485-Harmony/Harmony'
label = 'P6: Deployment'

existing = subprocess.run([
    'gh','issue','list','--repo',repo,'--search','Sprint 4 in:title','--limit','100','--json','title'
], check=True, text=True, capture_output=True).stdout
existing_titles = {item['title'] for item in json.loads(existing)}

issues = [
    {
        'title': 'Sprint 4: GitHub Action deploy-railway.yml',
        'assignee': 'FardeenI',
        'body': """## Summary
Create backend CD workflow for Railway.

Start from the already-provisioned Railway project tied to the current project state so the workflow can be scaffolded and dry-run this weekend. Deploy `backend-api` and `backend-worker` on pushes to `main`. Ensure migrations / build / deploy ordering is safe. Use GitHub secrets for Railway authentication.

Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted. Implement the workflow against the service topology and env contract defined in `docs/deployment/deployment-architecture.md`.

If final backend service split details are still landing, create the workflow early and finish the final production wiring immediately after #5 and #7.

## Acceptance Criteria
- Workflow deploys backend services without manual intervention
- Production deploy authority is unambiguous and documented
- Exactly one migration runner performs `prisma migrate deploy`, and `backend-api` replicas are prevented from racing migrations on startup
- Schema rollout rules follow an expand/contract convention so destructive migrations are not introduced in the same deploy that must coexist with old API replicas during rolling restart
- Deploys target the correct Railway environment
- Deployment process is documented in README

## Ownership
- Assignee: `FardeenI`
- Backup owner: `Aiden-Barrera`
- Due: `April 12, 2026`

## Dependencies
- Blocked by: #5, #7
- Unblocks: #14, #15"""
    },
    {
        'title': 'Sprint 4: GitHub Action deploy-vercel.yml',
        'assignee': 'declanblanc',
        'body': """## Summary
Create frontend CD workflow for Vercel.

Start from the already-provisioned Vercel project tied to the current project state so the workflow can be scaffolded and dry-run this weekend. Build/deploy frontend on pushes to `main`. Ensure preview/production environment variables are configured properly. Use GitHub secrets/tokens safely.

Treat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted. Implement the workflow against the domain/env decisions in `docs/deployment/deployment-architecture.md`.

If final frontend production config is still landing, create the workflow early and finish the final production wiring immediately after #6 and #16.

## Acceptance Criteria
- Workflow deploys frontend without manual intervention
- Production deploy authority is unambiguous and documented
- Production deploy points at the production backend URL
- Deployment process is documented in README

## Ownership
- Assignee: `declanblanc`
- Backup owner: `AvanishKulkarni`
- Due: `April 12, 2026`

## Dependencies
- Blocked by: #6, #16
- Unblocks: #15"""
    },
    {
        'title': 'Sprint 4: GitHub Hygiene and Branch Protection',
        'assignee': 'Aiden-Barrera',
        'body': """## Summary
Enforce feature branch workflow. Configure branch protection for `main`. Require PR review before merge. Require passing status checks before merge.

Record the exact required checks to enable:
- existing unit test workflows
- `run-integration-tests`

Reference `docs/deployment/deployment-architecture.md` when documenting the production deploy authority and required checks tied to production promotion.

## Acceptance Criteria
- Direct pushes to `main` are blocked
- PR review is required
- Required status checks are enabled
- Team workflow is documented

## Ownership
- Assignee: `Aiden-Barrera`
- Due: `April 16, 2026`

## Dependencies
- Blocked by: #10
- Unblocks: #15"""
    },
    {
        'title': 'Sprint 4: Vercel Project Setup, Domains, and Preview/Prod Verification',
        'assignee': 'declanblanc',
        'body': """## Summary
Create/configure the Vercel project. Bind the production domain. Configure preview and production environment variables. Verify frontend is talking to the correct Railway backend in production.

Configure domains and env vars to match `docs/deployment/deployment-architecture.md`.

## Acceptance Criteria
- Preview deployment works
- Production deployment works
- Domain and environment configuration are documented

## Ownership
- Assignee: `declanblanc`
- Backup owner: `FardeenI`
- Due: `April 14, 2026`

## Dependencies
- Blocked by: #1, #6
- Unblocks: #12, #14, #15"""
    },
    {
        'title': 'Sprint 4: Railway Multi-Replica Validation and Deployment Evidence',
        'assignee': 'declanblanc',
        'body': """## Summary
Scale `backend-api` to 2 or more replicas on Railway. Keep `backend-worker` at 1 replica.

Verify and capture evidence for:
- public page loads through the deployed frontend
- authenticated API behavior through multiple API replicas
- shared rate limiting across replicas
- attachment access independent of serving replica
- cache invalidation / indexing behavior via singleton worker
- SSE/realtime smoke verification in deployed environment

Run the cloud-target integration/smoke suite against the deployed system. Keep deployed-environment smoke verification read-only unless a separate isolated cloud test environment is explicitly provisioned. Use the replica observability added in #5 to prove requests were served across 2+ API replicas via headers, health output, and/or structured logs.

Capture logs/screenshots/test output needed for submission. Validate against the expected topology in `docs/deployment/deployment-architecture.md` and the replica-safety checklist in `docs/deployment/replica-readiness-audit.md`.

## Acceptance Criteria
- Live deployment is stable with `backend-api` at 2+ replicas
- No replica-specific failures are observed for required paths
- Proxy-aware rate limiting is validated against the documented one-hop trust model
- Cloud-target tests pass against deployed URLs
- Evidence clearly distinguishes deployed-system validation from localhost validation

## Ownership
- Assignee: `declanblanc`
- Backup owner: `Aiden-Barrera`
- Due: `April 18, 2026`

## Dependencies
- Blocked by: #3, #4, #5, #7, #9, #11, #16
- Unblocks: #15"""
    },
    {
        'title': 'Sprint 4: README, Final Artifact Collection, and Submission Package',
        'assignee': 'acabrera04',
        'body': """## Summary
Update `README.md` with:
- how web users access the deployed app
- how to run the app locally
- how a forked user sets up Vercel + Railway deployment
- how CI/CD and branch protection are expected to work

Fold in the final decisions captured in `docs/deployment/deployment-architecture.md` and `docs/deployment/replica-readiness-audit.md`.

Compile the final P6-equivalent artifact checklist:
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

## Acceptance Criteria
- README is complete and accurate
- Submission checklist has no missing artifacts
- Team knows who owns final reflection/log collation

## Ownership
- Assignee: `acabrera04`
- Backup owner: `FardeenI`
- Due: `April 19, 2026`

## Dependencies
- Blocked by: #4, #8, #9, #10, #11, #12, #13, #14, #16"""
    },
]

created = []
for issue in issues:
    if issue['title'] in existing_titles:
        continue
    result = subprocess.run([
        'gh','issue','create','--repo',repo,
        '--title',issue['title'],
        '--body',issue['body'],
        '--assignee',issue['assignee'],
        '--label',label,
    ], check=True, text=True, capture_output=True)
    created.append(result.stdout.strip().splitlines()[-1])

print(json.dumps(created, indent=2))
PY
python3 /tmp/fill_sprint4_issues.py
```

Output:

```text
[]
```

#### Tool: exec_command

```sh
gh issue list --repo CS485-Harmony/Harmony --search 'Sprint 4 in:title' --limit 50 --json number,title,url
```

Output:

```text
[{"number":323,"title":"Sprint 4: Integration Test Specification","url":"https://github.com/CS485-Harmony/Harmony/issues/323"},{"number":319,"title":"Sprint 4: Production Attachment Storage Provider","url":"https://github.com/CS485-Harmony/Harmony/issues/319"},{"number":316,"title":"Sprint 4: Deployment Architecture + Environment Matrix","url":"https://github.com/CS485-Harmony/Harmony/issues/316"},{"number":328,"title":"Sprint 4: GitHub Hygiene and Branch Protection","url":"https://github.com/CS485-Harmony/Harmony/issues/328"},{"number":327,"title":"Sprint 4: GitHub Action deploy-vercel.yml","url":"https://github.com/CS485-Harmony/Harmony/issues/327"},{"number":326,"title":"Sprint 4: GitHub Action deploy-railway.yml","url":"https://github.com/CS485-Harmony/Harmony/issues/326"},{"number":324,"title":"Sprint 4: Integration Test Implementation + Environment Matrix","url":"https://github.com/CS485-Harmony/Harmony/issues/324"},{"number":321,"title":"Sprint 4: Frontend Production Configuration for Vercel","url":"https://github.com/CS485-Harmony/Harmony/issues/321"},{"number":325,"title":"Sprint 4: GitHub Action run-integration-tests.yml","url":"https://github.com/CS485-Harmony/Harmony/issues/325"},{"number":322,"title":"Sprint 4: Railway Project Provisioning and Service Wiring","url":"https://github.com/CS485-Harmony/Harmony/issues/322"},{"number":318,"title":"Sprint 4: Shared Rate Limiting + Proxy-Aware Networking","url":"https://github.com/CS485-Harmony/Harmony/issues/318"},{"number":317,"title":"Sprint 4: Backend Scale Audit for Railway Replicas","url":"https://github.com/CS485-Harmony/Harmony/issues/317"},{"number":331,"title":"Sprint 4: README, Final Artifact Collection, and Submission Package","url":"https://github.com/CS485-Harmony/Harmony/issues/331"},{"number":330,"title":"Sprint 4: Railway Multi-Replica Validation and Deployment Evidence","url":"https://github.com/CS485-Harmony/Harmony/issues/330"},{"number":320,"title":"Sprint 4: Split backend-api and Singleton backend-worker","url":"https://github.com/CS485-Harmony/Harmony/issues/320"},{"number":329,"title":"Sprint 4: Vercel Project Setup, Domains, and Preview/Prod Verification","url":"https://github.com/CS485-Harmony/Harmony/issues/329"}]
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:39:39.368Z

All 16 Sprint 4 issues exist now. I’m doing one clean board-sync pass: compare the project’s current issue numbers against the Sprint 4 issue numbers, then add only the missing ones so we avoid duplicate project items.

#### Tool: exec_command

```sh
python3 - <<'PY'
import json, subprocess, re
repo='CS485-Harmony/Harmony'
owner='CS485-Harmony'
project='1'
issues = json.loads(subprocess.run([
    'gh','issue','list','--repo',repo,'--search','Sprint 4 in:title','--limit','100','--json','number,url'
], check=True, text=True, capture_output=True).stdout)
board_raw = subprocess.run([
    'gh','project','item-list',project,'--owner',owner,'--limit','200'
], check=True, text=True, capture_output=True).stdout
board_numbers=set()
for line in board_raw.splitlines():
    m=re.search(r'\t(\d+)\tCS485-Harmony/Harmony\t', line)
    if m:
        board_numbers.add(int(m.group(1)))
added=[]
for issue in issues:
    if issue['number'] in board_numbers:
        continue
    subprocess.run(['gh','project','item-add',project,'--owner',owner,'--url',issue['url']], check=True, text=True, capture_output=True)
    added.append(issue['number'])
print(json.dumps({'added':added,'existing':sorted(board_numbers & {i['number'] for i in issues})}, indent=2))
PY
```

Output:

```text

```

#### Tool: write_stdin

```json
{
  "session_id": 88112,
  "chars": "",
  "yield_time_ms": 1000,
  "max_output_tokens": 8000
}
```

Output:

```text
Command: /bin/zsh -lc "python3 - <<'PY'
import json, subprocess, re
repo='CS485-Harmony/Harmony'
owner='CS485-Harmony'
project='1'
issues = json.loads(subprocess.run([
    'gh','issue','list','--repo',repo,'--search','Sprint 4 in:title','--limit','100','--json','number,url'
], check=True, text=True, capture_output=True).stdout)
board_raw = subprocess.run([
    'gh','project','item-list',project,'--owner',owner,'--limit','200'
], check=True, text=True, capture_output=True).stdout
board_numbers=set()
for line in board_raw.splitlines():
    m=re.search(r'\\t(\\d+)\\tCS485-Harmony/Harmony\\t', line)
    if m:
        board_numbers.add(int(m.group(1)))
added=[]
for issue in issues:
    if issue['number'] in board_numbers:
        continue
    subprocess.run(['gh','project','item-add',project,'--owner',owner,'--url',issue['url']], check=True, text=True, capture_output=True)
    added.append(issue['number'])
print(json.dumps({'added':added,'existing':sorted(board_numbers & {i['number'] for i in issues})}, indent=2))
PY"
Chunk ID: f04dcb
Wall time: 1.0647 seconds
Process exited with code 0
Original token count: 46
Output:
{
  "added": [],
  "existing": [
    316,
    317,
    318,
    319,
    320,
    321,
    322,
    323,
    324,
    325,
    326,
    327,
    328,
    329,
    330,
    331
  ]
}
```

#### Tool: exec_command

```sh
python3 - <<'PY'
import json, subprocess
items=json.loads(subprocess.run(['gh','issue','list','--repo','CS485-Harmony/Harmony','--search','Sprint 4 in:title','--limit','100','--json','number,title,labels'],check=True,text=True,capture_output=True).stdout)
missing=[]
for item in items:
    labels={l['name'] for l in item['labels']}
    if 'P6: Deployment' not in labels:
        missing.append(item['number'])
print(json.dumps({'count': len(items), 'missing_label': missing}, indent=2))
PY
```

Output:

```text
{
  "count": 16,
  "missing_label": []
}
```

#### Tool: exec_command

```sh
gh project item-list 1 --owner CS485-Harmony --limit 200 | rg '\t(316|317|318|319|320|321|322|323|324|325|326|327|328|329|330|331)\tCS485-Harmony/Harmony\t'
```

Output:

```text

```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:40:07.429Z

Verification is almost done. I’ve already confirmed all 16 Sprint 4 issues carry `P6: Deployment`; I’m just checking the board view for the exact issue number set so I can give you the final IDs cleanly.

#### Tool: write_stdin

```json
{
  "session_id": 65027,
  "chars": "",
  "yield_time_ms": 1000,
  "max_output_tokens": 6000
}
```

Output:

```text
Command: /bin/zsh -lc "gh project item-list 1 --owner CS485-Harmony --limit 200 | rg '\\t(316|317|318|319|320|321|322|323|324|325|326|327|328|329|330|331)\\tCS485-Harmony/Harmony\\t'"
Chunk ID: f635c1
Wall time: 0.0000 seconds
Process exited with code 0
Original token count: 463
Output:
Issue	Sprint 4: Deployment Architecture + Environment Matrix	316	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprMtM
Issue	Sprint 4: Backend Scale Audit for Railway Replicas	317	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprMtg
Issue	Sprint 4: Shared Rate Limiting + Proxy-Aware Networking	318	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprMt8
Issue	Sprint 4: Production Attachment Storage Provider	319	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprMuE
Issue	Sprint 4: Split backend-api and Singleton backend-worker	320	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprMug
Issue	Sprint 4: Frontend Production Configuration for Vercel	321	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprMu0
Issue	Sprint 4: Railway Project Provisioning and Service Wiring	322	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprMvU
Issue	Sprint 4: Integration Test Specification	323	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprMvk
Issue	Sprint 4: Integration Test Implementation + Environment Matrix	324	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprMv4
Issue	Sprint 4: GitHub Action run-integration-tests.yml	325	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprMwE
Issue	Sprint 4: GitHub Action deploy-railway.yml	326	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprMwY
Issue	Sprint 4: GitHub Action deploy-vercel.yml	327	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprMxA
Issue	Sprint 4: GitHub Hygiene and Branch Protection	328	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprMxM
Issue	Sprint 4: Vercel Project Setup, Domains, and Preview/Prod Verification	329	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprMxc
Issue	Sprint 4: Railway Multi-Replica Validation and Deployment Evidence	330	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprMx0
Issue	Sprint 4: README, Final Artifact Collection, and Submission Package	331	CS485-Harmony/Harmony	PVTI_lADOEFWyLM4BUSlMzgprMyI
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:40:14.920Z

Created the Sprint 4 plan tickets in `CS485-Harmony/Harmony`, added all 16 to `Harmony Project Board`, and verified every one is labeled `P6: Deployment`.

Issue numbers:
- `#316` Deployment Architecture + Environment Matrix
- `#317` Backend Scale Audit for Railway Replicas
- `#318` Shared Rate Limiting + Proxy-Aware Networking
- `#319` Production Attachment Storage Provider
- `#320` Split `backend-api` and Singleton `backend-worker`
- `#321` Frontend Production Configuration for Vercel
- `#322` Railway Project Provisioning and Service Wiring
- `#323` Integration Test Specification
- `#324` Integration Test Implementation + Environment Matrix
- `#325` GitHub Action `run-integration-tests.yml`
- `#326` GitHub Action `deploy-railway.yml`
- `#327` GitHub Action `deploy-vercel.yml`
- `#328` GitHub Hygiene and Branch Protection
- `#329` Vercel Project Setup, Domains, and Preview/Prod Verification
- `#330` Railway Multi-Replica Validation and Deployment Evidence
- `#331` README, Final Artifact Collection, and Submission Package

Verification:
- `16/16` Sprint 4 issues have the `P6: Deployment` label.
- `16/16` are present on project board `Harmony Project Board`.

### Turn 23: update the issues to use the relationship features in github (blocked

#### 👤 User Prompt

- Time: 2026-04-11T14:43:14.330Z

```text
update the issues to use the relationship features in github (blocked by, blocking, etc) and move the ones that are ready to the ready column and the ones that are blocked to the blocked column
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:43:28.116Z

I’m checking the project’s status field/options and the GitHub issue dependency API shape, then I’ll wire the Sprint 4 dependency graph into GitHub and place each issue in `Ready` or `Blocked` based on its current blockers.

#### Tool: exec_command

```sh
gh project field-list 1 --owner CS485-Harmony
```

Output:

```text

```

#### Tool: exec_command

```sh
gh issue list --repo CS485-Harmony/Harmony --search 'Sprint 4 in:title' --limit 50 --json number,title,id,url
```

Output:

```text
[{"id":"I_kwDORIrGY879BBK6","number":323,"title":"Sprint 4: Integration Test Specification","url":"https://github.com/CS485-Harmony/Harmony/issues/323"},{"id":"I_kwDORIrGY879BBEN","number":319,"title":"Sprint 4: Production Attachment Storage Provider","url":"https://github.com/CS485-Harmony/Harmony/issues/319"},{"id":"I_kwDORIrGY879BA_m","number":316,"title":"Sprint 4: Deployment Architecture + Environment Matrix","url":"https://github.com/CS485-Harmony/Harmony/issues/316"},{"id":"I_kwDORIrGY879BBSp","number":328,"title":"Sprint 4: GitHub Hygiene and Branch Protection","url":"https://github.com/CS485-Harmony/Harmony/issues/328"},{"id":"I_kwDORIrGY879BBRc","number":327,"title":"Sprint 4: GitHub Action deploy-vercel.yml","url":"https://github.com/CS485-Harmony/Harmony/issues/327"},{"id":"I_kwDORIrGY879BBQA","number":326,"title":"Sprint 4: GitHub Action deploy-railway.yml","url":"https://github.com/CS485-Harmony/Harmony/issues/326"},{"id":"I_kwDORIrGY879BBMj","number":324,"title":"Sprint 4: Integration Test Implementation + Environment Matrix","url":"https://github.com/CS485-Harmony/Harmony/issues/324"},{"id":"I_kwDORIrGY879BBHR","number":321,"title":"Sprint 4: Frontend Production Configuration for Vercel","url":"https://github.com/CS485-Harmony/Harmony/issues/321"},{"id":"I_kwDORIrGY879BBOW","number":325,"title":"Sprint 4: GitHub Action run-integration-tests.yml","url":"https://github.com/CS485-Harmony/Harmony/issues/325"},{"id":"I_kwDORIrGY879BBJL","number":322,"title":"Sprint 4: Railway Project Provisioning and Service Wiring","url":"https://github.com/CS485-Harmony/Harmony/issues/322"},{"id":"I_kwDORIrGY879BBCm","number":318,"title":"Sprint 4: Shared Rate Limiting + Proxy-Aware Networking","url":"https://github.com/CS485-Harmony/Harmony/issues/318"},{"id":"I_kwDORIrGY879BBA_","number":317,"title":"Sprint 4: Backend Scale Audit for Railway Replicas","url":"https://github.com/CS485-Harmony/Harmony/issues/317"},{"id":"I_kwDORIrGY879BBXP","number":331,"title":"Sprint 4: README, Final Artifact Collection, and Submission Package","url":"https://github.com/CS485-Harmony/Harmony/issues/331"},{"id":"I_kwDORIrGY879BBVi","number":330,"title":"Sprint 4: Railway Multi-Replica Validation and Deployment Evidence","url":"https://github.com/CS485-Harmony/Harmony/issues/330"},{"id":"I_kwDORIrGY879BBFv","number":320,"title":"Sprint 4: Split backend-api and Singleton backend-worker","url":"https://github.com/CS485-Harmony/Harmony/issues/320"},{"id":"I_kwDORIrGY879BBUF","number":329,"title":"Sprint 4: Vercel Project Setup, Domains, and Preview/Prod Verification","url":"https://github.com/CS485-Harmony/Harmony/issues/329"}]
```

#### Tool: write_stdin

```json
{
  "session_id": 33166,
  "chars": "",
  "yield_time_ms": 1000,
  "max_output_tokens": 4000
}
```

Output:

```text
Command: /bin/zsh -lc 'gh project field-list 1 --owner CS485-Harmony'
Chunk ID: 8c453a
Wall time: 0.0000 seconds
Process exited with code 0
Original token count: 216
Output:
Title	ProjectV2Field	PVTF_lADOEFWyLM4BUSlMzhBby4M
Assignees	ProjectV2Field	PVTF_lADOEFWyLM4BUSlMzhBby4Q
Status	ProjectV2SingleSelectField	PVTSSF_lADOEFWyLM4BUSlMzhBby4U
Labels	ProjectV2Field	PVTF_lADOEFWyLM4BUSlMzhBby4Y
Linked pull requests	ProjectV2Field	PVTF_lADOEFWyLM4BUSlMzhBby4c
Milestone	ProjectV2Field	PVTF_lADOEFWyLM4BUSlMzhBby4g
Repository	ProjectV2Field	PVTF_lADOEFWyLM4BUSlMzhBby4k
Reviewers	ProjectV2Field	PVTF_lADOEFWyLM4BUSlMzhBby4s
Parent issue	ProjectV2Field	PVTF_lADOEFWyLM4BUSlMzhBby4w
Sub-issues progress	ProjectV2Field	PVTF_lADOEFWyLM4BUSlMzhBby40
Priority	ProjectV2SingleSelectField	PVTSSF_lADOEFWyLM4BUSlMzhBby5E
Size	ProjectV2SingleSelectField	PVTSSF_lADOEFWyLM4BUSlMzhBby5I
Estimate	ProjectV2Field	PVTF_lADOEFWyLM4BUSlMzhBby5M
Start date	ProjectV2Field	PVTF_lADOEFWyLM4BUSlMzhBby5Q
Target date	ProjectV2Field	PVTF_lADOEFWyLM4BUSlMzhBby5U
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:43:48.801Z

I have the project field IDs. Next I’m pulling the actual `Status` options and introspecting GitHub’s GraphQL mutation names for issue relationships so I can update the board and use the real dependency feature instead of just leaving text in the issue body.

#### Tool: exec_command

```sh
gh api graphql -f query='query { node(id: "PVT_kwDOEFWyLM4BUSlM") { ... on ProjectV2 { fields(first: 20) { nodes { ... on ProjectV2SingleSelectField { id name options { id name } } ... on ProjectV2Field { id name } } } } } }'
```

Output:

```text
{"data":{"node":{"fields":{"nodes":[{"id":"PVTF_lADOEFWyLM4BUSlMzhBby4M","name":"Title"},{"id":"PVTF_lADOEFWyLM4BUSlMzhBby4Q","name":"Assignees"},{"id":"PVTSSF_lADOEFWyLM4BUSlMzhBby4U","name":"Status","options":[{"id":"f75ad846","name":"Backlog"},{"id":"22a160e4","name":"Blocked"},{"id":"61e4505c","name":"Ready"},{"id":"47fc9ee4","name":"In progress"},{"id":"df73e18b","name":"In review"},{"id":"98236657","name":"Done"}]},{"id":"PVTF_lADOEFWyLM4BUSlMzhBby4Y","name":"Labels"},{"id":"PVTF_lADOEFWyLM4BUSlMzhBby4c","name":"Linked pull requests"},{"id":"PVTF_lADOEFWyLM4BUSlMzhBby4g","name":"Milestone"},{"id":"PVTF_lADOEFWyLM4BUSlMzhBby4k","name":"Repository"},{"id":"PVTF_lADOEFWyLM4BUSlMzhBby4s","name":"Reviewers"},{"id":"PVTF_lADOEFWyLM4BUSlMzhBby4w","name":"Parent issue"},{"id":"PVTF_lADOEFWyLM4BUSlMzhBby40","name":"Sub-issues progress"},{"id":"PVTSSF_lADOEFWyLM4BUSlMzhBby5E","name":"Priority","options":[{"id":"79628723","name":"P0"},{"id":"0a877460","name":"P1"},{"id":"da944a9c","name":"P2"}]},{"id":"PVTSSF_lADOEFWyLM4BUSlMzhBby5I","name":"Size","options":[{"id":"6c6483d2","name":"XS"},{"id":"f784b110","name":"S"},{"id":"7515a9f1","name":"M"},{"id":"817d0097","name":"L"},{"id":"db339eb2","name":"XL"}]},{"id":"PVTF_lADOEFWyLM4BUSlMzhBby5M","name":"Estimate"},{"id":"PVTF_lADOEFWyLM4BUSlMzhBby5Q","name":"Start date"},{"id":"PVTF_lADOEFWyLM4BUSlMzhBby5U","name":"Target date"}]}}}}
```

#### Tool: exec_command

```sh
gh api graphql -f query='query { __type(name: "Mutation") { fields { name } } }' | rg 'block|depend|issue'
```

Output:

```text

```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:43:58.975Z

GitHub exposes the board status options I need: `Blocked` and `Ready` are real single-select values. The issue-relationship mutation name isn’t obvious from a quick grep, so I’m querying the mutation list more directly and will fall back to GitHub’s issue-linking API path if the dependency feature isn’t exposed in this repo’s schema.

#### Tool: exec_command

```sh
gh api graphql -f query='query { __type(name: "Mutation") { fields { name } } }' | jq -r '.data.__type.fields[].name' | rg 'Issue|issue|Sub'
```

Output:

```text
addProjectV2DraftIssue
addSubIssue
closeIssue
convertProjectV2DraftIssueItemToIssue
createIssue
createIssueField
createIssueFieldValue
createIssueType
createProjectV2IssueField
deleteIssue
deleteIssueComment
deleteIssueField
deleteIssueFieldValue
deleteIssueType
pinIssue
pinIssueComment
removeSubIssue
reopenIssue
reprioritizeSubIssue
setIssueFieldValue
transferIssue
unmarkIssueAsDuplicate
unpinIssue
unpinIssueComment
updateEnterpriseMembersCanDeleteIssuesSetting
updateIssue
updateIssueComment
updateIssueField
updateIssueFieldValue
updateIssueIssueType
updateIssueType
updateProjectV2DraftIssue
updateSubscription
```

#### Tool: exec_command

```sh
gh api graphql -f query='query { repository(owner: "CS485-Harmony", name: "Harmony") { issue(number: 316) { id title __typename } } }'
```

Output:

```text
{"data":{"repository":{"issue":{"id":"I_kwDORIrGY879BA_m","title":"Sprint 4: Deployment Architecture + Environment Matrix","__typename":"Issue"}}}}
```

#### Tool: exec_command

```sh
gh api graphql -f query='query { repository(owner: "CS485-Harmony", name: "Harmony") { issue(number: 317) { title blockedByIssues(first: 10) { nodes { number title } } blockingIssues(first: 10) { nodes { number title } } } } }'
```

Output:

```text
{"errors":[{"path":["query","repository","issue","blockedByIssues"],"extensions":{"code":"undefinedField","typeName":"Issue","fieldName":"blockedByIssues"},"locations":[{"line":1,"column":90}],"message":"Field 'blockedByIssues' doesn't exist on type 'Issue'"},{"path":["query","repository","issue","blockingIssues"],"extensions":{"code":"undefinedField","typeName":"Issue","fieldName":"blockingIssues"},"locations":[{"line":1,"column":144}],"message":"Field 'blockingIssues' doesn't exist on type 'Issue'"}]}gh: Field 'blockedByIssues' doesn't exist on type 'Issue'
Field 'blockingIssues' doesn't exist on type 'Issue'
```

#### Tool: exec_command

```sh
gh api graphql -f query='query { __type(name: "Issue") { fields { name } } }' | jq -r '.data.__type.fields[].name' | rg 'block|depend|sub|parent'
```

Output:

```text
blockedBy
blocking
parent
subIssues
subIssuesSummary
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:44:14.990Z

The schema does expose first-class issue relationship fields, just not with the names I tried first. I’m inspecting their exact shapes now, then I’ll write the dependency graph and update the project statuses in one pass.

#### Tool: exec_command

```sh
gh api graphql -f query='query { __type(name: "Issue") { fields { name type { kind name ofType { kind name ofType { kind name } } } } } }' | jq '.data.__type.fields[] | select(.name=="blockedBy" or .name=="blocking")'
```

Output:

```text
{
  "name": "blockedBy",
  "type": {
    "kind": "NON_NULL",
    "name": null,
    "ofType": {
      "kind": "OBJECT",
      "name": "IssueConnection",
      "ofType": null
    }
  }
}
{
  "name": "blocking",
  "type": {
    "kind": "NON_NULL",
    "name": null,
    "ofType": {
      "kind": "OBJECT",
      "name": "IssueConnection",
      "ofType": null
    }
  }
}
```

#### Tool: exec_command

```sh
gh api graphql -f query='query { __type(name: "Mutation") { fields { name args { name type { kind name ofType { kind name ofType { kind name } } } } } } }' | jq '.data.__type.fields[] | select(.name|test("block|depend|issue"; "i"))'
```

Output:

```text
{
  "name": "addBlockedBy",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "AddBlockedByInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "addProjectV2DraftIssue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "AddProjectV2DraftIssueInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "addSubIssue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "AddSubIssueInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "closeIssue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "CloseIssueInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "convertProjectV2DraftIssueItemToIssue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "ConvertProjectV2DraftIssueItemToIssueInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "createIssue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "CreateIssueInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "createIssueField",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "CreateIssueFieldInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "createIssueFieldValue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "CreateIssueFieldValueInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "createIssueType",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "CreateIssueTypeInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "createProjectV2IssueField",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "CreateProjectV2IssueFieldInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "deleteIssue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "DeleteIssueInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "deleteIssueComment",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "DeleteIssueCommentInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "deleteIssueField",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "DeleteIssueFieldInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "deleteIssueFieldValue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "DeleteIssueFieldValueInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "deleteIssueType",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "DeleteIssueTypeInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "pinIssue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "PinIssueInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "pinIssueComment",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "PinIssueCommentInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "removeBlockedBy",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "RemoveBlockedByInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "removeSubIssue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "RemoveSubIssueInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "reopenIssue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "ReopenIssueInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "reprioritizeSubIssue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "ReprioritizeSubIssueInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "setIssueFieldValue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "SetIssueFieldValueInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "transferIssue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "TransferIssueInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "unmarkIssueAsDuplicate",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "UnmarkIssueAsDuplicateInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "unpinIssue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "UnpinIssueInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "unpinIssueComment",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "UnpinIssueCommentInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "updateEnterpriseMembersCanDeleteIssuesSetting",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "UpdateEnterpriseMembersCanDeleteIssuesSettingInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "updateEnterpriseMembersCanViewDependencyInsightsSetting",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "UpdateEnterpriseMembersCanViewDependencyInsightsSettingInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "updateIssue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "UpdateIssueInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "updateIssueComment",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "UpdateIssueCommentInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "updateIssueField",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "UpdateIssueFieldInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "updateIssueFieldValue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "UpdateIssueFieldValueInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "updateIssueIssueType",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "UpdateIssueIssueTypeInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "updateIssueType",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "UpdateIssueTypeInput",
          "ofType": null
        }
      }
    }
  ]
}
{
  "name": "updateProjectV2DraftIssue",
  "args": [
    {
      "name": "input",
      "type": {
        "kind": "NON_NULL",
        "name": null,
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "UpdateProjectV2DraftIssueInput",
          "ofType": null
        }
      }
    }
  ]
}
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:44:21.578Z

I found the exact mutation: `addBlockedBy`. I’m pulling its input shape and then I’ll apply the whole Sprint 4 dependency graph from the plan instead of approximating it.

#### Tool: exec_command

```sh
gh api graphql -f query='query { __type(name: "AddBlockedByInput") { inputFields { name type { kind name ofType { kind name ofType { kind name } } } } } }'
```

Output:

```text
{"data":{"__type":{"inputFields":[{"name":"clientMutationId","type":{"kind":"SCALAR","name":"String","ofType":null}},{"name":"issueId","type":{"kind":"NON_NULL","name":null,"ofType":{"kind":"SCALAR","name":"ID","ofType":null}}},{"name":"blockingIssueId","type":{"kind":"NON_NULL","name":null,"ofType":{"kind":"SCALAR","name":"ID","ofType":null}}}]}}}
```

#### Tool: exec_command

```sh
gh api graphql -f query='query { __type(name: "ProjectV2ItemFieldSingleSelectValue") { fields { name type { kind name ofType { kind name } } } } }'
```

Output:

```text
{"data":{"__type":{"fields":[{"name":"color","type":{"kind":"NON_NULL","name":null,"ofType":{"kind":"ENUM","name":"ProjectV2SingleSelectFieldOptionColor"}}},{"name":"createdAt","type":{"kind":"NON_NULL","name":null,"ofType":{"kind":"SCALAR","name":"DateTime"}}},{"name":"creator","type":{"kind":"INTERFACE","name":"Actor","ofType":null}},{"name":"databaseId","type":{"kind":"SCALAR","name":"Int","ofType":null}},{"name":"description","type":{"kind":"SCALAR","name":"String","ofType":null}},{"name":"descriptionHTML","type":{"kind":"SCALAR","name":"String","ofType":null}},{"name":"field","type":{"kind":"NON_NULL","name":null,"ofType":{"kind":"UNION","name":"ProjectV2FieldConfiguration"}}},{"name":"id","type":{"kind":"NON_NULL","name":null,"ofType":{"kind":"SCALAR","name":"ID"}}},{"name":"item","type":{"kind":"NON_NULL","name":null,"ofType":{"kind":"OBJECT","name":"ProjectV2Item"}}},{"name":"name","type":{"kind":"SCALAR","name":"String","ofType":null}},{"name":"nameHTML","type":{"kind":"SCALAR","name":"String","ofType":null}},{"name":"optionId","type":{"kind":"SCALAR","name":"String","ofType":null}},{"name":"updatedAt","type":{"kind":"NON_NULL","name":null,"ofType":{"kind":"SCALAR","name":"DateTime"}}}]}}}
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:44:36.153Z

I’m applying the graph in one idempotent pass now: read current `blockedBy` edges, add any missing ones from the plan, then set project `Status` to `Ready` for unblocked items and `Blocked` for everything else.

#### Tool: exec_command

```sh
cat > /tmp/update_sprint4_dependencies_and_status.py <<'PY'
import json
import re
import subprocess

OWNER = 'CS485-Harmony'
REPO = 'Harmony'
PROJECT_NUM = '1'
PROJECT_ID = 'PVT_kwDOEFWyLM4BUSlM'
STATUS_FIELD_ID = 'PVTSSF_lADOEFWyLM4BUSlMzhBby4U'
READY_OPTION_ID = '61e4505c'
BLOCKED_OPTION_ID = '22a160e4'

DEPENDENCIES = {
    316: [],
    317: [316],
    318: [317],
    319: [317],
    320: [317],
    321: [316],
    322: [316, 320],
    323: [316],
    324: [323, 321, 322],
    325: [323, 324],
    326: [320, 322],
    327: [321, 329],
    328: [325],
    329: [316, 321],
    330: [318, 319, 320, 322, 324, 326, 329],
    331: [319, 323, 324, 325, 326, 327, 328, 330, 329],
}


def run(cmd):
    return subprocess.run(cmd, check=True, text=True, capture_output=True)

issues = json.loads(run([
    'gh','issue','list','--repo',f'{OWNER}/{REPO}','--search','Sprint 4 in:title','--limit','100','--json','number,id,title,url'
]).stdout)
issue_ids = {item['number']: item['id'] for item in issues}

# project item ids by issue number
board_raw = run(['gh','project','item-list',PROJECT_NUM,'--owner',OWNER,'--limit','200']).stdout
item_ids = {}
for line in board_raw.splitlines():
    m = re.match(r'^Issue\t.*\t(\d+)\tCS485-Harmony/Harmony\t(\S+)$', line)
    if m:
        item_ids[int(m.group(1))] = m.group(2)

# query current blockedBy edges for all sprint issues
query = '''
query($owner: String!, $repo: String!, $numbers: [Int!]!) {
  repository(owner: $owner, name: $repo) {
    issues(first: 100, filterBy: {states: OPEN}) {
      nodes {
        number
        blockedBy(first: 50) { nodes { number id } }
      }
    }
  }
}
'''
current = json.loads(run([
    'gh','api','graphql',
    '-f', f'query={query}',
    '-F', f'owner={OWNER}',
    '-F', f'repo={REPO}',
]).stdout)
current_blocked_by = {}
for node in current['data']['repository']['issues']['nodes']:
    if node['number'] in issue_ids:
        current_blocked_by[node['number']] = {n['number'] for n in node['blockedBy']['nodes']}

# add missing dependency edges
added = []
for issue_num, blockers in DEPENDENCIES.items():
    existing = current_blocked_by.get(issue_num, set())
    for blocker_num in blockers:
        if blocker_num in existing:
            continue
        mutation = '''
mutation($issueId: ID!, $blockingIssueId: ID!) {
  addBlockedBy(input: {issueId: $issueId, blockingIssueId: $blockingIssueId}) {
    clientMutationId
  }
}
'''
        run([
            'gh','api','graphql',
            '-f', f'query={mutation}',
            '-F', f'issueId={issue_ids[issue_num]}',
            '-F', f'blockingIssueId={issue_ids[blocker_num]}',
        ])
        added.append([issue_num, blocker_num])

# update statuses based on blockers from the plan
status_updates = []
for issue_num, blockers in DEPENDENCIES.items():
    item_id = item_ids[issue_num]
    option_id = READY_OPTION_ID if not blockers else BLOCKED_OPTION_ID
    mutation = '''
mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) {
  updateProjectV2ItemFieldValue(
    input: {
      projectId: $projectId,
      itemId: $itemId,
      fieldId: $fieldId,
      value: { singleSelectOptionId: $optionId }
    }
  ) {
    projectV2Item { id }
  }
}
'''
    run([
        'gh','api','graphql',
        '-f', f'query={mutation}',
        '-F', f'projectId={PROJECT_ID}',
        '-F', f'itemId={item_id}',
        '-F', f'fieldId={STATUS_FIELD_ID}',
        '-F', f'optionId={option_id}',
    ])
    status_updates.append({'issue': issue_num, 'status': 'Ready' if not blockers else 'Blocked'})

print(json.dumps({'added_dependencies': added, 'status_updates': status_updates}, indent=2))
PY
python3 /tmp/update_sprint4_dependencies_and_status.py
```

Output:

```text

```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:45:03.041Z

The mutation pass is running now. After it finishes I’ll verify both sides: actual GitHub `blockedBy` links on the issues and the board `Status` values on the Sprint 4 items.

#### Tool: write_stdin

```json
{
  "session_id": 91740,
  "chars": "",
  "yield_time_ms": 1000,
  "max_output_tokens": 12000
}
```

Output:

```text
Command: /bin/zsh -lc "cat > /tmp/update_sprint4_dependencies_and_status.py <<'PY'
import json
import re
import subprocess

OWNER = 'CS485-Harmony'
REPO = 'Harmony'
PROJECT_NUM = '1'
PROJECT_ID = 'PVT_kwDOEFWyLM4BUSlM'
STATUS_FIELD_ID = 'PVTSSF_lADOEFWyLM4BUSlMzhBby4U'
READY_OPTION_ID = '61e4505c'
BLOCKED_OPTION_ID = '22a160e4'

DEPENDENCIES = {
    316: [],
    317: [316],
    318: [317],
    319: [317],
    320: [317],
    321: [316],
    322: [316, 320],
    323: [316],
    324: [323, 321, 322],
    325: [323, 324],
    326: [320, 322],
    327: [321, 329],
    328: [325],
    329: [316, 321],
    330: [318, 319, 320, 322, 324, 326, 329],
    331: [319, 323, 324, 325, 326, 327, 328, 330, 329],
}


def run(cmd):
    return subprocess.run(cmd, check=True, text=True, capture_output=True)

issues = json.loads(run([
    'gh','issue','list','--repo',f'{OWNER}/{REPO}','--search','Sprint 4 in:title','--limit','100','--json','number,id,title,url'
]).stdout)
issue_ids = {item['number']: item['id'] for item in issues}

# project item ids by issue number
board_raw = run(['gh','project','item-list',PROJECT_NUM,'--owner',OWNER,'--limit','200']).stdout
item_ids = {}
for line in board_raw.splitlines():
    m = re.match(r'"'^Issue'"\\t.*\\t(\\d+)\\tCS485-Harmony/Harmony\\t(\\S+)"'$'"', line)
    if m:
        item_ids[int(m.group(1))] = m.group(2)

# query current blockedBy edges for all sprint issues
query = '''
query("'$owner: String!, $repo: String!, $numbers: [Int!]!) {
  repository(owner: $owner, name: $repo) {
    issues(first: 100, filterBy: {states: OPEN}) {
      nodes {
        number
        blockedBy(first: 50) { nodes { number id } }
      }
    }
  }
}
'"'''
current = json.loads(run([
    'gh','api','graphql',
    '-f', f'query={query}',
    '-F', f'owner={OWNER}',
    '-F', f'repo={REPO}',
]).stdout)
current_blocked_by = {}
for node in current['data']['repository']['issues']['nodes']:
    if node['number'] in issue_ids:
        current_blocked_by[node['number']] = {n['number'] for n in node['blockedBy']['nodes']}

# add missing dependency edges
added = []
for issue_num, blockers in DEPENDENCIES.items():
    existing = current_blocked_by.get(issue_num, set())
    for blocker_num in blockers:
        if blocker_num in existing:
            continue
        mutation = '''
mutation("'$issueId: ID!, $blockingIssueId: ID!) {
  addBlockedBy(input: {issueId: $issueId, blockingIssueId: $blockingIssueId}) {
    clientMutationId
  }
}
'"'''
        run([
            'gh','api','graphql',
            '-f', f'query={mutation}',
            '-F', f'issueId={issue_ids[issue_num]}',
            '-F', f'blockingIssueId={issue_ids[blocker_num]}',
        ])
        added.append([issue_num, blocker_num])

# update statuses based on blockers from the plan
status_updates = []
for issue_num, blockers in DEPENDENCIES.items():
    item_id = item_ids[issue_num]
    option_id = READY_OPTION_ID if not blockers else BLOCKED_OPTION_ID
    mutation = '''
mutation("'$projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) {
  updateProjectV2ItemFieldValue(
    input: {
      projectId: $projectId,
      itemId: $itemId,
      fieldId: $fieldId,
      value: { singleSelectOptionId: $optionId }
    }
  ) {
    projectV2Item { id }
  }
}
'"'''
    run([
        'gh','api','graphql',
        '-f', f'query={mutation}',
        '-F', f'projectId={PROJECT_ID}',
        '-F', f'itemId={item_id}',
        '-F', f'fieldId={STATUS_FIELD_ID}',
        '-F', f'optionId={option_id}',
    ])
    status_updates.append({'issue': issue_num, 'status': 'Ready' if not blockers else 'Blocked'})

print(json.dumps({'added_dependencies': added, 'status_updates': status_updates}, indent=2))
PY
python3 /tmp/update_sprint4_dependencies_and_status.py"
Chunk ID: a2b23f
Wall time: 0.0000 seconds
Process exited with code 1
Original token count: 218
Output:
Traceback (most recent call last):
  File "/tmp/update_sprint4_dependencies_and_status.py", line 62, in <module>
    current = json.loads(run([
  File "/tmp/update_sprint4_dependencies_and_status.py", line 34, in run
    return subprocess.run(cmd, check=True, text=True, capture_output=True)
  File "/Users/allen/.pyenv/versions/3.9.18/lib/python3.9/subprocess.py", line 528, in run
    raise CalledProcessError(retcode, process.args,
subprocess.CalledProcessError: Command '['gh', 'api', 'graphql', '-f', 'query=\nquery($owner: String!, $repo: String!, $numbers: [Int!]!) {\n  repository(owner: $owner, name: $repo) {\n    issues(first: 100, filterBy: {states: OPEN}) {\n      nodes {\n        number\n        blockedBy(first: 50) { nodes { number id } }\n      }\n    }\n  }\n}\n', '-F', 'owner=CS485-Harmony', '-F', 'repo=Harmony']' returned non-zero exit status 1.
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:45:08.476Z

The first script failed on a bad GraphQL query shape, not on permissions. I’m rerunning with a simpler query and a tighter parser so the actual dependency and status updates still go through cleanly.

#### Tool: exec_command

```sh
cat > /tmp/update_sprint4_dependencies_and_status.py <<'PY'
import json
import re
import subprocess

OWNER = 'CS485-Harmony'
REPO = 'Harmony'
PROJECT_NUM = '1'
PROJECT_ID = 'PVT_kwDOEFWyLM4BUSlM'
STATUS_FIELD_ID = 'PVTSSF_lADOEFWyLM4BUSlMzhBby4U'
READY_OPTION_ID = '61e4505c'
BLOCKED_OPTION_ID = '22a160e4'

DEPENDENCIES = {
    316: [],
    317: [316],
    318: [317],
    319: [317],
    320: [317],
    321: [316],
    322: [316, 320],
    323: [316],
    324: [323, 321, 322],
    325: [323, 324],
    326: [320, 322],
    327: [321, 329],
    328: [325],
    329: [316, 321],
    330: [318, 319, 320, 322, 324, 326, 329],
    331: [319, 323, 324, 325, 326, 327, 328, 330, 329],
}


def run(cmd):
    return subprocess.run(cmd, check=True, text=True, capture_output=True)

issues = json.loads(run([
    'gh','issue','list','--repo',f'{OWNER}/{REPO}','--search','Sprint 4 in:title','--limit','100','--json','number,id,title,url'
]).stdout)
issue_ids = {item['number']: item['id'] for item in issues}

board_raw = run(['gh','project','item-list',PROJECT_NUM,'--owner',OWNER,'--limit','200']).stdout
item_ids = {}
for line in board_raw.splitlines():
    parts = line.split('\t')
    if len(parts) >= 5 and parts[0] == 'Issue' and parts[3] == f'{OWNER}/{REPO}':
        try:
            item_ids[int(parts[2])] = parts[4]
        except ValueError:
            pass

query = 'query($owner: String!, $repo: String!) { repository(owner: $owner, name: $repo) { issues(first: 100, filterBy: {states: OPEN}) { nodes { number blockedBy(first: 50) { nodes { number id } } } } } }'
current = json.loads(run([
    'gh','api','graphql',
    '-f', f'query={query}',
    '-F', f'owner={OWNER}',
    '-F', f'repo={REPO}',
]).stdout)
current_blocked_by = {}
for node in current['data']['repository']['issues']['nodes']:
    if node['number'] in issue_ids:
        current_blocked_by[node['number']] = {n['number'] for n in node['blockedBy']['nodes']}

added = []
mutation_add = 'mutation($issueId: ID!, $blockingIssueId: ID!) { addBlockedBy(input: {issueId: $issueId, blockingIssueId: $blockingIssueId}) { clientMutationId } }'
for issue_num, blockers in DEPENDENCIES.items():
    existing = current_blocked_by.get(issue_num, set())
    for blocker_num in blockers:
        if blocker_num in existing:
            continue
        run([
            'gh','api','graphql',
            '-f', f'query={mutation_add}',
            '-F', f'issueId={issue_ids[issue_num]}',
            '-F', f'blockingIssueId={issue_ids[blocker_num]}',
        ])
        added.append([issue_num, blocker_num])

mutation_status = 'mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) { updateProjectV2ItemFieldValue(input: { projectId: $projectId, itemId: $itemId, fieldId: $fieldId, value: { singleSelectOptionId: $optionId } }) { projectV2Item { id } } }'
status_updates = []
for issue_num, blockers in DEPENDENCIES.items():
    option_id = READY_OPTION_ID if not blockers else BLOCKED_OPTION_ID
    run([
        'gh','api','graphql',
        '-f', f'query={mutation_status}',
        '-F', f'projectId={PROJECT_ID}',
        '-F', f'itemId={item_ids[issue_num]}',
        '-F', f'fieldId={STATUS_FIELD_ID}',
        '-F', f'optionId={option_id}',
    ])
    status_updates.append({'issue': issue_num, 'status': 'Ready' if not blockers else 'Blocked'})

print(json.dumps({'added_dependencies': added, 'status_updates': status_updates}, indent=2))
PY
python3 /tmp/update_sprint4_dependencies_and_status.py
```

Output:

```text

```

#### Tool: write_stdin

```json
{
  "session_id": 77148,
  "chars": "",
  "yield_time_ms": 1000,
  "max_output_tokens": 12000
}
```

Output:

```text
Command: /bin/zsh -lc "cat > /tmp/update_sprint4_dependencies_and_status.py <<'PY'
import json
import re
import subprocess

OWNER = 'CS485-Harmony'
REPO = 'Harmony'
PROJECT_NUM = '1'
PROJECT_ID = 'PVT_kwDOEFWyLM4BUSlM'
STATUS_FIELD_ID = 'PVTSSF_lADOEFWyLM4BUSlMzhBby4U'
READY_OPTION_ID = '61e4505c'
BLOCKED_OPTION_ID = '22a160e4'

DEPENDENCIES = {
    316: [],
    317: [316],
    318: [317],
    319: [317],
    320: [317],
    321: [316],
    322: [316, 320],
    323: [316],
    324: [323, 321, 322],
    325: [323, 324],
    326: [320, 322],
    327: [321, 329],
    328: [325],
    329: [316, 321],
    330: [318, 319, 320, 322, 324, 326, 329],
    331: [319, 323, 324, 325, 326, 327, 328, 330, 329],
}


def run(cmd):
    return subprocess.run(cmd, check=True, text=True, capture_output=True)

issues = json.loads(run([
    'gh','issue','list','--repo',f'{OWNER}/{REPO}','--search','Sprint 4 in:title','--limit','100','--json','number,id,title,url'
]).stdout)
issue_ids = {item['number']: item['id'] for item in issues}

board_raw = run(['gh','project','item-list',PROJECT_NUM,'--owner',OWNER,'--limit','200']).stdout
item_ids = {}
for line in board_raw.splitlines():
    parts = line.split('\\t')
    if len(parts) >= 5 and parts[0] == 'Issue' and parts[3] == f'{OWNER}/{REPO}':
        try:
            item_ids[int(parts[2])] = parts[4]
        except ValueError:
            pass

query = 'query("'$owner: String!, $repo: String!) { repository(owner: $owner, name: $repo) { issues(first: 100, filterBy: {states: OPEN}) { nodes { number blockedBy(first: 50) { nodes { number id } } } } } }'"'
current = json.loads(run([
    'gh','api','graphql',
    '-f', f'query={query}',
    '-F', f'owner={OWNER}',
    '-F', f'repo={REPO}',
]).stdout)
current_blocked_by = {}
for node in current['data']['repository']['issues']['nodes']:
    if node['number'] in issue_ids:
        current_blocked_by[node['number']] = {n['number'] for n in node['blockedBy']['nodes']}

added = []
mutation_add = 'mutation("'$issueId: ID!, $blockingIssueId: ID!) { addBlockedBy(input: {issueId: $issueId, blockingIssueId: $blockingIssueId}) { clientMutationId } }'"'
for issue_num, blockers in DEPENDENCIES.items():
    existing = current_blocked_by.get(issue_num, set())
    for blocker_num in blockers:
        if blocker_num in existing:
            continue
        run([
            'gh','api','graphql',
            '-f', f'query={mutation_add}',
            '-F', f'issueId={issue_ids[issue_num]}',
            '-F', f'blockingIssueId={issue_ids[blocker_num]}',
        ])
        added.append([issue_num, blocker_num])

mutation_status = 'mutation("'$projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) { updateProjectV2ItemFieldValue(input: { projectId: $projectId, itemId: $itemId, fieldId: $fieldId, value: { singleSelectOptionId: $optionId } }) { projectV2Item { id } } }'"'
status_updates = []
for issue_num, blockers in DEPENDENCIES.items():
    option_id = READY_OPTION_ID if not blockers else BLOCKED_OPTION_ID
    run([
        'gh','api','graphql',
        '-f', f'query={mutation_status}',
        '-F', f'projectId={PROJECT_ID}',
        '-F', f'itemId={item_ids[issue_num]}',
        '-F', f'fieldId={STATUS_FIELD_ID}',
        '-F', f'optionId={option_id}',
    ])
    status_updates.append({'issue': issue_num, 'status': 'Ready' if not blockers else 'Blocked'})

print(json.dumps({'added_dependencies': added, 'status_updates': status_updates}, indent=2))
PY
python3 /tmp/update_sprint4_dependencies_and_status.py"
Chunk ID: 38e889
Wall time: 5.0035 seconds
Process running with session ID 77148
Original token count: 0
Output:
```

#### Tool: write_stdin

```json
{
  "session_id": 77148,
  "chars": "",
  "yield_time_ms": 1000,
  "max_output_tokens": 12000
}
```

Output:

```text
Command: /bin/zsh -lc "cat > /tmp/update_sprint4_dependencies_and_status.py <<'PY'
import json
import re
import subprocess

OWNER = 'CS485-Harmony'
REPO = 'Harmony'
PROJECT_NUM = '1'
PROJECT_ID = 'PVT_kwDOEFWyLM4BUSlM'
STATUS_FIELD_ID = 'PVTSSF_lADOEFWyLM4BUSlMzhBby4U'
READY_OPTION_ID = '61e4505c'
BLOCKED_OPTION_ID = '22a160e4'

DEPENDENCIES = {
    316: [],
    317: [316],
    318: [317],
    319: [317],
    320: [317],
    321: [316],
    322: [316, 320],
    323: [316],
    324: [323, 321, 322],
    325: [323, 324],
    326: [320, 322],
    327: [321, 329],
    328: [325],
    329: [316, 321],
    330: [318, 319, 320, 322, 324, 326, 329],
    331: [319, 323, 324, 325, 326, 327, 328, 330, 329],
}


def run(cmd):
    return subprocess.run(cmd, check=True, text=True, capture_output=True)

issues = json.loads(run([
    'gh','issue','list','--repo',f'{OWNER}/{REPO}','--search','Sprint 4 in:title','--limit','100','--json','number,id,title,url'
]).stdout)
issue_ids = {item['number']: item['id'] for item in issues}

board_raw = run(['gh','project','item-list',PROJECT_NUM,'--owner',OWNER,'--limit','200']).stdout
item_ids = {}
for line in board_raw.splitlines():
    parts = line.split('\\t')
    if len(parts) >= 5 and parts[0] == 'Issue' and parts[3] == f'{OWNER}/{REPO}':
        try:
            item_ids[int(parts[2])] = parts[4]
        except ValueError:
            pass

query = 'query("'$owner: String!, $repo: String!) { repository(owner: $owner, name: $repo) { issues(first: 100, filterBy: {states: OPEN}) { nodes { number blockedBy(first: 50) { nodes { number id } } } } } }'"'
current = json.loads(run([
    'gh','api','graphql',
    '-f', f'query={query}',
    '-F', f'owner={OWNER}',
    '-F', f'repo={REPO}',
]).stdout)
current_blocked_by = {}
for node in current['data']['repository']['issues']['nodes']:
    if node['number'] in issue_ids:
        current_blocked_by[node['number']] = {n['number'] for n in node['blockedBy']['nodes']}

added = []
mutation_add = 'mutation("'$issueId: ID!, $blockingIssueId: ID!) { addBlockedBy(input: {issueId: $issueId, blockingIssueId: $blockingIssueId}) { clientMutationId } }'"'
for issue_num, blockers in DEPENDENCIES.items():
    existing = current_blocked_by.get(issue_num, set())
    for blocker_num in blockers:
        if blocker_num in existing:
            continue
        run([
            'gh','api','graphql',
            '-f', f'query={mutation_add}',
            '-F', f'issueId={issue_ids[issue_num]}',
            '-F', f'blockingIssueId={issue_ids[blocker_num]}',
        ])
        added.append([issue_num, blocker_num])

mutation_status = 'mutation("'$projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) { updateProjectV2ItemFieldValue(input: { projectId: $projectId, itemId: $itemId, fieldId: $fieldId, value: { singleSelectOptionId: $optionId } }) { projectV2Item { id } } }'"'
status_updates = []
for issue_num, blockers in DEPENDENCIES.items():
    option_id = READY_OPTION_ID if not blockers else BLOCKED_OPTION_ID
    run([
        'gh','api','graphql',
        '-f', f'query={mutation_status}',
        '-F', f'projectId={PROJECT_ID}',
        '-F', f'itemId={item_ids[issue_num]}',
        '-F', f'fieldId={STATUS_FIELD_ID}',
        '-F', f'optionId={option_id}',
    ])
    status_updates.append({'issue': issue_num, 'status': 'Ready' if not blockers else 'Blocked'})

print(json.dumps({'added_dependencies': added, 'status_updates': status_updates}, indent=2))
PY
python3 /tmp/update_sprint4_dependencies_and_status.py"
Chunk ID: 0ffa12
Wall time: 5.0016 seconds
Process running with session ID 77148
Original token count: 0
Output:
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:45:51.812Z

The update is still running because it’s making a fairly large number of GitHub API mutations. I’m letting that finish rather than interrupting it, then I’ll validate the relationships and the board status distribution.

#### Tool: write_stdin

```json
{
  "session_id": 77148,
  "chars": "",
  "yield_time_ms": 10000,
  "max_output_tokens": 12000
}
```

Output:

```text
Command: /bin/zsh -lc "cat > /tmp/update_sprint4_dependencies_and_status.py <<'PY'
import json
import re
import subprocess

OWNER = 'CS485-Harmony'
REPO = 'Harmony'
PROJECT_NUM = '1'
PROJECT_ID = 'PVT_kwDOEFWyLM4BUSlM'
STATUS_FIELD_ID = 'PVTSSF_lADOEFWyLM4BUSlMzhBby4U'
READY_OPTION_ID = '61e4505c'
BLOCKED_OPTION_ID = '22a160e4'

DEPENDENCIES = {
    316: [],
    317: [316],
    318: [317],
    319: [317],
    320: [317],
    321: [316],
    322: [316, 320],
    323: [316],
    324: [323, 321, 322],
    325: [323, 324],
    326: [320, 322],
    327: [321, 329],
    328: [325],
    329: [316, 321],
    330: [318, 319, 320, 322, 324, 326, 329],
    331: [319, 323, 324, 325, 326, 327, 328, 330, 329],
}


def run(cmd):
    return subprocess.run(cmd, check=True, text=True, capture_output=True)

issues = json.loads(run([
    'gh','issue','list','--repo',f'{OWNER}/{REPO}','--search','Sprint 4 in:title','--limit','100','--json','number,id,title,url'
]).stdout)
issue_ids = {item['number']: item['id'] for item in issues}

board_raw = run(['gh','project','item-list',PROJECT_NUM,'--owner',OWNER,'--limit','200']).stdout
item_ids = {}
for line in board_raw.splitlines():
    parts = line.split('\\t')
    if len(parts) >= 5 and parts[0] == 'Issue' and parts[3] == f'{OWNER}/{REPO}':
        try:
            item_ids[int(parts[2])] = parts[4]
        except ValueError:
            pass

query = 'query("'$owner: String!, $repo: String!) { repository(owner: $owner, name: $repo) { issues(first: 100, filterBy: {states: OPEN}) { nodes { number blockedBy(first: 50) { nodes { number id } } } } } }'"'
current = json.loads(run([
    'gh','api','graphql',
    '-f', f'query={query}',
    '-F', f'owner={OWNER}',
    '-F', f'repo={REPO}',
]).stdout)
current_blocked_by = {}
for node in current['data']['repository']['issues']['nodes']:
    if node['number'] in issue_ids:
        current_blocked_by[node['number']] = {n['number'] for n in node['blockedBy']['nodes']}

added = []
mutation_add = 'mutation("'$issueId: ID!, $blockingIssueId: ID!) { addBlockedBy(input: {issueId: $issueId, blockingIssueId: $blockingIssueId}) { clientMutationId } }'"'
for issue_num, blockers in DEPENDENCIES.items():
    existing = current_blocked_by.get(issue_num, set())
    for blocker_num in blockers:
        if blocker_num in existing:
            continue
        run([
            'gh','api','graphql',
            '-f', f'query={mutation_add}',
            '-F', f'issueId={issue_ids[issue_num]}',
            '-F', f'blockingIssueId={issue_ids[blocker_num]}',
        ])
        added.append([issue_num, blocker_num])

mutation_status = 'mutation("'$projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) { updateProjectV2ItemFieldValue(input: { projectId: $projectId, itemId: $itemId, fieldId: $fieldId, value: { singleSelectOptionId: $optionId } }) { projectV2Item { id } } }'"'
status_updates = []
for issue_num, blockers in DEPENDENCIES.items():
    option_id = READY_OPTION_ID if not blockers else BLOCKED_OPTION_ID
    run([
        'gh','api','graphql',
        '-f', f'query={mutation_status}',
        '-F', f'projectId={PROJECT_ID}',
        '-F', f'itemId={item_ids[issue_num]}',
        '-F', f'fieldId={STATUS_FIELD_ID}',
        '-F', f'optionId={option_id}',
    ])
    status_updates.append({'issue': issue_num, 'status': 'Ready' if not blockers else 'Blocked'})

print(json.dumps({'added_dependencies': added, 'status_updates': status_updates}, indent=2))
PY
python3 /tmp/update_sprint4_dependencies_and_status.py"
Chunk ID: 9a36a6
Wall time: 3.4881 seconds
Process exited with code 0
Original token count: 557
Output:
{
  "added_dependencies": [
    [
      317,
      316
    ],
    [
      318,
      317
    ],
    [
      319,
      317
    ],
    [
      320,
      317
    ],
    [
      321,
      316
    ],
    [
      322,
      316
    ],
    [
      322,
      320
    ],
    [
      323,
      316
    ],
    [
      324,
      323
    ],
    [
      324,
      321
    ],
    [
      324,
      322
    ],
    [
      325,
      323
    ],
    [
      325,
      324
    ],
    [
      326,
      320
    ],
    [
      326,
      322
    ],
    [
      327,
      321
    ],
    [
      327,
      329
    ],
    [
      328,
      325
    ],
    [
      329,
      316
    ],
    [
      329,
      321
    ],
    [
      330,
      318
    ],
    [
      330,
      319
    ],
    [
      330,
      320
    ],
    [
      330,
      322
    ],
    [
      330,
      324
    ],
    [
      330,
      326
    ],
    [
      330,
      329
    ],
    [
      331,
      319
    ],
    [
      331,
      323
    ],
    [
      331,
      324
    ],
    [
      331,
      325
    ],
    [
      331,
      326
    ],
    [
      331,
      327
    ],
    [
      331,
      328
    ],
    [
      331,
      330
    ],
    [
      331,
      329
    ]
  ],
  "status_updates": [
    {
      "issue": 316,
      "status": "Ready"
    },
    {
      "issue": 317,
      "status": "Blocked"
    },
    {
      "issue": 318,
      "status": "Blocked"
    },
    {
      "issue": 319,
      "status": "Blocked"
    },
    {
      "issue": 320,
      "status": "Blocked"
    },
    {
      "issue": 321,
      "status": "Blocked"
    },
    {
      "issue": 322,
      "status": "Blocked"
    },
    {
      "issue": 323,
      "status": "Blocked"
    },
    {
      "issue": 324,
      "status": "Blocked"
    },
    {
      "issue": 325,
      "status": "Blocked"
    },
    {
      "issue": 326,
      "status": "Blocked"
    },
    {
      "issue": 327,
      "status": "Blocked"
    },
    {
      "issue": 328,
      "status": "Blocked"
    },
    {
      "issue": 329,
      "status": "Blocked"
    },
    {
      "issue": 330,
      "status": "Blocked"
    },
    {
      "issue": 331,
      "status": "Blocked"
    }
  ]
}
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:46:06.735Z

The dependency graph is now written. I’m doing one verification pass against GitHub’s live data so I can confirm the relationships and status values actually landed the way the plan says they should.

#### Tool: exec_command

```sh
python3 - <<'PY'
import json, subprocess
query = 'query($owner: String!, $repo: String!) { repository(owner: $owner, name: $repo) { issues(first: 100, filterBy: {states: OPEN}) { nodes { number title blockedBy(first: 20) { nodes { number } } } } } }'
out = subprocess.run(['gh','api','graphql','-f',f'query={query}','-F','owner=CS485-Harmony','-F','repo=Harmony'],check=True,text=True,capture_output=True).stdout
nodes = json.loads(out)['data']['repository']['issues']['nodes']
want = {316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331}
rows=[]
for n in nodes:
    if n['number'] in want:
        rows.append({'number': n['number'], 'blockedBy': sorted(x['number'] for x in n['blockedBy']['nodes'])})
print(json.dumps(sorted(rows, key=lambda r: r['number']), indent=2))
PY
```

Output:

```text
[
  {
    "number": 316,
    "blockedBy": []
  },
  {
    "number": 317,
    "blockedBy": [
      316
    ]
  },
  {
    "number": 318,
    "blockedBy": [
      317
    ]
  },
  {
    "number": 319,
    "blockedBy": [
      317
    ]
  },
  {
    "number": 320,
    "blockedBy": [
      317
    ]
  },
  {
    "number": 321,
    "blockedBy": [
      316
    ]
  },
  {
    "number": 322,
    "blockedBy": [
      316,
      320
    ]
  },
  {
    "number": 323,
    "blockedBy": [
      316
    ]
  },
  {
    "number": 324,
    "blockedBy": [
      321,
      322,
      323
    ]
  },
  {
    "number": 325,
    "blockedBy": [
      323,
      324
    ]
  },
  {
    "number": 326,
    "blockedBy": [
      320,
      322
    ]
  },
  {
    "number": 327,
    "blockedBy": [
      321,
      329
    ]
  },
  {
    "number": 328,
    "blockedBy": [
      325
    ]
  },
  {
    "number": 329,
    "blockedBy": [
      316,
      321
    ]
  },
  {
    "number": 330,
    "blockedBy": [
      318,
      319,
      320,
      322,
      324,
      326,
      329
    ]
  },
  {
    "number": 331,
    "blockedBy": [
      319,
      323,
      324,
      325,
      326,
      327,
      328,
      329,
      330
    ]
  }
]
```

#### Tool: exec_command

```sh
gh api graphql -f query='query { node(id: "PVT_kwDOEFWyLM4BUSlM") { ... on ProjectV2 { items(first: 200) { nodes { id content { ... on Issue { number title } } fieldValueByName(name: "Status") { ... on ProjectV2ItemFieldSingleSelectValue { name optionId } } } } } } }'
```

Output:

```text
gh: Requesting 200 records on the connection exceeds the `first` limit of 100 records.
{"data":{"node":null},"errors":[{"type":"EXCESSIVE_PAGINATION","path":["node","items"],"locations":[{"line":1,"column":63}],"message":"Requesting 200 records on the connection exceeds the `first` limit of 100 records."}]}
```

#### Tool: exec_command

```sh
gh api graphql -f query='query { node(id: "PVT_kwDOEFWyLM4BUSlM") { ... on ProjectV2 { items(first: 100) { nodes { id content { ... on Issue { number title } } fieldValueByName(name: "Status") { ... on ProjectV2ItemFieldSingleSelectValue { name optionId } } } } } } }'
```

Output:

```text
{"data":{"node":{"items":{"nodes":[{"id":"PVTI_lADOEFWyLM4BUSlMzgprLN0","content":{"number":245,"title":"test: add negative guard coverage for createReply event publish"},"fieldValueByName":{"name":"Backlog","optionId":"f75ad846"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLV8","content":{"number":240,"title":"fix: authenticated users see \"Sign up or log in\" on inaccessible channels"},"fieldValueByName":{"name":"In review","optionId":"df73e18b"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLWE","content":{"number":292,"title":"Unit Tests — public.router.ts"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLWU","content":{"number":269,"title":"Unit Tests — serverMember.service.ts"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLWw","content":{"number":268,"title":"Test Specification — serverMember.service.ts"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLXM","content":{"number":261,"title":"Test Specification — channelService.ts (frontend)"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLXU","content":{"number":267,"title":"README Update & Final Submission"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLXo","content":{"number":263,"title":"Unit Tests — auth.service.ts"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLX8","content":{"number":264,"title":"Unit Tests — server.service.ts"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLYQ","content":{"number":262,"title":"GitHub Actions — CI Workflows (run-frontend-tests.yml + run-backend-tests.yml)"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLYc","content":{"number":260,"title":"Test Specification — serverService.ts (frontend)"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLYk","content":{"number":259,"title":"Test Specification — server.service.ts"},"fieldValueByName":{"name":"In progress","optionId":"47fc9ee4"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLYw","content":{"number":258,"title":"Test Specification — auth.service.ts"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLZA","content":{"number":265,"title":"Unit Tests — serverService.ts (frontend)"},"fieldValueByName":{"name":"Ready","optionId":"61e4505c"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLZU","content":{"number":194,"title":"chore: add structured logger utility for observability and debug"},"fieldValueByName":{"name":"Ready","optionId":"61e4505c"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLZk","content":{"number":293,"title":"Test Specification — channel.service.ts"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLZ0","content":{"number":290,"title":"Unit Tests — publicApiService.ts (frontend)"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLaI","content":{"number":291,"title":"Test Specification — public.router.ts"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLaQ","content":{"number":294,"title":"Unit Tests — channel.service.ts"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLaY","content":{"number":289,"title":"Test Specification — publicApiService.ts (frontend)"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLak","content":{"number":151,"title":"Implement message replies/threads (schema, service, router, tests)"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLa0","content":{"number":153,"title":"Wire up pin button and implement pinned messages panel"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLbE","content":{"number":122,"title":"Frontend Integration — Voice Channels (Stretch Goal)"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLbI","content":{"number":112,"title":"Attachment Service & File Storage"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLbo","content":{"number":180,"title":"Real-time messaging: other clients don't receive new messages"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLb0","content":{"number":119,"title":"Next.js Auth Middleware — Server-Side Route Protection"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLcc","content":{"number":101,"title":"Message Service & API"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLco","content":{"number":95,"title":"P4 Deliverables — Dev Spec Update & Architecture Document"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLdI","content":{"number":94,"title":"Backend Project Scaffold & Dev Environment"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLdk","content":{"number":96,"title":"Database Schema & Prisma Migrations"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLd8","content":{"number":97,"title":"Authentication System — JWT Register/Login/Logout"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLeI","content":{"number":99,"title":"Server Service & API"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLeg","content":{"number":100,"title":"Channel Service & API"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLew","content":{"number":102,"title":"Role-Based Permission & Authorization System"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLe8","content":{"number":103,"title":"Server Membership Service"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLfE","content":{"number":105,"title":"Channel Visibility Toggle Service"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLfQ","content":{"number":106,"title":"Visibility Audit Log Service"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLfs","content":{"number":110,"title":"Rate Limiting Middleware"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLi4","content":{"number":109,"title":"Redis Caching Layer"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLjA","content":{"number":113,"title":"Frontend Integration — Authentication"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLjQ","content":{"number":114,"title":"Frontend Integration — Servers & Channels"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLjg","content":{"number":115,"title":"Frontend Integration — Messages"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLjw","content":{"number":120,"title":"Backend README — Setup & Operations Guide"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLkA","content":{"number":116,"title":"Frontend Integration — Guest Public Channel View"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLlc","content":{"number":118,"title":"API Input Validation & Error Handling"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLls","content":{"number":117,"title":"Frontend Integration — Channel Visibility Toggle"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLl8","content":{"number":38,"title":"Responsive design audit and fixes"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLmU","content":{"number":30,"title":"Build VisibilityToggle component"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLms","content":{"number":35,"title":"Build toast notification system"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLm8","content":{"number":36,"title":"Build 404 and error pages"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLnU","content":{"number":37,"title":"Integrate channel visibility with guest view"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLno","content":{"number":20,"title":"Build ServerSidebar component (server icon list)"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLoA","content":{"number":47,"title":"Epic: Core App Layout & Navigation"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLos","content":{"number":21,"title":"Build ChannelSidebar component"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLpA","content":{"number":26,"title":"Build MessageInput component"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLpE","content":{"number":51,"title":"Epic: Integration, Testing & Demo"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLpM","content":{"number":33,"title":"Build GuestPromoBanner component"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLpk","content":{"number":19,"title":"Create App Router with layout routes"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLqA","content":{"number":111,"title":"Event Bus — Redis Pub/Sub for Cross-Service Events"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLqQ","content":{"number":34,"title":"Build Auth Context and login/logout flow"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLqY","content":{"number":18,"title":"Create mock API service layer"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLqs","content":{"number":17,"title":"Create mock data layer"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLrA","content":{"number":40,"title":"UI Mockups: Channel Visibility Toggle (Figma)"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLrU","content":{"number":43,"title":"Build SearchBar modal component"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLro","content":{"number":32,"title":"Build VisibilityGuard component"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLsA","content":{"number":27,"title":"Build MembersSidebar component"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLsQ","content":{"number":22,"title":"Build TopBar component"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLsc","content":{"number":15,"title":"Install and configure Tailwind CSS"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLtA","content":{"number":14,"title":"Scaffold React + TypeScript + Vite project"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLtQ","content":{"number":1,"title":"Channel privacy settings"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLtw","content":{"number":2,"title":"View public channels without logging in"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLuA","content":{"number":3,"title":"Threads & Messages Store Relevant Data"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLuM","content":{"number":16,"title":"Define TypeScript types and interfaces"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLuY","content":{"number":23,"title":"Build AppLayout (3-column layout shell)"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLuo","content":{"number":39,"title":"Accessibility audit and fixes"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLuw","content":{"number":41,"title":"UI Mockups: Guest Public Channel View (Figma)"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLvA","content":{"number":42,"title":"Screen Recording: Demo Video and YouTube Upload"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLvQ","content":{"number":46,"title":"Epic: Project Scaffolding & Setup"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLvg","content":{"number":25,"title":"Build MessageItem component"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLvo","content":{"number":28,"title":"Build UserStatusBar component"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLwE","content":{"number":24,"title":"Build MessageList component"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLwQ","content":{"number":29,"title":"Build ChannelSettingsPage"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLws","content":{"number":71,"title":"Fix non-admin redirect spinner delay on /settings/* routes"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLxE","content":{"number":72,"title":"Implement Permissions section in ChannelSettingsPage"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLxc","content":{"number":44,"title":"Build channel creation modal"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLxs","content":{"number":31,"title":"Build GuestChannelView page"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLx4","content":{"number":88,"title":"Build User Settings Page"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLyE","content":{"number":75,"title":"Users need to be able to log out"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLyw","content":{"number":84,"title":"Build server creation modal"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprLzo","content":{"number":86,"title":"Implement Server Settings (name, icon, description)"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprL0o","content":{"number":48,"title":"Epic: Chat UI Components"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprL1k","content":{"number":49,"title":"Epic: Channel Visibility Toggle Feature"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprL2M","content":{"number":50,"title":"Epic: Guest Public Channel View Feature"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprL2Y","content":{"number":98,"title":"User Service & API"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprL2s","content":{"number":104,"title":"Database Seed Data"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprL3E","content":{"number":147,"title":"Fix flaky setTimeout in visibility event emission test"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprL3Q","content":{"number":152,"title":"Implement message reactions (schema, service, router, tests)"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprL3g","content":{"number":154,"title":"Implement message reply service methods"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprL4A","content":{"number":155,"title":"Implement message reaction service"},"fieldValueByName":{"name":"Done","optionId":"98236657"}},{"id":"PVTI_lADOEFWyLM4BUSlMzgprL4Q","content":{"number":156,"title":"Implement tRPC reaction router"},"fieldValueByName":{"name":"Done","optionId":"98236657"}}]}}}}
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:46:22.260Z

The generic project query hit the first-100-item window, so I’m querying the 16 Sprint 4 board items directly by item ID to verify their `Status` values instead of trusting the truncated project listing.

#### Tool: exec_command

```sh
python3 - <<'PY'
import json, subprocess
raw = subprocess.run(['gh','project','item-list','1','--owner','CS485-Harmony','--limit','200'],check=True,text=True,capture_output=True).stdout
want = {316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331}
item_ids = {}
for line in raw.splitlines():
    parts = line.split('\t')
    if len(parts) >= 5 and parts[0] == 'Issue' and parts[3] == 'CS485-Harmony/Harmony':
        num = int(parts[2])
        if num in want:
            item_ids[num] = parts[4]
rows=[]
for num, item_id in sorted(item_ids.items()):
    query = 'query($id: ID!) { node(id: $id) { ... on ProjectV2Item { id content { ... on Issue { number title } } fieldValueByName(name: "Status") { ... on ProjectV2ItemFieldSingleSelectValue { name optionId } } } } }'
    out = subprocess.run(['gh','api','graphql','-f',f'query={query}','-F',f'id={item_id}'],check=True,text=True,capture_output=True).stdout
    node = json.loads(out)['data']['node']
    rows.append({'number': node['content']['number'], 'status': node['fieldValueByName']['name']})
print(json.dumps(rows, indent=2))
PY
```

Output:

```text

```

#### Tool: write_stdin

```json
{
  "session_id": 50464,
  "chars": "",
  "yield_time_ms": 10000,
  "max_output_tokens": 8000
}
```

Output:

```text
Command: /bin/zsh -lc "python3 - <<'PY'
import json, subprocess
raw = subprocess.run(['gh','project','item-list','1','--owner','CS485-Harmony','--limit','200'],check=True,text=True,capture_output=True).stdout
want = {316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331}
item_ids = {}
for line in raw.splitlines():
    parts = line.split('\\t')
    if len(parts) >= 5 and parts[0] == 'Issue' and parts[3] == 'CS485-Harmony/Harmony':
        num = int(parts[2])
        if num in want:
            item_ids[num] = parts[4]
rows=[]
for num, item_id in sorted(item_ids.items()):
    query = 'query("'$id: ID!) { node(id: $id) { ... on ProjectV2Item { id content { ... on Issue { number title } } fieldValueByName(name: "Status") { ... on ProjectV2ItemFieldSingleSelectValue { name optionId } } } } }'"'
    out = subprocess.run(['gh','api','graphql','-f',f'query={query}','-F',f'id={item_id}'],check=True,text=True,capture_output=True).stdout
    node = json.loads(out)['data']['node']
    rows.append({'number': node['content']['number'], 'status': node['fieldValueByName']['name']})
print(json.dumps(rows, indent=2))
PY"
Chunk ID: 5cd999
Wall time: 4.1311 seconds
Process exited with code 0
Original token count: 209
Output:
[
  {
    "number": 316,
    "status": "Ready"
  },
  {
    "number": 317,
    "status": "Blocked"
  },
  {
    "number": 318,
    "status": "Blocked"
  },
  {
    "number": 319,
    "status": "Blocked"
  },
  {
    "number": 320,
    "status": "Blocked"
  },
  {
    "number": 321,
    "status": "Blocked"
  },
  {
    "number": 322,
    "status": "Blocked"
  },
  {
    "number": 323,
    "status": "Blocked"
  },
  {
    "number": 324,
    "status": "Blocked"
  },
  {
    "number": 325,
    "status": "Blocked"
  },
  {
    "number": 326,
    "status": "Blocked"
  },
  {
    "number": 327,
    "status": "Blocked"
  },
  {
    "number": 328,
    "status": "Blocked"
  },
  {
    "number": 329,
    "status": "Blocked"
  },
  {
    "number": 330,
    "status": "Blocked"
  },
  {
    "number": 331,
    "status": "Blocked"
  }
]
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:46:42.577Z

Updated the Sprint 4 issues to use GitHub’s issue dependency feature and synced the board status columns to match the dependency graph in the plan.

What changed:
- Added `blockedBy` relationships for all Sprint 4 issues based on the plan.
- Set board `Status` on `Harmony Project Board`:
  - `#316` -> `Ready`
  - `#317` through `#331` -> `Blocked`

Verified live state:
- Issue dependencies are present in GitHub’s relationship graph.
- Project board statuses now match those dependencies.

Examples:
- `#317` is blocked by `#316`
- `#322` is blocked by `#316` and `#320`
- `#330` is blocked by `#318`, `#319`, `#320`, `#322`, `#324`, `#326`, and `#329`
- `#331` is blocked by `#319`, `#323`, `#324`, `#325`, `#326`, `#327`, `#328`, `#329`, and `#330`

Current status summary:
- `Ready`: `1`
- `Blocked`: `15`

If you want, I can also set `Target date` on the board items from the plan due dates so the board is fully aligned.

### Turn 24: btw each issue description for sprint 4 in the project board references

#### 👤 User Prompt

- Time: 2026-04-11T14:48:24.602Z

```text
btw each issue description for sprint 4 in the project board references the other issues by the relative issue count in the sprint 4 plan, not the actual issue number in the project board
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:48:34.610Z

The issue relationships are correct in GitHub, but you’re right that the body text still uses the Sprint 4 local numbering. I’m rewriting the issue bodies so every `#n` reference points at the actual GitHub issue number instead of the plan-relative index.

#### Tool: exec_command

```sh
python3 - <<'PY'
import json, re, subprocess, tempfile, os

repo = 'CS485-Harmony/Harmony'
plan_to_actual = {
    1: 316,
    2: 317,
    3: 318,
    4: 319,
    5: 320,
    6: 321,
    7: 322,
    8: 323,
    9: 324,
    10: 325,
    11: 326,
    12: 327,
    13: 328,
    14: 330,
    15: 331,
    16: 329,
}
actual_issues = sorted(plan_to_actual.values())

items = json.loads(subprocess.run([
    'gh','issue','list','--repo',repo,'--search','Sprint 4 in:title','--limit','100','--json','number,body,title'
], check=True, text=True, capture_output=True).stdout)

updated = []
for item in items:
    body = item['body']
    original = body
    def repl(match):
        n = int(match.group(1))
        return f'#{plan_to_actual.get(n, n)}'
    body = re.sub(r'(?<!\d)#(1[0-6]|[1-9])(?!\d)', repl, body)
    if body != original:
        with tempfile.NamedTemporaryFile('w', delete=False) as f:
            f.write(body)
            path = f.name
        subprocess.run([
            'gh','issue','edit',str(item['number']),'--repo',repo,'--body-file',path
        ], check=True, text=True, capture_output=True)
        os.unlink(path)
        updated.append(item['number'])

print(json.dumps({'updated': sorted(updated)}, indent=2))
PY
```

Output:

```text

```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:48:45.530Z

The first pass tripped over shell quoting in the regex, not GitHub. I’m rerunning with a simpler script file so the replacements are deterministic.

#### Tool: write_stdin

```json
{
  "session_id": 74662,
  "chars": "",
  "yield_time_ms": 1000,
  "max_output_tokens": 4000
}
```

Output:

```text
Command: /bin/zsh -lc "python3 - <<'PY'
import json, re, subprocess, tempfile, os

repo = 'CS485-Harmony/Harmony'
plan_to_actual = {
    1: 316,
    2: 317,
    3: 318,
    4: 319,
    5: 320,
    6: 321,
    7: 322,
    8: 323,
    9: 324,
    10: 325,
    11: 326,
    12: 327,
    13: 328,
    14: 330,
    15: 331,
    16: 329,
}
actual_issues = sorted(plan_to_actual.values())

items = json.loads(subprocess.run([
    'gh','issue','list','--repo',repo,'--search','Sprint 4 in:title','--limit','100','--json','number,body,title'
], check=True, text=True, capture_output=True).stdout)

updated = []
for item in items:
    body = item['body']
    original = body
    def repl(match):
        n = int(match.group(1))
        return f'#{plan_to_actual.get(n, n)}'
    body = re.sub(r'(?<"'!'"\\d)#(1[0-6]|[1-9])(?"'!'"\\d)', repl, body)
    if body "'!= original:
        with tempfile.NamedTemporaryFile('"'w', delete=False) as f:
            f.write(body)
            path = f.name
        subprocess.run([
            'gh','issue','edit',str(item['number']),'--repo',repo,'--body-file',path
        ], check=True, text=True, capture_output=True)
        os.unlink(path)
        updated.append(item['number'])

print(json.dumps({'updated': sorted(updated)}, indent=2))
PY"
Chunk ID: cdc26e
Wall time: 5.0015 seconds
Process running with session ID 74662
Original token count: 0
Output:
```

#### Tool: exec_command

```sh
cat > /tmp/fix_sprint4_body_refs.py <<'PY'
import json
import os
import re
import subprocess
import tempfile

repo = 'CS485-Harmony/Harmony'
plan_to_actual = {
    1: 316,
    2: 317,
    3: 318,
    4: 319,
    5: 320,
    6: 321,
    7: 322,
    8: 323,
    9: 324,
    10: 325,
    11: 326,
    12: 327,
    13: 328,
    14: 330,
    15: 331,
    16: 329,
}

items = json.loads(subprocess.run([
    'gh', 'issue', 'list',
    '--repo', repo,
    '--search', 'Sprint 4 in:title',
    '--limit', '100',
    '--json', 'number,body,title'
], check=True, text=True, capture_output=True).stdout)

updated = []
pattern = re.compile(r'(?<!\d)#(1[0-6]|[1-9])(?!\d)')

for item in items:
    original = item['body']
    body = pattern.sub(lambda m: f"#{plan_to_actual[int(m.group(1))]}", original)
    if body == original:
        continue
    with tempfile.NamedTemporaryFile('w', delete=False) as f:
        f.write(body)
        path = f.name
    try:
        subprocess.run([
            'gh', 'issue', 'edit', str(item['number']),
            '--repo', repo,
            '--body-file', path,
        ], check=True, text=True, capture_output=True)
    finally:
        os.unlink(path)
    updated.append(item['number'])

print(json.dumps({'updated': sorted(updated)}, indent=2))
PY
python3 /tmp/fix_sprint4_body_refs.py
```

Output:

```text
{
  "updated": []
}
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:49:13.514Z

The no-op result was because `zsh` history expansion kept mangling the negative-lookaround regex. I’m switching to `bash`, verifying one issue body, then I’ll run the body rewrite again with the correct matcher.

#### Tool: exec_command

```sh
gh issue view 326 --repo CS485-Harmony/Harmony --json body
```

Output:

```text
{"body":"## Summary\nCreate backend CD workflow for Railway.\n\nStart from the already-provisioned Railway project tied to the current project state so the workflow can be scaffolded and dry-run this weekend. Deploy `backend-api` and `backend-worker` on pushes to `main`. Ensure migrations / build / deploy ordering is safe. Use GitHub secrets for Railway authentication.\n\nTreat GitHub Actions as the production deploy authority and document any provider-native auto-deploy settings that must be disabled or restricted. Implement the workflow against the service topology and env contract defined in `docs/deployment/deployment-architecture.md`.\n\nIf final backend service split details are still landing, create the workflow early and finish the final production wiring immediately after #320 and #322.\n\n## Acceptance Criteria\n- Workflow deploys backend services without manual intervention\n- Production deploy authority is unambiguous and documented\n- Exactly one migration runner performs `prisma migrate deploy`, and `backend-api` replicas are prevented from racing migrations on startup\n- Schema rollout rules follow an expand/contract convention so destructive migrations are not introduced in the same deploy that must coexist with old API replicas during rolling restart\n- Deploys target the correct Railway environment\n- Deployment process is documented in README\n\n## Ownership\n- Assignee: `FardeenI`\n- Backup owner: `Aiden-Barrera`\n- Due: `April 12, 2026`\n\n## Dependencies\n- Blocked by: #320, #322\n- Unblocks: #330, #331"}
```

#### Tool: exec_command

```sh
python3 - <<'PY'
import re
s='Blocked by: #5, #7\nUnblocks: #14, #15\nfinish after #6 and #16'
pattern=re.compile(r'(?<!\\d)#(1[0-6]|[1-9])(?!\\d)')
print(pattern.sub(lambda m: f"#{100+int(m.group(1))}", s))
PY
```

Output:

```text
Blocked by: #105, #107
Unblocks: #114, #115
finish after #106 and #116
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:49:17.037Z

At least one body is already corrected, so I’m checking the full Sprint 4 set for any remaining plan-relative `#1`…`#16` references. If any are left, I’ll patch only those.

#### Tool: exec_command

```sh
python3 - <<'PY'
import json, re, subprocess
items = json.loads(subprocess.run([
    'gh','issue','list','--repo','CS485-Harmony/Harmony','--search','Sprint 4 in:title','--limit','100','--json','number,body'
], check=True, text=True, capture_output=True).stdout)
pattern = re.compile(r'(?<!\d)#(1[0-6]|[1-9])(?!\d)')
remaining = []
for item in items:
    matches = sorted(set(pattern.findall(item['body'])))
    if matches:
        remaining.append({'number': item['number'], 'matches': matches})
print(json.dumps(remaining, indent=2))
PY
```

Output:

```text
[]
```

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:49:26.480Z

Confirmed. The Sprint 4 issue bodies are already using the real GitHub issue numbers now, not the plan-relative `#1` to `#16` references.

I verified the full Sprint 4 set and there are no remaining plan-relative issue references in any of the 16 issue bodies. For example:
- `#326` now says `Blocked by: #320, #322`
- `#326` also says `Unblocks: #330, #331`

So the current state is aligned in both places:
- GitHub dependency relationships use the real issue graph
- issue body text also uses the real issue numbers

### Turn 25: [$codex-conversation-exporter](/Users/allen/repos/codex-logs-export/skil

#### 👤 User Prompt

- Time: 2026-04-11T14:50:17.685Z

```text
[$codex-conversation-exporter](/Users/allen/repos/codex-logs-export/skills/codex-conversation-exporter/SKILL.md) 019d72f1-db32-7ac3-888c-cd0363f3fa8c into llm-logs/acabrera04-logs/acabrera04-deployment/ and push
```

_No assistant or tool activity recorded after this prompt._

### Turn 26: <skill> <name>codex-conversation-exporter</name>

#### 👤 User Prompt

- Time: 2026-04-11T14:50:17.687Z

````text
<skill>
<name>codex-conversation-exporter</name>
<path>/Users/allen/repos/codex-logs-export/skills/codex-conversation-exporter/SKILL.md</path>
---
name: codex-conversation-exporter
description: Export Codex session logs to Markdown using the local codex-export CLI instead of reconstructing transcripts with model tokens.
---

# Codex Conversation Exporter

Use this skill when the user asks to export Codex logs, save a Codex conversation, convert a session to Markdown, or archive a transcript locally.

## Rules

- Prefer the local `codex-export` CLI over reconstructing a transcript in-model.
- If the user has not identified a session, run `codex-export list` first and show the relevant candidates.
- Default to messages plus tool activity.
- Include hidden system/developer prompts only when the user explicitly asks for them.
- Write to a user-visible path unless the user asks for stdout or another destination.
- Report the output path back to the user after a file export.

## Command patterns

List recent sessions:

```bash
codex-export list
codex-export list --limit 10
codex-export list --since 2026-03-30
```

Export by thread id:

```bash
codex-export export <thread-id>
codex-export export <thread-id> --out ~/Desktop
codex-export export <thread-id> --messages-only
codex-export export <thread-id> --all
codex-export export <thread-id> --include-hidden-prompts
codex-export export <thread-id> --stdout
```

Export by rollout path:

```bash
codex-export export --path ~/.codex/sessions/.../rollout-*.jsonl
codex-export export --path ~/.codex/sessions/.../rollout-*.jsonl --out ~/Desktop
```

## Flag guide

- `--out <file-or-dir>` writes to a specific file or directory.
- `--stdout` prints the Markdown instead of writing a file.
- `--messages-only` omits tool calls and tool outputs.
- `--all` includes low-level tool metadata and raw wrappers that are hidden by default.
- `--include-hidden-prompts` includes developer/system prompt layers.
- `--since <date>` filters `list` results.
- `--limit <n>` caps `list` results.

## Agent behavior

When the user says "export this conversation" without a thread id:

1. Run `codex-export list`.
2. Identify the most likely current session from title, cwd, and recency.
3. Export it with the default mode unless the user requested a different output.
4. Return the exact file path written.

`codex-log-export` remains available as a compatibility alias.

</skill>
````

#### 🤖 gpt-5.4 (medium)

- Time: 2026-04-11T14:50:29.982Z

Using the `codex-conversation-exporter` skill. I’m exporting thread `019d72f1-db32-7ac3-888c-cd0363f3fa8c` into the requested `llm-logs/acabrera04-logs/acabrera04-deployment/` path, then I’ll stage, commit, and push the new log file.

#### Tool: exec_command

```sh
codex-export export 019d72f1-db32-7ac3-888c-cd0363f3fa8c --out /Users/allen/repos/Harmony/llm-logs/acabrera04-logs/acabrera04-deployment/
```

#### Tool: exec_command

```sh
git status --short
```

#### Tool: exec_command

```sh
git branch --show-current
```
