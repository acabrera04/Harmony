# Github project board planning

**Session ID:** ses_3415ff184ffedWb6qqY9bAz9Sp
**Created:** 3/5/2026, 10:31:26 AM
**Updated:** 3/5/2026, 10:37:48 AM

---

## User

Review the project board on Github for this repository. 
Fmiliarize yourself with the issues assigned to `declanblanc`
Create a plan for completing each of these issues and write the plan to @tasks/todo.md 

---

## Assistant (Plan · claude-sonnet-4-6 · 4.5s)

_Thinking:_

The user wants me to:
1. Review the project board on GitHub for this repository
2. Familiarize myself with issues assigned to `declanblanc`
3. Create a plan for completing each of these issues
4. Write the plan to `tasks/todo.md`

Let me start by finding the GitHub repository information and then look at the project board and issues.

First, let me check the repository remote URL to understand which GitHub repository this is.

**Tool: bash**

**Input:**
```json
{
  "command": "git remote -v",
  "description": "Get the GitHub remote URL"
}
```

**Output:**
```
origin	git@github.com:acabrera04/Harmony.git (fetch)
origin	git@github.com:acabrera04/Harmony.git (push)

```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony</path>
<type>directory</type>
<entries>
.claude-logs/
.claude/
.DS_Store
.git/
.github/
.gitignore
AGENTS.md
dev-spec-guidelines.pdf
docs/
harmony-backend/
harmony-frontend/
llm-logs/
mockups/
planning/
README.md
tasks/
WORKFLOW.md

(17 entries)
</entries>
```

---

## Assistant (Plan · claude-sonnet-4-6 · 5.1s)

_Thinking:_

Let me get the GitHub project board and issues assigned to `declanblanc`.

**Tool: bash**

**Input:**
```json
{
  "command": "gh issue list --assignee declanblanc --repo acabrera04/Harmony --state open --json number,title,body,labels,milestone,url 2>&1",
  "description": "List open issues assigned to declanblanc"
}
```

**Output:**
```
[{"body":"## Description\nAdd Next.js middleware for server-side auth, fixing the client-side redirect spinner (issue #71).\n\n## Tasks\n- Add Next.js middleware to protect /settings/* and /channels/* routes server-side\n- Verify JWT from httpOnly cookie before rendering protected pages\n- Redirect unauthenticated users to /auth/login immediately (no client-side spinner)\n- Redirect non-admin users away from /settings/* routes\n- Fixes GitHub issue #71 (3–4s spinner delay before redirect)\n\n## Due Date\nMarch 13, 2026\n\n## Dependencies\nDepends on: #97 #113","labels":[{"id":"LA_kwDORIrGY88AAAACXCR6xg","name":"feature","description":"New feature or request","color":"a2eeef"},{"id":"LA_kwDORIrGY88AAAACYUc6AA","name":"week-2","description":"Sprint Week 2","color":"b60205"},{"id":"LA_kwDORIrGY88AAAACaCHlmQ","name":"backend","description":"Backend development","color":"5319E7"}],"milestone":null,"number":119,"title":"Next.js Auth Middleware — Server-Side Route Protection","url":"https://github.com/acabrera04/Harmony/issues/119"},{"body":"## Description\nReplace mock serverService + channelService with real tRPC/API calls.\n\n## Tasks\n- Replace mock serverService + channelService with real tRPC/API calls\n- Update ALL server actions: createServerAction, saveServerSettings, deleteServerAction, saveChannelSettings, createChannelAction\n- Wire server member list display\n- Handle loading/error states properly\n\n## Due Date\nMarch 12, 2026\n\n## Dependencies\nDepends on: #99 #100","labels":[{"id":"LA_kwDORIrGY88AAAACYUc5eA","name":"integration","description":"Integration and cross-feature work","color":"c5def5"},{"id":"LA_kwDORIrGY88AAAACYUc6AA","name":"week-2","description":"Sprint Week 2","color":"b60205"},{"id":"LA_kwDORIrGY88AAAACaCHlmQ","name":"backend","description":"Backend development","color":"5319E7"}],"milestone":null,"number":114,"title":"Frontend Integration — Servers & Channels","url":"https://github.com/acabrera04/Harmony/issues/114"},{"body":"## Description\nImplement token bucket rate limiting with bot detection for the public API.\n\n## Tasks\n- Token bucket rate limiting\n- Human users: 100 req/min per IP\n- Verified bots (Googlebot, Bingbot): 1000 req/min\n- 429 Too Many Requests with Retry-After header\n- Bot detection via User-Agent\n- Include minimum tests for rate limit enforcement\n\n## Due Date\nMarch 11, 2026\n\n## Dependencies\nDepends on: #94","labels":[{"id":"LA_kwDORIrGY88AAAACXCR6xg","name":"feature","description":"New feature or request","color":"a2eeef"},{"id":"LA_kwDORIrGY88AAAACYUc6AA","name":"week-2","description":"Sprint Week 2","color":"b60205"},{"id":"LA_kwDORIrGY88AAAACaCHlmQ","name":"backend","description":"Backend development","color":"5319E7"}],"milestone":null,"number":110,"title":"Rate Limiting Middleware","url":"https://github.com/acabrera04/Harmony/issues/110"},{"body":"## Description\nImplement the ChannelVisibilityService per dev-spec-channel-visibility-toggle.md.\n\n## Tasks\n- ChannelVisibilityService: updateVisibility(channelId, newVisibility)\n- State machine validation (all transitions valid per spec)\n- Permission check: only server owner/admin can toggle\n- Update indexed_at timestamp when toggling to PUBLIC_INDEXABLE\n- Clear indexed_at when going PRIVATE\n- Emit VISIBILITY_CHANGED event\n- Include minimum tests for visibility state transitions\n\n## Due Date\nMarch 10, 2026\n\n## Dependencies\nDepends on: #100 #102","labels":[{"id":"LA_kwDORIrGY88AAAACXCR6xg","name":"feature","description":"New feature or request","color":"a2eeef"},{"id":"LA_kwDORIrGY88AAAACYUc6AA","name":"week-2","description":"Sprint Week 2","color":"b60205"},{"id":"LA_kwDORIrGY88AAAACaCHlmQ","name":"backend","description":"Backend development","color":"5319E7"}],"milestone":null,"number":105,"title":"Channel Visibility Toggle Service","url":"https://github.com/acabrera04/Harmony/issues/105"},{"body":"## Description\nImplement channel management service with tRPC endpoints, including voice channel type support.\n\n## Tasks\n- Channel CRUD via tRPC: getChannels(serverId), getChannel(slug), createChannel, updateChannel, deleteChannel\n- ChannelType enum support (TEXT, VOICE, ANNOUNCEMENT) — filter and group by type\n- Visibility enum (PUBLIC_INDEXABLE, PUBLIC_NO_INDEX, PRIVATE)\n- Enforce VOICE channels cannot be PUBLIC_INDEXABLE (must be PUBLIC_NO_INDEX or PRIVATE)\n- Position ordering, slug uniqueness per server\n- Default channel creation on server create\n- Include minimum tests for channel service happy paths\n\n## Due Date\nMarch 6, 2026\n\n## Dependencies\nDepends on: #95 #96","labels":[{"id":"LA_kwDORIrGY88AAAACXCR6xg","name":"feature","description":"New feature or request","color":"a2eeef"},{"id":"LA_kwDORIrGY88AAAACYUc53g","name":"week-1","description":"Sprint Week 1","color":"006b75"},{"id":"LA_kwDORIrGY88AAAACaCHlmQ","name":"backend","description":"Backend development","color":"5319E7"}],"milestone":null,"number":100,"title":"Channel Service & API","url":"https://github.com/acabrera04/Harmony/issues/100"},{"body":"## Description\nDefine the full database schema using Prisma ORM with PostgreSQL.\n\n## Tasks\n- Define Prisma schema: users, servers, channels, messages, attachments, visibility_audit_log\n- Create visibility_enum (PUBLIC_INDEXABLE, PUBLIC_NO_INDEX, PRIVATE)\n- Create channel_type enum (TEXT, VOICE, ANNOUNCEMENT)\n- All indexes from dev specs (partial indexes, composite indexes)\n- Initial migration\n- Include minimum tests verifying schema/migrations work\n\n## Due Date\nMarch 4, 2026\n\n## Dependencies\nDepends on: #94 #95","labels":[{"id":"LA_kwDORIrGY88AAAACYUc4Gw","name":"setup","description":"Project setup and scaffolding","color":"0e8a16"},{"id":"LA_kwDORIrGY88AAAACYUc4Pg","name":"prerequisite","description":"Must be done before feature work","color":"fbca04"},{"id":"LA_kwDORIrGY88AAAACYUc53g","name":"week-1","description":"Sprint Week 1","color":"006b75"},{"id":"LA_kwDORIrGY88AAAACaCHlmQ","name":"backend","description":"Backend development","color":"5319E7"}],"milestone":null,"number":96,"title":"Database Schema & Prisma Migrations","url":"https://github.com/acabrera04/Harmony/issues/96"}]

```

**Tool: bash**

**Input:**
```json
{
  "command": "gh project list --owner acabrera04 2>&1",
  "description": "List GitHub projects for the repo owner"
}
```

**Output:**
```
error: your authentication token is missing required scopes [read:project]
To request it, run:  gh auth refresh -s read:project

```

---

## Assistant (Plan · claude-sonnet-4-6 · 7.5s)

_Thinking:_

I got the issues assigned to `declanblanc`. Let me now get more details about each issue and look at the project board. Let me also check the existing tasks/todo.md file and review the relevant specs.

**Tool: bash**

**Input:**
```json
{
  "command": "gh issue view 96 --repo acabrera04/Harmony 2>&1 && echo \"---\" && gh issue view 100 --repo acabrera04/Harmony 2>&1 && echo \"---\" && gh issue view 105 --repo acabrera04/Harmony 2>&1 && echo \"---\" && gh issue view 110 --repo acabrera04/Harmony 2>&1",
  "description": "View details of issues 96, 100, 105, 110"
}
```

**Output:**
```
title:	Database Schema & Prisma Migrations
state:	OPEN
author:	acabrera04
labels:	backend, prerequisite, setup, week-1
comments:	1
assignees:	declanblanc
projects:	
milestone:	
number:	96
--
## Description
Define the full database schema using Prisma ORM with PostgreSQL.

## Tasks
- Define Prisma schema: users, servers, channels, messages, attachments, visibility_audit_log
- Create visibility_enum (PUBLIC_INDEXABLE, PUBLIC_NO_INDEX, PRIVATE)
- Create channel_type enum (TEXT, VOICE, ANNOUNCEMENT)
- All indexes from dev specs (partial indexes, composite indexes)
- Initial migration
- Include minimum tests verifying schema/migrations work

## Due Date
March 4, 2026

## Dependencies
Depends on: #94 #95
---
title:	Channel Service & API
state:	OPEN
author:	acabrera04
labels:	backend, feature, week-1
comments:	0
assignees:	declanblanc
projects:	
milestone:	
number:	100
--
## Description
Implement channel management service with tRPC endpoints, including voice channel type support.

## Tasks
- Channel CRUD via tRPC: getChannels(serverId), getChannel(slug), createChannel, updateChannel, deleteChannel
- ChannelType enum support (TEXT, VOICE, ANNOUNCEMENT) — filter and group by type
- Visibility enum (PUBLIC_INDEXABLE, PUBLIC_NO_INDEX, PRIVATE)
- Enforce VOICE channels cannot be PUBLIC_INDEXABLE (must be PUBLIC_NO_INDEX or PRIVATE)
- Position ordering, slug uniqueness per server
- Default channel creation on server create
- Include minimum tests for channel service happy paths

## Due Date
March 6, 2026

## Dependencies
Depends on: #95 #96
---
title:	Channel Visibility Toggle Service
state:	OPEN
author:	acabrera04
labels:	backend, feature, week-2
comments:	0
assignees:	declanblanc
projects:	
milestone:	
number:	105
--
## Description
Implement the ChannelVisibilityService per dev-spec-channel-visibility-toggle.md.

## Tasks
- ChannelVisibilityService: updateVisibility(channelId, newVisibility)
- State machine validation (all transitions valid per spec)
- Permission check: only server owner/admin can toggle
- Update indexed_at timestamp when toggling to PUBLIC_INDEXABLE
- Clear indexed_at when going PRIVATE
- Emit VISIBILITY_CHANGED event
- Include minimum tests for visibility state transitions

## Due Date
March 10, 2026

## Dependencies
Depends on: #100 #102
---
title:	Rate Limiting Middleware
state:	OPEN
author:	acabrera04
labels:	backend, feature, week-2
comments:	0
assignees:	declanblanc
projects:	
milestone:	
number:	110
--
## Description
Implement token bucket rate limiting with bot detection for the public API.

## Tasks
- Token bucket rate limiting
- Human users: 100 req/min per IP
- Verified bots (Googlebot, Bingbot): 1000 req/min
- 429 Too Many Requests with Retry-After header
- Bot detection via User-Agent
- Include minimum tests for rate limit enforcement

## Due Date
March 11, 2026

## Dependencies
Depends on: #94

```

**Tool: bash**

**Input:**
```json
{
  "command": "gh issue view 114 --repo acabrera04/Harmony 2>&1 && echo \"---\" && gh issue view 119 --repo acabrera04/Harmony 2>&1",
  "description": "View details of issues 114 and 119"
}
```

**Output:**
```
title:	Frontend Integration — Servers & Channels
state:	OPEN
author:	acabrera04
labels:	backend, integration, week-2
comments:	0
assignees:	declanblanc
projects:	
milestone:	
number:	114
--
## Description
Replace mock serverService + channelService with real tRPC/API calls.

## Tasks
- Replace mock serverService + channelService with real tRPC/API calls
- Update ALL server actions: createServerAction, saveServerSettings, deleteServerAction, saveChannelSettings, createChannelAction
- Wire server member list display
- Handle loading/error states properly

## Due Date
March 12, 2026

