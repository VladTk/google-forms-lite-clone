import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './ContentBlock.module.scss';

type Props = React.HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export const ContentBlock: React.FC<Props> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <article className={clsx(styles.block, className)} {...rest}>
      {children}
    </article>
  );
};
