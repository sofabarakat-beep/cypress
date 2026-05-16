class HomePage {
  visit() {
    cy.visit("/");
  }

  getCategoriesMenu() {
    return cy.get('[data-test="nav-categories"]');
  }

  getSearchInput() {
    return cy.get('[data-test="search-query"]');
  }

  getSearchSubmit() {
    return cy.get('[data-test="search-submit"]');
  }

  getCartQuantityBadge() {
    return cy.get('[data-test="cart-quantity"]');
  }

  searchProduct(term) {
    this.getSearchInput().clear().type(term);
    this.getSearchSubmit().click();
  }
}

export default new HomePage();
