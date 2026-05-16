Cypress.Commands.add("visitToolshop", () => {
  cy.visit("/");
  cy.get('[data-test="nav-home"]').should("be.visible");
});

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/auth/login");
  cy.get('[data-test="email"]').clear().type(email);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-submit"]').click();
  cy.url().should("include", "/account");
});

Cypress.Commands.add("searchProduct", (term) => {
  cy.get('[data-test="search-query"]').clear().type(term);
  cy.get('[data-test="search-submit"]').click();
});

Cypress.Commands.add("addProductToCart", (productName) => {
  cy.searchProduct(productName);
  cy.get(".card:not(.skeleton)", { timeout: 15000 }).contains(productName).click();
  cy.get('[data-test="add-to-cart"]', { timeout: 10000 }).should("be.visible").click();
  cy.intercept("POST", "**/carts**").as("cartRequest");
  cy.wait("@cartRequest", { timeout: 15000 });
  cy.get('[data-test="cart-quantity"]', { timeout: 15000 })
    .should("be.visible")
    .and("not.have.text", "0");
});
