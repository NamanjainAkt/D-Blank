# AGENTS.md - D-Blanks Development Guide

## Project Overview
D-Blanks is a Next.js 16 gaming & vocational training platform with a dark cyberpunk/neon aesthetic. Built with React 18, TypeScript, Tailwind CSS, shadcn/ui, MongoDB, and NextAuth.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint (next lint)
npm run seed     # Seed database (runs scripts/seed.ts via tsx)
```

**Testing**: No test framework is currently configured. To add one, install Vitest or Jest with `@testing-library/react`.

**Running a single test** (once configured): `npx vitest <test-file>` or `npx jest <test-file>`

## Code Style Guidelines

### Imports & Path Aliases
- Use `@/*` alias for `src/*` (configured in tsconfig.json)
- Import order: external packages → `@/` aliases → relative imports
- Use named exports for utilities, default exports for page components
- React components: `import * as React from "react"`

```typescript
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
```

### TypeScript
- **Strict mode enabled** (`"strict": true` in tsconfig)
- Use explicit return types for public functions
- Prefer interfaces for object shapes, `type` for unions/intersections
- Use `zod` for runtime validation (see `src/lib/validations.ts`)
- Infer types from zod schemas: `type MyType = z.infer<typeof mySchema>`

### Naming Conventions
- **Components**: PascalCase (`CourseCard`, `Navbar`)
- **Files**: PascalCase for components (`.tsx`), camelCase for utilities (`.ts`)
- **Functions/variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **CSS classes**: kebab-case or Tailwind utility classes
- **API routes**: lowercase with hyphens in URL segments

### Component Patterns
- Use React Server Components by default; add `'use client'` only when needed (hooks, interactivity)
- Use `React.forwardRef` for UI components that accept refs
- Use `cva` (class-variance-authority) for component variants (see `src/components/ui/button.tsx`)
- Use `cn()` utility from `@/lib/utils` to merge Tailwind classes conditionally

```typescript
const buttonVariants = cva("base-classes", {
  variants: { variant: {...}, size: {...} },
  defaultVariants: { variant: "default", size: "default" },
});
```

### Styling
- **Primary**: Tailwind CSS with custom theme (see `tailwind.config.ts`)
- **UI Components**: shadcn/ui (style: "new-york", CSS variables enabled)
- **Custom CSS**: `src/app/globals.css` — CSS variables for theming
- **Neon palette**: `--neon-purple`, `--cyber-pink`, `--laser-cyan`, `--acid-green`
- **Fonts**: Orbitron (display), Space Grotesk (body), JetBrains Mono (code)
- Use `cn()` for conditional classes: `cn("base", isActive && "active-class")`

### Error Handling
- API routes: throw errors with descriptive messages; let Next.js handle response
- Form validation: use Zod schemas from `src/lib/validations.ts`
- Database errors: catch and re-throw with context
- Auth errors: throw `new Error('message')` in next-auth authorize callback

```typescript
if (!MONGODB_URI) throw new Error('Please define MONGODB_URI');
const result = mySchema.safeParse(data);
if (!result.success) return NextResponse.json({ error: result.error }, { status: 400 });
```

### Database (MongoDB/Mongoose)
- Models in `src/models/` (Admin, Course, Enrollment)
- Connection pooling via `src/lib/db.ts` (cached connection)
- Always call `await dbConnect()` before database operations
- Use Mongoose types; avoid `any` where possible

### Authentication
- NextAuth v4 with Credentials provider (email/password)
- Session strategy: JWT, 24h max age
- Sign-in page: `/admin/login`
- Protect admin routes with `getServerSession()` or middleware

### API Routes
- File-based routing in `src/app/api/`
- Use Next.js Route Handlers (`export async function GET/POST/PUT/DELETE`)
- Validate input with Zod before processing
- Return appropriate HTTP status codes

### State Management
- **Zustand** for client-side global state
- **React Hook Form + Zod** for form state
- Server state: fetch directly in Server Components or use SWR/React Query if needed

### Animations
- **Framer Motion**: primary animation library
- **GSAP**: complex timeline animations
- **Three.js + @react-three/fiber**: 3D scenes
- **Lenis**: smooth scrolling
- Custom CSS animations defined in `tailwind.config.ts`

### Environment Variables
- Required: `MONGODB_URI`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `PHONEPE_*`
- Optional: `RESEND_API_KEY`, `CLOUDINARY_*`
- Copy `.env.example` to `.env.local` before development
- Never commit `.env.local` or secrets

### Project Structure
```
src/
├── app/              # Next.js App Router (pages, layouts, API routes)
│   ├── admin/        # Admin dashboard
│   ├── api/          # API route handlers
│   └── (routes)/     # Public pages
├── components/       # React components
│   ├── ui/           # shadcn/ui primitives + custom UI
│   ├── hero/         # Hero section effects
│   ├── games/        # Game-related components
│   └── training/     # Training/course components
├── lib/              # Utilities (auth, db, email, validations, utils)
├── models/           # Mongoose schemas
├── types/            # TypeScript type definitions
└── proxy.ts          # Middleware proxy
```

### Git & Commits
- Write descriptive commit messages focusing on "why" not "what"
- Do not commit `.env` files, `node_modules/`, or build artifacts
- Run `npm run lint` before committing
