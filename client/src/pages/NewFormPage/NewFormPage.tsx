import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import { Container } from '../../components';
import { Button } from '../../components/ui';
import { FormMetadataEditor, QuestionListEditor } from './components';

import { QuestionType } from '@shared/types';

import { useCreateFormMutation } from '../../api/formsApi';
import { useLocalQuestions } from './hooks/useLocalQuestions';

import styles from './NewFormPage.module.scss';

export const NewFormPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    addOption,
    updateOption,
    deleteOption,
    getQuestionsForServer,
    reorderQuestions,
    validateQuestions,
  } = useLocalQuestions([
    {
      label: '',
      type: QuestionType.TEXT,
      required: false,
      options: [],
    },
  ]);

  const [createForm, { isLoading, isSuccess, isError }] =
    useCreateFormMutation();
  const navigate = useNavigate();

  const handlePublish = () => {
    if (!title.trim()) {
      setErrorMessage('Title cannot be empty.');
      return;
    }

    if (!description.trim()) {
      setErrorMessage('Description cannot be empty.');
      return;
    }

    const questionError = validateQuestions();
    if (questionError) {
      setErrorMessage(questionError);
      return;
    }

    setErrorMessage('');
    createForm({
      title,
      description,
      questions: getQuestionsForServer(),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }

    if (isError) {
      setErrorMessage('Something went wrong while publishing the form.');
    }
  }, [isSuccess, isError, navigate]);

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, questions]);

  return (
    <main className={styles['new-form-page']}>
      <Container className={styles['new-form-page__container']}>
        <div className={styles['new-form-page__editor']}>
          <FormMetadataEditor
            title={title}
            description={description}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
          />
          <div className={clsx(isLoading && styles['new-form-page__overlay'])}>
            <QuestionListEditor
              questions={questions}
              onUpdateQuestion={updateQuestion}
              onDeleteQuestion={deleteQuestion}
              onAddOption={addOption}
              onUpdateOption={updateOption}
              onDeleteOption={deleteOption}
              onReorderQuestions={reorderQuestions}
            />
          </div>
          <div className={styles['new-form-page__buttons']}>
            <Button onClick={addQuestion} disabled={isLoading}>
              Add question
            </Button>
            <Button onClick={handlePublish} loading={isLoading}>
              Publish
            </Button>
          </div>
          {errorMessage && (
            <div className={styles['new-form-page__error']}>{errorMessage}</div>
          )}
        </div>
      </Container>
    </main>
  );
};
