import type { Question, Response } from '@shared/types';
import styles from './ResponseAnswers.module.scss';
import { AnswerItem } from '../AnswerItem';

type Props = {
  questions: Question[];
  response: Response;
};

export const ResponseAnswers: React.FC<Props> = ({ questions, response }) => (
  <ul className={styles.answers} data-cy="response-answers">
    {questions.map(question => {
      const answer = response.answers.find(a => a.questionId === question.id);
      return (
        <li key={question.id} data-cy="answer-list-item">
          <AnswerItem question={question} answer={answer} />
        </li>
      );
    })}
  </ul>
);