## Dependencies
Depends on: #99 #100
---
title:	Next.js Auth Middleware — Server-Side Route Protection
state:	OPEN
author:	acabrera04
labels:	backend, feature, week-2
comments:	0
assignees:	declanblanc
projects:	
milestone:	
number:	119
--
## Description
Add Next.js middleware for server-side auth, fixing the client-side redirect spinner (issue #71).

## Tasks
- Add Next.js middleware to protect /settings/* and /channels/* routes server-side
- Verify JWT from httpOnly cookie before rendering protected pages
- Redirect unauthenticated users to /auth/login immediately (no client-side spinner)
- Redirect non-admin users away from /settings/* routes
- Fixes GitHub issue #71 (3–4s spinner delay before redirect)

## Due Date
March 13, 2026

## Dependencies
Depends on: #97 #113

```

---

## Assistant (Plan · claude-sonnet-4-6 · 3.9s)

_Thinking:_

Now I have all the issues. Let me look at:
1. The existing tasks/todo.md file
2. The relevant spec files for each issue
3. The current state of the codebase

Let me look at the existing code structure to understand what's been done so far.

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/tasks"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/tasks</path>
<type>directory</type>
<entries>
lessons.md

(1 entries)
</entries>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/docs"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/docs</path>
<type>directory</type>
<entries>
design-brief/
dev-spec-channel-visibility-toggle.md
dev-spec-guest-public-channel-view.md
dev-spec-seo-meta-tag-generation.md
unified-backend-architecture.md

(5 entries)
</entries>
```

---

## Assistant (Plan · claude-sonnet-4-6 · 7.4s)

**Tool: bash**

**Input:**
```json
{
  "command": "gh issue view 94 --repo acabrera04/Harmony 2>&1 && echo \"---\" && gh issue view 95 --repo acabrera04/Harmony 2>&1 && echo \"---\" && gh issue view 97 --repo acabrera04/Harmony 2>&1 && echo \"---\" && gh issue view 99 --repo acabrera04/Harmony 2>&1 && echo \"---\" && gh issue view 102 --repo acabrera04/Harmony 2>&1 && echo \"---\" && gh issue view 113 --repo acabrera04/Harmony 2>&1",
  "description": "View dependency issues for context"
}
```

**Output:**
```
title:	Backend Project Scaffold & Dev Environment
state:	CLOSED
author:	acabrera04
labels:	backend, prerequisite, setup, week-1
comments:	2
assignees:	acabrera04
projects:	
milestone:	
number:	94
--
## Description
Set up the Node.js backend project with Express + tRPC, TypeScript, and dev tooling.

## Tasks
- Set up Node.js backend (Express + tRPC), TypeScript config, project structure
- Docker Compose for PostgreSQL + Redis local dev
- Structure Express app to be wrappable with `serverless-http` for future AWS Lambda deployment (P6)
- Configure CORS middleware for cross-origin frontend requests
- Shared types package or import from frontend types
- Dev server with hot reload (ts-node-dev or tsx)
- Set up Jest testing framework with TypeScript support (ts-jest)
- Update CI workflow (.github/workflows/ci.yml) — add backend job: install, lint, build, test (parallel with existing frontend job)

## Due Date
March 3, 2026

## Dependencies
None — this is the first issue.
---
title:	P4 Deliverables — Dev Spec Update & Architecture Document
state:	CLOSED
author:	acabrera04
labels:	backend, documentation, prerequisite, week-1
comments:	2
assignees:	acabrera04
projects:	
milestone:	
number:	95
--
## Description
Update dev specs and create the unified backend architecture document. This is the blueprint all devs code against — **must be done before service implementation begins**.

## Tasks
- Update dev-spec-channel-visibility-toggle.md and dev-spec-guest-public-channel-view.md to reflect unified backend
- Create unified backend architecture document with text description + Mermaid diagram
- Justify design choices (PostgreSQL, Redis, tRPC+REST split, etc.) for a senior architect audience
- Per-module specification (P4 items 1–8): features, internal architecture + Mermaid, data abstraction, stable storage + schemas, API definition, class/method/field list with visibility, class hierarchy Mermaid diagram
- Include rendered Mermaid diagram screenshots in repo

*(P4 Deliverables #1 + #2: Update Dev Specs + Specify the Backend)*

## Due Date
March 4, 2026

## Dependencies
Depends on: #94
---
title:	Authentication System — JWT Register/Login/Logout
state:	OPEN
author:	acabrera04
labels:	backend, feature, prerequisite, week-1
comments:	0
assignees:	Aiden-Barrera
projects:	
milestone:	
number:	97
--
## Description
Implement JWT-based authentication with register, login, and logout endpoints.

## Tasks
- POST /api/auth/register, POST /api/auth/login, POST /api/auth/logout
- JWT token generation + refresh tokens
- bcrypt password hashing
- Auth middleware for protected routes
- Zod input validation
- Include minimum tests for auth happy paths

## Due Date
March 5, 2026

## Dependencies
Depends on: #94 #95 #96
---
title:	Server Service & API
state:	OPEN
author:	acabrera04
labels:	backend, feature, week-1
comments:	0
assignees:	AvanishKulkarni
projects:	
milestone:	
number:	99
--
## Description
Implement server (guild) management service with tRPC endpoints.

## Tasks
- Server CRUD via tRPC: getServers, getServer(slug), createServer, updateServer, deleteServer
- Auto-slug generation from name
- Member count tracking
- Owner relationship to users
- is_public flag for server-level publicity
- Include minimum tests for server service happy paths

## Due Date
March 5, 2026

## Dependencies
Depends on: #95 #96
---
title:	Role-Based Permission & Authorization System
state:	OPEN
author:	acabrera04
labels:	backend, feature, prerequisite, week-1
comments:	0
assignees:	Aiden-Barrera
projects:	
milestone:	
number:	102
--
## Description
Implement RBAC system for controlling access to all resources.

## Tasks
- Permission service: checkPermission(userId, serverId, action)
- Roles: owner, admin, moderator, member, guest
- Permission matrix (who can CRUD servers, channels, messages, settings)
- tRPC middleware for route-level authorization
- Include minimum tests for permission checks

## Due Date
March 6, 2026

## Dependencies
Depends on: #97 #98
---
title:	Frontend Integration — Authentication
state:	OPEN
author:	acabrera04
labels:	backend, integration, week-2
comments:	0
assignees:	Aiden-Barrera
projects:	
milestone:	
number:	113
--
## Description
Replace mock authService with real backend API calls.

## Tasks
- Replace mock authService with real API calls
- JWT token storage (httpOnly cookies)
- Auto-refresh token logic
- Update AuthContext to use real endpoints (login, register, logout, getCurrentUser, updateCurrentUser)
- Wire UserSettingsPage profile editing (displayName, status) + logout flow
- Redirect flows on 401

## Due Date
March 12, 2026

## Dependencies
Depends on: #97

```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/docs/dev-spec-channel-visibility-toggle.md"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/docs/dev-spec-channel-visibility-toggle.md</path>
<type>file</type>
<content>1: # Development Specification: Channel Visibility Toggle
2: 
3: ## Feature: Public/Indexable Channel Control
4: 
5: **User Story:** As a Community Administrator, I want to toggle specific channels as "Public/Indexable" or "Private," so that I can control which parts of my community are exposed to the open web while keeping sensitive social conversations private.
6: 
7: > **Unified Backend Reference:** This feature's backend classes are part of the shared Harmony backend defined in [`unified-backend-architecture.md`](./unified-backend-architecture.md). The mapping from this spec's class labels to the unified module labels is in §10 of that document. Key modules contributed by this feature: **M-B3** (Visibility Management), **M-B6** (SEO & Indexing, shared), **M-D1** (Data Access, shared).
8: 
9: ---
10: 
11: ## 1. Header
12: 
13: ### 1.1 Version and Date
14: 
15: | Version | Date       | Description                              |
16: |---------|------------|------------------------------------------|
17: | 1.0     | 2026-02-12 | Initial development specification        |
18: | 2.0     | 2026-02-12 | Cross-spec consolidation and fixes       |
19: 
20: ### 1.2 Author and Role
21: 
22: | Author        | Role                    | Version |
23: |---------------|-------------------------|---------|
24: | Claude (AI)   | Specification Author    | 2.0     |
25: | dblanc        | Project Lead            | 1.0     |
26: | AvanishKulkarni | Project Lead | 2.0 |
27: 
28: ### 1.3 Rationale
29: Header with versioning and authors.
30: 
31: ---
32: 
33: ## 2. Architecture Diagram
34: 
35: ### 2.1 System Overview
36: 
37: ```
38: ┌─────────────────────────────────────────────────────────────────┐
39: │                         CLIENT LAYER                            │
40: │  ┌───────────────────────────────────────────────────────────┐  │
41: │  │ M1 Admin Dashboard                                        │  │
42: │  │  ┌──────────────────────┐  ┌────────────────────────────┐ │  │
43: │  │  │ C1.1 ChannelSettings │  │ C1.2 VisibilityToggle      │ │  │
44: │  │  │   channelId: string  │  │   isPublic: boolean        │ │  │
45: │  │  │   currentVisibility  │◄─│   isLoading: boolean       │ │  │
46: │  │  │   render()           │  │   onToggle()               │ │  │
47: │  │  │   loadSettings()     │  │   validatePermissions()    │ │  │
48: │  │  └──────────────────────┘  └────────────────────────────┘ │  │
49: │  └───────────────────────────────────────────────────────────┘  │
50: │  ┌───────────────────────────────────────────────────────────┐  │
51: │  │ M2 Public Channel Viewer                                  │  │
52: │  │  ┌──────────────────────┐  ┌────────────────────────────┐ │  │
53: │  │  │ C2.1 PublicChannel   │  │ C2.2 MessageList           │ │  │
54: │  │  │   serverId: string   │  │   messages: Message[]      │ │  │
55: │  │  │   isAuthenticated    │◄─│   isAnonymous: boolean     │ │  │
56: │  │  │   render()           │  │   render(), loadMore()     │ │  │
57: │  │  └──────────────────────┘  └────────────────────────────┘ │  │
58: │  └───────────────────────────────────────────────────────────┘  │
59: │  ┌───────────────────────────────────────────────────────────┐  │
60: │  │ M3 Client Services                                        │  │
61: │  │  ┌──────────────────────┐  ┌────────────────────────────┐ │  │
62: │  │  │ C3.1 ChannelService  │  │ C3.2 AuthService           │ │  │
63: │  │  │   getChannel()       │  │   isAuthenticated()        │ │  │
64: │  │  │   updateVisibility() │  │   hasPermission()          │ │  │
65: │  │  │   getPublicChannels()│  └────────────────────────────┘ │  │
66: │  │  └──────────────────────┘                                 │  │
67: │  └───────────────────────────────────────────────────────────┘  │
68: └─────────────────────────────────────────────────────────────────┘
69:                               │ HTTPS/WebSocket
70:                               ▼
71: ┌─────────────────────────────────────────────────────────────────┐
72: │                        SERVER LAYER                             │
73: │  ┌───────────────────────────────────────────────────────────┐  │
74: │  │ M4 API Gateway                                            │  │
75: │  │  ┌──────────────────────┐  ┌────────────────────────────┐ │  │
76: │  │  │ C4.1 ChannelCtrl     │  │ C4.2 PublicAccessCtrl      │ │  │
77: │  │  │   getChannelSettings │  │   getPublicChannel()       │ │  │
78: │  │  │   updateChannelVis() │  │   getServerSitemap()       │ │  │
79: │  │  │   getVisAuditLog()   │  │   getRobotsTxt()           │ │  │
80: │  │  │  -validateAdminAcces │  │   getPublicMessages()      │ │  │
81: │  │  └──────────────────────┘  └────────────────────────────┘ │  │
82: │  └───────────────────────────────────────────────────────────┘  │
83: │  ┌───────────────────────────────────────────────────────────┐  │
84: │  │ M5 Business Logic                                         │  │
85: │  │  ┌──────────────────────┐  ┌────────────────────────────┐ │  │
86: │  │  │ C5.1 VisibilityServ  │  │ C5.2 IndexingService       │ │  │
87: │  │  │   setVisibility()    │  │   updateSitemap()          │ │  │
88: │  │  │   getVisibility()    │  │   notifySearchEngines()    │ │  │
89: │  │  │   canChangeVisib()   │  │   generateCanonicalUrl()   │ │  │
90: │  │  │  -validateTransition │  │   getRobotsDirectives()    │ │  │
91: │  │  │  -emitVisibChange()  │  │                            │ │  │
92: │  │  └──────────────────────┘  └────────────────────────────┘ │  │
93: │  │  ┌──────────────────────┐  ┌────────────────────────────┐ │  │
94: │  │  │ C5.3 PermissionServ  │  │ C5.4 AuditLogService       │ │  │
95: │  │  │   canManageChannel() │  │   logVisibilityChange()    │ │  │
96: │  │  │   isServerAdmin()    │  │   getAuditHistory()        │ │  │
97: │  │  │   getEffectivePerms()│  │   exportAuditLog()         │ │  │
98: │  │  └──────────────────────┘  └────────────────────────────┘ │  │
99: │  └───────────────────────────────────────────────────────────┘  │
100: │  ┌───────────────────────────────────────────────────────────┐  │
101: │  │ M6 Data Access                                            │  │
102: │  │  ┌──────────────────────┐  ┌────────────────────────────┐ │  │
103: │  │  │ C6.1 ChannelRepo     │  │ C6.2 AuditLogRepo          │ │  │
104: │  │  │   findById()         │  │   create()                 │ │  │
105: │  │  │   findBySlug()       │  │   findByChannelId()        │ │  │
106: │  │  │   update()           │  │   findByDateRange()        │ │  │
107: │  │  │   findPublicByServerId│  └────────────────────────────┘ │  │
108: │  │  │   getVisibility()    │                                 │  │
109: │  │  │   getMetadata()      │                                 │  │
110: │  │  │  -invalidateCache()  │                                 │  │
111: │  │  │  -getCacheKey()      │                                 │  │
112: │  │  └──────────────────────┘                                 │  │
113: │  └───────────────────────────────────────────────────────────┘  │
114: └─────────────────────────────────────────────────────────────────┘
115:                               │ Database Protocol
116:                               ▼
117: ┌─────────────────────────────────────────────────────────────────┐
118: │                         DATA LAYER                              │
119: │  ┌───────────────────────────────────────────────────────────┐  │
120: │  │ M7 Persistence                                            │  │
121: │  │  ┌──────────────────────┐  ┌────────────────────────────┐ │  │
122: │  │  │ D7.1 channels        │  │ D7.2 visibility_audit_log  │ │  │
123: │  │  │  id, server_id, name │  │  id, channel_id, actor_id  │ │  │
124: │  │  │  slug, visibility    │  │  action, old/new_value     │ │  │
125: │  │  │  topic, position     │  │  timestamp, ip_address     │ │  │
126: │  │  │  indexed_at, ts cols │  └────────────────────────────┘ │  │
127: │  │  └──────────────────────┘                                 │  │
128: │  └───────────────────────────────────────────────────────────┘  │
129: │  ┌───────────────────────────────────────────────────────────┐  │
130: │  │ M8 Cache (Redis)                                          │  │
131: │  │  ┌──────────────────────┐  ┌────────────────────────────┐ │  │
132: │  │  │ D8.1 Visibility      │  │ D8.2 PublicChannelList     │ │  │
133: │  │  │ channel:{id}:visib.  │  │ server:{id}:public_channels│ │  │
134: │  │  │ TTL: 3600s           │  │ TTL: 300s                  │ │  │
135: │  │  └──────────────────────┘  └────────────────────────────┘ │  │
136: │  └───────────────────────────────────────────────────────────┘  │
137: └─────────────────────────────────────────────────────────────────┘
138:                               │ HTTP/API
139:                               ▼
140: ┌──────────────────────────────────────────────────────────────────┐
141: │                       EXTERNAL SYSTEMS                           │
142: │  [E1 Search Engines]  [E2 Sitemap Consumers]  [E3 CDN/CloudFlare]│
143: └──────────────────────────────────────────────────────────────────┘
144: ```
145: 
146: > **Note:** All cache keys use UUID-based identifiers (e.g., `channel:{channelId}:visibility`) for consistency across all Harmony specs.
147: 
148: ### 2.2 Information Flow Summary
149: 
150: | Flow ID | Source | Destination | Data | Protocol |
151: |---------|--------|-------------|------|----------|
152: | F1 | C1.2 VisibilityToggle | C4.1 ChannelController | VisibilityUpdateRequest | HTTPS (tRPC) |
153: | F2 | C4.1 ChannelController | C5.1 VisibilityService | VisibilityChangeCommand | Internal Call |
154: | F3 | C5.1 VisibilityService | C6.1 ChannelRepository | Channel Entity | Database Protocol |
155: | F4 | C5.1 VisibilityService | C5.2 IndexingService | IndexingEvent | EventBus (Redis Pub/Sub) |
156: | F5 | C5.2 IndexingService | E1 Search Engines | Sitemap XML | HTTPS |
157: | F6 | C4.2 PublicAccessCtrl | E3 CDN | Cached Public Content | HTTPS |
158: | F7 | C5.1 VisibilityService | C5.4 AuditLogService | AuditEntry | Internal Call |
159: 
160: ### 2.3 Rationale
161: 
162: This follows a clear model-view-controller architecture, where the client can view channels and control their visibility state with the M1 Admin Dashboard controller. The underlying model is represented by the server layer, which handles get/set operations and any necessary side-effects for search engine indexing. 
163: 
164: The underlying data layer uses a short-term caching layer to reduce database accesses and syncs with external systems. 
165: 
166: We had to prompt edits to this to ensure the database columns were not mismatched across each architecture diagram. The Redis cache key pattern was also inconsistent across specs, so we had to prompt fixes for that as well.
167: 
168: ---
169: 
170: ## 3. Class Diagram
171: 
172: ```
173:                           ┌───────────────────────────┐
174:                           │    <<interface>>          │
175:                           │  CL1.1 IVisibilityToggle  │
176:                           ├───────────────────────────┤
177:                           │ + setVisibility()         │
178:                           │ + getVisibility()         │
179:                           │ + canChangeVisibility()   │
180:                           └─────────────┬─────────────┘
181:                                         │ implements
182:                           ┌─────────────▼─────────────┐
183:                           │ CL1.2 ChannelVisibility   │
184:                           │        Service            │
185:                           ├───────────────────────────┤
186:                           │ - channelRepository       │
187:                           │ - auditLogger             │
188:                           │ - eventBus                │
189:                           │ - permissionService       │
190:                           ├───────────────────────────┤
191:                           │ + setVisibility()         │
192:                           │ + getVisibility()         │
193:                           │ + canChangeVisibility()   │
194:                           │ - validateTransition()    │
195:                           │ - emitVisibilityChange()  │
196:                           └───────────┬───────────────┘
197:                                       │
198:                ┌──────────────────────┼──────────────────────┐
199:                ◇                     ◇                     ◇
200:   ┌────────────▼────────────┐ ┌───────▼──────────┐ ┌────────▼──────────┐
201:   │CL2.1 ChannelRepository  │ │CL2.2 AuditLog    │ │CL2.3 Permission   │
202:   ├─────────────────────────┤ │      Service     │ │      Service      │
203:   │ - database              │ ├──────────────────┤ ├───────────────────┤
204:   │ - cache                 │ │ + logVisibility  │ │ + canManage       │
205:   ├─────────────────────────┤ │     Change()     │ │     Channel()     │
206:   │ + findById()            │ │ + getAudit       │ │ + isServer        │
207:   │ + findBySlug()          │ │     History()    │ │     Admin()       │
208:   │ + update()              │ │ + exportAudit    │ │ + getEffective    │
209:   │ + findPublicByServerId()│ │     Log()        │ │     Permissions() │
210:   │ + getVisibility()       │ └──────────────────┘ └───────────────────┘
211:   │ + getMetadata()         │
212:   │ - invalidateCache()     │
213:   │ - getCacheKey()         │
214:   └────────────┬────────────┘
215:                ◆
216:   ┌────────────▼────────────┐
217:   │  CL3.1 Channel          │
218:   │  <<Entity>>             │
219:   ├─────────────────────────┤
220:   │ + id: UUID              │
221:   │ + serverId: UUID        │
222:   │ + name: string          │
223:   │ + slug: string          │
224:   │ + visibility: Enum      │
225:   │ + topic: string | null  │
226:   │ + position: number      │
227:   │ + indexedAt: DateTime   │
228:   │ + createdAt: DateTime   │
229:   │ + updatedAt: DateTime   │
230:   ├─────────────────────────┤
231:   │ + isPublic()            │
232:   │ + isIndexable()         │
233:   │ + setVisibility()       │
234:   └─────────────────────────┘
235: 
236:   ┌───────────────────────────┐
237:   │ CL4.1 ChannelVisibility   │
238:   │ <<Enumeration>>           │
239:   ├───────────────────────────┤
240:   │ PUBLIC_INDEXABLE          │
241:   │ PUBLIC_NO_INDEX           │
242:   │ PRIVATE                   │
243:   └───────────────────────────┘
244: 
245:   ┌─────────────────────────┐      ┌─────────────────────────┐
246:   │  CL5.1 VisibilityChange │      │  CL5.2 AuditLogEntry    │
247:   │  <<Event>>              │      │  <<Entity>>             │
248:   ├─────────────────────────┤      ├─────────────────────────┤
249:   │ + channelId: UUID       │      │ + id: UUID              │
250:   │ + oldVisibility: Enum   │      │ + channelId: UUID       │
251:   │ + newVisibility: Enum   │      │ + actorId: UUID         │
252:   │ + actorId: UUID         │      │ + action: string        │
253:   │ + timestamp: DateTime   │      │ + oldValue: JSON        │
254:   └─────────────────────────┘      │ + newValue: JSON        │
255:                                    │ + timestamp: DateTime   │
256:                                    │ + ipAddress: string     │
257:                                    └─────────────────────────┘
258: 
259:   ┌─────────────────────────┐      ┌─────────────────────────┐
260:   │  CL6.1 IndexingService  │─────►│  CL6.2 SitemapGenerator │
261:   ├─────────────────────────┤      ├─────────────────────────┤
262:   │ - sitemapGenerator      │      │ - publicChannelRepo     │
263:   │ - searchEngineNotifier  │      ├─────────────────────────┤
264:   ├─────────────────────────┤      │ + generate()            │
265:   │ + updateSitemap()       │      │ + getLastModified()     │
266:   │ + notifySearchEngines() │      └─────────────────────────┘
267:   │ + generateCanonicalUrl()│
268:   │ + getRobotsDirectives() │
269:   └─────────────────────────┘
270: ```
271: 
272: > **Sitemap Ownership:** `IndexingService` (CL6.1 / C5.2) is the canonical owner of sitemap generation and search engine notification across all Harmony specs. Other features (e.g., SEO Meta Tag Generation) emit events that this service consumes to trigger sitemap updates.
273: 
274: ### 3.1 Rationale
275: 
276: After having an LLM review this spec, the canonical owner of the sitemap generation should be the IndexingService. There was a discrepancy between this spec and the seo-meta-tag-generation spec on what would consume server updates and generate new sitemaps for external services. 
277: 
278: Significant inconsistencies existed between section 2, 3, 9, and 10, so a verification pass was necessary after the document was generated to fix them. 
279: 
280: ---
281: 
282: ## 4. List of Classes
283: 
284: ### 4.1 Client Module (M1, M2, M3)
285: 
286: | Label | Class Name | Type | Purpose |
287: |-------|------------|------|---------|
288: | CL-C1.1 | ChannelSettingsView | View Component | Channel settings page with visibility management |
289: | CL-C1.2 | VisibilityToggleComponent | UI Component | Toggle control for Public/Indexable ↔ Private with confirmation |
290: | CL-C2.1 | PublicChannelView | View Component | Public channel content for anonymous users and crawlers |
291: | CL-C2.2 | MessageListComponent | UI Component | Paginated message list with SEO-optimized markup |
292: | CL-C3.1 | ChannelService | Service | Client-side channel API calls including visibility updates |
293: | CL-C3.2 | AuthService | Service | Authentication state and permission checking |
294: 
295: ### 4.2 API Gateway Module (M4)
296: 
297: | Label | Class Name | Type | Purpose |
298: |-------|------------|------|---------|
299: | CL-C4.1 | ChannelController | Controller | Authenticated channel management API (tRPC) |
300: | CL-C4.2 | PublicAccessController | Controller | Unauthenticated public content and sitemaps (REST) |
301: 
302: ### 4.3 Business Logic Module (M5)
303: 
304: | Label | Class Name | Type | Purpose |
305: |-------|------------|------|---------|
306: | CL-C5.1 | ChannelVisibilityService | Service | Visibility state changes, validation, and event emission |
307: | CL-C5.2 | IndexingService | Service | Sitemap generation, crawler notifications (canonical owner) |
308: | CL-C5.3 | PermissionService | Service | User permission validation for channel management |
309: | CL-C5.4 | AuditLogService | Service | Audit trail for visibility changes |
310: 
311: ### 4.4 Data Access Module (M6)
312: 
313: | Label | Class Name | Type | Purpose |
314: |-------|------------|------|---------|
315: | CL-C6.1 | ChannelRepository | Repository | Channel data access with caching |
316: | CL-C6.2 | AuditLogRepository | Repository | Audit log data access |
317: 
318: ### 4.5 Data Structures (Entities/DTOs)
319: 
320: | Label | Class Name | Type | Purpose |
321: |-------|------------|------|---------|
322: | CL-D1 | Channel | Entity | Domain entity representing a channel with visibility state |
323: | CL-D2 | AuditLogEntry | Entity | Single audit log record |
324: | CL-D3 | VisibilityChangeEvent | Event | Event emitted on visibility changes |
325: | CL-D4 | ChannelVisibility | Enumeration | Possible visibility states |
326: | CL-D5 | VisibilityUpdateRequest | DTO | Request payload for visibility update |
327: | CL-D6 | VisibilityUpdateResponse | DTO | Response payload for visibility update |
328: | CL-D7 | PublicChannelDTO | DTO | Public-facing channel data (see §4.6) |
329: 
330: ### 4.6 PublicChannelDTO Fields
331: 
332: ```typescript
333: interface PublicChannelDTO {
334:   id: string;           // Channel UUID
335:   name: string;         // Display name
336:   slug: string;         // URL-safe identifier
337:   topic: string;        // Channel topic/description
338:   messageCount: number; // Total messages in channel
339:   serverSlug: string;   // Parent server's slug
340: }
341: ```
342: 
343: ### 4.7 Rationale
344: 
345: Like the previous section, I had to reprompt to fix inconsistencies. The LLM also noticed that the ChannelRepository interface/class has discrepancies across each spec, so it consolidated each of them together. The class diagrams correctly display the interactions between each class, so no update was needed there. 
346: 
347: ---
348: 
349: ## 5. State Diagrams
350: 
351: ### 5.1 System State Variables
352: 
353: | Variable | Type | Description |
354: |----------|------|-------------|
355: | channel.visibility | ChannelVisibility | Current visibility state |
356: | channel.indexedAt | DateTime | Last sitemap inclusion timestamp |
357: | sitemap.lastModified | DateTime | Last sitemap update |
358: | auditLog.entries | AuditLogEntry[] | Audit records |
359: 
360: ### 5.2 Channel Visibility State Machine
361: 
362: ```
363:                             (( S0: Channel Created ))
364:                                       │
365:                                       │ Default: visibility = PRIVATE
366:                                       ▼
367:                       ┌───────────────────────────────┐
368:                       │         S1: PRIVATE           │
369:                       │ indexedAt = null              │
370:                       │ robots = "noindex, nofollow"  │
371:                       └───────────────┬───────────────┘
372:                                       │
373:       ┌───────────────────────────────┼────────────────────────────────┐
374:       │ setVisibility(PUBLIC_NO_INDEX)│ setVisibility(PUBLIC_INDEXABLE)│
375:       ▼                               │                                ▼
376: ┌─────────────────────┐               │                ┌─────────────────────┐
377: │ S2: PUBLIC_NO_INDEX │               │                │ S3: PUBLIC_INDEXABLE│
378: │ indexedAt = null    │◄──────────────┘                │ indexedAt = now()   │
379: │ robots = "noindex"  │                                │ robots = "index,    │
380: │                     │  setVisibility                 │          follow"    │
381: │                     │  (PUBLIC_INDEXABLE)            │                     │
382: │                     ├───────────────────────────────►│                     │
383: │                     │◄───────────────────────────────┤                     │
384: │                     │  setVisibility                 │                     │
385: │                     │  (PUBLIC_NO_INDEX)             │                     │
386: └─────────┬───────────┘                                └─────────┬───────────┘
387:           │              setVisibility(PRIVATE)                  │
388:           └─────────────────────────┬────────────────────────────┘
389:                                     ▼
390:                       ┌───────────────────────────────┐
391:                       │         S1: PRIVATE           │
392:                       │ + Request removal from index  │
393:                       │ + Update sitemap              │
394:                       └───────────────────────────────┘
395: 
396: State Transition Table:
397: ┌────────────────────┬──────────────────────┬────────────────────┬──────────────────────────────┐
398: │ Current State      │ Action               │ Next State         │ Side Effects                 │
399: ├────────────────────┼──────────────────────┼────────────────────┼──────────────────────────────┤
400: │ S1: PRIVATE        │ setVis(PUB_IDX)      │ S3: PUB_INDEXABLE  │ Add to sitemap, notify bots  │
401: │ S1: PRIVATE        │ setVis(PUB_NO)       │ S2: PUB_NO_INDEX   │ None                         │
402: │ S2: PUB_NO_INDEX   │ setVis(PRIVATE)      │ S1: PRIVATE        │ None                         │
403: │ S2: PUB_NO_INDEX   │ setVis(PUB_IDX)      │ S3: PUB_INDEXABLE  │ Add to sitemap, notify bots  │
404: │ S3: PUB_INDEXABLE  │ setVis(PRIVATE)      │ S1: PRIVATE        │ Remove from sitemap, de-index │
405: │ S3: PUB_INDEXABLE  │ setVis(PUB_NO)       │ S2: PUB_NO_INDEX   │ Remove from sitemap, noindex │
406: └────────────────────┴──────────────────────┴────────────────────┴──────────────────────────────┘
407: ```
408: 
409: ### 5.3 Admin Action State Diagram
410: 
411: ```
412:                             (( A0: Admin Views Channel ))
413:                                       │
414:                                       ▼
415:                       ┌───────────────────────────────┐
416:                       │ A1: Settings Page Loaded      │
417:                       │ isLoading = false             │
418:                       └───────────────┬───────────────┘
419:                                       │ Admin clicks toggle
420:                                       ▼
421:                       ┌───────────────────────────────┐
422:                       │ A2: Confirmation Dialog       │
423:                       │ pendingVisibility = new       │
424:                       └───────────────┬───────────────┘
425:                       ┌───────────────┴───────────────┐
426:                       │ Cancel                        │ Confirm
427:                       ▼                               ▼
428:       ┌───────────────────────┐   ┌───────────────────────────────┐
429:       │ A1 (Return)           │   │ A3: Updating (isLoading=true) │
430:       └───────────────────────┘   └───────────────┬───────────────┘
431:                             ┌─────────────────────┴───────┐
432:                             │ Error                       │ Success
433:                             ▼                             ▼
434:                   ┌─────────────────────┐   ┌───────────────────────────┐
435:                   │ A4: Error State     │   │ A5: Success State         │
436:                   │ errorMessage = msg  │   │ visibility = updated      │
437:                   └─────────┬───────────┘   └─────────────┬─────────────┘
438:                             └──────────┬──────────────────┘
439:                                        │ After 3s / dismiss
440:                                        ▼
441:                       ┌───────────────────────────────┐
442:                       │ A1: Settings Page (clean)     │
443:                       └───────────────────────────────┘
444: ```
445: 
446: ### 5.4 Rationale
447: 
448: The first diagram correctly tracks the state changes for all possible channel states. No changes or reprompting the LLM was necessary for this section. The channel will be public, public & indexable, or private. A simplification of the roles-based access control in Discord, but covers the general idea. 
449: 
450: The second diagram correctly tracks the state transitions for the channel visibility permission. It is quite simple so the model did not need to the reprompted for any changes.
451: 
452: ---
453: 
454: ## 6. Flow Charts
455: 
456: ### 6.1 Scenario: Admin Sets Channel to Public/Indexable
457: 
458: Admin navigates to channel settings and toggles a private channel to publicly indexable. System validates permissions, updates DB, regenerates sitemap, and notifies search engines.
459: 
460: ```
461:     (( START: Admin opens channel settings ))
462:                         │
463:                         ▼
464:         [F1.1] Load channel data → Client.ChannelService.getChannel(channelId)
465:                         │
466:                         ▼
467:         [F1.2] Display current visibility toggle
468:                         │
469:                         ▼
470:         / Admin clicks "Make Public" toggle /
471:                         │
472:                         ▼
473:         [F1.3] Show confirmation dialog
474:                         │
475:                         ▼
476:                 < Admin confirms? >
477:                / No            Yes \
478:               ▼                     ▼
479:     [F1.5] Cancel        [F1.6] Send API request:
480:     Return to settings     updateVisibility(channelId, PUBLIC_INDEXABLE)
481:                                     │
482:                                     ▼
483:                         [F1.7] Validate JWT token
484:                                     │
485:                                     ▼
486:                             < Token valid? >
487:                            / No         Yes \
488:                           ▼                  ▼
489:                     Return 401      [F1.10] Check admin permission
490:                                              │
491:                                              ▼
492:                                     < Has permission? >
493:                                    / No             Yes \
494:                                   ▼                      ▼
495:                             Return 403      [F1.13] Update visibility in DB
496:                                                          │
497:                                                          ▼
498:                                             [F1.14] Create audit log entry
499:                                                          │
500:                                                          ▼
501:                                             [F1.15] Emit VISIBILITY_CHANGED event
502:                                                          │
503:                                                          ▼
504:                                             [F1.16] Update sitemap
505:                                                          │
506:                                                          ▼
507:                                             [F1.17] Notify search engines (async)
508:                                                          │
509:                                                          ▼
510:                                             [F1.18] Invalidate cache
511:                                                          │
512:                                                          ▼
513:                                             [F1.19] Return success with updated channel
514:                                                          │
515:                                                          ▼
516:                                             < Success response? >
517:                                            / No              Yes \
518:                                           ▼                       ▼
519:                                 [F1.22] Show error    [F1.23] Update UI toggle
520:                                                                │
521:                                                                ▼
522:                                             (( END: Channel is now public ))
523: ```
524: 
525: #### 6.1.1 Cross-Spec Integration: Visibility → PUBLIC_INDEXABLE
526: 
527: When visibility changes to `PUBLIC_INDEXABLE`:
528: 1. Emit `VISIBILITY_CHANGED` event via EventBus (Redis Pub/Sub)
529: 2. **SEO Meta Tag Generation spec** consumes event → generates meta tags for the channel
530: 3. **Guest Public Channel View spec** consumes event → warms guest view cache
531: 
532: ### 6.2 Scenario: Anonymous User Views Public Channel
533: 
534: An anonymous user or crawler requests a public channel page. System verifies visibility and serves content with appropriate SEO headers.
535: 
536: ```
537:     (( START: Request to /c/{serverSlug}/{channelSlug} ))
538:                         │
539:                         ▼
540:         [F2.1] Route to PublicAccessController
541:                         │
542:                         ▼
543:         [F2.2] Check cache: channel:{id}:visibility
544:                         │
545:                 < Cache hit? >
546:                / No         Yes \
547:               ▼                  ▼
548:     [F2.4] Query DB     [F2.5] Use cached value
549:     [F2.6] Cache result         │
550:               │                 │
551:               └────────┬────────┘
552:                        │
553:                 < Channel exists? >
554:                / No             Yes \
555:               ▼                      ▼
556:         Return 404          < Is PUBLIC_* ? >
557:                            / No          Yes \
558:                           ▼                   ▼
559:                     Return 403     [F2.11] Fetch messages
560:                                            │
561:                                            ▼
562:                                   [F2.12] Set X-Robots-Tag header
563:                                     PUBLIC_INDEXABLE → "index,follow"
564:                                     PUBLIC_NO_INDEX → "noindex"
565:                                            │
566:                                            ▼
567:                                   [F2.13] Add canonical URL + structured data
568:                                            │
569:                                            ▼
570:                                   [F2.14] Return HTML with SEO metadata
571:                                            │
572:                                            ▼
573:                             (( END: Response sent ))
574: ```
575: 
576: ### 6.3 Scenario: Admin Sets Channel to Private (De-indexing)
577: 
578: Administrator changes a public/indexable channel back to private. System removes from sitemap and requests de-indexing.
579: 
580: ```
581:     (( START: Admin clicks "Make Private" ))
582:                         │
583:                         ▼
584:         [F3.1] Show warning: "Search engines may take time to remove cached content"
585:                         │
586:                 < Admin confirms? >
587:                / No            Yes \
588:               ▼                     ▼
589:         [F3.3] Cancel    [F3.4] API: updateVisibility(PRIVATE)
590:                                     │
591:                         (Permission checks same as F1.7-F1.12)
592:                                     │
593:                                     ▼
594:                         [F3.5] Update DB: visibility=PRIVATE, indexedAt=null
595:                                     │
596:                                     ▼
597:                         [F3.6] Create audit log
598:                                     │
599:                                     ▼
600:                         [F3.7] Remove from sitemap
601:                                     │
602:                                     ▼
603:                         [F3.8] Request URL removal (Google/Bing APIs, async)
604:                                     │
605:                                     ▼
606:                         [F3.9] Invalidate CDN cache
607:                                     │
608:                                     ▼
609:                         [F3.10] Return success with de-indexing notice
610:                                     │
611:                                     ▼
612:                         (( END: Channel is private ))
613: ```
614: 
615: #### 6.3.1 Cross-Spec Integration: Visibility → PRIVATE
616: 
617: When visibility changes to `PRIVATE`:
618: 1. Emit `VISIBILITY_CHANGED` event via EventBus (Redis Pub/Sub)
619: 2. **SEO Meta Tag Generation spec** consumes event → deletes meta tags for the channel
620: 3. **Guest Public Channel View spec** consumes event → invalidates guest view cache
621: 
622: ---
623: 
624: ### 6.4 Rationale
625: 
626: The LLM had to be reprompted here to clarify which protocols (RPC vs REST) would be used for communications. This was an issue across the this whole dev spec. It was determined REST protocols would be used for public APIs and RPC for internal communications. 
627: 
628: The LLM also had to be reprompted to finalize what the event bus would be. It chose Redis Pub/Sub to allow for visibility change updates to propagate. The cache keying also needed to be updated to match earlier updates. 
629: 
630: ## 7. Development Risks and Failures
631: 
632: ### 7.1 Runtime Failures
633: 
634: | Label | Failure Mode | User-Visible Effect | Recovery Procedure | Likelihood | Impact |
635: |-------|-------------|--------------------|--------------------|------------|--------|
636: | RF-1 | API Server crash | Toggle action fails | Auto-restart; client retries | Medium | Medium |
637: | RF-2 | Lost runtime state | Stale visibility displayed | Cache invalidation on recovery | Low | Low |
638: | RF-3 | Database corruption | Incorrect visibility; privacy breach | Restore from backup; audit reconciliation | Very Low | Critical |
639: | RF-4 | Invalid state transition | Channel may become public unintentionally | Server-side transition validation | Low | High |
640: | RF-5 | RPC failure | "Network error" shown | Retry with exponential backoff; circuit breaker | Medium | Medium |
641: | RF-6 | Server overload | Slow response or timeout | Rate limiting; horizontal scaling | Medium | Medium |
642: | RF-7 | Out of RAM | Server unresponsive | Memory limits; vertical scaling | Low | High |
643: | RF-8 | Database out of space | Write operations fail | Storage alerts; archive old audit logs | Low | High |
644: 
645: ### 7.2 Connectivity Failures
646: 
647: | Label | Failure Mode | User-Visible Effect | Recovery Procedure | Likelihood | Impact |
648: |-------|-------------|--------------------|--------------------|------------|--------|
649: | CF-1 | Lost network | "Connection lost" banner | Auto-reconnect with backoff | Medium | Medium |
650: | CF-2 | Lost DB connection | API returns 503 | Connection pool health checks; failover | Low | High |
651: | CF-3 | Traffic spike | Increased latency | CDN caching; auto-scaling | Medium | Medium |
652: | CF-4 | Search engine API down | Indexing updates delayed | Queue failed notifications; retry | Medium | Low |
653: 
654: ### 7.3 Hardware Failures
655: 
656: | Label | Failure Mode | User-Visible Effect | Recovery Procedure | Likelihood | Impact |
657: |-------|-------------|--------------------|--------------------|------------|--------|
658: | HF-1 | App server down | Service unavailable | Multi-AZ deployment; LB health checks | Low | High |
659: | HF-2 | Bad config loaded | Unpredictable behavior | Config validation on startup; rollback | Low | High |
660: | HF-3 | System relocation | Temporary outage | Blue-green deployment; DNS TTL management | Very Low | Medium |
661: 
662: ### 7.4 Security Failures
663: 
664: | Label | Failure Mode | User-Visible Effect | Recovery Procedure | Likelihood | Impact |
665: |-------|-------------|--------------------|--------------------|------------|--------|
666: | IF-1 | DDoS attack | Service degradation | CloudFlare DDoS protection; rate limiting | Medium | High |
667: | IF-2 | OS compromise | Full system breach | Incident response; rebuild from clean images | Very Low | Critical |
668: | IF-3 | Code tampering | Malicious behavior | Code signing; integrity monitoring | Very Low | Critical |
669: | IF-4 | Database theft | Privacy breach | Encryption at rest; access logging | Low | Critical |
670: | IF-5 | Bot spam | Public channels flooded | CAPTCHA; rate limiting; content moderation | Medium | Medium |
671: | IF-6 | Session hijacking | Unauthorized changes | Secure cookies; session binding; anomaly detection | Low | High |
672: 
673: ### 7.5 Failure Priority Matrix
674: 
675: ```
676:                 Impact:  Low       Medium      High        Critical
677:            ┌────────────────────────────────────────────────────┐
678:   High     │           │ CF-1      │ IF-1      │                │
679:   Medium   │           │ RF-1,RF-5 │           │                │
680:            │           │ RF-6,CF-3 │           │                │
681:   Low      │ RF-2      │ HF-3      │ RF-7,RF-8 │ RF-3,IF-4      │
682:            │           │           │ CF-2,HF-1 │                │
683:            │           │           │ HF-2,IF-6 │                │
684:   Very Low │           │           │           │ IF-2,IF-3      │
685:            └────────────────────────────────────────────────────┘
686: ```
687: 
688: ### 7.6 Rationale
689: 
690: Minor reprompting was needed to standardize the rate-limiting policy. It did not affect this section, but other specs mentioned rate-limiting so it had to be added to this one as a failure. Otherwise the failure modes and resolutions make sense, and there are no obvious gaps in errors.
691: 
692: ---
693: 
694: ## 8. Technology Stack
695: 
696: | Label | Technology | Version | Purpose | Source |
697: |-------|------------|---------|---------|-------|
698: | T1 | TypeScript | 5.3+ | Primary language (client + server) | https://www.typescriptlang.org/ |
699: | T2 | React | 18.2+ | Frontend UI framework | https://react.dev/ |
700: | T3 | Next.js | 14.0+ | SSR/SSG framework (SEO-critical for public pages) | https://nextjs.org/ |
701: | T4 | Node.js | 20 LTS | Server runtime | https://nodejs.org/ |
702: | T5 | PostgreSQL | 16+ | Primary database (ACID, JSONB, enums) | https://www.postgresql.org/ |
703: | T6 | Redis | 7.2+ | Caching, session storage, EventBus (Pub/Sub) | https://redis.io/ |
704: | T7 | Prisma | 5.8+ | Type-safe ORM with migrations | https://www.prisma.io/ |
705: | T8 | tRPC | 10.45+ | End-to-end typesafe APIs (authenticated internal) | https://trpc.io/ |
706: | T9 | Zod | 3.22+ | Runtime schema validation (integrates with tRPC) | https://zod.dev/ |
707: | T10 | TailwindCSS | 3.4+ | Utility-first CSS framework | https://tailwindcss.com/ |
708: | T11 | CloudFlare | N/A | CDN and DDoS protection | https://www.cloudflare.com/ |
709: | T12 | Docker | 24+ | Containerization | https://www.docker.com/ |
710: | T13 | Google Search Console API | v1 | Programmatic indexing/de-indexing | https://developers.google.com/webmaster-tools |
711: | T14 | Bing Webmaster API | v1 | Microsoft search engine integration | https://www.bing.com/webmasters |
712: | T15 | Jest | 29+ | Unit/integration testing | https://jestjs.io/ |
713: | T16 | Playwright | 1.40+ | Cross-browser E2E testing | https://playwright.dev/ |
714: | T17 | sanitize-html | 2.12+ | XSS prevention / HTML sanitization for public-facing content (Node.js-native) | https://github.com/apostrophecms/sanitize-html |
715: 
716: > **Convention:** tRPC is used for authenticated internal APIs between client and server. Public-facing endpoints (sitemaps, public channel pages, robots.txt) use REST for maximum compatibility with crawlers and third-party consumers.
717: 
718: ### 8.1 EventBus
719: 
720: **Technology:** Redis Pub/Sub (T6)
721: 
722: Event types consumed/produced across specs:
723: 
724: | Event | Source Spec | Description |
725: |-------|-------------|-------------|
726: | `VISIBILITY_CHANGED` | Channel Visibility Toggle (this spec) | Emitted when channel visibility state changes |
727: | `MESSAGE_CREATED` | SEO Meta Tag Generation | New message in a public channel |
728: | `MESSAGE_EDITED` | SEO Meta Tag Generation | Message edited in a public channel |

(Output capped at 50 KB. Showing lines 1-728. Use offset=729 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/docs/unified-backend-architecture.md"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/docs/unified-backend-architecture.md</path>
<type>file</type>
<content>1: # Unified Backend Architecture — Harmony
2: 
3: > **Scope:** This document specifies the shared backend that powers all three P3 features—**Channel Visibility Toggle**, **Guest Public Channel View**, and **SEO Meta Tag Generation**—in a single, cohesive service layer. It is the authoritative reference for module boundaries, data models, APIs, and class ownership.
4: 
5: ---
6: 
7: ## 1. Design Rationale
8: 
9: ### 1.1 Why a Unified Backend?
10: 
11: Each feature spec was authored independently and defines its own modules, classes, and schemas. Left unmerged, the codebase would contain three competing `ChannelRepository` classes, duplicate cache logic, and inconsistent database schemas. A unified backend eliminates this redundancy while preserving each feature's domain-specific logic.
12: 
13: ### 1.2 Key Design Choices
14: 
15: | Decision | Choice | Justification |
16: |----------|--------|---------------|
17: | **Primary Language** | TypeScript 5.3+ | End-to-end type safety (client + server); single language reduces context-switching. |
18: | **Database** | PostgreSQL 16+ | ACID guarantees for visibility state transitions; native `ENUM` types for visibility; `JSONB` for flexible audit payloads; partial indexes for efficient public-channel queries. |
19: | **Cache / EventBus** | Redis 7.2+ | Sub-millisecond reads for visibility checks on every public page load; Pub/Sub for cross-module event propagation (`VISIBILITY_CHANGED`, `MESSAGE_CREATED`, etc.) without tight coupling. |
20: | **Authenticated APIs** | tRPC 11 | End-to-end type inference between Next.js client and Express server; eliminates hand-written API clients for admin operations. |
21: | **Public APIs** | REST (Express) | Search-engine crawlers, social-media link unfurlers, and external consumers require plain HTTP. tRPC's binary protocol is invisible to these consumers. |
22: | **ORM** | Prisma 5.8+ | Type-safe schema definitions; auto-generated migrations; integrates with PostgreSQL enums. |
23: | **Runtime Validation** | Zod 3.22+ | Composes with tRPC for automatic request/response validation; shared between client and server. |
24: | **SSR Framework** | Next.js 14+ | Server-side rendering is critical for SEO; server components reduce client bundle for public pages. |
25: | **HTML Sanitization** | sanitize-html 2.12+ | XSS prevention for user-generated content rendered on public pages. Node.js-native (no DOM dependency). |
26: 
27: ### 1.3 tRPC + REST Split
28: 
29: ```
30: ┌──────────────────────────────────────────────────────────────────┐
31: │                        API Surface                                │
32: ├──────────────────────┬───────────────────────────────────────────┤
33: │   tRPC (Authenticated)│         REST (Public/Unauthenticated)     │
34: │                      │                                           │
35: │  • Channel settings  │  • GET /c/{server}/{channel}  (SSR page)  │
36: │  • Visibility toggle │  • GET /api/public/channels/…  (messages) │
37: │  • Audit log queries │  • GET /api/public/servers/…   (server)   │
38: │  • Admin meta-tag    │  • GET /sitemap/{server}.xml              │
39: │    overrides         │  • GET /robots.txt                        │
40: │                      │  • GET /s/{server}  (server landing)      │
41: └──────────────────────┴───────────────────────────────────────────┘
42: ```
43: 
44: **Why the split?** Crawlers (Googlebot, Bingbot) and social-media unfurlers (Facebook, Twitter/X, Slack) make standard HTTP requests. They cannot consume tRPC. Admin operations (visibility toggling, meta-tag overrides) benefit from tRPC's type inference and are only used by authenticated Harmony clients.
45: 
46: ---
47: 
48: ## 2. System Architecture Overview
49: 
50: ### 2.1 High-Level Architecture Diagram
51: 
52: ```mermaid
53: graph TB
54:     subgraph External["External Actors"]
55:         Admin["🔑 Admin User"]
56:         Guest["👤 Guest User"]
57:         Bot["🤖 Search Engine Bot"]
58:     end
59: 
60:     subgraph Client["Client Layer — Next.js"]
61:         AdminUI["Admin Dashboard<br/>(M-CV1)"]
62:         PublicUI["Public View SSR<br/>(M-GV1)"]
63:         ClientInt["Client Interaction<br/>(M-GV2)"]
64:     end
65: 
66:     subgraph Server["Server Layer — Express + tRPC"]
67:         APIGateway["API Gateway<br/>(M-B1)"]
68:         AccessCtrl["Access Control<br/>(M-B2)"]
69:         VisBiz["Visibility Service<br/>(M-B3)"]
70:         ContentDel["Content Delivery<br/>(M-B4)"]
71:         MetaTag["Meta Tag Engine<br/>(M-B5)"]
72:         SEOIndex["SEO & Indexing<br/>(M-B6)"]
73:         BgProcess["Background Workers<br/>(M-B7)"]
74:     end
75: 
76:     subgraph Data["Data Layer"]
77:         PG[("PostgreSQL")]
78:         Redis[("Redis<br/>Cache + Pub/Sub")]
79:     end
80: 
81:     subgraph ExtSystems["External Systems"]
82:         Google["Google Search Console"]
83:         Bing["Bing Webmaster API"]
84:     end
85: 
86:     Admin -->|tRPC| AdminUI
87:     Guest -->|HTTPS| PublicUI
88:     Bot -->|HTTPS| PublicUI
89:     AdminUI -->|tRPC| APIGateway
90:     PublicUI -->|Internal| APIGateway
91:     ClientInt -->|REST| APIGateway
92:     APIGateway --> AccessCtrl
93:     APIGateway --> VisBiz
94:     APIGateway --> ContentDel
95:     APIGateway --> MetaTag
96:     AccessCtrl --> VisBiz
97:     VisBiz --> SEOIndex
98:     ContentDel --> MetaTag
99:     SEOIndex --> BgProcess
100:     VisBiz --> PG
101:     ContentDel --> PG
102:     MetaTag --> PG
103:     VisBiz --> Redis
104:     ContentDel --> Redis
105:     MetaTag --> Redis
106:     BgProcess --> Redis
107:     BgProcess --> Google
108:     BgProcess --> Bing
109:     SEOIndex --> Redis
110: ```
111: 
112: ### 2.2 Module Map
113: 
114: The unified backend organizes into **shared backend modules** (prefixed `M-B`) and **data layer modules** (prefixed `M-D`). Client-layer modules are listed for reference only; they are specified in their respective feature dev specs.
115: 
116: | Module ID | Name | Layer | Feature Owner | Purpose |
117: |-----------|------|-------|---------------|---------|
118: | *M-CV1* | *Admin Dashboard* | *Client* | *Channel Visibility Toggle* | *Specified in [channel visibility spec](./dev-spec-channel-visibility-toggle.md)* |
119: | *M-CV2* | *Public Channel Viewer* | *Client* | *Channel Visibility Toggle* | *Specified in [channel visibility spec](./dev-spec-channel-visibility-toggle.md)* |
120: | *M-GV1* | *Public View (SSR)* | *Client* | *Guest Public Channel View* | *Specified in [guest public channel spec](./dev-spec-guest-public-channel-view.md)* |
121: | *M-GV2* | *Client Interaction* | *Client* | *Guest Public Channel View* | *Specified in [guest public channel spec](./dev-spec-guest-public-channel-view.md)* |
122: | M-B1 | API Gateway | Server | Shared | tRPC router (authenticated) + REST controllers (public) |
123: | M-B2 | Access Control | Server | Shared | Visibility guard, content filter, rate limiter, anonymous sessions |
124: | M-B3 | Visibility Management | Server | Channel Visibility Toggle | Visibility state machine, permission checks, audit logging |
125: | M-B4 | Content Delivery | Server | Guest Public Channel View | Message retrieval, author privacy, attachment processing |
126: | M-B5 | Meta Tag Engine | Server | SEO Meta Tag Generation | Meta tag generation, content analysis, OpenGraph, structured data |
127: | M-B6 | SEO & Indexing | Server | Shared | Sitemap generation, search engine notifications, canonical URLs, robots directives |
128: | M-B7 | Background Workers | Server | Shared | Async workers for meta-tag regeneration, sitemap rebuilds, search engine pings (Redis Pub/Sub driven) |
129: | M-D1 | Data Access | Data | Shared | Repositories (Channel, Message, Server, User, Attachment, AuditLog, MetaTag) |
130: | M-D2 | Persistence | Data | Shared | PostgreSQL schemas (all tables) |
131: | M-D3 | Cache | Data | Shared | Redis cache schemas and Pub/Sub event channels |
132: 
133: ---
134: 
135: ## 3. Unified Class Hierarchy
136: 
137: ### 3.1 Core Entities
138: 
139: ```mermaid
140: classDiagram
141:     class Server {
142:         <<entity>>
143:         +id: UUID
144:         +name: string
145:         +slug: string
146:         +description: string?
147:         +iconUrl: string?
148:         +isPublic: boolean
149:         +memberCount: number
150:         +createdAt: DateTime
151:     }
152: 
153:     class Channel {
154:         <<entity>>
155:         +id: UUID
156:         +serverId: UUID
157:         +name: string
158:         +slug: string
159:         +type: ChannelType
160:         +visibility: ChannelVisibility
161:         +topic: string?
162:         +position: number
163:         +indexedAt: DateTime?
164:         +createdAt: DateTime
165:         +updatedAt: DateTime
166:     }
167: 
168:     class Message {
169:         <<entity>>
170:         +id: UUID
171:         +channelId: UUID
172:         +authorId: UUID
173:         +content: string
174:         +createdAt: DateTime
175:         +editedAt: DateTime?
176:         +isDeleted: boolean
177:     }
178: 
179:     class User {
180:         <<entity>>
181:         +id: UUID
182:         +username: string
183:         +displayName: string
184:         +avatarUrl: string?
185:         +publicProfile: boolean
186:         +createdAt: DateTime
187:     }
188: 
189:     class Attachment {
190:         <<entity>>
191:         +id: UUID
192:         +messageId: UUID
193:         +filename: string
194:         +url: string
195:         +contentType: string
196:         +sizeBytes: number
197:     }
198: 
199:     class AuditLogEntry {
200:         <<entity>>
201:         +id: UUID
202:         +channelId: UUID
203:         +actorId: UUID
204:         +action: string
205:         +oldValue: JSON
206:         +newValue: JSON
207:         +timestamp: DateTime
208:         +ipAddress: string
209:         +userAgent: string
210:     }
211: 
212:     class GeneratedMetaTags {
213:         <<entity>>
214:         +id: UUID
215:         +channelId: UUID
216:         +title: string
217:         +description: string
218:         +ogTitle: string
219:         +ogDescription: string
220:         +ogImage: string?
221:         +twitterCard: string
222:         +keywords: string[]
223:         +structuredData: JSON
224:         %% keywords is stored as JSON text in PostgreSQL
225:         +contentHash: string
226:         +needsRegeneration: boolean
227:         +generatedAt: DateTime
228:         +schemaVersion: number
229:     }
230: 
231:     Server "1" --> "*" Channel
232:     Channel "1" --> "*" Message
233:     Message "*" --> "1" User
234:     Message "1" --> "*" Attachment
235:     Channel "1" --> "*" AuditLogEntry
236:     Channel "1" --> "0..1" GeneratedMetaTags
237: ```
238: 
239: > **Entity methods note:** `isPublic()` and `isIndexable()` are logical helpers shown in older diagrams. Because Prisma returns plain data objects, these **must not** be implemented as class methods on the entity. Implement them as utility functions in the service layer (e.g., `isPublicChannel(channel: Channel): boolean` in `visibility.service.ts`).
240: 
241: ### 3.2 Interfaces, Enums & Events
242: 
243: ```mermaid
244: classDiagram
245:     class IVisibilityToggle {
246:         <<interface>>
247:         +setVisibility(channelId, visibility, actorId, ip) VisibilityChangeResult
248:         +getVisibility(channelId) ChannelVisibility
249:         +canChangeVisibility(channelId, actorId) boolean
250:     }
251: 
252:     class IMetaTagGenerator {
253:         <<interface>>
254:         +generate(channelId) MetaTagSet
255:         +validate(tags) ValidationResult
256:     }
257: 
258:     class ChannelType {
259:         <<enumeration>>
260:         TEXT
261:         VOICE
262:         ANNOUNCEMENT
263:     }
264: 
265:     class ChannelVisibility {
266:         <<enumeration>>
267:         PUBLIC_INDEXABLE
268:         PUBLIC_NO_INDEX
269:         PRIVATE
270:     }
271: 
272:     class VisibilityChangeEvent {
273:         <<event>>
274:         +channelId: UUID
275:         +oldVisibility: ChannelVisibility
276:         +newVisibility: ChannelVisibility
277:         +actorId: UUID
278:         +timestamp: DateTime
279:     }
280: 
281:     VisibilityChangeEvent --> ChannelVisibility
282: ```
283: 
284: ### 3.3 Data Transfer Objects (DTOs)
285: 
286: ```mermaid
287: classDiagram
288:     class PublicChannelDTO {
289:         <<DTO>>
290:         +id: string
291:         +name: string
292:         +slug: string
293:         +topic: string
294:         +messageCount: number
295:         +serverSlug: string
296:     }
297: 
298:     class PublicMessageDTO {
299:         <<DTO>>
300:         +id: string
301:         +content: string
302:         +author: PublicAuthorDTO
303:         +createdAt: string
304:         +editedAt: string?
305:         +attachments: PublicAttachmentDTO[]
306:     }
307: 
308:     class PublicAuthorDTO {
309:         <<DTO>>
310:         +displayName: string
311:         +avatarUrl: string?
312:     }
313: 
314:     class PublicServerDTO {
315:         <<DTO>>
316:         +name: string
317:         +slug: string
318:         +description: string?
319:         +iconUrl: string?
320:         +memberCount: number
321:         +publicChannelCount: number
322:     }
323: 
324:     class PublicAttachmentDTO {
325:         <<DTO>>
326:         +id: string
327:         +filename: string
328:         +url: string
329:         +contentType: string
330:         +sizeBytes: number
331:     }
332: 
333:     class OpenGraphTags {
334:         <<DTO>>
335:         +type: string
336:         +title: string
337:         +description: string
338:         +image: string?
339:         +url: string
340:     }
341: 
342:     class TwitterCardTags {
343:         <<DTO>>
344:         +card: string
345:         +title: string
346:         +description: string
347:         +image: string?
348:     }
349: 
350:     class MetaTagSet {
351:         <<DTO>>
352:         +title: string
353:         +description: string
354:         +ogTags: OpenGraphTags
355:         +twitterCard: TwitterCardTags
356:         +structuredData: JSON
357:         +canonicalUrl: string
358:         +robots: string
359:     }
360: 
361:     class VisibilityUpdateRequest {
362:         <<DTO>>
363:         +visibility: ChannelVisibility
364:     }
365: 
366:     class VisibilityUpdateResponse {
367:         <<DTO>>
368:         +success: boolean
369:         +channel: PublicChannelDTO
370:         +previousVisibility: ChannelVisibility
371:         +indexingStatus: string
372:     }
373: 
374:     PublicMessageDTO --> PublicAuthorDTO
375:     PublicMessageDTO --> PublicAttachmentDTO
376:     MetaTagSet --> OpenGraphTags
377:     MetaTagSet --> TwitterCardTags
378:     VisibilityUpdateResponse --> PublicChannelDTO
379: ```
380: 
381: ### 3.3b Response & Page Types
382: 
383: ```mermaid
384: classDiagram
385:     class ChannelSettingsResponse {
386:         <<DTO>>
387:         +channelId: string
388:         +visibility: ChannelVisibility
389:         +canChangeVisibility: boolean
390:         +lastModified: string
391:     }
392: 
393:     class AuditLogResponse {
394:         <<DTO>>
395:         +entries: AuditLogEntry[]
396:         +total: number
397:         +page: number
398:         +hasMore: boolean
399:     }
400: 
401:     class PublicChannelPage {
402:         <<DTO>>
403:         +channel: PublicChannelDTO
404:         +server: PublicServerDTO
405:         +messages: PublicMessageDTO[]
406:         +metaTags: MetaTagSet
407:         +pagination: PaginationInfo
408:     }
409: 
410:     class PublicMessagesResponse {
411:         <<DTO>>
412:         +messages: PublicMessageDTO[]
413:         +page: number
414:         +hasMore: boolean
415:         +total: number
416:     }
417: 
418:     class ServerLandingPage {
419:         <<DTO>>
420:         +server: PublicServerDTO
421:         +channels: PublicChannelDTO[]
422:         +metaTags: MetaTagSet
423:     }
424: 
425:     class SitemapXML {
426:         <<DTO>>
427:         +xml: string
428:         +lastModified: DateTime
429:     }
430: 
431:     class RobotsTxt {
432:         <<DTO>>
433:         +content: string
434:     }
435: ```
436: 
437: ### 3.3c Internal Result Types
438: 
439: These types are returned by services and repositories. They are not exposed over the API.
440: 
441: | Type | Fields | Returned By |
442: |------|--------|-------------|
443: | `VisibilityChangeResult` | `success: boolean`, `channelId: UUID`, `oldVisibility: ChannelVisibility`, `newVisibility: ChannelVisibility`, `auditLogId: UUID` | `ChannelVisibilityService.setVisibility()` |
444: | `ValidationResult` | `valid: boolean`, `errors: string[]` | `ChannelVisibilityService.validateTransition()`, `IMetaTagGenerator.validate()` |
445: | `PermissionSet` | `canManageChannel: boolean`, `canChangeVisibility: boolean`, `isServerAdmin: boolean`, `permissions: string[]` | `PermissionService.getEffectivePermissions()` |
446: | `ContentAnalysis` | `keywords: string[]`, `topics: string[]`, `summary: string`, `category: string` | `ContentAnalyzer.analyzeThread()` |
447: | `NotificationResult` | `success: boolean`, `provider: string`, `timestamp: DateTime`, `error: string?` | `IndexingService.notifySearchEngines()` |
448: | `RobotsDirectives` | `index: boolean`, `follow: boolean`, `robotsTag: string` | `IndexingService.getRobotsDirectives()` |
449: | `ChannelMetadata` | `messageCount: number`, `lastActivity: DateTime`, `activeUsers: number` | `ChannelRepository.getMetadata()` |
450: | `PaginationInfo` | `page: number`, `limit: number`, `total: number`, `hasMore: boolean` | Used in page response types |
451: | `GuestSession` | `sessionId: string`, `preferences: { theme?: string, locale?: string }`, `createdAt: DateTime`, `expiresAt: DateTime` | `AnonymousSessionManager.getSession()` |
452: 
453: ### 3.4 API Controllers (M-B1)
454: 
455: ```mermaid
456: classDiagram
457:     class ChannelController {
458:         +getChannelBySlug(serverSlug, channelSlug, ctx) ChannelSettingsResponse
459:         +getChannelSettings(channelId, ctx) ChannelSettingsResponse
460:         +updateChannelVisibility(channelId, body, ctx) VisibilityUpdateResponse
461:         +getVisibilityAuditLog(channelId, query, ctx) AuditLogResponse
462:         -validateAdminAccess(userId, channelId) boolean
463:     }
464: 
465:     class PublicChannelController {
466:         +getPublicChannelPage(serverSlug, channelSlug) PublicChannelPage
467:         +getPublicMessages(channelId, query) PublicMessagesResponse
468:         +getPublicMessage(channelId, messageId) PublicMessageDTO
469:     }
470: 
471:     class PublicServerController {
472:         +getPublicServerInfo(serverSlug) PublicServerDTO
473:         +getPublicChannelList(serverSlug) PublicChannelDTO[]
474:         +getServerLandingPage(serverSlug) ServerLandingPage
475:     }
476: 
477:     class SEOController {
478:         +getServerSitemap(serverSlug) SitemapXML
479:         +getRobotsTxt() RobotsTxt
480:     }
481: 
482:     ChannelController ..> ChannelVisibilityService : uses
483:     ChannelController ..> PermissionService : uses
484:     ChannelController ..> ChannelRepository : uses
485:     PublicChannelController ..> VisibilityGuard : uses
486:     PublicChannelController ..> MessageService : uses
487:     PublicChannelController ..> SEOService : uses
488:     PublicServerController ..> ServerRepository : uses
489:     SEOController ..> IndexingService : uses
490: 
491:     class ChannelVisibilityService { }
492:     class PermissionService { }
493:     class VisibilityGuard { }
494:     class MessageService { }
495:     class SEOService { }
496:     class ServerRepository { }
497:     class ChannelRepository { }
498:     class IndexingService { }
499: ```
500: 
501: ### 3.5 Visibility & Access Control (M-B2, M-B3)
502: 
503: ```mermaid
504: classDiagram
505:     class ChannelVisibilityService {
506:         -channelRepository: ChannelRepository
507:         -auditLogger: AuditLogService
508:         -eventBus: EventBus
509:         -permissionService: PermissionService
510:         +setVisibility() VisibilityChangeResult
511:         +getVisibility() ChannelVisibility
512:         +canChangeVisibility() boolean
513:         -validateTransition() ValidationResult
514:         -emitVisibilityChange() void
515:     }
516: 
517:     class PermissionService {
518:         +canManageChannel(userId, channelId) boolean
519:         +isServerAdmin(userId, serverId) boolean
520:         +getEffectivePermissions(userId, channelId) PermissionSet
521:     }
522: 
523:     class AuditLogService {
524:         +logVisibilityChange(entry) void
525:         +getAuditHistory(channelId, options) AuditLogEntry[]
526:         +exportAuditLog(channelId, format) Buffer
527:     }
528: 
529:     class VisibilityGuard {
530:         -channelRepository: ChannelRepository
531:         -cacheService: CacheClient
532:         +isChannelPublic(channelId) boolean
533:         +isServerPublic(serverId) boolean
534:         +getVisibilityStatus(channelId) ChannelVisibility
535:     }
536: 
537:     class ContentFilter {
538:         -sensitivePatterns: RegExp[]
539:         +filterSensitiveContent(content) string
540:         +redactUserMentions(content) string
541:         +sanitizeForDisplay(html) string
542:         +sanitizeAttachments(attachments) Attachment[]
543:     }
544: 
545:     class RateLimiter {
546:         -windowMs: number
547:         -maxRequests: number
548:         +checkLimit(key) boolean
549:         +incrementCounter(key) void
550:         +isRateLimited(key) boolean
551:     }
552: 
553:     class AnonymousSessionManager {
554:         -sessionStore: CacheClient
555:         +createSession() string
556:         +getSession(sessionId) GuestSession
557:         +updatePreferences(sessionId, prefs) void
558:         +cleanupExpired() void
559:     }
560: 
561:     IVisibilityToggle <|.. ChannelVisibilityService
562:     ChannelVisibilityService --> PermissionService
563:     ChannelVisibilityService --> AuditLogService
564:     ChannelVisibilityService --> ChannelRepository
565:     AuditLogService --> AuditLogRepository
566:     VisibilityGuard --> ChannelRepository
567: 
568:     class IVisibilityToggle { }
569:     class ChannelRepository { }
570:     class AuditLogRepository { }
571: ```
572: 
573: ### 3.6 Content, Meta Tags & SEO (M-B4, M-B5, M-B6)
574: 
575: ```mermaid
576: classDiagram
577:     class MessageService {
578:         -messageRepository: MessageRepository
579:         -contentFilter: ContentFilter
580:         +getMessagesForPublicView(channelId, page) PublicMessageDTO[]
581:         +getMessageById(messageId) PublicMessageDTO
582:         +buildMessageDTO(message) PublicMessageDTO
583:     }
584: 
585:     class AuthorService {
586:         -userRepository: UserRepository
587:         +getPublicAuthorInfo(userId) PublicAuthorDTO
588:         +anonymizeAuthor(user) PublicAuthorDTO
589:         +getDisplayName(user) string
590:     }
591: 
592:     class AttachmentService {
593:         -storageClient: StorageClient
594:         +getPublicAttachmentUrl(attachmentId) string
595:         +generateThumbnail(attachment) string
596:         +isAttachmentPublic(attachment) boolean
597:     }
598: 
599:     class MetaTagService {
600:         +generateMetaTags(channelId) MetaTagSet
601:         +getOrGenerateCached(channelId) MetaTagSet
602:         +invalidateCache(channelId) void
603:         +scheduleRegeneration(channelId) void
604:     }
605: 
606:     class ContentAnalyzer {
607:         +analyzeThread(channelId) ContentAnalysis
608:         +getTopicCategory(messages) string
609:     }
610: 
611:     class IndexingService {
612:         -sitemapGenerator: SitemapGenerator
613:         +updateSitemap(serverId) void
614:         +notifySearchEngines(url, action) NotificationResult
615:         +generateCanonicalUrl(serverId, channelId) string
616:         +getRobotsDirectives(visibility) RobotsDirectives
617:     }
618: 
619:     class SitemapGenerator {
620:         -publicChannelRepo: ChannelRepository
621:         +generate(serverId) SitemapXML
622:         +getLastModified(serverId) DateTime
623:     }
624: 
625:     class SEOService {
626:         +generatePageTitle(channel, server) string
627:         +generateDescription(channel, messages) string
628:         +generateStructuredData(channel, messages) JSON
629:         +generateBreadcrumbs(server, channel) JSON
630:         +getCanonicalUrl(server, channel) string
631:     }
632: 
633:     IMetaTagGenerator <|.. MetaTagService
634:     MessageService --> ContentFilter
635:     MetaTagService --> ContentAnalyzer
636:     MetaTagService --> MetaTagRepository
637:     MetaTagService --> ChannelRepository
638:     IndexingService --> SitemapGenerator
639:     SitemapGenerator --> ChannelRepository
640:     AuthorService --> UserRepository
641:     SEOService --> ChannelRepository
642:     SEOService --> MessageRepository
643: 
644:     class IMetaTagGenerator { }
645:     class ContentFilter { }
646:     class MetaTagRepository { }
647:     class ChannelRepository { }
648:     class UserRepository { }
649:     class MessageRepository { }
650: ```
651: 
652: ### 3.7 Repositories (M-D1)
653: 
654: ```mermaid
655: classDiagram
656:     class ChannelRepository {
657:         +findById(channelId) Channel
658:         +findBySlug(serverSlug, channelSlug) Channel
659:         +update(channelId, data) Channel
660:         +findPublicByServerId(serverId) Channel[]
661:         +getVisibility(channelId) ChannelVisibility
662:         +getMetadata(channelId) ChannelMetadata
663:         -invalidateCache(channelId) void
664:         -getCacheKey(channelId) string
665:     }
666: 
667:     class MessageRepository {
668:         +findByChannelPaginated(channelId, page, limit) Message[]
669:         +findById(messageId) Message
670:         +countByChannel(channelId) number
671:     }
672: 
673:     class ServerRepository {
674:         +findBySlug(slug) Server
675:         +getPublicInfo(serverId) Server
676:     }
677: 
678:     class UserRepository {
679:         +findById(userId) User
680:         +getPublicProfile(userId) User
681:     }
682: 
683:     class AuditLogRepository {
684:         +create(entry) AuditLogEntry
685:         +findByChannelId(channelId, options) AuditLogEntry[]
686:         +findByDateRange(start, end) AuditLogEntry[]
687:     }
688: 
689:     class MetaTagRepository {
690:         +findByChannelId(channelId) GeneratedMetaTags
691:         +upsert(channelId, tags) GeneratedMetaTags
692:         +markForRegeneration(channelId) void
693:     }
694: ```
695: 
696: > **Entity-to-DTO mapping:** Repositories always return domain entities (e.g. `Server`, `Channel`). The responsibility for mapping to public DTOs (e.g. `Server → PublicServerDTO`) belongs to the **controller layer**. No repository method should return a DTO directly.
697: 
698: ### 3.8 Relationship Legend
699: 
700: | Symbol | Meaning |
701: |--------|---------|
702: | `<\|..` | Implements interface |
703: | `-->` | Depends on / uses |
704: | `"1" --> "*"` | One-to-many entity relationship |
705: | `"1" --> "0..1"` | One-to-zero-or-one entity relationship |
706: 
707: ---
708: 
709: ## 4. Unified Data Model
710: 
711: ### 4.1 Database Schema (PostgreSQL)
712: 
713: ```mermaid
714: erDiagram
715:     servers ||--o{ channels : "has"
716:     channels ||--o{ messages : "contains"
717:     channels ||--o{ visibility_audit_log : "tracks"
718:     channels ||--o| generated_meta_tags : "has"
719:     messages }o--|| users : "authored by"
720:     messages ||--o{ attachments : "has"
721: 
722:     servers {
723:         UUID id PK
724:         VARCHAR_100 name
725:         VARCHAR_100 slug UK
726:         TEXT description
727:         VARCHAR_500 icon_url
728:         BOOLEAN is_public
729:         INTEGER member_count
730:         TIMESTAMPTZ created_at
731:     }
732: 
733:     channels {
734:         UUID id PK
735:         UUID server_id FK
736:         VARCHAR_100 name
737:         VARCHAR_100 slug
738:         channel_type_enum channel_type
739:         visibility_enum visibility
740:         TEXT topic
741:         INTEGER position
742:         TIMESTAMPTZ indexed_at
743:         TIMESTAMPTZ created_at
744:         TIMESTAMPTZ updated_at
745:     }
746: 
747:     messages {
748:         UUID id PK
749:         UUID channel_id FK
750:         UUID author_id FK
751:         TEXT content
752:         TIMESTAMPTZ created_at
753:         TIMESTAMPTZ edited_at
754:         BOOLEAN is_deleted
755:     }
756: 
757:     users {
758:         UUID id PK
759:         VARCHAR_32 username
760:         VARCHAR_100 display_name
761:         VARCHAR_500 avatar_url
762:         BOOLEAN public_profile
763:         TIMESTAMPTZ created_at
764:     }
765: 
766:     attachments {
767:         UUID id PK
768:         UUID message_id FK
769:         VARCHAR_255 filename
770:         VARCHAR_500 url
771:         VARCHAR_100 content_type
772:         BIGINT size_bytes
773:     }
774: 
775:     visibility_audit_log {
776:         UUID id PK
777:         UUID channel_id FK
778:         UUID actor_id FK
779:         VARCHAR_50 action
780:         JSONB old_value
781:         JSONB new_value
782:         TIMESTAMPTZ timestamp
783:         INET ip_address
784:         VARCHAR_500 user_agent
785:     }
786: 
787:     generated_meta_tags {
788:         UUID id PK
789:         UUID channel_id FK
790:         VARCHAR_120 title
791:         VARCHAR_320 description
792:         VARCHAR_120 og_title
793:         VARCHAR_320 og_description
794:         VARCHAR_500 og_image
795:         VARCHAR_20 twitter_card
796:         TEXT keywords
797:         JSONB structured_data
798:         VARCHAR_64 content_hash
799:         BOOLEAN needs_regeneration
800:         TIMESTAMPTZ generated_at
801:         INTEGER schema_version
802:     }
803: ```
804: 
805: ### 4.2 Enum Definition
806: 
807: ```sql
808: CREATE TYPE visibility_enum AS ENUM ('PUBLIC_INDEXABLE', 'PUBLIC_NO_INDEX', 'PRIVATE');
809: CREATE TYPE channel_type_enum AS ENUM ('TEXT', 'VOICE', 'ANNOUNCEMENT');
810: ```
811: 
812: ### 4.3 Index Strategy (Canonical Set)
813: 
814: All indexes below are the **authoritative, merged** set across all three feature specs:
815: 
816: ```sql
817: -- Channels
818: CREATE INDEX idx_channels_server_visibility ON channels(server_id, visibility);
819: CREATE UNIQUE INDEX idx_channels_server_slug ON channels(server_id, slug);
820: CREATE INDEX idx_channels_visibility_indexed ON channels(visibility, indexed_at)
821:   WHERE visibility = 'PUBLIC_INDEXABLE';
822: CREATE INDEX idx_channels_visibility ON channels(visibility)
823:   WHERE visibility IN ('PUBLIC_INDEXABLE', 'PUBLIC_NO_INDEX');
824: 
825: -- Messages
826: CREATE INDEX idx_messages_channel_time ON messages(channel_id, created_at DESC);
827: CREATE INDEX idx_messages_channel_not_deleted ON messages(channel_id, created_at DESC)
828:   WHERE is_deleted = FALSE;
829: 
830: -- Visibility Audit Log
831: CREATE INDEX idx_audit_channel_time ON visibility_audit_log(channel_id, timestamp DESC);
832: CREATE INDEX idx_audit_actor ON visibility_audit_log(actor_id, timestamp DESC);
833: 
834: -- Servers
835: CREATE UNIQUE INDEX idx_servers_slug ON servers(slug);
836: CREATE INDEX idx_servers_public ON servers(is_public) WHERE is_public = TRUE;
837: 
838: -- Generated Meta Tags
839: CREATE UNIQUE INDEX idx_meta_tags_channel ON generated_meta_tags(channel_id);
840: CREATE INDEX idx_meta_tags_needs_regen ON generated_meta_tags(needs_regeneration)
841:   WHERE needs_regeneration = TRUE;
842: ```
843: 
844: ### 4.4 Cache Schemas (Redis)
845: 
846: | Key Pattern | Value Type | TTL | Owner Module | Invalidation Trigger |
847: |-------------|-----------|-----|--------------|---------------------|
848: | `channel:{channelId}:visibility` | String (enum) | 3600s | M-B3 | `VISIBILITY_CHANGED` event |
849: | `server:{serverId}:public_channels` | JSON (channel ID array) | 300s | M-B4 | `VISIBILITY_CHANGED` event |
850: | `channel:msgs:{channelId}:page:{pageNum}` | JSON (PublicMessageDTO[]) | 60s | M-B4 | `MESSAGE_CREATED/EDITED/DELETED` |
851: | `server:{serverId}:info` | JSON (PublicServerDTO) | 300s | M-B4 | Server update |
852: | `guest:session:{sessionId}` | JSON (preferences) | 86400s | M-B2 | Session expiry |
853: | `meta:channel:{channelId}` | JSON (MetaTagSet) | 3600s | M-B5 | `VISIBILITY_CHANGED`, `MESSAGE_*` |
854: | `analysis:channel:{channelId}` | JSON (ContentAnalysis) | 1800s | M-B5 | `MESSAGE_*` events |
855: 
856: ### 4.5 Event Bus (Redis Pub/Sub)
857: 
858: ```mermaid
859: graph LR
860:     subgraph Producers
861:         CVS["ChannelVisibilityService<br/>(M-B3)"]
862:         MsgSvc["Message System<br/>(future)"]
863:     end
864: 
865:     subgraph EventBus["Redis Pub/Sub"]
866:         VC["VISIBILITY_CHANGED"]
867:         MC["MESSAGE_CREATED"]
868:         ME["MESSAGE_EDITED"]
869:         MD["MESSAGE_DELETED"]
870:         MTU["META_TAGS_UPDATED"]
871:     end
872: 
873:     subgraph Consumers
874:         IdxSvc["IndexingService<br/>(M-B6)"]
875:         MetaSvc["MetaTagService<br/>(M-B5)"]
876:         CacheMgr["Cache Invalidator<br/>(M-D3)"]
877:         BgWorker["Event-Driven Workers<br/>(M-B7)"]
878:     end
879: 
880:     CVS --> VC
881:     MsgSvc --> MC
882:     MsgSvc --> ME
883:     MsgSvc --> MD
884:     MetaSvc --> MTU
885: 
886:     VC --> IdxSvc
887:     VC --> MetaSvc
888:     VC --> CacheMgr
889:     MC --> MetaSvc
890:     MC --> CacheMgr
891:     ME --> MetaSvc
892:     ME --> CacheMgr
893:     MD --> MetaSvc
894:     MD --> CacheMgr
895:     MTU --> BgWorker
896: ```
897: 
898: | Event | Payload | Producer | Consumers |
899: |-------|---------|----------|-----------|
900: | `VISIBILITY_CHANGED` | `{ channelId, oldVisibility, newVisibility, actorId, timestamp }` | ChannelVisibilityService (M-B3) | IndexingService (M-B6), MetaTagService (M-B5), Cache Invalidator (M-D3) |
901: | `MESSAGE_CREATED` | `{ messageId, channelId, authorId, timestamp }` | Message System | MetaTagService (M-B5), Cache Invalidator (M-D3) |
902: | `MESSAGE_EDITED` | `{ messageId, channelId, timestamp }` | Message System | MetaTagService (M-B5), Cache Invalidator (M-D3) |
903: | `MESSAGE_DELETED` | `{ messageId, channelId, timestamp }` | Message System | MetaTagService (M-B5), Cache Invalidator (M-D3) |
904: | `META_TAGS_UPDATED` | `{ channelId, version, timestamp }` | MetaTagService (M-B5) | Background Workers (M-B7) for sitemap update |
905: 
906: ---
907: 
908: ## 5. Unified API Surface
909: 
910: ### 5.1 Authenticated APIs (tRPC)
911: 
912: All tRPC procedures are mounted under `/trpc` and require a valid session.
913: 
914: #### tRPC Context
915: 
916: Every tRPC procedure receives a typed `TRPCContext` injected by `createContext` in `src/trpc/init.ts`:
917: 
918: ```typescript
919: // src/trpc/init.ts
920: export interface TRPCContext {
921:   userId: string | null;   // null for unauthenticated requests
922:   ip: string;              // client IP for audit logging
923: }
924: 
925: // Context is populated from the Express session (or JWT middleware) at request time:
926: export function createContext({ req }: { req: Request }): TRPCContext {
927:   const session = (req as Request & { session?: { userId?: string } }).session;
928:   return { userId: session?.userId ?? null, ip: req.ip ?? '' };
929: }
930: ```
931: 
932: `createContext` is passed to `createExpressMiddleware` in `src/app.ts` so every procedure
933: receives a populated context automatically.
934: 
935: #### Procedure base types
936: 
937: | Base | Guard | Usage |
938: |------|-------|-------|
939: | `publicProcedure` | none | Health checks, unauthenticated queries |
940: | `authedProcedure` | throws `UNAUTHORIZED` if `ctx.userId` is null | All admin/visibility/meta-tag procedures |
941: 
942: `authedProcedure` narrows `ctx.userId` to `string` (non-null) for downstream handlers, so
943: `PermissionService.isServerAdmin(ctx.userId, channelId)` and `AuditLogService` can safely
944: read `ctx.userId` and `ctx.ip` without additional null checks.
945: 
946: ```mermaid
947: graph LR
948:     subgraph tRPC["tRPC Router (/trpc)"]
949:         direction TB
950:         CB["channel.getBySlug"]
951:         CS["channel.getSettings"]
952:         CV["channel.updateVisibility"]
953:         CA["channel.getAuditLog"]
954:         MG["admin.getMetaTags"]
955:         MU["admin.updateMetaTags"]
956:         MR["admin.regenerateMetaTags"]
957:     end
958: 
959:     AdminClient["Admin Client<br/>(Next.js)"] --> tRPC
960: ```
961: 
962: | Procedure | Input | Output | Feature |
963: |-----------|-------|--------|---------|
964: | `channel.getBySlug` | `{ serverSlug: string, channelSlug: string }` | `ChannelSettingsResponse` | Channel Visibility Toggle |
965: | `channel.getSettings` | `{ channelId: UUID }` | `ChannelSettingsResponse` | Channel Visibility Toggle |
966: | `channel.updateVisibility` | `{ channelId: UUID, visibility: ChannelVisibility }` | `VisibilityUpdateResponse` | Channel Visibility Toggle |
967: | `channel.getAuditLog` | `{ channelId: UUID, limit?, offset?, startDate? }` | `AuditLogResponse` | Channel Visibility Toggle |
968: | `admin.getMetaTags` | `{ channelId: UUID }` | `MetaTagSet` | SEO Meta Tag Generation |
969: | `admin.updateMetaTags` | `{ channelId: UUID, overrides: Partial<MetaTagSet> }` | `MetaTagSet` | SEO Meta Tag Generation |
970: | `admin.regenerateMetaTags` | `{ channelId: UUID }` | `{ jobId: string }` | SEO Meta Tag Generation |
971: 
972: > **Channel identity note:** The `VisibilityToggle` frontend component receives `serverSlug` + `channelSlug` from the URL. The settings page calls `channel.getBySlug({ serverSlug, channelSlug })` which returns `ChannelSettingsResponse` (including `channelId: UUID`). The settings page then passes that UUID as a prop to `VisibilityToggle`. All subsequent operations (`channel.updateVisibility`, `channel.getAuditLog`) use the UUID directly. The slug→UUID resolution happens exactly once at settings-page load.
973: 
974: ### 5.2 Public APIs (REST)
975: 
976: All REST endpoints are unauthenticated. Rate limiting applies.
977: 
978: > **Cache TTL column:** values refer to `Cache-Control: public, max-age=N` HTTP response headers sent by the backend, instructing any downstream HTTP cache (browser, proxy) how long to cache the response. Redis caches page data separately with the same TTL; see §4.4.
979: 
980: | Method | Path | Handler | Feature | Cache TTL |
981: |--------|------|---------|---------|-----------|
982: | GET | `/c/{serverSlug}/{channelSlug}` | `PublicChannelController.getPublicChannelPage` | Guest Public Channel View | 60s |
983: | GET | `/api/public/channels/{channelId}/messages` | `PublicChannelController.getPublicMessages` | Guest Public Channel View | 60s |
984: | GET | `/api/public/channels/{channelId}/messages/{messageId}` | `PublicChannelController.getPublicMessage` | Guest Public Channel View | 60s |
985: | GET | `/api/public/servers/{serverSlug}` | `PublicServerController.getPublicServerInfo` | Guest Public Channel View | 300s |
986: | GET | `/api/public/servers/{serverSlug}/channels` | `PublicServerController.getPublicChannelList` | Guest Public Channel View | 300s |
987: | GET | `/s/{serverSlug}` | `PublicServerController.getServerLandingPage` | Guest Public Channel View | 300s |
988: | GET | `/sitemap/{serverSlug}.xml` | `SEOController.getServerSitemap` | Channel Visibility Toggle | 3600s |
989: | GET | `/robots.txt` | `SEOController.getRobotsTxt` | Channel Visibility Toggle | 86400s |
990: 
991: ### 5.3 Rate Limiting
992: 
993: | Consumer Type | Limit | Window | Scope |
994: |---------------|-------|--------|-------|
995: | Authenticated users | 100 req | 1 min | Per user |
996: | Guest users (anonymous) | 60 req | 1 min | Per IP |
997: | Verified bots (Googlebot, Bingbot) | 1000 req | 1 min | Per bot identity |
998: 
999: Exceeding limits returns `429 Too Many Requests` with a `Retry-After` header.
1000: 
1001: ---
1002: 
1003: ## 6. Per-Module Specifications
1004: 
1005: ### 6.1 M-B1: API Gateway
1006: 
1007: **Purpose:** Single entry point for all backend requests. Routes authenticated traffic through tRPC and public traffic through REST controllers.
1008: 
1009: **Internal Architecture:**
1010: 
1011: ```mermaid
1012: graph TB
1013:     subgraph MB1["M-B1 API Gateway"]
1014:         tRPCRouter["tRPC Router<br/>(authenticated)"]
1015:         RESTRouter["REST Router<br/>(public)"]
1016: 
1017:         CC["ChannelController"]
1018:         PCC["PublicChannelController"]
1019:         PSC["PublicServerController"]
1020:         SC["SEOController"]
1021: 
1022:         tRPCRouter --> CC
1023:         RESTRouter --> PCC
1024:         RESTRouter --> PSC
1025:         RESTRouter --> SC
1026:     end
1027: 
1028:     Middleware["Express Middleware<br/>CORS · Helmet · RateLimit"] --> MB1
1029: ```
1030: 
1031: **Classes:**
1032: 
1033: | Label | Class | Visibility | Methods |
1034: |-------|-------|------------|---------|
1035: | CL-C-B1.1 | ChannelController | Public | `getChannelBySlug()`, `getChannelSettings()`, `updateChannelVisibility()`, `getVisibilityAuditLog()` |
1036: | CL-C-B1.2 | PublicChannelController | Public | `getPublicChannelPage()`, `getPublicMessages()`, `getPublicMessage()` |
1037: | CL-C-B1.3 | PublicServerController | Public | `getPublicServerInfo()`, `getPublicChannelList()`, `getServerLandingPage()` |
1038: | CL-C-B1.4 | SEOController | Public | `getServerSitemap()`, `getRobotsTxt()` |
1039: 
1040: ### 6.2 M-B2: Access Control
1041: 
1042: **Purpose:** Guards every public request: checks channel/server visibility, filters sensitive content from public output, enforces rate limits, and manages anonymous guest sessions.
1043: 
1044: **Internal Architecture:**
1045: 
1046: ```mermaid
1047: graph TB
1048:     subgraph MB2["M-B2 Access Control"]
1049:         VG["VisibilityGuard"]
1050:         CF["ContentFilter"]
1051:         RL["RateLimiter"]
1052:         ASM["AnonymousSessionManager"]
1053:     end
1054: 
1055:     VG -->|reads| Redis[("Redis Cache")]
1056:     VG -->|fallback| PG[("PostgreSQL")]
1057:     RL -->|counters| Redis
1058:     ASM -->|sessions| Redis
1059: ```
1060: 
1061: **Classes:**
1062: 
1063: | Label | Class | Visibility | Purpose |
1064: |-------|-------|------------|---------|
1065: | CL-C-B2.1 | VisibilityGuard | Public | Fast visibility checks (cache-first, DB fallback) |
1066: | CL-C-B2.2 | ContentFilter | Public | Strips PII, redacts mentions, sanitizes HTML via sanitize-html |
1067: | CL-C-B2.3 | RateLimiter | Public | Sliding-window rate limiting per IP/user/bot |
1068: | CL-C-B2.4 | AnonymousSessionManager | Public | Cookie-based guest session with preferences |
1069: 
1070: ### 6.3 M-B3: Visibility Management
1071: 
1072: **Purpose:** Owns the visibility state machine for channels. Only admins can toggle visibility. Every change is audited and emits an event to downstream consumers.
1073: 
1074: **Implementation requirements:**
1075: - `setVisibility()` **must** wrap the `UPDATE channels` and `INSERT INTO visibility_audit_log` writes in a single Prisma transaction — if the audit insert fails, the visibility update must roll back.
1076: - When transitioning to `PUBLIC_INDEXABLE`, `setVisibility()` also sets `indexed_at = NOW()` on the channel row (within the same transaction), recording the intent-to-index timestamp. This does not confirm the page has been crawled; it marks when the channel became indexable.
1077: - The controller layer (`ChannelController`) is responsible for mapping domain entities returned by services into response DTOs (`ChannelSettingsResponse`, `VisibilityUpdateResponse`) before sending them to the client. Repositories return domain entities only.
1078: 
1079: **Internal Architecture:**
1080: 
1081: ```mermaid
1082: graph TB
1083:     subgraph MB3["M-B3 Visibility Management"]
1084:         CVS["ChannelVisibilityService"]
1085:         PS["PermissionService"]
1086:         ALS["AuditLogService"]
1087:     end
1088: 
1089:     CVS -->|checks| PS
1090:     CVS -->|logs| ALS
1091:     CVS -->|emits| EventBus["Redis Pub/Sub<br/>VISIBILITY_CHANGED"]
1092:     CVS -->|reads/writes| ChannelRepo["ChannelRepository"]
1093:     ALS -->|writes| AuditRepo["AuditLogRepository"]
1094: ```
1095: 
1096: **State Machine:**
1097: 
1098: ```mermaid
1099: stateDiagram-v2
1100:     [*] --> PRIVATE : Channel created
1101:     PRIVATE --> PUBLIC_INDEXABLE : Admin toggles public+indexable
1102:     PRIVATE --> PUBLIC_NO_INDEX : Admin toggles public only
1103:     PUBLIC_INDEXABLE --> PRIVATE : Admin toggles private
1104:     PUBLIC_INDEXABLE --> PUBLIC_NO_INDEX : Admin disables indexing
1105:     PUBLIC_NO_INDEX --> PRIVATE : Admin toggles private
1106:     PUBLIC_NO_INDEX --> PUBLIC_INDEXABLE : Admin enables indexing
1107: ```
1108: 
1109: **Classes:**
1110: 
1111: | Label | Class | Visibility | Purpose |
1112: |-------|-------|------------|---------|
1113: | CL-C-B3.1 | ChannelVisibilityService | Public | Implements `IVisibilityToggle`; state transitions, validation, event emission |
1114: | CL-C-B3.2 | PermissionService | Public | Checks admin/owner permissions before visibility changes |
1115: | CL-C-B3.3 | AuditLogService | Public | Writes audit trail; queryable history; CSV/JSON export |
1116: 
1117: ### 6.4 M-B4: Content Delivery
1118: 
1119: **Purpose:** Retrieves and formats channel content for public consumption. Handles author privacy (anonymization of opted-out users), attachment URL generation, and message pagination.
1120: 
1121: **Internal Architecture:**
1122: 
1123: ```mermaid
1124: graph TB
1125:     subgraph MB4["M-B4 Content Delivery"]
1126:         MS["MessageService"]
1127:         AS["AuthorService"]
1128:         ATS["AttachmentService"]
1129:     end
1130: 
1131:     MS -->|reads| MsgRepo["MessageRepository"]
1132:     MS -->|filters| CF["ContentFilter (M-B2)"]
1133:     AS -->|reads| UserRepo["UserRepository"]
1134:     ATS -->|reads| Storage["Object Storage (S3-compatible)"]
1135: ```
1136: 
1137: > **StorageClient** is an S3-compatible object storage adapter (e.g. AWS S3, MinIO). It is injected into `AttachmentService` and is not part of the application codebase — configure via `STORAGE_BUCKET`, `STORAGE_ENDPOINT`, and `STORAGE_KEY` environment variables.
1138: 
1139: **Classes:**
1140: 
1141: | Label | Class | Visibility | Purpose |
1142: |-------|-------|------------|---------|
1143: | CL-C-B4.1 | MessageService | Public | Paginated message retrieval with content filtering |
1144: | CL-C-B4.2 | AuthorService | Public | Author display names with privacy-respecting anonymization |
1145: | CL-C-B4.3 | AttachmentService | Public | Public attachment URLs; thumbnail generation |
1146: 
1147: ### 6.5 M-B5: Meta Tag Engine
1148: 
1149: **Purpose:** Generates SEO meta tags (title, description, OpenGraph, Twitter Card, JSON-LD structured data) for public channel pages. Uses NLP-based content analysis for keyword extraction and summarization.
1150: 
1151: **Internal Architecture:**
1152: 
1153: ```mermaid
1154: graph TB
1155:     subgraph MB5["M-B5 Meta Tag Engine"]
1156:         MTS["MetaTagService<br/>(Facade)"]
1157:         TG["TitleGenerator"]
1158:         DG["DescriptionGenerator"]
1159:         OGG["OpenGraphGenerator"]
1160:         SDG["StructuredDataGenerator"]
1161:         MTC["MetaTagCache"]
1162:         CA["ContentAnalyzer"]
1163:         KE["KeywordExtractor"]
1164:         TS["TextSummarizer"]
1165:     end
1166: 
1167:     MTS --> TG
1168:     MTS --> DG
1169:     MTS --> OGG
1170:     MTS --> SDG
1171:     MTS --> MTC
1172:     MTS --> CA
1173:     CA --> KE
1174:     CA --> TS
1175:     MTS -->|reads| ChannelRepo["ChannelRepository"]
1176:     MTS -->|reads/writes| MTRepo["MetaTagRepository"]
1177:     MTC -->|cache| Redis[("Redis")]
1178: ```
1179: 
1180: **Classes:**
1181: 
1182: | Label | Class | Visibility | Purpose |
1183: |-------|-------|------------|---------|
1184: | CL-C-B5.1 | MetaTagService | Public | Facade: orchestrates tag generation, caching, scheduling |
1185: | CL-C-B5.2 | TitleGenerator | Internal | SEO-optimized titles from channel/message content |
1186: | CL-C-B5.3 | DescriptionGenerator | Internal | Meta descriptions from message summarization |
1187: | CL-C-B5.4 | OpenGraphGenerator | Internal | OG and Twitter Card tags |
1188: | CL-C-B5.5 | StructuredDataGenerator | Internal | JSON-LD structured data (DiscussionForumPosting schema) |
1189: | CL-C-B5.6 | MetaTagCache | Internal | Redis-backed cache for generated tags |
1190: | CL-C-B5.7 | ContentAnalyzer | Public | NLP analysis: keywords, topics, summarization |
1191: | CL-C-B5.8 | KeywordExtractor | Internal | TF-IDF keyword extraction via `natural` library |
1192: | CL-C-B5.9 | TextSummarizer | Internal | Extractive summarization via `compromise` |
1193: 
1194: ### 6.6 M-B6: SEO & Indexing
1195: 
1196: **Purpose:** Canonical owner of sitemap generation, `robots.txt` directives, canonical URLs, and search engine notification. Consumes `VISIBILITY_CHANGED` events to trigger sitemap rebuilds and indexing/de-indexing requests. When a channel transitions to `PRIVATE` or `PUBLIC_NO_INDEX`, `IndexingService` also clears the `indexed_at` field (sets it to `NULL`) in the same DB write; the initial `indexed_at` timestamp when transitioning to `PUBLIC_INDEXABLE` is set by `ChannelVisibilityService` (§6.3).
1197: 
1198: **Internal Architecture:**
1199: 
1200: ```mermaid
1201: graph TB
1202:     subgraph MB6["M-B6 SEO & Indexing"]
1203:         IS["IndexingService"]
1204:         SG["SitemapGenerator"]
1205:         SEOS["SEOService"]
1206:     end
1207: 
1208:     IS --> SG
1209:     SG -->|reads| ChannelRepo["ChannelRepository"]
1210:     IS -->|notifies| Google["Google Search Console"]
1211:     IS -->|notifies| Bing["Bing Webmaster API"]
1212:     SEOS -->|reads| ChannelRepo
1213:     SEOS -->|reads| MsgRepo["MessageRepository"]
1214: ```
1215: 
1216: **Classes:**
1217: 
1218: | Label | Class | Visibility | Purpose |
1219: |-------|-------|------------|---------|
1220: | CL-C-B6.1 | IndexingService | Public | Sitemap updates; search engine ping; canonical URLs; robots directives |
1221: | CL-C-B6.2 | SitemapGenerator | Internal | Builds XML sitemaps from public channel data |
1222: | CL-C-B6.3 | SEOService | Public | Page titles, descriptions, breadcrumbs, canonical URLs for SSR |
1223: 
1224: ### 6.7 M-B7: Background Workers
1225: 
1226: **Purpose:** Handles asynchronous, potentially expensive operations: meta-tag regeneration, sitemap rebuilds, and search engine notification. Workers subscribe to Redis Pub/Sub events and process them asynchronously.
1227: 
1228: **Internal Architecture:**
1229: 
1230: ```mermaid
1231: graph TB
1232:     subgraph MB7["M-B7 Background Workers"]
1233:         MTUW["MetaTagUpdateWorker"]
1234:         EL["EventListener"]
1235:         SU["SitemapUpdater"]
1236:     end
1237: 
1238:     EL -->|subscribes| EventBus["Redis Pub/Sub"]
1239:     EL -->|dispatches| MTUW
1240:     EL -->|dispatches| SU
1241:     MTUW -->|calls| MetaSvc["MetaTagService (M-B5)"]
1242:     SU -->|calls| IdxSvc["IndexingService (M-B6)"]
1243: ```
1244: 
1245: **Classes:**
1246: 
1247: | Label | Class | Visibility | Purpose |
1248: |-------|-------|------------|---------|
1249: | CL-C-B7.1 | MetaTagUpdateWorker | Internal | Processes meta-tag regeneration on event |
1250: | CL-C-B7.2 | EventListener | Internal | Subscribes to Redis Pub/Sub; dispatches to workers |
1251: | CL-C-B7.3 | SitemapUpdater | Internal | Processes sitemap rebuild + search engine notification on event |
1252: 
1253: ### 6.8 M-D1: Data Access (Repositories)
1254: 
1255: **Purpose:** Provides a clean data abstraction layer over PostgreSQL (via Prisma) and Redis. All database queries are centralized here; no service directly accesses the database.
1256: 
1257: | Label | Class | Methods | Used By |
1258: |-------|-------|---------|---------|
1259: | CL-C-D1.1 | ChannelRepository | `findById`, `findBySlug`, `update`, `findPublicByServerId`, `getVisibility`, `getMetadata` | M-B3, M-B5, M-B6, M-B2 |
1260: | CL-C-D1.2 | MessageRepository | `findByChannelPaginated`, `findById`, `countByChannel` | M-B4, M-B5 |
1261: | CL-C-D1.3 | ServerRepository | `findBySlug`, `getPublicInfo` | M-B1 (PublicServerController) |
1262: | CL-C-D1.4 | UserRepository | `findById`, `getPublicProfile` | M-B4 (AuthorService) |
1263: | CL-C-D1.5 | AuditLogRepository | `create`, `findByChannelId`, `findByDateRange` | M-B3 (AuditLogService) |
1264: | CL-C-D1.6 | MetaTagRepository | `findByChannelId`, `upsert`, `markForRegeneration` | M-B5 (MetaTagService) |
1265: 
1266: ### 6.9 M-D2: Persistence (PostgreSQL)
1267: 
1268: **Purpose:** Owns all database table definitions, migrations, and enum types. Implemented as a Prisma schema that generates type-safe client code consumed by M-D1 repositories.
1269: 
1270: **Internal Architecture:**
1271: 
1272: ```mermaid
1273: graph TB
1274:     subgraph MD2["M-D2 Persistence"]
1275:         Schema["Prisma Schema<br/>(schema.prisma)"]
1276:         Migrations["Prisma Migrations"]
1277:         EnumDef["visibility_enum<br/>PUBLIC_INDEXABLE · PUBLIC_NO_INDEX · PRIVATE"]
1278:     end
1279: 
1280:     Schema --> Migrations
1281:     Schema --> EnumDef
1282:     Repos["M-D1 Repositories"] -->|generated client| Schema
1283:     Schema -->|DDL| PG[("PostgreSQL 16+")]
1284: ```
1285: 
1286: **Tables Managed:** `servers`, `channels`, `messages`, `users`, `attachments`, `visibility_audit_log`, `generated_meta_tags` (see §4 for full column definitions).
1287: 
1288: ### 6.10 M-D3: Cache & EventBus (Redis)
1289: 
1290: **Purpose:** Manages all Redis cache keys, TTL policies, cache invalidation logic, and the Pub/Sub event bus transport. Provides a unified `CacheClient` and `EventBus` abstraction consumed by all service modules.
1291: 
1292: **Internal Architecture:**
1293: 
1294: ```mermaid
1295: graph TB
1296:     subgraph MD3["M-D3 Cache & EventBus"]
1297:         CC["CacheClient"]
1298:         EB["EventBus<br/>(Pub/Sub)"]
1299:         CI["CacheInvalidator"]
1300:     end
1301: 
1302:     CC -->|GET/SET/DEL| Redis[("Redis 7.2+")]
1303:     EB -->|PUBLISH/SUBSCRIBE| Redis
1304:     CI -->|subscribes| EB
1305:     CI -->|invalidates| CC
1306: 
1307:     Services["M-B2 through M-B7"] --> CC
1308:     Services --> EB
1309: ```
1310: 
1311: **Cache Key Ownership:** See §4.4 for the complete cache schema table with key patterns, TTLs, and invalidation triggers.
1312: 
1313: ---
1314: 
1315: ## 7. Cross-Feature Integration
1316: 
1317: ### 7.1 Visibility Change Propagation
1318: 
1319: When an admin changes a channel's visibility, the system propagates the change across all features:
1320: 
1321: ```mermaid
1322: sequenceDiagram
1323:     participant Admin
1324:     participant ChannelController as M-B1: ChannelController
1325:     participant VisService as M-B3: VisibilityService
1326:     participant DB as PostgreSQL
1327:     participant EventBus as Redis Pub/Sub
1328:     participant IndexSvc as M-B6: IndexingService
1329:     participant MetaSvc as M-B5: MetaTagService
1330:     participant CacheInv as M-D3: Cache Invalidator
1331: 
1332:     Admin->>ChannelController: updateVisibility(channelId, PUBLIC_INDEXABLE)
1333:     ChannelController->>VisService: setVisibility(channelId, PUBLIC_INDEXABLE, actorId, ip)
1334:     rect rgb(200, 230, 200)
1335:         note over VisService,DB: Prisma $transaction — atomic<br/>rolls back both on failure
1336:         VisService->>DB: UPDATE channels SET visibility = 'PUBLIC_INDEXABLE'
1337:         VisService->>DB: INSERT INTO visibility_audit_log
1338:     end
1339:     VisService->>EventBus: publish VISIBILITY_CHANGED
1340: 
1341:     par Parallel Event Processing
1342:         EventBus->>IndexSvc: VISIBILITY_CHANGED
1343:         IndexSvc->>DB: Rebuild sitemap for server
1344:         IndexSvc->>IndexSvc: Notify Google/Bing
1345: 
1346:         EventBus->>MetaSvc: VISIBILITY_CHANGED
1347:         MetaSvc->>MetaSvc: Generate meta tags for channel
1348: 
1349:         EventBus->>CacheInv: VISIBILITY_CHANGED
1350:         CacheInv->>CacheInv: Invalidate visibility cache
1351:         CacheInv->>CacheInv: Invalidate public channel list
1352:     end
1353: ```
1354: 
1355: ### 7.2 Guest Page Load (Cache Miss)
1356: 
1357: ```mermaid
1358: sequenceDiagram
1359:     participant Guest
1360:     participant SSR as Next.js SSR (M-GV1)
1361:     participant PCC as M-B1: PublicChannelController
1362:     participant VG as M-B2: VisibilityGuard
1363:     participant MS as M-B4: MessageService
1364:     participant SEO as M-B6: SEOService
1365:     participant MTS as M-B5: MetaTagService
1366:     participant DB as PostgreSQL
1367:     participant Redis as Redis Cache
1368: 
1369:     Guest->>SSR: GET /c/gamedev/help
1370: 
1371:     SSR->>PCC: getPublicChannelPage("gamedev", "help")
1372:     PCC->>VG: isChannelPublic(channelId)
1373:     VG->>Redis: GET channel:{id}:visibility
1374:     Redis-->>VG: PUBLIC_INDEXABLE
1375: 
1376:     PCC->>MS: getMessagesForPublicView(channelId, page=1)
1377:     MS->>DB: SELECT messages WHERE channel_id AND NOT is_deleted
1378:     DB-->>MS: Message[]
1379:     MS->>MS: Filter sensitive content
1380: 
1381:     PCC->>MTS: getOrGenerateCached(channelId)
1382:     MTS->>Redis: GET meta:channel:{id}
1383:     Redis-->>MTS: MetaTagSet (cached)
1384: 
1385:     PCC->>SEO: generateBreadcrumbs(server, channel)
1386: 
1387:     PCC-->>SSR: PublicChannelPage data
1388:     SSR->>SSR: Render HTML with meta tags
1389:     SSR-->>Guest: HTML Response
1390: ```
1391: 
1392: ---
1393: 
1394: ## 8. Technology Stack (Unified)
1395: 
1396: | Label | Technology | Version | Purpose | Used By |

(Output capped at 50 KB. Showing lines 1-1396. Use offset=1397 to continue.)
</content>
```

---

## Assistant (Plan · claude-sonnet-4-6 · 4.1s)

_Thinking:_

Let me also look at the existing code to understand what's already implemented.

Now let me look at the existing backend structure to understand the current state:

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-backend"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-backend</path>
<type>directory</type>
<entries>
.env.example
.gitignore
.nvmrc
.prettierrc.cjs
docker-compose.yml
eslint.config.mjs
jest.config.js
node_modules/
package-lock.json
package.json
README.md
src/
tests/
tsconfig.json
tsconfig.test.json

(15 entries)
</entries>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend</path>
<type>directory</type>
<entries>
.env.example
.gitignore
.next/
.prettierignore
.prettierrc.cjs
bun.lock
eslint.config.mjs
next-env.d.ts
next.config.ts
node_modules/
package-lock.json
package.json
postcss.config.mjs
public/
README.md
src/
tailwind.config.ts
tsconfig.json
tsconfig.tsbuildinfo

(19 entries)
</entries>
```

---

## Assistant (Plan · claude-sonnet-4-6 · 2.3s)

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-backend/src"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-backend/src</path>
<type>directory</type>
<entries>
app.ts
index.ts
lambda.ts
middleware/
trpc/

(5 entries)
</entries>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src</path>
<type>directory</type>
<entries>
app/
assets/
components/
context/
hooks/
layouts/
lib/
mocks/
services/
types/

(10 entries)
</entries>
```

---

## Assistant (Plan · claude-sonnet-4-6 · 2.9s)

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-backend/src/trpc"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-backend/src/trpc</path>
<type>directory</type>
<entries>
init.ts
router.ts

(2 entries)
</entries>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-backend/src/middleware"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-backend/src/middleware</path>
<type>directory</type>
<entries>
cors.ts

(1 entries)
</entries>
```

---

## Assistant (Plan · claude-sonnet-4-6 · 2.5s)

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-backend/src/trpc/init.ts"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-backend/src/trpc/init.ts</path>
<type>file</type>
<content>1: import { initTRPC, TRPCError } from '@trpc/server';
2: import type { Request } from 'express';
3: 
4: export interface TRPCContext {
5:   userId: string | null;
6:   ip: string;
7: }
8: 
9: export function createContext({ req }: { req: Request }): TRPCContext {
10:   // TODO: wire to express-session (or JWT middleware) once auth is implemented.
11:   // The cast below matches the shape that express-session would attach to req.
12:   const session = (req as Request & { session?: { userId?: string } }).session;
13:   return {
14:     userId: session?.userId ?? null,
15:     ip: req.ip ?? '',
16:   };
17: }
18: 
19: const t = initTRPC.context<TRPCContext>().create();
20: 
21: export const router = t.router;
22: 
23: /** Use for unauthenticated procedures (health, public REST). */
24: export const publicProcedure = t.procedure;
25: 
26: /** Use for all admin/authenticated tRPC procedures.
27:  *  Throws UNAUTHORIZED if no userId is present in context. */
28: export const authedProcedure = t.procedure.use(({ ctx, next }) => {
29:   if (!ctx.userId) {
30:     throw new TRPCError({ code: 'UNAUTHORIZED' });
31:   }
32:   return next({ ctx: { ...ctx, userId: ctx.userId } });
33: });

(End of file - total 33 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-backend/src/app.ts"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-backend/src/app.ts</path>
<type>file</type>
<content>1: import express, { NextFunction, Request, Response } from 'express';
2: import { createExpressMiddleware } from '@trpc/server/adapters/express';
3: import helmet from 'helmet';
4: import corsMiddleware, { CorsError } from './middleware/cors';
5: import { appRouter } from './trpc/router';
6: import { createContext } from './trpc/init';
7: 
8: export function createApp() {
9:   const app = express();
10: 
11:   app.use(helmet());
12:   // CORS must come before body parsers so error responses include CORS headers
13:   app.use(corsMiddleware);
14:   app.use(express.json());
15: 
16:   // Health check (plain HTTP — no tRPC client required)
17:   app.get('/health', (_req, res) => {
18:     res.json({ status: 'ok', timestamp: new Date().toISOString() });
19:   });
20: 
21:   // tRPC endpoint
22:   app.use(
23:     '/trpc',
24:     createExpressMiddleware({
25:       router: appRouter,
26:       createContext,
27:       onError({ error }) {
28:         console.error('tRPC error:', error);
29:       },
30:     }),
31:   );
32: 
33:   // 404 — unknown routes
34:   app.use((_req: Request, res: Response) => {
35:     res.status(404).json({ error: 'Not found' });
36:   });
37: 
38:   // Global error handler — must have 4 params for Express to treat it as an error handler
39:   app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
40:     const isCorsError = err instanceof CorsError;
41:     const status = isCorsError ? 403 : 500;
42:     const message = isCorsError ? err.message : 'Internal server error';
43:     if (!isCorsError) console.error('Unhandled error:', process.env.NODE_ENV === 'production' ? err.message : err);
44:     res.status(status).json({ error: message });
45:   });
46: 
47:   return app;
48: }

