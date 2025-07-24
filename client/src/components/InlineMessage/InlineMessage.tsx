import React from 'react';
import styles from './InlineMessage.module.scss';
import { Button } from '../ui';
import { ContentBlock } from '../ContentBlock';

type Props = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const InlineMessage: React.FC<Props> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <ContentBlock className={styles['inline-message']} data-cy="inline-message">
      <h2
        className={styles['inline-message__title']}
        data-cy="inline-message-title"
      >
        {title}
      </h2>
      {description && (
        <p
          className={styles['inline-message__description']}
          data-cy="inline-message-description"
        >
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button
          className={styles['inline-message__button']}
          onClick={onAction}
          data-cy="inline-message-action"
        >
          {actionLabel}
        </Button>
      )}
    </ContentBlock>
  );
};
