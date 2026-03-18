# Feature Specification: Enhance the dashboard page that follows the project landing page theme as well as light/dark mode functionality. Orders and Order History are not working in the application based on the items placing orders at the landing page. So, also makes it workable.

## 1. Overview
- **What is being built?**
  - A fully functional order persistence system that stores orders after checkout, an enhanced Dashboard page that displays real order history and order details, and full light/dark mode theming for the dashboard — all consistent with the existing Piccollo landing page design language.
- **Why is it needed?**
  - Currently, the dashboard shows hardcoded "0 orders" and an empty order history placeholder. When a user completes checkout, the order data is lost immediately — nothing is persisted. The dashboard also lacks proper dark mode support compared to other components.

## 2. Problem Statement
- After successful checkout, order data (items, total, order ID, date) is discarded — users cannot review past purchases.
- The Dashboard component has hardcoded order count ("0") and a static empty state for order history.
- The Dashboard uses `bg-brand-cream` without dark mode alternatives, creating a jarring experience when the rest of the app is in dark mode.
- **If not implemented:** Users have no proof of purchase, no way to reference past orders, and the dashboard remains a non-functional placeholder.

## 3. Goals & Objectives
- **Primary goal:** Persist orders to localStorage after checkout and display them in the dashboard with full order history.
- **Secondary goals:**
  - Apply the Piccollo brand theme (green/cream palette, Poppins/Roboto fonts, rounded cards) consistently to the dashboard.
  - Ensure full dark mode support across all dashboard sections.
  - Show order details (items, quantities, prices, status, date) in an expandable/collapsible view.

## 4. User Stories
- As a user, I want to see my past orders on the dashboard so that I can track what I've purchased.
- As a user, I want to click on an order to see its details (items, quantities, total) so that I can review a specific purchase.
- As a user, I want the dashboard to look consistent with the rest of the site in both light and dark modes.
- As a user, I want my order count to reflect my actual completed orders.

## 5. Functional Requirements

### Order Persistence
- After successful payment in `CartDrawer`, save the order to localStorage under key `piccollo-orders`.
- Each order record includes: `orderId`, `items` (with product details, quantity, price), `total`, `currency`, `status`, `createdAt` timestamp, and customer `name`/`email`.
- Orders persist across browser sessions and page reloads.

### Dashboard — Order Display
- Replace hardcoded "0" order count with the actual count from `piccollo-orders`.
- Replace the empty order history placeholder with a scrollable list of orders sorted by date (newest first).
- Each order row shows: order ID (truncated), date, item count, total amount, and status badge.
- Clicking an order row expands it to reveal full item details (product image, name, quantity, unit price, line total).
- When no orders exist, show a friendly empty state with a "Start Shopping" call-to-action.

### Dashboard — Theme & Dark Mode
- Replace static `bg-brand-cream` with theme-aware classes: `bg-brand-cream dark:bg-brand-dark-bg`.
- Apply `dark:` variants to all text, border, surface, and background colors in the dashboard.
- Use the same card styling (rounded-xl, shadow, hover states) as the landing page product cards.
- Ensure the dashboard modal backdrop, close button, and all interactive elements support dark mode.
- Member since date should use the user's actual registration date if available, otherwise "Today".

### Integration with Checkout Flow
- In `CartDrawer.tsx` success handler, dispatch the new order to the orders context/hook before clearing the cart.
- The order snapshot must capture the cart items with full product data (name, image, price) at time of purchase — not just product IDs.

## 6. Non-Functional Requirements
- **Performance:** Order list should render efficiently for up to 100 orders (virtualize if needed).
- **Responsiveness:** Dashboard must be fully usable on mobile (stacked layout, scrollable order list).
- **Accessibility:** Order expand/collapse uses proper `aria-expanded` attributes; status badges have accessible color contrast.
- **Storage:** localStorage limit ~5MB — orders should be compact (no base64 images).

## 7. UI/UX Guidelines
- Follow the Piccollo brand palette: `brand-green`, `brand-cream`, `brand-charcoal` for light mode; `brand-dark-bg`, `brand-dark-surface`, `brand-dark-border` for dark mode.
- Typography: Poppins for headings, Roboto for body text — matching the landing page.
- Cards: `rounded-xl` with subtle shadow, consistent with ProductCard styling.
- Status badges: green for "completed", yellow for "processing", red for "failed" — using `rounded-full` pill shape.
- Smooth expand/collapse animation on order details (Framer Motion `AnimatePresence`).
- Order list section should have a max-height with overflow scroll to prevent the dashboard modal from growing unbounded.

## 8. Technical Design

### Frontend

#### New Files
| File | Purpose |
|---|---|
| `src/types/order.types.ts` | Zod schema + `Order` and `OrderItem` types |
| `src/hooks/useOrders.tsx` | OrdersProvider context — CRUD for orders in localStorage |

#### Modified Files
| File | Change |
|---|---|
| `src/components/auth/Dashboard.tsx` | Replace hardcoded data with `useOrders()`, add order list UI, apply dark mode classes |
| `src/components/cart/CartDrawer.tsx` | After successful payment, call `addOrder()` from `useOrders()` before clearing cart |
| `src/app/App.tsx` | Wrap with `OrdersProvider` in the provider stack (after `CartProvider`) |

#### State Management
- New `OrdersContext` following the same pattern as `useCart` and `useWishlist` — React Context + localStorage persistence under `piccollo-orders` key.
- Exposed API: `orders`, `addOrder(order)`, `getOrder(id)`, `orderCount`.

### Backend
- No backend changes — all data is mock/localStorage-based, consistent with the existing architecture.

## 9. Data Structures

```json
{
  "orderId": "ORD-abc123",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "items": [
    {
      "productId": 1,
      "name": "Trail Blazer Backpack",
      "image": "/images/products/trail-blazer.jpg",
      "price": 89.99,
      "quantity": 2,
      "lineTotal": 179.98
    }
  ],
  "total": 179.98,
  "currency": "USD",
  "status": "completed",
  "createdAt": "2026-03-18T10:30:00.000Z"
}
```

**Zod Schema:**
```ts
export const orderItemSchema = z.object({
  productId: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  lineTotal: z.number().positive(),
});

export const orderSchema = z.object({
  orderId: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  items: z.array(orderItemSchema).min(1),
  total: z.number().positive(),
  currency: z.enum(['USD', 'EUR', 'GBP']),
  status: z.enum(['completed', 'processing', 'failed']),
  createdAt: z.string().datetime(),
});

export type OrderItem = z.infer<typeof orderItemSchema>;
export type Order = z.infer<typeof orderSchema>;
```

**localStorage key:** `piccollo-orders` — stores `Order[]`
