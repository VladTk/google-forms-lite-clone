import { AnswerItemSkeleton } from '../AnswerItem';
import styles from './ResponseAnswers.module.scss';

export const ResponseAnswersSkeleton: React.FC = () => (
  <div className={styles.answers}>
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index}>
        <AnswerItemSkeleton />
      </div>
    ))}
  </div>
);
