import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = ({ className, ...props }) => {
  return <input className={clsx(styles.input, className)} {...props} />;
};
