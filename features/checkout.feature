Feature: Checkout Process
  As a logged in user with items in my cart
  I want to complete the checkout process
  So that I can purchase my items

  Background:
    Given I am logged in as a standard user
    And I have added "Sauce Labs Backpack" to my cart
    And I am on the cart page
    And I have clicked the checkout button

  Scenario: Complete shipping information
    Given I am on checkout step one
    When I enter first name "John"
    And I enter last name "Doe"
    And I enter postal code "12345"
    And I click continue
    Then I should be on checkout step two

  Scenario: Complete full checkout with order confirmation
    Given I am on checkout step one
    When I fill in shipping information:
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    And I click continue
    Then I should be on checkout step two
    When I click finish
    Then I should be on the order complete page
    And I should see the confirmation message "Thank you for your order!"
