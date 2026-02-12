# Development Specification: SEO Meta Tag Generation

## Feature: Automatic HTML Meta Tag Generation for Public Threads

**User Story:** As a Content Creator, I want public threads to automatically generate HTML meta tags (Title, Description) based on the conversation content, so that my community appears with relevant previews in Google search results, driving organic growth.

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
│  │      │                      ─ ─ ─►  Async/Background Flow                    │
│  └──────┘                      ══════  Bidirectional Flow                       │
│  [      ]  External System     Blue: Client   Green: Server   Orange: External  │
│  (      )  Data Store          Purple: AI/ML Services                           │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                           EXTERNAL ACTORS                                        │
│  ┌─────────────────────────┐  ┌─────────────────────────┐                       │
│  │ [A1 Search Engine Bot]  │  │ [A2 Social Media        │                       │
│  │ Googlebot, Bingbot      │  │ Crawler]                │                       │
│  │ Crawls pages, reads     │  │ Facebook, Twitter,      │                       │
│  │ meta tags               │  │ LinkedIn link previews  │                       │
│  └───────────┬─────────────┘  └───────────┬─────────────┘                       │
└──────────────┼────────────────────────────┼─────────────────────────────────────┘
               │                            │
               │ Request page               │ Request page/OG tags
               ▼                            ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           SERVER LAYER (Application Server)                      │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M1 Page Rendering Module (Next.js SSR)                                     │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C1.1 PublicChannelPage      │    │ C1.2 HeadComponent              │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ serverSlug: string          │    │ meta: MetaTagSet                │   │  │
│  │  │ channelSlug: string         │    │ ─────────────────────────────── │   │  │
│  │  │ messages: Message[]         │    │ renderMetaTags()                │   │  │
│  │  │ metaTags: MetaTagSet        │    │ renderOpenGraph()               │   │  │
│  │  │ ─────────────────────────── │    │ renderTwitterCards()            │   │  │
│  │  │ getServerSideProps()        │───►│ renderStructuredData()          │   │  │
│  │  │ render()                    │    │ renderCanonical()               │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M2 Meta Tag Generation Module                                              │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C2.1 MetaTagService         │    │ C2.2 TitleGenerator             │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ titleGenerator: ref         │    │ maxLength: 60                   │   │  │
│  │  │ descriptionGenerator: ref   │    │ ─────────────────────────────── │   │  │
│  │  │ openGraphGenerator: ref     │    │ generateFromChannel()           │   │  │
│  │  │ structuredDataGen: ref      │    │ generateFromMessage()           │   │  │
│  │  │ cacheService: ref           │    │ generateFromThread()            │   │  │
│  │  │ ─────────────────────────── │    │ truncateWithEllipsis()          │   │  │
│  │  │ generateMetaTags()          │◄───│ sanitizeForTitle()              │   │  │
│  │  │ getOrGenerateCached()       │    └─────────────────────────────────┘   │  │
│  │  │ invalidateCache()           │                                          │  │
│  │  └─────────────────────────────┘    ┌─────────────────────────────────┐   │  │
│  │  ┌─────────────────────────────┐    │ C2.4 OpenGraphGenerator         │   │  │
│  │  │ C2.3 DescriptionGenerator   │    │ ─────────────────────────────── │   │  │
│  │  │ ─────────────────────────── │    │ defaultImage: string            │   │  │
│  │  │ maxLength: 160              │    │ ─────────────────────────────── │   │  │
│  │  │ minLength: 50               │    │ generateOGTags()                │   │  │
│  │  │ ─────────────────────────── │    │ generateTwitterCard()           │   │  │
│  │  │ generateFromMessages()      │    │ selectPreviewImage()            │   │  │
│  │  │ extractKeyPhrases()         │    │ generateSiteName()              │   │  │
│  │  │ summarizeThread()           │    └─────────────────────────────────┘   │  │
│  │  │ sanitizeForDescription()    │                                          │  │
│  │  └─────────────────────────────┘    ┌─────────────────────────────────┐   │  │
│  │  ┌─────────────────────────────┐    │ C2.6 MetaTagCache               │   │  │
│  │  │ C2.5 StructuredDataGen      │    │ ─────────────────────────────── │   │  │
│  │  │ ─────────────────────────── │    │ cache: CacheClient              │   │  │
│  │  │ ─────────────────────────── │    │ ttl: number                     │   │  │
│  │  │ generateDiscussionForum()   │    │ ─────────────────────────────── │   │  │
│  │  │ generateBreadcrumbList()    │    │ get()                           │   │  │
│  │  │ generateOrganization()      │    │ set()                           │   │  │
│  │  │ generateWebPage()           │    │ invalidate()                    │   │  │
│  │  └─────────────────────────────┘    │ warmup()                        │   │  │
│  │                                     └─────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M3 Content Analysis Module                                                 │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C3.1 ContentAnalyzer        │    │ C3.2 KeywordExtractor           │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ keywordExtractor: ref       │    │ stopWords: Set<string>          │   │  │
│  │  │ sentimentAnalyzer: ref      │    │ ─────────────────────────────── │   │  │
│  │  │ topicClassifier: ref        │    │ extractKeywords()               │   │  │
│  │  │ ─────────────────────────── │    │ extractPhrases()                │   │  │
│  │  │ analyzeThread()             │───►│ scoreByFrequency()              │   │  │
│  │  │ getTopicCategory()          │    │ filterStopWords()               │   │  │
│  │  │ getSentiment()              │    └─────────────────────────────────┘   │  │
│  │  │ getReadingLevel()           │                                          │  │
│  │  └─────────────────────────────┘    ┌─────────────────────────────────┐   │  │
│  │  ┌─────────────────────────────┐    │ C3.4 TopicClassifier            │   │  │
│  │  │ C3.3 TextSummarizer         │    │ ─────────────────────────────── │   │  │
│  │  │ ─────────────────────────── │    │ categories: Category[]          │   │  │
│  │  │ maxSentences: number        │    │ ─────────────────────────────── │   │  │
│  │  │ ─────────────────────────── │    │ classify()                      │   │  │
│  │  │ summarize()                 │    │ getTopCategories()              │   │  │
│  │  │ extractFirstSentence()      │    │ getCategoryKeywords()           │   │  │
│  │  │ extractKeySentences()       │    └─────────────────────────────────┘   │  │
│  │  └─────────────────────────────┘                                          │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M4 Background Processing Module                                            │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C4.1 MetaTagUpdateWorker    │    │ C4.2 EventListener              │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ queue: JobQueue             │    │ eventBus: EventBus              │   │  │
│  │  │ metaTagService: ref         │    │ ─────────────────────────────── │   │  │
│  │  │ ─────────────────────────── │    │ onMessageCreated()              │   │  │
│  │  │ processJob()                │◄───│ onMessageEdited()               │   │  │
│  │  │ scheduleUpdate()            │    │ onMessageDeleted()              │   │  │
│  │  │ batchProcess()              │    │ onChannelUpdated()              │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  │  ┌─────────────────────────────┐                                          │  │
│  │  │ C4.3 SitemapUpdater         │                                          │  │
│  │  │ ─────────────────────────── │                                          │  │
│  │  │ ─────────────────────────── │                                          │  │
│  │  │ updateLastModified()        │                                          │  │
│  │  │ notifySearchEngines()       │                                          │  │
│  │  └─────────────────────────────┘                                          │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M5 Data Access Module                                                      │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ C5.1 ChannelRepository      │    │ C5.2 MessageRepository          │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ database: DatabaseClient    │    │ database: DatabaseClient        │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ findBySlug()                │    │ findRecentByChannel()           │   │  │
│  │  │ getMetadata()               │    │ findFirstMessage()              │   │  │
│  │  └─────────────────────────────┘    │ getMessageCount()               │   │  │
│  │  ┌─────────────────────────────┐    └─────────────────────────────────┘   │  │
│  │  │ C5.3 MetaTagRepository      │                                          │  │
│  │  │ ─────────────────────────── │                                          │  │
│  │  │ database: DatabaseClient    │                                          │  │
│  │  │ ─────────────────────────── │                                          │  │
│  │  │ findByChannelId()           │                                          │  │
│  │  │ upsert()                    │                                          │  │
│  │  │ getLastGenerated()          │                                          │  │
│  │  └─────────────────────────────┘                                          │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ Database Protocol
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           DATA LAYER (Cloud Infrastructure)                      │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M6 Persistence Module                                                      │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ D6.1 ChannelsTable          │    │ D6.2 MessagesTable              │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ id: UUID (PK)               │    │ id: UUID (PK)                   │   │  │
│  │  │ server_id: UUID (FK)        │    │ channel_id: UUID (FK)           │   │  │
│  │  │ name: VARCHAR(100)          │    │ author_id: UUID (FK)            │   │  │
│  │  │ slug: VARCHAR(100)          │    │ content: TEXT                   │   │  │
│  │  │ visibility: ENUM            │    │ created_at: TIMESTAMP           │   │  │
│  │  │ topic: TEXT                 │    │ attachments: JSONB              │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ D6.3 GeneratedMetaTagsTable │    │ D6.4 ServersTable               │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ id: UUID (PK)               │    │ id: UUID (PK)                   │   │  │
│  │  │ channel_id: UUID (FK,UNIQUE)│    │ name: VARCHAR(100)              │   │  │
│  │  │ title: VARCHAR(70)          │    │ slug: VARCHAR(100)              │   │  │
│  │  │ description: VARCHAR(200)   │    │ description: TEXT               │   │  │
│  │  │ og_title: VARCHAR(95)       │    │ icon_url: VARCHAR(500)          │   │  │
│  │  │ og_description: VARCHAR(300)│    └─────────────────────────────────┘   │  │
│  │  │ og_image: VARCHAR(500)      │                                          │  │
│  │  │ keywords: TEXT[]            │                                          │  │
│  │  │ structured_data: JSONB      │                                          │  │
│  │  │ generated_at: TIMESTAMP     │                                          │  │
│  │  │ content_hash: VARCHAR(64)   │                                          │  │
│  │  │ version: INTEGER            │                                          │  │
│  │  └─────────────────────────────┘                                          │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M7 Cache Module                                                            │  │
│  │  ┌─────────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │ D7.1 MetaTagCache           │    │ D7.2 ContentAnalysisCache       │   │  │
│  │  │ ─────────────────────────── │    │ ─────────────────────────────── │   │  │
│  │  │ key: meta:{channelId}       │    │ key: analysis:{channelId}       │   │  │
│  │  │ value: MetaTagSet           │    │ value: AnalysisResult           │   │  │
│  │  │ ttl: 3600 seconds           │    │ ttl: 1800 seconds               │   │  │
│  │  └─────────────────────────────┘    └─────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │ M8 Job Queue Module                                                        │  │
│  │  ┌─────────────────────────────┐                                          │  │
│  │  │ D8.1 MetaTagUpdateQueue     │                                          │  │
│  │  │ ─────────────────────────── │                                          │  │
│  │  │ queue: meta-tag-updates     │                                          │  │
│  │  │ job: { channelId, priority }│                                          │  │
│  │  │ delay: 60 seconds (debounce)│                                          │  │
│  │  └─────────────────────────────┘                                          │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           EXTERNAL SYSTEMS                                       │
│  ┌─────────────────────────────┐  ┌─────────────────────────────────┐           │
│  │ [E1 Google Search Console]  │  │ [E2 Bing Webmaster Tools]       │           │
│  │ Indexing API                │  │ URL Submission API              │           │
│  │ Sitemap ping                │  │ Sitemap ping                    │           │
│  └─────────────────────────────┘  └─────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Information Flow Summary

