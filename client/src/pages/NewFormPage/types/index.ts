import type { QuestionInput, QuestionOptionInput } from '@shared/types';

export type LocalQuestionOption = QuestionOptionInput & { tempId: string };

export type LocalQuestion = Omit<QuestionInput, 'options'> & {
  tempId: string;
  options?: LocalQuestionOption[];
};
