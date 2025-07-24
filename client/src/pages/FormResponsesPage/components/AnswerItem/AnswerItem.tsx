import React from 'react';
import type { Question, Answer } from '@shared/types';
import { QuestionType } from '@shared/types';
import styles from './AnswerItem.module.scss';
import { ContentBlock } from '../../../../components';

type Props = {
  question: Question;
  answer?: Answer;
};

export const AnswerItem: React.FC<Props> = ({ question, answer }) => {
  const renderAnswer = () => {
    switch (question.type) {
      case QuestionType.CHECKBOX:
        return (answer?.values?.length ?? 0) > 0 ? (
          <ul className={styles.answer__list}>
            {answer!.values!.map((val, idx) => (
              <li key={idx}>{val}</li>
            ))}
          </ul>
        ) : (
          <span>No answer</span>
        );

      case QuestionType.MULTIPLE_CHOICE:
      case QuestionType.TEXT:
      case QuestionType.DATE:
        return <span>{answer?.value ? answer.value : 'No answer'}</span>;

      default:
        return <span>Unsupported question type</span>;
    }
  };

  return (
    <ContentBlock className={styles.answer} data-cy="answer-item">
      <p className={styles.answer__label} data-cy="answer-label">
        {question.label}
      </p>

      <div className={styles.answer__value} data-cy="answer-value">
        {renderAnswer()}
      </div>
    </ContentBlock>
  );
};