| Flow ID | Source | Destination | Data | Protocol |
|---------|--------|-------------|------|----------|
| F1 | A1 Search Engine Bot | C1.1 PublicChannelPage | HTTP GET Request | HTTPS |
| F2 | C1.1 PublicChannelPage | C2.1 MetaTagService | Meta tag request | Internal |
| F3 | C2.1 MetaTagService | C2.6 MetaTagCache | Cache lookup | Redis |
| F4 | C2.1 MetaTagService | C3.1 ContentAnalyzer | Content analysis | Internal |
| F5 | C3.1 ContentAnalyzer | C5.2 MessageRepository | Message fetch | Database |
| F6 | C2.1 MetaTagService | C5.3 MetaTagRepository | Persist generated tags | Database |
| F7 | C4.2 EventListener | C4.1 MetaTagUpdateWorker | Update job | Queue |
| F8 | C4.3 SitemapUpdater | E1/E2 Search Consoles | Ping notification | HTTPS |
| F9 | C1.2 HeadComponent | A1 Search Engine Bot | HTML <head> content | HTTPS |

### 2.3 Meta Tag Generation Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    Meta Tag Generation Pipeline                                  │
└─────────────────────────────────────────────────────────────────────────────────┘

 Message Events                Content Analysis              Meta Tag Generation
 ─────────────                 ────────────────              ──────────────────
      │                              │                              │
      │  New message posted          │                              │
      ▼                              │                              │
┌─────────────┐                      │                              │
│ EventBus    │                      │                              │
│ emits       │                      │                              │
│ MESSAGE_    │                      │                              │
│ CREATED     │                      │                              │
└──────┬──────┘                      │                              │
       │                             │                              │
       │ Debounce (60s)              │                              │
       ▼                             │                              │
┌─────────────┐                      │                              │
│ Job Queue   │                      │                              │
│ schedules   │                      │                              │
│ update      │                      │                              │
└──────┬──────┘                      │                              │
       │                             │                              │
       │ Worker picks up job         │                              │
       ▼                             ▼                              │
┌─────────────┐              ┌─────────────────┐                    │
│ Fetch last  │─────────────►│ Extract keywords│                    │
│ N messages  │              │ from content    │                    │
│ from channel│              └────────┬────────┘                    │
└─────────────┘                       │                             │
                                      ▼                             │
                             ┌─────────────────┐                    │
                             │ Classify topic  │                    │
                             │ category        │                    │
                             └────────┬────────┘                    │
                                      │                             │
                                      ▼                             │
                             ┌─────────────────┐                    │
                             │ Summarize       │                    │
                             │ thread content  │                    │
                             └────────┬────────┘                    │
                                      │                             │
                                      │                             ▼
                                      │                    ┌─────────────────┐
                                      └───────────────────►│ Generate title  │
                                                           │ (max 60 chars)  │
                                                           └────────┬────────┘
                                                                    │
                                                                    ▼
                                                           ┌─────────────────┐
                                                           │ Generate desc   │
                                                           │ (max 160 chars) │
                                                           └────────┬────────┘
                                                                    │
                                                                    ▼
                                                           ┌─────────────────┐
                                                           │ Generate OG/    │
                                                           │ Twitter tags    │
                                                           └────────┬────────┘
                                                                    │
                                                                    ▼
                                                           ┌─────────────────┐
                                                           │ Generate JSON-LD│
                                                           │ structured data │
                                                           └────────┬────────┘
                                                                    │
                                                                    ▼
                                                           ┌─────────────────┐
                                                           │ Store in DB     │
                                                           │ and cache       │
                                                           └────────┬────────┘
                                                                    │
                                                                    ▼
                                                           ┌─────────────────┐
                                                           │ Invalidate CDN  │
                                                           │ cache for page  │
                                                           └────────┬────────┘
                                                                    │
                                                                    ▼
                                                           ┌─────────────────┐
                                                           │ Ping search     │
                                                           │ engines         │
                                                           └─────────────────┘
