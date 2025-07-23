import type React from 'react';
import styles from './AnswerItem.module.scss';
import clsx from 'clsx';

export const AnswerItemSkeleton: React.FC = () => {
  return <div className={clsx(styles.answer, styles['answer--loading'])}></div>;
};
