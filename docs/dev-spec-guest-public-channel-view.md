# Development Specification: Guest Public Channel View

## Feature: Anonymous Access to Public Channel Content

**User Story:** As a Guest User (Searcher), I want to view the full contents of a public channel via a direct URL without being prompted to log in, so that I can get the answer to my specific question immediately without the friction of creating an account I might only use once.

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
│  {{ }}     Cache Layer                                                          │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                           EXTERNAL ACTORS                                        │
│  ┌─────────────────────────┐  ┌─────────────────────────┐                       │
│  │ [A1 Guest User]         │  │ [A2 Search Engine Bot]  │                       │
│  │ Anonymous browser user  │  │ Googlebot, Bingbot, etc │                       │
│  │ arriving via search     │  │ Crawling public content │                       │
│  └───────────┬─────────────┘  └───────────┬─────────────┘                       │
└──────────────┼────────────────────────────┼─────────────────────────────────────┘
               │                            │
               │ HTTPS GET                  │ HTTPS GET
               │ /c/{server}/{channel}      │ /c/{server}/{channel}
               ▼                            ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           EDGE LAYER (CDN - CloudFlare)                          │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ E1 Edge Cache Module                                                       │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ E1.1 CacheRouter            │    │ E1.2 BotDetector               │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ cacheKey: string            │    │ userAgent: string               │   │  │
│  │  │ ttl: number                 │    │ isBot: boolean                  │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ checkCache()                │───►│ detectBot()                     │   │  │
│  │  │ serveFromCache()            │    │ applyBotHeaders()               │   │  │
│  │  │ cacheResponse()             │    │ rateLimitBot()                  │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
               │
               │ Cache Miss
               ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER (Server-Side Rendered)                    │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M1 Public View Module (Next.js SSR)                                        │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C1.1 PublicChannelPage      │    │ C1.2 SEOMetadataComponent       │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ serverSlug: string          │    │ title: string                   │   │  │
│  │  │ channelSlug: string         │    │ description: string             │   │  │
│  │  │ messages: Message[]         │    │ canonicalUrl: string            │   │  │
│  │  │ serverInfo: ServerDTO       │    │ ogImage: string                 │   │  │
│  │  │ channelInfo: ChannelDTO     │    │ structuredData: JSON-LD         │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ getServerSideProps()        │◄───│ generateMetaTags()              │   │  │
│  │  │ render()                    │    │ generateStructuredData()        │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C1.3 MessageListComponent   │    │ C1.4 GuestPromoBanner           │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ messages: Message[]         │    │ serverName: string              │   │  │
│  │  │ hasMore: boolean            │    │ channelName: string             │   │  │
│  │  │ loadingMore: boolean        │    │ memberCount: number             │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ render()                    │    │ render()                        │   │  │
│  │  │ loadMoreMessages()          │    │ onJoinClick()                   │   │  │
│  │  │ scrollToMessage()           │    │ onDismiss()                     │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C1.5 MessageCard            │    │ C1.6 ServerSidebar              │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ author: AuthorDTO           │    │ serverInfo: ServerDTO           │   │  │
│  │  │ content: string             │    │ publicChannels: ChannelDTO[]    │   │  │
│  │  │ timestamp: DateTime         │    │ ─────────────────────────────── │   │  │
│  │  │ attachments: Attachment[]   │    │ render()                        │   │  │
│  │  │ ─────────────────────────── │    │ navigateToChannel()             │   │  │
│  │  │ render()                    │    └─────────────────────────────────┘   │  │
│  │  │ formatTimestamp()           │                                          │  │
│  │  │ renderAttachments()         │                                          │  │
│  │  └─────────────────────────────┘                                          │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M2 Client Interaction Module (Browser Hydration)                           │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C2.1 InfiniteScrollHandler  │    │ C2.2 MessageLinkHandler         │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ observer: IntersectionObs   │    │ messageId: string               │   │  │
│  │  │ threshold: number           │    │ ─────────────────────────────── │   │  │
│  │  │ ─────────────────────────── │    │ scrollToMessage()               │   │  │
│  │  │ observe()                   │    │ highlightMessage()              │   │  │
│  │  │ onIntersect()               │    │ copyMessageLink()               │   │  │
│  │  │ loadMore()                  │    └─────────────────────────────────┘   │  │
│  │  └─────────────────────────────┘                                          │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C2.3 SearchHighlighter      │    │ C2.4 ShareHandler               │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ searchTerms: string[]       │    │ currentUrl: string              │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ parseSearchTerms()          │    │ shareToTwitter()                │   │  │
│  │  │ highlightMatches()          │    │ shareToLinkedIn()               │   │  │
│  │  │ scrollToFirstMatch()        │    │ copyLink()                      │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ Internal API Calls (Server-Side)
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           SERVER LAYER (Application Server)                      │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M3 Public API Module                                                       │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C3.1 PublicChannelController│    │ C3.2 PublicServerController     │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ channelService: ref         │    │ serverService: ref              │   │  │
│  │  │ messageService: ref         │    │ ─────────────────────────────── │   │  │
│  │  │ ─────────────────────────── │    │ getPublicServerInfo()           │   │  │
│  │  │ getPublicChannel()          │    │ getPublicChannelList()          │   │  │
│  │  │ getPublicMessages()         │    │ getServerMetadata()             │   │  │
│  │  │ getMessage()                │    └─────────────────────────────────┘   │  │
│  │  └─────────────────────────────┘                                          │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M4 Access Control Module                                                   │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C4.1 VisibilityGuard        │    │ C4.2 ContentFilter              │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ channelRepository: ref      │    │ sensitivePatterns: RegExp[]     │   │  │
│  │  │ cacheService: ref           │    │ ─────────────────────────────── │   │  │
│  │  │ ─────────────────────────── │    │ filterSensitiveContent()        │   │  │
│  │  │ isChannelPublic()           │    │ redactUserMentions()            │   │  │
│  │  │ isServerPublic()            │    │ sanitizeAttachments()           │   │  │
│  │  │ getVisibilityStatus()       │    └─────────────────────────────────┘   │  │
│  │  └─────────────────────────────┘                                          │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C4.3 RateLimiter            │    │ C4.4 AnonymousSessionManager    │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ windowMs: number            │    │ sessionId: string               │   │  │
│  │  │ maxRequests: number         │    │ preferences: GuestPreferences   │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ checkLimit()                │    │ getOrCreateSession()            │   │  │
│  │  │ incrementCounter()          │    │ storePreference()               │   │  │
│  │  │ isRateLimited()             │    │ getPreferences()                │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M5 Content Delivery Module                                                 │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C5.1 MessageService         │    │ C5.2 AuthorService              │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ messageRepository: ref      │    │ userRepository: ref             │   │  │
│  │  │ contentFilter: ref          │    │ privacyService: ref             │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ getMessagesForPublicView()  │    │ getPublicAuthorInfo()           │   │  │
│  │  │ getMessageById()            │    │ anonymizeAuthor()               │   │  │
│  │  │ buildMessageDTO()           │    │ getDisplayName()                │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C5.3 AttachmentService      │    │ C5.4 SEOService                 │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ storageClient: ref          │    │ channelService: ref             │   │  │
│  │  │ ─────────────────────────── │    │ messageService: ref             │   │  │
│  │  │ getPublicAttachmentUrl()    │    │ ─────────────────────────────── │   │  │
│  │  │ generateThumbnail()         │    │ generatePageTitle()             │   │  │
│  │  │ isAttachmentPublic()        │    │ generateDescription()           │   │  │
│  │  └─────────────────────────────┘    │ generateStructuredData()        │   │  │
│  │                                     │ generateBreadcrumbs()           │   │  │
│  │                                     └─────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M6 Data Access Module                                                      │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C6.1 ChannelRepository      │    │ C6.2 MessageRepository          │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ database: DatabaseClient    │    │ database: DatabaseClient        │   │  │
│  │  │ cache: CacheClient          │    │ cache: CacheClient              │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ findBySlug()                │    │ findByChannelPaginated()        │   │  │
│  │  │ findPublicByServerId()      │    │ findById()                      │   │  │
│  │  │ getVisibility()             │    │ countByChannel()                │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C6.3 ServerRepository       │    │ C6.4 UserRepository             │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ database: DatabaseClient    │    │ database: DatabaseClient        │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ findBySlug()                │    │ findById()                      │   │  │
│  │  │ getPublicInfo()             │    │ getPublicProfile()              │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
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
│  │  │ D7.1 ServersTable           │    │ D7.2 ChannelsTable              │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ id: UUID (PK)               │    │ id: UUID (PK)                   │   │  │
│  │  │ name: VARCHAR(100)          │    │ server_id: UUID (FK)            │   │  │
│  │  │ slug: VARCHAR(100)          │    │ name: VARCHAR(100)              │   │  │
│  │  │ description: TEXT           │    │ slug: VARCHAR(100)              │   │  │
│  │  │ icon_url: VARCHAR(500)      │    │ visibility: ENUM                │   │  │
│  │  │ is_public: BOOLEAN          │    │ topic: TEXT                     │   │  │
│  │  │ member_count: INTEGER       │    │ created_at: TIMESTAMP           │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ D7.3 MessagesTable          │    │ D7.4 UsersTable                 │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ id: UUID (PK)               │    │ id: UUID (PK)                   │   │  │
│  │  │ channel_id: UUID (FK)       │    │ username: VARCHAR(32)           │   │  │
│  │  │ author_id: UUID (FK)        │    │ display_name: VARCHAR(100)      │   │  │
│  │  │ content: TEXT               │    │ avatar_url: VARCHAR(500)        │   │  │
│  │  │ created_at: TIMESTAMP       │    │ public_profile: BOOLEAN         │   │  │
│  │  │ edited_at: TIMESTAMP        │    │ created_at: TIMESTAMP           │   │  │
│  │  │ is_deleted: BOOLEAN         │    └─────────────────────────────────┘   │  │
│  │  └─────────────────────────────┘                                          │  │
│  │  ┌─────────────────────────────┐                                          │  │
│  │  │ D7.5 AttachmentsTable       │                                          │  │
│  │  │ ─────────────────────────── │                                          │  │
│  │  │ id: UUID (PK)               │                                          │  │
│  │  │ message_id: UUID (FK)       │                                          │  │
│  │  │ filename: VARCHAR(255)      │                                          │  │
│  │  │ url: VARCHAR(500)           │                                          │  │
│  │  │ content_type: VARCHAR(100)  │                                          │  │
│  │  │ size_bytes: BIGINT          │                                          │  │
│  │  └─────────────────────────────┘                                          │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M8 Cache Module                                                            │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ D8.1 ChannelVisibilityCache │    │ D8.2 PublicMessagesCache        │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ key: channel:{slug}:vis     │    │ key: channel:{id}:msgs:{page}   │   │  │
│  │  │ value: VisibilityEnum       │    │ value: MessageDTO[]             │   │  │
│  │  │ ttl: 3600 seconds           │    │ ttl: 60 seconds                 │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ D8.3 ServerInfoCache        │    │ D8.4 GuestSessionCache          │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ key: server:{slug}:info     │    │ key: guest:{sessionId}          │   │  │
│  │  │ value: ServerInfoDTO        │    │ value: GuestPreferences         │   │  │
│  │  │ ttl: 300 seconds            │    │ ttl: 86400 seconds              │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Information Flow Summary

