import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../support/pages/loginpage';
import { InventoryPage } from '../../support/pages/inventorypage';
import { CartPage } from '../../support/pages/cartpage';
import { CheckoutPage } from '../../support/pages/checkoutpage';


test.describe('Checkout Page Tests', () => {
  let page: Page;
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    // Login and add item to cart before each test
    await loginPage.login(process.env.STANDARD_USERNAME || 'standard_user', process.env.PASSWORD || 'secret_sauce');
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await cartPage.clickCartLink();
    await cartPage.clickCheckout();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should complete shipping info and reach overview', async () => {
    await checkoutPage.expectToBeOnStepOne();
    
    // Enter shipping info
    await checkoutPage.fillShippingInfo('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    
    await checkoutPage.expectToBeOnStepTwo();
  });

  test('should complete checkout with confirmation', async () => {
    await checkoutPage.expectToBeOnStepOne();
    
    // Enter shipping info
    await checkoutPage.fillShippingInfo('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    
    await checkoutPage.expectToBeOnStepTwo();
    
    // Review and finish
    await checkoutPage.clickFinish();
    await checkoutPage.expectToBeOnComplete();
    
    // The confirmation text is hardcoded as per current UI; update this value if the UI changes.
    await checkoutPage.expectCompleteHeader('Thank you for your order!');
  });
});
