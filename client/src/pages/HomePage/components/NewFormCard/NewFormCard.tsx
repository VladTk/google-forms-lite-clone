'use client';

import { Link } from 'react-router-dom';
import styles from './NewFormCard.module.scss';

export const NewFormCard = () => {
  return (
    <Link to="/forms/new" className={styles['new-form']}>
      <div className={styles['new-form__img-wrapper']}>
        <img
          src="/new-form.png"
          alt="create new form"
          className={styles['new-form__img']}
        />
      </div>
    </Link>
  );
};
