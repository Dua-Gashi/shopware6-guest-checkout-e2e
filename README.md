# Shopware 6 Guest Checkout — Automated E2E Test

Automated end-to-end test of the guest checkout flow (single product, **Cash on Delivery**)
on the Shopware 6 storefront, written for the Solution25 QA / Automation Tester Intern
practical exercise. Automates **TC-01** from the manual test plan.

## Target environment

- Storefront: [Shopware 6 public demo store](https://www.shopware6-demo.development-s25.com/)
- Framework: [Playwright](https://playwright.dev/) (JavaScript)

## Setup

```bash
npm install
npx playwright install --with-deps chromium
```

## Running the test

```bash
npm test              # headless run
npm run test:headed   # watch it run in a browser window
npm run test:debug    # step through with Playwright Inspector
npm run report        # open the HTML report from the last run
```

## Structure

```
pages/                Page Object Model — one class per storefront page
  ProductPage.js       search, open product, add to cart
  CartPage.js          view cart, go to checkout
  CheckoutPage.js      guest details, payment method, order confirmation
tests/
  guest-checkout.spec.js   the end-to-end test (TC-01)
playwright.config.js  base URL, timeouts, trace/screenshot/video on failure
```

## Assertions made

- Homepage loads at the expected URL
- Product page shows the selected product's title
- Cart page shows exactly one line item after adding the product
- Guest checkout is reachable without forced login
- Cash on Delivery is selectable as the payment method
- Order confirmation page displays with a visible order number

## Notes

- Selectors are written primarily with Playwright's role/label/text locators
  for resilience, with a few CSS fallbacks marked `TODO` — these should be
  verified/adjusted against the live storefront, since exact markup wasn't
  confirmed at the time this was written.
- The test uses a timestamped email address to avoid collisions on repeat runs.

## What I'd improve with more time

- Automate at least one negative case (e.g. invalid email) and one edge case
  alongside the happy path.
- Add `data-testid`-based selectors if the storefront exposes them, instead of
  relying on text/role matching.
- Add the suite to a CI workflow (e.g. GitHub Actions) to run on each push.
- Add visual regression checks on the order confirmation page.
