# NecroX deployment checklist

## 1. Database
Use a managed PostgreSQL database and set:

- `DATABASE_URL`

Then run:

```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
```

For a seeded administrator, set `ADMIN_EMAIL` and `ADMIN_PASSWORD` before `npm run db:seed`.

## 2. Authentication
Set a long random `AUTH_SECRET`. Do not reuse a development value.

## 3. Application URL
Set `NEXT_PUBLIC_APP_URL` to the deployed HTTPS origin, for example:

```
https://your-domain.example
```

Stripe Checkout return URLs use this value.

## 4. Stripe test mode
Set:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

Create a webhook endpoint:

```
https://YOUR_DOMAIN/api/payments/stripe/webhook
```

Subscribe to:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.expired`

Use Stripe test keys for the hackathon demo. The local test-payment endpoint is disabled when `NODE_ENV=production`.

## 5. OpenAI
Optional:

- `OPENAI_API_KEY`
- `OPENAI_MODEL=gpt-5.6-luna`

If OpenAI is not configured, NecroX automatically uses deterministic live-catalog ranking.

## 6. Cloudinary
Optional:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

This enables admin-side signed product image and GLB uploads.

## 7. Build verification

```bash
npm run db:generate
npm run typecheck
npm run build
```

GitHub Actions runs these checks automatically on the project branch.

## 8. First production smoke test

1. Register a customer.
2. Search the catalog and open a product.
3. Select an in-stock SKU.
4. Add it to the bag and change quantity.
5. Save a shipping address.
6. Place an order.
7. Complete Stripe test checkout.
8. Verify the order becomes `PAID`.
9. Sign in as admin.
10. Verify order, customer metrics and inventory.
11. Create a product and upload media.
12. Verify the new product appears on the storefront.
