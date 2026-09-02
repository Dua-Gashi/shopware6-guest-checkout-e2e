class ProductPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    // TODO: verify these locators against the real storefront tomorrow.
    // Shopware 6's default storefront theme usually renders the search
    // input with name="search" and results as product boxes/cards.
    this.searchInput = page.locator('#header-main-search-input');
    this.firstSearchResult = page.locator('.search-suggest-product-name, .product-name').first();
    this.addToCartButton = page.locator('.btn-buy');
    this.offCanvasCart = page.locator('div.offcanvas.cart-offcanvas');
    this.productTitle = page.locator('.product-detail-name, h1');
  }

  async open(baseURL) {
    await this.page.goto(baseURL);
    const acceptCookies = this.page.getByRole('button', { name: /nur technisch notwendige|accept|agree/i });
    if (await acceptCookies.isVisible().catch(() => false)) {
      await acceptCookies.click();
    }
  }

  async searchAndOpenProduct(term) {
    await this.searchInput.click();
    await this.searchInput.fill(term);
    await this.page.keyboard.press('Enter');
    await this.firstSearchResult.first().click();
  }

  async addToCart() {
    await this.addToCartButton.click();
    // Wait for the off-canvas cart confirmation to appear.
    // await this.offCanvasCart.waitFor({ state: 'visible' });
    const successBanner = this.page.locator('.alert-success, .flashbags .alert');
    await successBanner.waitFor({ state: 'visible' });
  }
}

module.exports = { ProductPage };
