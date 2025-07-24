import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';

import { useGetFormQuery } from '../../api/formsApi';
import { useSubmitResponseMutation } from '../../api/responsesApi';
import { type Answer } from '@shared/types';
import { validateAnswers } from './utils';

import { Toast, useToast } from '../../components/Toast';
import { QuestionItem, QuestionItemSkeleton } from './components';
import { Button } from '../../components/ui';
import {
  Container,
  FormMeta,
  InlineMessage,
  FormMetaSkeleton,
} from '../../components';

import styles from './FormFillPage.module.scss';

export const FormFillPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: form,
    isLoading: formLoading,
    isError: formError,
    refetch,
    isFetching: formFetching,
  } = useGetFormQuery(id ?? '');
  const [
    submitResponse,
    { isLoading: submitLoading, isSuccess, isError: submitError },
  ] = useSubmitResponseMutation();
  const [answers, setAnswers] = useState<
    Record<string, Answer['value'] | Answer['values']>
  >({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast, showToast, hideToast } = useToast();

  const handleAnswerChange = (
    questionId: string,
    value: Answer['value'] | Answer['values'],
  ) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setErrors(prev => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    const validationErrors = validateAnswers(form.questions, answers);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    submitResponse({
      formId: form.id,
      answers: Object.entries(answers).map(([questionId, value]) => ({
        questionId,
        ...(Array.isArray(value) ? { values: value } : { value }),
      })),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      showToast('Response submitted successfully!', 'success');
    } else if (submitError) {
      showToast('Failed to submit response. Please try again.', 'error');
    }
  }, [isSuccess, submitError, showToast]);

  return (
    <main className={styles.fill}>
      <Container className={styles.fill__container}>
        {formLoading || formFetching ? (
          <div className={styles.fill__form}>
            <FormMetaSkeleton />
            <div className={styles.fill__list}>
              {[...Array(3)].map((_, idx) => (
                <div key={idx}>
                  <QuestionItemSkeleton />
                </div>
              ))}
            </div>
          </div>
        ) : formError || !form ? (
          <InlineMessage
            title="Error loading form"
            description="Please try again later."
            actionLabel="Retry"
            onAction={() => refetch()}
          />
        ) : (
          <form onSubmit={handleSubmit} className={styles.fill__form}>
            <FormMeta title={form.title} description={form.description} />
            <div className={clsx(submitLoading && styles.fill__overlay)}>
              <ul className={styles.fill__list}>
                {form.questions.map(question => (
                  <li key={question.id}>
                    <QuestionItem
                      question={question}
                      value={answers[question.id]}
                      onChange={val => handleAnswerChange(question.id, val)}
                      error={errors[question.id]}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <Button type="submit" loading={submitLoading}>
              Submit
            </Button>
          </form>
        )}

        {toast.visible && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        )}
      </Container>
    </main>
  );
};
