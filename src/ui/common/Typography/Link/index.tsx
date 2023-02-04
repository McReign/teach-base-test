import React, { ReactNode } from 'react';
import cn from 'classnames';
import { TypographySize } from '../definitions/TypographySize';
import commonStyles from '../styles.module.scss';
import styles from './styles.module.scss';

export interface LinkProps {
  className?: string;
  size?: TypographySize;
  to: string;
  children: ReactNode;
}

export function Link(props: LinkProps) {
  const { className, to, size = 'md', children } = props;

  return (
    <a className={cn(styles.link, commonStyles[size], className)} href={to}>
      {children}
    </a>
  );
}
