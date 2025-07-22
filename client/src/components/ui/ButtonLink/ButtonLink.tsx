import { Link, type LinkProps } from 'react-router-dom';
import clsx from 'clsx';
import styles from './ButtonLink.module.scss';

type Props = LinkProps;

export const ButtonLink: React.FC<Props> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Link {...props} className={clsx(styles['button-link'], className)}>
      {children}
    </Link>
  );
};
