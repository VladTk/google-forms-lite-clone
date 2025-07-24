describe('HomePage', () => {
  const graphqlUrl = 'http://localhost:4000/graphql';

  const interceptLoading = () => {
    cy.intercept('POST', graphqlUrl, (req) => {
      if (req.body.operationName === 'GetForms') {
        req.on('response', (res) => {
          res.setDelay(1000);
        });
      }
    }).as('getForms');
  };

  const interceptError = () => {
    cy.intercept('POST', graphqlUrl, (req) => {
      req.reply({
        statusCode: 500,
        body: { errors: [{ message: 'Internal Server Error' }] },
      });
    }).as('getFormsError');
  };

  const interceptSuccess = (mockForms) => {
    cy.intercept('POST', graphqlUrl, (req) => {
      req.reply({
        body: { data: { forms: mockForms } },
      });
    }).as('getFormsSuccess');
  };

  it('displays loading state', () => {
    interceptLoading();

    cy.visit('/');
    cy.get('[data-cy="home-loading"]').should('exist');
    cy.wait('@getForms');
  });

  it('displays error message on failure', () => {
    interceptError();

    cy.visit('/');
    cy.wait('@getFormsError');

    cy.get('[data-cy="inline-message"]').should('exist');
    cy.get('[data-cy="inline-message-title"]').should('contain', 'Error loading forms');
    cy.get('[data-cy="inline-message-action"]').should('contain', 'Retry');
  });

  it('displays list of forms when successful', () => {
    const mockForms = [
      { id: '1', title: 'Survey A', description: 'Description A' },
      { id: '2', title: 'Survey B', description: 'Description B' },
    ];

    interceptSuccess(mockForms);

    cy.visit('/');
    cy.wait('@getFormsSuccess');

    cy.get('[data-cy="form-list"]').should('exist');
    cy.get('[data-cy="form-new-card"]').should('exist');
    cy.get('[data-cy="form-item"]').should('have.length', mockForms.length);
    cy.get('[data-cy="form-title"]').first().should('contain', 'Survey B');
  });
});
