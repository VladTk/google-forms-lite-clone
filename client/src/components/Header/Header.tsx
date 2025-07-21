'use client';

import { Logo } from '../Logo';
import { Container } from '../Container';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.header__content}>
          <Logo />
        </div>
      </Container>
    </header>
  );
};
