# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Harmony is a search engine indexable chat application. The project is currently in the **specification/design phase** — detailed dev specs exist but source code implementation has not yet begun.

The three feature specifications in `docs/` define the full architecture:
- **Channel Visibility Toggle** — Admin controls for public/private/indexable channel states
- **Guest Public Channel View** — Anonymous SSR access to public channels via direct URL
- **SEO Meta Tag Generation** — Automatic meta tags, Open Graph, Twitter Cards, JSON-LD structured data

## Target Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | TypeScript 5.3+ |
| Frontend | React 18.2+, TailwindCSS 3.4+ |
| Framework | Next.js 14+ (SSR/SSG, API routes) |
| Runtime | Node.js 20 LTS |
| Database | PostgreSQL 16+ |
| ORM | Prisma 5.8+ |
| API | tRPC 10.45+ |
| Validation | Zod 3.22+ |
| Cache | Redis 7.2+ |
| Testing | Jest 29+, Playwright 1.40+ |
| Infra | Docker 24+, CloudFlare CDN |

## Architecture

The system follows a layered architecture:

1. **Client Layer** — React components (Admin Dashboard, Public Channel Viewer, Client Services)
2. **API Gateway** — ChannelController (authenticated) and PublicAccessController (unauthenticated)
3. **Business Logic** — ChannelVisibilityService, IndexingService, PermissionService, AuditLogService, MetaTagService
4. **Data Access** — Repositories with Redis caching (1h TTL for visibility, 5m TTL for public channel lists)
5. **Infrastructure** — PostgreSQL tables + Redis cache + CloudFlare edge

### Channel Visibility State Machine

Channels have three states with strict transitions:
```
PRIVATE <-> PUBLIC_NO_INDEX <-> PUBLIC_INDEXABLE
```
Each transition triggers side effects: sitemap regeneration, search engine notifications (Google/Bing APIs), cache invalidation, and audit logging.

### Key URL Routes

- `GET /c/{serverSlug}/{channelSlug}` — Public channel page (SSR, unauthenticated)
- `PATCH /api/channels/{channelId}/visibility` — Update visibility (admin)
- `GET /sitemap/{serverSlug}.xml` — Dynamic sitemap per server

### Authorization Model

RBAC with roles: Owner > Admin > Moderator > Member > Anonymous. Only Owner and Admin can modify channel visibility. Anonymous users can view PUBLIC_INDEXABLE and PUBLIC_NO_INDEX channels.

## Development Specifications

The `docs/` directory contains comprehensive dev specs (~400KB total) that serve as the implementation blueprint. Each spec includes: architecture diagrams, class models, state machines, API contracts, database schemas, sequence diagrams, test strategies, and failure handling. **Always consult the relevant dev spec before implementing a feature.**

## Repository

- **Remote:** github.com/acabrera04/Harmony
- **Main branch:** `main`
