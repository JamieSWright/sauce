import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { InventoryPage } from '../pages/inventorypage';
import { CartPage } from '../pages/cartpage';


test.describe('Cart Page Tests', () => {
  let page: Page;
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    
    // Login before each test
    await loginPage.login(process.env.STANDARD_USERNAME || 'standard_user', process.env.PASSWORD || 'secret_sauce');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should add item to cart and update badge count', async () => {
    // Add Sauce Labs Backpack to cart
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    
    // Cart icon should show 1
    await inventoryPage.expectCartBadgeCount('1');
    
    // Click cart icon
    await cartPage.clickCartLink();
    await cartPage.expectToBeOnCartPage();
    
    // Item should be listed in cart
    await cartPage.expectItemInCart('Sauce Labs Backpack');
  });

  test('should navigate from cart to checkout', async () => {
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await cartPage.clickCartLink();
    await cartPage.expectToBeOnCartPage();
    
    // Click Checkout
    await cartPage.clickCheckout();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  });
});
