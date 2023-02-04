import React, { ReactNode } from 'react';
import cn from 'classnames';
import { TypographyType } from '../definitions/TypographyType';
import { TypographySize } from '../definitions/TypographySize';
import commonStyles from '../styles.module.scss';

export interface TextProps {
  className?: string;
  type?: TypographyType;
  size?: TypographySize;
  children?: ReactNode;
}

export function Text(props: TextProps) {
  const { className, type = 'primary', size = 'md', children } = props;

  return <span className={cn(commonStyles[type], commonStyles[size], className)}>{children}</span>;
}
