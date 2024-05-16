Feature: Login to site

  Scenario: A user can login
    Given I logged in as a new user
    And I am on the profile page
    Then I can see own username
