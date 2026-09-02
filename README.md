# Shopware 6 Guest Checkout — Automated E2E Test

Automated end-to-end test of the guest checkout flow (single product, Cash on Delivery) on the Shopware 6 storefront, written for the Solution25 QA / Automation Tester Intern practical exercise. Automates TC-01 from the manual test plan.

## Target environment

* Storefront: [Shopware 6 demo store](https://www.shopware6-demo.development-s25.com/)
* Framework: [Playwright](https://playwright.dev/) (JavaScript)

## Setup

npm install
npx playwright install --with-deps chromium


## Running the test

npm test # headless run
npm run test:headed # watch it run in a browser window
npm run test:debug # step through with Playwright Inspector
npm run report # open the HTML report from the last run


## Structure

Pages/ Page Object Model — one class per storefront page
ProductPage.js search, open product, add to cart
CartPage.js view cart, go to checkout
CheckoutPage.js guest details, payment method, order confirmation
tests/
guest-checkout.spec.js the end-to-end test (TC-01)
playwright.config.js base URL, timeouts, trace/screenshot/video on failure


## Assertions made

* Cart page shows the added product before proceeding to checkout
* Guest checkout is reachable without forced login
* Cash on Delivery is selectable and checked as the payment method
* Order submission reaches the `/checkout/finish` URL
* Order confirmation page shows a visible confirmation heading and order number

## Notes

* The storefront renders in German, so locators are deliberately based on CSS classes and `data-*` attributes (e.g. `.finish-ordernumber`, `[data-order-number]`) rather than visible text, so the test doesn't break due to locale.
* Test data (name/address fields) currently uses simple placeholder values rather than realistic sample data.

## What I'd improve with more time

* Automate a couple of negative cases too, e.g. an invalid postal code or a required field left empty, since these are currently only covered manually.
* Replace placeholder test data (e.g. street/city fields) with more realistic sample values, for easier readability when reviewing test runs.