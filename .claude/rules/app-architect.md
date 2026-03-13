# Application Architecture Rules
# Auto-loaded by Claude Code for ALL tasks in this project.
# Scope: Folder structure, component design, data flow, and system design decisions.

---

## Project Structure (Source of Truth)

```
src/
├── app/                    ← Next.js App Router — pages, layouts, API routes
│   ├── (auth)/             ← Route group: auth pages (no layout)
│   ├── (dashboard)/        ← Route group: protected app pages
│   ├── api/                ← API route handlers
│   │   └── webhooks/       ← External service webhooks (Stripe, etc.)
│   ├── layout.tsx          ← Root layout (fonts, providers)
│   └── globals.css         ← Global styles (Tailwind base only)
│
├── components/             ← Reusable UI components
│   ├── ui/                 ← shadcn/ui base components (DO NOT modify)
│   ├── forms/              ← Form components (React Hook Form based)
│   └── layouts/            ← Shared layout components (Navbar, Sidebar)
│
├── lib/                    ← Core utilities and singletons
│   ├── db.ts               ← Prisma client singleton (ONLY instance)
│   ├── auth.ts             ← NextAuth config and helpers
│   ├── stripe.ts           ← Stripe client singleton
│   └── utils.ts            ← Generic helpers (cn, formatDate, etc.)
│
├── hooks/                  ← Custom React hooks (client-side only)
├── stores/                 ← Zustand global state stores
├── services/               ← Business logic layer (no framework coupling)
├── types/                  ← Shared TypeScript types and interfaces
└── config/                 ← App-wide constants and environment validation
```

> **Rule:** If a new file doesn't clearly belong to one of these folders,
> raise the question before creating it. Don't invent new top-level folders.

---

## Component Architecture

### The 3-Layer Rule
Every UI feature follows three layers — never skip or merge them:

```
Page (app/)          ← Data fetching, route params, auth checks
    ↓
Feature Component    ← Business logic, state, side effects
(components/)
    ↓
UI Component         ← Presentational only, no logic, no data fetching
(components/ui/)
```

### Server vs Client Components
- **Default to Server Components** — only add `"use client"` when needed
- Triggers for `"use client"`: event handlers (`onClick`), React hooks, browser APIs
- **Never** fetch data inside a Client Component — lift fetching to the nearest Server Component
- Keep `"use client"` boundaries as **low in the tree** as possible

```tsx
// Correct pattern — server fetches, client handles interaction
// app/dashboard/page.tsx (Server Component)
export default async function DashboardPage() {
  const data = await fetchDashboardData(); // server-side fetch
  return <DashboardClient initialData={data} />;
}

// components/DashboardClient.tsx
'use client';
export function DashboardClient({ initialData }) {
  const [data, setData] = useState(initialData); // client state
  ...
}
```

---

## Data Flow Rules

### Fetching
- **Server Components**: Use `async/await` directly — no `useEffect` for initial data
- **Client-side mutations**: Use **Server Actions** or API routes — never call the DB directly from client code
- **External APIs**: Always go through `services/` layer — never call `fetch()` directly in components

### State Management
- **Local UI state**: `useState` / `useReducer` — keep it in the component
- **Shared UI state** (modals, toasts, sidebar): Zustand store in `stores/`
- **Server state** (cached data): React Query / SWR — never duplicate in Zustand
- **URL state** (filters, pagination): `useSearchParams` — not useState

```
Decision tree for state:
Is it server data?       → React Query / SWR
Is it in the URL?        → useSearchParams
Is it one component?     → useState
Is it shared UI state?   → Zustand
```

### Forms
- All forms use **React Hook Form** + **Zod** schema validation
- Schema lives in `lib/validations/<feature>.ts`
- Submit handler calls a **Server Action** — never a raw fetch

```ts
// Correct form pattern
// lib/validations/user.ts
export const updateUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
});

// components/forms/UpdateUserForm.tsx
const form = useForm<z.infer<typeof updateUserSchema>>({
  resolver: zodResolver(updateUserSchema),
});
```

---

## Database & Services Layer

### Database Rules
- `lib/db.ts` is the **ONLY** place to instantiate Prisma — never create another `new PrismaClient()`
- All DB queries live in `services/` — **never** write Prisma queries inside components or API routes directly
- Every service function must have explicit TypeScript return types
- All writes must go through **Zod validation** before touching the DB

