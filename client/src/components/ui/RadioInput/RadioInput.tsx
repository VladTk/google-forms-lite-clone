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
  dataCy?: string;
};

export const RadioInput: React.FC<Props> = ({
  checked,
  onChange,
  label,
  name,
  className,
  disabled,
  dataCy,
}) => {
  return (
    <label className={clsx(styles.radio, className)} data-cy={dataCy}>
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
