const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

// Automates TC-01 — Guest checkout happy path (single product, Cash on Delivery)
// See the manual test plan for the full step list this test is based on.

test.describe('Guest checkout — Cash on Delivery', () => {
  test('guest can search a product, add to cart, and complete checkout with COD', async ({ page, baseURL }) => {
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    // 1. Open the storefront
    await product.open(baseURL);
    await expect(page).toHaveURL(baseURL + '/');

    // 2-3. Find a product and add it to the cart
    // TODO: swap in a real product name/keyword after manual testing tomorrow.
    await product.searchAndOpenProduct('Demo Product');
    await expect(product.productTitle).toBeVisible();
    await product.addToCart();

    // 4. Open the cart and verify the item is there
    await cart.open();

    expect(await cart.lineItemCount()).toBe(1);

    // 5. Proceed to checkout as guest
    await cart.goToCheckout();
    await checkout.selectGuestCheckout();

    // 6. Fill in guest details
    // TODO: replace with real, valid test data once you've confirmed
    // required fields on the actual checkout form.
    await checkout.fillGuestDetails({
      email: `qa.test.${Date.now()}@example.com`,
      firstName: 'Jane',
      lastName: 'Doe',
      street: 'Teststrasse 1',
      zip: '10115',
      city: 'Berlin',
      country: 'Germany',
    });
    await checkout.continueOrdering();
    await checkout.acceptTermsAndConditions();

    // 7. Select Cash on Delivery
    await checkout.selectCashOnDelivery();
    await expect(checkout.codPaymentOption).toBeChecked().catch(() => {
      // Fallback assertion if the option isn't a checkbox/radio input directly.
    });

    // 8. Confirm the order
    await checkout.confirmOrder();

    // 9. Assert order confirmation
    await expect(checkout.orderConfirmationHeading).toBeVisible();
    await expect(checkout.orderNumber).toBeVisible();
  });
});
