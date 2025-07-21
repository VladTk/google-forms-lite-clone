import React from 'react';
import type { Form } from '@shared/types';
import { FormCard } from '../FormCard';
import { NewFormCard } from '../NewFormCard';
import styles from './FormList.module.scss';

type Props = {
  forms: Form[];
};

export const FormList: React.FC<Props> = ({ forms }) => {
  return (
    <section className={styles['form-list']}>
      <div className={styles['form-list__wrapper']}>
        <ul className={styles['form-list__list']}>
          <li className={styles['form-list__item']}>
            <NewFormCard />
          </li>

          {[...forms].reverse().map((form: Form) => (
            <li key={form.id} className={styles['form-list__item']}>
              <FormCard form={form} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
