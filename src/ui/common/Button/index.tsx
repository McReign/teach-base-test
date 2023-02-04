import React, { ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

export type ButtonHTMLType = 'submit' | 'reset' | 'button';
export type ButtonType = 'primary' | 'secondary';

export interface ButtonProps {
  className?: string;
  htmlType?: ButtonHTMLType;
  type?: ButtonType;
  loading?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

export function Button(props: ButtonProps) {
  const { className, children, htmlType = 'button', type = 'primary', loading, onClick } = props;

  return (
    <button
      className={cn(styles.button, loading && styles.loading, styles[type], className)}
      disabled={loading}
      type={htmlType}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
