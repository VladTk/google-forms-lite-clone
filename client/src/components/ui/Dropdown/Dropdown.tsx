import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Dropdown.module.scss';
import { ArrowDownIcon } from '../../icons';

export type DropdownOption<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  options: DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  dataCy?: string;
};

export function Dropdown<T>({
  options,
  value,
  onChange,
  className,
  dataCy,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(o => o.value === value) || options[0];

  const handleToggle = () => setIsOpen(prev => !prev);

  const handleSelect = (option: DropdownOption<T>) => {
    setIsOpen(false);
    onChange(option.value);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className={clsx(styles.dropdown, className)}>
      <button
        onClick={handleToggle}
        className={clsx(
          styles.dropdown__btn,
          isOpen && styles['dropdown__btn--active'],
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        type="button"
        data-cy={dataCy}
      >
        {selectedOption?.label}
        <ArrowDownIcon
          className={clsx(
            styles.dropdown__icon,
            isOpen && styles['dropdown__icon--active'],
          )}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className={clsx(
            styles.dropdown__list,
            styles['dropdown__list--active'],
          )}
        >
          {options.map(option => (
            <li
              key={String(option.value)}
              onClick={() => handleSelect(option)}
              className={clsx(
                styles.dropdown__item,
                option.value === selectedOption.value &&
                  styles['dropdown__item--selected'],
              )}
              role="option"
              aria-selected={option.value === selectedOption.value}
              data-cy={`dropdown-item-${option.label}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
