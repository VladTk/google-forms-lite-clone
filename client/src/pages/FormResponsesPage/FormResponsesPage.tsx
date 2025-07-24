import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, FormMeta, FormMetaSkeleton } from '../../components';
import { useGetFormQuery } from '../../api/formsApi';
import { useGetResponsesQuery } from '../../api/responsesApi';
import {
  Controls,
  ErrorOrEmptyState,
  ResponseAnswers,
  ResponseAnswersSkeleton,
} from './components';
import styles from './FormResponsesPage.module.scss';
import { usePaginatedResponses } from './hooks';

export const FormResponsesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: form,
    isLoading: formLoading,
    error: formError,
    refetch: refetchForm,
    isFetching: formFetching,
  } = useGetFormQuery(id!, { skip: !id });

  const {
    data: responses,
    isLoading: responsesLoading,
    error: responsesError,
    refetch: refetchResponses,
    isFetching: responseFetching,
  } = useGetResponsesQuery(id!, { skip: !id });

  const isLoading =
    formLoading || responsesLoading || formFetching || responseFetching;
  const hasError = !isLoading && (formError != null || responsesError != null);

  const hasData = !!(form && responses && responses.length > 0);

  const { currentIndex, onPrev, onNext } = usePaginatedResponses(
    hasData ? responses.length : 0,
  );
  const currentResponse =
    !isLoading && responses && currentIndex < responses.length
      ? responses[currentIndex]
      : null;

  return (
    <main className={styles['responses-page']}>
      <Container className={styles['responses-page__container']}>
        <div className={styles['responses-page__content']}>
          <ErrorOrEmptyState
            isError={hasError}
            hasData={hasData}
            isLoading={isLoading}
            onRetry={() => {
              refetchForm();
              refetchResponses();
            }}
          />

          {isLoading ? (
            <>
              <FormMetaSkeleton />
              <ResponseAnswersSkeleton />
            </>
          ) : (
            hasData && (
              <>
                <FormMeta title={form!.title} description={form!.description} />
                <ResponseAnswers
                  questions={form!.questions}
                  response={currentResponse!}
                />
                <Controls
                  currentIndex={currentIndex}
                  total={responses!.length}
                  onPrev={onPrev}
                  onNext={onNext}
                />
              </>
            )
          )}
        </div>
      </Container>
    </main>
  );
};
