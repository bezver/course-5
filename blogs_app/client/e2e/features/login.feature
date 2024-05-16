Feature: Login to site

  Scenario: A user can login
    Given I logged in as a new user
    And I am on the home page
    Then I can see the app title
