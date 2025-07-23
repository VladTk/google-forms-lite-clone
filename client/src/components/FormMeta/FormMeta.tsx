import React from 'react';
import { ContentBlock } from '..';

import styles from './FormMeta.module.scss';

type Props = {
  title: string;
  description: string;
};

export const FormMeta: React.FC<Props> = ({ title, description }) => (
  <ContentBlock className={styles.meta}>
    <div className={styles.meta__decor}></div>
    <h3 className={styles.meta__title}>{title}</h3>
    <p className={styles.meta__description}>{description}</p>
  </ContentBlock>
);
