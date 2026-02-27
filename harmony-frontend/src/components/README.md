# Components Directory

This directory contains all reusable React components organized by domain.

## Structure

```
components/
├── ui/              # Basic UI components (buttons, cards, inputs)
├── channel/         # Channel-specific components
├── server/          # Server-specific components
└── shared/          # Shared/common components used across domains
```

## Component Organization

### UI Components (`ui/`)

Basic, reusable UI building blocks:

- `Button.tsx` - Button component with variants
- `Card.tsx` - Container card components
- More to be added as needed

### Channel Components (`channel/`)

Components specific to channel functionality (from dev spec M1):

- `MessageCard.tsx` - Individual message display (C1.5)
- `MessageList.tsx` - Paginated message list (C1.3)
- `GuestPromoBanner.tsx` - Guest user promo banner (C1.4)

### Server Components (`server/`)

Components specific to server/community functionality:

- `ServerSidebar.tsx` - Server navigation sidebar (C1.6)

### Shared Components (`shared/`)

Components used across multiple domains (to be added as needed)

## Naming Conventions

- Use PascalCase for component files: `MyComponent.tsx`
- Export components as named exports
- Include JSDoc comments describing purpose and alignment with dev specs
- Reference dev spec class labels (e.g., C1.5) in component documentation

## Usage Example

```tsx
import { Button } from '@/components/ui/Button';
import { MessageCard } from '@/components/channel/MessageCard';

function MyPage() {
  return (
    <div>
      <MessageCard {...messageProps} />
      <Button variant='primary'>Click me</Button>
    </div>
  );
}
```
