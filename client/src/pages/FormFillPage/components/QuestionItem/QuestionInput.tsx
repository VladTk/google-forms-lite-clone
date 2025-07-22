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
};

export const QuestionInput: React.FC<Props> = ({
  question,
  value,
  onChange,
}) => {
  switch (question.type) {
    case QuestionType.TEXT: {
      return (
        <Textarea
          value={value as string}
          onChange={e => onChange(e.target.value)}
          className="min-h-[80px]"
          rows={1}
        />
      );
    }

    case QuestionType.DATE: {
      return (
        <DatePicker
          value={value as string}
          onChange={e => onChange(e.target.value)}
          className={styles.question__date}
        />
      );
    }

    case QuestionType.MULTIPLE_CHOICE: {
      return (
        <div className={styles.question__list}>
          {question.options?.map(option => (
            <RadioInput
              key={option.id}
              name={question.id}
              label={option.label}
              checked={value === option.label}
              onChange={() => onChange(option.label)}
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
        <div className={styles.question__list}>
          {question.options?.map(option => (
            <Checkbox
              key={option.id}
              label={option.label}
              checked={selectedValues.includes(option.label)}
              onChange={() => toggleOption(option.label)}
            />
          ))}
        </div>
      );
    }

    default:
      return null;
  }
};
