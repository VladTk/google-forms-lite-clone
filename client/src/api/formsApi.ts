import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Form, FormInput } from '@shared/types';

type GraphQLResponse<T> = {
  data: T;
}

export const formsApi = createApi({
  reducerPath: 'formsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/graphql',
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Form'],
  endpoints: build => ({
    getForms: build.query<Form[], void>({
      query: () => ({
        url: '',
        method: 'POST',
        body: {
          query: `
            query {
              forms {
                id title description
                questions {
                  id type label required
                  options { id label }
                }
              }
            }
          `,
        },
      }),
      transformResponse: (response: GraphQLResponse<{ forms: Form[] }>) =>
        response.data.forms,
      providesTags: (result = []) =>
        result
          .map(({ id }) => ({ type: 'Form' as const, id }))
          .concat({ type: 'Form', id: 'LIST' }),
    }),

    getForm: build.query<Form, string>({
      query: id => ({
        url: '',
        method: 'POST',
        body: {
          query: `
            query ($id: ID!) {
              form(id: $id) {
                id title description
                questions {
                  id type label required
                  options { id label }
                }
              }
            }
          `,
          variables: { id },
        },
      }),
      transformResponse: (response: GraphQLResponse<{ form: Form }>) =>
        response.data.form,
      providesTags: result => (result ? [{ type: 'Form', id: result.id }] : []),
    }),

    createForm: build.mutation<Form, FormInput>({
      query: newForm => ({
        url: '',
        method: 'POST',
        body: {
          query: `
            mutation ($title: String!, $description: String, $questions: [QuestionInput!]!) {
              createForm(title: $title, description: $description, questions: $questions) {
                id title description
                questions {
                  id type label required
                  options { id label }
                }
              }
            }
          `,
          variables: newForm,
        },
      }),
      transformResponse: (response: GraphQLResponse<{ createForm: Form }>) =>
        response.data.createForm,
      invalidatesTags: [{ type: 'Form', id: 'LIST' }],
    }),
  }),
});

export const { useGetFormsQuery, useGetFormQuery, useCreateFormMutation } =
  formsApi;
