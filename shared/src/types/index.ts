export enum QuestionType {
  TEXT = 'TEXT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
}

export type QuestionOption = {
  id: string;
  label: string;
};

export type Question = {
  id: string;
  type: QuestionType;
  label: string;
  required?: boolean;
  options?: QuestionOption[];
};

export type Form = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};

export type Answer = {
  questionId: string;
  value?: string;
  values?: string[];
};

export type Response = {
  id: string;
  formId: string;
  answers: Answer[];
};

export type QuestionOptionInput = Omit<QuestionOption, 'id'>;

export type QuestionInput = Omit<Question, 'id' | 'options'> & {
  options?: QuestionOptionInput[];
};

export type FormInput = Omit<Form, 'id' | 'questions'> & {
  questions?: QuestionInput[];
};

export type ResponseInput = Omit<Response, 'id'>;