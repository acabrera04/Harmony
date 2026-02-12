# Development Specification: Channel Visibility Toggle

## Feature: Public/Indexable Channel Control

**User Story:** As a Community Administrator, I want to toggle specific channels as "Public/Indexable" or "Private," so that I can control which parts of my community are exposed to the open web while keeping sensitive social conversations private.

---

## 1. Header

### Version and Date

| Version | Date       | Description                              |
|---------|------------|------------------------------------------|
| 1.0     | 2026-02-12 | Initial development specification        |

### Author and Role

| Author        | Role                    | Version |
|---------------|-------------------------|---------|
| Claude (AI)   | Specification Author    | 1.0     |
| dblanc        | Project Lead            | 1.0     |

---

## 2. Architecture Diagram

### 2.1 System Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              LEGEND                                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌──────┐  Module/Component    ─────►  Data Flow                                │
│  │      │                      ─ ─ ─►  Optional/Conditional Flow                │
│  └──────┘                      ══════  Bidirectional Flow                       │
│  [      ]  External System     Blue: Client Layer  Green: Server Layer          │
│  (      )  Data Store          Orange: Cloud Services  Gray: External           │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER (Browser/App)                             │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M1 Admin Dashboard Module                                                  │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C1.1 ChannelSettingsView    │    │ C1.2 VisibilityToggleComponent  │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ channelId: string           │    │ isPublic: boolean               │   │  │
│  │  │ channelName: string         │    │ isLoading: boolean              │   │  │
│  │  │ currentVisibility: enum     │    │ errorMessage: string            │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ render()                    │◄───│ onToggle()                      │   │  │
│  │  │ loadChannelSettings()       │    │ validatePermissions()           │   │  │
│  │  │ handleVisibilityChange()    │    │ render()                        │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M2 Public Channel Viewer Module                                            │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C2.1 PublicChannelView      │    │ C2.2 MessageListComponent       │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ serverId: string            │    │ messages: Message[]             │   │  │
│  │  │ channelId: string           │    │ isAnonymous: boolean            │   │  │
│  │  │ isAuthenticated: boolean    │    │ pagination: PaginationState     │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ render()                    │◄───│ render()                        │   │  │
│  │  │ fetchPublicMessages()       │    │ loadMore()                      │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M3 Client Services Module                                                  │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C3.1 ChannelService         │    │ C3.2 AuthService                │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ apiClient: ApiClient        │    │ currentUser: User               │   │  │
│  │  │ ─────────────────────────── │    │ token: string                   │   │  │
│  │  │ getChannel()                │    │ ─────────────────────────────── │   │  │
│  │  │ updateVisibility()          │    │ isAuthenticated()               │   │  │
│  │  │ getPublicChannels()         │    │ hasPermission()                 │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ HTTPS/WebSocket
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           SERVER LAYER (Application Server)                      │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M4 API Gateway Module                                                      │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C4.1 ChannelController      │    │ C4.2 PublicAccessController     │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ channelService: ref         │    │ channelService: ref             │   │  │
│  │  │ authMiddleware: ref         │    │ cacheService: ref               │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ getChannelSettings()        │    │ getPublicChannel()              │   │  │
│  │  │ updateChannelVisibility()   │    │ getPublicMessages()             │   │  │
│  │  │ validateAdminAccess()       │    │ generateSitemap()               │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M5 Business Logic Module                                                   │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C5.1 ChannelVisibilityService│   │ C5.2 IndexingService            │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ channelRepository: ref      │    │ sitemapGenerator: ref           │   │  │
│  │  │ auditLogger: ref            │    │ searchEngineNotifier: ref       │   │  │
│  │  │ eventBus: ref               │    │ ─────────────────────────────── │   │  │
│  │  │ ─────────────────────────── │    │ updateSitemap()                 │   │  │
│  │  │ setVisibility()             │    │ notifySearchEngines()           │   │  │
│  │  │ getVisibility()             │    │ generateCanonicalUrl()          │   │  │
│  │  │ validateTransition()        │    │ getRobotsDirectives()           │   │  │
│  │  │ emitVisibilityChange()      │    └─────────────────────────────────┘   │  │
│  │  └─────────────────────────────┘                                          │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C5.3 PermissionService      │    │ C5.4 AuditLogService            │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ roleRepository: ref         │    │ logRepository: ref              │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ canManageChannel()          │    │ logVisibilityChange()           │   │  │
│  │  │ isServerAdmin()             │    │ getAuditHistory()               │   │  │
│  │  │ getEffectivePermissions()   │    │ exportAuditLog()                │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M6 Data Access Module                                                      │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C6.1 ChannelRepository      │    │ C6.2 AuditLogRepository         │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ database: DatabaseClient    │    │ database: DatabaseClient        │   │  │
│  │  │ cache: CacheClient          │    │ ─────────────────────────────── │   │  │
│  │  │ ─────────────────────────── │    │ create()                        │   │  │
│  │  │ findById()                  │    │ findByChannelId()               │   │  │
│  │  │ update()                    │    │ findByDateRange()               │   │  │
│  │  │ findPublicByServerId()      │    └─────────────────────────────────┘   │  │
│  │  │ invalidateCache()           │                                          │  │
│  │  └─────────────────────────────┘                                          │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ Database Protocol
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           DATA LAYER (Cloud Infrastructure)                      │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M7 Persistence Module                                                      │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ D7.1 ChannelTable           │    │ D7.2 AuditLogTable              │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ id: UUID (PK)               │    │ id: UUID (PK)                   │   │  │
│  │  │ server_id: UUID (FK)        │    │ channel_id: UUID (FK)           │   │  │
│  │  │ name: VARCHAR(100)          │    │ actor_id: UUID (FK)             │   │  │
│  │  │ visibility: ENUM            │    │ action: VARCHAR(50)             │   │  │
│  │  │ indexed_at: TIMESTAMP       │    │ old_value: JSONB                │   │  │
│  │  │ created_at: TIMESTAMP       │    │ new_value: JSONB                │   │  │
│  │  │ updated_at: TIMESTAMP       │    │ timestamp: TIMESTAMP            │   │  │
│  │  └─────────────────────────────┘    │ ip_address: INET                │   │  │
│  │                                     └─────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M8 Cache Module                                                            │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ D8.1 ChannelVisibilityCache │    │ D8.2 PublicChannelListCache     │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ key: channel:{id}:visibility│    │ key: server:{id}:public_channels│   │  │
│  │  │ value: VisibilityEnum       │    │ value: ChannelId[]              │   │  │
│  │  │ ttl: 3600 seconds           │    │ ttl: 300 seconds                │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ HTTP/API
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           EXTERNAL SYSTEMS                                       │
│  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────┐  │
│  │ [E1 Search Engine Bots] │  │ [E2 Sitemap Consumers]  │  │ [E3 CDN]        │  │
│  │ Google, Bing, DuckDuckGo│  │ Search Console APIs     │  │ CloudFlare      │  │
│  └─────────────────────────┘  └─────────────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Information Flow Summary

| Flow ID | Source | Destination | Data | Protocol |
|---------|--------|-------------|------|----------|
| F1 | C1.2 VisibilityToggleComponent | C4.1 ChannelController | VisibilityUpdateRequest | HTTPS REST |
| F2 | C4.1 ChannelController | C5.1 ChannelVisibilityService | VisibilityChangeCommand | Internal Call |
| F3 | C5.1 ChannelVisibilityService | C6.1 ChannelRepository | Channel Entity | Database Protocol |
| F4 | C5.1 ChannelVisibilityService | C5.2 IndexingService | IndexingEvent | Event Bus |
| F5 | C5.2 IndexingService | E1 Search Engine Bots | Sitemap XML | HTTPS |
| F6 | C4.2 PublicAccessController | E3 CDN | Cached Public Content | HTTPS |
| F7 | C5.1 ChannelVisibilityService | C5.4 AuditLogService | AuditEntry | Internal Call |

