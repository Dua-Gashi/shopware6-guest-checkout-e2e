class CartPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    // TODO: verify against the real storefront tomorrow.
    this.cartIcon = page.locator('.header-cart-icon, [href*="checkout/cart"]').first();
    this.lineItem = page.locator('.line-item, .cart-item');
    this.checkoutButton = page.locator('a.begin-checkout-btn');
  }

  async open() {
    const offcanvas = this.page.locator('div.offcanvas.cart-offcanvas');
    if (await offcanvas.isVisible().catch(() => false)) {
      await offcanvas.waitFor({ state: 'visible' });
      return;
    }
    await this.cartIcon.click();
    await offcanvas.waitFor({ state: 'visible' });
  }

  async lineItemCount() {
    await this.lineItem.first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => { });
    return this.lineItem.count();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