```

---

## 3. Class Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              LEGEND                                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ────────►  Inheritance (extends)         ◆─────────  Composition               │
│  - - - - ►  Implementation (implements)   ◇─────────  Aggregation               │
└─────────────────────────────────────────────────────────────────────────────────┘

                            ┌───────────────────────────┐
                            │    <<interface>>          │
                            │  CL1.1 IMetaTagGenerator  │
                            ├───────────────────────────┤
                            │ + generate(): MetaTagSet  │
                            │ + validate(): boolean     │
                            └─────────────┬─────────────┘
                                          │
        ┌─────────────────────────────────┼─────────────────────────────────┐
        │                                 │                                 │
  - - - ┼ - - -                     - - - ┼ - - -                     - - - ┼ - - -
        │                                 │                                 │
┌───────▼───────────────┐   ┌─────────────▼─────────────┐   ┌───────────────▼─────┐
│ CL1.2 TitleGenerator  │   │ CL1.3 DescriptionGen      │   │ CL1.4 OpenGraphGen  │
├───────────────────────┤   ├───────────────────────────┤   ├─────────────────────┤
│ - maxLength: 60       │   │ - maxLength: 160          │   │ - defaultImage: str │
│ - templates: Template[]│  │ - minLength: 50           │   ├─────────────────────┤
├───────────────────────┤   ├───────────────────────────┤   │ + generateOGTags()  │
│ + generate()          │   │ + generate()              │   │ + generateTwitter() │
│ + validate()          │   │ + validate()              │   │ + selectImage()     │
│ - truncate()          │   │ - summarize()             │   │ + validate()        │
│ - sanitize()          │   │ - extractKeyPhrases()     │   └─────────────────────┘
└───────────────────────┘   └───────────────────────────┘


                            ┌───────────────────────────┐
                            │ CL2.1 MetaTagService      │
                            │ <<Facade>>                │
                            ├───────────────────────────┤
                            │ - titleGen: ref           │
                            │ - descGen: ref            │
                            │ - ogGen: ref              │
                            │ - structuredGen: ref      │
                            │ - cache: ref              │
                            │ - analyzer: ref           │
                            ├───────────────────────────┤
                            │ + generateMetaTags()      │
                            │ + getOrGenerateCached()   │
                            │ + invalidateCache()       │
                            │ + scheduleRegeneration()  │
                            └─────────────┬─────────────┘
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    │                     │                     │
                    ◇                     ◇                     ◇
        ┌───────────▼───────────┐ ┌───────▼───────────┐ ┌───────▼───────────┐
        │ CL3.1 ContentAnalyzer │ │ CL2.5 Structured  │ │ CL2.6 MetaTagCache│
        ├───────────────────────┤ │ DataGenerator     │ ├───────────────────┤
        │ - keywordExtractor    │ ├───────────────────┤ │ - cache: Redis    │
        │ - summarizer          │ │ + generateForum() │ │ - ttl: number     │
        │ - topicClassifier     │ │ + generateBread() │ ├───────────────────┤
        ├───────────────────────┤ │ + generateOrg()   │ │ + get()           │
        │ + analyzeThread()     │ │ + generatePage()  │ │ + set()           │
        │ + getTopicCategory()  │ └───────────────────┘ │ + invalidate()    │
        │ + getSentiment()      │                       └───────────────────┘
        └───────────┬───────────┘
                    │
        ┌───────────┼───────────────────────┐
        │           │                       │
        ◆           ◆                       ◆
┌───────▼───────┐ ┌─▼─────────────────┐ ┌───▼───────────────┐
│ CL3.2 Keyword │ │ CL3.3 Text        │ │ CL3.4 Topic       │
│ Extractor     │ │ Summarizer        │ │ Classifier        │
├───────────────┤ ├───────────────────┤ ├───────────────────┤
│ - stopWords   │ │ - maxSentences    │ │ - categories      │
├───────────────┤ ├───────────────────┤ ├───────────────────┤
│ + extract()   │ │ + summarize()     │ │ + classify()      │
│ + score()     │ │ + extractFirst()  │ │ + getTop()        │
│ + filter()    │ │ + extractKey()    │ │ + getKeywords()   │
└───────────────┘ └───────────────────┘ └───────────────────┘


┌─────────────────────────────────────────────────────────────────────────────────┐
│                          Data Transfer Objects                                   │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────┐     ┌─────────────────────────┐
│ CL4.1 MetaTagSet        │     │ CL4.2 OpenGraphTags     │
│ <<DTO>>                 │     │ <<DTO>>                 │
├─────────────────────────┤     ├─────────────────────────┤
│ + title: string         │     │ + ogTitle: string       │
│ + description: string   │     │ + ogDescription: string │
│ + canonical: string     │     │ + ogImage: string       │
│ + robots: string        │     │ + ogType: string        │
│ + openGraph: OGTags     │     │ + ogUrl: string         │
│ + twitter: TwitterTags  │     │ + ogSiteName: string    │
│ + structuredData: JSON  │     └─────────────────────────┘
│ + keywords: string[]    │
└─────────────────────────┘     ┌─────────────────────────┐
                                │ CL4.3 TwitterCardTags   │
┌─────────────────────────┐     │ <<DTO>>                 │
│ CL4.4 StructuredData    │     ├─────────────────────────┤
│ <<DTO>>                 │     │ + card: string          │
├─────────────────────────┤     │ + title: string         │
│ + @context: string      │     │ + description: string   │
│ + @type: string         │     │ + image: string         │
│ + headline: string      │     │ + site: string          │
│ + description: string   │     └─────────────────────────┘
│ + author: Person        │
│ + datePublished: string │     ┌─────────────────────────┐
│ + dateModified: string  │     │ CL4.5 ContentAnalysis   │
│ + mainEntity: object    │     │ <<DTO>>                 │
│ + breadcrumb: object    │     ├─────────────────────────┤
└─────────────────────────┘     │ + keywords: string[]    │
                                │ + topics: string[]      │
                                │ + summary: string       │
                                │ + sentiment: string     │
                                │ + readingLevel: string  │
                                └─────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────────┐
│                          Domain Entities                                         │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────┐     ┌─────────────────────────┐
│ CL5.1 Channel           │     │ CL5.2 Message           │
│ <<Entity>>              │     │ <<Entity>>              │
├─────────────────────────┤     ├─────────────────────────┤
│ + id: UUID              │◄────│ + id: UUID              │
│ + serverId: UUID        │ 1 * │ + channelId: UUID       │
│ + name: string          │     │ + authorId: UUID        │
│ + slug: string          │     │ + content: string       │
│ + topic: string         │     │ + createdAt: DateTime   │
│ + visibility: Enum      │     │ + attachments: []       │
└─────────────────────────┘     └─────────────────────────┘

┌─────────────────────────┐
│ CL5.3 GeneratedMetaTags │
│ <<Entity>>              │
├─────────────────────────┤
│ + id: UUID              │
│ + channelId: UUID       │
│ + title: string         │
│ + description: string   │
│ + ogTitle: string       │
│ + ogDescription: string │
│ + ogImage: string       │
│ + keywords: string[]    │
│ + structuredData: JSON  │
│ + generatedAt: DateTime │
│ + contentHash: string   │
│ + version: number       │
└─────────────────────────┘
```

---

## 4. List of Classes

### 4.1 Page Rendering Module (M1)

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-C1.1 | PublicChannelPage | Page Component | Next.js page that fetches meta tags and renders the public channel view |
| CL-C1.2 | HeadComponent | UI Component | Renders all meta tags in the HTML <head> section |

### 4.2 Meta Tag Generation Module (M2)

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-C2.1 | MetaTagService | Service (Facade) | Orchestrates meta tag generation, caching, and invalidation |
| CL-C2.2 | TitleGenerator | Service | Generates SEO-optimized page titles from channel/message content |
| CL-C2.3 | DescriptionGenerator | Service | Generates meta descriptions from thread summaries |
| CL-C2.4 | OpenGraphGenerator | Service | Generates Open Graph and Twitter Card meta tags |
| CL-C2.5 | StructuredDataGenerator | Service | Generates JSON-LD structured data for rich snippets |
| CL-C2.6 | MetaTagCache | Service | Caches generated meta tags in Redis |

### 4.3 Content Analysis Module (M3)

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-C3.1 | ContentAnalyzer | Service | Coordinates content analysis for meta tag generation |
| CL-C3.2 | KeywordExtractor | Service | Extracts relevant keywords from message content |
| CL-C3.3 | TextSummarizer | Service | Summarizes thread content for descriptions |
| CL-C3.4 | TopicClassifier | Service | Classifies channel content into topic categories |

### 4.4 Background Processing Module (M4)

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-C4.1 | MetaTagUpdateWorker | Worker | Processes queued meta tag regeneration jobs |
| CL-C4.2 | EventListener | Service | Listens to message events and schedules meta tag updates |
| CL-C4.3 | SitemapUpdater | Service | Updates sitemap lastmod and pings search engines |

### 4.5 Data Access Module (M5)

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-C5.1 | ChannelRepository | Repository | Data access for channel entities |
| CL-C5.2 | MessageRepository | Repository | Data access for messages with content retrieval |
| CL-C5.3 | MetaTagRepository | Repository | Data access for persisted meta tags |

### 4.6 Data Transfer Objects

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-D1 | MetaTagSet | DTO | Complete set of meta tags for a page |
| CL-D2 | OpenGraphTags | DTO | Open Graph protocol tags |
| CL-D3 | TwitterCardTags | DTO | Twitter Card tags |
| CL-D4 | StructuredData | DTO | JSON-LD structured data |
| CL-D5 | ContentAnalysis | DTO | Results of content analysis |

### 4.7 Domain Entities

| Label | Class Name | Type | Purpose |
|-------|------------|------|---------|
| CL-E1 | Channel | Entity | Channel domain entity |
| CL-E2 | Message | Entity | Message domain entity |
| CL-E3 | GeneratedMetaTags | Entity | Persisted generated meta tags |

---

## 5. State Diagrams

### 5.1 System State Variables

| Variable | Type | Description |
|----------|------|-------------|
| channel.id | UUID | Channel being processed |
| metaTags.status | MetaTagStatus | Current generation status |
| metaTags.version | number | Version of generated tags |
| cache.hit | boolean | Whether tags were served from cache |
| content.hash | string | Hash of content used for generation |

