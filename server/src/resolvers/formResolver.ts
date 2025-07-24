import { v4 as uuid } from 'uuid';
import { forms } from '../store/store';
import { QuestionType, Form, FormInput } from '@shared/types';

export const formResolver = {
  Query: {
    forms: (): Form[] => Array.from(forms.values()),
    form: (_: unknown, { id }: { id: Form['id'] }): Form | undefined =>
      forms.get(id),
  },

  Mutation: {
    createForm: (_: unknown, args: FormInput): Form => {
      const { title, description = '', questions = [] } = args;

      for (const question of questions) {
        if (
          (question.type === QuestionType.MULTIPLE_CHOICE ||
            question.type === QuestionType.CHECKBOX) &&
          (!question.options || question.options.length === 0)
        ) {
          throw new Error(
            `Question of type ${question.type} requires at least one option.`,
          );
        }
      }

      const serverQuestions = questions.map(question => ({
        id: uuid(),
        type: question.type,
        label: question.label,
        required: question.required ?? false,
        options:
          question.options?.map(opt => ({ id: uuid(), label: opt.label })) ??
          [],
      }));

      const form: Form = {
        id: uuid(),
        title,
        description,
        questions: serverQuestions,
      };

      forms.set(form.id, form);
      return form;
    },
  },
};
