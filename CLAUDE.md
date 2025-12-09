# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Benin Culture Hub** application - a platform for documenting, sharing, and preserving Beninese cultural content including stories, recipes, articles, music, videos, photos, and audio. The app connects to a backend API and provides both public content browsing and an admin dashboard for content moderation.

## Development Commands

```bash
# Install dependencies
npm i

# Start development server (http://localhost:8080)
npm run dev

# Build for production
npm run build

# Build in development mode
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Tech Stack

- **Frontend**: React 18.3 + TypeScript
- **Build Tool**: Vite 5.4
- **Routing**: React Router DOM v6
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS with custom Beninese cultural color palette
- **State Management**: TanStack Query (React Query) for server state
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios

## Architecture

### Application Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components (accordion, button, card, etc.)
│   └── dashboard/      # Dashboard-specific components
├── pages/              # Route pages (Index, Auth, Explore, etc.)
│   └── dashboard/      # Dashboard route pages
├── layouts/            # Layout components (DashboardLayout)
├── services/           # API service modules
├── data/               # Static data (contentTypes, languages, regions)
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

### Routing Structure

- `/` - Home page (Index)
- `/auth` - Authentication page
- `/explorer` - Browse/explore cultural content
- `/content/:id` - Individual content detail page
- `/type-contenu/:id` - Content filtered by type
- `/publier` - Create/submit new content
- `/dashboard` - Dashboard home (admin)
- `/dashboard/moderation` - Content moderation interface
- `/dashboard/users` - User management

### API Integration

The app connects to a backend API via `VITE_API_URL` environment variable (default: `http://localhost:8000/`).

**API Service Pattern:**
```typescript
// src/services/types_contenus.ts
const API_URL = import.meta.env.VITE_API_URL + "api/v1/types-contenu";
export const getTypesContenu = () => axios.get<TypeContenu[]>(API_URL);
```

**Current API endpoints:**
- `GET /api/v1/types-contenu` - Fetch content types
- `GET /api/v1/typecontenus/{id}` - Fetch content by type ID

### Key Data Models

**Content Types** (7 types):
- Histoire/Conte (stories/tales)
- Recette culinaire (recipes)
- Article culturel (cultural articles)
- Musique (music)
- Vidéo (videos)
- Galerie photos (photo galleries)
- Audio/Podcast

**Languages**: 12 languages including Fon, Yoruba, Bariba, Dendi, Goun, Adja, French (defined in `src/data/languages.ts`)

**Regions**: 12 administrative regions of Benin (Atacora, Alibori, Borgou, Donga, Collines, Zou, Plateau, Ouémé, Atlantique, Littoral, Mono, Couffo)

### UI Component Library (shadcn/ui)

Components are managed via `components.json` configuration. To add new shadcn components:

```bash
npx shadcn-ui@latest add [component-name]
```

Path aliases are configured:
- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks`

### Styling

Custom Beninese cultural color palette defined in `tailwind.config.ts`:
- `terracotta`, `ochre`, `gold`, `earth-dark`, `cream`, `sand`
- Custom fonts: Inter (sans), Playfair Display (display/serif)
- Custom animations: `float`, `pulse-glow`

### State Management

Uses TanStack Query (React Query) for server state:
```typescript
const queryClient = new QueryClient();
// Wrap app in QueryClientProvider (see App.tsx)
```

### TypeScript Configuration

TypeScript is configured with relaxed settings for rapid development:
- `noImplicitAny: false`
- `strictNullChecks: false`
- Path alias `@/*` maps to `src/*`

## Important Implementation Details

### Adding New API Endpoints

1. Create service file in `src/services/`
2. Define TypeScript interfaces for request/response
3. Use `import.meta.env.VITE_API_URL` for base URL
4. Export axios-based functions

Example:
```typescript
export const getItems = () => {
  const API_URL = import.meta.env.VITE_API_URL + "api/v1/items";
  return axios.get<Item[]>(API_URL);
};
```

### Dashboard Layout Pattern

Dashboard pages should use `DashboardLayout`:
```typescript
import DashboardLayout from "@/layouts/DashboardLayout";

const MyDashboardPage = () => (
  <DashboardLayout
    title="Page Title"
    description="Optional description"
  >
    {/* Page content */}
  </DashboardLayout>
);
```

The layout provides:
- Collapsible sidebar (via `DashboardSidebar`)
- Top header with search and notifications
- Consistent padding and spacing

### Content Type Icons

Each content type has an associated Lucide icon (defined in `src/data/contentTypes.ts`):
- BookOpen (stories), UtensilsCrossed (recipes), FileText (articles)
- Music, Film, ImageIcon, Mic (audio)

### Environment Variables

Required in `.env`:
```
VITE_API_URL=http://localhost:8000/
```

**Note:** `.env` is currently tracked in git (visible in untracked files). Consider adding it to `.gitignore` if it contains sensitive data.

## Development Notes

- This project was created via Lovable.dev (see README.md)
- Uses `lovable-tagger` plugin in development mode for component tracking
- Server runs on port 8080 (configured in `vite.config.ts`)
- The project uses React Router v6 with catch-all route for 404 handling
