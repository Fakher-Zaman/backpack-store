# Feature Specification: Add product quick view modal with animation and cart integration

## 1. Overview
A quick view modal that allows users to preview product details (image, name, price, description, colors, rating) without navigating away from the product grid. The modal includes animated entry/exit transitions using framer-motion and full cart integration (add to cart, quantity selection).

- **What is being built?** A `QuickViewModal` component triggered from `ProductCard` via an "eye" or "Quick View" button overlay on hover.
- **Why is it needed?** Users currently must scan minimal card info or rely on the full detail page. A quick view reduces friction and keeps users in the browsing flow.

## 2. Problem Statement
- Users who want to check product details (description, available colors, full-size image) must leave the grid context.
- This increases navigation overhead and can reduce conversion rates.
- Without this feature, the browsing experience feels less polished compared to modern e-commerce stores.

## 3. Goals & Objectives
- **Primary goal:** Let users preview full product details and add to cart without leaving the product grid.
- **Secondary goals:**
  - Smooth, accessible modal animations (respecting `prefers-reduced-motion`)
  - Consistent dark mode support
  - Reusable modal pattern that aligns with existing `ReviewModal` conventions

## 4. User Stories
- As a user, I want to click a "Quick View" button on a product card so that I can see product details in an overlay without leaving the page.
- As a user, I want to select a color and quantity inside the quick view and add the item to my cart.
- As a user, I want to close the modal by clicking the backdrop, pressing Escape, or clicking a close button.
- As a user using a screen reader, I want the modal to be accessible with proper focus trapping and ARIA attributes.

## 5. Functional Requirements
- **Trigger:** Hovering over a `ProductCard` reveals a "Quick View" button overlay; clicking it opens the modal.
- **Modal content:**
  - Large product image (left side or top on mobile)
  - Product name, price (with original price / discount badge if applicable)
  - Star rating + review count (using existing `StarRating` + `useReviews`)
  - Color swatches (clickable, highlight selected)
  - Product description
  - Quantity selector (increment/decrement, min 1)
  - "Add to Cart" button (uses `useCart().addItem`)
  - Wishlist button (existing `WishlistButton`)
- **Close behavior:** Backdrop click, Escape key, close (X) button
- **Animation:** framer-motion `AnimatePresence` for enter/exit with scale + fade; respects `useReducedMotion()`
- **Responsive:** Full-width bottom sheet on mobile (<640px), centered modal on desktop
- **Dark mode:** Full support using existing Tailwind `dark:` classes

## 6. Non-Functional Requirements
- **Performance:** Modal content lazy-renders only when open; no layout shift on the grid when hover overlay appears.
- **Responsiveness:** Mobile-first — stacks vertically on small screens, side-by-side on md+.
- **Accessibility:** Focus trap inside modal, `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to product name, restore focus on close.
- **Reduced motion:** Skip scale/slide animations when `prefers-reduced-motion` is enabled.

## 7. UI/UX Guidelines
- Follow existing modal pattern from `ReviewModal` (backdrop opacity, scroll lock, stopPropagation).
- Entry animation: fade in + scale from 0.95 → 1 (200ms ease-out).
- Exit animation: fade out + scale to 0.95 (150ms ease-in).
- Backdrop: `bg-black/50` with fade, consistent with existing modals.
- Image: hover zoom effect matching `ProductCard` pattern.
- Keep visual consistency with `ProductCard` typography, spacing, and color tokens.

## 8. Technical Design

### Frontend

#### New Components
| Component | Location | Responsibility |
|---|---|---|
| `QuickViewModal` | `src/components/products/QuickViewModal.tsx` | Modal shell: overlay, animation, layout, close logic |
| `QuickViewContent` | Inside same file (not exported) | Product details, color picker, quantity, add-to-cart |

#### Modified Components
| Component | Change |
|---|---|
| `ProductCard.tsx` | Add hover overlay with "Quick View" button; manage `isQuickViewOpen` state |

#### State Management
- `isQuickViewOpen` — local `useState` in `ProductCard`
- `selectedColor` — local `useState` in `QuickViewContent`
- `quantity` — local `useState` in `QuickViewContent`
- Cart operations — via existing `useCart()` context
- Reviews — via existing `useReviews()` hook

#### Dependencies (already installed)
- `framer-motion` v12.37.0 — `motion.div`, `AnimatePresence`, `useReducedMotion`
- `tailwind-merge` + `clsx` via `cn()` — conditional classes

### Backend
No backend changes required. All data comes from `src/data/products.ts`.

## 9. Data Structures

No new types needed. Uses existing `Product` type from `src/types/index.ts`:

```ts
type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  colors?: string[];
  category?: string;
  description?: string;
};
```

## 10. Test Plan

| Test | Type | File |
|---|---|---|
| Quick view opens on button click | Component | `src/__tests__/components/QuickViewModal.test.tsx` |
| Quick view closes on Escape / backdrop | Component | same |
| Add to cart calls `addItem` with correct product | Component | same |
| Quantity increment/decrement works | Component | same |
| Renders product details (name, price, image) | Component | same |
| Respects reduced motion preference | Component | same |

## 11. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Hover overlay not touch-friendly | Add long-press or dedicated icon button on mobile |
| Modal blocks scrolling on body | Reuse existing scroll-lock pattern from `ReviewModal` |
| Animation jank on low-end devices | `useReducedMotion()` fallback; use `will-change: transform` |

## 12. Out of Scope
- Product image gallery / carousel (single image only for v1)
- "Buy now" / direct checkout from quick view
- Related products section inside modal
- Deep linking to quick view state
