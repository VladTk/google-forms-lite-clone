import React from 'react';

import { OptionItem } from '../OptionItem';
import { PlusIcon } from '../../../../components/icons';

import type { LocalQuestion, LocalQuestionOption } from '../../types';

import styles from './OptionList.module.scss';

type Props = {
  question: LocalQuestion;
  onAdd: (questionTempId: string) => void;
  onUpdate: (
    questionTempId: string,
    optionTempId: string,
    fields: Partial<LocalQuestionOption>,
  ) => void;
  onDelete: (questionTempId: string, optionTempId: string) => void;
};

export const OptionList: React.FC<Props> = ({
  question,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className={styles.options}>
      <div className={styles.options__list}>
        {question.options?.map(opt => (
          <OptionItem
            key={opt.tempId}
            option={opt}
            questionTempId={question.tempId}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>

      <button
        onClick={() => onAdd(question.tempId)}
        className={styles.options__btn}
        data-cy={`add-option-btn-${question.tempId}`}
      >
        <PlusIcon className={styles.options__icon} /> Add option
      </button>
    </div>
  );
};
