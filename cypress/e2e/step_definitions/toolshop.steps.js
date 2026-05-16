import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../../pages/LoginPage";
import homePage from "../../pages/HomePage";
import ProductPage from "../../pages/ProductPage";

const productPage = new ProductPage();

// ─── Background ───────────────────────────────────────────────────────────────

Given("the user navigates to the Toolshop website", () => {
  cy.visitToolshop();
});

// ─── Shared / Reusable ────────────────────────────────────────────────────────

Given("the user is logged in with valid credentials", () => {
  cy.fixture("users").then((data) => {
    cy.login(data.validUser.email, data.validUser.password);
  });
});

// ─── TC-01: Homepage ──────────────────────────────────────────────────────────

Then("the homepage URL should include {string}", (urlPart) => {
  cy.url().should("include", urlPart);
});

Then("the page title should contain {string}", (titleText) => {
  cy.title().should("contain", titleText);
});

Then("the categories menu should be visible", () => {
  homePage.getCategoriesMenu().should("be.visible");
});

// ─── TC-02: Valid Login ───────────────────────────────────────────────────────

When("the user logs in with valid credentials", () => {
  cy.fixture("users").then((data) => {
    loginPage.visit();
    loginPage.login(data.validUser.email, data.validUser.password);
  });
});

Then("the user should be redirected to the account page", () => {
  cy.url().should("include", "/account");
});

Then("the navigation menu should be visible", () => {
  cy.get('[data-test="nav-menu"]').should("be.visible");
});

// ─── TC-03: Invalid Login ─────────────────────────────────────────────────────

When("the user logs in with invalid credentials", () => {
  cy.fixture("users").then((data) => {
    loginPage.visit();
    loginPage.login(data.invalidUser.email, data.invalidUser.password);
  });
});

Then("the URL should still include {string}", (urlPart) => {
  cy.url().should("include", urlPart);
});

Then("an invalid login error message should be displayed", () => {
  loginPage.getErrorMessage().should("be.visible").and("contain", "Invalid");
});

// ─── TC-04 & TC-08 & TC-14: Search ───────────────────────────────────────────

When("the user searches for {string}", (term) => {
  homePage.searchProduct(term);
  cy.get(".card:not(.skeleton)", { timeout: 15000 }).should(
    "have.length.greaterThan",
    0
  );
});

Then("search results should contain {string}", (productName) => {
  cy.get(".card:not(.skeleton)", { timeout: 15000 })
    .contains(productName)
    .should("be.visible");
});

Then("at least one product name should be visible", () => {
  cy.get(".card:not(.skeleton)", { timeout: 15000 }).should(
    "have.length.greaterThan",
    0
  );
});

Then("the results should contain text matching {string}", (text) => {
  cy.get(".card:not(.skeleton)", { timeout: 15000 }).should(
    "have.length.greaterThan",
    0
  );
  cy.contains(new RegExp(text, "i")).should("be.visible");
});

// ─── TC-05: Add to Cart ───────────────────────────────────────────────────────

When("the user goes to the homepage", () => {
  cy.get('[data-test="nav-home"]').click();
  cy.url().should("eq", "https://practicesoftwaretesting.com/");
});

When("the user adds {string} to the cart", (productName) => {
  cy.addProductToCart(productName);
});

When("the user visits the checkout page", () => {
  cy.visit("/checkout");
});

Then("the checkout page should contain {string}", (productName) => {
  cy.url().should("include", "checkout");
  cy.get("table", { timeout: 10000 }).contains(productName).should("be.visible");
});

// ─── TC-06: Category Navigation ───────────────────────────────────────────────

When("the user clicks on the categories menu", () => {
  cy.get('[data-test="nav-categories"]').click();
});

When("the user clicks on Hand Tools", () => {
  cy.get('[data-test="nav-hand-tools"]').click();
  cy.url().should("include", "hand-tools");
  cy.get(".card:not(.skeleton)", { timeout: 20000 }).should(
    "have.length.greaterThan",
    0
  );
});

Then("the URL should include {string}", (urlPart) => {
  cy.url().should("include", urlPart);
});

Then("at least one product card should be visible", () => {
  cy.get(".card:not(.skeleton)", { timeout: 15000 }).should(
    "have.length.greaterThan",
    0
  );
});

// ─── TC-07: Contact Page ──────────────────────────────────────────────────────

When("the user clicks on the contact link", () => {
  cy.get('[data-test="nav-contact"]').click();
});

Then("the contact form should be visible", () => {
  cy.get("form").should("be.visible");
});

Then("the contact submit button should exist", () => {
  cy.get('[data-test="contact-submit"]').should("exist");
});

// ─── TC-08: Product Detail ────────────────────────────────────────────────────

When("the user clicks on {string}", (productName) => {
  cy.get(".card:not(.skeleton)", { timeout: 15000 })
    .contains(productName)
    .click();
});

Then("the product name should be visible", () => {
  cy.get('[data-test="product-name"]', { timeout: 10000 }).should("be.visible");
});

Then("the add to cart button should be visible", () => {
  cy.get('[data-test="add-to-cart"]', { timeout: 10000 }).should("be.visible");
});

// ─── TC-09: Cart Direct Navigation ───────────────────────────────────────────

Then("the cart step indicator should be visible", () => {
  cy.get(".step-indicator", { timeout: 10000 }).should("be.visible");
});

// ─── TC-10: Register Page ─────────────────────────────────────────────────────

When("the user visits the register page", () => {
  cy.visit("/auth/register");
});

Then("the register form should be visible", () => {
  cy.get("form").should("be.visible");
});

Then("the register submit button should exist", () => {
  cy.get('[data-test="register-submit"]').should("exist");
});

// ─── TC-11: Price Filter ──────────────────────────────────────────────────────

Then("the price range slider should be visible", () => {
  cy.get(".ngx-slider", { timeout: 10000 }).should("be.visible");
});

// ─── TC-12: Sort ─────────────────────────────────────────────────────────────

Then("the sort dropdown should be visible", () => {
  cy.get('[data-test="sort"]', { timeout: 10000 }).should("be.visible");
});

// ─── TC-13: Login Page Fields ─────────────────────────────────────────────────

When("the user visits the login page", () => {
  loginPage.visit();
});

Then("the email input should be visible", () => {
  loginPage.getEmailInput().should("be.visible");
});

Then("the password input should be visible", () => {
  loginPage.getPasswordInput().should("be.visible");
});

Then("the login submit button should be visible", () => {
  loginPage.getSubmitButton().should("be.visible");
});

// ─── TC-15: Logout ────────────────────────────────────────────────────────────

When("the user opens the navigation menu", () => {
  cy.url().should("include", "/account");
  cy.get('[data-test="nav-menu"]', { timeout: 10000 }).should("be.visible").click();
});

When("the user clicks sign out", () => {
  cy.get('[data-test="nav-sign-out"]', { timeout: 10000 }).should("be.visible").click();
});

Then("the sign in button should be visible", () => {
  cy.get('[data-test="nav-sign-in"]', { timeout: 10000 }).should("be.visible");
});

Then("the URL should not include {string}", (urlPart) => {
  cy.url().should("not.include", urlPart);
});
