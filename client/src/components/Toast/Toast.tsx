import React from 'react';
import styles from './Toast.module.scss';
import clsx from 'clsx';

export type Props = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

export const Toast: React.FC<Props> = ({ message, type, onClose }) => {
  return (
    <div className={clsx(styles.toast, styles[`toast--${type}`])}>
      <span className={styles.toast__message}>{message}</span>
      <button onClick={onClose} className={styles.toast__close}>
        ×
      </button>
    </div>
  );
};
