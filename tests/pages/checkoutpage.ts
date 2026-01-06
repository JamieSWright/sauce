import { Page, expect } from '@playwright/test';


export class CheckoutPage {
  readonly page: Page;
  readonly baseUrl = 'https://www.saucedemo.com';

  // Selectors - Step One (Information)
  readonly firstNameField = '[data-test="firstName"]';
  readonly lastNameField = '[data-test="lastName"]';
  readonly postalCodeField = '[data-test="postalCode"]';
  readonly continueButton = '[data-test="continue"]';
  readonly cancelButton = '[data-test="cancel"]';

  // Selectors - Step Two (Overview)
  readonly finishButton = '[data-test="finish"]';
  readonly subtotalLabel = '.summary_subtotal_label';
  readonly taxLabel = '.summary_tax_label';
  readonly totalLabel = '.summary_total_label';

  // Selectors - Complete
 readonly completeHeader = '.complete-header';
 readonly completeText = '.complete-text';
 readonly backHomeButton = '[data-test="back-to-products"]';


constructor(page: Page) {
    this.page = page;
  }


  /**
   * Navigate to checkout step one
   */
async gotoStepOne() {
    await this.page.goto(`${this.baseUrl}/checkout-step-one.html`);
  }

  /**
   * Navigate to checkout step two
   */
 async gotoStepTwo() {
    await this.page.goto(`${this.baseUrl}/checkout-step-two.html`);
  }

  /**
   * Navigate to checkout complete page
   */
async gotoComplete() {
    await this.page.goto(`${this.baseUrl}/checkout-complete.html`);
  }

  /**
   * Fill in the first name field
   */
async fillFirstName(firstName: string) {
    await this.page.fill(this.firstNameField, firstName);
  }

  /**
   * Fill in the last name field
   */
async fillLastName(lastName: string) {
    await this.page.fill(this.lastNameField, lastName);
  }

  /**
   * Fill in the postal code field
   */
 async fillPostalCode(postalCode: string) {
    await this.page.fill(this.postalCodeField, postalCode);
  }


  /**
   * Fill in all shipping information fields
   */
async fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostalCode(postalCode);
  }

   /**
   * Click the continue button
   */
async clickContinue() {
    await this.page.click(this.continueButton);
  }

    /**
   * Click the cancel button
   */
async clickCancel() {
    await this.page.click(this.cancelButton);
  }

    /**
   * Click the finish button
   */
  async clickFinish() {
    await this.page.click(this.finishButton);
  }

  /**
   * Click the back home button
   */
  async clickBackHome() {
    await this.page.click(this.backHomeButton);
  }

  /**
   * Get the subtotal amount
   */
  async getSubtotal() {
    return await this.page.locator(this.subtotalLabel).textContent();
  }

  /**
   * Get the tax amount
   */
  async getTax() {
    return await this.page.locator(this.taxLabel).textContent();
  }

  /**
   * Get the total amount
   */
  async getTotal() {
    return await this.page.locator(this.totalLabel).textContent();
  }

  /**
   * Get the completion header text
   */
  async getCompleteHeader() {
    return await this.page.locator(this.completeHeader).textContent();
  }

  /**
   * Expect completion header to contain specific text
   */
  async expectCompleteHeader(expectedText: string) {
    await expect(this.page.locator(this.completeHeader)).toHaveText(expectedText);
  }

  /**
   * Expect to be on checkout step one page
   */
  async expectToBeOnStepOne() {
    await expect(this.page).toHaveURL(`${this.baseUrl}/checkout-step-one.html`);
  }

  /**
   * Expect to be on checkout step two page
   */
  async expectToBeOnStepTwo() {
    await expect(this.page).toHaveURL(`${this.baseUrl}/checkout-step-two.html`);
  }

  /**
   * Expect to be on checkout complete page
   */
  async expectToBeOnComplete() {
    await expect(this.page).toHaveURL(`${this.baseUrl}/checkout-complete.html`);
  }
}