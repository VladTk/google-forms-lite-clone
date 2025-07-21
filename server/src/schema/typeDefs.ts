export const typeDefs = `
  enum QuestionType {
    TEXT
    MULTIPLE_CHOICE
    CHECKBOX
    DATE
  }

  type QuestionOption {
    id: ID!
    label: String!
  }

  input QuestionOptionInput {
    label: String!
  }

  type Question {
    id: ID!
    type: QuestionType!
    label: String!
    required: Boolean!
    options: [QuestionOption!]
  }

  input QuestionInput {
    type: QuestionType!
    label: String!
    required: Boolean = false
    options: [QuestionOptionInput!]
  }

  type Form {
    id: ID!
    title: String!
    description: String!
    questions: [Question!]!
  }

  input AnswerInput {
    questionId: ID!
    value: String
    values: [String!]
  }

  type Answer {
    questionId: ID!
    value: String
    values: [String!]
  }

  type Response {
    id: ID!
    formId: ID!
    answers: [Answer!]!
  }

  type Query {
    forms: [Form!]!
    form(id: ID!): Form
    responses(formId: ID!): [Response!]!
  }

  type Mutation {
    createForm(
      title: String!
      description: String = ""
      questions: [QuestionInput!]!
    ): Form!

    submitResponse(
      formId: ID!
      answers: [AnswerInput!]!
    ): Response!
  }
`;
