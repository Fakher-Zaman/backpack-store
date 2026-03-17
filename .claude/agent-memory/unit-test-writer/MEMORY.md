# Unit Test Writer Memory

## Project Test Setup
- Vitest + jsdom + @testing-library/react + @testing-library/jest-dom
- Config in `vite.config.ts`, setup file at `src/__tests__/setup.ts`
- Unit tests: `src/__tests__/unit/`, Component tests: `src/__tests__/components/`
- `globals: true` in vitest config so no need to import describe/it/expect

## Known Gotchas
- SVG elements in jsdom: use `element.getAttribute('class')` not `element.className` (className returns SVGAnimatedString, not a string)
- HTML `<input type="email">` with native validation can prevent form submit in jsdom; test Zod validation by submitting with empty email field instead of invalid format
- When text appears in both heading and button (e.g., "Log In"), use `screen.getByRole('heading', { name: /log in/i })` to disambiguate
- Context hooks that throw outside provider: the `renderHook` error logs are expected console noise, tests still pass
- `window.matchMedia` is NOT available in jsdom — must mock via `Object.defineProperty(window, 'matchMedia', { writable: true, value: vi.fn().mockReturnValue({...}) })`

## Mock Patterns
- Auth service: `vi.mock('@/lib/auth', () => ({ loginUser: vi.fn(), logoutUser: vi.fn().mockResolvedValue(undefined) }))`
- Payment service: `vi.mock('@/lib/payment', () => ({ processPayment: vi.fn() }))`
- Pre-seed auth state via `localStorage.setItem('piccollo-auth-user', JSON.stringify(user))`
- Pre-seed wishlist via `localStorage.setItem('piccollo-wishlist', JSON.stringify([1,2,3]))`

## Key Storage Keys
- `piccollo-wishlist`, `piccollo-cart`, `piccollo-reviews`, `piccollo-auth-user`, `piccollo-auth-token`
