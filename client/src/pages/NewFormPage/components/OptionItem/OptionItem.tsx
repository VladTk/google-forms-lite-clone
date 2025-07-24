import React from 'react';

import { Input } from '../../../../components/ui';
import type { LocalQuestionOption } from '../../types';

import styles from './OptionItem.module.scss';

type Props = {
  option: LocalQuestionOption;
  questionTempId: string;
  onUpdate: (
    questionTempId: string,
    optionTempId: string,
    fields: Partial<LocalQuestionOption>,
  ) => void;
  onDelete: (questionTempId: string, optionTempId: string) => void;
};

export const OptionItem: React.FC<Props> = ({
  option,
  questionTempId,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className={styles.option}>
      <Input
        value={option.label}
        onChange={e =>
          onUpdate(questionTempId, option.tempId, {
            label: e.target.value,
          })
        }
        placeholder="Option"
        className={styles.option__input}
        data-cy={`option-input-${option.tempId}`}
      />
      <button
        onClick={() => onDelete(questionTempId, option.tempId)}
        className={styles.option__btn}
        data-cy={`option-delete-btn-${option.tempId}`}
      >
        ✕
      </button>
    </div>
  );
};
