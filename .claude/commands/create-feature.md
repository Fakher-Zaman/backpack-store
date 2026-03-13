---
allowed-tools: Read, Write, Edit, Bash(git *), Bash(npm *), Bash(find *), Bash(ls *)
argument-hint: [feature-name] e.g. wishlist | product-filter | cart-discount
description: Scaffold a new feature for the backpack-store app with components, services, tests, and types
---

# Create Feature — Backpack Store

Scaffolding new feature: **$ARGUMENTS**

---

## 📍 Project Snapshot

- Project layout: !`find src -maxdepth 2 -type d | head -20`
- Active branch: !`git branch --show-current`
- Existing features: !`ls src/features 2>/dev/null || ls src/components 2>/dev/null | head -10`
- Dependencies: @package.json

---

## 🚀 Scaffold Steps

### 1 — Create Feature Branch
```bash
git checkout -b feature/$ARGUMENTS
```

### 2 — Create Folder Structure
Create the following inside `src/features/$ARGUMENTS/`:

```
src/features/$ARGUMENTS/
├── components/
│   ├── $ARGUMENTS.tsx          ← Main feature component
│   └── $ARGUMENTS.test.tsx     ← Component tests
├── hooks/
│   └── use-$ARGUMENTS.ts       ← Feature-specific hook
├── services/
│   └── $ARGUMENTS-service.ts   ← API calls / business logic
├── types/
│   └── $ARGUMENTS.types.ts     ← TypeScript types & interfaces
└── index.ts                    ← Public barrel export
```

### 3 — Types First (always define the shape before building)
In `types/$ARGUMENTS.types.ts`, define:
- Main entity type (e.g. `Backpack`, `CartItem`, `WishlistItem`)
- API request/response types
- Component prop types

### 4 — Service Layer
In `services/$ARGUMENTS-service.ts`:
- All API calls using `fetch` (no axios on server)
- Validate inputs with **Zod** before any DB/API write
- Return typed responses — no `any`

### 5 — Custom Hook
In `hooks/use-$ARGUMENTS.ts`:
- Wrap service calls with **React Query** (`useQuery` / `useMutation`)
- Handle loading, error, and success states
- Export only what the component needs

### 6 — Component
In `components/$ARGUMENTS.tsx`:
- Server Component by default — add `"use client"` only if needed
- Use Tailwind utilities only — no custom CSS
- Handle empty, loading, and error UI states explicitly

### 7 — Tests
In `components/$ARGUMENTS.test.tsx`:
- Test user-visible behavior with **React Testing Library**
- Cover: renders correctly, handles empty state, handles error state
- At least one test per user interaction

### 8 — Barrel Export
In `index.ts`:
```ts
export { default as $ARGUMENTS } from './components/$ARGUMENTS';
export * from './types/$ARGUMENTS.types';
export { use$ARGUMENTS } from './hooks/use-$ARGUMENTS';
```

### 9 — Wire Into the App
- Import the feature in the relevant page under `src/app/`
- Add route in `app/` if this feature needs its own page
- Register any new API routes under `app/api/$ARGUMENTS/`

### 10 — Commit
```bash
git add .
git commit -m "feat($ARGUMENTS): scaffold $ARGUMENTS feature with components, service, hook, and tests"
git push origin feature/$ARGUMENTS
```

---

## ✅ Done Checklist

- [ ] Branch created: `feature/$ARGUMENTS`
- [ ] Types defined before implementation
- [ ] Service layer uses Zod validation
- [ ] Hook wraps service with React Query
- [ ] Component defaults to Server Component
- [ ] At least 3 tests written
- [ ] Barrel export in `index.ts`
- [ ] Wired into a page or route
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm run test` passes
- [ ] Committed with conventional commit message

---

## 🛍️ Backpack Store Feature Examples

| Command | What It Builds |
|---|---|
| `/create-feature wishlist` | Save/remove backpacks to a wishlist |
| `/create-feature product-filter` | Filter by brand, size, color, price |
| `/create-feature cart-discount` | Apply coupon codes at checkout |
| `/create-feature product-review` | Star ratings and review submission |
| `/create-feature size-guide` | Modal with backpack size chart |
| `/create-feature order-tracking` | Post-purchase order status page |