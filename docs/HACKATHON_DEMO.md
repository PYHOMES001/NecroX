# NecroX judge demo runbook

## 5-minute story

### 1. Experience
Open `/`.

Show the cinematic hero and rotate the interactive 3D sneaker.

Message: **Normal e-commerce lets you view products. NecroX lets you experience them.**

### 2. AI discovery
Open `/discover` and ask:

> Find black sneakers under ₹8,000 for everyday wear.

Explain that recommendations are grounded in the live NecroX database. If an OpenAI key is available, GPT-5.6 Luna performs catalog-grounded reasoning. Without it, the deterministic fallback still searches live products and never invents inventory.

### 3. Product + SKU
Open a recommended product.

- Rotate/zoom the 3D product.
- Select a color/size variant.
- Show the 3D color response.
- Add to wishlist.
- Add to bag.

### 4. Commerce
Open the bag.

- Change quantity.
- Continue to checkout.
- Select or create a shipping address.
- Place the order.
- Pay using Stripe test mode.

Show the order confirmation and account history.

### 5. Inventory proof
Open the admin account.

Visit:

- `/admin`
- `/admin/orders`
- `/admin/products`

Show that the order is visible and SKU stock has changed.

### 6. Live admin content
Create a product or add a variant in the product manager.

Optionally upload a product image and GLB model.

Return to the storefront and show the change immediately.

### 7. Operations
Show:

- low-stock alerts
- customer reporting
- review moderation
- order status updates
- cancellation inventory restoration

## Backup demo mode

If Stripe credentials are unavailable locally, use the clearly labeled local test-payment button. It is intentionally disabled in production.

If OpenAI is unavailable, AI discovery automatically falls back to deterministic live-catalog ranking.

If a GLB asset is unavailable, the product viewer automatically uses the procedural 3D sneaker fallback.
