import { Page, expect } from '@playwright/test';


export class CartPage {
  readonly page: Page;
  readonly baseUrl = 'https://www.saucedemo.com';
  
  // Selectors
  readonly cartLink = '.shopping_cart_link';
  readonly cartBadge = '.shopping_cart_badge';
  readonly cartItem = '.cart_item';
  readonly checkoutButton = '[data-test="checkout"]';
  readonly continueShoppingButton = '[data-test="continue-shopping"]';
  readonly removeButton = (itemName: string) => `[data-test="remove-${itemName}"]`;


   constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the cart page
   */
async goto() {
    await this.page.goto(`${this.baseUrl}/cart.html`);
  }

  /**
   * Click the cart icon
   */
async clickCartLink() {
    await this.page.click(this.cartLink);
  }

  /**
   * Get the cart badge count
   */
async getCartBadgeCount() {
    return await this.page.locator(this.cartBadge).textContent();
  }

  /**
   * Check if cart badge is visible
   */
async isCartBadgeVisible() {
    return await this.page.locator(this.cartBadge).isVisible();
  }

  /**
   * Expect cart badge to show specific count
   */
async expectCartBadgeCount(count: string) {
    await expect(this.page.locator(this.cartBadge)).toHaveText(count);
  }

  /**
   * Check if item is in cart
   */
async isItemInCart(itemName: string) {
    const itemText = await this.page.locator(this.cartItem).textContent();
    return itemText?.includes(itemName) || false;
  }

  /**
   * Expect item to be in cart
   */
 async expectItemInCart(itemName: string) {
    await expect(this.page.locator(this.cartItem)).toContainText(itemName);
  }

   /**
   * Click checkout button
   */
 async clickCheckout() {
    await this.page.click(this.checkoutButton);
  }

   /**
   * Click continue shopping button
   */
 async clickContinueShopping() {
    await this.page.click(this.continueShoppingButton);
  }

   /**
   * Remove item from cart
   */
async removeItem(itemName: string) {
    await this.page.click(this.removeButton(itemName));
  }


    /**
   * Expect to be on the cart page
   */
   async expectToBeOnCartPage() {
    await expect(this.page).toHaveURL(`${this.baseUrl}/cart.html`);
  }
}