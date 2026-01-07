Feature: Product Inventory
  As a logged in user
  I want to browse and interact with products
  So that I can add them to my cart

  Background:
    Given I am logged in as a standard user
    And I am on the inventory page

  Scenario: View inventory items
    Then I should see a list of products
    And each product should display a price
    And each product should have an "Add to cart" button

  Scenario: Add multiple items to cart
    When I add "Sauce Labs Backpack" to cart
    Then the cart badge should display "1"
    When I add "Sauce Labs Bike Light" to cart
    Then the cart badge should display "2"