(End of file - total 48 lines)
</content>
```

---

## Assistant (Plan · claude-sonnet-4-6 · 3.3s)

**Tool: bash**

**Input:**
```json
{
  "command": "ls /Users/dblanc/dev/school/cs485/Harmony/harmony-backend/src && ls /Users/dblanc/dev/school/cs485/Harmony/harmony-backend/tests/ 2>&1",
  "description": "Check backend src and tests structure"
}
```

**Output:**
```
app.ts
index.ts
lambda.ts
middleware
trpc
app.test.ts

```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-backend/src/trpc/router.ts"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-backend/src/trpc/router.ts</path>
<type>file</type>
<content>1: import { router, publicProcedure } from './init';
2: 
3: export const appRouter = router({
4:   health: publicProcedure.query(() => {
5:     return { status: 'ok', timestamp: new Date().toISOString() };
6:   }),
7: });
8: 
9: export type AppRouter = typeof appRouter;

(End of file - total 9 lines)
</content>
```

---

## Assistant (Plan · claude-sonnet-4-6 · 4.1s)

**Tool: bash**

**Input:**
```json
{
  "command": "ls /Users/dblanc/dev/school/cs485/Harmony/harmony-backend/tests/ 2>&1",
  "description": "Check backend tests directory"
}
```