| Flow ID | Source | Destination | Data | Protocol |
|---------|--------|-------------|------|----------|
| F1 | A1 Guest User | E1.1 CacheRouter | HTTP GET Request | HTTPS |
| F2 | E1.1 CacheRouter | C1.1 PublicChannelPage | Cache Miss Forward | HTTPS |
| F3 | C1.1 PublicChannelPage | C3.1 PublicChannelController | Channel Data Request | Internal |
| F4 | C3.1 PublicChannelController | C4.1 VisibilityGuard | Visibility Check | Internal |
| F5 | C4.1 VisibilityGuard | C6.1 ChannelRepository | Database Query | Internal |
| F6 | C3.1 PublicChannelController | C5.1 MessageService | Message Fetch | Internal |
| F7 | C5.1 MessageService | C6.2 MessageRepository | Paginated Query | Internal |
| F8 | C5.4 SEOService | C1.2 SEOMetadataComponent | SEO Data | Internal |
| F9 | C1.1 PublicChannelPage | E1.1 CacheRouter | Rendered HTML | HTTPS |
| F10 | E1.1 CacheRouter | A1 Guest User | Cached/Fresh Response | HTTPS |

### 2.3 Request Path Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    Guest Request Path (Cache Miss Scenario)                      │
└─────────────────────────────────────────────────────────────────────────────────┘

Guest User                CDN Edge              Next.js SSR           Database
    │                        │                       │                    │
    │  GET /c/gamedev/help   │                       │                    │
    │───────────────────────►│                       │                    │
    │                        │                       │                    │
    │                        │  Cache MISS           │                    │
    │                        │  Forward to origin    │                    │
    │                        │──────────────────────►│                    │
    │                        │                       │                    │
    │                        │                       │  Check visibility  │
    │                        │                       │───────────────────►│
    │                        │                       │                    │
    │                        │                       │  visibility=PUBLIC │
    │                        │                       │◄───────────────────│
    │                        │                       │                    │
    │                        │                       │  Fetch messages    │
    │                        │                       │───────────────────►│
    │                        │                       │                    │
    │                        │                       │  Message[]         │
    │                        │                       │◄───────────────────│
    │                        │                       │                    │
    │                        │                       │  Render HTML       │
    │                        │                       │  with SEO tags     │
    │                        │                       │                    │
    │                        │  HTML + Cache-Control │                    │
    │                        │◄──────────────────────│                    │
    │                        │                       │                    │
    │                        │  Store in cache       │                    │
    │                        │                       │                    │
    │  HTML Response         │                       │                    │
    │◄───────────────────────│                       │                    │
    │                        │                       │                    │
    │  Browser renders       │                       │                    │
    │  page immediately      │                       │                    │
    │                        │                       │                    │
```

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
                            │  CL1.1 IPublicContent     │
                            │         Provider          │
                            ├───────────────────────────┤
                            │ + getPublicContent()      │
                            │ + isAccessible()          │
                            │ + getMetadata()           │
                            └─────────────┬─────────────┘
                                          │
              ┌───────────────────────────┼───────────────────────────┐
              │                           │                           │
    - - - - - ┼ - - - - -       - - - - - ┼ - - - - -       - - - - - ┼ - - - - -
              │                           │                           │
    ┌─────────▼─────────┐       ┌─────────▼─────────┐       ┌─────────▼─────────┐
    │ CL1.2 Public      │       │ CL1.3 Public      │       │ CL1.4 Public      │
    │ ChannelProvider   │       │ MessageProvider   │       │ ServerProvider    │
    ├───────────────────┤       ├───────────────────┤       ├───────────────────┤
    │ - channelRepo     │       │ - messageRepo     │       │ - serverRepo      │
    │ - visibilityGuard │       │ - contentFilter   │       │ - channelRepo     │
    ├───────────────────┤       ├───────────────────┤       ├───────────────────┤
    │ + getPublicContent│       │ + getPublicContent│       │ + getPublicContent│
    │ + isAccessible    │       │ + isAccessible    │       │ + isAccessible    │
    │ + getMetadata     │       │ + getMetadata     │       │ + getMetadata     │
    └─────────┬─────────┘       └─────────┬─────────┘       └───────────────────┘
              │                           │
              ◇                           ◇
    ┌─────────▼─────────┐       ┌─────────▼─────────┐
    │ CL2.1 Visibility  │       │ CL2.2 Content     │
    │ Guard             │       │ Filter            │
    ├───────────────────┤       ├───────────────────┤
    │ - channelRepo     │       │ - patterns        │
    │ - cache           │       ├───────────────────┤
    ├───────────────────┤       │ + filter()        │
    │ + isPublic()      │       │ + redact()        │
    │ + getStatus()     │       │ + sanitize()      │
    └───────────────────┘       └───────────────────┘


    ┌───────────────────────────────────────────────────────────────────────────┐
    │                          Page Components                                   │
    └───────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────┐
    │ CL3.1 PublicChannelPage │
    │ <<React Component>>     │
    ├─────────────────────────┤
    │ + serverSlug: string    │
    │ + channelSlug: string   │
    │ + initialData: PageData │
    ├─────────────────────────┤
    │ + getServerSideProps()  │
    │ + render()              │
    └────────────┬────────────┘
                 │
                 ◆ contains
    ┌────────────┴────────────────────────────────────────────┐
    │            │                │                │          │
    ▼            ▼                ▼                ▼          ▼
┌─────────┐ ┌─────────────┐ ┌───────────────┐ ┌────────┐ ┌─────────┐
│CL3.2 SEO│ │CL3.3 Server │ │CL3.4 Message  │ │CL3.5   │ │CL3.6    │
│Metadata │ │Sidebar      │ │List           │ │Guest   │ │Message  │
│Component│ │             │ │               │ │Promo   │ │Card     │
├─────────┤ ├─────────────┤ ├───────────────┤ │Banner  │ ├─────────┤
│ + title │ │ + server    │ │ + messages    │ ├────────┤ │ + msg   │
│ + desc  │ │ + channels  │ │ + hasMore     │ │ + name │ │ + author│
│ + url   │ ├─────────────┤ ├───────────────┤ ├────────┤ ├─────────┤
├─────────┤ │ + render()  │ │ + render()    │ │+render │ │+render()│
│+generate│ │ + navigate()│ │ + loadMore()  │ │+onJoin │ │+format()│
│ Tags()  │ └─────────────┘ └───────────────┘ └────────┘ └─────────┘
└─────────┘


    ┌───────────────────────────────────────────────────────────────────────────┐
    │                          Data Transfer Objects                             │
    └───────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────┐         ┌─────────────────────────┐
    │ CL4.1 PublicChannelDTO  │         │ CL4.2 PublicMessageDTO  │
    │ <<DTO>>                 │         │ <<DTO>>                 │
    ├─────────────────────────┤         ├─────────────────────────┤
    │ + id: string            │         │ + id: string            │
    │ + name: string          │         │ + content: string       │
    │ + slug: string          │         │ + author: AuthorDTO     │
    │ + topic: string         │         │ + timestamp: DateTime   │
    │ + messageCount: number  │         │ + attachments: []       │
    │ + serverSlug: string    │         │ + permalink: string     │
    └─────────────────────────┘         └─────────────────────────┘

    ┌─────────────────────────┐         ┌─────────────────────────┐
    │ CL4.3 PublicAuthorDTO   │         │ CL4.4 PublicServerDTO   │
    │ <<DTO>>                 │         │ <<DTO>>                 │
    ├─────────────────────────┤         ├─────────────────────────┤
    │ + displayName: string   │         │ + name: string          │
    │ + avatarUrl: string     │         │ + slug: string          │
    │ + isBot: boolean        │         │ + description: string   │
    │ (No userId exposed)     │         │ + iconUrl: string       │
    └─────────────────────────┘         │ + memberCount: number   │
                                        │ + publicChannels: []    │
                                        └─────────────────────────┘

    ┌─────────────────────────┐         ┌─────────────────────────┐
    │ CL4.5 PageDataDTO       │         │ CL4.6 SEODataDTO        │
    │ <<DTO>>                 │         │ <<DTO>>                 │
    ├─────────────────────────┤         ├─────────────────────────┤
    │ + server: ServerDTO     │         │ + title: string         │
    │ + channel: ChannelDTO   │         │ + description: string   │
    │ + messages: MessageDTO[]│         │ + canonicalUrl: string  │
    │ + pagination: object    │         │ + ogImage: string       │
    │ + seo: SEODataDTO       │         │ + breadcrumbs: []       │
    └─────────────────────────┘         │ + structuredData: JSON  │
                                        └─────────────────────────┘


    ┌───────────────────────────────────────────────────────────────────────────┐
    │                          Domain Entities                                   │
    └───────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────┐         ┌─────────────────────────┐
    │ CL5.1 Channel           │◄────────│ CL5.2 Message           │
    │ <<Entity>>              │ 1    *  │ <<Entity>>              │
    ├─────────────────────────┤         ├─────────────────────────┤
    │ + id: UUID              │         │ + id: UUID              │
    │ + serverId: UUID        │         │ + channelId: UUID       │
    │ + name: string          │         │ + authorId: UUID        │
    │ + slug: string          │         │ + content: string       │
    │ + visibility: Enum      │         │ + createdAt: DateTime   │
    │ + topic: string         │         │ + editedAt: DateTime    │
    └─────────────────────────┘         │ + isDeleted: boolean    │
              ▲                         └─────────────────────────┘
              │ *
              │
              │ 1
    ┌─────────┴───────────────┐         ┌─────────────────────────┐
    │ CL5.3 Server            │         │ CL5.4 User              │
    │ <<Entity>>              │         │ <<Entity>>              │
    ├─────────────────────────┤         ├─────────────────────────┤
    │ + id: UUID              │         │ + id: UUID              │
    │ + name: string          │         │ + username: string      │
    │ + slug: string          │         │ + displayName: string   │
    │ + description: string   │         │ + avatarUrl: string     │
    │ + isPublic: boolean     │         │ + publicProfile: bool   │
    │ + memberCount: number   │         └─────────────────────────┘
    └─────────────────────────┘
```

