import { Given, Then, When, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from './common.steps';
import { getValueByPath } from './helpers';

type SupportedMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

Given('the API base endpoint is available', async function (this: CustomWorld) {
  this.lastApiResult = await this.reqResClient.get(normalizeEndpoint('/users/2'));
});

When('I send a {word} request to {string}', async function (this: CustomWorld, method: string, endpoint: string) {
  this.lastApiResult = await sendRequest(this, method as SupportedMethod, endpoint);
});

When('I send a {word} request to {string} with body:', async function (this: CustomWorld, method: string, endpoint: string, dataTable: DataTable) {
  const payload = Object.fromEntries(
    Object.entries(dataTable.rowsHash()).map(([key, value]) => [key, coerceValue(value)])
  );

  this.lastApiResult = await sendRequest(this, method as SupportedMethod, endpoint, payload);
});

Then('the API response status should be {int}', function (this: CustomWorld, expectedStatus: number) {
  expect(this.lastApiResult, 'Expected an API response before asserting status').toBeDefined();
  expect(this.lastApiResult?.status).toBe(expectedStatus);
});

Then('the API response should contain key {string}', function (this: CustomWorld, key: string) {
  expect(this.lastApiResult, 'Expected an API response before asserting body keys').toBeDefined();
  expect(this.lastApiResult?.body).toBeTruthy();
  expect(this.lastApiResult?.body).toHaveProperty(key);
});

Then('the API response array {string} should not be empty', function (this: CustomWorld, path: string) {
  expect(this.lastApiResult, 'Expected an API response before asserting arrays').toBeDefined();
  const value = getValueByPath(this.lastApiResult?.body, path);
  expect(Array.isArray(value), `Expected ${path} to be an array`).toBe(true);
  expect((value as unknown[]).length).toBeGreaterThan(0);
});

Then('the API response field {string} should be {int}', function (this: CustomWorld, path: string, expected: number) {
  expect(this.lastApiResult, 'Expected an API response before asserting fields').toBeDefined();
  const value = getValueByPath(this.lastApiResult?.body, path);
  expect(value).toBe(expected);
});

Then('the API response field {string} should equal {string}', function (this: CustomWorld, path: string, expected: string) {
  expect(this.lastApiResult, 'Expected an API response before asserting fields').toBeDefined();
  const value = getValueByPath(this.lastApiResult?.body, path);
  expect(String(value)).toBe(expected);
});

async function sendRequest(world: CustomWorld, method: SupportedMethod, endpoint: string, data?: unknown) {
  const upperMethod = method.toUpperCase() as SupportedMethod;
  const normalizedEndpoint = normalizeEndpoint(endpoint);

  switch (upperMethod) {
    case 'GET':
      return world.reqResClient.get(normalizedEndpoint);
    case 'POST':
      return world.reqResClient.post(normalizedEndpoint, data);
    case 'PUT':
      return world.reqResClient.put(normalizedEndpoint, data);
    case 'DELETE':
      return world.reqResClient.delete(normalizedEndpoint);
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
}

function normalizeEndpoint(endpoint: string): string {
  return endpoint.replace(/^\/+/, '');
}

function coerceValue(value: string): string | number | boolean {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  if (!Number.isNaN(Number(value)) && value.trim() !== '') {
    return Number(value);
  }

  return value;
}