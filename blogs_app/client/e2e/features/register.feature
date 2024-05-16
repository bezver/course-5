Feature: Register to site

  Scenario: A new user can register
    Given I am on the register page
    When I register a new user
    Then No register error is shown
