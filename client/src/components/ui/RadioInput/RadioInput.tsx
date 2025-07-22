import React from 'react';
import clsx from 'clsx';
import styles from './RadioInput.module.scss';

type Props = {
  checked: boolean;
  onChange: () => void;
  label?: string;
  name: string;
  className?: string;
  disabled?: boolean;
};

export const RadioInput: React.FC<Props> = ({
  checked,
  onChange,
  label,
  name,
  className,
  disabled,
}) => {
  return (
    <label className={clsx(styles.radio, className)}>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        name={name}
        disabled={disabled}
        className={styles.radio__input}
      />
      <span className={styles.radio__circle} />
      {label && <span className={styles.radio__label}>{label}</span>}
    </label>
  );
};
