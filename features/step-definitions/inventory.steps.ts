import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from './common.steps';

// Then steps
Then('I should see a list of products', async function (this: CustomWorld) {
  const products = await this.page.locator('.inventory_item').count();
  expect(products).toBeGreaterThan(0);
});

Then('each product should display a price', async function (this: CustomWorld) {
  const prices = await this.page.locator('.inventory_item_price').count();
  const products = await this.page.locator('.inventory_item').count();
  expect(prices).toBe(products);
});

Then('each product should have an {string} button', async function (this: CustomWorld, buttonText: string) {
  const buttons = await this.page.locator('button:has-text("Add to cart")').count();
  expect(buttons).toBeGreaterThan(0);
});
