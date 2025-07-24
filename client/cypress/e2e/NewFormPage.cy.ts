/// <reference types="cypress" />

import { graphqlUrl } from '../support/constants';

describe('NewFormPage', () => {
  beforeEach(() => {
    cy.visit('/forms/new');
  });

  it('renders initial empty form', () => {
    cy.get('[data-cy="form-title-input"]')
      .should('exist')
      .and('have.value', '');
    cy.get('[data-cy="form-description-textarea"]')
      .should('exist')
      .and('have.value', '');
    cy.get('[data-cy^="question-input-"]').should('have.length', 1);
  });

  it('shows validation errors on empty publish', () => {
    cy.get('[data-cy^="delete-question-btn-"]').first().click();
    cy.get('[data-cy="publish-btn"]').click();
    cy.get('[data-cy="title-error"]').should(
      'contain',
      'Title cannot be empty',
    );
    cy.get('[data-cy="description-error"]').should(
      'contain',
      'Description cannot be empty',
    );
    cy.get('[data-cy="form-error"]').should(
      'contain',
      'The form must contain at least one question',
    );
  });

  it('adds and removes a question', () => {
    cy.get('[data-cy="add-question-btn"]').click();
    cy.get('[data-cy^="question-input-"]').should('have.length', 2);

    cy.get('[data-cy^="delete-question-btn-"]').last().click();
    cy.get('[data-cy^="question-input-"]').should('have.length', 1);
  });

  it('adds and removes options in multiple choice question', () => {
    cy.get('[data-cy^="question-input-"]')
      .first()
      .type('What is your favorite color?');
    cy.get('[data-cy^="question-type-dropdown-"]').click();
    cy.get('[data-cy="dropdown-item-Multiple choice"]').click();
    cy.get('[data-cy^="add-option-btn-"]').click();
    cy.get('[data-cy^="option-input-"]').should('have.length', 1);
    cy.get('[data-cy^="option-delete-btn-"]').click();
    cy.get('[data-cy^="option-input-"]').should('not.exist');
  });

  it('fills the form and publishes successfully', () => {
    cy.get('[data-cy="form-title-input"]').type('Customer Survey');
    cy.get('[data-cy="form-description-textarea"]').type('Help us improve');

    cy.get('[data-cy^="question-input-"]')
      .first()
      .type('How satisfied are you?');

    cy.intercept('POST', graphqlUrl, req => {
      const q = req.body.query;

      if (q.includes('createForm')) {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              createForm: {
                id: 'new-form-id',
                title: 'Customer Survey',
                description: 'Help us improve',
                questions: [
                  {
                    id: 'question-1',
                    type: 'TEXT',
                    label: 'How satisfied are you?',
                    required: false,
                    options: [],
                  },
                ],
              },
            },
          },
        });
      }
    }).as('createForm');

    cy.get('[data-cy="publish-btn"]').click();
    cy.wait('@createForm');

    cy.contains('Form created successfully!').should('exist');
  });

  it('shows error toast when form creation fails', () => {
    cy.get('[data-cy="form-title-input"]').type('Buggy Form');
    cy.get('[data-cy="form-description-textarea"]').type('Will fail');
    cy.get('[data-cy^="question-input-"]').first().type('Test?');

    cy.intercept('POST', graphqlUrl, req => {
      req.reply({
        statusCode: 500,
        body: {
          errors: [{ message: 'Something went wrong' }],
        },
      });
    }).as('createFormError');

    cy.get('[data-cy="publish-btn"]').click();
    cy.wait('@createFormError');

    cy.contains('Failed to create form. Please try again').should('exist');
  });
});
