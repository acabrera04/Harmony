# Backend Development Sprint Plan — March 2–13, 2026

## Context
Harmony is a search-engine-indexable chat app (Discord-like clone). The frontend exists with mock in-memory services. This sprint wires up a real backend with PostgreSQL, Redis, Prisma, and tRPC/REST APIs, then integrates the frontend. Two dev specs must have full backend support: **Guest Public Channel View** and **Channel Visibility Toggle**.

## Team
5 developers: acabrera04, Aiden-Barrera, AvanishKulkarni, declanblanc, FardeenI

## Tech Stack (from dev specs)
- Node.js 20 LTS + TypeScript 5.3+
- PostgreSQL 16+ with Prisma 5.8+
- Redis 7.2+ for caching
- tRPC 10.45+ (authenticated internal APIs)
- REST (public unauthenticated APIs)
- Zod 3.22+ for validation
- JWT for auth, bcrypt for passwords

---

## Issues (29 total)

> **Note:** Every backend service/module issue (#4–#19) must include minimum tests verifying the module's API works for the happy path. Check test code into GitHub alongside the implementation.

### 🏗️ FOUNDATION — Week 1 (March 2–6)

**1. Backend Project Scaffold & Dev Environment**
- Set up Node.js backend (Express + tRPC), TypeScript config, project structure
- Docker Compose for PostgreSQL + Redis local dev
- Structure Express app to be wrappable with `serverless-http` for future AWS Lambda deployment (P6)
- Configure CORS middleware for cross-origin frontend requests
- Shared types package or import from frontend types
- Dev server with hot reload (ts-node-dev or tsx)
- Set up Jest testing framework with TypeScript support (ts-jest)
- Update CI workflow (.github/workflows/ci.yml) — add backend job: install, lint, build, test (parallel with existing frontend job)
- Labels: backend, setup, prerequisite, week-1
- Assignee: acabrera04
- Due: March 3

**2. P4 Deliverables — Dev Spec Update & Architecture Document**
- Update dev-spec-channel-visibility-toggle.md and dev-spec-guest-public-channel-view.md to reflect unified backend
- Create unified backend architecture document with text description + Mermaid diagram
- Justify design choices (PostgreSQL, Redis, tRPC+REST split, etc.) for a senior architect audience
- Per-module specification (P4 items 1–8): features, internal architecture + Mermaid, data abstraction, stable storage + schemas, API definition, class/method/field list with visibility, class hierarchy Mermaid diagram
- Include rendered Mermaid diagram screenshots in repo
- This is the blueprint all devs code against — must be done before service implementation begins
- *(P4 Deliverables #1 + #2: Update Dev Specs + Specify the Backend)*
- Labels: backend, documentation, prerequisite, week-1
- Assignee: acabrera04
- Due: March 4
- Depends on: #1

**3. Database Schema & Prisma Migrations**
- Define Prisma schema: users, servers, channels, messages, attachments, visibility_audit_log
- Create visibility_enum (PUBLIC_INDEXABLE, PUBLIC_NO_INDEX, PRIVATE)
- All indexes from dev specs (partial indexes, composite indexes)
- Initial migration
- Labels: backend, setup, prerequisite, week-1
- Assignee: declanblanc
- Due: March 4
- Depends on: #1, #2

**4. Authentication System — JWT Register/Login/Logout**
- POST /api/auth/register, POST /api/auth/login, POST /api/auth/logout
- JWT token generation + refresh tokens
- bcrypt password hashing
- Auth middleware for protected routes
- Zod input validation
- Labels: backend, feature, prerequisite, week-1
- Assignee: Aiden-Barrera
- Due: March 5
- Depends on: #1, #2, #3

**5. User Service & API**
- User CRUD via tRPC: getUser, updateUser, getCurrentUser
- Public profile flag (public_profile boolean)
- User status management (online/idle/dnd/offline)
- Labels: backend, feature, week-1
- Assignee: FardeenI
- Due: March 5
- Depends on: #2, #3

**6. Server Service & API**
- Server CRUD via tRPC: getServers, getServer(slug), createServer, updateServer, deleteServer
- Auto-slug generation from name
- Member count tracking
- Owner relationship to users
- is_public flag for server-level publicity
- Labels: backend, feature, week-1
- Assignee: AvanishKulkarni
- Due: March 5
- Depends on: #2, #3

**7. Channel Service & API**
- Channel CRUD via tRPC: getChannels(serverId), getChannel(slug), createChannel, updateChannel, deleteChannel
- ChannelType enum support (TEXT, VOICE, ANNOUNCEMENT) — filter and group by type
- Visibility enum (PUBLIC_INDEXABLE, PUBLIC_NO_INDEX, PRIVATE)
- Enforce VOICE channels cannot be PUBLIC_INDEXABLE (must be PUBLIC_NO_INDEX or PRIVATE)
- Position ordering, slug uniqueness per server
- Default channel creation on server create
- Labels: backend, feature, week-1
- Assignee: declanblanc
- Due: March 6
- Depends on: #2, #3

**8. Message Service & API**
- Message CRUD via tRPC: getMessages(channelId, pagination), sendMessage, editMessage, deleteMessage (soft delete)
- Cursor-based pagination (20 per page default, configurable)
- Author snapshot embedding
- Attachment metadata support
- Message pinning: pinMessage, unpinMessage, getPinnedMessages(channelId) — add `pinned` boolean + `pinnedAt` timestamp to message schema
- Labels: backend, feature, week-1
- Assignee: FardeenI
- Due: March 6
- Depends on: #2, #3

**9. Role-Based Permission & Authorization System**
- Permission service: checkPermission(userId, serverId, action)
- Roles: owner, admin, moderator, member, guest
- Permission matrix (who can CRUD servers, channels, messages, settings)
- tRPC middleware for route-level authorization
- Labels: backend, feature, prerequisite, week-1
- Assignee: Aiden-Barrera
- Due: March 6
- Depends on: #4, #5

**10. Server Membership Service**
- Join/leave server, member listing
- Role assignment per server (owner, admin, moderator, member)
- Member count sync
- getServerMembers(serverId) with role info
- Labels: backend, feature, week-1
- Assignee: AvanishKulkarni
- Due: March 6
- Depends on: #5, #6

**11. Database Seed Data**
- Port existing mock data (users, servers, channels, messages) to Prisma seed script
- Match existing frontend mock IDs/slugs for backward compatibility
- Include test users with different roles
- Labels: backend, setup, week-1
- Assignee: acabrera04
- Due: March 6
- Depends on: #3

---

### 🔐 FEATURE: Channel Visibility Toggle — Week 2 (March 9–11)

**12. Channel Visibility Toggle Service**
- ChannelVisibilityService: updateVisibility(channelId, newVisibility)
- State machine validation (all transitions valid per spec)
- Permission check: only server owner/admin can toggle
- Update indexed_at timestamp when toggling to PUBLIC_INDEXABLE
- Clear indexed_at when going PRIVATE
- Emit VISIBILITY_CHANGED event
- Labels: backend, feature, week-2
- Assignee: declanblanc
- Due: March 10
- Depends on: #7, #9

**13. Visibility Audit Log Service**
- AuditLogService: logVisibilityChange(channelId, actorId, oldValue, newValue, ipAddress)
- AuditLogRepository with pagination
- getVisibilityAuditLog(channelId, { limit, offset, startDate })
- Store IP address and user agent for compliance
- 7-year retention policy notation in schema
- Labels: backend, feature, week-2
- Assignee: Aiden-Barrera
- Due: March 10
- Depends on: #12

**14. Sitemap & SEO Data Endpoints**
- GET /sitemap/{serverSlug}.xml — dynamic sitemap of PUBLIC_INDEXABLE channels
- GET /robots.txt — allow crawling of /c/ routes
- IndexingService: addToSitemap, removeFromSitemap
- Update sitemap on visibility change events
- Labels: backend, feature, week-2
- Assignee: AvanishKulkarni
- Due: March 11
- Depends on: #12

---

### 👁️ FEATURE: Guest Public Channel View — Week 2 (March 9–11)

**15. Public REST API — Channel & Server Endpoints**
- GET /api/public/servers/{serverSlug} → PublicServerDTO
- GET /api/public/servers/{serverSlug}/channels → PublicChannelDTO[]
- GET /api/public/channels/{channelId}/messages → paginated PublicMessageDTO[]
- GET /api/public/channels/{channelId}/messages/{messageId} → single PublicMessageDTO
- No auth required, visibility check on every request
- Labels: backend, feature, week-2
- Assignee: FardeenI
- Due: March 10
- Depends on: #6, #7, #8

**16. Redis Caching Layer**
- Cache middleware for public API responses
- Key patterns from spec: channel:{id}:visibility (3600s), channel:msgs:{id}:page:{page} (60s), server:{id}:info (300s)
- Cache invalidation on mutations (write-through)
- Stale-while-revalidate pattern
- Labels: backend, feature, week-2
- Assignee: AvanishKulkarni
- Due: March 11
- Depends on: #1

**17. Rate Limiting Middleware**
- Token bucket rate limiting
- Human users: 100 req/min per IP
- Verified bots (Googlebot, Bingbot): 1000 req/min
- 429 Too Many Requests with Retry-After header
- Bot detection via User-Agent
- Labels: backend, feature, week-2
- Assignee: declanblanc
- Due: March 11
- Depends on: #1

**18. Event Bus — Redis Pub/Sub for Cross-Service Events**
- VISIBILITY_CHANGED event publishing and subscribing
- MESSAGE_CREATED / MESSAGE_EDITED / MESSAGE_DELETED events
- Cache invalidation triggered by events
- Decouple services via event-driven architecture
- Labels: backend, feature, week-2
- Assignee: acabrera04
- Due: March 11
- Depends on: #16

**19. Attachment Service & File Storage**
- Attachment metadata CRUD (create, list by message)
- File upload endpoint using S3-compatible storage interface (use local filesystem or MinIO for dev, swaps to real S3 on AWS)
- Content-type and size validation
- URL generation for serving attachments
- Wire into message service for attachment embedding
- Labels: backend, feature, week-2
- Assignee: FardeenI
- Due: March 11
- Depends on: #8

---

### 🔌 FRONTEND-BACKEND INTEGRATION — Week 2 (March 10–13)

**20. Frontend Integration — Authentication**
- Replace mock authService with real API calls
- JWT token storage (httpOnly cookies)
- Auto-refresh token logic
- Update AuthContext to use real endpoints (login, register, logout, getCurrentUser, updateCurrentUser)
- Wire UserSettingsPage profile editing (displayName, status) + logout flow
- Redirect flows on 401
- Labels: backend, integration, week-2
- Assignee: Aiden-Barrera
- Due: March 12
- Depends on: #4

**21. Frontend Integration — Servers & Channels**
- Replace mock serverService + channelService with real tRPC/API calls
- Update ALL server actions: createServerAction, saveServerSettings, deleteServerAction, saveChannelSettings, createChannelAction
- Wire server member list display
- Handle loading/error states properly
- Labels: backend, integration, week-2
- Assignee: declanblanc
- Due: March 12
- Depends on: #6, #7

**22. Frontend Integration — Messages**
- Replace mock messageService with real tRPC/API calls
- Wire cursor-based pagination to real API
- Wire sendMessage + deleteMessage
- Handle optimistic updates for message send
- Labels: backend, integration, week-2
- Assignee: FardeenI
- Due: March 12
- Depends on: #8

**23. Frontend Integration — Guest Public Channel View**
- Wire /c/{serverSlug}/{channelSlug} route to public REST API
- Wire isChannelGuestAccessible() for post-logout redirect logic
- Proper error handling: 403 (private) → login prompt, 404 → not found
- Cache-Control + X-Robots-Tag headers from API responses
- SEO metadata from real backend data
- Labels: backend, integration, week-2
- Assignee: acabrera04
- Due: March 13
- Depends on: #15

**24. Frontend Integration — Channel Visibility Toggle**
- Wire ChannelSettingsPage visibility section to real tRPC API
- Implement confirmation dialog for visibility changes
- Display audit log from real backend
- Handle optimistic updates + error rollback
- Labels: backend, integration, week-2
- Assignee: AvanishKulkarni
- Due: March 13
- Depends on: #12, #13, #21

---

### 🧹 QUALITY & POLISH — Week 2 (March 12–13)

**25. API Input Validation & Error Handling**
- Zod schemas for all tRPC + REST inputs
- Consistent error response format (code, message, details)
- 400/401/403/404/429/500 error handling
- Input sanitization for all user-provided strings
- Labels: backend, feature, week-2
- Assignee: acabrera04
- Due: March 12
- Depends on: #4, #15

**26. Next.js Auth Middleware — Server-Side Route Protection**
- Add Next.js middleware to protect /settings/* and /channels/* routes server-side
- Verify JWT from httpOnly cookie before rendering protected pages
- Redirect unauthenticated users to /auth/login immediately (no client-side spinner)
- Redirect non-admin users away from /settings/* routes
- Fixes GitHub issue #71 (3–4s spinner delay before redirect)
- Labels: backend, feature, week-2
- Assignee: declanblanc
- Due: March 13
- Depends on: #4, #20

---

### 🎙️ FEATURE: Voice Channels — Week 2 (March 10–13)

**28. Twilio Voice Service — Real-Time Audio for Voice Channels**
- Integrate Twilio Programmable Video SDK (group rooms = voice channels)
- POST /voice/token — generate Twilio access token for authenticated user + specific room
- Room lifecycle: auto-create Twilio room when first user joins a voice channel, destroy when empty
- Voice state tracking in Redis: who's in which room, muted/deafened status
- Publish events via Event Bus (#18): `user-joined-voice`, `user-left-voice`, `voice-state-changed`
- GET /voice/participants/:channelId — list users currently in a voice channel
- Mock Twilio service for local dev/testing (no real Twilio API calls needed locally)
- Labels: backend, feature, week-2
- Assignee: Aiden-Barrera
- Due: March 12
- Depends on: #4, #7, #18

**29. Frontend Integration — Voice Channels (Stretch Goal)**
- Wire Twilio Client JS SDK into voice channel click handler (join room on click)
- Connect existing mute/deafen toggles in UserStatusBar to real Twilio track enable/disable
- Show connected users list under each voice channel in ChannelSidebar
- Speaking indicator using Twilio `dominantSpeaker` event
- Active voice state in UserStatusBar (show "Connected to #channel-name", disconnect button)
- Leave voice channel on disconnect or channel switch
- Labels: backend, integration, week-2
- Assignee: Aiden-Barrera
- Due: March 13
- Depends on: #28

---

### 📄 P4 DELIVERABLES — Documentation (March 13)

**27. Backend README — Setup & Operations Guide**
- Create README.md in backend directory targeting SRE audience
- List every dependency on external library, framework, technology, or service
- Describe what databases are created, read from, and written to
- Document how to install, startup, stop, and reset the backend services and data storage
- Include Docker Compose usage, environment variables, migration commands, seed commands
- Written after implementation is complete so it reflects what was actually built
- *(P4 Deliverable #2: Wrap-Up item 4)*
- Labels: backend, documentation, week-2
- Assignee: AvanishKulkarni
- Due: March 13
- Depends on: #1, #3, #4, #7, #8

---

## Assignment Summary

| Developer | Issues | Focus Area |
|-----------|--------|------------|
| acabrera04 | #1, #2, #11, #18, #23, #25 | Scaffold, dev specs/arch doc, seeds, event bus, guest FE, validation |
| Aiden-Barrera | #4, #9, #13, #20, #28, #29 | Auth, permissions, audit log, auth FE, Twilio voice |
| AvanishKulkarni | #6, #10, #14, #16, #24, #27 | Servers, membership, SEO/sitemap, caching, visibility FE, README |
| declanblanc | #3, #7, #12, #17, #21, #26 | DB schema, channels (+ voice type), visibility service, rate limiting, server/channel FE, auth middleware |
| FardeenI | #5, #8, #15, #19, #22 | Users, messages (+ pinning), public API, attachments, message FE integration |

## Dependency Graph (simplified)
```
#1 Scaffold ─► #2 Dev Specs & Architecture ─┬─► #3 DB Schema ─┬─► #5 Users ──► #9 Permissions ──► #12 Visibility ──► #13 Audit Log
                                             │                 ├─► #6 Servers                                       ──► #14 SEO
                                             │                 ├─► #7 Channels                                      ──► #15 Public API
                                             │                 ├─► #8 Messages (+ pinning)                          ──► #19 Attachments
                                             │                 ├─► #10 Membership
                                             │                 └─► #11 Seeds
                                             │
                                             └─► #4 Auth ──► #9 Permissions
                                                          ──► #20 FE Auth ──► #26 Auth Middleware
                                                          ──► #25 Validation
                                                          ──► #28 Twilio Voice ──► #29 FE Voice (stretch)

#1 Scaffold ──► #16 Redis Cache ──► #18 Event Bus ──► #28 Twilio Voice
            ──► #17 Rate Limiting

#6,#7 ──► #21 FE Servers/Channels
#8 ──► #22 FE Messages
#15 ──► #23 FE Guest View
#12,#13,#21 ──► #24 FE Visibility
#1,#3,#4,#7,#8 ──► #27 Backend README
```
