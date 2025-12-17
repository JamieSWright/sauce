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


  /**
   * Fill in the last name field
   */


  /**
   * Fill in the postal code field
   */


  /**
   * Fill in all shipping information fields
   */


   /**
   * Click the continue button
   */


    /**
   * Click the cancel button
   */


    /**
   * Click the finish button
   */


    /**
   * Click the back home button
   */


     /**
   * Get the subtotal amount
   */


      /**
   * Get the tax amount
   */


      /**
   * Get the total amount
   */


      /**
   * Get the completion header text
   */


      /**
   * Expect completion header to contain specific text
   */


       /**
   * Expect to be on checkout step one page
   */


       /**
   * Expect to be on checkout step two page
   */


     /**
   * Expect to be on checkout complete page
   */   