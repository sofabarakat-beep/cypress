class LoginPage {
  visit() {
    cy.visit("/auth/login");
  }

  getEmailInput() {
    return cy.get('[data-test="email"]');
  }

  getPasswordInput() {
    return cy.get('[data-test="password"]');
  }

  getSubmitButton() {
    return cy.get('[data-test="login-submit"]');
  }

  getErrorMessage() {
    return cy.get('[data-test="login-error"]');
  }

  login(email, password) {
    this.getEmailInput().clear().type(email);
    this.getPasswordInput().clear().type(password);
    this.getSubmitButton().click();
  }
}

export default new LoginPage();
