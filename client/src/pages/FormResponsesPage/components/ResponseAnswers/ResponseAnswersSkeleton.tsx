import { AnswerItemSkeleton } from '../AnswerItem';
import styles from './ResponseAnswers.module.scss';

export const ResponseAnswersSkeleton: React.FC = () => (
  <div className={styles.answers} data-cy="response-answers-skeleton">
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} data-cy="answer-item-skeleton">
        <AnswerItemSkeleton />
      </div>
    ))}
  </div>
);
