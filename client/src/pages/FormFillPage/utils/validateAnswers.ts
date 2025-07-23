import { type Question, QuestionType, type Answer } from '@shared/types';

export const validateAnswers = (
  questions: Question[],
  answers: Record<string, Answer['value'] | Answer['values']>,
): Record<string, string> => {
  const errors: Record<string, string> = {};

  questions.forEach(question => {
    if (!question.required) return;

    const value = answers[question.id];

    switch (question.type) {
      case QuestionType.TEXT:
        if (typeof value !== 'string' || value.trim() === '') {
          errors[question.id] = 'This field is required';
        }
        break;

      case QuestionType.DATE:
      case QuestionType.MULTIPLE_CHOICE:
        if (!value || value === '') {
          errors[question.id] = 'Please select a value';
        }
        break;

      case QuestionType.CHECKBOX:
        if (!Array.isArray(value) || value.length === 0) {
          errors[question.id] = 'Please select at least one option';
        }
        break;
    }
  });

  return errors;
};
