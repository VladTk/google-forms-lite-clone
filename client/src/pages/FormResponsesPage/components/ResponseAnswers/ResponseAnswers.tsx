import type { Question, Response } from '@shared/types';
import styles from './ResponseAnswers.module.scss';
import { AnswerItem } from '../AnswerItem';

type Props = {
  questions: Question[];
  response: Response;
};

export const ResponseAnswers: React.FC<Props> = ({ questions, response }) => (
  <ul className={styles.answers}>
    {questions.map(question => {
      const answer = response.answers.find(a => a.questionId === question.id);
      return (
        <li key={question.id}>
          <AnswerItem question={question} answer={answer} />
        </li>
      );
    })}
  </ul>
);
