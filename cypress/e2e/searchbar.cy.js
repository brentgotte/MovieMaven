describe('template spec', () => {
  it('passes', () => {
    cy.visit("http://localhost:3000/");

    // klik op de searchbar en typ 'a' in
    cy.get('input').click();
    cy.get('input').type('a');

    cy.wait(1500);
    // check of de search results zichtbaar zijn
    cy.get('#movie-result-count').should('be.visible');
    cy.get('#movie-result-count').click();

    cy.get(2500);

    // klik aan de linkerkant van de pagina
    cy.get('body').click('left');

    cy.wait(1000);
    cy.get('input').invoke('val').then((searchTerm) => {
      // loop door alle films op de pagina en controleer of elke film in de lijst van de zoekresultaten de letter "a" in de titel bevat
      cy.get('#resultMovieList').children().each(($el) => {
        cy.get($el).find('#movieTitle').invoke('text').then((text) => {
          const title = text.toLowerCase();
          expect(title).to.include(searchTerm.toLowerCase());
        });
      });
    });
    cy.wait(3000);

    cy.get('input').clear();
    cy.get('input').type('indiana');

    cy.wait(1500);

    cy.get('#movie-result-count').should('be.visible');
    cy.get('#movie-result-count').click();

    cy.get(2500);

    // klik aan de linkerkant van de pagina
    cy.get('body').click('left');

    cy.wait(1000);

    cy.get('input').invoke('val').then((searchTerm) => {
      // loop door alle films op de pagina en controleer of elke film in de lijst van de zoekresultaten de letter "a" in de titel bevat
      cy.get('#resultMovieList').children().each(($el) => {
        cy.get($el).find('#movieTitle').invoke('text').then((text) => {
          const title = text.toLowerCase();
          expect(title).to.include(searchTerm.toLowerCase());
        });
      });
    });
    cy.wait(1000);
    // verander de search query naar 'Talk to me' en check of de search results de film 'Talk to me' bevat en klik daar op
    cy.get('input').clear();
    cy.get('input').type('elemental');

    cy.wait(1500);

    cy.get('#movie-result-count').should('be.visible');
    cy.get('#movie-result-count').click();

    cy.get(2500);

    // klik aan de linkerkant van de pagina
    cy.get('body').click('left');

    cy.wait(1000);

    cy.get('input').invoke('val').then((searchTerm) => {
      // loop door alle films op de pagina en controleer of elke film in de lijst van de zoekresultaten de letter "a" in de titel bevat
      cy.get('#resultMovieList').children().each(($el) => {
        cy.get($el).find('#movieTitle').invoke('text').then((text) => {
          const title = text.toLowerCase();
          expect(title).to.include(searchTerm.toLowerCase());
        });
      });
    });

    cy.wait(1000);
    // verander de search query naar 'Talk to me' en check of de search results de film 'Talk to me' bevat en klik daar op
    cy.get('input').clear();
    cy.get('input').type('barbie');

    cy.wait(1500);

    cy.get('#movie-result-count').should('be.visible');
    cy.get('#movie-result-count').click();

    cy.get(2500);

    // klik aan de linkerkant van de pagina
    cy.get('body').click('left');

    cy.wait(1000);

    cy.get('input').invoke('val').then((searchTerm) => {
      // loop door alle films op de pagina en controleer of elke film in de lijst van de zoekresultaten de letter "a" in de titel bevat
      cy.get('#resultMovieList').children().each(($el) => {
        cy.get($el).find('#movieTitle').invoke('text').then((text) => {
          const title = text.toLowerCase();
          expect(title).to.include(searchTerm.toLowerCase());
        });
      });
    });

  })
})