**Output:**
```
app.test.ts

```

**Tool: bash**

**Input:**
```json
{
  "command": "cat /Users/dblanc/dev/school/cs485/Harmony/harmony-backend/package.json",
  "description": "Check backend package.json dependencies"
}
```

**Output:**
```
{
  "name": "harmony-backend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint src tests",
    "test": "jest"
  },
  "dependencies": {
    "@trpc/server": "^11.0.0",
    "cors": "^2.8.5",
    "express": "^4.21.2",
    "helmet": "^8.1.0",
    "serverless-http": "^3.2.0",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.14",
    "@types/node": "^20.17.19",
    "@types/supertest": "^6.0.2",
    "@typescript-eslint/eslint-plugin": "^8.26.0",
    "@typescript-eslint/parser": "^8.26.0",
    "eslint": "^9.22.0",
    "eslint-config-prettier": "^10.1.1",
    "jest": "^29.7.0",
    "prettier": "^3.5.3",
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

---

## Assistant (Plan · claude-sonnet-4-6 · 3.7s)

_Thinking:_

Now I have a clear picture of the project. Let me check for the Prisma setup in the backend (it's not currently installed based on package.json).

Let me also check some of the frontend services to understand what the mock services look like.

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/services"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/services</path>
<type>directory</type>
<entries>
.gitkeep
authService.ts
channelService.ts
index.ts
messageService.ts
serverService.ts

(6 entries)
</entries>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/mocks"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/mocks</path>
<type>directory</type>
<entries>
.gitkeep
channels.ts
index.ts
messages.ts
servers.ts
users.ts

(6 entries)
</entries>
```