---

## 3. Class Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              LEGEND                                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ────────►  Inheritance (extends)                                               │
│  - - - - ►  Implementation (implements)                                         │
│  ─────────  Association                                                         │
│  ◆─────────  Composition (owns)                                                 │
│  ◇─────────  Aggregation (uses)                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

                            ┌───────────────────────────┐
                            │    <<interface>>          │
                            │  CL1.1 IVisibilityToggle  │
                            ├───────────────────────────┤
                            │ + setVisibility()         │
                            │ + getVisibility()         │
                            │ + canChangeVisibility()   │
                            └─────────────┬─────────────┘
                                          │
                          - - - - - - - - ┼ - - - - - - - -
                                          │
                            ┌─────────────▼─────────────┐
                            │ CL1.2 ChannelVisibility   │
                            │        Service            │
                            ├───────────────────────────┤
                            │ - channelRepository       │
                            │ - auditLogger             │
                            │ - eventBus                │
                            │ - permissionService       │
                            ├───────────────────────────┤
                            │ + setVisibility()         │
                            │ + getVisibility()         │
                            │ + canChangeVisibility()   │
                            │ - validateTransition()    │
                            │ - emitVisibilityChange()  │
                            └───────────┬───────────────┘
                                        │
                 ┌──────────────────────┼──────────────────────┐
                 │                      │                      │
                 ◇                      ◇                      ◇
    ┌────────────▼────────────┐ ┌───────▼───────────┐ ┌───────▼───────────┐
    │CL2.1 ChannelRepository  │ │CL2.2 AuditLog     │ │CL2.3 Permission   │
    │                         │ │      Service      │ │      Service      │
    ├─────────────────────────┤ ├───────────────────┤ ├───────────────────┤
    │ - database              │ │ - logRepository   │ │ - roleRepository  │
    │ - cache                 │ ├───────────────────┤ ├───────────────────┤
    ├─────────────────────────┤ │ + logChange()     │ │ + canManage()     │
    │ + findById()            │ │ + getHistory()    │ │ + isAdmin()       │
    │ + update()              │ │ + export()        │ │ + getPermissions()│
    │ + findPublicByServer()  │ └───────────────────┘ └───────────────────┘
    │ - invalidateCache()     │
    └────────────┬────────────┘
                 │
                 ◆
    ┌────────────▼────────────┐
    │  CL3.1 Channel          │
    │  <<Entity>>             │
    ├─────────────────────────┤
    │ + id: UUID              │
    │ + serverId: UUID        │
    │ + name: string          │
    │ + visibility: Enum      │
    │ + indexedAt: DateTime   │
    │ + createdAt: DateTime   │
    │ + updatedAt: DateTime   │
    ├─────────────────────────┤
    │ + isPublic()            │
    │ + isIndexable()         │
    │ + setVisibility()       │
    └─────────────────────────┘

                            ┌───────────────────────────┐
                            │ CL4.1 ChannelVisibility   │
                            │ <<Enumeration>>           │
                            ├───────────────────────────┤
                            │ PUBLIC_INDEXABLE          │
                            │ PUBLIC_NO_INDEX           │
                            │ PRIVATE                   │
                            └───────────────────────────┘

    ┌─────────────────────────┐         ┌─────────────────────────┐
    │  CL5.1 VisibilityChange │         │  CL5.2 AuditLogEntry    │
    │  Event                  │         │  <<Entity>>             │
    │  <<Event>>              │         ├─────────────────────────┤
    ├─────────────────────────┤         │ + id: UUID              │
    │ + channelId: UUID       │         │ + channelId: UUID       │
    │ + oldVisibility: Enum   │         │ + actorId: UUID         │
    │ + newVisibility: Enum   │         │ + action: string        │
    │ + actorId: UUID         │         │ + oldValue: JSON        │
    │ + timestamp: DateTime   │         │ + newValue: JSON        │
    └─────────────────────────┘         │ + timestamp: DateTime   │
                                        │ + ipAddress: string     │
                                        └─────────────────────────┘

    ┌─────────────────────────┐         ┌─────────────────────────┐
    │  CL6.1 Indexing         │────────►│  CL6.2 SitemapGenerator │
    │  Service                │         ├─────────────────────────┤
    ├─────────────────────────┤         │ - publicChannelRepo     │
    │ - sitemapGenerator      │         ├─────────────────────────┤
    │ - searchEngineNotifier  │         │ + generate()            │
    ├─────────────────────────┤         │ + getLastModified()     │
    │ + updateSitemap()       │         │ - formatEntry()         │
    │ + notifyEngines()       │         └─────────────────────────┘
    │ + getCanonicalUrl()     │
    │ + getRobotsDirectives() │
    └─────────────────────────┘
