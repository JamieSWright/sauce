import { Before, After, BeforeAll, AfterAll, setDefaultTimeout, setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, Page, chromium, BrowserContext, APIRequestContext, request } from '@playwright/test';
import { LoginPage } from '../../support/pages/loginpage';
import { InventoryPage } from '../../support/pages/inventorypage';
import { CartPage } from '../../support/pages/cartpage';
import { CheckoutPage } from '../../support/pages/checkoutpage';
import { ReqResClient, ApiCallResult } from '../../support/api/reqres.client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Set default timeout for steps
setDefaultTimeout(60 * 1000);

let browser: Browser;

function isApiOnlyRun(): boolean {
  return process.env.API_ONLY === 'true';
}

function normalizeApiBaseUrl(raw?: string): string {
  const fallback = 'https://reqres.in/api/';
  const value = (raw || fallback).trim();

  return value.endsWith('/') ? value : `${value}/`;
}

// Custom World class with page objects
export class CustomWorld extends World {
  page!: Page;
  context!: BrowserContext;
  apiContext!: APIRequestContext;
  loginPage!: LoginPage;
  inventoryPage!: InventoryPage;
  cartPage!: CartPage;
  checkoutPage!: CheckoutPage;
  reqResClient!: ReqResClient;
  lastApiResult?: ApiCallResult;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);

BeforeAll(async function () {
  if (isApiOnlyRun()) {
    return;
  }

  const headless = process.env.HEADLESS === 'true';
  browser = await chromium.launch({ 
    headless,
    slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0
  });
});

Before(async function (this: CustomWorld) {
  this.apiContext = await request.newContext({
    baseURL: normalizeApiBaseUrl(process.env.API_BASE_URL),
    extraHTTPHeaders: {
      'x-api-key': process.env.REQRES_API_KEY || 'reqres-free-v1'
    }
  });

  if (isApiOnlyRun()) {
    this.reqResClient = new ReqResClient(this.apiContext);
    this.lastApiResult = undefined;
    return;
  }

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
  this.reqResClient = new ReqResClient(this.apiContext);
  this.lastApiResult = undefined;
});

After(async function (this: CustomWorld, { result }) {
  // Take screenshot on failure
  if (result?.status === 'FAILED' && this.page) {
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
  if (this.apiContext) {
    await this.apiContext.dispose();
  }
});

AfterAll(async function () {
  if (browser) {
    await browser.close();
  }
});
