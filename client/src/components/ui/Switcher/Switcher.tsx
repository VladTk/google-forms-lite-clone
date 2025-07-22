import React from 'react';
import styles from './Switcher.module.scss';
import clsx from 'clsx';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
};

export const Switcher: React.FC<Props> = ({
  checked,
  onChange,
  label,
  className,
}) => {
  return (
    <label className={clsx(styles.switcher, className)}>
      {label && <span className={styles.switcher__label}>{label}</span>}
      <div className={styles.switcher__control}>
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          className={styles.switcher__input}
        />
        <div
          className={clsx(
            styles.switcher__track,
            checked && styles['switcher__track--checked'],
          )}
        />
        <div
          className={clsx(
            styles.switcher__thumb,
            checked && styles['switcher__thumb--checked'],
          )}
        />
      </div>
    </label>
  );
};
