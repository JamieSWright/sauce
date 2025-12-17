import { Page, expect } from "@playwright/test";


export class InventoryPage {
  readonly page: Page;
  readonly baseUrl = "https://www.saucedemo.com";
  
  //Selectors
readonly inventoryItem = '.inventory_item';
readonly cartLink = '.shopping_cart_link';
readonly cartBadge = '.shopping_cart_badge';
readonly addToCartButton = (itemName: string) => `[data-test="add-to-cart-${itemName}"]`;
readonly removeFromCartButton = (itemName: string) => `[data-test="remove-${itemName}"]`;
 

constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the inventory page
   */
async goto() {
    await this.page.goto(`${this.baseUrl}/inventory.html`);
  }

  /**
   * Add item to cart by item name
   */
async addItemToCart(itemName: string) {
    await this.page.click(this.addToCartButton(itemName));
  }

  /**
   * Remove item from cart by item name
   */
async removeItemFromCart(itemName: string) {
    await this.page.click(this.removeFromCartButton(itemName));
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
   * Click the cart icon
   */
async clickCartLink() {
    await this.page.click(this.cartLink);
  }

    /**
   * Expect to be on the inventory page
   */
  async expectToBeOnInventoryPage() {
    await expect(this.page).toHaveURL(`${this.baseUrl}/inventory.html`);
  }
}