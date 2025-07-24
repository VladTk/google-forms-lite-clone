/// <reference types="cypress" />

import { graphqlUrl } from '../support/constants';
import { interceptLoading, interceptError } from '../support/interceptors';

const mockForms = [
  { id: '1', title: 'Survey A', description: 'Description A' },
  { id: '2', title: 'Survey B', description: 'Description B' },
];

describe('HomePage', () => {
  it('displays loading state', () => {
    interceptLoading('getForms');

    cy.visit('/');
    cy.get('[data-cy="home-loading"]').should('exist');
    cy.wait('@getForms');
  });

  it('displays error message on failure', () => {
    interceptError('getFormsError');

    cy.visit('/');
    cy.wait('@getFormsError');

    cy.get('[data-cy="inline-message"]').should('exist');
    cy.get('[data-cy="inline-message-title"]').should('contain', 'Error loading forms');
    cy.get('[data-cy="inline-message-action"]').should('contain', 'Retry');
  });

  it('displays list of forms when successful', () => {
    cy.intercept('POST', graphqlUrl, req => {
      req.reply({
        body: { data: { forms: mockForms } },
      });
    }).as('getFormsSuccess');

    cy.visit('/');
    cy.wait('@getFormsSuccess');

    cy.get('[data-cy="form-list"]').should('exist');
    cy.get('[data-cy="form-new-card"]').should('exist');
    cy.get('[data-cy="form-item"]').should('have.length', mockForms.length);
    cy.get('[data-cy="form-title"]').first().should('contain', 'Survey B');
  });
});
