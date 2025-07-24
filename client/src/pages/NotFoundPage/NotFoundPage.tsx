import type React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from '../../components';
import { Button } from '../../components/ui';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <main className={styles['not-found']}>
      <Container>
        <div className={styles['not-found__info']}>
          <h1 className={styles['not-found__title']} data-cy="not-found-title">
            Page Not Found
          </h1>
          <p
            className={styles['not-found__description']}
            data-cy="not-found-description"
          >
            Sorry, the page you're looking for doesn't exist.
          </p>
        </div>
        <Button
          onClick={handleGoHome}
          className={styles['not-found__btn']}
          data-cy="not-found-home-btn"
        >
          Go to Home
        </Button>
      </Container>
    </main>
  );
};
