# Harmony Frontend

Next.js 14+ application for the Harmony search-engine-indexable chat platform.

## Tech Stack

This project uses the canonical tech stack from the Harmony dev specs (Section 8):

- **T1**: TypeScript 5.3+ - Primary language with strict mode
- **T2**: React 18.2+ - UI framework  
- **T3**: Next.js 14.0+ - SSR/SSG framework (SEO-critical for public pages)
- **T4**: Node.js 20 LTS - Server runtime
- **Tailwind CSS** - Styling framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Getting Started

### Prerequisites

- Node.js 20 LTS or later
- npm (comes with Node.js)

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`.

### Build

Build for production:

```bash
npm run build
npm start
```

## Project Structure

```
harmony-frontend/
├── src/
│   ├── app/           # Next.js App Router pages and layouts
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services and business logic
│   ├── mocks/         # Mock data for development/testing
│   ├── types/         # TypeScript type definitions
│   ├── layouts/       # Layout components
│   ├── context/       # React Context providers
│   └── assets/        # Static assets (images, fonts, etc.)
├── public/            # Public static files
└── .env.example       # Environment variables template
```

## Path Aliases

TypeScript is configured with path aliases for cleaner imports:

```typescript
// Instead of: import { Button } from '../../../app/components/Button'
import { Button } from '@/app/components/Button'
```

The `@/` alias maps to `src/`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

## Code Quality

- **Linting**: `npm run lint`
- **TypeScript**: Strict mode enabled in `tsconfig.json`

## Development Specifications

This frontend implementation is based on the following dev specs in the repository root:

- `docs/dev-spec-channel-visibility-toggle.md`
- `docs/dev-spec-guest-public-channel-view.md`
- `docs/dev-spec-seo-meta-tag-generation.md`

All specs specify **Next.js 14.0+ (T3)** for SSR/SSG capabilities required for SEO optimization.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Harmony Project](https://github.com/acabrera04/Harmony) - main repository

