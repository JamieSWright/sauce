# Sauce Demo - Playwright Test Suite

End-to-end test automation for [SauceDemo](https://www.saucedemo.com) using Playwright with TypeScript. This project implements the Page Object Model (POM) pattern to test key e-commerce workflows including authentication, shopping cart operations, and checkout processes.

## Project Structure

```
tests/
├── pages/              # Page Object Model classes
│   ├── loginpage.ts    # Login page interactions
│   ├── inventorypage.ts # Product catalog page
│   ├── cartpage.ts     # Shopping cart page
│   └── checkoutpage.ts # Checkout flow pages
├── tests/              # Test specifications
│   └── loginpage.spec.ts
└── saucedemo.test.js   # Legacy test file
```

## Requirements

- **Node.js** v18 or higher
- **Playwright** v1.54.1 or higher
- **TypeScript** (included as dev dependency)

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Install Playwright browsers:**
   ```sh
   npx playwright install
   ```

3. **Environment variables (optional):**
   Create a `.env` file for credentials:
   ```
   STANDARD_USERNAME=standard_user
   PASSWORD=secret_sauce
   ```

## Running Tests

**Run all tests:**
```sh
npx playwright test
```

**Run specific test file:**
```sh
npx playwright test tests/saucedemo.test.js
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

**View test report:**
```sh
npx playwright show-report
```

## Test Coverage

### Positive Tests

- **User can log in with valid credentials and is redirected to product catalog**  
  Verifies that a user can successfully log in and is taken to the inventory page.

- **User can add an item to the cart and see the cart count update**  
  Checks that adding an item to the cart updates the cart badge and the item appears in the cart.

- **User can proceed to checkout from cart page**  
  Ensures that the user can navigate from the cart page to the checkout page.

- **User can enter shipping info and proceed to overview**  
  Verifies that the user can enter shipping information and move to the order overview page.

- **User can finish checkout and see confirmation**  
  Confirms that the user can complete the checkout process and sees the order confirmation message.

### Negative Tests

- **User cannot log in with invalid username**  
  Verifies that login fails with an invalid username and shows an error message.

- **User cannot log in with invalid password**  
  Verifies that login fails with an invalid password and shows an error message.

## Page Object Classes

### LoginPage
- `login(username, password)` - Performs login
- `expectErrorMessage(message)` - Validates error messages
- `expectToBeOnLoginPage()` - URL verification

### InventoryPage
- `addItemToCart(itemName)` - Adds product to cart
- `removeItemFromCart(itemName)` - Removes product from cart
- `getCartBadgeCount()` - Returns cart item count
- `expectCartBadgeCount(count)` - Validates cart badge
- `clickCartLink()` - Navigates to cart
- `expectToBeOnInventoryPage()` - URL verification

### CartPage
- Cart operations and checkout navigation

### CheckoutPage
- Checkout form submission and order completion

## Configuration

Tests are configured in [playwright.config.ts](playwright.config.ts). Default settings include:
- Multiple browser support (Chromium, Firefox, WebKit)
- Parallel test execution
- Automatic screenshots on failure
- HTML test reports

## Best Practices

- **Page Object Model**: All page interactions are encapsulated in page classes
- **TypeScript**: Strong typing for better IDE support and error detection
- **Async/Await**: Proper promise handling throughout
- **Selectors**: Uses data-test attributes for reliable element selection
- **Environment Variables**: Sensitive data stored in `.env` files

## Upgrading Playwright

To use the latest stable version:
```sh
npm install -D @playwright/test@latest
npx playwright install
```

## Notes
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⢀⡤⠤⠤⣄⠀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⠤⢴⣴⠒⠉⠹⣴⣏⠀⠀⠀⡀⠈⢇⠀⠀⣼⠀⠀⠀⠘⣶⠇⠀⢨⢃⡾⠓⠲⢤⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣀⠤⠔⠒⠙⣯⣇⠀⠈⣿⣇⠀⠀⣿⣿⣿⠀⠀⣷⠀⠘⡄⠀⣿⠀⠀⠀⠀⢹⠀⠀⢸⡏⠇⠀⢀⠇⣀⠤⠒⠒⠤⣄
⢰⡖⠉⠀⠀⠀⠀⣀⣸⣿⠀⠀⠉⠉⠀⠀⢸⠁⣿⠀⠈⠉⠁⠀⢱⠀⣿⠀⠀⣦⠀⠀⠀⠀⣿⡸⠀⠀⠘⠉⠀⠀⣀⣤⣴⠟
⢼⢣⣀⣴⡀⠀⠘⡿⠏⠗⡆⠀⠠⣶⡆⠀⠸⡄⡏⠀⠀⣶⣷⠀⠀⢧⣿⠀⠀⣿⡆⠀⠀⢸⣿⠃⠀⢰⡄⠀⠐⡿⠛⠋⠀⠀
⠘⢿⡿⢿⣧⠀⠀⢳⠀⢸⠸⠀⠀⢹⣧⢀⣀⣷⣧⣤⣤⠛⣏⣦⣤⣾⣿⢦⣤⣿⢸⣄⣀⣼⡏⠀⢠⡟⡇⠀⠀⡇⠀⠀⠀⠀
⠀⠀⠀⠀⢏⢇⠀⠀⣣⠀⣆⣷⣶⣿⣿⡿⠿⠿⢷⡿⠟⣠⠟⠋⠛⢿⡛⠛⠿⡼⠿⠿⢿⣿⣿⣶⠞⡅⢸⠀⠀⢸⠀⠀⠀⠀
⠀⠀⠀⠀⠘⣾⣿⣿⠇⢠⣟⠉⠙⠷⡿⠀⠀⠀⢸⢀⡼⠁⠀⣀⠀⠀⠹⡄⡼⡇⠀⠀⡜⣸⡏⠙⠢⣧⣾⣦⣀⢸⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠀⠀⠀⢿⣿⣷⣦⡀⠀⠀⠀⠀⣇⡾⠀⠀⣼⣿⢷⠀⠀⢻⢱⠀⠀⢀⣿⡿⠀⠀⢠⠋⢻⡿⠿⣏⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⣿⣿⠆⠀⠀⢸⡏⡇⠀⠀⡏⡟⡟⠀⠀⢸⡸⠀⠀⢸⣿⠃⠀⠀⡜⡰⢩⠃⠀⠈⣱⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⢹⠀⠀⠀⢸⠀⡇⠀⠀⠙⠋⠀⠀⢀⡏⡇⠀⠀⠘⠋⠀⠀⣰⣱⢣⠇⠀⠀⣰⠃⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡘⡎⠀⠀⠀⡏⣿⣧⡀⠀⠀⠀⠀⢀⣾⣷⡇⠀⠀⠀⠀⠀⢠⣯⣧⣾⣦⣄⣰⠃⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⣧⣤⣶⣶⠃⠘⢿⣿⣷⣶⣶⣾⠟⠉⣿⣿⣦⣄⣀⣠⣴⢏⣽⠋⠉⠙⢿⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠛⠛⠛⠋⠁⠀⠀⠀⠉⠉⠉⠉⠀⠀⠀⠈⠛⠻⠿⠟⠋⠁⣿⣿⣦⣀⣀⡼⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠛⠛⠛⠁⠀⠀⠀⠀⠀⠀⠀