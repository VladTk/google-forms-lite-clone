import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { LocalQuestion, LocalQuestionOption } from '../types';
import { QuestionType, type QuestionInput } from '@shared/types';

export function useLocalQuestions(initialQuestions: QuestionInput[] = []) {
  const initLocalQuestions = (questions: QuestionInput[]): LocalQuestion[] =>
    questions.map(q => ({
      ...q,
      tempId: uuidv4(),
      options: q.options?.map(opt => ({ ...opt, tempId: uuidv4() })),
    }));

  const [questions, setQuestions] = useState<LocalQuestion[]>(
    initLocalQuestions(initialQuestions),
  );

  const addQuestion = useCallback(() => {
    const newQuestion: LocalQuestion = {
      tempId: uuidv4(),
      label: '',
      type: QuestionType.TEXT,
      required: false,
      options: [],
    };
    setQuestions(qs => [...qs, newQuestion]);
  }, []);

  const updateQuestion = useCallback(
    (tempId: string, updatedFields: Partial<LocalQuestion>) => {
      setQuestions(qs =>
        qs.map(q => (q.tempId === tempId ? { ...q, ...updatedFields } : q)),
      );
    },
    [],
  );

  const deleteQuestion = useCallback((tempId: string) => {
    setQuestions(qs => qs.filter(q => q.tempId !== tempId));
  }, []);

  const addOption = useCallback((questionTempId: string) => {
    setQuestions(qs =>
      qs.map(q =>
        q.tempId === questionTempId
          ? {
              ...q,
              options: [...(q.options || []), { tempId: uuidv4(), label: '' }],
            }
          : q,
      ),
    );
  }, []);

  const updateOption = useCallback(
    (
      questionTempId: string,
      optionTempId: string,
      updatedFields: Partial<LocalQuestionOption>,
    ) => {
      setQuestions(qs =>
        qs.map(q =>
          q.tempId === questionTempId
            ? {
                ...q,
                options: q.options?.map(opt =>
                  opt.tempId === optionTempId
                    ? { ...opt, ...updatedFields }
                    : opt,
                ),
              }
            : q,
        ),
      );
    },
    [],
  );

  const deleteOption = useCallback(
    (questionTempId: string, optionTempId: string) => {
      setQuestions(qs =>
        qs.map(q =>
          q.tempId === questionTempId
            ? {
                ...q,
                options: q.options?.filter(opt => opt.tempId !== optionTempId),
              }
            : q,
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
    return questions.map(({ tempId, options, ...q }) => {
      const isWithOptions =
        q.type === QuestionType.MULTIPLE_CHOICE ||
        q.type === QuestionType.CHECKBOX;

      return {
        ...q,
        ...(isWithOptions && {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          options: options?.map(({ tempId, ...opt }) => opt),
        }),
      };
    });
  }, [questions]);

  const validateQuestions = useCallback((): string | null => {
    if (questions.length === 0) {
      return 'The form must contain at least one question.';
    }

    for (const q of questions) {
      if (!q.label.trim()) {
        return 'Each question must have a label.';
      }

      const isWithOptions =
        q.type === QuestionType.MULTIPLE_CHOICE ||
        q.type === QuestionType.CHECKBOX;

      if (isWithOptions) {
        if (!q.options || q.options.length === 0) {
          return 'Questions with options must have at least one option.';
        }

        for (const opt of q.options) {
          if (!opt.label.trim()) {
            return 'All option labels must be filled.';
          }
        }
      }
    }

    return null;
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
