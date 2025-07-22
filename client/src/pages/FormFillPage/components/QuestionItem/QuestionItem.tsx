import React from 'react';
import { type Question, type Answer } from '@shared/types';
import { ContentBlock } from '../../../../components';

import styles from './QuestionItem.module.scss';
import { QuestionInput } from './QuestionInput';

type Props = {
  question: Question;
  value: Answer['value'] | Answer['values'];
  onChange: (value: Answer['value'] | Answer['values']) => void;
  error: string;
};

export const QuestionItem: React.FC<Props> = ({
  question,
  value,
  onChange,
  error,
}) => {
  return (
    <ContentBlock className={styles.question}>
      <div className={styles.question__info}>
        <p className={styles.question__label}>
          {question.label}
          {question.required && ' *'}
        </p>
        {!!error && <p className={styles.question__error}>{error}</p>}
      </div>
      <QuestionInput question={question} value={value} onChange={onChange} />
    </ContentBlock>
  );
};
