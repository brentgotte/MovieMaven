const { contains } = require("cypress/types/jquery")

describe('Log in functionality', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')

    // Open login model
    cy.get('button').contains('Log In').click()

    // Assert that the login modal is open
    cy.get('[aria-labelledby="modal-modal-title"]').should('be.visible');

    // Fill in the email and password fields
    cy.get('#standard-input').type('niekgoedemans93@gmail.com');
    cy.get('#standard-password-input').type('niek123');

    // Log in
    cy.get('button[id="login-button"]').click()

  })
})