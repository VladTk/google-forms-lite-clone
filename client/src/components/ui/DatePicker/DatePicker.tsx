import React from 'react';
import clsx from 'clsx';
import styles from './DatePicker.module.scss';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const DatePicker: React.FC<Props> = ({ className, ...props }) => {
  return (
    <input
      type="date"
      className={clsx(styles.datepicker, className)}
      {...props}
    />
  );
};
