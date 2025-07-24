/// <reference types='cypress' />

describe('NotFoundPage', () => {
  it('should display proper content and navigate back to Home', () => {

    cy.visit('/qwerty', { failOnStatusCode: false });

    cy.get('[data-cy="not-found-title"]')
      .should('be.visible')
      .and('contain', 'Page Not Found');

    cy.get('[data-cy="not-found-description"]')
      .should('be.visible')
      .and('contain', "Sorry, the page you're looking for doesn't exist");

    cy.get('[data-cy="not-found-home-btn"]')
      .should('be.visible')
      .click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
