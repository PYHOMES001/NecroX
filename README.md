# NecroX

**Beyond Ordinary.**

NecroX is an immersive commerce hackathon project for premium sneakers and streetwear. The current build combines a database-backed storefront, account system, variant inventory, checkout, admin operations, catalog-grounded natural-language discovery, reviews and a cinematic visual direction.

## Stack

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS
- PostgreSQL + Prisma
- Three.js / React Three Fiber / Drei
- GSAP + Framer Motion dependencies ready for the 3D polish phase
- Node crypto password hashing + signed HTTP-only sessions

## What works

- Registration, login, logout and signed sessions
- Customer/admin roles
- Database-backed product catalog
- Product variants with SKU-level stock
- Search/discovery by natural-language budget, color and description
- Persistent cart with quantity controls
- Persistent wishlist
- Saved shipping addresses
- Transactional order creation
- Guarded stock decrement per purchased SKU
- Order confirmation and history
- Clearly labeled non-production test payment transition
- Verified-customer product reviews
- Admin metrics and low-stock alerts
- Admin product creation/archive and inventory updates
- Admin order status workflow

## Local setup

1. Run `npm install`.
2. Copy `.env.example` to `.env`.
3. Configure a PostgreSQL `DATABASE_URL`.
4. Set a long random `AUTH_SECRET`.
5. Optionally set `ADMIN_EMAIL` and `ADMIN_PASSWORD` to bootstrap an admin during seeding.
6. Run `npm run db:generate`.
7. Run `npm run db:push`.
8. Run `npm run db:seed`.
9. Run `npm run dev`.

## Demo flow

1. Open the home page and enter the real catalog.
2. Use **Ask AI / Discover** with: `Find me black sneakers under ₹8,000 for everyday wear`.
3. Open a matching product, choose a live color/size SKU and add it to the bag.
4. Register or log in, save to wishlist, change cart quantity, and continue to checkout.
5. Add/select a shipping address and place a test order.
6. Complete the development-only test-payment transition and view the order in Account.
7. Sign in with the seeded admin account, open `/admin`, inspect revenue/stock, create a product, change SKU stock, and update order status.
8. Return to the storefront to verify catalog and inventory changes are reflected.

## Important

The test payment endpoint is deliberately disabled in production. For deployment, connect a real payment provider's sandbox/test checkout and webhook before accepting payments.

The discovery route is grounded in the actual NecroX database and currently uses deterministic intent extraction/ranking so it never fabricates catalog products. `OPENAI_API_KEY` is reserved for the next LLM-enhanced assistant phase.

## External integrations

- OpenAI Responses API for catalog-grounded assistant reasoning, with deterministic fallback when no API key is configured
- Stripe Checkout test mode for hosted payment sessions and server-side payment verification
- Cloudinary signed uploads for product images and GLB files from the admin product manager

Required/optional environment variables are documented in `.env.example`.

## Main routes

- `/` cinematic storefront
- `/shop` catalog
- `/discover` natural-language discovery
- `/product/[slug]` product detail
- `/wishlist`
- `/cart`
- `/checkout`
- `/account`
- `/admin`
- `/admin/products`
- `/admin/orders`
