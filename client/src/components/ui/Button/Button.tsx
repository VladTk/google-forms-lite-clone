import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  loading = false,
  disabled,
  className,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        styles.button,
        loading && styles['button--loading'],
        className,
      )}
      disabled={loading || disabled}
    >
      <span className={styles.button__content}>{children}</span>
    </button>
  );
};
