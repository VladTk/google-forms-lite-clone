import React from 'react';
import clsx from 'clsx';
import styles from './Checkbox.module.scss';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
};

export const Checkbox: React.FC<Props> = ({
  checked,
  onChange,
  label,
  className,
  disabled,
}) => {
  return (
    <label className={clsx(styles.checkbox, className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        disabled={disabled}
        className={styles.checkbox__input}
      />
      <span className={styles.checkbox__box} />
      {label && <span className={styles.checkbox__label}>{label}</span>}
    </label>
  );
};
