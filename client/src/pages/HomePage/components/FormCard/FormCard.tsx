import type React from 'react';
import { ContentBlock } from '../../../../components';
import type { Form } from '@shared/types';
import styles from './FormCard.module.scss';
import { ButtonLink } from '../../../../components/ui';

type Props = {
  form: Form;
};

export const FormCard: React.FC<Props> = ({ form }) => {
  const { title, description, id } = form;

  return (
    <ContentBlock className={styles.card}>
      <div className={styles.card__decor}></div>
      <div className={styles.card__info}>
        <h4 className={styles.card__title} data-cy="form-title">{title}</h4>
        <p className={styles.card__description} data-cy="form-description">{description}</p>
      </div>
      <div className={styles.card__links}>
        <ButtonLink to={`/forms/${id}/fill`} data-cy="form-view-btn">View Form</ButtonLink>
        <ButtonLink to={`/forms/${id}/responses`} data-cy="form-responses-btn">Responses</ButtonLink>
      </div>
    </ContentBlock>
  );
};
