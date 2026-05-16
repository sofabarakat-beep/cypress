Feature: User Login Functionality

  Background:
    Given the user navigates to the Toolshop website

  Scenario: TC-02: Should login with valid credentials
    When the user logs in with valid credentials
    Then the user should be redirected to the account page
    And the navigation menu should be visible

  Scenario: TC-03: Should show error on invalid login
    When the user logs in with invalid email "wrong@email.com" and password "wrongpass"
    Then an invalid login error message should be displayed
