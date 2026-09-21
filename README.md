# NecroX

**Beyond Ordinary.**

NecroX is an immersive AI-powered 3D commerce platform for premium sneakers and streetwear. The repository now contains a complete hackathon-ready vertical slice: cinematic storefront, live database catalog, grounded AI discovery, authentication, wishlist/cart, shipping checkout, Stripe test payments, orders, reviews, SKU inventory, admin operations, media uploads, and interactive 3D product inspection.

## Stack

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS
- PostgreSQL + Prisma
- Three.js + React Three Fiber + Drei
- GSAP
- OpenAI Responses API with deterministic catalog fallback
- Stripe Checkout test mode + verified webhook handling
- Cloudinary signed image/GLB uploads
- Node crypto password hashing + signed HTTP-only sessions

## Functional scope

- Customer registration, login, logout, signed sessions
- Customer/admin roles and protected admin APIs
- Database-backed homepage and catalog
- Search by name/description, color and max price
- Natural-language AI catalog assistant grounded only in live products
- Product detail with live size/color/SKU inventory
- Interactive 3D product viewer
- Procedural 3D fallback when no GLB is configured
- Admin-uploaded GLB models and product images
- 3D material color updates when shoppers select variants
- Persistent cart with stock-checked quantity controls
- Persistent wishlist
- Saved shipping addresses
- Transactional order creation
- Guarded SKU-level inventory decrement
- Customer cancellation of unpaid orders with inventory restoration
- Stripe Checkout test sessions
- Stripe server-side return verification
- Stripe webhook signature verification and idempotent paid transition
- Development-only local test-payment fallback
- Order confirmation and account order history
- Verified-customer product reviews
- Admin dashboard metrics and low-stock alerts
- Category creation
- Product creation/archive/restore
- Product price editing
- Variant creation and stock editing
- Admin order status workflow
- Inventory restoration when orders are cancelled
- Loading, 404 and error recovery states
- Baseline security headers
- GitHub Actions typecheck/build workflow

## Local setup

1. Run `npm install`.
2. Copy `.env.example` to `.env`.
3. Configure `DATABASE_URL` for PostgreSQL.
4. Set a long random `AUTH_SECRET`.
5. Optionally set `ADMIN_EMAIL` and `ADMIN_PASSWORD` to bootstrap an admin.
6. Run `npm run db:generate`.
7. Run `npm run db:push`.
8. Run `npm run db:seed`.
9. Run `npm run dev`.

## Optional integrations

### OpenAI

Set:

- `OPENAI_API_KEY`
- `OPENAI_MODEL` (defaults to `gpt-6-astra`)

Without an OpenAI key, NecroX automatically falls back to deterministic live-catalog ranking rather than returning fake AI results.

### Stripe test mode

Set:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL`

Configure the Stripe webhook destination to:

`https://YOUR_DOMAIN/api/payments/stripe/webhook`

Subscribe to `checkout.session.completed`.

The local test-payment endpoint is disabled in production.

### Cloudinary

Set:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Admins can then upload product images and GLB files directly from `/admin/products`. The API secret never goes to the browser.

## Judge demo flow

1. Open `/` and interact with the animated 3D sneaker hero.
2. Open **Ask AI** and enter: `Find black sneakers under ₹8,000 for everyday wear`.
3. Open a recommended product and rotate/zoom the 3D model.
4. Select a color/size SKU and watch the procedural 3D preview update color.
5. Register/login, add the product to wishlist and bag.
6. Change quantity and continue to checkout.
7. Add/select a shipping address and create the order.
8. Pay with Stripe test mode, or use the clearly labeled local test-payment fallback during an offline demo.
9. Open Account and show order history.
10. Submit a review after the order is paid.
11. Sign in as admin and open `/admin`.
12. Show metrics and low-stock alerts.
13. Create a category/product, upload image/GLB media, add variants, change stock/price, and update order status.
14. Return to the storefront and show that admin catalog changes are live.

## Main routes

- `/` cinematic storefront
- `/shop` searchable/filterable catalog
- `/discover` AI catalog assistant
- `/product/[slug]` interactive product detail
- `/wishlist`
- `/cart`
- `/checkout`
- `/order/[id]`
- `/account`
- `/auth`
- `/admin`
- `/admin/products`
- `/admin/orders`
- `/api/health`

## Validation

Run:

```bash
npm run db:generate
npm run typecheck
npm run build
```

The repository includes `.github/workflows/ci.yml` for automatic Prisma generation, TypeScript checking and production builds when GitHub Actions is active.
