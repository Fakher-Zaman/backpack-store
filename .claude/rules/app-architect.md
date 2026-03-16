# Application Architecture Rules
# Auto-loaded by Claude Code for ALL tasks in this project.
# Scope: Folder structure, component design, data flow, and system design decisions.
# Stack: React.js (Vite) + TypeScript + Tailwind CSS
# Project: backpack-store

---

## 🗺️ Project Structure (Source of Truth)

Derived from the actual project — do not deviate from this layout.

```
backpack-store/
├── public/                     ← Static assets served as-is (favicon, og-image, etc.)
├── index.html                  ← Vite entry HTML — do not modify structure
│
└── src/
    ├── main.tsx                ← App bootstrap — providers, global setup only
    ├── vite-env.d.ts           ← Vite type declarations — do not edit
    │
    ├── app/                    ← App-level setup: router, global providers, root layout
    │   └── (router, providers, App.tsx live here)
    │
    ├── components/             ← Shared, reusable UI components only
    │   ├── ui/                 ← Base design system (Button, Input, Badge — DO NOT modify)
    │   ├── forms/              ← Form components (React Hook Form based)
    │   └── layouts/            ← Navbar, Footer, Sidebar, PageWrapper
    │
    ├── data/                   ← Static/mock data, JSON fixtures, seed files
    │   └── (products.json, categories.ts, mock responses, etc.)
    │
    ├── hooks/                  ← Shared custom React hooks (used across features)
    │   └── (useDebounce, useLocalStorage, useMediaQuery, etc.)
    │
    ├── lib/                    ← Singletons, utilities, and third-party config
    │   └── (axios.ts, query-client.ts, utils.ts, cn.ts)
    │
    ├── styles/                 ← Global CSS and Tailwind base overrides
    │   └── (globals.css — Tailwind directives only, no custom class definitions)
    │
    └── types/                  ← Shared TypeScript types and interfaces
        └── (product.types.ts, cart.types.ts, api.types.ts, etc.)
```

> **Rule:** If a new file doesn't clearly belong to one of these folders,
> raise the question before creating it. Do **not** invent new top-level `src/` folders.
> New features grow inside `components/`, `hooks/`, and `types/` — not new sibling folders.

---

## 🧱 Component Architecture

### The 3-Layer Rule
Every UI feature follows three layers — never skip or merge them:

```
app/                      ← Route entry, root layout, global providers
      ↓
components/<feature>/     ← Feature logic, data fetching, state, side effects
      ↓
components/ui/            ← Presentational only — props in, JSX out, zero logic
```

### Component Rules
- **`app/`** handles routing and global providers only — no business logic here
- **`components/`** feature components own data fetching and local state
- **`components/ui/`** components receive only props — no hooks that fetch data, no stores
- One component per file — filename in `PascalCase`, matches the exported component name
- Co-locate related component files: `ProductCard.tsx`, `ProductCard.test.tsx`, `ProductCard.types.ts`

```tsx
// ✅ Correct — route renders a component, component handles its own data
// app/App.tsx
<Route path="/products/:id" element={<ProductDetail />} />

// components/ProductDetail.tsx
export function ProductDetail() {
  const { id } = useParams();
  const { data, isLoading, error } = useProduct(id!);
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return <ProductCard product={data} />;   // pure UI component
}

// components/ui/ProductCard.tsx — no data fetching, only props
export function ProductCard({ product }: { product: Product }) {
  return <div className="...">{product.name}</div>;
}

// ❌ Wrong — fetching data with useEffect inside a component
export function ProductDetail() {
  const [product, setProduct] = useState(null);
  useEffect(() => { fetch('/api/products/1').then(r => r.json()).then(setProduct) }, []);
}
```

---

## 🔄 Data Flow Rules

### Static & Mock Data — `data/` Folder
- All static JSON, fixture files, and mock API responses live in `src/data/`
- Import directly into components or hooks — no inline hardcoded arrays in components
- When replacing mock data with a real API, update the service in `lib/` — not the component

```ts
// ✅ Correct — import from data/
import products from '@/data/products.json';
import { CATEGORIES } from '@/data/categories';

// ❌ Wrong — hardcoded inline data inside a component
const products = [{ id: 1, name: 'Trail Pack' }, { id: 2, name: 'Daypack' }];
```

### State Management — Decision Tree

```
What kind of state?
│
├── Static/mock data?               → Import from data/
├── Data from an API?               → React Query (useQuery / useMutation)
├── In the URL (filters, page no)?  → useSearchParams
├── Local to one component?         → useState / useReducer
└── Shared UI (cart, modal, toast)? → Context or lib/store utility
```

### Forms — React Hook Form + Zod
- All forms use **React Hook Form** + **Zod** resolver — no exceptions
- Zod schema defined in the same file as the form, or in `types/<feature>.types.ts`
- Submit handler calls a mutation hook or service function — never raw `fetch()`

```ts
// types/product.types.ts
export const createProductSchema = z.object({
  name: z.string().min(2).max(100),
  price: z.number().positive(),
  category: z.enum(['backpack', 'bag', 'accessory']),
});
export type CreateProductInput = z.infer<typeof createProductSchema>;

// components/CreateProductForm.tsx
const form = useForm<CreateProductInput>({
  resolver: zodResolver(createProductSchema),
});
```

---

## 🌐 `lib/` — Utilities & Singletons

