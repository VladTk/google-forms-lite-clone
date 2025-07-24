/// <reference types="cypress" />

import { graphqlUrl } from '../support/constants';

const formId = '123';
const pageUrl = `/forms/${formId}/fill`;

describe('FormFillPage', () => {
  const mockForm = {
    id: formId,
    title: 'Customer Feedback',
    description: 'Please fill this survey',
    questions: [
      {
        id: 'q1',
        type: 'TEXT',
        label: 'How was the service?',
        required: true,
        options: [],
      },
      {
        id: 'q2',
        type: 'MULTIPLE_CHOICE',
        label: 'Would you return?',
        required: false,
        options: [
          { id: 'opt1', label: 'Yes' },
          { id: 'opt2', label: 'No' },
        ],
      },
    ],
  };

  it('shows loading state', () => {
    cy.intercept('POST', graphqlUrl, req => {
      if (req.body.operationName === 'GetForm') {
        req.on('response', res => {
          res.setDelay(1000);
        });
      }
    }).as('getFormLoading');

    cy.visit(pageUrl);
    cy.get('[data-cy="form-fill-form"]').should('not.exist');
  });

  it('shows error state with retry', () => {
    cy.intercept('POST', graphqlUrl, req => {
      req.reply({
        statusCode: 500,
        body: {
          errors: [{ message: 'Internal Server Error' }],
        },
      });
    }).as('getFormError');

    cy.visit(pageUrl);
    cy.wait('@getFormError');

    cy.get('[data-cy="inline-message"]').should('exist');
    cy.get('[data-cy="inline-message-title"]').should(
      'contain',
      'Error loading form',
    );
    cy.get('[data-cy="inline-message-description"]').should(
      'contain',
      'Please try again later.',
    );
    cy.get('[data-cy="inline-message-action"]').click();
  });

  it('renders form and validates required question', () => {
    cy.intercept('POST', graphqlUrl, req => {
      const q = req.body.query;

      if (q.includes('form(id')) {
        req.reply({
          body: {
            data: { form: mockForm },
          },
        });
      }
    }).as('getFormSuccess');

    cy.visit(pageUrl);
    cy.wait('@getFormSuccess');

    cy.get('[data-cy="form-fill-form"]').should('exist');
    cy.get('[data-cy="form-meta"]').should('contain', 'Customer Feedback');

    cy.get('[data-cy="form-fill-submit-btn"]').click();
    cy.get('[data-cy="question-error"]').should(
      'contain',
      'This field is required',
    );
  });

  it('submits successfully and shows toast', () => {
    cy.intercept('POST', graphqlUrl, req => {
      const q = req.body.query;

      if (q.includes('form(id')) {
        req.reply({
          body: {
            data: { form: mockForm },
          },
        });
      }

      if (q.includes('submitResponse')) {
        req.reply({
          body: { data: { submitResponse: true } },
        });
      }
    }).as('submitSuccess');

    cy.visit(pageUrl);

    cy.get('[data-cy="question-input-text-q1"]').type('Great service!');
    cy.get('[data-cy="question-input-mc-option-q2-opt1"]').click();
    cy.get('[data-cy="form-fill-submit-btn"]').click();

    cy.wait('@submitSuccess');
    cy.contains('Response submitted successfully!').should('exist');
  });

  it('handles submit error and shows toast', () => {
    cy.intercept('POST', graphqlUrl, req => {
      const q = req.body.query;

      if (q.includes('form(id')) {
        req.reply({
          body: {
            data: { form: mockForm },
          },
        });
      }

      if (q.includes('submitResponse')) {
        req.reply({
          statusCode: 500,
          body: {
            errors: [{ message: 'Something went wrong' }],
          },
        });
      }
    }).as('submitError');

    cy.visit(pageUrl);
    cy.get('[data-cy="question-input-text-q1"]').type('Bad service...');
    cy.get('[data-cy="form-fill-submit-btn"]').click();

    cy.wait('@submitError');
    cy.contains('Failed to submit response').should('exist');
  });
});
