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
 * Resolve nested object paths like "data.id".
 */
export function getValueByPath(input: unknown, path: string): unknown {
  if (!path) {
    return input;
  }

  return path.split('.').reduce<unknown>((acc, segment) => {
    if (acc && typeof acc === 'object' && segment in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[segment];
    }

    return undefined;
  }, input);
}
