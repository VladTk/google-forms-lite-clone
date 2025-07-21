import { v4 as uuid } from 'uuid';
import { forms, responses } from '../store/store';
import { ResponseInput, Response as Resp } from '../../../shared/src/types';

export const responseResolver = {
  Query: {
    responses: (_: unknown, { formId }: { formId: Resp['formId'] }): Resp[] =>
      Array.from(responses.values()).filter(r => r.formId === formId),
  },

  Mutation: {
    submitResponse: (_: unknown, input: ResponseInput): Resp => {
      const { formId, answers } = input;

      const form = forms.get(formId);
      if (!form) {
        throw new Error('Form not found');
      }

      const validQuestionIds = new Set(form.questions.map(q => q.id));

      for (const answer of answers) {
        const { questionId, value, values } = answer;

        if (!validQuestionIds.has(questionId)) {
          throw new Error(`Invalid questionId: ${questionId}`);
        }

        if (value == null && values == null) {
          throw new Error(
            `Answer must have either value or values for questionId: ${questionId}`,
          );
        }

        if (value != null && values != null) {
          throw new Error(
            `Answer cannot have both value and values for questionId: ${questionId}`,
          );
        }
      }

      const response: Resp = {
        id: uuid(),
        formId,
        answers,
      };

      responses.set(response.id, response);
      return response;
    },
  },
};
