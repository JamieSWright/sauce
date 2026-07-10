Feature: API Interactions
  As a test engineer
  I want to validate public API interactions
  So that I can verify core CRUD flows and response handling

  Scenario: Retrieve full user collection
    Given the API base endpoint is available
    When I send a GET request to "users?page=1"
    Then the API response status should be 200
    And the API response should contain key "data"
    And the API response array "data" should not be empty

  Scenario: Retrieve filtered user collection
    When I send a GET request to "users?page=2"
    Then the API response status should be 200
    And the API response field "page" should be 2
    And the API response array "data" should not be empty

  Scenario: Create a user with POST
    When I send a POST request to "users" with body:
      | name | morpheus |
      | job  | leader   |
    Then the API response status should be 201
    And the API response field "name" should equal "morpheus"
    And the API response field "job" should equal "leader"

  Scenario: Update a user with PUT
    When I send a PUT request to "users/2" with body:
      | name | neo    |
      | job  | chosen |
    Then the API response status should be 200
    And the API response field "name" should equal "neo"
    And the API response field "job" should equal "chosen"

  Scenario: Delete a user with DELETE
    When I send a DELETE request to "users/2"
    Then the API response status should be 204

  Scenario: Handle API error responses
    When I send a POST request to "register" with body:
      | email | sydney@fife |
    Then the API response status should be 400
    And the API response should contain key "error"