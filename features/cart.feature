Feature: Shopping Cart
  As a logged in user
  I want to manage items in my cart
  So that I can prepare for checkout

  Background:
    Given I am logged in as a standard user
    And I am on the inventory page

  Scenario: Add item to cart and verify badge count
    When I add "Sauce Labs Backpack" to cart
    Then the cart badge should display "1"
    When I click the cart icon
    Then I should be on the cart page
    And "Sauce Labs Backpack" should be listed in my cart

  Scenario: Navigate from cart to checkout
    When I add "Sauce Labs Backpack" to cart
    And I click the cart icon
    Then I should be on the cart page
    When I click the checkout button
    Then I should be on the checkout information page
