import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Response as Resp, ResponseInput } from '@shared/types';

type GraphQLResponse<T> = {
  data: T;
}

export const responsesApi = createApi({
  reducerPath: 'responsesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/graphql',
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Response'],
  endpoints: build => ({
    getResponses: build.query<Resp[], string>({
      query: formId => ({
        url: '',
        method: 'POST',
        body: {
          query: `
            query ($formId: ID!) {
              responses(formId: $formId) {
                id
                formId
                answers {
                  questionId
                  value
                  values
                }
              }
            }
          `,
          variables: { formId },
        },
      }),
      transformResponse: (response: GraphQLResponse<{ responses: Resp[] }>) =>
        response.data.responses,
      providesTags: (result = []) =>
        result.map(({ id }) => ({ type: 'Response' as const, id })),
    }),

    submitResponse: build.mutation<Resp, ResponseInput>({
      query: payload => ({
        url: '',
        method: 'POST',
        body: {
          query: `
            mutation ($formId: ID!, $answers: [AnswerInput!]!) {
              submitResponse(formId: $formId, answers: $answers) {
                id
                formId
                answers {
                  questionId
                  value
                  values
                }
              }
            }
          `,
          variables: payload,
        },
      }),
      transformResponse: (
        response: GraphQLResponse<{ submitResponse: Resp }>,
      ) => response.data.submitResponse,
      invalidatesTags: result =>
        result ? [{ type: 'Response', id: result.formId }] : [],
    }),
  }),
});

export const { useGetResponsesQuery, useSubmitResponseMutation } = responsesApi;
