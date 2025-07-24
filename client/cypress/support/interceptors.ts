import { graphqlUrl } from "./constants";


export const interceptLoading = (alias: string, delay = 1000) => {
  cy.intercept('POST', graphqlUrl, req => {
    req.on('response', res => {
      res.setDelay(delay);
    });
  }).as(alias);
};

export const interceptError = (alias: string) => {
  cy.intercept('POST', graphqlUrl, req => {
    req.reply({
      statusCode: 500,
      body: { errors: [{ message: 'Internal Server Error' }] },
    });
  }).as(alias);
};