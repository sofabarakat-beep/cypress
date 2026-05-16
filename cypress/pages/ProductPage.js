class ProductPage {
  addToCart() {
    cy.get('[data-test="add-to-cart"]').click();
  }

  productName() {
    return cy.get('[data-test="product-name"]');
  }
}

// Export the CLASS (not an instance) so callers can do: new ProductPage()
export default ProductPage;
