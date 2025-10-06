# YouTube Playlist Shorts Viewer

## Overview

A vertical video viewing application that transforms YouTube playlists into an immersive, shorts-style experience. The application loads YouTube videos and presents them in a full-screen, swipeable interface inspired by TikTok, Instagram Reels, and YouTube Shorts. Users can navigate through videos using touch gestures, keyboard controls, or on-screen buttons, creating a mobile-first, content-focused viewing experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management with infinite stale time configuration

**UI Component System:**
- Shadcn/ui component library (New York variant) providing pre-built, accessible components
- Radix UI primitives for unstyled, accessible component foundations
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theme management supporting dark mode (primary) and light mode

**Design System:**
- Dark-first color palette (0 0% 8% background) optimized for video content
- Inter font family for consistent typography
- Mobile-first responsive design with breakpoint at 768px
- Gesture-driven navigation with swipe/scroll support and keyboard shortcuts (arrow keys)

**Core Components:**
- `VideoPlayer`: Wraps YouTube IFrame API for embedded video playback with auto-play on view
- `ShortsViewer`: Main container managing video carousel state and navigation logic
- `VideoOverlay`: Information layer displaying title, channel, video counter, and navigation controls
- `PlaylistInput`: Form component for accepting YouTube playlist URLs with validation

### Backend Architecture

**Server Framework:**
- Express.js server with TypeScript
- Development mode uses Vite middleware for HMR integration
- Production mode serves pre-built static assets
- esbuild for server-side code bundling

**API Structure:**
- RESTful API pattern with `/api` prefix routing
- Modular route registration system in `server/routes.ts`
- Centralized error handling middleware
- Request/response logging with duration tracking

**Storage Layer:**
- Abstract storage interface (`IStorage`) for CRUD operations
- In-memory storage implementation (`MemStorage`) using Map data structures
- Designed for future database integration through interface implementation
- User management with username/password schema defined

### Data Storage Solutions

**Database Configuration:**
- Drizzle ORM configured for PostgreSQL dialect
- Schema-first approach with TypeScript type inference
- Neon serverless PostgreSQL as the target database provider
- Migration management through Drizzle Kit with output to `/migrations` directory

**Schema Design:**
- Users table with UUID primary keys (PostgreSQL `gen_random_uuid()`)
- Username/password authentication fields with unique constraints
- Zod schema validation integrated via `drizzle-zod` for runtime type checking

**Session Management:**
- Ready for `connect-pg-simple` session store integration with PostgreSQL
- Session middleware configured for Express

### Authentication and Authorization

**Current Implementation:**
- Basic user schema with username/password fields
- No active authentication middleware currently implemented
- Storage interface includes user lookup methods (`getUser`, `getUserByUsername`, `createUser`)

**Design for Future Enhancement:**
- Schema supports credential-based authentication
- Session storage infrastructure in place for stateful authentication
- Modular storage interface allows swapping in database-backed authentication

### External Dependencies

**Third-Party Services:**
- YouTube IFrame Player API for video embedding and playback control
- Loaded dynamically via script injection with global API ready callback

**Video Data Source:**
- Static JSON file (`/videos.json`) containing mock playlist data
- Structure includes video ID, title, and channel information
- Designed to be replaced with YouTube Data API v3 integration for live playlist fetching

**Development Tools:**
- Replit-specific plugins for development environment integration
- Runtime error overlay for debugging
- Cartographer and dev banner for Replit IDE features

**Font Loading:**
- Google Fonts CDN for Inter font family (weights 400, 500, 600, 700)
- Preconnect hints for performance optimization

**UI Libraries:**
- Extensive Radix UI component collection for 25+ accessible primitives
- Lucide React for iconography
- React Icons for brand icons (YouTube logo)
- Embla Carousel for potential future carousel implementations
- date-fns for date manipulation utilities

**Build & Type Checking:**
- TypeScript strict mode with ESNext module resolution
- Path aliases configured for clean imports (`@/`, `@shared/`, `@assets/`)
- PostCSS with Tailwind and Autoprefixer for CSS processing