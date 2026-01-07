import { CustomWorld } from './common.steps';

/**
 * Helper to login with standard credentials
 */
export async function loginAsStandardUser(world: CustomWorld): Promise<void> {
  await world.loginPage.goto();
  await world.loginPage.login(
    process.env.STANDARD_USERNAME || 'standard_user',
    process.env.PASSWORD || 'secret_sauce'
  );
}

/**
 * Helper to convert product name to ID
 */
export function productNameToId(productName: string): string {
  return productName.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Helper to take screenshot with custom name
 */
export async function takeScreenshot(world: CustomWorld, name: string): Promise<void> {
  const timestamp = Date.now();
  const screenshot = await world.page.screenshot({
    path: `test-results/screenshots/${name}-${timestamp}.png`,
    fullPage: true
  });
  world.attach(screenshot, 'image/png');
}

/**
 * Helper to wait for page load
 */
export async function waitForPageLoad(world: CustomWorld): Promise<void> {
  await world.page.waitForLoadState('networkidle');
}
