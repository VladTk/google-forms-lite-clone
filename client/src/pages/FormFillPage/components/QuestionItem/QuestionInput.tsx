import React from 'react';
import { type Question, type Answer, QuestionType } from '@shared/types';
import {
  Textarea,
  RadioInput,
  Checkbox,
  DatePicker,
} from '../../../../components/ui';

import styles from './QuestionItem.module.scss';

type Props = {
  question: Question;
  value: Answer['value'] | Answer['values'];
  onChange: (val: Answer['value'] | Answer['values']) => void;
  questionId: string;
};

export const QuestionInput: React.FC<Props> = ({
  question,
  value,
  onChange,
  questionId,
}) => {
  switch (question.type) {
    case QuestionType.TEXT: {
      return (
        <Textarea
          value={value as string}
          onChange={e => onChange(e.target.value)}
          className="min-h-[80px]"
          rows={1}
          data-cy={`question-input-text-${questionId}`}
        />
      );
    }

    case QuestionType.DATE: {
      return (
        <DatePicker
          value={value as string}
          onChange={e => onChange(e.target.value)}
          className={styles.question__date}
          data-cy={`question-input-date-${questionId}`}
        />
      );
    }

    case QuestionType.MULTIPLE_CHOICE: {
      return (
        <div
          className={styles.question__list}
          data-cy={`question-input-mc-${questionId}`}
        >
          {question.options?.map(option => (
            <RadioInput
              key={option.id}
              name={question.id}
              label={option.label}
              checked={value === option.label}
              onChange={() => onChange(option.label)}
              dataCy={`question-input-mc-option-${questionId}-${option.id}`}
            />
          ))}
        </div>
      );
    }

    case QuestionType.CHECKBOX: {
      const selectedValues = Array.isArray(value) ? value : [];

      const toggleOption = (label: string) => {
        if (selectedValues.includes(label)) {
          onChange(selectedValues.filter(v => v !== label));
        } else {
          onChange([...selectedValues, label]);
        }
      };

      return (
        <div
          className={styles.question__list}
          data-cy={`question-input-checkbox-${questionId}`}
        >
          {question.options?.map(option => (
            <Checkbox
              key={option.id}
              label={option.label}
              checked={selectedValues.includes(option.label)}
              onChange={() => toggleOption(option.label)}
              data-cy={`question-input-checkbox-option-${questionId}-${option.id}`}
            />
          ))}
        </div>
      );
    }

    default:
      return null;
  }
};