```

---

## 4. List of Classes

### 4.1 Client Module (M1, M2, M3)

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-C1.1 | ChannelSettingsView | View Component | Renders the channel settings page where administrators can manage channel properties including visibility |
| CL-C1.2 | VisibilityToggleComponent | UI Component | Interactive toggle control for switching between Public/Indexable and Private states with confirmation dialog |
| CL-C2.1 | PublicChannelView | View Component | Renders publicly accessible channel content for anonymous users and search engine crawlers |
| CL-C2.2 | MessageListComponent | UI Component | Displays paginated list of messages in public channels with SEO-optimized markup |
| CL-C3.1 | ChannelService | Service | Client-side service for channel-related API calls including visibility updates |
| CL-C3.2 | AuthService | Service | Manages authentication state and permission checking on the client |

### 4.2 API Gateway Module (M4)

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-C4.1 | ChannelController | Controller | Handles authenticated API requests for channel management operations |
| CL-C4.2 | PublicAccessController | Controller | Handles unauthenticated requests for public channel content and sitemaps |

### 4.3 Business Logic Module (M5)

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-C5.1 | ChannelVisibilityService | Service | Core business logic for visibility state changes, validation, and event emission |
| CL-C5.2 | IndexingService | Service | Manages search engine indexing, sitemap generation, and crawler notifications |
| CL-C5.3 | PermissionService | Service | Validates user permissions for channel management operations |
| CL-C5.4 | AuditLogService | Service | Records and retrieves audit trail for visibility changes |

### 4.4 Data Access Module (M6)

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-C6.1 | ChannelRepository | Repository | Data access layer for Channel entities with caching |
| CL-C6.2 | AuditLogRepository | Repository | Data access layer for audit log entries |

### 4.5 Data Structures (Entities/DTOs)

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-D1 | Channel | Entity | Domain entity representing a channel with visibility state |
| CL-D2 | AuditLogEntry | Entity | Domain entity representing a single audit log record |
| CL-D3 | VisibilityChangeEvent | Event | Event object emitted when visibility changes |
| CL-D4 | ChannelVisibility | Enumeration | Enum defining possible visibility states |
| CL-D5 | VisibilityUpdateRequest | DTO | Request payload for visibility update API |
| CL-D6 | VisibilityUpdateResponse | DTO | Response payload for visibility update API |
| CL-D7 | PublicChannelDTO | DTO | Public-facing channel data without sensitive fields |

---

## 5. State Diagrams

### 5.1 System State Variables

| Variable | Type | Description |
|----------|------|-------------|
| channel.visibility | ChannelVisibility | Current visibility state of the channel |
| channel.indexedAt | DateTime | Timestamp when channel was last indexed |
| sitemap.lastModified | DateTime | Timestamp of last sitemap update |
| auditLog.entries | AuditLogEntry[] | Collection of audit records |

### 5.2 Channel Visibility State Machine

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              LEGEND                                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│  (( ))  Initial State                                                           │
│  [   ]  State                                                                   │
│  < >    Decision                                                                │
│  ─────► Transition                                                              │
└─────────────────────────────────────────────────────────────────────────────────┘

                              (( S0: Channel Created ))
                                        │
                                        │ Default: visibility = PRIVATE
                                        ▼
                        ┌───────────────────────────────┐
                        │      S1: PRIVATE              │
                        │ ───────────────────────────── │
                        │ visibility = PRIVATE          │
                        │ indexedAt = null              │
                        │ robots = "noindex, nofollow"  │
                        └───────────────┬───────────────┘
                                        │
        ┌───────────────────────────────┼───────────────────────────────┐
        │                               │                               │
        │ Admin calls                   │ Admin calls                   │
        │ setVisibility(PUBLIC_NO_INDEX)│ setVisibility(PUBLIC_INDEXABLE)
        ▼                               │                               ▼
┌───────────────────────┐               │               ┌───────────────────────┐
│ S2: PUBLIC_NO_INDEX   │               │               │ S3: PUBLIC_INDEXABLE  │
│ ───────────────────── │               │               │ ───────────────────── │
│ visibility =          │               │               │ visibility =          │
│   PUBLIC_NO_INDEX     │               │               │   PUBLIC_INDEXABLE    │
│ indexedAt = null      │◄──────────────┘               │ indexedAt = now()     │
│ robots = "noindex"    │                               │ robots = "index,follow"│
└───────────┬───────────┘                               └───────────┬───────────┘
            │                                                       │
            │ setVisibility(PUBLIC_INDEXABLE)                       │
            ├──────────────────────────────────────────────────────►│
            │                                                       │
            │◄──────────────────────────────────────────────────────┤
            │ setVisibility(PUBLIC_NO_INDEX)                        │
            │                                                       │
            │                   setVisibility(PRIVATE)              │
            └───────────────────────────┬───────────────────────────┘
                                        │
                                        ▼
                        ┌───────────────────────────────┐
                        │      S1: PRIVATE              │
                        │ ───────────────────────────── │
                        │ (State loops back)            │
                        │ + Request removal from index  │
                        │ + Update sitemap              │
                        └───────────────────────────────┘

State Transition Table:
┌──────────────────────┬────────────────────────┬──────────────────────┬──────────────────────────────┐
│ Current State        │ Action                 │ Next State           │ Side Effects                 │
├──────────────────────┼────────────────────────┼──────────────────────┼──────────────────────────────┤
│ S1: PRIVATE          │ setVisibility(PUB_IDX) │ S3: PUBLIC_INDEXABLE │ Add to sitemap, notify bots  │
│ S1: PRIVATE          │ setVisibility(PUB_NO)  │ S2: PUBLIC_NO_INDEX  │ None                         │
│ S2: PUBLIC_NO_INDEX  │ setVisibility(PRIVATE) │ S1: PRIVATE          │ None                         │
│ S2: PUBLIC_NO_INDEX  │ setVisibility(PUB_IDX) │ S3: PUBLIC_INDEXABLE │ Add to sitemap, notify bots  │
│ S3: PUBLIC_INDEXABLE │ setVisibility(PRIVATE) │ S1: PRIVATE          │ Remove from sitemap, request │
│                      │                        │                      │ de-indexing                  │
│ S3: PUBLIC_INDEXABLE │ setVisibility(PUB_NO)  │ S2: PUBLIC_NO_INDEX  │ Remove from sitemap, add     │
│                      │                        │                      │ noindex header               │
└──────────────────────┴────────────────────────┴──────────────────────┴──────────────────────────────┘
```

### 5.3 Admin Action State Diagram

```
                              (( A0: Admin Views Channel ))
                                        │
                                        ▼
                        ┌───────────────────────────────┐
                        │ A1: Settings Page Loaded      │
                        │ ───────────────────────────── │
                        │ channelData = loaded          │
                        │ toggleState = current         │
                        │ isLoading = false             │
                        └───────────────┬───────────────┘
                                        │
                                        │ Admin clicks toggle
                                        ▼
                        ┌───────────────────────────────┐
                        │ A2: Confirmation Dialog       │
                        │ ───────────────────────────── │
                        │ dialogOpen = true             │
                        │ pendingVisibility = new       │
                        └───────────────┬───────────────┘
                                        │
                        ┌───────────────┴───────────────┐
                        │                               │
                        │ Cancel                        │ Confirm
                        ▼                               ▼
        ┌───────────────────────┐       ┌───────────────────────────────┐
        │ A1: Settings Page     │       │ A3: Updating                  │
        │ (Return to loaded)    │       │ ───────────────────────────── │
        └───────────────────────┘       │ isLoading = true              │
                                        │ toggleState = pending         │
                                        └───────────────┬───────────────┘
                                                        │
                                        ┌───────────────┴───────────────┐
                                        │                               │
                                        │ API Error                     │ API Success
                                        ▼                               ▼
                        ┌───────────────────────┐       ┌───────────────────────────────┐
                        │ A4: Error State       │       │ A5: Success State             │
                        │ ───────────────────── │       │ ───────────────────────────── │
                        │ isLoading = false     │       │ isLoading = false             │
                        │ errorMessage = msg    │       │ channelData.visibility = new  │
                        │ toggleState = prev    │       │ successMessage = shown        │
                        └───────────┬───────────┘       └───────────────┬───────────────┘
                                    │                                   │
                                    └───────────────┬───────────────────┘
                                                    │
                                                    │ After 3s / User dismisses
                                                    ▼
                                    ┌───────────────────────────────┐
                                    │ A1: Settings Page Loaded      │
                                    │ (Clean state)                 │
                                    └───────────────────────────────┘
```

---

## 6. Flow Charts

### 6.1 Scenario: Admin Sets Channel to Public/Indexable

