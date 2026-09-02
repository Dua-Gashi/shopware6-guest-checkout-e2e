class CheckoutPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    // TODO: verify field names/labels against the real guest checkout
    // form tomorrow — Shopware's default storefront typically uses
    // name="email", name="billingAddress[firstName]" etc.
    this.guestCheckoutOption = page.getByText(/guest checkout|checkout as guest/i);
    this.emailInput = page.locator('#personalMail');
    this.firstNameInput = page.locator('#billingAddress-personalFirstName');
    this.lastNameInput = page.locator('#billingAddress-personalLastName');
    this.streetInput = page.locator('#billingAddress-AddressStreet');
    this.zipInput = page.locator('#billingAddressAddressZipcode');
    this.cityInput = page.locator('#billingAddressAddressCity');
    this.countrySelect = page.locator('#billingAddressAddressCountry');
    this.stateSelect = page.locator('#billingAddressAddressCountryState');
    this.continueOrder = page.locator('.register-submit button[type="submit"]');
    this.tosCheckbox = page.locator('#tos');
    this.codPaymentOption = page.locator('#paymentMethod019bf75c3a21734c80c6bf7200e2dd21');
    this.confirmOrderButton = page.locator('#confirmFormSubmit');

    this.orderConfirmationHeading = page.locator('.finish-header');
    this.orderNumber = page.locator('.finish-ordernumber');
  }

  async selectGuestCheckout() {
    // Some Shopware demo builds default straight to guest checkout;
    // only click this if the option is actually presented.
    if (await this.guestCheckoutOption.isVisible().catch(() => false)) {
      await this.guestCheckoutOption.click();
    }
  }

  async fillGuestDetails({ email, firstName, lastName, street, zip, city, state }) {
    await this.emailInput.fill(email);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.streetInput.fill(street);
    await this.zipInput.fill(zip);
    await this.cityInput.fill(city);
    await this.stateSelect.selectOption({label: state});
  }
  async continueOrdering() {
    await this.continueOrder.click();
  }

  async acceptTermsAndConditions() {
  await this.tosCheckbox.check();
  }

  async selectCashOnDelivery() {
    await this.codPaymentOption.click();
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }
}

module.exports = { CheckoutPage };
