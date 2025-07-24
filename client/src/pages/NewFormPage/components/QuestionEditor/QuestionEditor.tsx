import React from 'react';

import { OptionList } from '../OptionList';
import {
  Switcher,
  Textarea,
  Dropdown,
  type DropdownOption,
} from '../../../../components/ui';
import { ContentBlock } from '../../../../components';
import { DeleteIcon } from '../../../../components/icons';

import { QuestionType } from '@shared/types';
import type { LocalQuestion, LocalQuestionOption } from '../../types';

import styles from './QuestionEditor.module.scss';

type Props = {
  question: LocalQuestion;
  onUpdate: (tempId: string, fields: Partial<LocalQuestion>) => void;
  onDelete: (tempId: string) => void;
  onAddOption: (questionTempId: string) => void;
  onUpdateOption: (
    questionTempId: string,
    optionTempId: string,
    fields: Partial<LocalQuestionOption>,
  ) => void;
  onDeleteOption: (questionTempId: string, optionTempId: string) => void;
  error?: string;
};

export const QuestionEditor: React.FC<Props> = ({
  question,
  onUpdate,
  onDelete,
  onAddOption,
  onUpdateOption,
  onDeleteOption,
  error,
}) => {
  const typeOptions: DropdownOption<QuestionType>[] = Object.values(
    QuestionType,
  ).map(type => ({
    label: type
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/^\w/, c => c.toUpperCase()),
    value: type,
  }));

  return (
    <ContentBlock className={styles.question}>
      <div className={styles.question__header}>
        {!!error && (
          <p
            className={styles.question__error}
            data-cy={`question-error-${question.tempId}`}
          >
            {error}
          </p>
        )}
        <div className={styles.question__inputs}>
          <Textarea
            value={question.label}
            onChange={e => onUpdate(question.tempId, { label: e.target.value })}
            placeholder="Question"
            className={styles.question__input}
            rows={1}
            data-cy={`question-input-${question.tempId}`}
          />

          <Dropdown
            value={question.type}
            onChange={newType => onUpdate(question.tempId, { type: newType })}
            options={typeOptions}
            className={styles.question__dropdown}
            dataCy={`question-type-dropdown-${question.tempId}`}
          />
        </div>
      </div>

      {(question.type === QuestionType.MULTIPLE_CHOICE ||
        question.type === QuestionType.CHECKBOX) && (
        <OptionList
          question={question}
          onAdd={onAddOption}
          onUpdate={onUpdateOption}
          onDelete={onDeleteOption}
        />
      )}

      <div className={styles.question__footer}>
        <Switcher
          checked={question.required ?? false}
          onChange={checked => onUpdate(question.tempId, { required: checked })}
          label="Required"
          data-cy={`required-switch-${question.tempId}`}
        />
        <button
          onClick={() => onDelete(question.tempId)}
          className={styles.question__btn}
          data-cy={`delete-question-btn-${question.tempId}`}
        >
          <DeleteIcon className={styles.question__icon} />
        </button>
      </div>
    </ContentBlock>
  );
};
