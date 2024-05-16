Feature: Login to site

  Scenario: A user can login
    Given I logged in as a new user
    And I am on the blog page
    When I create a post with message: "Good wheather"
    Then I can see a post with message: "Good wheather"