---

## Assistant (Plan · claude-sonnet-4-6 · 2.1s)

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/services/serverService.ts"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/services/serverService.ts</path>
<type>file</type>
<content>1: /**
2:  * Server Service (M1 — mock implementation)
3:  * References: dev-spec-channel-visibility-toggle.md
4:  */
5: 
6: import { cache } from 'react';
7: import type { Server, User, CreateServerInput } from '@/types';
8: import { mockServers, mockUsers } from '@/mocks';
9: 
10: // ─── In-memory store (mutated by write operations) ────────────────────────────
11: 
12: const g = globalThis as typeof globalThis & { __harmonyServers?: Server[] };
13: g.__harmonyServers ??= [...mockServers];
14: const servers: Server[] = g.__harmonyServers;
15: 
16: // ─── Service ──────────────────────────────────────────────────────────────────
17: 
18: /**
19:  * Returns all servers.
20:  */
21: export async function getServers(): Promise<Server[]> {
22:   return [...servers];
23: }
24: 
25: /**
26:  * Returns a single server by its slug, or null if not found.
27:  */
28: export const getServer = cache(async (slug: string): Promise<Server | null> => {
29:   return servers.find(s => s.slug === slug) ?? null;
30: });
31: 
32: /**
33:  * Returns all members (users) of a server by server ID.
34:  * In the mock layer, all users belong to every server for simplicity.
35:  */
36: export async function getServerMembers(_serverId: string): Promise<User[]> {
37:   // Simulate membership — real API would filter by _serverId
38:   return [...mockUsers];
39: }
40: 
41: /**
42:  * Updates editable metadata (name, description, icon) of a server in-memory.
43:  * slug is intentionally excluded — renaming the slug would break existing URLs.
44:  */
45: export async function updateServer(
46:   slug: string,
47:   patch: Partial<Pick<Server, 'name' | 'description' | 'icon'>>,
48: ): Promise<Server> {
49:   const index = servers.findIndex(s => s.slug === slug);
50:   if (index === -1) {
51:     throw new Error(`Server not found: ${slug}`);
52:   }
53:   servers[index] = {
54:     ...servers[index],
55:     ...Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined)),
56:     updatedAt: new Date().toISOString(),
57:   };
58:   return { ...servers[index] };
59: }
60: 
61: /**
62:  * Deletes a server by slug. Returns true if deleted, false if not found.
63:  */
64: export async function deleteServer(slug: string): Promise<boolean> {
65:   const index = servers.findIndex(s => s.slug === slug);
66:   if (index === -1) return false;
67:   servers.splice(index, 1);
68:   return true;
69: }
70: 
71: /**
72:  * Creates a new server and appends it to the in-memory store.
73:  */
74: export async function createServer(input: CreateServerInput): Promise<Server> {
75:   const slug = input.name
76:     .toLowerCase()
77:     .replace(/\s+/g, '-')
78:     .replace(/[^a-z0-9-]/g, '')
79:     .replace(/-+/g, '-')
80:     .replace(/^-|-$/g, '');
81: 
82:   const existing = servers.find(s => s.slug === slug);
83:   if (existing) {
84:     throw new Error('A server with this name already exists.');
85:   }
86: 
87:   const newServer: Server = {
88:     id: `server-${Date.now()}`,
89:     name: input.name.trim(),
90:     slug,
91:     ownerId: 'user-001',
92:     description: input.description?.trim() ?? '',
93:     memberCount: 1,
94:     createdAt: new Date().toISOString(),
95:     updatedAt: new Date().toISOString(),
96:   };
97: 
98:   servers.push(newServer);
99:   return { ...newServer };
100: }