```ts
// Correct — service layer pattern
// services/user-service.ts
import { db } from '@/lib/db';
import { updateUserSchema } from '@/lib/validations/user';
import type { User } from '@prisma/client';

export async function updateUser(id: string, input: unknown): Promise<User> {
  const data = updateUserSchema.parse(input); // validate first
  return db.user.update({ where: { id }, data });
}

// Wrong — Prisma query directly in a route handler
export async function PUT(req: Request) {
  const body = await req.json();
  const user = await db.user.update({ where: { id: body.id }, data: body }); // no validation!
}
```

---

## Authentication & Authorization

- Auth is handled by **NextAuth.js** — config lives in `lib/auth.ts`
- Protect routes with **middleware** (`middleware.ts` at root) — never check auth inside the page
- Access the session with `getServerSession()` in Server Components / API routes
- Role checks go in `services/` — not in UI components

```ts
// Correct — route protection in middleware
// middleware.ts
export { auth as middleware } from '@/lib/auth';
export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};
```

---

## API Routes

- File location: `app/api/<resource>/<action>/route.ts`
- Always validate request body with **Zod** before processing
- Return consistent response shapes:

```ts
// Success response
return Response.json({ success: true, data: result }, { status: 200 });

// Error response
return Response.json({ success: false, error: 'Validation failed', details: issues }, { status: 400 });
```

- Never return raw Prisma errors to the client — map them to safe messages
- Rate limit any unauthenticated endpoint

---

## Dependency Rules

### Adding a New Package
Before installing, answer these questions:
1. Does a stdlib or already-installed package solve this?
2. Is it actively maintained (last commit < 6 months)?
3. Does it support ESM?
4. Will it significantly increase bundle size? (check bundlephobia.com)

### Banned Patterns
- ❌ `moment.js` → use `date-fns` or native `Intl`
- ❌ `lodash` (full import) → use `lodash-es` with named imports, or native JS
- ❌ `axios` on the server → use native `fetch`
- ❌ `class-validator` → use `zod`
- ❌ `redux` → use `zustand`

---

## Testing Architecture

### What to Test & Where
| Type | Tool | Location | What |
|---|---|---|---|
| Unit | Jest | `__tests__/unit/` | Services, utils, validators |
| Component | React Testing Library | `__tests__/components/` | UI behavior, user interactions |
| Integration | Jest + Supertest | `__tests__/integration/` | API routes end-to-end |
| E2E | Playwright | `e2e/` | Critical user journeys |

### Rules
- Services must have **>80% unit test coverage**
- New components require at least **one RTL test** for each user interaction
- Test filenames mirror the source: `services/user-service.ts` → `__tests__/unit/user-service.test.ts`
- **Never mock the DB in integration tests** — use a test database
- Test behavior, not implementation — no testing of internal state

```ts
// Tests behavior
it('shows error message when email is invalid', async () => {
  render(<LoginForm />);
  await userEvent.type(screen.getByLabelText('Email'), 'not-an-email');
  await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
  expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
});

// Tests implementation
it('sets hasError state to true', () => {
  const { result } = renderHook(() => useLoginForm());
  expect(result.current.hasError).toBe(false); // testing internal state
});
```

---

## Architecture Anti-Patterns — Never Do These

| Anti-Pattern | Why It's Banned | Correct Alternative |
|---|---|---|
| Fetching data in `useEffect` on mount | Race conditions, no loading state | Server Component async fetch |
| New `PrismaClient()` outside `lib/db.ts` | Connection pool exhaustion | Import from `@/lib/db` |
| Business logic in components | Untestable, tightly coupled | Move to `services/` |
| Direct DB calls in API routes | No validation layer | Call `services/` functions |
| `any` type escape hatch | Kills type safety downstream | Use `unknown` + type guard |
| Global CSS classes | Style conflicts, no scoping | Tailwind utilities only |
| Storing server data in Zustand | Stale data, cache inconsistency | React Query / SWR |

---

## Git & PR Architecture Decisions

- Architecture changes (new folders, new patterns) require a **comment in the PR** explaining the reasoning
- Any decision that deviates from these rules must be documented in `docs/architecture-decisions/`
  using the format: `ADR-<number>-<short-title>.md`
- Claude should **flag** (not auto-fix) when it detects a violation of these rules during a review

> See @docs/architecture-decisions/ for past decisions and their rationale.