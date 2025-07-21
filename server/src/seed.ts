import { v4 as uuid } from 'uuid';
import { forms, responses } from './store/store';
import { QuestionType, Form, Response } from '../../shared/src/types';

export function seedData() {
  for (let i = 1; i <= 4; i++) {
    const formId = uuid();
    const questions = [
      {
        id: uuid(),
        type: QuestionType.TEXT,
        label: `Text question ${i}`,
        required: false,
        options: [],
      },
      {
        id: uuid(),
        type: QuestionType.CHECKBOX,
        label: `Checkbox question ${i}`,
        required: false,
        options: [
          { id: uuid(), label: 'Option A' },
          { id: uuid(), label: 'Option B' },
        ],
      },
    ];

    const form: Form = {
      id: formId,
      title: `Form ${i}`,
      description: `Simple form number ${i}`,
      questions,
    };
    forms.set(formId, form);

    const response: Response = {
      id: uuid(),
      formId,
      answers: [
        {
          questionId: questions[0].id,
          value: `Answer text for form ${i}`,
        },
        {
          questionId: questions[1].id,
          values: ['Option A'],
        },
      ],
    };
    responses.set(response.id, response);
  }

  const form5Id = uuid();
  const form5Questions = [
    {
      id: uuid(),
      type: QuestionType.TEXT,
      label: 'Your name',
      required: true,
      options: [],
    },
    {
      id: uuid(),
      type: QuestionType.CHECKBOX,
      label: 'Choose your hobbies',
      required: false,
      options: [
        { id: uuid(), label: 'Music' },
        { id: uuid(), label: 'Sports' },
        { id: uuid(), label: 'Books' },
      ],
    },
    {
      id: uuid(),
      type: QuestionType.MULTIPLE_CHOICE,
      label: 'Favorite color',
      required: true,
      options: [
        { id: uuid(), label: 'Red' },
        { id: uuid(), label: 'Green' },
        { id: uuid(), label: 'Blue' },
      ],
    },
    {
      id: uuid(),
      type: QuestionType.DATE,
      label: 'Date of birth',
      required: false,
      options: [],
    },
  ];

  const form5: Form = {
    id: form5Id,
    title:
      'Full test form with all basic question types including text inputs, ' +
      'multiple choice options, checkboxes for multi-select answers, and date ' +
      'pickers for scheduling or birthdays.',

    description:
      'This form is designed to validate the layout and behavior of standard form ' +
      'elements such as TEXT inputs, MULTIPLE_CHOICE questions with several options, ' +
      'CHECKBOX fields for multi-selections, and DATE pickers. It helps ensure all ' +
      'supported question types display correctly and behave as expected, even with ' +
      'long labels and complex input scenarios.',
    questions: form5Questions,
  };
  forms.set(form5Id, form5);

  for (let i = 1; i <= 3; i++) {
    const response: Response = {
      id: uuid(),
      formId: form5Id,
      answers: [
        {
          questionId: form5Questions[0].id,
          value: `User ${i}`,
        },
        {
          questionId: form5Questions[1].id,
          values:
            i === 1 ? ['Music', 'Books'] : i === 2 ? ['Sports'] : ['Music'],
        },
        {
          questionId: form5Questions[2].id,
          value: i === 1 ? 'Red' : i === 2 ? 'Green' : 'Blue',
        },
        {
          questionId: form5Questions[3].id,
          value: `199${i}-01-01`,
        },
      ],
    };
    responses.set(response.id, response);
  }
}