### 5.2 Meta Tag Generation State Machine

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              LEGEND                                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│  (( ))  Initial State        [ ]  State         < >  Decision                   │
│  ─────► Transition           [[ ]] Final State                                  │
└─────────────────────────────────────────────────────────────────────────────────┘

                    (( S0: Page Requested ))
                              │
                              │ GET /c/{server}/{channel}
                              ▼
              ┌───────────────────────────────┐
              │ S1: Check Cache               │
              │ ─────────────────────────────│
              │ cache.checking = true         │
              │ channelId = resolved          │
              └───────────────┬───────────────┘
                              │
                      < Cache Hit? >
                     /              \
                    / Yes            \ No
                   ▼                  ▼
    ┌──────────────────────┐   ┌───────────────────────────────┐
    │ S2: Serve Cached     │   │ S3: Check Database            │
    │ ──────────────────── │   │ ───────────────────────────── │
    │ cache.hit = true     │   │ db.checking = true            │
    │ metaTags = cached    │   └───────────────┬───────────────┘
    └──────────┬───────────┘                   │
               │                       < DB Record Exists? >
               │                      /                     \
               │                     / Yes                   \ No
               │                    ▼                         ▼
               │    ┌──────────────────────┐   ┌───────────────────────────────┐
               │    │ S4: Check Freshness  │   │ S5: Generate New              │
               │    │ ──────────────────── │   │ ───────────────────────────── │
               │    │ contentHash = calc   │   │ status = GENERATING           │
               │    └──────────┬───────────┘   │ analyzer.running = true       │
               │               │               └───────────────┬───────────────┘
               │       < Hash Match? >                         │
               │      /              \                         │
               │     / Yes            \ No                     │
               │    ▼                  ▼                       │
               │ ┌────────────┐  ┌─────────────┐               │
               │ │S6: Use DB  │  │S7: Regenerate│              │
               │ │Tags        │  │Tags         │◄──────────────┘
               │ │            │  │             │
               │ │metaTags =  │  │queueJob()   │
               │ │  dbRecord  │  │             │
               │ └─────┬──────┘  └──────┬──────┘
               │       │                │
               │       │        ┌───────┴───────────────────┐
               │       │        │                           │
               │       │        ▼                           ▼
               │       │   ┌─────────────┐           ┌─────────────┐
               │       │   │ S8: Analyze │           │ S9: Use     │
               │       │   │ Content     │           │ Fallback    │
               │       │   │             │           │ (stale tags)│
               │       │   │ keywords =  │           └──────┬──────┘
               │       │   │   extracted │                  │
               │       │   │ summary =   │                  │
               │       │   │   generated │                  │
               │       │   └──────┬──────┘                  │
               │       │          │                         │
               │       │          ▼                         │
               │       │   ┌─────────────────┐              │
               │       │   │ S10: Generate   │              │
               │       │   │ All Tags        │              │
               │       │   │                 │              │
               │       │   │ title = gen     │              │
               │       │   │ desc = gen      │              │
               │       │   │ og = gen        │              │
               │       │   │ structured = gen│              │
               │       │   └──────┬──────────┘              │
               │       │          │                         │
               │       │          ▼                         │
               │       │   ┌─────────────────┐              │
               │       │   │ S11: Persist &  │              │
               │       │   │ Cache           │              │
               │       │   │                 │              │
               │       │   │ db.upsert()     │              │
               │       │   │ cache.set()     │              │
               │       │   └──────┬──────────┘              │
               │       │          │                         │
               └───────┴──────────┴─────────────────────────┘
                                  │
                                  ▼
              ┌───────────────────────────────┐
              │ S12: Render Page with Tags    │
              │ ───────────────────────────── │
              │ <head> includes all meta tags │
              │ JSON-LD in <script>           │
              └───────────────┬───────────────┘
                              │
                              ▼
              [[ S13: Page Delivered ]]


State Transition Table:
┌────────────────────┬──────────────────────────┬────────────────────┬─────────────────────────────┐
│ Current State      │ Condition/Action         │ Next State         │ Side Effects                │
├────────────────────┼──────────────────────────┼────────────────────┼─────────────────────────────┤
│ S1: Check Cache    │ cache.get() returns data │ S2: Serve Cached   │ None                        │
│ S1: Check Cache    │ cache.get() returns null │ S3: Check Database │ Database query              │
│ S3: Check Database │ Record exists            │ S4: Check Freshness│ Calculate content hash      │
│ S3: Check Database │ No record                │ S5: Generate New   │ Start analysis              │
│ S4: Check Freshness│ Hash matches             │ S6: Use DB Tags    │ Update cache                │
│ S4: Check Freshness│ Hash differs             │ S7: Regenerate     │ Queue background job        │
│ S7: Regenerate     │ Sync regeneration        │ S8: Analyze        │ Fetch messages              │
│ S7: Regenerate     │ Async (background)       │ S9: Use Fallback   │ Serve stale, update later   │
│ S8: Analyze        │ Analysis complete        │ S10: Generate Tags │ Keywords, summary ready     │
│ S10: Generate Tags │ All tags generated       │ S11: Persist       │ Validation                  │
│ S11: Persist       │ Saved successfully       │ S12: Render        │ Cache invalidation          │
│ S2, S6, S9, S12    │ Tags ready               │ S13: Delivered     │ Response sent               │
└────────────────────┴──────────────────────────┴────────────────────┴─────────────────────────────┘
```

### 5.3 Background Update State Machine

```
                    (( B0: Event Received ))
                    MESSAGE_CREATED / MESSAGE_EDITED / MESSAGE_DELETED
                              │
                              ▼
              ┌───────────────────────────────┐
              │ B1: Debounce Check            │
              │ ─────────────────────────────│
              │ Check if job already queued   │
              │ for this channel              │
              └───────────────┬───────────────┘
                              │
                      < Job Exists? >
                     /              \
                    / Yes            \ No
                   ▼                  ▼
    ┌──────────────────────┐   ┌───────────────────────────────┐
    │ B2: Extend Delay     │   │ B3: Queue New Job             │
    │ ──────────────────── │   │ ───────────────────────────── │
    │ Reset debounce timer │   │ delay = 60 seconds            │
    │ to 60 seconds        │   │ priority = normal             │
    └──────────────────────┘   └───────────────┬───────────────┘
                                               │
                                               │ After delay expires
                                               ▼
                               ┌───────────────────────────────┐
                               │ B4: Worker Picks Up Job       │
                               │ ───────────────────────────── │
                               │ Lock acquired                 │
                               └───────────────┬───────────────┘
                                               │
                                               ▼
                               ┌───────────────────────────────┐
                               │ B5: Fetch Latest Content      │
                               │ ───────────────────────────── │
                               │ Get last 100 messages         │
                               │ Calculate content hash        │
                               └───────────────┬───────────────┘
                                               │
                                       < Hash Changed? >
                                      /                \
                                     / No               \ Yes
                                    ▼                    ▼
                    ┌──────────────────────┐   ┌───────────────────────────────┐
                    │ B6: Skip Update      │   │ B7: Regenerate Tags           │
                    │ ──────────────────── │   │ ───────────────────────────── │
                    │ Content unchanged    │   │ Run full generation pipeline  │
                    │ Release lock         │   └───────────────┬───────────────┘
                    └──────────────────────┘                   │
                                                               ▼
                                               ┌───────────────────────────────┐
                                               │ B8: Update Database           │
                                               │ ───────────────────────────── │
                                               │ Upsert new tags               │
                                               │ Increment version             │
                                               └───────────────┬───────────────┘
                                                               │
                                                               ▼
                                               ┌───────────────────────────────┐
                                               │ B9: Invalidate Caches         │
                                               │ ───────────────────────────── │
                                               │ Redis cache invalidate        │
                                               │ CDN purge for URL             │
                                               └───────────────┬───────────────┘
                                                               │
                                                               ▼
                                               ┌───────────────────────────────┐
                                               │ B10: Notify Search Engines    │
                                               │ ───────────────────────────── │
                                               │ Update sitemap lastmod        │
                                               │ Ping Google/Bing              │
                                               └───────────────┬───────────────┘
                                                               │
                                                               ▼
                               [[ B11: Update Complete ]]
