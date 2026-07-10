import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, Page, chromium } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { InventoryPage } from '../pages/inventorypage';
import { CartPage } from '../pages/cartpage';
import { CheckoutPage } from '../pages/checkoutpage';

// Set default timeout for steps
setDefaultTimeout(60 * 1000);

let browser: Browser;

// Declare global variables
declare global {
  var page: Page;
  var loginPage: LoginPage;
  var inventoryPage: InventoryPage;
  var cartPage: CartPage;
  var checkoutPage: CheckoutPage;
}

BeforeAll(async function () {
  browser = await chromium.launch({ 
    headless: false,
    slowMo: 100 
  });
});

Before(async function () {
  global.page = await browser.newPage();
  global.loginPage = new LoginPage(global.page);
  global.inventoryPage = new InventoryPage(global.page);
  global.cartPage = new CartPage(global.page);
  global.checkoutPage = new CheckoutPage(global.page);
});

After(async function () {
  if (global.page) {
    await global.page.close();
  }
});

AfterAll(async function () {
  if (browser) {
    await browser.close();
  }
});
