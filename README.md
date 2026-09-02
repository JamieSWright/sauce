# Sauce Demo - Test Automation Suite

End-to-end test automation for [SauceDemo](https://www.saucedemo.com) using **Playwright** and **Cucumber BDD** with TypeScript. Tests UI workflows and APIs using the Page Object Model pattern.

## Prerequisites

- **Node.js v18+** ⚠️ **Required** (v16 not supported)
- **npm** (included with Node.js)

**Check your Node version:**
```sh
node --version
```

**Upgrade Node if needed:**
```sh
nvm install 18 && nvm use 18
# Or download from https://nodejs.org
```

## Project Structure

```
features/
├── api.feature                 # API scenarios
├── login.feature              # Login scenarios
├── cart.feature               # Shopping cart scenarios
├── checkout.feature           # Checkout scenarios
├── inventory.feature          # Inventory scenarios
└── step-definitions/          # Step implementations
    ├── common.steps.ts        # Hooks + World setup
    ├── api.steps.ts           # API steps
    ├── login.steps.ts         # Login steps
    ├── cart.steps.ts          # Cart steps
    ├── checkout.steps.ts      # Checkout steps
    ├── inventory.steps.ts     # Inventory steps
    └── helpers.ts             # Utilities

support/
├── pages/                     # Page Object Model
│   ├── loginpage.ts
│   ├── inventorypage.ts
│   ├── cartpage.ts
│   └── checkoutpage.ts
└── api/
   └── reqres.client.ts       # API client wrapper

tests/
└── specs/                     # Playwright test specs
   ├── loginpage.spec.ts
   ├── cartpage.spec.ts
   └── checkoutpage.spec.ts

test-results/                  # Reports & artifacts
├── screenshots/
└── videos/

.env.example                   # Environment template
cucumber.js                    # Cucumber config
playwright.config.ts          # Playwright config
tsconfig.json                 # TypeScript config
```

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Install Playwright browsers:**
   ```sh
   npx playwright install chromium
   ```

3. **Create environment file:**
   ```sh
   cp .env.example .env
   ```

4. **Configure your `.env` file:**
   ```env
   # Browser settings
   HEADLESS=false
   SLOW_MO=100
   RECORD_VIDEO=false
   
   # Test credentials
   STANDARD_USERNAME=standard_user
   PASSWORD=secret_sauce
   
   # URLs
   BASE_URL=https://www.saucedemo.com
   API_BASE_URL=https://reqres.in/api/
   REQRES_API_KEY=<your_key>
   
   # Screenshots
   SCREENSHOT_ON_FAILURE=true
   ```

## Running Tests

### Playwright Tests
```sh
npm run test:playwright              # Run all tests
npx playwright test --headed         # Run in visible browser
npx playwright test --ui             # Run with UI mode
npx playwright show-report           # View HTML report
```

### Cucumber BDD Tests
```sh
npm run test:cucumber                # Run all features
npm run test:cucumber:headless       # Run in CI mode
npm run test:cucumber:login          # Run login feature only
npm run test:cucumber:api            # Run API feature only without launching a browser
npm run test:cucumber:report         # Run all Cucumber features and generate HTML/JSON reports
```

### All Tests
```sh
npm run test:all                     # Run Playwright + Cucumber
npm run clean                        # Clean test artifacts
```

### CI/CD Usage
```sh
HEADLESS=true npm run test:cucumber  # Headless mode
RECORD_VIDEO=true npm run test:all   # Record videos
```

## Test Coverage

| Feature | Scenarios | Status |
|---------|-----------|--------|
| **Login** | Valid credentials, Invalid credentials | ✅ Implemented |
| **Inventory** | View products, Add items to cart | ✅ Implemented |
| **Cart** | Add items, Navigate to checkout | ✅ Implemented |
| **Checkout** | Shipping info, Order confirmation | ✅ Implemented |
| **API** | GET, POST, PUT, DELETE, Error handling | ✅ Implemented |

## Architecture

### Page Object Model (POM)

All page interactions use reusable page objects in `support/pages/`. Both Playwright and Cucumber tests use the same page objects.

| Page | Key Methods | Location |
|------|-------------|----------|
| **LoginPage** | `goto()`, `login()`, `expectErrorMessage()` | `support/pages/loginpage.ts` |
| **InventoryPage** | `addItemToCart()`, `getCartBadgeCount()` | `support/pages/inventorypage.ts` |
| **CartPage** | `goto()`, `clickCheckout()`, `expectItemInCart()` | `support/pages/cartpage.ts` |
| **CheckoutPage** | `fillShippingInfo()`, `clickFinish()`, `expectCompleteHeader()` | `support/pages/checkoutpage.ts` |

### Step Definitions & Helpers

- **common.steps.ts** - Browser lifecycle, World setup
- **api.steps.ts** - API requests and assertions
- **login/cart/checkout/inventory.steps.ts** - Feature-specific steps
- **helpers.ts** - Shared utilities (login, path resolution)

### API Integration

- **Feature file**: `features/api.feature`
- **Steps**: `features/step-definitions/api.steps.ts`
- **Client**: `support/api/reqres.client.ts` (wraps Playwright APIRequestContext)

## Configuration Files

| File | Purpose |
|------|---------|
| **cucumber.js** | Cucumber profiles: `default`, `headless`, `login`, `api` |
| **playwright.config.ts** | Chromium config, HTML reporting, trace on retry |
| **tsconfig.json** | TypeScript: CommonJS, ES2020 target |

## Reports & Artifacts

```
test-results/
├── cucumber-report.html         # Cucumber HTML report
├── cucumber-report.json         # Cucumber JSON report
├── screenshots/                 # Failure screenshots
└── videos/                      # Test recordings (if enabled)

playwright-report/
└── index.html                   # Playwright HTML report
```

## Next Steps & Improvements

1. **Add more test tags** - `@api` is available; add `@ui` and `@smoke` for selective execution
2. **Enhance API testing** - Add scenario outlines, performance assertions, error cases
3. **Create shared config module** - Centralize URLs, timeouts, credentials
4. **API contract validators** - Reusable response shape/type checkers
5. **Consistent naming** - Rename to `login.page.ts`, `login.page.spec.ts`

## Upgrading Dependencies

```sh
# Update Playwright
npm install -D @playwright/test@latest
npx playwright install

# Update Cucumber
npm install @cucumber/cucumber@latest

# Update all dependencies
npm update
```