```

---

## 6. Flow Charts

### 6.1 Scenario: Search Engine Crawls Page and Reads Meta Tags

**Scenario Description:** A search engine bot crawls a public channel page. The system generates and serves appropriate meta tags that describe the channel content, enabling rich search result previews.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              LEGEND                                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│  (( ))   Start/End (Terminal)        [ ]  Process        < >  Decision          │
│  /   /   Input/Output                [===]  Predefined Process (Subroutine)     │
└─────────────────────────────────────────────────────────────────────────────────┘

    (( START: Googlebot requests public channel ))
    GET /c/gamedev/unity-physics-help
    User-Agent: Googlebot/2.1
                            │
                            │ [State: S0]
                            ▼
            ┌───────────────────────────────┐
            │ [F1.1] Resolve channel        │
            │ Server.ChannelRepository.     │
            │   findBySlug("gamedev",       │
            │     "unity-physics-help")     │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F1.2] Verify channel is      │
            │ PUBLIC_INDEXABLE              │
            │ Server.VisibilityGuard.       │
            │   isChannelPublic()           │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F1.3] Check meta tag cache   │  [State: S1]
            │ Server.MetaTagCache.get(      │
            │   channelId)                  │
            └───────────────┬───────────────┘
                            │
                    < F1.4: Cache hit? >
                   /                    \
                  / Yes                  \ No
                 ▼                        ▼
    ┌─────────────────────────┐    ┌───────────────────────────────┐
    │ [F1.5] Use cached tags  │    │ [F1.6] Check database for     │  [State: S3]
    │ [State: S2]             │    │ persisted tags                │
    │                         │    │ Server.MetaTagRepository.     │
    │                         │    │   findByChannelId()           │
    └───────────┬─────────────┘    └───────────────┬───────────────┘
                │                                  │
                │                          < F1.7: DB record exists? >
                │                         /                          \
                │                        / Yes                        \ No
                │                       ▼                              ▼
                │       ┌───────────────────────────┐   ┌───────────────────────────────┐
                │       │ [F1.8] Calculate content  │   │ [F1.9] Generate tags from     │
                │       │ hash of recent messages   │   │ scratch                       │
                │       │ Server.MessageRepository. │   │ (First-time generation)       │
                │       │   getContentHash()        │   │ [State: S5]                   │
                │       └───────────────┬───────────┘   └───────────────┬───────────────┘
                │                       │                               │
                │               < F1.10: Hash matches? >                │
                │              /                        \               │
                │             / Yes                      \ No           │
                │            ▼                            ▼             │
                │  ┌─────────────────────┐  ┌─────────────────────────┐ │
                │  │ [F1.11] Use DB tags │  │ [F1.12] Regenerate tags │ │
                │  │ Update cache        │  │ Content has changed     │ │
                │  │ [State: S6]         │  │ [State: S7]             │ │
                │  └──────────┬──────────┘  └────────────┬────────────┘ │
                │             │                          │              │
                │             │              ┌───────────┴──────────────┘
                │             │              │
                │             │              ▼
                │             │  ┌───────────────────────────────┐
                │             │  │ [F1.13] Fetch recent messages │
                │             │  │ Server.MessageRepository.     │
                │             │  │   findRecentByChannel(        │
                │             │  │     channelId, limit=100)     │
                │             │  └───────────────┬───────────────┘
                │             │                  │
                │             │                  ▼
                │             │  ┌───────────────────────────────┐
                │             │  │ [F1.14] Analyze content       │  [State: S8]
                │             │  │ Server.ContentAnalyzer.       │
                │             │  │   analyzeThread(messages)     │
                │             │  │                               │
                │             │  │ - Extract keywords            │
                │             │  │ - Classify topic              │
                │             │  │ - Summarize thread            │
                │             │  └───────────────┬───────────────┘
                │             │                  │
                │             │                  ▼
                │             │  ┌───────────────────────────────┐
                │             │  │ [F1.15] Generate title        │  [State: S10]
                │             │  │ Server.TitleGenerator.        │
                │             │  │   generateFromChannel()       │
                │             │  │                               │
                │             │  │ Template: "{Topic} - {Server}"│
                │             │  │ Example: "Unity Physics       │
                │             │  │   Troubleshooting - GameDev"  │
                │             │  │ Max 60 chars                  │
                │             │  └───────────────┬───────────────┘
                │             │                  │
                │             │                  ▼
                │             │  ┌───────────────────────────────┐
                │             │  │ [F1.16] Generate description  │
                │             │  │ Server.DescriptionGenerator.  │
                │             │  │   generateFromMessages()      │
                │             │  │                               │
                │             │  │ "Community discussion about   │
                │             │  │ Unity physics issues including│
                │             │  │ rigidbody collisions, gravity │
                │             │  │ settings, and performance..." │
                │             │  │ Max 160 chars                 │
                │             │  └───────────────┬───────────────┘
                │             │                  │
                │             │                  ▼
                │             │  ┌───────────────────────────────┐
                │             │  │ [F1.17] Generate Open Graph   │
                │             │  │ Server.OpenGraphGenerator.    │
                │             │  │   generateOGTags()            │
                │             │  │                               │
                │             │  │ og:title (max 95 chars)       │
                │             │  │ og:description (max 300 chars)│
                │             │  │ og:image (preview image)      │
                │             │  │ og:type = "website"           │
                │             │  │ og:url (canonical)            │
                │             │  └───────────────┬───────────────┘
                │             │                  │
                │             │                  ▼
                │             │  ┌───────────────────────────────┐
                │             │  │ [F1.18] Generate Twitter Card │
                │             │  │ Server.OpenGraphGenerator.    │
                │             │  │   generateTwitterCard()       │
                │             │  │                               │
                │             │  │ twitter:card = "summary"      │
                │             │  │ twitter:title                 │
                │             │  │ twitter:description           │
                │             │  │ twitter:image                 │
                │             │  └───────────────┬───────────────┘
                │             │                  │
                │             │                  ▼
                │             │  ┌───────────────────────────────┐
                │             │  │ [F1.19] Generate JSON-LD      │
                │             │  │ Server.StructuredDataGen.     │
                │             │  │   generateDiscussionForum()   │
                │             │  │                               │
                │             │  │ @type: "DiscussionForumPosting"│
                │             │  │ headline, datePublished,      │
                │             │  │ author, interactionStatistic  │
                │             │  └───────────────┬───────────────┘
                │             │                  │
                │             │                  ▼
                │             │  ┌───────────────────────────────┐
                │             │  │ [F1.20] Persist and cache     │  [State: S11]
                │             │  │ Server.MetaTagRepository.     │
                │             │  │   upsert(channelId, metaTags) │
                │             │  │ Server.MetaTagCache.set()     │
                │             │  └───────────────┬───────────────┘
                │             │                  │
                └─────────────┴──────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │ [F1.21] Render HTML <head>    │  [State: S12]
                    │ Server.HeadComponent.         │
                    │   renderMetaTags()            │
                    │   renderOpenGraph()           │
                    │   renderTwitterCards()        │
                    │   renderStructuredData()      │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    /───────────────────────────────/
                    / HTML Response with <head>:    /
                    /                               /
                    / <title>Unity Physics          /
                    /   Troubleshooting - GameDev   /
                    / </title>                      /
                    / <meta name="description"      /
                    /   content="Community disc..."/
                    / <meta property="og:title"... /
                    / <meta property="og:desc"...  /
                    / <meta name="twitter:card"... /
                    / <script type="application/   /
                    /   ld+json">...</script>      /
                    /                               /
                    /───────────────────────────────/
                                    │
                                    ▼
                    (( END: Googlebot receives page ))  [State: S13]
                    - Title and description indexed
                    - Rich snippet data available
                    - Social sharing preview ready
```

### 6.2 Scenario: New Message Triggers Meta Tag Update

**Scenario Description:** A user posts a new message in a public channel. The system detects this event and schedules a background job to update the meta tags with fresh content.

```
    (( START: User posts message in public channel ))
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F2.1] Message saved to       │
            │ database                      │
            │ Server.MessageRepository.     │
            │   create(message)             │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F2.2] Event emitted          │
            │ Server.EventBus.emit(         │
            │   "MESSAGE_CREATED",          │
            │   { channelId, messageId })   │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F2.3] EventListener receives │
            │ Server.EventListener.         │
            │   onMessageCreated()          │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F2.4] Check if channel is    │
            │ public                        │
            │ Server.VisibilityGuard.       │
            │   isChannelPublic(channelId)  │
            └───────────────┬───────────────┘
                            │
                    < F2.5: Is public? >
                   /                    \
                  / No                   \ Yes
                 ▼                        ▼
    ┌─────────────────────────┐    ┌───────────────────────────────┐
    │ [F2.6] Ignore event     │    │ [F2.7] Check for existing     │  [State: B1]
    │ No meta tags needed     │    │ queued job                    │
    │ for private channel     │    │ Server.JobQueue.exists(       │
    └─────────────────────────┘    │   `meta-update:${channelId}`) │
                                   └───────────────┬───────────────┘
                                                   │
                                           < F2.8: Job exists? >
                                          /                      \
                                         / Yes                    \ No
                                        ▼                          ▼
                        ┌───────────────────────────┐  ┌───────────────────────────────┐
                        │ [F2.9] Extend delay       │  │ [F2.10] Queue new job         │  [State: B3]
                        │ Reset debounce to 60s    │  │ Server.JobQueue.add(          │
                        │ [State: B2]               │  │   `meta-update:${channelId}`, │
                        │                           │  │   { channelId },              │
                        │ (Prevents thrashing when  │  │   { delay: 60000 })           │
                        │  many messages posted)    │  │                               │
                        └───────────────────────────┘  └───────────────┬───────────────┘
                                                                       │
                                                                       │ 60 seconds later...
                                                                       ▼
                                                       ┌───────────────────────────────┐
                                                       │ [F2.11] Worker picks up job   │  [State: B4]
                                                       │ Server.MetaTagUpdateWorker.   │
                                                       │   processJob()                │
                                                       └───────────────┬───────────────┘
                                                                       │
                                                                       ▼
                                                       ┌───────────────────────────────┐
                                                       │ [F2.12] Calculate new content │  [State: B5]
                                                       │ hash                          │
                                                       │ Server.MessageRepository.     │
                                                       │   getContentHash(channelId)   │
                                                       └───────────────┬───────────────┘
                                                                       │
                                                               < F2.13: Hash changed? >
                                                              /                        \
                                                             / No                       \ Yes
                                                            ▼                            ▼
                                            ┌───────────────────────────┐  ┌───────────────────────────────┐
                                            │ [F2.14] Skip update       │  │ [F2.15] Regenerate meta tags  │
                                            │ Content unchanged         │  │ (Full pipeline from F1.13)    │
                                            │ [State: B6]               │  │ [State: B7]                   │
                                            └───────────────────────────┘  └───────────────┬───────────────┘
                                                                                           │
                                                                                           ▼
                                                                           ┌───────────────────────────────┐
                                                                           │ [F2.16] Update database       │  [State: B8]
                                                                           │ Server.MetaTagRepository.     │
                                                                           │   upsert(channelId, newTags)  │
                                                                           │ Increment version             │
                                                                           └───────────────┬───────────────┘
                                                                                           │
                                                                                           ▼
                                                                           ┌───────────────────────────────┐
                                                                           │ [F2.17] Invalidate caches     │  [State: B9]
                                                                           │ Server.MetaTagCache.          │
                                                                           │   invalidate(channelId)       │
                                                                           │ Server.CDN.purge(channelUrl)  │
                                                                           └───────────────┬───────────────┘
                                                                                           │
                                                                                           ▼
                                                                           ┌───────────────────────────────┐
                                                                           │ [F2.18] Update sitemap        │  [State: B10]
                                                                           │ Server.SitemapUpdater.        │
                                                                           │   updateLastModified(url)     │
                                                                           └───────────────┬───────────────┘
                                                                                           │
                                                                                           ▼
                                                                           ┌───────────────────────────────┐
                                                                           │ [F2.19] Ping search engines   │
                                                                           │ (Async, non-blocking)         │
                                                                           │ Server.SitemapUpdater.        │
                                                                           │   notifySearchEngines()       │
                                                                           └───────────────┬───────────────┘
                                                                                           │
                                                                                           ▼
                                                            (( END: Meta tags updated ))  [State: B11]
                                                            - Fresh content reflected
                                                            - Next crawl sees new tags
                                                            - Search engines notified
```

