import React from 'react';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className={styles.logo}>
      <img
        src="/google-forms-logo.webp"
        alt="Google Forms Logo"
        className={styles.logo__image}
      />
      <span className={styles.logo__text}>Forms</span>
    </Link>
  );
};
