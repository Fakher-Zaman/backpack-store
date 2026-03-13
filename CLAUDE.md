# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Piccollo — a single-page premium backpack store built with React 18, TypeScript, Vite, and Tailwind CSS 3.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Type-check with `tsc -b` then build with Vite
- `npm run lint` — ESLint
- `npm run preview` — Preview production build

## Architecture

Single-page app with no routing. `src/app/App.tsx` composes all sections in order: Navbar → Hero → LatestCollection → Features → ProductGrid → StoryBanner → Blog → PromoBanner → Footer.

The app is wrapped in `<WishlistProvider>` for global wishlist state.

### Path alias

`@/*` maps to `src/*` (configured in both `tsconfig.json` and `vite.config.ts`).

### Key directories

- `src/components/` — UI organized by feature: `banners/`, `blog/`, `collections/`, `hero/`, `layout/`, `products/`, `features/`, `ui/`, `wishlist/`
- `src/data/` — Static data arrays (`products.ts`, `collections.ts`, `blogs.ts`) with typed exports
- `src/hooks/` — Custom React hooks (`useWishlist.tsx` — Context provider + hook with localStorage persistence)
- `src/types/index.ts` — Shared TypeScript interfaces (`Product`, `Collection`, `BlogPost`)
- `src/styles/index.css` — Tailwind entry point + `prefers-reduced-motion` global rule

### State management

No external state library. Wishlist uses React Context (`src/hooks/useWishlist.tsx`) with localStorage persistence. The `WishlistProvider` wraps the app in `App.tsx`. Access state via `useWishlist()` hook which returns `{ items, toggle, isInWishlist, count }`.

### Styling

Tailwind CSS with custom theme in `tailwind.config.js`:
- Brand colors: `brand-green`, `brand-green-dark`, `brand-green-light`, `brand-cream`, `brand-sand`, `brand-charcoal`
- Fonts: `font-sans` (Roboto), `font-display` (Poppins) — loaded via Google Fonts in `index.html`
- Use `motion-reduce:transition-none` on animated elements for accessibility

### Images

All images use Unsplash URLs with sizing params (e.g., `?w=600&h=400&fit=crop`). No local image assets. Below-fold images use `loading="lazy"`.

### Accessibility

- Skip-to-content link in `App.tsx`
- All decorative SVGs have `aria-hidden="true"`
- Interactive elements have `aria-label` attributes
- Color swatches include text-based color names for screen readers
- `prefers-reduced-motion` respected globally in `index.css`
