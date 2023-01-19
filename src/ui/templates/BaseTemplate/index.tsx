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
    <div className={cn(styles.baseTemplate, className)}>
      <header>{header}</header>
      <main>{children}</main>
    </div>
  );
}