---

## 4. List of Classes

### 4.1 Edge Layer (E1)

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-E1.1 | CacheRouter | Edge Worker | Routes requests through CDN cache, determines cache hit/miss, manages cache keys |
| CL-E1.2 | BotDetector | Edge Worker | Identifies search engine bots vs human users, applies appropriate rate limits and headers |

### 4.2 Public View Module (M1)

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-C1.1 | PublicChannelPage | Page Component | Main Next.js page component for rendering public channel content with SSR |
| CL-C1.2 | SEOMetadataComponent | UI Component | Generates and renders SEO meta tags, Open Graph tags, and structured data |
| CL-C1.3 | MessageListComponent | UI Component | Renders paginated list of messages with infinite scroll support |
| CL-C1.4 | GuestPromoBanner | UI Component | Non-intrusive banner encouraging guests to join the community |
| CL-C1.5 | MessageCard | UI Component | Renders individual message with author info, timestamp, and attachments |
| CL-C1.6 | ServerSidebar | UI Component | Displays server info and list of other public channels for navigation |

### 4.3 Client Interaction Module (M2)

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-C2.1 | InfiniteScrollHandler | Client Component | Manages intersection observer for loading more messages on scroll |
| CL-C2.2 | MessageLinkHandler | Client Component | Handles deep links to specific messages, scrolls and highlights target |
| CL-C2.3 | SearchHighlighter | Client Component | Highlights search terms from referrer URL in message content |
| CL-C2.4 | ShareHandler | Client Component | Provides sharing functionality for messages and channel links |

### 4.4 Public API Module (M3)

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-C3.1 | PublicChannelController | Controller | Handles API requests for public channel data without authentication |
| CL-C3.2 | PublicServerController | Controller | Handles API requests for public server information |

### 4.5 Access Control Module (M4)

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-C4.1 | VisibilityGuard | Service | Checks channel/server visibility before serving content to guests |
| CL-C4.2 | ContentFilter | Service | Filters sensitive content, redacts private mentions from public view |
| CL-C4.3 | RateLimiter | Middleware | Prevents abuse by limiting request rate for anonymous users |
| CL-C4.4 | AnonymousSessionManager | Service | Manages lightweight sessions for guests to store preferences |

### 4.6 Content Delivery Module (M5)

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-C5.1 | MessageService | Service | Retrieves and formats messages for public display |
| CL-C5.2 | AuthorService | Service | Provides public author information, respects privacy settings |
| CL-C5.3 | AttachmentService | Service | Manages public access to message attachments |
| CL-C5.4 | SEOService | Service | Generates SEO metadata, structured data, and canonical URLs |

### 4.7 Data Access Module (M6)

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-C6.1 | ChannelRepository | Repository | Data access for channel entities with visibility filtering |
| CL-C6.2 | MessageRepository | Repository | Data access for messages with pagination support |
| CL-C6.3 | ServerRepository | Repository | Data access for server entities |
| CL-C6.4 | UserRepository | Repository | Data access for user public profile data |

### 4.8 Data Transfer Objects

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-D1 | PublicChannelDTO | DTO | Public-safe channel data for API responses |
| CL-D2 | PublicMessageDTO | DTO | Public-safe message data with permalink |
| CL-D3 | PublicAuthorDTO | DTO | Public author info without user ID |
| CL-D4 | PublicServerDTO | DTO | Public server info for display |
| CL-D5 | PageDataDTO | DTO | Combined data for SSR page rendering |
| CL-D6 | SEODataDTO | DTO | SEO metadata for page head |

### 4.9 Domain Entities

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-E1 | Channel | Entity | Channel domain entity with visibility state |
| CL-E2 | Message | Entity | Message domain entity |
| CL-E3 | Server | Entity | Server domain entity |
| CL-E4 | User | Entity | User domain entity with privacy settings |
| CL-E5 | Attachment | Entity | Message attachment entity |

---

## 5. State Diagrams

### 5.1 System State Variables

| Variable | Type | Description |
|----------|------|-------------|
| request.path | string | Current URL path being requested |
| channel.visibility | ChannelVisibility | Visibility state of requested channel |
| cache.status | CacheStatus | Whether response is cached (HIT/MISS/STALE) |
| guest.sessionId | string | Anonymous session identifier |
| page.loadState | LoadState | Current page loading state |
| messages.pagination | PaginationState | Current pagination position |

### 5.2 Page Load State Machine

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              LEGEND                                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│  (( ))  Initial State        [ ]  State         < >  Decision                   │
│  ─────► Transition           [[ ]] Final State                                  │
└─────────────────────────────────────────────────────────────────────────────────┘

                         (( S0: URL Requested ))
                                    │
                                    │ GET /c/{server}/{channel}
                                    ▼
                    ┌───────────────────────────────┐
                    │ S1: Edge Cache Check          │
                    │ ───────────────────────────── │
                    │ cache.status = CHECKING       │
                    │ request.path = /c/srv/ch      │
                    └───────────────┬───────────────┘
                                    │
                            < Cache Hit? >
                           /              \
                          / Yes            \ No (MISS)
                         ▼                  ▼
        ┌─────────────────────────┐    ┌───────────────────────────────┐
        │ S2: Serve Cached        │    │ S3: Origin Request            │
        │ ─────────────────────── │    │ ───────────────────────────── │
        │ cache.status = HIT      │    │ cache.status = MISS           │
        │ response.source = EDGE  │    │ request.forwarded = true      │
        └───────────┬─────────────┘    └───────────────┬───────────────┘
                    │                                  │
                    │                                  ▼
                    │                  ┌───────────────────────────────┐
                    │                  │ S4: Visibility Check          │
                    │                  │ ───────────────────────────── │
                    │                  │ channel.visibility = ?        │
                    │                  └───────────────┬───────────────┘
                    │                                  │
                    │                  ┌───────────────┴───────────────┐
                    │                  │                               │
                    │          < Is Public? >                          │
                    │         /               \                        │
                    │        / No              \ Yes                   │
                    │       ▼                   ▼                      │
                    │  ┌─────────────────┐  ┌───────────────────────────────┐
                    │  │ S5: Access      │  │ S6: Fetch Content             │
                    │  │ Denied          │  │ ───────────────────────────── │
                    │  │ ─────────────── │  │ messages = loading            │
                    │  │ error = 403     │  │ server = loading              │
                    │  │ OR              │  │ channel = loading             │
                    │  │ redirect = true │  └───────────────┬───────────────┘
                    │  └────────┬────────┘                  │
                    │           │                           ▼
                    │           │          ┌───────────────────────────────┐
                    │           │          │ S7: Render Page               │
                    │           │          │ ───────────────────────────── │
                    │           │          │ page.loadState = COMPLETE     │
                    │           │          │ messages = MessageDTO[]       │
                    │           │          │ seo.tags = generated          │
                    │           │          └───────────────┬───────────────┘
                    │           │                          │
                    │           │                          ▼
                    │           │          ┌───────────────────────────────┐
                    │           │          │ S8: Cache Response            │
                    │           │          │ ───────────────────────────── │
                    │           │          │ cache.stored = true           │
                    │           │          │ cache.ttl = 60s               │
                    │           │          └───────────────┬───────────────┘
                    │           │                          │
                    └───────────┴──────────────────────────┘
                                           │
                                           ▼
                         [[ S9: Response Delivered ]]
                         ─────────────────────────────
                         page.loadState = DELIVERED
                         guest can view content


State Transition Table:
┌────────────────────┬────────────────────────────┬────────────────────┬──────────────────────────────┐
│ Current State      │ Condition/Action           │ Next State         │ Side Effects                 │
├────────────────────┼────────────────────────────┼────────────────────┼──────────────────────────────┤
│ S1: Cache Check    │ Cache key exists, valid    │ S2: Serve Cached   │ Return cached HTML           │
│ S1: Cache Check    │ Cache miss or expired      │ S3: Origin Request │ Forward to origin            │
│ S3: Origin Request │ Always                     │ S4: Visibility     │ Query database               │
│ S4: Visibility     │ visibility != PUBLIC_*     │ S5: Access Denied  │ Return 403 or redirect       │
│ S4: Visibility     │ visibility = PUBLIC_*      │ S6: Fetch Content  │ Query messages               │
│ S6: Fetch Content  │ Content retrieved          │ S7: Render Page    │ Generate HTML                │
│ S7: Render Page    │ Rendering complete         │ S8: Cache Response │ Store in edge cache          │
│ S2, S8             │ Response ready             │ S9: Delivered      │ Send to client               │
└────────────────────┴────────────────────────────┴────────────────────┴──────────────────────────────┘
```

### 5.3 Message Loading State Machine (Client-Side Hydration)

```
                         (( M0: Page Hydrated ))
                                    │
                                    │ Initial messages rendered
                                    ▼
                    ┌───────────────────────────────┐
                    │ M1: Initial View              │
                    │ ───────────────────────────── │
                    │ messages.count = initialBatch │
                    │ pagination.hasMore = true     │
                    │ scroll.position = top         │
                    └───────────────┬───────────────┘
                                    │
                ┌───────────────────┼───────────────────┐
                │                   │                   │
                │ Scroll to bottom  │ Click message link│
                ▼                   │                   ▼
    ┌───────────────────────┐       │       ┌───────────────────────┐
    │ M2: Loading More      │       │       │ M3: Scrolling to      │
    │ ───────────────────── │       │       │ Message               │
    │ loading = true        │       │       │ ───────────────────── │
    │ pagination.page++     │       │       │ targetMessage = id    │
    └───────────┬───────────┘       │       │ scroll.behavior=smooth│
                │                   │       └───────────┬───────────┘
                │ API returns       │                   │
                ▼                   │                   │ Message found
    ┌───────────────────────┐       │                   ▼
    │ M4: Messages Appended │       │       ┌───────────────────────┐
    │ ───────────────────── │       │       │ M5: Message           │
    │ messages += newBatch  │       │       │ Highlighted           │
    │ loading = false       │       │       │ ───────────────────── │
    │ hasMore = response.   │       │       │ highlight.visible=true│
    │   hasMore             │       │       │ highlight.ttl = 3s    │
    └───────────┬───────────┘       │       └───────────┬───────────┘
                │                   │                   │
                └───────────────────┴───────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │ M1: Initial View (Updated)    │
                    │ (Return to browsing state)    │
                    └───────────────────────────────┘
