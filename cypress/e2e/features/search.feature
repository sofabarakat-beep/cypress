Feature: Search and Add to Cart

  Background:
    Given the user navigates to the Toolshop website

  Scenario: TC-04: Should search for a product and add it to the cart
    When the user searches for "Hammer"
    Then search results should contain "Claw Hammer"
    When the user clicks on "Claw Hammer"
    And the user adds the product to the cart
    Then the cart quantity should be updated
