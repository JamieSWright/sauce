import { Page, expect } from '@playwright/test';


export class LoginPage {
  readonly page: Page;
  readonly baseUrl = 'https://www.saucedemo.com';
  
  // Selectors
  readonly usernameField = '[data-test="username"]';
  readonly passwordField = '[data-test="password"]';
  readonly loginButton = '[data-test="login-button"]';
  readonly errorMessage = '[data-test="error"]';
  

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the login page
   */
  async goto() {
    await this.page.goto(this.baseUrl);
  }

  /**
   * Fill in the username field
   */
  async fillUsername(username: string) {
    await this.page.fill(this.usernameField, username);
  }

  /**
   * Fill in the password field
   */
  async fillPassword(password: string) {
    await this.page.fill(this.passwordField, password);
  }

  /**
   * Click the login button
   */
  async clickLogin() {
    await this.page.click(this.loginButton);
  }

  async login(username: string, password: string) {
    await this.goto();
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
    
    // Wait for successful navigation to inventory page
    if (username === process.env.STANDARD_USERNAME && password === process.env.PASSWORD) {
      await this.page.waitForURL(`${this.baseUrl}/inventory.html`);
    }
  }

  
  /**
   * Check if error message is visible
   */
  async isErrorVisible() {
    return await this.page.locator(this.errorMessage).isVisible();
  }

  /**
   * Get the error message text
   */
  async getErrorMessage() {
    return await this.page.locator(this.errorMessage).textContent();
  }

  /**
   * Expect error message to contain specific text
   */
  async expectErrorMessage(expectedText: string) {
    await expect(this.page.locator(this.errorMessage)).toBeVisible();
    await expect(this.page.locator(this.errorMessage)).toContainText(expectedText);
  }

  /**
   * Expect to be on the login page
   */
  async expectToBeOnLoginPage() {
    await expect(this.page).toHaveURL(this.baseUrl);
  }

  /**
   * Expect to be on the inventory page (successful login)
   */
  async expectToBeOnInventoryPage() {
    await expect(this.page).toHaveURL(`${this.baseUrl}/inventory.html`);
  }
}