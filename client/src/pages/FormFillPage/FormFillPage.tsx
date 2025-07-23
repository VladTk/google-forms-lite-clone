import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetFormQuery } from '../../api/formsApi';
import { useSubmitResponseMutation } from '../../api/responsesApi';

import { QuestionItem } from './components';
import { type Answer } from '@shared/types';
import { Button } from '../../components/ui';
import { Container, FormMeta } from '../../components';

import { validateAnswers } from './utils';

import styles from './FormFillPage.module.scss';
import clsx from 'clsx';

export const FormFillPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: form, isError: formError } = useGetFormQuery(id ?? '');
  const [submitResponse, { isLoading, isSuccess, isError: submitError }] =
    useSubmitResponseMutation();
  const [answers, setAnswers] = useState<
    Record<string, Answer['value'] | Answer['values']>
  >({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAnswerChange = (
    questionId: string,
    value: Answer['value'] | Answer['values'],
  ) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setErrors(prev => {
      const updated = { ...prev };
      delete updated[questionId];
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    const validationErrors = validateAnswers(form.questions, answers);

    if (Object.keys(validationErrors).length > 0) {
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
      navigate('/');
    }
  }, [isSuccess, navigate]);

  return (
    <main className={styles.fill}>
      <Container className={styles.fill__container}>
        {formError || !form ? (
          <p className={styles.fill__error}>
            Error loading form. Please try again later.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.fill__form}>
            <FormMeta title={form.title} description={form.description} />
            <div className={clsx(isLoading && styles.fill__overlay)}>
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
            <Button type="submit" loading={isLoading}>
              Submit
            </Button>
            {submitError && (
              <p className={styles.fill__error}>
                Failed to submit response. Please try again.
              </p>
            )}
          </form>
        )}
      </Container>
    </main>
  );
};
