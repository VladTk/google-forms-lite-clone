import type React from 'react';
import { Link } from 'react-router-dom';
import { ContentBlock } from '../../../../components';
import type { Form } from '@shared/types';
import styles from './FormCard.module.scss';

type Props = {
  form: Form;
};

export const FormCard: React.FC<Props> = ({ form }) => {
  const { title, description, id } = form;

  return (
    <ContentBlock className={styles.card}>
      <div className={styles.card__decor}></div>
      <div className={styles.card__info}>
        <h4 className={styles.card__title}>{title}</h4>
        <p className={styles.card__description}>{description}</p>
      </div>
      <div className={styles.card__links}>
        <Link to={`/forms/${id}/fill`} className={styles.card__link}>
          View Form
        </Link>
        <Link to={`/forms/${id}/responses`} className={styles.card__link}>
          Responses
        </Link>
      </div>
    </ContentBlock>
  );
};