```

### 5.4 Access Denial State Machine

```
                         (( D0: Private Channel Requested ))
                                    │
                                    │ visibility = PRIVATE
                                    ▼
                    ┌───────────────────────────────┐
                    │ D1: Evaluate Response         │
                    │ ───────────────────────────── │
                    │ server.isPublic = ?           │
                    │ referrer.source = ?           │
                    └───────────────┬───────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
            < From search? >  < Server public? >   │
                   │               │               │
                   ▼               ▼               ▼
    ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
    │ D2: Show Login   │  │ D3: Show Server  │  │ D4: Show 404     │
    │ Prompt           │  │ Landing          │  │ Not Found        │
    │ ──────────────── │  │ ──────────────── │  │ ──────────────── │
    │ "Log in to view  │  │ Redirect to      │  │ Channel does not │
    │ this channel"    │  │ /s/{server}      │  │ exist or is      │
    │ + explain why    │  │ Show public      │  │ private          │
    │ + link to join   │  │ channels list    │  │ (no info leak)   │
    └──────────────────┘  └──────────────────┘  └──────────────────┘

Decision Logic:
┌────────────────────────┬────────────────────────┬────────────────────────┐
│ Condition              │ Response               │ Rationale              │
├────────────────────────┼────────────────────────┼────────────────────────┤
│ Channel doesn't exist  │ 404 Not Found          │ Don't reveal existence │
│ Channel private,       │ 403 + Login prompt     │ User expected content  │
│   from search          │                        │                        │
│ Channel private,       │ Redirect to server     │ Show available content │
│   server is public     │   landing              │                        │
│ Channel private,       │ 404 Not Found          │ Don't reveal existence │
│   server is private    │                        │                        │
└────────────────────────┴────────────────────────┴────────────────────────┘
```

---

## 6. Flow Charts

### 6.1 Scenario: Guest Views Public Channel from Search Result

**Scenario Description:** A guest user clicks a search result link that leads to a public channel. The system serves the full content without any login prompts, allowing the user to immediately access the information they were searching for.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              LEGEND                                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│  (( ))   Start/End (Terminal)        [ ]  Process        < >  Decision          │
│  /   /   Input/Output                [===]  Predefined Process (Subroutine)     │
└─────────────────────────────────────────────────────────────────────────────────┘

    (( START: Guest clicks search result ))
    URL: https://harmony.app/c/gamedev/help-and-questions?m=abc123
    Referrer: https://google.com/search?q=unity+physics+bug
                            │
                            │ [State: S0]
                            ▼
            ┌───────────────────────────────┐
            │ [F1.1] Request reaches        │
            │ CloudFlare edge               │
            │ Edge.CacheRouter.checkCache() │
            └───────────────┬───────────────┘
                            │
                            ▼
                    < F1.2: Cache hit? >                    [State: S1]
                   /                    \
                  / Yes                  \ No
                 ▼                        ▼
    ┌─────────────────────────┐    ┌───────────────────────────────┐
    │ [F1.3] Serve cached     │    │ [F1.4] Forward to origin      │
    │ HTML response           │    │ server                        │
    │ [State: S2]             │    │ [State: S3]                   │
    └───────────┬─────────────┘    └───────────────┬───────────────┘
                │                                  │
                │                                  ▼
                │                  ┌───────────────────────────────┐
                │                  │ [F1.5] Parse URL params       │
                │                  │ serverSlug = "gamedev"        │
                │                  │ channelSlug = "help-and-      │
                │                  │   questions"                  │
                │                  │ messageId = "abc123"          │
                │                  └───────────────┬───────────────┘
                │                                  │
                │                                  ▼
                │                  ┌───────────────────────────────┐
                │                  │ [F1.6] Look up channel        │
                │                  │ Server.ChannelRepository.     │
                │                  │   findBySlug(serverSlug,      │
                │                  │     channelSlug)              │
                │                  └───────────────┬───────────────┘
                │                                  │
                │                                  ▼
                │                      < F1.7: Channel exists? >
                │                     /                         \
                │                    / No                    Yes \
                │                   ▼                             ▼
                │      ┌─────────────────────┐    ┌───────────────────────────────┐
                │      │ [F1.8] Return 404   │    │ [F1.9] Check visibility       │
                │      │ "Channel not found" │    │ Server.VisibilityGuard.       │
                │      │ page                │    │   isChannelPublic(channelId)  │
                │      └──────────┬──────────┘    └───────────────┬───────────────┘
                │                 │                               │
                │                 │                               ▼
                │                 │               < F1.10: Is PUBLIC_INDEXABLE
                │                 │                     or PUBLIC_NO_INDEX? >
                │                 │              /                              \
                │                 │             / No (PRIVATE)               Yes \
                │                 │            ▼                                  ▼
                │                 │  ┌─────────────────────┐   ┌───────────────────────────────┐
                │                 │  │ [F1.11] Handle      │   │ [F1.12] Fetch server info     │
                │                 │  │ private channel     │   │ Server.ServerRepository.      │
                │                 │  │ (See Flow 6.2)      │   │   getPublicInfo(serverId)     │
                │                 │  └──────────┬──────────┘   └───────────────┬───────────────┘
                │                 │             │                              │
                │                 │             │                              ▼
                │                 │             │              ┌───────────────────────────────┐
                │                 │             │              │ [F1.13] Fetch public channels │
                │                 │             │              │ for sidebar navigation        │
                │                 │             │              │ Server.ChannelRepository.     │
                │                 │             │              │   findPublicByServerId()      │
                │                 │             │              └───────────────┬───────────────┘
                │                 │             │                              │
                │                 │             │                              ▼
                │                 │             │              ┌───────────────────────────────┐
                │                 │             │              │ [F1.14] Fetch messages        │
                │                 │             │              │ Server.MessageService.        │
                │                 │             │              │   getMessagesForPublicView(   │
                │                 │             │              │     channelId, page=1,        │
                │                 │             │              │     limit=50)                 │
                │                 │             │              └───────────────┬───────────────┘
                │                 │             │                              │
                │                 │             │                              ▼
                │                 │             │              ┌───────────────────────────────┐
                │                 │             │              │ [F1.15] Filter content        │
                │                 │             │              │ Server.ContentFilter.         │
                │                 │             │              │   filterSensitiveContent()    │
                │                 │             │              │   redactUserMentions()        │
                │                 │             │              └───────────────┬───────────────┘
                │                 │             │                              │
                │                 │             │                              ▼
                │                 │             │              ┌───────────────────────────────┐
                │                 │             │              │ [F1.16] Build public author   │
                │                 │             │              │ DTOs (no user IDs)            │
                │                 │             │              │ Server.AuthorService.         │
                │                 │             │              │   getPublicAuthorInfo()       │
                │                 │             │              └───────────────┬───────────────┘
                │                 │             │                              │
                │                 │             │                              ▼
                │                 │             │              ┌───────────────────────────────┐
                │                 │             │              │ [F1.17] Generate SEO data     │
                │                 │             │              │ Server.SEOService.            │  [State: S7]
                │                 │             │              │   generatePageTitle()         │
                │                 │             │              │   generateDescription()       │
                │                 │             │              │   generateStructuredData()    │
                │                 │             │              │   generateBreadcrumbs()       │
                │                 │             │              └───────────────┬───────────────┘
                │                 │             │                              │
                │                 │             │                              ▼
                │                 │             │              ┌───────────────────────────────┐
                │                 │             │              │ [F1.18] Render HTML with      │
                │                 │             │              │ Next.js SSR                   │
                │                 │             │              │ - SEO meta tags in <head>     │
                │                 │             │              │ - Server sidebar              │
                │                 │             │              │ - Message list                │
                │                 │             │              │ - Guest promo banner          │
                │                 │             │              │ - Structured data (JSON-LD)   │
                │                 │             │              └───────────────┬───────────────┘
                │                 │             │                              │
                │                 │             │                              ▼
                │                 │             │              ┌───────────────────────────────┐
                │                 │             │              │ [F1.19] Set cache headers     │  [State: S8]
                │                 │             │              │ Cache-Control: public,        │
                │                 │             │              │   max-age=60, s-maxage=60,    │
                │                 │             │              │   stale-while-revalidate=300  │
                │                 │             │              │ X-Robots-Tag: index, follow   │
                │                 │             │              └───────────────┬───────────────┘
                │                 │             │                              │
                └─────────────────┴─────────────┴──────────────────────────────┘
                                               │
                                               ▼
                               ┌───────────────────────────────┐
                               │ [F1.20] Response delivered    │  [State: S9]
                               │ to guest's browser            │
                               └───────────────┬───────────────┘
                                               │
                                               ▼
                               ┌───────────────────────────────┐
                               │ [F1.21] Browser renders page  │
                               │ Guest sees full channel       │
                               │ content immediately           │
                               └───────────────┬───────────────┘
                                               │
                                               ▼
                                   < F1.22: messageId in URL? >
                                  /                            \
                                 / No                       Yes \
                                ▼                                ▼
                ┌───────────────────────┐    ┌───────────────────────────────┐
                │ [F1.23] Display from  │    │ [F1.24] Scroll to message     │
                │ top of channel        │    │ and highlight it              │
                │                       │    │ Client.MessageLinkHandler.    │
                │                       │    │   scrollToMessage()           │
                │                       │    │   highlightMessage()          │
                └───────────┬───────────┘    └───────────────┬───────────────┘
                            │                                │
                            └────────────────┬───────────────┘
                                             │
                                             ▼
                               ┌───────────────────────────────┐
                               │ [F1.25] Parse search terms    │
                               │ from referrer URL             │
                               │ Client.SearchHighlighter.     │
                               │   parseSearchTerms()          │
                               │   highlightMatches()          │
                               └───────────────┬───────────────┘
                                               │
                                               ▼
                    (( END: Guest viewing public channel ))
                    - Full content visible
                    - No login prompt shown
                    - Search terms highlighted
                    - Can navigate to other public channels
```

### 6.2 Scenario: Guest Requests Private Channel

