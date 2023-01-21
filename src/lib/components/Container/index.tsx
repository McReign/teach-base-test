import React, { ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

export interface ContainerProps {
  className?: string;
  children: ReactNode;
}

export function Container(props: ContainerProps) {
  const { className, children } = props;

  return <div className={cn(styles.container, className)}>{children}</div>;
}