Everything in `lib/` is a singleton or shared utility. Never create duplicates elsewhere.

| File | Purpose |
|---|---|
| `lib/utils.ts` | Generic helpers: `cn()`, `formatPrice()`, `slugify()`, etc. |
| `lib/axios.ts` | Axios instance — **only place** to call `axios.create()` |
| `lib/query-client.ts` | React Query client — **only instance** in the app |

```ts
// lib/utils.ts — the cn() helper is used everywhere for conditional Tailwind
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// lib/axios.ts — single configured instance
import axios from 'axios';
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
});
```

---

## 🎨 `styles/` — Global Styles

- `styles/globals.css` contains **only** Tailwind directives (`@tailwind base/components/utilities`)
- No custom CSS class definitions — use Tailwind utilities in components instead
- Font imports and CSS variables (e.g. color tokens) are the only exception
- Never write component-scoped styles here — keep styles co-located or use Tailwind

---

## 📐 `types/` — Shared TypeScript Types

- All shared types and interfaces live in `src/types/`
- One file per domain: `product.types.ts`, `cart.types.ts`, `api.types.ts`
- Always export named types — no default exports from type files
- Zod schemas that generate types go here too:

```ts
// types/product.types.ts
import { z } from 'zod';

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  category: z.enum(['backpack', 'bag', 'accessory']),
  imageUrl: z.string().url(),
});

export type Product = z.infer<typeof productSchema>;
```

---

## 🪝 `hooks/` — Shared Custom Hooks

- Only **shared** hooks live here — hooks used by a single component stay in that component file
- Hook filenames: `use-debounce.ts`, `use-local-storage.ts`, `use-cart.ts`
- Every hook must have a single responsibility
- Hooks that wrap data fetching must handle loading, error, and empty states

```ts
// hooks/use-local-storage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });
  // ...
}
```

---

## 🧪 Testing Architecture

### What to Test & Where

| Type | Tool | Location | What |
|---|---|---|---|
| Unit | Vitest | `src/__tests__/unit/` | Hooks, utils, Zod schemas |
| Component | React Testing Library | `src/__tests__/components/` | UI behavior, interactions |
| E2E | Playwright | `e2e/` | Critical user journeys |

### Rules
- Use **Vitest** (not Jest) — native to Vite, zero extra config
- Test filenames mirror source: `hooks/use-cart.ts` → `__tests__/unit/use-cart.test.ts`
- Test behavior, not implementation — no asserting on internal state
- Every form component must test: valid submit ✅, invalid submit ❌, and error state 🔴
- Mock `lib/axios.ts` using `vi.mock('@/lib/axios')` in all component tests

```tsx
// ✅ Tests behavior — correct
it('shows error when price is negative', async () => {
  render(<CreateProductForm />);
  await userEvent.type(screen.getByLabelText('Price'), '-5');
  await userEvent.click(screen.getByRole('button', { name: /add/i }));
  expect(screen.getByText('Price must be positive')).toBeInTheDocument();
});

// ❌ Tests implementation — wrong
it('sets hasError to true', () => {
  const { result } = renderHook(() => useForm());
  expect(result.current.formState.hasError).toBe(false);
});
```

---

## 📦 Dependency Rules

### Before Installing Any Package
1. Does `lib/utils.ts` or a stdlib API already solve this?
2. Is it actively maintained (last commit < 6 months)?
3. Does it support **ESM**?
4. Bundle size impact? → check [bundlephobia.com](https://bundlephobia.com)

### Banned Patterns

| ❌ Banned | ✅ Use Instead |
|---|---|
| `moment.js` | `date-fns` or native `Intl` |
| `lodash` full import | `lodash-es` named imports or native JS |
| `axios.create()` outside `lib/axios.ts` | Import `api` from `@/lib/axios` |
| `class-validator` | `zod` |
| `redux` / `redux-toolkit` | React `useState` / `useReducer` or Context |
| `useEffect` for data fetching | React Query `useQuery` |
| `prop-types` | TypeScript types in `types/` |
| `process.env.*` | `import.meta.env.VITE_*` |

---

## ⚠️ Architecture Anti-Patterns — Never Do These

| Anti-Pattern | Why It's Banned | Correct Alternative |
|---|---|---|
| `useEffect` + `useState` for data fetching | Race conditions, no loading state | React Query `useQuery` |
| `fetch()` or `axios` directly in components | Bypasses `lib/`, untestable | Use hook or service via `lib/axios` |
| Hardcoded data arrays inside components | Not reusable, hard to swap | Import from `src/data/` |
| New files in `src/` root (outside existing folders) | Breaks structure | Place in correct folder or ask first |
| Multiple `axios.create()` calls | Inconsistent config | Only `lib/axios.ts` |
| Custom CSS classes in `styles/globals.css` | Naming conflicts, not scoped | Tailwind utilities in component |
| `any` type | Kills type safety | `unknown` + type guard |
| Type definitions inside component files | Not reusable | Move to `types/<domain>.types.ts` |
| `process.env.*` | Vite doesn't support it | `import.meta.env.VITE_*` |

---

## 🔀 Git & PR Architecture Decisions

- Architecture changes require a **PR comment** explaining the reasoning
- Deviations from these rules → document in `docs/architecture-decisions/ADR-<n>-<title>.md`
- Claude should **flag (not auto-fix)** rule violations found during code review

> See @docs/architecture-decisions/ for past decisions and their rationale.