**Scenario Description:** A community administrator navigates to channel settings and toggles a private channel to be publicly indexable. The system validates permissions, updates the database, regenerates the sitemap, and notifies search engines.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              LEGEND                                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│  (( ))   Start/End (Terminal)                                                   │
│  [   ]   Process                                                                │
│  < >     Decision                                                               │
│  /   /   Input/Output                                                           │
│  [===]   Predefined Process (Subroutine)                                        │
└─────────────────────────────────────────────────────────────────────────────────┘

        (( START: Admin opens channel settings ))  [State: A0]
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F1.1] Load channel data      │  [State: A1]
            │ Client.ChannelService.        │
            │   getChannel(channelId)       │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F1.2] Display current        │
            │ visibility toggle state       │
            └───────────────┬───────────────┘
                            │
                            ▼
            /───────────────────────────────/
            / Admin clicks "Make Public"   /
            / toggle switch                /
            /───────────────────────────────/
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F1.3] Show confirmation      │  [State: A2]
            │ dialog with implications      │
            │ "This channel will be         │
            │  visible to search engines"   │
            └───────────────┬───────────────┘
                            │
                            ▼
                    < F1.4: Admin confirms? >
                   /                         \
                  / No                    Yes \
                 ▼                             ▼
    ┌─────────────────────┐     ┌───────────────────────────────┐
    │ [F1.5] Close dialog │     │ [F1.6] Send API request       │  [State: A3]
    │ Return to settings  │     │ Client.ChannelService.        │
    └──────────┬──────────┘     │   updateVisibility(           │
               │                │     channelId,                │
               │                │     PUBLIC_INDEXABLE)         │
               │                └───────────────┬───────────────┘
               │                                │
               │                                ▼
               │                ┌───────────────────────────────┐
               │                │ [F1.7] Server validates       │
               │                │ JWT token                     │
               │                │ Server.AuthMiddleware.        │
               │                │   validateToken()             │
               │                └───────────────┬───────────────┘
               │                                │
               │                                ▼
               │                    < F1.8: Token valid? >
               │                   /                      \
               │                  / No                 Yes \
               │                 ▼                          ▼
               │    ┌─────────────────────┐  ┌───────────────────────────────┐
               │    │ [F1.9] Return 401   │  │ [F1.10] Check admin           │
               │    │ Unauthorized        │  │ permission                    │
               │    └──────────┬──────────┘  │ Server.PermissionService.     │
               │               │             │   canManageChannel(userId,    │
               │               │             │     channelId)                │
               │               │             └───────────────┬───────────────┘
               │               │                             │
               │               │                             ▼
               │               │                 < F1.11: Has permission? >
               │               │                /                         \
               │               │               / No                    Yes \
               │               │              ▼                             ▼
               │               │  ┌─────────────────────┐  ┌───────────────────────────────┐
               │               │  │ [F1.12] Return 403  │  │ [F1.13] Update channel        │
               │               │  │ Forbidden           │  │ visibility in database        │
               │               │  └──────────┬──────────┘  │ Server.ChannelVisibility      │
               │               │             │             │   Service.setVisibility()     │
               │               │             │             └───────────────┬───────────────┘
               │               │             │                             │
               │               │             │                             ▼
               │               │             │             ┌───────────────────────────────┐
               │               │             │             │ [F1.14] Create audit log      │
               │               │             │             │ entry                         │
               │               │             │             │ Server.AuditLogService.       │
               │               │             │             │   logVisibilityChange()       │
               │               │             │             └───────────────┬───────────────┘
               │               │             │                             │
               │               │             │                             ▼
               │               │             │             ┌───────────────────────────────┐
               │               │             │             │ [F1.15] Emit visibility       │
               │               │             │             │ change event                  │
               │               │             │             │ Server.EventBus.emit(         │
               │               │             │             │   VisibilityChangeEvent)      │
               │               │             │             └───────────────┬───────────────┘
               │               │             │                             │
               │               │             │                             ▼
               │               │             │             ┌───────────────────────────────┐
               │               │             │             │ [F1.16] Update sitemap        │  [State: S3]
               │               │             │             │ Server.IndexingService.       │
               │               │             │             │   updateSitemap()             │
               │               │             │             └───────────────┬───────────────┘
               │               │             │                             │
               │               │             │                             ▼
               │               │             │             ┌───────────────────────────────┐
               │               │             │             │ [F1.17] Notify search         │
               │               │             │             │ engines (async)               │
               │               │             │             │ Server.IndexingService.       │
               │               │             │             │   notifySearchEngines()       │
               │               │             │             └───────────────┬───────────────┘
               │               │             │                             │
               │               │             │                             ▼
               │               │             │             ┌───────────────────────────────┐
               │               │             │             │ [F1.18] Invalidate cache      │
               │               │             │             │ Server.ChannelRepository.     │
               │               │             │             │   invalidateCache(channelId)  │
               │               │             │             └───────────────┬───────────────┘
               │               │             │                             │
               │               │             │                             ▼
               │               │             │             ┌───────────────────────────────┐
               │               │             │             │ [F1.19] Return success        │
               │               │             │             │ response with updated         │
               │               │             │             │ channel data                  │
               │               │             │             └───────────────┬───────────────┘
               │               │             │                             │
               │               ▼             ▼                             ▼
               │         ┌───────────────────────────────────────────────────────┐
               │         │ [F1.20] Client receives response                      │
               │         └───────────────────────────────┬───────────────────────┘
               │                                         │
               │                                         ▼
               │                             < F1.21: Success response? >
               │                            /                            \
               │                           / No                       Yes \
               │                          ▼                                ▼
               │         ┌─────────────────────────┐     ┌───────────────────────────────┐
               │         │ [F1.22] Display error   │     │ [F1.23] Update UI toggle      │  [State: A5]
               │         │ message to admin        │     │ state to "Public"             │
               │         │ [State: A4]             │     │ Show success notification     │
               │         └──────────┬──────────────┘     └───────────────┬───────────────┘
               │                    │                                    │
               └────────────────────┴────────────────────────────────────┘
                                                │
                                                ▼
                            (( END: Channel is now public ))  [State: A1]
```

### 6.2 Scenario: Anonymous User Views Public Channel

**Scenario Description:** An anonymous user (including search engine crawler) requests a public channel page. The system verifies the channel is public and serves the content with appropriate SEO headers.

```
        (( START: Request to /c/{serverId}/{channelId} ))
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F2.1] Route request to       │
            │ PublicAccessController        │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F2.2] Check cache for        │
            │ channel visibility            │
            │ Server.Cache.get(             │
            │   channel:{id}:visibility)    │
            └───────────────┬───────────────┘
                            │
                            ▼
                    < F2.3: Cache hit? >
                   /                    \
                  / No                Yes \
                 ▼                         ▼
    ┌─────────────────────────┐    ┌───────────────────────┐
    │ [F2.4] Query database   │    │ [F2.5] Use cached     │
    │ for channel visibility  │    │ visibility value      │
    │ Server.ChannelRepo.     │    └───────────┬───────────┘
    │   findById(channelId)   │                │
    └──────────┬──────────────┘                │
               │                               │
               ▼                               │
    ┌─────────────────────────┐                │
    │ [F2.6] Cache result     │                │
    └──────────┬──────────────┘                │
               │                               │
               └───────────────┬───────────────┘
                               │
                               ▼
                   < F2.7: Channel exists? >
                  /                          \
                 / No                      Yes \
                ▼                               ▼
    ┌─────────────────────┐         < F2.8: Is PUBLIC_INDEXABLE
    │ [F2.9] Return 404   │                or PUBLIC_NO_INDEX? >
    │ Not Found           │        /                            \
    └──────────┬──────────┘       / No (PRIVATE)             Yes \
               │                 ▼                                 ▼
               │    ┌─────────────────────────┐    ┌───────────────────────────────┐
               │    │ [F2.10] Return 403      │    │ [F2.11] Fetch messages        │
               │    │ Forbidden OR redirect   │    │ Server.MessageRepository.     │
               │    │ to login                │    │   findByChannel(channelId,    │
               │    └──────────┬──────────────┘    │     pagination)               │
               │               │                   └───────────────┬───────────────┘
               │               │                                   │
               │               │                                   ▼
               │               │                   ┌───────────────────────────────┐
               │               │                   │ [F2.12] Set HTTP headers      │
               │               │                   │ based on visibility:          │
               │               │                   │ PUBLIC_INDEXABLE:             │
               │               │                   │   X-Robots-Tag: index,follow  │
               │               │                   │ PUBLIC_NO_INDEX:              │
               │               │                   │   X-Robots-Tag: noindex       │
               │               │                   └───────────────┬───────────────┘
               │               │                                   │
               │               │                                   ▼
               │               │                   ┌───────────────────────────────┐
               │               │                   │ [F2.13] Add canonical URL     │
               │               │                   │ and structured data           │
               │               │                   │ Server.IndexingService.       │
               │               │                   │   generateCanonicalUrl()      │
               │               │                   └───────────────┬───────────────┘
               │               │                                   │
               │               │                                   ▼
               │               │                   ┌───────────────────────────────┐
               │               │                   │ [F2.14] Return rendered       │
               │               │                   │ HTML with messages,           │
               │               │                   │ SEO metadata                  │
               │               │                   └───────────────┬───────────────┘
               │               │                                   │
               └───────────────┴───────────────────────────────────┘
                                               │
                                               ▼
                            (( END: Response sent to client ))
