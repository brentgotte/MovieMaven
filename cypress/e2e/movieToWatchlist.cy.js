describe('Add movie to watchlist', () => {
    it('passes', () => {
        cy.visit('http://localhost:3000/')
    
         // Open login model
    cy.get('button[id="open-login-modal"]').click()

    // Assert that the login modal is open
    cy.get('[aria-labelledby="modal-modal-title"]').should('be.visible');

    // Fill in the email and password fields
    cy.get('#standard-input').type('niekgoedemans93@gmail.com');
    cy.get('#standard-password-input').type('niek123');

    // Log in
    cy.get('button[id="login-button"]').click()

    // Assert that the login modal is closed
    cy.get('[aria-labelledby="modal-modal-title"]').should('not.be.visible');

    cy.contains('img[id="profileImg"]').should('be.visible')
    })
})