**Scenario Description:** A guest user requests a channel URL that points to a private channel. The system provides a helpful response without revealing sensitive information about the server's structure.

```
    (( START: Guest requests private channel ))
    URL: https://harmony.app/c/company/internal-hr
                            │
                            │ [State: D0]
                            ▼
            ┌───────────────────────────────┐
            │ [F2.1] Visibility check       │
            │ returns PRIVATE               │
            │ Server.VisibilityGuard.       │
            │   getVisibilityStatus()       │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F2.2] Check request context  │  [State: D1]
            │ - Parse referrer header       │
            │ - Check if from search engine │
            │ - Check server publicity      │
            └───────────────┬───────────────┘
                            │
                            ▼
                < F2.3: Server is public? >
               /                            \
              / No                        Yes \
             ▼                                 ▼
┌─────────────────────────┐    ┌───────────────────────────────┐
│ [F2.4] Return 404       │    │ [F2.5] Check referrer         │
│ "Page not found"        │    │                               │
│ [State: D4]             │    └───────────────┬───────────────┘
│                         │                    │
│ Do not reveal that      │                    ▼
│ server or channel       │        < F2.6: From search engine? >
│ exists                  │       /                             \
└─────────────────────────┘      / Yes                        No \
                                ▼                                 ▼
                ┌───────────────────────────┐  ┌───────────────────────────────┐
                │ [F2.7] Show login prompt  │  │ [F2.8] Redirect to server     │
                │ with explanation          │  │ landing page                  │
                │ [State: D2]               │  │ [State: D3]                   │
                │                           │  │                               │
                │ "This channel requires    │  │ 302 Redirect to               │
                │ membership to view.       │  │ /s/company                    │
                │                           │  │                               │
                │ The content you're        │  │ Show list of public           │
                │ looking for may be in     │  │ channels in this server       │
                │ a private channel.        │  │                               │
                │                           │  │ "The channel you requested    │
                │ [Login] [Create Account]  │  │ is private. Here are public   │
                │ [Browse Public Channels]" │  │ channels you can view:"       │
                └───────────────────────────┘  └───────────────────────────────┘
                            │                                │
                            └────────────────┬───────────────┘
                                             │
                                             ▼
                    (( END: Appropriate response served ))
                    - No sensitive info leaked
                    - User guided to available content
                    - Clear explanation provided
```

### 6.3 Scenario: Guest Loads More Messages (Infinite Scroll)

**Scenario Description:** A guest user scrolls to the bottom of the message list, triggering the infinite scroll mechanism to load older messages without a full page reload.

```
    (( START: Guest scrolls to bottom ))
                            │
                            │ [State: M1]
                            ▼
            ┌───────────────────────────────┐
            │ [F3.1] IntersectionObserver   │
            │ detects sentinel element      │
            │ Client.InfiniteScrollHandler. │
            │   onIntersect()               │
            └───────────────┬───────────────┘
                            │
                            ▼
                < F3.2: hasMore == true? >
               /                           \
              / No                       Yes \
             ▼                                ▼
┌─────────────────────────┐    ┌───────────────────────────────┐
│ [F3.3] Do nothing       │    │ [F3.4] Set loading state      │  [State: M2]
│ All messages loaded     │    │ loading = true                │
└─────────────────────────┘    │ Show loading spinner          │
                               └───────────────┬───────────────┘
                                               │
                                               ▼
                               ┌───────────────────────────────┐
                               │ [F3.5] Fetch next page        │
                               │ Client API call:              │
                               │ GET /api/public/channels/     │
                               │   {channelId}/messages        │
                               │   ?page={currentPage+1}       │
                               │   &limit=50                   │
                               └───────────────┬───────────────┘
                                               │
                                               ▼
                               ┌───────────────────────────────┐
                               │ [F3.6] Server validates       │
                               │ channel is still public       │
                               │ (visibility could change)     │
                               └───────────────┬───────────────┘
                                               │
                                               ▼
                                   < F3.7: Still public? >
                                  /                        \
                                 / No                    Yes \
                                ▼                             ▼
                ┌───────────────────────────┐  ┌───────────────────────────────┐
                │ [F3.8] Return 403         │  │ [F3.9] Fetch messages         │
                │ Show "channel is now      │  │ Server.MessageRepository.     │
                │ private" message          │  │   findByChannelPaginated()    │
                └───────────────────────────┘  └───────────────┬───────────────┘
                                                               │
                                                               ▼
                                               ┌───────────────────────────────┐
                                               │ [F3.10] Apply content filter  │
                                               │ Server.ContentFilter.         │
                                               │   filterSensitiveContent()    │
                                               └───────────────┬───────────────┘
                                                               │
                                                               ▼
                                               ┌───────────────────────────────┐
                                               │ [F3.11] Return JSON response  │
                                               │ {                             │
                                               │   messages: MessageDTO[],     │
                                               │   hasMore: boolean,           │
                                               │   nextPage: number            │
                                               │ }                             │
                                               └───────────────┬───────────────┘
                                                               │
                                                               ▼
                                               ┌───────────────────────────────┐
                                               │ [F3.12] Append messages to    │  [State: M4]
                                               │ existing list                 │
                                               │ Client.MessageListComponent.  │
                                               │   appendMessages()            │
                                               └───────────────┬───────────────┘
                                                               │
                                                               ▼
                                               ┌───────────────────────────────┐
                                               │ [F3.13] Update state          │
                                               │ loading = false               │
                                               │ hasMore = response.hasMore    │
                                               │ currentPage++                 │
                                               └───────────────┬───────────────┘
                                                               │
                                                               ▼
                    (( END: More messages displayed ))  [State: M1]
                    - Seamless scroll experience
                    - No page reload required
                    - Loading indicator shown during fetch
```

### 6.4 Scenario: Search Engine Bot Crawls Public Channel

**Scenario Description:** A search engine bot (Googlebot, Bingbot, etc.) crawls a public channel page. The system serves optimized content with appropriate SEO signals.

```
    (( START: Bot requests public channel ))
    User-Agent: Googlebot/2.1
    URL: https://harmony.app/c/opensource/announcements
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F4.1] Bot detection at edge  │
            │ Edge.BotDetector.detectBot()  │
            │ Identified: Googlebot         │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F4.2] Apply bot-specific     │
            │ handling                      │
            │ - Skip JS-dependent content   │
            │ - Ensure full HTML render     │
            │ - Apply bot rate limits       │
            └───────────────┬───────────────┘
                            │
                            ▼
            (Same visibility and content flow as F1.4-F1.18)
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F4.3] Generate bot-optimized │
            │ response                      │
            │                               │
            │ Include:                      │
            │ - Full message content inline │
            │ - Structured data (JSON-LD)   │
            │ - Canonical URL               │
            │ - Breadcrumb schema           │
            │ - hreflang tags (if i18n)     │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F4.4] Set SEO headers        │
            │                               │
            │ X-Robots-Tag: index, follow   │
            │ Link: <canonical>; rel=canon  │
            │ Cache-Control: public,        │
            │   s-maxage=3600               │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F4.5] Return HTML with       │
            │ structured data               │
            │                               │
            │ <script type="application/    │
            │   ld+json">                   │
            │ {                             │
            │   "@context": "schema.org",   │
            │   "@type": "DiscussionForum   │
            │     Posting",                 │
            │   "headline": "...",          │
            │   "datePublished": "...",     │
            │   "author": {...}             │
            │ }                             │
            │ </script>                     │
            └───────────────┬───────────────┘
                            │
                            ▼
                    (( END: Bot crawl complete ))
                    - Content indexed
                    - Structured data parsed
                    - Links discovered
```

---

## 7. Development Risks and Failures

### 7.1 Runtime Failures

| Label | Failure Mode | User-Visible Effect | Internal Effect | Recovery Procedure | Likelihood | Impact |
|-------|--------------|--------------------|-----------------|--------------------|------------|--------|
| RF-1 | SSR render crash | 500 error page | React hydration failure | Error boundary catches; shows fallback UI | Medium | High |
| RF-2 | Database query timeout | Slow page load or timeout | Connection pool exhaustion | Query optimization; read replicas; timeout handling | Medium | Medium |
| RF-3 | Cache corruption | Stale or incorrect content shown | Cache-DB inconsistency | Cache invalidation; serve from DB | Low | Medium |
| RF-4 | Memory leak in SSR | Gradual performance degradation | Node.js process OOM | Process recycling; memory monitoring | Low | High |
| RF-5 | Infinite scroll breaks | Users can't load more messages | Client JS error | Fallback pagination links; error logging | Medium | Low |
| RF-6 | SEO data generation fails | Missing meta tags | Empty title/description | Default fallback values; monitoring | Low | Medium |
| RF-7 | Content filter regex timeout | Slow response on large messages | CPU spike | Regex timeout limits; message size limits | Low | Medium |

### 7.2 Connectivity Failures

| Label | Failure Mode | User-Visible Effect | Internal Effect | Recovery Procedure | Likelihood | Impact |
|-------|--------------|--------------------|-----------------|--------------------|------------|--------|
| CF-1 | CDN edge outage | Regional unavailability | Cache layer bypassed | Multi-CDN failover; origin direct access | Low | High |
| CF-2 | Origin unreachable | 502/503 errors | CDN can't reach server | Health checks; auto-scaling; stale-while-revalidate | Low | High |
| CF-3 | Database connection loss | 500 errors | All queries fail | Connection retry; replica failover | Low | Critical |
| CF-4 | Redis cache unavailable | Slower responses | Cache misses; DB load increase | Degrade gracefully; serve from DB | Medium | Medium |
| CF-5 | Slow network to guest | Long load times | Time to first byte high | CDN edge caching; image optimization | Medium | Medium |

### 7.3 Hardware Failures

| Label | Failure Mode | User-Visible Effect | Internal Effect | Recovery Procedure | Likelihood | Impact |
|-------|--------------|--------------------|-----------------|--------------------|------------|--------|
| HF-1 | Web server crash | Brief unavailability | Container restart | Auto-restart; load balancer rerouting | Low | Medium |
| HF-2 | Database server down | Complete outage | All writes/reads fail | Automatic failover to replica | Very Low | Critical |
| HF-3 | Storage full | New messages not visible | Write failures | Storage alerts; auto-scaling storage | Low | High |

### 7.4 Security/Intruder Failures

