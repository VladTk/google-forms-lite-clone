import type React from 'react';
import styles from './FormMeta.module.scss';
import clsx from 'clsx';

export const FormMetaSkeleton: React.FC = () => {
  return <div className={clsx(styles.meta, styles['meta--loading'])}></div>;
};