```

### 6.3 Scenario: Admin Sets Channel to Private (De-indexing)

**Scenario Description:** An administrator changes a previously public/indexable channel back to private. The system must remove the channel from the sitemap and request de-indexing from search engines.

```
        (( START: Admin clicks "Make Private" ))  [State: A1]
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F3.1] Show warning dialog    │  [State: A2]
            │ "This channel is currently    │
            │ indexed. Search engines may   │
            │ take time to remove it."      │
            └───────────────┬───────────────┘
                            │
                            ▼
                    < F3.2: Admin confirms? >
                   /                         \
                  / No                    Yes \
                 ▼                             ▼
    ┌─────────────────────┐     ┌───────────────────────────────┐
    │ [F3.3] Cancel       │     │ [F3.4] API request            │  [State: A3]
    │ Return to settings  │     │ updateVisibility(PRIVATE)     │
    └─────────────────────┘     └───────────────┬───────────────┘
                                                │
                                    (Permission checks same as F1.7-F1.12)
                                                │
                                                ▼
                                ┌───────────────────────────────┐
                                │ [F3.5] Update database        │  [State: S1]
                                │ visibility = PRIVATE          │
                                │ indexedAt = null              │
                                └───────────────┬───────────────┘
                                                │
                                                ▼
                                ┌───────────────────────────────┐
                                │ [F3.6] Create audit log       │
                                │ action: "VISIBILITY_CHANGED"  │
                                │ old: PUBLIC_INDEXABLE         │
                                │ new: PRIVATE                  │
                                └───────────────┬───────────────┘
                                                │
                                                ▼
                                ┌───────────────────────────────┐
                                │ [F3.7] Remove from sitemap    │
                                │ Server.IndexingService.       │
                                │   removeFromSitemap(channelId)│
                                └───────────────┬───────────────┘
                                                │
                                                ▼
                                ┌───────────────────────────────┐
                                │ [F3.8] Request URL removal    │
                                │ from search engines (async)   │
                                │ POST to Google Search Console │
                                │ POST to Bing Webmaster        │
                                └───────────────┬───────────────┘
                                                │
                                                ▼
                                ┌───────────────────────────────┐
                                │ [F3.9] Invalidate CDN cache   │
                                │ for channel URL               │
                                └───────────────┬───────────────┘
                                                │
                                                ▼
                                ┌───────────────────────────────┐
                                │ [F3.10] Return success        │
                                │ with de-indexing notice       │  [State: A5]
                                └───────────────┬───────────────┘
                                                │
                                                ▼
                            (( END: Channel is private ))  [State: A1]
```

---

## 7. Development Risks and Failures

### 7.1 Runtime Failures

| Label | Failure Mode | User-Visible Effect | Internal Effect | Recovery Procedure | Likelihood | Impact |
|-------|--------------|--------------------|-----------------|--------------------|------------|--------|
| RF-1 | API Server process crash | Toggle action fails with error message | Pending visibility change lost | Auto-restart via process manager; client retries request | Medium | Medium |
| RF-2 | Lost runtime state | Admin sees stale visibility state | In-memory cache inconsistent with database | Cache invalidation on recovery; client re-fetches | Low | Low |
| RF-3 | Database data corruption | Incorrect visibility displayed; potential privacy breach | Rep invariant failure on Channel entity | Restore from backup; audit log reconciliation | Very Low | Critical |
| RF-4 | Unexpected state transition | Channel may become public unintentionally | State machine violation | Validate all transitions server-side; reject invalid requests | Low | High |
| RF-5 | Remote procedure call failure | "Network error" shown to admin | Service-to-service communication failed | Implement retry with exponential backoff; circuit breaker | Medium | Medium |
| RF-6 | Server overload | Slow response or timeout | Request queue exhaustion | Rate limiting; horizontal scaling; load shedding | Medium | Medium |
| RF-7 | Out of RAM | Server becomes unresponsive | OOM killer terminates process | Memory limits per service; vertical scaling | Low | High |
| RF-8 | Database out of space | Write operations fail | Audit log inserts rejected | Storage alerts; archive old audit logs; expand storage | Low | High |

### 7.2 Connectivity Failures

| Label | Failure Mode | User-Visible Effect | Internal Effect | Recovery Procedure | Likelihood | Impact |
|-------|--------------|--------------------|-----------------|--------------------|------------|--------|
| CF-1 | Lost network connectivity | "Connection lost" banner | WebSocket disconnected | Auto-reconnect with backoff; queue offline actions | Medium | Medium |
| CF-2 | Lost database connection | API returns 503 | Connection pool exhausted | Connection pool health checks; failover to replica | Low | High |
| CF-3 | Network traffic spike | Increased latency | Request timeouts | CDN caching for public content; auto-scaling | Medium | Medium |
| CF-4 | Lost access to search engine APIs | Indexing updates delayed | Sitemap ping fails | Queue failed notifications; retry later | Medium | Low |

### 7.3 Hardware Failures

| Label | Failure Mode | User-Visible Effect | Internal Effect | Recovery Procedure | Likelihood | Impact |
|-------|--------------|--------------------|-----------------|--------------------|------------|--------|
| HF-1 | Application server down | Service unavailable | Single point of failure | Multi-AZ deployment; load balancer health checks | Low | High |
| HF-2 | Bad configuration loaded | Unpredictable behavior | Misconfigured services | Config validation on startup; rollback capability | Low | High |
| HF-3 | System relocation | Temporary outage | DNS propagation delay | Blue-green deployment; DNS TTL management | Very Low | Medium |

### 7.4 Intruder/Security Failures

| Label | Failure Mode | User-Visible Effect | Internal Effect | Recovery Procedure | Likelihood | Impact |
|-------|--------------|--------------------|-----------------|--------------------|------------|--------|
| IF-1 | Denial of service attack | Service degradation | Resource exhaustion | DDoS protection (CloudFlare); rate limiting | Medium | High |
| IF-2 | OS compromise | Full system breach | All data exposed | Incident response; system rebuild from clean images | Very Low | Critical |
| IF-3 | Code tampering | Malicious behavior | Application integrity lost | Code signing; integrity monitoring; redeploy | Very Low | Critical |
| IF-4 | Database copy/theft | Privacy breach | PII exposure | Encryption at rest; access logging; breach notification | Low | Critical |
| IF-5 | Bot spam | Public channels flooded | Storage/bandwidth abuse | CAPTCHA; rate limiting; content moderation | Medium | Medium |
| IF-6 | Session hijacking | Unauthorized visibility changes | Admin impersonation | Secure cookies; session binding; anomaly detection | Low | High |

### 7.5 Failure Priority Matrix

```
                    Impact
                    Low         Medium      High        Critical
            ┌───────────────────────────────────────────────────┐
     High   │           │ CF-1      │ IF-1      │              │
            ├───────────┼───────────┼───────────┼──────────────┤
