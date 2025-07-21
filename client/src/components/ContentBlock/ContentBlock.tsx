import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './ContentBlock.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
};

export const ContentBlock: React.FC<Props> = ({ children, className }) => {
  return (
    <article className={clsx(styles.block, className)}>{children}</article>
  );
};
