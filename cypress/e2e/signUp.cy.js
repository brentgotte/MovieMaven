describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')

    // open sign up modal
    cy.get('button').contains('Sign Up').click()

    // check of de sign up modal zichtbaar is
    cy.get('[aria-labelledby="modal-modal-title"]').should('be.visible');

    // vul de email en wachtwoord velden in
    cy.get('#standard-input').type('goedemansniek@gmail.com');
    cy.get('#standard-password-input').type('niek123');

    // klik op het email veld
    cy.get('#standard-input').click()

    // klik op de sign up button om het account aan te maken
    cy.get('button[id="sign-up-button"]').click()
  })
})