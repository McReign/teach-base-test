import React, { ReactNode } from 'react';
import cn from 'classnames';
import { TypographyType } from '../definitions/TypographyType';
import { TypographySize } from '../definitions/TypographySize';
import commonStyles from '../styles.module.scss';
import styles from './styles.module.scss';

export interface ParagraphProps {
  className?: string;
  type?: TypographyType;
  size?: TypographySize;
  children?: ReactNode;
}

export function Paragraph(props: ParagraphProps) {
  const { className, type = 'primary', size = 'md', children } = props;

  return <p className={cn(styles.paragraph, commonStyles[size], commonStyles[type], className)}>{children}</p>;
}
