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
├── features/                         # Cucumber BDD feature files
│   ├── api.feature                   # API interaction scenarios
│   ├── login.feature                 # Login scenarios
│   ├── cart.feature                  # Shopping cart scenarios
│   ├── checkout.feature              # Checkout process scenarios
│   ├── inventory.feature             # Product inventory scenarios
│   └── step-definitions/             # Active Cucumber step implementations
│       ├── common.steps.ts           # Shared hooks + world setup (UI + API)
│       ├── api.steps.ts              # API request/response steps
│       ├── login.steps.ts            # Login step definitions
│       ├── cart.steps.ts             # Cart step definitions
│       ├── checkout.steps.ts         # Checkout step definitions
│       ├── inventory.steps.ts        # Inventory step definitions
│       └── helpers.ts                # Shared step helper utilities
├── tests/
│   ├── api/
│   │   └── reqres.client.ts          # Reusable ReqRes API client wrapper
│   ├── pages/                        # Page Object Model classes
│   │   ├── loginpage.ts              # Login page interactions
│   │   ├── inventorypage.ts          # Product catalog page
│   │   ├── cartpage.ts               # Shopping cart page
│   │   └── checkoutpage.ts           # Checkout flow pages
│   ├── tests/                        # Playwright test specifications
│   │   ├── loginpage.spec.ts
│   │   ├── cartpage.spec.ts
│   │   └── checkoutpage.spec.ts
│   └── _archive/
│       └── steps_legacy/             # Archived duplicate step defs (not used by active scripts)
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

   # API Settings
   API_BASE_URL=https://reqres.in/api/
   REQRES_API_KEY=<your_real_reqres_key>
   
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

**Run API feature profile only:**
```sh
npm run test:cucumber:api
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

#### API Feature (`features/api.feature`)
- ✅ GET full and filtered data
- ✅ POST user creation
- ✅ PUT user update
- ✅ DELETE user removal
- ✅ Error handling for invalid API request payloads

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
- **api.steps.ts** - API request execution and response assertions
- **login.steps.ts** - Login-related steps
- **cart.steps.ts** - Shopping cart steps
- **checkout.steps.ts** - Checkout process steps
- **inventory.steps.ts** - Product inventory steps
- **helpers.ts** - Reusable utility functions

### API Integration

API coverage is implemented through a dedicated BDD + client layering:

- **Feature file**: `features/api.feature`
- **Step definitions**: `features/step-definitions/api.steps.ts`
- **Reusable API client**: `tests/api/reqres.client.ts`
- **API request context + auth header setup**: `features/step-definitions/common.steps.ts`

## Configuration

### Cucumber Configuration (`cucumber.js`)

Multiple profiles are available:
- **default** - Standard test execution with HTML/JSON reports
- **headless** - CI/CD optimized with parallel execution
- **login** - Run only login feature tests
- **api** - Run only API feature tests with dedicated API report output

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

## Folder Structure Improvements

The current structure works, but these changes will improve maintainability as coverage grows:

1. **Retire legacy duplicate steps under `tests/steps/`**
   - Active scripts load `features/step-definitions/**/*.ts`, so `tests/steps/` can confuse maintenance.

2. **Adopt consistent file naming conventions**
   - Example: `loginpage.ts` -> `login.page.ts`, `cartpage.spec.ts` -> `cart.page.spec.ts`.

3. **Introduce shared config module**
   - Centralize base URLs, timeouts, and environment access helpers to reduce hardcoded values.

4. **Add feature tags for selective execution**
   - Suggested tags: `@ui`, `@api`, `@smoke`, `@regression`.

5. **Create API contract assertion helpers**
   - Move response shape/type checks into reusable contract validators for stronger API quality gates.

6. **Optional long-term domain layout**
   - Example target:
     - `src/ui/pages`
     - `src/ui/steps`
     - `src/api/clients`
     - `src/api/contracts`
     - `src/shared/config`

### Recommended Incremental Migration Path

1. Keep existing scripts and behavior stable.
2. Remove `tests/steps/` after a final verification pass.
3. Add shared config + tags.
4. Add API contract validators.
5. Rename files gradually in small PRs.
6. Move to domain layout only after CI stability is confirmed.

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

