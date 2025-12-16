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


  /**
   * Click the cart icon
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
   * Check if item is in cart
   */


  /**
   * Expect item to be in cart
   */


   /**
   * Click checkout button
   */


   /**
   * Click continue shopping button
   */


   /**
   * Remove item from cart
   */

   
    /**
   * Expect to be on the cart page
   */