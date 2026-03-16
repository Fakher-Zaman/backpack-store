# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # TypeScript check + Vite build
npm run lint         # ESLint
npm run test         # Vitest (single run)
npm run test:watch   # Vitest (watch mode)
npm run test:coverage # Vitest with v8 coverage
npx vitest run src/__tests__/unit/useCart.test.tsx  # Run a single test file
```

## Architecture

React 18 + TypeScript + Vite + Tailwind CSS single-page backpack store app. No router — `App.tsx` renders all sections as a single scrollable page.

### Provider Stack (in App.tsx)

`AuthProvider` → `WishlistProvider` → `CartProvider` → `ReviewsProvider` — all implemented as React Context in `src/hooks/`. State is persisted to localStorage with `piccollo-` prefixed keys.

### Key Patterns

- **Path alias**: `@/` maps to `src/` (configured in both tsconfig.json and vite.config.ts)
- **Data layer**: Static product/blog/collection data lives in `src/data/`. No real API — `src/lib/auth.ts` and `src/lib/payment.ts` are mock services.
- **Axios**: Singleton instance in `src/lib/axios.ts` — always import from there, never create new instances.
- **Tests**: Vitest + jsdom + React Testing Library. Setup file at `src/__tests__/setup.ts`. Unit tests in `src/__tests__/unit/`, component tests in `src/__tests__/components/`.
- **Types**: Shared types in `src/types/` (Zod schemas + inferred types). Component-local types stay co-located.
- **No `any`**: Use `unknown` with type guards. Strict mode enabled.
