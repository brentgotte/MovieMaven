describe("Add movie to watchlist", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");

    // Open login model
    cy.get('button[id="open-login-modal"]').click();

    // Assert that the login modal is open
    cy.get('[aria-labelledby="modal-modal-title"]').should("be.visible");

    // Fill in the email and password fields
    cy.get("#standard-input").type("niekgoedemans93@gmail.com");
    cy.get("#standard-password-input").type("niek123");

    // Log in
    cy.get('button[id="login-button"]').click();

    // Assert that de profile icon is visible
    cy.get('div[id="profileIcon"]').should("be.visible");

    // Click on the first movie
    cy.get(".hover\\:cursor-pointer").first().click();

    // Assert that the movie details page is open by icon
    cy.get('p[id="addIcon"]').should("be.visible");

    // Click on the add icon
    cy.get('p[id="addIcon"]').click();

    // wait for user data to be loaded
    cy.wait(2000);

    // Assert that add modal is open
    cy.contains("Add to watchlist").should("be.visible");

    // Click add to watchlist
    cy.get('button[id="watchButton"]').click();

    
    // Assert that the movie is added to the watchlist
    cy.contains("Added successfully!").should("be.visible");
    
    // pause to wait for the api call
    cy.wait(2000);

    // Click on home
    cy.contains("Home").click();
  });
});