Likelihood  │           │ RF-1,RF-5 │           │              │
   Medium   │           │ RF-6,CF-3 │           │              │
            ├───────────┼───────────┼───────────┼──────────────┤
            │           │           │ RF-7,RF-8 │              │
     Low    │ RF-2      │ HF-3      │ CF-2,HF-1 │ RF-3,IF-4    │
            │           │           │ HF-2,IF-6 │              │
            ├───────────┼───────────┼───────────┼──────────────┤
  Very Low  │           │           │           │ IF-2,IF-3    │
            └───────────────────────────────────────────────────┘
```

---

## 8. Technology Stack

| Label | Technology | Version | Purpose | Rationale | Source/Documentation |
|-------|------------|---------|---------|-----------|---------------------|
| T1 | TypeScript | 5.3+ | Primary programming language for client and server | Type safety, excellent tooling, team familiarity | https://www.typescriptlang.org/ (Microsoft) |
| T2 | React | 18.2+ | Frontend UI framework | Component-based architecture, large ecosystem, SSR support via Next.js | https://react.dev/ (Meta) |
| T3 | Next.js | 14.0+ | React framework with SSR/SSG | SEO-critical for public pages, API routes, edge runtime | https://nextjs.org/ (Vercel) |
| T4 | Node.js | 20 LTS | Server runtime | Non-blocking I/O, JavaScript ecosystem compatibility | https://nodejs.org/ (OpenJS Foundation) |
| T5 | PostgreSQL | 16+ | Primary database | ACID compliance, JSONB support, robust permissions | https://www.postgresql.org/ (PostgreSQL Global Dev Group) |
| T6 | Redis | 7.2+ | Caching and session storage | Sub-millisecond latency, pub/sub for real-time updates | https://redis.io/ (Redis Ltd) |
| T7 | Prisma | 5.8+ | Database ORM | Type-safe queries, migrations, excellent TypeScript integration | https://www.prisma.io/ (Prisma Data Inc) |
| T8 | tRPC | 10.45+ | End-to-end typesafe APIs | Eliminates API contract drift, excellent DX | https://trpc.io/ (tRPC Inc) |
| T9 | Zod | 3.22+ | Schema validation | Runtime type checking, integrates with tRPC | https://zod.dev/ (Colin McDonnell) |
| T10 | TailwindCSS | 3.4+ | CSS framework | Utility-first, consistent design system | https://tailwindcss.com/ (Tailwind Labs) |
| T11 | CloudFlare | N/A | CDN and DDoS protection | Global edge network, workers for edge logic | https://www.cloudflare.com/ (Cloudflare Inc) |
| T12 | Docker | 24+ | Containerization | Consistent environments, easy deployment | https://www.docker.com/ (Docker Inc) |
| T13 | Google Search Console API | v1 | Search indexing management | Request indexing/de-indexing programmatically | https://developers.google.com/webmaster-tools (Google) |
| T14 | Bing Webmaster API | v1 | Search indexing management | Microsoft search engine integration | https://www.bing.com/webmasters (Microsoft) |
| T15 | Jest | 29+ | Testing framework | Comprehensive testing, good TypeScript support | https://jestjs.io/ (Meta) |
| T16 | Playwright | 1.40+ | E2E testing | Cross-browser testing, reliable automation | https://playwright.dev/ (Microsoft) |

---

## 9. APIs

### 9.1 Module M4: API Gateway

#### 9.1.1 CL-C4.1 ChannelController

**Public Methods (Authenticated):**

```typescript
// Get channel settings including visibility
// GET /api/channels/{channelId}/settings
getChannelSettings(
  channelId: string,          // UUID of the channel
  context: AuthenticatedContext  // Contains userId, permissions
): Promise<ChannelSettingsResponse>

// Update channel visibility
// PATCH /api/channels/{channelId}/visibility
updateChannelVisibility(
  channelId: string,          // UUID of the channel
  body: VisibilityUpdateRequest,  // { visibility: ChannelVisibility }
  context: AuthenticatedContext
): Promise<VisibilityUpdateResponse>

// Get visibility change audit history
// GET /api/channels/{channelId}/audit-log
getVisibilityAuditLog(
  channelId: string,
  query: AuditLogQuery,       // { limit?: number, offset?: number, startDate?: Date }
  context: AuthenticatedContext
): Promise<AuditLogResponse>
```

**Private Methods:**

```typescript
private validateAdminAccess(
  userId: string,
  channelId: string
): Promise<boolean>

private mapToResponse(
  channel: Channel
): ChannelSettingsResponse
```

#### 9.1.2 CL-C4.2 PublicAccessController

**Public Methods (Unauthenticated):**

```typescript
// Get public channel content
// GET /c/{serverSlug}/{channelSlug}
getPublicChannel(
  serverSlug: string,         // URL-safe server identifier
  channelSlug: string,        // URL-safe channel identifier
  query: PaginationQuery      // { page?: number, limit?: number }
): Promise<PublicChannelPage>   // SSR-rendered HTML or JSON

// Get server sitemap
// GET /sitemap/{serverSlug}.xml
getServerSitemap(
  serverSlug: string
): Promise<SitemapXML>

// Get robots.txt directives
// GET /robots.txt
getRobotsTxt(): Promise<RobotsTxt>

// Get public channel messages (API)
// GET /api/public/channels/{channelId}/messages
getPublicMessages(
  channelId: string,
  query: PaginationQuery
): Promise<PublicMessagesResponse>
```

### 9.2 Module M5: Business Logic

#### 9.2.1 CL-C5.1 ChannelVisibilityService

**Public Methods:**

```typescript
// Set channel visibility with validation
setVisibility(
  channelId: string,
  newVisibility: ChannelVisibility,
  actorId: string,
  ipAddress: string
): Promise<VisibilityChangeResult>

// Get current visibility
getVisibility(
  channelId: string
): Promise<ChannelVisibility>

// Check if visibility can be changed
canChangeVisibility(
  channelId: string,
  actorId: string
): Promise<boolean>
```

**Private Methods:**

```typescript
private validateTransition(
  currentVisibility: ChannelVisibility,
  newVisibility: ChannelVisibility
): ValidationResult

private emitVisibilityChange(
  event: VisibilityChangeEvent
): Promise<void>
```

#### 9.2.2 CL-C5.2 IndexingService

**Public Methods:**

```typescript
// Regenerate sitemap for server
updateSitemap(
  serverId: string
): Promise<void>

// Notify search engines of changes
notifySearchEngines(
  url: string,
  action: 'INDEX' | 'REMOVE'
): Promise<NotificationResult>

// Generate canonical URL for channel
generateCanonicalUrl(
  serverId: string,
  channelId: string
): string

// Get robots meta directives
getRobotsDirectives(
  visibility: ChannelVisibility
): RobotsDirectives
```

#### 9.2.3 CL-C5.3 PermissionService

**Public Methods:**

```typescript
// Check if user can manage channel
canManageChannel(
  userId: string,
  channelId: string
): Promise<boolean>

// Check if user is server admin
isServerAdmin(
  userId: string,
  serverId: string
): Promise<boolean>

// Get effective permissions for user in channel
getEffectivePermissions(
  userId: string,
  channelId: string
): Promise<PermissionSet>
```

#### 9.2.4 CL-C5.4 AuditLogService

**Public Methods:**

```typescript
// Log a visibility change
logVisibilityChange(
  entry: AuditLogEntry
): Promise<void>

// Get audit history for channel
getAuditHistory(
  channelId: string,
  options: AuditQueryOptions
): Promise<AuditLogEntry[]>

// Export audit log
exportAuditLog(
  channelId: string,
  format: 'JSON' | 'CSV'
): Promise<Buffer>
```

### 9.3 Module M6: Data Access

#### 9.3.1 CL-C6.1 ChannelRepository

**Public Methods:**

```typescript
// Find channel by ID
findById(
  channelId: string
): Promise<Channel | null>

