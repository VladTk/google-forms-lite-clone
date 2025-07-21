import { v4 as uuid } from 'uuid';
import { forms } from '../store/store';
import { QuestionType, Form, FormInput } from '../../../shared/src/types';

export const formResolver = {
  Query: {
    forms: (): Form[] => Array.from(forms.values()),
    form: (_: unknown, { id }: { id: Form['id'] }): Form | undefined =>
      forms.get(id),
  },

  Mutation: {
    createForm: (_: unknown, args: FormInput): Form => {
      const { title, description = '', questions = [] } = args;

      for (const q of questions) {
        if (
          (q.type === QuestionType.MULTIPLE_CHOICE ||
            q.type === QuestionType.CHECKBOX) &&
          (!q.options || q.options.length === 0)
        ) {
          throw new Error(
            `Question of type ${q.type} requires at least one option.`,
          );
        }
      }

      const serverQuestions = questions.map(q => ({
        id: uuid(),
        type: q.type,
        label: q.label,
        required: q.required ?? false,
        options:
          q.options?.map(opt => ({ id: uuid(), label: opt.label })) ?? [],
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
