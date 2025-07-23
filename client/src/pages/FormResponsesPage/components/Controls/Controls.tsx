import React from 'react';
import styles from './Controls.module.scss';
import { Button } from '../../../../components/ui';

type Props = {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
};

export const Controls: React.FC<Props> = ({
  currentIndex,
  total,
  onPrev,
  onNext,
}) => (
  <div className={styles.controls}>
    <Button
      className={styles.controls__button}
      onClick={onPrev}
      disabled={currentIndex === 0}
    >
      Previous
    </Button>
    <span className={styles.controls__counter}>
      {currentIndex + 1} / {total}
    </span>
    <Button
      className={styles.controls__button}
      onClick={onNext}
      disabled={currentIndex === total - 1}
    >
      Next
    </Button>
  </div>
);