// Update channel
update(
  channelId: string,
  data: Partial<Channel>
): Promise<Channel>

// Find all public channels for a server
findPublicByServerId(
  serverId: string
): Promise<Channel[]>
```

**Private Methods:**

```typescript
private invalidateCache(
  channelId: string
): Promise<void>

private getCacheKey(
  channelId: string
): string
```

---

## 10. Public Interfaces

### 10.1 Cross-Module Interfaces

#### Used by Client Module (M1, M2, M3) from API Gateway (M4):

| Method | Class | Used For |
|--------|-------|----------|
| getChannelSettings() | ChannelController | Loading channel settings page |
| updateChannelVisibility() | ChannelController | Visibility toggle action |
| getVisibilityAuditLog() | ChannelController | Displaying audit history |
| getPublicChannel() | PublicAccessController | Viewing public channel content |
| getPublicMessages() | PublicAccessController | Paginating public messages |

#### Used by API Gateway (M4) from Business Logic (M5):

| Method | Class | Used For |
|--------|-------|----------|
| setVisibility() | ChannelVisibilityService | Processing visibility update requests |
| getVisibility() | ChannelVisibilityService | Reading current visibility |
| canChangeVisibility() | ChannelVisibilityService | Permission checking |
| canManageChannel() | PermissionService | Authorization |
| generateCanonicalUrl() | IndexingService | SEO headers |
| getRobotsDirectives() | IndexingService | SEO headers |
| getAuditHistory() | AuditLogService | Audit log endpoint |

#### Used by Business Logic (M5) from Data Access (M6):

| Method | Class | Used For |
|--------|-------|----------|
| findById() | ChannelRepository | Loading channel entity |
| update() | ChannelRepository | Persisting visibility changes |
| findPublicByServerId() | ChannelRepository | Sitemap generation |
| create() | AuditLogRepository | Writing audit entries |
| findByChannelId() | AuditLogRepository | Reading audit history |

### 10.2 REST API Interface

```yaml
openapi: 3.0.3
info:
  title: Harmony Channel Visibility API
  version: 1.0.0

paths:
  /api/channels/{channelId}/visibility:
    patch:
      summary: Update channel visibility
      security:
        - bearerAuth: []
      parameters:
        - name: channelId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/VisibilityUpdateRequest'
      responses:
        '200':
          description: Visibility updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/VisibilityUpdateResponse'
        '401':
          description: Unauthorized
        '403':
          description: Forbidden - insufficient permissions
        '404':
          description: Channel not found

components:
  schemas:
    ChannelVisibility:
      type: string
      enum:
        - PUBLIC_INDEXABLE
        - PUBLIC_NO_INDEX
        - PRIVATE

    VisibilityUpdateRequest:
      type: object
      required:
        - visibility
      properties:
        visibility:
          $ref: '#/components/schemas/ChannelVisibility'

    VisibilityUpdateResponse:
      type: object
      properties:
        success:
          type: boolean
        channel:
          $ref: '#/components/schemas/ChannelDTO'
        previousVisibility:
          $ref: '#/components/schemas/ChannelVisibility'
        indexingStatus:
          type: string
          enum: [PENDING, INDEXED, NOT_INDEXED, REMOVAL_REQUESTED]
```

---

## 11. Data Schemas

### 11.1 Database Tables

#### D7.1 ChannelTable

**Runtime Class:** CL-D1 Channel

| Column | Database Type | Constraints | Description | Storage Est. |
|--------|--------------|-------------|-------------|--------------|
| id | UUID | PRIMARY KEY | Unique channel identifier | 16 bytes |
| server_id | UUID | FOREIGN KEY, NOT NULL, INDEX | Parent server reference | 16 bytes |
| name | VARCHAR(100) | NOT NULL | Display name | ~50 bytes avg |
| slug | VARCHAR(100) | NOT NULL, UNIQUE per server | URL-safe identifier | ~30 bytes avg |
| visibility | visibility_enum | NOT NULL, DEFAULT 'PRIVATE' | Current visibility state | 1 byte |
| indexed_at | TIMESTAMP WITH TIME ZONE | NULL | When channel was added to sitemap | 8 bytes |
| created_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Creation timestamp | 8 bytes |
| updated_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Last modification timestamp | 8 bytes |

**Enum Definition:**
```sql
CREATE TYPE visibility_enum AS ENUM ('PUBLIC_INDEXABLE', 'PUBLIC_NO_INDEX', 'PRIVATE');
```

**Indexes:**
```sql
CREATE INDEX idx_channels_server_visibility ON channels(server_id, visibility);
CREATE INDEX idx_channels_visibility_indexed ON channels(visibility, indexed_at)
  WHERE visibility = 'PUBLIC_INDEXABLE';