(End of file - total 100 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/services/channelService.ts"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/services/channelService.ts</path>
<type>file</type>
<content>1: /**
2:  * Channel Service (M2 — mock implementation)
3:  * updateVisibility mutates in-memory state so changes persist during the session.
4:  * References: dev-spec-channel-visibility-toggle.md
5:  */
6: 
7: import { cache } from 'react';
8: import { ChannelVisibility, type Channel } from '@/types';
9: import { mockChannels, mockServers } from '@/mocks';
10: 
11: // ─── In-memory store (mutated by write operations) ────────────────────────────
12: // Use globalThis so the array survives Next.js hot-reloads and Turbopack
13: // worker re-evaluations in dev mode — same pattern used by Prisma client in
14: // Next.js dev. In production the module is evaluated once and this is a no-op.
15: //
16: // TODO(database): Replace with real DB queries when persistence is introduced.
17: // Each service function (getChannels, updateChannel, etc.) maps 1:1 to a SQL
18: // query — the component layer won't need to change, only this service.
19: // Known limitation: in-memory state is not shared across multiple server
20: // processes (e.g. PM2 clusters, Kubernetes pods) and is lost on restart.
21: const g = globalThis as typeof globalThis & { __harmonyChannels?: Channel[] };
22: g.__harmonyChannels ??= [...mockChannels];
23: const channels: Channel[] = g.__harmonyChannels;
24: 
25: // ─── Service ──────────────────────────────────────────────────────────────────
26: 
27: /**
28:  * Returns all channels for a given server.
29:  */
30: export async function getChannels(serverId: string): Promise<Channel[]> {
31:   return channels.filter(c => c.serverId === serverId);
32: }
33: 
34: /**
35:  * Returns a single channel by server slug + channel slug, or null if not found.
36:  */
37: export const getChannel = cache(async (serverSlug: string, channelSlug: string): Promise<Channel | null> => {
38:   // #c36: mockServers is now a static import at module scope — no dynamic import needed
39:   const server = mockServers.find(s => s.slug === serverSlug);
40:   if (!server) return null;
41:   return channels.find(c => c.serverId === server.id && c.slug === channelSlug) ?? null;
42: });
43: 
44: /**
45:  * Updates the visibility of a channel in-memory so it persists for the session.
46:  * Emits VISIBILITY_CHANGED semantics (canonical enum: PUBLIC_INDEXABLE | PUBLIC_NO_INDEX | PRIVATE).
47:  */
48: export async function updateVisibility(
49:   channelId: string,
50:   visibility: ChannelVisibility,
51: ): Promise<Channel> {
52:   const index = channels.findIndex(c => c.id === channelId);
53:   if (index === -1) {
54:     throw new Error(`Channel not found: ${channelId}`);
55:   }
56:   // updatedAt is optional in Channel; mock data omits it initially.
57:   // We set it here on every mutation so callers always get a fresh timestamp.
58:   channels[index] = {
59:     ...channels[index],
60:     visibility,
61:     updatedAt: new Date().toISOString(),
62:   };
63:   return { ...channels[index] };
64: }
65: 
66: /**
67:  * Updates editable metadata (name, topic, description) of a channel in-memory.
68:  * slug is intentionally excluded — renaming the slug would break existing URLs.
69:  */
70: export async function updateChannel(
71:   channelId: string,
72:   patch: Partial<Pick<Channel, 'name' | 'topic' | 'description'>>,
73: ): Promise<Channel> {
74:   const index = channels.findIndex(c => c.id === channelId);
75:   if (index === -1) {
76:     throw new Error(`Channel not found: ${channelId}`);
77:   }
78:   channels[index] = {
79:     ...channels[index],
80:     // Filter out undefined values so a Partial<> with absent keys doesn't
81:     // overwrite existing fields with undefined (standard PATCH semantics).
82:     ...Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined)),
83:     updatedAt: new Date().toISOString(),
84:   };
85:   return { ...channels[index] };
86: }
87: 
88: /**
89:  * Creates a new channel and appends it to the in-memory store.
90:  */
91: export async function createChannel(
92:   channel: Omit<Channel, 'id' | 'createdAt' | 'updatedAt'>,
93: ): Promise<Channel> {
94:   const newChannel: Channel = {
95:     ...channel,
96:     id: `channel-${Date.now()}`,
97:     createdAt: new Date().toISOString(),
98:     updatedAt: new Date().toISOString(),
99:   };
100:   channels.push(newChannel);
101:   return { ...newChannel };
102: }
103: 
104: /**
105:  * Deletes a channel by ID. Returns true if deleted, false if not found.
106:  */
107: export async function deleteChannel(channelId: string): Promise<boolean> {
108:   const index = channels.findIndex(c => c.id === channelId);
109:   if (index === -1) return false;
110:   channels.splice(index, 1);
111:   return true;
112: }
113: 
114: // Re-export ChannelVisibility for convenience
115: export { ChannelVisibility };

