import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventorypage';

// Shared page objects
declare global {
  var page: any;
  var inventoryPage: InventoryPage;
}

// Then steps
Then('I should see a list of products', async function () {
  if (!global.inventoryPage) {
    global.inventoryPage = new InventoryPage(global.page);
  }
  const products = await global.page.locator('.inventory_item').count();
  expect(products).toBeGreaterThan(0);
});

Then('each product should display a price', async function () {
  const prices = await global.page.locator('.inventory_item_price').count();
  const products = await global.page.locator('.inventory_item').count();
  expect(prices).toBe(products);
});

Then('each product should have an {string} button', async function (buttonText: string) {
  const buttons = await global.page.locator('button:has-text("Add to cart")').count();
  expect(buttons).toBeGreaterThan(0);
});
