import { Page } from "@playwright/test";


export class InventoryPage {
  readonly page: Page;
  readonly baseUrl :"https://www.saucedemo.com';
  
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


  /**
   * Add item to cart by item name
   */


  /**
   * Remove item from cart by item name
   */


  /**
   * Get the cart badge count
   */


   /**
   * Check if cart badge is visible
   */


   /**
   * Expect cart badge to show specific count
   */


    /**
   * Click the cart icon
   */

    
    /**
   * Expect to be on the inventory page
   */