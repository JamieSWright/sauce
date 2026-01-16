# Sauce Demo - Test Automation Suite

End-to-end test automation for [SauceDemo](https://www.saucedemo.com) using **Playwright** and **Cucumber BDD** with TypeScript. This project implements the Page Object Model (POM) pattern to test key e-commerce workflows including authentication, shopping cart operations, and checkout processes.

## ⚠️ Prerequisites

**Critical Requirements:**
- **Node.js v18 or higher** (v16 is not supported by Playwright)
- npm or yarn package manager

**Verify your Node.js version:**
```sh
node --version  # Must be v18.x.x or higher
```

**If you need to upgrade Node.js:**
```sh
# Using nvm (recommended)
nvm install 18
nvm use 18
nvm alias default 18

# Or download from https://nodejs.org
```

## Project Structure

```
├── features/                    # Cucumber BDD feature files
│   ├── login.feature            # Login scenarios
│   ├── cart.feature             # Shopping cart scenarios
│   ├── checkout.feature         # Checkout process scenarios
│   ├── inventory.feature        # Product inventory scenarios
│   └── step-definitions/        # Step implementations
│       ├── common.steps.ts      # Shared hooks and setup
│       ├── login.steps.ts       # Login step definitions
│       ├── cart.steps.ts        # Cart step definitions
│       ├── checkout.steps.ts    # Checkout step definitions
│       ├── inventory.steps.ts   # Inventory step definitions
│       └── helpers.ts           # Helper functions
├── tests/
│   ├── pages/                   # Page Object Model classes
│   │   ├── loginpage.ts         # Login page interactions
│   │   ├── inventorypage.ts     # Product catalog page
│   │   ├── cartpage.ts          # Shopping cart page
│   │   └── checkoutpage.ts      # Checkout flow pages
│   ├── steps/                   # Additional step definitions (optional)
│   └── tests/                   # Playwright test specifications
│       ├── loginpage.spec.ts
│       ├── cartpage.spec.ts
│       └── checkoutpage.spec.ts
├── .vscode/                     # VS Code workspace settings
│   └── settings.json            # Cucumber autocomplete configuration
├── test-results/                # Test reports and artifacts
│   ├── screenshots/             # Failure screenshots
│   └── videos/                  # Test recordings
├── .env.example                 # Environment variable template
├── .gitignore                   # Git ignore rules
├── cucumber.js                  # Cucumber configuration
├── playwright.config.ts         # Playwright configuration
└── tsconfig.json               # TypeScript configuration
```

## Requirements

- **Node.js** v18 or higher ⚠️ **REQUIRED**
- **npm** v8 or higher (comes with Node.js)
- **Playwright** v1.54.1 or higher
- **Cucumber** v7.3.2
- **TypeScript** (included as dev dependency)

## Setup

1. **Verify Node.js version:**
   ```sh
   node --version  # Must show v18.x.x or higher
   ```
   If you're running Node.js v16 or lower, you **must upgrade** before proceeding.

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Install Playwright browsers:**
   ```sh
   npx playwright install chromium
   ```

4. **Environment variables:**
   Create a `.env` file based on `.env.example`:
   ```sh
   cp .env.example .env
   ```
   
   Configure your settings in `.env`:
   ```env
   # Browser Settings
   HEADLESS=false
   SLOW_MO=100
   RECORD_VIDEO=false
   
   # Test Credentials
   STANDARD_USERNAME=standard_user
   PASSWORD=secret_sauce
   
   # Base URL
   BASE_URL=https://www.saucedemo.com
   
   # Screenshot Settings
   SCREENSHOT_ON_FAILURE=true
   ```
   
   **⚠️ Important:** Never commit your `.env` file - it's already in `.gitignore`

## Running Tests

### Playwright Tests

**Run all Playwright tests:**
```sh
npm run test:playwright
```

**Run specific test file:**
```sh
npx playwright test tests/tests/loginpage.spec.ts
```

**Run tests in headed mode:**
```sh
npx playwright test --headed
```

**Run tests with UI:**
```sh
npx playwright test --ui
```

**View Playwright report:**
```sh
npx playwright show-report
```

### Cucumber BDD Tests

**Run all Cucumber tests:**
```sh
npm run test:cucumber
```

**Run in headless mode (for CI/CD):**
```sh
npm run test:cucumber:headless
```

**Run specific feature:**
```sh
npm run test:cucumber:login
```

**Run all tests (Playwright + Cucumber):**
```sh
npm run test:all
```

### Utility Commands

**Clean test artifacts:**
```sh
npm run clean
```

## Test Coverage

### Cucumber BDD Feature Files

#### Login Feature (`features/login.feature`)
- ✅ Successful login with valid credentials
- ❌ Unsuccessful login with invalid credentials

#### Shopping Cart Feature (`features/cart.feature`)
- ✅ Add item to cart and verify badge count
- ✅ Navigate from cart to checkout

#### Checkout Feature (`features/checkout.feature`)
- ✅ Complete shipping information
- ✅ Complete full checkout with order confirmation

#### Inventory Feature (`features/inventory.feature`)
- ✅ View inventory items
- ✅ Add multiple items to cart

### Playwright Test Specifications

#### Login Tests (`tests/tests/loginpage.spec.ts`)
- ✅ Successful login with valid credentials
- ❌ Unsuccessful login with invalid credentials

#### Cart Tests (`tests/tests/cartpage.spec.ts`)
- ✅ Add item to cart and update badge count
- ✅ Navigate from cart to checkout

#### Checkout Tests (`tests/tests/checkoutpage.spec.ts`)
- ✅ Complete shipping info and reach overview
- ✅ Complete checkout with confirmation

## Architecture

### Page Object Model (POM)

All page interactions are abstracted into reusable page objects located in `tests/pages/`. Both Playwright and Cucumber tests utilize the same page objects for consistency.

#### LoginPage (`tests/pages/loginpage.ts`)
- `goto()` - Navigate to login page
- `login(username, password)` - Perform login
- `fillUsername(username)` - Fill username field
- `fillPassword(password)` - Fill password field
- `clickLogin()` - Click login button
- `expectErrorMessage(message)` - Validate error messages
- `expectToBeOnLoginPage()` - URL verification
- `expectToBeOnInventoryPage()` - Verify successful login

#### InventoryPage (`tests/pages/inventorypage.ts`)
- `addItemToCart(itemId)` - Add product to cart
- `removeItemFromCart(itemId)` - Remove product from cart
- `getCartBadgeCount()` - Get cart item count
- `expectCartBadgeCount(count)` - Validate cart badge
- `expectToBeOnInventoryPage()` - URL verification

#### CartPage (`tests/pages/cartpage.ts`)
- `goto()` - Navigate to cart page
- `clickCartLink()` - Click cart icon
- `clickCheckout()` - Proceed to checkout
- `expectItemInCart(itemName)` - Verify item in cart
- `expectToBeOnCartPage()` - URL verification
- `getCartBadgeCount()` - Get cart badge count

#### CheckoutPage (`tests/pages/checkoutpage.ts`)
- `fillShippingInfo(firstName, lastName, postalCode)` - Enter shipping details
- `clickContinue()` - Continue to next step
- `clickFinish()` - Complete checkout
- `expectToBeOnStepOne()` - Verify checkout step one
- `expectToBeOnStepTwo()` - Verify checkout overview
- `expectToBeOnComplete()` - Verify order confirmation
- `expectCompleteHeader(message)` - Validate confirmation message

### Cucumber Step Definitions

Step definitions are located in `features/step-definitions/` and map Gherkin steps to page object methods.

- **common.steps.ts** - Browser lifecycle, World configuration, screenshot on failure
- **login.steps.ts** - Login-related steps
- **cart.steps.ts** - Shopping cart steps
- **checkout.steps.ts** - Checkout process steps
- **inventory.steps.ts** - Product inventory steps
- **helpers.ts** - Reusable utility functions

## Configuration

### Cucumber Configuration (`cucumber.js`)

Multiple profiles are available:
- **default** - Standard test execution with HTML/JSON reports
- **headless** - CI/CD optimized with parallel execution
- **login** - Run only login feature tests

### Playwright Configuration (`playwright.config.ts`)

Configured for:
- Chromium browser testing
- HTML reporting
- Trace on first retry
- Environment variable support

### TypeScript Configuration (`tsconfig.json`)

Set up for:
- CommonJS module resolution
- ES2020 target
- Cucumber and Node type support

## Test Reports

### Cucumber Reports
- **HTML Report**: `test-results/cucumber-report.html`
- **JSON Report**: `test-results/cucumber-report.json`

### Playwright Reports
- **HTML Report**: `playwright-report/index.html`

### Artifacts
- **Screenshots**: `test-results/screenshots/` (captured on failure)
- **Videos**: `test-results/videos/` (when enabled)


**Run tests in headless mode:**
```sh
HEADLESS=true npm run test:cucumber
```

**Clean before running in CI:**
```sh
npm run clean && npm run test:all
```

**Environment-specific configuration:**
```sh
# CI environment
export CI=true
export HEADLESS=true
export RECORD_VIDEO=false
npm run test:all
```

## Upgrading Dependencies

**Update Playwright:**
```sh
npm install -D @playwright/test@latest
npx playwright install
```

**Update Cucumber:**
```sh
npm install @cucumber/cucumber@latest
```

