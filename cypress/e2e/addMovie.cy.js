describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");

    cy.wait(2000);

    cy.get("button").contains("Log In").click();

    cy.wait(1000);
    // Assert that the login modal is open
    cy.get('[aria-labelledby="modal-modal-title"]').should("be.visible");

    // Fill in the email and password fields
    cy.get("#standard-input").type("niekgoedemans93@gmail.com");
    cy.get("#standard-password-input").type("niek123");

    // Log in
    cy.get('button[id="login-button"]').click();

    cy.wait(3000);

    // check of de lgoin button niet meer zichtbaar is
    cy.get("button").contains("Log In").should("not.exist");

    // check of de films zichtbaar zijn door id "movieCard" en klik daarna op de eerste film
    cy.get(".movieCard").should("be.visible");
    cy.get(".movieCard").eq(0).click();

    // check of de filmpagina is geladen door te kijken naar de url
    cy.wait(3000);
    cy.url().should("include", "/movie/");

    // check of de add to watchlist button zichtbaar is door een div met een id van "addToWatchlist" te zoeken en klik erop
    cy.get("#addToWatchlist").should("be.visible");
    cy.get("#addToWatchlist").click();

    // check of de button met id WantToWatchButton zichtbaar is en klik erop
    cy.get("#wantToWatchButton").should("be.visible");
    cy.wait(2000);
    cy.get("#wantToWatchButton").click();

    // check of de button met id wantToWatchButton niet meer zichtbaar is
    cy.get("#wantToWatchButton").should("not.exist");

    // klik op movies in de navbar
    cy.get("a").contains("Movies").click();

    cy.get(".movieCard").should("be.visible");
    cy.get(".movieCard").eq(1).click();

    // check of de filmpagina is geladen door te kijken naar de url
    cy.wait(3000);
    cy.url().should("include", "/movie/");

    // check of de add to watchlist button zichtbaar is door een div met een id van "addToWatchlist" te zoeken en klik erop
    cy.get("#addToWatchlist").should("be.visible");
    cy.get("#addToWatchlist").click();

    // check of de button met id WantToWatchButton zichtbaar is en klik erop
    cy.get("#wantToWatchButton").should("be.visible");
    cy.wait(2000);
    cy.get("#wantToWatchButton").click();

    // check of de button met id wantToWatchButton niet meer zichtbaar is
    cy.get("#wantToWatchButton").should("not.exist");

    // klik op movies in de navbar
    cy.get("a").contains("Movies").click();

    cy.get(".movieCard").should("be.visible");
    cy.get(".movieCard").eq(2).click();

    // check of de filmpagina is geladen door te kijken naar de url
    cy.wait(3000);
    cy.url().should("include", "/movie/");

    // check of de add to watchlist button zichtbaar is door een div met een id van "addToWatchlist" te zoeken en klik erop
    cy.get("#addToWatchlist").should("be.visible");
    cy.get("#addToWatchlist").click();

    // check of de button met id WantToWatchButton zichtbaar is en klik erop
    cy.get("#haveWatchedButton").should("be.visible");
    cy.wait(2000);
    cy.get("#haveWatchedButton").click();

    // check of de button met id wantToWatchButton niet meer zichtbaar is
    cy.get("#haveWatchedButton").should("not.exist");

    // check of de profile picture zichtbaar is door een id te zoeken met "profilePic" en klik erop
    cy.get("#profilePic").should("be.visible");
    cy.get("#profilePic").click();

    cy.wait(2000);

    cy.get("#profileLink").should("be.visible");
    cy.get("#profileLink").click();

    cy.wait(3000);

    cy.get("#default-carousel").should("be.visible");

    cy.wait(500);

    cy.get("#viewAllMoviesProfile").should("be.visible");
    cy.get("#viewAllMoviesProfile").click();

    cy.wait(3000);

    cy.get(".watchListCard").eq(0).contains("On watchlist");
    cy.get(".watchListCard").eq(1).contains("On watchlist");
    cy.get(".watchListCard").eq(2).contains("Watched");

    cy.wait(500);
    // get title of second movie
    cy.get(".watchListCard")
      .eq(1)
      .find("#movieTitle")
      .invoke("text")
      .then((text) => {
        const title = text;
        expect(title).to.exist;

        cy.get(".watchListCard").eq(1).find("#deleteButton").click();

        cy.wait(1000);
        
        cy.contains(".watchListCard", title).should("not.exist");
      });
  });
});
