import React, { ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

export interface BaseTemplateProps {
  className?: string;
  header: ReactNode;
  children: ReactNode;
}

export function BaseTemplate(props: BaseTemplateProps) {
  const { className, header, children } = props;

  return (
    <div className={cn(styles.wrapper, className)}>
      <header className={styles.header}>{header}</header>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
