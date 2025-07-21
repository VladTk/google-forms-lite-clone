import React from 'react';
import styles from './Logo.module.scss';

export const Logo: React.FC = () => {
  return (
    <a href="/" className={styles.logo}>
      <img
        src="/google-forms-logo.webp"
        alt="Google Forms Logo"
        className={styles.logo__image}
      />
      <span className={styles.logo__text}>Forms</span>
    </a>
  );
};
