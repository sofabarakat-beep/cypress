Feature: Practice Software Testing - Toolshop Tests

  Background:
    Given the user navigates to the Toolshop website

  Scenario: TC-01: Homepage loads correctly
    Then the homepage URL should include "practicesoftwaretesting.com"
    And the page title should contain "Toolshop"
    And the categories menu should be visible

  Scenario: TC-02: Should login with valid credentials
    When the user logs in with valid credentials
    Then the user should be redirected to the account page
    And the navigation menu should be visible

  Scenario: TC-03: Should show error on invalid login
    When the user logs in with invalid credentials
    Then the URL should still include "/auth/login"
    And an invalid login error message should be displayed

  Scenario: TC-04: Should search for a product successfully
    When the user searches for "Hammer"
    Then search results should contain "Claw Hammer"
    And at least one product name should be visible

  Scenario: TC-05: Should add a product to cart
    Given the user is logged in with valid credentials
    When the user goes to the homepage
    And the user adds "Claw Hammer" to the cart
    And the user visits the checkout page
    Then the checkout page should contain "Claw Hammer"

  Scenario: TC-06: Category navigation
    When the user clicks on the categories menu
    And the user clicks on Hand Tools
    Then the URL should include "category"
    And at least one product card should be visible

  Scenario: TC-07: Contact page should load with form
    When the user clicks on the contact link
    Then the URL should include "contact"
    And the contact form should be visible
    And the contact submit button should exist

  Scenario: TC-08: Product detail page should load correctly
    When the user searches for "Hammer"
    And the user clicks on "Claw Hammer"
    Then the URL should include "product"
    And the product name should be visible
    And the add to cart button should be visible

  Scenario: TC-09: Cart should be accessible by direct navigation
    Given the user is logged in with valid credentials
    When the user visits the checkout page
    Then the URL should include "checkout"
    And the cart step indicator should be visible

  Scenario: TC-10: Register page should be accessible
    When the user visits the register page
    Then the URL should include "register"
    And the register form should be visible
    And the register submit button should exist

  Scenario: TC-11: Price range filter should be visible
    Then the price range slider should be visible
    And at least one product card should be visible

  Scenario: TC-12: Sort section should be visible
    Then the sort dropdown should be visible
    And at least one product card should be visible

  Scenario: TC-13: Login page should have required fields
    When the user visits the login page
    Then the email input should be visible
    And the password input should be visible
    And the login submit button should be visible

  Scenario: TC-14: Search with Pliers should show results
    When the user searches for "Pliers"
    Then at least one product name should be visible
    And the results should contain text matching "Pliers"

  Scenario: TC-15: Should be able to logout after login
    Given the user is logged in with valid credentials
    When the user opens the navigation menu
    And the user clicks sign out
    Then the sign in button should be visible
    And the URL should not include "/account"
