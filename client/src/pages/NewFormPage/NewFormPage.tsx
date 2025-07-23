import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

import { Container, Toast, useToast } from '../../components';
import { Button } from '../../components/ui';
import { FormMetadataEditor, QuestionListEditor } from './components';

import { QuestionType } from '@shared/types';
import { useCreateFormMutation } from '../../api/formsApi';
import { useLocalQuestions } from './hooks/useLocalQuestions';
import type { LocalQuestion, LocalQuestionOption } from './types';

import styles from './NewFormPage.module.scss';

export const NewFormPage: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const { toast, showToast, hideToast } = useToast();

  const clearError = useCallback((key: string) => {
    setErrors(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  }, []);

  const handleOptionAction = useCallback(
    (action: () => void, questionTempId: string) => {
      action();
      if (errors[questionTempId]) clearError(questionTempId);
    },
    [errors, clearError],
  );

  const handleTitleChange = useCallback(
    (newTitle: string) => {
      setTitle(newTitle);
      if (errors.title) clearError('title');
    },
    [errors.title, clearError],
  );

  const handleDescriptionChange = useCallback(
    (newDescription: string) => {
      setDescription(newDescription);
      if (errors.description) clearError('description');
    },
    [errors.description, clearError],
  );

  const handleAddQuestion = useCallback(() => {
    addQuestion();
    clearError('form');
  }, [addQuestion, clearError]);

  const handleUpdateQuestion = useCallback(
    (tempId: string, fields: Partial<LocalQuestion>) => {
      updateQuestion(tempId, fields);
      if (errors[tempId]) clearError(tempId);
    },
    [updateQuestion, errors, clearError],
  );

  const handleDeleteQuestion = useCallback(
    (tempId: string) => {
      deleteQuestion(tempId);
      if (errors[tempId]) clearError(tempId);
    },
    [deleteQuestion, errors, clearError],
  );

  const handleAddOption = useCallback(
    (questionTempId: string) => {
      handleOptionAction(() => addOption(questionTempId), questionTempId);
    },
    [addOption, handleOptionAction],
  );

  const handleUpdateOption = useCallback(
    (
      questionTempId: string,
      optionTempId: string,
      fields: Partial<LocalQuestionOption>,
    ) => {
      handleOptionAction(
        () => updateOption(questionTempId, optionTempId, fields),
        questionTempId,
      );
    },
    [updateOption, handleOptionAction],
  );

  const handleDeleteOption = useCallback(
    (questionTempId: string, optionTempId: string) => {
      handleOptionAction(
        () => deleteOption(questionTempId, optionTempId),
        questionTempId,
      );
    },
    [deleteOption, handleOptionAction],
  );

  const handlePublish = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors['title'] = 'Title cannot be empty';
    }

    if (!description.trim()) {
      newErrors['description'] = 'Description cannot be empty';
    }

    const questionErrors = validateQuestions();
    Object.assign(newErrors, questionErrors);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    createForm({
      title,
      description,
      questions: getQuestionsForServer(),
    });
  }, [
    title,
    description,
    validateQuestions,
    createForm,
    getQuestionsForServer,
  ]);

  useEffect(() => {
    if (isSuccess) {
      showToast('Form created successfully!', 'success');
    } else if (isError) {
      showToast('Failed to create form. Please try again.', 'error');
    }
  }, [isSuccess, isError, showToast]);

  const handleToastClose = useCallback(() => {
    hideToast();
  }, [hideToast]);

  return (
    <main className={styles['new-form-page']}>
      <Container className={styles['new-form-page__container']}>
        <div className={styles['new-form-page__editor']}>
          <FormMetadataEditor
            title={title}
            description={description}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
            titleError={errors.title}
            descriptionError={errors.description}
          />
          <div className={clsx(isLoading && styles['new-form-page__overlay'])}>
            <QuestionListEditor
              questions={questions}
              questionErrors={errors}
              onUpdateQuestion={handleUpdateQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onReorderQuestions={reorderQuestions}
              onAddOption={handleAddOption}
              onUpdateOption={handleUpdateOption}
              onDeleteOption={handleDeleteOption}
            />
          </div>
          <div className={styles['new-form-page__buttons']}>
            <Button onClick={handleAddQuestion} disabled={isLoading}>
              Add question
            </Button>
            <Button onClick={handlePublish} loading={isLoading}>
              Publish
            </Button>
          </div>
          {errors['form'] && (
            <div className={styles['new-form-page__error']}>
              {errors['form']}
            </div>
          )}
        </div>
      </Container>

      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleToastClose}
        />
      )}
    </main>
  );
};
