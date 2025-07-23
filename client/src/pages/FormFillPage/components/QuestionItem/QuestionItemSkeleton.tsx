import type React from 'react';
import clsx from 'clsx';
import styles from './QuestionItem.module.scss';

export const QuestionItemSkeleton: React.FC = () => {
  return (
    <div className={clsx(styles.question, styles['question--loading'])}></div>
  );
};