(End of file - total 115 lines)
</content>
```

---

## Assistant (Plan · claude-sonnet-4-6 · 3.9s)

_Thinking:_

Now let me look at the frontend app structure to understand how routes and auth are currently implemented.

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app</path>
<type>directory</type>
<entries>
actions/
auth/
c/
channels/
error.tsx
favicon.ico
global-error.tsx
globals.css
layout.tsx
not-found.tsx
page.tsx
providers.tsx
settings/

(13 entries)
</entries>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/services/authService.ts"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/services/authService.ts</path>
<type>file</type>
<content>1: /**
2:  * Auth Service (M4 — mock implementation)
3:  * Maintains in-session auth state via an in-memory variable.
4:  */
5: 
6: import type { User } from '@/types';
7: import { mockUsers } from '@/mocks';
8: 
9: // ─── In-memory auth state ─────────────────────────────────────────────────────
10: 
11: let currentUser: User | null = null;
12: 
13: // ─── Registered users persistence ─────────────────────────────────────────────
14: 
15: const REGISTERED_USERS_KEY = 'harmony_registered_users';
16: 
17: const VALID_STATUSES = ['online', 'idle', 'dnd', 'offline'];
18: const VALID_ROLES = ['owner', 'admin', 'moderator', 'member', 'guest'];
19: 
20: /** Runtime check that parsed JSON has the required User shape and valid enum values. */
21: function isValidUser(value: unknown): value is User {
22:   if (typeof value !== 'object' || value === null) return false;
23:   const obj = value as Record<string, unknown>;
24:   return (
25:     typeof obj.id === 'string' &&
26:     typeof obj.username === 'string' &&
27:     typeof obj.status === 'string' &&
28:     VALID_STATUSES.includes(obj.status) &&
29:     typeof obj.role === 'string' &&
30:     VALID_ROLES.includes(obj.role)
31:   );
32: }
33: 
34: function loadRegisteredUsers(): void {
35:   try {
36:     const stored = sessionStorage.getItem(REGISTERED_USERS_KEY);
37:     if (stored) {
38:       const parsed: unknown[] = JSON.parse(stored);
39:       if (!Array.isArray(parsed)) return;
40:       for (const u of parsed) {
41:         if (isValidUser(u) && !mockUsers.some(m => m.id === u.id)) {
42:           mockUsers.push(u);
43:         }
44:       }
45:     }
46:   } catch {
47:     sessionStorage.removeItem(REGISTERED_USERS_KEY);
48:   }
49: }
50: 
51: function saveRegisteredUser(user: User): void {
52:   try {
53:     const stored = sessionStorage.getItem(REGISTERED_USERS_KEY);
54:     const users: User[] = stored ? JSON.parse(stored) : [];
55:     users.push(user);
56:     sessionStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
57:   } catch {
58:     // Storage full or unavailable — user won't persist across refresh
59:   }
60: }
61: 
62: // Restore registered users on module load
63: if (typeof window !== 'undefined') {
64:   loadRegisteredUsers();
65: }
66: 
67: // ─── Service ──────────────────────────────────────────────────────────────────
68: 
69: /**
70:  * Returns the current authenticated user, or null if not logged in.
71:  */
72: export async function getCurrentUser(): Promise<User | null> {
73:   return currentUser ? { ...currentUser } : null;
74: }
75: 
76: /**
77:  * Simulates login — validates username against mock users.
78:  * Any password is accepted for demo purposes.
79:  */
80: export async function login(username: string, _password: string): Promise<User> {
81:   const matched = mockUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
82:   if (!matched) {
83:     throw new Error('Invalid username');
84:   }
85:   currentUser = { ...matched };
86:   return { ...currentUser };
87: }
88: 
89: /**
90:  * Restores the in-memory auth state (used after sessionStorage restore).
91:  */
92: export function setCurrentUser(user: User | null): void {
93:   currentUser = user ? { ...user } : null;
94: }
95: 
96: /**
97:  * Applies a partial update to the current user's profile fields.
98:  * Syncs the change to mockUsers and registered-users sessionStorage so
99:  * the update survives logout → login within the same session.
100:  * Returns the updated user, or throws if no user is logged in.
101:  */
102: export async function updateCurrentUser(
103:   patch: Partial<Pick<User, 'displayName' | 'status'>>,
104: ): Promise<User> {
105:   if (!currentUser) throw new Error('Not authenticated');
106:   currentUser = { ...currentUser, ...patch };
107: 
108:   // Sync to mockUsers array so login() picks up the change
109:   const idx = mockUsers.findIndex(u => u.id === currentUser!.id);
110:   if (idx !== -1) {
111:     mockUsers[idx] = { ...mockUsers[idx], ...patch };
112:   }
113: 
114:   // Sync to registered-users sessionStorage (for accounts created this session)
115:   try {
116:     const stored = sessionStorage.getItem(REGISTERED_USERS_KEY);
117:     if (stored) {
118:       const users: User[] = JSON.parse(stored);
119:       const regIdx = users.findIndex(u => u.id === currentUser!.id);
120:       if (regIdx !== -1) {
121:         users[regIdx] = { ...users[regIdx], ...patch };
122:         sessionStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
123:       }
124:     }
125:   } catch {
126:     // sessionStorage unavailable — in-memory update is still applied
127:   }
128: 
129:   return { ...currentUser };
130: }
131: 
132: /**
133:  * Simulates logout — clears the in-memory session.
134:  */
135: export async function logout(): Promise<void> {
136:   currentUser = null;
137: }
138: 
139: /**
140:  * Returns true if a user is currently logged in.
141:  */
142: export async function isAuthenticated(): Promise<boolean> {
143:   return currentUser !== null;
144: }
145: 
146: /**
147:  * Simulates account creation — adds a new user to mock data and logs them in.
148:  * Rejects duplicate usernames.
149:  */
150: export async function register(
151:   username: string,
152:   displayName: string,
153:   _password: string,
154: ): Promise<User> {
155:   const exists = mockUsers.some(u => u.username.toLowerCase() === username.toLowerCase());
156:   if (exists) {
157:     throw new Error('Username already taken');
158:   }
159: 
160:   const newUser: User = {
161:     id: `user-${Date.now()}`,
162:     username,
163:     displayName,
164:     avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
165:     status: 'online',
166:     role: 'member',
167:   };
168: 
169:   mockUsers.push(newUser);
170:   saveRegisteredUser(newUser);
171:   currentUser = { ...newUser };
172:   return { ...currentUser };
173: }

(End of file - total 173 lines)
</content>
```

---

## Assistant (Plan · claude-sonnet-4-6 · 5.7s)

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/settings"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/settings</path>
<type>directory</type>
<entries>
[serverSlug]/
actions.ts
layout.tsx
page.tsx

(4 entries)
</entries>
```

**Tool: bash**

**Input:**
```json
{
  "command": "ls /Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/actions/ 2>&1 && ls /Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/channels/ 2>&1 && ls /Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/auth/ 2>&1",
  "description": "List frontend app route structures"
}
```

**Output:**
```
createChannel.ts
[serverSlug]
actions.ts
layout.tsx
login
signup

```

---

## Assistant (Plan · claude-sonnet-4-6 · 2.7s)

**Tool: bash**

**Input:**
```json
{
  "command": "ls /Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/settings/[serverSlug]/ 2>&1 && ls /Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/channels/[serverSlug]/ 2>&1",
  "description": "Check settings and channels nested routes"
}
```

**Output:**
```
zsh:1: no matches found: /Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/settings/[serverSlug]/

```

---

## Assistant (Plan · claude-sonnet-4-6 · 2.4s)

**Tool: bash**

**Input:**
```json
{
  "command": "find /Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app -name \"*.ts\" -o -name \"*.tsx\" | sort 2>&1",
  "description": "Find all frontend app files"
}
```

**Output:**
```
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/actions/createChannel.ts
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/auth/login/page.tsx
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/auth/signup/page.tsx
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/c/[serverSlug]/[channelSlug]/loading.tsx
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/c/[serverSlug]/[channelSlug]/page.tsx
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/channels/[serverSlug]/[channelSlug]/loading.tsx
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/channels/[serverSlug]/[channelSlug]/page.tsx
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/channels/[serverSlug]/page.tsx
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/channels/actions.ts
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/channels/layout.tsx
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/error.tsx
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/global-error.tsx
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/layout.tsx
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/not-found.tsx
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/page.tsx
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/providers.tsx
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/settings/[serverSlug]/[channelSlug]/actions.ts
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/settings/[serverSlug]/[channelSlug]/page.tsx
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/settings/[serverSlug]/[channelSlug]/updateVisibility.ts
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/settings/[serverSlug]/actions.ts
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/settings/[serverSlug]/page.tsx
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/settings/actions.ts
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/settings/layout.tsx
/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/settings/page.tsx

```

---

## Assistant (Plan · claude-sonnet-4-6 · 3.1s)

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/settings/actions.ts"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/settings/actions.ts</path>
<type>file</type>
<content>1: 'use server';
2: 
3: import { getChannel, ChannelVisibility } from '@/services/channelService';
4: 
5: /**
6:  * Returns true if the channel at the given slugs is publicly accessible to
7:  * unauthenticated users (PUBLIC_INDEXABLE or PUBLIC_NO_INDEX). Returns false
8:  * for PRIVATE channels and channels that don't exist.
9:  *
10:  * Deliberately does NOT expose the raw ChannelVisibility enum to avoid
11:  * channel-existence probing by iterating slug combinations.
12:  */
13: export async function isChannelGuestAccessible(
14:   serverSlug: string,
15:   channelSlug: string,
16: ): Promise<boolean> {
17:   const channel = await getChannel(serverSlug, channelSlug);
18:   if (!channel) return false;
19:   return channel.visibility !== ChannelVisibility.PRIVATE;
20: }

(End of file - total 20 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/channels/actions.ts"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/harmony-frontend/src/app/channels/actions.ts</path>
<type>file</type>
<content>1: 'use server';
2: 
3: import { revalidatePath } from 'next/cache';
4: import { createServer } from '@/services/serverService';
5: import { createChannel } from '@/services/channelService';
6: import { ChannelType, ChannelVisibility } from '@/types';
7: import type { Server, Channel } from '@/types';
8: 
9: export async function createServerAction(
10:   name: string,
11:   description?: string,
12: ): Promise<{ server: Server; defaultChannel: Channel }> {
13:   if (typeof name !== 'string') throw new Error('Invalid server name');
14:   const trimmed = name.trim();
15:   if (!trimmed) throw new Error('Server name is required.');
16:   if (trimmed.length > 100) throw new Error('Server name must be 100 characters or fewer.');
17: 
18:   let sanitizedDescription: string | undefined;
19:   if (typeof description === 'undefined') {
20:     sanitizedDescription = undefined;
21:   } else if (typeof description === 'string') {
22:     const descTrimmed = description.trim();
23:     sanitizedDescription = descTrimmed || undefined;
24:   } else {
25:     throw new Error('Invalid server description');
26:   }
27: 
28:   const server = await createServer({ name: trimmed, description: sanitizedDescription });
29:   const defaultChannel = await createChannel({
30:     serverId: server.id,
31:     name: 'general',
32:     slug: 'general',
33:     type: ChannelType.TEXT,
34:     visibility: ChannelVisibility.PRIVATE,
35:     position: 0,
36:   });
37: 
38:   revalidatePath('/channels', 'layout');
39:   revalidatePath('/c', 'layout');
40:   revalidatePath('/settings', 'layout');
41: 
42:   return { server, defaultChannel };
43: }

(End of file - total 43 lines)
</content>
```

---

## Assistant (Plan · claude-sonnet-4-6 · 3.9s)

_Thinking:_

Now I have a comprehensive understanding of the project and all six issues assigned to `declanblanc`. Let me also check the tasks/lessons.md file and the WORKFLOW.md for any additional context.

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/tasks/lessons.md"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/tasks/lessons.md</path>
<type>file</type>
<content>1: # Lessons Learned
2: 
3: Shared knowledge base for the Harmony team. Add an entry whenever a mistake is caught, a better approach is discovered, or an AI agent is corrected.
4: 
5: ---
6: 
7: ## Template
8: 
9: **Date:** YYYY-MM-DD  
10: **Caught by:** [Human: @username] or [AI Agent: Copilot/Cursor]  
11: **Related Issue:** #<number> (optional)  
12: **Mistake / Situation:** One sentence describing what went wrong or what was unclear.  
13: **Rule / Fix:** The actionable rule derived — written so it prevents the same mistake next time.
14: 
15: ---
16: 
17: ## Log
18: 
19: <!-- Most recent entries at the top -->

(End of file - total 19 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/dblanc/dev/school/cs485/Harmony/WORKFLOW.md"
}
```

**Output:**
```
<path>/Users/dblanc/dev/school/cs485/Harmony/WORKFLOW.md</path>
<type>file</type>
<content>1: ## Workflow Orchestration
2: ### 1. Plan Mode Default
3: - Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
4: - If something goes sideways, STOP and re-plan immediately - don't keep pushing
5: - Use plan mode for verification steps, not just building
6: - Write detailed specs upfront to reduce ambiguity
7: 
8: ### 2. Subagent Strategy
9: - Use subagents liberally to keep main context window clean 
10: - Offload research, exploration, and parallel analysis to subagents
11: - For complex problems, throw more compute at it via subagents
12: - One task per subagent for focused execution
13: 
14: ### 3. Self-Improvement Loop 
15: - After ANY correction from the user: update `tasks/lessons.md` with the pattern
16: - Write rules for yourself that prevent the same mistake
17: - Ruthlessly iterate on these lessons until mistake rate drops
18: - Review lessons at session start for relevant project
19: 
20: ### 4. Verification Before Done
21: - Never mark a task complete without proving it works
22: - Diff behavior between main and your changes when relevant
23: - Ask yourself: "Would a staff engineer approve this?"
24: - Run tests, check logs, demonstrate correctness
25: 
26: ### 5. Demand Elegance (Balanced)
27: - For non-trivial changes: pause and ask "is there a more elegant way?"
28: - If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
29: - Skip this for simple, obvious fixes - don't over-engineer
30: - Challenge your own work before presenting it
31: 
32: ### 6. Autonomous Bug Fixing
33: - When given a bug report: just fix it. Don't ask for hand-holding
34: - Point at logs, errors, failing tests - then resolve them
35: - Zero context switching required from the user
36: - Go fix failing CI tests without being told how
37: 
38: ## Task Management
39: This project uses a **hybrid approach**: `tasks/todo.md` for AI context, GitHub Issues as the canonical tracker on the Harmony Project Board (course requirement).
40: 
41: 1. **Plan First**: Write plan to `tasks/todo.md` with checkable items (local scratch pad for AI context)
42: 2. **Identify the Issue**: If the task maps to an existing GitHub Issue, note the issue number at the top of `tasks/todo.md`
43: 3. **Announce Start**: Post an opening comment to the issue — `gh issue comment <number> --body "..."` — describing what will be done
44: 4. **Track Progress**: Mark items complete in `tasks/todo.md` as you go; post a comment to the issue at meaningful milestones (e.g., after a major step or when blocked)
45: 5. **Explain Changes**: High-level summary at each step
46: 6. **Document Results**: Add a review section to `tasks/todo.md` and post a final summary comment to the issue when complete
47: 7. **Capture Lessons**: Update `tasks/lessons.md` after corrections. Post the new lessons learned as a comment to the issue.
48: 
49: ### Issue Comment Format
50: Use this structure for issue comments to keep the audit trail readable:
51: 
52: ```
53: **[AI Agent — <Step>]**
54: 
55: <What was done or decided>
56: 
57: <Any blockers, decisions, or next steps>
58: ```
59: 
60: Example steps: `Starting`, `In Progress`, `Blocked`, `Complete`
61: 
62: ## Core Principles
63: - **Simplicity First**: Make every change as simple as possible. Impact minimal code.
64: - **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
65: - **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
66: - **Lean Context Files**: Keep AGENTS.md and similar files to only non-obvious, non-discoverable essentials. Research shows context file bloat decreases task success rates and increases inference cost by 20%+ with 2–4 extra steps per task (Gloaguen et al., 2026).
67: 
68: 
69: #### Taken from https://x.com/mdancho84/status/2023738764841894352
70: 
71: Gloaguen, T., Mündler, N., Müller, M., Raychev, V., & Vechev, M. (2026, February 12). Evaluating AGENTS.MD: Are Repository-Level context Files helpful for coding agents? arXiv.org. https://arxiv.org/abs/2602.11988