| Label | Failure Mode | User-Visible Effect | Internal Effect | Recovery Procedure | Likelihood | Impact |
|-------|--------------|--------------------|-----------------|--------------------|------------|--------|
| IF-1 | DDoS on public pages | Service degradation | Resource exhaustion | CloudFlare DDoS protection; rate limiting | Medium | High |
| IF-2 | Scraping abuse | None (internal cost) | Bandwidth/compute abuse | Bot detection; rate limiting; CAPTCHA | High | Medium |
| IF-3 | Visibility bypass attempt | 403 error (if working) | Security log entry | Input validation; server-side checks | Medium | Critical |
| IF-4 | XSS via message content | Malicious script execution | User session compromise | Content sanitization; CSP headers | Low | Critical |
| IF-5 | Cache poisoning | Wrong content served | Cache serves malicious response | Cache key validation; purge capability | Very Low | Critical |
| IF-6 | Enumeration attack | None (if protected) | Load on database | Rate limiting; no existence disclosure | Medium | Low |

### 7.5 Content/Data Failures

| Label | Failure Mode | User-Visible Effect | Internal Effect | Recovery Procedure | Likelihood | Impact |
|-------|--------------|--------------------|-----------------|--------------------|------------|--------|
| DF-1 | Private content exposed | Privacy breach | Visibility check bypassed | Audit; immediate visibility fix; notification | Very Low | Critical |
| DF-2 | User ID leaked in public DTO | Privacy concern | PII exposure | DTO review; immediate patch | Low | High |
| DF-3 | Deleted message shown | Confusing content | Soft delete not respected | Query filter fix; cache purge | Low | Medium |
| DF-4 | Attachment not loading | Broken images/files | Storage access issue | CDN retry; fallback placeholder | Medium | Low |

### 7.6 Failure Priority Matrix

```
                    Impact
                    Low         Medium      High        Critical
            ┌───────────────────────────────────────────────────┐
     High   │ IF-2      │           │ IF-1      │              │
            ├───────────┼───────────┼───────────┼──────────────┤
            │ RF-5      │ RF-2,CF-4 │ RF-1      │              │
   Medium   │ IF-6      │ CF-5      │           │ IF-3         │
            ├───────────┼───────────┼───────────┼──────────────┤
            │           │ RF-3,RF-6 │ RF-4,HF-1 │ CF-3,IF-4    │
     Low    │ DF-4      │ RF-7,DF-3 │ DF-2,HF-3 │ DF-1         │
            ├───────────┼───────────┼───────────┼──────────────┤
  Very Low  │           │           │ CF-1,CF-2 │ HF-2,IF-5    │
            └───────────────────────────────────────────────────┘
```

---

## 8. Technology Stack

| Label | Technology | Version | Purpose | Rationale | Source/Documentation |
|-------|------------|---------|---------|-----------|---------------------|
| T1 | TypeScript | 5.3+ | Primary language | Type safety across stack | https://www.typescriptlang.org/ |
| T2 | Next.js | 14.0+ | React framework with SSR | Critical for SEO; server components | https://nextjs.org/ |
| T3 | React | 18.2+ | UI framework | Component model; hydration support | https://react.dev/ |
| T4 | Node.js | 20 LTS | Server runtime | SSR execution; API routes | https://nodejs.org/ |
| T5 | PostgreSQL | 16+ | Primary database | Robust queries; full-text search | https://www.postgresql.org/ |
| T6 | Redis | 7.2+ | Caching layer | Fast reads; session storage | https://redis.io/ |
| T7 | Prisma | 5.8+ | ORM | Type-safe database access | https://www.prisma.io/ |
| T8 | CloudFlare | N/A | CDN/Edge | Global caching; DDoS protection; edge workers | https://www.cloudflare.com/ |
| T9 | TailwindCSS | 3.4+ | Styling | Utility-first; consistent design | https://tailwindcss.com/ |
| T10 | Zod | 3.22+ | Validation | Runtime type checking | https://zod.dev/ |
| T11 | DOMPurify | 3.0+ | HTML sanitization | XSS prevention | https://github.com/cure53/DOMPurify |
| T12 | schema-dts | 1.1+ | Structured data types | Type-safe JSON-LD generation | https://github.com/google/schema-dts |
| T13 | intersection-observer | (polyfill) | Infinite scroll | Cross-browser scroll detection | https://github.com/w3c/IntersectionObserver |
| T14 | sharp | 0.33+ | Image processing | Thumbnail generation; optimization | https://sharp.pixelplumbing.com/ |
| T15 | Jest | 29+ | Unit testing | Component and service tests | https://jestjs.io/ |
| T16 | Playwright | 1.40+ | E2E testing | SEO verification; crawl simulation | https://playwright.dev/ |
| T17 | Lighthouse CI | 11+ | Performance testing | Core Web Vitals monitoring | https://github.com/GoogleChrome/lighthouse-ci |

---

## 9. APIs

### 9.1 Module M3: Public API

#### 9.1.1 CL-C3.1 PublicChannelController

**Public Methods (Unauthenticated):**

```typescript
// Get public channel with initial messages (SSR)
// GET /c/{serverSlug}/{channelSlug}
getPublicChannelPage(
  serverSlug: string,           // URL-safe server identifier
  channelSlug: string,          // URL-safe channel identifier
  query: {
    m?: string,                 // Optional message ID to highlight
    page?: number               // Optional page number
  }
): Promise<SSRPageResponse>     // Full HTML page with hydration data

// Get public channel messages (API for infinite scroll)
// GET /api/public/channels/{channelId}/messages
getPublicMessages(
  channelId: string,            // UUID of the channel
  query: {
    page: number,               // Page number (1-indexed)
    limit: number,              // Messages per page (max 100)
    before?: string,            // Cursor: message ID to fetch before
    after?: string              // Cursor: message ID to fetch after
  }
): Promise<PublicMessagesResponse>

// Get single message by ID (for deep links)
// GET /api/public/channels/{channelId}/messages/{messageId}
getPublicMessage(
  channelId: string,
  messageId: string
): Promise<PublicMessageResponse>
```

**Private Methods:**

```typescript
private validateChannelAccess(
  channelId: string
): Promise<VisibilityStatus>

private buildPublicMessageDTO(
  message: Message,
  author: User
): PublicMessageDTO

private applyContentFilters(
  messages: Message[]
): Message[]
```

#### 9.1.2 CL-C3.2 PublicServerController

**Public Methods (Unauthenticated):**

```typescript
// Get public server info
// GET /api/public/servers/{serverSlug}
getPublicServerInfo(
  serverSlug: string
): Promise<PublicServerDTO>

// Get list of public channels in server
// GET /api/public/servers/{serverSlug}/channels
getPublicChannelList(
  serverSlug: string
): Promise<PublicChannelDTO[]>

// Get server landing page (SSR)
// GET /s/{serverSlug}
getServerLandingPage(
  serverSlug: string
): Promise<SSRPageResponse>
```

### 9.2 Module M4: Access Control

#### 9.2.1 CL-C4.1 VisibilityGuard

**Public Methods:**

```typescript
// Check if channel is publicly accessible
isChannelPublic(
  channelId: string
): Promise<boolean>

// Check if server has any public channels
isServerPublic(
  serverId: string
): Promise<boolean>

// Get detailed visibility status
getVisibilityStatus(
  channelId: string
): Promise<VisibilityStatus>
// Returns: { isPublic, visibility, indexable, reason }
```

#### 9.2.2 CL-C4.2 ContentFilter

**Public Methods:**

```typescript
// Filter sensitive content from messages
filterSensitiveContent(
  content: string
): string

// Redact @mentions to non-public users
redactUserMentions(
  content: string,
  publicUserIds: Set<string>
): string

// Sanitize HTML content for safe display
sanitizeForDisplay(
  content: string
): string

// Check if attachments can be shown publicly
sanitizeAttachments(
  attachments: Attachment[]
): PublicAttachment[]
```

#### 9.2.3 CL-C4.3 RateLimiter

**Public Methods:**

```typescript
// Check if request should be rate limited
checkLimit(
  identifier: string,           // IP or fingerprint
  endpoint: string
): Promise<RateLimitResult>
// Returns: { allowed, remaining, resetAt }

// Record a request
incrementCounter(
  identifier: string,
  endpoint: string
): Promise<void>

// Check if currently rate limited
isRateLimited(
  identifier: string
): Promise<boolean>
```

#### 9.2.4 CL-C4.4 AnonymousSessionManager

**Public Methods:**

```typescript
// Get or create anonymous session
getOrCreateSession(
  request: Request
): Promise<GuestSession>

// Store preference for guest
storePreference(
  sessionId: string,
  key: string,
  value: unknown
): Promise<void>

// Get guest preferences
getPreferences(
  sessionId: string
): Promise<GuestPreferences>
```

### 9.3 Module M5: Content Delivery

#### 9.3.1 CL-C5.1 MessageService

**Public Methods:**

```typescript
// Get messages formatted for public view
getMessagesForPublicView(
  channelId: string,
  options: {
    page: number,
    limit: number,
    before?: string,
    after?: string
  }
): Promise<{
  messages: PublicMessageDTO[],
  hasMore: boolean,
  total: number
}>

// Get single message by ID
getMessageById(
  messageId: string
): Promise<PublicMessageDTO | null>
```

**Private Methods:**

```typescript
private buildMessageDTO(
  message: Message
): PublicMessageDTO

private enrichWithAuthor(
  message: Message
): Promise<MessageWithAuthor>
```

#### 9.3.2 CL-C5.2 AuthorService

**Public Methods:**

```typescript
// Get public author info (no user ID)
getPublicAuthorInfo(
  userId: string
): Promise<PublicAuthorDTO>

// Anonymize author if they opted out
anonymizeAuthor(
  user: User
): PublicAuthorDTO

// Get display name respecting privacy
getDisplayName(
  user: User
): string
```

#### 9.3.3 CL-C5.3 AttachmentService

**Public Methods:**

```typescript
// Get public URL for attachment
getPublicAttachmentUrl(
  attachmentId: string
): Promise<string | null>

// Generate thumbnail for image
generateThumbnail(
  attachmentId: string,
  size: ThumbnailSize
): Promise<string>

// Check if attachment can be public
isAttachmentPublic(
  attachment: Attachment
): boolean
```

#### 9.3.4 CL-C5.4 SEOService

**Public Methods:**

