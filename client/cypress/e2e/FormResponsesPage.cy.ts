/// <reference types="cypress" />

import { graphqlUrl } from '../support/constants';
import { interceptLoading, interceptError } from '../support/interceptors';

const formId = '1';
const pageUrl = `/forms/${formId}/responses`;

describe('FormResponsesPage', () => {
  it('shows loading state with skeletons', () => {
    interceptLoading('getFormLoading');
    cy.visit(pageUrl);
    cy.get('[data-cy="response-answers-skeleton"]').should('exist');
    cy.get('[data-cy="answer-item-skeleton"]').should('have.length', 4);
  });

  it('shows error state with retry', () => {
    interceptError('getFormError');
    cy.visit(pageUrl);
    cy.wait('@getFormError');

    cy.get('[data-cy="inline-message"]').should('exist');
    cy.get('[data-cy="inline-message-title"]').should('contain', 'Failed to load data');
    cy.get('[data-cy="inline-message-description"]').should(
      'contain',
      'An error occurred while loading the form or responses',
    );
    cy.get('[data-cy="inline-message-action"]').should('contain', 'Retry');
  });

  it('shows empty state when there are no responses', () => {
    cy.intercept('POST', graphqlUrl, req => {
      const q = req.body.query;

      if (q.includes('form(id')) {
        req.reply({
          body: {
            data: {
              form: {
                id: formId,
                title: 'Empty Form',
                description: 'No responses yet',
                questions: [],
              },
            },
          },
        });
      }

      if (q.includes('responses(formId')) {
        req.reply({
          body: {
            data: {
              responses: [],
            },
          },
        });
      }
    }).as('getFormEmpty');

    cy.visit(pageUrl);
    cy.wait('@getFormEmpty');

    cy.get('[data-cy="inline-message-title"]').should('contain', 'No responses yet');
    cy.get('[data-cy="inline-message-description"]').should(
      'contain',
      "Once users submit responses, you'll see them here",
    );
  });

  it('shows form responses and allows navigation', () => {
    cy.intercept('POST', graphqlUrl, req => {
      const q = req.body.query;

      if (q.includes('form(id')) {
        req.reply({
          body: {
            data: {
              form: {
                id: formId,
                title: 'Customer Feedback',
                description: 'Monthly feedback survey',
                questions: [
                  {
                    id: 'q1',
                    type: 'TEXT',
                    label: 'How was the service?',
                    required: false,
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
              },
            },
          },
        });
      }

      if (q.includes('responses(formId')) {
        req.reply({
          body: {
            data: {
              responses: [
                {
                  id: 'r1',
                  formId,
                  answers: [
                    { questionId: 'q1', value: 'Great!' },
                    { questionId: 'q2', value: 'Yes' },
                  ],
                },
                {
                  id: 'r2',
                  formId,
                  answers: [
                    { questionId: 'q1', value: 'Okay' },
                    { questionId: 'q2', value: 'No' },
                  ],
                },
              ],
            },
          },
        });
      }
    }).as('getFormAndResponses');

    cy.visit(pageUrl);
    cy.wait('@getFormAndResponses');

    cy.get('[data-cy="form-meta"]').should('exist');
    cy.get('[data-cy="response-answers"]').should('exist');

    cy.get('[data-cy="answer-label"]').first().should('contain', 'How was the service?');
    cy.get('[data-cy="answer-value"]').first().should('contain', 'Great!');

    cy.get('[data-cy="control-counter"]').should('contain', '1 / 2');
    cy.get('[data-cy="control-next"]').should('not.be.disabled').click();
    cy.get('[data-cy="answer-value"]').first().should('contain', 'Okay');
    cy.get('[data-cy="control-counter"]').should('contain', '2 / 2');

    cy.get('[data-cy="control-prev"]').should('not.be.disabled').click();
    cy.get('[data-cy="control-counter"]').should('contain', '1 / 2');
  });
});
