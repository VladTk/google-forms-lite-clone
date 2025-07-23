import type React from 'react';
import { useGetFormsQuery } from '../../api/formsApi';
import { FormList } from './components';
import { FormListSkeleton } from './components/FormList/FormListSkeleton';
import { Container, InlineMessage } from '../../components';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const { data: forms, isLoading, isError, refetch } = useGetFormsQuery();

  return (
    <main className={styles.home}>
      <Container>
        {isLoading && <FormListSkeleton />}
        {isError && (
          <InlineMessage
            title="Error loading forms"
            description="An error occurred while fetching data. Please try again."
            actionLabel="Retry"
            onAction={refetch}
          />
        )}
        {!isLoading && !isError && !!forms?.length && (
          <FormList forms={forms} />
        )}
      </Container>
    </main>
  );
};
