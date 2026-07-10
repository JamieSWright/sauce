Feature: User Login
  As a user of the Sauce Demo application
  I want to log in with my credentials
  So that I can access the inventory page

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I enter username "standard_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should be redirected to the inventory page

  Scenario: Unsuccessful login with invalid credentials
    When I enter username "invalid_user"
    And I enter password "invalid_pass"
    And I click the login button
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"
    And I should remain on the login page

  Scenario: Validate API user endpoint before UI login
    When I send a GET request to "/users/2"
    Then the API response status should be 200
    And the API response field "data.id" should be 2
    When I enter username "standard_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should be redirected to the inventory page
