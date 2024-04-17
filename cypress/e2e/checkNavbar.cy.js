describe("navbar check", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");

    cy.get('button').contains('Log In').click()

    // Assert that the login modal is open
    cy.get('[aria-labelledby="modal-modal-title"]').should('be.visible');

    // Fill in the email and password fields
    cy.get('#standard-input').type('niekgoedemans93@gmail.com');
    cy.get('#standard-password-input').type('niek123');

    // Log in
    cy.get('button[id="login-button"]').click()

    // check of navbar zichtbaar is
    cy.get("#navbar").should("be.visible");

    // check of alle links zichtbaar zijn
    cy.get("a").contains("Home").should("be.visible");
    cy.get("a").contains("Movies").should("be.visible");

    // check of alle links werken en naar de juiste pagina word gestuurd, en op die pagina of de navbar zichtbaar is
    cy.get("a").contains("Movies").click();
    cy.url().should("include", "/movies");
    cy.get("#navbar").should("be.visible");
    
    cy.get("a").contains("Home").click();
    cy.url().should("include", "/");
    cy.get("#navbar").should("be.visible");

    // check of de films zichtbaar zijn door id "movieCard" en klik daarna op de eerste film
    cy.get('#movieCard').should('be.visible');
    cy.get('#movieCard').first().click();

    // check of de filmpagina is geladen door te kijken naar de url
    cy.wait(3000);
    cy.url().should('include', '/movie/');

    // check of de navbar zichtbaar is
    cy.get("#navbar").should("be.visible");
  });
});