### 6.3 Scenario: Social Media Link Preview Generation

**Scenario Description:** A user shares a public channel link on Twitter/Facebook. The social media platform's crawler fetches the page and extracts Open Graph tags to generate a rich link preview.

```
    (( START: User shares link on Twitter ))
    URL: https://harmony.app/c/opensource/announcements
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F3.1] Twitter card crawler   │
            │ requests URL                  │
            │ User-Agent: Twitterbot/1.0    │
            └───────────────┬───────────────┘
                            │
                            ▼
            (Same flow as F1.1 - F1.21)
            Meta tags served with emphasis on:
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F3.2] Twitter extracts       │
            │ Twitter Card tags:            │
            │                               │
            │ <meta name="twitter:card"     │
            │   content="summary_large_     │
            │   image">                     │
            │ <meta name="twitter:title"    │
            │   content="OpenSource         │
            │   Announcements">             │
            │ <meta name="twitter:desc..."  │
            │   content="Latest updates..." │
            │ <meta name="twitter:image"    │
            │   content="https://...">      │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F3.3] Twitter generates      │
            │ rich card preview:            │
            │                               │
            │ ┌─────────────────────────┐   │
            │ │ [Preview Image]         │   │
            │ │                         │   │
            │ │ OpenSource Announcements│   │
            │ │ Latest updates and news │   │
            │ │ from the community...   │   │
            │ │                         │   │
            │ │ harmony.app             │   │
            │ └─────────────────────────┘   │
            └───────────────────────────────┘
                            │
                            ▼
            (( END: Link preview displayed ))
            - Rich visual preview shown
            - Click-through rate improved
            - Brand visibility enhanced
```

### 6.4 Scenario: Content Creator Views SEO Preview

**Scenario Description:** A content creator/admin wants to see how their channel will appear in search results. The system provides a preview of the generated meta tags.

```
    (( START: Admin opens channel settings ))
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F4.1] Admin navigates to     │
            │ Channel Settings > SEO        │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F4.2] Fetch current meta     │
            │ tags for channel              │
            │ Client.API.getMetaTags(       │
            │   channelId)                  │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │ [F4.3] Display SEO preview    │
            │                               │
            │ ┌─────────────────────────────┤
            │ │ Google Search Preview:      │
            │ │                             │
            │ │ Unity Physics Help - GameDev│
            │ │ https://harmony.app/c/game..│
            │ │ Community discussion about  │
            │ │ Unity physics issues...     │
            │ └─────────────────────────────┤
            │                               │
            │ ┌─────────────────────────────┤
            │ │ Social Media Preview:       │
            │ │                             │
            │ │ [Thumbnail Image]           │
            │ │ Unity Physics Help - GameDev│
            │ │ Community discussion...     │
            │ └─────────────────────────────┤
            │                               │
            │ Keywords: unity, physics,     │
            │   rigidbody, collision        │
            │                               │
            │ [Regenerate Tags] [Edit Tags] │
            └───────────────┬───────────────┘
                            │
                            ▼
            < F4.4: Admin clicks "Edit Tags"? >
           /                                  \
          / No                              Yes \
         ▼                                       ▼
    ┌─────────────┐              ┌───────────────────────────────┐
    │ [F4.5] Done │              │ [F4.6] Show custom override   │
    │             │              │ form                          │
    └─────────────┘              │                               │
                                 │ Custom Title: [____________]  │
                                 │ Custom Desc:  [____________]  │
                                 │ Preview Image: [Select...]    │
                                 │                               │
                                 │ Note: Custom tags override    │
                                 │ auto-generated content        │
                                 │                               │
                                 │ [Save] [Cancel] [Reset to Auto]│
                                 └───────────────────────────────┘
                                                │
                                                ▼
                                 (( END: Admin manages SEO ))
```

---

## 7. Development Risks and Failures

### 7.1 Runtime Failures

| Label | Failure Mode | User-Visible Effect | Internal Effect | Recovery Procedure | Likelihood | Impact |
|-------|--------------|--------------------|-----------------|--------------------|------------|--------|
| RF-1 | Meta tag generation timeout | Page renders without custom tags, uses fallbacks | Generation job killed | Use cached/stale tags; retry later | Medium | Low |
| RF-2 | Content analysis crash | Generic meta tags shown | NLP processing error | Fallback to channel name/topic | Low | Low |
| RF-3 | Cache corruption | Stale or incorrect tags | Cache-DB mismatch | Invalidate cache; regenerate | Low | Medium |
| RF-4 | Job queue backlog | Delayed tag updates | Worker overwhelmed | Scale workers; prioritize active channels | Medium | Low |
| RF-5 | Database write failure | Old tags persist | Upsert fails | Retry with backoff; alert | Low | Medium |
| RF-6 | Keyword extraction produces nonsense | Poor search relevance | Algorithm failure | Manual review trigger; fallback keywords | Low | Medium |

### 7.2 Connectivity Failures

| Label | Failure Mode | User-Visible Effect | Internal Effect | Recovery Procedure | Likelihood | Impact |
|-------|--------------|--------------------|-----------------|--------------------|------------|--------|
| CF-1 | Search engine ping fails | Delayed indexing | Notification not received | Queue retry; manual submission | Medium | Low |
| CF-2 | CDN cache purge fails | Stale tags served | Cache not invalidated | Retry purge; wait for TTL | Low | Medium |
| CF-3 | Database connection loss | Service degradation | Queries fail | Connection pool retry; failover | Low | High |

### 7.3 Content Quality Failures

| Label | Failure Mode | User-Visible Effect | Internal Effect | Recovery Procedure | Likelihood | Impact |
|-------|--------------|--------------------|-----------------|--------------------|------------|--------|
| QF-1 | Title too generic | Poor click-through rate | Template fallback used | Improve generation algorithm | Medium | Medium |
| QF-2 | Description truncated poorly | Awkward preview text | Mid-word truncation | Sentence-aware truncation | Low | Low |
| QF-3 | Inappropriate content in tags | Embarrassing search results | Profanity/spam in source | Content filter before generation | Low | High |
| QF-4 | Duplicate titles across channels | SEO cannibalization | Same template output | Add unique identifiers | Medium | Medium |
| QF-5 | Keywords irrelevant | Wrong search audience | Topic classification error | Human review for high-traffic | Low | Medium |

### 7.4 Security/Privacy Failures

| Label | Failure Mode | User-Visible Effect | Internal Effect | Recovery Procedure | Likelihood | Impact |
|-------|--------------|--------------------|-----------------|--------------------|------------|--------|
| SF-1 | Private content in public tags | Privacy breach | Content leak in meta tags | Filter private mentions; audit | Low | Critical |
| SF-2 | User PII in description | GDPR/privacy violation | Name/email in summary | PII detection before generation | Low | Critical |
| SF-3 | XSS via meta tag content | Security vulnerability | Unsanitized user content | HTML entity encoding | Low | High |

### 7.5 Failure Priority Matrix

```
                    Impact
                    Low         Medium      High        Critical
            ┌───────────────────────────────────────────────────┐
     High   │           │               │           │           │
            ├───────────┼───────────────┼───────────┼───────────┤
   Medium   │ RF-1,RF-4 │ QF-1,QF-4     │           │           │
            │ CF-1      │               │           │           │
            ├───────────┼───────────────┼───────────┼───────────┤
     Low    │ RF-2,QF-2 │ RF-3,RF-5,RF-6│ CF-3,SF-3 │ SF-1,SF-2 │
            │           │ CF-2,QF-5     │ QF-3      │           │
            └───────────────────────────────────────────────────┘
```

---

## 8. Technology Stack

