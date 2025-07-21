import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Container.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
};

export const Container: React.FC<Props> = ({ children, className }) => {
  return <div className={clsx(styles.container, className)}>{children}</div>;
};
