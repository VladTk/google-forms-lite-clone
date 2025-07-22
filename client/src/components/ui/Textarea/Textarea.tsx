import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './Textarea.module.scss';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea: React.FC<Props> = ({ className, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, []);

  return (
    <textarea
      ref={textareaRef}
      className={clsx(styles.textarea, className)}
      onInput={resizeTextarea}
      {...props}
    />
  );
};