| Label | Technology | Version | Purpose | Rationale | Source/Documentation |
|-------|------------|---------|---------|-----------|---------------------|
| T1 | TypeScript | 5.3+ | Primary language | Type safety | https://www.typescriptlang.org/ |
| T2 | Next.js | 14.0+ | SSR framework | Meta tag injection in <head> | https://nextjs.org/ |
| T3 | React | 18.2+ | UI framework | Head component | https://react.dev/ |
| T4 | Node.js | 20 LTS | Server runtime | Background workers | https://nodejs.org/ |
| T5 | PostgreSQL | 16+ | Primary database | Store generated tags | https://www.postgresql.org/ |
| T6 | Redis | 7.2+ | Caching | Fast meta tag retrieval | https://redis.io/ |
| T7 | BullMQ | 5.0+ | Job queue | Background processing | https://docs.bullmq.io/ |
| T8 | natural | 6.0+ | NLP library | Keyword extraction, summarization | https://github.com/NaturalNode/natural |
| T9 | compromise | 14.0+ | NLP library | Text parsing, sentence extraction | https://compromise.cool/ |
| T10 | schema-dts | 1.1+ | Structured data types | Type-safe JSON-LD | https://github.com/google/schema-dts |
| T11 | DOMPurify | 3.0+ | HTML sanitization | Prevent XSS in tags | https://github.com/cure53/DOMPurify |
| T12 | CloudFlare | N/A | CDN | Cache invalidation API | https://www.cloudflare.com/ |
| T13 | Google Search Console API | v1 | Indexing | URL submission, sitemap ping | https://developers.google.com/webmaster-tools |
| T14 | Jest | 29+ | Testing | Unit tests for generators | https://jestjs.io/ |

---

## 9. APIs

### 9.1 Module M2: Meta Tag Generation

#### 9.1.1 CL-C2.1 MetaTagService

**Public Methods:**

```typescript
// Generate complete meta tag set for a channel
generateMetaTags(
  channelId: string,
  options?: {
    forceRegenerate?: boolean,
    includeStructuredData?: boolean
  }
): Promise<MetaTagSet>

// Get meta tags with caching
getOrGenerateCached(
  channelId: string
): Promise<MetaTagSet>

// Invalidate cached meta tags
invalidateCache(
  channelId: string
): Promise<void>

// Schedule background regeneration
scheduleRegeneration(
  channelId: string,
  priority?: 'high' | 'normal' | 'low'
): Promise<void>

// Get meta tags for admin preview
getMetaTagsForPreview(
  channelId: string
): Promise<MetaTagPreview>
```

#### 9.1.2 CL-C2.2 TitleGenerator

**Public Methods:**

```typescript
// Generate title from channel data
generateFromChannel(
  channel: Channel,
  server: Server
): string

// Generate title for specific message deep link
generateFromMessage(
  message: Message,
  channel: Channel
): string

// Generate title for thread view
generateFromThread(
  thread: Thread,
  channel: Channel
): string
```

**Private Methods:**

```typescript
private truncateWithEllipsis(
  text: string,
  maxLength: number
): string

private sanitizeForTitle(
  text: string
): string

private applyTemplate(
  template: string,
  data: TitleData
): string
```

#### 9.1.3 CL-C2.3 DescriptionGenerator

**Public Methods:**

```typescript
// Generate description from messages
generateFromMessages(
  messages: Message[],
  channel: Channel
): string

// Extract key phrases for description
extractKeyPhrases(
  content: string,
  maxPhrases: number
): string[]

// Summarize thread for description
summarizeThread(
  messages: Message[]
): string
```

#### 9.1.4 CL-C2.4 OpenGraphGenerator

**Public Methods:**

```typescript
// Generate Open Graph tags
generateOGTags(
  channel: Channel,
  server: Server,
  analysis: ContentAnalysis
): OpenGraphTags

// Generate Twitter Card tags
generateTwitterCard(
  channel: Channel,
  server: Server,
  analysis: ContentAnalysis
): TwitterCardTags

// Select best preview image
selectPreviewImage(
  channel: Channel,
  messages: Message[]
): string | null
```

#### 9.1.5 CL-C2.5 StructuredDataGenerator

**Public Methods:**

```typescript
// Generate DiscussionForumPosting schema
generateDiscussionForum(
  channel: Channel,
  messages: Message[],
  server: Server
): StructuredData

// Generate BreadcrumbList schema
generateBreadcrumbList(
  server: Server,
  channel: Channel
): StructuredData

// Generate Organization schema
generateOrganization(
  server: Server
): StructuredData

// Generate WebPage schema
generateWebPage(
  channel: Channel,
  metaTags: MetaTagSet
): StructuredData
```

### 9.2 Module M3: Content Analysis

#### 9.2.1 CL-C3.1 ContentAnalyzer

**Public Methods:**

```typescript
// Analyze thread content
analyzeThread(
  messages: Message[]
): Promise<ContentAnalysis>

// Get topic category
getTopicCategory(
  content: string
): string[]

// Get content sentiment
getSentiment(
  content: string
): 'positive' | 'negative' | 'neutral'

// Get reading level
getReadingLevel(
  content: string
): 'basic' | 'intermediate' | 'advanced'
```

#### 9.2.2 CL-C3.2 KeywordExtractor

**Public Methods:**

```typescript
// Extract keywords from content
extractKeywords(
  content: string,
  maxKeywords: number
): string[]

// Extract multi-word phrases
extractPhrases(
  content: string,
  maxPhrases: number
): string[]

// Score keywords by relevance
scoreByFrequency(
  keywords: string[],
  content: string
): ScoredKeyword[]
```

#### 9.2.3 CL-C3.3 TextSummarizer

**Public Methods:**

```typescript
// Summarize content to target length
summarize(
  content: string,
  targetLength: number
): string

// Extract first complete sentence
extractFirstSentence(
  content: string
): string

// Extract key sentences
extractKeySentences(
  content: string,
  maxSentences: number
): string[]
```

### 9.3 Module M4: Background Processing

#### 9.3.1 CL-C4.1 MetaTagUpdateWorker

**Public Methods:**

```typescript
// Process a meta tag update job
processJob(
  job: MetaTagUpdateJob
): Promise<void>

// Schedule an update with debouncing
scheduleUpdate(
  channelId: string,
  delay: number
): Promise<void>

// Batch process multiple channels
batchProcess(
  channelIds: string[]
): Promise<void>
```

#### 9.3.2 CL-C4.2 EventListener

**Public Methods:**

```typescript
// Handle message created event
onMessageCreated(
  event: MessageCreatedEvent
): Promise<void>

// Handle message edited event
onMessageEdited(
  event: MessageEditedEvent
): Promise<void>

// Handle message deleted event
onMessageDeleted(
  event: MessageDeletedEvent
): Promise<void>

// Handle channel visibility change
onChannelUpdated(
  event: ChannelUpdatedEvent
): Promise<void>
```

---

## 10. Public Interfaces

### 10.1 Cross-Module Interface Usage

#### Used by Page Rendering (M1) from Meta Tag Generation (M2):

| Method | Class | Used For |
|--------|-------|----------|
| getOrGenerateCached() | MetaTagService | SSR meta tag injection |
| generateMetaTags() | MetaTagService | Force regeneration |

#### Used by Meta Tag Generation (M2) from Content Analysis (M3):

| Method | Class | Used For |
|--------|-------|----------|
| analyzeThread() | ContentAnalyzer | Content understanding |
| extractKeywords() | KeywordExtractor | Keyword meta tag |
| summarize() | TextSummarizer | Description generation |

#### Used by Meta Tag Generation (M2) from Data Access (M5):

| Method | Class | Used For |
|--------|-------|----------|
| findByChannelId() | MetaTagRepository | Retrieve existing tags |
| upsert() | MetaTagRepository | Persist new tags |
| findRecentByChannel() | MessageRepository | Get content for analysis |

#### Used by Background Processing (M4) from Meta Tag Generation (M2):

| Method | Class | Used For |
|--------|-------|----------|
| generateMetaTags() | MetaTagService | Background regeneration |
| invalidateCache() | MetaTagService | Cache management |

### 10.2 Admin API Interface

```yaml
openapi: 3.0.3
info:
  title: Harmony Meta Tag Management API
  version: 1.0.0

paths:
  /api/admin/channels/{channelId}/meta-tags:
    get:
      summary: Get current meta tags for channel
      security:
        - bearerAuth: []
      parameters:
        - name: channelId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Meta tags retrieved
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MetaTagPreview'

    put:
      summary: Update meta tags (custom override)
      security:
        - bearerAuth: []
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MetaTagOverride'
      responses:
        '200':
          description: Meta tags updated

    post:
      summary: Regenerate meta tags
      security:
        - bearerAuth: []
      responses:
        '202':
          description: Regeneration scheduled

components:
  schemas:
    MetaTagPreview:
      type: object
      properties:
        title:
          type: string
          maxLength: 70
        description:
          type: string
          maxLength: 200
        ogTitle:
          type: string
        ogDescription:
          type: string
        ogImage:
          type: string
          format: uri
        keywords:
          type: array
          items:
            type: string
        generatedAt:
          type: string
          format: date-time
        isCustom:
          type: boolean
        searchPreview:
          $ref: '#/components/schemas/SearchPreview'
        socialPreview:
          $ref: '#/components/schemas/SocialPreview'

    MetaTagOverride:
      type: object
      properties:
        customTitle:
          type: string
          maxLength: 70
        customDescription:
          type: string
          maxLength: 200
        customOgImage:
          type: string
          format: uri

    SearchPreview:
      type: object
      properties:
        title:
          type: string
        url:
          type: string
        description:
          type: string

    SocialPreview:
      type: object
      properties:
        title:
          type: string
        description:
          type: string
        image:
          type: string
```

---

