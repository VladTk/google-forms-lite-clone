import styles from './FormCard.module.scss';
import clsx from 'clsx';

export const FormCardSkeleton = () => {
  return <div className={clsx(styles.card, styles['card--loading'])}></div>;
};