```

**Storage Estimate:** ~137 bytes per channel + index overhead

#### D7.2 AuditLogTable

**Runtime Class:** CL-D2 AuditLogEntry

| Column | Database Type | Constraints | Description | Storage Est. |
|--------|--------------|-------------|-------------|--------------|
| id | UUID | PRIMARY KEY | Unique log entry identifier | 16 bytes |
| channel_id | UUID | FOREIGN KEY, NOT NULL, INDEX | Channel reference | 16 bytes |
| actor_id | UUID | FOREIGN KEY, NOT NULL | User who made change | 16 bytes |
| action | VARCHAR(50) | NOT NULL | Action type (e.g., 'VISIBILITY_CHANGED') | ~20 bytes |
| old_value | JSONB | NULL | Previous state | ~50 bytes |
| new_value | JSONB | NOT NULL | New state | ~50 bytes |
| timestamp | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW(), INDEX | When action occurred | 8 bytes |
| ip_address | INET | NULL | Actor's IP address | 16 bytes |
| user_agent | VARCHAR(500) | NULL | Actor's browser/client | ~200 bytes |

**Indexes:**
```sql
CREATE INDEX idx_audit_channel_time ON visibility_audit_log(channel_id, timestamp DESC);
CREATE INDEX idx_audit_actor ON visibility_audit_log(actor_id, timestamp DESC);
```

**Storage Estimate:** ~392 bytes per entry

**Retention Policy:** Audit logs retained for 7 years per compliance requirements.

### 11.2 Cache Schemas

#### D8.1 ChannelVisibilityCache

**Key Pattern:** `channel:{channelId}:visibility`
**Value Type:** String (visibility enum value)
**TTL:** 3600 seconds (1 hour)
**Storage:** ~50 bytes per entry

#### D8.2 PublicChannelListCache

**Key Pattern:** `server:{serverId}:public_channels`
**Value Type:** JSON array of channel IDs
**TTL:** 300 seconds (5 minutes)
**Storage:** ~16 bytes per channel ID + JSON overhead

### 11.3 Field Type Mappings

| TypeScript Type | PostgreSQL Type | Notes |
|-----------------|-----------------|-------|
| string (UUID) | UUID | Native UUID type for performance |
| ChannelVisibility (enum) | visibility_enum | PostgreSQL enum for type safety |
| Date | TIMESTAMP WITH TIME ZONE | Always stored in UTC |
| object (audit values) | JSONB | Flexible schema for varying audit data |
| string (IP) | INET | Native IP type supports IPv4 and IPv6 |

---

## 12. Security and Privacy

### 12.1 Temporarily Stored PII

| PII Type | Justification | Entry Point | Processing Path | Usage | Disposal | Protection |
|----------|---------------|-------------|-----------------|-------|----------|------------|
| IP Address | Audit trail for security investigations | HTTP request header | API Gateway -> AuditLogService -> AuditLogRepository | Logged with visibility changes | Retained in audit log | TLS in transit; encrypted at rest |
| User Agent | Audit trail, identifying suspicious activity | HTTP request header | API Gateway -> AuditLogService -> AuditLogRepository | Logged with visibility changes | Retained in audit log | TLS in transit; encrypted at rest |
| Session Token | Authentication | HTTP Authorization header | API Gateway -> AuthMiddleware | Validate user identity | Not stored (stateless JWT) | TLS only; short expiry |

### 12.2 Long-Term Stored PII

| PII Type | Justification | Storage Location | Entry Point | Path to Storage | Path from Storage |
|----------|---------------|------------------|-------------|-----------------|-------------------|
| Actor ID (references User) | Accountability for admin actions | D7.2 AuditLogTable.actor_id | Authenticated API request | ChannelController -> AuditLogService -> AuditLogRepository | AuditLogRepository -> AuditLogService -> ChannelController |
| IP Address | Security investigation, abuse prevention | D7.2 AuditLogTable.ip_address | HTTP request | ChannelController -> AuditLogService -> AuditLogRepository | Only accessible via audit log export by authorized personnel |

### 12.3 Data Protection Measures

**Encryption:**
- All data encrypted in transit via TLS 1.3
- Database encryption at rest using AES-256
- Backup encryption using separate keys

**Access Control:**
- Audit log access restricted to Security Officer role
- Database credentials rotated quarterly
- Principle of least privilege for service accounts

### 12.4 Privacy Policy

**Customer-Visible Policy Points:**
- Public channels are visible to anyone on the internet, including search engines
- Messages in public channels may appear in search results
- Administrators can change channel visibility at any time
- Previously indexed content may remain in search engine caches after being made private

**Policy Presentation:**
- Warning displayed when creating a channel
- Confirmation dialog when changing to public
- Notice when changing to private about cached content

### 12.5 Access Policies

| Role | Visibility Change | View Audit Log | Export Audit Log |
|------|-------------------|----------------|------------------|
| Server Owner | Yes | Yes | Yes |
| Server Administrator | Yes | Yes | No |
| Channel Moderator | No | No | No |
| Regular Member | No | No | No |
| Anonymous User | No | No | No |

### 12.6 Audit Procedures

**Routine Access Logging:**
- All API requests logged with timestamp, actor, action
- Audit log queries themselves are logged
- Monthly review of access patterns

**Non-Routine Access:**
- Break-glass procedure requires two-person approval
- All emergency access reviewed within 24 hours
- Incident reports filed for any anomalies

### 12.7 Minor Protection

- Platform requires users to be 13+ (COPPA compliance)
- No specific collection of minor PII beyond standard account data
- Public channels may contain content posted by minors; parents/guardians agree to terms on behalf of minors

### 12.8 Security Responsibilities

| Storage/System | Responsible Person | Backup Responsible |
|----------------|--------------------|--------------------|
| PostgreSQL Database | Database Administrator | DevOps Lead |
| Redis Cache | DevOps Lead | Database Administrator |
| Audit Log Storage | Security Officer | Compliance Manager |

**Security Officer:** Responsible for auditing access to all PII and security practices compliance.

---

## 13. Risks to Completion

### 13.1 Technology Risks

| Technology | Learning Curve | Design Difficulty | Implementation Difficulty | Verification | Maintenance | Update Strategy |
|------------|----------------|-------------------|---------------------------|--------------|-------------|-----------------|
| T1: TypeScript | Low (team familiar) | Low | Low | Unit tests, type checking | Low | Automated via Dependabot |
| T2: React | Low (team familiar) | Medium | Low | Component tests, Storybook | Low | Follow React upgrade guides |
| T3: Next.js | Medium (SSR complexity) | Medium | Medium | E2E tests for SSR | Medium | Vercel provides migration guides |
| T4: Node.js | Low | Low | Low | Automated testing | Low | LTS schedule |
| T5: PostgreSQL | Low | Low | Low | Integration tests | Low | Standard upgrade path |
| T6: Redis | Low | Low | Low | Connection tests | Low | Standard upgrade path |
| T7: Prisma | Medium | Low | Low | Schema tests | Low | Migration tooling included |
| T8: tRPC | Medium (new to team) | Medium | Medium | Type checking | Medium | Breaking changes documented |
| T13/T14: Search APIs | High (external dependency) | Medium | High | Integration tests, mocks | High | Monitor deprecation notices |

### 13.2 Component Risks

| Component | Risk Factor | Mitigation |
|-----------|-------------|------------|
| M5.2 IndexingService | External API dependencies (Google, Bing) may change | Abstraction layer; graceful degradation if APIs unavailable |
| M4.2 PublicAccessController | High traffic from crawlers | CDN caching; rate limiting; edge computing |
| M6.1 ChannelRepository | Cache invalidation complexity | Explicit invalidation; short TTLs; eventual consistency acceptable |
| D7.2 AuditLogTable | Storage growth over time | Partitioning by date; archival strategy; retention policy |

### 13.3 Off-the-Shelf Software Considerations

| Technology | Customization Needed | Source Available | Vendor Support | Bug Fix Responsibility | Security Fix Responsibility | Support Cost |
|------------|---------------------|------------------|----------------|----------------------|---------------------------|--------------|
| PostgreSQL | None | Yes (open source) | Community + paid options | Community | Community (fast) | Free |
| Redis | None | Yes (open source) | Community + Redis Ltd | Community | Community (fast) | Free |
| Next.js | Minor (SSR config) | Yes (open source) | Vercel paid tier | Community | Community | Free / Paid |
| Prisma | None | Yes (open source) | Prisma Data Inc | Community | Community | Free |
| CloudFlare | CDN rules | No (SaaS) | Paid support | CloudFlare | CloudFlare | Monthly fee |

### 13.4 Risk Prioritization

**High Priority (Address First):**
1. Search engine API integration - requires early prototyping
2. SSR performance for public pages - critical for SEO
3. Permission system accuracy - security critical

**Medium Priority:**
1. Audit log storage scaling
2. Cache invalidation correctness
3. CDN configuration

**Low Priority:**
1. UI polish for settings page
2. Audit log export formats
3. Advanced analytics

### 13.5 Contingency Plans

| Risk | Trigger Condition | Contingency |
|------|-------------------|-------------|
| Search API unavailable | 3+ consecutive failures | Queue requests; manual sitemap submission; alert ops |
| Database performance degradation | p99 latency > 500ms | Enable read replicas; review query plans; add indexes |
| CDN issues | Cache hit rate < 80% | Increase origin capacity; review cache rules |
| Security breach detected | Any unauthorized access | Incident response plan; notify affected users; rotate credentials |

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| Indexable | Content that search engines are permitted to include in search results |
| Sitemap | XML file listing URLs for search engines to crawl |
| Canonical URL | The preferred URL for content that may be accessible via multiple URLs |
| robots.txt | File that instructs search engine crawlers which URLs to access |
| X-Robots-Tag | HTTP header that provides indexing instructions to crawlers |
| De-indexing | The process of requesting search engines remove content from their index |
| CDN | Content Delivery Network - geographically distributed servers for caching |
| SSR | Server-Side Rendering - generating HTML on the server |
| PII | Personally Identifiable Information |

---

## Appendix B: Document References

- User Story: Channel Visibility Toggle (this document)
- Platform Architecture Overview (separate document)
- Harmony Security Policy (separate document)
- SEO Best Practices Guide (separate document)