```typescript
// Generate page title
generatePageTitle(
  server: Server,
  channel: Channel,
  message?: Message
): string

// Generate meta description
generateDescription(
  channel: Channel,
  recentMessages: Message[]
): string

// Generate JSON-LD structured data
generateStructuredData(
  server: Server,
  channel: Channel,
  messages: Message[]
): StructuredData

// Generate breadcrumb data
generateBreadcrumbs(
  server: Server,
  channel: Channel
): BreadcrumbList

// Get canonical URL
getCanonicalUrl(
  serverSlug: string,
  channelSlug: string,
  messageId?: string
): string
```

### 9.4 Module M6: Data Access

#### 9.4.1 CL-C6.1 ChannelRepository

**Public Methods:**

```typescript
// Find channel by slug
findBySlug(
  serverSlug: string,
  channelSlug: string
): Promise<Channel | null>

// Find all public channels for server
findPublicByServerId(
  serverId: string
): Promise<Channel[]>

// Get visibility directly
getVisibility(
  channelId: string
): Promise<ChannelVisibility>
```

#### 9.4.2 CL-C6.2 MessageRepository

**Public Methods:**

```typescript
// Find messages with pagination
findByChannelPaginated(
  channelId: string,
  options: PaginationOptions
): Promise<PaginatedResult<Message>>

// Find single message
findById(
  messageId: string
): Promise<Message | null>

// Count messages in channel
countByChannel(
  channelId: string
): Promise<number>
```

---

## 10. Public Interfaces

### 10.1 Cross-Module Interface Usage

#### Used by Public View Module (M1, M2) from Public API (M3):

| Method | Class | Used For |
|--------|-------|----------|
| getPublicChannelPage() | PublicChannelController | SSR page rendering |
| getPublicMessages() | PublicChannelController | Infinite scroll API |
| getPublicServerInfo() | PublicServerController | Server sidebar |
| getPublicChannelList() | PublicServerController | Channel navigation |

#### Used by Public API (M3) from Access Control (M4):

| Method | Class | Used For |
|--------|-------|----------|
| isChannelPublic() | VisibilityGuard | Access check before serving |
| getVisibilityStatus() | VisibilityGuard | Detailed visibility info |
| filterSensitiveContent() | ContentFilter | Message sanitization |
| redactUserMentions() | ContentFilter | Privacy protection |
| checkLimit() | RateLimiter | Abuse prevention |

#### Used by Public API (M3) from Content Delivery (M5):

| Method | Class | Used For |
|--------|-------|----------|
| getMessagesForPublicView() | MessageService | Fetching messages |
| getPublicAuthorInfo() | AuthorService | Author display data |
| generatePageTitle() | SEOService | SEO metadata |
| generateStructuredData() | SEOService | JSON-LD |
| getPublicAttachmentUrl() | AttachmentService | Attachment URLs |

#### Used by Content Delivery (M5) from Data Access (M6):

| Method | Class | Used For |
|--------|-------|----------|
| findBySlug() | ChannelRepository | Channel lookup |
| findByChannelPaginated() | MessageRepository | Message fetching |
| getPublicProfile() | UserRepository | Author info |

### 10.2 REST API Interface

```yaml
openapi: 3.0.3
info:
  title: Harmony Public Channel API
  version: 1.0.0
  description: Unauthenticated API for accessing public channel content

paths:
  /api/public/channels/{channelId}/messages:
    get:
      summary: Get public messages from a channel
      description: Returns paginated messages for public viewing. No authentication required.
      parameters:
        - name: channelId
          in: path
          required: true
          schema:
            type: string
            format: uuid
        - name: page
          in: query
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 50
        - name: before
          in: query
          description: Fetch messages before this message ID
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Messages retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PublicMessagesResponse'
          headers:
            Cache-Control:
              schema:
                type: string
                example: "public, max-age=60, s-maxage=60"
            X-RateLimit-Remaining:
              schema:
                type: integer
        '403':
          description: Channel is not public
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AccessDeniedResponse'
        '404':
          description: Channel not found
        '429':
          description: Rate limit exceeded

  /api/public/servers/{serverSlug}:
    get:
      summary: Get public server information
      parameters:
        - name: serverSlug
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Server info retrieved
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PublicServerDTO'
        '404':
          description: Server not found or not public

components:
  schemas:
    PublicMessagesResponse:
      type: object
      properties:
        messages:
          type: array
          items:
            $ref: '#/components/schemas/PublicMessageDTO'
        pagination:
          type: object
          properties:
            page:
              type: integer
            limit:
              type: integer
            total:
              type: integer
            hasMore:
              type: boolean
            nextCursor:
              type: string

    PublicMessageDTO:
      type: object
      properties:
        id:
          type: string
          format: uuid
        content:
          type: string
          description: Sanitized message content
        author:
          $ref: '#/components/schemas/PublicAuthorDTO'
        timestamp:
          type: string
          format: date-time
        editedAt:
          type: string
          format: date-time
          nullable: true
        attachments:
          type: array
          items:
            $ref: '#/components/schemas/PublicAttachmentDTO'
        permalink:
          type: string
          format: uri
          description: Direct link to this message

    PublicAuthorDTO:
      type: object
      description: Author info without exposing user ID
      properties:
        displayName:
          type: string
        avatarUrl:
          type: string
          format: uri
          nullable: true
        isBot:
          type: boolean

    PublicAttachmentDTO:
      type: object
      properties:
        id:
          type: string
        filename:
          type: string
        url:
          type: string
          format: uri
        contentType:
          type: string
        thumbnailUrl:
          type: string
          format: uri
          nullable: true

    PublicServerDTO:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
        description:
          type: string
        iconUrl:
          type: string
          format: uri
        memberCount:
          type: integer
        publicChannelCount:
          type: integer

    AccessDeniedResponse:
      type: object
      properties:
        error:
          type: string
          example: "CHANNEL_NOT_PUBLIC"
        message:
          type: string
          example: "This channel requires membership to view"
        serverSlug:
          type: string
          description: Server slug for redirect (if server is public)
```

---

## 11. Data Schemas

### 11.1 Database Tables

#### D7.1 ServersTable

**Runtime Class:** CL-E3 Server

| Column | Database Type | Constraints | Description | Storage Est. |
|--------|--------------|-------------|-------------|--------------|
| id | UUID | PRIMARY KEY | Unique server identifier | 16 bytes |
| name | VARCHAR(100) | NOT NULL | Display name | ~40 bytes |
| slug | VARCHAR(100) | NOT NULL, UNIQUE, INDEX | URL-safe identifier | ~30 bytes |
| description | TEXT | NULL | Server description | ~200 bytes |
| icon_url | VARCHAR(500) | NULL | Server icon URL | ~100 bytes |
| is_public | BOOLEAN | NOT NULL, DEFAULT FALSE | Whether server appears in discovery | 1 byte |
| member_count | INTEGER | NOT NULL, DEFAULT 0 | Cached member count | 4 bytes |
| created_at | TIMESTAMP WITH TIME ZONE | NOT NULL | Creation time | 8 bytes |

**Indexes:**
```sql
CREATE INDEX idx_servers_slug ON servers(slug);
CREATE INDEX idx_servers_public ON servers(is_public) WHERE is_public = true;
```

**Storage Estimate:** ~400 bytes per server

#### D7.2 ChannelsTable

**Runtime Class:** CL-E1 Channel

| Column | Database Type | Constraints | Description | Storage Est. |
|--------|--------------|-------------|-------------|--------------|
| id | UUID | PRIMARY KEY | Unique channel identifier | 16 bytes |
| server_id | UUID | FOREIGN KEY, NOT NULL, INDEX | Parent server | 16 bytes |
| name | VARCHAR(100) | NOT NULL | Display name | ~40 bytes |
| slug | VARCHAR(100) | NOT NULL, INDEX | URL-safe identifier (unique per server) | ~30 bytes |
| visibility | visibility_enum | NOT NULL, DEFAULT 'PRIVATE' | Visibility state | 1 byte |
| topic | TEXT | NULL | Channel topic/description | ~100 bytes |
| position | INTEGER | NOT NULL, DEFAULT 0 | Sort order | 4 bytes |
| created_at | TIMESTAMP WITH TIME ZONE | NOT NULL | Creation time | 8 bytes |

**Indexes:**
```sql
CREATE UNIQUE INDEX idx_channels_server_slug ON channels(server_id, slug);
CREATE INDEX idx_channels_visibility ON channels(visibility)
  WHERE visibility IN ('PUBLIC_INDEXABLE', 'PUBLIC_NO_INDEX');
```

**Storage Estimate:** ~215 bytes per channel

#### D7.3 MessagesTable

**Runtime Class:** CL-E2 Message

| Column | Database Type | Constraints | Description | Storage Est. |
|--------|--------------|-------------|-------------|--------------|
| id | UUID | PRIMARY KEY | Unique message identifier | 16 bytes |
| channel_id | UUID | FOREIGN KEY, NOT NULL, INDEX | Parent channel | 16 bytes |
| author_id | UUID | FOREIGN KEY, NOT NULL | Message author | 16 bytes |
| content | TEXT | NOT NULL | Message content | ~500 bytes avg |
| created_at | TIMESTAMP WITH TIME ZONE | NOT NULL, INDEX | Creation time | 8 bytes |
| edited_at | TIMESTAMP WITH TIME ZONE | NULL | Last edit time | 8 bytes |
| is_deleted | BOOLEAN | NOT NULL, DEFAULT FALSE | Soft delete flag | 1 byte |

**Indexes:**
```sql
CREATE INDEX idx_messages_channel_time ON messages(channel_id, created_at DESC);
CREATE INDEX idx_messages_channel_not_deleted ON messages(channel_id, created_at DESC)
  WHERE is_deleted = false;
```

**Storage Estimate:** ~565 bytes per message

#### D7.4 UsersTable

**Runtime Class:** CL-E4 User

| Column | Database Type | Constraints | Description | Storage Est. |
|--------|--------------|-------------|-------------|--------------|
| id | UUID | PRIMARY KEY | Unique user identifier | 16 bytes |
| username | VARCHAR(32) | NOT NULL, UNIQUE | Login username | ~20 bytes |
| display_name | VARCHAR(100) | NOT NULL | Public display name | ~40 bytes |
| avatar_url | VARCHAR(500) | NULL | Avatar image URL | ~100 bytes |
| public_profile | BOOLEAN | NOT NULL, DEFAULT TRUE | Show in public channels | 1 byte |
| created_at | TIMESTAMP WITH TIME ZONE | NOT NULL | Registration time | 8 bytes |

**Storage Estimate:** ~185 bytes per user

#### D7.5 AttachmentsTable

**Runtime Class:** CL-E5 Attachment