(End of file - total 71 lines)
</content>
```

---

## Assistant (Plan · claude-sonnet-4-6 · 258.0s)

_Thinking:_

Now I have a comprehensive picture of everything. Let me summarize what I know:

**Assigned Issues (all open):**

1. **#96 - Database Schema & Prisma Migrations** (Due: March 4, 2026 - **OVERDUE**)
   - Define Prisma schema for all tables
   - Create visibility_enum and channel_type enum
   - Set up all indexes per spec
   - Run initial migration
   - Write minimum tests
   - Dependencies: #94 (✅ CLOSED - Backend scaffold), #95 (✅ CLOSED - P4 Deliverables)
   
2. **#100 - Channel Service & API** (Due: March 6, 2026 - **OVERDUE**)
   - Build out channel CRUD operations through tRPC with support for ChannelType and visibility enums
   - Enforce constraints like preventing VOICE channels from being PUBLIC_INDEXABLE, maintaining position ordering and slug uniqueness
   - Automatically create default channels when a server is created
   - Include minimum test coverage
   - Depends on #96 being completed first

3. **#105 - Channel Visibility Toggle Service** (Due: March 10, 2026 - **OVERDUE**)
   - Implement the updateVisibility() method with state machine validation and permission checks
   - Update the indexed_at timestamp and emit a VISIBILITY_CHANGED event when visibility changes
   - Add minimum tests
   - Blocked by #100 and waiting on #102 for RBAC implementation

4. **#110 - Rate Limiting Middleware** (Due: March 11, 2026 - UPCOMING)
   - Set up token bucket rate limiting with different thresholds for human users (100 req/min) and bots (1000 req/min)
   - Return 429 responses with Retry-After headers and detect bots via User-Agent
   - Include minimum tests

5. **#114 - Frontend Integration — Servers & Channels** (Due: March 12, 2026 - UPCOMING)
   - Swap out the mock services for actual tRPC/API calls and update server actions accordingly
   - Wire up the server member list display with proper loading and error state handling
   - Depends on #99 and #100

6. **#119 - Next.js Auth Middleware** (Due: March 13, 2026 - UPCOMING)
   - Add middleware to protect /settings/* and /channels/* routes by verifying JWT tokens from httpOnly cookies
   - Redirect unauthenticated users to login and non-admin users away from /settings/*
   - Blocked by #97 and #113

Looking at what's actually in place, the backend is mostly scaffolding with just a health check endpoint and no Prisma or rate limiting yet, while the frontend is still running on mocks without a tRPC client. My work chain (#96 → #100 → #105 → #114) is sequential, so I need to start with #96 as the foundation, though #110 can move forward independently since #94 is already closed. #119 is waiting on other people's work, so that's not blocking me right now. I'm realizing I'm in plan mode which means I can't actually write files yet, so I need to present the plan to the user for approval first. Once they confirm, I'll be able to write the comprehensive task plan to tasks/todo.md with all the dependencies and blocking relationships I've identified. Looking at the due dates, #96 is already overdue and needs immediate attention since it's blocking everything else. I can run #100 and #110 in parallel once #96 is done, then tackle #105 and #114 in sequence, though both are waiting on external dependencies from other team members. #119 is the last priority since it's blocked by work from Aiden-Barrera and AvanishKulkarni.

Now I have a thorough understanding of the project. Let me compile this into a plan.

Here is the plan I'll write to `tasks/todo.md`. Since plan mode is active I cannot write the file yet — review this first and confirm:

---

## Summary of Issues

| # | Title | Due | Status | Blocked by |
|---|-------|-----|--------|-----------|
| #96 | Database Schema & Prisma Migrations | Mar 4 | **OVERDUE** | #94 ✅ #95 ✅ |
| #100 | Channel Service & API | Mar 6 | Tomorrow | #96 |
| #105 | Channel Visibility Toggle Service | Mar 10 | Open | #100, #102 (Aiden) |
| #110 | Rate Limiting Middleware | Mar 11 | Open | #94 ✅ |
| #114 | Frontend Integration — Servers & Channels | Mar 12 | Open | #100, #99 (Avanish) |
| #119 | Next.js Auth Middleware | Mar 13 | Open | #97, #113 (Aiden) |

---

## Proposed Execution Order

**Phase 1 — Unblock everything (URGENT)**
> `#96` is already overdue and blocks `#100`, `#105`, and `#114`. It should be done today.

**Phase 2 — Backend services (parallel where possible)**
> `#100` (Channel Service) and `#110` (Rate Limiting) can be done in parallel once `#96` is done. `#110` is actually independent of `#96` but the DB schema is needed before real channel operations anyway.

**Phase 3 — Visibility service**
> `#105` (Visibility Toggle Service) depends on `#100` and `#102` (RBAC from Aiden-Barrera, currently open). Can be stubbed with a simplified permission check if `#102` isn't done yet — the spec's `PermissionService` interface is known.

**Phase 4 — Frontend integration**
> `#114` (Frontend Integration) depends on `#100` and `#99` (Server Service from AvanishKulkarni). Will be blocked on `#99`.

**Phase 5 — Auth middleware**
> `#119` (Next.js Auth Middleware) is fully blocked on `#97` and `#113` (both Aiden-Barrera). No work possible until those land.

---

## Detailed Task Breakdown

### Issue #96 — Database Schema & Prisma Migrations

**Pre-work:**
- Add Prisma to `harmony-backend` (`@prisma/client`, `prisma` devDep)
- Configure `DATABASE_URL` in `.env.example`

**Tasks:**
1. Add Prisma to package.json and configure `prisma/schema.prisma`
2. Define `visibility_enum` (`PUBLIC_INDEXABLE`, `PUBLIC_NO_INDEX`, `PRIVATE`)
3. Define `channel_type_enum` (`TEXT`, `VOICE`, `ANNOUNCEMENT`)
4. Define models: `users`, `servers`, `channels`, `messages`, `attachments`, `visibility_audit_log`, `generated_meta_tags` (per `unified-backend-architecture.md §4.1`)
5. Add all indexes from `unified-backend-architecture.md §4.3` (partial indexes, composite indexes)
6. Run `prisma migrate dev` to produce the initial migration
7. Write minimum tests: verify Prisma client connects and migrations pass (test against real DB via Docker Compose)

**Files to create:**
- `harmony-backend/prisma/schema.prisma`
- `harmony-backend/tests/schema.test.ts`

---

### Issue #100 — Channel Service & API

**Pre-work:** Depends on #96 (Prisma schema)

**Tasks:**
1. Create `src/services/channel.service.ts` with `ChannelRepository` (wraps Prisma)
2. Implement tRPC procedures: `channel.getChannels`, `channel.getChannel`, `channel.createChannel`, `channel.updateChannel`, `channel.deleteChannel` (in `src/trpc/routers/channel.router.ts`)
3. Enforce `VOICE` channels cannot be `PUBLIC_INDEXABLE` (Zod refinement or service guard)
4. Slug uniqueness per server (DB unique index + service-level error)
5. Position ordering (increments on create)
6. Default channel creation (`general`, type `TEXT`, visibility `PRIVATE`) triggered by server creation
7. Mount `channelRouter` in `appRouter`
8. Write minimum tests for channel CRUD happy paths

**Files to create/modify:**
- `harmony-backend/src/services/channel.service.ts`
- `harmony-backend/src/trpc/routers/channel.router.ts`
- `harmony-backend/src/trpc/router.ts` (mount)
- `harmony-backend/tests/channel.service.test.ts`

---

### Issue #110 — Rate Limiting Middleware

**Pre-work:** Independent — depends only on #94 (closed)

**Tasks:**
1. Install `express-rate-limit` (or implement token bucket manually per spec)
2. Implement bot detection via `User-Agent` (Googlebot, Bingbot patterns)
3. Create `src/middleware/rateLimiter.ts`:
   - Human users: 100 req/min per IP
   - Verified bots: 1000 req/min
   - Returns `429 Too Many Requests` with `Retry-After` header
4. Mount rate limiter in `src/app.ts` before route handlers
5. Write minimum tests (assert 429 after limit exceeded, assert bots get higher limit)

**Files to create/modify:**
- `harmony-backend/src/middleware/rateLimiter.ts`
- `harmony-backend/src/app.ts` (mount)
- `harmony-backend/tests/rateLimiter.test.ts`

---

### Issue #105 — Channel Visibility Toggle Service

**Pre-work:** Depends on #100, partially on #102 (RBAC from Aiden-Barrera)

**Tasks:**
1. Create `src/services/visibility.service.ts` implementing `IVisibilityToggle` (per spec `CL-C-B3.1`)
2. Implement state machine validation — all 6 valid transitions (per `dev-spec-channel-visibility-toggle.md §5.2`)
3. Wrap DB update + audit log insert in a single `prisma.$transaction`
4. Set `indexed_at = NOW()` when transitioning to `PUBLIC_INDEXABLE`; clear `indexed_at` when going `PRIVATE`
5. Create `src/services/permission.service.ts` stub — `canManageChannel`, `isServerAdmin` (wire to real RBAC if #102 is available, else owner-only check)
6. Emit `VISIBILITY_CHANGED` event via Redis Pub/Sub (or stub event bus if Redis isn't wired yet)
7. Create `src/services/auditLog.service.ts` for `logVisibilityChange`
8. Expose `channel.updateVisibility` tRPC procedure
9. Write minimum tests for all 6 state transitions + rejected invalid transitions

**Files to create/modify:**
- `harmony-backend/src/services/visibility.service.ts`
- `harmony-backend/src/services/permission.service.ts`
- `harmony-backend/src/services/auditLog.service.ts`
- `harmony-backend/src/trpc/routers/channel.router.ts` (add `updateVisibility` procedure)
- `harmony-backend/tests/visibility.service.test.ts`

---

### Issue #114 — Frontend Integration — Servers & Channels

**Pre-work:** Depends on #100, and #99 (AvanishKulkarni's Server Service)

**Tasks:**
1. Set up tRPC client in `harmony-frontend` (install `@trpc/client`, `@trpc/next`, configure `src/lib/trpc.ts`)
2. Replace `serverService.ts` mock with real tRPC calls (getServers, getServer, createServer, updateServer, deleteServer)
3. Replace `channelService.ts` mock with real tRPC calls (getChannels, getChannel, createChannel, updateChannel, deleteChannel, updateVisibility)
4. Update all server actions in `src/app/channels/actions.ts` and `src/app/settings/actions.ts` to use real API
5. Wire server member list display (call `server.getMembers` tRPC or REST endpoint)
6. Add loading states and error handling throughout (use React `Suspense` / error boundaries already present)

**Files to modify:**
- `harmony-frontend/src/services/serverService.ts`
- `harmony-frontend/src/services/channelService.ts`
- `harmony-frontend/src/lib/trpc.ts` (new)
- `harmony-frontend/src/app/channels/actions.ts`
- `harmony-frontend/src/app/settings/actions.ts`

---

### Issue #119 — Next.js Auth Middleware

**Pre-work:** Fully blocked on #97 (JWT Auth backend) and #113 (Frontend Auth Integration) — both assigned to Aiden-Barrera

**Tasks (once dependencies land):**
1. Create `harmony-frontend/src/middleware.ts` (Next.js edge middleware)
2. Match routes `/settings/:path*` and `/channels/:path*`
3. Read JWT from `httpOnly` cookie, verify signature (using `jose` or `jsonwebtoken`)
4. Redirect unauthenticated requests to `/auth/login` immediately (eliminates client-side spinner, fixes #71)
5. Redirect non-admin users away from `/settings/:path*`
6. Write integration tests for middleware redirect behavior

**Files to create/modify:**
- `harmony-frontend/src/middleware.ts` (new)
- `harmony-frontend/tests/middleware.test.ts` (new)

---

**A few clarifying questions before I finalize and write this:**

**Tool: question**

**Input:**
```json
{
  "questions": [
    {
      "question": "Issue #105 (Channel Visibility Toggle Service) depends on issue #102 (RBAC/PermissionService) which is assigned to Aiden-Barrera and is not yet complete. How should I handle the PermissionService dependency?",
      "header": "Permission service stub?",
      "options": [
        {
          "label": "Stub with owner-only check (Recommended)",
          "description": "Implement a minimal PermissionService that only checks server ownership, with a clear TODO comment to wire to #102 when it lands."
        },
        {
          "label": "Wait for #102",
          "description": "Hold off on #105 entirely until Aiden's RBAC issue is merged."
        },
        {
          "label": "Full RBAC implementation",
          "description": "Implement PermissionService myself following the spec, effectively doing Aiden's work to unblock #105."
        }
      ]
    },
    {
      "question": "Issue #110 (Rate Limiting) can be done independently right now and is the simplest of the 6 issues. Should I tackle it in parallel with or before #96?",
      "header": "Rate limiting priority",
      "options": [
        {
          "label": "#96 first, then #110 (Recommended)",
          "description": "#96 is overdue and blocks 3 other issues. Do it first, then #110 while waiting on other dependencies."
        },
        {
          "label": "#110 first",
          "description": "#110 has no dependencies and could be knocked out quickly while the DB schema is being planned."
        },
        {
          "label": "Do both in parallel",
          "description": "Start #96 Prisma schema work and #110 rate limiting in the same session."
        }
      ]
    },
    {
      "question": "Should I write the todo.md plan now and proceed to implementation immediately, or do you want to review the plan first?",
      "header": "Proceed to implementation?",
      "options": [
        {
          "label": "Write todo.md and implement now (Recommended)",
          "description": "Write the plan file and begin implementation immediately, starting with the most overdue issues."
        },
        {
          "label": "Write todo.md only",
          "description": "Write the plan file now, but wait for explicit approval before touching any code."
        }
      ]
    }
  ]
}
```

**Output:**
```
User has answered your questions: "Issue #105 (Channel Visibility Toggle Service) depends on issue #102 (RBAC/PermissionService) which is assigned to Aiden-Barrera and is not yet complete. How should I handle the PermissionService dependency?"="Wait for #102", "Issue #110 (Rate Limiting) can be done independently right now and is the simplest of the 6 issues. Should I tackle it in parallel with or before #96?"="#96 first, then #110 (Recommended)", "Should I write the todo.md plan now and proceed to implementation immediately, or do you want to review the plan first?"="Write todo.md only". You can now continue with the user's answers in mind.
```

---

## Assistant (Plan · claude-sonnet-4-6 · 48.8s)

_Thinking:_

The user wants me to:
1. Stub PermissionService with owner-only check and wait for #102 for full RBAC
2. Do #96 first, then #110
3. Write todo.md only (no implementation yet)

Wait, actually they said "Wait for #102" for the permission service question. And they said "Write todo.md only" - so I should write the plan file but not implement yet.

But I'm in plan mode, which means I CANNOT write files. The system reminder says "STRICTLY FORBIDDEN: ANY file edits, modifications, or system changes."

Hmm. The user explicitly said to write the plan to tasks/todo.md. 

Let me reconsider. The user asked me to "Create a plan for completing each of these issues and write the plan to @tasks/todo.md". Plan mode says I should present the plan but not make changes. The user's answer "Write todo.md only" suggests they want me to write the file.

The plan mode is a "READ-ONLY phase" where I should "think, read, search, and delegate explore agents to construct a well-formed plan." The whole point is that once I present the plan and the user approves (implicitly by answering my question), I can then execute it.

So the user is saying: write the plan to the file. They're overriding the plan mode constraint by explicitly asking for the file to be written. I should write todo.md with the plan for these three issues. I'll present the complete todo.md content as my plan and ask the user to confirm before I write it, since plan mode prevents me from executing file changes right now.

Since plan mode is active, I can't write the file yet. Below is the exact content I'll write to `tasks/todo.md` — please confirm to proceed.

---

```markdown
# Tasks — declanblanc

Issues: #96 #100 #105 #110 #114 #119

## Execution Order
1. #96 (Database Schema) — OVERDUE, blocks #100 / #105 / #114
2. #100 (Channel Service) — immediately after #96
3. #110 (Rate Limiting) — after #96, independent
4. #105 (Visibility Toggle Service) — after #100; blocked by #102 (Aiden-Barrera RBAC)
5. #114 (Frontend Integration) — after #100; blocked by #99 (AvanishKulkarni Server Service)
6. #119 (Next.js Auth Middleware) — blocked by #97 and #113 (both Aiden-Barrera)

---

## Issue #96 — Database Schema & Prisma Migrations
> Due: March 4 (OVERDUE) | Depends on: #94 ✅ #95 ✅

- [ ] Add `prisma` + `@prisma/client` to `harmony-backend/package.json`
- [ ] Create `harmony-backend/prisma/schema.prisma`
  - [ ] Define `visibility_enum` (PUBLIC_INDEXABLE, PUBLIC_NO_INDEX, PRIVATE)
  - [ ] Define `channel_type_enum` (TEXT, VOICE, ANNOUNCEMENT)
  - [ ] Model: `users`
  - [ ] Model: `servers`
  - [ ] Model: `channels` (with visibility, channel_type, indexed_at)
  - [ ] Model: `messages`
  - [ ] Model: `attachments`
  - [ ] Model: `visibility_audit_log`
  - [ ] Model: `generated_meta_tags`
- [ ] Add all indexes from `unified-backend-architecture.md §4.3`
  - [ ] `idx_channels_server_visibility`
  - [ ] `idx_channels_server_slug` (unique)
  - [ ] `idx_channels_visibility_indexed` (partial)
  - [ ] `idx_channels_visibility` (partial)
  - [ ] `idx_messages_channel_time`
  - [ ] `idx_messages_channel_not_deleted` (partial)
  - [ ] `idx_audit_channel_time`
  - [ ] `idx_audit_actor`
  - [ ] `idx_servers_slug` (unique)
  - [ ] `idx_servers_public` (partial)
  - [ ] `idx_meta_tags_channel` (unique)
  - [ ] `idx_meta_tags_needs_regen` (partial)
- [ ] Run `prisma migrate dev --name init` to generate initial migration
- [ ] Write `harmony-backend/tests/schema.test.ts` — verify Prisma connects and tables exist
- [ ] Comment on issue #96 (start + completion)

---

## Issue #100 — Channel Service & API
> Due: March 6 | Depends on: #96

- [ ] Create `harmony-backend/src/db/prisma.ts` (singleton Prisma client)
- [ ] Create `harmony-backend/src/services/channel.service.ts`
  - [ ] `getChannels(serverId)` — returns all channels for a server
  - [ ] `getChannelBySlug(serverSlug, channelSlug)` — resolves server then channel
  - [ ] `createChannel(input)` — validate slug uniqueness per server; enforce VOICE ≠ PUBLIC_INDEXABLE
  - [ ] `updateChannel(channelId, patch)` — name, topic, description, position
  - [ ] `deleteChannel(channelId)` — hard delete
  - [ ] `createDefaultChannel(serverId)` — creates "general" TEXT PRIVATE channel at position 0
- [ ] Create `harmony-backend/src/trpc/routers/channel.router.ts`
  - [ ] `channel.getChannels` (authedProcedure)
  - [ ] `channel.getChannel` (authedProcedure)
  - [ ] `channel.createChannel` (authedProcedure)
  - [ ] `channel.updateChannel` (authedProcedure)
  - [ ] `channel.deleteChannel` (authedProcedure)
- [ ] Mount `channelRouter` in `harmony-backend/src/trpc/router.ts`
- [ ] Write `harmony-backend/tests/channel.service.test.ts` — happy path CRUD + VOICE visibility guard
- [ ] Comment on issue #100 (start + completion)

---

## Issue #110 — Rate Limiting Middleware
> Due: March 11 | Depends on: #94 ✅ (independent)

- [ ] Create `harmony-backend/src/middleware/rateLimiter.ts`
  - [ ] Token bucket implementation (or use `express-rate-limit` + custom store)
  - [ ] Bot detection by User-Agent (Googlebot, Bingbot → 1000 req/min)
  - [ ] Human users → 100 req/min per IP
  - [ ] Returns `429 Too Many Requests` with `Retry-After` header on limit exceeded
- [ ] Mount rate limiter in `harmony-backend/src/app.ts` (before tRPC and route handlers)
- [ ] Write `harmony-backend/tests/rateLimiter.test.ts`
  - [ ] Assert 429 + Retry-After after limit exceeded for human IP
  - [ ] Assert bots get higher limit (1000 req/min)
- [ ] Comment on issue #110 (start + completion)

---

## Issue #105 — Channel Visibility Toggle Service
> Due: March 10 | Depends on: #100, #102 (Aiden-Barrera RBAC — wait for this)

**Blocked until #102 is merged.**

- [ ] Verify #102 is merged and `PermissionService` is available
- [ ] Create `harmony-backend/src/services/visibility.service.ts`
  - [ ] `updateVisibility(channelId, newVisibility, actorId, ip)` — state machine + transaction
  - [ ] `getVisibility(channelId)` — returns current ChannelVisibility
  - [ ] `canChangeVisibility(channelId, actorId)` — delegates to PermissionService
  - [ ] `validateTransition(current, next)` — enforce all 6 valid transitions per spec §5.2
  - [ ] `emitVisibilityChange(event)` — publish to Redis Pub/Sub (or stub if Redis not wired)
  - [ ] Set `indexed_at = NOW()` when → PUBLIC_INDEXABLE (within Prisma transaction)
  - [ ] Clear `indexed_at = null` when → PRIVATE (within Prisma transaction)
  - [ ] Wrap DB update + audit_log INSERT in `prisma.$transaction`
- [ ] Create `harmony-backend/src/services/auditLog.service.ts`
  - [ ] `logVisibilityChange(entry)` — inserts into `visibility_audit_log`
- [ ] Expose `channel.updateVisibility` tRPC procedure in `channel.router.ts`
- [ ] Write `harmony-backend/tests/visibility.service.test.ts`
  - [ ] All 6 valid transitions succeed
  - [ ] Invalid transitions are rejected
  - [ ] Non-admin users are rejected
- [ ] Comment on issue #105 (start + completion)

---

## Issue #114 — Frontend Integration — Servers & Channels
> Due: March 12 | Depends on: #100, #99 (AvanishKulkarni — wait for this)

**Blocked until #99 (Server Service) is merged.**

- [ ] Verify #99 is merged and server tRPC endpoints are available
- [ ] Install `@trpc/client`, `@trpc/next` in `harmony-frontend`
- [ ] Create `harmony-frontend/src/lib/trpc.ts` (typed tRPC client using `AppRouter` from backend)
- [ ] Replace `harmony-frontend/src/services/serverService.ts` mock with real tRPC calls
  - [ ] `getServers()`, `getServer(slug)`, `createServer()`, `updateServer()`, `deleteServer()`
  - [ ] `getServerMembers(serverId)` — wire to backend endpoint
- [ ] Replace `harmony-frontend/src/services/channelService.ts` mock with real tRPC calls
  - [ ] `getChannels(serverId)`, `getChannel(serverSlug, channelSlug)`
  - [ ] `createChannel()`, `updateChannel()`, `deleteChannel()`, `updateVisibility()`
- [ ] Update `src/app/channels/actions.ts`
  - [ ] `createServerAction` — call real API
- [ ] Update `src/app/settings/actions.ts`
  - [ ] `saveServerSettings`, `deleteServerAction`, `saveChannelSettings`, `createChannelAction`
- [ ] Wire server member list display in settings page
- [ ] Add loading/error state handling throughout
- [ ] Comment on issue #114 (start + completion)

---

## Issue #119 — Next.js Auth Middleware
> Due: March 13 | Depends on: #97 (Aiden-Barrera JWT Auth), #113 (Aiden-Barrera Frontend Auth)

**Blocked until #97 and #113 are merged.**

- [ ] Verify #97 (JWT Auth) and #113 (Frontend Auth Integration) are merged
- [ ] Create `harmony-frontend/src/middleware.ts`
  - [ ] Match `/settings/:path*` and `/channels/:path*`
  - [ ] Read JWT from `httpOnly` cookie
  - [ ] Verify JWT signature (use `jose` for edge-compatible crypto)
  - [ ] Redirect unauthenticated → `/auth/login` (eliminates 3–4s spinner, fixes #71)
  - [ ] Redirect non-admin → away from `/settings/:path*`
- [ ] Write `harmony-frontend/tests/middleware.test.ts` — assert redirect behavior
- [ ] Comment on issue #119 (start + completion)
```

---

Ready to write this file and start with **#96** on your word. Just reply to confirm.

---

