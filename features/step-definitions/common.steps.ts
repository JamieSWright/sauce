import { Before, After, BeforeAll, AfterAll, setDefaultTimeout, setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, Page, chromium, BrowserContext } from '@playwright/test';
import { LoginPage } from '../../tests/pages/loginpage';
import { InventoryPage } from '../../tests/pages/inventorypage';
import { CartPage } from '../../tests/pages/cartpage';
import { CheckoutPage } from '../../tests/pages/checkoutpage';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Set default timeout for steps
setDefaultTimeout(60 * 1000);

let browser: Browser;

// Custom World class with page objects
export class CustomWorld extends World {
  page!: Page;
  context!: BrowserContext;
  loginPage!: LoginPage;
  inventoryPage!: InventoryPage;
  cartPage!: CartPage;
  checkoutPage!: CheckoutPage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);

BeforeAll(async function () {
  const headless = process.env.HEADLESS === 'true';
  browser = await chromium.launch({ 
    headless,
    slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0
  });
});

Before(async function (this: CustomWorld) {
  this.context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: process.env.RECORD_VIDEO === 'true' ? { dir: 'test-results/videos' } : undefined
  });
  this.page = await this.context.newPage();
  
  // Initialize page objects
  this.loginPage = new LoginPage(this.page);
  this.inventoryPage = new InventoryPage(this.page);
  this.cartPage = new CartPage(this.page);
  this.checkoutPage = new CheckoutPage(this.page);
});

After(async function (this: CustomWorld, { result }) {
  // Take screenshot on failure
  if (result?.status === 'FAILED') {
    const screenshot = await this.page.screenshot({ 
      path: `test-results/screenshots/failed-${Date.now()}.png`,
      fullPage: true 
    });
    this.attach(screenshot, 'image/png');
  }
  
  if (this.page) {
    await this.page.close();
  }
  if (this.context) {
    await this.context.close();
  }
});

AfterAll(async function () {
  if (browser) {
    await browser.close();
  }
});