## 11. Data Schemas

### 11.1 Database Tables

#### D6.3 GeneratedMetaTagsTable

**Runtime Class:** CL-E3 GeneratedMetaTags

| Column | Database Type | Constraints | Description | Storage Est. |
|--------|--------------|-------------|-------------|--------------|
| id | UUID | PRIMARY KEY | Unique record identifier | 16 bytes |
| channel_id | UUID | FOREIGN KEY, UNIQUE, INDEX | Associated channel | 16 bytes |
| title | VARCHAR(70) | NOT NULL | SEO title tag | 70 bytes |
| description | VARCHAR(200) | NOT NULL | Meta description | 200 bytes |
| og_title | VARCHAR(95) | NOT NULL | Open Graph title | 95 bytes |
| og_description | VARCHAR(300) | NOT NULL | Open Graph description | 300 bytes |
| og_image | VARCHAR(500) | NULL | Preview image URL | 500 bytes |
| twitter_card | VARCHAR(20) | NOT NULL, DEFAULT 'summary' | Twitter card type | 20 bytes |
| keywords | TEXT[] | NOT NULL, DEFAULT '{}' | Extracted keywords | ~200 bytes |
| structured_data | JSONB | NOT NULL | JSON-LD data | ~1000 bytes |
| custom_title | VARCHAR(70) | NULL | Admin override title | 70 bytes |
| custom_description | VARCHAR(200) | NULL | Admin override description | 200 bytes |
| custom_og_image | VARCHAR(500) | NULL | Admin override image | 500 bytes |
| content_hash | VARCHAR(64) | NOT NULL | SHA-256 of source content | 64 bytes |
| generated_at | TIMESTAMP WITH TIME ZONE | NOT NULL | Last generation time | 8 bytes |
| version | INTEGER | NOT NULL, DEFAULT 1 | Generation version | 4 bytes |
| created_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Record creation | 8 bytes |
| updated_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Last update | 8 bytes |

**Indexes:**
```sql
CREATE UNIQUE INDEX idx_meta_tags_channel ON generated_meta_tags(channel_id);
CREATE INDEX idx_meta_tags_generated ON generated_meta_tags(generated_at);
```

**Storage Estimate:** ~3.3 KB per channel

### 11.2 Cache Schemas

#### D7.1 MetaTagCache

**Key Pattern:** `meta:channel:{channelId}`
**Value Type:** JSON serialized MetaTagSet
**TTL:** 3600 seconds (1 hour)
**Size:** ~2 KB per entry

#### D7.2 ContentAnalysisCache

**Key Pattern:** `analysis:channel:{channelId}`
**Value Type:** JSON serialized ContentAnalysis
**TTL:** 1800 seconds (30 minutes)
**Size:** ~500 bytes per entry

### 11.3 Job Queue Schema

#### D8.1 MetaTagUpdateQueue

**Queue Name:** `meta-tag-updates`
**Job Data:**
```typescript
{
  channelId: string,      // UUID
  priority: 'high' | 'normal' | 'low',
  triggeredBy: 'message' | 'edit' | 'manual' | 'schedule',
  attemptCount: number
}
```
**Default Delay:** 60 seconds (debounce)
**Max Attempts:** 3
**Backoff:** Exponential (1min, 5min, 15min)

---

## 12. Security and Privacy

### 12.1 Content Filtering for Meta Tags

| Filter Type | Implementation | Purpose |
|-------------|----------------|---------|
| PII Detection | Regex for emails, phones, names | Prevent personal info in search results |
| Profanity Filter | Word list + pattern matching | Prevent inappropriate previews |
| Private Mention Redaction | Remove @mentions of private users | Respect user privacy settings |
| URL Sanitization | Remove internal/private links | Prevent link leakage |
| HTML Entity Encoding | Encode special characters | Prevent XSS |

### 12.2 Data Flow Security

```
Message Content                 Content Analysis              Meta Tag Output
───────────────                 ────────────────              ───────────────
    │                                │                              │
    │                                │                              │
    ▼                                ▼                              ▼
┌─────────────┐              ┌─────────────────┐            ┌─────────────────┐
│ Raw content │─────────────►│ Sanitize input  │            │ HTML-encoded    │
│ from DB     │              │ - Remove HTML   │            │ output          │
│             │              │ - Normalize     │            │                 │
│             │              │   whitespace    │            │ Safe for        │
│             │              └────────┬────────┘            │ embedding in    │
│             │                       │                     │ <meta> tags     │
└─────────────┘                       ▼                     └─────────────────┘
                             ┌─────────────────┐
                             │ Filter PII      │
                             │ - Emails        │
                             │ - Phone numbers │
                             │ - @mentions     │
                             └────────┬────────┘
                                      │
                                      ▼
                             ┌─────────────────┐
                             │ Filter profanity│
                             │ - Word list     │
                             │ - Replace with  │
                             │   asterisks     │
                             └────────┬────────┘
                                      │
                                      ▼
                             ┌─────────────────┐
                             │ Generate tags   │
                             │ from clean      │
                             │ content         │
                             └─────────────────┘
```

### 12.3 Admin Override Security

- Only server admins can set custom meta tags
- Custom tags still undergo sanitization
- Audit log records all custom tag changes
- Rate limiting on regeneration requests

### 12.4 Search Engine Guidelines Compliance

| Guideline | Implementation |
|-----------|----------------|
| No keyword stuffing | Limit keywords to 5-10 relevant terms |
| Accurate descriptions | Summarize actual content, not clickbait |
| No cloaking | Same content for bots and users |
| Unique titles | Template ensures uniqueness per channel |
| Appropriate length | Title <60, Description <160 chars |

---

## 13. Risks to Completion

### 13.1 Technology Risks

| Technology | Learning Curve | Design Difficulty | Implementation | Verification | Maintenance |
|------------|----------------|-------------------|----------------|--------------|-------------|
| T8: natural (NLP) | Medium | Medium | Medium | High | Medium |
| T9: compromise | Medium | Low | Low | Medium | Low |
| T7: BullMQ | Low | Low | Low | Low | Low |
| T10: schema-dts | Low | Medium | Low | Medium | Low |

### 13.2 Algorithm Risks

| Component | Risk | Mitigation |
|-----------|------|------------|
| Keyword Extraction | Low relevance keywords | Human review for top channels; feedback loop |
| Text Summarization | Awkward truncation | Sentence-boundary aware truncation |
| Topic Classification | Misclassification | Fallback to generic; expandable categories |
| Title Generation | Generic/duplicate titles | Template variants; uniqueness check |

### 13.3 Quality Assurance Challenges

| Challenge | Impact | Mitigation |
|-----------|--------|------------|
| Subjective quality | Hard to automate testing | A/B testing; CTR monitoring |
| Language variations | Non-English content | Language detection; appropriate templates |
| Content diversity | Different channel types | Multiple generation strategies |
| Evolving SEO best practices | Outdated optimization | Regular review; configurable parameters |

### 13.4 Contingency Plans

| Risk | Trigger | Contingency |
|------|---------|-------------|
| NLP library issues | >5% error rate | Fallback to simple extraction |
| Queue overload | >1000 pending jobs | Batch processing; priority queue |
| Poor search rankings | CTR <1% | Manual review; algorithm tuning |
| Generation too slow | >5s per channel | Pre-generate on schedule |

---

## Appendix A: Meta Tag Templates

### Title Templates

```
// Channel page
"{ChannelName} - {ServerName} | Harmony"
// Max 60 chars, truncate channel name first

// Message deep link
"{MessagePreview} - {ChannelName} | Harmony"
// Max 60 chars, truncate message preview first

// Search result
"{TopKeyword} Discussion - {ServerName}"
// Used when channel name is generic
```

### Description Templates

```
// Standard
"Join the discussion about {topics} in {ServerName}.
{SummarySentence} {MessageCount} messages from {AuthorCount} members."

// Minimal (when content is sparse)
"Community discussion channel for {topics}.
Part of the {ServerName} community on Harmony."
```

### Structured Data Template (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "DiscussionForumPosting",
  "headline": "{title}",
  "description": "{description}",
  "url": "{canonicalUrl}",
  "datePublished": "{firstMessageDate}",
  "dateModified": "{lastMessageDate}",
  "author": {
    "@type": "Organization",
    "name": "{serverName}"
  },
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": "https://schema.org/CommentAction",
    "userInteractionCount": "{messageCount}"
  },
  "isPartOf": {
    "@type": "WebSite",
    "name": "Harmony",
    "url": "https://harmony.app"
  }
}
```

---

## Appendix B: Glossary

| Term | Definition |
|------|------------|
| Meta Tags | HTML elements in <head> that provide metadata about the page |
| Open Graph | Protocol for social media link previews (og: tags) |
| Twitter Card | Twitter's format for rich link previews |
| JSON-LD | JavaScript Object Notation for Linked Data (structured data) |
| Rich Snippet | Enhanced search result with additional information |
| SERP | Search Engine Results Page |
| CTR | Click-Through Rate - percentage of impressions resulting in clicks |
| Canonical URL | The authoritative URL for a page |
| NLP | Natural Language Processing |
| Debounce | Technique to limit how often a function runs |