| Column | Database Type | Constraints | Description | Storage Est. |
|--------|--------------|-------------|-------------|--------------|
| id | UUID | PRIMARY KEY | Unique attachment identifier | 16 bytes |
| message_id | UUID | FOREIGN KEY, NOT NULL, INDEX | Parent message | 16 bytes |
| filename | VARCHAR(255) | NOT NULL | Original filename | ~50 bytes |
| url | VARCHAR(500) | NOT NULL | Storage URL | ~150 bytes |
| content_type | VARCHAR(100) | NOT NULL | MIME type | ~30 bytes |
| size_bytes | BIGINT | NOT NULL | File size | 8 bytes |

**Storage Estimate:** ~270 bytes per attachment

### 11.2 Cache Schemas

#### D8.1 ChannelVisibilityCache

**Key Pattern:** `channel:vis:{serverSlug}:{channelSlug}`
**Value Type:** JSON `{ visibility: string, channelId: string }`
**TTL:** 3600 seconds (1 hour)
**Invalidation:** On visibility change via admin toggle

#### D8.2 PublicMessagesCache

**Key Pattern:** `channel:msgs:{channelId}:page:{pageNum}`
**Value Type:** JSON array of PublicMessageDTO
**TTL:** 60 seconds
**Invalidation:** On new message in channel

#### D8.3 ServerInfoCache

**Key Pattern:** `server:info:{serverSlug}`
**Value Type:** JSON PublicServerDTO
**TTL:** 300 seconds (5 minutes)
**Invalidation:** On server info update

#### D8.4 GuestSessionCache

**Key Pattern:** `guest:session:{sessionId}`
**Value Type:** JSON `{ preferences: object, createdAt: timestamp }`
**TTL:** 86400 seconds (24 hours)
**Purpose:** Store guest preferences (dismissed banners, etc.)

### 11.3 Storage Estimates

| Data Type | Records (Est.) | Per Record | Total Est. | Growth Rate |
|-----------|---------------|------------|------------|-------------|
| Servers | 10,000 | 400 bytes | 4 MB | 100/month |
| Channels | 100,000 | 215 bytes | 21.5 MB | 1,000/month |
| Messages | 100,000,000 | 565 bytes | 56.5 GB | 1M/month |
| Users | 1,000,000 | 185 bytes | 185 MB | 10,000/month |
| Attachments | 10,000,000 | 270 bytes | 2.7 GB | 100,000/month |

---

## 12. Security and Privacy

### 12.1 Temporarily Stored PII

| PII Type | Justification | Entry Point | Processing Path | Disposal | Protection |
|----------|---------------|-------------|-----------------|----------|------------|
| IP Address | Rate limiting, abuse prevention | HTTP request | RateLimiter -> Redis | TTL expiry (1 hour) | Not logged; hashed for rate limit keys |
| User Agent | Bot detection | HTTP request | BotDetector | Not stored | Used only for classification |
| Search Terms (from referrer) | Feature: highlight matching terms | HTTP Referer header | SearchHighlighter (client-side only) | Not sent to server | Client-side only; not logged |

### 12.2 Long-Term Stored PII Exposure

| PII Type | Stored Location | Exposure in Public View | Mitigation |
|----------|-----------------|------------------------|------------|
| User ID | D7.3 Messages.author_id | NOT exposed in PublicAuthorDTO | Stripped at AuthorService layer |
| Username | D7.4 Users.username | NOT exposed | Only display_name shown |
| Display Name | D7.4 Users.display_name | Exposed (user's choice) | User can opt out via public_profile |
| Avatar URL | D7.4 Users.avatar_url | Exposed (user's choice) | User can opt out via public_profile |
| Message Content | D7.3 Messages.content | Exposed (in public channels) | Content filter applied |

### 12.3 Privacy Controls

**User Privacy Settings:**
- `public_profile` flag: If false, author shown as "Anonymous" in public views
- Users can delete messages (soft delete, not shown in public view)
- Users can edit messages (edited_at shown in public view)

**Content Filtering:**
- @mentions of users with `public_profile=false` are redacted
- Email addresses detected and redacted
- Phone numbers detected and redacted
- Private channel links filtered out

### 12.4 Data Flow for Public View

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Data Flow: Message to Public View                 │
└─────────────────────────────────────────────────────────────────────┘

Database                 Server                           Client
───────                  ──────                           ──────
Messages table           MessageService                   PublicMessageDTO
┌─────────────┐          ┌─────────────────┐              ┌─────────────────┐
│ id          │─────────►│ id              │─────────────►│ id              │
│ channel_id  │          │ (filtered out)  │              │ (not exposed)   │
│ author_id   │─────────►│ (lookup user)   │              │                 │
│ content     │─────────►│ (filter content)│─────────────►│ content         │
│ created_at  │─────────►│ created_at      │─────────────►│ timestamp       │
│ is_deleted  │─────────►│ (if true, skip) │              │                 │
└─────────────┘          └─────────────────┘              └─────────────────┘
                                │
                                ▼
Users table              AuthorService                    PublicAuthorDTO
┌─────────────┐          ┌─────────────────┐              ┌─────────────────┐
│ id          │─────────►│ (not exposed)   │              │ (not exposed)   │
│ username    │─────────►│ (not exposed)   │              │ (not exposed)   │
│ display_name│─────────►│ getDisplayName()│─────────────►│ displayName     │
│ avatar_url  │─────────►│ (if public)     │─────────────►│ avatarUrl       │
│public_profile│────────►│ (check flag)    │              │                 │
└─────────────┘          └─────────────────┘              └─────────────────┘

If public_profile = false:
  displayName = "Anonymous"
  avatarUrl = null
```

### 12.5 Security Headers

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### 12.6 Bot and Abuse Protection

| Protection | Implementation | Threshold |
|------------|----------------|-----------|
| Rate Limiting | Token bucket per IP | 100 req/min for humans, 1000 req/min for verified bots |
| Bot Detection | User-Agent analysis | Verified bots whitelisted |
| Scraping Prevention | CAPTCHA on suspicious patterns | After 500 page views/hour |
| DDoS Protection | CloudFlare WAF | Automatic |

### 12.7 Customer-Visible Privacy Policy Points

- Messages in public channels are visible to anyone, including search engines
- Your display name and avatar appear with your messages in public channels
- You can opt out of public display by setting your profile to private
- We do not track or store identifying information about anonymous viewers
- Search engines may cache public content; cached content remains after channel is made private

---

## 13. Risks to Completion

### 13.1 Technology Risks

| Technology | Learning Curve | Design Difficulty | Implementation | Verification | Maintenance |
|------------|----------------|-------------------|----------------|--------------|-------------|
| T2: Next.js SSR | Medium | Medium | Medium | Medium | Medium |
| T8: CloudFlare Edge | Medium | High | Medium | High | Low |
| T11: DOMPurify | Low | Low | Low | Medium | Low |
| T12: schema-dts | Low | Medium | Low | Medium | Low |
| T14: sharp | Low | Low | Low | Low | Low |
| T17: Lighthouse CI | Medium | Low | Medium | N/A | Low |

### 13.2 Component Risks

| Component | Risk | Mitigation |
|-----------|------|------------|
| SSR Performance | Slow TTFB affects SEO | Edge caching; ISR; streaming |
| Content Filtering | Regex performance on large content | Timeouts; message size limits |
| Infinite Scroll | SEO crawlers can't follow | Pagination fallback links; sitemap |
| Cache Invalidation | Stale content shown | Short TTLs; explicit invalidation |
| Bot Detection | False positives block real users | Verify bot list; appeal process |

### 13.3 SEO-Specific Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| JavaScript-dependent content | Crawlers may not execute JS | SSR for all content |
| Slow page load | Poor Core Web Vitals | Edge caching; image optimization |
| Duplicate content | Ranking penalty | Canonical URLs; proper pagination |
| Thin content pages | Not indexed | Minimum message threshold for indexing |
| Frequent content changes | Crawl budget waste | Last-modified headers; sitemap priority |

### 13.4 Off-the-Shelf Considerations

| Technology | Customization | Source | Support | Cost |
|------------|---------------|--------|---------|------|
| Next.js | SSR config, caching | Open source | Vercel paid | Free |
| CloudFlare | Edge rules, workers | SaaS | Paid tiers | $20+/mo |
| DOMPurify | None needed | Open source | Community | Free |
| Lighthouse CI | Thresholds | Open source | Community | Free |

### 13.5 Contingency Plans

| Risk | Trigger | Contingency |
|------|---------|-------------|
| SSR overload | > 2s TTFB p95 | Increase ISR; reduce initial messages |
| Cache stampede | Origin overload on cache miss | Stale-while-revalidate; request coalescing |
| Privacy incident | PII leaked in public view | Immediate hotfix; user notification |
| SEO ranking drop | > 20% traffic decrease | Audit with Search Console; fix issues |

---

## Appendix A: SEO Optimization Checklist

### Page Structure
- [ ] Unique, descriptive `<title>` per page
- [ ] Meta description under 160 characters
- [ ] Canonical URL on every page
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card tags
- [ ] JSON-LD structured data (DiscussionForumPosting)
- [ ] Breadcrumb schema

### Technical SEO
- [ ] Server-side rendering for all content
- [ ] Mobile-responsive design
- [ ] Fast TTFB (< 500ms)
- [ ] Core Web Vitals passing
- [ ] XML sitemap including all public channels
- [ ] robots.txt allowing crawlers
- [ ] Proper HTTP status codes (404 for missing, 403 for private)

### Content Accessibility
- [ ] All messages readable without JavaScript
- [ ] Pagination with `<link rel="next/prev">`
- [ ] Deep links to specific messages work
- [ ] Images have alt text
- [ ] Semantic HTML structure

---

## Appendix B: Glossary

| Term | Definition |
|------|------------|
| SSR | Server-Side Rendering - generating HTML on the server before sending to client |
| TTFB | Time to First Byte - time until browser receives first byte of response |
| ISR | Incremental Static Regeneration - Next.js feature for updating static pages |
| Hydration | Process of attaching JavaScript event handlers to server-rendered HTML |
| Core Web Vitals | Google's metrics for page experience (LCP, FID, CLS) |
| JSON-LD | JavaScript Object Notation for Linked Data - structured data format |
| Canonical URL | The preferred URL for a page to avoid duplicate content issues |
| Stale-While-Revalidate | Cache strategy serving stale content while fetching fresh |
| Edge Worker | Code running at CDN edge locations |
| Guest User | Anonymous visitor without an account |
