import clsx from 'clsx';
import { FormCardSkeleton } from '../FormCard';
import styles from './FormList.module.scss';
import { NewFormCard } from '../NewFormCard';

export const FormListSkeleton = () => {
  return (
    <div className={styles['form-list__list']} data-cy="home-loading">
      <div className={styles['form-list__item']}>
        <NewFormCard />
      </div>

      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={clsx(
            styles['form-list__item'],
            styles['form-list__item--loading'],
          )}
        >
          <FormCardSkeleton />
        </div>
      ))}
    </div>
  );
};
