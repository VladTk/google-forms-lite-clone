import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { LocalQuestion, LocalQuestionOption } from '../types';
import { QuestionType, type QuestionInput } from '@shared/types';

export function useLocalQuestions(initialQuestions: QuestionInput[] = []) {
  const initLocalQuestions = (questions: QuestionInput[]): LocalQuestion[] =>
    questions.map(question => ({
      ...question,
      tempId: uuidv4(),
      options: question.options?.map(opt => ({ ...opt, tempId: uuidv4() })),
    }));

  const [questions, setQuestions] = useState<LocalQuestion[]>(
    initLocalQuestions(initialQuestions),
  );

  const createLocalQuestion = (): LocalQuestion => ({
    tempId: uuidv4(),
    label: '',
    type: QuestionType.TEXT,
    required: false,
    options: [],
  });

  const addQuestion = useCallback(() => {
    setQuestions(qs => [...qs, createLocalQuestion()]);
  }, []);

  const updateQuestion = useCallback(
    (tempId: string, updatedFields: Partial<LocalQuestion>) => {
      setQuestions(prevQuestion =>
        prevQuestion.map(question =>
          question.tempId === tempId
            ? { ...question, ...updatedFields }
            : question,
        ),
      );
    },
    [],
  );

  const deleteQuestion = useCallback((tempId: string) => {
    setQuestions(prevQuestion =>
      prevQuestion.filter(question => question.tempId !== tempId),
    );
  }, []);

  const addOption = useCallback((questionTempId: string) => {
    setQuestions(prevQuestion =>
      prevQuestion.map(question =>
        question.tempId === questionTempId
          ? {
              ...question,
              options: [
                ...(question.options || []),
                { tempId: uuidv4(), label: '' },
              ],
            }
          : question,
      ),
    );
  }, []);

  const updateOption = useCallback(
    (
      questionTempId: string,
      optionTempId: string,
      updatedFields: Partial<LocalQuestionOption>,
    ) => {
      setQuestions(prevQuestion =>
        prevQuestion.map(question =>
          question.tempId === questionTempId
            ? {
                ...question,
                options: question.options?.map(opt =>
                  opt.tempId === optionTempId
                    ? { ...opt, ...updatedFields }
                    : opt,
                ),
              }
            : question,
        ),
      );
    },
    [],
  );

  const deleteOption = useCallback(
    (questionTempId: string, optionTempId: string) => {
      setQuestions(prevQuestion =>
        prevQuestion.map(question =>
          question.tempId === questionTempId
            ? {
                ...question,
                options: question.options?.filter(
                  opt => opt.tempId !== optionTempId,
                ),
              }
            : question,
        ),
      );
    },
    [],
  );

  const reorderQuestions = useCallback((fromIndex: number, toIndex: number) => {
    setQuestions(qs => {
      const updated = [...qs];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }, []);

  const getQuestionsForServer = useCallback((): QuestionInput[] => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return questions.map(({ tempId, options, ...question }) => {
      const isWithOptions =
        question.type === QuestionType.MULTIPLE_CHOICE ||
        question.type === QuestionType.CHECKBOX;

      return {
        ...question,
        ...(isWithOptions && {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          options: options?.map(({ tempId, ...opt }) => opt),
        }),
      };
    });
  }, [questions]);

  const validateQuestions = useCallback((): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (questions.length === 0) {
      errors['form'] = 'The form must contain at least one question';
      return errors;
    }

    questions.forEach(question => {
      const id = question.tempId;
      if (!question.label.trim()) {
        errors[id] = 'Question label is required';
        return;
      }

      const isWithOptions =
        question.type === QuestionType.MULTIPLE_CHOICE ||
        question.type === QuestionType.CHECKBOX;

      if (isWithOptions) {
        if (!question.options || question.options.length === 0) {
          errors[id] = 'At least one option is required';
          return;
        }

        for (const opt of question.options) {
          if (!opt.label.trim()) {
            errors[id] = 'All option labels must be filled';
            return;
          }
        }
      }
    });

    return errors;
  }, [questions]);

  return {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    addOption,
    updateOption,
    deleteOption,
    reorderQuestions,
    getQuestionsForServer,
    setQuestions,
    validateQuestions,
  };
}
