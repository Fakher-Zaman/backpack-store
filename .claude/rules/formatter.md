# Formatter Rules
# Auto-loaded by Claude Code for ALL tasks in this project.
# Scope: Code style, formatting, linting, and output consistency.

---

## General Formatting Principles

- Indentation: **2 spaces** for JS/TS/JSON/YAML
- Max line length: **100 characters** (soft), **120 characters** (hard limit)
- End-of-file: Always include a **single trailing newline**
- Line endings: **LF only** (`\n`) — never CRLF
- Encoding: **UTF-8** for all files, always

---

## JavaScript / TypeScript Formatting

### General
- Use **single quotes** for strings — exception: JSX attributes use double quotes
- Always use **semicolons** at end of statements
- Always add **trailing commas** in multi-line objects, arrays, and function params
- Arrow functions: omit parentheses for single params → `x => x + 1`
- Prefer **template literals** over string concatenation

### Objects & Arrays
```ts
// Correct — trailing comma, consistent spacing
const config = {
  host: 'localhost',
  port: 3000,
  debug: true,
};

// Wrong — no trailing comma, inconsistent
const config = {host: 'localhost', port: 3000, debug: true}
```

### Imports — Always Group in This Order
```ts
// 1. Node built-ins
import path from 'path';

// 2. External packages
import { useState } from 'react';
import axios from 'axios';

// 3. Internal aliases (@/)
import { db } from '@/lib/db';

// 4. Relative imports
import { helper } from './utils';

// 5. Type-only imports (last)
import type { User } from '@/types';
```

### TypeScript Specifics
- **No `any`** — use `unknown` and narrow it with type guards
- Always define **explicit return types** for exported functions
- Prefer `type` over `interface` for data shapes
- Use `satisfies` operator over type casting when possible
- Enable strict mode — never disable `strictNullChecks`

---

## Python Formatting

- Follow **PEP 8** strictly — enforced via `black` formatter
- Use **type hints** on all function signatures
- Max function length: **50 lines** — split if longer
- Docstrings: **Google style** for all public functions and classes

```python
# Correct
def calculate_discount(price: float, rate: float) -> float:
    """Calculate the discounted price.

    Args:
        price: Original price in USD.
        rate: Discount rate as a decimal (e.g., 0.2 for 20%).

    Returns:
        The discounted price.
    """
    return price * (1 - rate)
```

---

## CSS / Tailwind Formatting

- Use **Tailwind utility classes** — no custom CSS unless absolutely unavoidable
- Class ordering: **layout → spacing → typography → color → effects**
- Use `cn()` utility from `lib/utils.ts` for conditional classes — never string concatenation
- Extract repeated class strings (5+ classes used 3+ times) into a component

```tsx
// Correct — ordered, uses cn()
<button
  className={cn(
    'flex items-center gap-2 px-4 py-2',
    'text-sm font-medium',
    'bg-blue-600 text-white rounded-md',
    'hover:bg-blue-700 disabled:opacity-50',
    isLoading && 'cursor-not-allowed',
  )}
>

// Wrong — unordered, inline conditional
<button className={`bg-blue-600 text-white px-4 hover:bg-blue-700 ${isLoading ? 'opacity-50' : ''}`}>
```

---

## JSON / YAML Formatting

### JSON
- **2-space indent** always
- Keys in **alphabetical order** within the same level (except `package.json` — keep `name`, `version` first)
- No trailing commas (JSON spec)
- Strings: double quotes only

### YAML
- **2-space indent** — never tabs
- Strings: quote only when containing special chars (`{}[],:&*#?|`)
- Booleans: use `true`/`false` — never `yes`/`no`/`on`/`off`
- Always add a blank line between top-level keys

---

## File & Folder Naming

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase with `use` prefix | `useAuthSession.ts` |
| Utilities | kebab-case | `format-date.ts` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Folders | kebab-case | `user-settings/` |
| Config files | lowercase with dots | `.eslintrc.json` |
| Test files | same name + `.test` | `UserProfile.test.tsx` |

---

## Comments & Documentation

- Write comments that explain **WHY**, not WHAT (code explains itself)
- Use `// TODO: <reason> — @yourname` format for todos
- Use `// FIXME: <description>` for known bugs
- Use `// HACK:` to flag workarounds that need proper solutions later
- JSDoc on all exported functions, hooks, and components
- **Delete commented-out code** — use git history instead

```ts
// Good comment — explains the WHY
// Stripe requires raw body for webhook signature verification,
// so we bypass the JSON body parser here.
export const config = { api: { bodyParser: false } };

// Bad comment — explains the WHAT (code already says this)
// Set bodyParser to false
export const config = { api: { bodyParser: false } };
```

---

## Tooling Configuration Reference

| Tool | Config File | Run Command |
|---|---|---|
| Prettier | `.prettierrc` | `npx prettier --write .` |
| ESLint | `.eslintrc.json` | `npm run lint` |
| Black (Python) | `pyproject.toml` | `black .` |
| Stylelint | `.stylelintrc` | `npx stylelint "**/*.css"` |

> **Rule:** Always run the formatter BEFORE committing. Never suppress linting errors
> with `eslint-disable` without adding a comment explaining why.